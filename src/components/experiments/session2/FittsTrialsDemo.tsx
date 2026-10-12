import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

/** Shared Fitts model for Session 2: Shannon form, illustrative a = 100 ms, b = 150 ms/bit. */
const A_MS = 100;
const B_MS = 150;
const MOVES = 8; // 9 clicks = 8 timed movements

const CONDITIONS = [
  { letter: 'A', d: 120, w: 96 },
  { letter: 'B', d: 480, w: 48 },
  { letter: 'C', d: 960, w: 14 },
].map((c) => {
  const id = Math.log2(c.d / c.w + 1);
  return { ...c, id, ms: Math.round(A_MS + B_MS * id) };
});

type Result = { mean: number; misses: number };
interface Trial {
  clicks: number; // hits so far (the first hit starts the clock)
  misses: number;
  last: number | null;
  times: number[];
}
const EMPTY_TRIAL: Trial = { clicks: 0, misses: 0, last: null, times: [] };

const CANVAS_W = 1774; // inner width of the lane (1824 - 2 * 24 padding - 2 borders)
const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-2';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100`;
const MONO = 'JetBrains Mono, monospace';

/** Ordinary least squares MT = a + b * ID over the measured conditions. */
const fitLine = (pts: { x: number; y: number }[]) => {
  const n = pts.length;
  const mx = pts.reduce((s, p) => s + p.x, 0) / n;
  const my = pts.reduce((s, p) => s + p.y, 0) / n;
  const sxx = pts.reduce((s, p) => s + (p.x - mx) ** 2, 0);
  const sxy = pts.reduce((s, p) => s + (p.x - mx) * (p.y - my), 0);
  const b = sxx === 0 ? 0 : sxy / sxx;
  return { a: my - b * mx, b };
};

