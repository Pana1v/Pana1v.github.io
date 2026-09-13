/* Atlas - shared components: tweaks, reveal, icons, command palette */
const { useState, useEffect, useRef, useMemo, createContext, useContext } = React;

const AtlasTweaksContext = createContext(null);

function atlasApplyTweaks(t) {
  document.body.setAttribute("data-mode", t.mode || "ink");
  const grain = document.getElementById("grain");
  if (grain) grain.style.display = t.background === "grain" ? "block" : "none";
}

function AtlasTweaksProvider({ children }) {
  const defaults = (() => {
    try {return JSON.parse(document.getElementById("tweaks-defaults").textContent.replace(/\/\*EDITMODE-(BEGIN|END)\*\//g, "").trim());}
    catch {return { mode: "ink", background: "flat" };}
  })();
  const [tweaks, setTweaks] = useState(defaults);
  const [open, setOpen] = useState(false);
  useEffect(() => {atlasApplyTweaks(tweaks);}, [tweaks]);
  useEffect(() => {
    const onMsg = (e) => {
      if (!e.data || typeof e.data !== "object") return;
      if (e.data.type === "__activate_edit_mode") setOpen(true);
      if (e.data.type === "__deactivate_edit_mode") setOpen(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);
  const update = (partial) => {
    const next = { ...tweaks, ...partial };
    setTweaks(next);
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: partial }, "*");
  };
  return <AtlasTweaksContext.Provider value={{ tweaks, update, open, setOpen }}>{children}</AtlasTweaksContext.Provider>;
}

function AtlasTweaksPanel() {
  const { tweaks, update, open, setOpen } = useContext(AtlasTweaksContext);
  if (!open) return null;
  const Seg = ({ k, opts }) =>
  <div className="tweak-seg">
      {opts.map(([v, l]) => <button key={v} className={(tweaks[k] || opts[0][0]) === v ? "active" : ""} onClick={() => update({ [k]: v })}>{l}</button>)}
    </div>;
  return (
    <div className="tweak-panel">
      <h4>Tweaks <button className="admin-close" onClick={() => setOpen(false)}>×</button></h4>
      <div className="tweak-row"><label>Mode</label><Seg k="mode" opts={[["ink", "Paper"], ["paper", "Night"]]} /></div>
      <div className="tweak-row"><label>Texture</label><Seg k="background" opts={[["flat", "Flat"], ["grain", "Grain"]]} /></div>
    </div>);
}

/* --- ICONS ---
   One weight, one grid. Square corners, 1px strokes on a 16px box, drawn to
   sit on the same baseline as the mono type. Engineering-drawing marks, not
   rounded UI icons. */
function Icon({ name, className = "", style }) {
  const s = { fill: "none", stroke: "currentColor", strokeWidth: 1, vectorEffect: "non-scaling-stroke" };
  const paths = {
    // entry kinds
    build: <g {...s}><rect x="1.5" y="4.5" width="8" height="8" /><rect x="6.5" y="1.5" width="8" height="8" /></g>,
    essay: <g {...s}><path d="M2.5 3.5h11M2.5 6.5h11M2.5 9.5h8M2.5 12.5h5" /></g>,
    paper: <g {...s}><path d="M3.5 1.5h6l3 3v10h-9z" /><path d="M9.5 1.5v3h3" /><path d="M5.5 8.5h5M5.5 11.5h3" /></g>,
    tool: <g {...s}><rect x="2.5" y="2.5" width="11" height="11" /><path d="M8 2.5v11M2.5 8h11" /></g>,
    // podium bars, ascending toward the middle - reads as a placing, not a roster.
    competition: <g {...s}><rect x="2" y="9.5" width="3.5" height="4.5" /><rect x="6.25" y="5.5" width="3.5" height="8.5" /><rect x="10.5" y="7.5" width="3.5" height="6.5" /></g>,
    // links
    substack: <g {...s}><path d="M3.5 2.5h9M3.5 5.5h9M3.5 8.5v5l4.5-2.5 4.5 2.5v-5z" /></g>,
    gitbook: <g {...s}><path d="M2.5 2.5h5a1 1 0 0 1 1 1v10a1 1 0 0 0-1-1h-5z" /><path d="M13.5 2.5h-5a1 1 0 0 0-1 1v10a1 1 0 0 1 1-1h5z" /></g>,
    mail: <g {...s}><rect x="1.5" y="3.5" width="13" height="9" /><path d="M1.5 3.5 8 9l6.5-5.5" /></g>,
    link: <g {...s}><path d="M6.5 2.5h7v7" /><path d="M13.5 2.5 6 10" /><path d="M11 9.5v4h-9v-9h4" /></g>,
    plus: <g {...s}><path d="M8 3v10M3 8h10" /></g>,
    minus: <g {...s}><path d="M3 8h10" /></g>,
    arrow: <g {...s}><path d="M3 8h10M9 4l4 4-4 4" /></g>
  };
  if (name === "github") return (
    <svg className={`icn ${className}`} viewBox="0 0 16 16" aria-hidden="true" style={style}>
      <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
    </svg>);
  return <svg className={`icn ${className}`} viewBox="0 0 16 16" aria-hidden="true" style={style}>{paths[name] || paths.link}</svg>;
}

function Reveal({ children, delay = 0, className = "", style }) {
  const ref = useRef(null);
  const shown = useRef(false);
  // Fails open: if anything stops the observer firing, content stays visible.
  const [inView, setInView] = useState(!document.documentElement.classList.contains("js-reveal"));
  useEffect(() => {
    const el = ref.current;
    if (!el || shown.current) return;
    let io = null;
    const cleanup = () => {
      if (io) io.disconnect();
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
    const show = () => {
      if (shown.current) return;
      shown.current = true;
      setInView(true);
      cleanup();
    };
    function check() {
      if (shown.current) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > -1) show();
    }
    check();
    if (shown.current) return cleanup;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) show(); }), { threshold: 0.04 });
      io.observe(el);
    }
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return cleanup;
  }, []);
  return <div ref={ref} className={`reveal ${inView ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }}>{children}</div>;
}

function Container({ children, size = "wide", style }) {
  const w = { tight: "680px", default: "960px", wide: "1140px" };
  return <div style={{ maxWidth: w[size], width: "100%", margin: "0 auto", padding: "0 28px", ...style }}>{children}</div>;
}

/* --- COMMAND PALETTE --- */
function CommandPalette({ open, setOpen, items }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef(null);
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? items.filter((it) => (it.label + " " + (it.hint || "") + " " + it.group).toLowerCase().includes(t)) : items;
  }, [q, items]);

  useEffect(() => {if (open) {setQ("");setSel(0);setTimeout(() => inputRef.current && inputRef.current.focus(), 30);}}, [open]);
  useEffect(() => {setSel(0);}, [q]);

  if (!open) return null;
  const run = (it) => {setOpen(false);it.action();};
  const onKey = (e) => {
    if (e.key === "ArrowDown") {e.preventDefault();setSel((s) => Math.min(s + 1, filtered.length - 1));} else
    if (e.key === "ArrowUp") {e.preventDefault();setSel((s) => Math.max(s - 1, 0));} else
    if (e.key === "Enter" && filtered[sel]) {e.preventDefault();run(filtered[sel]);} else
    if (e.key === "Escape") {setOpen(false);}
  };

  let lastGroup = null;
  return (
    <div className="palette-overlay" onMouseDown={(e) => {if (e.target === e.currentTarget) setOpen(false);}}>
      <div className="palette" onKeyDown={onKey}>
        <div className="palette-input-row">
          <Icon name="arrow" />
          <input ref={inputRef} className="palette-input" value={q} onChange={(e) => setQ(e.target.value)}
          placeholder="Search the index" spellCheck="false" />
          <span className="palette-esc">esc</span>
        </div>
        <div className="palette-list">
          {filtered.length === 0 && <div className="palette-empty">No matches.</div>}
          {filtered.map((it, i) => {
            const showGroup = it.group !== lastGroup;lastGroup = it.group;
            return (
              <React.Fragment key={it.label + i}>
                {showGroup && <div className="palette-group">{it.group}</div>}
                <button className={`palette-item ${i === sel ? "sel" : ""}`}
                onMouseEnter={() => setSel(i)} onClick={() => run(it)}>
                  <span className="palette-item-label">{it.label}</span>
                  {it.hint && <span className="palette-item-hint">{it.hint}</span>}
                </button>
              </React.Fragment>);
          })}
        </div>
        <div className="palette-foot">
          <span>up down move</span><span>enter go</span><span>esc close</span>
        </div>
      </div>
    </div>);
}

Object.assign(window, {
  AtlasTweaksContext, AtlasTweaksProvider, AtlasTweaksPanel,
  Reveal, Container, Icon, CommandPalette
});
