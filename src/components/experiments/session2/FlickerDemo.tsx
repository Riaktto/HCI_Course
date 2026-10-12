import React, { useEffect, useRef, useState } from 'react';
import { Eye, Play, Square, CheckCircle2 } from 'lucide-react';

type SceneId = 1 | 2 | 3;
type Variant = 'A' | 'B';
type Shown = 'A' | 'B' | 'blank';

const W = 1176;
const H = 496;
const STRIP_Y = 440; // reserved caption strip for the reveal label
const RING = '#E5391C';
const PULSE = '#FBBF24';
const PULSE_MS = 400;

// Flicker cycle: version A, blank, version B, blank
const CYCLE: { show: Shown; ms: number }[] = [
  { show: 'A', ms: 600 },
  { show: 'blank', ms: 200 },
  { show: 'B', ms: 600 },
  { show: 'blank', ms: 200 },
];

const SCENES: { id: SceneId; label: string; caption: string }[] = [
  { id: 1, label: '1 Price table', caption: 'Changed: Team, 3 months: 47 became 41' },
  { id: 2, label: '2 Settings', caption: 'Changed: "Share usage data" was switched off' },
  { id: 3, label: '3 Order summary', caption: 'Changed: Notebook quantity 2 became 3, total updated' },
];

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Amber flash that fades out, plus a small "updated" label. Mounted fresh every time version B appears. */
const Pulse: React.FC<{ box: Box; label?: { x: number; y: number; anchor?: 'start' | 'end' } }> = ({ box, label }) => (
  <g>
    <rect className="flk-pulse" x={box.x} y={box.y} width={box.w} height={box.h} rx={8} fill={PULSE} />
    {label && (
      <text x={label.x} y={label.y} fontSize={22} fontWeight={700} fill="#92400E" textAnchor={label.anchor ?? 'start'}>
        updated
      </text>
    )}
  </g>
);

/* ---------------------------- Scene 1: price table ---------------------------- */

const TABLE_HEAD = ['Plan', '1 month', '3 months', '12 months'];
const TABLE_ROWS: { plan: string; v: string[] }[] = [
  { plan: 'Basic', v: ['12', '34', '118'] },
  { plan: 'Plus', v: ['19', '52', '187'] },
  { plan: 'Pro', v: ['27', '71', '263'] },
  { plan: 'Team', v: ['38', '47', '305'] },
  { plan: 'School', v: ['44', '96', '338'] },
  { plan: 'Max', v: ['59', '128', '459'] },
];
const T_X = 40;
const T_Y = 24;
const T_HEAD_H = 52;
const T_ROW_H = 56;
const COL_X = [T_X, 340, 605, 870];
const COL_W = [300, 265, 265, 266];
const CHANGED_ROW = 3;
const CHANGED_COL = 2; // index in TABLE_HEAD
const cellBox = (col: number, row: number): Box => ({
  x: COL_X[col],
  y: T_Y + T_HEAD_H + row * T_ROW_H,
  w: COL_W[col],
  h: T_ROW_H,
});

const PriceTable: React.FC<{ v: Variant; signal: boolean }> = ({ v, signal }) => (
  <g>
    <rect width={W} height={H} fill="#FFFFFF" />
    <rect x={T_X} y={T_Y} width={1096} height={T_HEAD_H} fill="#222222" />
    {TABLE_HEAD.map((h, c) => (
      <text key={h} x={c === 0 ? COL_X[c] + 20 : COL_X[c] + COL_W[c] - 40} y={T_Y + 36} fontSize={24} fontWeight={700} fill="#FFFFFF" textAnchor={c === 0 ? 'start' : 'end'}>
        {h}
      </text>
    ))}
    {TABLE_ROWS.map((r, i) => {
      const y = T_Y + T_HEAD_H + i * T_ROW_H;
      return (
        <g key={r.plan}>
          <rect x={T_X} y={y} width={1096} height={T_ROW_H} fill={i % 2 ? '#F5F5F4' : '#FFFFFF'} />
          <text x={COL_X[0] + 20} y={y + 38} fontSize={26} fontWeight={600} fill="#222222">{r.plan}</text>
          {r.v.map((val, k) => {
            const changed = v === 'B' && i === CHANGED_ROW && k + 1 === CHANGED_COL;
            return (
              <text key={k} x={COL_X[k + 1] + COL_W[k + 1] - 40} y={y + 38} fontSize={28} className="font-mono" fill="#222222" textAnchor="end">
                {changed ? '41' : val}
              </text>
            );
          })}
        </g>
      );
    })}
    <rect x={T_X} y={T_Y} width={1096} height={T_HEAD_H + 6 * T_ROW_H} fill="none" stroke="#D6D3D1" strokeWidth={2} />
    {v === 'B' && signal && (
      <Pulse box={cellBox(CHANGED_COL, CHANGED_ROW)} label={{ x: COL_X[CHANGED_COL] + 16, y: T_Y + T_HEAD_H + CHANGED_ROW * T_ROW_H + 37 }} />
    )}
  </g>
);

