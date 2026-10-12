import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Eye, Brain, CheckCircle2, XCircle, Clock } from 'lucide-react';

export const MemoryChunkingExperiment: React.FC = () => {
  const [mode, setMode] = useState<'unchunked' | 'chunked'>('unchunked');
  const [stage, setStage] = useState<'ready' | 'memorizing' | 'input' | 'feedback'>('ready');
  const [countdown, setCountdown] = useState<number>(2.5);
  const [userInput, setUserInput] = useState<string>('');
  const [accuracyLog, setAccuracyLog] = useState<{ unchunked?: boolean; chunked?: boolean }>({});

  const sampleToken = '92847192038194';

  useEffect(() => {
    let timer: any = null;
    if (stage === 'memorizing' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 0.1) {
            setStage('input');
            return 0;
          }
          return Number((prev - 0.1).toFixed(1));
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [stage, countdown]);

  const handleStart = (selectedMode: 'unchunked' | 'chunked') => {
    setMode(selectedMode);
    setUserInput('');
    setCountdown(2.5);
    setStage('memorizing');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = userInput.replace(/[\s-]/g, '');
    const isCorrect = cleanUser === sampleToken;
    setAccuracyLog(prev => ({ ...prev, [mode]: isCorrect }));
    setStage('feedback');
  };

  return (
    <div className="h-full flex flex-col p-6 sm:p-8 bg-[#FAF9F6] text-[#2D2D2E] overflow-y-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E8E2D9]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-[#8b5cf6] bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200 uppercase tracking-wider">
              Working Memory & Chunking Lab
            </span>
            <span className="text-xs font-mono text-stone-500 font-semibold">
              Cowan’s 3–4 Chunk Working Memory Bottleneck
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif-display text-[#2D2D2E]">
            Empirical Working Memory: Unchunked vs Chunked Recall
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleStart('unchunked')}
            className={`px-3.5 py-2 text-xs font-mono font-bold rounded-lg border transition-all cursor-pointer ${
              mode === 'unchunked' && stage !== 'ready'
                ? 'bg-[#E5391C] text-white border-[#E5391C]'
                : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
            }`}
          >
            Test Condition 1: Raw Unchunked
          </button>
          <button
            onClick={() => handleStart('chunked')}
            className={`px-3.5 py-2 text-xs font-mono font-bold rounded-lg border transition-all cursor-pointer ${
              mode === 'chunked' && stage !== 'ready'
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
            }`}
          >
            Test Condition 2: 4-Chunk Masked
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 flex-1 items-start">
        {/* Left: Memory Challenge Arena (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="p-8 bg-stone-900 rounded-2xl border-2 border-stone-800 min-h-[360px] flex flex-col items-center justify-center text-center relative overflow-hidden shadow-inner">
            {stage === 'ready' && (
              <div className="space-y-4 max-w-md">
                <Brain className="w-12 h-12 text-[#8b5cf6] mx-auto" />
                <h3 className="text-lg font-bold text-white font-serif-display">Ready to Test Working Memory Decay</h3>
                <p className="text-xs text-stone-300">
                  Select Condition 1 (Unchunked) or Condition 2 (Chunked). You will have exactly 2.5 seconds to memorize a 14-digit identifier before it vanishes.
                </p>
                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={() => handleStart('unchunked')}
                    className="px-4 py-2 bg-[#E5391C] hover:bg-[#C92F15] text-white font-mono text-xs font-bold rounded-lg cursor-pointer transition-colors"
                  >
                    Start Condition 1
                  </button>
                </div>
              </div>
            )}

            {stage === 'memorizing' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="text-xs font-mono uppercase text-amber-400 font-bold flex items-center justify-center gap-1.5">
                  <Clock className="w-4 h-4 animate-spin" />
                  Time Remaining: {countdown.toFixed(1)}s
                </div>

                <div className="p-6 bg-stone-950 rounded-xl border border-stone-700 shadow-2xl">
                  {mode === 'unchunked' ? (
                    <div className="font-mono text-2xl sm:text-3xl font-extrabold tracking-normal text-amber-300">
                      {sampleToken}
                    </div>
                  ) : (
                    <div className="font-mono text-2xl sm:text-3xl font-extrabold tracking-wider text-emerald-300">
                      9284 — 7192 — 0381 — 94
                    </div>
                  )}
                </div>

                <div className="text-xs text-stone-400 font-mono">
                  {mode === 'unchunked' ? '14 separate discrete tokens flooding phonological loop' : '4 structured semantic chunks matching Cowan’s memory limit'}
                </div>
              </div>
            )}

            {stage === 'input' && (
              <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md animate-in fade-in">
                <div className="text-xs font-mono uppercase text-stone-400 font-bold">
                  Phonological Loop Test: Type the Identifier
                </div>

                <input
                  type="text"
                  autoFocus
                  placeholder={mode === 'unchunked' ? 'e.g. 92847192...' : 'e.g. 9284 7192 0381 94'}
                  value={userInput}
                  onChange={e => setUserInput(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-xl font-mono text-lg text-white text-center focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
                />

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold rounded-lg cursor-pointer transition-colors"
                >
                  Verify Phonological Accuracy
                </button>
              </form>
            )}

            {stage === 'feedback' && (
              <div className="space-y-4 max-w-md animate-in zoom-in-95">
                {accuracyLog[mode] ? (
                  <div className="p-4 bg-emerald-950/80 rounded-xl border border-emerald-500 text-emerald-200 space-y-1">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                    <div className="font-mono font-bold text-sm">Perfect Recall!</div>
                    <p className="text-xs text-emerald-300">Your working memory successfully transferred the token.</p>
                  </div>
                ) : (
                  <div className="p-4 bg-rose-950/80 rounded-xl border border-rose-500 text-rose-200 space-y-1">
                    <XCircle className="w-8 h-8 text-rose-400 mx-auto" />
                    <div className="font-mono font-bold text-sm">Phonological Decay Error!</div>
                    <p className="text-xs text-rose-300">
                      Actual: <span className="font-mono font-bold text-white">{sampleToken}</span>
                      <br />
                      Entered: <span className="font-mono font-bold text-rose-300">{userInput || '(blank)'}</span>
                    </p>
                  </div>
                )}

                <button
                  onClick={() => handleStart(mode === 'unchunked' ? 'chunked' : 'unchunked')}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-mono text-xs font-bold rounded-lg cursor-pointer"
                >
                  Switch to Condition {mode === 'unchunked' ? '2 (Chunked)' : '1 (Unchunked)'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Cognitive Architecture Breakdown (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 bg-white rounded-xl border border-[#E8E2D9] shadow-xs space-y-2">
            <span className="text-xs font-mono uppercase font-bold text-stone-500">The Neuroscience of Chunking</span>
            <h3 className="text-base font-bold text-stone-900 font-serif-display">Miller (7±2) vs Cowan (3–4)</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              When George Miller published <em>"The Magical Number Seven"</em> in 1956, tests were run in quiet lab conditions with rehearsal. Modern neuroimaging (Cowan, 2001) proves that active working memory holds only <strong>3 to 4 distinct items</strong> under real-world cognitive load.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#E8E2D9] shadow-xs space-y-3 font-mono text-xs">
            <span className="uppercase font-bold text-stone-700 block">Classroom Benchmark Telemetry:</span>
            <div className="space-y-2">
              <div className="p-3 rounded-lg border border-stone-200 bg-stone-50 flex items-center justify-between">
                <div>
                  <span className="font-bold text-stone-800 block">Condition 1: Raw String</span>
                  <span className="text-[11px] text-stone-500">14 individual tokens</span>
                </div>
                {accuracyLog.unchunked !== undefined ? (
                  <span className={`font-bold px-2 py-0.5 rounded ${accuracyLog.unchunked ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {accuracyLog.unchunked ? '✓ Correct' : '✗ Failed (~72% fail rate)'}
                  </span>
                ) : (
                  <span className="text-stone-400">Untested</span>
                )}
              </div>

              <div className="p-3 rounded-lg border border-stone-200 bg-stone-50 flex items-center justify-between">
                <div>
                  <span className="font-bold text-stone-800 block">Condition 2: 4-Chunk Mask</span>
                  <span className="text-[11px] text-stone-500">4 macro chunks (4-4-4-2)</span>
                </div>
                {accuracyLog.chunked !== undefined ? (
                  <span className={`font-bold px-2 py-0.5 rounded ${accuracyLog.chunked ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {accuracyLog.chunked ? '✓ Correct' : '✗ Failed'}
                  </span>
                ) : (
                  <span className="text-stone-400">Untested</span>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 bg-purple-50/70 rounded-xl border border-purple-200 space-y-1.5 text-xs text-purple-950 font-mono">
            <span className="font-bold block uppercase text-purple-900">Engineering Rule for Forms:</span>
            <p>
              Never allow raw, unformatted text inputs for phone numbers, national IDs, IBANs, or serial numbers. Always provide automatic chunking masks and auto-formatting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
