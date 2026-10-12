import React from 'react';
import type { CompareVisualKey } from '../../data/session2Types';

/**
 * Small inline illustrations for the compare layout (840 x 190 real px, 1 SVG unit = 1 px).
 * Text inside is only the validated 22 px minimum.
 */
const W = 840;
const H = 190;
const GREY = '#B9B4AB';
const RED = '#E5391C';
const INK = '#2D2D2E';

/** deterministic 0..1 pseudo-random so renders are stable */
const rnd = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const dotGrid = () => {
  const cols = 14;
  const rows = 4;
  const pts: { x: number; y: number }[] = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      pts.push({ x: 40 + c * 58 + (rnd(r * 20 + c) - 0.5) * 14, y: 28 + r * 44 + (rnd(r * 31 + c + 7) - 0.5) * 12 });
  return pts;
};

const PopOut: React.FC = () => {
  const pts = dotGrid();
  const target = 21;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {pts.map((p, i) =>
        i === target ? null : <circle key={i} cx={p.x} cy={p.y} r={13} fill={GREY} />,
      )}
      <circle cx={pts[target].x} cy={pts[target].y} r={26} fill="none" stroke={RED} strokeWidth={3} strokeDasharray="6 6" />
      <circle cx={pts[target].x} cy={pts[target].y} r={14} fill={RED} />
    </svg>
  );
};

const SerialScan: React.FC = () => {
  const pts = dotGrid();
  // boustrophedon path through the first rows: the eye inspects one item after another
  const order = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 27, 26, 25, 24, 23, 22];
  const path = order.map((i) => `${pts[i].x},${pts[i].y}`).join(' ');
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <defs>
        <marker id="arr-scan" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={INK} />
        </marker>
      </defs>
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={13} fill={GREY} />
      ))}
      <polyline points={path} fill="none" stroke={INK} strokeWidth={3} strokeDasharray="8 6" markerEnd="url(#arr-scan)" />
      <circle cx={pts[order[0]].x} cy={pts[order[0]].y} r={16} fill="none" stroke={INK} strokeWidth={3} />
    </svg>
  );
};

/** a page wireframe with first-look dots; flat = even blocks and scattered looks, ranked = hierarchy and clustered looks */
const Wire: React.FC<{ ranked: boolean }> = ({ ranked }) => {
  const dots = (cx: number, cy: number, spread: number, n: number, seed: number) =>
    Array.from({ length: n }, (_, i) => (
      <circle
        key={`${seed}-${i}`}
        cx={cx + (rnd(seed + i) - 0.5) * spread}
        cy={cy + (rnd(seed + i + 40) - 0.5) * spread * 0.55}
        r={7}
        fill={RED}
        fillOpacity={0.9}
        stroke="#FFFFFF"
        strokeWidth={2}
      />
    ));
  if (!ranked) {
    const blocks = [0, 1, 2].flatMap((c) => [0, 1].map((r) => ({ x: 20 + c * 270, y: 12 + r * 88 })));
    return (
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {blocks.map((b, i) => (
          <rect key={i} x={b.x} y={b.y} width={250} height={76} rx={10} fill="#ECE8E1" stroke="#D5CFC7" strokeWidth={2} />
        ))}
        {blocks.map((b, i) => dots(b.x + 125, b.y + 38, 150, 4, i * 11 + 3))}
      </svg>
    );
  }
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <rect x={20} y={12} width={110} height={26} rx={8} fill="#ECE8E1" />
      <rect x={560} y={12} width={260} height={26} rx={8} fill="#ECE8E1" />
      <rect x={20} y={52} width={470} height={52} rx={10} fill="#2D2D2E" />
      <rect x={20} y={116} width={260} height={56} rx={12} fill={RED} />
      <rect x={520} y={52} width={300} height={120} rx={10} fill="#ECE8E1" />
      <rect x={300} y={128} width={190} height={34} rx={8} fill="#ECE8E1" />
      {dots(255, 78, 110, 6, 5)}
      {dots(150, 144, 110, 5, 17)}
      {dots(670, 112, 90, 1, 29)}
      <circle cx={40} cy={78} r={16} fill="#FFFFFF" stroke={INK} strokeWidth={2} />
      <text x={40} y={86} fontSize={22} fontWeight={700} textAnchor="middle" fill={INK}>1</text>
      <circle cx={300} cy={144} r={16} fill="#FFFFFF" stroke={INK} strokeWidth={2} />
      <text x={300} y={152} fontSize={22} fontWeight={700} textAnchor="middle" fill={INK}>2</text>
    </svg>
  );
};

export const CompareVisual: React.FC<{ kind: CompareVisualKey }> = ({ kind }) => {
  switch (kind) {
    case 'popOut': return <PopOut />;
    case 'serialScan': return <SerialScan />;
    case 'wireFlat': return <Wire ranked={false} />;
    case 'wireRanked': return <Wire ranked />;
  }
};
