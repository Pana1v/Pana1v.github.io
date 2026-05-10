import { useEffect } from 'react';
import { Container } from '../App';
import { DATA, Blog } from '../data';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';

export function EssayReader({ essay, onBack }: { essay: Blog; onBack: () => void }) {
  useEffect(() => {
    const bar = document.getElementById('reading-progress');
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.max(0, Math.min(1, window.scrollY / h)) : 0;
      if (bar) bar.style.transform = `scaleX(${p})`;
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (bar) bar.style.transform = 'scaleX(0)';
    };
  }, [essay]);

  return (
    <article style={{ padding: '48px 0 120px', position: 'relative', zIndex: 1 }}>
      <Container size="tight">
        <button onClick={onBack} className="navlink" style={{ marginBottom: 40 }}>← All essays</button>
        <header style={{ marginBottom: 48 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Essay No {essay.n} · {essay.date} · {essay.readTime}</div>
          <h1 className="serif" style={{ margin: 0, fontSize: 'clamp(36px, 5.2vw, 64px)', fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.05 }}>{essay.title}</h1>
          <p style={{ marginTop: 18, fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 22, lineHeight: 1.5, color: 'var(--fg-dim)', maxWidth: '48ch' }}>{essay.subtitle}</p>
          <div style={{ marginTop: 24, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {essay.tags.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
        </header>
        <hr style={{ border: 0, height: 1, background: 'var(--rule)', marginBottom: 40 }} />
        <div className="prose">
          <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex, rehypeRaw]}>
            {essay.content}
          </ReactMarkdown>
        </div>
        <hr style={{ border: 0, height: 1, background: 'var(--rule)', margin: '80px 0 32px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 6 }}>Written by</div>
            <div className="serif" style={{ fontSize: 18 }}>Panav, {essay.date}</div>
          </div>
          <button onClick={onBack} className="ink-link mono" style={{ fontSize: 13, background: 'none', border: 0, cursor: 'pointer', padding: 0 }}>← Back to the index</button>
        </div>

        {(() => {
          const others = DATA.blogs.filter(e => e.id !== essay.id).slice(0, 2);
          if (!others.length) return null;
          return (
            <div style={{ marginTop: 80 }}>
              <div className="eyebrow" style={{ marginBottom: 20 }}>Continue</div>
              <div style={{ borderTop: '1px solid var(--rule)' }}>
                {others.map(e => (
                  <a
                    key={e.id}
                    href={`#/writing/${e.id}`}
                    onClick={ev => { ev.preventDefault(); window.location.hash = `#/writing/${e.id}`; }}
                    className="card-row"
                    style={{
                      display: 'grid', gridTemplateColumns: '36px minmax(0, 2fr) minmax(0, 2fr) 80px',
                      gap: 20, padding: '20px 12px', borderBottom: '1px solid var(--rule)',
                      textDecoration: 'none', color: 'inherit', alignItems: 'baseline'
                    }}
                  >
                    <div className="serif" style={{ fontStyle: 'italic', color: 'var(--fg-faint)', fontSize: 16 }}>{e.n}.</div>
                    <h3 className="serif" style={{ margin: 0, fontSize: 18, fontWeight: 400, letterSpacing: '-0.01em' }}>{e.title}</h3>
                    <p style={{ margin: 0, fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--fg-dim)', fontSize: 14 }}>{e.subtitle}</p>
                    <div className="mono" style={{ fontSize: 12, color: 'var(--fg-faint)', textAlign: 'right' }}>{e.readTime}</div>
                  </a>
                ))}
              </div>
            </div>
          );
        })()}
      </Container>
    </article>
  );
}