/* ------------------------------ Scene 2: settings ------------------------------ */

const SETTINGS_L = [
  { name: 'Notifications', sub: 'Alerts on this device', on: true },
  { name: 'Auto-save', sub: 'Save every 5 minutes', on: true },
  { name: 'Dark mode', sub: 'Use dark colours', on: false },
  { name: 'Location', sub: 'Share where you are', on: false },
];
const SETTINGS_R = [
  { name: 'Sounds', sub: 'Play a sound for alerts', on: true },
  { name: 'Wi-Fi only', sub: 'Download on Wi-Fi only', on: true },
  { name: 'Share usage data', sub: 'Help us improve the app', on: true, flips: true },
  { name: 'Backup', sub: 'Copy files to the cloud', on: false },
];
const S_Y = 70;
const S_ROW_H = 90;
const S_COL_X = [40, 604];
const S_COL_W = 532;
const FLIP_ROW = 2;

const Settings: React.FC<{ v: Variant; signal: boolean }> = ({ v, signal }) => (
  <g>
    <rect width={W} height={H} fill="#F5F5F4" />
    <text x={40} y={46} fontSize={30} fontWeight={700} fill="#222222">Settings</text>
    {[SETTINGS_L, SETTINGS_R].map((col, c) =>
      col.map((s, i) => {
        const x = S_COL_X[c];
        const y = S_Y + i * S_ROW_H;
        const on = s.on && !(v === 'B' && 'flips' in s && s.flips);
        return (
          <g key={s.name}>
            <rect x={x} y={y} width={S_COL_W} height={S_ROW_H - 10} rx={14} fill="#FFFFFF" stroke="#E7E5E4" strokeWidth={2} />
            <text x={x + 24} y={y + 36} fontSize={26} fontWeight={700} fill="#222222">{s.name}</text>
            <text x={x + 24} y={y + 66} fontSize={22} fill="#6E6D70">{s.sub}</text>
            <rect x={x + S_COL_W - 100} y={y + 20} width={76} height={40} rx={20} fill={on ? '#2563EB' : '#D6D3D1'} />
            <circle cx={x + S_COL_W - (on ? 44 : 80)} cy={y + 40} r={16} fill="#FFFFFF" />
          </g>
        );
      }),
    )}
    {v === 'B' && signal && (
      <Pulse
        box={{ x: S_COL_X[1], y: S_Y + FLIP_ROW * S_ROW_H, w: S_COL_W, h: S_ROW_H - 10 }}
        label={{ x: S_COL_X[1] + S_COL_W - 120, y: S_Y + FLIP_ROW * S_ROW_H + 47, anchor: 'end' }}
      />
    )}
  </g>
);

/* ---------------------------- Scene 3: order summary ---------------------------- */

const ORDER = [
  { item: 'USB cable', qty: 1, price: 8 },
  { item: 'Notebook', qty: 2, price: 6 },
  { item: 'Pen set', qty: 1, price: 5 },
  { item: 'Mug', qty: 1, price: 9 },
];
const NOTEBOOK = 1;
const O_Y = 78;
const O_ROW_H = 56;
const O_COL = { qty: 640, price: 840, total: 1076 }; // right edges
const money = (n: number) => `${n.toFixed(2)} EUR`;

