import type { ReactElement } from 'react';

// Engineering-drawing marks: square corners, 1px strokes on a 16px box,
// sitting on the same baseline as the mono type.
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1, vectorEffect: 'non-scaling-stroke' } as const;

const PATHS: Record<string, ReactElement> = {
  build: <g {...S}><rect x="1.5" y="4.5" width="8" height="8" /><rect x="6.5" y="1.5" width="8" height="8" /></g>,
  essay: <g {...S}><path d="M2.5 3.5h11M2.5 6.5h11M2.5 9.5h8M2.5 12.5h5" /></g>,
  paper: <g {...S}><path d="M3.5 1.5h6l3 3v10h-9z" /><path d="M9.5 1.5v3h3" /><path d="M5.5 8.5h5M5.5 11.5h3" /></g>,
  tool: <g {...S}><rect x="2.5" y="2.5" width="11" height="11" /><path d="M8 2.5v11M2.5 8h11" /></g>,
  // podium bars, tallest in the middle: reads as a placing, not a roster
  competition: <g {...S}><rect x="2" y="9.5" width="3.5" height="4.5" /><rect x="6.25" y="5.5" width="3.5" height="8.5" /><rect x="10.5" y="7.5" width="3.5" height="6.5" /></g>,
  substack: <g {...S}><path d="M3.5 2.5h9M3.5 5.5h9M3.5 8.5v5l4.5-2.5 4.5 2.5v-5z" /></g>,
  gitbook: <g {...S}><path d="M2.5 2.5h5a1 1 0 0 1 1 1v10a1 1 0 0 0-1-1h-5z" /><path d="M13.5 2.5h-5a1 1 0 0 0-1 1v10a1 1 0 0 1 1-1h5z" /></g>,
  mail: <g {...S}><rect x="1.5" y="3.5" width="13" height="9" /><path d="M1.5 3.5 8 9l6.5-5.5" /></g>,
  link: <g {...S}><path d="M6.5 2.5h7v7" /><path d="M13.5 2.5 6 10" /><path d="M11 9.5v4h-9v-9h4" /></g>,
  plus: <g {...S}><path d="M8 3v10M3 8h10" /></g>,
  minus: <g {...S}><path d="M3 8h10" /></g>,
  arrow: <g {...S}><path d="M3 8h10M9 4l4 4-4 4" /></g>,
  github: <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />,
};

export function Icon({ name }: { name?: string }) {
  return (
    <svg className="icn" viewBox="0 0 16 16" aria-hidden="true">
      {PATHS[name ?? 'link'] ?? PATHS.link}
    </svg>
  );
}
