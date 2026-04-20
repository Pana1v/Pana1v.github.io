import { useState, useEffect, useRef } from 'react';
import { DATA } from './data';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedEssay } from './components/FeaturedEssay';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { OpenSource } from './components/OpenSource';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Dashboard } from './components/Dashboard';

export const SUBSTACK_URL = 'https://substack.com/@panavraaj';

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
    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'end', marginBottom: 56 }}>
      <div style={{ minWidth: 0 }}>
        {eyebrow && (
          <div className="sh-rail">
            <div className="eyebrow" style={{ whiteSpace: 'nowrap' }}>{eyebrow}</div>
            <div className="tape-bar" />
          </div>
        )}
        <h2 className="serif" style={{ margin: 0, fontSize: 'clamp(32px, 4.2vw, 52px)', fontWeight: 400, letterSpacing: '-0.022em', lineHeight: 1.05 }}>
          {title}
        </h2>
        {kicker && (
          <p style={{ margin: '16px 0 0', maxWidth: '58ch', color: 'var(--fg-dim)', fontSize: 16, lineHeight: 1.65 }}>
            {kicker}
          </p>
        )}
      </div>
      {right && <div style={{ alignSelf: 'end', paddingBottom: 4 }}>{right}</div>}
    </div>
  );
}

export default function App() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [data, setData] = useState(DATA);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') setShowDashboard(prev => !prev);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <div className="grain" id="grain" style={{ display: 'none' }} />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <FeaturedEssay />
        <Projects />
        <Skills />
        <OpenSource />
        <Experience />
        <Contact />
      </main>
      <Footer />
      {showDashboard && (
        <Dashboard
          data={data}
          onUpdate={(d) => setData(d)}
          onClose={() => setShowDashboard(false)}
        />
      )}
    </>
  );
}
