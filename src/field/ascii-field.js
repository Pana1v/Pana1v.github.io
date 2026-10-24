(function () {
  const cv = document.getElementById("field"), ctx = cv.getContext("2d");
  const RAMPMODE = cv.dataset.style === "ramp";
  const N = RAMPMODE ? 14000 : 2400, CW = RAMPMODE ? 6 : 13, CH = RAMPMODE ? 10 : 17;
  const ACC = cv.dataset.accent || "#FFB000", RAMP = ".:-=+*#%@", RAMP2 = " .`',:;-~=+<>*icoxz#%&@", GLITCH = "01<>/\\|[]{}#$%&?!*+=";
  // depth palette: far = deep teal, mid = pale grey, near = white
  const PAL = ["#1f4a43", "#2f6a5c", "#4f8a7a", "#8aa9a0", "#c4cdc8", "#eef1ee"];
  let lastNow = 0, burst = 0, burstX = 0, burstY = 0, sweepY = -1;
  const hash = (i, k) => { const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return x - Math.floor(x); };
  const Rn = [0, 1, 2, 3, 4].map((k) => { const a = new Float32Array(N); for (let i = 0; i < N; i++) a[i] = hash(i + 1, k + 1); return a; });
  const TAU = Math.PI * 2;

  // --- shapes: fn(i, t, out[x,y,z,w]); w >= 2 renders amber ---
  const WALLS = [[-1, -0.7, 1, -0.7], [1, -0.7, 1, 0.7], [1, 0.7, -1, 0.7], [-1, 0.7, -1, -0.7], [-0.2, -0.7, -0.2, 0.1], [0.3, 0.2, 1, 0.2], [-1, 0.25, -0.5, 0.25]];
  const WL = WALLS.map((w) => Math.hypot(w[2] - w[0], w[3] - w[1])), WT = WL.reduce((a, b) => a + b, 0);

  const NN = 14, NODES = [];
  for (let j = 0; j < NN; j++) {
    const y = 1 - (2 * (j + 0.5)) / NN, r = Math.sqrt(1 - y * y), ph = j * 2.399963, s = 0.8 + hash(j, 9) * 0.15;
    NODES.push([Math.cos(ph) * r * s, y * s, Math.sin(ph) * r * s]);
  }
  const EDGES = [];
  NODES.forEach((a, j) => {
    const d = NODES.map((b, k) => [k, Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2])]).filter((x) => x[0] !== j).sort((p, q) => p[1] - q[1]);
    for (let m = 0; m < 2; m++) { const k = d[m][0]; if (!EDGES.some((e) => (e[0] === k && e[1] === j))) EDGES.push([j, k]); }
  });

  const arm = { J: [], yaw: 0 }, ph = { a: 0, b: 0 };
  // net layers
  const LAY = [4, 7, 7, 5, 3], NPOS = [];
  LAY.forEach((n, l) => { for (let j = 0; j < n; j++) NPOS.push([-1 + (2 * l) / (LAY.length - 1), (j - (n - 1) / 2) * 0.24, 0, l]); });
  const NEDG = [];
  { let off = 0; for (let l = 0; l < LAY.length - 1; l++) { const n = LAY[l], m = LAY[l + 1]; for (let a = 0; a < n; a++) for (let b = 0; b < m; b++) NEDG.push([off + a, off + n + b, l]); off += n; } }
  // loss landscape + descent path
  const LF = (x, z) => 0.32 * (x * x + z * z) - 0.12 * Math.cos(3 * x) * Math.cos(3 * z) + 0.06 * x;
  const LG = (x, z) => [0.64 * x + 0.36 * Math.sin(3 * x) * Math.cos(3 * z) + 0.06, 0.64 * z + 0.36 * Math.cos(3 * x) * Math.sin(3 * z)];
  const GD = [];
  { let x = 0.9, z = 0.75, vx = 0, vz = 0; for (let s = 0; s < 90; s++) { GD.push([x, z]); const g = LG(x, z); vx = 0.82 * vx - 0.05 * g[0]; vz = 0.82 * vz - 0.05 * g[1]; x += vx; z += vz; } }
  // imitation demos: bezier from start to goal with per-demo noise
  const DEMO = [0, 1, 2, 3, 4, 5].map((k) => [[-0.85, -0.45 + (hash(k, 1) - 0.5) * 0.25, -0.3 + (hash(k, 2) - 0.5) * 0.5], [-0.4 + (hash(k, 3) - 0.5) * 0.4, 0.55 + (hash(k, 4) - 0.5) * 0.4, (hash(k, 5) - 0.5) * 0.6], [0.35 + (hash(k, 6) - 0.5) * 0.4, 0.5 + (hash(k, 7) - 0.5) * 0.4, (hash(k, 8) - 0.5) * 0.6], [0.8, -0.38, 0.25]]);
  const bez = (P, s, k) => { const u = 1 - s; return u * u * u * P[0][k] + 3 * u * u * s * P[1][k] + 3 * u * s * s * P[2][k] + s * s * s * P[3][k]; };
  const MEAN = [0, 1, 2, 3].map((p) => [0, 1, 2].map((k) => DEMO.reduce((a, d) => a + d[p][k], 0) / DEMO.length));
  const vis = { O: [] };
  // costmap + wavefront planner
  const GX = 26, GZ = 16, GN = GX * GZ, OBS = new Uint8Array(GN), DIST = new Int16Array(GN).fill(-1), PATH = [];
  [[5, 2, 7, 10], [12, 6, 14, 15], [18, 0, 20, 9], [9, 12, 16, 13], [22, 11, 25, 12]].forEach(([a, b, c, d]) => { for (let x = a; x <= c; x++) for (let z = b; z <= d; z++) OBS[z * GX + x] = 1; });
  const GS = 1 * GX + 1, GG = 13 * GX + 24;
  { const q = [GS]; DIST[GS] = 0; while (q.length) { const c = q.shift(), x = c % GX, z = (c / GX) | 0;
      [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dz]) => { const nx = x + dx, nz = z + dz, n = nz * GX + nx;
        if (nx >= 0 && nz >= 0 && nx < GX && nz < GZ && !OBS[n] && DIST[n] < 0) { DIST[n] = DIST[c] + 1; q.push(n); } }); }
    let c = GG; while (c !== GS && DIST[c] > 0) { PATH.unshift(c); const x = c % GX, z = (c / GX) | 0;
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const n = (z + dz) * GX + x + dx; if (x + dx >= 0 && x + dx < GX && z + dz >= 0 && z + dz < GZ && DIST[n] === DIST[c] - 1) { c = n; break; } } }
    PATH.unshift(GS); }
  const DMAX = DIST[GG], PIDX = new Int16Array(GN).fill(-1); PATH.forEach((c, k) => { PIDX[c] = k; });
  const cellXZ = (c) => [-1.2 + ((c % GX) + 0.5) * (2.4 / GX), -0.75 + (((c / GX) | 0) + 0.5) * (1.5 / GZ)];
  // ekf
  const LM = [[0.95, 0.1], [0.2, 0.55], [-0.6, 0.45], [-0.9, -0.2], [0.1, -0.5], [0.65, -0.45]];
  const epos = (s) => [Math.cos(s) * 0.85, Math.sin(2 * s) * 0.42];
  const esig = (s) => 0.035 + 0.13 * (((s * 0.9) % 1 + 1) % 1);
  // swarm formations (6 robots)
  const FORM = [
    [[-0.75, 0], [-0.45, 0], [-0.15, 0], [0.15, 0], [0.45, 0], [0.75, 0]],
    [[0, 0.45], [-0.3, 0.15], [0.3, 0.15], [-0.6, -0.15], [0.6, -0.15], [0, -0.1]],
    [0, 1, 2, 3, 4, 5].map((j) => [Math.cos(j * TAU / 6) * 0.5, Math.sin(j * TAU / 6) * 0.5])];
  const sw = { P: [] };
  // surface point on a box; returns true near an edge
  function boxPt(i, cx, cy, cz, hx, hy, hz, o) {
    const f = (Rn[0][i] * 6) | 0, a = Rn[1][i] * 2 - 1, b = Rn[2][i] * 2 - 1;
    if (f < 2) { o[0] = cx + (f ? hx : -hx); o[1] = cy + a * hy; o[2] = cz + b * hz; }
    else if (f < 4) { o[0] = cx + a * hx; o[1] = cy + (f === 2 ? hy : -hy); o[2] = cz + b * hz; }
    else { o[0] = cx + a * hx; o[1] = cy + b * hy; o[2] = cz + (f === 4 ? hz : -hz); }
    return Math.abs(a) > 0.92 || Math.abs(b) > 0.92;
  }
  const md = (x) => ((x % TAU) + TAU) % TAU;
  function wallPt(i, s, o) {
    let u = Rn[0][i] * WT, k = 0; while (u > WL[k] && k < WALLS.length - 1) { u -= WL[k]; k++; }
    const w = WALLS[k], f = u / WL[k];
    o[0] = (w[0] + (w[2] - w[0]) * f) * s; o[2] = (w[1] + (w[3] - w[1]) * f) * s;
  }
  const SHAPES = {
    sphere: { pitch: 0.2, fn(i, t, o) {
      const y = 1 - (2 * (i + 0.5)) / N, r = Math.sqrt(1 - y * y), ph = i * 2.399963;
      o[0] = Math.cos(ph) * r; o[1] = y; o[2] = Math.sin(ph) * r;
      o[3] = Math.abs(y - Math.sin(t * 0.8)) < 0.045 ? 2.2 : 1;
    } },
    map: { pitch: 0.85, fn(i, t, o) {
      const rx = 0.55 * Math.sin(t * 0.45), rz = 0.4 * Math.sin(t * 0.7);
      if (i < N * 0.55) {
        let u = Rn[0][i] * WT, s = 0; while (u > WL[s] && s < WALLS.length - 1) { u -= WL[s]; s++; }
        const w = WALLS[s], f = u / WL[s];
        o[0] = w[0] + (w[2] - w[0]) * f; o[2] = w[1] + (w[3] - w[1]) * f; o[1] = -0.3 + Rn[1][i] * 0.28; o[3] = 1;
      } else if (i < N * 0.95) {
        o[0] = Rn[0][i] * 2 - 1; o[2] = Rn[1][i] * 1.4 - 0.7; o[1] = -0.3;
        o[3] = (o[0] - rx) ** 2 + (o[2] - rz) ** 2 < 0.2 ? 1 : 0.3;
      } else if (i < N * 0.985) {
        const tt = t - Rn[0][i] * 5; o[0] = 0.55 * Math.sin(tt * 0.45); o[2] = 0.4 * Math.sin(tt * 0.7); o[1] = -0.3; o[3] = 1.7;
      } else {
        o[0] = rx + (Rn[0][i] - 0.5) * 0.12; o[2] = rz + (Rn[1][i] - 0.5) * 0.12; o[1] = -0.3 + Rn[2][i] * 0.1; o[3] = 2.5;
      }
    } },
    graph: { pitch: 0.3, fn(i, t, o) {
      const p = (t * 0.9) % (NN + 2), k = i % 6;
      if (k === 0) {
        const j = (i / 6 | 0) % NN, n = NODES[j];
        const e = boxPt(i, n[0], n[1], n[2], 0.06, 0.06, 0.06, o);
        o[3] = j <= p ? 2.2 : e ? 1.8 : 1.2;
      } else if (k < 4) {
        const e = EDGES[i % EDGES.length], a = NODES[e[0]], b = NODES[e[1]], u = Rn[0][i];
        o[0] = a[0] + (b[0] - a[0]) * u; o[1] = a[1] + (b[1] - a[1]) * u; o[2] = a[2] + (b[2] - a[2]) * u; o[3] = 0.55;
      } else {
        const e = (i / 6 | 0) % (NN - 1), a = NODES[e], b = NODES[e + 1], u = Rn[0][i];
        o[0] = a[0] + (b[0] - a[0]) * u; o[1] = a[1] + (b[1] - a[1]) * u; o[2] = a[2] + (b[2] - a[2]) * u;
        o[3] = e + u < p ? 2.2 : 0.25;
      }
    } },
    arm: { pitch: 0.15,
      prep(t) {
        const a1 = 1.1 + 0.25 * Math.sin(t * 0.7), a2 = -0.9 + 0.45 * Math.sin(t * 0.9 + 1), a3 = -0.6 + 0.3 * Math.sin(t * 1.3 + 2);
        const P2 = [[0, -0.75]];
        const L = [0.75, 0.6, 0.3], A = [a1, a1 + a2, a1 + a2 + a3];
        for (let k = 0; k < 3; k++) { const p = P2[k]; P2.push([p[0] + L[k] * Math.cos(A[k]), p[1] + L[k] * Math.sin(A[k])]); }
        arm.yaw = 0.7 * Math.sin(t * 0.35);
        const cy = Math.cos(arm.yaw), sy = Math.sin(arm.yaw);
        arm.J = P2.map(([r, y]) => [r * cy - 0.35, y, r * sy]);
        arm.dir = [Math.cos(A[2]) * cy, Math.sin(A[2]), Math.cos(A[2]) * sy];
        arm.side = [-sy, 0, cy];
      },
      fn(i, t, o) {
        const f = i / N;
        if (f < 0.12) {
          const a = Rn[0][i] * TAU, r = 0.3 * Math.sqrt(Rn[1][i]);
          o[0] = -0.35 + Math.cos(a) * r; o[2] = Math.sin(a) * r; o[1] = -0.9 + Rn[2][i] * 0.15; o[3] = 1;
        } else if (f < 0.8) {
          const s = Rn[0][i] < 0.45 ? 0 : Rn[0][i] < 0.82 ? 1 : 2, a = arm.J[s], b = arm.J[s + 1], u = Rn[1][i];
          o[0] = a[0] + (b[0] - a[0]) * u + (Rn[2][i] - 0.5) * 0.11; o[1] = a[1] + (b[1] - a[1]) * u + (Rn[3][i] - 0.5) * 0.11; o[2] = a[2] + (b[2] - a[2]) * u + (Rn[4][i] - 0.5) * 0.11; o[3] = 1;
        } else if (f < 0.88) {
          const j = arm.J[3], u = Rn[1][i] * 0.16, sd = (i % 2 ? 1 : -1) * 0.07;
          for (let k = 0; k < 3; k++) o[k] = j[k] + arm.dir[k] * u + arm.side[k] * sd;
          o[3] = 2.2;
        } else {
          const face = (Rn[0][i] * 6) | 0, a = Rn[1][i] * 2 - 1, b = Rn[2][i] * 2 - 1, h = 0.12;
          const p = face < 2 ? [face ? h : -h, a * h, b * h] : face < 4 ? [a * h, face === 2 ? h : -h, b * h] : [a * h, b * h, face === 4 ? h : -h];
          o[0] = 0.55 + p[0]; o[1] = -0.78 + p[1]; o[2] = 0.25 + p[2]; o[3] = 1.2;
        }
      } },
    cloud: { pitch: 0.55, fn(i, t, o) {
      const fr = i / N;
      if (fr < 0.42) { o[0] = Rn[0][i] * 2 - 1; o[2] = Rn[1][i] * 1.6 - 0.8; o[1] = -0.5; }
      else if (fr < 0.86) {
        const B = [[-0.45, -0.3, -0.2, 0.22, 0.2, 0.22], [0.2, -0.2, 0.3, 0.18, 0.3, 0.18], [0.55, -0.38, -0.35, 0.25, 0.12, 0.15]][i % 3];
        boxPt(i, B[0], B[1], B[2], B[3], B[4], B[5], o);
      } else { const a = Rn[0][i] * TAU; o[0] = -0.05 + Math.cos(a) * 0.06; o[2] = -0.5 + Math.sin(a) * 0.06; o[1] = -0.5 + Rn[1][i] * 0.95; }
      const q = Math.max(0, Math.min(1, (Math.sin(t * 0.6) + 0.3) * 1.4)), g = 0.11, nz = (1 - q) * 0.05;
      for (let k = 0; k < 3; k++) { let v = o[k] + (Rn[2 + k][i] - 0.5) * nz; v += (Math.round(v / g) * g - v) * q; o[k] = v; }
      const clip = 1.15 - ((t * 0.22) % 1) * 2.5;
      o[3] = o[0] > clip ? 0.18 : Math.abs(o[0] - clip) < 0.035 ? 2.2 : 1;
    } },
    bot: { pitch: 0.42, fn(i, t, o) {
      const fr = i / N;
      if (fr < 0.3) { const e = boxPt(i, 0, -0.2, 0, 0.62, 0.12, 0.4, o); o[3] = e ? 1.7 : 0.9; }
      else if (fr < 0.6) {
        const k = i % 4, wx = k < 2 ? -0.48 : 0.48, wz = k % 2 ? 0.48 : -0.48, r = 0.19, a = Rn[0][i] * TAU;
        const rim = Rn[2][i] < 0.6, rr = rim ? r : r * Math.sqrt(Rn[3][i]);
        o[0] = wx + Math.cos(a) * rr; o[1] = -0.4 + Math.sin(a) * rr; o[2] = wz + (rim ? (Rn[1][i] - 0.5) * 0.13 : (k % 2 ? 0.065 : -0.065));
        const sp = md(a + t * 4) % (TAU / 6);
        o[3] = sp < 0.14 ? 2.2 : rim ? 1.1 : 0.7;
      } else if (fr < 0.68) {
        const a = Rn[0][i] * TAU, top = Rn[1][i] < 0.3, r = top ? 0.1 * Math.sqrt(Rn[2][i]) : 0.1;
        o[0] = 0.3 + Math.cos(a) * r; o[2] = Math.sin(a) * r; o[1] = top ? 0.05 : -0.08 + Rn[2][i] * 0.13;
        o[3] = md(t * 5 - a) < 0.5 ? 2.2 : 1.2;
      } else if (fr < 0.82) {
        const a = Rn[0][i] * TAU, Rr = 1.05 + 0.1 * Math.sin(a * 5) + 0.05 * Math.sin(a * 13);
        o[0] = 0.3 + Math.cos(a) * Rr; o[2] = Math.sin(a) * Rr * 0.8; o[1] = -0.02 + (Rn[1][i] - 0.5) * 0.04;
        const d = md(t * 5 - a); o[3] = d < 0.9 ? 2.2 : d < 2.4 ? 0.8 : 0.12;
      } else {
        const k = i % 9, along = Rn[0][i] * 2.6 - 1.3, off = (t * 0.35) % 0.3;
        if (i % 2) { o[0] = along; o[2] = -1.2 + k * 0.3; } else { o[0] = -1.2 + k * 0.3 - off; o[2] = along; }
        o[1] = -0.6; o[3] = 0.4;
      }
    } },
    lidar: { pitch: 0.95, fn(i, t, o) {
      const fr = i / N, beam = (t * 1.6) % TAU;
      if (fr < 0.5) {
        wallPt(i, 1.1, o); o[1] = -0.2 + Rn[1][i] * 0.3;
        const d = md(beam - Math.atan2(o[2], o[0])); o[3] = d < 0.25 ? 2.2 : d < 1.8 ? 1.5 - d * 0.5 : 0.45;
      } else if (fr < 0.7) {
        const k = (i % 3) + 1, a = Rn[0][i] * TAU; o[0] = Math.cos(a) * k * 0.38; o[2] = Math.sin(a) * k * 0.38; o[1] = -0.2; o[3] = 0.4;
      } else if (fr < 0.8) {
        const u = Rn[0][i] * 1.3; o[0] = Math.cos(beam) * u; o[2] = Math.sin(beam) * u; o[1] = -0.1; o[3] = 1.5;
      } else if (fr < 0.92) {
        const k = i % 3, u = Rn[0][i] * 0.32; o[0] = 0; o[1] = -0.1; o[2] = 0; o[k] += u; o[3] = k === 0 ? 2.2 : 1.6;
      } else {
        const e = boxPt(i, 0, -0.15, 0, 0.13, 0.05, 0.09, o); o[3] = e ? 1.8 : 1;
      }
    } },
    phone: { pitch: 0.2, sway: true, prep(t) { ph.a = 0.5 * Math.sin(t * 0.9); ph.b = 0.35 * Math.sin(t * 1.3 + 1); },
      fn(i, t, o) {
        const fr = i / N, cx = -0.45;
        if (fr < 0.72) {
          if (fr < 0.55) {
            const e = boxPt(i, 0, 0, 0, 0.3, 0.58, 0.035, o);
            const scr = Math.abs(o[2]) > 0.03 && o[2] > 0 && Math.abs(o[0]) < 0.25 && Math.abs(o[1]) < 0.5;
            o[3] = e ? 1.8 : scr ? (((o[1] + 1) * 9) % 1 < 0.35 ? 1.4 : 0.5) : 1;
          } else { const k = i % 3, u = Rn[0][i] * 0.5; o[0] = 0; o[1] = 0; o[2] = 0; o[k] += u; o[3] = k === 0 ? 2.2 : 1.7; }
          const ca = Math.cos(ph.a), sa = Math.sin(ph.a), cb = Math.cos(ph.b), sb = Math.sin(ph.b);
          const y1 = o[1] * ca - o[2] * sa, z1 = o[1] * sa + o[2] * ca, x2 = o[0] * cb - y1 * sb, y2 = o[0] * sb + y1 * cb;
          o[0] = x2 + cx; o[1] = y2; o[2] = z1;
        } else if (fr < 0.9) {
          const k = i % 3, r = (t * 0.5 + k / 3) % 1, Rr = 0.4 + r * 0.85, a = (Rn[0][i] - 0.5) * 0.9;
          o[0] = cx + Math.cos(a) * Rr; o[1] = Math.sin(a) * Rr; o[2] = 0; o[3] = r < 0.75 ? 1.6 : 0.5;
        } else {
          const e = boxPt(i, 0.95, 0, 0, 0.16, 0.42, 0.2, o);
          o[3] = e ? 1.7 : ((o[1] + 1) * 6) % 1 < 0.2 ? 1.3 : 0.6;
          if (Math.abs(o[1] - 0.3) < 0.03 && Math.sin(t * 8) > 0) o[3] = 2.2;
        }
      } },
    book: { pitch: 0.75, fn(i, t, o) {
      const fr = i / N, u = Rn[0][i], v = Rn[1][i] * 2 - 1, Wd = 0.8, D = 0.55;
      const row = Math.floor((v + 1) * 8), text = u > 0.1 && u < 0.92 - hash(row, 3) * 0.35 && ((v + 1) * 8) % 1 < 0.4 && Math.abs(v) < 0.86;
      if (fr < 0.76) {
        const side = fr < 0.38 ? -1 : 1; o[0] = side * u * Wd; o[1] = -0.2 + 0.09 * Math.sin(Math.PI * u); o[2] = v * D; o[3] = text ? 1.5 : 0.55;
      } else if (fr < 0.97) {
        const p = (t * 0.35) % 1, th = (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2) * Math.PI;
        const bend = 0.12 * Math.sin(th) * Math.sin(Math.PI * u);
        o[0] = Math.cos(th) * u * Wd; o[1] = -0.2 + Math.sin(th) * u * Wd + bend; o[2] = v * D; o[3] = text ? 2.2 : 0.8;
      } else { o[0] = 0; o[1] = -0.22; o[2] = v * D; o[3] = 1.6; }
    } },
    vision: { pitch: 0.32, sway: true,
      prep(t) {
        vis.O = [[0.45 + 0.25 * Math.sin(t * 0.5), -0.12, 0.3 * Math.cos(t * 0.4), 0.15, 0],
                 [0.75, 0.15 + 0.12 * Math.sin(t * 0.8), -0.25 + 0.2 * Math.sin(t * 0.3), 0.14, 1],
                 [0.2, -0.32, -0.38 + 0.15 * Math.sin(t * 0.6 + 1), 0.1, 0]];
      },
      fn(i, t, o) {
        const fr = i / N, AX = -0.95, PX = -0.35, HY = 0.32, HZ = 0.42, sc = (X) => (PX - AX) / (X - AX);
        if (fr < 0.18) {
          const k = i % 8, u = Rn[0][i], cy = k & 1 ? HY : -HY, cz = k & 2 ? HZ : -HZ;
          if (k < 4) { o[0] = AX + (PX - AX) * u; o[1] = cy * u; o[2] = cz * u; }
          else { const e = k - 4, s = u * 2 - 1; o[0] = PX; if (e < 2) { o[1] = e ? HY : -HY; o[2] = s * HZ; } else { o[2] = e === 2 ? HZ : -HZ; o[1] = s * HY; } }
          o[3] = 1.5;
        } else if (fr < 0.4) {
          o[0] = PX; o[1] = (Rn[0][i] * 2 - 1) * HY; o[2] = (Rn[1][i] * 2 - 1) * HZ; o[3] = 0.3;
          for (const ob of vis.O) { const s = sc(ob[0]), dy = Math.abs(o[1] - ob[1] * s), dz = Math.abs(o[2] - ob[2] * s); if (dy < ob[3] * s && dz < ob[3] * s) o[3] = 0.9; }
        } else if (fr < 0.58) {
          const ob = vis.O[i % 3], s = sc(ob[0]), h = ob[3] * s * 1.1, e = (Rn[0][i] * 4) | 0, u = Rn[1][i] * 2 - 1;
          o[0] = PX - 0.01; o[1] = ob[1] * s + (e < 2 ? u * h : e === 2 ? h : -h); o[2] = ob[2] * s + (e < 2 ? (e ? h : -h) : u * h); o[3] = 2.2;
          if (Rn[2][i] < 0.12) { o[1] = ob[1] * s + h + 0.03; o[2] = ob[2] * s - h + Rn[3][i] * h * 0.9; }
        } else if (fr < 0.85) {
          const ob = vis.O[i % 3];
          if (ob[4]) { const y = Rn[0][i] * 2 - 1, r = Math.sqrt(1 - y * y), a = Rn[1][i] * TAU; o[0] = ob[0] + Math.cos(a) * r * ob[3]; o[1] = ob[1] + y * ob[3]; o[2] = ob[2] + Math.sin(a) * r * ob[3]; o[3] = 0.6; }
          else { const e = boxPt(i, ob[0], ob[1], ob[2], ob[3], ob[3], ob[3], o); o[3] = e ? 1.4 : 0.45; }
          if (hash(i, Math.floor(t * 3)) > 0.985) o[3] = 2.2;
        } else {
          const ob = vis.O[i % 3], u = Rn[0][i]; o[0] = AX + (ob[0] - AX) * u; o[1] = ob[1] * u; o[2] = ob[2] * u;
          o[3] = Math.abs(((t * 0.8 + (i % 3) * 0.3) % 1) - u) < 0.05 ? 1.8 : 0.3;
        }
      } },
    net: { pitch: 0.12, sway: true, fn(i, t, o) {
      const cyc = t * 0.45, ph_ = cyc % 1, back = Math.floor(cyc) % 2 === 1, L = LAY.length - 1;
      const front = back ? 1 - ph_ * 1.15 : ph_ * 1.15;
      if (i % 3 === 0) {
        const n = NPOS[(i / 3 | 0) % NPOS.length], a = Rn[0][i] * TAU, r = 0.065 * Math.sqrt(Rn[1][i]);
        o[0] = n[0]; o[1] = n[1] + Math.cos(a) * r; o[2] = Math.sin(a) * r;
        const lx = n[3] / L, act = hash((i / 3 | 0) % NPOS.length, Math.floor(cyc));
        const hit = back ? lx >= front : lx <= front;
        o[3] = hit ? (back ? 1.8 : act > 0.35 ? 2.2 : 1.4) : 1.3;
      } else {
        const e = NEDG[i % NEDG.length], a = NPOS[e[0]], b = NPOS[e[1]], u = Rn[0][i];
        o[0] = a[0] + (b[0] - a[0]) * u; o[1] = a[1] + (b[1] - a[1]) * u; o[2] = (Rn[1][i] - 0.5) * 0.02;
        const x = (e[2] + u) / L, wgt = hash(i % NEDG.length, 7);
        o[3] = Math.abs(x - front) < 0.035 ? (back ? 1.5 : 2.2) : (wgt > 0.8 ? 0.2 : 0);
      }
    } },
    loss: { pitch: 0.62, fn(i, t, o) {
      const fr = i / N, step = Math.floor((t * 14) % 110), cur_ = Math.min(GD.length - 1, step);
      if (fr < 0.82) {
        const x = Rn[0][i] * 2.2 - 1.1, z = Rn[1][i] * 2.2 - 1.1, y = LF(x, z);
        o[0] = x; o[2] = z; o[1] = y - 0.45; o[3] = ((y * 9) % 1 + 1) % 1 < 0.14 ? 1.3 : 0.45;
      } else if (fr < 0.95) {
        const s = Rn[0][i] * cur_, k = Math.floor(s), u = s - k, a = GD[k], b = GD[Math.min(GD.length - 1, k + 1)];
        const x = a[0] + (b[0] - a[0]) * u, z = a[1] + (b[1] - a[1]) * u; o[0] = x; o[2] = z; o[1] = LF(x, z) - 0.43; o[3] = 2.2;
      } else {
        const p = GD[cur_], a = Rn[0][i] * TAU, y = Rn[1][i] * 2 - 1, r = Math.sqrt(1 - y * y) * 0.06;
        o[0] = p[0] + Math.cos(a) * r; o[2] = p[1] + Math.sin(a) * r; o[1] = LF(p[0], p[1]) - 0.38 + y * 0.06; o[3] = 2.5;
      }
    } },
    demo: { pitch: 0.3, sway: true, fn(i, t, o) {
      const fr = i / N, p = (t * 0.3) % 1.25, s0 = Math.min(1, p);
      if (fr < 0.5) {
        const d = DEMO[i % DEMO.length], s = Rn[0][i];
        for (let k = 0; k < 3; k++) o[k] = bez(d, s, k); o[3] = 0.6;
      } else if (fr < 0.66) {
        const s = Rn[0][i] * s0; for (let k = 0; k < 3; k++) o[k] = bez(MEAN, s, k); o[3] = 2.2;
      } else if (fr < 0.72) {
        const a = Rn[0][i] * TAU, y = Rn[1][i] * 2 - 1, r = Math.sqrt(1 - y * y) * 0.07;
        o[0] = bez(MEAN, s0, 0) + Math.cos(a) * r; o[1] = bez(MEAN, s0, 1) + y * 0.07; o[2] = bez(MEAN, s0, 2) + Math.sin(a) * r; o[3] = 2.5;
      } else if (fr < 0.84) {
        const e = boxPt(i, 0.8, -0.48, 0.25, 0.16, 0.1, 0.16, o); o[3] = p > 1 ? 2.2 : e ? 1.7 : 0.9;
      } else if (fr < 0.9) {
        const e = boxPt(i, -0.85, -0.5, -0.3, 0.08, 0.08, 0.08, o); o[3] = e ? 1.6 : 1;
      } else {
        o[0] = Rn[0][i] * 2.2 - 1.1; o[2] = Rn[1][i] * 1.6 - 0.8; o[1] = -0.6; o[3] = 0.35;
      }
    } },
    plan: { pitch: 0.95, sway: true, fn(i, t, o) {
      const p = (t * 0.22) % 1.35, wave = p * DMAX * 1.05, pathK = Math.max(0, (p - 1) / 0.3) * PATH.length;
      const c = i % GN, xz = cellXZ(c), j = 2.4 / GX * 0.42;
      o[0] = xz[0] + (Rn[0][i] - 0.5) * j * 2; o[2] = xz[1] + (Rn[1][i] - 0.5) * j * 2;
      if (OBS[c]) { o[1] = -0.4 + Rn[2][i] * 0.32; o[3] = 1.8; return; }
      o[1] = -0.4; const d = DIST[c];
      if (PIDX[c] >= 0 && p > 1 && PIDX[c] <= pathK) { o[3] = 2.4; return; }
      if (c === GS || c === GG) { o[3] = 2.4; o[1] = -0.4 + Rn[2][i] * 0.1; return; }
      o[3] = i % 3 ? 0 : d < 0 ? 0 : d <= wave ? (Math.abs(d - wave) < 1.2 ? 2.1 : (d % 3 === 0 ? 1.1 : 0.2)) : 0.03;
    } },
    ekf: { pitch: 0.9, fn(i, t, o) {
      const fr = i / N, cur_ = t * 0.4, rp = epos(cur_);
      if (fr < 0.18) { const s = cur_ - Rn[0][i] * 5, q = epos(s); o[0] = q[0]; o[2] = q[1]; o[1] = -0.3; o[3] = 0.55; }
      else if (fr < 0.6) {
        const k = i % 9, s = cur_ - k * 0.55, q = epos(s), dq = epos(s + 0.01), ang = Math.atan2(dq[1] - q[1], dq[0] - q[0]);
        const sg = esig(s), a = Rn[0][i] * TAU, ex = Math.cos(a) * sg * 1.7, ez = Math.sin(a) * sg;
        o[0] = q[0] + ex * Math.cos(ang) - ez * Math.sin(ang); o[2] = q[1] + ex * Math.sin(ang) + ez * Math.cos(ang); o[1] = -0.3;
        o[3] = k === 0 ? 2.3 : Math.max(0.3, 1.3 - k * 0.12);
      } else if (fr < 0.72) {
        const l = LM[i % LM.length], a = Rn[0][i] * TAU; o[0] = l[0] + Math.cos(a) * 0.035; o[2] = l[1] + Math.sin(a) * 0.035; o[1] = -0.3 + Rn[1][i] * 0.32; o[3] = 1.5;
      } else if (fr < 0.84) {
        const l = LM[i % LM.length], dd = Math.hypot(l[0] - rp[0], l[1] - rp[1]), u = Rn[0][i];
        o[0] = rp[0] + (l[0] - rp[0]) * u; o[2] = rp[1] + (l[1] - rp[1]) * u; o[1] = -0.25;
        o[3] = dd < 0.75 ? (Math.abs(((t * 1.5) % 1) - u) < 0.08 ? 2.2 : 1.1) : 0;
      } else if (fr < 0.88) { const e = boxPt(i, rp[0], -0.27, rp[1], 0.05, 0.04, 0.05, o); o[3] = 2.5; }
      else { const k = i % 9, al = Rn[0][i] * 2.4 - 1.2; if (i % 2) { o[0] = al; o[2] = -0.8 + k * 0.2; } else { o[0] = -1.2 + k * 0.3; o[2] = al * 0.67; } o[1] = -0.31; o[3] = 0.18; }
    } },
    swarm: { pitch: 1.0, sway: true,
      prep(t) {
        const ph_ = t / 5, ia = Math.floor(ph_) % 3, ib = (ia + 1) % 3, fr = ph_ % 1, e = fr < 0.6 ? 0 : (() => { const m = (fr - 0.6) / 0.4; return m < 0.5 ? 4 * m * m * m : 1 - Math.pow(-2 * m + 2, 3) / 2; })();
        const cx = 0.35 * Math.sin(t * 0.3), cz = 0.2 * Math.sin(t * 0.5), hd = t * 0.25, ch = Math.cos(hd), sh = Math.sin(hd);
        sw.P = FORM[ia].map((a, j) => { const b = FORM[ib][j], x = a[0] + (b[0] - a[0]) * e, z = a[1] + (b[1] - a[1]) * e; return [cx + x * ch - z * sh, cz + x * sh + z * ch]; });
      },
      fn(i, t, o) {
        const fr = i / N;
        if (fr < 0.36) { const p = sw.P[i % 6], e = boxPt(i, p[0], -0.35, p[1], 0.1, 0.05, 0.1, o); o[3] = e ? 2.2 : 0.8; }
        else if (fr < 0.6) {
          const k = i % 15; let a = 0, b = 1, n = 0; outer: for (let x = 0; x < 6; x++) for (let y = x + 1; y < 6; y++) { if (n++ === k) { a = x; b = y; break outer; } }
          const A_ = sw.P[a], B_ = sw.P[b], dd = Math.hypot(A_[0] - B_[0], A_[1] - B_[1]), u = Rn[0][i];
          o[0] = A_[0] + (B_[0] - A_[0]) * u; o[2] = A_[1] + (B_[1] - A_[1]) * u; o[1] = -0.33;
          o[3] = dd < 0.62 ? (Math.abs(((t * 0.9 + k * 0.13) % 1) - u) < 0.06 ? 2.2 : 0.7) : 0;
        } else {
          const p = sw.P[i % 6], s = Rn[0][i] * 0.9, tt = t - s, dx = 0.35 * Math.sin(tt * 0.3) - 0.35 * Math.sin(t * 0.3), dz = 0.2 * Math.sin(tt * 0.5) - 0.2 * Math.sin(t * 0.5);
          if (fr < 0.78) { o[0] = p[0] + dx; o[2] = p[1] + dz; o[1] = -0.38; o[3] = 0.35 * (1 - s / 0.9); }
          else { const k = i % 11, al = Rn[0][i] * 2.4 - 1.2; if (i % 2) { o[0] = al; o[2] = -1 + k * 0.2; } else { o[0] = -1.2 + k * 0.24; o[2] = al * 0.85; } o[1] = -0.42; o[3] = 0.22; }
        }
      } },
    field: { pitch: 0.7, fn(i, t, o) {
      const f = i / N, bx = ((t * 0.25) % 2.8) - 1.4;
      if (f < 0.7) {
        const k = i % 180, row = k % 9, px = -1.2 + Math.floor(k / 9) * 0.125, z = -0.8 + row * 0.2, u = Rn[1][i];
        o[0] = px + Math.sin(t * 1.5 + px * 3 + row) * 0.03 * u; o[1] = -0.5 + u * 0.22; o[2] = z; o[3] = 1;
      } else if (f < 0.9) {
        o[0] = Rn[0][i] * 2.4 - 1.2; o[2] = Rn[1][i] * 1.8 - 0.9; o[1] = -0.5; o[3] = 0.45;
      } else {
        o[0] = bx + (Rn[0][i] - 0.5) * 0.22; o[1] = -0.45 + Rn[1][i] * 0.2; o[2] = 0.1 + (Rn[2][i] - 0.5) * 0.16; o[3] = 2.4;
      }
    } }
  };

  // --- render state ---
  let W = 0, H = 0, dpr = 1, cols = 0, rows = 0, den, amb, bg, dep, trl, trA;
  let cur = "sphere", nxt = "sphere", mStart = 0;
  let mx = 0, my = 0, smx = 0, smy = 0, px = -9999, py = -9999, cxF = 0.5, sclF = 1, secShape = "sphere";
  const A = [0, 0, 0, 0], B = [0, 0, 0, 0];

  function resize() {
    const r = cv.getBoundingClientRect();
    dpr = Math.min(2, window.devicePixelRatio || 1); W = r.width; H = r.height;
    cv.width = W * dpr; cv.height = H * dpr;
    cols = Math.ceil(W / CW); rows = Math.ceil(H / CH);
    den = new Float32Array(cols * rows); amb = new Float32Array(cols * rows); dep = new Float32Array(cols * rows); trl = new Float32Array(cols * rows); trA = new Float32Array(cols * rows);
    bg = document.createElement("canvas"); bg.width = cv.width; bg.height = cv.height;
    const b = bg.getContext("2d"); b.scale(dpr, dpr); b.fillStyle = "rgba(241,241,238,0.07)";
    const st = RAMPMODE ? 2 : 1; for (let r_ = 0; r_ < rows; r_ += st) for (let c = 0; c < cols; c += st) b.fillRect(c * CW + CW / 2, r_ * CH + CH / 2, 1, 1);
  }
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", (e) => {
    const r = cv.getBoundingClientRect();
    mx = (e.clientX / window.innerWidth) * 2 - 1; my = (e.clientY / window.innerHeight) * 2 - 1;
    px = e.clientX - r.left; py = e.clientY - r.top;
  });
  window.addEventListener("pointerleave", () => { px = py = -9999; });

  function setShape(k) { if (k === nxt) return; burst = 1; burstX = W * cxF; burstY = H * 0.52; sweepY = 0; window.dispatchEvent(new CustomEvent("field:shape", { detail: k })); cur = cur === nxt ? nxt : cur; nxt = k; mStart = performance.now(); }

  const BUCKETS = 6;
  function frame(now, once) {
    if (!cv.width || !W) resize();
    const t = now / 1000;
    if (now - mStart >= 1400) cur = nxt;
    const m = cur === nxt ? 1 : Math.min(1, (now - mStart) / 1400), e = m < 0.5 ? 4 * m * m * m : 1 - Math.pow(-2 * m + 2, 3) / 2;
    const SA = SHAPES[cur], SB = SHAPES[nxt];
    if (SA.prep) SA.prep(t); if (SB.prep && SB !== SA) SB.prep(t);
    smx += (mx - smx) * 0.05; smy += (my - smy) * 0.05;
    const swA = SA.sway ? 1 : 0, swB = SB.sway ? 1 : 0, sw_ = swA + (swB - swA) * e;
    const yaw = (t * 0.16) * (1 - sw_) + sw_ * (0.45 * Math.sin(t * 0.22) - 0.25) + smx * 0.7, pitch = SA.pitch + (SB.pitch - SA.pitch) * e + smy * 0.2;
    const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    cxF += ((parseFloat(cv.dataset.cx) || 0.5) - cxF) * 0.04;
    sclF += ((parseFloat(cv.dataset.scale) || 1) - sclF) * 0.04;
    const cx0 = W * cxF, cy0 = H * 0.52, scale = Math.min(W, H) * 1.05 * sclF, scatter = Math.sin(Math.PI * m) * 0.35;
    den.fill(0); amb.fill(0); dep.fill(0);
    const dt = Math.min(0.05, lastNow ? (now - lastNow) / 1000 : 0.016); lastNow = now;
    burst = Math.max(0, burst - dt * 0.7); if (sweepY >= 0) { sweepY += dt * 1.1; if (sweepY > 1.2) sweepY = -1; }
    const bR = (1 - burst) * Math.max(W, H) * 0.9;
    for (let i = 0; i < N; i++) {
      SA.fn(i, t, A);
      let x = A[0], y = A[1], z = A[2], w = A[3];
      if (m < 1) {
        SB.fn(i, t, B);
        x += (B[0] - x) * e; y += (B[1] - y) * e; z += (B[2] - z) * e; w += (B[3] - w) * e;
        if (scatter > 0.01) { x += (Rn[2][i] - 0.5) * scatter; y += (Rn[3][i] - 0.5) * scatter; z += (Rn[4][i] - 0.5) * scatter; }
      }
      const x1 = x * cy - z * sy, z1 = x * sy + z * cy, y1 = y * cp - z1 * sp, z2 = y * sp + z1 * cp;
      const s = scale / (z2 + 3);
      let sx = cx0 + x1 * s, syy = cy0 - y1 * s;
      const dx = sx - px, dy = syy - py, d2 = dx * dx + dy * dy;
      if (d2 < 14400) { const d = Math.sqrt(d2) || 1, push = (120 - d) * 0.55, sw2 = Math.sin(t * 6 - d * 0.08) * 6; sx += (dx / d) * (push + sw2) - (dy / d) * push * 0.35; syy += (dy / d) * (push + sw2) + (dx / d) * push * 0.35; }
      if (burst > 0) { const bx = sx - burstX, by = syy - burstY, bd = Math.hypot(bx, by) || 1, ring = Math.exp(-Math.pow((bd - bR) / 60, 2)) * burst * 40; sx += (bx / bd) * ring; syy += (by / bd) * ring; }
      const c = (sx / CW) | 0, r = (syy / CH) | 0;
      if (c < 0 || r < 0 || c >= cols || r >= rows) continue;
      const shade = 0.55 + 0.45 * (1 - (z2 + 1) / 2), idx = r * cols + c;
      if (w >= 1.9) amb[idx] += shade; else den[idx] += shade * w;
      dep[idx] = Math.max(dep[idx], shade);
    }
    // phosphor persistence for the accent layer
    for (let k = 0; k < trA.length; k++) { trA[k] = Math.max(trA[k] * (1 - dt * 2.6), amb[k] > 0.3 ? 1 : 0); trl[k] = Math.max(trl[k] * (1 - dt * 5), den[k] > 0.18 ? 0.5 : 0); }
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height); ctx.drawImage(bg, 0, 0);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = RAMPMODE ? "500 9px 'DM Mono', monospace" : "500 12px 'DM Mono', monospace"; ctx.textBaseline = "top";
    const flick = Math.floor(t * 4);
    if (RAMPMODE) {
      const sweepR = sweepY >= 0 ? (sweepY * rows) | 0 : -99, pxC = (px / CW) | 0, pyR = (py / CH) | 0, gl = Math.floor(t * 14);
      for (let b = 0; b < PAL.length; b++) {
        ctx.fillStyle = PAL[b];
        for (let idx = 0; idx < den.length; idx++) {
          const d = den[idx], rr = (idx / cols) | 0, cc = idx % cols;
          if (amb[idx] > 0) continue;
          if (d < 0.18) {
            // afterglow ghosts
            if (b === 0 && trl[idx] > 0.06) { ctx.globalAlpha = trl[idx]; ctx.fillText(".", cc * CW + 2, rr * CH); }
            continue;
          }
          const pb = Math.min(PAL.length - 1, Math.max(0, ((dep[idx] - 0.55) / 0.45 * PAL.length) | 0));
          if (pb !== b) continue;
          const v = Math.min(1, Math.sqrt(d / (9 * (N / 5200) * (CW * CH / 104) / (sclF * sclF))));
          let ch = RAMP2[Math.min(RAMP2.length - 1, 1 + ((v * (RAMP2.length - 1)) | 0))];
          const near = Math.abs(cc - pxC) < 7 && Math.abs(rr - pyR) < 4;
          if ((near && hash(idx, gl) > 0.55) || hash(idx, gl) > 0.998) ch = GLITCH[(hash(idx, gl + 3) * GLITCH.length) | 0];
          ctx.globalAlpha = 0.35 + 0.65 * v;
          if (Math.abs(rr - sweepR) < 2) { ctx.globalAlpha = 1; ctx.fillStyle = "#ffffff"; ctx.fillText(ch, cc * CW + 2, rr * CH); ctx.fillStyle = PAL[b]; continue; }
          ctx.fillText(ch, cc * CW + 2, rr * CH);
        }
      }
    } else
    for (let b = 0; b < BUCKETS; b++) {
      ctx.fillStyle = "#f1f1ee"; ctx.globalAlpha = 0.22 + (0.78 * (b + 1)) / BUCKETS;
      for (let idx = 0; idx < den.length; idx++) {
        const d = den[idx]; if (d < 0.18 || amb[idx] > 0) continue;
        const v = RAMPMODE ? Math.min(1, Math.sqrt(d / (9 * (N / 5200) * (CW * CH / 104) / (sclF * sclF)))) : Math.min(1, d / 2.4), bk = Math.min(BUCKETS - 1, (v * BUCKETS) | 0);
        if (bk !== b) continue;
        let ch;
        if (RAMPMODE) ch = RAMP[Math.min(8, (v * 9) | 0)];
        else { ch = v > 0.42 ? "1" : "0"; if (hash(idx, flick) > 0.97) ch = ch === "1" ? "0" : "1"; }
        ctx.fillText(ch, (idx % cols) * CW + 2, ((idx / cols) | 0) * CH);
      }
    }
    if (RAMPMODE) {
      ctx.fillStyle = ACC;
      for (let idx = 0; idx < trA.length; idx++) if (trA[idx] > 0.05 && amb[idx] <= 0.3) { ctx.globalAlpha = trA[idx] * 0.45; ctx.fillText(trA[idx] > 0.5 ? "+" : ".", (idx % cols) * CW + 2, ((idx / cols) | 0) * CH); }
      ctx.globalAlpha = 1; ctx.shadowColor = ACC; ctx.shadowBlur = 4;
      for (let idx = 0; idx < amb.length; idx++) if (amb[idx] > 0.3) ctx.fillText(amb[idx] > 3 ? "@" : amb[idx] > 1.6 ? "#" : amb[idx] > 0.9 ? "*" : "+", (idx % cols) * CW + 2, ((idx / cols) | 0) * CH);
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#ffffff"; ctx.globalAlpha = 0.9;
      for (let idx = 0; idx < amb.length; idx++) if (amb[idx] > 4) ctx.fillText("@", (idx % cols) * CW + 2, ((idx / cols) | 0) * CH);
      if (burst > 0) { ctx.globalAlpha = burst * 0.5; ctx.strokeStyle = ACC; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(burstX, burstY, (1 - burst) * Math.max(W, H) * 0.9, 0, Math.PI * 2); ctx.stroke(); }
      ctx.globalAlpha = 1;
    } else {
    ctx.fillStyle = ACC; ctx.globalAlpha = 1;
    for (let idx = 0; idx < amb.length; idx++) if (amb[idx] > 0.3) ctx.fillText(RAMPMODE ? (amb[idx] > 3 ? "#" : amb[idx] > 1.2 ? "*" : "+") : "1", (idx % cols) * CW + 2, ((idx / cols) | 0) * CH);
    }
    ctx.globalAlpha = 1;
    if (!once) requestAnimationFrame(frame);
  }

  // --- section tracking ---
  let io = null, cycle = null, cycT = 0, hovering = false;
  function bind() {
    if (io) io.disconnect();
    const secs = [...document.querySelectorAll(".sec[data-shape]")];
    const counter = document.getElementById("counter"), figN = document.getElementById("figN"), figT = document.getElementById("figT");
    io = new IntersectionObserver((es) => {
      es.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target, i = secs.indexOf(el), n = String(i).padStart(2, "0");
        cycle = el.dataset.cycle ? el.dataset.cycle.split(",") : null; cycT = performance.now();
        secShape = cycle ? cycle[0] : el.dataset.shape; if (!hovering) setShape(secShape);
        if (el.dataset.cx) cv.dataset.cx = el.dataset.cx; else delete cv.dataset.cx;
        if (el.dataset.scale) cv.dataset.scale = el.dataset.scale; else delete cv.dataset.scale;
        window.dispatchEvent(new CustomEvent("field:section", { detail: el.id || "" }));
        document.body.dataset.zone = el.dataset.zone || "";
        if (counter && el.dataset.label) counter.textContent = n + " / " + String(secs.length - 1).padStart(2, "0") + "  " + el.dataset.label.toUpperCase();
        if (figN && el.dataset.fig) { figN.textContent = "FIG. " + n; figT.textContent = el.dataset.fig.toUpperCase(); }
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    secs.forEach((s) => io.observe(s));
  }
  window.ASCIIField = { draw: (ms) => frame(ms, true), bind, hover: (k) => { hovering = !!(k && SHAPES[k]); setShape(hovering ? k : secShape); } };
  setInterval(() => {
    if (!cycle || hovering) return;
    const k = cycle[Math.floor((performance.now() - cycT) / 7000) % cycle.length];
    if (k !== secShape && SHAPES[k]) { secShape = k; setShape(k); }
  }, 250);
  bind();

  resize();
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => requestAnimationFrame(frame));
})();
