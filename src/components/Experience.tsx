import { Container, Reveal, Plate, DATA } from '../App';

export function Experience() {
  return (
    <section className="section" id="experience-section">
      <Container>
        <Plate num="VI" label="The record" end="Experience & education" />
        <div className="resp-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: 64, alignItems: 'start' }}>
          <div>
            {DATA.experience.map((x, i) => (
              <Reveal key={x.company} delay={i * 60}>
                <div className="record-row">
                  <div>
                    <div className="mono" style={{ fontSize: 11, color: x.current ? 'var(--fg)' : 'var(--fg-faint)', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
                      {x.current && <span className="dot-live" style={{ marginRight: 8 }} />}{x.period}
                    </div>
                  </div>
                  <div>
                    <h3 className="serif" style={{ margin: 0, fontSize: 22, fontWeight: 500, letterSpacing: '-0.012em' }}>{x.role}</h3>
                    <div className="mono" style={{ marginTop: 4, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>{x.company}</div>
                    <p style={{ margin: '12px 0 0', color: 'var(--fg-dim)', fontSize: 14, lineHeight: 1.7 }}>{x.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <div style={{ borderLeft: '1px solid var(--rule)', paddingLeft: 28 }}>
              <div className="eyebrow" style={{ marginBottom: 20 }}>Education</div>
              {DATA.education.map(e => (
                <div key={e.institution} style={{ marginBottom: 28 }}>
                  <div className="serif" style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.01em' }}>{e.institution}</div>
                  <div className="serif" style={{ marginTop: 4, fontStyle: 'italic', color: 'var(--fg-dim)', fontSize: 14 }}>{e.degree}</div>
                  <div className="mono" style={{ marginTop: 6, fontSize: 11, color: 'var(--fg-faint)', letterSpacing: '0.08em' }}>{e.period}</div>
                  <p style={{ margin: '10px 0 0', color: 'var(--fg-dim)', fontSize: 13, lineHeight: 1.65 }}>{e.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
