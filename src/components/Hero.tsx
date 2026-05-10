import { useContext } from 'react';
import { Container, Reveal, TweaksContext } from '../App';
import { DATA } from '../data';

function HeroEditorial() {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  return (
    <section style={{ position: 'relative', padding: '72px 0 56px' }}>
      <Container>
        <Reveal>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 18, marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
            <span className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>Bangalore</span>
            <span className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>{dateStr}</span>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="masthead">Panav<span style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--fg-dim)', marginLeft: '0.04em' }}>.</span></h1>
          <div className="masthead-rule thick" style={{ marginTop: 12 }} />
        </Reveal>
        <div className="resp-hero-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2.2fr) minmax(0, 1fr)', gap: 72, alignItems: 'start', marginTop: 56 }}>
          <Reveal delay={180}>
            <p style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: 'clamp(20px, 1.7vw, 26px)', lineHeight: 1.45, color: 'var(--fg)', fontWeight: 300, letterSpacing: '-0.005em', maxWidth: '32ch' }}>
              Robotics software engineer at <em style={{ fontWeight: 400 }}>Eternal.ag</em>. I write autonomy stacks for machines that have to make decisions in unpredictable places.
            </p>
            <p style={{ marginTop: 22, color: 'var(--fg-dim)', fontSize: 15, lineHeight: 1.7, maxWidth: '54ch' }}>
              My work sits at the seam between perception, planning, and the physical world. This site is where I collect what I build and what I'm thinking about: mostly SLAM, controls, and the unglamorous engineering that makes robots actually work.
            </p>
            <div style={{ marginTop: 36, display: 'flex', gap: 28, flexWrap: 'wrap' }}>
              <a className="ink-link mono" style={{ fontSize: 12 }} href="#writing-section">Read the writing →</a>
              <a className="ink-link mono" style={{ fontSize: 12 }} href="#projects-section">See the work →</a>
              <a className="ink-link mono" style={{ fontSize: 12 }} href={`mailto:${DATA.contact.email}`}>Get in touch →</a>
            </div>
          </Reveal>
          <Reveal delay={260}>
            <div style={{ borderLeft: '1px solid var(--rule)', paddingLeft: 28 }}>
              <div className="eyebrow" style={{ marginBottom: 22 }}>Now</div>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 22 }}>
                {DATA.currently.map((c, i) => (
                  <li key={i}>
                    <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-faint)', marginBottom: 4 }}>{c.label}</div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: 15, color: 'var(--fg)', lineHeight: 1.4 }}>{c.value}</div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function HeroPortrait() {
  return (
    <section style={{ position: 'relative', padding: '80px 0 64px' }}>
      <Container>
        <div className="resp-hero-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)', gap: 64, alignItems: 'center' }}>
          <Reveal>
            <div style={{ maxWidth: 320, aspectRatio: '3/4', background: 'var(--ink-1)', border: '1px solid var(--rule)', display: 'flex', alignItems: 'end', justifyContent: 'center', padding: 16 }}>
              <svg viewBox="0 0 200 260" width="100%" style={{ display: 'block' }}>
                <rect width="200" height="260" fill="var(--ink-2)" />
                <circle cx="100" cy="100" r="46" fill="var(--ink-8)" />
                <path d="M 30 260 C 30 180, 170 180, 170 260 Z" fill="var(--ink-8)" />
              </svg>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>{DATA.dateline}</div>
            <h1 className="serif hero-headline" style={{ margin: 0, fontSize: 'clamp(44px, 6.4vw, 84px)', fontWeight: 400, lineHeight: 1.0, letterSpacing: '-0.025em' }}>Panav.</h1>
            <p style={{ marginTop: 24, fontFamily: 'var(--serif)', fontSize: 22, lineHeight: 1.5, color: 'var(--fg-dim)', maxWidth: '42ch' }}>{DATA.shortBio}</p>
            <div style={{ marginTop: 28, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              <a className="ink-link mono" style={{ fontSize: 13 }} href="#writing-section">Writing →</a>
              <a className="ink-link mono" style={{ fontSize: 13 }} href="#projects-section">Work →</a>
              <a className="ink-link mono" style={{ fontSize: 13 }} href={`mailto:${DATA.contact.email}`}>Contact →</a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function HeroGrid() {
  return (
    <section style={{ position: 'relative', padding: '80px 0', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(var(--rule-soft) 1px, transparent 1px), linear-gradient(90deg, var(--rule-soft) 1px, transparent 1px)', backgroundSize: '40px 40px', maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, #000 40%, transparent 85%)', WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, #000 40%, transparent 85%)', opacity: 0.7, zIndex: 0 }} />
      <Container style={{ position: 'relative', zIndex: 1 }}>
        <div className="eyebrow" style={{ marginBottom: 20 }}>{DATA.dateline}</div>
        <h1 className="serif hero-headline" style={{ margin: 0, fontSize: 'clamp(56px, 10vw, 148px)', fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 0.92 }}>
          <span className="hl-rule">Where</span> am I?
        </h1>
        <p style={{ marginTop: 32, fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 22, color: 'var(--fg-dim)', maxWidth: '44ch', lineHeight: 1.55 }}>
          The first question any robot has to answer. I spend my days helping them answer it a little better.
        </p>
      </Container>
    </section>
  );
}

export function Hero() {
  const { tweaks } = useContext(TweaksContext);
  if (tweaks.heroVariant === 'portrait') return <HeroPortrait />;
  if (tweaks.heroVariant === 'grid') return <HeroGrid />;
  return <HeroEditorial />;
}
