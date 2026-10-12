import React, { useMemo, useState } from 'react';

type Count = 20 | 60 | 120;
type Kind = 'feature' | 'conjunction';

const W = 880;
const H = 400;
const MARGIN = 36;
const RED = '#E5391C';
const GREY = '#9A9A9C';
const RING = '#2563EB';

// Shape radius and grid chosen per count so shapes never overlap.
const LAYOUT: Record<Count, { cols: number; rows: number; r: number }> = {
  20: { cols: 7, rows: 4, r: 26 },
  60: { cols: 11, rows: 6, r: 19 },
  120: { cols: 16, rows: 8, r: 14 },
};

const mulberry32 = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

interface Item {
  x: number;
  y: number;
  shape: 'circle' | 'square';
  color: string;
  target: boolean;
}

const buildScene = (count: Count, round: number, kind: Kind): { items: Item[]; r: number } => {
  const { cols, rows, r } = LAYOUT[count];
  const cw = (W - 2 * MARGIN) / cols;
  const ch = (H - 2 * MARGIN) / rows;
  const jitter = Math.max(0, (Math.min(cw, ch) - 2 * r) / 2 - 3) * 0.9;
  const total = cols * rows;
  // Same target cell in both grids for a given round/count.
  const targetCell = Math.floor(mulberry32(round * 104729 + count)() * total);
  const rng = mulberry32(round * 7919 + count * 131 + (kind === 'feature' ? 1 : 2));
  const others = Array.from({ length: total }, (_, i) => i).filter((i) => i !== targetCell);
  for (let i = others.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [others[i], others[j]] = [others[j], others[i]];
  }
  const cells = [targetCell, ...others.slice(0, count)];
  const items = cells.map((cell, idx): Item => {
    const cx = MARGIN + (cell % cols) * cw + cw / 2 + (rng() * 2 - 1) * jitter;
    const cy = MARGIN + Math.floor(cell / cols) * ch + ch / 2 + (rng() * 2 - 1) * jitter;
    if (idx === 0) return { x: cx, y: cy, shape: 'circle', color: RED, target: true };
    if (kind === 'feature') return { x: cx, y: cy, shape: 'circle', color: GREY, target: false };
    return idx % 2 === 0
      ? { x: cx, y: cy, shape: 'square', color: RED, target: false }
      : { x: cx, y: cy, shape: 'circle', color: GREY, target: false };
  });
  return { items, r };
};

const Grid: React.FC<{ count: Count; round: number; kind: Kind; reveal: boolean }> = ({ count, round, kind, reveal }) => {
  const { items, r } = useMemo(() => buildScene(count, round, kind), [count, round, kind]);
  const target = items[0];
  const h = r * 0.9;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="block">
      <rect width={W} height={H} fill="#FFFFFF" />
      {items.map((it, i) =>
        it.shape === 'circle' ? (
          <circle key={i} cx={it.x} cy={it.y} r={r} fill={it.color} />
        ) : (
          <rect key={i} x={it.x - h} y={it.y - h} width={2 * h} height={2 * h} fill={it.color} />
        ),
      )}
      {reveal && <circle cx={target.x} cy={target.y} r={r + 10} fill="none" stroke={RING} strokeWidth={4} />}
    </svg>
  );
};

const COUNTS: Count[] = [20, 60, 120];
const ATTRIBUTES = ['Colour', 'Orientation', 'Size', 'Motion', 'Shape'];

export const PreAttentiveSearch: React.FC = () => {
  const [count, setCount] = useState<Count>(20);
  const [round, setRound] = useState(1);
  const [reveal, setReveal] = useState(false);

  const panels: { kind: Kind; title: string; note: string }[] = [
    { kind: 'feature', title: 'One difference (colour)', note: 'red circle among grey circles' },
    { kind: 'conjunction', title: 'Two differences (colour + shape)', note: 'red circle among red squares + grey circles' },
  ];

  return (
    <div className="flex-1 min-h-0 flex flex-col justify-between">
      <div className="flex items-center gap-4 h-[64px]">
        <span className="text-[24px] font-semibold text-[#525254]">Other items:</span>
        <div className="flex rounded-xl border border-[#E8E2D9] bg-white overflow-hidden">
          {COUNTS.map((c) => (
            <button
              key={c}
              onClick={() => {
                setCount(c);
                setRound((r) => r + 1);
                setReveal(false);
              }}
              className={`px-6 py-3.5 text-[24px] font-bold font-mono-code transition-colors ${
                count === c ? 'bg-[#E5391C] text-white' : 'text-[#525254] hover:bg-stone-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            setRound((r) => r + 1);
            setReveal(false);
          }}
          className="bg-[#E5391C] hover:bg-[#C92B10] text-white rounded-xl px-5 py-3.5 text-[24px] font-bold"
        >
          New round
        </button>
        <button
          onClick={() => setReveal((v) => !v)}
          className={`rounded-xl px-5 py-3.5 text-[24px] font-semibold border transition-colors ${
            reveal
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'bg-white border-[#E8E2D9] text-[#525254] hover:bg-stone-100'
          }`}
        >
          {reveal ? 'Hide target' : 'Reveal'}
        </button>
      </div>

      <div className="flex gap-6">
        {panels.map((p) => (
          <div key={p.kind} className="box-content w-[880px] shrink-0 bg-white border border-[#E8E2D9] rounded-3xl shadow-xs overflow-hidden">
            <div className="h-[48px] px-6 flex items-baseline justify-between">
              <span className="text-[30px] font-bold text-[#222222] leading-[48px]">{p.title}</span>
            </div>
            <Grid count={count} round={round} kind={p.kind} reveal={reveal} />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-[32px] leading-[1.35] font-serif-display font-medium text-[#2D2D2E]">
          A single difference jumps out in a fraction of a second, however many items there are. Two differences must be searched one item at a time.
        </p>
        <div className="flex items-center">
          <span className="text-[24px] font-mono text-[#6E6D70] pr-6">Pops out:</span>
          {ATTRIBUTES.map((a, i) => (
            <span
              key={a}
              className={`text-[28px] font-bold text-[#222222] px-6 ${i > 0 ? 'border-l border-[#E8E2D9]' : ''}`}
            >
              {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
