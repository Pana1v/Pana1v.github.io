import { DATA } from '../data';
import { Reveal, Container, SectionHeader } from '../App';

export function Contact() {
  return (
    <section className="section" id="contact-section">
      <Container>
        <SectionHeader
          eyebrow="№ 06 · Reach Out"
          title="Get in Touch"
          kicker="Open to conversations about robotics, collaboration, or interesting problems."
        />
        <div className="resp-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 56 }}>
          <Reveal>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 20, lineHeight: 1.6, color: 'var(--fg)', fontWeight: 300, maxWidth: '42ch', margin: 0 }}>
              The fastest way to reach me is email. I'm also around on GitHub and LinkedIn — feel free to open an issue, send a message, or just say hello.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 24 }}>
              {[
                { label: 'Email', value: DATA.contact.email, href: `mailto:${DATA.contact.email}` },
                { label: 'GitHub', value: DATA.contact.github, href: `https://${DATA.contact.github}` },
                { label: 'LinkedIn', value: DATA.contact.linkedin, href: `https://${DATA.contact.linkedin}` },
                { label: 'Location', value: DATA.contact.location },
              ].map((item, i) => (
                <div
                  key={item.label}
                  style={{
                    display: 'grid', gridTemplateColumns: '90px 1fr',
                    gap: 16, padding: '16px 0',
                    borderBottom: '1px solid var(--rule)', alignItems: 'baseline'
                  }}
                >
                  <div className="eyebrow">{item.label}</div>
                  {item.href ? (
                    <a className="ink-link" href={item.href} target={item.label !== 'Email' ? '_blank' : undefined} rel="noopener noreferrer" style={{ fontSize: 15 }}>
                      {item.value}
                    </a>
                  ) : (
                    <span style={{ fontSize: 15, color: 'var(--fg)' }}>{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
