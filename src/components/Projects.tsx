import { Container, Reveal, SectionHeader } from '../App';
import { DATA } from '../data';

function ProjectThumb({ image, seed = 0 }: { image?: string; seed?: number }) {
  if (image) {
    return (
      <div style={{ position: 'relative', width: '100%', aspectRatio: '120/84', background: 'var(--ink-2)', border: '1px solid var(--rule)', overflow: 'hidden' }}>
        <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    );
  }

  const patterns = [
    <g key="p0">
      <rect width="120" height="84" fill="var(--ink-2)" />
      {[14, 26, 38, 50].map(r => <circle key={r} cx="34" cy="58" r={r} fill="none" stroke="var(--fg-dim)" strokeWidth="0.6" opacity="0.4" />)}
      <circle cx="34" cy="58" r="2" fill="var(--fg)" />
      <line x1="60" y1="14" x2="104" y2="66" stroke="var(--fg-dim)" strokeWidth="0.4" strokeDasharray="2 3" />
    </g>,
    <g key="p1">
      <rect width="120" height="84" fill="var(--ink-2)" />
      {Array.from({ length: 8 }).map((_, i) => <line key={`v${i}`} x1={i * 16 + 4} y1="8" x2={i * 16 + 4} y2="76" stroke="var(--fg-dim)" strokeWidth="0.3" opacity="0.3" />)}
      {Array.from({ length: 5 }).map((_, i) => <line key={`h${i}`} x1="4" y1={i * 14 + 14} x2="116" y2={i * 14 + 14} stroke="var(--fg-dim)" strokeWidth="0.3" opacity="0.3" />)}
      <path d="M 20 60 L 44 44 L 72 50 L 96 28" stroke="var(--fg)" strokeWidth="1.2" fill="none" />
      {[[20, 60], [44, 44], [72, 50], [96, 28]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.4" fill="var(--fg)" />)}
    </g>,
    <g key="p2">
      <rect width="120" height="84" fill="var(--ink-2)" />
      <line x1="8" y1="42" x2="112" y2="42" stroke="var(--fg-dim)" strokeWidth="0.4" opacity="0.5" />
      {Array.from({ length: 22 }).map((_, i) => {
        const h = Math.abs(Math.sin(i * 0.7) * 18) + 3;
        return <rect key={i} x={i * 5 + 8} y={42 - h} width="2" height={h * 2} fill="var(--fg)" opacity="0.65" />;
      })}
    </g>,
    <g key="p3">
      <rect width="120" height="84" fill="var(--ink-2)" />
      <line x1="8" y1="42" x2="112" y2="42" stroke="var(--fg-dim)" strokeWidth="0.4" strokeDasharray="3 3" opacity="0.5" />
      <line x1="60" y1="6" x2="60" y2="78" stroke="var(--fg-dim)" strokeWidth="0.4" strokeDasharray="3 3" opacity="0.5" />
      <circle cx="60" cy="42" r="18" fill="none" stroke="var(--fg)" strokeWidth="0.8" />
      <circle cx="60" cy="42" r="28" fill="none" stroke="var(--fg-dim)" strokeWidth="0.4" />
      <circle cx="60" cy="42" r="3" fill="var(--fg)" />
    </g>,
    <g key="p4">
      <rect width="120" height="84" fill="var(--ink-2)" />
      <rect x="16" y="22" width="64" height="4" fill="var(--fg)" />
      <rect x="16" y="32" width="50" height="3" fill="var(--fg-dim)" opacity="0.7" />
      <rect x="16" y="40" width="40" height="3" fill="var(--fg-dim)" opacity="0.5" />
      <rect x="16" y="54" width="88" height="3" fill="var(--fg-dim)" opacity="0.6" />
      <rect x="16" y="62" width="60" height="3" fill="var(--fg-dim)" opacity="0.4" />
    </g>,
    <g key="p5">
      <rect width="120" height="84" fill="var(--ink-2)" />
      <g transform="translate(60 42)" fill="none" stroke="var(--fg)" strokeWidth="0.7">
        <polygon points="-22,-16 22,-16 28,8 0,24 -28,8" />
        <polygon points="-22,-16 22,-16 0,-2" />
        <line x1="0" y1="-2" x2="28" y2="8" />
        <line x1="0" y1="-2" x2="-28" y2="8" />
        <line x1="0" y1="-2" x2="0" y2="24" />
      </g>
    </g>
  ];
  const pat = patterns[seed % patterns.length];
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '120/84', background: 'var(--ink-2)', border: '1px solid var(--rule)', overflow: 'hidden' }}>
      <svg viewBox="0 0 120 84" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>{pat}</svg>
    </div>
  );
}

export function Projects() {
  return (
    <section className="section" id="projects-section" style={{ position: 'relative' }}>
      <Container>
        <div className="folio-plate">
          <span className="num">§ II</span>
          <span>Selected work</span>
          <span className="mid" />
          <span className="end">{String(DATA.projects.length).padStart(2, '0')} entries</span>
        </div>
        <SectionHeader
          title="Projects"
          kicker="Autonomy stacks, visualization tools, and the occasional research side-quest. Most are boring on the surface and interesting one layer down."
        />
        <div style={{ borderTop: '1px solid var(--rule)' }}>
          {DATA.projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 40}>
              <article className="card-row resp-proj" style={{
                display: 'grid',
                gridTemplateColumns: '36px 200px minmax(0, 2fr) minmax(0, 2.6fr) 96px',
                gap: 28, padding: '32px 20px', borderBottom: '1px solid var(--rule)', alignItems: 'start'
              }}>
                <div className="mono" style={{ fontSize: 11, color: 'var(--fg-faint)', paddingTop: 6, letterSpacing: '0.08em' }}>{p.n}</div>
                <ProjectThumb image={p.image} seed={i} />
                <div style={{ minWidth: 0 }}>
                  <h3 className="serif row-title" style={{ margin: 0, fontSize: 22, fontWeight: 500, letterSpacing: '-0.012em', lineHeight: 1.2, color: 'var(--fg)' }}>{p.title}</h3>
                  <div style={{ marginTop: 4, color: 'var(--fg-dim)', fontSize: 13, fontStyle: 'italic', fontFamily: 'var(--serif)' }}>{p.subtitle}</div>
                  <div style={{ marginTop: 14, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ margin: 0, color: 'var(--fg-dim)', fontSize: 14, lineHeight: 1.7 }}>{p.description}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--fg-faint)', letterSpacing: '0.08em' }}>{p.year}</div>
                  {p.status === 'Active' && (
                    <div className="mono" style={{ marginTop: 10, fontSize: 10, color: 'var(--fg)', letterSpacing: '0.14em', display: 'inline-flex', alignItems: 'center', gap: 6, textTransform: 'uppercase' }}>
                      <span className="dot-live" />Live
                    </div>
                  )}
                  {p.status && p.status !== 'Active' && <div className="label-outline" style={{ marginTop: 10 }}>{p.status}</div>}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
