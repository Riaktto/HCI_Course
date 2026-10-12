import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, RotateCcw, Play, ChevronRight } from 'lucide-react';

type Layout = 'A' | 'B';
type Phase = 'idle' | 'prompt' | 'running' | 'result';
type Trial = { ms: number; clicks: number; errors: number };

const GROUPS = [
  { name: 'Text', commands: ['Bold', 'Italic', 'Underline', 'Font size'] },
  { name: 'Insert', commands: ['Picture', 'Table', 'Link', 'Chart'] },
  { name: 'Share', commands: ['Email', 'Print', 'Export PDF', 'Save a copy'] },
  { name: 'Review', commands: ['Spell check', 'Comment', 'Track changes', 'Word count'] },
];

// Fixed shuffled order for layout A (no group labels): same for every run.
const SHUFFLED = [
  'Table', 'Word count', 'Italic', 'Print',
  'Comment', 'Bold', 'Save a copy', 'Chart',
  'Font size', 'Email', 'Link', 'Track changes',
  'Underline', 'Export PDF', 'Spell check', 'Picture',
];

// Same six tasks in both layouts; every group appears at least once.
const TASKS = [
  { goal: 'Make the selected text bold', answer: 'Bold' },
  { goal: 'Send it by email', answer: 'Email' },
  { goal: 'Check the spelling', answer: 'Spell check' },
  { goal: 'Add a picture', answer: 'Picture' },
  { goal: 'Save a different copy', answer: 'Save a copy' },
  { goal: 'Count the words', answer: 'Word count' },
];

const LAYOUTS: { id: Layout; label: string; short: string; bar: string }[] = [
  { id: 'A', label: 'A: Everything visible', short: 'Everything visible', bar: 'bg-blue-600' },
  { id: 'B', label: 'B: In layers', short: 'In layers', bar: 'bg-[#E5391C]' },
];

const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);
const fmt = (n: number) => Math.round(n).toLocaleString('en-US');

const cmdBtn =
  'rounded-xl border border-[#E8E2D9] bg-[#FAF9F6] text-[#2D2D2E] text-[24px] font-semibold hover:bg-[#FDF5F3] hover:border-[#FAD6CF] transition-colors';
const primaryBtn =
  'bg-[#E5391C] hover:bg-[#C92B10] text-white rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-3';
const secondaryBtn =
  'bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 rounded-xl px-5 py-3.5 text-[24px] font-semibold flex items-center gap-3';

