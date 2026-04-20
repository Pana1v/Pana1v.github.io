import { useState } from 'react';
import { DATA } from '../data';
import { Container } from '../App';

export function Footer() {
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <footer style={{ borderTop: '1px solid var(--rule-soft)', marginTop: 80, position: 'relative', zIndex: 1 }}>
      <Container>
        <div style={{ padding: '48px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
          <div>
            <div className="serif" style={{ fontSize: 22, letterSpacing: '-0.01em', marginBottom: 8 }}>Panav.</div>
            <div style={{ color: 'var(--fg-dim)', fontSize: 13, lineHeight: 1.65, maxWidth: '28ch' }}>
              Robotics software, written from Bangalore.
            </div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Elsewhere</div>
            <div style={{ display: 'grid', gap: 8, fontSize: 14 }}>
              <a className="ink-link" href={`mailto:${DATA.contact.email}`}>Email</a>
              <a className="ink-link" href={`https://${DATA.contact.github}`}>GitHub</a>
              <a className="ink-link" href={`https://${DATA.contact.linkedin}`}>LinkedIn</a>
            </div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Now Reading</div>
            <div style={{ display: 'grid', gap: 6, fontSize: 13, color: 'var(--fg-dim)', lineHeight: 1.55, fontFamily: 'var(--serif)', fontStyle: 'italic' }}>
              <span>Probabilistic Robotics, Thrun</span>
              <span>The Elements of Computing Systems</span>
              <span>Seeing Like a State — Scott</span>
            </div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Colophon</div>
            <div style={{ color: 'var(--fg-dim)', fontSize: 13, lineHeight: 1.65, fontFamily: 'var(--serif)', fontStyle: 'italic' }}>
              Set in Fraunces & Inter Tight. Written in Bangalore, mostly after hours.
            </div>
          </div>
        </div>
        <div style={{
          borderTop: '1px solid var(--rule-soft)', padding: '20px 0',
          display: 'flex', justifyContent: 'space-between',
          color: 'var(--fg-faint)', fontSize: 12, fontFamily: 'var(--mono)',
          gap: 12, flexWrap: 'wrap', alignItems: 'center'
        }}>
          <span style={{ fontStyle: 'italic', fontFamily: 'var(--serif)', fontSize: 14, color: 'var(--fg-dim)' }}>
            Written slowly, in the margins of weekend.
          </span>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <button
              onClick={() => setAdminOpen(!adminOpen)}
              style={{
                background: 'none', border: 0, padding: 0,
                color: 'var(--fg-faint)', fontFamily: 'var(--mono)',
                fontSize: 11, cursor: 'pointer', letterSpacing: '0.14em', textTransform: 'uppercase'
              }}
            >
              {adminOpen ? '— admin' : '+ admin'}
            </button>
          </div>
        </div>
        {adminOpen && (
          <div style={{
            marginBottom: 24, padding: 18, background: '#0a0a0a',
            border: '1px solid #ffffff', fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--fg)'
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: 14, borderBottom: '1px solid var(--rule)', paddingBottom: 10
            }}>
              <span style={{ letterSpacing: '0.14em', textTransform: 'uppercase', fontSize: 11 }}>Admin · Content</span>
              <span className="mono-faint" style={{ fontSize: 10 }}>dev · localhost</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, fontSize: 11 }}>
              <div>
                <div className="mono-faint" style={{ marginBottom: 6, fontSize: 10 }}>REPO</div>
                <a className="ink-link" href="https://github.com/Pana1v/Pana1v.github.io" target="_blank" rel="noopener" style={{ fontSize: 12 }}>
                  Pana1v.github.io ↗
                </a>
              </div>
              <div>
                <div className="mono-faint" style={{ marginBottom: 6, fontSize: 10 }}>ACTIONS</div>
                <div style={{ display: 'grid', gap: 4 }}>
                  <button style={{ background: '#ffffff', color: '#000', border: 0, padding: '6px 10px', fontFamily: 'var(--mono)', fontSize: 11, textAlign: 'left', cursor: 'pointer' }}>
                    ▸ New post
                  </button>
                  <button style={{ background: 'transparent', color: 'var(--fg)', border: '1px solid var(--rule)', padding: '6px 10px', fontFamily: 'var(--mono)', fontSize: 11, textAlign: 'left', cursor: 'pointer' }}>
                    ▸ Push to main
                  </button>
                </div>
              </div>
              <div>
                <div className="mono-faint" style={{ marginBottom: 6, fontSize: 10 }}>LAST DEPLOY</div>
                <div>{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} · 14:22</div>
                <div className="mono-faint" style={{ fontSize: 10, marginTop: 4 }}>✓ green · 1m 04s</div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </footer>
  );
}