const Order: React.FC<{ v: Variant; signal: boolean }> = ({ v, signal }) => {
  const lines = ORDER.map((l, i) => ({ ...l, qty: v === 'B' && i === NOTEBOOK ? 3 : l.qty }));
  const total = lines.reduce((sum, l) => sum + l.qty * l.price, 0);
  const rowY = (i: number) => O_Y + 52 + i * O_ROW_H;
  const totalY = rowY(ORDER.length) + 10;
  return (
    <g>
      <rect width={W} height={H} fill="#FFFFFF" />
      <text x={40} y={46} fontSize={30} fontWeight={700} fill="#222222">Your order</text>
      <rect x={40} y={O_Y} width={1096} height={52} fill="#222222" />
      <text x={64} y={O_Y + 35} fontSize={24} fontWeight={700} fill="#FFFFFF">Item</text>
      <text x={O_COL.qty} y={O_Y + 35} fontSize={24} fontWeight={700} fill="#FFFFFF" textAnchor="end">Qty</text>
      <text x={O_COL.price} y={O_Y + 35} fontSize={24} fontWeight={700} fill="#FFFFFF" textAnchor="end">Price</text>
      <text x={O_COL.total} y={O_Y + 35} fontSize={24} fontWeight={700} fill="#FFFFFF" textAnchor="end">Line total</text>
      {lines.map((l, i) => (
        <g key={l.item}>
          <rect x={40} y={rowY(i)} width={1096} height={O_ROW_H} fill={i % 2 ? '#F5F5F4' : '#FFFFFF'} />
          <text x={64} y={rowY(i) + 38} fontSize={26} fontWeight={600} fill="#222222">{l.item}</text>
          <text x={O_COL.qty} y={rowY(i) + 38} fontSize={28} className="font-mono" fill="#222222" textAnchor="end">{l.qty}</text>
          <text x={O_COL.price} y={rowY(i) + 38} fontSize={26} className="font-mono" fill="#525254" textAnchor="end">{money(l.price)}</text>
          <text x={O_COL.total} y={rowY(i) + 38} fontSize={26} className="font-mono" fill="#222222" textAnchor="end">{money(l.qty * l.price)}</text>
        </g>
      ))}
      <line x1={40} y1={totalY - 4} x2={1136} y2={totalY - 4} stroke="#222222" strokeWidth={3} />
      <text x={64} y={totalY + 40} fontSize={28} fontWeight={700} fill="#222222">Total</text>
      <text x={O_COL.total} y={totalY + 40} fontSize={28} fontWeight={700} className="font-mono" fill="#222222" textAnchor="end">{money(total)}</text>
      <rect x={40} y={O_Y} width={1096} height={totalY + 52 - O_Y} fill="none" stroke="#D6D3D1" strokeWidth={2} />
      {v === 'B' && signal && (
        <>
          <Pulse box={{ x: O_COL.qty - 90, y: rowY(NOTEBOOK) + 4, w: 110, h: O_ROW_H - 8 }} label={{ x: O_COL.qty - 100, y: rowY(NOTEBOOK) + 37, anchor: 'end' }} />
          <Pulse box={{ x: O_COL.total - 250, y: rowY(NOTEBOOK) + 4, w: 270, h: O_ROW_H - 8 }} />
          <Pulse box={{ x: O_COL.total - 250, y: totalY + 4, w: 270, h: 48 }} />
        </>
      )}
    </g>
  );
};

/** Ring around the changed element in version B. */
const ringFor = (scene: SceneId): { x: number; y: number; w: number; h: number; r: number } => {
  if (scene === 1) {
    const b = cellBox(CHANGED_COL, CHANGED_ROW);
    return { x: b.x + 4, y: b.y + 2, w: b.w - 8, h: b.h - 4, r: 10 };
  }
  if (scene === 2) return { x: S_COL_X[1] - 6, y: S_Y + FLIP_ROW * S_ROW_H - 6, w: S_COL_W + 12, h: S_ROW_H + 2, r: 18 };
  const y = O_Y + 52 + NOTEBOOK * O_ROW_H;
  return { x: O_COL.qty - 100, y: y + 2, w: 120, h: O_ROW_H - 4, r: 10 };
};

