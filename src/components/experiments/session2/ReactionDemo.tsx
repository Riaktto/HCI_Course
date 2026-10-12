import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Play, RotateCcw, SkipForward } from 'lucide-react';

/**
 * ReactionDemo: presenter-run reaction-time test.
 * Simple mode = one stimulus (perceive + decide + act). Choice mode = the same loop with a real
 * decision between two responses. Every number shown is measured live; nothing is hard-coded.
 */

type Mode = 'simple' | 'choice';
type Colour = 'green' | 'red';
type Phase = 'idle' | 'wait' | 'go' | 'result' | 'early';

const MAX_ATTEMPTS = 12;
const LIST_SHOWN = 6;
const AXIS_MAX_MS = 600;
const EXPECTED_MS = 240;
const MIN_FOREPERIOD_MS = 1000;
const MAX_FOREPERIOD_MS = 3000;
const INSIGHT_MIN_ATTEMPTS = 3;

const MODES: { id: Mode; label: string; hint: string; bar: string; text: string }[] = [
  {
    id: 'simple',
    label: 'Simple',
    hint: 'Click the circle (or press Space) as soon as it turns green.',
    bar: 'bg-blue-600',
    text: 'text-blue-700',
  },
  {
    id: 'choice',
    label: 'Choice',
    hint: 'The circle turns green or red: click the button that matches.',
    bar: 'bg-[#E5391C]',
    text: 'text-[#E5391C]',
  },
];

const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null);

