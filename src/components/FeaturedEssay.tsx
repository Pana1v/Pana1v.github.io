import { DATA } from '../data';
import { Reveal, Container, SectionHeader, SUBSTACK_URL } from '../App';

export function FeaturedEssay() {
  const essay = DATA.blogs[0];
  if (!essay) return null;

  return (
    <section className="section" id="writing-section" style={{ position: 'relative' }}>
      <Container>
        <SectionHeader
          eyebrow="№ 01 · From the Blog"
          title="Currently Writing"
          right={<a className="navlink" href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">All writings →</a>}
        />
        <Reveal>
          <a
            href={SUBSTACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="card-row"
            style={{
              display: 'grid', textDecoration: 'none', color: 'inherit',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)',
              gap: 48, padding: '40px 16px',
              borderTop: '1px solid var(--rule)',
              borderBottom: '1px solid var(--rule)'
            }}
          >
            <div>
              <div className="mono-faint" style={{ marginBottom: 12, fontStyle: 'italic', fontFamily: 'var(--serif)', fontSize: 14 }}>
                Essay № {essay.n}
              </div>
              <div className="eyebrow">{essay.date} · {essay.readTime}</div>
              <div style={{ marginTop: 14, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {essay.tags.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
            <div style={{ minWidth: 0 }}>
              <h3 className="serif" style={{
                margin: 0,
                fontSize: 'clamp(30px, 3.6vw, 44px)',
                fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.1
              }}>
                {essay.title}
              </h3>
              <p style={{
                margin: '12px 0 20px', fontFamily: 'var(--serif)',
                fontStyle: 'italic', color: 'var(--fg-dim)', fontSize: 20, lineHeight: 1.5
              }}>
                {essay.subtitle}
              </p>
              <p style={{ margin: 0, color: 'var(--fg-dim)', fontSize: 16, lineHeight: 1.7, maxWidth: '56ch' }}>
                {essay.excerpt}
              </p>
              <div style={{ marginTop: 20 }}>
                <span className="ink-link mono" style={{ fontSize: 13 }}>Read on Substack →</span>
              </div>
            </div>
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
