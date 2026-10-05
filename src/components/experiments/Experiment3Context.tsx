import React, { useState, useEffect } from 'react';
import {
  Sun,
  Car,
  ShieldAlert,
  Wind,
  Thermometer,
  RotateCcw,
  AlertTriangle,
  Sparkles,
  Gauge,
  Eye,
  Sliders,
  Radio,
  Zap,
} from 'lucide-react';
import { UM6PLogo } from '../brand/UM6PLogo';

type ContextEnv = 'desk' | 'night_drive' | 'sun_glare';
type UiErgonomics = 'bad' | 'good';

export const Experiment3Context: React.FC = () => {
  const [env, setEnv] = useState<ContextEnv>('desk');
  const [uiMode, setUiMode] = useState<UiErgonomics>('bad');
  const [temp, setTemp] = useState<number>(24.0);
  const [defrostOn, setDefrostOn] = useState<boolean>(false);
  const [fanSpeed, setFanSpeed] = useState<number>(2);
  const [hazardAlert, setHazardAlert] = useState<string | null>(null);
  const [glanceTime, setGlanceTime] = useState<number>(0);
  const [isGlancing, setIsGlancing] = useState<boolean>(false);
  const [misTaps, setMisTaps] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);
  const [isBumping, setIsBumping] = useState<boolean>(false);
  const [roadJoltMsg, setRoadJoltMsg] = useState<string | null>(null);

  // Glancing timer
  useEffect(() => {
    let interval: any = null;
    if (isGlancing && !success) {
      interval = setInterval(() => {
        setGlanceTime((prev) => {
          const next = Number((prev + 0.1).toFixed(1));
          if (env === 'night_drive' && next > 2.0 && Math.floor(next * 10) % 20 === 0) {
            setHazardAlert('⚠️ LANE DRIFT WARNING: Eyes off road > 2.0s (NHTSA Critical Limit)!');
          }
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isGlancing, env, success]);

  // Periodic simulated road hazard and physical bump in night_drive mode
  useEffect(() => {
    if (env !== 'night_drive') {
      setHazardAlert(null);
      setIsBumping(false);
      setRoadJoltMsg(null);
      return;
    }

    const hazardTimer = setInterval(() => {
      const hazards = [
        '🔴 Lead truck sudden brake at 120 km/h!',
        '🌧️ Heavy rain splash on windshield — visual lock lost!',
        '⚠️ High-speed curve on Ben Guerir A3 bypass!',
      ];
      setHazardAlert(hazards[Math.floor(Math.random() * hazards.length)]);
      setTimeout(() => setHazardAlert(null), 3200);
    }, 9000);

    const bumpTimer = setInterval(() => {
      setIsBumping(true);
      const bumps = ['🛣️ Highway Expansion Joint!', '💥 Pothole Impact (0.8G Vertical)!', '🚧 Rough Asphalt Section'];
      setRoadJoltMsg(bumps[Math.floor(Math.random() * bumps.length)]);

      setTimeout(() => {
        setIsBumping(false);
        setRoadJoltMsg(null);
      }, 550);
    }, 4200);

    return () => {
      clearInterval(hazardTimer);
      clearInterval(bumpTimer);
    };
  }, [env]);

  const handleAdjustTemp = (delta: number) => {
    if (!isGlancing) setIsGlancing(true);

    // If car is moving or bumping, higher chance of mis-tap if UI is bad
    const missChance = env === 'night_drive' ? (uiMode === 'bad' ? 0.42 : 0.08) : 0;
    if (Math.random() < missChance) {
      setMisTaps((m) => m + 1);
      // Motor error: finger slips and hits opposite or wrong value
      setTemp((t) => Number((t - delta).toFixed(1)));
      return;
    }

    setTemp((t) => {
      const next = Number((t + delta).toFixed(1));
      if (next === 21.5 && defrostOn) setSuccess(true);
      return next;
    });
  };

  const handleToggleDefrost = () => {
    if (!isGlancing) setIsGlancing(true);

    const missChance = env === 'night_drive' ? (uiMode === 'bad' ? 0.35 : 0.05) : 0;
    if (Math.random() < missChance) {
      setMisTaps((m) => m + 1);
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
    setFanSpeed(2);
    setGlanceTime(0);
    setIsGlancing(false);
    setMisTaps(0);
    setHazardAlert(null);
    setSuccess(false);
    setIsBumping(false);
    setRoadJoltMsg(null);
  };

  const triggerManualBump = () => {
    setIsBumping(true);
    setRoadJoltMsg('💥 Manual Road Pothole Induced!');
    setTimeout(() => {
      setIsBumping(false);
      setRoadJoltMsg(null);
    }, 600);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-6 lg:p-8 bg-[#FAF9F6] select-text">
      {/* Top Banner & Control Deck */}
      <div className="pb-3 border-b border-[#E8E2D9] flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <UM6PLogo variant="compact" theme="color" className="h-6 lg:h-7 w-auto" />
          <div className="h-4 w-px bg-[#E8E2D9]" />
          <span className="text-xs uppercase font-mono tracking-wider text-white bg-[#E5391C] font-bold px-3 py-1 rounded-lg">
            Live Lab 03 · Telematics Test
          </span>
          <span className="text-sm sm:text-base font-serif-display font-bold text-[#2D2D2E]">
            Context Changes Interaction: In-Vehicle Center Console
          </span>
        </div>

        {/* Environmental Context Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-white border border-[#E8E2D9] rounded-xl p-1 shadow-2xs">
            <button
              onClick={() => {
                setEnv('desk');
                resetAll();
              }}
              className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg cursor-pointer transition-all ${
                env === 'desk' ? 'bg-stone-900 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Quiet Desk (Optimal)
            </button>
            <button
              onClick={() => {
                setEnv('night_drive');
                resetAll();
              }}
              className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1.5 ${
                env === 'night_drive'
                  ? 'bg-[#E5391C] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              Highway 120 km/h (Vibration & Jitter)
            </button>
            <button
              onClick={() => {
                setEnv('sun_glare');
                resetAll();
              }}
              className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1.5 ${
                env === 'sun_glare'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              Desert Sunlight (Blinding Glare)
            </button>
          </div>

          <button
            onClick={resetAll}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono font-bold text-stone-700 bg-white border border-[#E8E2D9] rounded-xl hover:bg-stone-100 cursor-pointer transition-colors shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Lab
          </button>
        </div>
      </div>

      {/* Main Simulation Stage: Full Screen, Zero Wasted Space */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 min-h-0 py-3 items-stretch">
        {/* Left: The In-Vehicle Touch Console (8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between relative overflow-hidden rounded-3xl border-2 border-stone-800 bg-stone-950 p-5 lg:p-7 shadow-2xl">
          {/* Simulated Windshield / HUD Viewport Header when in Car Mode */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-800 flex-shrink-0 text-stone-300">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs sm:text-sm font-mono font-bold tracking-wider uppercase text-stone-200">
                Vehicle Telematics · 14.5" Center Console
              </span>
              {env === 'night_drive' && (
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800 font-bold">
                  HIGHWAY A3 SPEED: 118 KM/H
                </span>
              )}
              {env === 'sun_glare' && (
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700 font-bold">
                  SOLAR LUX: 94,500 LUX
                </span>
              )}
            </div>

            {/* UI Design Switcher (Bad vs Good HCI) */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-stone-400 font-medium">UI Architecture:</span>
              <div className="flex bg-stone-900 border border-stone-700 rounded-lg p-0.5 text-xs font-mono">
                <button
                  onClick={() => setUiMode('bad')}
                  className={`px-2.5 py-1 rounded font-bold cursor-pointer transition-colors ${
                    uiMode === 'bad' ? 'bg-red-700 text-white' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Flawed (Small Targets)
                </button>
                <button
                  onClick={() => setUiMode('good')}
                  className={`px-2.5 py-1 rounded font-bold cursor-pointer transition-colors ${
                    uiMode === 'good' ? 'bg-emerald-600 text-white' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  HCI Optimized (48px+)
                </button>
              </div>
            </div>
          </div>

          {/* Active Hazard / Road Jolt Announcement Banner */}
          {hazardAlert && (
            <div className="mb-3 p-3 bg-red-600 text-white font-bold text-xs sm:text-sm rounded-2xl flex items-center justify-between animate-pulse shadow-lg flex-shrink-0">
              <span className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                {hazardAlert}
              </span>
              <span className="text-xs font-mono bg-black/30 px-2 py-1 rounded">EYES OFF ROAD!</span>
            </div>
          )}

          {roadJoltMsg && (
            <div className="mb-3 p-2.5 bg-amber-500 text-stone-950 font-bold text-xs sm:text-sm rounded-xl flex items-center justify-between shadow-md flex-shrink-0 animate-bounce">
              <span>{roadJoltMsg}</span>
              <span className="text-xs font-mono uppercase bg-stone-900 text-white px-2 py-0.5 rounded">
                CHASSIS JOLT
              </span>
            </div>
          )}

          {/* Target Task Objective Prompt */}
          <div className="bg-stone-900/90 border border-stone-700 p-3 sm:p-4 rounded-2xl mb-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <div className="text-xs sm:text-sm text-stone-200">
                Driver Intent: Set Cabin Temperature to <strong className="text-cyan-400 text-sm sm:text-base">21.5°C</strong> & Turn{' '}
                <strong className="text-cyan-400 text-sm sm:text-base">ON Windshield Defrost</strong>
              </div>
            </div>
            {success ? (
              <span className="text-xs sm:text-sm font-mono font-bold px-3 py-1 bg-emerald-900/80 text-emerald-300 border border-emerald-500 rounded-xl">
                ✓ TASK COMPLETED!
              </span>
            ) : (
              <span className="text-xs font-mono font-bold px-3 py-1 bg-amber-950/80 text-amber-300 border border-amber-600 rounded-xl">
                Interaction Incomplete
              </span>
            )}
          </div>

          {/* Interactive Screen Frame with Physical Vibration / Jolt & Dynamic Flare */}
          <div
            className={`relative flex-1 rounded-2xl p-5 sm:p-6 transition-all overflow-hidden flex flex-col justify-between ${
              env === 'night_drive'
                ? isBumping
                  ? 'animate-car-bump border-2 border-red-500 bg-stone-900'
                  : 'animate-car-vibrate border-2 border-stone-700 bg-stone-900'
                : env === 'sun_glare'
                ? 'border-2 border-amber-400/80 bg-[#FFFDF5]'
                : 'border border-stone-700 bg-stone-900/95'
            }`}
            style={
              env === 'sun_glare'
                ? {
                    filter: 'contrast(0.65) brightness(1.22)',
                  }
                : {}
            }
          >
            {/* REALISTIC MOVING DESERT SUNLIGHT FLARE OVERLAY (Dynamic sweeps, blinding hotspot, optical halos) */}
            {env === 'sun_glare' && (
              <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden mix-blend-screen">
                {/* Primary Sweeping Sun Hotspot */}
                <div
                  className="animate-sun-flare absolute w-[450px] h-[450px] rounded-full blur-3xl opacity-90"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,240,180,0.85) 30%, rgba(255,180,50,0.45) 60%, transparent 80%)',
                  }}
                />

                {/* Sweeping Anamorphic Light Streak */}
                <div
                  className="animate-sun-flare absolute -inset-x-32 top-1/2 h-36 blur-xl opacity-80"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(255,230,140,0.6) 35%, rgba(255,255,255,0.95) 50%, rgba(180,220,255,0.5) 65%, transparent 100%)',
                    transform: 'rotate(-18deg)',
                  }}
                />

                {/* Secondary Chromatic Optical Artifacts (35mm Camera Lens Flare Rings) */}
                <div
                  className="animate-sun-flare absolute w-48 h-48 rounded-full border-4 border-cyan-300/40 blur-sm opacity-70"
                  style={{ top: '40%', left: '30%' }}
                />
                <div
                  className="animate-sun-flare absolute w-28 h-28 rounded-full bg-magenta-400/25 blur-md opacity-60"
                  style={{ top: '60%', left: '55%' }}
                />

                {/* Outdoor Desert Atmospheric Glare Overlay (Washes out text contrast) */}
                <div className="absolute inset-0 bg-amber-100/35 backdrop-blur-[0.5px]" />
              </div>
            )}

            {/* In-Car Interactive UI Controls */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 items-stretch">
              {/* Climate Control Module */}
              <div
                className={`p-5 rounded-2xl border flex flex-col justify-between ${
                  env === 'sun_glare'
                    ? 'bg-white/80 border-amber-200 text-stone-800'
                    : 'bg-stone-950/70 border-stone-800 text-white'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-current/15">
                    <span className="text-xs font-mono font-bold flex items-center gap-2 uppercase tracking-wider">
                      <Thermometer className="w-4 h-4 text-[#E5391C]" />
                      Dual-Zone Cabin Climate
                    </span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-current/10">
                      ZONE: DRIVER
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium opacity-80">Target Temperature:</span>
                    <span
                      className={`text-4xl sm:text-5xl font-mono font-bold ${
                        temp === 21.5 ? 'text-emerald-500' : env === 'sun_glare' ? 'text-stone-900' : 'text-white'
                      }`}
                    >
                      {temp.toFixed(1)}°C
                    </span>
                  </div>
                </div>

                {/* Buttons: Either Tiny Precision (Bad UI) or Generous 48px+ (Good UI) */}
                {uiMode === 'bad' ? (
                  <div className="space-y-2 pt-2">
                    <div className="text-[11px] font-mono text-red-400 font-bold">
                      ⚠️ Flawed Design: Tiny 24px targets (High motor error during vibration)
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAdjustTemp(-0.5)}
                        className="w-12 h-8 bg-stone-800 hover:bg-stone-700 active:scale-95 text-stone-200 text-xs font-mono font-bold rounded border border-stone-600 cursor-pointer"
                        title="Tiny target"
                      >
                        -0.5
                      </button>
                      <button
                        onClick={() => handleAdjustTemp(0.5)}
                        className="w-12 h-8 bg-stone-800 hover:bg-stone-700 active:scale-95 text-stone-200 text-xs font-mono font-bold rounded border border-stone-600 cursor-pointer"
                        title="Tiny target"
                      >
                        +0.5
                      </button>
                      <span className="text-xs font-mono text-stone-400 pl-2">Step increments (0.5°C)</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 pt-2">
                    <div className="text-[11px] font-mono text-emerald-400 font-bold">
                      ✓ HCI Ergonomic: Large 64px Fitts-compliant touch targets with audible click
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleAdjustTemp(-0.5)}
                        className="py-4 bg-[#E5391C] hover:bg-[#C92B10] active:scale-95 text-white font-mono font-bold text-xl rounded-2xl shadow-md border-2 border-red-400 cursor-pointer transition-all flex items-center justify-center gap-2"
                      >
                        <span>- 0.5°C</span>
                      </button>
                      <button
                        onClick={() => handleAdjustTemp(0.5)}
                        className="py-4 bg-[#E5391C] hover:bg-[#C92B10] active:scale-95 text-white font-mono font-bold text-xl rounded-2xl shadow-md border-2 border-red-400 cursor-pointer transition-all flex items-center justify-center gap-2"
                      >
                        <span>+ 0.5°C</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Defrost & Blower Module */}
              <div
                className={`p-5 rounded-2xl border flex flex-col justify-between ${
                  env === 'sun_glare'
                    ? 'bg-white/80 border-amber-200 text-stone-800'
                    : 'bg-stone-950/70 border-stone-800 text-white'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-current/15">
                    <span className="text-xs font-mono font-bold flex items-center gap-2 uppercase tracking-wider">
                      <Wind className="w-4 h-4 text-cyan-400" />
                      Windshield Defogger
                    </span>
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        defrostOn ? 'bg-cyan-900 text-cyan-300' : 'bg-current/10 opacity-70'
                      }`}
                    >
                      {defrostOn ? 'ACTIVE (MAX BLOW)' : 'OFF'}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-stone-400 pt-1">
                    Emergency safety system for clearing windshield fogging during highway driving.
                  </div>
                </div>

                <div className="pt-2">
                  {uiMode === 'bad' ? (
                    <div className="space-y-2">
                      <div className="text-[11px] font-mono text-red-400 font-bold">
                        ⚠️ Low Contrast & Hidden in Submenu:
                      </div>
                      <button
                        onClick={handleToggleDefrost}
                        className={`w-full py-2.5 rounded text-xs font-mono font-bold border transition-colors cursor-pointer ${
                          defrostOn
                            ? 'bg-cyan-800 text-cyan-100 border-cyan-600'
                            : 'bg-stone-800 text-stone-400 border-stone-700 hover:text-stone-200'
                        }`}
                      >
                        {defrostOn ? 'Defrost Status: 1' : 'Sub-function 04: Toggle Defrost'}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-[11px] font-mono text-emerald-400 font-bold">
                        ✓ Dedicated High-Contrast Emergency Tile:
                      </div>
                      <button
                        onClick={handleToggleDefrost}
                        className={`w-full py-4 rounded-2xl font-mono font-bold text-base border-2 transition-all cursor-pointer flex items-center justify-center gap-3 shadow-md ${
                          defrostOn
                            ? 'bg-cyan-600 text-white border-cyan-300 ring-4 ring-cyan-500/20'
                            : 'bg-stone-800 hover:bg-stone-700 text-cyan-400 border-cyan-800'
                        }`}
                      >
                        <Wind className="w-6 h-6 shrink-0" />
                        <span>{defrostOn ? 'Windshield Defrost ON (Max)' : 'Tap to Activate Defroster'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom In-Console Status Strip */}
            <div className="pt-3 border-t border-current/15 mt-3 flex items-center justify-between text-xs font-mono opacity-80">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>
                  {env === 'night_drive'
                    ? 'Continuous chassis vibration (12Hz) & road seam jolts active.'
                    : env === 'sun_glare'
                    ? 'Solar glare sweeping across screen: 7:1 contrast drops to 1.3:1.'
                    : 'Ideal static desk testing conditions (0 physical disturbance).'}
                </span>
              </div>
              {env === 'night_drive' && (
                <button
                  onClick={triggerManualBump}
                  className="px-3 py-1 bg-red-900/80 hover:bg-red-800 text-white text-xs font-bold rounded-lg border border-red-700 cursor-pointer"
                >
                  Hit Road Pothole (Test Motor Drift)
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Cognitive Load & Ergonomic Telemetry Dashboard (4 cols) */}
        <div className="lg:col-span-4 bg-white border-2 border-[#E8E2D9] rounded-3xl p-5 lg:p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE3] flex-shrink-0">
            <span className="text-xs font-mono uppercase text-[#E5391C] font-bold tracking-wider">
              Ergonomic Telemetry Bench
            </span>
            <span className="text-xs font-mono font-bold text-stone-500">Live Sensors</span>
          </div>

          <div className="space-y-3.5 flex-1 flex flex-col justify-center">
            {/* Visual Dwell Glance Timer */}
            <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-[#E8E2D9] space-y-1.5 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-mono text-[#6E6D70] font-bold">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-[#E5391C]" />
                  Total Eyes-Off-Road Glance Time
                </span>
                <span className="text-[11px] font-mono">Limit: 2.0s</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span
                  className={`text-4xl sm:text-5xl font-mono font-bold ${
                    glanceTime > 2.0 && env === 'night_drive' ? 'text-red-600 animate-pulse' : 'text-[#2D2D2E]'
                  }`}
                >
                  {glanceTime.toFixed(1)}s
                </span>
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    glanceTime > 2.0 && env === 'night_drive'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {glanceTime > 2.0 && env === 'night_drive' ? 'CRITICAL SAFETY BREACH' : 'Nominal'}
                </span>
              </div>
              {/* NHTSA Progress Bar */}
              <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden mt-1">
                <div
                  className={`h-full transition-all duration-150 ${
                    glanceTime > 2.0 ? 'bg-red-600' : glanceTime > 1.2 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min((glanceTime / 2.0) * 100, 100)}%` }}
                />
              </div>
              <p className="text-[11px] font-mono text-stone-500">
                At 120 km/h, 2 seconds = 66 meters driven completely blind.
              </p>
            </div>

            {/* Physical Motor Mis-Taps */}
            <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-[#E8E2D9] space-y-1 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-mono text-[#6E6D70] font-bold">
                <span className="flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Physical Motor Drift (Mis-Taps)
                </span>
                <span className="text-xs font-mono">Error Count</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span
                  className={`text-4xl sm:text-5xl font-mono font-bold ${
                    misTaps > 0 ? 'text-[#E5391C]' : 'text-emerald-600'
                  }`}
                >
                  {misTaps}
                </span>
                <span className="text-xs font-mono text-stone-600 font-bold">
                  {misTaps === 0 ? 'Zero Slip' : `${misTaps} Finger Slippages`}
                </span>
              </div>
              <p className="text-[11px] font-mono text-stone-500">
                Induced by chassis road jitter + undersized touch targets (&lt;48px).
              </p>
            </div>

            {/* Environmental Strain Sensor Box */}
            <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-[#E8E2D9] space-y-1 shadow-2xs">
              <div className="text-xs font-mono text-[#6E6D70] font-bold">Context Stress Factor:</div>
              <div className="text-sm sm:text-base font-bold text-[#2D2D2E]">
                {env === 'desk' && '🟢 Nominal: Zero physical or perceptual degradation'}
                {env === 'night_drive' && '🔴 Severe: 120 km/h motor jitter + divided attention'}
                {env === 'sun_glare' && '🟡 Perceptual: 94,500 lux glare washes contrast by 80%'}
              </div>
            </div>
          </div>

          {/* Quick Takeaway Callout */}
          <div className="p-3 bg-[#FDF5F2] border border-[#FAD6CF] rounded-2xl text-xs sm:text-sm font-medium text-[#2D2D2E] leading-relaxed flex-shrink-0">
            <strong>Key Insight:</strong> Never evaluate in-vehicle or mobile software on an office desktop with a mouse. Physical motion turns simple clicks into hazardous tasks.
          </div>
        </div>
      </div>

      {/* Classroom Takeaway Banner */}
      <div className="p-4 bg-white border-2 border-[#E5391C] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs flex-shrink-0">
        <p className="text-base sm:text-lg lg:text-xl text-[#2D2D2E] leading-relaxed">
          <strong className="text-[#E5391C] font-serif-display text-lg sm:text-xl font-bold mr-2">
            Pedagogical Law:
          </strong>
          An interface never exists in a vacuum. Lab usability testing measures peak human capability. Real-world context of use exposes catastrophic failure modes. Always test in the field.
        </p>
        <span className="text-xs sm:text-sm font-mono text-white bg-[#E5391C] font-bold px-3.5 py-1.5 rounded-xl whitespace-nowrap shadow-2xs">
          Field Context Testing
        </span>
      </div>
    </div>
  );
};
