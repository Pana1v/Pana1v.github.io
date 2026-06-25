import { Container, Reveal, Plate, DATA } from '../App';

export function Skills() {
  return (
    <section className="section" id="skills-section">
      <Container>
        <Plate num="IV" label="Toolkit" end="Shaped by what robots need" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '40px 32px' }}>
          {Object.entries(DATA.skills).map(([cat, list], i) => (
            <Reveal key={cat} delay={i * 40}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid var(--rule)' }}>{cat}</div>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, fontFamily: 'var(--mono)', fontSize: 12, lineHeight: 2.1, color: 'var(--fg-dim)', letterSpacing: '0.02em' }}>
                  {list.map(s => <li key={s}>{s}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
