import React, { useMemo, useState } from 'react';
import { RefreshCw, Settings, Search, Leaf } from 'lucide-react';

type Tab = 'Overview' | 'Insights' | 'Assets' | 'Signals' | 'Setup';
type Status = 'ok' | 'warn' | 'bad';

const TABS: Tab[] = ['Overview', 'Insights', 'Assets', 'Signals', 'Setup'];

const FIELDS = [
  'FV-0412 Beni Mellal A3', 'FV-0098 Field A (Haouz)', 'FV-0231 Sidi Slimane N2', 'FV-0117 Field C (Haouz)',
  'FV-0305 Berkane Est', 'FV-0140 Field B (Haouz)', 'FV-0128 Field C (Gharb)', 'FV-0077 Tadla P12',
  'FV-0262 Meknes Sud', 'FV-0171 Field C2 (Haouz)', 'FV-0188 Doukkala 4', 'FV-0019 Souss Q7',
  'FV-0333 Larache B', 'FV-0214 Field D (Haouz)', 'FV-0390 Zagora Oasis', 'FV-0056 Chichaoua 2',
  'FV-0301 Berkane Ouest', 'FV-0120 Field C (Haouz) old', 'FV-0275 Taroudant T5', 'FV-0044 Kenitra K1',
  'FV-0399 Fes Saiss 3', 'FV-0208 Settat S9', 'FV-0151 Field A (Gharb)', 'FV-0367 Ouarzazate O2',
  'FV-0082 El Jadida J4', 'FV-0245 Khemisset 6', 'FV-0312 Taza Nord', 'FV-0160 Field B (Gharb)',
  'FV-0029 Agadir Ait Melloul', 'FV-0350 Safi Sud',
];

const NOW = new Date(2026, 9, 12, 14, 0, 0).getTime();
const HOUR = 3600000;
const HAOUZ_C = 3;

/** deterministic pseudo random in [0,1) */
const rnd = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

interface Params { vwc: number; slope: number; ec: number; tair: number; eto: number; seed: number }

const paramsFor = (i: number): Params =>
  i === HAOUZ_C
    ? { vwc: 19.8, slope: 0.15, ec: 1.8, tair: 31, eto: 6.2, seed: 7 }
    : { vwc: 23 + rnd(i + 1) * 15, slope: (rnd(i + 40) - 0.45) * 0.07, ec: 1 + rnd(i + 9) * 1.6, tair: 24 + rnd(i + 3) * 10, eto: 3.5 + rnd(i + 5) * 2.5, seed: i + 11 };

interface SeriesDef { key: string; color: string; fn: (p: Params, h: number) => number }

const diurnal = (h: number) => Math.sin(((((NOW + h * HOUR) / HOUR) % 24) - 8) / 24 * Math.PI * 2);

const SERIES: SeriesDef[] = [
  { key: 'VWC10', color: '#e6194b', fn: (p, h) => p.vwc - p.slope * h + 0.4 * diurnal(h) },
  { key: 'VWC30', color: '#f58231', fn: (p, h) => p.vwc + 6 - p.slope * h * 0.5 + 0.15 * diurnal(h) },
  { key: 'VWC60', color: '#d4b800', fn: (p, h) => p.vwc + 10 + 0.02 * h },
  { key: 'EC', color: '#3cb44b', fn: (p, h) => p.ec + 0.12 * diurnal(h) + 0.003 * h },
  { key: 'Tair', color: '#17a2a2', fn: (p, h) => p.tair - 8 + 8 * diurnal(h) },
  { key: 'RH', color: '#4363d8', fn: (p, h) => 48 - 18 * diurnal(h) + rnd(p.seed + h) * 3 },
  { key: 'ETo', color: '#911eb4', fn: (p, h) => p.eto * 0.12 * (1 + diurnal(h)) },
  { key: 'Rain', color: '#d6249f', fn: () => 0 },
];

const latest = (p: Params, key: string) => SERIES.find(s => s.key === key)!.fn(p, 0);

interface Tile { label: string; value: (p: Params) => string; status: (p: Params) => Status }

