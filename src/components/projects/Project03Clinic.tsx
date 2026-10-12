import React, { useRef, useState } from 'react';
import { Phone, Search, ChevronRight, Sparkles, User } from 'lucide-react';

/* ---------- data ---------- */

const TODAY = new Date(2026, 9, 15); // Thursday 15 October 2026

const SPECIALTIES = [
  'Orthopedics', 'Dermatology', 'Pediatrics', 'Cardiology', 'Ophthalmology', 'Neurology', 'Dentistry',
  'ENT (Otolaryngology)', 'Gynecology', 'Urology', 'Rheumatology', 'General medicine', 'Endocrinology',
  'Gastroenterology', 'Pulmonology', 'Nephrology', 'Psychiatry', 'Oncology', 'Radiology', 'Allergology',
  'Physiotherapy', 'Nutrition', 'Vascular surgery', 'Plastic surgery', 'Sports medicine', 'Geriatrics',
  'Hematology', 'Infectious diseases', 'Orthodontics', 'Speech therapy', 'Sleep medicine', 'Podiatry',
  'Occupational medicine', 'Pain management', 'Proctology', 'Neurosurgery', 'Pediatric surgery',
  'Sexology', 'Addiction medicine', 'Emergency medicine',
];

const DOCTORS = [
  { id: 'benkirane', label: 'Dr. BENKIRANE Salma - Gyn.' },
  { id: 'alaoui', label: 'Dr. ALAOUI Mehdi - Card.' },
  { id: 'tazi', label: 'Dr. TAZI Rachid - Ortho.' },
  { id: 'elalami', label: 'Dr. EL ALAMI Khalid - Card.' },
  { id: 'chraibi', label: 'Dr. CHRAIBI Nadia - Derm.' },
  { id: 'alami', label: 'Dr. ALAMI Youssef - MG' },
  { id: 'fassi', label: 'Dr. FASSI FIHRI Amal - Ped.' },
  { id: 'berrada', label: 'Dr. BERRADA Omar - ORL' },
  { id: 'lahlou', label: 'Dr. LAHLOU Imane - Ophtalmo.' },
  { id: 'sqalli', label: 'Dr. SQALLI Hamza - Uro.' },
  { id: 'idrissi', label: 'Dr. IDRISSI Kenza - MG' },
  { id: 'bennani', label: 'Dr. BENNANI Said - Rhumato.' },
  { id: 'zniber', label: 'Dr. ZNIBER Lamia - Endo.' },
  { id: 'kettani', label: 'Dr. KETTANI Anas - Neuro.' },
  { id: 'alamie', label: 'Dr. ALAMI Fatima - Dent.' },
  { id: 'ouazzani', label: 'Dr. OUAZZANI Driss - Gastro.' },
  { id: 'mekouar', label: 'Dr. MEKOUAR Sofia - Psy.' },
  { id: 'hajji', label: 'Dr. HAJJI Reda - Pneumo.' },
  { id: 'rahmouni', label: 'Dr. RAHMOUNI Hind - Nutri.' },
  { id: 'jabri', label: 'Dr. JABRI Tarik - Kine.' },
  { id: 'slaoui', label: 'Dr. SLAOUI Meryem - Allergo.' },
  { id: 'bouazza', label: 'Dr. BOUAZZA Adil - Radio.' },
];

const VISIT_TYPES = [
  'Consultation C1', 'General consultation', 'Follow-up (control)', 'Annual check-up (bilan de sante)',
  'Certificate / paperwork', 'Vaccination', 'Test results review', 'Second opinion',
  'Prescription renewal', 'Pre-operative visit', 'Other',
];

const INSURANCES = ['CNSS', 'CNOPS', 'AXA Assurance', 'Wafa Assurance', 'Sanlam', 'RMA', 'Saham', 'None / self-pay'];
const TITLES = ['Mr', 'Mrs', 'Ms', 'Dr', 'Pr'];

const BASE_TIMES = ['08:30', '09:00', '09:30', '10:15', '11:00', '11:45', '14:30', '15:15', '16:00', '16:45'];

interface Slot { t: string; taken: boolean }

