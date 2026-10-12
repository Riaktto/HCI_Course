import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Train, User } from 'lucide-react';

const STATIONS = [
  'Tanger Ville (TNG-V)', 'Casablanca Voyageurs (CAS-V)', 'Rabat Agdal (RBT-A)', 'Fès (FES)', 'Marrakech (MRK)',
  'Casablanca Port (CAS-P)', 'Meknès (MKN)', 'Oujda (OUJ)', 'Kénitra (KEN)', 'Settat (SET)', 'Berrechid (BER)',
  'Rabat Ville (RBT-V)', 'Salé (SAL)', 'Temara (TEM)', 'Skhirat (SKH)', 'Mohammedia (MOH)', 'Aéroport Mohammed V (CMN-A)',
  'Casa Oasis (CAS-O)', 'Casa Ain Sebaa (CAS-S)', 'El Jadida (EJD)', 'Safi (SAF)', 'Benguerir (BGR)', 'Ben Guerir Gare (BGG)',
  'Sidi Kacem (SDK)', 'Taourirt (TAO)', 'Guercif (GUE)', 'Taza (TAZ)', 'Sidi Slimane (SSL)', 'Tanger Med (TNG-M)',
  'Asilah (ASI)', 'Larache (LAR)', 'Ksar el Kebir (KSK)', 'Sidi Yahya (SYH)', 'Khouribga (KHO)', 'Oued Zem (OZM)',
  'Youssoufia (YOU)', 'Skoura (SKO)', 'Nador Ville (NAD)', 'Beni Mellal (BMN)', 'Fkih Ben Salah (FBS)', 'Settat Nord (SET-N)',
  'Marrakech Menara (MRK-M)', 'Marrakech Gueliz (MRK-G)', 'Ouarzazate (OUA)', 'Agadir (AGA)', 'Essaouira (ESS)',
  'Tétouan (TET)', 'Al Hoceima (ALH)', 'Errachidia (ERR)', 'Ifrane (IFR)', 'Azrou (AZR)', 'Khemisset (KHM)',
  'Tiflet (TIF)', 'Sidi Bouknadel (SBK)', 'Bouskoura (BSK)', 'Nouaceur (NOU)', 'Ain Harrouda (AHR)',
  'Had Soualem (HSO)', 'Benslimane (BSL)', 'Sala Al Jadida (SAJ)',
];

const HOURS = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);
const TODAY = 12; // October 2026
const MONTH_START = 4; // 1 Oct 2026 is a Thursday (Mon=0)

interface Search { from: string; to: string; day: number; cls: string; after: string; pax: string }
interface Trip { id: number; dep: string; arr: string; dur: string; train: string; p1: number; p2: number }

const BTN = 'h-[30px] px-[16px] bg-[#e8590c] text-white text-[13px] font-semibold';

const makeTrips = (): Trip[] => {
  const times = ['06:15', '07:50', '09:05', '05:40', '12:20', '08:45', '10:30', '14:10', '09:15', '17:35', '07:05', '11:00', '19:20', '13:45',
    '09:00', '15:30', '20:50', '08:15', '16:10', '18:05', '06:50', '21:40', '10:05', '12:55', '09:30'];
  return times.map((t, i) => {
    const [h, m] = t.split(':').map(Number);
    const mins = 175 + ((i * 7) % 40);
    const arrMin = h * 60 + m + mins;
    const arr = `${String(Math.floor(arrMin / 60) % 24).padStart(2, '0')}:${String(arrMin % 60).padStart(2, '0')}`;
    return {
      id: i, dep: t, arr, dur: `${Math.floor(mins / 60)}h${String(mins % 60).padStart(2, '0')}`,
      train: ['TNR', 'TNR', 'TGV', 'NAV', 'TNR'][i % 5] + ' ' + (2300 + i * 6),
      p1: 125 + ((i * 11) % 30), p2: 85 + ((i * 7) % 20),
    };
  });
};
const TRIPS = makeTrips();

// ---------- layout pieces ----------

const Header: React.FC = () => (
  <div className="h-[56px] bg-[#2b2f36] text-white flex items-center px-[24px] shrink-0">
    <div className="flex items-center gap-[8px]">
      <div className="w-[28px] h-[28px] rounded-sm bg-[#e8590c] flex items-center justify-center"><Train size={16} /></div>
      <span className="text-[19px] font-bold tracking-wide">RailGo</span>
    </div>
    <div className="ml-[40px] flex gap-[22px] text-[12px] text-[#c8ccd2]">
      <span>Tickets</span><span>Passes</span><span>Offers</span><span>Timetables</span><span>Help</span>
    </div>
    <div className="ml-auto flex items-center gap-[14px] text-[12px] text-[#c8ccd2]">
      <span>EN</span><span className="flex items-center gap-[4px]"><User size={13} />Sign in</span>
    </div>
  </div>
);