export const ReactionDemo: React.FC = () => {
  const [mode, setMode] = useState<Mode>('simple');
  const [phase, setPhase] = useState<Phase>('idle');
  const [colour, setColour] = useState<Colour>('green');
  const [lastMs, setLastMs] = useState<number | null>(null);
  const [wrong, setWrong] = useState(false);
  const [attempts, setAttempts] = useState<Record<Mode, number[]>>({ simple: [], choice: [] });
  const [errors, setErrors] = useState<Record<Mode, number>>({ simple: 0, choice: 0 });

  const timeoutRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    timeoutRef.current = null;
    rafRef.current = null;
    startRef.current = null;
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const startTrial = useCallback(() => {
    clearTimers();
    setWrong(false);
    setLastMs(null);
    setPhase('wait');
    const delay = MIN_FOREPERIOD_MS + Math.random() * (MAX_FOREPERIOD_MS - MIN_FOREPERIOD_MS);
    timeoutRef.current = window.setTimeout(() => {
      timeoutRef.current = null;
      setColour(mode === 'choice' && Math.random() < 0.5 ? 'red' : 'green');
      setPhase('go');
      // Start the clock from the paint that shows the stimulus (second frame after the state change).
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null;
          startRef.current = performance.now();
        });
      });
    }, delay);
  }, [clearTimers, mode]);

  const tooEarly = useCallback(() => {
    clearTimers();
    setPhase('early');
  }, [clearTimers]);

  const finish = useCallback(() => {
    if (startRef.current === null) return;
    const ms = Math.round(performance.now() - startRef.current);
    startRef.current = null;
    setLastMs(ms);
    setAttempts((prev) => ({ ...prev, [mode]: [...prev[mode], ms].slice(-MAX_ATTEMPTS) }));
    setPhase('result');
  }, [mode]);

  const respondSimple = useCallback(() => {
    if (phase === 'wait') tooEarly();
    else if (phase === 'go' && mode === 'simple') finish();
    else if (phase === 'idle' || phase === 'result' || phase === 'early') startTrial();
  }, [phase, mode, tooEarly, finish, startTrial]);

  const respondChoice = useCallback(
    (picked: Colour) => {
      if (phase === 'wait') tooEarly();
      else if (phase === 'go' && startRef.current !== null) {
        if (picked === colour) finish();
        else {
          setWrong(true);
          setErrors((prev) => ({ ...prev, choice: prev.choice + 1 }));
        }
      }
    },
    [phase, colour, tooEarly, finish],
  );

  const reset = () => {
    clearTimers();
    setPhase('idle');
    setWrong(false);
    setLastMs(null);
    setAttempts({ simple: [], choice: [] });
    setErrors({ simple: 0, choice: 0 });
  };

  const switchMode = (next: Mode) => {
    if (next === mode) return;
    clearTimers();
    setMode(next);
    setPhase('idle');
    setWrong(false);
    setLastMs(null);
  };

  // Space = react / start (do not trap focus; only act on Space).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== 'Space' || e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;
      const el = document.activeElement as HTMLElement | null;
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return;
      if (mode === 'choice' && phase === 'go') return;
      e.preventDefault();
      if (el && el.tagName === 'BUTTON') el.blur();
      respondSimple();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mode, phase, respondSimple]);

  // ----- derived display -----
  const means = { simple: mean(attempts.simple), choice: mean(attempts.choice) };
  const diff =
    attempts.simple.length >= INSIGHT_MIN_ATTEMPTS && attempts.choice.length >= INSIGHT_MIN_ATTEMPTS
      ? Math.round((means.choice as number) - (means.simple as number))
      : null;
  const insight =
    diff === null
      ? null
      : diff > 0
        ? `Choice added ${diff} ms: the decide stage now has real work.`
        : `Choice was not slower here (${diff} ms): few trials are noisy, so run more.`;

  const circleClass =
    phase === 'go'
      ? colour === 'red'
        ? 'bg-red-600 border-red-700 text-white'
        : 'bg-emerald-600 border-emerald-700 text-white'
      : phase === 'early'
        ? 'bg-amber-100 border-amber-500 text-amber-900'
        : phase === 'result'
          ? 'bg-white border-[#E8E2D9] text-[#222222]'
          : 'bg-stone-200 border-stone-300 text-[#525254]';

  const circleLabel =
    phase === 'idle'
      ? 'Ready'
      : phase === 'wait'
        ? 'Wait...'
        : phase === 'early'
          ? 'Too early'
          : phase === 'go'
            ? mode === 'choice'
              ? colour === 'red'
                ? 'RED'
                : 'GREEN'
              : 'CLICK!'
            : null;

  const message =
    phase === 'idle'
      ? 'Press Start trial when the volunteer is ready.'
      : phase === 'wait'
        ? 'Wait for the colour. Do not click yet.'
        : phase === 'early'
          ? 'Too early: nothing recorded. Start again.'
          : phase === 'go'
            ? wrong
              ? 'Wrong button: choose the matching one!'
              : mode === 'choice'
                ? 'Click the matching button now!'
                : 'Click now!'
            : mode === 'choice'
              ? 'Correct. That is your choice reaction time.'
              : 'That is your simple reaction time.';

  const messageTone =
    phase === 'early' || wrong ? 'text-amber-700' : phase === 'go' ? 'text-[#E5391C]' : 'text-[#2D2D2E]';

  const running = phase === 'wait' || phase === 'go';
  const startLabel = phase === 'result' ? 'Next trial' : phase === 'early' ? 'Restart trial' : 'Start trial';
  const currentMode = MODES.find((m) => m.id === mode)!;

  const choiceButton = (c: Colour, label: string, cls: string) => (
    <button
      type="button"
      aria-label={`${label} button`}
      onPointerDown={() => respondChoice(c)}
      onClick={(e) => {
        if (e.detail === 0) respondChoice(c);
      }}
      className={`w-[330px] h-[150px] rounded-2xl text-[34px] font-bold text-white border-4 cursor-pointer active:scale-[0.98] ${cls}`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex-1 min-h-0 flex gap-11 select-none">
      {/* LEFT: stimulus + controls */}
      <div className="w-[1130px] shrink-0 bg-white border border-[#E8E2D9] rounded-3xl shadow-xs px-8 py-6 flex flex-col items-center justify-between">
        <div className="w-full h-14 flex items-center justify-between">
          <div className="flex items-center bg-[#FAF9F6] p-1 rounded-xl border border-[#E8E2D9]" role="group" aria-label="Mode">
            {MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => switchMode(m.id)}
                aria-pressed={mode === m.id}
                className={`h-12 w-[130px] rounded-lg text-[24px] font-semibold cursor-pointer ${
                  mode === m.id ? 'bg-[#E5391C] text-white shadow-xs' : 'text-[#525254] hover:bg-stone-100'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
          <span className="text-[24px] text-[#525254] text-right w-[780px] leading-[1.3]">{currentMode.hint}</span>
        </div>

        {/* Stimulus row: circle always centred, response buttons flank it in Choice mode */}
        <div className="w-full h-[320px] flex items-center justify-between">
          <div className="w-[330px]">{mode === 'choice' && choiceButton('green', 'Green', 'bg-emerald-600 border-emerald-800 hover:bg-emerald-700')}</div>
          <button
            type="button"
            aria-label={circleLabel ?? `${lastMs} milliseconds`}
            onPointerDown={() => {
              if (mode === 'simple' || phase === 'wait') respondSimple();
            }}
            onClick={(e) => {
              if (e.detail === 0 && (mode === 'simple' || phase === 'wait')) respondSimple();
            }}
            className={`w-[320px] h-[320px] rounded-full border-[6px] flex flex-col items-center justify-center cursor-pointer ${circleClass}`}
          >
            {circleLabel !== null ? (
              <span className={`font-serif-display font-medium ${phase === 'go' ? 'text-[56px]' : 'text-[40px]'}`}>
                {circleLabel}
              </span>
            ) : (
              <>
                <span className="font-mono-code font-bold text-[92px] leading-none tracking-tight">{lastMs}</span>
                <span className="font-mono text-[28px] text-[#6E6D70] pt-2">ms</span>
              </>
            )}
          </button>
          <div className="w-[330px] flex justify-end">
            {mode === 'choice' && choiceButton('red', 'Red', 'bg-red-600 border-red-800 hover:bg-red-700')}
          </div>
        </div>

        <div className={`h-12 text-[34px] font-semibold leading-[1.35] whitespace-nowrap ${messageTone}`} aria-live="polite">
          {message}
        </div>

        <div className="flex items-center gap-4 h-[60px]">
          <button
            type="button"
            onClick={startTrial}
            disabled={running}
            className="w-[270px] py-3.5 rounded-xl text-[24px] font-bold text-white bg-[#E5391C] hover:bg-[#C92B10] disabled:bg-stone-300 disabled:text-stone-500 disabled:cursor-not-allowed flex items-center justify-center gap-3 cursor-pointer"
          >
            {phase === 'result' ? <SkipForward className="w-7 h-7" /> : <Play className="w-7 h-7" />}
            <span>{startLabel}</span>
          </button>
          <button
            type="button"
            onClick={reset}
            className="py-3.5 px-6 rounded-xl text-[24px] font-bold bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-7 h-7" />
            <span>Reset</span>
          </button>
        </div>

        <p className="text-[22px] text-[#6E6D70] leading-[1.35] whitespace-nowrap">
          Browser and mouse add some lag: compare the modes, not the absolute value.
        </p>
      </div>

      {/* RIGHT: results */}
      <div className="flex-1 min-w-0 bg-white border border-[#E8E2D9] rounded-3xl shadow-xs px-7 py-6 flex flex-col justify-between">
        <h3 className="text-[30px] font-bold text-[#222222] leading-tight">Mean reaction time</h3>

        <div>
          {/* Bars with the expected-time tick drawn across both rows */}
          <div className="relative">
            <div className="text-[22px] font-mono font-bold text-[#222222] h-8 relative">
              <span className="absolute whitespace-nowrap" style={{ left: `${(EXPECTED_MS / AXIS_MAX_MS) * 100}%`, transform: 'translateX(-50%)' }}>
                Expected 240
              </span>
            </div>
            <div className="space-y-4 relative">
              {MODES.map((m) => {
                const list = attempts[m.id];
                const avg = means[m.id];
                return (
                  <div key={m.id}>
                    <div className="flex items-baseline justify-between">
                      <span className="text-[26px] font-semibold text-[#222222]">
                        {m.label} <span className="font-mono text-[22px] font-normal text-[#6E6D70]">n={list.length}</span>
                        {m.id === 'choice' && errors.choice > 0 && (
                          <span className="font-mono text-[22px] font-normal text-amber-700"> err={errors.choice}</span>
                        )}
                      </span>
                      <span className={`font-mono-code text-[28px] font-bold ${m.text}`}>
                        {avg === null ? '--' : `${Math.round(avg)} ms`}
                      </span>
                    </div>
                    <div className="h-7 mt-1 bg-stone-100 border border-stone-200 rounded-lg overflow-hidden">
                      <div
                        className={`h-full ${m.bar} transition-all duration-300`}
                        style={{ width: `${avg === null ? 0 : Math.min(100, (avg / AXIS_MAX_MS) * 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
              <div
                className="absolute top-0 bottom-0 w-[3px] bg-[#222222] pointer-events-none"
                style={{ left: `calc(${(EXPECTED_MS / AXIS_MAX_MS) * 100}% - 1.5px)` }}
              />
            </div>
            <div className="relative h-8 mt-1 text-[22px] font-mono text-[#6E6D70]">
              <span className="absolute left-0">0</span>
              <span className="absolute left-1/2 -translate-x-1/2">300</span>
              <span className="absolute right-0">600 ms</span>
            </div>
          </div>
          <p className="text-[22px] leading-[1.35] text-[#525254] pt-2">
            Expected 240 ms (perceive 100 + decide 70 + act 70)
          </p>
        </div>

        <div className="font-mono text-[22px] text-[#2D2D2E] space-y-1">
          {MODES.map((m) => (
            <div key={m.id} className="flex gap-3 whitespace-nowrap h-8 overflow-hidden">
              <span className={`w-[76px] font-bold ${m.text}`}>{m.label}</span>
              <span>{attempts[m.id].slice(-LIST_SHOWN).join('  ') || '--'}</span>
            </div>
          ))}
        </div>

        <div
          className={`h-[148px] rounded-2xl border-2 px-5 flex items-center ${
            insight ? 'bg-[#FDF5F3] border-[#FAD6CF]' : 'bg-[#FAF9F6] border-dashed border-[#E8E2D9]'
          }`}
        >
          <p className={insight ? 'text-[26px] leading-[1.35] font-semibold text-[#2D2D2E]' : 'text-[22px] leading-[1.35] text-[#6E6D70]'}>
            {insight ?? `Insight appears after ${INSIGHT_MIN_ATTEMPTS} attempts in both modes.`}
          </p>
        </div>
      </div>
    </div>
  );
};
