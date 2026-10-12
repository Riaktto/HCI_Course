import React, { useEffect, useState } from 'react';
import {
  Droplets, LayoutGrid, CalendarDays, Bell, History, MoreVertical, Sun,
  ChevronUp, ChevronDown, OctagonX, Wifi, Wind,
} from 'lucide-react';

type Mode = 'AUTO' | 'MAN' | 'HOLD';
type View = 'zones' | 'sched' | 'alarms' | 'log';
type Unit = 's' | 'min';

interface Zone {
  id: number;
  code: string;
  field: string;
  crop: string;
  valve: string;
  mode: Mode;
  running: boolean;
  remaining: number;
  fault?: boolean;
  schedDur: number;
  schedStart: string;
  press: number;
  soil: number;
}

interface Draft {
  mode: Mode;
  dur: string;
  inj: boolean;
  flush: boolean;
}

interface LogEntry {
  t: string;
  text: string;
}

const INITIAL_ZONES: Zone[] = [
  { id: 1, code: 'Z-11C', field: 'C', crop: 'CIT', valve: 'V11', mode: 'AUTO', running: false, remaining: 0, fault: true, schedDur: 1200, schedStart: '05:30', press: 0.4, soil: 24 },
  { id: 2, code: 'Z-03A', field: 'A', crop: 'PEP', valve: 'V03', mode: 'AUTO', running: true, remaining: 1260, schedDur: 1800, schedStart: '13:15', press: 2.7, soil: 29 },
  { id: 3, code: 'Z-07A', field: 'A', crop: 'TOM', valve: 'V07', mode: 'AUTO', running: false, remaining: 0, schedDur: 900, schedStart: '18:30', press: 2.8, soil: 36 },
  { id: 4, code: 'Z-12D', field: 'D', crop: 'OLV', valve: 'V12', mode: 'MAN', running: false, remaining: 0, schedDur: 2400, schedStart: '06:00', press: 2.9, soil: 41 },
  { id: 5, code: 'Z-07B', field: 'B', crop: 'TOM', valve: 'V07', mode: 'AUTO', running: false, remaining: 0, schedDur: 600, schedStart: '18:30', press: 2.8, soil: 31 },
  { id: 6, code: 'Z-02C', field: 'C', crop: 'MNT', valve: 'V02', mode: 'HOLD', running: false, remaining: 0, schedDur: 480, schedStart: '07:00', press: 2.8, soil: 52 },
  { id: 7, code: 'Z-09B', field: 'B', crop: 'PEP', valve: 'V09', mode: 'AUTO', running: false, remaining: 0, schedDur: 900, schedStart: '19:00', press: 2.8, soil: 38 },
  { id: 8, code: 'Z-05D', field: 'D', crop: 'CIT', valve: 'V05', mode: 'AUTO', running: false, remaining: 0, schedDur: 1500, schedStart: '05:45', press: 2.9, soil: 44 },
  { id: 9, code: 'Z-01A', field: 'A', crop: 'MNT', valve: 'V01', mode: 'AUTO', running: false, remaining: 0, schedDur: 420, schedStart: '07:15', press: 2.8, soil: 47 },
  { id: 10, code: 'Z-08C', field: 'C', crop: 'TOM', valve: 'V08', mode: 'AUTO', running: false, remaining: 0, schedDur: 900, schedStart: '18:45', press: 2.8, soil: 33 },
  { id: 11, code: 'Z-10D', field: 'D', crop: 'MNT', valve: 'V10', mode: 'HOLD', running: false, remaining: 0, schedDur: 480, schedStart: '07:30', press: 2.9, soil: 50 },
  { id: 12, code: 'Z-04B', field: 'B', crop: 'BNS', valve: 'V04', mode: 'AUTO', running: false, remaining: 0, schedDur: 720, schedStart: '19:15', press: 2.8, soil: 40 },
];


const MUTE = 'text-[color:var(--mute)]';
const BODY = 'text-[color:var(--body)]';

const pad = (n: number) => String(n).padStart(2, '0');
const mmss = (s: number) => `${pad(Math.floor(s / 60))}:${pad(s % 60)}`;
const clock = (s: number) => {
  const total = 13 * 3600 + 42 * 60 + s;
  return `${pad(Math.floor(total / 3600) % 24)}:${pad(Math.floor(total / 60) % 60)}`;
};

const makeDraft = (z: Zone, unit: Unit): Draft => ({
  mode: z.mode,
  dur: String(unit === 's' ? z.schedDur : Math.round(z.schedDur / 60)),
  inj: true,
  flush: false,
});

