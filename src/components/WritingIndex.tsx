import { Container, Reveal, Plate, DATA } from '../App';
import { MediaStrip } from './MediaStrip';

export function WritingIndex() {
  const essays = DATA.blogs;
  return (
    <section className="section" id="writing-section">
      <Container>
        <Plate num="II" label="Writing" end={`${essays.length} posts`} />
        <div style={{ borderBottom: '1px solid var(--rule)' }}>
          {essays.map((e, i) => (
            <Reveal key={e.id} delay={i * 60}>
              <div>
                <a className="card-row essay-row" href={e.href || e.substackUrl || '#'} target="_blank" rel="noopener">
                  <div className="essay-roman serif">{e.n}</div>
                  <div style={{ minWidth: 0 }}>
                    <h3 className="row-title serif essay-title">{e.title}</h3>
                    <p className="essay-sub serif">{e.subtitle}</p>
                    <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {e.tags.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                  </div>
                  <div className="essay-meta">
                    <div className="eyebrow">{e.source || 'Substack'}</div>
                    <div className="mono" style={{ marginTop: 6, fontSize: 11, color: 'var(--fg-faint)', letterSpacing: '0.06em' }}>{e.date}</div>
                    <div className="row-arrow" style={{ marginTop: 12 }}>{e.readTime} ↗</div>
                  </div>
                </a>
                {(e.image || e.motion) && (
                  <MediaStrip
                    still={e.image}
                    motion={e.motion}
                    stillCaption="Debug overlay"
                    motionCaption="Task board, multi-angle"
                  />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