export const FittsTrialsDemo: React.FC = () => {
  const [sel, setSel] = useState(0);
  const [trial, setTrial] = useState<Trial>(EMPTY_TRIAL);
  const [results, setResults] = useState<(Result | null)[]>([null, null, null]);
  const lastClickAt = React.useRef(0);

  const cond = CONDITIONS[sel];
  const done = trial.times.length >= MOVES;
  // Hit n (0-based) targets the left bar when n is even, the right bar when odd.
  const activeSide = trial.clicks % 2 === 0 ? 'L' : 'R';

  const selectCondition = (i: number) => {
    setSel(i);
    setTrial(EMPTY_TRIAL);
  };

  const onCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (done) return;
    const bar = (e.target as HTMLElement).closest('[data-side]') as HTMLElement | null;
    const hit = bar !== null && bar.dataset.side === activeSide;
    const now = performance.now();
    if (!hit) {
      if (trial.clicks > 0) setTrial({ ...trial, misses: trial.misses + 1 });
      return;
    }
    if (trial.clicks === 0) {
      lastClickAt.current = now;
      setTrial({ ...trial, clicks: 1 });
      return;
    }
    const mt = now - lastClickAt.current;
    lastClickAt.current = now;
    const times = [...trial.times, mt];
    setTrial({ ...trial, clicks: trial.clicks + 1, last: mt, times });
    if (times.length >= MOVES) {
      const mean = times.reduce((s, t) => s + t, 0) / times.length;
      setResults((r) => r.map((v, i) => (i === sel ? { mean, misses: trial.misses } : v)));
    }
  };

  const resetCondition = () => {
    setTrial(EMPTY_TRIAL);
    setResults((r) => r.map((v, i) => (i === sel ? null : v)));
  };
  const resetAll = () => {
    setTrial(EMPTY_TRIAL);
    setResults([null, null, null]);
  };

  const measured = CONDITIONS.flatMap((c, i) => (results[i] ? [{ x: c.id, y: results[i]!.mean }] : []));
  const fit = measured.length >= 2 ? fitLine(measured) : null;

  const status = done
    ? 'Done: result stored'
    : trial.clicks === 0
      ? 'Click the red bar to start'
      : 'Alternate between the bars';

  const barLeft = (side: 'L' | 'R') => CANVAS_W / 2 + (side === 'L' ? -cond.d / 2 : cond.d / 2) - cond.w / 2;

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
      {/* Condition chips + resets (64 px) */}
      <div className="h-16 flex items-center gap-3 flex-shrink-0">
        {CONDITIONS.map((c, i) => (
          <button
            key={c.letter}
            onClick={() => selectCondition(i)}
            className={`h-16 w-[380px] rounded-xl border-2 px-5 flex items-center gap-4 ${
              i === sel
                ? 'bg-[#FDF5F3] border-[#E5391C] text-[#E5391C]'
                : 'bg-white border-[#E8E2D9] text-[#525254] hover:bg-stone-100'
            }`}
          >
            <span className="text-[28px] font-bold">{c.letter}</span>
            <span className="text-[24px] font-mono font-semibold whitespace-nowrap">
              dist. {c.d} · width {c.w}
            </span>
          </button>
        ))}
        <div className="flex-1" />
        <button onClick={resetCondition} className={SECONDARY}>
          <RotateCcw className="w-6 h-6" />
          Reset condition
        </button>
        <button onClick={resetAll} className={SECONDARY}>
          Reset all
        </button>
      </div>

      {/* Task canvas (276 px) */}
      <div className="h-[276px] flex-shrink-0 bg-white border border-[#E8E2D9] rounded-3xl shadow-xs px-6 pt-3 pb-4 flex flex-col">
        <div className="h-10 flex items-center justify-between text-[28px] font-mono text-[#222222] whitespace-nowrap">
          <span>
            Moves {trial.times.length}/{MOVES} · Misses {trial.misses} · Last{' '}
            {trial.last === null ? '--' : `${Math.round(trial.last)} ms`}
          </span>
          <span className="text-[24px] text-[#6E6D70]">{status}</span>
        </div>
        <div
          onClick={onCanvasClick}
          className="relative mt-2 flex-1 rounded-xl bg-[#FAF9F6] border border-[#E8E2D9] cursor-crosshair overflow-hidden"
        >
          {(['L', 'R'] as const).map((side) => (
            <div
              key={side}
              data-side={side}
              className={`absolute top-0 bottom-0 ${!done && side === activeSide ? 'bg-[#E5391C]' : 'bg-[#9A968F]'}`}
              style={{ left: barLeft(side), width: cond.w }}
            />
          ))}
        </div>
      </div>

      {/* Results (292 px) */}
      <div className="h-[292px] flex-shrink-0 flex gap-6">
        <div className="w-[1000px] bg-white border border-[#E8E2D9] rounded-3xl shadow-xs px-6 py-4 flex flex-col">
          <table className="w-full text-[24px] font-mono text-[#222222] border-collapse">
            <thead>
              <tr className="text-[#6E6D70] text-left">
                <th className="h-11 font-semibold w-[130px]">Target</th>
                <th className="font-semibold">Difficulty</th>
                <th className="font-semibold">Expected</th>
                <th className="font-semibold">Measured</th>
                <th className="font-semibold">Misses</th>
              </tr>
            </thead>
            <tbody>
              {CONDITIONS.map((c, i) => (
                <tr key={c.letter} className={`border-t border-[#E8E2D9] ${i === sel ? 'bg-[#FDF5F3]' : ''}`}>
                  <td className="h-11 font-bold">{c.letter}</td>
                  <td>{c.id.toFixed(2)}</td>
                  <td>{c.ms} ms</td>
                  <td className={results[i] ? 'text-[#E5391C] font-bold' : 'text-[#6E6D70]'}>
                    {results[i] ? `${Math.round(results[i]!.mean)} ms` : 'not run'}
                  </td>
                  <td>{results[i] ? results[i]!.misses : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-auto text-[24px] font-mono leading-snug">
            {fit ? (
              <>
                <div className="font-bold text-[#222222]">Your own line (through your results)</div>
                <div className="text-[#E5391C]">Harder targets took longer: that is Fitts's Law</div>
              </>
            ) : (
              <div className="text-[#6E6D70]">Measure 2 targets to draw your own line.</div>
            )}
          </div>
        </div>

        <Scatter measured={measured} fit={fit} />
      </div>
    </div>
  );
};

const SW = 798;
const SH = 290;
const ML = 100;
const MR = 24;
const MT = 20;
const MB = 74;

const Scatter: React.FC<{ measured: { x: number; y: number }[]; fit: { a: number; b: number } | null }> = ({
  measured,
  fit,
}) => {
  const idMax = 7;
  const maxY = Math.max(1200, Math.ceil(Math.max(0, ...measured.map((p) => p.y)) / 400) * 400);
  const px = (id: number) => ML + (id / idMax) * (SW - ML - MR);
  const py = (ms: number) => SH - MB - (Math.min(ms, maxY) / maxY) * (SH - MB - MT);
  const yTicks = [0, maxY / 2, maxY];
  const xTicks = [0, 2, 4, 6];
  const plotMid = (MT + SH - MB) / 2;
  return (
    <div className="flex-1 bg-white border border-[#E8E2D9] rounded-3xl shadow-xs overflow-hidden">
      <svg width={SW} height={SH} viewBox={`0 0 ${SW} ${SH}`} className="block">
        {yTicks.map((t) => (
          <g key={t}>
            <line x1={ML} x2={SW - MR} y1={py(t)} y2={py(t)} stroke="#E8E2D9" />
            <text x={ML - 10} y={py(t) + 8} textAnchor="end" fontSize={22} fill="#525254" fontFamily={MONO}>
              {t}
            </text>
          </g>
        ))}
        {xTicks.map((t) => (
          <text key={t} x={px(t)} y={SH - MB + 28} textAnchor="middle" fontSize={22} fill="#525254" fontFamily={MONO}>
            {t}
          </text>
        ))}
        <line x1={ML} x2={SW - MR} y1={py(0)} y2={py(0)} stroke="#525254" strokeWidth={2} />
        <line x1={ML} x2={ML} y1={MT} y2={py(0)} stroke="#525254" strokeWidth={2} />
        <text x={(ML + SW - MR) / 2} y={SH - 14} textAnchor="middle" fontSize={22} fill="#222222" fontFamily={MONO}>
          Difficulty score
        </text>
        <text x={24} y={plotMid} textAnchor="middle" fontSize={22} fill="#222222" fontFamily={MONO} transform={`rotate(-90 24 ${plotMid})`}>
          Time (ms)
        </text>
        <line x1={ML + 20} x2={ML + 52} y1={MT + 14} y2={MT + 14} stroke="#2563EB" strokeWidth={3} />
        <text x={ML + 62} y={MT + 22} fontSize={22} fill="#2563EB" fontFamily={MONO}>expected (model)</text>
        <circle cx={ML + 36} cy={MT + 46} r={8} fill="#E5391C" />
        <text x={ML + 62} y={MT + 54} fontSize={22} fill="#E5391C" fontFamily={MONO}>measured</text>
        {/* illustrative prediction (blue) */}
        <line x1={px(0)} y1={py(A_MS)} x2={px(idMax)} y2={py(A_MS + B_MS * idMax)} stroke="#2563EB" strokeWidth={3} />
        {CONDITIONS.map((c) => (
          <circle key={c.letter} cx={px(c.id)} cy={py(c.ms)} r={6} fill="#fff" stroke="#2563EB" strokeWidth={3} />
        ))}
        {fit && (
          <line
            x1={px(0)}
            y1={py(Math.max(0, fit.a))}
            x2={px(idMax)}
            y2={py(Math.max(0, fit.a + fit.b * idMax))}
            stroke="#E5391C"
            strokeWidth={2}
            strokeDasharray="8 6"
          />
        )}
        {measured.map((p) => (
          <circle key={p.x} cx={px(p.x)} cy={py(p.y)} r={10} fill="#E5391C" stroke="#fff" strokeWidth={2} />
        ))}
      </svg>
    </div>
  );
};
