import { useState, useEffect, useRef, useMemo, Fragment } from 'react';

export interface PaletteItem {
  group: string;
  label: string;
  hint?: string;
  action: () => void;
}

export function CommandPalette({ open, setOpen, items }: {
  open: boolean;
  setOpen: (v: boolean) => void;
  items: PaletteItem[];
}) {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t
      ? items.filter(it => (it.label + ' ' + (it.hint || '') + ' ' + it.group).toLowerCase().includes(t))
      : items;
  }, [q, items]);

  useEffect(() => {
    if (open) { setQ(''); setSel(0); setTimeout(() => inputRef.current?.focus(), 30); }
  }, [open]);
  useEffect(() => { setSel(0); }, [q]);

  if (!open) return null;

  const run = (it: PaletteItem) => { setOpen(false); it.action(); };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel(s => Math.min(s + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel(s => Math.max(s - 1, 0)); }
    else if (e.key === 'Enter' && filtered[sel]) { e.preventDefault(); run(filtered[sel]); }
    else if (e.key === 'Escape') { setOpen(false); }
  };

  let lastGroup: string | null = null;
  return (
    <div className="palette-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
      <div className="palette" onKeyDown={onKey}>
        <div className="palette-input-row">
          <span className="mono" style={{ color: 'var(--fg-faint)', fontSize: 12 }}>→</span>
          <input
            ref={inputRef}
            className="palette-input"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Where to? Type a section, essay, or command…"
            spellCheck={false}
          />
          <span className="palette-esc">esc</span>
        </div>
        <div className="palette-list">
          {filtered.length === 0 && <div className="palette-empty">No matches. The map is finite.</div>}
          {filtered.map((it, i) => {
            const showGroup = it.group !== lastGroup;
            lastGroup = it.group;
            return (
              <Fragment key={it.label + i}>
                {showGroup && <div className="palette-group">{it.group}</div>}
                <button
                  className={`palette-item ${i === sel ? 'sel' : ''}`}
                  onMouseEnter={() => setSel(i)}
                  onClick={() => run(it)}
                >
                  <span className="palette-item-label">{it.label}</span>
                  {it.hint && <span className="palette-item-hint">{it.hint}</span>}
                </button>
              </Fragment>
            );
          })}
        </div>
        <div className="palette-foot">
          <span>↑↓ move</span><span>↵ go</span><span>esc close</span>
        </div>
      </div>
    </div>
  );
}
