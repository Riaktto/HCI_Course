import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Home, Thermometer, CalendarDays, BarChart3, Settings, RefreshCw, Minus, Plus, Wifi, Snowflake } from 'lucide-react';

type RoomId = 'living' | 'kitchen' | 'bedroom' | 'kids';
type Mode = 'Auto' | 'Eco' | 'Away' | 'Hold' | 'Boost' | 'Smart';
type Page = 'home' | 'zones' | 'plan' | 'usage' | 'setup';

interface RoomState {
  level: number;
  mode: Mode;
  sched: number[][]; // 7 days x 24 hours, level 0-10
}
type Rooms = Record<RoomId, RoomState>;

const ROOM_META: { id: RoomId; name: string; now: number; color: string }[] = [
  { id: 'living', name: 'Living room', now: 18.4, color: '#3b6fb6' },
  { id: 'kitchen', name: 'Kitchen', now: 19.1, color: '#5aa07a' },
  { id: 'bedroom', name: 'Bedroom', now: 17.2, color: '#b0883a' },
  { id: 'kids', name: 'Kids room', now: 18.0, color: '#9a5fa8' },
];
const MODES: Mode[] = ['Auto', 'Eco', 'Away', 'Hold', 'Boost', 'Smart'];
const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const NOW_DAY = 1; // Tuesday
const NOW_HOUR = 16;

const makeSched = (night: number, morning: number, evening: number, day: number): number[][] =>
  Array.from({ length: 7 }, (_, d) =>
    Array.from({ length: 24 }, (_, h) => {
      const weekend = d >= 5;
      if (h >= 6 && h < 8) return morning;
      if (h >= 8 && h < 17) return weekend ? morning : day;
      if (h >= 17 && h < 22) return evening;
      return night;
    })
  );

const initialRooms = (): Rooms => ({
  living: { level: 5, mode: 'Hold', sched: makeSched(2, 5, 6, 3) },
  kitchen: { level: 5, mode: 'Auto', sched: makeSched(2, 5, 5, 3) },
  bedroom: { level: 4, mode: 'Auto', sched: makeSched(3, 4, 4, 2) },
  kids: { level: 5, mode: 'Eco', sched: makeSched(3, 5, 5, 3) },
});

const levelToTemp = (l: number) => 14 + l;

const effLevel = (r: RoomState, day: number, hour: number): number => {
  const s = r.sched[day];
  const next = s[(hour + 1) % 24];
  switch (r.mode) {
    case 'Hold': return r.level;
    case 'Away': return 1;
    case 'Boost': return hour === NOW_HOUR ? 10 : s[hour];
    case 'Eco': return Math.max(0, s[hour] - 2);
    case 'Smart': return next > s[hour] ? next : s[hour];
    default: return s[hour];
  }
};

const PAST = [1.1, 1.0, 0.9, 0.9, 1.0, 1.4, 2.2, 2.6, 1.8, 1.2, 1.0, 0.9, 0.9, 1.0, 1.1, 1.2];

const hourEnergy = (rooms: Rooms, id: RoomId, h: number): number => {
  if (h < NOW_HOUR) return PAST[h] * (id === 'living' ? 1 : 0.6);
  return effLevel(rooms[id], NOW_DAY, h) * 0.22 + 0.1;
};

const Toggle: React.FC<{ on: boolean; onChange: () => void }> = ({ on, onChange }) => (
  <button
    onClick={onChange}
    style={{ width: 34, height: 18, borderRadius: 9, background: on ? '#4f86c6' : '#c9ced6', position: 'relative', outline: 'none' }}
  >
    <span style={{ position: 'absolute', top: 2, left: on ? 18 : 2, width: 14, height: 14, borderRadius: 7, background: '#fff' }} />
  </button>
);

