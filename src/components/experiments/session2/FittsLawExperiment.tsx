import React, { useState, useRef, useEffect } from 'react';
import { Target, Play, RotateCcw, Clock, Award, MousePointer, Info, Zap } from 'lucide-react';
import { UM6PLogo } from '../../brand/UM6PLogo';

interface TrialResult {
  round: number;
  d: number; // distance in px
  w: number; // width in px
  id: number; // index of difficulty in bits
  mt: number; // movement time in ms
}

const TRIALS_CONFIG = [
  { d: 180, w: 70 }, // easy (large, close)
  { d: 260, w: 50 }, // medium
  { d: 380, w: 40 }, // hard (far, small)
  { d: 420, w: 25 }, // very hard
  { d: 500, w: 80 }, // far but large
];

export const FittsLawExperiment: React.FC = () => {
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [phase, setPhase] = useState<'idle' | 'waiting_start' | 'active' | 'completed'>('idle');
  const [results, setResults] = useState<TrialResult[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [targetOffset, setTargetOffset] = useState<{ x: number; y: number }>({ x: 150, y: 0 });
  const [clickMisses, setClickMisses] = useState<number>(0);
  const arenaRef = useRef<HTMLDivElement>(null);

  const activeConfig = TRIALS_CONFIG[Math.min(currentRound, TRIALS_CONFIG.length - 1)];
  const currentID = Number(Math.log2((2 * activeConfig.d) / activeConfig.w).toFixed(2));

  const startTest = () => {
    setCurrentRound(0);
    setResults([]);
    setClickMisses(0);
    setPhase('waiting_start');
  };

  const handleStartPointClick = () => {
    setStartTime(performance.now());
    // calculate random angle for distance D
    const angle = (Math.random() * 0.8 - 0.4) * Math.PI; // roughly to the right
    const x = Math.round(Math.cos(angle) * activeConfig.d);
    const y = Math.round(Math.sin(angle) * activeConfig.d);
    setTargetOffset({ x: Math.max(80, Math.min(320, x)), y: Math.max(-100, Math.min(100, y)) });
    setPhase('active');
  };

  const handleTargetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (phase !== 'active') return;

    const endTime = performance.now();
    const mt = Math.round(endTime - startTime);

    const newResult: TrialResult = {
      round: currentRound + 1,
      d: activeConfig.d,
      w: activeConfig.w,
      id: currentID,
      mt,
    };

    const nextResults = [...results, newResult];
    setResults(nextResults);

    if (currentRound + 1 < TRIALS_CONFIG.length) {
      setCurrentRound(prev => prev + 1);
      setPhase('waiting_start');
    } else {
      setPhase('completed');
    }
  };

  const handleArenaMiss = () => {
    if (phase === 'active') {
      setClickMisses(prev => prev + 1);
    }
  };

  const averageMT = results.length > 0 ? Math.round(results.reduce((a, b) => a + b.mt, 0) / results.length) : 0;
  const averageID = results.length > 0 ? Number((results.reduce((a, b) => a + b.id, 0) / results.length).toFixed(2)) : 0;

  return (
    <div className="h-full flex flex-col p-6 sm:p-8 bg-[#FAF9F6] text-[#2D2D2E] overflow-y-auto">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E8E2D9]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-[#E5391C] bg-[#FDF5F2] px-2.5 py-1 rounded-md border border-[#FAD6CF] uppercase tracking-wider">
              Interactive Motor Physics Lab
            </span>
            <span className="text-xs font-mono text-stone-500 font-semibold">
              Fitts’s Law: MT = a + b · log₂(2D / W)
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif-display text-[#2D2D2E]">
            Empirical Target Acquisition Benchmark
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={startTest}
            className="px-4 py-2 bg-[#E5391C] hover:bg-[#C92F15] text-white text-sm font-semibold rounded-lg flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            {phase === 'idle' ? <Play className="w-4 h-4" /> : <RotateCcw className="w-4 h-4" />}
            {phase === 'idle' ? 'Start 5-Round Benchmark' : 'Restart Experiment'}
          </button>
        </div>
      </div>

      {/* Main Grid: Live Arena on Left, Telemetry & Math on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 flex-1 items-start">
        {/* Left: Interactive Arena (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="p-4 bg-white rounded-xl border border-[#E8E2D9] shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase font-bold text-stone-500">Trial Progress:</span>
              <div className="flex items-center gap-1.5">
                {[0, 1, 2, 3, 4].map(idx => (
                  <div
                    key={idx}
                    className={`w-7 h-7 rounded-md flex items-center justify-center font-mono text-xs font-bold transition-all ${
                      idx < currentRound
                        ? 'bg-emerald-600 text-white'
                        : idx === currentRound && phase !== 'completed'
                        ? 'bg-[#E5391C] text-white ring-2 ring-[#E5391C]/30'
                        : 'bg-stone-100 text-stone-400'
                    }`}
                  >
                    {idx + 1}
                  </div>
                ))}
              </div>
            </div>

            <div className="text-xs font-mono text-stone-700 font-semibold">
              Current Target: <span className="text-[#E5391C] font-bold">D={activeConfig.d}px · W={activeConfig.w}px</span>
            </div>
          </div>

          {/* Interactive Target Stage */}
          <div
            ref={arenaRef}
            onClick={handleArenaMiss}
            className="relative h-[360px] bg-stone-900 rounded-2xl border-2 border-stone-800 flex items-center justify-center overflow-hidden cursor-crosshair select-none shadow-inner"
          >
            {/* Grid background lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

            {phase === 'idle' && (
              <div className="text-center p-8 space-y-3 z-10">
                <MousePointer className="w-12 h-12 text-[#E5391C] mx-auto animate-bounce" />
                <h3 className="text-lg font-bold text-white font-serif-display">Ready to Measure Motor Bandwidth</h3>
                <p className="text-sm text-stone-300 max-w-md mx-auto">
                  Click the red "Start 5-Round Benchmark" button above. You will move your cursor from the start anchor to appearing targets as fast and accurately as possible.
                </p>
              </div>
            )}

            {phase === 'waiting_start' && (
              <div className="text-center z-10 space-y-3">
                <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                  Round {currentRound + 1} of 5
                </div>
                <button
                  onClick={handleStartPointClick}
                  className="w-20 h-20 rounded-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-mono font-bold text-xs uppercase flex flex-col items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer ring-4 ring-emerald-500/20"
                >
                  <Target className="w-6 h-6 mb-1 text-stone-950" />
                  CLICK HERE
                </button>
                <div className="text-xs text-stone-400 font-mono">Click green anchor to start timer & reveal target</div>
              </div>
            )}

            {phase === 'active' && (
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Visual line between start and target */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line
                    x1="50%"
                    y1="50%"
                    x2={`calc(50% + ${targetOffset.x}px)`}
                    y2={`calc(50% + ${targetOffset.y}px)`}
                    stroke="#E5391C"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    opacity="0.4"
                  />
                </svg>

                {/* Target Circle */}
                <button
                  onClick={handleTargetClick}
                  style={{
                    width: `${activeConfig.w}px`,
                    height: `${activeConfig.w}px`,
                    transform: `translate(${targetOffset.x}px, ${targetOffset.y}px)`,
                  }}
                  className="absolute rounded-full bg-[#E5391C] hover:bg-[#FF4D2D] active:scale-90 border-2 border-white shadow-xl flex items-center justify-center text-white font-mono font-bold text-xs transition-transform cursor-pointer animate-pulse ring-4 ring-[#E5391C]/40"
                >
                  <Target className="w-4 h-4 pointer-events-none" />
                </button>
              </div>
            )}

            {phase === 'completed' && (
              <div className="text-center p-8 space-y-3 z-10 bg-stone-900/90 rounded-xl border border-stone-700">
                <Award className="w-12 h-12 text-amber-400 mx-auto" />
                <h3 className="text-xl font-bold text-white font-serif-display">Trial Sequence Completed!</h3>
                <p className="text-sm text-stone-300">
                  Average Movement Time: <span className="text-amber-400 font-bold font-mono">{averageMT} ms</span> · Average Difficulty: <span className="text-emerald-400 font-bold font-mono">{averageID} bits</span>
                </p>
                <button
                  onClick={startTest}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Run Another Sequence
                </button>
              </div>
            )}
          </div>

          <div className="text-xs text-stone-500 font-mono flex items-center justify-between">
            <span>Misses / Misclicks: <strong className="text-[#E5391C]">{clickMisses}</strong></span>
            <span>Index of Difficulty: <strong className="text-stone-700">{currentID} bits</strong></span>
          </div>
        </div>

        {/* Right: Real-time Telemetry & Theory (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Formula Card */}
          <div className="p-4 bg-white rounded-xl border border-[#E8E2D9] shadow-xs space-y-2">
            <div className="text-xs font-mono uppercase font-bold text-stone-500">The Mathematical Formulation</div>
            <div className="p-3 bg-stone-950 text-amber-400 font-mono text-sm sm:text-base rounded-lg border border-stone-800 text-center font-bold tracking-wide">
              MT = a + b · log₂(2D / W)
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1 text-stone-600">
              <div className="p-2 bg-stone-50 rounded border border-stone-200">
                <span className="font-bold text-stone-800">D = Distance</span>
                <p className="text-[11px] text-stone-500 mt-0.5">Physical travel length</p>
              </div>
              <div className="p-2 bg-stone-50 rounded border border-stone-200">
                <span className="font-bold text-stone-800">W = Target Width</span>
                <p className="text-[11px] text-stone-500 mt-0.5">Clickable bounding box</p>
              </div>
            </div>
          </div>

          {/* Live Recorded Trials Table */}
          <div className="p-4 bg-white rounded-xl border border-[#E8E2D9] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase font-bold text-stone-700">Empirical Trial Telemetry</span>
              <span className="text-xs font-mono text-stone-500 font-semibold">{results.length} / 5 logged</span>
            </div>

            {results.length === 0 ? (
              <div className="p-6 text-center text-xs text-stone-400 font-mono bg-stone-50 rounded-lg border border-stone-200">
                Start the benchmark to log empirical reaction data.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono">
                  <thead>
                    <tr className="border-b border-stone-200 text-stone-500 text-left">
                      <th className="pb-1.5 font-bold">#</th>
                      <th className="pb-1.5 font-bold">D (px)</th>
                      <th className="pb-1.5 font-bold">W (px)</th>
                      <th className="pb-1.5 font-bold">ID (bits)</th>
                      <th className="pb-1.5 font-bold text-right">MT (ms)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {results.map(r => (
                      <tr key={r.round} className="hover:bg-stone-50">
                        <td className="py-1.5 font-bold text-stone-800">{r.round}</td>
                        <td className="py-1.5 text-stone-600">{r.d}</td>
                        <td className="py-1.5 text-stone-600">{r.w}</td>
                        <td className="py-1.5 font-bold text-[#E5391C]">{r.id}</td>
                        <td className="py-1.5 text-right font-bold text-emerald-700">{r.mt} ms</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Design Insights Callout */}
          <div className="p-4 bg-[#FDF5F2] rounded-xl border border-[#FAD6CF] space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#E5391C] uppercase">
              <Zap className="w-3.5 h-3.5" />
              Core Engineering Takeaway
            </div>
            <p className="text-xs text-stone-800 leading-relaxed">
              Notice how increasing target size <strong>W</strong> provides massive benefits when the button is tiny, but diminishing returns when it is already large. To make an action effortless, bring <strong>D</strong> close to zero (context menus, bottom sheets) rather than merely expanding button padding.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
