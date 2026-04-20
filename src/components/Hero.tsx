import { DATA } from '../data';
import { Reveal, Container } from '../App';

export function Hero() {
  return (
    <section style={{ position: 'relative', padding: '88px 0 72px' }}>
      <Container>
        <Reveal>
          <h1
            className="serif hero-headline"
            style={{
              margin: 0,
              fontSize: 'clamp(56px, 9vw, 128px)',
              lineHeight: 0.94,
              fontWeight: 300,
              letterSpacing: '-0.035em',
              maxWidth: '14ch'
            }}
          >
            Robots, <em className="hl-em">and the</em>{' '}
            <span className="hl-rule">messy</span> physical world
            <span className="caret" />
          </h1>
        </Reveal>

        <div
          className="resp-hero-grid"
          style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 1fr)', gap: 56, alignItems: 'start', marginTop: 48 }}
        >
          <Reveal delay={120}>
            <p style={{
              margin: 0, fontFamily: 'var(--serif)',
              fontSize: 'clamp(20px, 1.6vw, 24px)', lineHeight: 1.55,
              color: 'var(--fg)', fontWeight: 300, maxWidth: '48ch'
            }}>
              I'm <strong style={{ fontWeight: 500 }}>{DATA.name.split(' ')[0]}</strong>, a robotics software engineer currently at <em>{DATA.experience[0]?.company}</em>. {DATA.shortBio.split('. ').slice(1).join('. ')}
            </p>
            <p style={{ marginTop: 24, color: 'var(--fg-dim)', fontSize: 16, lineHeight: 1.7, maxWidth: '52ch' }}>
              My work sits at the seam between perception, planning, and the physical world. This site is where I collect the things I build and the things I'm thinking about — mostly SLAM, controls, and the unglamorous engineering that makes robots actually work.
            </p>
            <div style={{ marginTop: 28, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              <a className="ink-link mono" style={{ fontSize: 13 }} href="#writing-section">Read the writing →</a>
              <a className="ink-link mono" style={{ fontSize: 13 }} href="#projects-section">See the work →</a>
              <a className="ink-link mono" style={{ fontSize: 13 }} href={`mailto:${DATA.contact.email}`}>Get in touch →</a>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <figure style={{ margin: 0, position: 'relative', maxWidth: 220, marginLeft: 'auto' }}>
              <div className="eyebrow" style={{ position: 'absolute', top: -18, left: 0, fontSize: 9 }}>Fig. 01</div>
              <div className="tex-dots" style={{ position: 'absolute', inset: '-14px -14px -14px 0', pointerEvents: 'none', zIndex: 0, opacity: 0.55 }} />
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', overflow: 'hidden', zIndex: 1 }}>
                <svg viewBox="0 0 300 375" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>
                  <defs>
                    <pattern id="hatchL" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                      <rect width="1" height="5" fill="rgba(255,255,255,0.55)" />
                    </pattern>
                    <pattern id="hatchD" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
                      <rect width="0.8" height="4" fill="rgba(255,255,255,0.22)" />
                    </pattern>
                    <pattern id="dotsTiny" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="0.7" fill="rgba(255,255,255,0.18)" />
                    </pattern>
                    <pattern id="scan" x="0" y="0" width="1" height="3" patternUnits="userSpaceOnUse">
                      <rect width="1" height="1" fill="rgba(255,255,255,0.08)" />
                    </pattern>
                  </defs>
                  <rect width="300" height="375" fill="#0a0a0a" />
                  <rect x="0" y="0" width="100" height="375" fill="url(#hatchD)" />
                  <rect x="200" y="0" width="100" height="375" fill="url(#dotsTiny)" />
                  <line x1="0" y1="250" x2="300" y2="250" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
                  <line x1="0" y1="252" x2="300" y2="252" stroke="#ffffff" strokeWidth="0.4" opacity="0.4" strokeDasharray="2 4" />
                  <circle cx="150" cy="130" r="95" fill="none" stroke="#ffffff" strokeWidth="0.6" opacity="0.25" strokeDasharray="1 3" />
                  <circle cx="150" cy="130" r="78" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.4" />
                  <g>
                    <path d="M 60 375 L 60 280 C 60 232, 240 232, 240 280 L 240 375 Z" fill="#ededed" />
                    <path d="M 60 375 L 60 280 C 60 232, 240 232, 240 280 L 240 375 Z" fill="url(#scan)" />
                    <rect x="130" y="215" width="40" height="40" fill="#1a1a1a" opacity="0.5" />
                    <circle cx="150" cy="130" r="62" fill="#f2f2f2" />
                    <path d="M 150 68 A 62 62 0 0 1 212 130 L 150 130 Z" fill="url(#hatchL)" opacity="0.3" />
                    <ellipse cx="125" cy="142" rx="10" ry="5" fill="#d8d8d8" opacity="0.5" />
                    <rect x="118" y="118" width="64" height="3" fill="#0a0a0a" />
                    <rect x="118" y="118" width="22" height="3" fill="#ffffff" />
                    <line x1="142" y1="165" x2="158" y2="165" stroke="#1a1a1a" strokeWidth="1.2" />
                  </g>
                  <g stroke="#ffffff" strokeWidth="0.8" fill="none" opacity="0.7">
                    <path d="M 8 8 L 8 20 M 8 8 L 20 8" />
                    <path d="M 292 8 L 292 20 M 292 8 L 280 8" />
                    <path d="M 8 367 L 8 355 M 8 367 L 20 367" />
                    <path d="M 292 367 L 292 355 M 292 367 L 280 367" />
                  </g>
                  <g fontFamily="ui-monospace, monospace" fontSize="7" fill="rgba(255,255,255,0.55)" letterSpacing="0.8">
                    <text x="10" y="32">12°58'N</text>
                    <text x="10" y="42">77°36'E</text>
                    <text x="240" y="368" textAnchor="start">A/01</text>
                  </g>
                  <g fill="rgba(255,255,255,0.12)">
                    {Array.from({ length: 16 }).map((_, k) => <rect key={k} x="2" y={20 + k * 22} width="3" height="10" />)}
                  </g>
                </svg>
              </div>
              <figcaption className="eyebrow" style={{ marginTop: 10, display: 'flex', justifyContent: 'flex-end', gap: 8, position: 'relative', zIndex: 2, fontSize: 10 }}>
                <span>BLR · '26</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div
          className="resp-hero-grid"
          style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 48, alignItems: 'start', marginTop: 56, paddingTop: 32, borderTop: '1px solid var(--rule-soft)' }}
        >
          {DATA.currently.slice(0, 2).map((c, i) => (
            <Reveal key={i} delay={280 + i * 60}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 6 }}>{c.label}</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 17, color: 'var(--fg)', lineHeight: 1.4 }}>{c.value}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