const Dial: React.FC<{ level: number; onChange: (l: number) => void }> = ({ level, onChange }) => {
  const ref = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);
  const cx = 150, cy = 150, r = 112;
  const toXY = (deg: number, rad = r) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return [cx + rad * Math.cos(a), cy + rad * Math.sin(a)];
  };
  const startDeg = 225, sweep = 270;
  const arc = (from: number, to: number) => {
    const [x1, y1] = toXY(from);
    const [x2, y2] = toXY(to);
    return `M ${x1} ${y1} A ${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${x2} ${y2}`;
  };
  const valDeg = startDeg + (level / 10) * sweep;
  const [kx, ky] = toXY(valDeg);

  const update = (e: React.PointerEvent) => {
    const box = ref.current!.getBoundingClientRect();
    const scale = box.width / 300;
    const dx = (e.clientX - box.left) / scale - cx;
    const dy = (e.clientY - box.top) / scale - cy;
    let ang = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    if (ang < 0) ang += 360;
    let rel = ang - startDeg;
    if (rel < 0) rel += 360;
    if (rel > sweep) rel = rel - sweep < 360 - rel ? sweep : 0;
    onChange(Math.round((rel / sweep) * 10));
  };

  return (
    <svg
      ref={ref}
      width={300}
      height={300}
      viewBox="0 0 300 300"
      onPointerDown={(e) => { dragging.current = true; (e.target as Element).setPointerCapture?.(e.pointerId); update(e); }}
      onPointerMove={(e) => dragging.current && update(e)}
      onPointerUp={() => { dragging.current = false; }}
      style={{ touchAction: 'none', cursor: 'pointer' }}
    >
      <path d={arc(startDeg, startDeg + sweep)} stroke="#e3e7ec" strokeWidth={16} fill="none" strokeLinecap="round" />
      {level > 0 && <path d={arc(startDeg, valDeg)} stroke="#4f86c6" strokeWidth={16} fill="none" strokeLinecap="round" />}
      <circle cx={kx} cy={ky} r={11} fill="#fff" stroke="#4f86c6" strokeWidth={3} />
      <text x={cx} y={cy + 14} textAnchor="middle" fontSize={64} fontWeight={600} fill="#2b3340">{level}</text>
      <text x={cx} y={cy - 40} textAnchor="middle" fontSize={13} fill="#a3a9b3">Heat power</text>
      <text x={cx - 82} y={cy + 100} textAnchor="middle" fontSize={11} fill="#b2b7bf">0</text>
      <text x={cx + 82} y={cy + 100} textAnchor="middle" fontSize={11} fill="#b2b7bf">10</text>
    </svg>
  );
};

