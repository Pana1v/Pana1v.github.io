import { useState, useEffect, useRef, useMemo, type ReactNode } from 'react';
import { DATA } from './data';
import { INDEX, KINDS, type Entry, type Kind } from './field/entries';
import { Icon } from './field/Icon';
import { CommandPalette, type PaletteItem } from './components/CommandPalette';
import { Dashboard } from './components/Dashboard';

declare global {
  interface Window {
    ASCIIField?: { bind: () => void; hover: (shape: string | null) => void };
  }
}

// Fill these as field photos land in public/; empty sections stay hidden.
const BAND_PHOTO = '';
const PHOTOS: { src: string; cap: string }[] = [];

const NAV: [string, string][] = [
  ['index', 'Projects'],
  ...(PHOTOS.length ? [['log', 'Photos'] as [string, string]] : []),
  ['writing', 'Writing'],
  ['ledger', 'Experience'],
  ['echo', 'Contact'],
];

const NAV_OFFSET = 70;

const SCENES: Record<string, [string, string]> = {
  vision: ['Computer vision', 'A camera tracking three objects, with detection boxes drawn on its image plane.'],
  plan: ['Path planning', 'A wavefront expands across a costmap from start to goal, then the shortest path is traced back.'],
  net: ['Network training', 'A forward pass through five layers, then the gradients flowing back.'],
  loss: ['Optimisation', 'Gradient descent with momentum, rolling down a loss surface to its minimum.'],
  demo: ['Imitation learning', 'A policy following the average of six human demonstrations to the goal.'],
  ekf: ['State estimation', "An EKF's uncertainty ellipse grows on odometry alone and collapses each time a landmark is seen."],
  swarm: ['Multi-robot', 'Six robots switching between line, wedge and ring formations, with links between neighbours.'],
  cloud: ['Point clouds', 'A scene being filtered by a sweeping crop plane and voxel-downsampled.'],
};

// stable array identities so Interlude's effect doesn't resubscribe every render
const INTERLUDES = [['vision', 'plan'], ['net', 'loss'], ['demo', 'ekf'], ['swarm', 'cloud']];
// Fig. 01 belongs to the band photo when it is shown
const FIG0 = BAND_PHOTO ? 2 : 1;

const https = (u: string) => (u.startsWith('http') ? u : `https://${u}`);
const pad = (n: number) => String(n).padStart(2, '0');
const hoverShape = (k: string | null) => window.ASCIIField?.hover(k);

function goTo(id: string) {
  const el = document.getElementById(id);
  if (!el) {
    return;
  }
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET, behavior: 'smooth' });
}

function Bk({ children, href, onClick, ghost }: { children: ReactNode; href?: string; onClick?: () => void; ghost?: boolean }) {
  const ext = href?.startsWith('http');
  return (
    <span className={`bk ${ghost ? 'ghost' : ''}`}>
      <a
        className="bk-btn"
        href={href || '#'}
        onClick={(e) => { if (onClick) { e.preventDefault(); onClick(); } }}
        target={ext ? '_blank' : undefined}
        rel="noopener"
      >
        {children}
      </a>
    </span>
  );
}

function Head({ n, label, note }: { n: string; label: string; note?: string }) {
  return (
    <div className="sh">
      <div className="sh-k"><span className="sh-n">{n}</span><span className="sh-fill"></span>{note && <span className="sh-note">{note}</span>}</div>
      <h2>{label}</h2>
    </div>
  );
}

function Nav({ onPalette }: { onPalette: () => void }) {
  const [act, setAct] = useState('');
  const bar = useRef<HTMLElement>(null);

  // field.js announces the section under the viewport centre; scroll drives the progress bar
  useEffect(() => {
    const onSection = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (id) {
        setAct(id);
      }
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (bar.current) {
        bar.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      }
    };
    window.addEventListener('field:section', onSection);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('field:section', onSection);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <nav className="nav">
      <i className="prog" ref={bar}></i>
      <a className="mark" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>PANAV<span>.</span></a>
      <div className="nav-links">
        {NAV.map(([id, l]) => <button key={id} className={act === id ? 'on' : ''} onClick={() => goTo(id)}>{l}</button>)}
        <button className="cmdk" onClick={onPalette} title="Search">⌘K</button>
      </div>
      <Bk href={`mailto:${DATA.contact.email}`}>Email</Bk>
    </nav>
  );
}

