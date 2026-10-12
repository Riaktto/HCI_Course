import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, Delete, HeartPulse } from 'lucide-react';

/* ---------- data ---------- */

type Screen = 'welcome' | 'id' | 'notfound' | 'appts' | 'details' | 'ticket';
type Lang = 'EN' | 'FR' | 'AR';

const KNOWN_NUMBER = '047219835521';
const IDLE_MS = 30000;
const TICKET_MS = 2000;

const APPOINTMENTS = [
  { id: 'a1', time: '09:15', label: 'Laboratory - blood sampling', place: 'Building A, ground floor', done: true },
  { id: 'a2', time: '10:30', label: 'Cardiology - consultation C1', place: 'Dr. TAZI - Building B, 2nd floor', done: false },
  { id: 'a3', time: '14:45', label: 'Radiology - chest X-ray', place: 'Building C, basement 1', done: false },
];

interface Ticket { code: string; queue: string; wait: string; room: string }

const FR: Record<string, string> = {
  'Patient admission terminal': "Borne d'admission patient",
  'Touch here to begin': 'Touchez ici pour commencer',
  'Insurance no.': "N° d'assuré",
  'Enter your insurance number': "Saisissez votre numéro d'assuré",
  Validate: 'Valider',
  Reset: 'Réinitialiser',
  Next: 'Suivant',
};

/* ---------- small pieces ---------- */

const Keypad: React.FC<{ onKey: (k: string) => void }> = ({ onKey }) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '<'];
  return (
    <div className="grid grid-cols-3 gap-[2px] w-[132px]">
      {keys.map(k => (
        <button key={k} onClick={() => onKey(k)}
          className="h-[34px] rounded-[3px] bg-[#dfe6ee] text-[#1e3a5f] text-[14px] font-medium outline-none flex items-center justify-center">
          {k === '<' ? <Delete size={13} /> : k}
        </button>
      ))}
    </div>
  );
};

/* ---------- main ---------- */

