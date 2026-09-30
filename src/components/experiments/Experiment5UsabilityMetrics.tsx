import React, { useState, useEffect } from 'react';
import { RotateCcw, BarChart3 } from 'lucide-react';

interface BenchMetrics {
  timeSec: number;
  clicks: number;
  keystrokes: number;
  errors: number;
  completed: boolean;
}

export const Experiment5UsabilityMetrics: React.FC = () => {
  const [activeTrial, setActiveTrial] = useState<'A' | 'B'>('A');

  // Trial A States (Fragmented legacy form)
  const [fName, setFName] = useState('');
  const [mName, setMName] = useState('');
  const [lName, setLName] = useState('');
  const [phoneCountry, setPhoneCountry] = useState('');
  const [phoneArea, setPhoneArea] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [birthDateA, setBirthDateA] = useState('');
  const [errorA, setErrorA] = useState<string | null>(null);
  const [metricsA, setMetricsA] = useState<BenchMetrics>({
    timeSec: 0,
    clicks: 0,
    keystrokes: 0,
    errors: 0,
    completed: false,
  });
  const [timerAActive, setTimerAActive] = useState(false);

  // Trial B States (Ergonomic form)
  const [fullNameB, setFullNameB] = useState('');
  const [phoneB, setPhoneB] = useState('');
  const [birthDateB, setBirthDateB] = useState('1998-05-14');
  const [metricsB, setMetricsB] = useState<BenchMetrics>({
    timeSec: 0,
    clicks: 0,
    keystrokes: 0,
    errors: 0,
    completed: false,
  });
  const [timerBActive, setTimerBActive] = useState(false);

  // Timer A
  useEffect(() => {
    let interval: any = null;
    if (timerAActive && !metricsA.completed) {
      interval = setInterval(() => {
        setMetricsA(prev => ({ ...prev, timeSec: Number((prev.timeSec + 0.1).toFixed(1)) }));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [timerAActive, metricsA.completed]);

  // Timer B
  useEffect(() => {
    let interval: any = null;
    if (timerBActive && !metricsB.completed) {
      interval = setInterval(() => {
        setMetricsB(prev => ({ ...prev, timeSec: Number((prev.timeSec + 0.1).toFixed(1)) }));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [timerBActive, metricsB.completed]);

  const handleSubmitA = (e: React.FormEvent) => {
    e.preventDefault();
    setMetricsA(p => ({ ...p, clicks: p.clicks + 1 }));

    if (!fName || !lName) {
      setErrorA('ERROR: First and Last Name required');
      setMetricsA(p => ({ ...p, errors: p.errors + 1 }));
      return;
    }
    if (phoneCountry !== '212' || phoneArea.length < 2 || phoneNum.length < 6) {
      setErrorA('VALIDATION FAILED: Phone fragments invalid');
      setMetricsA(p => ({ ...p, errors: p.errors + 1 }));
      return;
    }
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(birthDateA)) {
      setErrorA('DATE FORMAT MISMATCH: Must strictly format DD/MM/YYYY with leading zeros');
      setMetricsA(p => ({ ...p, errors: p.errors + 1 }));
      return;
    }

    setErrorA(null);
    setTimerAActive(false);
    setMetricsA(p => ({ ...p, completed: true }));
  };

  const handleQuickFillA = () => {
    if (!timerAActive) setTimerAActive(true);
    setFName('Sarah');
    setMName('M');
    setLName('Alami');
    setPhoneCountry('212');
    setPhoneArea('66');
    setPhoneNum('123456');
    setBirthDateA('14/05/1998');
    setErrorA(null);
    setMetricsA(p => ({ ...p, clicks: p.clicks + 3, keystrokes: p.keystrokes + 24, completed: true }));
    setTimerAActive(false);
  };

  const handleSubmitB = (e: React.FormEvent) => {
    e.preventDefault();
    setMetricsB(p => ({ ...p, clicks: p.clicks + 1, completed: true }));
    setTimerBActive(false);
  };

  const handleQuickFillB = () => {
    if (!timerBActive) setTimerBActive(true);
    setFullNameB('Sarah Alami');
    setPhoneB('+212 661 234567');
    setBirthDateB('1998-05-14');
    setMetricsB(p => ({ ...p, clicks: p.clicks + 2, keystrokes: p.keystrokes + 18, completed: true }));
    setTimerBActive(false);
  };

  const resetAll = () => {
    setFName('');
    setMName('');
    setLName('');
    setPhoneCountry('');
    setPhoneArea('');
    setPhoneNum('');
    setBirthDateA('');
    setErrorA(null);
    setMetricsA({ timeSec: 0, clicks: 0, keystrokes: 0, errors: 0, completed: false });
    setTimerAActive(false);

    setFullNameB('');
    setPhoneB('');
    setBirthDateB('1998-05-14');
    setMetricsB({ timeSec: 0, clicks: 0, keystrokes: 0, errors: 0, completed: false });
    setTimerBActive(false);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 lg:p-6 bg-[#FAF9F6]">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E8E2D9]">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase font-mono tracking-wider text-white bg-[#D7492A] font-bold px-3 py-1 rounded">
            Live Laboratory Experiment 05
          </span>
          <span className="text-sm font-semibold text-[#2D2D2E]">
            Empirical Usability Bench: Measuring ISO 9241-11 in Real Time
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-white border border-[#E8E2D9] rounded-lg p-0.5 shadow-xs">
            <button
              onClick={() => setActiveTrial('A')}
              className={`px-3 py-1.5 text-xs rounded-md font-medium transition-colors ${
                activeTrial === 'A' ? 'bg-[#2D2D2E] text-white' : 'text-[#6E6D70] hover:text-[#2D2D2E]'
              }`}
            >
              Trial Alpha: Fragmented Form
            </button>
            <button
              onClick={() => setActiveTrial('B')}
              className={`px-3 py-1.5 text-xs rounded-md font-medium transition-colors ${
                activeTrial === 'B' ? 'bg-[#D7492A] text-white' : 'text-[#6E6D70] hover:text-[#2D2D2E]'
              }`}
            >
              Trial Beta: Ergonomic Form
            </button>
          </div>

          <button
            onClick={resetAll}
            className="flex items-center gap-1 px-3 py-1.5 text-xs text-[#6E6D70] bg-white border border-[#E8E2D9] rounded hover:text-[#2D2D2E] hover:bg-[#F5F2ED]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Bench
          </button>
        </div>
      </div>

      {/* Main Two-Zone Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto items-center">
        {/* Left: Interactive Input Form (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E8E2D9] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#F0EBE3]">
            <div>
              <span className="text-xs font-mono uppercase text-[#D7492A] font-bold">Standardized Intake Task</span>
              <h3 className="font-semibold text-[#2D2D2E] text-base font-serif-display mt-0.5">
                Register Patient: <strong className="text-[#D7492A]">Sarah Alami (+212 661 234567)</strong>
              </h3>
            </div>
            <div className="text-right font-mono text-xs">
              <span className="text-[#6E6D70]">Current Trial: </span>
              <strong className={activeTrial === 'A' ? 'text-red-600' : 'text-emerald-600'}>
                {activeTrial === 'A' ? 'Design Alpha' : 'Design Beta'}
              </strong>
            </div>
          </div>

          {activeTrial === 'A' ? (
            /* TRIAL A: FRAGMENTED UNSTRUCTURED FORM */
            <form onSubmit={handleSubmitA} className="space-y-3">
              {errorA && (
                <div className="p-2.5 bg-red-50 border border-red-200 text-red-800 text-xs font-mono rounded-lg">
                  {errorA}
                </div>
              )}

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] text-[#6E6D70] font-mono font-semibold">FIRST_NAME *</label>
                  <input
                    type="text"
                    value={fName}
                    placeholder="e.g. Sarah"
                    onChange={e => {
                      if (!timerAActive) setTimerAActive(true);
                      setFName(e.target.value);
                      setMetricsA(p => ({ ...p, keystrokes: p.keystrokes + 1 }));
                    }}
                    className="w-full bg-[#FAF9F6] border border-[#D5CFC7] rounded-lg px-2.5 py-1.5 text-xs text-[#2D2D2E]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#6E6D70] font-mono font-semibold">MIDDLE_INIT</label>
                  <input
                    type="text"
                    value={mName}
                    onChange={e => {
                      if (!timerAActive) setTimerAActive(true);
                      setMName(e.target.value);
                      setMetricsA(p => ({ ...p, keystrokes: p.keystrokes + 1 }));
                    }}
                    className="w-full bg-[#FAF9F6] border border-[#D5CFC7] rounded-lg px-2.5 py-1.5 text-xs text-[#2D2D2E]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#6E6D70] font-mono font-semibold">LAST_NAME *</label>
                  <input
                    type="text"
                    value={lName}
                    placeholder="e.g. Alami"
                    onChange={e => {
                      if (!timerAActive) setTimerAActive(true);
                      setLName(e.target.value);
                      setMetricsA(p => ({ ...p, keystrokes: p.keystrokes + 1 }));
                    }}
                    className="w-full bg-[#FAF9F6] border border-[#D5CFC7] rounded-lg px-2.5 py-1.5 text-xs text-[#2D2D2E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-[#6E6D70] font-mono font-semibold mb-1">
                  PHONE (Split: Country / Area / Local) *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="212"
                    value={phoneCountry}
                    onChange={e => {
                      if (!timerAActive) setTimerAActive(true);
                      setPhoneCountry(e.target.value);
                      setMetricsA(p => ({ ...p, keystrokes: p.keystrokes + 1 }));
                    }}
                    className="bg-[#FAF9F6] border border-[#D5CFC7] rounded-lg px-2.5 py-1.5 text-xs text-[#2D2D2E]"
                  />
                  <input
                    type="text"
                    placeholder="66"
                    value={phoneArea}
                    onChange={e => {
                      if (!timerAActive) setTimerAActive(true);
                      setPhoneArea(e.target.value);
                      setMetricsA(p => ({ ...p, keystrokes: p.keystrokes + 1 }));
                    }}
                    className="bg-[#FAF9F6] border border-[#D5CFC7] rounded-lg px-2.5 py-1.5 text-xs text-[#2D2D2E]"
                  />
                  <input
                    type="text"
                    placeholder="123456"
                    value={phoneNum}
                    onChange={e => {
                      if (!timerAActive) setTimerAActive(true);
                      setPhoneNum(e.target.value);
                      setMetricsA(p => ({ ...p, keystrokes: p.keystrokes + 1 }));
                    }}
                    className="bg-[#FAF9F6] border border-[#D5CFC7] rounded-lg px-2.5 py-1.5 text-xs text-[#2D2D2E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-[#6E6D70] font-mono font-semibold mb-1">
                  BIRTHDATE (Type strict DD/MM/YYYY) *
                </label>
                <input
                  type="text"
                  placeholder="14/05/1998"
                  value={birthDateA}
                  onChange={e => {
                    if (!timerAActive) setTimerAActive(true);
                    setBirthDateA(e.target.value);
                    setMetricsA(p => ({ ...p, keystrokes: p.keystrokes + 1 }));
                  }}
                  className="w-full bg-[#FAF9F6] border border-[#D5CFC7] rounded-lg px-2.5 py-1.5 text-xs text-[#2D2D2E]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#2D2D2E] hover:bg-black rounded-lg text-xs font-mono font-medium text-white"
                >
                  Submit Trial A
                </button>
                <button
                  type="button"
                  onClick={handleQuickFillA}
                  className="px-3 py-2.5 bg-[#F5F2ED] border border-[#D5CFC7] text-[#6E6D70] hover:text-[#2D2D2E] text-xs rounded-lg"
                >
                  Quick Fill A
                </button>
              </div>
            </form>
          ) : (
            /* TRIAL B: ERGONOMIC STREAMLINED FORM */
            <form onSubmit={handleSubmitB} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#2D2D2E] mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sarah Alami"
                  value={fullNameB}
                  onChange={e => {
                    if (!timerBActive) setTimerBActive(true);
                    setFullNameB(e.target.value);
                    setMetricsB(p => ({ ...p, keystrokes: p.keystrokes + 1 }));
                  }}
                  className="w-full bg-[#FAF9F6] border border-[#D5CFC7] rounded-xl px-3.5 py-2.5 text-xs text-[#2D2D2E] focus:border-[#D7492A] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D2D2E] mb-1">Mobile Phone (Morocco)</label>
                <input
                  type="text"
                  placeholder="+212 661 234567"
                  value={phoneB}
                  onChange={e => {
                    if (!timerBActive) setTimerBActive(true);
                    setPhoneB(e.target.value);
                    setMetricsB(p => ({ ...p, keystrokes: p.keystrokes + 1 }));
                  }}
                  className="w-full bg-[#FAF9F6] border border-[#D5CFC7] rounded-xl px-3.5 py-2.5 text-xs text-[#2D2D2E] focus:border-[#D7492A] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D2D2E] mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={birthDateB}
                  onChange={e => {
                    if (!timerBActive) setTimerBActive(true);
                    setBirthDateB(e.target.value);
                    setMetricsB(p => ({ ...p, clicks: p.clicks + 1 }));
                  }}
                  className="w-full bg-[#FAF9F6] border border-[#D5CFC7] rounded-xl px-3.5 py-2.5 text-xs text-[#2D2D2E] focus:border-[#D7492A] outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#D7492A] hover:bg-[#B83519] rounded-xl text-xs font-semibold text-white shadow"
                >
                  Save Patient Record
                </button>
                <button
                  type="button"
                  onClick={handleQuickFillB}
                  className="px-3.5 py-3 bg-[#F5F2ED] border border-[#D5CFC7] text-[#6E6D70] hover:text-[#2D2D2E] text-xs rounded-xl"
                >
                  Quick Fill B
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right: Empirical Metric Scoreboard & Charts (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#E8E2D9] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE3]">
            <span className="text-xs font-mono uppercase tracking-wider text-[#6E6D70] font-bold">
              ISO 9241-11 Usability Metrics
            </span>
            <BarChart3 className="w-4 h-4 text-[#D7492A]" />
          </div>

          {/* Comparative Metrics Table */}
          <div className="space-y-3 font-mono text-xs">
            {/* Efficiency: Task Completion Time */}
            <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-[#E8E2D9]">
              <div className="flex justify-between text-[#6E6D70] mb-1.5 text-xs">
                <span>1. Time on Task (Efficiency)</span>
                <span>Lower is better</span>
              </div>
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-red-600 text-xs">Alpha: {metricsA.timeSec}s</span>
                  <div className="w-32 bg-[#E8E2D9] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-red-500 h-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (metricsA.timeSec / 20) * 100)}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#D7492A] text-xs font-bold">Beta: {metricsB.timeSec}s</span>
                  <div className="w-32 bg-[#E8E2D9] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#D7492A] h-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (metricsB.timeSec / 20) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Keystrokes & Motor Effort */}
            <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-[#E8E2D9]">
              <div className="flex justify-between text-[#6E6D70] mb-1 text-xs">
                <span>2. Motor Actions (Keystrokes + Clicks)</span>
                <span>Cognitive effort</span>
              </div>
              <div className="flex justify-between text-[#2D2D2E] pt-1">
                <span className="text-red-600">Alpha: {metricsA.keystrokes + metricsA.clicks} actions</span>
                <span className="text-[#D7492A] font-bold">Beta: {metricsB.keystrokes + metricsB.clicks} actions</span>
              </div>
            </div>

            {/* Error Rate */}
            <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-[#E8E2D9]">
              <div className="flex justify-between text-[#6E6D70] mb-1 text-xs">
                <span>3. Error Rate (Cognitive Slips)</span>
                <span>Fails / retries</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-red-600 font-bold">{metricsA.errors} errors registered</span>
                <span className="text-emerald-700 font-bold">{metricsB.errors} errors registered</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Classroom Takeaway Banner */}
      <div className="p-4 bg-white border border-[#E8E2D9] rounded-xl flex items-center justify-between shadow-xs">
        <p className="text-xs text-[#2D2D2E] leading-relaxed">
          <strong className="text-[#D7492A] font-serif-display text-base font-bold mr-1">Key Pedagogical Principle:</strong> Usability is
          not an abstract matters-of-opinion aesthetic. Under ISO 9241-11, it is directly quantified via task completion
          rate, duration, error rate, and cognitive workload.
        </p>
        <span className="text-xs font-mono text-white bg-[#D7492A] font-bold px-3 py-1 rounded ml-4 whitespace-nowrap">
          Usability is Empirical Science
        </span>
      </div>
    </div>
  );
};
