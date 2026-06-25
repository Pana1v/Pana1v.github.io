import { useState, useEffect, useRef, useMemo, createContext, useContext } from 'react';
import { DATA } from './data';
import { Navbar } from './components/Navbar';
import { Masthead } from './components/Masthead';
import { WritingIndex } from './components/WritingIndex';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { OpenSource } from './components/OpenSource';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Minimap } from './components/Minimap';
import { CommandPalette, PaletteItem } from './components/CommandPalette';
import { TweaksPanel } from './components/TweaksPanel';
import { Dashboard } from './components/Dashboard';

export { DATA };

// --- Sections (the "atlas" the page maps) ---

export interface SectionDef { id: string; num: string; label: string; }

export const SECTIONS: SectionDef[] = [
  { id: 'sec-masthead', num: 'I', label: 'Masthead' },
  { id: 'writing-section', num: 'II', label: 'Writing' },
  { id: 'projects-section', num: 'III', label: 'Projects' },
  { id: 'skills-section', num: 'IV', label: 'Toolkit' },
  { id: 'oss-section', num: 'V', label: 'Open Source' },
  { id: 'experience-section', num: 'VI', label: 'Record' },
  { id: 'contact-section', num: 'VII', label: 'Contact' },
];

const NAV_OFFSET = 76;

export function scrollToSec(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}

// --- Tweaks context ---

export interface Tweaks {
  mode: string;       // 'ink' = paper/light, 'paper' = night/dark
  background: string; // 'grain' | 'flat'
  minimap: string;    // 'on' | 'off'
}

const defaultTweaks: Tweaks = {
  mode: 'ink',
  background: 'flat',
  minimap: 'on',
};

interface TweaksContextValue {
  tweaks: Tweaks;
  update: (partial: Partial<Tweaks>) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
}

export const TweaksContext = createContext<TweaksContextValue>({
  tweaks: defaultTweaks,
  update: () => {},
  open: false,
  setOpen: () => {},
});

function applyTweaks(t: Tweaks) {
  document.body.setAttribute('data-mode', t.mode || 'ink');
  const grain = document.getElementById('grain');
  if (grain) grain.style.display = t.background === 'grain' ? 'block' : 'none';
}

function TweaksProvider({ children }: { children: React.ReactNode }) {
  const [tweaks, setTweaks] = useState<Tweaks>(defaultTweaks);
  const [open, setOpen] = useState(false);

  useEffect(() => { applyTweaks(tweaks); }, [tweaks]);

  const update = (partial: Partial<Tweaks>) => {
    setTweaks(prev => ({ ...prev, ...partial }));
  };

  return (
    <TweaksContext.Provider value={{ tweaks, update, open, setOpen }}>
      {children}
    </TweaksContext.Provider>
  );
}

// --- Layout utilities ---

