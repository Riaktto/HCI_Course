import React, { useState } from 'react';
import type { Finding } from '../../data/projects';

/** StudyRoom: campus library study-room booking page (class example). Fixed design size 1280 x 800 px. */

type Tab = 'book' | 'rooms' | 'items';

interface Room {
  code: string;
  name: string;
  floor: number;
  seats: number;
  taken: boolean;
  gear: string;
}

interface Item {
  id: number;
  code: string;
  date: string;
  start: string;
  end: string;
  people: string;
  kind: 'Reserved' | 'Held';
}

interface Form {
  code: string;
  date: string;
  start: string;
  end: string;
  people: string;
  note: string;
}

const TODAY = '2026-10-12';
const TOMORROW = '2026-10-13';

const NAMES = [
  'Atlas', 'Berber', 'Cedar', 'Draa', 'Erg', 'Fes', 'Gharb', 'Haouz', 'Ifrane', 'Jbel', 'Kasbah', 'Larache',
  'Medina', 'Nador', 'Oasis', 'Plateau', 'Qanat', 'Rif', 'Souss', 'Tafilalet', 'Uzine', 'Volubilis', 'Waha', 'Zagora',
];
const SEATS = [2, 4, 6, 4, 8, 2, 4, 10, 6, 2, 4, 8, 4, 2, 6, 4, 10, 4, 2, 6, 4, 8, 2, 4];
const GEAR = ['Whiteboard', 'Screen', 'Whiteboard + screen', 'Quiet', 'Screen', 'Quiet'];
const TAKEN = new Set([1, 3, 6, 9, 12, 14, 17, 18, 21, 22]);

const buildRooms = (): Room[] => {
  const all: Room[] = NAMES.map((name, i) => {
    const floor = 1 + Math.floor(i / 6);
    return {
      code: `LIB-${floor}F-${String((i % 6) * 2 + 1 + (i % 2)).padStart(2, '0')}`,
      name,
      floor,
      seats: SEATS[i],
      taken: TAKEN.has(i),
      gear: GEAR[i % GEAR.length],
    };
  });
  return all.map((_, i) => all[(i * 7) % all.length]);
};

const ROOMS = buildRooms();
const ROOMS_BY_CODE = [...ROOMS].sort((a, b) => a.code.localeCompare(b.code));

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

const C = {
  navy: '#1f2d4a',
  text: '#5b6472',
  line: '#c9ced6',
  field: '#e9ecf0',
  page: '#f1f2f4',
};

const Header: React.FC<{ tab: Tab; onTab: (t: Tab) => void }> = ({ tab, onTab }) => {
  const tabs: { id: Tab; label: string }[] = [
    { id: 'book', label: 'Book' },
    { id: 'rooms', label: 'Rooms' },
    { id: 'items', label: 'My items' },
  ];
  return (
    <div className="absolute left-0 top-0 w-full h-[52px] flex items-center px-6" style={{ background: C.navy }}>
      <div className="flex items-center gap-2 mr-10">
        <div className="w-6 h-6 rounded-md flex items-center justify-center text-[13px] font-bold" style={{ background: '#d9dde4', color: C.navy }}>S</div>
        <span className="text-[17px] font-semibold text-white tracking-tight">StudyRoom</span>
        <span className="text-[11px] text-[#9aa5bb] ml-1">Campus Library</span>
      </div>
      <div className="flex h-full">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => onTab(t.id)}
            className="px-5 h-full text-[13px] outline-none"
            style={{
              color: tab === t.id ? '#fff' : '#9aa5bb',
              borderBottom: tab === t.id ? '3px solid #aab4c8' : '3px solid transparent',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="ml-auto text-[12px] text-[#9aa5bb]">Imane El Idrissi · Student</div>
    </div>
  );
};

const PromoBanner: React.FC = () => (
  <div
    className="absolute left-0 top-[52px] w-full h-[64px] flex items-center justify-between px-6"
    style={{ background: 'linear-gradient(90deg,#ff5a1f,#ff2d6f)' }}
  >
    <div className="flex items-center gap-4">
      <div className="text-[26px] font-extrabold text-white tracking-tight">EXAM WEEK SPECIAL</div>
      <div className="text-[16px] font-semibold text-[#fff3d6]">Free coffee voucher with every evening booking at the Café Annex</div>
    </div>
    <div className="px-4 py-2 rounded-full text-[14px] font-bold" style={{ background: '#ffe14d', color: '#7a1d00' }}>Learn more</div>
  </div>
);

const FieldBox: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  width?: number;
}> = ({ label, value, onChange, width = 440 }) => (
  <label className="block" style={{ height: 62 }}>
    <div className="text-[12px] mb-1" style={{ color: C.text }}>{label}</div>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-[34px] px-3 text-[13px] rounded-[4px] outline-none"
      style={{ width, background: C.field, border: `1px solid ${C.line}`, color: C.text }}
    />
  </label>
);

