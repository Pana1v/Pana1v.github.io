import { useState, useEffect } from 'react';
import { DATA } from '../data';
import { Container, SUBSTACK_URL } from '../App';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(0,0,0,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
      borderBottom: scrolled ? '1px solid var(--rule-soft)' : '1px solid transparent',
      transition: 'background 280ms ease, border-color 280ms ease'
    }}>
      <Container>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68, gap: 24 }}>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{ background: 'none', border: 0, cursor: 'pointer', color: 'var(--fg)', display: 'inline-flex', alignItems: 'center', gap: 12, padding: 0, textDecoration: 'none' }}
          >
            <span className="serif" style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-0.015em' }}>
              Panav
            </span>
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            <a className="navlink" href="#projects-section">
              <span style={{ color: 'var(--fg-faint)', marginRight: 6 }}>01</span>Work
            </a>
            <a className="navlink" href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">
              <span style={{ color: 'var(--fg-faint)', marginRight: 6 }}>02</span>Writing
            </a>
            <a className="navlink" href="#contact-section">
              <span style={{ color: 'var(--fg-faint)', marginRight: 6 }}>03</span>Contact
            </a>
          </div>
        </div>
      </Container>
    </nav>
  );
}