export const Project09Thermostat: React.FC = () => {
  const [page, setPage] = useState<Page>('home');
  const [roomId, setRoomId] = useState<RoomId>('living');
  const [draft, setDraft] = useState<Rooms>(initialRooms);
  const [live, setLive] = useState<Rooms>(initialRooms);
  const [brush, setBrush] = useState(6);
  const [toast, setToast] = useState<string | null>(null);
  const [autoSync, setAutoSync] = useState(false);
  const [shareData, setShareData] = useState(true);
  const [aboutOpen, setAboutOpen] = useState(false);
  const painting = useRef(false);

  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(live), [draft, live]);
  const room = draft[roomId];
  const meta = ROOM_META.find((m) => m.id === roomId)!;

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1400);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    const up = () => { painting.current = false; };
    window.addEventListener('pointerup', up);
    return () => window.removeEventListener('pointerup', up);
  }, []);

  useEffect(() => {
    if (autoSync && dirty) setLive(draft);
  }, [autoSync, dirty, draft]);

  const patchRoom = (patch: Partial<RoomState>) =>
    setDraft((d) => ({ ...d, [roomId]: { ...d[roomId], ...patch } }));

  const paint = (day: number, hour: number) => {
    setDraft((d) => {
      const s = d[roomId].sched.map((row) => row.slice());
      s[day][hour] = brush;
      return { ...d, [roomId]: { ...d[roomId], sched: s } };
    });
  };

  const sync = () => {
    setLive(draft);
    setToast('Done');
  };

  const energyByHour = useMemo(
    () => Array.from({ length: 24 }, (_, h) => ROOM_META.map((m) => hourEnergy(live, m.id, h))),
    [live]
  );
  const totalToday = energyByHour.flat().reduce((a, b) => a + b, 0);
  const maxBar = Math.max(...energyByHour.map((a) => a.reduce((x, y) => x + y, 0)));

  const navItems: { id: Page; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home size={20} /> },
    { id: 'zones', label: 'Zones', icon: <Thermometer size={20} /> },
    { id: 'plan', label: 'Plan', icon: <CalendarDays size={20} /> },
    { id: 'usage', label: 'Usage', icon: <BarChart3 size={20} /> },
    { id: 'setup', label: 'Setup', icon: <Settings size={20} /> },
  ];

  const roomTabs = (
    <div className="flex gap-1" style={{ marginBottom: 14 }}>
      {ROOM_META.map((m) => (
        <button
          key={m.id}
          onClick={() => setRoomId(m.id)}
          style={{
            fontSize: 11,
            padding: '4px 9px',
            borderRadius: 4,
            background: roomId === m.id ? '#e4ecf6' : '#eef0f3',
            color: roomId === m.id ? '#3d4b61' : '#8a919c',
            outline: 'none',
          }}
        >
          {m.name}
        </button>
      ))}
    </div>
  );

  const renderHome = () => (
    <div style={{ padding: '22px 28px' }}>
      {roomTabs}
      <div className="flex" style={{ gap: 20 }}>
        {/* dial card */}
        <div style={{ width: 400, background: '#fff', borderRadius: 10, padding: 18, border: '1px solid #e6e9ee' }}>
          <div style={{ fontSize: 15, color: '#3a4350', marginBottom: 6 }}>{meta.name}</div>
          <div className="flex justify-center"><Dial level={room.level} onChange={(l) => patchRoom({ level: l })} /></div>
          <div className="flex justify-center items-center" style={{ gap: 10, marginTop: -6 }}>
            <button onClick={() => patchRoom({ level: Math.max(0, room.level - 1) })} style={{ width: 24, height: 24, background: '#eef0f3', borderRadius: 4, outline: 'none' }}><Minus size={12} color="#8a919c" /></button>
            <span style={{ fontSize: 11, color: '#a3a9b3' }}>adjust</span>
            <button onClick={() => patchRoom({ level: Math.min(10, room.level + 1) })} style={{ width: 24, height: 24, background: '#eef0f3', borderRadius: 4, outline: 'none' }}><Plus size={12} color="#8a919c" /></button>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div className="flex" style={{ gap: 14, marginBottom: 14 }}>
            {[{ label: 'now', value: meta.now }, { label: 'set', value: levelToTemp(live[roomId].mode === 'Hold' ? live[roomId].level : live[roomId].sched[NOW_DAY][NOW_HOUR]) }].map((c) => (
              <div key={c.label} style={{ flex: 1, background: '#fff', border: '1px solid #e6e9ee', borderRadius: 10, padding: '14px 16px' }}>
                <div style={{ fontSize: 40, color: '#3a4350', fontWeight: 500 }}>{c.value.toFixed(1)}°</div>
                <div style={{ fontSize: 10, color: '#b2b7bf' }}>{c.label}</div>
              </div>
            ))}
            <div style={{ flex: 1, background: '#fff', border: '1px solid #e6e9ee', borderRadius: 10, padding: '14px 16px' }}>
              <div style={{ fontSize: 40, color: '#3a4350', fontWeight: 500 }}>6.0°</div>
              <div style={{ fontSize: 10, color: '#b2b7bf' }}>out</div>
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #e6e9ee', borderRadius: 10, padding: 16, marginBottom: 14 }}>
            <div style={{ fontSize: 12, color: '#8a919c', marginBottom: 8 }}>Mode</div>
            <div className="flex" style={{ gap: 6 }}>
              {MODES.map((m) => (
                <button
                  key={m}
                  title={m === 'Hold' ? 'Hold' : m === 'Smart' ? 'Smart' : undefined}
                  onClick={() => patchRoom({ mode: m })}
                  style={{
                    flex: 1, height: 34, fontSize: 12, borderRadius: 4, outline: 'none',
                    background: room.mode === m ? '#5b8fd0' : '#e9edf2',
                    color: room.mode === m ? '#fff' : '#69727f',
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #e6e9ee', borderRadius: 10, padding: 16 }}>
            <div className="flex justify-between" style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: '#8a919c' }}>Today</span>
              <span style={{ fontSize: 12, color: '#8a919c' }}>{totalToday.toFixed(1)}</span>
            </div>
            <MiniChart data={energyByHour} />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlan = () => (
    <div style={{ padding: '22px 28px' }}>
      {roomTabs}
      <div style={{ background: '#fff', border: '1px solid #e6e9ee', borderRadius: 10, padding: 18 }}>
        <div className="flex items-center" style={{ gap: 14, marginBottom: 12 }}>
          <span style={{ fontSize: 15, color: '#3a4350' }}>{meta.name} weekly plan</span>
          <span style={{ flex: 1 }} />
          <span style={{ fontSize: 11, color: '#a3a9b3' }}>Brush</span>
          <input
            type="number" min={0} max={10} value={brush}
            onChange={(e) => setBrush(Math.max(0, Math.min(10, Number(e.target.value) || 0)))}
            style={{ width: 40, height: 22, fontSize: 11, border: '1px solid #d9dde3', borderRadius: 3, padding: '0 4px', outline: 'none' }}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '18px repeat(24, 1fr)', gap: 1 }} onPointerLeave={() => { painting.current = false; }}>
          <span />
          {Array.from({ length: 24 }, (_, h) => (
            <span key={h} style={{ fontSize: 9, color: '#c3c7ce', textAlign: 'center' }}>{h}</span>
          ))}
          {room.sched.map((row, d) => (
            <React.Fragment key={d}>
              <span style={{ fontSize: 10, color: '#b2b7bf', lineHeight: '24px' }}>{DAYS[d]}</span>
              {row.map((v, h) => (
                <div
                  key={h}
                  onPointerDown={() => { painting.current = true; paint(d, h); }}
                  onPointerEnter={() => painting.current && paint(d, h)}
                  style={{ height: 24, background: `rgba(79,134,198,${0.08 + v * 0.07})`, cursor: 'crosshair', borderRadius: 1 }}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
        <div style={{ fontSize: 10, color: '#c3c7ce', marginTop: 10 }}>Click or drag on the grid to paint cells with the brush value.</div>
      </div>
    </div>
  );

  const renderUsage = () => (
    <div style={{ padding: '22px 28px' }}>
      <div style={{ background: '#fff', border: '1px solid #e6e9ee', borderRadius: 10, padding: 20 }}>
        <div className="flex items-baseline" style={{ gap: 12, marginBottom: 10 }}>
          <span style={{ fontSize: 15, color: '#3a4350' }}>Consumption</span>
          <span style={{ fontSize: 12, color: '#a3a9b3' }}>{totalToday.toFixed(1)} u</span>
          <span style={{ flex: 1 }} />
          {ROOM_META.map((m) => (
            <span key={m.id} className="flex items-center" style={{ fontSize: 10, color: '#a3a9b3', gap: 4 }}>
              <i style={{ width: 8, height: 8, background: m.color, display: 'inline-block' }} />{m.id}
            </span>
          ))}
        </div>
        <div className="flex items-end" style={{ gap: 6, height: 380, borderBottom: '1px solid #e3e7ec' }}>
          {energyByHour.map((parts, h) => (
            <div key={h} className="flex flex-col-reverse" style={{ flex: 1, height: `${(parts.reduce((a, b) => a + b, 0) / maxBar) * 100}%`, opacity: h < NOW_HOUR ? 1 : 0.85 }}>
              {parts.map((p, i) => (
                <div key={i} style={{ height: `${(p / parts.reduce((a, b) => a + b, 0)) * 100}%`, background: ROOM_META[i].color }} />
              ))}
            </div>
          ))}
        </div>
        <div className="flex" style={{ gap: 6, marginTop: 4 }}>
          {Array.from({ length: 24 }, (_, h) => (
            <span key={h} style={{ flex: 1, fontSize: 9, color: '#c3c7ce', textAlign: 'center' }}>{h}</span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderZones = () => (
    <div style={{ padding: '22px 28px' }}>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {ROOM_META.map((m) => (
          <button
            key={m.id}
            onClick={() => { setRoomId(m.id); setPage('home'); }}
            className="text-left"
            style={{ background: '#fff', border: '1px solid #e6e9ee', borderRadius: 10, padding: 18, outline: 'none' }}
          >
            <div style={{ fontSize: 15, color: '#3a4350' }}>{m.name}</div>
            <div style={{ fontSize: 30, color: '#3a4350', marginTop: 6 }}>{m.now.toFixed(1)}° <span style={{ fontSize: 30, color: '#3a4350' }}>{levelToTemp(live[m.id].level).toFixed(1)}°</span></div>
            <div style={{ fontSize: 11, color: '#b2b7bf', marginTop: 4 }}>{live[m.id].mode}</div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderSetup = () => (
    <div style={{ padding: '22px 28px', maxWidth: 760 }}>
      <div style={{ background: '#fff', border: '1px solid #e6e9ee', borderRadius: 10, padding: '6px 20px' }}>
        {[
          { label: 'Temperature unit', ctl: <span style={{ fontSize: 12, color: '#69727f' }}>°C</span> },
          { label: 'Auto-sync', ctl: <Toggle on={autoSync} onChange={() => setAutoSync((v) => !v)} /> },
          { label: 'Share usage data to improve Smart (recommended)', ctl: <Toggle on={shareData} onChange={() => setShareData((v) => !v)} /> },
          { label: 'Frost protection', ctl: <span style={{ fontSize: 12, color: '#69727f' }}>5°</span> },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between" style={{ padding: '14px 0', borderBottom: '1px solid #eef0f3' }}>
            <span style={{ fontSize: 13, color: '#4a5361' }}>{row.label}</span>
            {row.ctl}
          </div>
        ))}
        <button onClick={() => setAboutOpen((v) => !v)} style={{ fontSize: 11, color: '#a3a9b3', padding: '14px 0', outline: 'none' }}>
          About {aboutOpen ? '▴' : '▾'}
        </button>
        {aboutOpen && (
          <div style={{ fontSize: 11, color: '#8a919c', paddingBottom: 14, lineHeight: '17px' }}>
            HomeSense Panel v3.2.1 (build 4471). Glossary: <b>Auto</b> follows the weekly plan. <b>Eco</b> lowers every planned level by 2. <b>Away</b> keeps the house at frost-safe level. <b>Hold</b> keeps the current set level and ignores the plan. <b>Boost</b> runs the maximum level for the current hour. <b>Smart</b> starts each planned change one hour early.
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-[1280px] h-[800px] relative overflow-hidden" style={{ background: '#f3f5f8', fontFamily: 'Segoe UI, Roboto, Arial, sans-serif', color: '#3a4350' }}>
      {/* top bar */}
      <div className="absolute left-0 top-0 flex items-center" style={{ width: 1280, height: 56, background: '#fff', borderBottom: '1px solid #e6e9ee', padding: '0 20px 0 20px', gap: 14 }}>
        <div className="flex items-center" style={{ gap: 8, width: 150 }}>
          <Snowflake size={20} color="#4f86c6" />
          <span style={{ fontSize: 15, fontWeight: 600, color: '#3a4350' }}>HomeSense</span>
        </div>
        <span style={{ fontSize: 12, color: '#a3a9b3' }}>Tue 16:42</span>
        <span style={{ flex: 1 }} />
        <Wifi size={14} color="#b2b7bf" />
        <span style={{ fontSize: 11, color: '#b2b7bf' }}>Last sync 14:32</span>
        <button
          onClick={sync}
          className="flex items-center"
          style={{ gap: 4, fontSize: 11, color: '#8a919c', background: '#eef0f3', borderRadius: 4, padding: '4px 8px', outline: 'none' }}
        >
          <RefreshCw size={11} />Sync
          {dirty && <i style={{ width: 5, height: 5, borderRadius: 3, background: '#e0a86a', display: 'inline-block' }} />}
        </button>
      </div>

      {/* sidebar */}
      <div className="absolute left-0 flex flex-col" style={{ top: 56, width: 84, height: 744, background: '#fafbfc', borderRight: '1px solid #e6e9ee', paddingTop: 10 }}>
        {navItems.map((n) => (
          <button
            key={n.id}
            onClick={() => setPage(n.id)}
            className="flex flex-col items-center"
            style={{
              gap: 4, padding: '12px 0', fontSize: 10, outline: 'none',
              color: page === n.id ? '#4f86c6' : '#a3a9b3',
              background: page === n.id ? '#eef3fa' : 'transparent',
            }}
          >
            {n.icon}
            {n.label}
          </button>
        ))}
      </div>

      {/* content */}
      <div className="absolute overflow-hidden" style={{ left: 84, top: 56, width: 1196, height: 744 }}>
        {page === 'home' && renderHome()}
        {page === 'zones' && renderZones()}
        {page === 'plan' && renderPlan()}
        {page === 'usage' && renderUsage()}
        {page === 'setup' && renderSetup()}
      </div>

      {toast && (
        <div className="absolute" style={{ left: 110, bottom: 24, background: '#4a5361', color: '#fff', fontSize: 12, padding: '8px 14px', borderRadius: 6 }}>
          {toast}
        </div>
      )}
    </div>
  );
};

const MiniChart: React.FC<{ data: number[][] }> = ({ data }) => {
  const sums = data.map((a) => a.reduce((x, y) => x + y, 0));
  const max = Math.max(...sums);
  return (
    <div className="flex items-end" style={{ gap: 3, height: 90 }}>
      {data.map((parts, h) => (
        <div key={h} className="flex flex-col-reverse" style={{ flex: 1, height: `${(sums[h] / max) * 100}%` }}>
          {parts.map((p, i) => (
            <div key={i} style={{ height: `${(p / sums[h]) * 100}%`, background: ROOM_META[i].color }} />
          ))}
        </div>
      ))}
    </div>
  );
};
