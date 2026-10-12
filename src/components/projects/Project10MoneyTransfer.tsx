import React, { useState } from 'react';
import { Home, ArrowLeftRight, Clock, User, Eye, EyeOff, ChevronLeft, ChevronDown, Wifi, Battery, Signal } from 'lucide-react';

type Screen = 'home' | 'contacts' | 'amount' | 'review' | 'confirm' | 'success' | 'error' | 'history' | 'profile';
type Currency = 'EUR' | 'USD' | 'MAD' | 'GBP' | 'AED';

interface Contact { name: string; phone: string }

const CONTACTS: Contact[] = [
  { name: 'Sara Benalli', phone: '+212 661 234 587' },
  { name: 'Youssef Alaoui', phone: '+212 662 908 114' },
  { name: 'Sarah Benali', phone: '+212 661 243 578' },
  { name: 'Nadia Chraibi', phone: '+212 670 551 902' },
  { name: 'Sara Bennali', phone: '+212 664 234 578' },
  { name: 'Omar Tazi', phone: '+212 661 777 310' },
  { name: 'Salma Benali', phone: '+212 661 234 758' },
  { name: 'Hicham Idrissi', phone: '+212 668 120 445' },
  { name: 'Sara Benali', phone: '+212 661 234 578' },
  { name: 'Khadija Fassi', phone: '+212 673 408 261' },
  { name: 'Sara Belali', phone: '+212 661 324 578' },
  { name: 'Mehdi Lahlou', phone: '+212 655 019 837' },
  { name: 'Samira Benali', phone: '+212 661 234 785' },
  { name: 'Anas Berrada', phone: '+212 662 331 054' },
  { name: 'Sara El Benali', phone: '+212 667 234 578' },
  { name: 'Imane Rachidi', phone: '+212 674 882 913' },
  { name: 'Sara Benani', phone: '+212 661 234 570' },
  { name: 'Reda Skalli', phone: '+212 660 245 776' },
  { name: 'Sara Ben Ali', phone: '+212 661 234 678' },
  { name: 'Lamia Tahiri', phone: '+212 669 512 340' },
  { name: 'Karim Ouazzani', phone: '+212 663 705 128' },
  { name: 'Sana Benali', phone: '+212 661 234 587' },
  { name: 'Driss Kettani', phone: '+212 671 094 662' },
  { name: 'Salwa Benali', phone: '+212 662 234 578' },
  { name: 'Ghita Mernissi', phone: '+212 675 360 019' },
  { name: 'Yassine Amrani', phone: '+212 666 818 204' },
  { name: 'Sara Benhali', phone: '+212 661 234 579' },
  { name: 'Houda Sebti', phone: '+212 672 447 395' },
  { name: 'Tarik Bennis', phone: '+212 664 903 871' },
  { name: 'Zineb Naciri', phone: '+212 658 126 540' },
];

const RATE: Record<Currency, number> = { MAD: 1, EUR: 11, USD: 10, GBP: 12.8, AED: 2.7 };
const START_BALANCE = 3280.5;

const RECENT = [
  { who: 'Marjane Hay Riad', when: 'Yesterday', amount: '212.40', out: true },
  { who: 'Nadia Chraibi', when: '8 Oct', amount: '1 500.00', out: false },
  { who: 'Inwi Recharge', when: '7 Oct', amount: '100.00', out: true },
  { who: 'Omar Tazi', when: '3 Oct', amount: '250.00', out: true },
];

const fmt = (n: number) => n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const btn: React.CSSProperties = {
  height: 44, borderRadius: 8, background: '#e9ebf7', color: '#4a4f8f', fontSize: 14, fontWeight: 500, outline: 'none', flex: 1,
};