const BookingForm: React.FC<{
  form: Form;
  setForm: (f: Form) => void;
  error: string;
  onHold: () => void;
  onReserve: () => void;
  onClear: () => void;
}> = ({ form, setForm, error, onHold, onReserve, onClear }) => {
  const set = (k: keyof Form) => (v: string) => setForm({ ...form, [k]: v });
  return (
    <div className="absolute left-6 top-[132px] w-[500px] h-[652px] rounded-lg p-5" style={{ background: '#fff', border: `1px solid ${C.line}` }}>
      <div className="text-[16px] mb-3" style={{ color: C.text }}>New booking</div>
      <div>
        <FieldBox label="Room" value={form.code} onChange={set('code')} />
        <FieldBox label="Date" value={form.date} onChange={set('date')} />
        <FieldBox label="Start" value={form.start} onChange={set('start')} />
        <FieldBox label="End" value={form.end} onChange={set('end')} />
        <FieldBox label="People" value={form.people} onChange={set('people')} />
        <FieldBox label="Note" value={form.note} onChange={set('note')} />
      </div>
      <div className="flex gap-3 mt-2">
        <button
          onClick={onHold}
          className="h-[38px] w-[120px] rounded-[4px] text-[14px] outline-none"
          style={{ background: '#d4d9e1', border: `1px solid #aab2bf`, color: '#3d4655' }}
        >
          Hold
        </button>
        <button
          onClick={onClear}
          className="h-[38px] w-[80px] rounded-[4px] text-[13px] outline-none"
          style={{ background: C.field, border: `1px solid ${C.line}`, color: C.text }}
        >
          Clear
        </button>
      </div>
      <div className="mt-3 text-[12px] h-4" style={{ color: '#b04040' }}>{error}</div>
      <div className="mt-3 text-[11px] leading-4" style={{ color: '#8a93a1' }}>
        Opening hours 08:00 - 22:00. Maximum 2 hours per booking, 1 booking per day. Held rooms are released automatically.
      </div>
      <button
        onClick={onReserve}
        className="absolute h-[20px] w-[54px] text-[11px] rounded-[3px] outline-none"
        style={{ left: 1182 - 24, top: 770 - 132, background: C.field, border: `1px solid ${C.line}`, color: C.text }}
      >
        Reserve
      </button>
    </div>
  );
};

const RoomListPanel: React.FC = () => (
  <div className="absolute left-[548px] top-[132px] w-[708px] h-[626px] rounded-lg overflow-hidden" style={{ background: '#fff', border: `1px solid ${C.line}` }}>
    <div className="flex items-center h-[30px] px-3 text-[11px] font-normal" style={{ color: C.text, background: C.field }}>
      <div className="w-[170px]">Room</div>
      <div className="w-[70px]">Floor</div>
      <div className="w-[70px]">Seats</div>
      <div className="w-[200px]">Equipment</div>
      <div className="w-[60px]">Status</div>
    </div>
    {ROOMS.map((r) => (
      <div key={r.code} className="flex items-center h-[24px] px-3 text-[10px] border-b" style={{ color: C.text, borderColor: '#e6e9ee' }}>
        <div className="w-[170px]">{r.name}</div>
        <div className="w-[70px]">{r.floor}</div>
        <div className="w-[70px]">{r.seats}</div>
        <div className="w-[200px]">{r.gear}</div>
        <div className="w-[60px]">
          <span className="inline-block w-[6px] h-[6px] rounded-full" style={{ background: r.taken ? '#d46a6a' : '#6ab07a' }} />
        </div>
      </div>
    ))}
  </div>
);

const BookScreen: React.FC<React.ComponentProps<typeof BookingForm>> = (props) => (
  <>
    <BookingForm {...props} />
    <RoomListPanel />
  </>
);

