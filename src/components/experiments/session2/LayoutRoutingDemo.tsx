import React, { useEffect, useState } from 'react';
import { Minus, Plus, Play, RotateCcw, HeartPulse } from 'lucide-react';

/**
 * LayoutRoutingDemo: the SAME six elements of a clinic landing page in a flat layout (A)
 * and a layout with a clear visual hierarchy (B). The presenter shows each for 5 s, the class
 * notes where they looked first, and the presenter records the hand-raise counts per region.
 * Votes are stored per layout; every statistic is computed from them (nothing hard-coded).
 */

type LayoutId = 'A' | 'B';
type Phase = 'idle' | 'show' | 'vote';
type RegionId = 1 | 2 | 3 | 4 | 5 | 6;
type Rect = { x: number; y: number; w: number; h: number };

const SHOW_SECONDS = 5;
const MIN_VOTES_FOR_INSIGHT = 10;

const REGIONS: { id: RegionId; name: string }[] = [
  { id: 1, name: 'Logo' },
  { id: 2, name: 'Menu' },
  { id: 3, name: 'Headline' },
  { id: 4, name: 'Photo' },
  { id: 5, name: 'Book button' },
  { id: 6, name: 'Promo banner' },
];

// Page body is 1100 x 436 px; each region is absolutely placed so nothing can ever reflow.
const RECTS: Record<LayoutId, Record<RegionId, Rect>> = {
  A: {
    1: { x: 20, y: 16, w: 250, h: 64 },
    2: { x: 290, y: 16, w: 790, h: 64 },
    3: { x: 20, y: 96, w: 530, h: 156 },
    4: { x: 570, y: 96, w: 510, h: 156 },
    5: { x: 20, y: 268, w: 530, h: 148 },
    6: { x: 570, y: 268, w: 510, h: 148 },
  },
  B: {
    1: { x: 24, y: 14, w: 200, h: 48 },
    2: { x: 560, y: 14, w: 516, h: 48 },
    3: { x: 40, y: 90, w: 540, h: 200 },
    4: { x: 640, y: 90, w: 420, h: 230 },
    5: { x: 40, y: 322, w: 300, h: 84 },
    6: { x: 640, y: 350, w: 420, h: 56 },
  },
};

// Marker centres sit in empty parts of each region so they never cover the text underneath.
const MARKERS: Record<LayoutId, Record<RegionId, { x: number; y: number }>> = {
  A: { 1: { x: 48, y: 48 }, 2: { x: 318, y: 48 }, 3: { x: 48, y: 174 }, 4: { x: 598, y: 174 }, 5: { x: 48, y: 342 }, 6: { x: 598, y: 342 } },
  B: { 1: { x: 190, y: 38 }, 2: { x: 640, y: 38 }, 3: { x: 520, y: 262 }, 4: { x: 850, y: 205 }, 5: { x: 76, y: 364 }, 6: { x: 676, y: 378 } },
};

const MENU_ITEMS = ['Doctors', 'Services', 'Contact'];

const emptyVotes = (): Record<RegionId, number> => ({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });

const sum = (v: Record<RegionId, number>) => REGIONS.reduce((s, r) => s + v[r.id], 0);

/** Region with the most first looks, and its share of all votes (null when no votes). */
const topRegion = (v: Record<RegionId, number>) => {
  const total = sum(v);
  if (total === 0) return null;
  const best = REGIONS.reduce((b, r) => (v[r.id] > v[b.id] ? r : b), REGIONS[0]);
  return { name: best.name, share: Math.round((v[best.id] / total) * 100), exact: v[best.id] / total };
};

/* ------------------------------ Page mock-ups ------------------------------ */

