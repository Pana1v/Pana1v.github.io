import { Container, Reveal, Plate, DATA } from '../App';
import { MediaStrip } from './MediaStrip';

export function Projects() {
  return (
    <section className="section" id="projects-section">
      <Container>
        <Plate num="III" label="Selected work" end={`${DATA.projects.length} builds`} />
        <div>
          {DATA.projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 50}>
              <div>
                <article className="scan-row proj-row">
                  <div className="mono" style={{ fontSize: 11, color: 'var(--fg-faint)', letterSpacing: '0.1em' }}>{p.n}</div>
                  <div style={{ minWidth: 0 }}>
                    <h3 className="serif" style={{ margin: 0, fontSize: 24, fontWeight: 500, letterSpacing: '-0.015em' }}>{p.title}</h3>
                    <div className="serif" style={{ marginTop: 6, fontStyle: 'italic', color: 'var(--fg-dim)', fontSize: 15 }}>{p.subtitle}</div>
                    {(p.github || p.demo) && (
                      <div style={{ marginTop: 10, display: 'flex', gap: 14 }}>
                        {p.github && <a className="ink-link mono" href={p.github} target="_blank" rel="noopener" style={{ fontSize: 11, letterSpacing: '0.06em', textDecoration: 'underline', textUnderlineOffset: 3 }}>GitHub ↗</a>}
                        {p.demo && <a className="ink-link mono" href={p.demo} target="_blank" rel="noopener" style={{ fontSize: 11, letterSpacing: '0.06em', textDecoration: 'underline', textUnderlineOffset: 3 }}>Demo ↗</a>}
                      </div>
                    )}
                  </div>
                  <p style={{ margin: 0, color: 'var(--fg-dim)', fontSize: 14, lineHeight: 1.65 }}>{p.description}</p>
                  <div style={{ textAlign: 'right' }}>
                    <div className="eyebrow">{p.year}</div>
                    {p.status && <div className="mono" style={{ marginTop: 6, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>{p.status}</div>}
                    <div style={{ marginTop: 10, display: 'flex', gap: 6, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                      {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                  </div>
                </article>
                {(p.image || p.motion) && <MediaStrip still={p.image} motion={p.motion} />}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