const RoomsScreen: React.FC = () => (
  <div className="absolute left-6 top-[132px] w-[1232px] h-[652px] rounded-lg overflow-hidden" style={{ background: '#fff', border: `1px solid ${C.line}` }}>
    <div className="px-5 py-3 text-[16px]" style={{ color: C.text }}>All rooms</div>
    <div className="flex items-center h-[28px] px-5 text-[12px]" style={{ background: C.field, color: C.text }}>
      <div className="w-[160px]">Code</div>
      <div className="w-[160px]">Name</div>
      <div className="w-[90px]">Floor</div>
      <div className="w-[90px]">Seats</div>
      <div className="w-[220px]">Equipment</div>
      <div className="w-[120px]">Status</div>
    </div>
    <div className="overflow-hidden" style={{ height: 556 }}>
      {ROOMS_BY_CODE.map((r) => (
        <div key={r.code} className="flex items-center h-[22px] px-5 text-[12px] border-b" style={{ color: C.text, borderColor: '#e6e9ee' }}>
          <div className="w-[160px] font-mono">{r.code}</div>
          <div className="w-[160px]">{r.name}</div>
          <div className="w-[90px]">{r.floor}</div>
          <div className="w-[90px]">{r.seats}</div>
          <div className="w-[220px]">{r.gear}</div>
          <div className="w-[120px]" style={{ color: r.taken ? '#b04040' : '#3f8a54' }}>{r.taken ? 'Taken' : 'Free'}</div>
        </div>
      ))}
    </div>
  </div>
);

const ItemsScreen: React.FC<{ items: Item[]; onRemove: (id: number) => void }> = ({ items, onRemove }) => (
  <div className="absolute left-6 top-[132px] w-[1232px] h-[652px] rounded-lg p-5" style={{ background: '#fff', border: `1px solid ${C.line}` }}>
    <div className="text-[16px] mb-3" style={{ color: C.text }}>My items</div>
    {items.length === 0 ? (
      <div className="text-[13px]" style={{ color: '#8a93a1' }}>Nothing here yet.</div>
    ) : (
      <div>
        <div className="flex h-[28px] items-center px-3 text-[12px]" style={{ background: C.field, color: C.text }}>
          <div className="w-[160px]">Room</div>
          <div className="w-[130px]">Date</div>
          <div className="w-[130px]">Time</div>
          <div className="w-[80px]">People</div>
          <div className="w-[260px]">Status</div>
        </div>
        {items.map((it) => (
          <div key={it.id} className="flex h-[32px] items-center px-3 text-[12px] border-b" style={{ color: C.text, borderColor: '#e6e9ee' }}>
            <div className="w-[160px] font-mono">{it.code}</div>
            <div className="w-[130px]">{it.date}</div>
            <div className="w-[130px]">{it.start} - {it.end}</div>
            <div className="w-[80px]">{it.people}</div>
            <div className="w-[260px]">{it.kind === 'Held' ? 'Held (10 min)' : 'Reserved'}</div>
            <button onClick={() => onRemove(it.id)} className="text-[10px] underline outline-none" style={{ color: '#8a93a1' }}>cancel</button>
          </div>
        ))}
      </div>
    )}
  </div>
);

const EMPTY: Form = { code: '', date: '', start: '', end: '', people: '', note: '' };

const toMinutes = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));