export function Reveal({ children, delay = 0, className = '', style }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useRef(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown.current) return;
    let io: IntersectionObserver | null = null;
    const cleanup = () => {
      if (io) io.disconnect();
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
    const show = () => {
      if (shown.current) return;
      shown.current = true;
      setInView(true);
      cleanup();
    };
    function check() {
      if (shown.current || !el) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > -1) show();
    }
    check();
    if (shown.current) return cleanup;
    io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) show(); }),
      { threshold: 0.04 }
    );
    io.observe(el);
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return cleanup;
  }, []);

  return (
    <div ref={ref} className={`reveal ${inView ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

export function Container({ children, size = 'wide', style }: {
  children: React.ReactNode;
  size?: 'tight' | 'default' | 'wide';
  style?: React.CSSProperties;
}) {
  const w = { tight: '680px', default: '960px', wide: '1180px' };
  return (
    <div style={{ maxWidth: w[size], width: '100%', margin: '0 auto', padding: '0 24px', ...style }}>
      {children}
    </div>
  );
}

export function Plate({ num, label, end }: { num: string; label: string; end?: string }) {
  return (
    <div className="folio-plate">
      <span className="num">§ {num}</span>
      <span>{label}</span>
      <span className="mid" />
      {end && <span className="end">{end}</span>}
    </div>
  );
}

// --- App ---

function AtlasApp() {
  const [active, setActive] = useState(0);
  const [odom, setOdom] = useState(0);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const { tweaks, update, setOpen: setTweaksOpen } = useContext(TweaksContext);

  // Scroll odometry + active-section tracking
  useEffect(() => {
    let raf = 0;
    const f = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setOdom(Math.round(y / 8) * 8);
        const mid = y + window.innerHeight * 0.4;
        let idx = 0;
        SECTIONS.forEach((s, i) => {
          const el = document.getElementById(s.id);
          if (el && el.offsetTop <= mid) idx = i;
        });
        setActive(idx);
      });
    };
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => { window.removeEventListener('scroll', f); cancelAnimationFrame(raf); };
  }, []);

  const goSection = (i: number) => scrollToSec(SECTIONS[i].id);

  const paletteItems: PaletteItem[] = useMemo(() => [
    ...SECTIONS.map((s, i) => ({ group: 'Sections', label: `§ ${s.num} — ${s.label}`, hint: 'jump', action: () => goSection(i) })),
    ...DATA.blogs.map((e) => ({
      group: 'Writing',
      label: e.title,
      hint: (e.source || 'Read') + ' ↗',
      action: () => window.open(e.href || e.substackUrl || '#', '_blank'),
    })),
    { group: 'Commands', label: tweaks.mode === 'ink' ? 'Lights out — night mode' : 'Lights on — paper mode', hint: 'theme', action: () => update({ mode: tweaks.mode === 'ink' ? 'paper' : 'ink' }) },
    { group: 'Commands', label: tweaks.minimap === 'off' ? 'Show the occupancy map' : 'Hide the occupancy map', hint: 'minimap', action: () => update({ minimap: tweaks.minimap === 'off' ? 'on' : 'off' }) },
    { group: 'Commands', label: 'The Robotics Handbook ↗', hint: 'gitbook', action: () => window.open(DATA.contact.handbook, '_blank') },
    { group: 'Commands', label: 'Email me', hint: DATA.contact.email, action: () => { window.location.href = `mailto:${DATA.contact.email}`; } },
    { group: 'Commands', label: 'Email me (alt)', hint: DATA.contact.altEmail, action: () => { window.location.href = `mailto:${DATA.contact.altEmail}`; } },
    { group: 'Commands', label: 'GitHub ↗', hint: DATA.contact.github, action: () => window.open(`https://${DATA.contact.github}`, '_blank') },
    { group: 'Commands', label: 'LinkedIn ↗', hint: 'profile', action: () => window.open(`https://${DATA.contact.linkedin}`, '_blank') },
    { group: 'Commands', label: 'Open tweaks panel', hint: 'theme · map', action: () => setTweaksOpen(true) },
  ], [tweaks.mode, tweaks.minimap]);

  // Keyboard: ⌘K / "/" palette, J/K section nav, Ctrl+Shift+D dashboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const tag = (target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || target.isContentEditable) return;
      if (e.ctrlKey && e.shiftKey && (e.key === 'D' || e.key === 'd')) { setShowDashboard(p => !p); return; }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPaletteOpen(o => !o); return; }
      if (paletteOpen) return;
      if (e.key === '/') { e.preventDefault(); setPaletteOpen(true); return; }
      if (e.key === 'j') goSection(Math.min(active + 1, SECTIONS.length - 1));
      if (e.key === 'k') goSection(Math.max(active - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, paletteOpen]);

  return (
    <>
      <div className="grain" id="grain" style={{ display: 'none' }} />
      <Navbar active={active} odom={odom} onOpenPalette={() => setPaletteOpen(true)} />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Masthead onJump={goSection} />
        <WritingIndex />
        <Projects />
        <Skills />
        <OpenSource />
        <Experience />
        <Contact />
      </main>
      <Minimap active={active} visible={tweaks.minimap !== 'off'} onJump={goSection} />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} items={paletteItems} />
      <div className="keyhint mono" aria-hidden="true">⌘K navigate &nbsp;·&nbsp; J / K sections &nbsp;·&nbsp; / search</div>
      <TweaksPanel />
      {showDashboard && (
        <Dashboard data={DATA} onUpdate={() => {}} onClose={() => setShowDashboard(false)} />
      )}
    </>
  );
}

export default function App() {
  return (
    <TweaksProvider>
      <AtlasApp />
    </TweaksProvider>
  );
}
