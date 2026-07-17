import { useState, useEffect } from 'react';
import { Container, SECTIONS, scrollToSec, DATA } from '../App';

export function Navbar({ active, odom, onOpenPalette }: {
  active: number;
  odom: number;
  onOpenPalette: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 10);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  const sec = SECTIONS[active] || SECTIONS[0];

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 90,
      background: scrolled ? 'var(--nav-scrolled-bg)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
      borderBottom: scrolled ? '1px solid var(--rule-soft)' : '1px solid transparent',
      transition: 'background 280ms ease, border-color 280ms ease',
    }}>
      <Container>
        <div className="nav-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64, gap: 24 }}>
          <a
            className="ink-link serif"
            href="#top"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-0.015em' }}
          >
            Panav.
          </a>

          <button
            className="odometer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            title="Scroll odometry: how far you've driven through the page. Click to return to the start."
          >
            <span className="dot-live" />
            <span className="odo-value">{(odom / 100).toFixed(1)}<span className="odo-unit">m</span></span>
            <span className="odo-label">driven</span>
            <span className="odo-sec">§ {sec.num} {sec.label}</span>
            <span className="odo-tip">you're driving a robot through the page · click to reset</span>
          </button>

          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <button className="navlink" onClick={() => scrollToSec('writing-section')}>Writing</button>
            <button className="navlink" onClick={() => scrollToSec('projects-section')}>Projects</button>
            <a className="navlink nav-handbook" href={DATA.contact.handbook} target="_blank" rel="noopener">Handbook ↗</a>
            <button className="navlink" onClick={() => scrollToSec('contact-section')}>Contact</button>
            <button className="cmdk-chip" title="Command palette (⌘K or /)" onClick={onOpenPalette}>⌘K</button>
          </div>
        </div>
      </Container>
    </nav>
  );
}
