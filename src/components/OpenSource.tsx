import { Container, Reveal, SectionHeader } from '../App';
import { DATA } from '../data';

export function OpenSource() {
  return (
    <section className="section" style={{ position: 'relative' }}>
      <Container>
        <div className="folio-plate">
          <span className="num">§ IV</span>
          <span>Open source</span>
          <span className="mid" />
          <span className="end">Maintained &amp; contributed</span>
        </div>
        <SectionHeader title="What I maintain & where I contribute" />
        <div style={{ marginBottom: 64 }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>Maintained</div>
          <div className="resp-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
            {DATA.myProjects.map((p, i) => (
              <Reveal key={p.title} delay={i * 50}>
                <a
                  href={p.link} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'block', textDecoration: 'none', color: 'inherit',
                    padding: 28, background: 'var(--bg-elev)', border: '1px solid var(--rule)',
                    transition: 'border-color 240ms ease', position: 'relative'
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--fg-dim)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--rule)'; }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, marginBottom: 8 }}>
                    <h3 className="serif" style={{ margin: 0, fontSize: 24, fontWeight: 500, letterSpacing: '-0.012em' }}>{p.title}</h3>
                    <span className="mono" style={{ fontSize: 12, color: 'var(--fg-dim)' }}>{p.stars}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--fg-dim)', fontSize: 14, marginBottom: 16 }}>{p.tagline}</div>
                  <p style={{ margin: 0, color: 'var(--fg-dim)', fontSize: 14, lineHeight: 1.65 }}>{p.description}</p>
                  <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {p.stack.map(s => <span key={s} className="tag">{s}</span>)}
                    </div>
                    <span className="mono" style={{ fontSize: 11, color: 'var(--fg-faint)', letterSpacing: '0.08em' }}>github ↗</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
        <div>
          <div className="eyebrow" style={{ marginBottom: 18 }}>Contributions elsewhere</div>
          <div style={{ borderTop: '1px solid var(--rule)' }}>
            {DATA.contributions.map((o, i) => (
              <Reveal key={o.title} delay={i * 40}>
                <a
                  href={o.link} target="_blank" rel="noopener noreferrer" className="card-row"
                  style={{
                    display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.8fr) 80px',
                    gap: 24, padding: '22px 20px', borderBottom: '1px solid var(--rule)',
                    textDecoration: 'none', color: 'inherit', alignItems: 'baseline'
                  }}
                >
                  <h3 className="serif row-title" style={{ margin: 0, fontSize: 17, fontWeight: 500, letterSpacing: '-0.005em', lineHeight: 1.3, overflowWrap: 'anywhere', color: 'var(--fg)' }}>{o.title}</h3>
                  <p style={{ margin: 0, color: 'var(--fg-dim)', fontSize: 14, lineHeight: 1.6 }}>{o.description}</p>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--fg-faint)', textAlign: 'right', letterSpacing: '0.08em' }}>visit ↗</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