export const Project11Library: React.FC = () => {
  const [tab, setTab] = useState<Tab>('book');
  const [form, setForm] = useState<Form>(EMPTY);
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState('');

  const validate = (): string => {
    const room = ROOMS.find((r) => r.code === form.code.trim());
    if (!room) return 'Invalid room.';
    if (!DATE_RE.test(form.date) || !TIME_RE.test(form.start) || !TIME_RE.test(form.end)) return 'Invalid input.';
    if (form.date < TOMORROW && form.date !== TODAY) return 'Invalid input.';
    if (toMinutes(form.end) <= toMinutes(form.start)) return 'Invalid input.';
    if (toMinutes(form.end) - toMinutes(form.start) > 120) return 'Too long.';
    const n = Number(form.people);
    if (!Number.isInteger(n) || n < 1) return 'Invalid input.';
    if (n > room.seats) return 'Room too small.';
    if (room.taken) return 'Room not available.';
    return '';
  };

  const add = (kind: Item['kind']) => {
    const msg = validate();
    setError(msg);
    if (msg) return;
    setItems((prev) => [
      ...prev,
      { id: prev.reduce((m, x) => Math.max(m, x.id), 0) + 1, code: form.code.trim(), date: form.date, start: form.start, end: form.end, people: form.people, kind },
    ]);
  };

  return (
    <div className="w-[1280px] h-[800px] relative overflow-hidden" style={{ background: C.page, fontFamily: 'Segoe UI, system-ui, Arial, sans-serif' }}>
      <Header tab={tab} onTab={setTab} />
      <PromoBanner />
      {tab === 'book' && (
        <BookScreen
          form={form}
          setForm={setForm}
          error={error}
          onHold={() => add('Held')}
          onReserve={() => add('Reserved')}
          onClear={() => { setForm(EMPTY); setError(''); }}
        />
      )}
      {tab === 'rooms' && <RoomsScreen />}
      {tab === 'items' && <ItemsScreen items={items} onRemove={(id) => setItems((p) => p.filter((x) => x.id !== id))} />}
    </div>
  );
};

/** Annotated problems, in the interface's own 1280 x 800 coordinates. */
export const PROJECT_11_FINDINGS: Finding[] = [
  {
    lens: 'look',
    rect: { x: 39, y: 183, w: 470, h: 384 },
    saw: 'Six identical grey boxes, evenly spaced, with no groups and no title for each part.',
    why: 'Nothing tells the eye what goes together or what to fill first, so the form reads as one flat wall.',
    fix: 'Group related fields (room, when, who) with spacing and small headings, and make the important ones stand out.',
  },
  {
    lens: 'look',
    rect: { x: 0, y: 52, w: 1280, h: 64 },
    saw: 'The loudest thing on the page is an orange promo banner, not the booking action.',
    why: 'Bright colour and big type pull the eye to a coffee offer while the real action is grey and lost.',
    fix: 'Remove or tone down the banner, and give the one main action the strongest colour and size.',
  },
  {
    lens: 'remember',
    rect: { x: 39, y: 183, w: 470, h: 68 },
    saw: 'The room must be typed as a code, but the codes are only shown on the other Rooms tab.',
    why: 'You must remember or copy a code like LIB-2F-07 across two pages, and one typo breaks it.',
    fix: 'Let people pick a room from a list or by clicking it, showing the name and code right here.',
  },
  {
    lens: 'remember',
    rect: { x: 39, y: 247, w: 470, h: 190 },
    saw: 'Date and times are blank boxes with no example or hint of the strict format needed.',
    why: 'You must guess 2026-10-13 and 14:00 exactly, and a wrong format only gives a vague error.',
    fix: 'Use a date picker and time choices (or show the format as a hint and accept natural input).',
  },
  {
    lens: 'point',
    rect: { x: 1177, y: 765, w: 66, h: 32 },
    saw: 'The Reserve button is tiny and sits in the far bottom-right corner, away from the form.',
    why: 'It is hard to find and hard to hit, and the mouse must travel across the whole screen to reach it.',
    fix: 'Make it a large button placed right under the last field, where the eye and the mouse already are.',
  },
  {
    lens: 'point',
    rect: { x: 542, y: 126, w: 720, h: 638 },
    saw: '24 rooms shown at once in no order, with tiny rows, tiny text and tiny status dots.',
    why: 'Finding a free room for 4 means scanning every row, and the small dots are easy to misread.',
    fix: 'Filter to rooms that fit and are free, sort them, and use bigger rows with clear Free / Taken labels.',
  },
  {
    lens: 'understand',
    rect: { x: 39, y: 563, w: 132, h: 50 },
    saw: 'Hold looks like the main button, but it only keeps the room for 10 minutes.',
    why: 'People click the big button, think they have booked, and lose the room later.',
    fix: 'Make Reserve the clear main button, and drop Hold or label it plainly ("Keep for 10 min").',
  },
  {
    lens: 'understand',
    rect: { x: 171, y: 563, w: 338, h: 80 },
    saw: 'After Reserve nothing changes on screen, and Clear empties the whole form without asking.',
    why: 'You cannot tell if it worked, and one slip erases everything you typed.',
    fix: 'Show a clear confirmation with the booking details, and ask before clearing or allow undo.',
  },
];
