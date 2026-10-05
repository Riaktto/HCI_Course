import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, Play, Pause, RotateCcw, Syringe } from 'lucide-react';
import { UM6PLogo } from '../brand/UM6PLogo';

export const FinalChallengeInfusionPump: React.FC = () => {
  const [timerSec, setTimerSec] = useState<number>(180); // 3 minutes
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [revealAnalysis, setRevealAnalysis] = useState<boolean>(false);
  const [selectedIssue, setSelectedIssue] = useState<number | null>(null);

  // Timer countdown
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSec > 0) {
      interval = setInterval(() => {
        setTimerSec(t => t - 1);
      }, 1000);
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

  const issues = [
    {
      id: 1,
      title: '1. Deadly Mode Confusion',
      desc: 'Rate (mL/hr) and Total Volume (VTBI) share the identical 7-segment display with only a microscopic LED label. Nurses frequently enter total volume into the rate register.',
    },
    {
      id: 2,
      title: '2. Decimal Point Visual Suppression',
      desc: 'The dot separator is a 1-pixel dot on an unlit LCD. In a dim hospital ward at 03:00, "1.0 mL/hr" and "10 mL/hr" are visually indistinguishable, causing 10x overdose.',
    },
    {
      id: 3,
      title: '3. Absent Guardrails (Soft / Hard Limits)',
      desc: 'The software accepts a 500 mL/hr rate of concentrated potassium chloride without an emergency confirmation threshold or physiological feasibility check.',
    },
    {
      id: 4,
      title: '4. Critical Proximity Affordance Flaw',
      desc: 'The "BOLUS" (rapid dose injection) button is positioned right beside "SILENCE ALARM" with identical physical shape and tactile feedback.',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 lg:p-6 bg-[#FAF9F6]">
      {/* Top Banner with Classroom Activity Timer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E8E2D9]">
        <div className="flex items-center gap-3">
          <UM6PLogo variant="compact" theme="color" className="h-6 w-auto" />
          <div className="h-4 w-px bg-[#E8E2D9]" />
          <span className="text-xs uppercase font-mono tracking-wider text-white bg-red-600 font-bold px-3 py-1 rounded">
            Capstone Diagnostic Challenge
          </span>
          <span className="text-sm font-semibold text-[#2D2D2E]">
            You are the HCI Specialist: Diagnose the Fatal Medical Infusion Pump
          </span>
        </div>

        {/* Visible 3-Minute Classroom Timer */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E8E2D9] rounded-lg font-mono text-xs shadow-xs">
            <span className="text-[#6E6D70]">Classroom Discussion:</span>
            <strong className="text-[#E5391C] text-sm font-bold">{formatTimer(timerSec)}</strong>
            <button
              onClick={toggleTimer}
              className="p-1 hover:bg-[#F5F2ED] rounded text-[#2D2D2E]"
              title={isTimerRunning ? 'Pause' : 'Start'}
            >
              {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={resetTimer}
              className="p-1 hover:bg-[#F5F2ED] rounded text-[#6E6D70] hover:text-[#2D2D2E]"
              title="Reset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => setRevealAnalysis(!revealAnalysis)}
            className={`px-3.5 py-1.5 text-xs rounded-lg transition-colors font-medium ${
              revealAnalysis ? 'bg-[#E5391C] text-white font-bold' : 'bg-white border border-[#E8E2D9] text-[#2D2D2E] hover:bg-[#F5F2ED]'
            }`}
          >
            {revealAnalysis ? 'Hide Analysis' : 'Reveal HCI Analysis'}
          </button>
        </div>
      </div>

      {/* Main Dual Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 py-2 items-stretch">
        {/* Left: Simulated Medical Pump Hardware Console (7 cols) */}
        <div className="lg:col-span-7 bg-white border-2 border-[#D5CFC7] rounded-2xl p-6 shadow-sm relative">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#F0EBE3]">
            <div className="flex items-center gap-2">
              <Syringe className="w-4 h-4 text-cyan-600" />
              <span className="text-xs font-mono font-bold tracking-wider text-[#2D2D2E]">
                MED-TECH 3000 SMART INFUSION SYSTEM
              </span>
            </div>
            <span className="text-xs font-mono text-[#E5391C] font-bold">PATIENT: ICU BED 04</span>
          </div>

          {/* Dangerous Flawed Interface Display */}
          <div className="bg-[#FAF9F6] border-2 border-[#E8E2D9] rounded-xl p-5 mb-4 font-mono space-y-4 shadow-inner">
            <div className="flex items-center justify-between text-xs text-[#6E6D70]">
              <div className="flex items-center gap-3">
                <span className="text-emerald-700 font-bold">● RUNNING</span>
                <span className="text-[#2D2D2E] font-semibold">DRUG: MORPHINE SULFATE</span>
              </div>
              <span className="text-xs font-bold text-[#6E6D70]">MODE: CONTINUOUS</span>
            </div>

            {/* The Ambiguous Number Display */}
            <div className="bg-white p-4 rounded-xl border border-[#D5CFC7] flex items-baseline justify-between shadow-xs">
              <div>
                <div className="text-[11px] text-[#6E6D70] uppercase font-bold">Current Programmed Rate</div>
                {/* Visual flaw: tiny pixel dot makes 1.0 look like 10 */}
                <div className="text-5xl font-bold text-[#E5391C] tracking-tighter">
                  1<span className="text-xs text-[#C92B10]">.</span>0
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-[#6E6D70] font-bold">UNITS: mL / hr</div>
                <div className="text-xs text-red-600 font-bold">MAX PATIENT DOSE: 2.0 mL/hr</div>
              </div>
            </div>

            {/* Hardware-Style Buttons */}
            <div className="grid grid-cols-4 gap-2 pt-2">
              <div className="p-3 bg-[#F5F2ED] text-[#2D2D2E] rounded-lg text-center text-xs font-bold border border-[#D5CFC7] cursor-not-allowed">
                RATE / VOL
              </div>
              <div className="p-3 bg-[#F5F2ED] text-[#2D2D2E] rounded-lg text-center text-xs font-bold border border-[#D5CFC7] cursor-not-allowed">
                START / STOP
              </div>
              <div className="p-3 bg-red-100 text-red-700 rounded-lg text-center text-xs font-bold border border-red-300 cursor-not-allowed">
                BOLUS
              </div>
              <div className="p-3 bg-[#F5F2ED] text-[#2D2D2E] rounded-lg text-center text-xs font-bold border border-[#D5CFC7] cursor-not-allowed">
                SILENCE
              </div>
            </div>
          </div>

          <div className="text-xs text-[#6E6D70] flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#E5391C] shrink-0" />
            <span>
              Classroom Task: Discuss with your partner for 3 minutes. How many design traps can you identify in this interface?
            </span>
          </div>
        </div>

        {/* Right: Progressive HCI Forensic Analysis (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#E8E2D9] rounded-2xl p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE3]">
            <span className="text-xs font-mono uppercase tracking-wider text-[#E5391C] font-bold">HCI Forensic Evaluation</span>
            {revealAnalysis && <span className="text-xs text-emerald-700 font-mono font-bold">4 FLAWS UNMASKED</span>}
          </div>

          {revealAnalysis ? (
            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {issues.map(iss => (
                <div
                  key={iss.id}
                  onClick={() => setSelectedIssue(selectedIssue === iss.id ? null : iss.id)}
                  className="p-3 bg-[#FAF9F6] border border-[#E8E2D9] rounded-xl text-xs hover:border-[#E5391C] transition-all cursor-pointer"
                >
                  <div className="font-semibold text-[#2D2D2E] mb-1 flex items-center justify-between">
                    <span>{iss.title}</span>
                    <span className="text-[10px] text-red-600 font-mono font-bold">CRITICAL</span>
                  </div>
                  <p className="text-xs text-[#525254] leading-snug">{iss.desc}</p>
                </div>
              ))}

              <div className="p-3.5 bg-[#FDF5F2] border border-[#F0D5CB] rounded-xl text-xs text-[#2D2D2E] mt-2">
                <strong className="block font-bold text-[#E5391C] mb-1">HCI Safety Solution:</strong>
                <p className="text-xs text-[#525254] leading-relaxed">
                  Physical guardrails, high-contrast typography, explicit unit labels, confirmation steps for lethal
                  doses, and dedicated hardware separation between emergency Bolus and alarm silence.
                </p>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-[#6E6D70] space-y-3">
              <Clock className="w-8 h-8 mx-auto text-[#E5391C] animate-pulse" />
              <p className="text-xs text-[#6E6D70] max-w-xs mx-auto">
                Discuss with your partner. Identify the design flaws that lead to cognitive errors under high stress.
              </p>
              <div className="text-xs font-mono text-[#E5391C] font-bold">
                Click "Reveal HCI Analysis" when discussion finishes
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Classroom Takeaway Banner */}
      <div className="p-4 sm:p-5 lg:p-6 bg-gradient-to-r from-red-50/70 via-white to-amber-50/50 border-2 border-red-200/80 rounded-2xl flex items-center justify-between shadow-xs">
        <p className="text-base sm:text-lg lg:text-xl text-[#2D2D2E] leading-relaxed">
          <strong className="text-[#E5391C] font-serif-display text-lg sm:text-xl lg:text-2xl font-bold mr-2">
            Conclusion & Key Pedagogical Insight:
          </strong>
          Good interface design is not about making screens look stylish. In safety-critical systems—aviation, medical, energy, finance—HCI is the difference between life and death.
        </p>
        <span className="text-sm sm:text-base font-mono text-white bg-[#E5391C] font-bold px-4 py-2 rounded-xl ml-4 whitespace-nowrap shadow-xs">
          Next: Session 2 (The Human)
        </span>
      </div>
    </div>
  );
};