const parseDMY = (s: string): Date | null => {
  const m = /^(\d{2})-(\d{2})-(\d{4})$/.exec(s.trim());
  if (!m) return null;
  const d = new Date(+m[3], +m[2] - 1, +m[1]);
  if (d.getFullYear() !== +m[3] || d.getMonth() !== +m[2] - 1 || d.getDate() !== +m[1]) return null;
  return d;
};

const slotsFor = (doctor: string, dateStr: string): Slot[] => {
  const d = parseDMY(dateStr);
  if (!d || !doctor || d < TODAY || d.getDay() === 0) return [];
  if (doctor === 'alami' && d.getDay() === 2) {
    return ['08:30', '09:00', '09:30', '10:15', '11:00', '11:45', '14:30', '15:15', '16:00'].map(t => ({
      t, taken: t === '09:00' || t === '15:15',
    }));
  }
  const seed = doctor.length + d.getDate();
  return BASE_TIMES
    .filter((_, i) => (seed + i) % 3 !== 0)
    .map((t, i) => ({ t, taken: (seed + i) % 4 === 0 }));
};

interface Form {
  title: string; last: string; first: string; dob: string; cin: string; phone: string; email: string;
  city: string; insurance: string; specialty: string; doctor: string; visit: string; date: string;
  slot: string; notes: string; sms: boolean; terms: boolean;
}

const EMPTY: Form = {
  title: '', last: '', first: '', dob: '', cin: '', phone: '', email: '', city: '', insurance: '',
  specialty: '', doctor: '', visit: '', date: '', slot: '', notes: '', sms: true, terms: false,
};

interface Appointment { id: number; doctor: string; date: string; time: string; visit: string; status: string }

/* ---------- small pieces ---------- */

const inputCls =
  'w-full h-[30px] border border-[#cfd3d8] rounded-[3px] px-2 text-[13px] text-[#374151] bg-white outline-none';

const Field: React.FC<{ label: string; children: React.ReactNode; wide?: boolean }> = ({ label, children, wide }) => (
  <label className={`flex flex-col gap-[3px] ${wide ? 'col-span-2' : ''}`}>
    <span className="text-[11px] text-[#9ca3af]">{label}</span>
    {children}
  </label>
);

