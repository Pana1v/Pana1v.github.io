import { Container } from '../App';
import { DATA } from '../data';

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--rule-soft)', marginTop: 80, position: 'relative', zIndex: 1 }}>
      <Container>
        <div style={{ padding: '56px 0 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40 }}>
          <div>
            <div className="serif" style={{ fontSize: 22, letterSpacing: '-0.015em', marginBottom: 10 }}>Panav</div>
            <div style={{ color: 'var(--fg-dim)', fontSize: 14, lineHeight: 1.65, maxWidth: '30ch' }}>Robotics software, written from Bangalore.</div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Elsewhere</div>
            <div style={{ display: 'grid', gap: 10, fontSize: 14 }}>
              <a className="ink-link" href={`mailto:${DATA.contact.email}`}>Email</a>
              <a className="ink-link" href={`https://${DATA.contact.github}`}>GitHub</a>
              <a className="ink-link" href={`https://${DATA.contact.linkedin}`}>LinkedIn</a>
            </div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Currently reading</div>
            <div style={{ display: 'grid', gap: 8, fontSize: 14, color: 'var(--fg-dim)', lineHeight: 1.5, fontFamily: 'var(--serif)', fontStyle: 'italic' }}>
              <span>Probabilistic Robotics, Thrun</span>
              <span>The Elements of Computing Systems</span>
              <span>Seeing Like a State, Scott</span>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--rule-soft)', padding: '22px 0', display: 'flex', justifyContent: 'space-between', color: 'var(--fg-faint)', fontSize: 12, fontFamily: 'var(--mono)', gap: 12, flexWrap: 'wrap', alignItems: 'center', letterSpacing: '0.04em' }}>
          <span>© {new Date().getFullYear()} Panav. Built by hand.</span>
          <a className="ink-link mono" href="https://github.com/Pana1v/Pana1v.github.io" target="_blank" rel="noopener" style={{ fontSize: 11, letterSpacing: '0.08em' }}>Source ↗</a>
        </div>
      </Container>
    </footer>
  );
}
