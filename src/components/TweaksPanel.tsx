import { useContext } from 'react';
import { TweaksContext } from '../App';

export function TweaksPanel() {
  const { tweaks, update, open, setOpen } = useContext(TweaksContext);
  if (!open) return null;
  return (
    <div className="tweak-panel">
      <h4>Tweaks <button className="admin-close" onClick={() => setOpen(false)}>×</button></h4>
      <div className="tweak-row">
        <label>Mode</label>
        <div className="tweak-seg">
          {(['paper', 'ink'] as const).map(v => (
            <button key={v} className={tweaks.mode === v ? 'active' : ''} onClick={() => update({ mode: v })}>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="tweak-row">
        <label>Density</label>
        <div className="tweak-seg">
          {(['compact', 'comfortable', 'spacious'] as const).map(d => (
            <button key={d} className={tweaks.density === d ? 'active' : ''} onClick={() => update({ density: d })}>
              {d.slice(0, 4)}
            </button>
          ))}
        </div>
      </div>
      <div className="tweak-row">
        <label>Hero</label>
        <div className="tweak-seg">
          {([['editorial', 'Edit'], ['portrait', 'Port'], ['grid', 'Grid']] as const).map(([v, l]) => (
            <button key={v} className={tweaks.heroVariant === v ? 'active' : ''} onClick={() => update({ heroVariant: v })}>
              {l}
            </button>
          ))}
        </div>
      </div>
      <div className="tweak-row">
        <label>Background</label>
        <div className="tweak-seg">
          {([['flat', 'Flat'], ['grain', 'Grain']] as const).map(([v, l]) => (
            <button key={v} className={tweaks.background === v ? 'active' : ''} onClick={() => update({ background: v })}>
              {l}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
