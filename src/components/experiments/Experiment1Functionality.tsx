import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, RotateCcw, Clock, MousePointer, ShieldAlert, Train } from 'lucide-react';

interface MetricState {
  timeSec: number;
  clicks: number;
  errors: number;
  completed: boolean;
}

export const Experiment1Functionality: React.FC = () => {
  // Mode selection & Prediction
  const [prediction, setPrediction] = useState<'A' | 'B' | null>(null);

  // Interface A State (Legacy System-Centric)
  const [termDep, setTermDep] = useState('');
  const [termArr, setTermArr] = useState('');
  const [termDate, setTermDate] = useState('');
  const [termSeat, setTermSeat] = useState('');
  const [errorA, setErrorA] = useState<string | null>(null);
  const [metricsA, setMetricsA] = useState<MetricState>({ timeSec: 0, clicks: 0, errors: 0, completed: false });
  const [isTimerRunningA, setIsTimerRunningA] = useState(false);

  // Interface B State (Human-Centered)
  const [depCity, setDepCity] = useState<'Casa Voyageurs' | 'Rabat Ville'>('Casa Voyageurs');
  const [arrCity, setArrCity] = useState<'Benguerir UM6P' | 'Marrakech'>('Benguerir UM6P');
  const [travelDay, setTravelDay] = useState<'Today' | 'Tomorrow' | 'Friday'>('Today');
  const [selectedSeat, setSelectedSeat] = useState<string | null>('14A');
  const [metricsB, setMetricsB] = useState<MetricState>({ timeSec: 0, clicks: 0, errors: 0, completed: false });
  const [isTimerRunningB, setIsTimerRunningB] = useState(false);

  // Timer effect for Interface A
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunningA && !metricsA.completed) {
      interval = setInterval(() => {
        setMetricsA(prev => ({ ...prev, timeSec: Number((prev.timeSec + 0.1).toFixed(1)) }));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isTimerRunningA, metricsA.completed]);

  // Timer effect for Interface B
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunningB && !metricsB.completed) {
      interval = setInterval(() => {
        setMetricsB(prev => ({ ...prev, timeSec: Number((prev.timeSec + 0.1).toFixed(1)) }));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isTimerRunningB, metricsB.completed]);

  const handleStartA = () => {
    setIsTimerRunningA(true);
    setMetricsA(prev => ({ ...prev, clicks: prev.clicks + 1 }));
  };

  const handleStartB = () => {
    setIsTimerRunningB(true);
    setMetricsB(prev => ({ ...prev, clicks: prev.clicks + 1 }));
  };

  const handleSubmitA = (e: React.FormEvent) => {
    e.preventDefault();
    setMetricsA(prev => ({ ...prev, clicks: prev.clicks + 1 }));

    // Strict validation traps
    if (termDep !== 'DEP_CASAVOY_101') {
      setErrorA('CRITICAL SQL-SYNTAX ERROR 401: Invalid departure node code');
      setMetricsA(prev => ({ ...prev, errors: prev.errors + 1 }));
      return;
    }
    if (termArr !== 'ARR_BENGUERIR_04') {
      setErrorA('FOREIGN KEY CONSTRAINT FAILS: Destination unrecognized');
      setMetricsA(prev => ({ ...prev, errors: prev.errors + 1 }));
      return;
    }
    const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
    if (!isoRegex.test(termDate)) {
      setErrorA('PARSING EXCEPTION: Format must strictly match YYYY-MM-DDTHH:mm:ssZ');
      setMetricsA(prev => ({ ...prev, errors: prev.errors + 1 }));
      return;
    }
    if (!termSeat || termSeat.trim().length < 5) {
      setErrorA('BUFFER OVERFLOW: Incomplete raw seat identifier index');
      setMetricsA(prev => ({ ...prev, errors: prev.errors + 1 }));
      return;
    }

    // Success
    setErrorA(null);
    setIsTimerRunningA(false);
    setMetricsA(prev => ({ ...prev, completed: true }));
  };

  const handleQuickFillAValid = () => {
    if (!isTimerRunningA) setIsTimerRunningA(true);
    setTermDep('DEP_CASAVOY_101');
    setTermArr('ARR_BENGUERIR_04');
    setTermDate('2026-10-15T08:30:00Z');
    setTermSeat('C02-S19-ND');
    setErrorA(null);
    setMetricsA(prev => ({ ...prev, clicks: prev.clicks + 1 }));
  };

  const handleSubmitB = () => {
    setMetricsB(prev => ({ ...prev, clicks: prev.clicks + 1, completed: true }));
    setIsTimerRunningB(false);
  };

  const handleReset = () => {
    setTermDep('');
    setTermArr('');
    setTermDate('');
    setTermSeat('');
    setErrorA(null);
    setMetricsA({ timeSec: 0, clicks: 0, errors: 0, completed: false });
    setIsTimerRunningA(false);

    setDepCity('Casa Voyageurs');
    setArrCity('Benguerir UM6P');
    setTravelDay('Today');
    setSelectedSeat('14A');
    setMetricsB({ timeSec: 0, clicks: 0, errors: 0, completed: false });
    setIsTimerRunningB(false);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 lg:p-6 bg-[#FAF9F6]">
      {/* Top Banner: Activity & Classroom Prediction */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E8E2D9]">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase font-mono tracking-wider text-white bg-[#D7492A] font-bold px-3 py-1 rounded">
            Live Laboratory Experiment 01
          </span>
          <span className="text-sm font-semibold text-[#2D2D2E]">
            Task: Book an Express Train Seat (Casablanca → Benguerir UM6P Campus)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#6E6D70] font-medium">Classroom Prediction:</span>
          <button
            onClick={() => setPrediction('A')}
            className={`px-3 py-1.5 text-xs rounded font-medium transition-colors ${
              prediction === 'A'
                ? 'bg-[#2D2D2E] text-white'
                : 'bg-white border border-[#E8E2D9] text-[#2D2D2E] hover:bg-[#F5F2ED]'
            }`}
          >
            Vote System A (Dense)
          </button>
          <button
            onClick={() => setPrediction('B')}
            className={`px-3 py-1.5 text-xs rounded font-medium transition-colors ${
              prediction === 'B'
                ? 'bg-[#D7492A] text-white'
                : 'bg-white border border-[#E8E2D9] text-[#2D2D2E] hover:bg-[#F5F2ED]'
            }`}
          >
            Vote System B (Direct)
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1.5 text-xs text-[#6E6D70] bg-white border border-[#E8E2D9] rounded hover:text-[#2D2D2E] hover:bg-[#F5F2ED]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Main Dual Stage Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-auto">
        {/* INTERFACE A: The System-Centric Database Terminal */}
        <div className="bg-white border border-[#E8E2D9] rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#F0EBE3]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <h3 className="font-semibold text-[#2D2D2E] text-lg font-serif-display">Interface A: Legacy DB Terminal</h3>
              </div>
              <span className="text-xs font-mono text-[#6E6D70] bg-[#F5F2ED] px-2 py-0.5 rounded">Model: Backend Reflection</span>
            </div>

            {metricsA.completed ? (
              <div className="py-8 px-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-semibold text-emerald-900 text-base">Transaction Executed Successfully</h4>
                <p className="text-xs text-emerald-700 font-mono">RECORD #0942 WRITTEN TO RELATIONAL DATABASE</p>
                <div className="pt-3 flex justify-center gap-6 text-xs font-mono text-stone-600">
                  <span>Time: <strong>{metricsA.timeSec}s</strong></span>
                  <span>Clicks: <strong>{metricsA.clicks}</strong></span>
                  <span className="text-red-600">Errors: <strong>{metricsA.errors}</strong></span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitA} className="space-y-3">
                {errorA && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-mono flex items-start gap-2 rounded-lg">
                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                    <span>{errorA}</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-[#6E6D70] mb-1 font-semibold">
                      DEP_ORIGIN_ID (Exact Node)
                    </label>
                    <select
                      value={termDep}
                      onChange={e => {
                        setTermDep(e.target.value);
                        if (!isTimerRunningA) handleStartA();
                        else setMetricsA(p => ({ ...p, clicks: p.clicks + 1 }));
                      }}
                      className="w-full bg-[#FAF9F6] border border-[#D5CFC7] rounded-lg px-3 py-2 text-xs text-[#2D2D2E] font-mono focus:border-[#D7492A] outline-none"
                    >
                      <option value="">-- SELECT ID --</option>
                      <option value="DEP_CASAVOY_101">DEP_CASAVOY_101 (Casa Voy)</option>
                      <option value="DEP_CASAPORT_02">DEP_CASAPORT_02 (Casa Port)</option>
                      <option value="DEP_RABAT_AGD_08">DEP_RABAT_AGD_08 (Rabat)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#6E6D70] mb-1 font-semibold">
                      ARR_DEST_ID (Target Foreign Key)
                    </label>
                    <select
                      value={termArr}
                      onChange={e => {
                        setTermArr(e.target.value);
                        if (!isTimerRunningA) handleStartA();
                        else setMetricsA(p => ({ ...p, clicks: p.clicks + 1 }));
                      }}
                      className="w-full bg-[#FAF9F6] border border-[#D5CFC7] rounded-lg px-3 py-2 text-xs text-[#2D2D2E] font-mono focus:border-[#D7492A] outline-none"
                    >
                      <option value="">-- SELECT ID --</option>
                      <option value="ARR_BENGUERIR_04">ARR_BENGUERIR_04 (Benguerir)</option>
                      <option value="ARR_MARR_GUA_99">ARR_MARR_GUA_99 (Marrakech)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#6E6D70] mb-1 font-semibold">
                    DEPARTURE_TIMESTAMP (Strict ISO: YYYY-MM-DDTHH:mm:ssZ)
                  </label>
                  <input
                    type="text"
                    value={termDate}
                    placeholder="e.g. 2026-10-15T08:30:00Z"
                    onChange={e => {
                      setTermDate(e.target.value);
                      if (!isTimerRunningA) handleStartA();
                    }}
                    className="w-full bg-[#FAF9F6] border border-[#D5CFC7] rounded-lg px-3 py-2 text-xs text-[#2D2D2E] font-mono focus:border-[#D7492A] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#6E6D70] mb-1 font-semibold">
                    SEAT_MATRIX_INDEX (Coach-Seat-Class)
                  </label>
                  <input
                    type="text"
                    value={termSeat}
                    placeholder="e.g. C02-S19-ND"
                    onChange={e => {
                      setTermSeat(e.target.value);
                      if (!isTimerRunningA) handleStartA();
                    }}
                    className="w-full bg-[#FAF9F6] border border-[#D5CFC7] rounded-lg px-3 py-2 text-xs text-[#2D2D2E] font-mono focus:border-[#D7492A] outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#2D2D2E] hover:bg-black rounded-lg text-xs font-mono font-medium text-white transition-colors"
                  >
                    POST /api/v1/booking/commit
                  </button>
                  <button
                    type="button"
                    onClick={handleQuickFillAValid}
                    className="px-3 py-2.5 text-xs bg-[#F5F2ED] border border-[#D5CFC7] text-[#6E6D70] hover:text-[#2D2D2E] rounded-lg"
                    title="Auto-fill with correct syntax to test"
                  >
                    Quick Valid
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Telemetry Bar A */}
          <div className="mt-5 pt-3 border-t border-[#F0EBE3] flex items-center justify-between text-xs font-mono text-[#6E6D70]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              Time: <strong className="text-[#2D2D2E]">{metricsA.timeSec}s</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <MousePointer className="w-4 h-4 text-blue-600" />
              Clicks: <strong className="text-[#2D2D2E]">{metricsA.clicks}</strong>
            </span>
            <span className="flex items-center gap-1.5 text-red-600">
              <AlertCircle className="w-4 h-4" />
              Errors: <strong>{metricsA.errors}</strong>
            </span>
          </div>
        </div>

        {/* INTERFACE B: The Human-Centered Intent System */}
        <div className="bg-white border-2 border-[#D7492A] rounded-2xl p-6 flex flex-col justify-between shadow-md relative">
          <div className="absolute top-4 right-4 text-[10px] font-mono text-white bg-[#D7492A] font-bold px-2.5 py-1 rounded">
            UM6P Human-Centered Flow
          </div>

          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#F0EBE3]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h3 className="font-semibold text-[#2D2D2E] text-lg font-serif-display">Interface B: Al Boraq High Speed UX</h3>
              </div>
            </div>

            {metricsB.completed ? (
              <div className="py-8 px-4 bg-[#FDF5F2] border border-[#F0D5CB] rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#D7492A] mx-auto" />
                <h4 className="font-semibold text-[#2D2D2E] text-lg font-serif-display">Seat Confirmed: 14A (Window)</h4>
                <p className="text-sm text-[#6E6D70]">
                  {depCity} → {arrCity} · Al Boraq High Speed Express · {travelDay} at 08:30
                </p>
                <div className="pt-3 flex justify-center gap-6 text-xs font-mono text-stone-600">
                  <span>Time: <strong className="text-[#D7492A]">{metricsB.timeSec}s</strong></span>
                  <span>Clicks: <strong>{metricsB.clicks}</strong></span>
                  <span className="text-emerald-600 font-bold">Errors: 0</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Station Route Selector */}
                <div>
                  <label className="block text-xs text-[#2D2D2E] font-semibold mb-2">Journey Route</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        if (!isTimerRunningB) handleStartB();
                        setDepCity('Casa Voyageurs');
                        setMetricsB(p => ({ ...p, clicks: p.clicks + 1 }));
                      }}
                      className={`flex-1 py-2.5 px-3 text-xs rounded-xl border font-medium text-left transition-all ${
                        depCity === 'Casa Voyageurs'
                          ? 'border-[#D7492A] bg-[#FDF5F2] text-[#D7492A] font-bold shadow-xs'
                          : 'border-[#E8E2D9] bg-white text-[#2D2D2E]'
                      }`}
                    >
                      <div className="text-[10px] text-[#6E6D70] font-normal">From</div>
                      Casablanca Voyageurs
                    </button>

                    <ArrowRight className="w-4 h-4 text-[#6E6D70] shrink-0" />

                    <button
                      onClick={() => {
                        if (!isTimerRunningB) handleStartB();
                        setArrCity('Benguerir UM6P');
                        setMetricsB(p => ({ ...p, clicks: p.clicks + 1 }));
                      }}
                      className={`flex-1 py-2.5 px-3 text-xs rounded-xl border font-medium text-left transition-all ${
                        arrCity === 'Benguerir UM6P'
                          ? 'border-[#D7492A] bg-[#FDF5F2] text-[#D7492A] font-bold shadow-xs'
                          : 'border-[#E8E2D9] bg-white text-[#2D2D2E]'
                      }`}
                    >
                      <div className="text-[10px] text-[#6E6D70] font-normal">To</div>
                      Benguerir (UM6P)
                    </button>
                  </div>
                </div>

                {/* Day Selection */}
                <div>
                  <label className="block text-xs text-[#2D2D2E] font-semibold mb-2">Departure Day</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Today', 'Tomorrow', 'Friday'] as const).map(day => (
                      <button
                        key={day}
                        onClick={() => {
                          if (!isTimerRunningB) handleStartB();
                          setTravelDay(day);
                          setMetricsB(p => ({ ...p, clicks: p.clicks + 1 }));
                        }}
                        className={`py-2 text-xs rounded-lg border font-medium transition-colors ${
                          travelDay === day
                            ? 'border-[#D7492A] bg-[#D7492A] text-white font-semibold'
                            : 'border-[#E8E2D9] bg-white text-[#2D2D2E] hover:bg-[#F5F2ED]'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Seat Selector with visual hint */}
                <div>
                  <label className="block text-xs text-[#2D2D2E] font-semibold mb-2">
                    Select Preferred Seat (Coach 2)
                  </label>
                  <div className="flex gap-2">
                    {[
                      { id: '14A', label: '14A (Window)' },
                      { id: '14B', label: '14B (Aisle)' },
                      { id: '15A', label: '15A (Quiet)' },
                    ].map(seat => (
                      <button
                        key={seat.id}
                        onClick={() => {
                          if (!isTimerRunningB) handleStartB();
                          setSelectedSeat(seat.id);
                          setMetricsB(p => ({ ...p, clicks: p.clicks + 1 }));
                        }}
                        className={`flex-1 py-2 text-xs rounded-lg border text-center transition-all ${
                          selectedSeat === seat.id
                            ? 'border-[#D7492A] bg-[#FDF5F2] text-[#D7492A] font-bold shadow-xs'
                            : 'border-[#E8E2D9] bg-white text-[#6E6D70] hover:text-[#2D2D2E]'
                        }`}
                      >
                        {seat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Direct Action */}
                <button
                  type="button"
                  onClick={handleSubmitB}
                  className="w-full mt-2 py-3 bg-[#D7492A] hover:bg-[#B83519] text-white font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow"
                >
                  <Train className="w-4 h-4" />
                  Confirm Reservation (140 MAD)
                </button>
              </div>
            )}
          </div>

          {/* Telemetry Bar B */}
          <div className="mt-5 pt-3 border-t border-[#F0EBE3] flex items-center justify-between text-xs font-mono text-[#6E6D70]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#D7492A]" />
              Time: <strong className="text-[#2D2D2E]">{metricsB.timeSec}s</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <MousePointer className="w-4 h-4 text-blue-600" />
              Clicks: <strong className="text-[#2D2D2E]">{metricsB.clicks}</strong>
            </span>
            <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              Errors: <strong>{metricsB.errors}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Classroom Takeaway Banner */}
      <div className="p-4 bg-white border border-[#E8E2D9] rounded-xl flex items-center justify-between shadow-xs">
        <p className="text-xs text-[#2D2D2E] leading-relaxed">
          <strong className="text-[#D7492A] font-serif-display text-base font-bold mr-1">Key Pedagogical Insight:</strong> Both systems
          satisfy 100% of functional requirements (write row to booking database). But one causes severe cognitive friction,
          syntax errors, and user frustration.
        </p>
        <span className="text-xs font-mono text-white bg-[#D7492A] font-bold px-3 py-1 rounded ml-4 whitespace-nowrap">
          Functionality ≠ Usability
        </span>
      </div>
    </div>
  );
};