const SceneSvg: React.FC<{ scene: SceneId; show: Shown; ring: boolean; signal: boolean }> = ({ scene, show, ring, signal }) => {
  const r = ringFor(scene);
  const caption = SCENES.find((s) => s.id === scene)?.caption ?? '';
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="block">
      {show === 'blank' ? (
        <rect width={W} height={H} fill="#9CA3AF" />
      ) : (
        <>
          {scene === 1 && <PriceTable v={show} signal={signal} />}
          {scene === 2 && <Settings v={show} signal={signal} />}
          {scene === 3 && <Order v={show} signal={signal} />}
          {ring && (
            <>
              <rect x={r.x} y={r.y} width={r.w} height={r.h} rx={r.r} fill="none" stroke={RING} strokeWidth={6} strokeDasharray="14 8" />
              <rect x={0} y={STRIP_Y} width={W} height={H - STRIP_Y} fill="#FDF5F3" />
              <text x={W / 2} y={STRIP_Y + 38} fontSize={26} fontWeight={700} fill={RING} textAnchor="middle">{caption}</text>
            </>
          )}
        </>
      )}
    </svg>
  );
};

/* --------------------------------- Component --------------------------------- */

const STEPS = ['1. Find the change with no help.', '2. Switch Signal on and look again.', '3. Compare the two times.'];

