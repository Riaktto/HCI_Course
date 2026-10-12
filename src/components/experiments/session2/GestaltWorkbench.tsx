import React, { useState } from 'react';
import { Layers, CheckCircle2, Sliders, Eye, Zap, AlertTriangle, ShieldCheck } from 'lucide-react';

export const GestaltWorkbench: React.FC = () => {
  const [useProximity, setUseProximity] = useState<boolean>(false);
  const [useSimilarity, setUseSimilarity] = useState<boolean>(false);
  const [useCommonRegion, setUseCommonRegion] = useState<boolean>(false);
  const [useContinuity, setUseContinuity] = useState<boolean>(false);

  const toggleAll = () => {
    const next = !(useProximity && useSimilarity && useCommonRegion && useContinuity);
    setUseProximity(next);
    setUseSimilarity(next);
    setUseCommonRegion(next);
    setUseContinuity(next);
  };

  const activeCount = [useProximity, useSimilarity, useCommonRegion, useContinuity].filter(Boolean).length;

  return (
    <div className="h-full flex flex-col p-6 sm:p-8 bg-[#FAF9F6] text-[#2D2D2E] overflow-y-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E8E2D9]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-[#3b82f6] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 uppercase tracking-wider">
              Visual Perception Laboratory
            </span>
            <span className="text-xs font-mono text-stone-500 font-semibold">
              Gestalt Principles: Proximity · Similarity · Common Region · Continuity
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif-display text-[#2D2D2E]">
            Transforming Data Noise into Instant Visual Hierarchy
          </h2>
        </div>

        <button
          onClick={toggleAll}
          className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-mono font-bold rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-2"
        >
          <Sliders className="w-4 h-4" />
          {activeCount === 4 ? 'Reset to Raw Chaos' : 'Apply All Gestalt Principles'}
        </button>
      </div>

      {/* Main Grid: Controls on Left (4 cols), Live Canvas on Right (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 flex-1 items-start">
        {/* Gestalt Principle Toggles (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="p-4 bg-white rounded-xl border border-[#E8E2D9] shadow-xs space-y-3">
            <span className="text-xs font-mono uppercase font-bold text-stone-700">Perceptual Controls:</span>

            {/* Toggle 1: Proximity */}
            <label className="flex items-start gap-3 p-3 bg-stone-50 hover:bg-stone-100/80 rounded-lg border border-stone-200 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={useProximity}
                onChange={e => setUseProximity(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-stone-300"
              />
              <div className="text-xs">
                <span className="font-bold text-stone-900 block font-mono">1. Law of Proximity</span>
                <span className="text-stone-500">Group related data points via spatial closeness rather than uniform spacing.</span>
              </div>
            </label>

            {/* Toggle 2: Similarity */}
            <label className="flex items-start gap-3 p-3 bg-stone-50 hover:bg-stone-100/80 rounded-lg border border-stone-200 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={useSimilarity}
                onChange={e => setUseSimilarity(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-stone-300"
              />
              <div className="text-xs">
                <span className="font-bold text-stone-900 block font-mono">2. Law of Similarity</span>
                <span className="text-stone-500">Differentiate critical alarms vs normal states using consistent color and type tokens.</span>
              </div>
            </label>

            {/* Toggle 3: Common Region */}
            <label className="flex items-start gap-3 p-3 bg-stone-50 hover:bg-stone-100/80 rounded-lg border border-stone-200 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={useCommonRegion}
                onChange={e => setUseCommonRegion(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-stone-300"
              />
              <div className="text-xs">
                <span className="font-bold text-stone-900 block font-mono">3. Law of Common Region</span>
                <span className="text-stone-500">Enclose subsystem metrics within background cards and distinct borders.</span>
              </div>
            </label>

            {/* Toggle 4: Continuity */}
            <label className="flex items-start gap-3 p-3 bg-stone-50 hover:bg-stone-100/80 rounded-lg border border-stone-200 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={useContinuity}
                onChange={e => setUseContinuity(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-stone-300"
              />
              <div className="text-xs">
                <span className="font-bold text-stone-900 block font-mono">4. Law of Continuity & Alignment</span>
                <span className="text-stone-500">Snap labels and metric values onto strict vertical reading rails.</span>
              </div>
            </label>
          </div>

          <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200 text-xs text-blue-900 space-y-1.5 font-mono">
            <div className="font-bold flex items-center gap-1.5 text-blue-800">
              <Eye className="w-4 h-4" />
              Cognitive Scan Speed:
            </div>
            <p>
              {activeCount === 0 && '❌ Raw Chaos: Eye scans serially. Finding pump fault takes ~4.2 seconds.'}
              {activeCount === 1 && '⚠️ Basic Grouping: Proximity reduces ambiguity but lacks visual hierarchy.'}
              {activeCount === 2 && '⚡ Partial Hierarchy: Brain pre-attentively groups alerts, but boundaries remain soft.'}
              {activeCount === 3 && '🔥 High Clarity: Subsystem cards define clear visual boundaries.'}
              {activeCount === 4 && '✓ Optimal Gestalt Hierarchy: The eye detects the faulty pump in <180 milliseconds.'}
            </p>
          </div>
        </div>

        {/* Right Canvas: Live Telemetry Dashboard (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs min-h-[460px]">
          <div className="border-b border-stone-200 pb-3 mb-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase font-bold text-stone-500">Simulated Facility Console:</span>
              <h3 className="text-base font-bold text-stone-900 font-serif-display">UM6P Solar & Irrigation Microgrid Telemetry</h3>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-600">Live Stream</span>
          </div>

          {/* Subsystems container */}
          <div className={useProximity ? 'space-y-6' : 'space-y-2'}>
            {/* Subsystem 1: Solar Inverters */}
            <div className={useCommonRegion ? 'p-4 bg-stone-50 rounded-xl border border-stone-200 shadow-xs' : 'p-2'}>
              <div className="text-xs font-mono font-bold uppercase mb-2 text-stone-700">
                Subsystem A · Solar Inverter Array
              </div>
              <div className={`grid ${useContinuity ? 'grid-cols-3 gap-4' : 'grid-cols-2 gap-1'} font-mono text-xs`}>
                <div className={`p-2 rounded ${useSimilarity ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' : 'bg-stone-100 text-stone-800'}`}>
                  <span className="text-[11px] text-stone-500 block">Inverter 01 Output:</span>
                  <span className="font-bold text-sm">482.4 kW [NORMAL]</span>
                </div>
                <div className={`p-2 rounded ${useSimilarity ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' : 'bg-stone-100 text-stone-800'}`}>
                  <span className="text-[11px] text-stone-500 block">Inverter 02 Output:</span>
                  <span className="font-bold text-sm">479.1 kW [NORMAL]</span>
                </div>
                <div className={`p-2 rounded ${useSimilarity ? 'bg-amber-50 border border-amber-200 text-amber-900' : 'bg-stone-100 text-stone-800'}`}>
                  <span className="text-[11px] text-stone-500 block">Grid Inverter Frequency:</span>
                  <span className="font-bold text-sm">49.8 Hz [VARIATION]</span>
                </div>
              </div>
            </div>

            {/* Subsystem 2: High-Pressure Irrigation Pumps */}
            <div className={useCommonRegion ? 'p-4 bg-stone-50 rounded-xl border border-stone-200 shadow-xs' : 'p-2'}>
              <div className="text-xs font-mono font-bold uppercase mb-2 text-stone-700">
                Subsystem B · Hydraulic Irrigation Pumps
              </div>
              <div className={`grid ${useContinuity ? 'grid-cols-3 gap-4' : 'grid-cols-2 gap-1'} font-mono text-xs`}>
                <div className={`p-2 rounded ${useSimilarity ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' : 'bg-stone-100 text-stone-800'}`}>
                  <span className="text-[11px] text-stone-500 block">Pump Line Alpha Pressure:</span>
                  <span className="font-bold text-sm">6.2 Bar [FLOW OK]</span>
                </div>
                <div className={`p-2 rounded ${useSimilarity ? 'bg-[#FDF5F2] border-2 border-[#E5391C] text-[#E5391C] shadow-sm animate-pulse' : 'bg-stone-100 text-stone-800'}`}>
                  <span className="text-[11px] text-stone-500 block">Pump Line Beta Pressure:</span>
                  <span className="font-bold text-sm">0.8 Bar [CAVITATION FAULT!]</span>
                </div>
                <div className={`p-2 rounded ${useSimilarity ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' : 'bg-stone-100 text-stone-800'}`}>
                  <span className="text-[11px] text-stone-500 block">Main Sump Reservoir:</span>
                  <span className="font-bold text-sm">84% Capacity</span>
                </div>
              </div>
            </div>

            {/* Subsystem 3: Soil Moisture Telemetry */}
            <div className={useCommonRegion ? 'p-4 bg-stone-50 rounded-xl border border-stone-200 shadow-xs' : 'p-2'}>
              <div className="text-xs font-mono font-bold uppercase mb-2 text-stone-700">
                Subsystem C · Soil Moisture Mesh
              </div>
              <div className={`grid ${useContinuity ? 'grid-cols-3 gap-4' : 'grid-cols-2 gap-1'} font-mono text-xs`}>
                <div className={`p-2 rounded ${useSimilarity ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' : 'bg-stone-100 text-stone-800'}`}>
                  <span className="text-[11px] text-stone-500 block">Zone 1 (Olives):</span>
                  <span className="font-bold text-sm">28% Volumetric</span>
                </div>
                <div className={`p-2 rounded ${useSimilarity ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' : 'bg-stone-100 text-stone-800'}`}>
                  <span className="text-[11px] text-stone-500 block">Zone 2 (Argan):</span>
                  <span className="font-bold text-sm">19% Volumetric</span>
                </div>
                <div className={`p-2 rounded ${useSimilarity ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' : 'bg-stone-100 text-stone-800'}`}>
                  <span className="text-[11px] text-stone-500 block">Zone 3 (Wheat Experimental):</span>
                  <span className="font-bold text-sm">31% Volumetric</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
