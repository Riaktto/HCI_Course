import React, { useState, useEffect } from 'react';
import { Sliders, AlertTriangle, CheckCircle2, RotateCcw, Droplet, Gauge, Flame, Info } from 'lucide-react';

export const MentalModelSimulator: React.FC = () => {
  const [interfaceMode, setInterfaceMode] = useState<'deceptive_valve' | 'honest_relay'>('deceptive_valve');

  // Deceptive Valve State
  const [dialSetting, setDialSetting] = useState<number>(30); // 0 to 100%
  const [soilMoistureA, setSoilMoistureA] = useState<number>(18);
  const [pumpCavitationA, setPumpCavitationA] = useState<boolean>(false);
  const [floodingWarningA, setFloodingWarningA] = useState<boolean>(false);

  // Honest Relay State
  const [targetMoistureB, setTargetMoistureB] = useState<number>(35); // Target %
  const [currentMoistureB, setCurrentMoistureB] = useState<number>(18);
  const [pumpStateB, setPumpStateB] = useState<'IDLE' | 'PUMPING_OPTIMAL' | 'REACHED'>('PUMPING_OPTIMAL');

  // Simulation tick
  useEffect(() => {
    const timer = setInterval(() => {
      // Condition A behavior: If user cranks dial to 90-100%, flood occurs
      if (interfaceMode === 'deceptive_valve') {
        if (dialSetting > 75) {
          setSoilMoistureA(prev => Math.min(65, prev + 2.5));
          setPumpCavitationA(true);
          setFloodingWarningA(true);
        } else if (dialSetting > 20) {
          setSoilMoistureA(prev => Math.min(35, prev + 0.8));
          setPumpCavitationA(false);
          setFloodingWarningA(false);
        }
      } else {
        // Condition B: Smart automated feedback loop
        setCurrentMoistureB(prev => {
          if (prev < targetMoistureB) {
            setPumpStateB('PUMPING_OPTIMAL');
            return Math.min(targetMoistureB, Number((prev + 0.8).toFixed(1)));
          } else {
            setPumpStateB('REACHED');
            return prev;
          }
        });
      }
    }, 800);

    return () => clearInterval(timer);
  }, [interfaceMode, dialSetting, targetMoistureB]);

  const resetSim = () => {
    setDialSetting(30);
    setSoilMoistureA(18);
    setPumpCavitationA(false);
    setFloodingWarningA(false);
    setTargetMoistureB(35);
    setCurrentMoistureB(18);
    setPumpStateB('PUMPING_OPTIMAL');
  };

  return (
    <div className="h-full flex flex-col p-6 sm:p-8 bg-[#FAF9F6] text-[#2D2D2E] overflow-y-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E8E2D9]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-[#10b981] bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 uppercase tracking-wider">
              Mental Model Mismatch Simulator
            </span>
            <span className="text-xs font-mono text-stone-500 font-semibold">
              Kempton’s Valve Fallacy vs Feedback Relays
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif-display text-[#2D2D2E]">
            Agricultural Irrigation: The "Accelerator Dial" Trap
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => { setInterfaceMode('deceptive_valve'); resetSim(); }}
            className={`px-3.5 py-2 text-xs font-mono font-bold rounded-lg border transition-all cursor-pointer ${
              interfaceMode === 'deceptive_valve'
                ? 'bg-[#E5391C] text-white border-[#E5391C]'
                : 'bg-white text-stone-700 border-stone-200'
            }`}
          >
            Interface A: Deceptive Valve Dial
          </button>
          <button
            onClick={() => { setInterfaceMode('honest_relay'); resetSim(); }}
            className={`px-3.5 py-2 text-xs font-mono font-bold rounded-lg border transition-all cursor-pointer ${
              interfaceMode === 'honest_relay'
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white text-stone-700 border-stone-200'
            }`}
          >
            Interface B: Honest System Image
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 flex-1 items-start">
        {/* Left: Interactive Irrigation Terminal (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs min-h-[420px] flex flex-col justify-between">
            {interfaceMode === 'deceptive_valve' ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <span className="text-xs font-mono uppercase font-bold text-stone-500">Legacy Farm Console:</span>
                  <span className="text-xs font-mono font-bold text-[#E5391C] bg-[#FDF5F2] px-2.5 py-0.5 rounded border border-[#FAD6CF]">
                    Valve Model Simulation
                  </span>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-xs text-stone-600">
                    The operator wants the olive trees to absorb water quickly. Because the interface is a rotary dial, the human mental model says: <em>"Turn it to 100% to pump faster!"</em>
                  </p>

                  <div className="p-4 max-w-sm mx-auto bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                    <label className="text-xs font-mono uppercase font-bold text-stone-700 block">
                      Irrigation Flow Dial: <strong className="text-lg text-[#E5391C]">{dialSetting}%</strong>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={dialSetting}
                      onChange={e => setDialSetting(Number(e.target.value))}
                      className="w-full accent-[#E5391C] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] font-mono text-stone-400">
                      <span>0% (OFF)</span>
                      <span>50%</span>
                      <span>100% (CRANK TO MAX)</span>
                    </div>
                  </div>
                </div>

                {/* Telemetry outcome */}
                <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                    <span className="text-stone-500 block">Current Soil Moisture:</span>
                    <span className={`text-base font-bold ${soilMoistureA > 50 ? 'text-[#E5391C]' : 'text-stone-800'}`}>
                      {soilMoistureA.toFixed(1)}% {soilMoistureA > 50 ? '(FLOOD HAZARD!)' : ''}
                    </span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                    <span className="text-stone-500 block">Pump Cavitation Risk:</span>
                    <span className={`text-base font-bold ${pumpCavitationA ? 'text-[#E5391C] animate-pulse' : 'text-emerald-700'}`}>
                      {pumpCavitationA ? 'CRITICAL (OVERHEATING)' : 'NORMAL'}
                    </span>
                  </div>
                </div>

                {floodingWarningA && (
                  <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl flex items-center gap-2.5 text-xs text-rose-900 font-mono">
                    <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                    <div>
                      <strong>System Failure:</strong> User treated the feedback relay as an accelerator valve. Soil flooded and root rot triggered!
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <span className="text-xs font-mono uppercase font-bold text-stone-500">Smart Precision Console:</span>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    Honest Feedback Model
                  </span>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-xs text-stone-600">
                    Interface explicitly communicates the system reality: the pump is an on/off relay with automatic flow rate control. The operator sets desired soil moisture.
                  </p>

                  <div className="p-4 max-w-sm mx-auto bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                    <label className="text-xs font-mono uppercase font-bold text-stone-700 block">
                      Target Soil Saturation: <strong className="text-lg text-emerald-700">{targetMoistureB}% Volumetric</strong>
                    </label>
                    <input
                      type="range"
                      min="20"
                      max="50"
                      value={targetMoistureB}
                      onChange={e => setTargetMoistureB(Number(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] font-mono text-stone-400">
                      <span>20% (Dry)</span>
                      <span>35% (Optimal Olives)</span>
                      <span>50% (Max)</span>
                    </div>
                  </div>
                </div>

                {/* Telemetry outcome */}
                <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-3 bg-emerald-50/70 rounded-lg border border-emerald-200">
                    <span className="text-emerald-800 block">Current Soil Sensor:</span>
                    <span className="text-base font-bold text-emerald-900">
                      {currentMoistureB.toFixed(1)}% / {targetMoistureB}%
                    </span>
                  </div>
                  <div className="p-3 bg-emerald-50/70 rounded-lg border border-emerald-200">
                    <span className="text-emerald-800 block">Relay Automation Status:</span>
                    <span className="text-base font-bold text-emerald-900">
                      {pumpStateB === 'PUMPING_OPTIMAL' ? '✓ Pumping (Auto-Regulated)' : '✓ Target Reached (Idle)'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center gap-2.5 text-xs text-emerald-900 font-mono">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <strong>System Aligned:</strong> The System Image honestly conveys how the hardware operates. Operator errors drop to zero.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Norman’s Triad Theory Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 bg-white rounded-xl border border-[#E8E2D9] shadow-xs space-y-2">
            <span className="text-xs font-mono uppercase font-bold text-stone-500">Norman’s Conceptual Triad</span>
            <h3 className="text-base font-bold text-stone-900 font-serif-display">Why System Images Deceive</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              When software uses familiar physical controls (like rotary dials), users map familiar physical rules (like water taps). But digital systems rarely operate like water taps. When the System Image suggests a model different from technical reality, operator error is inevitable.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#E8E2D9] shadow-xs space-y-2 font-mono text-xs">
            <span className="font-bold text-stone-700 uppercase block">The 3-Part Architecture:</span>
            <div className="space-y-1.5">
              <div className="p-2 bg-stone-50 rounded border border-stone-200">
                <span className="font-bold text-stone-800">1. Designer’s Model:</span> The binary microcontroller relay algorithm.
              </div>
              <div className="p-2 bg-stone-50 rounded border border-stone-200">
                <span className="font-bold text-stone-800">2. System Image:</span> The dial vs the automated target setpoint slider.
              </div>
              <div className="p-2 bg-stone-50 rounded border border-stone-200">
                <span className="font-bold text-stone-800">3. User’s Mental Model:</span> "Crank to max to water faster" vs "Set goal and let system regulate".
              </div>
            </div>
          </div>

          <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs text-emerald-950 font-mono space-y-1">
            <span className="font-bold block uppercase text-emerald-800">The Golden Rule:</span>
            <p>
              Never let the visual UI tell a metaphorical lie that the underlying hardware or database cannot fulfill.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
