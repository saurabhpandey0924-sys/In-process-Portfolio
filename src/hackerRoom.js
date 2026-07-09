import * as THREE from 'three';
import { EffectComposer }  from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass }      from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass }      from 'three/addons/postprocessing/ShaderPass.js';

// Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
//  HACKER DEN Ã¢â‚¬â€ Cinematic Intro matching reference image
//  - Cramped room, walls covered in newspaper clippings & cables
//  - Papers scattered on floor
//  - Hooded character, back to camera, typing
//  - 8 monitors surrounding character
//  - Over-the-shoulder camera angle (high + behind)
//  - Scroll zooms camera forward past character Ã¢â€ â€™ into center monitor
// Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â

export function initHackerRoom(canvas, onZoomComplete) {
  const isMobile = window.innerWidth < 768;

  // Ã¢â€â‚¬Ã¢â€â‚¬ RENDERER Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0d0b08);
  scene.fog = new THREE.FogExp2(0x0d0b08, isMobile ? 0.07 : 0.042);

  const camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.05, 60);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.55;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = !isMobile;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  function mkTex(w, h, fn) {
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    fn(c.getContext('2d'), w, h); return new THREE.CanvasTexture(c);
  }

  // Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
  //  TEXTURES
  // Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â

  // Ã¢â€â‚¬Ã¢â€â‚¬ Newspaper clipping wall texture Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  const newsTex = mkTex(2048, 2048, (ctx, W, H) => {
    // Base Ã¢â‚¬â€œ aged wall/tape mess
    ctx.fillStyle = '#9a8e78'; ctx.fillRect(0, 0, W, H);
    // Noise/grain
    for (let i = 0; i < 8000; i++) {
      const v = 80 + Math.random() * 60;
      ctx.fillStyle = `rgba(${v},${v-10},${v-20},0.12)`;
      ctx.fillRect(Math.random() * W, Math.random() * H, Math.random() * 3, Math.random() * 3);
    }
    // Newspaper/magazine clippings
    const clippings = 90 + (isMobile ? 0 : 40);
    for (let i = 0; i < clippings; i++) {
      const cx = Math.random() * W, cy = Math.random() * H;
      const cw = 80 + Math.random() * 280, ch = 60 + Math.random() * 220;
      const angle = (Math.random() - 0.5) * 0.35;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(angle);
      // paper bg
      const lightness = 72 + Math.random() * 18;
      const warm = Math.random() > 0.3;
      ctx.fillStyle = warm ? `hsl(38,${20+Math.random()*25}%,${lightness}%)` : `hsl(0,0%,${lightness}%)`;
      ctx.fillRect(-cw/2, -ch/2, cw, ch);
      // shadow edge
      ctx.strokeStyle = 'rgba(0,0,0,0.25)'; ctx.lineWidth = 1; ctx.strokeRect(-cw/2, -ch/2, cw, ch);
      // headline bar
      ctx.fillStyle = `rgba(0,0,0,${0.55+Math.random()*0.35})`;
      ctx.fillRect(-cw/2+4, -ch/2+5, cw-8, 7+Math.random()*8);
      // body text lines
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      const lc = Math.floor(3+Math.random()*9);
      for (let l = 0; l < lc; l++) {
        const lw = (0.4+Math.random()*0.55)*(cw-12);
        ctx.fillRect(-cw/2+6, -ch/2+22+l*11, lw, 2.5);
      }
      // photo box (some clippings)
      if (Math.random() > 0.55) {
        const pw = 30+Math.random()*60, ph = 25+Math.random()*50;
        const px = -cw/2+6+Math.random()*(cw-pw-12), py = -ch/2+22+Math.random()*(ch-ph-28);
        ctx.fillStyle = `hsl(${180+Math.random()*60},25%,${30+Math.random()*30}%)`;
        ctx.fillRect(px, py, pw, ph);
      }
      ctx.restore();
    }
    // Tape strips
    for (let i = 0; i < 60; i++) {
      ctx.save(); ctx.translate(Math.random()*W, Math.random()*H);
      ctx.rotate((Math.random()-0.5)*Math.PI*2);
      ctx.fillStyle = `rgba(210,195,130,${0.35+Math.random()*0.3})`;
      ctx.fillRect(-18, -5, 36, 10);
      ctx.restore();
    }
    // Sticky notes (bright patches)
    for (let i = 0; i < 20; i++) {
      ctx.save(); ctx.translate(Math.random()*W, Math.random()*H);
      ctx.rotate((Math.random()-0.5)*0.15);
      const hues = [50,190,120,280];
      ctx.fillStyle = `hsla(${hues[i%4]},80%,70%,0.75)`;
      ctx.fillRect(-22,-22,44,44); ctx.restore();
    }
    // Cable shadows painted onto wall
    ctx.strokeStyle = 'rgba(20,15,10,0.6)'; ctx.lineCap = 'round';
    for (let i = 0; i < 22; i++) {
      ctx.lineWidth = 1.5+Math.random()*3;
      ctx.beginPath(); const sx=Math.random()*W, sy=Math.random()*H;
      ctx.moveTo(sx,sy);
      ctx.bezierCurveTo(sx+(-100+Math.random()*200),sy+(-50+Math.random()*150),
        sx+(-150+Math.random()*300),sy+(-100+Math.random()*300),
        sx+(-80+Math.random()*160),sy+(50+Math.random()*200));
      ctx.stroke();
    }
  });
  newsTex.wrapS = newsTex.wrapT = THREE.RepeatWrapping;

  // Ã¢â€â‚¬Ã¢â€â‚¬ Scattered papers floor texture Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  const floorTex = mkTex(1024, 1024, (ctx, W, H) => {
    ctx.fillStyle = '#1a1610'; ctx.fillRect(0, 0, W, H);
    // Grime
    for (let i=0;i<3000;i++){const v=15+Math.random()*18;ctx.fillStyle=`rgba(${v},${v-3},${v-6},0.2)`;ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*5,Math.random()*5);}
    // Scattered papers
    for (let i = 0; i < 80; i++) {
      ctx.save(); ctx.translate(Math.random()*W, Math.random()*H); ctx.rotate(Math.random()*Math.PI*2);
      const pw=40+Math.random()*110, ph=30+Math.random()*80;
      ctx.fillStyle=`hsl(38,${15+Math.random()*22}%,${58+Math.random()*22}%)`;
      ctx.fillRect(-pw/2,-ph/2,pw,ph);
      ctx.strokeStyle='rgba(0,0,0,0.2)';ctx.lineWidth=0.5;ctx.strokeRect(-pw/2,-ph/2,pw,ph);
      ctx.fillStyle='rgba(0,0,0,0.2)';
      for(let l=0;l<3;l++)ctx.fillRect(-pw/2+4,-ph/2+8+l*8,pw-8,2);
      ctx.restore();
    }
    // Cables on floor
    ctx.lineCap='round';
    for(let i=0;i<18;i++){
      ctx.lineWidth=1.5+Math.random()*3.5;
      ctx.strokeStyle=`rgb(${15+Math.random()*20},${12+Math.random()*15},${8+Math.random()*12})`;
      ctx.beginPath();const sx=Math.random()*W,sy=Math.random()*H;ctx.moveTo(sx,sy);
      ctx.bezierCurveTo(Math.random()*W,Math.random()*H,Math.random()*W,Math.random()*H,Math.random()*W,Math.random()*H);
      ctx.stroke();
    }
  });
  floorTex.wrapS=floorTex.wrapT=THREE.RepeatWrapping; floorTex.repeat.set(2,2);

  // Ã¢â€â‚¬Ã¢â€â‚¬ Ceiling Ã¢â‚¬â€ Galaxy / Nebula Projector Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  const ceilTex = mkTex(1024, 1024, (ctx, W, H) => {
    // Deep space base
    ctx.fillStyle = '#020412'; ctx.fillRect(0, 0, W, H);
    // Stars
    for (let i = 0; i < 600; i++) {
      const sx = Math.random() * W, sy = Math.random() * H, sr = Math.random() * 1.6;
      const sa = 0.4 + Math.random() * 0.6;
      ctx.beginPath(); ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220,240,255,${sa})`; ctx.fill();
    }
    // Nebula blobs Ã¢â‚¬â€ blue, teal, purple, magenta
    const nebColors = [
      [190, 80, 70, 0.22], [210, 90, 65, 0.20], [270, 70, 55, 0.25],
      [300, 80, 60, 0.20], [180, 100, 60, 0.18], [240, 75, 50, 0.22],
      [320, 85, 65, 0.16], [160, 90, 55, 0.19],
    ];
    for (let i = 0; i < 28; i++) {
      const bx = Math.random() * W, by = Math.random() * H;
      const br = 60 + Math.random() * 160;
      const [h, s, l, a] = nebColors[i % nebColors.length];
      const hv = h + (Math.random() - 0.5) * 30;
      const g = ctx.createRadialGradient(bx, by, 0, bx, by, br);
      g.addColorStop(0, `hsla(${hv},${s}%,${l}%,${a + Math.random() * 0.10})`);
      g.addColorStop(0.5, `hsla(${hv+20},${s}%,${l-10}%,${a * 0.5})`);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g; ctx.fillRect(bx - br, by - br, br * 2, br * 2);
    }
    // Bright nebula core patches
    [[W*0.3,H*0.4,80,'#0affff',0.12],[W*0.7,H*0.6,100,'#aa00ff',0.14],[W*0.5,H*0.3,60,'#00aaff',0.16],[W*0.2,H*0.7,70,'#ff00cc',0.10]]
      .forEach(([bx,by,br,col,a]) => {
        const g = ctx.createRadialGradient(bx,by,0,bx,by,br);
        g.addColorStop(0,col.replace(')',`,${a})`).replace('rgb','rgba')||`${col}${Math.round(a*255).toString(16).padStart(2,'0')}`); // fallback
        g.addColorStop(0, `rgba(${parseInt(col.slice(1,3),16)},${parseInt(col.slice(3,5),16)},${parseInt(col.slice(5,7),16)},${a})`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g; ctx.fillRect(bx-br,by-br,br*2,br*2);
      });
  });

  // Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
  //  ROOM GEOMETRY  (small, cramped: ~6m Ãƒâ€” 5m Ãƒâ€” 3.6m)
  // Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
  const roomW = 6.0, roomD = 7.0, roomH = 3.6;

  const wallMat = (tex, repeat=[1,1]) => {
    tex.repeat.set(...repeat); tex.wrapS=tex.wrapT=THREE.RepeatWrapping;
    return new THREE.MeshLambertMaterial({ map: tex });
  };

  // Floor
  const floorMesh = new THREE.Mesh(new THREE.PlaneGeometry(roomW, roomD+2), new THREE.MeshLambertMaterial({map:floorTex}));
  floorMesh.rotation.x=-Math.PI/2; floorMesh.position.set(0,0,0.5); scene.add(floorMesh);

  // Back wall (fully covered in newspaper)
  const bwTex = mkTex(2048,2048,(ctx,W,H)=>{ctx.drawImage(newsTex.image,0,0,W,H);});
  const backWall=new THREE.Mesh(new THREE.PlaneGeometry(roomW,roomH), wallMat(newsTex,[1.2,1.0]));
  backWall.position.set(0,roomH/2,-3.2); scene.add(backWall);

  // Left wall
  const leftWall=new THREE.Mesh(new THREE.PlaneGeometry(roomD,roomH), wallMat(newsTex,[1.4,1.0]));
  leftWall.rotation.y=Math.PI/2; leftWall.position.set(-roomW/2,roomH/2,-0.5); scene.add(leftWall);

  // Right wall
  const rightWall=new THREE.Mesh(new THREE.PlaneGeometry(roomD,roomH), wallMat(newsTex,[1.4,1.0]));
  rightWall.rotation.y=-Math.PI/2; rightWall.position.set(roomW/2,roomH/2,-0.5); scene.add(rightWall);

  // Ceiling Ã¢â‚¬â€ galaxy nebula (emissive so it glows in the dark room)
  const ceilMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(roomW + 1, roomD + 2),
    new THREE.MeshStandardMaterial({ map: ceilTex, emissive: new THREE.Color(0x0a0520), emissiveIntensity: 0.6, roughness: 1 })
  );
  ceilMesh.rotation.x = Math.PI / 2; ceilMesh.position.set(0, roomH, 0.5); scene.add(ceilMesh);

  // (no extra projector lights Ã¢â‚¬â€ only galaxy ceiling texture)

  // Front wall (where camera starts behind Ã¢â‚¬â€ partially open / dark)
  const frontWall=new THREE.Mesh(new THREE.PlaneGeometry(roomW,roomH), wallMat(newsTex,[1.0,0.9]));
  frontWall.rotation.y=Math.PI; frontWall.position.set(0,roomH/2,4.5); scene.add(frontWall);

  // Ã¢â€â‚¬Ã¢â€â‚¬ Desks Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  const darkWood=new THREE.MeshLambertMaterial({color:0x1e1812});
  // Left L-shaped desk
  const deskL1=new THREE.Mesh(new THREE.BoxGeometry(2.2,0.06,1.1),darkWood);
  deskL1.position.set(-1.8,1.0,-1.4); scene.add(deskL1);
  const deskL2=new THREE.Mesh(new THREE.BoxGeometry(0.8,0.06,2.0),darkWood.clone());
  deskL2.position.set(-2.6,1.0,-0.6); scene.add(deskL2);
  // Right desk
  const deskR=new THREE.Mesh(new THREE.BoxGeometry(2.2,0.06,1.1),darkWood.clone());
  deskR.position.set(1.8,1.0,-1.4); scene.add(deskR);
  // Center desk (main)
  const deskC=new THREE.Mesh(new THREE.BoxGeometry(1.8,0.06,1.0),darkWood.clone());
  deskC.position.set(0,1.0,-2.0); scene.add(deskC);
  // Desk legs
  [[[-0.8,0,-0.4],[0.8,0,-0.4],[-0.8,0,0.4],[0.8,0,0.4]],1].forEach(()=>{});
  [[-1.8,-0.8,-1.0],[-1.8,0.8,-1.0],[-1.8,-0.8,-2.0],[-1.8,0.8,-2.0],[1.8,-0.8,-1.0],[1.8,0.8,-1.0],[1.8,-0.8,-2.0],[1.8,0.8,-2.0],[-0.8,0,-1.6],[0.8,0,-1.6],[-0.8,0,-2.4],[0.8,0,-2.4]].forEach(([x,z,y])=>{
    if(Math.abs(x)<3&&Math.abs(z||0)<4){
      const leg=new THREE.Mesh(new THREE.BoxGeometry(0.05,1.0,0.05),darkWood.clone());
      leg.position.set(x,0.5,y===undefined?z:y); scene.add(leg);
    }
  });

  // Equipment on desks
  const eqMat=new THREE.MeshLambertMaterial({color:0x141210});
  // Old desktop PC towers
  [[-2.5,1.28,-0.8],[2.2,1.28,-0.9]].forEach(([x,y,z])=>{
    const tower=new THREE.Mesh(new THREE.BoxGeometry(0.22,0.56,0.38),eqMat.clone());
    tower.position.set(x,y,z); scene.add(tower);
    const led=new THREE.Mesh(new THREE.BoxGeometry(0.02,0.02,0.01),new THREE.MeshBasicMaterial({color:0x00ff44}));
    led.position.set(x+0.11,y+0.2,z-0.19); scene.add(led);
  });
  // Keyboard (main desk)
  const kb=new THREE.Mesh(new THREE.BoxGeometry(0.55,0.025,0.18),eqMat.clone());
  kb.position.set(0,1.03,-1.7); scene.add(kb);
  // Misc junk (boxes, papers on desks)
  [[-1.4,1.05,-1.0],[1.5,1.05,-1.2],[-2.2,1.05,-1.8]].forEach(([x,y,z])=>{
    const box=new THREE.Mesh(new THREE.BoxGeometry(0.12+Math.random()*0.18,0.08+Math.random()*0.12,0.10+Math.random()*0.14),new THREE.MeshLambertMaterial({color:0x181410}));
    box.position.set(x,y,z); scene.add(box);
  });
  // Phone on right desk
  const phone=new THREE.Mesh(new THREE.BoxGeometry(0.15,0.04,0.26),eqMat.clone());
  phone.position.set(2.0,1.04,-1.8); scene.add(phone);

  // Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
  //  CHARACTER Ã¢â‚¬â€ Hooded figure, back to camera, typing
  // Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
  const charGroup = new THREE.Group();
  const skin = new THREE.MeshLambertMaterial({color:0xb8946c});
  const hoodie = new THREE.MeshLambertMaterial({color:0x0f0f0f});
  const darkJeans = new THREE.MeshLambertMaterial({color:0x111825});
  const chairMat = new THREE.MeshLambertMaterial({color:0x0c0c0c});

  // Chair base
  const chairSeat=new THREE.Mesh(new THREE.BoxGeometry(0.62,0.06,0.58),chairMat);
  charGroup.add(chairSeat);
  const chairBack=new THREE.Mesh(new THREE.BoxGeometry(0.62,0.72,0.06),chairMat);
  chairBack.position.set(0,0.39,0.29); charGroup.add(chairBack);
  // Chair armrests
  [[-0.34,0.1,0],[0.34,0.1,0]].forEach(([x,y,z])=>{
    const arm=new THREE.Mesh(new THREE.BoxGeometry(0.06,0.05,0.44),chairMat);
    arm.position.set(x,y,z); charGroup.add(arm);
  });
  const chairBase=new THREE.Mesh(new THREE.CylinderGeometry(0.28,0.28,0.04,8),chairMat);
  chairBase.position.set(0,-0.52,0); charGroup.add(chairBase);
  const chairPole=new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.03,0.5,8),chairMat);
  chairPole.position.set(0,-0.27,0); charGroup.add(chairPole);

  // Legs (sitting pose)
  const lLeg=new THREE.Mesh(new THREE.BoxGeometry(0.18,0.08,0.5),darkJeans);
  lLeg.position.set(-0.17,-0.04,-0.26); charGroup.add(lLeg);
  const rLeg=new THREE.Mesh(new THREE.BoxGeometry(0.18,0.08,0.5),darkJeans.clone());
  rLeg.position.set(0.17,-0.04,-0.26); charGroup.add(rLeg);
  // Lower legs hanging
  const llLow=new THREE.Mesh(new THREE.BoxGeometry(0.16,0.42,0.15),darkJeans.clone());
  llLow.position.set(-0.17,-0.27,-0.5); charGroup.add(llLow);
  const rlLow=new THREE.Mesh(new THREE.BoxGeometry(0.16,0.42,0.15),darkJeans.clone());
  rlLow.position.set(0.17,-0.27,-0.5); charGroup.add(rlLow);

  // Torso (hoodie)
  const torso=new THREE.Mesh(new THREE.BoxGeometry(0.54,0.62,0.30),hoodie);
  torso.position.set(0,0.38,0); charGroup.add(torso);
  // Hoodie pocket
  const pocket=new THREE.Mesh(new THREE.BoxGeometry(0.22,0.14,0.01),new THREE.MeshLambertMaterial({color:0x0a0a0a}));
  pocket.position.set(0,0.16,-0.155); charGroup.add(pocket);

  // Neck
  const neck=new THREE.Mesh(new THREE.CylinderGeometry(0.07,0.08,0.10,8),skin);
  neck.position.set(0,0.74,0); charGroup.add(neck);
  // Head (back of head visible)
  const head=new THREE.Mesh(new THREE.SphereGeometry(0.175,10,10),skin);
  head.position.set(0,0.9,0.0); charGroup.add(head);
  // Hood covering head
  const hood=new THREE.Mesh(new THREE.SphereGeometry(0.205,10,8,0,Math.PI*2,0,Math.PI*0.7),new THREE.MeshLambertMaterial({color:0x0d0d0d,side:THREE.DoubleSide}));
  hood.position.set(0,0.9,0.04); hood.rotation.x=0.35; charGroup.add(hood);
  // Hood back drape
  const hoodDrape=new THREE.Mesh(new THREE.BoxGeometry(0.44,0.28,0.05),hoodie.clone());
  hoodDrape.position.set(0,0.82,0.17); charGroup.add(hoodDrape);

  // Left arm (reaching forward to keyboard Ã¢â‚¬â€ typing)
  const lArm=new THREE.Mesh(new THREE.BoxGeometry(0.13,0.14,0.44),hoodie.clone());
  lArm.position.set(-0.32,0.36,-0.16); lArm.rotation.x=0.45; charGroup.add(lArm);
  const lForearm=new THREE.Mesh(new THREE.BoxGeometry(0.11,0.12,0.35),hoodie.clone());
  lForearm.position.set(-0.38,0.15,-0.45); lForearm.rotation.x=-0.4; charGroup.add(lForearm);
  const lHand=new THREE.Mesh(new THREE.BoxGeometry(0.09,0.05,0.10),skin.clone());
  lHand.position.set(-0.42,0.04,-0.65); charGroup.add(lHand);

  // Right arm
  const rArm=new THREE.Mesh(new THREE.BoxGeometry(0.13,0.14,0.44),hoodie.clone());
  rArm.position.set(0.32,0.36,-0.16); rArm.rotation.x=0.45; charGroup.add(rArm);
  const rForearm=new THREE.Mesh(new THREE.BoxGeometry(0.11,0.12,0.35),hoodie.clone());
  rForearm.position.set(0.38,0.15,-0.45); rForearm.rotation.x=-0.4; charGroup.add(rForearm);
  const rHand=new THREE.Mesh(new THREE.BoxGeometry(0.09,0.05,0.10),skin.clone());
  rHand.position.set(0.42,0.04,-0.65); charGroup.add(rHand);

  // Position character: sitting at center desk, facing monitors
  charGroup.position.set(0.1, 1.0, -0.9);
  charGroup.rotation.y = 0; // facing -Z (toward monitors)
  scene.add(charGroup);

  // Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
  //  MONITORS Ã¢â‚¬â€ 8 screens wrapping around character
  // Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
  const screenFns = [
    // 0: Terminal
    (ctx,w,h)=>{
      ctx.fillStyle='#020a03';ctx.fillRect(0,0,w,h);
      const lines=['root@kali:~# ./exploit.py --target 192.168.1.10','[*] Connecting...','[+] Shell spawned: uid=0(root)','root@target:~# ls -la /etc/shadow','-rw------- 1 root root 1.2K shadow','root@target:~# cat /etc/shadow | crack','[*] Running hashcat...','[+] Password: s3cr3t!23','root@target:~# whoami && hostname','root   TARGET-SERVER-01','root@target:~# Ã¢â€“Å’'];
      lines.forEach((l,i)=>{ctx.fillStyle=l.startsWith('[')?'#0f5':l.startsWith('root@t')?'#00ff88':l.startsWith('-')?'#aaa':'#00cc33';ctx.font='10px monospace';ctx.fillText(l,6,18+i*17);});
      for(let y=0;y<h;y+=3){ctx.fillStyle='rgba(0,0,0,0.1)';ctx.fillRect(0,y,w,1);}
    },
    // 1: Camera surveillance
    (ctx,w,h)=>{
      ctx.fillStyle='#030303';ctx.fillRect(0,0,w,h);
      ['LOBBY CAM','STAIRWELL','ROOF ACCESS','SERVER RM'].forEach((label,i)=>{
        const gx=(i%2)*(w/2)+1,gy=Math.floor(i/2)*(h/2)+1,gw=w/2-3,gh=h/2-3;
        ctx.fillStyle=`hsl(0,0%,${6+Math.random()*5}%)`;ctx.fillRect(gx,gy,gw,gh);
        for(let n=0;n<80;n++){ctx.fillStyle=`rgba(255,255,255,${Math.random()*0.04})`;ctx.fillRect(gx+Math.random()*gw,gy+Math.random()*gh,1,1);}
        ctx.fillStyle='#0f4';ctx.font='8px monospace';ctx.fillText(label,gx+3,gy+12);
        ctx.beginPath();ctx.arc(gx+gw-8,gy+8,3,0,Math.PI*2);ctx.fillStyle='#f00';ctx.fill();
        ctx.strokeStyle='#333';ctx.lineWidth=1;ctx.strokeRect(gx,gy,gw,gh);
      });
    },
    // 2: Matrix rain
    (ctx,w,h)=>{
      ctx.fillStyle='#000300';ctx.fillRect(0,0,w,h);
      const C='Ã¯Â½Â¦Ã¯Â½Â§Ã¯Â½Â¨Ã¯Â½Â©Ã¯Â½ÂªÃ¯Â½Â«Ã¯Â½Â¬Ã¯Â½Â­Ã¯Â½Â®Ã¯Â½Â¯Ã¯Â½Â±Ã¯Â½Â²Ã¯Â½Â³Ã¯Â½Â´Ã¯Â½Âµ0123456789ABCDEF@#$%';
      for(let c=0;c<Math.floor(w/11);c++){
        const len=5+Math.floor(Math.random()*18),sy=Math.random()*h;
        for(let r=0;r<len;r++){const a=1-r/len;ctx.fillStyle=r===0?`rgba(190,255,190,${a})`:`rgba(0,${Math.floor(120+130*a)},0,${a})`;ctx.font='10px monospace';ctx.fillText(C[Math.floor(Math.random()*C.length)],c*11,sy+r*13);}
      }
    },
    // 3: Network map
    (ctx,w,h)=>{
      ctx.fillStyle='#020812';ctx.fillRect(0,0,w,h);
      ctx.fillStyle='#ff4444';ctx.font='bold 10px monospace';ctx.textAlign='center';ctx.fillText('Ã¢Å¡Â¡ LIVE ATTACK MAP',w/2,16);ctx.textAlign='left';
      const O=[w/2,h/2];const T=[[w*.1,h*.2],[w*.9,h*.2],[w*.15,h*.75],[w*.85,h*.7],[w*.5,h*.85],[w*.6,h*.2]];
      T.forEach(([tx,ty])=>{const g=ctx.createLinearGradient(O[0],O[1],tx,ty);g.addColorStop(0,'rgba(255,50,50,0.7)');g.addColorStop(1,'rgba(255,50,50,0)');ctx.beginPath();ctx.strokeStyle=g;ctx.lineWidth=1;ctx.moveTo(O[0],O[1]);ctx.lineTo(tx,ty);ctx.stroke();ctx.beginPath();ctx.arc(tx,ty,4,0,Math.PI*2);ctx.fillStyle='#ff3333';ctx.fill();});
      ctx.beginPath();ctx.arc(O[0],O[1],6,0,Math.PI*2);ctx.fillStyle='#00ff88';ctx.fill();
    },
    // 4: Code editor (VS Code style)
    (ctx,w,h)=>{
      ctx.fillStyle='#0d1117';ctx.fillRect(0,0,w,h);ctx.fillStyle='#161b22';ctx.fillRect(0,0,36,h);ctx.fillRect(0,0,w,22);
      ctx.fillStyle='#58a6ff';ctx.font='10px monospace';ctx.fillText(' main.py Ãƒâ€”',40,15);
      const rows=[['#d2a8ff','import ',' '],['#e6edf3','socket, sys'],['#d2a8ff','def '],['#79c0ff','pwn'],['#e6edf3','(ip, port):'],['#e6edf3','  buf = shellcode'],['#e6edf3','  s = socket.socket()'],['#e6edf3','  s.connect((ip,port))'],['#e6edf3','  s.send(buf)'],['#d2a8ff','  return '],['#79c0ff','True']];
      rows.forEach((parts,i)=>{let cx=40;const lineN=i+1;ctx.fillStyle='#30363d';ctx.font='9px monospace';ctx.fillText(String(lineN).padStart(2),42,38+i*16);parts.forEach(p=>{const col=p.startsWith('#')?p:'#e6edf3';if(p.startsWith('#'))return;ctx.fillStyle=col;ctx.font='10px monospace';ctx.fillText(p,cx,38+i*16);cx+=ctx.measureText(p).width;});});
    },
    // 5: Sys monitor bars
    (ctx,w,h)=>{
      ctx.fillStyle='#060810';ctx.fillRect(0,0,w,h);ctx.fillStyle='#4488ff';ctx.font='bold 9px monospace';ctx.textAlign='center';ctx.fillText('SYSMON',w/2,14);ctx.textAlign='left';
      [['CPU',0.88,'#f44'],['MEM',0.64,'#4af'],['NET',0.77,'#0fa'],['DISK',0.42,'#fa0']].forEach(([l,v,c],i)=>{const y=28+i*36;ctx.fillStyle='#7799aa';ctx.font='9px monospace';ctx.fillText(l,4,y+10);ctx.fillStyle='#0d1828';ctx.fillRect(38,y,w-50,14);ctx.fillStyle=c;ctx.shadowColor=c;ctx.shadowBlur=4;ctx.fillRect(38,y,(w-50)*v,14);ctx.shadowBlur=0;ctx.fillStyle='#ccc';ctx.fillText(Math.round(v*100)+'%',w-22,y+10);});
    },
    // 6: Crypto / Blockchain
    (ctx,w,h)=>{
      ctx.fillStyle='#07040f';ctx.fillRect(0,0,w,h);ctx.fillStyle='#aa44ff';ctx.font='bold 10px monospace';ctx.textAlign='center';ctx.fillText('Ã¢â€ºâ€œ BLOCKCHAIN',w/2,16);ctx.textAlign='left';
      [['BTC','$43,218','+2.3%','#f7931a'],['ETH','$2,891','-0.8%','#627eea'],['XMR','$148','+5.1%','#ff6600']].forEach(([s,v,c,col],i)=>{const y=30+i*70;ctx.fillStyle=col;ctx.font='bold 13px monospace';ctx.fillText(s,8,y+14);ctx.fillStyle='#dde';ctx.font='11px monospace';ctx.fillText(v,8,y+30);ctx.fillStyle=c.startsWith('+')?'#00ff88':'#ff4466';ctx.fillText(c,8,y+46);ctx.beginPath();ctx.strokeStyle=col;ctx.lineWidth=1.5;ctx.shadowColor=col;ctx.shadowBlur=5;for(let x=55;x<w-5;x+=3){const yp=y+28+Math.sin(x*0.1+i*2)*12;x===55?ctx.moveTo(x,yp):ctx.lineTo(x,yp);}ctx.stroke();ctx.shadowBlur=0;});
    },
    // 7: Log stream (the one the camera zooms into Ã¢â‚¬â€ CENTER)
    (ctx,w,h)=>{
      ctx.fillStyle='#020804';ctx.fillRect(0,0,w,h);
      ctx.fillStyle='#051408';ctx.fillRect(0,0,w,20);
      ctx.fillStyle='#00cc44';ctx.font='bold 10px monospace';ctx.fillText(' LIVE FEED Ã¢â‚¬â€ ALL SYSTEMS',8,14);
      const log=['[04:01:12] SSH root@10.0.0.3 Ã¢â‚¬â€ connected','[04:01:33] sudo priv-esc Ã¢â‚¬â€ SUCCESS uid=0','[04:01:44] Scanning 10.0.0.0/24...','[04:01:52] Open ports: 22,80,443,3306','[04:02:03] CVE-2024-0001 exploit sent','[04:02:08] SHELL RECEIVED Ã¢â‚¬â€ TARGET DOWN','[04:02:15] Exfil started Ã¢â‚¬â€ 2.3GB staging','[04:02:22] Moving laterally to .200','[04:02:35] Rootkit installed','[04:02:44] Cleaning logs...','[04:02:55] Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë† COMPLETE Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†'];
      log.forEach((l,i)=>{
        const col=l.includes('SUCCESS')||l.includes('SHELL')||l.includes('COMPLETE')?'#00ff44':l.includes('CVE')||l.includes('EXFIL')||l.includes('Rootkit')?'#ff4444':'#44bb44';
        ctx.fillStyle=col;ctx.font='9px monospace';ctx.fillText(l,6,30+i*18);
      });
      for(let y=0;y<h;y+=3){ctx.fillStyle='rgba(0,20,0,0.15)';ctx.fillRect(0,y,w,1);}
    },
  ];

  // Monitor configs: wrapping arc + high mounts matching reference image
  const monitorConfigs = [
    // Left wall monitors (high)
    {x:-2.85,y:2.35,z:-0.5, ry:Math.PI/2-0.2,   sw:1.05,sh:0.70, si:2, isCRT:true  },
    {x:-2.85,y:1.55,z:-1.4, ry:Math.PI/2-0.15,  sw:1.15,sh:0.75, si:1, isCRT:false },
    // Left desk monitors
    {x:-1.75,y:1.58,z:-1.85,ry:0.55,             sw:1.10,sh:0.72, si:4, isCRT:false },
    // Center monitors (what camera zooms into)
    {x:-0.5, y:1.62,z:-2.55,ry:0.15,             sw:1.22,sh:0.78, si:7, isCRT:false }, // <-- ZOOM TARGET
    {x: 0.7, y:1.62,z:-2.55,ry:-0.15,            sw:1.18,sh:0.76, si:0, isCRT:false },
    // Right desk monitors
    {x: 1.8, y:1.58,z:-2.0, ry:-0.50,            sw:1.10,sh:0.72, si:5, isCRT:false },
    // Right wall monitors
    {x: 2.85,y:1.60,z:-1.2, ry:-Math.PI/2+0.2,  sw:1.0, sh:0.68, si:3, isCRT:true  },
    {x: 2.85,y:2.30,z:-0.4, ry:-Math.PI/2+0.15, sw:1.0, sh:0.66, si:6, isCRT:false },
  ];

  const monMeshes=[], monLights=[];
  const ZOOM_TARGET_POS = new THREE.Vector3(-0.5, 1.62, -2.55); // center-left monitor

  monitorConfigs.slice(0, isMobile ? 4 : 8).forEach((cfg, idx) => {
    const { x,y,z, ry, sw,sh, si, isCRT } = cfg;
    // Draw screen
    const sc=document.createElement('canvas'); sc.width=640; sc.height=420;
    screenFns[si % screenFns.length](sc.getContext('2d'),640,420);
    const stx=new THREE.CanvasTexture(sc);

    const grp=new THREE.Group();

    if (isCRT) {
      // Boxy CRT monitor
      const body=new THREE.Mesh(new THREE.BoxGeometry(sw+0.22,sh+0.28,0.28),new THREE.MeshLambertMaterial({color:0x1a1712}));
      grp.add(body);
      const screenPanel=new THREE.Mesh(new THREE.PlaneGeometry(sw,sh),new THREE.MeshLambertMaterial({map:stx,emissive:new THREE.Color(0x002020),emissiveIntensity:0.5}));
      screenPanel.position.z=0.145; grp.add(screenPanel);
      const baseC=new THREE.Mesh(new THREE.BoxGeometry(sw+0.1,0.05,0.22),new THREE.MeshLambertMaterial({color:0x151310}));
      baseC.position.y=-(sh/2+0.17); grp.add(baseC);
    } else {
      // Flat panel
      const bezel=new THREE.Mesh(new THREE.BoxGeometry(sw+0.06,sh+0.055,0.048),new THREE.MeshLambertMaterial({color:0x0a0c0f}));
      grp.add(bezel);
      const screenPanel=new THREE.Mesh(new THREE.PlaneGeometry(sw,sh),new THREE.MeshLambertMaterial({map:stx,emissive:new THREE.Color(0x001828),emissiveIntensity:0.38}));
      screenPanel.position.z=0.025; grp.add(screenPanel);
      const standA=new THREE.Mesh(new THREE.BoxGeometry(0.05,0.22,0.05),new THREE.MeshLambertMaterial({color:0x0e1015}));
      standA.position.y=-(sh/2+0.14); grp.add(standA);
      const standB=new THREE.Mesh(new THREE.BoxGeometry(0.32,0.03,0.18),new THREE.MeshLambertMaterial({color:0x0c0e13}));
      standB.position.y=-(sh/2+0.26); grp.add(standB);
    }

    grp.position.set(x,y,z); grp.rotation.y=ry;
    scene.add(grp); monMeshes.push({screen:grp.children[1]});

    // Monitor emits soft coloured light â€” low enough to not show as wall glow spots
    const monCol = idx===3 ? 0x44ffdd : idx===4 ? 0x00aaff : idx%2===0 ? 0x0077ee : 0x00ccaa;
    const ml = new THREE.PointLight(monCol, isMobile ? 0.6 : 1.4, 5.5);
    ml.position.set(x, y, z + 0.5 * Math.cos(ry)); ml.position.x += 0.5 * Math.sin(ry);
    scene.add(ml); monLights.push({light:ml, base: idx===3 ? 1.8 : 1.4, phase:idx*0.7});
  });

  // Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
  //  LIGHTING
  // Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
  // Ã¢â€â‚¬Ã¢â€â‚¬ Warm ceiling incandescent bulb (matches reference image bright warm glow) Ã¢â€â‚¬Ã¢â€â‚¬
  const bulbLight = new THREE.PointLight(0xffcc77, 6.5, 14);
  bulbLight.position.set(0, 3.45, 0.5); scene.add(bulbLight);
  // Second bulb slightly back for even ceiling coverage
  const bulbLight2 = new THREE.PointLight(0xffdd99, 4.0, 10);
  bulbLight2.position.set(0, 3.45, -1.5); scene.add(bulbLight2);
  // Bare bulb geometry REMOVED â€” light still works via PointLight, no visible orb
  // Cord (very thin, barely visible)
  const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.3), new THREE.MeshLambertMaterial({ color: 0x0a0a0a }));
  cord.position.set(0, 3.6, 0.5); scene.add(cord);

  // Ã¢â€â‚¬Ã¢â€â‚¬ Ambient Ã¢â‚¬â€ warm room fill Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  scene.add(new THREE.AmbientLight(0x3a2e1a, 3.5));

  // Ã¢â€â‚¬Ã¢â€â‚¬ Monitor-area fill lights (blue screen glow bathing the room) Ã¢â€â‚¬Ã¢â€â‚¬
  // Strong blue/teal bounce from screen cluster toward character
  const screenFill1 = new THREE.PointLight(0x0088dd, 1.2, 6);
  screenFill1.position.set(0, 1.8, -1.8); scene.add(screenFill1);
  // Left-side screen fill
  const screenFill2 = new THREE.PointLight(0x0055aa, 1.0, 5);
  screenFill2.position.set(-2.0, 1.6, -1.0); scene.add(screenFill2);
  // Right-side screen fill  
  const screenFill3 = new THREE.PointLight(0x0055aa, 1.0, 5);
  screenFill3.position.set(2.0, 1.6, -1.0); scene.add(screenFill3);

  // Ã¢â€â‚¬Ã¢â€â‚¬ Extra ceiling bounce to light the wall newspaper clippings Ã¢â€â‚¬Ã¢â€â‚¬
  const ceilFill = new THREE.PointLight(0xffcc88, 1.5, 7);
  ceilFill.position.set(0, 3.3, -2); scene.add(ceilFill);

  // Ã¢â€â‚¬Ã¢â€â‚¬ Post-processing Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  let composer=null;
  if(!isMobile){
    try{
      composer=new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene,camera));
      const bloom=new UnrealBloomPass(new THREE.Vector2(window.innerWidth,window.innerHeight),0.70,0.35,0.78);
      composer.addPass(bloom);
      const grade=new ShaderPass({
        uniforms:{tDiffuse:{value:null}},
        vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
        fragmentShader:`uniform sampler2D tDiffuse;varying vec2 vUv;void main(){
          vec4 c=texture2D(tDiffuse,vUv);
          // Warm shadows, cool highlights
          float luma=dot(c.rgb,vec3(0.299,0.587,0.114));
          vec3 warm=vec3(1.06,0.98,0.88);vec3 cool=vec3(0.88,0.96,1.10);
          c.rgb*=mix(warm,cool,luma);
          c.rgb=(c.rgb-0.5)*1.05+0.5;
          vec2 uv2=vUv-.5;float vig=1.-dot(uv2,uv2)*1.8;
          c.rgb*=clamp(vig,0.,1.);
          gl_FragColor=c;}`
      });
      composer.addPass(grade);
    }catch(e){composer=null;}
  }

  // Dust
  const NDUST=isMobile?0:80;
  let dustGeo=null; const dustVel=[];
  if(NDUST>0){
    const dp=new Float32Array(NDUST*3);
    for(let i=0;i<NDUST;i++){dp[i*3]=(Math.random()-.5)*5;dp[i*3+1]=0.5+Math.random()*3;dp[i*3+2]=(Math.random()-.5)*6;dustVel.push({x:(Math.random()-.5)*.003,y:(Math.random()-.5)*.0015,z:(Math.random()-.5)*.003});}
    dustGeo=new THREE.BufferGeometry();dustGeo.setAttribute('position',new THREE.BufferAttribute(dp,3));
    scene.add(new THREE.Points(dustGeo,new THREE.PointsMaterial({size:0.018,color:0xaa8855,transparent:true,opacity:0.3,depthWrite:false,blending:THREE.AdditiveBlending})));
  }

  // Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
  //  CAMERA PATH Ã¢â‚¬â€ Over-the-shoulder, scroll-driven dolly
  //  Matches reference image: high behind character, one-point perspective
  // Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
  const KF=[
    // Start: high + slightly right behind character Ã¢â‚¬â€ matches reference image angle
    {pos:new THREE.Vector3(1.1,3.1,4.2),  look:new THREE.Vector3(-0.1,1.8,-0.5)},
    // Moving forward + lower
    {pos:new THREE.Vector3(0.5,2.4,2.5),  look:new THREE.Vector3(0,1.7,-1.2)},
    // Approaching character (just above/behind)
    {pos:new THREE.Vector3(0.1,1.9,0.8),  look:new THREE.Vector3(-0.3,1.62,-2.2)},
    // Moving past character toward monitors
    {pos:new THREE.Vector3(-0.2,1.68,-1.0),look:new THREE.Vector3(-0.5,1.62,-2.55)},
    // Zoom into center-left monitor screen
    {pos:new THREE.Vector3(-0.45,1.62,-2.05),look:new THREE.Vector3(-0.5,1.62,-2.56)},
  ];

  let tScroll=0,cScroll=0,zDone=false;
  const mouse={tx:0,ty:0,cx:0,cy:0};

  window.addEventListener('scroll',()=>{const mx=document.documentElement.scrollHeight-window.innerHeight;tScroll=mx>0?window.scrollY/mx:0;},{passive:true});
  window.addEventListener('mousemove',e=>{mouse.tx=(e.clientX/window.innerWidth-.5)*2;mouse.ty=(e.clientY/window.innerHeight-.5)*2;});

  function ss(t){return t*t*(3-2*t);}
  function lv(a,b,t){return new THREE.Vector3(a.x+(b.x-a.x)*t,a.y+(b.y-a.y)*t,a.z+(b.z-a.z)*t);}

  function updateCamera(p){
    const c=Math.max(0,Math.min(1,p));
    let pos,look;
    const segs=[[0,0.25],[0.25,0.5],[0.5,0.75],[0.75,1.0]];
    const ki=Math.min(3,Math.floor(c/0.25));
    const t=ss((c-ki*0.25)/0.25);
    pos=lv(KF[ki].pos,KF[ki+1].pos,t);
    look=lv(KF[ki].look,KF[ki+1].look,t);
    if(ki===3&&t>=0.95&&!zDone){zDone=true;setTimeout(()=>{if(onZoomComplete)onZoomComplete();},250);}
    // Parallax fades as we get close
    const par=Math.max(0,1-c*3)*0.08;
    camera.position.set(pos.x+mouse.cx*par,pos.y,pos.z);
    camera.lookAt(look);
  }

  window.addEventListener('resize',()=>{
    camera.aspect=window.innerWidth/window.innerHeight;camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setPixelRatio(isMobile?1:Math.min(window.devicePixelRatio,2));
    if(composer)composer.setSize(window.innerWidth,window.innerHeight);
  });

  // Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
  //  ANIMATION LOOP
  // Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
  const clock=new THREE.Clock(); let fc=0;

  function animate(){
    requestAnimationFrame(animate); fc++;
    const dt=clock.getDelta(),t=clock.getElapsedTime();

    cScroll+=(tScroll-cScroll)*0.04;
    mouse.cx+=(mouse.tx-mouse.cx)*0.06;mouse.cy+=(mouse.ty-mouse.cy)*0.06;
    updateCamera(cScroll);

    // Typing animation: hands bob alternately
    lHand.position.y=0.04+Math.sin(t*9)*0.008;
    rHand.position.y=0.04-Math.sin(t*9)*0.008;
    // Subtle head nod
    head.position.y=0.9+Math.sin(t*1.1)*0.004;

    // Monitor glow pulse Ã¢â‚¬â€ stronger emissive so screens light up the room
    monMeshes.forEach(({screen},i)=>{if(screen&&screen.material)screen.material.emissiveIntensity=0.55+0.18*Math.sin(t*1.2+i*0.6);});
    monLights.forEach(({light,base,phase})=>{
      light.intensity=base*(0.88+0.12*Math.sin(t*2.1+phase));
      if(Math.random()<0.001){const s=light.intensity;light.intensity=base*0.2;setTimeout(()=>light.intensity=s,50+Math.random()*80);}
    });
    // Bulb flicker (warm incandescent feel)
    bulbLight.intensity=6.5+0.4*Math.sin(t*0.6)+0.15*Math.sin(t*7.3);
    bulbLight2.intensity=4.0+0.2*Math.sin(t*0.5+1.2);


    // Dust
    if(dustGeo&&fc%2===0){
      const da=dustGeo.getAttribute('position').array;
      for(let i=0;i<NDUST;i++){da[i*3]+=dustVel[i].x;da[i*3+1]+=dustVel[i].y;da[i*3+2]+=dustVel[i].z;if(da[i*3+1]>3.5)da[i*3+1]=0.5;if(da[i*3+1]<0.4)da[i*3+1]=3.2;if(Math.abs(da[i*3])>3)dustVel[i].x*=-1;if(Math.abs(da[i*3+2])>4)dustVel[i].z*=-1;}
      dustGeo.getAttribute('position').needsUpdate=true;
    }

    if(composer){composer.render();}else{renderer.render(scene,camera);}
  }

  animate();
  return {getScrollProgress:()=>cScroll};
}