export const FlickerDemo: React.FC = () => {
  const [scene, setScene] = useState<SceneId>(1);
  const [signal, setSignal] = useState(false);
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [elapsed, setElapsed] = useState(0); // ms
  const [timing, setTiming] = useState(false);
  const [found, setFound] = useState<number | null>(null);
  const [results, setResults] = useState<{ off: number | null; on: number | null }>({ off: null, on: null });
  const startRef = useRef(0);

  // Flicker cycle
  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => setStep((s) => (s + 1) % CYCLE.length), CYCLE[step].ms);
    return () => clearTimeout(id);
  }, [running, step]);

  // Elapsed counter
  useEffect(() => {
    if (!timing) return;
    const id = setInterval(() => setElapsed(Date.now() - startRef.current), 100);
    return () => clearInterval(id);
  }, [timing]);

  const reset = () => {
    setRunning(false);
    setTiming(false);
    setStep(0);
    setRevealed(false);
    setElapsed(0);
    setFound(null);
  };

  const selectScene = (s: SceneId) => {
    reset();
    setScene(s);
    setResults({ off: null, on: null });
  };

  const start = () => {
    setRevealed(false);
    setFound(null);
    setStep(0);
    setElapsed(0);
    startRef.current = Date.now();
    setRunning(true);
    setTiming(true);
  };

  const stop = () => {
    setRunning(false);
    setTiming(false);
  };

  const reveal = () => {
    setRunning(false);
    setTiming(false);
    setRevealed(true);
  };

  const markFound = () => {
    if (!timing) return;
    const t = Date.now() - startRef.current;
    setElapsed(t);
    setFound(t);
    setTiming(false);
    setResults((r) => ({ ...r, [signal ? 'on' : 'off']: t }));
  };

  const show: Shown = revealed ? 'B' : running ? CYCLE[step].show : 'A';
  const seconds = (found ?? elapsed) / 1000;
  const aha = revealed || found !== null;
  const fmt = (ms: number | null) => (ms === null ? '--' : `${(ms / 1000).toFixed(1)} s`);

  const btn =
    'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-3 cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed';
  const secondary = `${btn} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100`;
  const primary = `${btn} bg-[#E5391C] hover:bg-[#C92B10] text-white`;
  const seg = (active: boolean) =>
    `px-5 py-3.5 text-[24px] font-bold cursor-pointer whitespace-nowrap ${
      active ? 'bg-[#222222] text-white' : 'bg-white text-[#525254] hover:bg-stone-100'
    }`;

  return (
    <div className="flex-1 min-h-0 flex gap-6">
      <style>{`@keyframes flkPulse{from{opacity:.95}to{opacity:0}}.flk-pulse{animation:flkPulse ${PULSE_MS}ms ease-out forwards}`}</style>

      {/* Left: controls + scene */}
      <div className="w-[1180px] shrink-0 flex flex-col gap-4 min-h-0">
        <div className="flex gap-3 shrink-0">
          {SCENES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => selectScene(s.id)}
              aria-pressed={scene === s.id}
              className={`${btn} justify-center flex-1 border ${
                scene === s.id ? 'bg-[#222222] text-white border-[#222222]' : 'bg-white text-[#525254] border-[#E8E2D9] hover:bg-stone-100'
              }`}
            >
              {s.label}
            </button>
          ))}
          <div className="flex shrink-0 rounded-xl border border-[#E8E2D9] overflow-hidden" role="group" aria-label="Signal">
            <span className="px-4 py-3.5 text-[24px] font-bold text-[#222222] bg-[#FAF9F6] whitespace-nowrap">Signal:</span>
            <button type="button" aria-pressed={!signal} onClick={() => setSignal(false)} className={seg(!signal)}>
              off
            </button>
            <button type="button" aria-pressed={signal} onClick={() => setSignal(true)} className={seg(signal)}>
              on
            </button>
          </div>
        </div>
        <div className="flex gap-3 shrink-0">
          <button type="button" onClick={start} className={primary}>
            <Play className="w-7 h-7" />
            <span>Start flicker</span>
          </button>
          <button type="button" onClick={stop} disabled={!running} className={secondary}>
            <Square className="w-6 h-6" />
            <span>Stop</span>
          </button>
          <button type="button" onClick={markFound} disabled={!timing} className={secondary}>
            <CheckCircle2 className="w-7 h-7" />
            <span>Students found it</span>
          </button>
          <button type="button" onClick={reveal} className={secondary}>
            <Eye className="w-7 h-7" />
            <span>Reveal change</span>
          </button>
        </div>
        <div className="w-[1180px] h-[500px] shrink-0 rounded-3xl border-2 border-[#E8E2D9] overflow-hidden bg-white shadow-xs">
          <SceneSvg scene={scene} show={show} ring={revealed} signal={signal} />
        </div>
      </div>

      {/* Right: goal, steps, timer, aha */}
      <div className="flex-1 min-w-0 flex flex-col gap-3">
        <p className="shrink-0 text-[28px] leading-[1.3] font-bold text-[#E5391C]">
          Goal: see why users miss changes on screen, and what fixes it.
        </p>
        <div className="shrink-0 bg-white border border-[#E8E2D9] rounded-3xl shadow-xs px-6 py-3 flex flex-col gap-1">
          {STEPS.map((t) => (
            <span key={t} className="text-[26px] leading-[1.3] text-[#2D2D2E]">{t}</span>
          ))}
        </div>
        <div className="shrink-0 bg-white border border-[#E8E2D9] rounded-3xl shadow-xs px-6 py-3 flex flex-col gap-1">
          <div className="flex items-baseline justify-between">
            <span className="text-[24px] text-[#525254] font-semibold">Timer</span>
            <span className={`text-[56px] leading-none font-mono-code font-bold ${found !== null ? 'text-emerald-700' : 'text-[#222222]'}`}>
              {seconds.toFixed(1)} s
            </span>
          </div>
          <div className="h-[34px] text-[26px] font-mono font-bold text-emerald-700">
            {found !== null ? `Found after ${(found / 1000).toFixed(1)} s` : ''}
          </div>
          <div className="text-[22px] font-mono text-[#6E6D70] whitespace-nowrap">
            Signal off: {fmt(results.off)} | Signal on: {fmt(results.on)}
          </div>
        </div>
        <div
          className={`flex-1 min-h-0 rounded-3xl px-6 py-3 flex flex-col justify-center gap-1 ${
            aha ? 'bg-[#FDF5F3] border-2 border-[#FAD6CF] shadow-xs' : 'border-2 border-dashed border-[#E8E2D9]'
          }`}
        >
          {aha ? (
            <>
              <span className="text-[22px] leading-[1.2] font-mono font-bold text-[#E5391C]">
                Aha · change blindness = missing a change in plain sight
              </span>
              <p className="text-[26px] leading-[1.3] text-[#2D2D2E]">
                A change you cannot find is a change your users will miss. If something changes on screen, tell the user: highlight it, animate it, or say it where they are looking.
              </p>
            </>
          ) : (
            <p className="text-[24px] leading-[1.3] text-[#6E6D70]">The key idea appears when the class finds the change, or you reveal it.</p>
          )}
        </div>
      </div>
    </div>
  );
};
