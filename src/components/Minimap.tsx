import { useEffect, useRef } from 'react';
import { SECTIONS } from '../App';

/* The minimap draws the page as a SLAM map: a planned route (dashed), the
   traversed trail (solid), landmarks discovered as you scroll, and a robot
   pose triangle. Click a landmark to navigate. */

const WPTS: [number, number][] = [
  [0.14, 0.84], [0.34, 0.52], [0.60, 0.70], [0.54, 0.32],
  [0.78, 0.16], [0.88, 0.50], [0.70, 0.88],
];
const SIZE = 168;

export function Minimap({ active, onJump, visible }: {
  active: number;
  onJump: (i: number) => void;
  visible: boolean;
}) {
  const cvs = useRef<HTMLCanvasElement>(null);
  const maxP = useRef(0);
  const raf = useRef(0);

  const geom = () => {
    const sh = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const params = SECTIONS.map(s => {
      const el = document.getElementById(s.id);
      return el ? Math.min(1, Math.max(0, (el.offsetTop - 90) / sh)) : 0;
    });
    params[0] = 0;
    const p = Math.min(1, Math.max(0, window.scrollY / sh));
    return { params, p };
  };

  const posAt = (p: number, params: number[], pts: number[][]) => {
    let i = 0;
    while (i < params.length - 2 && p > params[i + 1]) i++;
    const a = params[i], b = Math.max(params[i + 1], a + 1e-6);
    const t = Math.min(1, Math.max(0, (p - a) / (b - a)));
    const [x1, y1] = pts[i], [x2, y2] = pts[i + 1];
    return { x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t, th: Math.atan2(y2 - y1, x2 - x1) };
  };

  const draw = () => {
    const c = cvs.current;
    if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    const W = SIZE, H = SIZE;
    if (c.width !== W * dpr) { c.width = W * dpr; c.height = H * dpr; }
    const ctx = c.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const cs = getComputedStyle(document.body);
    const fg = cs.getPropertyValue('--fg').trim() || '#f4f4f4';
    const faint = cs.getPropertyValue('--fg-faint').trim() || '#555';
    const ruleC = cs.getPropertyValue('--rule').trim() || '#222';
    const { params, p } = geom();
    maxP.current = Math.max(maxP.current, p);
    const pts = WPTS.map(([x, y]) => [x * W, y * H]);

    // graticule
    ctx.strokeStyle = ruleC; ctx.lineWidth = 0.5; ctx.globalAlpha = 0.7;
    for (let i = 1; i < 4; i++) {
      ctx.beginPath(); ctx.moveTo(i * W / 4, 0); ctx.lineTo(i * W / 4, H); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * H / 4); ctx.lineTo(W, i * H / 4); ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // planned route — dashed, faint
    ctx.strokeStyle = faint; ctx.lineWidth = 1; ctx.setLineDash([2, 4]); ctx.globalAlpha = 0.55;
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;

    // traversed trail — solid up to current pose
    const cur = posAt(p, params, pts);
    ctx.strokeStyle = fg; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) {
      if (params[i] <= p) ctx.lineTo(pts[i][0], pts[i][1]);
      else break;
    }
    ctx.lineTo(cur.x, cur.y); ctx.stroke();

    // landmarks
    SECTIONS.forEach((s, i) => {
      const [x, y] = pts[i];
      const seen = maxP.current >= params[i] - 0.015;
      if (seen) {
        ctx.fillStyle = fg;
        ctx.fillRect(x - 2.5, y - 2.5, 5, 5);
        ctx.font = '600 7px JetBrains Mono, monospace';
        ctx.fillStyle = i === active ? fg : faint;
        ctx.fillText(s.num, x + 6, y + 3);
      } else {
        ctx.strokeStyle = faint; ctx.lineWidth = 1; ctx.globalAlpha = 0.5;
        ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2); ctx.stroke();
        ctx.globalAlpha = 1;
      }
    });

    // robot pose triangle
    ctx.save();
    ctx.translate(cur.x, cur.y); ctx.rotate(cur.th);
    ctx.fillStyle = fg;
    ctx.beginPath(); ctx.moveTo(7, 0); ctx.lineTo(-4, 4.5); ctx.lineTo(-4, -4.5); ctx.closePath(); ctx.fill();
    ctx.restore();
    // uncertainty ring
    ctx.strokeStyle = fg; ctx.globalAlpha = 0.3; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(cur.x, cur.y, 11, 0, Math.PI * 2); ctx.stroke();
    ctx.globalAlpha = 1;
  };

  useEffect(() => {
    if (!visible) return;
    const onScroll = () => { cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(draw); };
    draw();
    const t1 = setTimeout(draw, 400);
    const t2 = setTimeout(draw, 1200);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const mo = new MutationObserver(draw);
    mo.observe(document.body, { attributes: true, attributeFilter: ['data-mode'] });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      mo.disconnect();
      clearTimeout(t1); clearTimeout(t2);
      cancelAnimationFrame(raf.current);
    };
  }, [visible, active]);

  if (!visible) return null;

  const { p } = (() => { try { return geom(); } catch { return { p: 0 }; } })();
  const mapped = Math.round(Math.max(maxP.current, p) * 100);

  const onClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const c = cvs.current;
    if (!c) return;
    const r = c.getBoundingClientRect();
    const mx = e.clientX - r.left, my = e.clientY - r.top;
    let best = -1, bd = 1e9;
    WPTS.forEach(([x, y], i) => {
      const d = Math.hypot(mx - x * SIZE, my - y * SIZE);
      if (d < bd) { bd = d; best = i; }
    });
    if (best >= 0 && bd < 16) onJump(best);
  };

  return (
    <div className="minimap" role="navigation" aria-label="Site map">
      <div className="minimap-head">
        <span>occupancy.map</span>
        <span className="dot-live" />
      </div>
      <canvas ref={cvs} style={{ width: SIZE, height: SIZE, display: 'block', cursor: 'pointer' }} onClick={onClick} />
      <div className="minimap-foot">
        <span>MAPPED {String(mapped).padStart(2, '0')}%</span>
        <span>§ {SECTIONS[active] ? SECTIONS[active].num : 'I'}</span>
      </div>
    </div>
  );
}
