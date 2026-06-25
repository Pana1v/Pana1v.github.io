import { Container, Reveal, SECTIONS, scrollToSec, DATA } from '../App';

export function Masthead({ onJump }: { onJump: (i: number) => void }) {
  const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <section
      id="sec-masthead"
      style={{ minHeight: '92svh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: 26, gap: 48 }}
    >
      <Container>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--fg-faint)', display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <span>Bangalore · {DATA.coords}</span>
          <span className="masthead-date">{dateStr}</span>
        </div>
      </Container>

      <Container>
        <Reveal>
          <h1 className="masthead">Panav<span style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--fg-dim)' }}>.</span></h1>
          <div className="masthead-rule thick" style={{ marginTop: 14 }} />
        </Reveal>

        <div className="resp-hero-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2.2fr) minmax(0, 1fr)', gap: 64, marginTop: 44, alignItems: 'start' }}>
          <Reveal delay={140}>
            <p style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: 'clamp(19px, 1.6vw, 25px)', lineHeight: 1.45, fontWeight: 300, letterSpacing: '-0.005em', maxWidth: '34ch' }}>
              Robotics software engineer at <em style={{ fontWeight: 400 }}>Eternal.ag</em>. I write autonomy stacks for machines that have to make decisions in unpredictable places.
            </p>
            <div style={{ marginTop: 30, display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
              <a className="cta-stamp solid" href="#writing-section" onClick={(e) => { e.preventDefault(); scrollToSec('writing-section'); }}>Read the writing <span className="arr">→</span></a>
              <a className="cta-stamp" href="#projects-section" onClick={(e) => { e.preventDefault(); scrollToSec('projects-section'); }}>See the work <span className="arr">→</span></a>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <div style={{ borderLeft: '1px solid var(--rule)', paddingLeft: 26 }}>
              <div className="eyebrow" style={{ marginBottom: 18 }}>Now</div>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 18 }}>
                {DATA.currently.map((c, i) => (
                  <li key={i}>
                    <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-faint)', marginBottom: 4 }}>{c.label}</div>
                    {c.href ? (
                      <a className="ink-link" href={c.href} target="_blank" rel="noopener" style={{ fontFamily: 'var(--serif)', fontSize: 15, lineHeight: 1.4, textDecoration: 'underline', textDecorationColor: 'var(--rule)', textUnderlineOffset: 3 }}>{c.value}</a>
                    ) : (
                      <div style={{ fontFamily: 'var(--serif)', fontSize: 15, lineHeight: 1.4 }}>{c.value}</div>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </Container>

      <Container>
        <Reveal delay={320}>
          <div className="survey-strip">
            {SECTIONS.slice(1).map((s, i) => (
              <button key={s.id} className="survey-item" onClick={() => onJump(i + 1)}>
                <span className="survey-num serif">{s.num}</span>
                <span>{s.label}</span>
              </button>
            ))}
            <span className="survey-hint">scroll to begin mapping ↓</span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