const Row: React.FC<{ label: string; children: React.ReactNode; w?: number }> = ({ label, children, w = 200 }) => (
  <label className="block" style={{ width: w }}>
    <span className="block text-[11px] text-[#7b818a] mb-[2px]">{label}</span>
    {children}
  </label>
);
const sel = 'w-full h-[28px] px-[4px] text-[12px] border border-[#bfc4cb] bg-white text-[#3a3f47]';

// ---------- calendar ----------

const Calendar: React.FC<{ day: number; onPick: (d: number) => void }> = ({ day, onPick }) => {
  const cells: (number | null)[] = [...Array(MONTH_START).fill(null), ...Array.from({ length: 31 }, (_, i) => i + 1)];
  return (
    <div className="absolute z-10 mt-[2px] bg-white border border-[#bfc4cb] p-[4px] shadow-sm">
      <div className="flex items-center justify-between text-[11px] text-[#3a3f47] mb-[2px] px-[2px]">
        <ChevronLeft size={10} /><span>Oct 2026</span><ChevronRight size={10} />
      </div>
      <div className="grid grid-cols-7 text-[8px] text-[#9aa0a8] text-center">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <span key={i}>{d}</span>)}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((c, i) => (
          <button
            key={i}
            disabled={c === null}
            onClick={() => c && onPick(c)}
            className={`w-[22px] h-[20px] text-[9px] ${c === day ? 'bg-[#e8590c] text-white' : c === TODAY ? 'text-[#3a3f47] font-semibold' : 'text-[#5b6169]'}`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
};

// ---------- steps ----------

const SearchStep: React.FC<{ s: Search; setS: (s: Search) => void; onGo: () => void; error: string }> = ({ s, setS, onGo, error }) => {
  const [cal, setCal] = useState(false);
  return (
    <div className="px-[40px] pt-[28px]">
      <div className="text-[18px] font-semibold text-[#3a3f47] mb-[14px]">Search trains</div>
      <div className="bg-[#f4f5f7] border border-[#dcdfe3] p-[18px] w-[820px]">
        <div className="flex gap-[14px] mb-[14px]">
          <Row label="From" w={250}>
            <select className={sel} value={s.from} onChange={(e) => setS({ ...s, from: e.target.value })}>
              <option value="">Select</option>{STATIONS.map((x) => <option key={x}>{x}</option>)}
            </select>
          </Row>
          <Row label="To" w={250}>
            <select className={sel} value={s.to} onChange={(e) => setS({ ...s, to: e.target.value })}>
              <option value="">Select</option>{STATIONS.map((x) => <option key={x}>{x}</option>)}
            </select>
          </Row>
          <div className="relative w-[120px]">
            <span className="block text-[11px] text-[#7b818a] mb-[2px]">Date</span>
            <button className={`${sel} text-left`} onClick={() => setCal(!cal)}>{s.day} Oct 2026</button>
            {cal && <Calendar day={s.day} onPick={(d) => { setS({ ...s, day: d }); setCal(false); }} />}
          </div>
          <Row label="Leave after" w={110}>
            <select className={sel} value={s.after} onChange={(e) => setS({ ...s, after: e.target.value })}>
              {HOURS.map((h) => <option key={h}>{h}</option>)}
            </select>
          </Row>
        </div>
        <div className="flex gap-[14px]">
          <Row label="Class" w={160}>
            <select className={sel} value={s.cls} onChange={(e) => setS({ ...s, cls: e.target.value })}>
              <option>1st class</option><option>2nd class</option><option>Confort+</option><option>Premium</option>
            </select>
          </Row>
          <Row label="Travellers" w={160}>
            <select className={sel} value={s.pax} onChange={(e) => setS({ ...s, pax: e.target.value })}>
              <option>1 adult</option><option>2 adults</option><option>1 adult + 1 child</option><option>Group</option>
            </select>
          </Row>
        </div>
      </div>
      {error && <div className="text-[12px] text-[#c0392b] mt-[8px]">{error}</div>}
      <div className="w-[820px] flex justify-end mt-[150px]">
        <button className={BTN} onClick={onGo}>Go</button>
      </div>
      <div className="mt-[30px] w-[820px] bg-[#fff1e0] border border-[#f3c38d] text-[#8a4b0d] text-[12px] px-[12px] py-[8px]">
        Student Pass: -30% on all 2nd class journeys until 31 December. Conditions apply.
      </div>
    </div>
  );
};

const ResultsStep: React.FC<{ s: Search; sel: number | null; onSel: (i: number) => void; onBack: () => void; onNext: () => void }> = ({ s, sel: chosen, onSel, onBack, onNext }) => (
  <div className="px-[40px] pt-[16px] h-full flex flex-col">
    <div className="text-[13px] text-[#3a3f47] mb-[6px]">{s.from || 'Origin'} to {s.to || 'Destination'} - {s.day} Oct - {s.pax}</div>
    <div className="border border-[#dcdfe3] flex-1 overflow-auto min-h-0">
      <table className="w-full text-[12px] text-[#3a3f47]">
        <thead className="sticky top-0 bg-[#f4f5f7] text-[#7b818a] text-[11px]">
          <tr className="text-left">{['Departure', 'Arrival', 'Duration', 'Train', 'Price', ''].map((h) => <th key={h} className="px-[10px] py-[4px] font-normal">{h}</th>)}</tr>
        </thead>
        <tbody>
          {TRIPS.map((t) => (
            <tr key={t.id} className={`border-t border-[#e8eaed] ${chosen === t.id ? 'bg-[#f6f0ea]' : ''}`}>
              <td className="px-[10px] py-[6px]">{t.dep}</td>
              <td className="px-[10px]">{t.arr}</td>
              <td className="px-[10px]">{t.dur}</td>
              <td className="px-[10px]">{t.train}</td>
              <td className="px-[10px] text-[10px] text-[#9aa0a8]">{s.cls.startsWith('1') ? t.p1 : t.p2} MAD</td>
              <td className="px-[10px]"><button className="text-[10px] text-[#8fa6c4] underline" onClick={() => onSel(t.id)}>select</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="flex justify-between py-[10px]">
      <button className="h-[30px] px-[14px] text-[12px] border border-[#bfc4cb] bg-[#f4f5f7] text-[#3a3f47]" onClick={onBack}>Back</button>
      <button className={BTN} onClick={onNext}>Next</button>
    </div>
  </div>
);

const Passenger: React.FC<{ onBack: () => void; onNext: (ins: boolean) => void }> = ({ onBack, onNext }) => {
  const [err, setErr] = useState('');
  const [f, setF] = useState({ first: '', last: '', email: '', phone: '', cin: '', birth: '' });
  const [ins, setIns] = useState(true);
  const [news, setNews] = useState(true);
  const inp = (k: keyof typeof f) => <input className={sel} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} />;
  return (
    <div className="px-[40px] pt-[24px]">
      <div className="text-[18px] font-semibold text-[#3a3f47] mb-[12px]">Passenger</div>
      <div className="w-[640px] grid grid-cols-2 gap-[12px]">
        <Row label="First name" w={300}>{inp('first')}</Row>
        <Row label="Last name" w={300}>{inp('last')}</Row>
        <Row label="Email" w={300}>{inp('email')}</Row>
        <Row label="Mobile" w={300}>{inp('phone')}</Row>
        <Row label="CIN / Passport" w={300}>{inp('cin')}</Row>
        <Row label="Date of birth" w={300}>{inp('birth')}</Row>
      </div>
      <label className="flex gap-[6px] mt-[14px] text-[12px] text-[#5b6169]"><input type="checkbox" checked={ins} onChange={(e) => setIns(e.target.checked)} />Add Rail Protect cancellation cover</label>
      <label className="flex gap-[6px] mt-[6px] text-[12px] text-[#5b6169]"><input type="checkbox" checked={news} onChange={(e) => setNews(e.target.checked)} />Receive RailGo offers and partner news</label>
      {err && <div className="text-[12px] text-[#c0392b] mt-[10px]">{err}</div>}
      <div className="w-[640px] flex justify-between mt-[120px]">
        <button className="h-[30px] px-[14px] text-[12px] border border-[#bfc4cb] bg-[#f4f5f7] text-[#3a3f47]" onClick={onBack}>Back</button>
        <button className={BTN} onClick={() => (f.first && f.last && f.email && f.cin ? onNext(ins) : setErr('Missing information (code P-31).'))}>Proceed</button>
      </div>
    </div>
  );
};

const SeatMap: React.FC<{ seat: string; onSeat: (s: string) => void; onBack: () => void; onNext: () => void }> = ({ seat, onSeat, onBack, onNext }) => {
  const [coach, setCoach] = useState(3);
  const rows = 14;
  const taken = (c: number, id: string) => (id.charCodeAt(0) * 7 + id.length * c + id.charCodeAt(id.length - 1)) % 3 === 0;
  return (
    <div className="px-[40px] pt-[20px]">
      <div className="text-[18px] font-semibold text-[#3a3f47] mb-[8px]">Seats</div>
      <div className="flex gap-[3px] mb-[8px]">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((c) => (
          <button key={c} onClick={() => setCoach(c)} className={`w-[24px] h-[18px] text-[9px] border ${coach === c ? 'bg-[#e8590c] text-white border-[#e8590c]' : 'border-[#bfc4cb] text-[#5b6169]'}`}>{c}</button>
        ))}
      </div>
      <div className="border border-[#dcdfe3] p-[8px] w-[400px] flex flex-col gap-[2px]" style={{ height: 250 }}>
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex gap-[2px] justify-center">
            {['A', 'B', 'C', 'D'].map((l, i) => {
              const id = `${coach}${l}${r + 1}`;
              const isTaken = taken(coach, id);
              return (
                <button
                  key={id}
                  disabled={isTaken}
                  onClick={() => onSeat(id)}
                  className={`h-[14px] text-[7px] ${i === 1 ? 'mr-[14px]' : ''} ${seat === id ? 'bg-[#d6804a] text-white' : isTaken ? 'bg-[#d3d6da] text-[#c1c5ca]' : 'bg-[#e4e6e9] text-[#7b818a]'}`}
                  style={{ width: 16 }}
                >
                  {r + 1}{l}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex gap-[12px] text-[9px] text-[#9aa0a8] mt-[4px] w-[400px]">
        <span><i className="inline-block w-[8px] h-[8px] bg-[#e4e6e9] mr-[3px]" />Free</span>
        <span><i className="inline-block w-[8px] h-[8px] bg-[#d3d6da] mr-[3px]" />Not available</span>
        <span><i className="inline-block w-[8px] h-[8px] bg-[#d6804a] mr-[3px]" />Yours</span>
      </div>
      <div className="w-[640px] flex justify-between mt-[12px]">
        <button className="h-[30px] px-[14px] text-[12px] border border-[#bfc4cb] bg-[#f4f5f7] text-[#3a3f47]" onClick={onBack}>Back</button>
        <button className={BTN} onClick={onNext}>Proceed</button>
      </div>
    </div>
  );
};

const Payment: React.FC<{ onBack: () => void; onNext: () => void }> = ({ onBack, onNext }) => {
  const [err, setErr] = useState('');
  const [c, setC] = useState({ name: '', num: '', exp: '', cvv: '' });
  const inp = (k: keyof typeof c, ph = '') => <input className={sel} placeholder={ph} value={c[k]} onChange={(e) => setC({ ...c, [k]: e.target.value })} />;
  return (
    <div className="px-[40px] pt-[24px]">
      <div className="text-[18px] font-semibold text-[#3a3f47] mb-[12px]">Payment</div>
      <div className="w-[520px] flex flex-wrap gap-[12px]">
        <Row label="Name on card" w={500}>{inp('name')}</Row>
        <Row label="Card number" w={500}>{inp('num')}</Row>
        <Row label="Expiry" w={240}>{inp('exp', 'MM/YY')}</Row>
        <Row label="CVV" w={240}>{inp('cvv')}</Row>
      </div>
      {err && <div className="text-[12px] text-[#c0392b] mt-[10px]">{err}</div>}
      <div className="w-[520px] flex justify-between mt-[150px]">
        <button className="h-[30px] px-[14px] text-[12px] border border-[#bfc4cb] bg-[#f4f5f7] text-[#3a3f47]" onClick={onBack}>Back</button>
        <button className={BTN} onClick={() => (c.name && c.num.length >= 12 && c.exp && c.cvv ? onNext() : setErr('Payment data invalid (P-07).'))}>Continue</button>
      </div>
    </div>
  );
};

const Review: React.FC<{ s: Search; trip: Trip; ins: boolean; onBack: () => void; onNext: () => void }> = ({ s, trip, ins, onBack, onNext }) => {
  const fare = s.cls.startsWith('1') ? trip.p1 : trip.p2;
  const total = fare + 12 + 5 + (ins ? 25 : 0);
  return (
    <div className="px-[40px] pt-[24px]">
      <div className="text-[18px] font-semibold text-[#3a3f47] mb-[12px]">Review</div>
      <table className="text-[12px] text-[#3a3f47] w-[420px]">
        <tbody>
          <tr><td className="py-[3px]">Ticket {s.cls}</td><td className="text-right">{fare} MAD</td></tr>
          <tr><td className="py-[3px]">Booking fee</td><td className="text-right">12 MAD</td></tr>
          <tr><td className="py-[3px]">Service charge</td><td className="text-right">5 MAD</td></tr>
          {ins && <tr><td className="py-[3px]">Rail Protect</td><td className="text-right">25 MAD</td></tr>}
          <tr className="border-t border-[#dcdfe3]"><td className="py-[4px]">Total</td><td className="text-right">{total} MAD</td></tr>
        </tbody>
      </table>
      <div className="w-[640px] flex justify-between mt-[150px]">
        <button className="h-[34px] px-[26px] text-[13px] font-semibold bg-[#e8590c] text-white" onClick={onBack}>Cancel</button>
        <button className="h-[26px] px-[10px] text-[11px] border border-[#bfc4cb] bg-[#f4f5f7] text-[#7b818a]" onClick={onNext}>Validate</button>
      </div>
    </div>
  );
};

const Done: React.FC<{ s: Search; trip: Trip; seat: string }> = ({ s, trip, seat }) => (
  <div className="px-[40px] pt-[28px] text-[13px] text-[#3a3f47]">
    <div className="text-[18px] font-semibold mb-[10px]">Booking complete</div>
    <div className="border border-[#dcdfe3] p-[16px] w-[460px]">
      <div className="text-[11px] text-[#7b818a]">Reference</div>
      <div className="text-[14px] mb-[8px]">RG7K2Q9XM41</div>
      <div>{s.from} to {s.to}</div>
      <div>{s.day} Oct 2026, {trip.dep} - {trip.arr}</div>
      <div className="text-[11px] text-[#7b818a] mt-[4px]">{trip.train} - {s.cls}{seat ? ` - seat ${seat}` : ''}</div>
    </div>
    <div className="text-[11px] text-[#8fa6c4] underline mt-[8px]">pdf</div>
  </div>
);

// ---------- root ----------

const FRESH: Search = { from: '', to: '', day: TODAY, cls: '1st class', after: '00:00', pax: '1 adult' };

export const Project06Train: React.FC = () => {
  const [step, setStep] = useState(0);
  const [s, setS] = useState<Search>(FRESH);
  const [tripId, setTripId] = useState<number | null>(null);
  const [seat, setSeat] = useState('');
  const [ins, setIns] = useState(true);
  const [err, setErr] = useState('');

  const restart = () => { setS(FRESH); setTripId(null); setSeat(''); setErr(''); setStep(0); };
  const search = () => {
    if (!s.from || !s.to) { setErr('Please check your search (ERR 204).'); return; }
    if (s.day < TODAY) { setErr('No result found (ERR 204).'); return; }
    setErr('');
    setStep(1);
  };
  const trip = TRIPS.find((t) => t.id === tripId) ?? TRIPS[0];

  let body: React.ReactNode;
  switch (step) {
    case 0: body = <SearchStep s={s} setS={setS} onGo={search} error={err} />; break;
    case 1: body = <ResultsStep s={s} sel={tripId} onSel={setTripId} onBack={restart} onNext={() => setStep(2)} />; break;
    case 2: body = <Passenger onBack={restart} onNext={(i) => { setIns(i); setStep(3); }} />; break;
    case 3: body = <SeatMap seat={seat} onSeat={setSeat} onBack={restart} onNext={() => setStep(4)} />; break;
    case 4: body = <Payment onBack={restart} onNext={() => setStep(5)} />; break;
    case 5: body = <Review s={s} trip={trip} ins={ins} onBack={restart} onNext={() => setStep(6)} />; break;
    default: body = <Done s={s} trip={trip} seat={seat} />;
  }

  return (
    <div className="w-[1280px] h-[800px] relative overflow-hidden bg-white flex flex-col" style={{ fontFamily: 'Segoe UI, Roboto, Arial, sans-serif' }}>
      <Header />
      <div className="flex-1 min-h-0">{body}</div>
    </div>
  );
};
