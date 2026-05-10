import { Container, Reveal } from '../App';
import { DATA, Blog } from '../data';

export function WritingIndex({ onOpen }: { onOpen: (e: Blog) => void }) {
  return (
    <section style={{ padding: '96px 0 64px', position: 'relative', zIndex: 1 }}>
      <Container>
        <div style={{ marginBottom: 64 }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>An ongoing notebook</div>
          <h1 className="serif" style={{ margin: 0, fontSize: 'clamp(40px, 5.4vw, 72px)', fontWeight: 300, letterSpacing: '-0.028em', lineHeight: 1.04 }}>
            Notes, half-finished, mostly honest.
          </h1>
          <p style={{ marginTop: 22, fontFamily: 'var(--serif)', fontSize: 19, fontStyle: 'italic', color: 'var(--fg-dim)', maxWidth: '50ch', lineHeight: 1.5 }}>
            Things I'm learning out loud — about robotics, algorithms, and the occasional book.
          </p>
        </div>
        <div style={{ borderTop: '1px solid var(--rule)' }}>
          {DATA.blogs.map((e, i) => (
            <Reveal key={e.id} delay={i * 50}>
              <a
                href={e.substackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card-row"
                style={{
                  display: 'grid', gridTemplateColumns: '44px minmax(0, 2fr) minmax(0, 3fr) 110px',
                  gap: 24, padding: '30px 20px', borderBottom: '1px solid var(--rule)',
                  alignItems: 'baseline', cursor: 'pointer', textDecoration: 'none', color: 'inherit'
                }}
              >
                <div className="serif" style={{ fontStyle: 'italic', color: 'var(--fg-faint)', fontSize: 18 }}>{e.n}.</div>
                <div style={{ minWidth: 0 }}>
                  <h3 className="serif row-title" style={{ margin: 0, fontSize: 22, fontWeight: 500, letterSpacing: '-0.012em', lineHeight: 1.22, color: 'var(--fg)' }}>{e.title}</h3>
                  <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {e.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
                <p style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: 15, fontStyle: 'italic', color: 'var(--fg-dim)', lineHeight: 1.55 }}>{e.subtitle}</p>
                <div style={{ textAlign: 'right' }}>
                  <div className="eyebrow">{e.date}</div>
                  <div className="mono" style={{ marginTop: 6, color: 'var(--fg-faint)', fontSize: 11, letterSpacing: '0.06em' }}>{e.readTime}</div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