const Header: React.FC<{ view: string; setView: (v: string) => void }> = ({ view, setView }) => {
  const items = [
    ['home', 'Home'], ['services', 'Services'], ['staff', 'Medical staff'], ['book', 'e-RDV'], ['area', 'MyCare'],
  ];
  return (
    <div className="shrink-0">
      <div className="h-[24px] bg-[#f3f4f6] flex items-center justify-between px-6 text-[11px] text-[#9ca3af]">
        <span>Thursday 15/10/2026</span>
        <span className="flex items-center gap-1"><Phone size={10} /> Emergency: 05 22 00 14 14 &nbsp;|&nbsp; FR / EN</span>
      </div>
      <div className="h-[54px] bg-white border-b border-[#e5e7eb] flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="w-[28px] h-[28px] rounded-full bg-[#1f8a8a] flex items-center justify-center text-white text-[16px] font-bold">+</div>
          <span className="text-[19px] font-bold text-[#1f8a8a]">Clinic<span className="text-[#334155]">Care</span></span>
        </div>
        <div className="flex items-center gap-6 text-[13px] text-[#6b7280]">
          {items.map(([k, l]) => (
            <button key={k} onClick={() => setView(k === 'area' ? 'area' : k === 'book' || k === 'home' ? 'book' : view)}
              className={`outline-none ${(k === 'area' && view === 'area') || (k === 'book' && view === 'book') ? 'text-[#374151] font-semibold' : ''}`}>
              {l}
            </button>
          ))}
          <Search size={14} />
        </div>
      </div>
    </div>
  );
};

/* ---------- main ---------- */

export const Project03Clinic: React.FC = () => {
  const [view, setView] = useState('book');
  const [f, setF] = useState<Form>(EMPTY);
  const [error, setError] = useState(false);
  const [appts, setAppts] = useState<Appointment[]>([]);
  const scroller = useRef<HTMLDivElement>(null);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setF(prev => ({ ...prev, [k]: v }));
  const slots = slotsFor(f.doctor, f.date);
  const dateOk = parseDMY(f.date) !== null;

  const valid = () =>
    f.last.trim() && f.first.trim() && parseDMY(f.dob) && /^\d{10}$/.test(f.phone.replace(/\s/g, '')) &&
    f.specialty && f.doctor && f.visit && dateOk && f.slot && f.terms;

  const confirm = () => {
    if (!valid()) {
      setError(true);
      return;
    }
    const doc = DOCTORS.find(d => d.id === f.doctor)!.label;
    setAppts(a => [...a, { id: a.length + 1, doctor: doc, date: f.date, time: f.slot, visit: f.visit, status: 'Validated' }]);
    setF(EMPTY);
    setError(false);
    scroller.current?.scrollTo({ top: 0 });
  };

  const cancel = () => {
    setF(EMPTY);
    setError(false);
  };

  const bookNowPromo = () => {
    set('specialty', 'Dentistry');
  };

  return (
    <div className="w-[1280px] h-[800px] relative overflow-hidden bg-[#f9fafb] flex flex-col font-[system-ui,'Segoe_UI',Arial,sans-serif] text-[#374151]">
      <Header view={view} setView={setView} />
      <div ref={scroller} className="flex-1 overflow-y-scroll">
        {/* promo banner */}
        <div className="h-[64px] bg-gradient-to-r from-[#ff6a00] to-[#ff9a1f] flex items-center justify-center gap-5 text-white">
          <Sparkles size={22} />
          <span className="text-[22px] font-extrabold tracking-wide">FLASH OFFER: -30% ON TEETH WHITENING THIS WEEK ONLY!</span>
          <button onClick={bookNowPromo} className="h-[38px] px-6 rounded-full bg-white text-[#e25800] font-bold text-[15px] outline-none">Book now</button>
        </div>

        {view === 'area' ? (
          <div className="w-[760px] mx-auto py-8">
            <h2 className="text-[20px] font-semibold text-[#374151] mb-1">MyCare</h2>
            <p className="text-[12px] text-[#9ca3af] mb-4">Appointments linked to this browser session</p>
            {appts.length === 0 ? (
              <div className="bg-white border border-[#e5e7eb] rounded p-6 text-[13px] text-[#9ca3af]">No appointment on file.</div>
            ) : (
              <table className="w-full bg-white border border-[#e5e7eb] text-[13px]">
                <thead>
                  <tr className="text-left text-[11px] text-[#9ca3af] border-b border-[#e5e7eb]">
                    <th className="p-2">Ref</th><th className="p-2">Practitioner</th><th className="p-2">Date</th>
                    <th className="p-2">Time</th><th className="p-2">Type</th><th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appts.map(a => (
                    <tr key={a.id} className="border-b border-[#f1f5f9]">
                      <td className="p-2">CC-{1040 + a.id}</td><td className="p-2">{a.doctor}</td><td className="p-2">{a.date}</td>
                      <td className="p-2">{a.time}</td><td className="p-2">{a.visit}</td><td className="p-2">{a.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          <div className="flex gap-8 px-10 py-6 items-start">
            {/* form */}
            <div className="w-[820px] bg-white border border-[#e5e7eb] rounded p-6">
              {error && <div className="text-[12px] text-[#dc2626] mb-3">Error 417: invalid input</div>}
              <h1 className="text-[18px] text-[#4b5563] mb-4">Online appointment request</h1>
              <div className="grid grid-cols-2 gap-x-5 gap-y-3">
                <Field label="Title">
                  <select className={inputCls} value={f.title} onChange={e => set('title', e.target.value)}>
                    <option value="" />
                    {TITLES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Last name">
                  <input className={inputCls} value={f.last} onChange={e => set('last', e.target.value)} />
                </Field>
                <Field label="First name">
                  <input className={inputCls} value={f.first} onChange={e => set('first', e.target.value)} />
                </Field>
                <Field label="Date of birth">
                  <input className={inputCls} value={f.dob} onChange={e => set('dob', e.target.value)} />
                </Field>
                <Field label="ID card (CIN)">
                  <input className={inputCls} value={f.cin} onChange={e => set('cin', e.target.value)} />
                </Field>
                <Field label="Mobile">
                  <input className={inputCls} value={f.phone} onChange={e => set('phone', e.target.value)} />
                </Field>
                <Field label="E-mail">
                  <input className={inputCls} value={f.email} onChange={e => set('email', e.target.value)} />
                </Field>
                <Field label="City">
                  <input className={inputCls} value={f.city} onChange={e => set('city', e.target.value)} />
                </Field>
                <Field label="Health coverage">
                  <select className={inputCls} value={f.insurance} onChange={e => set('insurance', e.target.value)}>
                    <option value="" />
                    {INSURANCES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Specialty">
                  <select className={inputCls} value={f.specialty} onChange={e => set('specialty', e.target.value)}>
                    <option value="" />
                    {SPECIALTIES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Practitioner">
                  <select className={inputCls} value={f.doctor} onChange={e => setF(p => ({ ...p, doctor: e.target.value, slot: '' }))}>
                    <option value="" />
                    {DOCTORS.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
                  </select>
                </Field>
                <Field label="Type of visit">
                  <select className={inputCls} value={f.visit} onChange={e => set('visit', e.target.value)}>
                    <option value="" />
                    {VISIT_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Date">
                  <input className={inputCls} value={f.date} onChange={e => setF(p => ({ ...p, date: e.target.value, slot: '' }))} />
                </Field>
                <div className="flex flex-col gap-[3px]">
                  <span className="text-[11px] text-[#9ca3af]">Availability</span>
                  <div className="min-h-[30px] flex flex-wrap items-center gap-x-[7px] gap-y-1 text-[11px]">
                    {slots.length === 0 && <span className="text-[#b6bcc4]">-</span>}
                    {slots.map(s => (
                      <a key={s.t} role="button" tabIndex={0}
                        onClick={() => { if (!s.taken) set('slot', s.t); }}
                        onKeyDown={e => { if (e.key === 'Enter' && !s.taken) set('slot', s.t); }}
                        className={`cursor-pointer outline-none ${s.taken ? 'text-[#d1d5db]' : f.slot === s.t ? 'text-[#4b5563] font-semibold' : 'text-[#9ca3af]'}`}>
                        {s.t}
                      </a>
                    ))}
                  </div>
                </div>
                <Field label="Comments" wide>
                  <textarea className={`${inputCls} h-[64px] py-1 resize-none`} value={f.notes} onChange={e => set('notes', e.target.value)} />
                </Field>
              </div>
              <div className="mt-3 flex flex-col gap-2 text-[11px] text-[#9ca3af]">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={f.sms} onChange={e => set('sms', e.target.checked)} />
                  Receive news and special offers from ClinicCare and partners by SMS and e-mail
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={f.terms} onChange={e => set('terms', e.target.checked)} />
                  I have read the terms of use and the personal data policy
                </label>
              </div>
              <div className="mt-24 flex items-center justify-end gap-2">
                <button onClick={cancel} className="h-[26px] px-3 text-[12px] rounded-[3px] bg-[#e5e7eb] text-[#6b7280] outline-none">Cancel</button>
                <button onClick={confirm} className="h-[26px] px-3 text-[12px] rounded-[3px] bg-[#e5e7eb] text-[#6b7280] outline-none">Confirm</button>
              </div>
            </div>
            {/* side column */}
            <div className="w-[300px] flex flex-col gap-4">
              <div className="rounded-lg bg-gradient-to-br from-[#ff6a00] to-[#ffb347] text-white p-5">
                <div className="text-[13px] font-bold">SMILE WEEK</div>
                <div className="text-[34px] font-extrabold leading-none my-1">-30%</div>
                <div className="text-[13px] mb-3">Professional whitening with Dr. ALAMI Fatima</div>
                <button onClick={bookNowPromo} className="h-[36px] px-5 rounded-full bg-white text-[#e25800] font-bold text-[14px] outline-none">Book now <ChevronRight size={14} className="inline" /></button>
              </div>
              <div className="rounded-lg bg-[#2f80ed] text-white p-4 text-[13px] font-semibold flex items-center gap-2"><User size={16} /> New: pay your invoices online</div>
              <div className="rounded-lg bg-[#16a34a] text-white p-4 text-[13px] font-semibold">Flu vaccination campaign now open</div>
              <div className="text-[10px] text-[#b6bcc4] leading-snug">
                Opening hours: Mon-Fri 08:00-18:00, Sat 08:00-13:00. ClinicCare SARL, 12 Bd Zerktouni, Casablanca. RC 284 119.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
