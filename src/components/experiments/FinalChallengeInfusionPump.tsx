import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Syringe,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
  Activity,
  Users,
  Search,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { UM6PLogo } from '../brand/UM6PLogo';

export const FinalChallengeInfusionPump: React.FC = () => {
  // Timer state for classroom discussion (3 minutes)
  const [timerSec, setTimerSec] = useState<number>(180);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'evidence' | 'timeline' | 'redesign'>('evidence');
  // Diagnostic is HIDDEN by default as requested
  const [revealAnalysis, setRevealAnalysis] = useState<boolean>(false);
  const [selectedIssueId, setSelectedIssueId] = useState<number | null>(null);
  const [pumpVersion, setPumpVersion] = useState<'flawed' | 'safe'>('flawed');

  // Interactive console state for live student experimentation
  const [inputVal, setInputVal] = useState<string>('1.0');
  const [modeState, setModeState] = useState<'RATE' | 'VTBI'>('RATE');
  const [isInfusing, setIsInfusing] = useState<boolean>(true);
  const [bolusTriggered, setBolusTriggered] = useState<boolean>(false);
  const [alarmActive, setAlarmActive] = useState<boolean>(false);

  // Timer countdown
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSec > 0) {
      interval = setInterval(() => {
        setTimerSec((t) => t - 1);
      }, 1000);
    } else if (timerSec === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSec]);

  const toggleTimer = () => setIsTimerRunning(!isTimerRunning);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSec(180);
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const forensicIssues = [
    {
      id: 1,
      title: 'Microscopic 1-Pixel Decimal Point',
      law: 'Gulf of Evaluation & Contrast Ratio',
      location: 'Main Segment Display',
      evidence: 'Unlit 1px dot on LCD. At 03:30 AM in dim ICU lighting, "1.0 mL/hr" is visually parsed as "10 mL/hr".',
      consequence: 'Nurse administered 10.0 mL/hr (1,000% lethal overdose of Morphine).',
      remedy: 'High-contrast tall decimal glyphs, explicit leading/trailing warnings, and bold unit suffix.',
      pinCoords: 'top-[36%] left-[30%]',
    },
    {
      id: 2,
      title: 'Deadly Shared Mode Register',
      law: 'Norman Mode Error & Cognitive Interference',
      location: 'RATE / VTBI Dual-Function Screen',
      evidence: 'Single numeric display toggles between Rate (mL/hr) and Total Volume (VTBI) via a microscopic LED.',
      consequence: 'Nurses intended to enter 100 mL total volume, but accidentally programmed 100 mL/hr infusion rate.',
      remedy: 'Separate dedicated physical displays for Delivery Rate vs Total Volume; impossible to conflate registers.',
      pinCoords: 'top-[22%] left-[44%]',
    },
    {
      id: 3,
      title: 'Missing Soft/Hard Dose Guardrails',
      law: 'Dose Error Reduction System (DERS)',
      location: 'Software Validation Logic',
      evidence: 'Software allows entering 500 mL/hr of concentrated opioid with zero safety bounds check.',
      consequence: 'Zero algorithmic sanity bounds. The machine executes lethal inputs without cognitive friction.',
      remedy: 'Automated soft limits (warning modal) and hard limits (un-overridable block if dose > 2.0 mL/hr for Morphine).',
      pinCoords: 'top-[42%] right-[22%]',
    },
    {
      id: 4,
      title: 'Lethal Button Proximity (Fitts’s Law)',
      law: 'Fitts’s Law & Affordance Discrimination',
      location: 'Keypad Control Strip',
      evidence: 'High-velocity "BOLUS" (immediate 50mL dump) is placed directly next to "SILENCE ALARM" with identical shape.',
      consequence: 'Nurse rushing to quiet a beeping pump at night accidentally strikes BOLUS, injecting acute opioid surge.',
      remedy: 'Physical hinged safety cover over BOLUS, distinct textured silicone tactile feel, and double-press confirmation.',
      pinCoords: 'bottom-[22%] right-[32%]',
    },
  ];

  const currentIssue = forensicIssues.find((i) => i.id === selectedIssueId) || forensicIssues[0];

  const handleKeypadPress = (val: string) => {
    if (pumpVersion === 'safe') {
      if (val === 'C') {
        setInputVal('0.0');
      } else {
        const next = inputVal === '0.0' ? val : (inputVal + val).slice(0, 4);
        setInputVal(next);
      }
    } else {
      if (val === 'C') {
        setInputVal('0');
      } else {
        const next = (inputVal + val).slice(0, 4);
        setInputVal(next);
      }
    }
  };

  const handleBolusClick = () => {
    if (pumpVersion === 'safe') {
      setAlarmActive(true);
    } else {
      setBolusTriggered(true);
      setTimeout(() => setBolusTriggered(false), 3000);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 bg-[#FAF9F6] overflow-y-auto select-text">
      {/* Top Standard Header */}
      <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <UM6PLogo variant="compact" theme="color" className="h-6 lg:h-7 w-auto" />
          <div className="h-4 w-px bg-[#E8E2D9]" />
          <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
            Act 6 · Capstone Forensic Diagnostic
          </span>
          <span className="hidden sm:inline-block text-xs font-mono text-stone-400">|</span>
          <span className="text-xs sm:text-sm font-mono font-bold text-red-900 bg-red-100 px-3 py-1 rounded-xl">
            Case File #ICU-MORPHINE-904
          </span>
        </div>

        {/* 3-Minute Discussion Stopwatch & Reveal Controller */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 bg-white border-2 border-[#E8E2D9] rounded-2xl font-mono text-xs shadow-xs">
            <Clock className="w-4 h-4 text-[#E5391C]" />
            <span className="text-[#6E6D70] font-bold">Discussion:</span>
            <strong className="text-[#E5391C] text-sm sm:text-base font-bold font-mono">
              {formatTimer(timerSec)}
            </strong>
            <button
              onClick={toggleTimer}
              className="p-1 hover:bg-stone-100 rounded-lg text-[#2D2D2E] cursor-pointer transition-colors"
              title={isTimerRunning ? 'Pause Timer' : 'Start Timer'}
            >
              {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-600" />}
            </button>
            <button
              onClick={resetTimer}
              className="p-1 hover:bg-stone-100 rounded-lg text-stone-500 hover:text-stone-900 cursor-pointer transition-colors"
              title="Reset Timer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => {
              const nextState = !revealAnalysis;
              setRevealAnalysis(nextState);
              if (nextState) setSelectedIssueId(1);
            }}
            className={`px-4 py-2 text-xs sm:text-sm font-mono font-bold rounded-xl cursor-pointer transition-all shadow-xs ${
              revealAnalysis
                ? 'bg-[#E5391C] text-white ring-2 ring-[#E5391C]/30'
                : 'bg-stone-900 text-white hover:bg-stone-800'
            }`}
          >
            {revealAnalysis ? '✕ Hide Diagnostic' : '🔍 Reveal Forensic Diagnostic'}
          </button>
        </div>
      </div>

      {/* Main Forensic Examination Stage */}
      <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-3 lg:py-4 gap-4 min-h-0">
        {/* Title and Briefing Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 flex-shrink-0">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-medium text-[#2D2D2E]">
              The Hospital Infusion Pump Catastrophe
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-[#6E6D70] font-light mt-0.5">
              Prescription: <strong>1.0 mL/hr</strong> Morphine. The machine delivered <strong>10.0 mL/hr</strong>. You are the HCI Investigator: what caused the fatal overdose?
            </p>
          </div>

          {/* Interactive Hardware Paradigm Switcher */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border-2 border-[#E8E2D9] shadow-xs self-start lg:self-auto shrink-0">
            <button
              onClick={() => setPumpVersion('flawed')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold cursor-pointer transition-all ${
                pumpVersion === 'flawed'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              ⚠ Flawed ICU Console (Incident)
            </button>
            <button
              onClick={() => setPumpVersion('safe')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold cursor-pointer transition-all ${
                pumpVersion === 'safe'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              ✓ Ergonomic Smart Redesign
            </button>
          </div>
        </div>

        {/* 2-Column Clinical Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 flex-1 items-stretch min-h-0">
          {/* Left Column: Authentic Interactive Infusion Hardware (7 cols) */}
          <div className={`lg:col-span-7 rounded-3xl p-4 sm:p-5 lg:p-6 flex flex-col justify-between shadow-xs border-2 relative transition-all ${
            pumpVersion === 'flawed'
              ? 'bg-[#1C1B1A] border-stone-800 text-stone-200'
              : 'bg-[#F4F9F5] border-emerald-300 text-stone-900'
          }`}>
            {/* Console Branding Bar */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <Syringe className={`w-5 h-5 ${pumpVersion === 'flawed' ? 'text-red-400' : 'text-emerald-600'}`} />
                <div>
                  <span className="text-xs sm:text-sm font-mono font-bold tracking-wider uppercase block">
                    {pumpVersion === 'flawed' ? 'MED-TECH 3000 INFUSION CONSOLE' : 'HCI SAFEGUARD-X SMART PUMP'}
                  </span>
                  <span className="text-[11px] font-mono text-stone-400">
                    {pumpVersion === 'flawed' ? 'Legacy Hardware v2.4 (Unshielded)' : 'ISO 9241-11 Compliant with DERS Guardrails'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono font-bold px-3 py-1 rounded-xl uppercase flex items-center gap-1.5 ${
                  bolusTriggered
                    ? 'bg-red-600 text-white animate-bounce'
                    : pumpVersion === 'flawed'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                }`}>
                  <Activity className="w-3.5 h-3.5" />
                  <span>{bolusTriggered ? 'BOLUS SURGE ACTIVE' : isInfusing ? 'INFUSING' : 'STANDBY'}</span>
                </span>
                <span className="text-xs font-mono bg-white/10 px-2.5 py-1 rounded-xl text-stone-300">
                  ICU Bed 04 · Morphine
                </span>
              </div>
            </div>

            {/* Hardware Digital Screen & Hotspot Pin Overlay */}
            <div className="relative my-2 flex-1 flex flex-col justify-center min-h-0">
              {/* Hotspot Pins (Only shown when revealAnalysis is true) */}
              {revealAnalysis && (
                <>
                  {forensicIssues.map((issue) => {
                    const isSelected = selectedIssueId === issue.id;
                    return (
                      <button
                        key={issue.id}
                        onClick={() => setSelectedIssueId(issue.id)}
                        className={`absolute z-30 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-125 ${issue.pinCoords}`}
                        title={issue.title}
                      >
                        <span className={`flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs font-bold text-white shadow-lg ring-4 ${
                          isSelected
                            ? 'bg-[#E5391C] ring-red-300 animate-pulse scale-110'
                            : 'bg-stone-900 ring-stone-400 hover:bg-red-600'
                        }`}>
                          {issue.id}
                        </span>
                      </button>
                    );
                  })}
                </>
              )}

              {pumpVersion === 'flawed' ? (
                /* Flawed Hardware Interface */
                <div className="bg-[#121110] border-2 border-stone-700 rounded-2xl p-4 shadow-inner space-y-3">
                  {/* Status Bar with microscopic Mode LED */}
                  <div className="flex items-center justify-between text-xs font-mono border-b border-stone-800 pb-2 text-stone-400">
                    <div className="flex items-center gap-3">
                      <span className="text-stone-300">DRUG: <strong>MORPHINE SULFATE</strong></span>
                      <span className="text-stone-500">|</span>
                      <span className="text-red-400">CONC: 50mg / 50mL</span>
                    </div>
                    {/* Flawed: tiny amber LED indicates mode */}
                    <div className="flex items-center gap-2 bg-stone-900 px-3 py-1 rounded-lg border border-stone-800">
                      <span className={`w-2 h-2 rounded-full ${modeState === 'RATE' ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b]' : 'bg-stone-700'}`} />
                      <span className="text-[11px] text-amber-200">ACTIVE REGISTER: {modeState}</span>
                    </div>
                  </div>

                  {/* The Lethal 1-Pixel Decimal Display */}
                  <div className="bg-[#0A0A0A] p-4 rounded-xl border border-stone-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono text-stone-400 uppercase tracking-wider mb-1">
                        Programmed Delivery Register
                      </div>
                      {/* Visual Flaw: The 1px unlit dot makes 1.0 look indistinguishable from 10 */}
                      <div className="flex items-baseline gap-1">
                        <span className="font-mono text-4xl sm:text-5xl font-bold tracking-tight text-amber-400">
                          {inputVal.split('.')[0] || inputVal}
                        </span>
                        {/* 1px dot */}
                        <span className="text-xs text-stone-600 font-mono font-bold">.</span>
                        <span className="font-mono text-4xl sm:text-5xl font-bold tracking-tight text-amber-400">
                          {inputVal.includes('.') ? inputVal.split('.')[1] || '0' : '0'}
                        </span>
                        <span className="text-xs font-mono text-stone-400 ml-2">
                          {modeState === 'RATE' ? 'mL/hr' : 'mL (VTBI)'}
                        </span>
                      </div>
                    </div>

                    <div className="text-right space-y-1">
                      <div className="text-xs font-mono text-stone-400">Prescription Limit:</div>
                      <div className="text-xs sm:text-sm font-mono font-bold text-red-400 bg-red-950/60 px-3 py-1 rounded-lg border border-red-900">
                        MAX SAFE: 2.0 mL/hr
                      </div>
                      <div className="text-[11px] font-mono text-amber-500">
                        Delivering: {inputVal === '1.0' ? '10.0 mL/hr (Fatal Overdose)' : `${inputVal} mL/hr`}
                      </div>
                    </div>
                  </div>

                  {/* Physical Membrane Keypad & Dangerous Bolus Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 pt-1">
                    {/* Number Pad (7 cols) */}
                    <div className="sm:col-span-7 grid grid-cols-3 gap-1.5 bg-stone-900/80 p-2 rounded-xl border border-stone-800">
                      {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '.'].map((key) => (
                        <button
                          key={key}
                          onClick={() => handleKeypadPress(key)}
                          className="py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-mono font-bold text-xs sm:text-sm rounded-lg border border-stone-700 active:scale-95 cursor-pointer transition-all"
                        >
                          {key}
                        </button>
                      ))}
                    </div>

                    {/* Dangerous Action Strip (5 cols) */}
                    <div className="sm:col-span-5 flex flex-col justify-between gap-1.5">
                      <button
                        onClick={() => setModeState(modeState === 'RATE' ? 'VTBI' : 'RATE')}
                        className="p-2 bg-stone-800 hover:bg-stone-700 text-amber-300 rounded-xl text-xs font-mono font-bold border border-stone-700 text-center cursor-pointer transition-all"
                      >
                        RATE / VTBI (TOGGLE)
                      </button>

                      {/* Lethal Proximity: BOLUS and SILENCE side-by-side with identical shapes */}
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          onClick={handleBolusClick}
                          className="p-2.5 bg-red-900/80 hover:bg-red-700 text-white rounded-xl text-xs font-mono font-bold border-2 border-red-500 text-center cursor-pointer transition-all animate-pulse"
                        >
                          BOLUS (50mL)
                        </button>
                        <button
                          onClick={() => setAlarmActive(!alarmActive)}
                          className="p-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-mono font-bold border border-stone-700 text-center cursor-pointer transition-all"
                        >
                          SILENCE
                        </button>
                      </div>

                      <button
                        onClick={() => setIsInfusing(!isInfusing)}
                        className={`p-2 rounded-xl text-xs font-mono font-bold text-center cursor-pointer transition-all ${
                          isInfusing ? 'bg-amber-600 text-white' : 'bg-emerald-600 text-white'
                        }`}
                      >
                        {isInfusing ? 'PAUSE INFUSION' : 'START INFUSION'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Re-Engineered Smart Pump Interface */
                <div className="bg-white border-2 border-emerald-400 rounded-2xl p-4 shadow-sm space-y-3">
                  {/* Smart Dose Error Reduction Header */}
                  <div className="flex items-center justify-between text-xs font-mono border-b border-emerald-100 pb-2 text-stone-600">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>DERS SOFT/HARD GUARDRAILS ACTIVE</span>
                    </div>
                    <span className="bg-emerald-100 text-emerald-900 font-bold px-2.5 py-0.5 rounded-md">
                      Patient: Adult ICU (Weight: 72kg)
                    </span>
                  </div>

                  {/* Dual Separate Displays for Rate vs Volume */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Dedicated Rate Screen with Giant Clear Decimal */}
                    <div className="bg-emerald-50/60 p-4 rounded-xl border-2 border-emerald-300">
                      <span className="text-xs font-mono font-bold uppercase text-emerald-900 block mb-1">
                        1. Infusion Rate (mL / hr)
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold font-mono text-emerald-950">{inputVal}</span>
                        <span className="text-sm font-mono font-bold text-emerald-700 ml-1">mL / hr</span>
                      </div>
                      <div className="text-xs font-mono text-emerald-800 font-bold mt-2 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 inline-block">
                        ✓ Within Safe Range (0.1 – 2.0 mL/hr)
                      </div>
                    </div>

                    {/* Dedicated Volume Screen */}
                    <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                      <span className="text-xs font-mono font-bold uppercase text-stone-700 block mb-1">
                        2. Volume to be Infused (VTBI)
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold font-mono text-stone-800">100.0</span>
                        <span className="text-sm font-mono text-stone-500 ml-1">mL</span>
                      </div>
                      <div className="text-xs font-mono text-stone-500 mt-2">
                        Separate physical memory register
                      </div>
                    </div>
                  </div>

                  {/* Physical Safety Guardrails for Bolus */}
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
                      <div className="text-xs text-amber-950">
                        <strong>BOLUS Physical Cover:</strong> Hinged safety cover prevents accidental press. Requires 2-step confirmation.
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold bg-amber-200 text-amber-900 px-2.5 py-1 rounded-md">
                      PROTECTED
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Hardware Diagnostic Footer Note */}
            <div className={`p-2.5 rounded-xl text-xs font-mono flex items-center justify-between flex-shrink-0 ${
              pumpVersion === 'flawed' ? 'bg-white/5 text-stone-400' : 'bg-emerald-100 text-emerald-950 font-bold'
            }`}>
              <span>
                {pumpVersion === 'flawed'
                  ? 'Clinical Finding: Interface actively induces errors via missing visual constraints.'
                  : 'HCI Outcome: Slips neutralized through proactive physical & algorithmic constraints.'}
              </span>
              <span className="font-bold">
                {pumpVersion === 'flawed' ? 'FATAL ERROR RISK: 94%' : 'FATAL ERROR RISK: < 0.01%'}
              </span>
            </div>
          </div>

          {/* Right Column: Pedagogical Stage (Discussion Mode vs Diagnostic Reveal) (5 cols) */}
          <div className="lg:col-span-5 bg-white border-2 border-[#E8E2D9] rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-xs space-y-3 min-h-0">
            {revealAnalysis ? (
              /* REVEALED DIAGNOSTIC DOSSIER */
              <>
                <div className="space-y-2.5 flex-shrink-0">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                    <span className="text-xs sm:text-sm font-mono font-bold uppercase text-[#E5391C] tracking-wider">
                      Forensic HCI Case File
                    </span>
                    <span className="text-xs font-mono text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-md font-bold">
                      4 Traps Unmasked
                    </span>
                  </div>

                  <div className="flex gap-2 bg-stone-100 p-1 rounded-xl">
                    <button
                      onClick={() => setActiveTab('evidence')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                        activeTab === 'evidence' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      1. Cognitive Traps
                    </button>
                    <button
                      onClick={() => setActiveTab('timeline')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                        activeTab === 'timeline' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      2. Timeline
                    </button>
                    <button
                      onClick={() => setActiveTab('redesign')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                        activeTab === 'redesign' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      3. Checklist
                    </button>
                  </div>
                </div>

                {/* Tab 1: Cognitive Traps Interactive Inspector */}
                {activeTab === 'evidence' && (
                  <div className="space-y-2.5 flex-1 flex flex-col justify-between min-h-0">
                    <div className="space-y-2 overflow-y-auto pr-1 flex-1">
                      {forensicIssues.map((iss) => {
                        const isSelected = selectedIssueId === iss.id;
                        return (
                          <div
                            key={iss.id}
                            onClick={() => setSelectedIssueId(iss.id)}
                            className={`p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-red-50/90 border-[#E5391C] shadow-xs'
                                : 'bg-[#FAF9F6] border-stone-200 hover:border-stone-400'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs sm:text-sm font-bold font-serif-display text-[#2D2D2E]">
                                Trap 0{iss.id}: {iss.title}
                              </span>
                              <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md ${
                                isSelected ? 'bg-[#E5391C] text-white' : 'bg-red-100 text-red-800'
                              }`}>
                                {iss.law.split('&')[0]}
                              </span>
                            </div>
                            <p className="text-xs text-stone-700 leading-snug">
                              {iss.evidence}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Deep Dive Dossier for Selected Issue */}
                    <div className="p-3.5 bg-stone-900 text-stone-200 rounded-2xl border border-stone-800 space-y-1.5 flex-shrink-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-red-400 font-bold uppercase">
                          HCI Remedy for Trap 0{currentIssue.id}:
                        </span>
                        <span className="text-[11px] font-mono text-stone-400">{currentIssue.location}</span>
                      </div>
                      <p className="text-xs text-stone-300 font-medium leading-relaxed">
                        {currentIssue.remedy}
                      </p>
                    </div>
                  </div>
                )}

                {/* Tab 2: Incident Timeline */}
                {activeTab === 'timeline' && (
                  <div className="space-y-2.5 flex-1 flex flex-col justify-between text-xs sm:text-sm min-h-0">
                    <div className="space-y-2">
                      <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                        <div className="font-mono font-bold text-stone-900 flex justify-between">
                          <span>03:15 AM · Physician Order</span>
                          <span className="text-emerald-700">1.0 mL/hr</span>
                        </div>
                        <p className="text-stone-600 text-xs">
                          Doctor prescribes continuous Morphine at 1.0 mL/hr for severe trauma pain.
                        </p>
                      </div>

                      <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
                        <div className="font-mono font-bold text-amber-900 flex justify-between">
                          <span>03:28 AM · Nurse Action</span>
                          <span className="text-amber-700">Cognitive Trap</span>
                        </div>
                        <p className="text-amber-900 text-xs">
                          Nurse types [1][.][0]. The 1-pixel dot is visually unnoticeable. Screen reads `1 0`. Believing it says `1.0`, she hits START.
                        </p>
                      </div>

                      <div className="p-2.5 bg-red-50 rounded-xl border border-red-300 space-y-1">
                        <div className="font-mono font-bold text-red-900 flex justify-between">
                          <span>04:10 AM · Collapse</span>
                          <span className="text-red-700 font-black">10x OVERDOSE</span>
                        </div>
                        <p className="text-red-950 font-medium text-xs">
                          Patient receives 10mL of concentrated morphine in 60 minutes. Respiratory arrest occurs.
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-red-100 rounded-xl font-mono text-xs text-red-900 font-bold text-center">
                      Root Cause: 100% Interface Design Defect.
                    </div>
                  </div>
                )}

                {/* Tab 3: Safety Checklist */}
                {activeTab === 'redesign' && (
                  <div className="space-y-2.5 flex-1 flex flex-col justify-between text-xs sm:text-sm min-h-0">
                    <div className="space-y-2">
                      <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-emerald-950 block text-xs">1. Giant Contrast Decimals</strong>
                          <span className="text-emerald-800 text-[11px]">Require leading zeros (`0.5`) and distinct color-coded decimal separators.</span>
                        </div>
                      </div>

                      <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-emerald-950 block text-xs">2. Dose Error Reduction (DERS)</strong>
                          <span className="text-emerald-800 text-[11px]">Hard limits reject orders exceeding safe physiological thresholds.</span>
                        </div>
                      </div>

                      <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-emerald-950 block text-xs">3. Physical Guardrails</strong>
                          <span className="text-emerald-800 text-[11px]">Hinged covers and distinct spatial buffers isolating high-risk action triggers.</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-100 rounded-xl font-mono text-xs text-emerald-900 font-bold text-center">
                      HCI is safety infrastructure in modern engineering.
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* CLASSROOM PAIR DISCUSSION MODE (SHOWN BY DEFAULT) */
              <div className="flex-1 flex flex-col justify-between space-y-4 py-2">
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                    <span className="text-xs sm:text-sm font-mono font-bold uppercase text-[#E5391C] tracking-wider flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      <span>Pair Discussion · 3 Minutes</span>
                    </span>
                    <span className="text-xs font-mono text-stone-500 font-bold">You are the HCI Specialist</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-[#2D2D2E] leading-snug">
                    Inspect the Infusion Console: Why Did the Nurse Administer 10x Overdose?
                  </h3>

                  <div className="space-y-2.5 text-xs sm:text-sm text-[#525254] leading-relaxed">
                    <div className="p-3 bg-[#FAF9F6] border border-[#E8E2D9] rounded-2xl space-y-1">
                      <span className="font-bold text-stone-900 block">Classroom Prompt:</span>
                      <p>
                        Look closely at the hardware console on the left. Imagine being on duty at 03:30 AM in a dark room under high cognitive fatigue.
                      </p>
                    </div>

                    <ul className="space-y-2 text-stone-700 pl-1">
                      <li className="flex items-start gap-2">
                        <span className="text-[#E5391C] font-bold">1.</span>
                        <span>Find at least <strong>3 critical interaction traps</strong> in the display and buttons.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#E5391C] font-bold">2.</span>
                        <span>Why did the nurse think she programmed 1.0 when the machine delivered 10.0?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#E5391C] font-bold">3.</span>
                        <span>How would you re-engineer this system using HCI principles?</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={() => {
                      setRevealAnalysis(true);
                      setSelectedIssueId(1);
                    }}
                    className="w-full py-3.5 bg-[#E5391C] hover:bg-[#C92B10] text-white rounded-2xl font-mono text-xs sm:text-sm font-bold shadow-md cursor-pointer transition-all flex items-center justify-center gap-2"
                  >
                    <Search className="w-4 h-4" />
                    <span>Reveal Forensic Analysis &amp; 4 Flaws</span>
                  </button>
                  <p className="text-[11px] font-mono text-stone-500 text-center">
                    Discuss with your neighbor first before clicking to unmask the diagnostic.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Master Pedagogical Axiom Banner */}
        <div className="p-4 sm:p-5 bg-white border-2 border-[#E5391C] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs flex-shrink-0">
          <p className="text-base sm:text-lg lg:text-xl text-[#2D2D2E] leading-relaxed">
            <strong className="text-[#E5391C] font-serif-display text-lg sm:text-xl lg:text-2xl font-bold mr-2">
              The Capstone HCI Principle:
            </strong>
            When a human makes an error with a computer, never ask <em>"Why was the human so careless?"</em> Always ask: <em>"What flaw in the interface tricked a rational human into making this mistake?"</em>
          </p>
          <span className="text-xs sm:text-sm font-mono text-white bg-[#E5391C] font-bold px-4 py-2 rounded-xl whitespace-nowrap shadow-2xs">
            Session 1 Synthesis
          </span>
        </div>
      </div>

      {/* Footer Navigation Next Marker */}
      <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0 pt-1">
        Next: The Three Golden Axioms of Human-Computer Interaction
      </div>
    </div>
  );
};