const Avatar: React.FC<{ name: string; size?: number }> = ({ name, size = 34 }) => (
  <span
    className="flex items-center justify-center shrink-0"
    style={{ width: size, height: size, borderRadius: size / 2, background: '#e4e6f4', color: '#6b6fa6', fontSize: size * 0.36 }}
  >
    {name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
  </span>
);

export const Project10MoneyTransfer: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('home');
  const [balance, setBalance] = useState(START_BALANCE);
  const [showBalance, setShowBalance] = useState(false);
  const [contact, setContact] = useState<Contact | null>(null);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<Currency>('EUR');

  const value = parseFloat(amount.replace(',', '.')) || 0;
  const fee = Math.max(value * 0.015, value > 0 ? 5 : 0);
  const total = value + fee;

  const press = (k: string) => {
    if (k === '<') return setAmount((a) => a.slice(0, -1));
    if (k === '.') return setAmount((a) => (a.includes('.') ? a : (a === '' ? '0.' : a + '.')));
    setAmount((a) => (a.length >= 8 || (a === '0' && k !== '.') ? (a === '0' ? k : a) : a + k));
  };

  const startTransfer = () => { setContact(null); setAmount(''); setCurrency('EUR'); setScreen('contacts'); };

  const submit = () => {
    if (total * RATE[currency] > balance) {
      setScreen('error');
    } else {
      setBalance((b) => b - total * RATE[currency]);
      setScreen('success');
    }
  };

  const titles: Partial<Record<Screen, string>> = {
    contacts: 'Recipient', amount: 'Amount', review: 'Check', confirm: 'Authorization', history: 'Activity', profile: 'Account',
  };
  const backTo: Partial<Record<Screen, Screen>> = { contacts: 'home', amount: 'contacts', review: 'amount', confirm: 'review', history: 'home', profile: 'home' };

  const Header = () => (
    <div className="flex items-center" style={{ height: 52, padding: '0 14px', background: '#3b3f9e', color: '#fff', gap: 8 }}>
      {backTo[screen] && (
        <button onClick={() => setScreen(backTo[screen]!)} style={{ outline: 'none', color: '#d9dcf5' }}><ChevronLeft size={20} /></button>
      )}
      <span style={{ fontSize: 16, fontWeight: 600 }}>{titles[screen] ?? 'PayNow'}</span>
    </div>
  );

  const Home_ = () => (
    <div style={{ padding: 16 }}>
      <div style={{ background: '#3b3f9e', borderRadius: 14, padding: '18px 18px 16px', color: '#fff' }}>
        <div style={{ fontSize: 11, color: '#aeb2e4' }}>Available</div>
        <div className="flex items-center" style={{ gap: 10, marginTop: 4 }}>
          <span style={{ fontSize: 28, fontWeight: 600 }}>{showBalance ? fmt(balance) : '•••••'}</span>
          <span style={{ fontSize: 13, color: '#aeb2e4' }}>MAD</span>
          <button onClick={() => setShowBalance((v) => !v)} style={{ marginLeft: 'auto', outline: 'none', color: '#aeb2e4' }}>
            {showBalance ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <div className="flex" style={{ gap: 8, marginTop: 14 }}>
        {[
          { l: 'Pay', go: () => setScreen('history') },
          { l: 'Transfer', go: startTransfer },
          { l: 'Top up', go: () => setScreen('profile') },
        ].map((a) => (
          <button key={a.l} onClick={a.go} style={{ ...btn, height: 40, fontSize: 13, flex: 1 }}>{a.l}</button>
        ))}
      </div>

      <div style={{ fontSize: 12, color: '#9aa0b4', margin: '18px 0 6px' }}>Recent</div>
      {RECENT.map((r) => (
        <div key={r.who + r.when} className="flex items-center" style={{ gap: 10, padding: '9px 0', borderBottom: '1px solid #eef0f5' }}>
          <Avatar name={r.who} size={30} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: '#3a3f55' }}>{r.who}</div>
            <div style={{ fontSize: 10, color: '#b3b8c8' }}>{r.when}</div>
          </div>
          <span style={{ fontSize: 13, color: r.out ? '#cf5b5b' : '#4aa36e' }}>{r.amount}</span>
        </div>
      ))}
    </div>
  );

  const Contacts_ = () => (
    <div className="overflow-y-auto" style={{ height: '100%' }}>
      {CONTACTS.map((c) => (
        <button
          key={c.phone + c.name}
          onClick={() => { setContact(c); setScreen('amount'); }}
          className="flex items-center w-full text-left"
          style={{ gap: 10, padding: '8px 16px', borderBottom: '1px solid #f1f2f7', outline: 'none' }}
        >
          <Avatar name={c.name} />
          <span style={{ flex: 1, fontSize: 14, color: '#3a3f55' }}>{c.name}</span>
          <span style={{ fontSize: 10, color: '#c0c4d2' }}>{c.phone.slice(-7)}</span>
        </button>
      ))}
    </div>
  );

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '<'];
  const Amount_ = () => (
    <div style={{ padding: 16 }}>
      <div className="flex items-center" style={{ gap: 8, fontSize: 12, color: '#9aa0b4' }}>
        <Avatar name={contact?.name ?? ''} size={24} />
        <span>{contact?.name}</span>
      </div>
      <div className="flex items-end justify-center" style={{ gap: 8, margin: '26px 0 10px', height: 60 }}>
        <span style={{ fontSize: 44, fontWeight: 500, color: '#3a3f55' }}>{amount === '' ? '0' : amount}</span>
        <label className="relative" style={{ marginBottom: 8 }}>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            style={{ fontSize: 11, color: '#9aa0b4', background: '#f1f2f7', border: 'none', borderRadius: 4, padding: '3px 4px', outline: 'none' }}
          >
            {(['EUR', 'USD', 'MAD', 'GBP', 'AED'] as Currency[]).map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
      </div>
      <div style={{ fontSize: 10, color: '#c0c4d2', textAlign: 'center', marginBottom: 14 }}>Daily limit 20 000</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 54px)', gap: 3, margin: '0 auto', width: 168 }}>
        {keys.map((k) => (
          <button key={k} onClick={() => press(k)} style={{ height: 32, fontSize: 13, background: '#eef0f6', color: '#4a4f6a', borderRadius: 4, outline: 'none' }}>
            {k === '<' ? '⌫' : k}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 24 }}>
        <button onClick={() => value > 0 && setScreen('review')} style={{ ...btn, width: '100%' }}>Proceed</button>
      </div>
    </div>
  );

  const Row: React.FC<{ k: string; v: string; hint?: boolean }> = ({ k, v, hint }) => (
    <div className="flex justify-between" style={{ padding: '11px 0', borderBottom: '1px solid #eef0f5' }}>
      <span style={{ fontSize: 12, color: '#9aa0b4' }}>{k}</span>
      <span style={{ fontSize: hint ? 11 : 13, color: hint ? '#b3b8c8' : '#3a3f55' }}>{v}</span>
    </div>
  );

  const Review_ = () => (
    <div style={{ padding: 16 }}>
      <Row k="To" v={contact?.name ?? ''} />
      <Row k="Number" v={contact?.phone ?? ''} />
      <Row k="Amount" v={`${fmt(value)} ${currency}`} />
      <Row k="Fees" v="calculated at next step" hint />
      <div className="flex" style={{ gap: 10, marginTop: 36 }}>
        <button onClick={startTransfer} style={btn}>Cancel</button>
        <button onClick={() => setScreen('confirm')} style={btn}>Confirm</button>
      </div>
    </div>
  );

  const Confirm_ = () => (
    <div style={{ padding: 16 }}>
      <Row k="To" v={contact?.name ?? ''} />
      <Row k="Amount" v={`${fmt(value)} ${currency}`} />
      <Row k="Fees" v={`${fmt(fee)} ${currency}`} />
      <Row k="Total debited" v={`${fmt(total)} ${currency}`} />
      <div className="flex" style={{ gap: 10, marginTop: 36 }}>
        <button onClick={submit} style={btn}>Confirm</button>
        <button onClick={startTransfer} style={btn}>Cancel</button>
      </div>
    </div>
  );

  const Success_ = () => (
    <div className="flex flex-col items-center" style={{ padding: '120px 24px 0' }}>
      <div style={{ fontSize: 16, color: '#3a3f55' }}>Transfer completed</div>
      <button onClick={() => setScreen('home')} style={{ ...btn, flex: 'none', width: 110, marginTop: 40 }}>OK</button>
    </div>
  );

  const Error_ = () => (
    <div className="flex flex-col items-center" style={{ padding: '120px 24px 0' }}>
      <div style={{ fontSize: 16, color: '#3a3f55' }}>Transaction failed (E-2210)</div>
      <button onClick={() => setScreen('home')} style={{ ...btn, flex: 'none', width: 110, marginTop: 40 }}>OK</button>
    </div>
  );

  const History_ = () => (
    <div style={{ padding: 16 }}>
      {[...RECENT, ...RECENT].map((r, i) => (
        <div key={i} className="flex items-center" style={{ gap: 10, padding: '9px 0', borderBottom: '1px solid #eef0f5' }}>
          <Avatar name={r.who} size={30} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: '#3a3f55' }}>{r.who}</div>
            <div style={{ fontSize: 10, color: '#b3b8c8' }}>{r.when}</div>
          </div>
          <span style={{ fontSize: 13, color: r.out ? '#cf5b5b' : '#4aa36e' }}>{r.amount}</span>
        </div>
      ))}
    </div>
  );

  const Profile_ = () => (
    <div style={{ padding: 16 }}>
      <Row k="Name" v="Ahmed Zniber" />
      <Row k="Wallet" v="PN-4471-0092-8835" />
      <Row k="Default currency" v="EUR" />
      <Row k="Limits" v="20 000 / day" />
      <Row k="Fee schedule" v="1.5% (min. 5)" hint />
    </div>
  );

  const body = {
    home: Home_(), contacts: Contacts_(), amount: Amount_(), review: Review_(), confirm: Confirm_(),
    success: Success_(), error: Error_(), history: History_(), profile: Profile_(),
  }[screen];

  const tab = (icon: React.ReactNode, go: () => void, active: boolean) => (
    <button onClick={go} className="flex-1 flex items-center justify-center" style={{ color: active ? '#3b3f9e' : '#b3b8c8', outline: 'none' }}>{icon}</button>
  );

  return (
    <div className="w-[1280px] h-[800px] relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#e8ecf6,#f4eef7)', fontFamily: 'Segoe UI, Roboto, Arial, sans-serif' }}>
      <div
        className="absolute flex flex-col overflow-hidden"
        style={{ left: 445, top: 10, width: 390, height: 780, borderRadius: 36, background: '#fff', boxShadow: '0 0 0 8px #20223a, 0 20px 50px rgba(30,30,70,0.25)' }}
      >
        {/* status bar */}
        <div className="flex items-center justify-between" style={{ height: 28, padding: '0 22px', background: '#3b3f9e', color: '#fff', fontSize: 11 }}>
          <span>16:42</span>
          <span className="flex items-center" style={{ gap: 5 }}><Signal size={11} /><Wifi size={11} /><Battery size={13} /></span>
        </div>
        {Header()}
        <div className="relative flex-1 overflow-hidden" style={{ background: '#fff' }}>{body}</div>
        <div className="flex" style={{ height: 56, borderTop: '1px solid #eef0f5', background: '#fff' }}>
          {tab(<Home size={22} />, () => setScreen('home'), screen === 'home')}
          {tab(<ArrowLeftRight size={22} />, startTransfer, ['contacts', 'amount', 'review', 'confirm'].includes(screen))}
          {tab(<Clock size={22} />, () => setScreen('history'), screen === 'history')}
          {tab(<User size={22} />, () => setScreen('profile'), screen === 'profile')}
        </div>
      </div>
    </div>
  );
};
