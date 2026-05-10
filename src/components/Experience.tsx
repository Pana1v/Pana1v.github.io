import { Container, Reveal, SectionHeader } from '../App';
import { DATA } from '../data';

export function Experience() {
  return (
    <section className="section" style={{ position: 'relative' }}>
      <Container>
        <div className="folio-plate">
          <span className="num">§ V</span>
          <span>Curriculum</span>
          <span className="mid" />
          <span className="end">{DATA.experience.length} posts · {DATA.education.length} schools</span>
        </div>
        <SectionHeader
          title="Work & study"
          kicker="Where I've been, in reverse chronological order."
        />
        <div className="resp-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 56 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 24 }}>Experience</div>
            <div className="tl-rail" style={{ position: 'relative', paddingLeft: 22, borderLeft: '1px solid var(--rule)' }}>
              {DATA.experience.map((exp, i) => (
                <Reveal key={i} delay={i * 40}>
                  <div className={`tl-node ${exp.current ? 'tl-current' : ''}`} style={{ position: 'relative', paddingBottom: 36, animationDelay: `${i * 120}ms` }}>
                    <span className="tl-dot" style={{
                      position: 'absolute', left: -28, top: 7, width: 9, height: 9, borderRadius: '50%',
                      background: exp.current ? 'var(--fg)' : 'var(--bg)',
                      border: '1.5px solid var(--fg)'
                    }} />
                    <div className="eyebrow" style={{ marginBottom: 6 }}>{exp.period}</div>
                    <h3 className="serif" style={{ margin: '0 0 4px', fontSize: 19, fontWeight: 500, letterSpacing: '-0.01em' }}>{exp.role}</h3>
                    <div style={{ color: 'var(--fg-dim)', fontSize: 12, marginBottom: 10, fontFamily: 'var(--mono)', letterSpacing: '0.04em' }}>{exp.company}</div>
                    <p style={{ margin: 0, color: 'var(--fg-dim)', fontSize: 14, lineHeight: 1.7 }}>{exp.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 24 }}>Education</div>
            <div className="tl-rail" style={{ position: 'relative', paddingLeft: 22, borderLeft: '1px solid var(--rule)' }}>
              {DATA.education.map((edu, i) => (
                <Reveal key={i} delay={i * 40}>
                  <div className="tl-node" style={{ position: 'relative', paddingBottom: 36, animationDelay: `${i * 120 + 200}ms` }}>
                    <span className="tl-dot" style={{ position: 'absolute', left: -28, top: 7, width: 9, height: 9, borderRadius: '50%', background: 'var(--bg)', border: '1.5px solid var(--fg)' }} />
                    <div className="eyebrow" style={{ marginBottom: 6 }}>{edu.period}</div>
                    <h3 className="serif" style={{ margin: '0 0 4px', fontSize: 19, fontWeight: 500, letterSpacing: '-0.01em' }}>{edu.degree}</h3>
                    <div style={{ color: 'var(--fg-dim)', fontSize: 12, marginBottom: 10, fontFamily: 'var(--mono)', letterSpacing: '0.04em' }}>{edu.institution}</div>
                    <p style={{ margin: 0, color: 'var(--fg-dim)', fontSize: 14, lineHeight: 1.7 }}>{edu.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
