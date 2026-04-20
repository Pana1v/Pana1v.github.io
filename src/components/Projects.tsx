import { DATA } from '../data';
import { Reveal, Container, SectionHeader } from '../App';

function ProjectThumb({ seed = 0, status }: { seed?: number; status?: string }) {
  const patterns = [
    // concentric arcs — SLAM / mapping
    <g key="p0">
      <rect width="120" height="84" fill="#0d0d0d" />
      {[12, 22, 32, 42, 52].map((r) => <circle key={r} cx="30" cy="60" r={r} fill="none" stroke="#ffffff" strokeWidth="0.6" opacity={0.2 + r / 100} />)}
      <circle cx="30" cy="60" r="2" fill="#ffffff" />
      <line x1="60" y1="10" x2="110" y2="70" stroke="#ffffff" strokeWidth="0.4" opacity="0.4" strokeDasharray="2 2" />
      <rect x="78" y="22" width="28" height="18" fill="none" stroke="#ffffff" strokeWidth="0.6" opacity="0.5" />
    </g>,
    // grid + node — graph / controls
    <g key="p1">
      <rect width="120" height="84" fill="#0d0d0d" />
      {Array.from({ length: 10 }).map((_, i) => <line key={`v${i}`} x1={i * 12} y1="0" x2={i * 12} y2="84" stroke="#ffffff" strokeWidth="0.3" opacity="0.15" />)}
      {Array.from({ length: 8 }).map((_, i) => <line key={`h${i}`} x1="0" y1={i * 12} x2="120" y2={i * 12} stroke="#ffffff" strokeWidth="0.3" opacity="0.15" />)}
      <path d="M 18 60 L 42 42 L 72 48 L 96 24" stroke="#ffffff" strokeWidth="1.2" fill="none" />
      {[[18, 60], [42, 42], [72, 48], [96, 24]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.5" fill="#ffffff" />)}
    </g>,
    // waveform / signal
    <g key="p2">
      <rect width="120" height="84" fill="#0d0d0d" />
      <line x1="0" y1="42" x2="120" y2="42" stroke="#ffffff" strokeWidth="0.3" opacity="0.3" />
      {Array.from({ length: 30 }).map((_, i) => {
        const h = Math.abs(Math.sin(i * 0.7) * 22) + 3;
        return <rect key={i} x={i * 4 + 2} y={42 - h} width="2" height={h * 2} fill="#ffffff" opacity={0.55 + i % 3 * 0.15} />;
      })}
    </g>,
    // crosshair / target
    <g key="p3">
      <rect width="120" height="84" fill="#0d0d0d" />
      <line x1="0" y1="42" x2="120" y2="42" stroke="#ffffff" strokeWidth="0.4" opacity="0.4" strokeDasharray="3 3" />
      <line x1="60" y1="0" x2="60" y2="84" stroke="#ffffff" strokeWidth="0.4" opacity="0.4" strokeDasharray="3 3" />
      <circle cx="60" cy="42" r="20" fill="none" stroke="#ffffff" strokeWidth="0.8" />
      <circle cx="60" cy="42" r="30" fill="none" stroke="#ffffff" strokeWidth="0.4" opacity="0.5" />
      <rect x="56" y="38" width="8" height="8" fill="#ffffff" />
    </g>,
    // diagonal hatch + bar (docs / blog tool)
    <g key="p4">
      <rect width="120" height="84" fill="#0d0d0d" />
      <defs>
        <pattern id="tthatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <rect width="1" height="6" fill="rgba(255,255,255,0.35)" />
        </pattern>
      </defs>
      <rect width="120" height="84" fill="url(#tthatch)" />
      <rect x="14" y="18" width="64" height="6" fill="#ffffff" />
      <rect x="14" y="30" width="50" height="3" fill="#ffffff" opacity="0.6" />
      <rect x="14" y="38" width="40" height="3" fill="#ffffff" opacity="0.4" />
      <rect x="14" y="52" width="88" height="3" fill="#ffffff" opacity="0.5" />
      <rect x="14" y="60" width="60" height="3" fill="#ffffff" opacity="0.3" />
    </g>,
    // polyhedron / 3D
    <g key="p5">
      <rect width="120" height="84" fill="#0d0d0d" />
      <g transform="translate(60 42)" fill="none" stroke="#ffffff" strokeWidth="0.7">
        <polygon points="-22,-18 22,-18 28,6 0,24 -28,6" />
        <polygon points="-22,-18 22,-18 0,-2" opacity="0.55" />
        <line x1="0" y1="-2" x2="28" y2="6" />
        <line x1="0" y1="-2" x2="-28" y2="6" />
        <line x1="0" y1="-2" x2="0" y2="24" />
      </g>
      <circle cx="100" cy="16" r="2" fill="#ffffff" />
      <circle cx="16" cy="68" r="2" fill="#ffffff" opacity="0.5" />
    </g>,
  ];

  const pat = patterns[seed % patterns.length];
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '120/84', background: '#0d0d0d', border: '1px solid var(--rule)', overflow: 'hidden' }}>
      <svg viewBox="0 0 120 84" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>
        {pat}
      </svg>
      <div className="mono" style={{ position: 'absolute', top: 4, left: 6, fontSize: 8, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.14em' }}>
        PLT/{String(seed + 1).padStart(2, '0')}
      </div>
      {status === 'Active' && (
        <div style={{ position: 'absolute', bottom: 4, right: 4, width: 6, height: 6, borderRadius: '50%', background: '#ffffff', animation: 'pulse-dot 1.8s ease-in-out infinite' }} />
      )}
    </div>
  );
}

export function Projects() {
  return (
    <section className="section" id="projects-section">
      <Container>
        <SectionHeader
          eyebrow="№ 02 · Index"
          title="Some Projects"
          kicker="Autonomy stacks, visualization tools, and the occasional research side-quest. Most of these are boring-on-the-surface and interesting one layer down."
        />
        <div style={{ borderTop: '1px solid var(--rule)' }}>
          {DATA.projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 40}>
              <article
                className="card-row resp-proj"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '44px 140px minmax(0, 2fr) minmax(0, 2.6fr) 110px',
                  gap: 24, padding: '32px 16px',
                  borderBottom: '1px solid var(--rule)', alignItems: 'start'
                }}
              >
                <div className="mono" style={{ fontSize: 12, color: 'var(--fg-faint)', paddingTop: 6 }}>{p.n}</div>
                <ProjectThumb seed={i} status={p.status} />
                <div style={{ minWidth: 0 }}>
                  <h3 className="serif" style={{ margin: 0, fontSize: 24, fontWeight: 400, letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                    {p.title}
                  </h3>
                  <div style={{ marginTop: 6, color: 'var(--fg-dim)', fontSize: 14, fontStyle: 'italic', fontFamily: 'var(--serif)' }}>
                    {p.subtitle}
                  </div>
                  <div style={{ marginTop: 14, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ margin: 0, color: 'var(--fg)', fontSize: 15, lineHeight: 1.7, opacity: 0.9 }}>{p.description}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="mono" style={{ fontSize: 12, color: 'var(--fg-faint)' }}>{p.year}</div>
                  {p.status === 'Active' && (
                    <div className="mono" style={{
                      marginTop: 8, fontSize: 11, color: 'var(--fg)',
                      letterSpacing: '0.1em', display: 'inline-flex',
                      alignItems: 'center', gap: 8, textTransform: 'uppercase'
                    }}>
                      <span className="dot-live" />{p.status}
                    </div>
                  )}
                  {p.status && p.status !== 'Active' && (
                    <div className="label-outline" style={{ marginTop: 8 }}>{p.status}</div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