function Hero() {
  const city = DATA.contact.location.split(',')[0];
  return (
    <section className="sec hero" id="top" data-shape="bot" data-cycle="bot,vision,net,demo" data-cx="0.36" data-scale="1.25" data-zone="hero">
      <div className="hero-grid">
        <div>
          <div className="hero-k">{DATA.title} · {city}</div>
          <h1>Panav</h1>
        </div>
        <div className="hero-side">
          <p>{DATA.shortBio}</p>
          <p>This site has my projects, writing and work history.</p>
          <div className="acts">
            <Bk onClick={() => goTo('index')}>Projects →</Bk>
            <Bk ghost href={DATA.contact.handbook}>Handbook ↗</Bk>
          </div>
        </div>
      </div>
    </section>
  );
}

function Band() {
  return (
    <section className="sec band-sec" data-shape="field">
      <figure className="band">
        <div className="band-frame"><img src={BAND_PHOTO} alt="" /></div>
        <figcaption><span>Fig. 01</span>Field photo</figcaption>
      </figure>
    </section>
  );
}

// figBase is passed in, not counted at render time, so StrictMode double renders keep numbering stable
function Interlude({ shapes, figBase }: { shapes: string[]; figBase: number }) {
  const [cur, setCur] = useState(shapes[0]);

  useEffect(() => {
    const onShape = (e: Event) => {
      const k = (e as CustomEvent<string>).detail;
      if (shapes.includes(k)) {
        setCur(k);
      }
    };
    window.addEventListener('field:shape', onShape);
    return () => window.removeEventListener('field:shape', onShape);
  }, [shapes]);

  const k = shapes.indexOf(cur);
  const [title, desc] = SCENES[cur];
  return (
    <section className="sec interlude" data-shape={shapes[0]} data-cycle={shapes.length > 1 ? shapes.join(',') : undefined} data-zone="hero" data-cx="0.5" data-scale="1.45" aria-label={title}>
      <div className="wrap il">
        <div className="il-cap"><span>Fig. {pad(figBase + k)}</span>{title}</div>
        <p key={cur}>{desc}</p>
        {shapes.length > 1 && <div className="il-dots">{shapes.map((s) => <i key={s} className={s === cur ? 'on' : ''}></i>)}</div>}
      </div>
    </section>
  );
}

function MediaStrip({ e }: { e: Entry }) {
  const plates = [
    { src: e.image, label: 'Still' },
    { src: e.motion, label: 'Motion' },
  ].filter((p) => p.src);
  if (!plates.length) {
    return null;
  }
  return (
    <div className="media">
      {plates.map((p, i) => (
        <figure key={p.label}>
          <figcaption><span>Fig. {i + 1}</span>{p.label}</figcaption>
          <div className="media-frame"><img src={p.src} alt={`${e.title}, ${p.label.toLowerCase()}`} loading="lazy" /></div>
        </figure>
      ))}
    </div>
  );
}

function Row({ e, num, open, onToggle }: { e: Entry; num: number; open: boolean; onToggle: () => void }) {
  return (
    <div className={`ix ${open ? 'is-open' : ''}`} data-kind={e.kinds[0]} onMouseEnter={() => hoverShape(e.shape)} onMouseLeave={() => hoverShape(null)}>
      <div
        className="ix-row" role="button" tabIndex={0} aria-expanded={open} onClick={onToggle}
        onKeyDown={(ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); onToggle(); } }}
      >
        <span className="ix-num">{pad(num)}</span>
        <span className="ix-year">{e.year}</span>
        <span className="ix-kind">{e.kinds.map((k) => <span key={k} data-kind={k} title={KINDS[k]}><Icon name={k} /></span>)}</span>
        <span className="ix-thumb">{!open && e.image && <img src={e.image} alt="" loading="lazy" />}</span>
        <span className="ix-title">{e.title}</span>
        <span className="ix-sum">{e.summary}</span>
        <span className="ix-marks">
          {e.repo && <Icon name="github" />}
          {e.href && <Icon name={e.hrefKind} />}
          <Icon name={open ? 'minus' : 'plus'} />
        </span>
      </div>
      {open && (
        <div className="ix-body">
          {e.facts.length > 0 && <div className="facts">{e.facts.map((f, i) => <div key={i}><b>{pad(i + 1)}</b>{f}</div>)}</div>}
          <div className="prose">
            <p>{e.body}</p>
            {e.lesson && <div className="lesson"><span>What I would do differently</span><p>{e.lesson}</p></div>}
            <div className="tags">{e.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
            <div className="acts">
              {e.repo && <Bk href={e.repo}><Icon name="github" /> Source ↗</Bk>}
              {e.href && <Bk ghost href={e.href}>{e.hrefLabel} ↗</Bk>}
            </div>
          </div>
          <MediaStrip e={e} />
        </div>
      )}
    </div>
  );
}

