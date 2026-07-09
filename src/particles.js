import * as THREE from 'three';

export function initParticles(canvas) {
  // =============================================
  // AI CIRCUIT MIND — Premium 3D Background
  // Living circuit board with pulsing electricity
  // =============================================

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.035);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
  camera.position.set(0, 0, 18);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  // ─── COLOR PALETTE ───────────────────────────────
  const C_CYAN    = new THREE.Color(0x00f0ff);
  const C_PURPLE  = new THREE.Color(0x8b5cf6);
  const C_GREEN   = new THREE.Color(0x00ff88);
  const C_GOLD    = new THREE.Color(0xffd700);

  // ─── CIRCUIT NODE NETWORK ─────────────────────────
  const NODE_COUNT = 90;
  const GRID_W = 28;
  const GRID_H = 18;
  const GRID_D = 14;

  const nodes = [];

  for (let i = 0; i < NODE_COUNT; i++) {
    const gx = Math.floor(Math.random() * 9) - 4;
    const gy = Math.floor(Math.random() * 6) - 3;
    const gz = Math.floor(Math.random() * 5) - 2;

    nodes.push({
      pos: new THREE.Vector3(
        gx * (GRID_W / 9) + (Math.random() - 0.5) * 1.2,
        gy * (GRID_H / 6) + (Math.random() - 0.5) * 1.2,
        gz * (GRID_D / 5) + (Math.random() - 0.5) * 1.0
      ),
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.5 + Math.random() * 2.0,
      color: [C_CYAN, C_PURPLE, C_GREEN, C_GOLD][Math.floor(Math.random() * 4)],
      size: 0.08 + Math.random() * 0.14,
      type: Math.random() > 0.7 ? 'hub' : 'node',
    });
  }

  // ─── NODE GEOMETRY (Points) ───────────────────────
  const nodePosArr  = new Float32Array(NODE_COUNT * 3);
  const nodeColArr  = new Float32Array(NODE_COUNT * 3);
  const nodeSizeArr = new Float32Array(NODE_COUNT);

  nodes.forEach((n, i) => {
    nodePosArr[i * 3]     = n.pos.x;
    nodePosArr[i * 3 + 1] = n.pos.y;
    nodePosArr[i * 3 + 2] = n.pos.z;
    nodeColArr[i * 3]     = n.color.r;
    nodeColArr[i * 3 + 1] = n.color.g;
    nodeColArr[i * 3 + 2] = n.color.b;
    nodeSizeArr[i] = n.type === 'hub' ? 18.0 : 10.0;
  });

  const nodeGeo = new THREE.BufferGeometry();
  nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePosArr, 3));
  nodeGeo.setAttribute('aColor',   new THREE.BufferAttribute(nodeColArr, 3));
  nodeGeo.setAttribute('size',     new THREE.BufferAttribute(nodeSizeArr, 1));

  // Create glowing dot texture
  const dotTex = (() => {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0.0,  'rgba(255,255,255,1.0)');
    g.addColorStop(0.15, 'rgba(180,255,255,0.9)');
    g.addColorStop(0.4,  'rgba(0,240,255,0.5)');
    g.addColorStop(0.7,  'rgba(100,50,255,0.15)');
    g.addColorStop(1.0,  'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  })();

  const nodeMat = new THREE.ShaderMaterial({
    uniforms: { uTexture: { value: dotTex } },
    vertexShader: `
      attribute float size;
      attribute vec3 aColor;
      varying vec3 vColor;
      void main() {
        vColor = aColor;
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPos.z);
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      uniform sampler2D uTexture;
      varying vec3 vColor;
      void main() {
        vec4 texColor = texture2D(uTexture, gl_PointCoord);
        gl_FragColor = vec4(vColor, 1.0) * texColor;
        if (gl_FragColor.a < 0.01) discard;
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const nodePoints = new THREE.Points(nodeGeo, nodeMat);
  scene.add(nodePoints);

  // ─── CIRCUIT TRACES (EDGES) ───────────────────────
  const MAX_CONNECTIONS = 200;
  const MAX_DIST = 7.5;
  const edges = [];

  for (let i = 0; i < NODE_COUNT; i++) {
    let connections = 0;
    const maxConn = nodes[i].type === 'hub' ? 6 : 3;
    for (let j = i + 1; j < NODE_COUNT; j++) {
      if (edges.length >= MAX_CONNECTIONS) break;
      if (connections >= maxConn) break;
      const dist = nodes[i].pos.distanceTo(nodes[j].pos);
      if (dist < MAX_DIST) {
        const blendColor = nodes[i].color.clone().lerp(nodes[j].color, 0.5);
        edges.push({ a: i, b: j, dist, color: blendColor });
        connections++;
      }
    }
  }

  // Static circuit trace lines
  const tracePositions = new Float32Array(edges.length * 2 * 3);
  const traceColors    = new Float32Array(edges.length * 2 * 3);

  edges.forEach((e, i) => {
    const a = nodes[e.a].pos;
    const b = nodes[e.b].pos;
    const v1 = i * 6, v2 = i * 6 + 3;
    tracePositions[v1]   = a.x; tracePositions[v1+1] = a.y; tracePositions[v1+2] = a.z;
    tracePositions[v2]   = b.x; tracePositions[v2+1] = b.y; tracePositions[v2+2] = b.z;
    const dim = 0.08;
    traceColors[v1]   = e.color.r * dim; traceColors[v1+1] = e.color.g * dim; traceColors[v1+2] = e.color.b * dim;
    traceColors[v2]   = e.color.r * dim; traceColors[v2+1] = e.color.g * dim; traceColors[v2+2] = e.color.b * dim;
  });

  const traceGeo = new THREE.BufferGeometry();
  traceGeo.setAttribute('position', new THREE.BufferAttribute(tracePositions, 3));
  traceGeo.setAttribute('color',    new THREE.BufferAttribute(traceColors, 3));

  const traceMat = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const traceLines = new THREE.LineSegments(traceGeo, traceMat);
  scene.add(traceLines);

  // ─── ELECTRICITY PULSE PARTICLES ─────────────────
  const PULSE_COUNT = 60;
  const pulses = [];

  for (let i = 0; i < PULSE_COUNT; i++) {
    const edgeIdx = Math.floor(Math.random() * edges.length);
    pulses.push({
      edgeIdx,
      t: Math.random(),
      speed: 0.004 + Math.random() * 0.012,
      color: edges[edgeIdx].color.clone(),
      size: 0.06 + Math.random() * 0.10,
    });
  }

  const pulsePositions = new Float32Array(PULSE_COUNT * 3);
  const pulseColors    = new Float32Array(PULSE_COUNT * 3);
  const pulseSizes     = new Float32Array(PULSE_COUNT);

  const pulseGeo = new THREE.BufferGeometry();
  pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3));
  pulseGeo.setAttribute('aColor',   new THREE.BufferAttribute(pulseColors, 3));
  pulseGeo.setAttribute('size',     new THREE.BufferAttribute(pulseSizes, 1));

  const pulseMat = new THREE.ShaderMaterial({
    uniforms: { uTexture: { value: dotTex } },
    vertexShader: `
      attribute float size;
      attribute vec3 aColor;
      varying vec3 vColor;
      void main() {
        vColor = aColor;
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (400.0 / -mvPos.z);
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      uniform sampler2D uTexture;
      varying vec3 vColor;
      void main() {
        vec4 texColor = texture2D(uTexture, gl_PointCoord);
        gl_FragColor = vec4(vColor, 1.0) * texColor;
        if (gl_FragColor.a < 0.01) discard;
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const pulsePoints = new THREE.Points(pulseGeo, pulseMat);
  scene.add(pulsePoints);

  // ─── FLOATING DATA CHIPS (wireframe geometry) ────
  const chipGroup = new THREE.Group();
  const CHIP_COUNT = 12;
  const chipMeshes = [];

  for (let i = 0; i < CHIP_COUNT; i++) {
    const geo = Math.random() > 0.5
      ? new THREE.BoxGeometry(0.5 + Math.random() * 0.5, 0.08, 0.3 + Math.random() * 0.4)
      : new THREE.CylinderGeometry(0.15, 0.15, 0.08, 6);

    const mat = new THREE.MeshBasicMaterial({
      color: [0x00f0ff, 0x8b5cf6, 0x00ff88][Math.floor(Math.random() * 3)],
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(
      (Math.random() - 0.5) * GRID_W * 0.8,
      (Math.random() - 0.5) * GRID_H * 0.8,
      (Math.random() - 0.5) * GRID_D * 0.6
    );
    mesh.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
    mesh.userData = {
      rotX: (Math.random() - 0.5) * 0.004,
      rotY: (Math.random() - 0.5) * 0.006,
      floatOffset: Math.random() * Math.PI * 2,
      floatSpeed: 0.3 + Math.random() * 0.5,
      originY: mesh.position.y,
    };
    chipMeshes.push(mesh);
    chipGroup.add(mesh);
  }
  scene.add(chipGroup);

  // ─── BINARY RAIN PARTICLES (far background) ──────
  const RAIN_COUNT = 300;
  const rainPositions  = new Float32Array(RAIN_COUNT * 3);
  const rainColors     = new Float32Array(RAIN_COUNT * 3);
  const rainVelocities = [];

  for (let i = 0; i < RAIN_COUNT; i++) {
    rainPositions[i * 3]     = (Math.random() - 0.5) * 60;
    rainPositions[i * 3 + 1] = (Math.random() - 0.5) * 40;
    rainPositions[i * 3 + 2] = -10 - Math.random() * 30;
    const c = Math.random() > 0.5 ? C_CYAN : C_GREEN;
    const bright = 0.05 + Math.random() * 0.2;
    rainColors[i * 3]     = c.r * bright;
    rainColors[i * 3 + 1] = c.g * bright;
    rainColors[i * 3 + 2] = c.b * bright;
    rainVelocities.push(-(0.02 + Math.random() * 0.05));
  }

  const rainGeo = new THREE.BufferGeometry();
  rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
  rainGeo.setAttribute('color',    new THREE.BufferAttribute(rainColors, 3));

  const rainMat = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const rainPoints = new THREE.Points(rainGeo, rainMat);
  scene.add(rainPoints);

  // ─── MOUSE & SCROLL ──────────────────────────────
  const mouse  = { x: 0, y: 0, tx: 0, ty: 0 };
  const scroll = { cur: 0, tar: 0 };

  window.addEventListener('mousemove', (e) => {
    mouse.tx =  (e.clientX / window.innerWidth)  * 2 - 1;
    mouse.ty = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  window.addEventListener('scroll', () => {
    const maxS = document.documentElement.scrollHeight - window.innerHeight;
    scroll.tar = maxS > 0 ? window.scrollY / maxS : 0;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // ─── ANIMATION LOOP ───────────────────────────────
  const clock = new THREE.Clock();
  let time = 0;

  const animate = () => {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    time += delta;

    // Smooth inputs
    mouse.x  += (mouse.tx  - mouse.x)  * 0.06;
    mouse.y  += (mouse.ty  - mouse.y)  * 0.06;
    scroll.cur += (scroll.tar - scroll.cur) * 0.05;

    // ── Node pulse brightness ──
    const sizeAttr  = nodeGeo.getAttribute('size');
    const colAttrN  = nodeGeo.getAttribute('aColor');
    nodes.forEach((n, i) => {
      n.pulse += delta * n.pulseSpeed;
      const pv = 0.6 + 0.4 * Math.sin(n.pulse);
      sizeAttr.array[i] = (n.type === 'hub' ? 18 : 10) * pv;
      colAttrN.array[i * 3]     = n.color.r * pv;
      colAttrN.array[i * 3 + 1] = n.color.g * pv;
      colAttrN.array[i * 3 + 2] = n.color.b * pv;
    });
    sizeAttr.needsUpdate = true;
    colAttrN.needsUpdate = true;

    // ── Circuit trace brightness ──
    const tColAttr = traceGeo.getAttribute('color');
    edges.forEach((e, i) => {
      const pv = 0.04 + 0.06 * Math.abs(Math.sin(time * 0.4 + i * 0.3));
      const v1 = i * 6, v2 = i * 6 + 3;
      tColAttr.array[v1]   = e.color.r * pv; tColAttr.array[v1+1] = e.color.g * pv; tColAttr.array[v1+2] = e.color.b * pv;
      tColAttr.array[v2]   = e.color.r * pv; tColAttr.array[v2+1] = e.color.g * pv; tColAttr.array[v2+2] = e.color.b * pv;
    });
    tColAttr.needsUpdate = true;

    // ── Electricity pulses ──
    const pPosAttr  = pulseGeo.getAttribute('position');
    const pColAttr  = pulseGeo.getAttribute('aColor');
    const pSizeAttr = pulseGeo.getAttribute('size');

    pulses.forEach((p, i) => {
      p.t += p.speed;
      if (p.t > 1) {
        p.t = 0;
        const newEdge = Math.floor(Math.random() * edges.length);
        p.edgeIdx = newEdge;
        p.color   = edges[newEdge].color.clone();
        p.speed   = 0.004 + Math.random() * 0.012;
      }
      const e  = edges[p.edgeIdx];
      const a  = nodes[e.a].pos;
      const b  = nodes[e.b].pos;
      pPosAttr.array[i * 3]     = a.x + (b.x - a.x) * p.t;
      pPosAttr.array[i * 3 + 1] = a.y + (b.y - a.y) * p.t;
      pPosAttr.array[i * 3 + 2] = a.z + (b.z - a.z) * p.t;
      const glow = 0.5 + 2.5 * Math.sin(p.t * Math.PI);
      pColAttr.array[i * 3]     = p.color.r * glow;
      pColAttr.array[i * 3 + 1] = p.color.g * glow;
      pColAttr.array[i * 3 + 2] = p.color.b * glow;
      pSizeAttr.array[i] = p.size * glow * 80;
    });

    pPosAttr.needsUpdate  = true;
    pColAttr.needsUpdate  = true;
    pSizeAttr.needsUpdate = true;

    // ── Floating chips ──
    chipMeshes.forEach((chip) => {
      chip.rotation.x += chip.userData.rotX;
      chip.rotation.y += chip.userData.rotY;
      chip.position.y  = chip.userData.originY +
        Math.sin(time * chip.userData.floatSpeed + chip.userData.floatOffset) * 0.3;
    });

    // ── Rain fall ──
    const rPosAttr = rainGeo.getAttribute('position');
    for (let i = 0; i < RAIN_COUNT; i++) {
      rPosAttr.array[i * 3 + 1] += rainVelocities[i];
      if (rPosAttr.array[i * 3 + 1] < -22) rPosAttr.array[i * 3 + 1] = 22;
    }
    rPosAttr.needsUpdate = true;

    // ── Scene & camera ──
    scene.rotation.y = Math.sin(time * 0.015) * 0.12 + mouse.x * 0.08;
    scene.rotation.x = mouse.y * 0.05;
    camera.position.y = -scroll.cur * 6;
    camera.position.x =  mouse.x * 1.5;
    camera.lookAt(0, -scroll.cur * 6, 0);

    renderer.render(scene, camera);
  };

  animate();
}
