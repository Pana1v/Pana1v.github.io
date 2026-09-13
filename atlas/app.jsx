/* Atlas - pages & app shell */
const AD = window.ATLAS_DATA;
const KINDS = window.ATLAS_KINDS;
const SECTIONS = window.ATLAS_SECTIONS;
const ATLAS_NAV_OFFSET = 64;

function scrollToSec(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - ATLAS_NAV_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

/* One flat color per kind, split into equal vertical segments when an
   entry carries more than one - the row's left-edge accent shows every
   kind it belongs to, not just a single "primary" one. */
function kindBandStyle(kinds) {
  const step = 100 / kinds.length;
  const band = kinds.length === 1 ?
  `var(--k-${kinds[0]})` :
  `linear-gradient(to bottom, ${kinds.map((k, i) => `var(--k-${k}) ${i * step}% ${(i + 1) * step}%`).join(", ")})`;
  return { "--band": band, "--k": `var(--k-${kinds[0]})` };
}

function SectionHead({ label, count, note }) {
  return (
    <div className="sec-head">
      <span className="sec-label">{label}</span>
      {count && <span className="sec-count">{count}</span>}
      <span className="sec-fill"></span>
      {note && <span className="sec-note">{note}</span>}
    </div>);
}

/* Still + motion plates, user-fillable. Every entry gets a pair. */
function MediaStrip({ base }) {
  return (
    <div className="media-strip">
      <figure className="media-plate">
        <figcaption className="media-cap"><span>Fig. 1</span><span className="dim">still</span></figcaption>
        <div className="media-frame">
          <image-slot id={`shot-${base}-still`} shape="rect" placeholder="Drop an image"></image-slot>
        </div>
      </figure>
      <figure className="media-plate">
        <figcaption className="media-cap"><span>Fig. 2</span><span className="dim">motion</span></figcaption>
        <div className="media-frame">
          <image-slot id={`shot-${base}-motion`} shape="rect" placeholder="Drop a GIF"></image-slot>
        </div>
      </figure>
    </div>);
}

function Navbar({ onPalette }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 8);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <nav className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <Container>
        <div className="nav-inner">
          <button className="nav-name serif" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>{AD.name}</button>
          <div className="nav-links">
            {SECTIONS.map((s) =>
            <button key={s.id} className="navlink" onClick={() => scrollToSec(s.id)}>{s.label}</button>)}
            <button className="cmdk-chip" title="Search (Cmd K)" onClick={onPalette}>⌘K</button>
          </div>
        </div>
      </Container>
    </nav>);
}

/* --- HEADER: name, one-line role, dated status. Nothing else. --- */
function Header() {
  return (
    <header className="masthead-block" data-screen-label="Header">
      <Container>
        <Reveal>
          <h1 className="masthead serif">{AD.name}</h1>
          <div className="mast-rule"></div>
          <div className="mast-meta">
            <span className="role">{AD.role}</span>
            <span className="loc">{AD.location}</span>
          </div>
          <div className="status-line">
            <span className="status-date">{AD.status.date}</span>
            <p className="status-text serif">{AD.status.text}</p>
          </div>
        </Reveal>
      </Container>
    </header>);
}