function Index({ openId, setOpenId }: { openId: string | null; setOpenId: (id: string | null) => void }) {
  const [filter, setFilter] = useState<Kind | 'all'>('all');
  const kinds = (Object.keys(KINDS) as Kind[]).filter((k) => INDEX.some((e) => e.kinds.includes(k)));
  const rows = filter === 'all' ? INDEX : INDEX.filter((e) => e.kinds.includes(filter));
  return (
    <section className="sec" id="index" data-shape="lidar">
      <div className="wrap">
        <Head n="01" label="Projects and writing" note={`${INDEX.length} entries`} />
        <div className="filters">
          <button className={`filt ${filter === 'all' ? 'on' : ''}`} onClick={() => setFilter('all')}>All</button>
          {kinds.map((k) => (
            <button key={k} data-kind={k} className={`filt ${filter === k ? 'on' : ''}`} onClick={() => setFilter(k)}>
              <Icon name={k} />{KINDS[k]}
            </button>
          ))}
        </div>
        <div className="ix-table">
          {rows.map((e) => (
            <Row key={e.id} e={e} num={INDEX.indexOf(e) + 1} open={openId === e.id} onToggle={() => setOpenId(openId === e.id ? null : e.id)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Log() {
  return (
    <section className="sec" id="log" data-shape="field">
      <div className="wrap">
        <Head n="02" label="Photos" note={`${PHOTOS.length} photos`} />
        <div className="log">
          {PHOTOS.map((p, i) => (
            <figure key={p.src} className={`log-${i + 1}`}>
              <img src={p.src} alt={p.cap} loading="lazy" />
              <figcaption><span>{pad(i + 1)}</span>{p.cap}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Writing({ n }: { n: string }) {
  const essays = INDEX.filter((e) => e.kinds.includes('essay'));
  return (
    <section className="sec" id="writing" data-shape="book">
      <div className="wrap">
        <Head n={n} label="Writing" note={`${essays.length} pieces`} />
        <div className="wr-grid">
          {essays.map((e) => (
            <article key={e.id} className="wr" onMouseEnter={() => hoverShape(e.shape)} onMouseLeave={() => hoverShape(null)}>
              {e.image && <div className="wr-cover"><img src={e.image} alt="" loading="lazy" /></div>}
              <div className="wr-meta"><Icon name={e.hrefKind} /><span>{e.year}</span><span>{e.tags.join(' · ')}</span></div>
              <h3>{e.title}</h3>
              <p>{e.summary}</p>
              {e.href && <Bk ghost href={e.href}>{e.hrefLabel} ↗</Bk>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

interface LedRow { key: string; role: string; org: string; period: string; current?: boolean; note: string }

// data periods are "start (em dash) end"; a current role always ends in "now"
function When({ period, current }: { period: string; current?: boolean }) {
  const [start, end] = period.split(/\s*\u2014\s*/);
  return <div className="led-when">{start} - {current ? <em>now</em> : end}</div>;
}

function LedRows({ items }: { items: LedRow[] }) {
  return (
    <>
      {items.map((x) => (
        <div className="led" key={x.key}>
          <When period={x.period} current={x.current} />
          <div><div className="led-role">{x.role}</div><div className="led-org">{x.org}</div><p>{x.note}</p></div>
        </div>
      ))}
    </>
  );
}

function Ledger({ n }: { n: string }) {
  const jobs: LedRow[] = DATA.experience.map((x) => ({ key: x.company, role: x.role, org: x.company, period: x.period, current: x.current, note: x.description }));
  const school: LedRow[] = DATA.education.map((x) => ({ key: x.institution, role: x.degree, org: x.institution, period: x.period, note: x.description }));
  return (
    <section className="sec" id="ledger" data-shape="map">
      <div className="wrap">
        <Head n={n} label="Experience" note="Work, education, open source, tools" />
        <div className="led-grid">
          <div>
            <div className="sub">Employment</div><LedRows items={jobs} />
            <div className="sub" style={{ marginTop: 48 }}>Education</div><LedRows items={school} />
          </div>
          <div>
            <div className="sub">Open source</div>
            {DATA.contributions.map((u) => (
              <a className="led up" key={u.title} href={u.link} target="_blank" rel="noopener">
                <div className="led-when"><Icon name="github" /></div>
                <div><div className="led-role">{u.title} ↗</div><p>{u.description}</p></div>
              </a>
            ))}
            <div className="sub" style={{ marginTop: 48 }}>Toolkit</div>
            <div className="tk">
              {Object.entries(DATA.skills).map(([c, l]) => <div key={c}><b>{c}</b><span>{l.join(', ')}</span></div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Echo({ n }: { n: string }) {
  const C = DATA.contact;
  const links: [string, string, string][] = [
    ['mail', C.email, `mailto:${C.email}`],
    ['mail', C.altEmail, `mailto:${C.altEmail}`],
    ['github', C.github, https(C.github)],
    ['gitbook', 'Robotics Handbook', C.handbook],
    ['substack', 'Substack', C.substack],
    ['link', 'LinkedIn', https(C.linkedin)],
  ];
  return (
    <section className="sec" id="echo" data-shape="phone" data-cx="0.72" data-scale="1.15" data-zone="hero">
      <div className="wrap echo">
        <div>
          <Head n={n} label="Contact" />
          <p className="echo-p">Email is the fastest way to reach me. Code is on GitHub, longer notes are in the handbook.</p>
        </div>
        <ul className="echo-links">
          {links.map(([i, l, h]) => (
            <li key={l}><a href={h} target={h.startsWith('mailto') ? undefined : '_blank'} rel="noopener"><Icon name={i} /><span>{l}</span><em>↗</em></a></li>
          ))}
        </ul>
      </div>
      <footer className="wrap foot"><span>Panav, 2026</span><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top</button></footer>
    </section>
  );
}

export default function App() {
  const [pal, setPal] = useState(false);
  const [dash, setDash] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  // sections exist now, so the field can observe them
  useEffect(() => { window.ASCIIField?.bind(); }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        setDash((o) => !o);
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPal((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const items: PaletteItem[] = useMemo(() => [
    ...INDEX.map((e) => ({
      group: 'Index', label: e.title, hint: e.kinds.map((k) => KINDS[k]).join(' · '),
      action: () => { setOpenId(e.id); setTimeout(() => goTo('index'), 40); },
    })),
    ...NAV.map(([id, l]) => ({ group: 'Sections', label: l, hint: 'jump', action: () => goTo(id) })),
    { group: 'Links', label: 'Email', hint: DATA.contact.email, action: () => { window.location.href = `mailto:${DATA.contact.email}`; } },
    { group: 'Links', label: 'GitHub', hint: 'Pana1v', action: () => window.open(https(DATA.contact.github), '_blank') },
  ], []);

  // section numbers shift when the photo log is hidden
  const sn = (base: number) => pad(base + (PHOTOS.length ? 1 : 0));

  return (
    <>
      <Nav onPalette={() => setPal(true)} />
      <Hero />
      {BAND_PHOTO && <Band />}
      <Index openId={openId} setOpenId={setOpenId} />
      <Interlude shapes={INTERLUDES[0]} figBase={FIG0} />
      {PHOTOS.length > 0 && <Log />}
      <Interlude shapes={INTERLUDES[1]} figBase={FIG0 + 2} />
      <Writing n={sn(2)} />
      <Interlude shapes={INTERLUDES[2]} figBase={FIG0 + 4} />
      <Ledger n={sn(3)} />
      <Interlude shapes={INTERLUDES[3]} figBase={FIG0 + 6} />
      <Echo n={sn(4)} />
      <CommandPalette open={pal} setOpen={setPal} items={items} />
      {dash && <Dashboard data={DATA} onUpdate={() => {}} onClose={() => setDash(false)} />}
    </>
  );
}