export const ProgressiveDisclosureDemo: React.FC = () => {
  const [layout, setLayout] = useState<Layout>('A');
  const [results, setResults] = useState<Record<Layout, Trial[]>>({ A: [], B: [] });
  const [phase, setPhase] = useState<Phase>('idle');
  const [openGroup, setOpenGroup] = useState<number | null>(null);
  const [clicks, setClicks] = useState(0);
  const [errors, setErrors] = useState(0);
  const [lastMs, setLastMs] = useState(0);
  const startRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };
  useEffect(() => clearTimer, []);

  const done = results[layout].length;
  const finished = done >= TASKS.length;
  const task = TASKS[Math.min(done, TASKS.length - 1)];

  const begin = useCallback(() => {
    clearTimer();
    setClicks(0);
    setErrors(0);
    setOpenGroup(null);
    setPhase('prompt');
    // The goal is read first; the clock starts when the picker appears.
    timerRef.current = window.setTimeout(() => {
      startRef.current = performance.now();
      setPhase('running');
    }, 1500);
  }, []);

  const switchLayout = (l: Layout) => {
    if (l === layout) return;
    clearTimer();
    setLayout(l);
    setPhase('idle');
    setOpenGroup(null);
  };

  const choose = (cmd: string) => {
    if (phase !== 'running') return;
    const c = clicks + 1;
    if (cmd !== task.answer) {
      setClicks(c);
      setErrors((e) => e + 1);
      return;
    }
    const ms = performance.now() - startRef.current;
    setClicks(c);
    setLastMs(ms);
    setResults((r) => ({ ...r, [layout]: [...r[layout], { ms, clicks: c, errors }] }));
    setPhase('result');
  };

  const openGroupClick = (i: number) => {
    setClicks((c) => c + 1);
    setOpenGroup(i);
  };
  const backClick = () => {
    setClicks((c) => c + 1);
    setOpenGroup(null);
  };

  const reset = () => {
    clearTimer();
    setResults({ A: [], B: [] });
    setPhase('idle');
    setOpenGroup(null);
  };

  const stats = (l: Layout) => {
    const t = results[l];
    return { n: t.length, ms: mean(t.map((x) => x.ms)), clicks: mean(t.map((x) => x.clicks)) };
  };
  const sA = stats('A');
  const sB = stats('B');
  const maxMs = Math.max(sA.ms, sB.ms, 1);
  const showInsight = sA.n >= 4 && sB.n >= 4;
  const diff = sB.ms - sA.ms;

  const renderPicker = () => {
    if (layout === 'A') {
      return (
        <div className="h-full grid grid-cols-4 grid-rows-4 gap-3">
          {SHUFFLED.map((c) => (
            <button key={c} onClick={() => choose(c)} className={cmdBtn}>
              {c}
            </button>
          ))}
        </div>
      );
    }
    if (openGroup === null) {
      return (
        <div className="h-full grid grid-cols-4 gap-4">
          {GROUPS.map((g, i) => (
            <button
              key={g.name}
              onClick={() => openGroupClick(i)}
              className="rounded-2xl border-2 border-[#FAD6CF] bg-[#FDF5F3] hover:bg-[#FAD6CF]/60 transition-colors flex flex-col items-center justify-center gap-2"
            >
              <span className="text-[34px] font-bold text-[#2D2D2E]">{g.name}</span>
              <span className="text-[22px] text-[#6E6D70]">4 commands</span>
            </button>
          ))}
        </div>
      );
    }
    const g = GROUPS[openGroup];
    return (
      <div className="h-full flex flex-col gap-3">
        <div className="flex items-center gap-5 h-[64px] flex-shrink-0">
          <button onClick={backClick} className={secondaryBtn}>
            <ArrowLeft size={26} /> Back
          </button>
          <span className="text-[28px] font-bold text-[#E5391C]">{g.name}</span>
        </div>
        <div className="flex-1 min-h-0 grid grid-cols-4 gap-4">
          {g.commands.map((c) => (
            <button key={c} onClick={() => choose(c)} className={`${cmdBtn} text-[26px]`}>
              {c}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderRegion = () => {
    if (phase === 'running') return renderPicker();
    let msg: React.ReactNode;
    if (phase === 'prompt') {
      msg = <span className="text-[32px] text-[#525254]">Get ready. The options appear now...</span>;
    } else if (phase === 'result') {
      msg = (
        <div className="text-center">
          <div className="text-[34px] font-bold text-emerald-700">Found it</div>
          <div className="font-mono-code text-[28px] text-[#2D2D2E] mt-2">
            {fmt(lastMs)} ms · {clicks} {clicks === 1 ? 'click' : 'clicks'} · {errors} {errors === 1 ? 'error' : 'errors'}
          </div>
        </div>
      );
    } else if (finished) {
      msg = <span className="text-[34px] font-bold text-emerald-700">Done for this layout</span>;
    } else {
      msg = <span className="text-[32px] text-[#525254]">Press Start. A goal appears, then the options.</span>;
    }
    return <div className="h-full flex items-center justify-center text-center">{msg}</div>;
  };

  const headerText = () => {
    if (phase === 'idle') {
      return finished ? 'All six tasks finished' : `Ready: task ${done + 1} of ${TASKS.length}`;
    }
    const idx = phase === 'result' ? done : done + 1;
    return `Task ${idx} of ${TASKS.length}`;
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3">
      <div className="text-[30px] leading-[1.35] font-semibold text-[#2D2D2E] flex-shrink-0">
        Goal: feel what changes when options are shown all at once or in layers.
      </div>

      <div className="flex-1 min-h-0 flex gap-6">
        {/* Left: layout switch, picker card, action row */}
        <div className="w-[1100px] flex-shrink-0 flex flex-col gap-3">
          <div className="flex h-[64px] flex-shrink-0 bg-white border border-[#E8E2D9] rounded-2xl p-1.5 gap-1.5">
            {LAYOUTS.map((l) => (
              <button
                key={l.id}
                onClick={() => switchLayout(l.id)}
                className={`flex-1 rounded-xl text-[24px] font-bold transition-colors ${
                  layout === l.id ? 'bg-[#E5391C] text-white' : 'text-[#525254] hover:bg-stone-100'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="h-[430px] flex-shrink-0 bg-white border border-[#E8E2D9] rounded-3xl shadow-xs flex flex-col overflow-hidden">
            <div className="h-[100px] flex-shrink-0 px-6 border-b border-[#E8E2D9] bg-[#FAF9F6] flex flex-col justify-center">
              <div className="font-mono text-[22px] text-[#6E6D70]">{headerText()}</div>
              <div className="text-[34px] leading-[1.2] font-bold text-[#2D2D2E] truncate">
                {phase === 'idle' ? (finished ? 'Done for this layout' : 'Your goal will show here') : task.goal}
              </div>
            </div>
            <div className="flex-1 min-h-0 p-4">{renderRegion()}</div>
          </div>

          <div className="h-[64px] flex-shrink-0 flex items-center gap-4">
            {(phase === 'idle' || phase === 'prompt') && !finished && (
              <button onClick={begin} disabled={phase === 'prompt'} className={`${primaryBtn} disabled:opacity-50`}>
                <Play size={24} /> {done === 0 ? 'Start' : 'Continue'}
              </button>
            )}
            {phase === 'result' && !finished && (
              <button onClick={begin} className={primaryBtn}>
                Next task <ChevronRight size={26} />
              </button>
            )}
            {finished && phase !== 'running' && (
              <span className="text-[26px] text-[#525254]">
                {results.A.length >= TASKS.length && results.B.length >= TASKS.length
                  ? 'Both layouts done.'
                  : 'Now try the other layout.'}
              </span>
            )}
            <span className="ml-auto font-mono text-[22px] text-[#6E6D70]">
              Every click counts: group, Back, wrong command.
            </span>
          </div>
        </div>

        {/* Right: results */}
        <div className="flex-1 min-w-0 bg-white border border-[#E8E2D9] rounded-3xl shadow-xs px-6 py-5 flex flex-col gap-3">
          <div className="flex items-center justify-between h-[56px] flex-shrink-0">
            <h3 className="font-serif-display text-[40px] text-[#2D2D2E]">Results</h3>
            <button onClick={reset} className={`${secondaryBtn} !py-2.5`}>
              <RotateCcw size={22} /> Reset results
            </button>
          </div>

          {LAYOUTS.map((l) => {
            const s = l.id === 'A' ? sA : sB;
            return (
              <div key={l.id} className="h-[136px] flex-shrink-0 rounded-2xl border border-[#E8E2D9] bg-[#FAF9F6] px-5 py-3 flex flex-col justify-between">
                <div className="flex items-baseline justify-between">
                  <span className="text-[26px] font-bold text-[#2D2D2E]">{l.short}</span>
                  <span className="font-mono text-[22px] text-[#6E6D70]">{s.n} of {TASKS.length} tasks</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="font-mono-code text-[28px] text-[#2D2D2E]">{s.n ? `${fmt(s.ms)} ms` : '-'}</span>
                  <span className="font-mono text-[22px] text-[#525254]">
                    {s.n ? `${s.clicks.toFixed(1)} clicks per task` : 'no data yet'}
                  </span>
                </div>
                <div className="h-[18px] rounded-md bg-stone-200 overflow-hidden">
                  <div className={`h-full ${l.bar}`} style={{ width: `${s.n ? (s.ms / maxMs) * 100 : 0}%` }} />
                </div>
              </div>
            );
          })}

          <div className="h-[112px] flex-shrink-0 flex items-center">
            {showInsight ? (
              <p className="text-[26px] leading-[1.38] text-[#2D2D2E]">
                In layers: {sB.clicks.toFixed(1)} clicks per task instead of {sA.clicks.toFixed(1)}, and{' '}
                {fmt(Math.abs(diff))} ms {diff <= 0 ? 'faster' : 'slower'}. Fewer things on screen, one extra step.
              </p>
            ) : (
              <p className="text-[24px] leading-[1.38] text-[#6E6D70]">
                A comparison shows up after 4 tasks in each layout.
              </p>
            )}
          </div>

          <p className="text-[24px] leading-[1.35] text-[#525254] flex-shrink-0">
            Fewer options at once vs one extra step: which wins here?
          </p>
        </div>
      </div>
    </div>
  );
};
