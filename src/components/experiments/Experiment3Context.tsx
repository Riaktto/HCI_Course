import React, { useState, useEffect } from 'react';
import { Sun, Moon, Car, ShieldAlert, Wind, Thermometer, RotateCcw, AlertTriangle } from 'lucide-react';

type ContextEnv = 'desk' | 'night_drive' | 'sun_glare';

export const Experiment3Context: React.FC = () => {
  const [env, setEnv] = useState<ContextEnv>('desk');
  const [temp, setTemp] = useState<number>(24.0);
  const [defrostOn, setDefrostOn] = useState<boolean>(false);
  const [hazardAlert, setHazardAlert] = useState<string | null>(null);
  const [glanceTime, setGlanceTime] = useState<number>(0);
  const [isGlancing, setIsGlancing] = useState<boolean>(false);
  const [misTaps, setMisTaps] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);

  // Glancing timer
  useEffect(() => {
    let interval: any = null;
    if (isGlancing && !success) {
      interval = setInterval(() => {
        setGlanceTime(prev => {
          const next = Number((prev + 0.1).toFixed(1));
          if (env === 'night_drive' && next > 2.0 && next % 2 === 0) {
            setHazardAlert('⚠️ LANE DEPARTURE WARNING: Eyes off road > 2.0s!');
          }
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isGlancing, env, success]);

  // Periodic simulated road hazard if in night_drive mode
  useEffect(() => {
    if (env !== 'night_drive') {
      setHazardAlert(null);
      return;
    }
    const timer = setInterval(() => {
      const hazards = [
        '🔴 Lead vehicle sudden brake at 110 km/h!',
        '🌧️ Heavy rain splash on windshield — glance lost!',
        '⚠️ Pothole on A3 highway — steering adjustment needed!',
      ];
      setHazardAlert(hazards[Math.floor(Math.random() * hazards.length)]);
      setTimeout(() => setHazardAlert(null), 3000);
    }, 8000);

    return () => clearInterval(timer);
  }, [env]);

  const handleAdjustTemp = (delta: number) => {
    if (!isGlancing) setIsGlancing(true);
    if (env === 'night_drive' && Math.random() < 0.35) {
      setMisTaps(m => m + 1);
      setTemp(t => Number((t - delta).toFixed(1)));
      return;
    }
    setTemp(t => {
      const next = Number((t + delta).toFixed(1));
      if (next === 21.5 && defrostOn) setSuccess(true);
      return next;
    });
  };

  const handleToggleDefrost = () => {
    if (!isGlancing) setIsGlancing(true);
    if (env === 'night_drive' && Math.random() < 0.25) {
      setMisTaps(m => m + 1);
      return;
    }
    const nextDefrost = !defrostOn;
    setDefrostOn(nextDefrost);
    if (temp === 21.5 && nextDefrost) {
      setSuccess(true);
    }
  };

  const resetAll = () => {
    setTemp(24.0);
    setDefrostOn(false);
    setGlanceTime(0);
    setIsGlancing(false);
    setMisTaps(0);
    setHazardAlert(null);
    setSuccess(false);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 lg:p-6 bg-[#FAF9F6]">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E8E2D9]">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase font-mono tracking-wider text-white bg-[#D7492A] font-bold px-3 py-1 rounded">
            Live Laboratory Experiment 03
          </span>
          <span className="text-sm font-semibold text-[#2D2D2E]">
            Context Changes Interaction: The In-Vehicle Touchscreen Test
          </span>
        </div>

        {/* Environmental Context Toggles */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#6E6D70] font-medium">Context:</span>
          <button
            onClick={() => {
              setEnv('desk');
              resetAll();
            }}
            className={`px-3 py-1.5 text-xs rounded font-medium transition-colors ${
              env === 'desk' ? 'bg-[#2D2D2E] text-white' : 'bg-white border border-[#E8E2D9] text-[#2D2D2E]'
            }`}
          >
            Desk / Lab (Optimal)
          </button>
          <button
            onClick={() => {
              setEnv('night_drive');
              resetAll();
            }}
            className={`px-3 py-1.5 text-xs rounded font-medium transition-colors flex items-center gap-1.5 ${
              env === 'night_drive' ? 'bg-[#D7492A] text-white' : 'bg-white border border-[#E8E2D9] text-[#2D2D2E]'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            Night Driving (Vibration + Stress)
          </button>
          <button
            onClick={() => {
              setEnv('sun_glare');
              resetAll();
            }}
            className={`px-3 py-1.5 text-xs rounded font-medium transition-colors flex items-center gap-1.5 ${
              env === 'sun_glare' ? 'bg-amber-600 text-white' : 'bg-white border border-[#E8E2D9] text-[#2D2D2E]'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            Desert Sunlight Glare
          </button>
          <button
            onClick={resetAll}
            className="flex items-center gap-1 px-3 py-1.5 text-xs text-[#6E6D70] bg-white border border-[#E8E2D9] rounded hover:text-[#2D2D2E] hover:bg-[#F5F2ED]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Main Simulation Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto items-center">
        {/* Left: The In-Car Touch Console (8 cols) */}
        <div
          className={`lg:col-span-8 rounded-2xl p-6 transition-all duration-300 relative border ${
            env === 'night_drive'
              ? 'bg-[#1C1D21] text-white border-red-500 shadow-2xl'
              : env === 'sun_glare'
              ? 'bg-[#FAF3E0] text-stone-600 border-amber-300 shadow-inner'
              : 'bg-white border-[#E8E2D9] text-[#2D2D2E] shadow-sm'
          }`}
          style={
            env === 'night_drive'
              ? {
                  animation: 'vibrate 0.15s linear infinite',
                }
              : env === 'sun_glare'
              ? {
                  filter: 'contrast(0.45) brightness(1.3) sepia(0.25)',
                }
              : {}
          }
        >
          {/* Simulated In-Car Dash Header */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-current opacity-30">
            <div className="text-xs font-mono uppercase tracking-wider font-semibold">
              Vehicle Telematics — Center Console
            </div>
            <div className="text-xs font-mono font-bold">
              {env === 'night_drive' ? 'SPEED: 118 KM/H · NIGHT A3' : 'BEN GUERIR HIGHWAY'}
            </div>
          </div>

          {/* Active Hazard Flash */}
          {hazardAlert && (
            <div className="mb-4 p-3 bg-red-600 text-white font-bold text-xs rounded-xl flex items-center justify-between animate-pulse shadow-md">
              <span>{hazardAlert}</span>
              <ShieldAlert className="w-5 h-5 shrink-0" />
            </div>
          )}

          {/* Target Task Reminder */}
          <div className="bg-black/5 p-3 rounded-xl mb-4 text-xs flex items-center justify-between border border-black/5">
            <span>
              Target Goal: <strong>Set Temperature to 21.5°C & Turn ON Windshield Defrost</strong>
            </span>
            {success ? (
              <span className="text-emerald-600 font-bold font-mono">GOAL ACHIEVED!</span>
            ) : (
              <span className="text-[#D7492A] font-mono font-semibold">In Progress...</span>
            )}
          </div>

          {/* Simulated Touch Screen Controls */}
          <div className="grid grid-cols-2 gap-4">
            {/* Climate Box */}
            <div className="p-5 rounded-xl border border-current/15 space-y-3 bg-current/5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold flex items-center gap-1.5">
                  <Thermometer className="w-4 h-4 text-[#D7492A]" />
                  Cabin Target
                </span>
                <span className="text-3xl font-mono font-bold">{temp}°C</span>
              </div>

              {/* Small buttons for temperature illustrate friction */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => handleAdjustTemp(-0.5)}
                  className="flex-1 py-3 bg-current/10 hover:bg-current/20 active:scale-95 rounded-xl text-lg font-mono font-bold border border-current/20 transition-all"
                >
                  - 0.5°
                </button>
                <button
                  onClick={() => handleAdjustTemp(0.5)}
                  className="flex-1 py-3 bg-current/10 hover:bg-current/20 active:scale-95 rounded-xl text-lg font-mono font-bold border border-current/20 transition-all"
                >
                  + 0.5°
                </button>
              </div>
            </div>

            {/* Defrost Controls */}
            <div className="p-5 rounded-xl border border-current/15 space-y-3 bg-current/5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold flex items-center gap-1.5">
                  <Wind className="w-4 h-4 text-cyan-600" />
                  Windshield Defroster
                </span>
                <span className={`text-xs font-mono font-bold ${defrostOn ? 'text-cyan-600' : 'opacity-50'}`}>
                  {defrostOn ? 'ACTIVE (MAX)' : 'OFF'}
                </span>
              </div>

              <button
                onClick={handleToggleDefrost}
                className={`w-full py-3.5 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-2 ${
                  defrostOn
                    ? 'bg-cyan-600 text-white border-cyan-700 shadow-sm'
                    : 'bg-current/10 hover:bg-current/20 border-current/20'
                }`}
              >
                <Wind className="w-4 h-4" />
                {defrostOn ? 'Defrost Enabled' : 'Tap to Activate Defrost'}
              </button>
            </div>
          </div>

          {/* Warning notice inside driving context */}
          {env === 'night_drive' && (
            <div className="mt-4 text-xs text-stone-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#D7492A] shrink-0" />
              <span>
                Road vibration creates motor drift. Small touch targets require high visual focal concentration,
                stealing eyes away from high-speed highway traffic.
              </span>
            </div>
          )}
        </div>

        {/* Right: Cognitive Load & Ergonomic Metrics (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-[#E8E2D9] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-[#6E6D70] font-bold pb-2 border-b border-[#F0EBE3]">
            Ergonomic Context Telemetry
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-[#FAF9F6] rounded-xl border border-[#E8E2D9]">
              <div className="text-xs text-[#6E6D70]">Total Visual Dwell Time (Glance)</div>
              <div
                className={`text-3xl font-mono font-bold mt-1 ${
                  glanceTime > 2.0 && env === 'night_drive' ? 'text-red-600' : 'text-[#2D2D2E]'
                }`}
              >
                {glanceTime}s
              </div>
              <div className="text-[10px] text-[#6E6D70] mt-1 font-mono">NHTSA Driver Safety Threshold: &lt; 2.0 seconds</div>
            </div>

            <div className="p-4 bg-[#FAF9F6] rounded-xl border border-[#E8E2D9]">
              <div className="text-xs text-[#6E6D70]">Physical Mis-Taps (Motor Drift)</div>
              <div className={`text-3xl font-mono font-bold mt-1 ${misTaps > 0 ? 'text-[#D7492A]' : 'text-emerald-600'}`}>
                {misTaps}
              </div>
              <div className="text-[10px] text-[#6E6D70] mt-1 font-mono">Due to vehicle chassis vibration & divided attention</div>
            </div>

            <div className="p-4 bg-[#FAF9F6] rounded-xl border border-[#E8E2D9]">
              <div className="text-xs text-[#6E6D70]">Environmental Context Factor</div>
              <div className="text-sm font-semibold text-[#2D2D2E] mt-1">
                {env === 'desk' && 'Nominal (Ideal Cognitive Capacity)'}
                {env === 'night_drive' && 'Extreme (Dynamic Risk, High Cognitive Load)'}
                {env === 'sun_glare' && 'Sensory Degraded (Low Visual Contrast)'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Classroom Takeaway Banner */}
      <div className="p-4 bg-white border border-[#E8E2D9] rounded-xl flex items-center justify-between shadow-xs">
        <p className="text-xs text-[#2D2D2E] leading-relaxed">
          <strong className="text-[#D7492A] font-serif-display text-base font-bold mr-1">Key Pedagogical Principle:</strong> An interface
          never exists in a vacuum. A touchscreen design that tests effortlessly at an office desk can be actively dangerous
          when deployed in a bumpy, high-speed vehicle or in glaring desert light.
        </p>
        <span className="text-xs font-mono text-white bg-[#D7492A] font-bold px-3 py-1 rounded ml-4 whitespace-nowrap">
          Context Dictates Interaction
        </span>
      </div>
    </div>
  );
};
