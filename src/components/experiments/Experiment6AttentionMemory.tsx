import React, { useState, useEffect } from 'react';
import { Clock, HelpCircle, CheckCircle, RotateCcw, Brain, Sparkles } from 'lucide-react';

export const Experiment6AttentionMemory: React.FC = () => {
  const [stage, setStage] = useState<'intro' | 'flash_a' | 'question_a' | 'reveal_a' | 'flash_b' | 'question_b' | 'reveal_b'>('intro');
  const [countdown, setCountdown] = useState<number>(3.0);

  // Timer for 3-second flash
  useEffect(() => {
    let interval: any = null;
    if (stage === 'flash_a') {
      setCountdown(3.0);
      interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 0.2) {
            clearInterval(interval);
            setStage('question_a');
            return 0;
          }
          return Number((prev - 0.1).toFixed(1));
        });
      }, 100);
    } else if (stage === 'flash_b') {
      setCountdown(3.0);
      interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 0.2) {
            clearInterval(interval);
            setStage('question_b');
            return 0;
          }
          return Number((prev - 0.1).toFixed(1));
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [stage]);

  const handleStartA = () => {
    setStage('flash_a');
  };

  const handleStartB = () => {
    setStage('flash_b');
  };

  const resetAll = () => {
    setStage('intro');
    setCountdown(3.0);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 lg:p-6 bg-[#FAF9F6]">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E8E2D9]">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase font-mono tracking-wider text-white bg-[#D7492A] font-bold px-3 py-1 rounded">
            Live Laboratory Experiment 06
          </span>
          <span className="text-sm font-semibold text-[#2D2D2E]">
            Human Cognitive Architecture: Attention, Visual Saliency & Chunking
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetAll}
            className="flex items-center gap-1 px-3 py-1.5 text-xs text-[#6E6D70] bg-white border border-[#E8E2D9] rounded hover:text-[#2D2D2E] hover:bg-[#F5F2ED]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Experiment
          </button>
        </div>
      </div>

      {/* Main Dynamic Stage */}
      <div className="my-auto max-w-4xl mx-auto w-full">
        {stage === 'intro' && (
          <div className="bg-white border border-[#E8E2D9] rounded-2xl p-8 text-center space-y-6 shadow-sm">
            <div className="w-16 h-16 bg-[#FDF5F2] rounded-full flex items-center justify-center mx-auto text-[#D7492A] border border-[#F0D5CB]">
              <Brain className="w-8 h-8" />
            </div>

            <div className="space-y-3">
              <h3 className="text-3xl font-serif-display font-medium text-[#2D2D2E]">
                The 3-Second Cognitive Flash Test
              </h3>
              <p className="text-base text-[#6E6D70] max-w-xl mx-auto leading-relaxed">
                Instruct the entire lecture hall to focus on the screen. We will flash a clinical telemetry screen for
                exactly <strong className="text-[#D7492A] font-mono">3.0 seconds</strong>, then ask two specific questions.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={handleStartA}
                className="px-8 py-3.5 bg-[#D7492A] hover:bg-[#B83519] text-white font-semibold text-sm rounded-xl shadow active:scale-95 transition-all"
              >
                1. Flash Condition A: Unstructured Data Wall (3.0s)
              </button>
            </div>
          </div>
        )}

        {/* FLASH STAGE A: RAW UNSTRUCTURED WALL */}
        {stage === 'flash_a' && (
          <div className="bg-white border-2 border-[#D5CFC7] rounded-2xl p-8 shadow-sm relative">
            <div className="absolute top-4 right-4 flex items-center gap-2 font-mono text-sm text-[#D7492A] font-bold">
              <Clock className="w-4 h-4 animate-spin" />
              <span>{countdown}s remaining</span>
            </div>

            <div className="text-xs font-mono text-[#6E6D70] uppercase pb-3 mb-4 border-b border-[#F0EBE3] font-semibold">
              Clinical Telemetry Stream — Unstructured
            </div>

            <div className="text-lg font-mono text-[#2D2D2E] leading-loose tracking-wider p-6 bg-[#FAF9F6] rounded-xl border border-[#E8E2D9]">
              BP: 132/84 mmHg &nbsp;·&nbsp; LYMPH: 28% &nbsp;·&nbsp; WBC: 7.2 k/uL &nbsp;·&nbsp; HR: 148 BPM &nbsp;·&nbsp; NA: 138 mmol/L &nbsp;·&nbsp; GLU: 104 mg/dL &nbsp;·&nbsp; SPO2: 96% &nbsp;·&nbsp; K: 4.1 mmol/L &nbsp;·&nbsp; PLT: 240 k/uL &nbsp;·&nbsp; HGB: 13.8 g/dL &nbsp;·&nbsp; TEMP: 37.4 C &nbsp;·&nbsp; BLD: AB-
            </div>
          </div>
        )}

        {/* QUESTION A */}
        {stage === 'question_a' && (
          <div className="bg-white border-2 border-amber-500 rounded-2xl p-8 text-center space-y-6 shadow-sm">
            <HelpCircle className="w-12 h-12 text-amber-600 mx-auto" />
            <div className="space-y-2">
              <span className="text-xs uppercase font-mono tracking-wider text-amber-700 font-bold">Classroom Poll A</span>
              <h3 className="text-3xl font-serif-display font-medium text-[#2D2D2E]">
                Raise your hand if you can confidently state:
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto text-left">
              <div className="p-4 bg-[#FAF9F6] rounded-xl border border-[#E8E2D9]">
                <span className="text-xs text-[#6E6D70]">Question 1:</span>
                <div className="text-base font-bold text-[#2D2D2E] mt-1">What was the Heart Rate (HR)?</div>
              </div>
              <div className="p-4 bg-[#FAF9F6] rounded-xl border border-[#E8E2D9]">
                <span className="text-xs text-[#6E6D70]">Question 2:</span>
                <div className="text-base font-bold text-[#2D2D2E] mt-1">What was the Blood Type (BLD)?</div>
              </div>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => setStage('reveal_a')}
                className="px-5 py-2.5 bg-[#FAF9F6] hover:bg-[#F5F2ED] text-[#2D2D2E] text-xs font-mono rounded-lg border border-[#D5CFC7]"
              >
                Reveal Answer & Debrief
              </button>
              <button
                onClick={handleStartB}
                className="px-6 py-2.5 bg-[#D7492A] hover:bg-[#B83519] text-white text-xs font-semibold rounded-lg shadow"
              >
                Now Flash Condition B: Human-Centered Chunking (3.0s)
              </button>
            </div>
          </div>
        )}

        {/* REVEAL A */}
        {stage === 'reveal_a' && (
          <div className="bg-white border border-[#E8E2D9] rounded-2xl p-6 text-center space-y-4 shadow-sm">
            <h4 className="text-xl font-bold text-[#2D2D2E] font-serif-display">Result from Condition A</h4>
            <p className="text-sm text-[#6E6D70] max-w-md mx-auto">
              Answers were: <strong className="text-[#2D2D2E] font-mono">HR: 148 BPM</strong> and <strong className="text-[#2D2D2E] font-mono">BLD: AB-</strong>.
              In typical classrooms, fewer than 5% of students can locate and store both in 3 seconds due to serial visual search.
            </p>
            <button
              onClick={handleStartB}
              className="px-6 py-2.5 bg-[#D7492A] hover:bg-[#B83519] text-white text-xs font-semibold rounded-lg shadow"
            >
              Test Condition B (Structured Gestalt Hierarchy)
            </button>
          </div>
        )}

        {/* FLASH STAGE B: GESTALT CHUNKING & PRE-ATTENTIVE SALIENCY */}
        {stage === 'flash_b' && (
          <div className="bg-white border-2 border-emerald-500 rounded-2xl p-8 shadow-sm relative">
            <div className="absolute top-4 right-4 flex items-center gap-2 font-mono text-sm text-emerald-600 font-bold">
              <Clock className="w-4 h-4 animate-spin" />
              <span>{countdown}s remaining</span>
            </div>

            <div className="text-xs font-mono text-[#6E6D70] uppercase pb-3 mb-4 border-b border-[#F0EBE3] font-semibold">
              Clinical Telemetry Stream — Gestalt Structured & Visually Anchored
            </div>

            <div className="grid grid-cols-3 gap-4">
              {/* Primary Vital - Visual Saliency */}
              <div className="bg-red-50 border border-red-300 p-5 rounded-xl text-center">
                <span className="text-[10px] uppercase font-mono tracking-wider text-red-700 font-bold">Tachycardia Alert</span>
                <div className="text-4xl font-mono font-bold text-red-600 mt-1">148</div>
                <div className="text-xs font-bold text-red-800">HEART RATE (BPM)</div>
              </div>

              {/* Blood type - Direct anchor */}
              <div className="bg-[#FAF9F6] border border-[#E8E2D9] p-5 rounded-xl text-center">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#6E6D70] font-bold">Donor Compatibility</span>
                <div className="text-4xl font-mono font-bold text-[#D7492A] mt-1">AB-</div>
                <div className="text-xs font-bold text-[#2D2D2E]">BLOOD TYPE</div>
              </div>

              {/* Secondary grouped */}
              <div className="bg-[#FAF9F6] border border-[#E8E2D9] p-5 rounded-xl space-y-1.5 text-xs font-mono text-[#6E6D70]">
                <div className="flex justify-between"><span>SPO2:</span> <strong className="text-[#2D2D2E]">96%</strong></div>
                <div className="flex justify-between"><span>BP:</span> <strong className="text-[#2D2D2E]">132/84</strong></div>
                <div className="flex justify-between"><span>TEMP:</span> <strong className="text-[#2D2D2E]">37.4°C</strong></div>
              </div>
            </div>
          </div>
        )}

        {/* QUESTION B */}
        {stage === 'question_b' && (
          <div className="bg-white border-2 border-emerald-500 rounded-2xl p-8 text-center space-y-6 shadow-sm">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
            <div className="space-y-2">
              <span className="text-xs uppercase font-mono tracking-wider text-emerald-700 font-bold">Classroom Poll B</span>
              <h3 className="text-3xl font-serif-display font-medium text-[#2D2D2E]">
                Raise your hand now: What was the Heart Rate and Blood Type?
              </h3>
            </div>

            <p className="text-base text-[#6E6D70] max-w-lg mx-auto">
              Nearly the entire room raises their hands instantly. Why? The underlying data was 100% identical.
            </p>

            <button
              onClick={() => setStage('reveal_b')}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow"
            >
              Reveal Cognitive Science Mechanism
            </button>
          </div>
        )}

        {/* REVEAL B: THE SCIENCE */}
        {stage === 'reveal_b' && (
          <div className="bg-white border border-[#E8E2D9] rounded-2xl p-6 text-left space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-mono text-[#D7492A] uppercase tracking-wider font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Bridge to Session 2: Human Cognitive Architecture</span>
            </div>

            <h4 className="text-2xl font-serif-display font-medium text-[#2D2D2E]">
              Pre-Attentive Processing & Working Memory Limits
            </h4>

            <div className="grid grid-cols-2 gap-4 text-xs text-[#2D2D2E]">
              <div className="p-4 bg-[#FAF9F6] rounded-xl border border-[#E8E2D9] space-y-1">
                <strong className="text-[#2D2D2E] block text-sm font-semibold">George Miller & Nelson Cowan Law:</strong>
                <p className="text-[#6E6D70] leading-relaxed">
                  Human working memory can only maintain ~4 discrete items simultaneously without decay. Unstructured lists
                  force exhaustive serial scanning.
                </p>
              </div>
              <div className="p-4 bg-[#FAF9F6] rounded-xl border border-[#E8E2D9] space-y-1">
                <strong className="text-[#2D2D2E] block text-sm font-semibold">Gestalt Grouping & Preattentive Cues:</strong>
                <p className="text-[#6E6D70] leading-relaxed">
                  Color, size, and spatial proximity are processed in parallel by the human visual cortex in under 200 milliseconds
                  before conscious attention begins.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Classroom Takeaway Banner */}
      <div className="p-4 bg-white border border-[#E8E2D9] rounded-xl flex items-center justify-between shadow-xs">
        <p className="text-xs text-[#2D2D2E] leading-relaxed">
          <strong className="text-[#D7492A] font-serif-display text-base font-bold mr-1">Session 2 Preview:</strong> The computer is
          infinitely patient and processes gigabytes in microseconds. The human brain has rigid biological bottlenecks:
          limited visual acuity, working memory decay, and selective attention filters. HCI is the engineering bridge between them.
        </p>
      </div>
    </div>
  );
};
