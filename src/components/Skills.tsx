import { DATA } from '../data';
import { Reveal, Container, SectionHeader } from '../App';

export function Skills() {
  const entries = Object.entries(DATA.skills);
  const symbols: Record<string, string> = {
    Systems: 'Sys', Autonomy: 'Aut', Perception: 'Per',
    Simulation: 'Sim', Embedded: 'Emb', Web: 'Web'
  };
  const textures = ['tex-stripes', 'tex-dots', 'tex-grid', 'tex-hatch', 'tex-scan', 'tex-dots-dense'];

  return (
    <section className="section">
      <Container>
        <SectionHeader
          eyebrow="№ 03 · Apparatus"
          title="Tools & Interests"
          kicker="An incomplete list of things I reach for. Shaped more by what robots need than what's fashionable."
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 0, border: '1px solid var(--rule)',
          borderRight: 0, borderBottom: 0
        }}>
          {entries.map(([cat, items], i) => {
            const tex = textures[i % textures.length];
            const sym = symbols[cat] || cat.slice(0, 3);
            return (
              <Reveal key={cat} delay={i * 50}>
                <div style={{
                  borderRight: '1px solid var(--rule)',
                  borderBottom: '1px solid var(--rule)',
                  padding: '28px 24px', position: 'relative',
                  minHeight: 260, display: 'flex', flexDirection: 'column'
                }}>
                  <div className={tex} style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }} />
                  <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 18 }}>
                    <div style={{
                      width: 52, height: 52,
                      border: '1px solid var(--fg)',
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                      background: 'var(--bg)', position: 'relative'
                    }}>
                      <div className="mono" style={{ fontSize: 8, letterSpacing: '0.14em', color: 'var(--fg-faint)', position: 'absolute', top: 3, left: 4 }}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div className="serif" style={{ fontSize: 19, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--fg)' }}>{sym}</div>
                      <div className="mono" style={{ fontSize: 8, letterSpacing: '0.1em', color: 'var(--fg-faint)', position: 'absolute', bottom: 3, right: 4 }}>
                        {items.length}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="eyebrow" style={{ fontSize: 9 }}>Category</div>
                      <h4 className="serif" style={{ margin: '4px 0 0', fontSize: 20, fontWeight: 500, letterSpacing: '-0.01em' }}>{cat}</h4>
                    </div>
                  </div>
                  <div className="rule-dots" style={{ position: 'relative', marginBottom: 14 }} />
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '4px 10px', position: 'relative' }}>
                    {items.map((s, j) => (
                      <li key={s} style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--fg-dim)', display: 'inline-flex', alignItems: 'baseline', gap: 4 }}>
                        <span style={{ color: 'var(--fg-faint)', fontSize: 9 }}>{String(j + 1).padStart(2, '0')}</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
