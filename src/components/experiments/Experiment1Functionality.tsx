import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, RotateCcw, Clock, MousePointer, ShieldAlert, Train } from 'lucide-react';
import { UM6PLogo } from '../brand/UM6PLogo';

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
  const [depCity, setDepCity] = useState<'Casablanca Voyageurs' | 'Casablanca Port' | 'Rabat Agdal'>('Casablanca Voyageurs');
  const [arrCity, setArrCity] = useState<'Benguerir UM6P' | 'Marrakech Ville'>('Benguerir UM6P');
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

    setDepCity('Casablanca Voyageurs');
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
          <UM6PLogo variant="compact" theme="color" className="h-6 w-auto" />
          <div className="h-4 w-px bg-[#E8E2D9]" />
          <span className="text-xs uppercase font-mono tracking-wider text-white bg-[#E5391C] font-bold px-3 py-1 rounded">
            Live Lab 01
          </span>
          <span className="text-sm font-semibold text-[#2D2D2E]">
            Task: Book an Express Train Seat (Casablanca → UM6P Campus)
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
                ? 'bg-[#E5391C] text-white'
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

      {/* Main Dual Stage Comparison - flex-1 adapts to vertical height */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 py-2 items-stretch">
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
              <form onSubmit={handleSubmitA} className="space-y-3.5">
                {errorA && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-mono flex items-start gap-2 rounded-xl">
                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                    <span>{errorA}</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-[#525254] mb-1.5 font-bold">
                      DEP_ORIGIN_ID (Node Code)
                    </label>
                    <select
                      value={termDep}
                      onChange={e => {
                        setTermDep(e.target.value);
                        if (!isTimerRunningA) handleStartA();
                        else setMetricsA(p => ({ ...p, clicks: p.clicks + 1 }));
                      }}
                      className="w-full bg-[#FAF9F6] border border-[#D5CFC7] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#2D2D2E] font-mono focus:border-[#E5391C] outline-none"
                    >
                      <option value="">-- SELECT ID --</option>
                      <option value="DEP_CASAVOY_101">DEP_CASAVOY_101 (Casa Voy)</option>
                      <option value="DEP_CASAPORT_02">DEP_CASAPORT_02 (Casa Port)</option>
                      <option value="DEP_RABAT_AGD_08">DEP_RABAT_AGD_08 (Rabat)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#525254] mb-1.5 font-bold">
                      ARR_DEST_ID (Foreign Key)
                    </label>
                    <select
                      value={termArr}
                      onChange={e => {
                        setTermArr(e.target.value);
                        if (!isTimerRunningA) handleStartA();
                        else setMetricsA(p => ({ ...p, clicks: p.clicks + 1 }));
                      }}
                      className="w-full bg-[#FAF9F6] border border-[#D5CFC7] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#2D2D2E] font-mono focus:border-[#E5391C] outline-none"
                    >
                      <option value="">-- SELECT ID --</option>
                      <option value="ARR_BENGUERIR_04">ARR_BENGUERIR_04 (Benguerir)</option>
                      <option value="ARR_MARR_GUA_99">ARR_MARR_GUA_99 (Marrakech)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-[#525254] mb-1.5 font-bold">
                      TIMESTAMP (Strict ISO)
                    </label>
                    <input
                      type="text"
                      value={termDate}
                      placeholder="e.g. 2026-10-15T08:30:00Z"
                      onChange={e => {
                        setTermDate(e.target.value);
                        if (!isTimerRunningA) handleStartA();
                      }}
                      className="w-full bg-[#FAF9F6] border border-[#D5CFC7] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#2D2D2E] font-mono focus:border-[#E5391C] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#525254] mb-1.5 font-bold">
                      SEAT_MATRIX_INDEX
                    </label>
                    <input
                      type="text"
                      value={termSeat}
                      placeholder="e.g. C02-S19-ND"
                      onChange={e => {
                        setTermSeat(e.target.value);
                        if (!isTimerRunningA) handleStartA();
                      }}
                      className="w-full bg-[#FAF9F6] border border-[#D5CFC7] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#2D2D2E] font-mono focus:border-[#E5391C] outline-none"
                    />
                  </div>
                </div>

                {/* DB Schema Documentation / System-Centric Constraints */}
                <div className="p-3 bg-[#FAF9F6] border border-[#E8E2D9] rounded-xl font-mono text-xs text-[#6E6D70] space-y-1">
                  <div className="font-bold text-[#2D2D2E] flex items-center justify-between">
                    <span>SCHEMA INTEGRITY CONSTRAINTS:</span>
                    <span className="text-[10px] text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">Rigid Specification</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    All fields strictly validated against PostgreSQL constraints. Missing ISO formats or incorrect node keys throw catastrophic runtime exceptions.
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#2D2D2E] hover:bg-black rounded-xl text-xs sm:text-sm font-mono font-bold text-white transition-colors cursor-pointer"
                  >
                    POST /api/v1/booking/commit
                  </button>
                  <button
                    type="button"
                    onClick={handleQuickFillAValid}
                    className="px-4 py-3 text-xs sm:text-sm font-mono bg-[#F5F2ED] border border-[#D5CFC7] text-[#525254] hover:text-[#2D2D2E] font-semibold rounded-xl cursor-pointer"
                    title="Auto-fill with correct syntax to test"
                  >
                    Quick Valid
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Telemetry Bar A */}
          <div className="mt-4 pt-3 border-t border-[#F0EBE3] flex items-center justify-between text-xs sm:text-sm font-mono text-[#6E6D70]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              Time: <strong className="text-[#2D2D2E]">{metricsA.timeSec}s</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <MousePointer className="w-4 h-4 text-blue-600" />
              Clicks: <strong className="text-[#2D2D2E]">{metricsA.clicks}</strong>
            </span>
            <span className="flex items-center gap-1.5 text-red-600 font-semibold">
              <AlertCircle className="w-4 h-4" />
              Errors: <strong>{metricsA.errors}</strong>
            </span>
          </div>
        </div>

        {/* INTERFACE B: The Human-Centered Intent System */}
        <div className="bg-white border-2 border-[#E5391C] rounded-2xl p-6 flex flex-col justify-between shadow-md relative">
          <div className="absolute top-4 right-4 text-xs font-mono text-white bg-[#E5391C] font-bold px-3 py-1 rounded-lg shadow-xs">
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
                <CheckCircle2 className="w-12 h-12 text-[#E5391C] mx-auto" />
                <h4 className="font-semibold text-[#2D2D2E] text-xl font-serif-display">Seat Confirmed: {selectedSeat} (Coach 2)</h4>
                <p className="text-base text-[#525254]">
                  {depCity} → {arrCity === 'Benguerir UM6P' ? 'Benguerir (UM6P Campus)' : 'Marrakech Ville'} · Al Boraq High Speed Express · {travelDay} at 08:30
                </p>
                <div className="pt-3 flex justify-center gap-6 text-sm font-mono text-stone-600">
                  <span>Time: <strong className="text-[#E5391C]">{metricsB.timeSec}s</strong></span>
                  <span>Clicks: <strong>{metricsB.clicks}</strong></span>
                  <span className="text-emerald-600 font-bold">Errors: 0</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3.5">
                {/* Full Departure and Arrival Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#2D2D2E] mb-1 flex items-center justify-between">
                      <span>From (Departure)</span>
                      <span className="text-[11px] font-mono text-[#E5391C] font-normal">Select Station</span>
                    </label>
                    <select
                      value={depCity}
                      onChange={e => {
                        if (!isTimerRunningB) handleStartB();
                        setDepCity(e.target.value as any);
                        setMetricsB(p => ({ ...p, clicks: p.clicks + 1 }));
                      }}
                      className="w-full bg-[#FAF9F6] border border-[#D5CFC7] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#2D2D2E] font-medium focus:border-[#E5391C] outline-none"
                    >
                      <option value="Casablanca Voyageurs">Casablanca Voyageurs</option>
                      <option value="Casablanca Port">Casablanca Port</option>
                      <option value="Rabat Agdal">Rabat Agdal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2D2D2E] mb-1 flex items-center justify-between">
                      <span>To (Destination)</span>
                      <span className="text-[11px] font-mono text-emerald-700 font-normal">Direct Connection</span>
                    </label>
                    <select
                      value={arrCity}
                      onChange={e => {
                        if (!isTimerRunningB) handleStartB();
                        setArrCity(e.target.value as any);
                        setMetricsB(p => ({ ...p, clicks: p.clicks + 1 }));
                      }}
                      className="w-full bg-[#FAF9F6] border border-[#D5CFC7] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#2D2D2E] font-medium focus:border-[#E5391C] outline-none"
                    >
                      <option value="Benguerir UM6P">Benguerir (UM6P Campus)</option>
                      <option value="Marrakech Ville">Marrakech Ville</option>
                    </select>
                  </div>
                </div>

                {/* Day Selection */}
                <div>
                  <label className="block text-xs text-[#2D2D2E] font-semibold mb-1">Departure Schedule</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Today', 'Tomorrow', 'Friday'] as const).map(day => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => {
                          if (!isTimerRunningB) handleStartB();
                          setTravelDay(day);
                          setMetricsB(p => ({ ...p, clicks: p.clicks + 1 }));
                        }}
                        className={`py-2 text-xs sm:text-sm rounded-xl border font-medium transition-colors cursor-pointer ${
                          travelDay === day
                            ? 'border-[#E5391C] bg-[#E5391C] text-white font-semibold shadow-xs'
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
                  <label className="block text-xs text-[#2D2D2E] font-semibold mb-1">
                    Select Preferred Seat (Coach 2)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: '14A', label: '14A (Window)' },
                      { id: '14B', label: '14B (Aisle)' },
                      { id: '15A', label: '15A (Quiet)' },
                    ].map(seat => (
                      <button
                        key={seat.id}
                        type="button"
                        onClick={() => {
                          if (!isTimerRunningB) handleStartB();
                          setSelectedSeat(seat.id);
                          setMetricsB(p => ({ ...p, clicks: p.clicks + 1 }));
                        }}
                        className={`py-2 text-xs sm:text-sm rounded-xl border text-center transition-all cursor-pointer ${
                          selectedSeat === seat.id
                            ? 'border-[#E5391C] bg-[#FDF5F2] text-[#E5391C] font-bold shadow-xs'
                            : 'border-[#E8E2D9] bg-white text-[#6E6D70] hover:text-[#2D2D2E]'
                        }`}
                      >
                        {seat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Real-time Journey Preview Card */}
                <div className="p-3 bg-[#FAF9F6] border border-[#E8E2D9] rounded-xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-[11px] font-mono font-bold text-[#E5391C]">
                      AL BORAQ EXPRESS · NON-STOP
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-[#2D2D2E]">
                      {depCity} → {arrCity === 'Benguerir UM6P' ? 'Benguerir UM6P' : 'Marrakech'}
                    </div>
                    <div className="text-[11px] text-[#6E6D70]">
                      {travelDay} · Departs 08:30 · Seat: {selectedSeat}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base sm:text-lg font-bold font-mono text-[#2D2D2E]">140 MAD</div>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Guaranteed Seat
                    </span>
                  </div>
                </div>

                {/* Direct Action */}
                <button
                  type="button"
                  onClick={handleSubmitB}
                  className="w-full py-3 bg-[#E5391C] hover:bg-[#C92B10] text-white font-bold text-sm sm:text-base rounded-xl transition-colors flex items-center justify-center gap-2 shadow cursor-pointer active:scale-98"
                >
                  <Train className="w-4 h-4 sm:w-5 sm:h-5" />
                  Confirm Reservation (140 MAD)
                </button>
              </div>
            )}
          </div>

          {/* Telemetry Bar B */}
          <div className="mt-4 pt-3 border-t border-[#F0EBE3] flex items-center justify-between text-xs sm:text-sm font-mono text-[#6E6D70]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#E5391C]" />
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

      {/* Classroom Takeaway Banner - Projector Scaled */}
      <div className="p-4 sm:p-5 lg:p-6 bg-white border-2 border-[#E5391C] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm flex-shrink-0">
        <div className="flex items-start gap-3.5">
          <span className="w-3.5 h-3.5 rounded-full bg-[#E5391C] mt-1.5 shrink-0" />
          <p className="text-base sm:text-lg lg:text-xl text-[#2D2D2E] leading-relaxed">
            <strong className="text-[#E5391C] font-serif-display text-lg sm:text-xl lg:text-2xl font-bold mr-2">
              Key Pedagogical Insight:
            </strong>
            Both systems satisfy 100% of functional requirements (writing a row to the booking database). But System A externalizes raw machine complexity directly onto the human brain, while System B speaks the intuitive language of human goals.
          </p>
        </div>
        <span className="text-xs sm:text-sm lg:text-base font-mono text-white bg-[#E5391C] font-bold px-4 py-2 rounded-xl whitespace-nowrap shadow-xs shrink-0 uppercase tracking-wider">
          Functionality ≠ Usability
        </span>
      </div>
    </div>
  );
};
