import { Container, Reveal } from '../App';
import { DATA } from '../data';

export function Skills() {
  const entries = Object.entries(DATA.skills);
  const total = entries.length;
  return (
    <section className="section" style={{ position: 'relative' }}>
      <Container>
        <div className="folio-plate">
          <span className="num">§ III</span>
          <span>Apparatus</span>
          <span className="mid" />
          <span className="end">{String(total).padStart(2, '0')} categories</span>
        </div>
        <div style={{ marginBottom: 36 }}>
          <h2 className="serif" style={{ margin: 0, fontSize: 'clamp(30px, 3.6vw, 44px)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.08 }}>Tools &amp; interests</h2>
          <p style={{ margin: '14px 0 0', maxWidth: '58ch', color: 'var(--fg-dim)', fontSize: 15, lineHeight: 1.65 }}>
            An incomplete list of things I reach for. Shaped more by what robots need than what's fashionable.
          </p>
        </div>
        <div>
          {entries.map(([cat, items], i) => (
            <Reveal key={cat} delay={i * 50}>
              <div className="toc-row">
                <span className="toc-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="toc-title">{cat}</span>
                <span className="toc-leader" />
                <span className="toc-items">{items.join(' · ')}</span>
                <span className="toc-count">{String(items.length).padStart(2, '0')}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
