import React, { useRef, useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';

const NS = [2, 4, 8, 16] as const;
type Layout = 'Ordered' | 'Shuffled';
const LAYOUTS: Layout[] = ['Ordered', 'Shuffled'];
const MAX_TRIALS = 6;
const MONO = 'JetBrains Mono, monospace';
const BLUE = '#2563EB';
const TERRACOTTA = '#E5391C';

interface Cell {
  rts: number[];
  errors: number;
}
type Data = Record<string, Cell>;
const keyOf = (n: number, layout: Layout) => `${n}-${layout}`;

const shuffled = (n: number) => {
  const a = Array.from({ length: n }, (_, i) => i + 1);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

type Phase = 'idle' | 'running' | 'hit';

const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-2';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white disabled:opacity-50 disabled:hover:bg-[#E5391C]`;

export const HickArenaDemo: React.FC = () => {
  const [n, setN] = useState<number>(4);
  const [layout, setLayout] = useState<Layout>('Ordered');
  const [data, setData] = useState<Data>({});
  const [phase, setPhase] = useState<Phase>('idle');
  const [target, setTarget] = useState(0);
  const [items, setItems] = useState<number[]>([]);
  const [last, setLast] = useState<number | null>(null);
  const t0 = useRef(0);
  const prevTarget = useRef(0);

  const cell = data[keyOf(n, layout)] ?? { rts: [], errors: 0 };
  const finished = cell.rts.length >= MAX_TRIALS;
  const hasData = Object.values(data).some((c) => c.rts.length > 0);

  const changeSetup = (nextN: number, nextLayout: Layout) => {
    setN(nextN);
    setLayout(nextLayout);
    setPhase('idle');
    setLast(null);
    prevTarget.current = 0;
  };

  const start = () => {
    let t = 0;
    do {
      t = 1 + Math.floor(Math.random() * n);
    } while (t === prevTarget.current);
    prevTarget.current = t;
    setTarget(t);
    setItems(layout === 'Ordered' ? Array.from({ length: n }, (_, i) => i + 1) : shuffled(n));
    setPhase('running');
    t0.current = performance.now();
  };

  const click = (value: number) => {
    if (phase !== 'running') return;
    const k = keyOf(n, layout);
    if (value !== target) {
      setData((d) => ({ ...d, [k]: { rts: cell.rts, errors: cell.errors + 1 } }));
      return;
    }
    const rt = performance.now() - t0.current;
    setLast(rt);
    setData((d) => ({ ...d, [k]: { rts: [...cell.rts, rt], errors: cell.errors } }));
    setPhase('hit');
  };

  const reset = () => {
    setData({});
    setPhase('idle');
    setLast(null);
    prevTarget.current = 0;
  };

  const cols = n === 2 ? 2 : 4;
  const rows = Math.ceil(n / cols);

  return (
    <div className="flex-1 min-h-0 flex gap-6 overflow-hidden">
      {/* Left: controls + arena (1150 px) */}
      <div className="w-[1150px] flex-shrink-0 flex flex-col gap-3 min-h-0">
        <div className="h-16 flex items-center gap-4 flex-shrink-0">
          <div className="flex items-center rounded-xl border border-[#E8E2D9] bg-white overflow-hidden">
            <span className="px-4 text-[24px] font-mono text-[#6E6D70]">Choices</span>
            {NS.map((v) => (
              <button
                key={v}
                onClick={() => changeSetup(v, layout)}
                className={`h-16 w-[72px] text-[24px] font-bold ${
                  v === n ? 'bg-[#E5391C] text-white' : 'text-[#525254] hover:bg-stone-100'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <div className="flex items-center rounded-xl border border-[#E8E2D9] bg-white overflow-hidden">
            {LAYOUTS.map((l) => (
              <button
                key={l}
                onClick={() => changeSetup(n, l)}
                className={`h-16 px-5 text-[24px] font-bold ${
                  l === layout ? 'bg-[#E5391C] text-white' : 'text-[#525254] hover:bg-stone-100'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="flex-1" />
          <button onClick={reset} className={SECONDARY}>
            <RotateCcw className="w-6 h-6" />
            Reset
          </button>
        </div>

        <div className="h-16 flex items-center justify-between gap-4 flex-shrink-0">
          <div className="text-[40px] font-serif-display font-medium leading-none text-[#E5391C] whitespace-nowrap">
            {phase === 'running' ? `Click: ${target}` : phase === 'hit' ? `${Math.round(last ?? 0)} ms` : 'Ready'}
          </div>
          <div className="text-[24px] font-mono text-[#525254] whitespace-nowrap">
            Trial {cell.rts.length}/{MAX_TRIALS} · Errors {cell.errors}
          </div>
          <button onClick={start} disabled={finished || phase === 'running'} className={PRIMARY}>
            <Play className="w-6 h-6" />
            {finished ? 'Done' : cell.rts.length === 0 && phase === 'idle' ? 'Start trial' : 'Next target'}
          </button>
        </div>

        <div className="flex-1 min-h-0 bg-white border border-[#E8E2D9] rounded-3xl shadow-xs p-4">
          {phase === 'running' ? (
            <div
              className="w-full h-full grid gap-3"
              style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}
            >
              {items.map((v) => (
                <button
                  key={v}
                  onClick={() => click(v)}
                  className="rounded-xl bg-[#FAF9F6] border-2 border-[#E8E2D9] hover:border-[#E5391C] hover:bg-[#FDF5F3] text-[#222222] text-[56px] font-mono font-bold leading-none"
                >
                  {v}
                </button>
              ))}
            </div>
          ) : (
            <div className="w-full h-full rounded-xl border-2 border-dashed border-[#E8E2D9] flex items-center justify-center text-center px-10 text-[32px] leading-[1.35] text-[#525254]">
              {finished
                ? `Done: ${MAX_TRIALS} trials with ${n} choices, ${layout}. Change the choices or the layout.`
                : phase === 'hit'
                  ? 'Recorded. Press Next target.'
                  : `Press Start trial: a target and ${n} buttons appear together.`}
            </div>
          )}
        </div>
      </div>

      {/* Right: results (650 px) */}
      <div className="flex-1 min-w-0 bg-white border border-[#E8E2D9] rounded-3xl shadow-xs px-5 py-4 flex flex-col">
        <div className="text-[30px] font-bold text-[#222222] leading-tight">Mean reaction time (ms)</div>
        <Chart data={data} />
        <div className="h-[105px] mt-2 flex items-center text-[28px] leading-[1.35] text-[#222222] font-semibold">
          {hasData ? (
            'Ordered lists are easy to search; shuffled lists force you to scan every item.'
          ) : (
            <span className="text-[#6E6D70] font-normal">Run trials to see measured data.</span>
          )}
        </div>
      </div>
    </div>
  );
};

const CW = 608;
const CH = 440;
const ML = 76;
const MR = 8;
const MT = 60;
const MB = 100;
const BAR_W = 50;

const Chart: React.FC<{ data: Data }> = ({ data }) => {
  const mean = (c?: Cell) => (c && c.rts.length ? c.rts.reduce((s, v) => s + v, 0) / c.rts.length : null);
  const means = NS.map((n) => LAYOUTS.map((l) => mean(data[keyOf(n, l)])));
  const peak = Math.max(0, ...means.flat().map((v) => v ?? 0));
  const maxY = Math.max(1000, Math.ceil(peak / 500) * 500);
  const plotW = CW - ML - MR;
  const plotH = CH - MT - MB;
  const py = (v: number) => MT + plotH - (v / maxY) * plotH;
  const groupW = plotW / NS.length;
  const ticks = [0, maxY / 2, maxY];

  return (
    <svg width={CW} height={CH} viewBox={`0 0 ${CW} ${CH}`} className="block flex-shrink-0">
      {/* legend */}
      <rect x={ML} y={6} width={22} height={22} fill={BLUE} />
      <text x={ML + 30} y={25} fontSize={22} fill="#222222" fontFamily={MONO}>Ordered</text>
      <rect x={ML + 190} y={6} width={22} height={22} fill={TERRACOTTA} />
      <text x={ML + 220} y={25} fontSize={22} fill="#222222" fontFamily={MONO}>Shuffled</text>

      {ticks.map((t) => (
        <g key={t}>
          <line x1={ML} x2={CW - MR} y1={py(t)} y2={py(t)} stroke="#E8E2D9" />
          <text x={ML - 8} y={py(t) + 8} textAnchor="end" fontSize={22} fill="#525254" fontFamily={MONO}>{t}</text>
        </g>
      ))}
      <line x1={ML} x2={CW - MR} y1={py(0)} y2={py(0)} stroke="#525254" strokeWidth={2} />

      {NS.map((n, gi) => {
        const cx = ML + groupW * (gi + 0.5);
        return (
          <g key={n}>
            {LAYOUTS.map((l, li) => {
              const v = means[gi][li];
              if (v === null) return null;
              const x = cx + (li === 0 ? -BAR_W - 2 : 2);
              return (
                <g key={l}>
                  <rect x={x} y={py(v)} width={BAR_W} height={py(0) - py(v)} fill={li === 0 ? BLUE : TERRACOTTA} />
                  <text x={x + BAR_W / 2} y={py(v) - 6} textAnchor="middle" fontSize={22} fill="#222222" fontFamily={MONO}>
                    {Math.round(v)}
                  </text>
                </g>
              );
            })}
            <text x={cx} y={py(0) + 28} textAnchor="middle" fontSize={24} fontWeight={700} fill="#222222">{gi === 0 ? '2 choices' : n}</text>
          </g>
        );
      })}
          </svg>
  );
};
