/**
 * Banana Navy hero — three.js spherical particle field with
 * scroll-driven dispersion, mouse interaction, and digit-glyph transition.
 * Ported from the original Banana Navy.html and packaged as a client
 * island. Mounts when #three-container becomes visible.
 */
import * as THREE from "three";

export function mountHeroParticles(container: HTMLElement) {
  const heroEl = container.closest<HTMLElement>(".hero-bn") || document.body;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  // Bone fog matches the light-mode body so far particles fade into the page.
  scene.fog = new THREE.FogExp2(0xf3f1ec, 0.012);

  const camera = new THREE.PerspectiveCamera(
    42,
    container.clientWidth / container.clientHeight,
    0.1,
    100,
  );
  camera.position.set(0, 0, 5.6);

  scene.add(new THREE.AmbientLight(0xc8d8f0, 2.6));
  const keyLight = new THREE.PointLight(0xffd538, 14, 50);
  keyLight.position.set(3, 3, 4);
  scene.add(keyLight);
  const fillLight = new THREE.PointLight(0x7b9fd4, 8, 50);
  fillLight.position.set(-4, -2, 3);
  scene.add(fillLight);
  const rimLight = new THREE.PointLight(0x9b6aaf, 10, 50);
  rimLight.position.set(0, 4, -3);
  scene.add(rimLight);
  const frontLight = new THREE.PointLight(0xe0e8ff, 9, 40);
  frontLight.position.set(0, 0, 6);
  scene.add(frontLight);

  const PARTICLE_COUNT = 22000;
  const BASE_R = 1.55;

  // Fibonacci sphere distribution — clean, even.
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const sizes = new Float32Array(PARTICLE_COUNT);
  const randoms = new Float32Array(PARTICLE_COUNT);
  const aDigit = new Float32Array(PARTICLE_COUNT);
  const phi = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const y0 = 1 - (i / (PARTICLE_COUNT - 1)) * 2;
    const r0 = Math.sqrt(1 - y0 * y0);
    const theta = phi * i;
    positions[i * 3] = Math.cos(theta) * r0 * BASE_R;
    positions[i * 3 + 1] = y0 * BASE_R;
    positions[i * 3 + 2] = Math.sin(theta) * r0 * BASE_R;

    // Obsidian palette on bone background:
    //  - ~96% deep volcanic black with subtle blue/violet inclusions
    //  - ~3% banana-yellow accent specks for warmth and brand pop
    //  - ~1% slightly brighter charcoal highlights
    const roll = Math.random();
    if (roll < 0.03) {
      // Banana yellow accent
      colors[i * 3] = 1.0;
      colors[i * 3 + 1] = 0.835;
      colors[i * 3 + 2] = 0.22;
    } else if (roll < 0.04) {
      // Charcoal highlight — slightly lifted obsidian
      colors[i * 3] = 0.26;
      colors[i * 3 + 1] = 0.26;
      colors[i * 3 + 2] = 0.30;
    } else {
      // Base obsidian — vary along blue/violet axis like real volcanic glass
      const tint = Math.random();
      const base = 0.05 + Math.random() * 0.07; // 0.05..0.12
      // Cool inclusions: a touch more blue/violet than red
      colors[i * 3] = base + tint * 0.02;
      colors[i * 3 + 1] = base + tint * 0.015;
      colors[i * 3 + 2] = base + tint * 0.05;
    }

    sizes[i] = 0.008 + Math.random() * 0.018;
    randoms[i] = Math.random();
    aDigit[i] = Math.random() < 0.5 ? 0.0 : 1.0;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
  geometry.setAttribute("aDigit", new THREE.BufferAttribute(aDigit, 1));

  function buildDigitAtlas(): THREE.CanvasTexture {
    const cvs = document.createElement("canvas");
    cvs.width = 256;
    cvs.height = 128;
    const ctx = cvs.getContext("2d")!;
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font =
      'bold 102px "IBM Plex Mono", "SF Mono", Menlo, Consolas, monospace';
    ctx.fillText("0", cvs.width * 0.25, cvs.height * 0.5);
    ctx.fillText("1", cvs.width * 0.75, cvs.height * 0.5);
    const tex = new THREE.CanvasTexture(cvs);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.needsUpdate = true;
    return tex;
  }
  const digitAtlas = buildDigitAtlas();

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: renderer.getPixelRatio() },
      uScroll: { value: 0 },
      uDigitAtlas: { value: digitAtlas },
      uMouse3D: { value: new THREE.Vector3(0, 0, 0) },
      uMouseActive: { value: 0 },
    },
    vertexShader: `
      attribute float aSize;
      attribute float aRandom;
      attribute float aDigit;
      varying vec3 vColor;
      varying float vAlpha;
      varying float vDigit;
      varying float vScroll;
      varying float vDepthFade;
      uniform float uTime;
      uniform float uPixelRatio;
      uniform float uScroll;
      uniform vec3 uMouse3D;
      uniform float uMouseActive;
      void main() {
        vColor = color;
        vDigit = aDigit;
        vScroll = uScroll;
        vec3 pos = position;
        float pulse = sin(uTime * 0.5 + aRandom * 6.28) * 0.025;
        pos += normalize(pos) * pulse;
        float scrollScatter = pow(uScroll, 1.25) * 1.2;
        pos += normalize(pos + vec3(0.001)) * scrollScatter * (0.55 + aRandom * 0.9);
        pos.y -= uScroll * (0.6 + aRandom * 0.5) * 0.4;
        vec3 toParticle = pos - uMouse3D;
        float xyDist = length(toParticle.xy);
        float fullDist = length(toParticle);
        float mouseRadius = 1.7;
        float influence = 1.0 - smoothstep(0.0, mouseRadius, xyDist);
        influence = influence * influence * uMouseActive;
        if (influence > 0.001) {
          vec3 pushDir = fullDist > 0.001 ? normalize(toParticle) : vec3(0.0, 1.0, 0.0);
          pos += pushDir * influence * 0.35;
          float swirlSpeed = uTime * 2.4 + aRandom * 6.28;
          float angle = influence * 0.32 * (1.0 + sin(swirlSpeed) * 0.3);
          float cosA = cos(angle), sinA = sin(angle);
          vec2 radial = pos.xy - uMouse3D.xy;
          vec2 rotated = vec2(radial.x*cosA - radial.y*sinA, radial.x*sinA + radial.y*cosA);
          pos.xy = uMouse3D.xy + rotated;
          pos.z += sin(swirlSpeed * 0.7 + aRandom * 3.14) * influence * 0.2;
        }
        vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
        float sizeBoost = 1.0 + uScroll * 3.0;
        gl_PointSize = aSize * uPixelRatio * 500.0 * sizeBoost / -mvPos.z;
        gl_PointSize = max(gl_PointSize, 1.2);
        gl_Position = projectionMatrix * mvPos;
        vAlpha = 0.92;
        // Distance from camera in view space — used to fade far particles
        // into the bone background so the sphere reads as volumetric, not a
        // hard silhouette.
        float dist = -mvPos.z;
        vDepthFade = 1.0 - smoothstep(3.0, 9.0, dist);
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vAlpha;
      varying float vDigit;
      varying float vScroll;
      varying float vDepthFade;
      uniform sampler2D uDigitAtlas;
      void main() {
        vec2 uv = gl_PointCoord;
        float d = length(uv - vec2(0.5));
        // Softer falloff so each dot reads as a polished obsidian bead
        // rather than a hard pixel — important on a light background.
        float dotMask = smoothstep(0.5, 0.12, d);
        vec2 atlasUV = vec2(uv.x * 0.5 + vDigit * 0.5, 1.0 - uv.y);
        float glyph = texture2D(uDigitAtlas, atlasUV).r;
        float mask = mix(dotMask, glyph, vScroll);
        if (mask < 0.02) discard;
        float alpha = mask * vAlpha * vDepthFade;
        // On scroll, particles desaturate slightly toward charcoal so the
        // digit-glyph state reads as clean type on bone.
        vec3 baseColor = mix(vColor, vColor * 0.55 + vec3(0.04), vScroll);
        gl_FragColor = vec4(baseColor, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending,
    vertexColors: true,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Mouse + scroll plumbing.
  const raycaster = new THREE.Raycaster();
  const mouseNDC = new THREE.Vector2(9999, 9999);
  const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  let mouseOnScreen = false;
  let mouseActiveSmooth = 0;
  const _intersectPoint = new THREE.Vector3();
  const _invMatrix = new THREE.Matrix4();
  const _localMouse = new THREE.Vector3();

  function onPointerMove(e: PointerEvent | MouseEvent) {
    const rect = container.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    if (typeof e.clientX !== "number" || typeof e.clientY !== "number") return;
    mouseOnScreen = true;
    mouseNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  }
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  document.addEventListener("mouseleave", () => {
    mouseOnScreen = false;
  });
  renderer.domElement.style.pointerEvents = "none";

  let scrollProgress = 0;
  function getScrollProgress() {
    const rect = heroEl.getBoundingClientRect();
    const scrolled = -rect.top;
    const range = heroEl.offsetHeight - window.innerHeight;
    return Math.min(Math.max(scrolled / Math.max(range, 1), 0), 1);
  }

  let _rotY = 0;
  let stopped = false;
  function animate() {
    if (stopped) return;
    requestAnimationFrame(animate);
    const elapsed = performance.now() / 1000;
    material.uniforms.uTime.value = elapsed;

    scrollProgress = getScrollProgress();
    material.uniforms.uScroll.value = scrollProgress;

    const targetZ = 5.6 - scrollProgress * 3.2;
    camera.position.z += (targetZ - camera.position.z) * 0.08;
    camera.position.y += (scrollProgress * -0.15 - camera.position.y) * 0.06;

    mouseActiveSmooth += ((mouseOnScreen ? 1 : 0) - mouseActiveSmooth) * 0.08;
    material.uniforms.uMouseActive.value = mouseActiveSmooth;
    raycaster.setFromCamera(mouseNDC, camera);
    raycaster.ray.intersectPlane(mousePlane, _intersectPoint);
    _invMatrix.copy(particles.matrixWorld).invert();
    _localMouse.copy(_intersectPoint).applyMatrix4(_invMatrix);
    material.uniforms.uMouse3D.value.copy(_localMouse);

    _rotY += 0.06 * (1 / 60);
    particles.rotation.y = _rotY;
    particles.rotation.x = Math.sin(elapsed * 0.18) * 0.05;

    const sinT = Math.sin(elapsed * 0.2);
    const cosT = Math.cos(elapsed * 0.2);
    keyLight.position.x = sinT * 4.5;
    keyLight.position.z = cosT * 4.5;

    renderer.render(scene, camera);
  }

  function resize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w === 0 || h === 0) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    material.uniforms.uPixelRatio.value = renderer.getPixelRatio();
  }
  window.addEventListener("resize", resize);
  resize();
  animate();

  // Respect prefers-reduced-motion — bail out and leave a static frame.
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduced.matches) {
    stopped = true;
    renderer.render(scene, camera);
  }
}

// Bootstrap when this script is loaded as an island.
const container = document.getElementById("three-container");
if (container) mountHeroParticles(container);
