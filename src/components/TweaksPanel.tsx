import { useContext } from 'react';
import { TweaksContext, Tweaks } from '../App';

export function TweaksPanel() {
  const { tweaks, update, open, setOpen } = useContext(TweaksContext);
  if (!open) return null;

  const Seg = ({ k, opts }: { k: keyof Tweaks; opts: [string, string][] }) => (
    <div className="tweak-seg">
      {opts.map(([v, l]) => (
        <button key={v} className={(tweaks[k] || opts[0][0]) === v ? 'active' : ''} onClick={() => update({ [k]: v })}>
          {l}
        </button>
      ))}
    </div>
  );

  return (
    <div className="tweak-panel">
      <h4>Tweaks <button className="admin-close" onClick={() => setOpen(false)}>×</button></h4>
      <div className="tweak-row"><label>Mode</label><Seg k="mode" opts={[['ink', 'Paper'], ['paper', 'Night']]} /></div>
      <div className="tweak-row"><label>Minimap</label><Seg k="minimap" opts={[['on', 'Show'], ['off', 'Hide']]} /></div>
      <div className="tweak-row"><label>Texture</label><Seg k="background" opts={[['grain', 'Grain'], ['flat', 'Flat']]} /></div>
    </div>
  );
}
