import { Container, Reveal, Plate, DATA } from '../App';

export function Contact() {
  const c = DATA.contact;
  return (
    <section className="section" id="contact-section" style={{ paddingBottom: 40 }}>
      <Container>
        <Plate num="VII" label="Destination reached" end="MAPPED 100%" />
        <Reveal>
          <h2 className="serif" style={{ margin: '12px 0 0', fontSize: 'clamp(48px, 8vw, 110px)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 0.98 }}>
            Say <em style={{ fontWeight: 300 }}>hello.</em>
          </h2>
          <p className="serif" style={{ margin: '26px 0 0', fontStyle: 'italic', fontWeight: 300, color: 'var(--fg-dim)', fontSize: 18, maxWidth: '48ch', lineHeight: 1.6 }}>
            For robots that need to know where they are, tools that need to be lighter, or essays that need an argument.
          </p>
          <div style={{ marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <a className="cta-stamp solid" href={`mailto:${c.email}`}>{c.email} <span className="arr">→</span></a>
            <a className="cta-stamp" href={`mailto:${c.altEmail}`}>{c.altEmail} <span className="arr">→</span></a>
            <a className="cta-stamp" href={`https://${c.github}`} target="_blank" rel="noopener">GitHub <span className="arr">↗</span></a>
            <a className="cta-stamp" href={`https://${c.linkedin}`} target="_blank" rel="noopener">LinkedIn <span className="arr">↗</span></a>
            <a className="cta-stamp" href={c.handbook} target="_blank" rel="noopener">Handbook <span className="arr">↗</span></a>
          </div>
        </Reveal>

        {DATA.achievements.length > 0 && (
          <Reveal delay={120}>
            <div style={{ marginTop: 64 }}>
              <div className="eyebrow" style={{ marginBottom: 18 }}>Selected honors</div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 12, maxWidth: '70ch' }}>
                {DATA.achievements.map((a, i) => (
                  <li key={i} className="serif" style={{ display: 'flex', gap: 14, fontSize: 15, color: 'var(--fg-dim)', lineHeight: 1.5 }}>
                    <span className="mono" style={{ color: 'var(--fg-faint)', fontSize: 11, paddingTop: 4 }}>{String(i + 1).padStart(2, '0')}</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}

        <div className="colophon">
          <span>© {new Date().getFullYear()} Panav.</span>
          <div style={{ display: 'flex', gap: 22, alignItems: 'center' }}>
            <a className="ink-link mono" href="https://github.com/Pana1v/Pana1v.github.io" target="_blank" rel="noopener" style={{ fontSize: 11, letterSpacing: '0.08em' }}>Source ↗</a>
            <button className="ink-link mono" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ fontSize: 11, letterSpacing: '0.08em', background: 'none', border: 0, cursor: 'pointer', padding: 0 }}>Top ↑</button>
          </div>
        </div>
      </Container>
    </section>
  );
}
