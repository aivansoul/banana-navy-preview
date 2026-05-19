#!/usr/bin/env node
/**
 * Playbook System 2 — Markdown Mirrors generator.
 *
 * Walks the freshly built `dist/` tree, finds every index.html, and writes a
 * sibling `index.md` that strips nav/footer/scripts and keeps the readable
 * content. Frontmatter (title, description, locale, URL) goes on top so AI
 * fetchers know exactly what they are quoting.
 *
 * Run automatically after `astro build` via the npm script.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import * as cheerio from "cheerio";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const SITE = (process.env.PUBLIC_SITE_URL || "https://banana-navy.pages.dev").replace(/\/$/, "");

/** Walk a folder and yield every file path matching the filter. */
async function* walk(dir, filter) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full, filter);
    } else if (filter(full)) {
      yield full;
    }
  }
}

const BLOCK_TAGS = new Set(["P", "H1", "H2", "H3", "H4", "H5", "H6", "LI", "BLOCKQUOTE", "PRE", "DT", "DD"]);

function htmlToMarkdown($, node) {
  const lines = [];
  walkNode($, node, lines, 0);
  // Collapse 3+ blank lines.
  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function walkNode($, node, lines, depth) {
  const $node = $(node);
  if (node.type === "text") {
    const text = (node.data || "").replace(/\s+/g, " ");
    if (text.trim()) lines.push(text);
    return;
  }
  if (node.type !== "tag") return;

  const tag = node.name.toUpperCase();

  switch (tag) {
    case "SCRIPT":
    case "STYLE":
    case "NOSCRIPT":
    case "SVG":
    case "IFRAME":
    case "VIDEO":
    case "AUDIO":
      return;
    case "H1": pushHeading(lines, $node.text().trim(), 1); return;
    case "H2": pushHeading(lines, $node.text().trim(), 2); return;
    case "H3": pushHeading(lines, $node.text().trim(), 3); return;
    case "H4": pushHeading(lines, $node.text().trim(), 4); return;
    case "H5": pushHeading(lines, $node.text().trim(), 5); return;
    case "H6": pushHeading(lines, $node.text().trim(), 6); return;
    case "P": {
      pushBlock(lines, $node.text().trim());
      return;
    }
    case "BR": lines.push(""); return;
    case "HR": lines.push("\n---\n"); return;
    case "LI": {
      const t = $node.text().trim();
      if (t) lines.push(`- ${t}`);
      return;
    }
    case "A": {
      const href = $node.attr("href") || "";
      const text = $node.text().trim();
      if (!text) return;
      if (!href || href.startsWith("#")) {
        lines.push(text);
        return;
      }
      lines.push(`[${text}](${href})`);
      return;
    }
    case "STRONG":
    case "B": {
      const t = $node.text().trim();
      if (t) lines.push(`**${t}**`);
      return;
    }
    case "EM":
    case "I": {
      const t = $node.text().trim();
      if (t) lines.push(`*${t}*`);
      return;
    }
    case "CODE": {
      const t = $node.text();
      if (t) lines.push(`\`${t}\``);
      return;
    }
    case "PRE": {
      const t = $node.text();
      if (t) lines.push(`\n\`\`\`\n${t}\n\`\`\`\n`);
      return;
    }
    case "DETAILS": {
      // FAQ items — render summary as a heading, body as paragraph.
      const summary = $node.find("> summary").first().text().trim();
      if (summary) pushHeading(lines, summary, 4);
      $node.children().not("summary").each((_, c) => walkNode($, c, lines, depth + 1));
      lines.push("");
      return;
    }
    default: {
      node.children?.forEach((c) => walkNode($, c, lines, depth + 1));
      if (BLOCK_TAGS.has(tag)) lines.push("");
    }
  }
}

function pushHeading(lines, text, level) {
  if (!text) return;
  lines.push("");
  lines.push(`${"#".repeat(level)} ${text}`);
  lines.push("");
}

function pushBlock(lines, text) {
  if (!text) return;
  lines.push("");
  lines.push(text);
  lines.push("");
}

async function mirrorFile(htmlPath) {
  const html = await fs.readFile(htmlPath, "utf8");
  const $ = cheerio.load(html);

  const title = ($("head > title").first().text() || "").trim();
  const description = ($('meta[name="description"]').attr("content") || "").trim();
  const canonical = ($('link[rel="canonical"]').attr("href") || "").trim();
  const lang = ($("html").attr("lang") || "fr-BE").trim();

  // Drop everything that's not the main article-like content.
  $(
    [
      "nav",
      "header.hero-bn",
      "footer",
      "script",
      "style",
      "noscript",
      "iframe",
      ".skip-link",
      "#three-container",
      ".hero-vignette",
      ".hero-noise",
      ".hero-bn",
      "[data-mirror-skip]",
      '[aria-hidden="true"]',
    ].join(","),
  ).remove();

  const main = $("main").first();
  const root = main.length ? main[0] : $("body")[0];

  const body = htmlToMarkdown($, root);

  const relUrl = canonical || pathToRoute(htmlPath);
  const frontmatter = [
    "---",
    `title: ${jsonSafe(title)}`,
    `description: ${jsonSafe(description)}`,
    `url: ${jsonSafe(relUrl)}`,
    `locale: ${jsonSafe(lang)}`,
    `generated: ${new Date().toISOString()}`,
    "---",
    "",
  ].join("\n");

  const out = `${frontmatter}# ${title}\n\n${body}\n`;
  const mdPath = htmlPath.replace(/index\.html$/, "index.md");
  await fs.writeFile(mdPath, out, "utf8");
  return mdPath;
}

function pathToRoute(htmlPath) {
  const rel = path.relative(DIST, htmlPath);
  const route = "/" + rel.replace(/index\.html$/, "").split(path.sep).join("/");
  return `${SITE}${route}`;
}

function jsonSafe(s) {
  return JSON.stringify(s ?? "");
}

async function main() {
  // dist/ must exist (astro build runs before us).
  try {
    await fs.access(DIST);
  } catch {
    console.error(`[mirrors] ${DIST} not found — did astro build run?`);
    process.exit(1);
  }

  // Interactive surfaces (team chat, demo chat) have no static text content
  // worth mirroring — they're React-style chat scaffolds with empty bodies.
  const SKIP = ["/team/", "/demo-agents/"];

  const files = [];
  for await (const f of walk(DIST, (p) => p.endsWith("index.html"))) {
    const rel = "/" + path.relative(DIST, f).split(path.sep).join("/");
    if (SKIP.some((prefix) => rel.startsWith(prefix))) continue;
    files.push(f);
  }

  let count = 0;
  for (const f of files) {
    try {
      const md = await mirrorFile(f);
      count++;
      console.log(`[mirrors] ${path.relative(DIST, md)}`);
    } catch (err) {
      console.warn(`[mirrors] skipped ${f}: ${err.message}`);
    }
  }
  console.log(`[mirrors] ${count} markdown mirror(s) generated.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
