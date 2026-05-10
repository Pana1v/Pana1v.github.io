import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { DATA } from './data';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedEssay } from './components/FeaturedEssay';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { OpenSource } from './components/OpenSource';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { WritingIndex } from './components/WritingIndex';
import { EssayReader } from './components/EssayReader';
import { TweaksPanel } from './components/TweaksPanel';
import { Dashboard } from './components/Dashboard';

export { DATA };

// --- Tweaks context ---

export interface Tweaks {
  mode: string;
  density: string;
  heroVariant: string;
  background: string;
}

const defaultTweaks: Tweaks = {
  mode: 'ink',
  density: 'spacious',
  heroVariant: 'editorial',
  background: 'grain',
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
  document.body.setAttribute('data-density', t.density);
  document.body.setAttribute('data-mode', t.mode || 'paper');
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

export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { el.classList.add('in'); io.unobserve(el); } }),
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

export function Reveal({ children, delay = 0, className = '', style }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }}>
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

export function SectionHeader({ eyebrow, title, kicker, right }: {
  eyebrow?: string;
  title: string;
  kicker?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="chapter-opener">
      {eyebrow && (
        <div className="ornament"><span className="glyph">&sect;</span><span>{eyebrow}</span></div>
      )}
      <h2>{title}</h2>
      {kicker && <p className="kicker">{kicker}</p>}
      <div className="underrule" />
      {right && <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>{right}</div>}
    </div>
  );
}

// --- Routing ---

function parseHash(): { page: string; essayId: string | null } {
  const h = window.location.hash || '';
  if (h.startsWith('#/writing/')) return { page: 'writing', essayId: h.replace('#/writing/', '') };
  if (h === '#/writing') return { page: 'writing', essayId: null };
  return { page: 'home', essayId: null };
}

export default function App() {
  const [route, setRoute] = useState(parseHash());
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const onHash = () => { setRoute(parseHash()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') setShowDashboard(prev => !prev);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigate = (p: string) => { window.location.hash = p === 'writing' ? '#/writing' : ''; };
  const openEssay = (e: typeof DATA.blogs[0] | null) => {
    window.location.hash = e ? `#/writing/${e.id}` : '#/writing';
  };
  const backToList = () => { window.location.hash = '#/writing'; };
  const currentEssay = route.page === 'writing' && route.essayId
    ? DATA.blogs.find(e => e.id === route.essayId) || null
    : null;

  return (
    <TweaksProvider>
      <div className="grain" id="grain" style={{ display: 'none' }} />
      <div className="reading-progress" id="reading-progress" />
      <Navbar page={route.page} onNavigate={navigate} currentEssay={currentEssay} onBack={backToList} />
      <main style={{ position: 'relative', zIndex: 1 }}>
        {route.page === 'home' && (
          <>
            <Hero />
            <FeaturedEssay onOpen={openEssay} />
            <Projects />
            <Skills />
            <OpenSource />
            <Experience />
          </>
        )}
        {route.page === 'writing' && !currentEssay && <WritingIndex onOpen={openEssay} />}
        {route.page === 'writing' && currentEssay && <EssayReader essay={currentEssay} onBack={backToList} />}
      </main>
      <Footer />
      <TweaksPanel />
      {showDashboard && (
        <Dashboard
          data={DATA}
          onUpdate={() => {}}
          onClose={() => setShowDashboard(false)}
        />
      )}
    </TweaksProvider>
  );
}
