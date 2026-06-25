import { Container, Reveal, Plate, DATA } from '../App';

export function OpenSource() {
  const repo = DATA.myProjects[0];
  return (
    <section className="section" id="oss-section">
      <Container>
        <Plate num="V" label="Open source" end={`${DATA.myProjects.length + DATA.contributions.length} repos`} />
        <div className="resp-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)', gap: 56, alignItems: 'start' }}>
          <Reveal>
            <a href={repo.link} target="_blank" rel="noopener" className="oss-card">
              <div className="eyebrow" style={{ marginBottom: 18 }}>Maintainer</div>
              <h3 className="serif" style={{ margin: 0, fontSize: 34, fontWeight: 400, letterSpacing: '-0.02em' }}>{repo.title}</h3>
              <div className="serif" style={{ marginTop: 8, fontStyle: 'italic', color: 'var(--fg-dim)', fontSize: 16 }}>{repo.tagline}</div>
              <p style={{ margin: '18px 0 0', color: 'var(--fg-dim)', fontSize: 14, lineHeight: 1.7 }}>{repo.description}</p>
              <div style={{ marginTop: 22, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                {repo.stack.map(t => <span key={t} className="tag">{t}</span>)}
                <span className="oss-gh mono" style={{ marginLeft: 'auto', fontSize: 11, letterSpacing: '0.08em', display: 'inline-flex', gap: 6, alignItems: 'center', whiteSpace: 'nowrap' }}>
                  <span>{repo.stars}</span>
                  <span style={{ opacity: 0.4 }}>·</span>
                  <span className="oss-gh-link">View on GitHub ↗</span>
                </span>
              </div>
            </a>
          </Reveal>
          <Reveal delay={100}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 4 }}>Upstream contributions</div>
              {DATA.contributions.map(c => (
                <a key={c.title} href={c.link} target="_blank" rel="noopener" className="card-row contrib-row">
                  <div style={{ minWidth: 0 }}>
                    <div className="row-title serif" style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.01em', overflowWrap: 'anywhere' }}>{c.title}</div>
                    <p style={{ margin: '6px 0 0', color: 'var(--fg-dim)', fontSize: 13, lineHeight: 1.6 }}>{c.description}</p>
                  </div>
                  <span className="mono" style={{ fontSize: 12, color: 'var(--fg-faint)' }}>↗</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
