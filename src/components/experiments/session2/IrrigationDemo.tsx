import React, { useEffect, useMemo, useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';

type Mode = 'bad' | 'honest';

const STEPS = 96; // 24 h at 15 min per step
const DT_H = 0.25;
const START_PCT = 30;
const SAT_PCT = 80; // soil cannot hold more water than this
const BAND_LO = 35;
const BAND_HI = 45;
const WATERLOG = 55;
const TICK_MS = 62; // 96 steps in ~6 s
const MONO = 'JetBrains Mono, monospace';

/** Thermostat-style water supply: on (+6 %/h) below the target, off above. Evaporation and drainage always dry the soil. */
const simulate = (setPoint: number): number[] => {
  const series = [START_PCT];
  let m = START_PCT;
  for (let i = 0; i < STEPS; i++) {
    const hour = i * DT_H;
    const sun = Math.max(0, Math.sin((Math.PI * (hour - 6)) / 12)); // more evaporation around midday
    const loss = (0.3 + 0.01 * m) * (1 + 0.8 * sun) + 0.15 * Math.max(0, m - 50); // drainage grows when saturated
    const inflow = m < setPoint ? 6 : 0;
    m = Math.min(SAT_PCT, Math.max(0, m + (inflow - loss) * DT_H));
    series.push(m);
  }
  return series;
};

const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-2';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white disabled:opacity-50 disabled:hover:bg-[#E5391C]`;

interface Verdict {
  text: string;
  tone: 'good' | 'bad' | 'warn';
}

const judge = (mode: Mode, series: number[], setPoint: number): Verdict => {
  const peak = Math.max(...series);
  const final = series[series.length - 1];
  if (peak > WATERLOG) {
    return {
      tone: 'bad',
      text:
        mode === 'bad'
          ? 'Flooded: the dial promised speed, but the system holds a level.'
          : 'Flooded: this target is too high, and the system holds exactly that level.',
    };
  }
  if (final < BAND_LO) {
    return {
      tone: 'warn',
      text:
        mode === 'bad'
          ? 'Too dry: low power is not a slow fill, it is a low level to keep.'
          : 'Too dry: this target is too low, and the system keeps it there.',
    };
  }
  if (final <= BAND_HI) {
    return {
      tone: 'good',
      text:
        mode === 'honest'
          ? 'Stable in the best zone: the label matches what the system does.'
          : `In the best zone, by luck: the dial said power, but the system keeps ${setPoint.toFixed(0)} %.`,
    };
  }
  return { tone: 'warn', text: 'Too wet: above the best zone, but not flooded yet.' };
};

const VERDICT_STYLE = {
  good: 'bg-emerald-50 border-emerald-300 text-emerald-800',
  warn: 'bg-amber-50 border-amber-300 text-amber-800',
  bad: 'bg-red-50 border-red-300 text-red-800',
};

export const IrrigationDemo: React.FC = () => {
  const [mode, setMode] = useState<Mode>('bad');
  const [power, setPower] = useState(100);
  const [target, setTarget] = useState(40);
  const [run, setRun] = useState<{ series: number[]; setPoint: number; mode: Mode } | null>(null);
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);

  const setPoint = mode === 'bad' ? 20 + 0.6 * power : target;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setStep((s) => {
        if (s >= STEPS) {
          setRunning(false);
          return s;
        }
        return s + 1;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [running]);

  const start = () => {
    setRun({ series: simulate(setPoint), setPoint, mode });
    setStep(0);
    setRunning(true);
  };
  const reset = () => {
    setRunning(false);
    setRun(null);
    setStep(0);
  };
  const changeMode = (m: Mode) => {
    setMode(m);
    reset();
  };

  const finished = run !== null && !running && step >= STEPS;
  const verdict = useMemo(() => (run && finished ? judge(run.mode, run.series, run.setPoint) : null), [run, finished]);
  const liveMoisture = run ? run.series[Math.min(step, STEPS)] : START_PCT;

  return (
    <div className="flex-1 min-h-0 flex gap-6 overflow-hidden">
      {/* Control panel (724 px) */}
      <div className="w-[724px] flex-shrink-0 bg-white border border-[#E8E2D9] rounded-3xl shadow-xs p-5 flex flex-col gap-3">
        <div className="flex rounded-xl border border-[#E8E2D9] overflow-hidden flex-shrink-0">
          {(['bad', 'honest'] as const).map((m) => (
            <button
              key={m}
              onClick={() => changeMode(m)}
              disabled={running}
              className={`flex-1 h-16 text-[24px] font-bold ${
                m === mode ? 'bg-[#E5391C] text-white' : 'bg-white text-[#525254] hover:bg-stone-100'
              }`}
            >
              {m === 'bad' ? 'Misleading dial' : 'Honest target'}
            </button>
          ))}
        </div>

        <div className="flex items-end justify-between mt-3 flex-shrink-0">
          <div className="text-[30px] font-bold text-[#222222] leading-tight">
            {mode === 'bad' ? 'Irrigation power' : 'Target soil moisture'}
          </div>
          <div className="text-[84px] font-mono-code font-medium text-[#E5391C] leading-none whitespace-nowrap">
            {mode === 'bad' ? power : target}
            <span className="text-[40px] text-[#6E6D70]">{mode === 'bad' ? '' : ' %'}</span>
          </div>
        </div>

        <Dial
          mode={mode}
          value={mode === 'bad' ? power : target}
          onChange={(v) => {
            // a stale graph would be a cue for the next attempt
            reset();
            if (mode === 'bad') setPower(v);
            else setTarget(v);
          }}
          disabled={running}
        />

        <div className="flex-1 min-h-0 flex flex-col justify-center">
          {mode === 'honest' ? (
            <div className="text-[28px] text-[#222222] leading-[1.35]">
              Live moisture:{' '}
              <span className="font-mono font-bold text-[#E5391C]">{liveMoisture.toFixed(1)} %</span>
              <div className="text-[26px] text-[#525254]">Water turns on below {target} %</div>
            </div>
          ) : (
            <div className="text-[28px] text-[#525254] leading-[1.35]">
              No moisture reading: only a power dial.
            </div>
          )}
        </div>

        <div className="flex gap-3 flex-shrink-0">
          <button onClick={start} disabled={running} className={PRIMARY}>
            <Play className="w-6 h-6" />
            Run 24 h
          </button>
          <button onClick={reset} className={SECONDARY}>
            <RotateCcw className="w-6 h-6" />
            Reset
          </button>
        </div>
      </div>

      {/* Chart (1076 px) */}
      <div className="flex-1 min-w-0 flex flex-col gap-3">
        <div className="h-14 flex-shrink-0 rounded-xl bg-[#FDF5F3] border border-[#FAD6CF] px-5 flex items-center text-[26px] text-[#222222] whitespace-nowrap">
          <span className="font-bold text-[#E5391C] mr-3">User expects:</span>
          {mode === 'bad' ? 'more power = faster fill' : 'I choose the level'}
        </div>
        <div className="flex-1 min-h-0 bg-white border border-[#E8E2D9] rounded-3xl shadow-xs overflow-hidden">
          {run ? (
            <Chart series={run.series.slice(0, step + 1)} setPoint={run.setPoint} />
          ) : (
            <div className="h-full flex items-center justify-center px-10 text-center text-[34px] leading-[1.4] text-[#6E6D70]">
              The graph appears after you press Run 24 h.
            </div>
          )}
        </div>
        <div
          className={`h-[96px] flex-shrink-0 rounded-2xl border-2 px-5 flex items-center text-[28px] leading-[1.35] font-semibold ${
            verdict ? VERDICT_STYLE[verdict.tone] : 'bg-white border-[#E8E2D9] text-[#6E6D70] font-normal'
          }`}
        >
          {verdict ? verdict.text : running ? 'Simulating 24 hours...' : 'Press Run 24 h to see what the system does.'}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */

const DIAL_W = 684;
const THUMB = 44;
const SPAN = DIAL_W - THUMB;

const Dial: React.FC<{ mode: Mode; value: number; onChange: (v: number) => void; disabled: boolean }> = ({
  mode,
  value,
  onChange,
  disabled,
}) => {
  const [min, max] = mode === 'bad' ? [0, 100] : [20, 60];
  const x = (v: number) => THUMB / 2 + ((v - min) / (max - min)) * SPAN;
  const ticks = mode === 'bad' ? [0, 25, 50, 75, 100] : [20, 35, 45, 55, 60];
  return (
    <div className="relative flex-shrink-0" style={{ width: DIAL_W, height: 132 }}>
      {/* band label (honest only) */}
      {mode === 'honest' && (
        <div
          className="absolute text-[22px] font-mono font-semibold text-emerald-700 text-center whitespace-nowrap"
          style={{ left: x(BAND_LO), width: x(BAND_HI) - x(BAND_LO), top: 0 }}
        >
          optimal
        </div>
      )}
      {/* track */}
      <div className="absolute rounded-full bg-stone-200" style={{ left: THUMB / 2, width: SPAN, top: 40, height: 20 }} />
      {mode === 'bad' ? (
        <div className="absolute rounded-full bg-[#E5391C]" style={{ left: THUMB / 2, width: x(value) - THUMB / 2, top: 40, height: 20 }} />
      ) : (
        <>
          <div className="absolute bg-emerald-500" style={{ left: x(BAND_LO), width: x(BAND_HI) - x(BAND_LO), top: 40, height: 20 }} />
          <div
            className="absolute bg-red-400 rounded-r-full"
            style={{ left: x(WATERLOG), width: x(max) - x(WATERLOG) + THUMB / 2 - 10, top: 40, height: 20 }}
          />
        </>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={mode === 'bad' ? 'Irrigation power' : 'Target soil moisture'}
        className="absolute left-0 top-[28px] h-11 m-0 bg-transparent appearance-none cursor-pointer
          [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-runnable-track]:h-11
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-11 [&::-webkit-slider-thumb]:h-11
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#E5391C]
          [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white
          [&::-webkit-slider-thumb]:shadow-md"
        style={{ width: DIAL_W }}
      />
      {ticks.map((t) => (
        <div
          key={t}
          className="absolute text-[22px] font-mono text-[#525254] text-center"
          style={{ left: x(t) - 30, width: 60, top: 86 }}
        >
          {t}
        </div>
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */

const CW = 1072;
const CH = 474;
const ML = 84;
const MR = 24;
const MT = 52;
const MB = 74;
const PW = CW - ML - MR;
const PH = CH - MT - MB;
const Y_MAX = 80;
const px = (hour: number) => ML + (hour / 24) * PW;
const py = (pct: number) => MT + PH - (pct / Y_MAX) * PH;

const Chart: React.FC<{ series: number[]; setPoint: number }> = ({ series, setPoint }) => {
  const d = series.map((v, i) => `${i === 0 ? 'M' : 'L'}${px(i * DT_H).toFixed(1)},${py(v).toFixed(1)}`).join(' ');
  const last = series.length ? series[series.length - 1] : null;
  return (
    <svg width={CW} height={CH} viewBox={`0 0 ${CW} ${CH}`} className="block">
      {/* legend */}
      <rect x={ML} y={8} width={22} height={22} fill="#10B981" fillOpacity={0.35} />
      <text x={ML + 30} y={27} fontSize={22} fill="#222222" fontFamily={MONO}>Optimal 35-45 %</text>
      <rect x={ML + 270} y={8} width={22} height={22} fill="#EF4444" fillOpacity={0.3} />
      <text x={ML + 300} y={27} fontSize={22} fill="#222222" fontFamily={MONO}>Too wet</text>
      <line x1={ML + 500} x2={ML + 540} y1={19} y2={19} stroke="#222222" strokeWidth={3} strokeDasharray="8 5" />
      <text x={ML + 550} y={27} fontSize={22} fill="#222222" fontFamily={MONO}>Target {Math.round(setPoint)} %</text>

      {/* zones */}
      <rect x={ML} y={py(Y_MAX)} width={PW} height={py(WATERLOG) - py(Y_MAX)} fill="#EF4444" fillOpacity={0.14} />
      <rect x={ML} y={py(BAND_HI)} width={PW} height={py(BAND_LO) - py(BAND_HI)} fill="#10B981" fillOpacity={0.25} />

      {[0, 20, 40, 60, 80].map((t) => (
        <g key={t}>
          <line x1={ML} x2={ML + PW} y1={py(t)} y2={py(t)} stroke="#E8E2D9" />
          <text x={ML - 10} y={py(t) + 8} textAnchor="end" fontSize={22} fill="#525254" fontFamily={MONO}>{t}</text>
        </g>
      ))}
      {[0, 4, 8, 12, 16, 20, 24].map((t) => (
        <text key={t} x={px(t)} y={MT + PH + 30} textAnchor="middle" fontSize={22} fill="#525254" fontFamily={MONO}>{t}</text>
      ))}
      <line x1={ML} x2={ML + PW} y1={py(0)} y2={py(0)} stroke="#525254" strokeWidth={2} />
      <line x1={ML} x2={ML} y1={MT} y2={py(0)} stroke="#525254" strokeWidth={2} />
      <text x={ML + PW / 2} y={CH - 10} textAnchor="middle" fontSize={22} fill="#222222" fontFamily={MONO}>Time (hours)</text>
      <text x={24} y={MT + PH / 2} textAnchor="middle" fontSize={22} fill="#222222" fontFamily={MONO} transform={`rotate(-90 24 ${MT + PH / 2})`}>
        Soil moisture (%)
      </text>

      {/* target line, only drawn once a run exists */}
      <line x1={ML} x2={ML + PW} y1={py(setPoint)} y2={py(setPoint)} stroke="#222222" strokeWidth={3} strokeDasharray="12 7" />

      {d && <path d={d} fill="none" stroke="#2563EB" strokeWidth={5} strokeLinejoin="round" strokeLinecap="round" />}
      {last !== null && <circle cx={px((series.length - 1) * DT_H)} cy={py(last)} r={9} fill="#2563EB" stroke="#fff" strokeWidth={3} />}
    </svg>
  );
};