export const Project01Irrigation: React.FC = () => {
  const [zones, setZones] = useState<Zone[]>(INITIAL_ZONES);
  const [selected, setSelected] = useState<number>(1);
  const [view, setView] = useState<View>('zones');
  const [unit, setUnit] = useState<Unit>('s');
  const [hc, setHc] = useState(false);
  const [drafts, setDrafts] = useState<Record<number, Draft>>(() =>
    Object.fromEntries(INITIAL_ZONES.map(z => [z.id, makeDraft(z, 's')])),
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState<null | 'apply' | 'prefs' | 'diag' | 'about'>(null);
  const [tick, setTick] = useState(0);
  const [log, setLog] = useState<LogEntry[]>([
    { t: '13:15', text: 'Z-03A AUTO start 1800' },
    { t: '12:02', text: 'Z-11C fault P-LOW' },
    { t: '06:00', text: 'Z-12D MAN stop' },
    { t: '05:45', text: 'Z-05D AUTO end 1500' },
  ]);

  useEffect(() => {
    const id = setInterval(() => {
      setTick(t => t + 1);
      setZones(zs => zs.map(z => {
        if (!z.running) return z;
        const rem = z.remaining - 1;
        return rem <= 0 ? { ...z, running: false, remaining: 0 } : { ...z, remaining: rem };
      }));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const zone = zones.find(z => z.id === selected)!;
  const draft = drafts[selected];
  const setDraft = (patch: Partial<Draft>) =>
    setDrafts(d => ({ ...d, [selected]: { ...d[selected], ...patch } }));

  const secondsOf = (d: Draft) => {
    const n = parseInt(d.dur, 10);
    if (Number.isNaN(n)) return 0;
    return Math.min(unit === 's' ? n : n * 60, 3600);
  };

  const step = (dir: 1 | -1) => {
    const n = parseInt(draft.dur, 10) || 0;
    const inc = unit === 's' ? 10 : 1;
    setDraft({ dur: String(Math.max(0, n + dir * inc)) });
  };

  const stamp = clock(tick);

  const apply = () => {
    setModal(null);
    const secs = secondsOf(draft);
    if (draft.mode === 'MAN') {
      if (secs <= 0) return;
      setZones(zs => zs.map(z => z.id === selected
        ? { ...z, mode: 'MAN', running: true, remaining: secs, schedDur: secs } : z));
      setLog(l => [{ t: stamp, text: `${zone.code} MAN start ${secs}` }, ...l]);
    } else if (draft.mode === 'HOLD') {
      setZones(zs => zs.map(z => z.id === selected
        ? { ...z, mode: 'HOLD', running: false, remaining: 0 } : z));
      setLog(l => [{ t: stamp, text: `${zone.code} HOLD` }, ...l]);
    } else {
      setZones(zs => zs.map(z => z.id === selected
        ? { ...z, mode: 'AUTO', schedDur: secs > 0 ? secs : z.schedDur } : z));
      setLog(l => [{ t: stamp, text: `${zone.code} AUTO cfg ${secs}` }, ...l]);
    }
  };

  const revert = () => setDrafts(d => ({ ...d, [selected]: makeDraft(zone, unit) }));

  const stopAll = () => {
    setZones(zs => zs.map(z => ({ ...z, running: false, remaining: 0 })));
    setLog(l => [{ t: stamp, text: 'ALL STOP' }, ...l]);
  };

  const changeUnit = (u: Unit) => {
    setDrafts(d => Object.fromEntries(Object.entries(d).map(([k, v]) => {
      const n = parseInt(v.dur, 10);
      if (Number.isNaN(n) || u === unit) return [k, v];
      return [k, { ...v, dur: String(u === 'min' ? Math.round(n / 60) : n * 60) }];
    })));
    setUnit(u);
  };

  const alarmCount = zones.filter(z => z.fault).length + 1;

  const dotColor = (z: Zone) =>
    z.fault ? '#b42318' : z.running ? '#3f9b5f' : '#c4544b';

  return (
    <div
      className="w-[1280px] h-[800px] relative overflow-hidden bg-[#eceff2] [&_*]:outline-none"
      style={{
        fontFamily: 'Segoe UI, Roboto, Arial, sans-serif',
        ['--mute' as string]: hc ? '#2b3138' : '#b3b9c1',
        ['--body' as string]: hc ? '#10151a' : '#7b838d',
      }}
      onClick={() => menuOpen && setMenuOpen(false)}
    >
      {/* header */}
      <div className="absolute left-0 top-0 w-[1280px] h-[52px] bg-[#23684a] flex items-center px-4 gap-4">
        <div className="flex items-center gap-2 text-white">
          <Droplets size={22} />
          <span className="text-[18px] font-semibold">AgriFlow</span>
          <span className="text-[10px] text-[#8fc4a8] mt-1">Ctrl 3.2</span>
        </div>
        <span className="text-[12px] text-[#8fc4a8] ml-6">Domaine Al Baraka</span>
        <div className="flex-1" />
        <div className="flex items-center gap-1 text-[#cfe6d8] text-[12px]"><Sun size={15} /> 34</div>
        <div className="flex items-center gap-1 text-[#cfe6d8] text-[12px] ml-3"><Wind size={15} /> 18</div>
        <Wifi size={15} className="text-[#cfe6d8] ml-3" />
        <div className="text-white text-[14px] font-medium ml-3 w-[44px]">{stamp}</div>
        <button className="relative ml-2 text-white" onClick={e => { e.stopPropagation(); setView('alarms'); }}>
          <Bell size={18} />
          <span className="absolute -top-2 -right-2 bg-[#f5a524] text-[#222] text-[9px] rounded-full w-[14px] h-[14px] flex items-center justify-center font-bold">{alarmCount}</span>
        </button>
        <button
          onClick={stopAll}
          className="ml-4 h-[34px] px-4 rounded bg-[#e5251b] text-white text-[14px] font-bold flex items-center gap-1 shadow"
        >
          <OctagonX size={16} /> STOP
        </button>
        <button
          className="w-[30px] h-[34px] flex items-center justify-center text-white"
          onClick={e => { e.stopPropagation(); setMenuOpen(o => !o); }}
        >
          <MoreVertical size={20} />
        </button>
      </div>

      {menuOpen && (
        <div className="absolute right-3 top-[50px] w-[120px] bg-white rounded shadow-lg border border-[#d5dae0] z-20 py-1">
          {([['Prefs', 'prefs'], ['Diag', 'diag'], ['About', 'about']] as const).map(([label, key]) => (
            <button key={key} className="block w-full text-left px-3 py-[6px] text-[12px] text-[#555] hover:bg-[#f0f2f4]"
              onClick={() => { setModal(key); setMenuOpen(false); }}>
              {label}
            </button>
          ))}
        </div>
      )}

      {/* navigation rail */}
      <div className="absolute left-0 top-[52px] w-[56px] h-[748px] bg-[#e1e5e9] flex flex-col items-center pt-3 gap-1">
        {([['zones', LayoutGrid], ['sched', CalendarDays], ['alarms', Bell], ['log', History]] as const).map(([v, Icon]) => (
          <button key={v} onClick={() => setView(v)}
            className={`w-[40px] h-[40px] rounded flex items-center justify-center ${view === v ? 'bg-[#cfd6dc] text-[#6a7480]' : 'text-[#9aa3ad]'}`}>
            <Icon size={20} />
          </button>
        ))}
      </div>

      {view === 'zones' && (
        <>
          {/* zone list */}
          <div className="absolute left-[56px] top-[52px] w-[470px] h-[748px] bg-white border-r border-[#d9dde2]">
            <div className="flex items-center h-[30px] px-4 text-[10px] bg-[#f4f6f8]">
              <span className={`w-[88px] ${MUTE}`}>ID</span>
              <span className={`w-[44px] ${MUTE}`}>Fld</span>
              <span className={`w-[56px] ${MUTE}`}>Crp</span>
              <span className={`w-[70px] ${MUTE}`}>Md</span>
              <span className={`flex-1 ${MUTE}`}>St</span>
            </div>
            {zones.map(z => (
              <button
                key={z.id}
                onClick={() => setSelected(z.id)}
                className={`w-full h-[40px] flex items-center px-4 border-b border-[#f0f2f4] text-left ${selected === z.id ? 'bg-[#f3f6fb]' : ''}`}
              >
                <span className={`w-[88px] text-[14px] font-medium ${BODY}`}>{z.code}</span>
                <span className={`w-[44px] text-[12px] ${MUTE}`}>{z.field}</span>
                <span className={`w-[56px] text-[11px] ${MUTE}`}>{z.crop}</span>
                <span className={`w-[70px] text-[11px] ${MUTE}`}>{z.mode}</span>
                <span className="flex-1 flex items-center">
                  <span className="inline-block w-[10px] h-[10px] rounded-full" style={{ background: dotColor(z) }} />
                </span>
              </button>
            ))}
            <div className={`px-4 pt-3 text-[10px] ${MUTE}`}>12 zones · last sync 13:41</div>
          </div>

          {/* zone detail */}
          <div className="absolute left-[526px] top-[52px] w-[754px] h-[748px] p-6">
            <div className="flex items-baseline gap-3">
              <span className={`text-[26px] font-semibold ${BODY}`}>{zone.code}</span>
              <span className={`text-[11px] ${MUTE}`}>Fld {zone.field} / {zone.crop} / {zone.valve}</span>
              <div className="flex-1" />
              <span className="inline-block w-[10px] h-[10px] rounded-full" style={{ background: dotColor(zone) }} />
              <span className={`text-[12px] ${MUTE} w-[44px]`}>{zone.running ? mmss(zone.remaining) : '--:--'}</span>
            </div>

            <div className="grid grid-cols-4 gap-3 mt-5">
              {[
                ['Flow', zone.running ? '38.2' : '0.0'],
                ['Press', zone.press.toFixed(1)],
                ['Soil', String(zone.soil)],
                ['Last', zone.id === 2 ? '13:15' : '06:12'],
              ].map(([k, v]) => (
                <div key={k} className="bg-white rounded border border-[#e3e6ea] px-3 py-2">
                  <div className={`text-[10px] ${MUTE}`}>{k}</div>
                  <div className={`text-[20px] ${BODY}`}>{v}</div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded border border-[#e3e6ea] mt-4 px-5 py-4 h-[430px] relative">
              <div className={`text-[11px] ${MUTE}`}>Mode</div>
              <div className="flex mt-1">
                {(['AUTO', 'MAN', 'HOLD'] as Mode[]).map(m => (
                  <button key={m} onClick={() => setDraft({ mode: m })}
                    className={`w-[52px] h-[24px] text-[11px] border border-[#dfe3e7] ${draft.mode === m ? 'bg-[#e6ebf0] text-[#6b7580]' : 'bg-white text-[#b3b9c1]'} first:rounded-l last:rounded-r`}>
                    {m}
                  </button>
                ))}
              </div>

              <div className={`text-[11px] mt-5 ${MUTE}`}>Dur</div>
              <div className="flex items-center gap-[2px] mt-1">
                <input
                  value={draft.dur}
                  onChange={e => setDraft({ dur: e.target.value.replace(/[^0-9]/g, '') })}
                  className={`w-[56px] h-[24px] border border-[#dfe3e7] rounded px-1 text-[12px] ${BODY} bg-white`}
                />
                <div className="flex flex-col">
                  <button onClick={() => step(1)} className="w-[14px] h-[12px] bg-[#eef0f3] flex items-center justify-center text-[#9aa3ad]"><ChevronUp size={10} /></button>
                  <button onClick={() => step(-1)} className="w-[14px] h-[12px] bg-[#eef0f3] flex items-center justify-center text-[#9aa3ad]"><ChevronDown size={10} /></button>
                </div>
              </div>

              <div className="flex gap-6 mt-5">
                <label className={`flex items-center gap-1 text-[11px] ${MUTE}`}>
                  <input type="checkbox" checked={draft.inj} onChange={e => setDraft({ inj: e.target.checked })} /> Inj
                </label>
                <label className={`flex items-center gap-1 text-[11px] ${MUTE}`}>
                  <input type="checkbox" checked={draft.flush} onChange={e => setDraft({ flush: e.target.checked })} /> PF
                </label>
              </div>

              <button onClick={revert}
                className="absolute left-5 top-[210px] h-[44px] w-[120px] rounded bg-[#2f80ed] text-white text-[15px] font-semibold">
                Reset
              </button>

              <div className={`absolute left-5 top-[290px] text-[10px] ${MUTE} w-[420px] leading-[14px]`}>
                Next AUTO {zone.schedStart} · {zone.schedDur}
              </div>

              <button onClick={() => setModal('apply')}
                className="absolute right-4 bottom-4 h-[28px] px-3 rounded border border-[#d5dae0] bg-white text-[11px] text-[#aab1b9]">
                Apply
              </button>
            </div>
          </div>
        </>
      )}

      {view === 'sched' && (
        <div className="absolute left-[56px] top-[52px] w-[1224px] h-[748px] p-6">
          <div className={`text-[16px] mb-3 ${BODY}`}>Schedule</div>
          <div className="bg-white rounded border border-[#e3e6ea] w-[620px]">
            {zones.map(z => (
              <div key={z.id} className="flex h-[36px] items-center px-4 border-b border-[#f0f2f4] text-[12px]">
                <span className={`w-[100px] ${BODY}`}>{z.code}</span>
                <span className={`w-[80px] ${MUTE}`}>{z.schedStart}</span>
                <span className={`w-[80px] ${MUTE}`}>{z.schedDur}</span>
                <span className={MUTE}>{z.mode}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'alarms' && (
        <div className="absolute left-[56px] top-[52px] w-[1224px] h-[748px] p-6">
          <div className={`text-[16px] mb-3 ${BODY}`}>Alarms</div>
          <div className="bg-white rounded border border-[#e3e6ea] w-[620px]">
            {[
              ['12:02', 'Z-11C', 'P-LOW 0.4'],
              ['09:48', 'SN-07', 'BAT 18'],
              ['Yest.', 'GW-1', 'RSSI -91'],
            ].map(r => (
              <div key={r[1]} className="flex h-[36px] items-center px-4 border-b border-[#f0f2f4] text-[12px]">
                <span className={`w-[80px] ${MUTE}`}>{r[0]}</span>
                <span className={`w-[100px] ${BODY}`}>{r[1]}</span>
                <span className={MUTE}>{r[2]}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'log' && (
        <div className="absolute left-[56px] top-[52px] w-[1224px] h-[748px] p-6 overflow-hidden">
          <div className={`text-[16px] mb-3 ${BODY}`}>Log</div>
          <div className="bg-white rounded border border-[#e3e6ea] w-[620px]">
            {log.slice(0, 14).map((e, i) => (
              <div key={i} className="flex h-[32px] items-center px-4 border-b border-[#f0f2f4] text-[12px]">
                <span className={`w-[80px] ${MUTE}`}>{e.t}</span>
                <span className={BODY}>{e.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* dialogs */}
      {modal && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-30">
          <div className="w-[420px] bg-white rounded-lg shadow-xl p-6">
            {modal === 'apply' && (
              <>
                <div className="text-[16px] font-semibold text-[#555]">Apply to {zone.code}?</div>
                <div className="text-[12px] text-[#999] mt-2 leading-[18px]">
                  Current program will be overridden. This takes effect immediately.
                </div>
                <div className="flex justify-end items-center gap-3 mt-6">
                  <button onClick={() => setModal(null)}
                    className="h-[46px] w-[130px] rounded bg-[#2e9e5b] text-white text-[15px] font-semibold">Cancel</button>
                  <button onClick={apply}
                    className="h-[28px] px-4 rounded border border-[#d5dae0] text-[11px] text-[#aab1b9]">OK</button>
                </div>
              </>
            )}
            {modal === 'prefs' && (
              <>
                <div className="text-[16px] font-semibold text-[#555]">Prefs</div>
                <div className="mt-4 text-[12px] text-[#777] flex items-center gap-3">
                  Dur. input
                  <select value={unit} onChange={e => changeUnit(e.target.value as Unit)}
                    className="border border-[#ccd1d7] rounded h-[26px] px-1 text-[12px]">
                    <option value="s">s</option>
                    <option value="min">min</option>
                  </select>
                </div>
                <label className="mt-4 text-[12px] text-[#777] flex items-center gap-2">
                  <input type="checkbox" checked={hc} onChange={e => setHc(e.target.checked)} /> Disp. HC
                </label>
                <div className="flex justify-end mt-6">
                  <button onClick={() => setModal(null)} className="h-[30px] px-4 rounded bg-[#e6ebf0] text-[12px] text-[#666]">Close</button>
                </div>
              </>
            )}
            {modal === 'diag' && (
              <>
                <div className="text-[16px] font-semibold text-[#555]">Diag</div>
                <div className="text-[12px] text-[#888] mt-3 leading-[20px]">
                  GW-1 online · RSSI -91<br />PLC 12/12 · Pump P1 ON<br />Tank 74 · Fert. tank 31
                </div>
                <div className="flex justify-end mt-6">
                  <button onClick={() => setModal(null)} className="h-[30px] px-4 rounded bg-[#e6ebf0] text-[12px] text-[#666]">Close</button>
                </div>
              </>
            )}
            {modal === 'about' && (
              <>
                <div className="text-[16px] font-semibold text-[#555]">AgriFlow Controller</div>
                <div className="text-[12px] text-[#888] mt-3 leading-[20px]">
                  Version 3.2.1 (build 4471)<br />Agri-Tech Systems SARL, Meknes
                </div>
                <div className="flex justify-end mt-6">
                  <button onClick={() => setModal(null)} className="h-[30px] px-4 rounded bg-[#e6ebf0] text-[12px] text-[#666]">Close</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