const Illustration: React.FC<{ muted?: boolean }> = ({ muted }) => (
  <svg viewBox="0 0 200 120" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
    <rect width="200" height="120" fill={muted ? '#EFEAE2' : '#F5F2ED'} />
    <circle cx="150" cy="38" r="22" fill="#D9D2C5" />
    <path d="M0 120 L0 92 Q50 60 100 88 T200 78 L200 120 Z" fill="#C9C2B6" />
    <rect x="62" y="34" width="34" height="46" rx="6" fill="#FFFFFF" stroke="#B5AD9F" strokeWidth="2" />
    <path d="M79 44 V70 M66 57 H92" stroke="#6E6D70" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

const RegionContent: React.FC<{ layout: LayoutId; id: RegionId }> = ({ layout, id }) => {
  const flat = layout === 'A';
  // Layout A: every element gets the same neutral card look. Layout B: only the headline and the button speak.
  const flatBox =
    'w-full h-full bg-[#F5F2ED] border border-[#D9D2C5] rounded-xl flex items-center justify-center text-center px-4 text-[26px] font-semibold text-[#525254] leading-tight';

  switch (id) {
    case 1:
      return flat ? (
        <div className={flatBox}>ClinicCare</div>
      ) : (
        <div className="w-full h-full flex items-center text-[24px] font-medium text-[#6E6D70]">ClinicCare</div>
      );
    case 2:
      return flat ? (
        <div className={`${flatBox} gap-16`}>
          {MENU_ITEMS.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-end gap-8 text-[24px] text-[#6E6D70]">
          {MENU_ITEMS.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      );
    case 3:
      return flat ? (
        <div className={flatBox}>Book your clinic appointment</div>
      ) : (
        <div className="w-full h-full flex items-center text-[56px] leading-[1.08] font-bold text-[#222222] tracking-tight">
          Book your clinic appointment
        </div>
      );
    case 4:
      return flat ? (
        <div className={`${flatBox} flex-col gap-2`}>
          <HeartPulse className="w-10 h-10 text-[#6E6D70]" />
          <span>Clinic photo</span>
        </div>
      ) : (
        <div className="w-full h-full rounded-2xl overflow-hidden border border-[#E8E2D9]">
          <Illustration muted />
        </div>
      );
    case 5:
      return flat ? (
        <div className={flatBox}>Book now</div>
      ) : (
        <div className="w-full h-full rounded-xl bg-[#E5391C] text-white text-[28px] font-bold flex items-center justify-center shadow-md">
          Book now
        </div>
      );
    case 6:
      return flat ? (
        <div className={flatBox}>Free check-up this week</div>
      ) : (
        <div className="w-full h-full rounded-xl bg-[#F5F2ED] text-[#6E6D70] text-[22px] flex items-center justify-center">
          Free check-up this week
        </div>
      );
  }
};

const BrowserFrame: React.FC<{ layout: LayoutId; phase: Phase }> = ({ layout, phase }) => (
  <div className="w-[1100px] h-[480px] shrink-0 bg-white border-2 border-[#E8E2D9] rounded-2xl overflow-hidden shadow-xs flex flex-col">
    {/* browser chrome */}
    <div className="h-[44px] shrink-0 bg-[#F5F2ED] border-b border-[#E8E2D9] flex items-center gap-3 px-4">
      <span className="w-3.5 h-3.5 rounded-full bg-[#D9D2C5]" />
      <span className="w-3.5 h-3.5 rounded-full bg-[#D9D2C5]" />
      <span className="w-3.5 h-3.5 rounded-full bg-[#D9D2C5]" />
      <div className="ml-4 flex-1 h-[28px] rounded-lg bg-white border border-[#E8E2D9] px-3 flex items-center text-[22px] leading-none font-mono text-[#6E6D70]">
        cliniccare.example
      </div>
    </div>

    {/* page body: 1100 x 434 */}
    <div className="relative flex-1 min-h-0 bg-white overflow-hidden">
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          phase === 'vote' ? 'opacity-50 blur-[3px]' : ''
        }`}
      >
        {REGIONS.map((r) => {
          const rc = RECTS[layout][r.id];
          return (
            <div
              key={r.id}
              className="absolute overflow-hidden"
              style={{ left: rc.x, top: rc.y, width: rc.w, height: rc.h }}
            >
              <RegionContent layout={layout} id={r.id} />
            </div>
          );
        })}
      </div>

      {phase === 'vote' &&
        REGIONS.map((r) => {
          const mk = MARKERS[layout][r.id];
          return (
            <span
              key={r.id}
              className="absolute w-[44px] h-[44px] rounded-full bg-[#222222] text-white border-2 border-white shadow-md flex items-center justify-center text-[28px] leading-none font-mono font-bold"
              style={{ left: mk.x - 22, top: mk.y - 22 }}
            >
              {r.id}
            </span>
          );
        })}
    </div>
  </div>
);

/* --------------------------------- Component -------------------------------- */

export const LayoutRoutingDemo: React.FC = () => {
  const [layout, setLayout] = useState<LayoutId>('A');
  const [phase, setPhase] = useState<Phase>('idle');
  const [seconds, setSeconds] = useState(SHOW_SECONDS);
  const [votes, setVotes] = useState<Record<LayoutId, Record<RegionId, number>>>({
    A: emptyVotes(),
    B: emptyVotes(),
  });

  // Countdown: one interval per run, always cleared on stop/unmount.
  useEffect(() => {
    if (phase !== 'show') return;
    const t = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(t);
          setPhase('vote');
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase]);

  const startShow = () => {
    setSeconds(SHOW_SECONDS);
    setPhase('show');
  };

  const selectLayout = (l: LayoutId) => {
    if (phase === 'show') return;
    setLayout(l);
    setPhase('idle');
  };

  const adjust = (id: RegionId, delta: number) =>
    setVotes((v) => ({ ...v, [layout]: { ...v[layout], [id]: Math.max(0, v[layout][id] + delta) } }));

  const resetVotes = () => setVotes({ A: emptyVotes(), B: emptyVotes() });

  const cur = votes[layout];
  const total = sum(cur);
  const maxVotes = Math.max(...REGIONS.map((r) => cur[r.id]));
  const topA = topRegion(votes.A);
  const topB = topRegion(votes.B);
  const insightReady = sum(votes.A) >= MIN_VOTES_FOR_INSIGHT && sum(votes.B) >= MIN_VOTES_FOR_INSIGHT;

  const share = (t: ReturnType<typeof topRegion>) => (t ? `${t.share}% (${t.name})` : 'no votes yet');

  const insight =
    topA && topB && topB.exact > topA.exact
      ? `Same content, same 40 pairs of eyes: layout B drew more first looks to ${topB.name} (${topB.share}% vs ${topA.share}%).`
      : 'The layout did not pull attention to one place this time. Which cue was too weak?';

  const toggleBtn = (l: LayoutId, label: string) => (
    <button
      onClick={() => selectLayout(l)}
      disabled={phase === 'show' && layout !== l}
      className={`px-5 py-3 rounded-xl text-[24px] font-bold whitespace-nowrap transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
        layout === l ? 'bg-[#222222] text-white shadow-xs' : 'text-[#525254] hover:bg-stone-100'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex-1 min-h-0 flex gap-6">
      {/* LEFT: controls + page + status */}
      <div className="w-[1150px] shrink-0 flex flex-col gap-3 min-h-0">
        <div className="h-[64px] shrink-0 flex items-center justify-between w-[1100px] mx-auto">
          <div className="flex items-center bg-white border border-[#E8E2D9] rounded-2xl p-1.5 shadow-xs">
            {toggleBtn('A', 'Layout A (flat)')}
            {toggleBtn('B', 'Layout B (hierarchy)')}
          </div>
          <button
            onClick={startShow}
            disabled={phase === 'show'}
            className="py-3.5 px-6 rounded-xl text-[24px] font-bold bg-[#E5391C] hover:bg-[#C92B10] text-white flex items-center gap-3 shadow-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
          >
            <Play className="w-7 h-7" />
            <span>{phase === 'vote' ? 'Show again (5 s)' : 'Show for 5 s'}</span>
          </button>
        </div>

        <BrowserFrame layout={layout} phase={phase} />

        <div className="flex-1 min-h-0 w-[1100px] mx-auto flex items-center gap-5">
          {phase === 'show' ? (
            <>
              <span className="w-[96px] h-[64px] shrink-0 rounded-xl bg-[#FDF5F3] border border-[#FAD6CF] flex items-center justify-center text-[28px] font-mono font-bold text-[#E5391C]">
                {seconds} s
              </span>
              <p className="text-[28px] leading-[1.3] font-semibold text-[#222222]">
                Look at the page: where does your eye go FIRST?
              </p>
            </>
          ) : phase === 'vote' ? (
            <p className="text-[28px] leading-[1.3] text-[#525254]">
              <strong className="text-[#E5391C] font-bold">Vote:</strong> where did you look first?
              <span className="text-[24px] text-[#6E6D70]"> Tap + for each raised hand.</span>
            </p>
          ) : (
            <p className="text-[28px] leading-[1.3] text-[#525254]">
              Show the page for 5 seconds, then count first looks.
            </p>
          )}
        </div>
      </div>

      {/* RIGHT: votes + results */}
      <div className="flex-1 min-w-0 flex flex-col gap-3 min-h-0">
        <div className="bg-white border border-[#E8E2D9] rounded-3xl shadow-xs px-5 pt-3 pb-3 flex flex-col">
          <div className="flex items-center justify-between h-[52px] pb-2 border-b border-[#E8E2D9]">
            <span className="text-[30px] font-bold text-[#222222] whitespace-nowrap">
              Votes · <span className="text-[#E5391C]">Layout {layout}</span>
            </span>
            <button
              onClick={resetVotes}
              className="py-1.5 px-4 rounded-xl text-[24px] font-bold bg-white hover:bg-stone-100 text-[#525254] border border-[#E8E2D9] flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-6 h-6" />
              <span>Reset votes</span>
            </button>
          </div>

          {REGIONS.map((r) => {
            const v = cur[r.id];
            const pct = total ? Math.round((v / total) * 100) : 0;
            const isTop = total > 0 && v === maxVotes;
            return (
              <div key={r.id} className="grid grid-cols-[36px_156px_152px_1fr_64px] items-center gap-2.5 h-[54px]">
                <span className="w-9 h-9 rounded-full bg-[#222222] text-white text-[24px] leading-none font-mono font-bold flex items-center justify-center">
                  {r.id}
                </span>
                <span className="text-[24px] font-semibold text-[#2D2D2E] whitespace-nowrap">{r.name}</span>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => adjust(r.id, -1)}
                    disabled={v === 0}
                    aria-label={`Remove vote for ${r.name}`}
                    className="w-12 h-12 rounded-xl bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 flex items-center justify-center cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-6 h-6" />
                  </button>
                  <span className="w-[52px] text-center text-[24px] font-mono font-bold text-[#222222]">{v}</span>
                  <button
                    onClick={() => adjust(r.id, 1)}
                    aria-label={`Add vote for ${r.name}`}
                    className="w-12 h-12 rounded-xl bg-[#E5391C] hover:bg-[#C92B10] text-white flex items-center justify-center cursor-pointer"
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
                <div className="h-5 rounded-full bg-stone-100 border border-stone-200 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${isTop ? 'bg-[#E5391C]' : 'bg-stone-400'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-[24px] font-mono font-bold text-[#222222] text-right">
                  {total ? `${pct}%` : '–'}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex-1 min-h-0 bg-[#FDF5F3] border-2 border-[#FAD6CF] rounded-3xl shadow-xs px-5 py-3 flex flex-col justify-center gap-3">
          <p className="text-[24px] leading-[1.35] font-mono text-[#2D2D2E]">
            <strong className="text-[#E5391C]">Most-chosen element:</strong> A {share(topA)} · B {share(topB)}
          </p>
          {insightReady ? (
            <p className="text-[26px] leading-[1.35] font-semibold text-[#222222]">{insight}</p>
          ) : (
            <p className="text-[24px] leading-[1.35] text-[#6E6D70]">
              The comparison appears once both layouts have {MIN_VOTES_FOR_INSIGHT}+ votes.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
