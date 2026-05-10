import { useState, useEffect } from 'react';
import { Container } from '../App';
import { DATA } from '../data';

export function Navbar({ page, onNavigate, currentEssay, onBack }: {
  page: string;
  onNavigate: (p: string) => void;
  currentEssay: any;
  onBack: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const inReader = page === 'writing' && currentEssay;
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'var(--nav-scrolled-bg)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
      borderBottom: scrolled ? '1px solid var(--rule-soft)' : '1px solid transparent',
      transition: 'background 280ms ease, border-color 280ms ease'
    }}>
      <Container>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68, gap: 24 }}>
          <button onClick={() => onNavigate('home')} style={{ background: 'none', border: 0, cursor: 'pointer', color: 'var(--fg)', display: 'inline-flex', alignItems: 'center', gap: 12, padding: 0 }}>
            <span className="serif" style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-0.015em' }}>Panav</span>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            {inReader ? (
              <button className="navlink" onClick={onBack}>← Index</button>
            ) : (
              <>
                <button className={`navlink ${page === 'home' ? 'active' : ''}`} onClick={() => onNavigate('home')}>
                  <span style={{ color: 'var(--fg-faint)', marginRight: 6 }}>01</span>Work
                </button>
                <button className={`navlink ${page === 'writing' ? 'active' : ''}`} onClick={() => onNavigate('writing')}>
                  <span style={{ color: 'var(--fg-faint)', marginRight: 6 }}>02</span>Writing
                </button>
                <a className="navlink" href={`mailto:${DATA.contact.email}`}>
                  <span style={{ color: 'var(--fg-faint)', marginRight: 6 }}>03</span>Contact
                </a>
              </>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
}
