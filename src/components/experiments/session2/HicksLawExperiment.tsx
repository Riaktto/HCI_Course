import React, { useState } from 'react';
import { Play, RotateCcw, Clock, Zap, CheckCircle2, AlertCircle } from 'lucide-react';

interface HickResult {
  n: number;
  theoreticalBits: number;
  measuredMs: number;
}

export const HicksLawExperiment: React.FC = () => {
  const [optionCount, setOptionCount] = useState<number>(4);
  const [targetIndex, setTargetIndex] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [testState, setTestState] = useState<'idle' | 'prompted' | 'recorded'>('idle');
  const [lastRT, setLastRT] = useState<number | null>(null);
  const [history, setHistory] = useState<HickResult[]>([]);

  const candidateLabels = [
    'Emergency Stop', 'Coolant Pump', 'Voltage Main', 'Exhaust Fan',
    'Sensors Mesh', 'Data Logger', 'Valve Primary', 'Valve Bypass',
    'Heater Unit', 'Grid Inverter', 'Alarm Reset', 'System Diagnostics',
    'Battery Bank', 'Thermal Relays', 'Hydraulic Lift', 'Main Isolation',
  ];

  const currentOptions = candidateLabels.slice(0, optionCount);

  const startRound = (n: number) => {
    setOptionCount(n);
    const randomTarget = Math.floor(Math.random() * n);
    setTargetIndex(randomTarget);
    setStartTime(performance.now());
    setTestState('prompted');
  };

  const handleOptionClick = (idx: number) => {
    if (testState !== 'prompted' || targetIndex === null) return;

    if (idx === targetIndex) {
      const endTime = performance.now();
      const rt = Math.round(endTime - startTime);
      setLastRT(rt);
      setTestState('recorded');

      const theoretical = Number(Math.log2(optionCount + 1).toFixed(2));
      setHistory(prev => [...prev.filter(h => h.n !== optionCount), { n: optionCount, theoreticalBits: theoretical, measuredMs: rt }]);
    }
  };

  return (
    <div className="h-full flex flex-col p-6 sm:p-8 bg-[#FAF9F6] text-[#2D2D2E] overflow-y-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E8E2D9]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-[#E5391C] bg-[#FDF5F2] px-2.5 py-1 rounded-md border border-[#FAD6CF] uppercase tracking-wider">
              Cognitive Choice Latency Lab
            </span>
            <span className="text-xs font-mono text-stone-500 font-semibold">
              Hick-Hyman Law: RT = b · log₂(n + 1)
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif-display text-[#2D2D2E]">
            Empirical Decision Time vs Option Density
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {[2, 4, 8, 16].map(n => (
            <button
              key={n}
              onClick={() => startRound(n)}
              className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg border transition-all cursor-pointer ${
                optionCount === n && testState === 'prompted'
                  ? 'bg-[#E5391C] text-white border-[#E5391C] shadow-sm'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
              }`}
            >
              Test N = {n}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 flex-1 items-start">
        {/* Left: Interactive Button Matrix (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="p-4 bg-white rounded-xl border border-[#E8E2D9] shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase font-bold text-stone-500">Active Task:</span>
              {testState === 'prompted' && targetIndex !== null ? (
                <span className="text-sm font-mono font-bold text-[#E5391C] bg-[#FDF5F2] px-2.5 py-1 rounded border border-[#FAD6CF] animate-pulse">
                  LOCATE & CLICK: "{currentOptions[targetIndex]}"
                </span>
              ) : testState === 'recorded' ? (
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  Target Acquired in {lastRT} ms! Select another N above to compare.
                </span>
              ) : (
                <span className="text-xs font-mono text-stone-500">
                  Click a test button above (N=2, 4, 8, or 16) to begin.
                </span>
              )}
            </div>
          </div>

          {/* Interactive Button Grid */}
          <div className={`p-6 bg-white rounded-2xl border border-stone-200 min-h-[340px] flex items-center justify-center shadow-xs ${
            optionCount === 2 ? 'grid grid-cols-2 gap-4' :
            optionCount === 4 ? 'grid grid-cols-2 gap-4' :
            optionCount === 8 ? 'grid grid-cols-4 gap-3' :
            'grid grid-cols-4 gap-2.5'
          }`}>
            {testState === 'idle' ? (
              <div className="col-span-full text-center p-8 space-y-3">
                <Clock className="w-10 h-10 text-stone-400 mx-auto" />
                <h3 className="text-base font-bold text-stone-800 font-serif-display">Ready for Choice Reaction Test</h3>
                <p className="text-xs text-stone-500 max-w-md mx-auto">
                  Click one of the pill buttons at top right (N=2, 4, 8, 16). Find and click the target label as fast as possible.
                </p>
              </div>
            ) : (
              currentOptions.map((label, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(idx)}
                  className={`p-3.5 rounded-xl border text-xs sm:text-sm font-mono font-bold text-center transition-all cursor-pointer ${
                    testState === 'recorded' && idx === targetIndex
                      ? 'bg-emerald-500 text-white border-emerald-600 shadow-md ring-4 ring-emerald-200'
                      : 'bg-stone-50 text-stone-800 border-stone-200 hover:bg-[#FAF9F6] hover:border-stone-400 active:scale-95'
                  }`}
                >
                  {label}
                </button>
              ))
            )}
          </div>

          <div className="text-xs text-stone-500 font-mono">
            * Items appear in flat unordered layout to measure pure Hick’s decision scanning latency.
          </div>
        </div>

        {/* Right: Theoretical Formula & Comparison Table (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 bg-white rounded-xl border border-[#E8E2D9] shadow-xs space-y-2">
            <div className="text-xs font-mono uppercase font-bold text-stone-500">The Mathematical Formulation</div>
            <div className="p-3 bg-stone-950 text-amber-400 font-mono text-sm sm:text-base rounded-lg border border-stone-800 text-center font-bold tracking-wide">
              RT = b · log₂(n + 1)
            </div>
            <p className="text-xs text-stone-600 leading-relaxed pt-1">
              Reaction time scales logarithmically with the number of unorganized alternatives. Every time choice count doubles, decision latency increments by a fixed cognitive step <strong>b</strong> (~150–200ms).
            </p>
          </div>

          {/* Results Comparison Card */}
          <div className="p-4 bg-white rounded-xl border border-[#E8E2D9] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase font-bold text-stone-700">Live Measured Results</span>
              <span className="text-xs font-mono text-stone-500 font-semibold">{history.length} benchmarks</span>
            </div>

            <div className="space-y-2">
              {[2, 4, 8, 16].map(n => {
                const recorded = history.find(h => h.n === n);
                const theoreticalBits = Number(Math.log2(n + 1).toFixed(2));
                return (
                  <div key={n} className="p-2.5 bg-stone-50 rounded-lg border border-stone-200 flex items-center justify-between font-mono text-xs">
                    <div>
                      <span className="font-bold text-stone-800">N = {n} choices</span>
                      <span className="text-stone-500 ml-2">({theoreticalBits} bits)</span>
                    </div>
                    {recorded ? (
                      <span className="font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded border border-emerald-300">
                        {recorded.measuredMs} ms
                      </span>
                    ) : (
                      <span className="text-stone-400 italic">not tested</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Architecture Insight */}
          <div className="p-4 bg-[#FDF5F2] rounded-xl border border-[#FAD6CF] space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#E5391C] uppercase">
              <Zap className="w-3.5 h-3.5" />
              Information Architecture Solution
            </div>
            <p className="text-xs text-stone-800 leading-relaxed">
              When software presents 16 raw buttons, users freeze. If we use <strong>Progressive Disclosure</strong> to group them into 4 logical categories with 4 secondary choices each, decision latency is cut in half while maintaining full power.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