const num = (n: number, d = 1) => n.toFixed(d);
const TILES: Tile[] = [
  { label: 'VWC 10', value: p => num(latest(p, 'VWC10')), status: p => (latest(p, 'VWC10') < 22 ? 'bad' : latest(p, 'VWC10') < 26 ? 'warn' : 'ok') },
  { label: 'VWC 30', value: p => num(latest(p, 'VWC30')), status: () => 'ok' },
  { label: 'VWC 60', value: p => num(latest(p, 'VWC60')), status: () => 'ok' },
  { label: 'EC', value: p => num(latest(p, 'EC')), status: p => (p.ec > 1.7 ? 'warn' : 'ok') },
  { label: 'ETo', value: p => num(p.eto), status: p => (p.eto > 6 ? 'warn' : 'ok') },
  { label: 'Tdew', value: p => num(p.tair - 19.8), status: () => 'ok' },
  { label: 'Tair', value: p => num(latest(p, 'Tair')), status: p => (latest(p, 'Tair') > 36 ? 'bad' : 'ok') },
  { label: 'RH', value: p => num(latest(p, 'RH'), 0), status: () => 'ok' },
  { label: 'Rain 24h', value: () => '0.0', status: () => 'ok' },
  { label: 'Wind', value: p => num(9 + rnd(p.seed) * 8), status: () => 'ok' },
  { label: 'Rad', value: p => num(640 + rnd(p.seed + 2) * 200, 0), status: () => 'ok' },
  { label: 'LW', value: p => num(2.1 + rnd(p.seed + 3) * 3), status: () => 'ok' },
  { label: 'Ts 10', value: p => num(p.tair - 4), status: () => 'ok' },
  { label: 'Ts 30', value: p => num(p.tair - 8), status: () => 'ok' },
  { label: 'pH', value: p => num(6.2 + rnd(p.seed + 4) * 1.1), status: () => 'ok' },
  { label: 'NO3', value: p => num(38 + rnd(p.seed + 5) * 30, 0), status: p => (rnd(p.seed + 5) > 0.7 ? 'warn' : 'ok') },
  { label: 'Batt', value: p => num(3.2 + rnd(p.seed + 6) * 0.6, 2), status: p => (rnd(p.seed + 6) < 0.2 ? 'warn' : 'ok') },
  { label: 'RSSI', value: p => '-' + num(70 + rnd(p.seed + 7) * 22, 0), status: () => 'ok' },
  { label: 'Pres', value: p => num(1008 + rnd(p.seed + 8) * 10, 0), status: () => 'ok' },
  { label: 'Kc', value: p => num(0.7 + rnd(p.seed + 9) * 0.4, 2), status: () => 'ok' },
  { label: 'GDD', value: p => num(1210 + rnd(p.seed + 10) * 300, 0), status: () => 'ok' },
  { label: 'CWSI', value: p => num(p.vwc < 22 ? 0.61 : 0.2 + rnd(p.seed + 11) * 0.2, 2), status: p => (p.vwc < 22 ? 'bad' : 'ok') },
  { label: 'Flow', value: () => '0.0', status: () => 'ok' },
  { label: 'Tank', value: p => num(55 + rnd(p.seed + 12) * 40, 0), status: () => 'ok' },
];

const DOT: Record<Status, string> = { ok: '#44b36a', warn: '#f0a020', bad: '#e03a3a' };

const parseDay = (s: string): number | null => {
  if (!/^\d{8}$/.test(s)) return null;
  const y = +s.slice(0, 4), m = +s.slice(4, 6), d = +s.slice(6, 8);
  const t = new Date(y, m - 1, d);
  if (t.getFullYear() !== y || t.getMonth() !== m - 1 || t.getDate() !== d) return null;
  return t.getTime();
};

const DEFAULT_RANGE = { from: '20261012', to: '20261012' };