export const Project04Kiosk: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [lang, setLang] = useState<Lang>('EN');
  const [digits, setDigits] = useState('');
  const [appt, setAppt] = useState('');
  const [consent, setConsent] = useState(true);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [lastTicket, setLastTicket] = useState<Ticket | null>(null);
  const [showLast, setShowLast] = useState(false);
  const [err, setErr] = useState('');
  const lastTouch = useRef(Date.now());

  const t = (s: string) => (lang === 'FR' && FR[s]) || s;

  const wipe = useCallback(() => {
    setDigits('');
    setAppt('');
    setConsent(true);
    setErr('');
    setShowLast(false);
    setScreen('welcome');
  }, []);

  // inactivity watcher
  useEffect(() => {
    const id = setInterval(() => {
      if (screen !== 'welcome' && screen !== 'ticket' && Date.now() - lastTouch.current > IDLE_MS) wipe();
    }, 1000);
    return () => clearInterval(id);
  }, [screen, wipe]);

  // ticket screen leaves by itself
  useEffect(() => {
    if (screen !== 'ticket') return;
    const id = setTimeout(wipe, TICKET_MS);
    return () => clearTimeout(id);
  }, [screen, wipe]);

  const touch = () => { lastTouch.current = Date.now(); };

  const onKey = (k: string) => {
    setErr('');
    if (k === 'C') setDigits('');
    else if (k === '<') setDigits(d => d.slice(0, -1));
    else setDigits(d => (d.length < 12 ? d + k : d));
  };

  const validateId = () => {
    if (digits.length !== 12) { setErr('Invalid entry'); return; }
    if (digits !== KNOWN_NUMBER) { setScreen('notfound'); return; }
    setScreen('appts');
  };

  const submitAppt = () => {
    if (!appt) { setErr('Invalid entry'); return; }
    setErr('');
    setScreen('details');
  };

  const proceed = () => {
    const chosen = APPOINTMENTS.find(a => a.id === appt)!;
    const tk: Ticket = chosen.id === 'a2'
      ? { code: 'C-047', queue: 'CARDIO-2', wait: '~25 min', room: 'B2.14' }
      : { code: chosen.id === 'a3' ? 'R-112' : 'L-031', queue: chosen.id === 'a3' ? 'RADIO-1' : 'LAB-1', wait: '~10 min', room: chosen.id === 'a3' ? 'C-1.03' : 'A0.07' };
    setTicket(tk);
    setLastTicket(tk);
    setScreen('ticket');
  };

  const back = () => {
    setErr('');
    if (screen === 'id') setScreen('welcome');
    else if (screen === 'notfound') setScreen('id');
    else if (screen === 'appts') setScreen('id');
    else if (screen === 'details') setScreen('appts');
  };

  const mainAction: Record<string, [string, () => void] | undefined> = {
    id: ['Validate', validateId],
    appts: ['Submit', submitAppt],
    details: ['Proceed', proceed],
    notfound: ['Continue', () => { setDigits(''); setScreen('id'); }],
  };
  const act = mainAction[screen];

  return (
    <div onPointerDownCapture={touch} className="w-[1280px] h-[800px] relative overflow-hidden bg-[#eef3f8] flex flex-col font-[system-ui,'Segoe_UI',Arial,sans-serif] text-[#1e3a5f] select-none">
      {/* top bar */}
      <div className="h-[72px] shrink-0 bg-[#0b3b6f] flex items-center justify-between px-10">
        <div className="flex items-center gap-3 text-white">
          <HeartPulse size={30} />
          <span className="text-[26px] font-bold">Medi<span className="font-light">Point</span></span>
        </div>
        <div className="flex items-center gap-[3px]">
          {(['EN', 'FR', 'AR'] as Lang[]).map(l => (
            <button key={l} onClick={() => setLang(l)}
              className={`h-[22px] w-[26px] text-[10px] rounded-[2px] ${lang === l ? 'bg-[#2b5a91] text-[#9fb6d0]' : 'text-[#6f8db3]'}`}>
              {l}
            </button>
          ))}
          <span className="ml-5 text-[13px] text-[#6f8db3]">10:07</span>
        </div>
      </div>

      {/* content */}
      <div className="flex-1 relative">
        {screen === 'welcome' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-[20px] text-[#4a6585] mb-3">{t('Patient admission terminal')}</div>
            <h1 className="text-[56px] font-bold mb-10">Welcome</h1>
            <button onClick={() => { touch(); setScreen('id'); }}
              className="w-[520px] h-[120px] rounded-[18px] bg-[#0b3b6f] text-white text-[32px] font-semibold">
              {t('Touch here to begin')}
            </button>
            <button onClick={() => setShowLast(true)} className="absolute left-10 bottom-4 text-[11px] text-[#9fb0c4] underline">Last ticket</button>
            {showLast && (
              <div className="absolute inset-0 bg-[#eef3f8] flex flex-col items-center justify-center">
                {lastTicket ? (
                  <>
                    <div className="text-[18px] text-[#4a6585]">Last ticket issued</div>
                    <div className="text-[96px] font-bold">{lastTicket.code}</div>
                    <div className="text-[18px]">{lastTicket.queue} - room {lastTicket.room} - {lastTicket.wait}</div>
                  </>
                ) : <div className="text-[18px] text-[#4a6585]">No ticket issued on this terminal.</div>}
                <button onClick={() => setShowLast(false)} className="mt-8 h-[44px] px-8 rounded-[8px] bg-[#0b3b6f] text-white text-[16px]">Close</button>
              </div>
            )}
          </div>
        )}

        {screen === 'id' && (
          <div className="absolute inset-0 px-16 pt-10">
            <h2 className="text-[34px] font-bold mb-2">{t('Enter your insurance number')}</h2>
            <div className="text-[15px] text-[#7a8fa8] mb-8">{t('Insurance no.')} (12 digits, see your CNOPS / CNSS card)</div>
            <div className={`w-[640px] h-[84px] bg-white rounded-[8px] border-[3px] flex items-center px-6 text-[44px] tracking-[2px] ${err ? 'border-[#d94343]' : digits.length === 12 ? 'border-[#2f9e55]' : 'border-[#c2cfdd]'}`}>
              {digits}
            </div>
            {err && <div className="mt-3 text-[16px] text-[#d94343]">{err}</div>}
            <div className="absolute right-16 top-[150px]"><Keypad onKey={onKey} /></div>
          </div>
        )}

        {screen === 'notfound' && (
          <div className="absolute inset-0 px-16 pt-16">
            <h2 className="text-[34px] font-bold mb-4">No record found</h2>
            <p className="text-[20px] text-[#4a6585] w-[700px]">The identifier could not be resolved against the active admission registry (code K-31). Please check the entered value.</p>
          </div>
        )}

        {screen === 'appts' && (
          <div className="absolute inset-0 px-16 pt-8">
            <h2 className="text-[30px] font-bold mb-1">Hello, Mr RAFIK Hicham</h2>
            <div className="text-[15px] text-[#7a8fa8] mb-5">Appointments scheduled for today</div>
            <div className="flex flex-col gap-3 w-[900px]">
              {APPOINTMENTS.map(a => (
                <div key={a.id} className="h-[84px] bg-white rounded-[8px] border border-[#c2cfdd] flex items-center px-6 gap-6">
                  <div className="text-[30px] font-bold w-[100px]">{a.time}</div>
                  <div className="flex-1">
                    <div className="text-[20px]">{a.label}</div>
                    <div className="text-[13px] text-[#7a8fa8]">{a.place}{a.done ? ' - ADM-OK' : ''}</div>
                  </div>
                  <button aria-label={`Select ${a.time}`} onClick={() => { setAppt(a.id); setErr(''); }}
                    className={`w-[18px] h-[18px] rounded-full border-2 ${appt === a.id ? 'border-[#0b3b6f] bg-[#0b3b6f]' : 'border-[#9fb0c4] bg-white'}`} />
                </div>
              ))}
            </div>
            {err && <div className="mt-3 text-[16px] text-[#d94343]">{err}</div>}
          </div>
        )}

        {screen === 'details' && (
          <div className="absolute inset-0 px-16 pt-8">
            <h2 className="text-[30px] font-bold mb-5">Admission summary</h2>
            <div className="w-[760px] bg-white rounded-[8px] border border-[#c2cfdd] p-6 text-[18px] leading-[2]">
              <div>Patient: RAFIK Hicham (b. 1971)</div>
              <div>Scheduled: 10:30 - Cardiology, Dr. TAZI</div>
              <div>Regime: CNOPS-A2 / TP</div>
              <div>Participation: 80,00 MAD (ref. PC-3)</div>
            </div>
            <label className="flex items-center gap-2 mt-5 text-[12px] text-[#7a8fa8]">
              <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} />
              I authorise the transmission of my admission data to the partner mutuelle
            </label>
          </div>
        )}

        {screen === 'ticket' && ticket && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#e8f5ec]">
            <div className="text-[20px] text-[#2f6f45]">Check-in complete</div>
            <div className="text-[120px] font-bold leading-none my-3 text-[#1f5a35]">{ticket.code}</div>
            <div className="text-[20px] text-[#2f6f45]">{ticket.queue} - room {ticket.room} - wait {ticket.wait}</div>
          </div>
        )}
      </div>

      {/* bottom bar */}
      {screen !== 'welcome' && screen !== 'ticket' && (
        <div className="h-[110px] shrink-0 relative">
          <button onClick={back} aria-label="Back" className="absolute left-10 top-4 w-[34px] h-[34px] rounded-[4px] text-[#8aa0ba] flex items-center justify-center"><ArrowLeft size={18} /></button>
          {act && (
            <button onClick={act[1]} className="absolute left-[120px] top-8 h-[40px] px-5 rounded-[4px] bg-[#c9d5e2] text-[#4a6585] text-[14px]">{t(act[0])}</button>
          )}
          <button onClick={wipe} className="absolute right-10 top-4 w-[260px] h-[84px] rounded-[10px] bg-[#ff6a1a] text-white text-[28px] font-bold">{t('Reset')}</button>
          <div className="absolute left-10 bottom-2 text-[10px] text-[#9fb0c4]">Need help? Ask at desk 2 - MediPoint v3.2</div>
        </div>
      )}
    </div>
  );
};
