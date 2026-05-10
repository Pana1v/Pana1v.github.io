import { Container, Reveal, SectionHeader } from '../App';
import { DATA, Blog } from '../data';

export function FeaturedEssay({ onOpen }: { onOpen: (e: Blog | null) => void }) {
  const essay = DATA.blogs[0];
  return (
    <section className="section" id="writing-section" style={{ position: 'relative' }}>
      <Container>
        <div className="folio-plate">
          <span className="num">§ I</span>
          <span>Currently writing</span>
          <span className="mid" />
          <span className="end">{DATA.blogs.length} essays</span>
        </div>
        <SectionHeader
          title="From the notebook"
          right={<button className="navlink" onClick={() => onOpen(null)}>All essays →</button>}
        />
        <Reveal>
          <article
            onClick={() => onOpen(essay)}
            className="card-row"
            style={{
              cursor: 'pointer', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2.4fr)',
              gap: 56, padding: '36px 20px', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)'
            }}
          >
            <div>
              <div className="eyebrow" style={{ marginBottom: 10 }}>Essay {essay.n} · {essay.readTime}</div>
              <div className="mono" style={{ fontSize: 12, color: 'var(--fg-faint)' }}>{essay.date}</div>
              <div style={{ marginTop: 16, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {essay.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
            <div style={{ minWidth: 0 }}>
              <h3 className="serif row-title" style={{ margin: 0, fontSize: 'clamp(28px, 3.2vw, 40px)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.12, color: 'var(--fg)' }}>{essay.title}</h3>
              <p style={{ margin: '10px 0 18px', fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--fg-dim)', fontSize: 18, lineHeight: 1.5 }}>{essay.subtitle}</p>
              <p style={{ margin: 0, color: 'var(--fg-dim)', fontSize: 15, lineHeight: 1.7, maxWidth: '58ch' }}>{essay.excerpt}</p>
              <div style={{ marginTop: 22 }}><span className="ink-link mono" style={{ fontSize: 12 }}>Continue reading →</span></div>
            </div>
          </article>
        </Reveal>
      </Container>
    </section>
  );
}