export const Project02Sensors: React.FC = () => {
  const [tab, setTab] = useState<Tab>('Overview');
  const [field, setField] = useState(0);
  const [range, setRange] = useState(DEFAULT_RANGE);
  const [draftFrom, setDraftFrom] = useState(DEFAULT_RANGE.from);
  const [draftTo, setDraftTo] = useState(DEFAULT_RANGE.to);
  const [hidden, setHidden] = useState<string[]>([]);

  const params = useMemo(() => paramsFor(field), [field]);

  const commit = (kind: 'from' | 'to', e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    const a = parseDay(kind === 'from' ? draftFrom : range.from);
    const b = parseDay(kind === 'to' ? draftTo : range.to);
    if (a !== null && b !== null && a <= b) {
      setRange({ from: kind === 'from' ? draftFrom : range.from, to: kind === 'to' ? draftTo : range.to });
    }
  };

  const refresh = () => {
    setField(0);
    setRange(DEFAULT_RANGE);
    setDraftFrom(DEFAULT_RANGE.from);
    setDraftTo(DEFAULT_RANGE.to);
    setHidden([]);
  };

  const hours = useMemo(() => {
    const a = parseDay(range.from)!;
    const b = Math.min(parseDay(range.to)! + 23 * HOUR, NOW);
    const out: number[] = [];
    for (let t = a; t <= b; t += HOUR) out.push((t - NOW) / HOUR);
    return out;
  }, [range]);

  const alerts = useMemo(
    () => [
      { id: 'A-2231', code: 'TH-LO', src: 'FV-0117 VWC10', t: '12:55', v: '19.8 < 22.0' },
      { id: 'A-2230', code: 'BAT-L', src: 'FV-0305 SN-14', t: '11:20', v: '3.21' },
      { id: 'A-2227', code: 'EC-HI', src: 'FV-0412 EC', t: '09:02', v: '2.4 > 2.2' },
      { id: 'A-2219', code: 'GW-OFF', src: 'GW-02', t: 'Yesterday', v: '--' },
      { id: 'A-2211', code: 'TH-LO', src: 'FV-0231 VWC10', t: 'Yesterday', v: '21.6 < 22.0' },
    ],
    [],
  );

  return (
    <div
      className="w-[1280px] h-[800px] relative overflow-hidden bg-[#eef1f5] text-[#222] [&_*]:outline-none"
      style={{ fontFamily: 'Segoe UI, Roboto, Arial, sans-serif' }}
    >
      {/* header */}
      <div className="absolute left-0 top-0 w-[1280px] h-[48px] bg-[#1b3a5c] flex items-center px-4">
        <Leaf size={20} className="text-[#6ee09a]" />
        <span className="text-white text-[17px] font-semibold ml-2 mr-8">FieldView</span>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`h-[48px] px-4 text-[13px] ${tab === t ? 'bg-[#2a5683] text-white' : 'text-[#aebfd3]'}`}>
            {t}{t === 'Signals' ? ' (12)' : ''}
          </button>
        ))}
        <div className="flex-1" />
        <div className="relative">
          <Search size={13} className="absolute left-2 top-[8px] text-[#7b8fa6]" />
          <input className="w-[170px] h-[28px] rounded bg-[#26496f] pl-7 text-[12px] text-white placeholder:text-[#7b8fa6]" placeholder="Search" />
        </div>
        <button onClick={refresh} className="ml-4 text-[#aebfd3]"><RefreshCw size={17} /></button>
        <button onClick={() => setTab('Setup')} className="ml-4 text-[#aebfd3]"><Settings size={17} /></button>
        <span className="ml-4 w-[28px] h-[28px] rounded-full bg-[#6ee09a] text-[#1b3a5c] text-[11px] font-bold flex items-center justify-center">SA</span>
      </div>

      {/* filters */}
      <div className="absolute left-0 top-[48px] w-[1280px] h-[48px] bg-white border-b border-[#d8dee6] flex items-center px-4 gap-3">
        <span className="text-[12px] text-[#667]">Field</span>
        <select value={field} onChange={e => setField(+e.target.value)}
          className="h-[28px] w-[260px] border border-[#c5ccd6] rounded px-1 text-[12px] bg-white">
          {FIELDS.map((f, i) => <option key={f} value={i}>{f}</option>)}
        </select>
        <span className="text-[12px] text-[#667] ml-4">From</span>
        <input value={draftFrom} onChange={e => setDraftFrom(e.target.value)} onKeyDown={e => commit('from', e)}
          maxLength={10} className="h-[28px] w-[84px] border border-[#c5ccd6] rounded px-2 text-[12px]" />
        <span className="text-[12px] text-[#667]">To</span>
        <input value={draftTo} onChange={e => setDraftTo(e.target.value)} onKeyDown={e => commit('to', e)}
          maxLength={10} className="h-[28px] w-[84px] border border-[#c5ccd6] rounded px-2 text-[12px]" />
        <div className="flex-1" />
        <span className="text-[10px] text-[#99a]">Gateway GW-02 · data 13:58</span>
      </div>

      {tab === 'Overview' && (
        <>
          <div className="absolute left-4 top-[108px] w-[1248px] grid grid-cols-6 gap-2">
            {TILES.map(t => (
              <div key={t.label} className="relative h-[76px] bg-white rounded border border-[#dde3ea] px-3 py-2">
                <span className="absolute right-2 top-2 w-[6px] h-[6px] rounded-full" style={{ background: DOT[t.status(params)] }} />
                <div className="text-[11px] text-[#667]">{t.label}</div>
                <div className="text-[26px] font-bold leading-[36px]">{t.value(params)}</div>
              </div>
            ))}
          </div>
          <div className="absolute left-4 top-[460px] w-[1248px] h-[330px]">
            <ChartPanel hours={hours} params={params} hidden={hidden} setHidden={setHidden} height={330} />
          </div>
        </>
      )}

      {tab === 'Insights' && (
        <div className="absolute left-4 top-[108px] w-[1248px] h-[682px]">
          <ChartPanel hours={hours} params={params} hidden={hidden} setHidden={setHidden} height={682} />
        </div>
      )}

      {tab === 'Assets' && (
        <div className="absolute left-4 top-[108px] w-[760px] h-[682px] bg-white rounded border border-[#dde3ea] overflow-hidden">
          {FIELDS.slice(0, 18).map((f, i) => (
            <button key={f} onClick={() => { setField(i); setTab('Overview'); }}
              className="w-full h-[36px] flex items-center px-4 text-[12px] border-b border-[#eef1f5] text-left">
              <span className="w-[260px]">{f}</span>
              <span className="text-[#889]">{3 + (i % 5)} sensors</span>
            </button>
          ))}
        </div>
      )}

      {tab === 'Signals' && (
        <div className="absolute left-4 top-[108px] w-[900px] bg-white rounded border border-[#dde3ea]">
          <div className="flex h-[30px] items-center px-4 text-[11px] text-[#889] bg-[#f6f8fa]">
            <span className="w-[90px]">ID</span><span className="w-[90px]">Code</span><span className="w-[220px]">Source</span><span className="w-[110px]">Time</span><span>Val</span>
          </div>
          {alerts.map(a => (
            <div key={a.id} className="flex h-[36px] items-center px-4 text-[12px] border-t border-[#eef1f5]">
              <span className="w-[90px]">{a.id}</span><span className="w-[90px]">{a.code}</span><span className="w-[220px]">{a.src}</span><span className="w-[110px]">{a.t}</span><span>{a.v}</span>
            </div>
          ))}
        </div>
      )}

      {tab === 'Setup' && (
        <div className="absolute left-4 top-[108px] w-[1248px] flex gap-4">
          <div className="w-[600px] bg-white rounded border border-[#dde3ea] p-4">
            <div className="text-[13px] font-semibold mb-2">Thresholds</div>
            {[
              ['VWC 10', 'lo 22.0 / warn 26.0'],
              ['EC', 'hi 2.2 / warn 1.7'],
              ['ETo', 'warn 6.0'],
              ['Tair', 'hi 36.0'],
              ['Batt', 'lo 3.30'],
              ['CWSI', 'hi 0.50'],
            ].map(r => (
              <div key={r[0]} className="flex h-[30px] items-center text-[12px] border-t border-[#eef1f5]">
                <span className="w-[120px]">{r[0]}</span><span className="text-[#667]">{r[1]}</span>
              </div>
            ))}
          </div>
          <div className="w-[600px] bg-white rounded border border-[#dde3ea] p-4">
            <div className="text-[13px] font-semibold mb-2">Glossary</div>
            {[
              ['VWC', 'Volumetric water content, % (10, 30, 60 = depth in cm)'],
              ['EC', 'Electrical conductivity, dS/m'],
              ['ETo', 'Reference evapotranspiration, mm/day'],
              ['Tdew', 'Dew point temperature, deg C'],
              ['CWSI', 'Crop water stress index, 0 to 1'],
            ].map(r => (
              <div key={r[0]} className="flex min-h-[30px] items-center text-[12px] border-t border-[#eef1f5]">
                <span className="w-[70px] font-medium">{r[0]}</span><span className="text-[#667]">{r[1]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface ChartProps {
  hours: number[];
  params: Params;
  hidden: string[];
  setHidden: React.Dispatch<React.SetStateAction<string[]>>;
  height: number;
}

const ChartPanel: React.FC<ChartProps> = ({ hours, params, hidden, setHidden, height }) => {
  const [hover, setHover] = useState<number | null>(null);
  const W = 1020;
  const H = height - 40;
  const L = 34;
  const visible = SERIES.filter(s => !hidden.includes(s.key));
  const data = visible.map(s => ({ s, v: hours.map(h => s.fn(params, h)) }));
  const all = data.flatMap(d => d.v);
  const lo = all.length ? Math.min(...all) : 0;
  const hi = all.length ? Math.max(...all) : 1;
  const x = (i: number) => L + (i / Math.max(hours.length - 1, 1)) * (W - L - 10);
  const y = (v: number) => 10 + (1 - (v - lo) / Math.max(hi - lo, 0.001)) * (H - 20);
  const ticks = [0, 1, 2, 3, 4].map(k => lo + ((hi - lo) * k) / 4);

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const sx = (e.clientX - r.left) * (W / r.width);
    const i = Math.round(((sx - L) / (W - L - 10)) * (hours.length - 1));
    setHover(i >= 0 && i < hours.length ? i : null);
  };

  const toggle = (k: string) =>
    setHidden(h => (h.includes(k) ? h.filter(z => z !== k) : [...h, k]));

  return (
    <div className="w-full h-full bg-white rounded border border-[#dde3ea] flex">
      <div className="relative" style={{ width: W + 8 }}>
        <div className="text-[12px] text-[#667] px-4 pt-3">Trend</div>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="ml-2" onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
          {ticks.map((t, k) => (
            <g key={k}>
              <line x1={L} x2={W - 10} y1={y(t)} y2={y(t)} stroke="#eceff3" />
              <text x={2} y={y(t) + 3} fontSize="9" fill="#aab">{t.toFixed(0)}</text>
            </g>
          ))}
          {data.map(d => (
            <polyline key={d.s.key} fill="none" stroke={d.s.color} strokeWidth="1.6"
              points={d.v.map((v, i) => `${x(i)},${y(v)}`).join(' ')} />
          ))}
          {hover !== null && <line x1={x(hover)} x2={x(hover)} y1={10} y2={H - 10} stroke="#99a" strokeDasharray="3 3" />}
        </svg>
        {hover !== null && (
          <div className="absolute right-3 top-8 bg-[#222] text-white text-[10px] rounded px-2 py-1 leading-[14px] pointer-events-none">
            <div>#{hover}</div>
            {data.map(d => <div key={d.s.key}>{d.s.key} {d.v[hover].toFixed(1)}</div>)}
          </div>
        )}
      </div>
      <div className="flex-1 border-l border-[#eef1f5] p-3 flex flex-col gap-1">
        {SERIES.map(s => (
          <button key={s.key} onClick={() => toggle(s.key)}
            className={`flex items-center gap-2 h-[22px] text-[11px] text-left ${hidden.includes(s.key) ? 'opacity-40' : ''}`}>
            <span className="w-[10px] h-[10px] rounded-sm" style={{ background: s.color }} />
            {s.key}
          </button>
        ))}
      </div>
    </div>
  );
};
