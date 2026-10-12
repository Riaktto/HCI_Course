import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';

/** Shared Fitts model for Session 2: Shannon form, illustrative a = 100 ms, b = 150 ms/bit. */
const A_MS = 100;
const B_MS = 150;
const SLOWDOWN = 3; // 1 ms of predicted MT = 3 ms of animation, so the contrast can be felt

const CONDITIONS = [
  { letter: 'A', name: 'Big and close (easy)', d: 120, w: 96 },
  { letter: 'B', name: 'Medium (form field)', d: 480, w: 48 },
  { letter: 'C', name: 'Small and far (hard)', d: 960, w: 14 },
].map((c) => {
  const id = Math.log2(c.d / c.w + 1);
  return { ...c, id, ms: Math.round(A_MS + B_MS * id) };
});

const LANE_W = 1010;
const LANE_H = 136;
const X0 = 30; // start dot position inside the lane (D is measured from here)
const CY = LANE_H / 2;

export const FittsConcept: React.FC = () => {
  const [progress, setProgress] = useState<number[]>([0, 0, 0]); // 0..1 per lane
  const [running, setRunning] = useState(false);
  const rafRef = useRef<number | null>(null);

  const stop = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }, []);

  useEffect(() => stop, [stop]);

  const replay = () => {
    stop();
    setRunning(true);
    const t0 = performance.now();
    const tick = (now: number) => {
      const elapsed = now - t0;
      const next = CONDITIONS.map((c) => Math.min(1, elapsed / (c.ms * SLOWDOWN)));
      setProgress(next);
      if (next.some((p) => p < 1)) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
        setRunning(false);
      }
    };
    setProgress([0, 0, 0]);
    rafRef.current = requestAnimationFrame(tick);
  };

  return (
    <div className="flex-1 min-h-0 bg-white border border-[#E8E2D9] rounded-3xl shadow-xs p-6 flex flex-col gap-3 overflow-hidden">
      <div className="h-14 flex items-center justify-between flex-shrink-0">
        <span className="text-[32px] font-bold text-[#222222]">Goal: see why some targets are slow to hit.</span>
        <button
          onClick={replay}
          disabled={running}
          className="bg-[#E5391C] hover:bg-[#C92B10] disabled:opacity-60 text-white rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-3"
        >
          <Play className="w-6 h-6" />
          Replay cursor
        </button>
      </div>

      <div className="flex flex-col gap-3 flex-shrink-0">
        {CONDITIONS.map((c, i) => (
          <div
            key={c.letter}
            className="h-[136px] rounded-2xl border border-[#E8E2D9] bg-[#FAF9F6] px-4 flex items-center gap-6"
          >
            <svg width={LANE_W} height={LANE_H} viewBox={`0 0 ${LANE_W} ${LANE_H}`} className="flex-shrink-0">
              <line x1={X0} y1={CY} x2={X0 + c.d} y2={CY} stroke="#C9C3B8" strokeWidth={2} strokeDasharray="8 6" />
              <text x={X0 + c.d / 2} y={CY - 14} textAnchor="middle" fontSize={22} fill="#6E6D70" fontFamily="JetBrains Mono, monospace">
                distance
              </text>
              <rect x={X0 + c.d - c.w / 2} y={CY - 40} width={c.w} height={80} fill="#E5391C" />
              <circle cx={X0} cy={CY} r={10} fill="#2D2D2E" />
              <circle cx={X0 + c.d * progress[i]} cy={CY} r={10} fill="#2563EB" stroke="#fff" strokeWidth={3} />
            </svg>
            <div className="min-w-0 flex-1">
              <div className="text-[28px] font-bold text-[#222222] leading-tight whitespace-nowrap">
                {c.letter}: {c.name}
              </div>
              <div className="text-[24px] font-mono text-[#525254] leading-snug whitespace-nowrap">
                distance {c.d} px, width {c.w} px
              </div>
              <div className="text-[26px] text-[#222222] leading-tight whitespace-nowrap">
                Difficulty score {c.id.toFixed(2)} ·{' '}
                <span className="text-[#E5391C] font-bold">Expected ~{c.ms} ms</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 min-h-0 flex flex-col items-center justify-center rounded-xl bg-[#1F2421] text-white px-6 text-center">
        <div className="text-[28px] leading-snug">
          Time = a base time + a time that grows with difficulty (illustrative numbers)
        </div>
        <div className="text-[24px] leading-snug text-white/70">
          Difficulty grows when the target is farther or smaller.
        </div>
        <div className="text-[22px] font-mono leading-snug text-white/50">MT = a + b * log2(D/W + 1), a = 100 ms, b = 150 ms</div>
      </div>
    </div>
  );
};
