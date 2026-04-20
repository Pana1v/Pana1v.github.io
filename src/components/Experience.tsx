import { DATA } from '../data';
import { Reveal, Container, SectionHeader } from '../App';

export function Experience() {
  return (
    <section className="section">
      <Container>
        <SectionHeader
          eyebrow="№ 05 · Curriculum"
          title="Work & Study"
          kicker="Where I've been, in reverse chronological order."
        />
        <div className="resp-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 56 }}>
          {/* Experience */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div className="eyebrow">Experience</div>
              <div className="tape-thick" style={{ flex: 1 }} />
            </div>
            <div className="tl-rail" style={{ position: 'relative', paddingLeft: 20, borderLeft: '1px solid var(--rule)' }}>
              {DATA.experience.map((exp, i) => (
                <Reveal key={i} delay={i * 40}>
                  <div
                    className={`tl-node ${exp.current ? 'tl-current' : ''}`}
                    style={{ position: 'relative', paddingBottom: 36, animationDelay: `${i * 120}ms` }}
                  >
                    <span
                      className="tl-dot"
                      style={{
                        position: 'absolute', left: -26, top: 8,
                        width: 10, height: 10, borderRadius: '50%',
                        background: exp.current ? '#ffffff' : 'var(--bg)',
                        border: '2px solid #ffffff'
                      }}
                    />
                    <div className="eyebrow" style={{ marginBottom: 6 }}>{exp.period}</div>
                    <h3 className="serif" style={{ margin: '0 0 2px', fontSize: 20, fontWeight: 500, letterSpacing: '-0.01em' }}>
                      {exp.role}
                    </h3>
                    <div style={{ color: '#ffffff', fontSize: 13, marginBottom: 10, fontFamily: 'var(--mono)' }}>
                      {exp.company}
                    </div>
                    <p style={{ margin: 0, color: 'var(--fg-dim)', fontSize: 14, lineHeight: 1.7 }}>
                      {exp.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div className="eyebrow">Education</div>
              <div className="rule-dots" style={{ flex: 1 }} />
            </div>
            <div className="tl-rail" style={{ position: 'relative', paddingLeft: 20, borderLeft: '1px solid var(--rule)' }}>
              {DATA.education.map((edu, i) => (
                <Reveal key={i} delay={i * 40}>
                  <div
                    className="tl-node"
                    style={{ position: 'relative', paddingBottom: 36, animationDelay: `${i * 120 + 200}ms` }}
                  >
                    <span
                      className="tl-dot"
                      style={{
                        position: 'absolute', left: -26, top: 8,
                        width: 10, height: 10, borderRadius: '50%',
                        background: 'var(--bg)', border: '2px solid #ffffff'
                      }}
                    />
                    <div className="eyebrow" style={{ marginBottom: 6 }}>{edu.period}</div>
                    <h3 className="serif" style={{ margin: '0 0 2px', fontSize: 20, fontWeight: 500, letterSpacing: '-0.01em' }}>
                      {edu.degree}
                    </h3>
                    <div style={{ color: 'var(--fg-dim)', fontSize: 13, marginBottom: 10, fontFamily: 'var(--mono)' }}>
                      {edu.institution}
                    </div>
                    <p style={{ margin: 0, color: 'var(--fg-dim)', fontSize: 14, lineHeight: 1.7 }}>
                      {edu.description}
                    </p>
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