/* --- INDEX: everything reachable from one table. Rows expand in place. --- */
function IndexRow({ e, num, open, onToggle }) {
  return (
    <div className={`ix ${open ? "is-open" : ""}`} data-kind={e.kinds[0]} style={kindBandStyle(e.kinds)}>
      <div className="ix-row" role="button" tabIndex={0} aria-expanded={open}
        onClick={onToggle}
        onKeyDown={(ev) => {if (ev.key === "Enter" || ev.key === " ") {ev.preventDefault();onToggle();}}}>
        <span className="ix-num">{String(num).padStart(2, "0")}</span>
        <span className="ix-year">{e.year}</span>
        <span className="ix-kind">
          {e.kinds.map((k) =>
          <span key={k} title={KINDS[k]}><Icon name={k} style={{ color: `var(--k-${k})` }} /></span>)}
        </span>
        <span className="ix-thumb" aria-hidden={open ? "true" : undefined} onClick={(ev) => ev.stopPropagation()}>
          {!open && <image-slot id={`shot-${e.id}-still`} shape="rect" placeholder=""></image-slot>}
        </span>
        <span className="ix-title serif">{e.title}</span>
        <span className="ix-sum">{e.summary}</span>
        <span className="ix-marks">
          {e.repo && <span className="ix-mark" title="Source on GitHub"><Icon name="github" /></span>}
          {e.href && <span className="ix-mark" title={e.hrefLabel}><Icon name={e.hrefKind || "link"} /></span>}
          <span className="ix-toggle"><Icon name={open ? "minus" : "plus"} /></span>
        </span>
      </div>
      {open &&
      <div className="ix-body">
        <div className="ix-facts">
          {e.facts.map((f, i) => <div key={i} className="fact"><span className="fact-n">{String(i + 1).padStart(2, "0")}</span>{f}</div>)}
        </div>
        <div className="ix-prose">
          <p className="serif">{e.body}</p>
          {e.lesson &&
          <div className="lesson">
            <span className="lesson-label">What I would do differently</span>
            <p className="serif">{e.lesson}</p>
          </div>}
          <div className="ix-tags">{e.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
          <div className="ix-actions">
            {e.repo &&
            <a className="act" href={e.repo} target="_blank" rel="noopener" onClick={(ev) => ev.stopPropagation()}>
              <Icon name="github" /> Source <Icon name="link" className="tiny" />
            </a>}
            {e.href &&
            <a className="act" href={e.href} target="_blank" rel="noopener" onClick={(ev) => ev.stopPropagation()}>
              <Icon name={e.hrefKind || "link"} /> {e.hrefLabel} <Icon name="link" className="tiny" />
            </a>}
          </div>
        </div>
        <MediaStrip base={e.id} />
      </div>}
    </div>);
}

function IndexSection({ openId, setOpenId }) {
  const [filter, setFilter] = useState("all");
  const kinds = useMemo(() => ["all", ...Object.keys(KINDS).filter((k) => AD.index.some((e) => e.kinds.includes(k)))], []);
  const rows = filter === "all" ? AD.index : AD.index.filter((e) => e.kinds.includes(filter));
  return (
    <section className="section" id="index-section" data-screen-label="Index">
      <Container>
        <SectionHead label="Index" count={`${AD.index.length} entries`} note="Click any line to open it" />
        <div className="ix-filters">
          {kinds.map((k) =>
          <button key={k} data-kind={k === "all" ? undefined : k} className={`filt ${filter === k ? "on" : ""}`} style={k === "all" ? undefined : { "--k": `var(--k-${k})` }} onClick={() => setFilter(k)}>
            {k !== "all" && <Icon name={k} />}{k === "all" ? "All" : KINDS[k]}
          </button>)}
        </div>
        <div className="ix-table">
          {rows.map((e, i) =>
          <IndexRow key={e.id} e={e} num={AD.index.indexOf(e) + 1} open={openId === e.id}
            onToggle={() => setOpenId(openId === e.id ? null : e.id)} />)}
        </div>
      </Container>
    </section>);
}

/* --- LEDGER: dated rows, same format for work and school. --- */
function LedgerRows({ items }) {
  return (
    <div className="ledger">
      {items.map((x) =>
      <div className="led-row" key={x.org}>
        <div className="led-when">
          {x.period}<span className="dash">-</span>{x.current ? <em>now</em> : x.end}
        </div>
        <div className="led-what">
          <div className="led-role serif">{x.role}</div>
          <div className="led-org">{x.org}</div>
          <p className="led-note">{x.note}</p>
        </div>
      </div>)}
    </div>);
}

function LedgerSection() {
  return (
    <section className="section" id="ledger-section" data-screen-label="Ledger">
      <Container>
        <SectionHead label="Ledger" note="Work, school, upstream" />
        <div className="led-grid">
          <div>
            <div className="sub-label">Employment</div>
            <LedgerRows items={AD.experience} />
            <div className="sub-label" style={{ marginTop: 52 }}>Education</div>
            <LedgerRows items={AD.education} />
          </div>
          <div>
            <div className="sub-label">Upstream</div>
            <div className="ledger">
              {AD.upstream.map((u) =>
              <a className="led-row up-row" key={u.title} href={u.link} target="_blank" rel="noopener">
                <div className="led-when"><Icon name="github" /></div>
                <div className="led-what">
                  <div className="led-role serif">{u.title} <Icon name="link" className="tiny" /></div>
                  <p className="led-note">{u.note}</p>
                </div>
              </a>)}
            </div>
          </div>
        </div>
      </Container>
    </section>);
}

function ToolkitSection() {
  return (
    <section className="section" id="toolkit-section" data-screen-label="Toolkit">
      <Container>
        <SectionHead label="Toolkit" />
        <div className="tk-grid">
          {Object.entries(AD.skills).map(([cat, list]) =>
          <div key={cat}>
            <div className="sub-label">{cat}</div>
            <ul className="tk-list">{list.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>)}
        </div>
      </Container>
    </section>);
}

/* --- COLOPHON: no headline, no pitch. Just where to find me. --- */
function Colophon() {
  const C = AD.contact;
  const links = [
    { icon: "mail", label: C.email, href: `mailto:${C.email}` },
    { icon: "mail", label: C.altEmail, href: `mailto:${C.altEmail}` },
    { icon: "github", label: "github.com/Pana1v", href: C.github },
    { icon: "gitbook", label: "Robotics Handbook", href: C.handbook },
    { icon: "substack", label: "Substack", href: C.substack },
    { icon: "link", label: "LinkedIn", href: C.linkedin }];
  return (
    <section className="section colo" id="colophon-section" data-screen-label="Colophon">
      <Container>
        <SectionHead label="Colophon" />
        <div className="colo-grid">
          <div className="colo-status">
            <span className="status-date">{AD.status.date}</span>
            <p className="serif">{AD.status.text}</p>
          </div>
          <ul className="colo-links">
            {links.map((l) =>
            <li key={l.label}>
              <a href={l.href} target={l.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener">
                <Icon name={l.icon} /><span>{l.label}</span>
              </a>
            </li>)}
          </ul>
        </div>
        <div className="colo-foot">
          <span>{AD.name}, {AD.location}</span>
          <span>Set in EB Garamond and JetBrains Mono</span>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Top</button>
        </div>
      </Container>
    </section>);
}

function AtlasApp() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [openId, setOpenId] = useState(null);
  const { tweaks, update } = useContext(AtlasTweaksContext);

  const openEntry = (id) => {
    setOpenId(id);
    setTimeout(() => {
      const el = document.getElementById("index-section");
      if (el) scrollToSec("index-section");
    }, 40);
  };

  const paletteItems = useMemo(() => [
  ...AD.index.map((e) => ({ group: "Index", label: e.title, hint: e.kinds.map((k) => KINDS[k]).join(" / "), action: () => openEntry(e.id) })),
  ...SECTIONS.map((s) => ({ group: "Sections", label: s.label, hint: "jump", action: () => scrollToSec(s.id) })),
  { group: "Links", label: "Email", hint: AD.contact.email, action: () => {window.location.href = `mailto:${AD.contact.email}`;} },
  { group: "Links", label: "GitHub", hint: "Pana1v", action: () => window.open(AD.contact.github, "_blank") },
  { group: "Links", label: "Robotics Handbook", hint: "gitbook", action: () => window.open(AD.contact.handbook, "_blank") },
  { group: "Links", label: "LinkedIn", hint: "profile", action: () => window.open(AD.contact.linkedin, "_blank") },
  { group: "Display", label: tweaks.mode === "ink" ? "Night mode" : "Paper mode", hint: "theme", action: () => update({ mode: tweaks.mode === "ink" ? "paper" : "ink" }) }],
  [tweaks.mode]);

  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || e.target.isContentEditable) return;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {e.preventDefault();setPaletteOpen((o) => !o);return;}
      if (paletteOpen) return;
      if (e.key === "/") {e.preventDefault();setPaletteOpen(true);}
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen]);

  return (
    <React.Fragment>
      <Navbar onPalette={() => setPaletteOpen(true)} />
      <Header />
      <IndexSection openId={openId} setOpenId={setOpenId} />
      <LedgerSection />
      <ToolkitSection />
      <Colophon />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} items={paletteItems} />
      <AtlasTweaksPanel />
    </React.Fragment>);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <AtlasTweaksProvider><AtlasApp /></AtlasTweaksProvider>
);
