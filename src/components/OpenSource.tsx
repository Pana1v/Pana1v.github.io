import { DATA } from '../data';
import { Reveal, Container, SectionHeader } from '../App';

export function OpenSource() {
  return (
    <section className="section">
      <Container>
        <SectionHeader eyebrow="№ 04 · Open Source" title="What I Maintain & Where I Contribute" />

        {/* Maintained projects */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              — Maintained <span className="dot-live" style={{ width: 6, height: 6 }} />
            </div>
            <div className="tape-bar" style={{ flex: 1, opacity: 0.6 }} />
          </div>
          <div className="resp-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
            {DATA.myProjects.map((p, i) => (
              <Reveal key={p.title} delay={i * 50}>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block', textDecoration: 'none', color: 'inherit',
                    padding: 28, background: 'var(--bg-elev)',
                    border: '1px solid var(--rule)',
                    transition: 'all 300ms ease', position: 'relative', overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ffffff'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--rule)'; e.currentTarget.style.transform = 'none'; }}
                >
                  <div className="tex-dots" style={{ position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none' }} />
                  <div style={{ position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, marginBottom: 10 }}>
                      <h3 className="serif" style={{ margin: 0, fontSize: 26, fontWeight: 500, letterSpacing: '-0.01em' }}>{p.title}</h3>
                      <span className="mono" style={{ fontSize: 12, color: '#ffffff' }}>{p.stars}</span>
                    </div>
                    <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--fg-dim)', fontSize: 15, marginBottom: 16 }}>{p.tagline}</div>
                    <p style={{ margin: 0, color: 'var(--fg-dim)', fontSize: 14, lineHeight: 1.65 }}>{p.description}</p>
                    <div style={{ marginTop: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {p.stack.map((s) => <span key={s} className="tag">{s}</span>)}
                      </div>
                      <span className="mono" style={{ fontSize: 12, color: 'var(--fg-faint)' }}>github ↗</span>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Contributions elsewhere */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div className="tex-stripes-strong" style={{ width: 28, height: 10 }} />
            <div className="eyebrow">— Contributions Elsewhere</div>
            <div className="rule-dots" style={{ flex: 1 }} />
          </div>
          <div style={{ borderTop: '1px solid var(--rule)' }}>
            {DATA.contributions.map((o, i) => (
              <Reveal key={o.title} delay={i * 40}>
                <a
                  href={o.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-row resp-contrib"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.8fr) 80px',
                    gap: 24, padding: '22px 16px',
                    borderBottom: '1px solid var(--rule)',
                    textDecoration: 'none', color: 'inherit', alignItems: 'baseline'
                  }}
                >
                  <h3 className="serif" style={{ margin: 0, fontSize: 18, fontWeight: 500, letterSpacing: '-0.005em', lineHeight: 1.3, wordBreak: 'break-word' }}>
                    {o.title}
                  </h3>
                  <p style={{ margin: 0, color: 'var(--fg-dim)', fontSize: 14, lineHeight: 1.6 }}>{o.description}</p>
                  <span className="mono" style={{ fontSize: 12, color: 'var(--fg-faint)', textAlign: 'right' }}>↗ visit</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
