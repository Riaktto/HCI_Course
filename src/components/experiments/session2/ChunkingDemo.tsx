import React, { useEffect, useRef, useState } from 'react';
import { Eye, Minus, Plus, RotateCcw, Zap } from 'lucide-react';

type Round = 'A' | 'B';
type Phase = 'idle' | 'shown' | 'hidden' | 'revealed';

const CLASS_SIZE = 40; // tally bars are proportional to this maximum
const FLASH_SECONDS = 5; // how long the digits stay on screen
const DIGIT_COUNT = 8;
const GROUPS: [number, number][] = [[0, 3], [3, 6], [6, 8]]; // 3-3-2

const randomDigits = () =>
  Array.from({ length: DIGIT_COUNT }, () => Math.floor(Math.random() * 10)).join('');

const ROUNDS: { id: Round; label: string; name: string }[] = [
  { id: 'A', label: 'A: 8 digits, no groups', name: 'A · No groups' },
  { id: 'B', label: 'B: 8 digits in groups of 3-3-2', name: 'B · Groups of 3-3-2' },
];

const Digits: React.FC<{ value: string; round: Round }> = ({ value, round }) =>
  round === 'A' ? (
    <span className="text-[100px] leading-none font-mono-code font-bold tracking-[0.04em] text-[#222222]">{value}</span>
  ) : (
    <span className="flex items-center gap-20 text-[100px] leading-none font-mono-code font-bold text-[#222222]">
      {GROUPS.map(([from, to]) => (
        <span key={from}>{value.slice(from, to)}</span>
      ))}
    </span>
  );

export const ChunkingDemo: React.FC = () => {
  const [round, setRound] = useState<Round>('A');
  const [phase, setPhase] = useState<Phase>('idle');
  const [digits, setDigits] = useState('');
  const [left, setLeft] = useState(FLASH_SECONDS);
  const [counts, setCounts] = useState<Record<Round, number>>({ A: 0, B: 0 });
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };
  useEffect(() => stopTimer, []);

  const selectRound = (r: Round) => {
    stopTimer();
    setRound(r);
    setPhase('idle');
  };

  const flash = () => {
    stopTimer();
    setDigits(randomDigits());
    setLeft(FLASH_SECONDS);
    setPhase('shown');
    timer.current = setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          stopTimer();
          setPhase('hidden');
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  const reveal = () => {
    stopTimer();
    setPhase('revealed');
  };

  const adjust = (r: Round, d: number) =>
    setCounts((c) => ({ ...c, [r]: Math.min(CLASS_SIZE, Math.max(0, c[r] + d)) }));

  const resetTally = () => setCounts({ A: 0, B: 0 });

  const bothRecorded = counts.A > 0 && counts.B > 0;
  const btnPrimary =
    'bg-[#E5391C] hover:bg-[#C92B10] text-white rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-3 cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed';
  const btnSecondary =
    'bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-3 cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed';

  return (
    <div className="flex-1 min-h-0 flex gap-6">
      {/* Left: experiment */}
      <div className="w-[1150px] shrink-0 flex flex-col gap-4 min-h-0">
        <div className="flex gap-3 shrink-0">
          {ROUNDS.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => selectRound(r.id)}
              aria-pressed={round === r.id}
              className={`flex-1 rounded-xl px-5 py-3.5 text-[24px] font-bold cursor-pointer whitespace-nowrap border ${
                round === r.id
                  ? 'bg-[#222222] text-white border-[#222222]'
                  : 'bg-white text-[#525254] border-[#E8E2D9] hover:bg-stone-100'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div className="flex-1 min-h-0 bg-white border border-[#E8E2D9] rounded-3xl shadow-xs relative flex items-center justify-center">
          <div className="absolute top-5 right-6 text-[28px] font-mono font-bold text-[#6E6D70] h-[34px]">
            {phase === 'shown' ? (
              <span className="text-[#E5391C]">0:0{left}</span>
            ) : (
              <span>0:0{phase === 'idle' ? FLASH_SECONDS : 0}</span>
            )}
          </div>

          {phase === 'idle' && (
            <div className="text-[34px] text-[#525254]">
              Ready when the room is quiet
            </div>
          )}
          {(phase === 'shown' || phase === 'revealed') && <Digits value={digits} round={round} />}
          {phase === 'hidden' && (
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="text-[56px] leading-none font-serif-display font-medium text-[#222222]">Write it down</span>
              <span className="text-[26px] text-[#525254]">8 digits, in order, no peeking</span>
            </div>
          )}
        </div>

        <div className="flex gap-3 shrink-0">
          <button type="button" onClick={flash} className={btnPrimary}>
            <Zap className="w-7 h-7" />
            <span>Flash digits</span>
          </button>
          <button type="button" onClick={reveal} disabled={!digits} className={btnSecondary}>
            <Eye className="w-7 h-7" />
            <span>Reveal</span>
          </button>
        </div>
      </div>

      {/* Right: class tally */}
      <div className="flex-1 min-w-0 bg-white border border-[#E8E2D9] rounded-3xl shadow-xs p-6 flex flex-col justify-between">
        <div className="text-[30px] font-bold text-[#222222] pb-3 border-b border-[#E8E2D9]">
          Class tally
        </div>
        <div className="text-[22px] text-[#6E6D70] pt-2">Students who recalled all 8 digits (max 40)</div>

        <div className="flex flex-col gap-5 py-2">
          {ROUNDS.map((r) => {
            const n = counts[r.id];
            const pct = Math.round((n / CLASS_SIZE) * 100);
            return (
              <div key={r.id} className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-[28px] font-bold text-[#222222]">{r.name}</span>
                  <span className="text-[28px] font-mono font-bold text-[#E5391C] whitespace-nowrap">
                    {n} · {pct}%
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label={`Decrease ${r.id}`}
                    onClick={() => adjust(r.id, -1)}
                    className="w-14 h-14 shrink-0 rounded-xl bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 flex items-center justify-center cursor-pointer"
                  >
                    <Minus className="w-7 h-7" />
                  </button>
                  <div className="flex-1 h-10 bg-stone-100 border border-stone-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${r.id === 'A' ? 'bg-[#6E6D70]' : 'bg-[#E5391C]'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <button
                    type="button"
                    aria-label={`Increase ${r.id}`}
                    onClick={() => adjust(r.id, 1)}
                    className="w-14 h-14 shrink-0 rounded-xl bg-[#E5391C] hover:bg-[#C92B10] text-white flex items-center justify-center cursor-pointer"
                  >
                    <Plus className="w-7 h-7" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="h-[124px] rounded-2xl bg-[#FDF5F3] border border-[#FAD6CF] px-5 flex items-center text-[26px] leading-[1.35] text-[#2D2D2E]">
          {bothRecorded ? (
            <span>
              <strong className="block">Same 8 digits.</strong>
              <span className="block">Chunking turned 8 separate items into 3 groups.</span>
            </span>
          ) : (
            <span className="text-[#6E6D70]">Record both rounds to compare.</span>
          )}
        </div>

        <button type="button" onClick={resetTally} className={`${btnSecondary} self-start mt-4`}>
          <RotateCcw className="w-7 h-7" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};
