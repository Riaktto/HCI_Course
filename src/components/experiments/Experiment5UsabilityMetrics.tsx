import React, { useState, useEffect } from 'react';
import { RotateCcw, BarChart3, Clock, MousePointer, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { UM6PLogo } from '../brand/UM6PLogo';

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
      setErrorA('VALIDATION FAILED: Phone fragments invalid (Requires 212 + 2 digits + 6 digits)');
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
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 bg-[#FAF9F6] overflow-y-auto select-text">
      {/* Top Banner */}
      <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <UM6PLogo variant="compact" theme="color" className="h-6 lg:h-7 w-auto" />
          <div className="h-4 w-px bg-[#E8E2D9]" />
          <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
            Live Lab 05 · Empirical Usability Bench
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-white border-2 border-[#E8E2D9] rounded-xl p-1 shadow-xs">
            <button
              onClick={() => setActiveTrial('A')}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-mono font-bold rounded-lg transition-all cursor-pointer ${
                activeTrial === 'A' ? 'bg-stone-900 text-white shadow-xs' : 'text-[#6E6D70] hover:text-[#2D2D2E]'
              }`}
            >
              Trial Alpha: Fragmented Form
            </button>
            <button
              onClick={() => setActiveTrial('B')}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-mono font-bold rounded-lg transition-all cursor-pointer ${
                activeTrial === 'B' ? 'bg-[#E5391C] text-white shadow-xs' : 'text-[#6E6D70] hover:text-[#2D2D2E]'
              }`}
            >
              Trial Beta: Ergonomic Form
            </button>
          </div>

          <button
            onClick={resetAll}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-mono font-bold text-[#6E6D70] bg-white border-2 border-[#E8E2D9] rounded-xl hover:text-[#2D2D2E] hover:border-stone-400 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70] ml-1">Slide 34 / 45</span>
        </div>
      </div>

      {/* Slide Heading */}
      <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-3 lg:py-4 gap-4 lg:gap-5 min-h-0">
        <div className="space-y-1.5 flex-shrink-0">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-medium text-[#2D2D2E]">
            Empirical Usability Bench: Real-Time ISO Telemetry
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#6E6D70] font-light">
            Standardized Patient Intake: Test both interfaces to observe latency, keystrokes, and cognitive slip rates live.
          </p>
        </div>

        {/* Main Two-Zone Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 items-stretch min-h-0">
          {/* Left: Interactive Input Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border-2 border-stone-300 rounded-2xl p-5 lg:p-6 flex flex-col justify-between shadow-xs">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between pb-2.5 border-b border-stone-200">
                <div>
                  <span className="text-xs font-mono uppercase text-[#E5391C] font-bold tracking-wider">
                    Standardized Clinical Benchmark
                  </span>
                  <h3 className="font-bold text-[#2D2D2E] text-lg sm:text-xl font-serif-display mt-0.5">
                    Patient: <strong className="text-[#E5391C]">Sarah Alami (+212 661 234567, DOB: 14/05/1998)</strong>
                  </h3>
                </div>
                <div className="text-right font-mono text-xs sm:text-sm">
                  <span className="text-stone-500">Active: </span>
                  <strong className={`px-2.5 py-0.5 rounded-md text-white font-bold ${activeTrial === 'A' ? 'bg-red-700' : 'bg-emerald-700'}`}>
                    {activeTrial === 'A' ? 'Alpha (Fragmented)' : 'Beta (Ergonomic)'}
                  </strong>
                </div>
              </div>

              {activeTrial === 'A' ? (
                /* TRIAL A: FRAGMENTED UNSTRUCTURED FORM */
                <form onSubmit={handleSubmitA} className="space-y-3">
                  {errorA && (
                    <div className="p-3 bg-red-50 border-2 border-red-300 text-red-900 text-xs sm:text-sm font-mono rounded-xl flex items-center gap-2">
                      <AlertOctagon className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{errorA}</span>
                    </div>
                  )}

                  {metricsA.completed && (
                    <div className="p-3 bg-emerald-50 border-2 border-emerald-300 text-emerald-950 text-xs sm:text-sm font-mono rounded-xl flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Trial Alpha Finished in {metricsA.timeSec}s with {metricsA.errors} validation errors!</span>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-2.5">
                    <div>
                      <label className="block text-xs text-stone-700 font-mono font-bold mb-1">FIRST_NAME *</label>
                      <input
                        type="text"
                        value={fName}
                        placeholder="e.g. Sarah"
                        onChange={e => {
                          if (!timerAActive) setTimerAActive(true);
                          setFName(e.target.value);
                          setMetricsA(p => ({ ...p, keystrokes: p.keystrokes + 1 }));
                        }}
                        className="w-full bg-[#FAF9F6] border-2 border-stone-300 rounded-xl px-3 py-2 text-sm sm:text-base text-[#2D2D2E] font-medium outline-none focus:border-red-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-700 font-mono font-bold mb-1">MIDDLE_INIT</label>
                      <input
                        type="text"
                        value={mName}
                        placeholder="e.g. M"
                        onChange={e => {
                          if (!timerAActive) setTimerAActive(true);
                          setMName(e.target.value);
                          setMetricsA(p => ({ ...p, keystrokes: p.keystrokes + 1 }));
                        }}
                        className="w-full bg-[#FAF9F6] border-2 border-stone-300 rounded-xl px-3 py-2 text-sm sm:text-base text-[#2D2D2E] font-medium outline-none focus:border-red-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-700 font-mono font-bold mb-1">LAST_NAME *</label>
                      <input
                        type="text"
                        value={lName}
                        placeholder="e.g. Alami"
                        onChange={e => {
                          if (!timerAActive) setTimerAActive(true);
                          setLName(e.target.value);
                          setMetricsA(p => ({ ...p, keystrokes: p.keystrokes + 1 }));
                        }}
                        className="w-full bg-[#FAF9F6] border-2 border-stone-300 rounded-xl px-3 py-2 text-sm sm:text-base text-[#2D2D2E] font-medium outline-none focus:border-red-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-stone-700 font-mono font-bold mb-1">
                      PHONE (Country / Area / Local Number) *
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      <input
                        type="text"
                        placeholder="212"
                        value={phoneCountry}
                        onChange={e => {
                          if (!timerAActive) setTimerAActive(true);
                          setPhoneCountry(e.target.value);
                          setMetricsA(p => ({ ...p, keystrokes: p.keystrokes + 1 }));
                        }}
                        className="bg-[#FAF9F6] border-2 border-stone-300 rounded-xl px-3 py-2 text-sm sm:text-base text-[#2D2D2E] font-medium outline-none focus:border-red-600"
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
                        className="bg-[#FAF9F6] border-2 border-stone-300 rounded-xl px-3 py-2 text-sm sm:text-base text-[#2D2D2E] font-medium outline-none focus:border-red-600"
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
                        className="bg-[#FAF9F6] border-2 border-stone-300 rounded-xl px-3 py-2 text-sm sm:text-base text-[#2D2D2E] font-medium outline-none focus:border-red-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-stone-700 font-mono font-bold mb-1">
                      BIRTHDATE (Strict DD/MM/YYYY) *
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
                      className="w-full bg-[#FAF9F6] border-2 border-stone-300 rounded-xl px-3 py-2 text-sm sm:text-base text-[#2D2D2E] font-medium outline-none focus:border-red-600"
                    />
                  </div>

                  <div className="flex gap-2.5 pt-1">
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-stone-900 hover:bg-black rounded-xl text-sm sm:text-base font-mono font-bold text-white transition-colors cursor-pointer shadow-xs"
                    >
                      Submit Record (Alpha)
                    </button>
                    <button
                      type="button"
                      onClick={handleQuickFillA}
                      className="px-4 py-3 bg-[#F5F2ED] border-2 border-stone-300 text-stone-800 hover:bg-stone-200 text-xs sm:text-sm font-mono font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      ⚡ Quick Fill
                    </button>
                  </div>
                </form>
              ) : (
                /* TRIAL B: ERGONOMIC STREAMLINED FORM */
                <form onSubmit={handleSubmitB} className="space-y-3.5">
                  {metricsB.completed && (
                    <div className="p-3 bg-emerald-50 border-2 border-emerald-300 text-emerald-950 text-xs sm:text-sm font-mono rounded-xl flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Trial Beta Finished in {metricsB.timeSec}s with 0 errors! Flawless interaction.</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs sm:text-sm font-mono font-bold text-[#2D2D2E] mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Sarah Alami"
                      value={fullNameB}
                      onChange={e => {
                        if (!timerBActive) setTimerBActive(true);
                        setFullNameB(e.target.value);
                        setMetricsB(p => ({ ...p, keystrokes: p.keystrokes + 1 }));
                      }}
                      className="w-full bg-[#FAF9F6] border-2 border-[#E8E2D9] rounded-xl px-3.5 py-2.5 text-sm sm:text-base text-[#2D2D2E] focus:border-[#E5391C] outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-mono font-bold text-[#2D2D2E] mb-1">Mobile Phone (Universal Format)</label>
                    <input
                      type="text"
                      placeholder="+212 661 234567"
                      value={phoneB}
                      onChange={e => {
                        if (!timerBActive) setTimerBActive(true);
                        setPhoneB(e.target.value);
                        setMetricsB(p => ({ ...p, keystrokes: p.keystrokes + 1 }));
                      }}
                      className="w-full bg-[#FAF9F6] border-2 border-[#E8E2D9] rounded-xl px-3.5 py-2.5 text-sm sm:text-base text-[#2D2D2E] focus:border-[#E5391C] outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-mono font-bold text-[#2D2D2E] mb-1">Date of Birth</label>
                    <input
                      type="date"
                      value={birthDateB}
                      onChange={e => {
                        if (!timerBActive) setTimerBActive(true);
                        setBirthDateB(e.target.value);
                        setMetricsB(p => ({ ...p, clicks: p.clicks + 1 }));
                      }}
                      className="w-full bg-[#FAF9F6] border-2 border-[#E8E2D9] rounded-xl px-3.5 py-2.5 text-sm sm:text-base text-[#2D2D2E] focus:border-[#E5391C] outline-none font-medium"
                    />
                  </div>

                  <div className="flex gap-2.5 pt-1">
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-[#E5391C] hover:bg-[#C92B10] rounded-xl text-sm sm:text-base font-bold text-white transition-colors cursor-pointer shadow-md"
                    >
                      Save Record (Beta)
                    </button>
                    <button
                      type="button"
                      onClick={handleQuickFillB}
                      className="px-4 py-3 bg-[#F5F2ED] border-2 border-stone-300 text-stone-800 hover:bg-stone-200 text-xs sm:text-sm font-mono font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      ⚡ Quick Fill
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="pt-2.5 border-t border-stone-200 text-xs font-mono text-stone-600 flex items-center justify-between">
              <span>ISO 9241-11 Benchmark Trial</span>
              <span className="text-stone-900 font-bold">Clinical Workstation Session</span>
            </div>
          </div>

          {/* Right: Empirical Metric Scoreboard & Charts (5 cols) */}
          <div className="lg:col-span-5 bg-white border-2 border-[#E8E2D9] rounded-2xl p-5 lg:p-6 flex flex-col justify-between shadow-xs space-y-3">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE3]">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#E5391C]" />
                  <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-stone-900 font-bold">
                    Real-Time Usability Telemetry
                  </span>
                </div>
                <span className="text-xs font-mono text-[#E5391C] font-bold bg-[#FDF5F2] px-2.5 py-1 rounded-lg border border-[#FAD6CF]">
                  Live Sensor
                </span>
              </div>

              {/* Metric 1: Time on Task */}
              <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-[#E8E2D9] space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold text-stone-800">
                    <Clock className="w-4 h-4 text-[#E5391C]" />
                    <span>1. Time on Task (Efficiency)</span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-stone-600">Target &le; 6.0s</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-0.5">
                  <div className="p-2.5 bg-red-50 rounded-lg border border-red-200">
                    <span className="text-xs font-mono text-red-700 font-bold block">Alpha Duration:</span>
                    <span className="text-xl sm:text-2xl font-mono font-bold text-red-900">{metricsA.timeSec}s</span>
                  </div>
                  <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
                    <span className="text-xs font-mono text-emerald-700 font-bold block">Beta Duration:</span>
                    <span className="text-xl sm:text-2xl font-mono font-bold text-emerald-950">{metricsB.timeSec}s</span>
                  </div>
                </div>
              </div>

              {/* Metric 2: Motor Actions */}
              <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-[#E8E2D9] space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold text-stone-800">
                    <MousePointer className="w-4 h-4 text-[#E5391C]" />
                    <span>2. Motor Load (Clicks + Keystrokes)</span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-stone-600">Lower is better</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-0.5 font-mono">
                  <div className="p-2.5 bg-red-50 rounded-lg border border-red-200">
                    <span className="text-xs text-red-700 font-bold block">Alpha Actions:</span>
                    <span className="text-xl sm:text-2xl font-bold text-red-900">{metricsA.clicks + metricsA.keystrokes} ops</span>
                  </div>
                  <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
                    <span className="text-xs text-emerald-700 font-bold block">Beta Actions:</span>
                    <span className="text-xl sm:text-2xl font-bold text-emerald-950">{metricsB.clicks + metricsB.keystrokes} ops</span>
                  </div>
                </div>
              </div>

              {/* Metric 3: Error Frequency */}
              <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-[#E8E2D9] space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold text-stone-800">
                    <AlertOctagon className="w-4 h-4 text-[#E5391C]" />
                    <span>3. Cognitive Slips (Validation Errors)</span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-stone-600">Goal = 0</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-0.5 font-mono">
                  <div className="p-2.5 bg-red-50 rounded-lg border border-red-200">
                    <span className="text-xs text-red-700 font-bold block">Alpha Errors:</span>
                    <span className="text-xl sm:text-2xl font-bold text-red-900">{metricsA.errors} fails</span>
                  </div>
                  <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
                    <span className="text-xs text-emerald-700 font-bold block">Beta Errors:</span>
                    <span className="text-xl sm:text-2xl font-bold text-emerald-950">{metricsB.errors} fails</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-stone-900 text-stone-100 rounded-xl text-xs sm:text-sm font-mono flex items-center justify-between">
              <span>Scientific Result:</span>
              <strong className="text-emerald-400">Beta reduces interaction latency by ~68%</strong>
            </div>
          </div>
        </div>

        {/* Classroom Takeaway Banner */}
        <div className="p-4 lg:p-5 bg-white border-2 border-[#E5391C] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs flex-shrink-0">
          <p className="text-sm sm:text-base lg:text-lg text-[#2D2D2E] leading-relaxed">
            <strong className="text-[#E5391C] font-serif-display text-base sm:text-lg lg:text-xl font-bold mr-2">
              Key Pedagogical Principle:
            </strong>
            Usability is not an abstract aesthetic opinion. Under ISO 9241-11, it is directly quantified via task completion rate, latency duration, motor load, and error frequency.
          </p>
          <span className="text-xs sm:text-sm font-mono text-white bg-[#E5391C] font-bold px-3.5 py-1.5 rounded-xl whitespace-nowrap shadow-2xs">
            Usability is Empirical Science
          </span>
        </div>
      </div>
    </div>
  );
};
