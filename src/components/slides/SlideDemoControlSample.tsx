import React, { useState, useEffect } from 'react';
import {
  Brain,
  MousePointer,
  ArrowRight,
  Clock,
  Sparkles,
  RotateCcw,
  Play,
  Pause,
  Layers,
  Activity,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  Code2,
  Zap,
  Info,
  ChevronLeft,
  ChevronRight,
  Sliders,
  Scale,
} from 'lucide-react';
import { UM6PLogo } from '../brand/UM6PLogo';

/**
 * SlideDemoControlSample — Phase 1 Multi-Slide Validation Suite
 * 
 * Scaled 10% LARGER for Projection Validation (1920 × 1080 Native Canvas):
 * - Slide Titles: 58–62 px (was 52px, +15%)
 * - Section Headings: 42–44 px (was 38px, +10%)
 * - Main Body Text: 33–35 px (was 30px, +10-15%)
 * - Activity Instructions: 32–34 px (was 28px, +15%)
 * - Diagram Labels: 26–28 px (was 24px, +10%)
 * - Secondary Text / Captions: 22–24 px (was 20px, +10%)
 * - Controls & Buttons: 24–26 px (was 22px, +10%)
 * 
 * MULTI-SLIDE ARCHITECTURE TO SOLVE OVERFLOW:
 * Slide 1: Hierarchy, Body Text, Emphasis, and Compact Comparison (Affordance vs Signifier)
 * Slide 2: Dynamic Process Diagram Flow (Model Human Processor) & Quantitative Visualization (Fitts's Law)
 * Slide 3: Technical Implementation (Code snippet at 24px) & Full Classroom Activity with Active Timer
 */

interface SlideDemoControlSampleProps {
  currentSlideIndex?: number;
  totalSlides?: number;
  onNext?: () => void;
  onPrev?: () => void;
}

export const SlideDemoControlSample: React.FC<SlideDemoControlSampleProps> = ({
  currentSlideIndex = 0,
  totalSlides = 3,
  onNext,
  onPrev,
}) => {
  // Internal active slide state if controlled locally or via props
  const [activeDemoSlide, setActiveDemoSlide] = useState<number>(1);

  // Sync with parent index if provided
  useEffect(() => {
    if (typeof currentSlideIndex === 'number' && currentSlideIndex >= 0 && currentSlideIndex < 3) {
      setActiveDemoSlide(currentSlideIndex + 1);
    }
  }, [currentSlideIndex]);

  // Interactive Activity Timer for Slide 3
  const [timerSeconds, setTimerSeconds] = useState<number>(90);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Selected node for Diagram on Slide 2
  const [selectedNode, setSelectedNode] = useState<number>(2);

  // Comparison mode toggle for Slide 1
  const [comparisonFocus, setComparisonFocus] = useState<'both' | 'affordance' | 'signifier'>('both');

  // Chart view mode for Slide 2
  const [chartUnit, setChartUnit] = useState<'ms' | 'bits'>('ms');

  // Timer countdown hook
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(90);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      setActiveDemoSlide((prev) => Math.min(3, prev + 1));
    }
  };

  const handlePrev = () => {
    if (onPrev) {
      onPrev();
    } else {
      setActiveDemoSlide((prev) => Math.max(1, prev - 1));
    }
  };

  return (
    <div className="w-[1920px] h-[1080px] bg-[#FAF9F6] text-[#222222] flex flex-col justify-between p-12 relative overflow-hidden select-none font-sans-body box-border">
      {/* Background Decorative Ambient Terracotta Glow */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#E5391C]/5 pointer-events-none blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#1F2421]/5 pointer-events-none blur-3xl" />

      {/* ========================================================================= */}
      {/* INSTITUTIONAL HEADER BAR                                                  */}
      {/* ========================================================================= */}
      <header className="h-16 pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-5">
          <UM6PLogo variant="compact" theme="color" className="h-9 w-auto" />
          <div className="h-6 w-px bg-[#E8E2D9]" />
          <span className="text-[15px] font-mono uppercase text-[#E5391C] tracking-widest font-bold bg-[#FDF5F3] px-3.5 py-1.5 rounded-lg border border-[#FAD6CF]">
            PHASE 1 · DESIGN STANDARD VALIDATION
          </span>
          <span className="text-[15px] font-mono text-[#6E6D70]">
            Scale: +10% Projection Standard · Multi-Slide Suite
          </span>
        </div>

        {/* Demo Sub-Slide Navigation Tabs */}
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white p-1 rounded-xl border border-[#E8E2D9] shadow-xs">
            {[
              { id: 1, label: 'Slide 1: Concepts & Comparison' },
              { id: 2, label: 'Slide 2: Diagram & Quantitative' },
              { id: 3, label: 'Slide 3: Code & Live Activity' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveDemoSlide(s.id)}
                className={`px-4 py-1.5 rounded-lg text-[14px] font-mono font-bold transition-all cursor-pointer ${
                  activeDemoSlide === s.id
                    ? 'bg-[#E5391C] text-white shadow-xs'
                    : 'text-[#525254] hover:text-[#222222] hover:bg-[#F5F2ED]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[14px] font-mono font-bold rounded-lg border border-emerald-300">
              SLIDE {activeDemoSlide} OF 3
            </span>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* SLIDE 1 OF 3: HIERARCHY, BODY TEXT, EMPHASIS & TWO-COLUMN COMPARISON      */}
      {/* Cases 1, 2, 3, 5, 9, 10 (+10% Larger Typography)                          */}
      {/* ========================================================================= */}
      {activeDemoSlide === 1 && (
        <main className="flex-1 flex flex-col justify-between py-6 gap-6 min-h-0">
          {/* Header Title & Subheading (+10-15% Larger) */}
          <div className="flex items-start justify-between gap-8 flex-shrink-0">
            <div className="space-y-2 max-w-[1360px]">
              <h1 className="text-[58px] leading-[1.08] font-serif-display font-medium text-[#2D2D2E] tracking-tight">
                Foundations of Interaction: The Human Information Channel
              </h1>
              <h2 className="text-[42px] leading-[1.2] text-[#525254] font-light">
                Perceptual Buffers, Working Memory Chunks & The Physics of Affordance
              </h2>
            </div>

            {/* Core HCI Axiom Badge */}
            <div className="flex-shrink-0 bg-white border-2 border-[#E5391C]/30 shadow-xs rounded-2xl px-6 py-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#FDF5F3] border border-[#FAD6CF] flex items-center justify-center text-[#E5391C]">
                <Brain className="w-8 h-8" />
              </div>
              <div>
                <div className="text-[14px] font-mono uppercase tracking-wider text-[#E5391C] font-bold">
                  Cognitive Baseline
                </div>
                <div className="text-[28px] font-bold text-[#222222] leading-tight">
                  Cowan's Working Memory Limit: 3–4 Chunks
                </div>
              </div>
            </div>
          </div>

          {/* Body Narrative (+10% Larger: 34px Main Body, 30px Bullet List) */}
          <div className="bg-white border border-[#E8E2D9] rounded-3xl p-8 shadow-xs space-y-4 flex-shrink-0">
            <p className="text-[34px] leading-[1.42] text-[#2D2D2E]">
              Every digital interface interacts with a biological processor. Human visual sensors capture raw photons, but working memory can only manipulate <strong className="text-[#222222] font-bold underline decoration-[#E5391C] decoration-4 underline-offset-4">3 to 4 independent chunks</strong> before cognitive overflow occurs.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-2">
              <div className="flex items-start gap-4">
                <span className="w-3.5 h-3.5 rounded-full bg-[#E5391C] shrink-0 mt-3" />
                <p className="text-[30px] leading-[1.38] text-[#525254]">
                  <strong className="text-[#222222] font-bold">Perceptual Transduction (τ ≈ 100ms):</strong> Visual inputs decay in iconic memory within 200ms unless consciously attended.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-3.5 h-3.5 rounded-full bg-[#E5391C] shrink-0 mt-3" />
                <p className="text-[30px] leading-[1.38] text-[#525254]">
                  <strong className="text-[#222222] font-bold">Execution Gulf:</strong> Users cannot formulate physical motor actions when visual signifiers contradict physical affordances.
                </p>
              </div>
            </div>
          </div>

          {/* Structured Two-Column Comparison (+10% Larger: 30px Headers, 26px Content) */}
          <div className="flex-1 grid grid-cols-2 gap-8 min-h-0 items-stretch">
            {/* Left: Physical Affordance */}
            <div className="bg-white border-2 border-[#E8E2D9] rounded-3xl p-7 flex flex-col justify-between shadow-xs hover:border-blue-400/50 transition-colors">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9]">
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded-full bg-blue-600" />
                    <span className="text-[30px] font-bold text-[#222222]">Physical Affordance</span>
                  </div>
                  <span className="px-3 py-1 rounded-lg text-[15px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    J.J. Gibson (1979)
                  </span>
                </div>
                <p className="text-[26px] leading-[1.4] text-[#525254] pt-4">
                  The actual, objective physical properties of an object that permit specific interactions. Affordances exist in the physical environment whether an observer perceives them or not.
                </p>
                <div className="pt-3 text-[24px] text-[#2D2D2E]">
                  <strong>Canonical Example:</strong> A flat brass plate physically allows pushing; a circular graspable knob permits turning.
                </div>
              </div>

              <div className="text-[22px] font-mono text-blue-900 bg-blue-50/80 px-4 py-2.5 rounded-xl border border-blue-200 flex items-center gap-3 font-semibold mt-4">
                <span className="w-3 h-3 rounded-full bg-blue-600 shrink-0" />
                <span>Physical Reality: Grounded in mechanics and biomechanics</span>
              </div>
            </div>

            {/* Right: Perceived Signifier */}
            <div className="bg-[#FDF5F3] border-2 border-[#FAD6CF] rounded-3xl p-7 flex flex-col justify-between shadow-xs hover:border-[#E5391C] transition-colors">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#FAD6CF]">
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded-full bg-[#E5391C]" />
                    <span className="text-[30px] font-bold text-[#E5391C]">Perceived Signifier</span>
                  </div>
                  <span className="px-3 py-1 rounded-lg text-[15px] font-mono font-bold bg-[#E5391C] text-white">
                    Don Norman (2013)
                  </span>
                </div>
                <p className="text-[26px] leading-[1.4] text-[#2D2D2E] pt-4">
                  Any visual, tactile, or audible cue that indicates <em>where</em> and <em>how</em> interaction should occur. Signifiers communicate intent and bridge the psychological gulf of execution.
                </p>
                <div className="pt-3 text-[24px] text-[#2D2D2E]">
                  <strong>Canonical Example:</strong> The stamped text word "PUSH", a dropped shadow under a clickable button, or a glowing door handle.
                </div>
              </div>

              <div className="text-[22px] font-mono text-[#E5391C] bg-white px-4 py-2.5 rounded-xl border border-[#FAD6CF] flex items-center gap-3 font-bold mt-4">
                <span className="w-3 h-3 rounded-full bg-[#E5391C] shrink-0" />
                <span>Communication Channel: Direct perceptual indicator for the human</span>
              </div>
            </div>
          </div>

          {/* Visually Distinct Takeaway Banner */}
          <div className="bg-white border-2 border-[#E8E2D9] rounded-2xl p-5 shadow-xs flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FDF5F3] border border-[#FAD6CF] flex items-center justify-center text-[#E5391C] shrink-0">
                <Zap className="w-7 h-7" />
              </div>
              <p className="text-[28px] leading-tight font-serif-display font-medium text-[#2D2D2E]">
                <strong className="text-[#E5391C] font-semibold">Architectural Takeaway:</strong> When an interface requires a manual text explanation to operate, its signifier system has broken down.
              </p>
            </div>
            <span className="text-[18px] font-mono text-[#6E6D70] font-semibold flex-shrink-0 pl-6 border-l border-[#E8E2D9]">
              Validation Case 1–3, 5
            </span>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* SLIDE 2 OF 3: PROCESS DIAGRAM FLOW & QUANTITATIVE DATA VISUALIZATION      */}
      {/* Cases 4, 6, 9, 10 (+10% Larger Typography)                                */}
      {/* ========================================================================= */}
      {activeDemoSlide === 2 && (
        <main className="flex-1 flex flex-col justify-between py-6 gap-6 min-h-0">
          {/* Header Title */}
          <div className="flex items-start justify-between gap-8 flex-shrink-0">
            <div className="space-y-2 max-w-[1360px]">
              <h1 className="text-[58px] leading-[1.08] font-serif-display font-medium text-[#2D2D2E] tracking-tight">
                The Processing Cycle & Motor Physics
              </h1>
              <h2 className="text-[42px] leading-[1.2] text-[#525254] font-light">
                Model Human Processor (MHP) Cycle Times and Fitts’s Law Target Acquisition
              </h2>
            </div>

            <div className="flex-shrink-0 bg-white border-2 border-[#E5391C]/30 shadow-xs rounded-2xl px-6 py-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#FDF5F3] border border-[#FAD6CF] flex items-center justify-center text-[#E5391C]">
                <Activity className="w-8 h-8" />
              </div>
              <div>
                <div className="text-[14px] font-mono uppercase tracking-wider text-[#E5391C] font-bold">
                  Mathematical Law
                </div>
                <div className="text-[28px] font-bold text-[#222222] leading-tight">
                  MT = a + b · log₂(2D / W)
                </div>
              </div>
            </div>
          </div>

          {/* TOP SECTION: CASE 4 PROCESS DIAGRAM (Node Labels 28px, Metrics 22px) */}
          <div className="bg-white border border-[#E8E2D9] rounded-3xl p-7 shadow-xs space-y-4 flex-shrink-0">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D9]">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full bg-[#E5391C]" />
                <span className="text-[20px] font-mono uppercase tracking-wider text-[#222222] font-bold">
                  Case 4 Diagram: The Three Subsystem Process Flow
                </span>
              </div>
              <span className="text-[16px] font-mono text-[#6E6D70]">
                Interactive: Click any stage node to inspect latency
              </span>
            </div>

            {/* Connecting Nodes with Arrows */}
            <div className="grid grid-cols-11 gap-2 items-center py-2">
              {/* Node 1: Perceptual */}
              <div
                onClick={() => setSelectedNode(1)}
                className={`col-span-3 p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                  selectedNode === 1
                    ? 'bg-[#FDF5F3] border-[#E5391C] shadow-md ring-2 ring-[#E5391C]/20'
                    : 'bg-white border-[#E8E2D9] hover:border-stone-400'
                }`}
              >
                <div className="flex justify-between items-center pb-2">
                  <span className="text-[16px] font-mono text-[#E5391C] font-bold">STAGE 01</span>
                  <span className="text-[18px] font-mono font-bold bg-white px-2.5 py-1 rounded border border-[#E8E2D9]">
                    τₚ ≈ 100 ms
                  </span>
                </div>
                <div className="text-[28px] font-bold text-[#222222] leading-tight">
                  Sensory Eye/Ear Buffer
                </div>
                <div className="text-[22px] text-[#525254] pt-2">
                  Iconic store holds 200ms of raw visual stimulation
                </div>
              </div>

              {/* Arrow 1 */}
              <div className="col-span-1 flex flex-col items-center justify-center">
                <ArrowRight className="w-10 h-10 text-[#E5391C]" />
                <span className="text-[14px] font-mono text-[#6E6D70]">Encode</span>
              </div>

              {/* Node 2: Cognitive */}
              <div
                onClick={() => setSelectedNode(2)}
                className={`col-span-3 p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                  selectedNode === 2
                    ? 'bg-[#FDF5F3] border-[#E5391C] shadow-md ring-2 ring-[#E5391C]/20'
                    : 'bg-white border-[#E8E2D9] hover:border-stone-400'
                }`}
              >
                <div className="flex justify-between items-center pb-2">
                  <span className="text-[16px] font-mono text-[#E5391C] font-bold">STAGE 02</span>
                  <span className="text-[18px] font-mono font-bold bg-white px-2.5 py-1 rounded border border-[#E8E2D9]">
                    τ꜀ ≈ 70 ms
                  </span>
                </div>
                <div className="text-[28px] font-bold text-[#222222] leading-tight">
                  Cognitive Processor
                </div>
                <div className="text-[22px] text-[#525254] pt-2">
                  Matches mental models against activated rule base
                </div>
              </div>

              {/* Arrow 2 */}
              <div className="col-span-1 flex flex-col items-center justify-center">
                <ArrowRight className="w-10 h-10 text-[#E5391C]" />
                <span className="text-[14px] font-mono text-[#6E6D70]">Dispatch</span>
              </div>

              {/* Node 3: Motor */}
              <div
                onClick={() => setSelectedNode(3)}
                className={`col-span-3 p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                  selectedNode === 3
                    ? 'bg-[#FDF5F3] border-[#E5391C] shadow-md ring-2 ring-[#E5391C]/20'
                    : 'bg-white border-[#E8E2D9] hover:border-stone-400'
                }`}
              >
                <div className="flex justify-between items-center pb-2">
                  <span className="text-[16px] font-mono text-[#E5391C] font-bold">STAGE 03</span>
                  <span className="text-[18px] font-mono font-bold bg-white px-2.5 py-1 rounded border border-[#E8E2D9]">
                    τₘ ≈ 70 ms
                  </span>
                </div>
                <div className="text-[28px] font-bold text-[#222222] leading-tight">
                  Motor Actuator
                </div>
                <div className="text-[22px] text-[#525254] pt-2">
                  Sends micro-correction bursts to fingers/hand muscles
                </div>
              </div>
            </div>

            {/* Diagram Annotation */}
            <div className="text-[22px] font-mono text-[#525254] pt-2 flex items-center justify-between border-t border-[#E8E2D9]">
              <span><strong>Total Perceptual-Motor Loop:</strong> T = τₚ + τ꜀ + τₘ ≈ 240ms (Middle Estimate)</span>
              <span className="text-[#6E6D70] italic">Card, Moran & Newell (The Psychology of HCI, 1983)</span>
            </div>
          </div>

          {/* BOTTOM SECTION: CASE 6 DATA VISUALIZATION (Chart Labels 24px, Metrics 22px) */}
          <div className="flex-1 bg-white border border-[#E8E2D9] rounded-3xl p-7 shadow-xs flex flex-col justify-between min-h-0">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D9]">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-7 h-7 text-[#E5391C]" />
                <span className="text-[26px] font-bold text-[#222222]">
                  Empirical Movement Time (MT) Across Distance (D) & Target Width (W)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[16px] font-mono text-[#6E6D70]">Metric Unit:</span>
                <button
                  onClick={() => setChartUnit(chartUnit === 'ms' ? 'bits' : 'ms')}
                  className="px-3 py-1 bg-[#FAF9F6] border border-[#E8E2D9] rounded-lg text-[15px] font-mono font-bold text-[#E5391C] cursor-pointer hover:bg-[#F5F2ED]"
                >
                  {chartUnit === 'ms' ? '⏱️ Milliseconds (ms)' : '📊 Index of Difficulty (bits)'}
                </button>
              </div>
            </div>

            {/* Legible Quantitative Bars */}
            <div className="space-y-4 py-2 flex-1 flex flex-col justify-around">
              {[
                {
                  label: 'Condition A: Large Primary Action Button (D=120px, W=96px)',
                  bits: '1.32 bits',
                  ms: '230 ms',
                  pct: 28,
                  barColor: 'bg-emerald-600',
                  verdict: 'Instant Acquisition',
                },
                {
                  label: 'Condition B: Secondary Form Input Field (D=480px, W=48px)',
                  bits: '4.32 bits',
                  ms: '520 ms',
                  pct: 62,
                  barColor: 'bg-amber-600',
                  verdict: 'Moderate Steering',
                },
                {
                  label: 'Condition C: Nested Menu Micro-Icon (D=960px, W=14px)',
                  bits: '7.10 bits',
                  ms: '890 ms',
                  pct: 96,
                  barColor: 'bg-[#E5391C]',
                  verdict: 'Severe Motor Friction',
                },
              ].map((row, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-center text-[24px]">
                    <span className="font-medium text-[#2D2D2E]">{row.label}</span>
                    <span className="font-mono font-bold text-[#222222]">
                      <span className="text-[#6E6D70] mr-2">[{row.bits}]</span>
                      <span className="text-[#E5391C] font-bold text-[26px]">
                        {chartUnit === 'ms' ? row.ms : row.bits}
                      </span>
                    </span>
                  </div>
                  <div className="w-full h-6 bg-stone-100 rounded-full overflow-hidden flex border border-stone-200">
                    <div
                      className={`h-full ${row.barColor} rounded-full transition-all duration-500`}
                      style={{ width: `${row.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Chart Footnote / Caption (Requirement 9 >= 20px) */}
            <div className="text-[22px] font-mono text-[#6E6D70] pt-2 flex items-center justify-between border-t border-[#E8E2D9]">
              <span>ISO 9241-9 Standardized Pointing Device Ergonomics Benchmark</span>
              <span className="text-emerald-700 font-bold">Correlation Coefficient r² = 0.984</span>
            </div>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* SLIDE 3 OF 3: TECHNICAL CODE IMPLEMENTATION & CLASSROOM ACTIVITY + TIMER  */}
      {/* Cases 7, 8, 9, 10 (+10% Larger Typography)                                */}
      {/* ========================================================================= */}
      {activeDemoSlide === 3 && (
        <main className="flex-1 flex flex-col justify-between py-6 gap-6 min-h-0">
          {/* Header Title */}
          <div className="flex items-start justify-between gap-8 flex-shrink-0">
            <div className="space-y-2 max-w-[1360px]">
              <h1 className="text-[58px] leading-[1.08] font-serif-display font-medium text-[#2D2D2E] tracking-tight">
                Engineering Fitts's Law & Classroom Investigation
              </h1>
              <h2 className="text-[42px] leading-[1.2] text-[#525254] font-light">
                Mathematical Implementation and Active Student Forensic Evaluation
              </h2>
            </div>

            <div className="flex-shrink-0 bg-white border-2 border-[#E5391C]/30 shadow-xs rounded-2xl px-6 py-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#FDF5F3] border border-[#FAD6CF] flex items-center justify-center text-[#E5391C]">
                <Clock className="w-8 h-8" />
              </div>
              <div>
                <div className="text-[14px] font-mono uppercase tracking-wider text-[#E5391C] font-bold">
                  Classroom Activity
                </div>
                <div className="text-[28px] font-bold text-[#222222] leading-tight">
                  90-Second Pair Forensic Audit
                </div>
              </div>
            </div>
          </div>

          {/* MAIN 2-COLUMN SPLIT: Left = Technical Code (Case 7) | Right = Activity & Timer (Case 8 & 10) */}
          <div className="grid grid-cols-12 gap-8 flex-1 min-h-0 items-stretch">
            {/* LEFT 6 COLS: CASE 7 TECHNICAL CODE (24px Code Text) */}
            <div className="col-span-6 bg-white border border-[#E8E2D9] rounded-3xl p-7 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9]">
                  <div className="flex items-center gap-3">
                    <Code2 className="w-6 h-6 text-[#E5391C]" />
                    <span className="text-[22px] font-mono font-bold text-[#222222]">
                      fitts_law.ts — Shannon Formulation (MacKenzie 1992)
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded text-[14px] font-mono font-bold bg-[#FAF9F6] border border-[#E8E2D9] text-[#525254]">
                    TypeScript
                  </span>
                </div>

                {/* Syntax-Highlighted Code at 24px Font Size */}
                <pre className="font-mono-code text-[24px] leading-[1.45] bg-[#1F2421] text-[#E8E2D9] p-5 rounded-2xl overflow-x-auto shadow-inner mt-4">
                  <code>
                    <span className="text-emerald-400">export function</span> calculateMovementTime(
                    {'\n'}  distancePx: <span className="text-amber-300">number</span>,
                    {'\n'}  widthPx: <span className="text-amber-300">number</span>
                    {'\n'}): {'{'}{' '}indexOfDifficulty: <span className="text-amber-300">number</span>; ms: <span className="text-amber-300">number</span>{' '}{'}'} {'{'}
                    {'\n'}  <span className="text-stone-400">// Shannon formulation: ID = log2(D/W + 1)</span>
                    {'\n'}  <span className="text-emerald-400">const</span> ID = Math.<span className="text-blue-400">log2</span>((distancePx / widthPx) + <span className="text-purple-300">1</span>);
                    {'\n'}  <span className="text-emerald-400">const</span> empiricalMs = <span className="text-purple-300">100</span> + (<span className="text-purple-300">150</span> * ID);
                    {'\n'}  <span className="text-emerald-400">return</span> {'{'} indexOfDifficulty: ID, ms: empiricalMs {'}'};
                    {'\n'}{'}'}
                  </code>
                </pre>
              </div>

              {/* Code Annotation Footnote (Requirement 9 >= 20px) */}
              <div className="text-[22px] font-mono text-[#525254] pt-3 flex items-center justify-between border-t border-[#E8E2D9]">
                <span>Screen Edges have Width W = ∞ (Zero Miss Probability)</span>
                <span className="text-emerald-700 font-bold">O(log D/W) Complexity</span>
              </div>
            </div>

            {/* RIGHT 6 COLS: CASE 8 INSTRUCTIONS & ACTIVITY + ACTIVE TIMER */}
            <div className="col-span-6 bg-white border border-[#E8E2D9] rounded-3xl p-7 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9]">
                  <div className="flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#E5391C]" />
                    <span className="text-[20px] font-mono uppercase tracking-wider text-[#E5391C] font-bold">
                      Interactive Classroom Exercise
                    </span>
                  </div>
                  <span className="px-3.5 py-1 rounded-full text-[15px] font-mono font-bold bg-[#FDF5F3] text-[#E5391C] border border-[#FAD6CF]">
                    PAIR DISCUSSION · 90 SECONDS
                  </span>
                </div>

                <h3 className="text-[40px] font-serif-display font-medium text-[#222222] pt-4 leading-tight">
                  Auditing IDE Button Acquisition Latency
                </h3>

                {/* Activity Instructions (+10% Larger: 32px text) */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-4">
                    <span className="w-12 h-12 rounded-xl bg-[#222222] text-white flex items-center justify-center font-mono font-bold text-[26px] shrink-0">
                      1
                    </span>
                    <p className="text-[32px] leading-[1.35] text-[#2D2D2E]">
                      Open your primary code editor (VS Code, JetBrains). Locate the <strong>Run / Debug</strong> button.
                    </p>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="w-12 h-12 rounded-xl bg-[#222222] text-white flex items-center justify-center font-mono font-bold text-[26px] shrink-0">
                      2
                    </span>
                    <p className="text-[32px] leading-[1.35] text-[#2D2D2E]">
                      Estimate target width (W) and distance (D). Formulate whether it leverages an <strong>infinite edge</strong> or causes motor steering penalty.
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Countdown Timer & Controls (+10% Larger) */}
              <div className="bg-[#FAF9F6] border-2 border-[#E8E2D9] rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[20px] font-mono text-[#525254] font-bold flex items-center gap-2">
                    <Clock className="w-6 h-6 text-[#E5391C]" />
                    <span>Exercise Countdown Clock:</span>
                  </span>

                  <span
                    className={`text-[56px] font-mono font-bold tracking-tight ${
                      timerSeconds <= 15 ? 'text-[#E5391C] animate-pulse' : 'text-[#222222]'
                    }`}
                  >
                    {formatTime(timerSeconds)}
                  </span>
                </div>

                {/* Control Buttons (Case 10: 24px buttons with hover, active, pressed states) */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={`flex-1 py-3.5 px-5 rounded-xl text-[24px] font-bold transition-all flex items-center justify-center gap-3 shadow-sm cursor-pointer active:scale-98 ${
                      isTimerRunning
                        ? 'bg-amber-600 hover:bg-amber-700 text-white'
                        : 'bg-[#E5391C] hover:bg-[#C92B10] text-white'
                    }`}
                  >
                    {isTimerRunning ? (
                      <>
                        <Pause className="w-7 h-7" />
                        <span>Pause Timer</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-7 h-7" />
                        <span>{timerSeconds === 90 ? 'Start 90s Timer' : 'Resume Timer'}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={resetTimer}
                    className="py-3.5 px-6 rounded-xl text-[24px] font-bold bg-white hover:bg-stone-100 text-[#525254] border border-[#E8E2D9] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <RotateCcw className="w-7 h-7" />
                    <span>Reset</span>
                  </button>
                </div>

                {/* Facilitation Advice (>= 20px) */}
                <div className="text-[22px] text-[#6E6D70] font-sans pt-1 flex items-center gap-2 border-t border-[#E8E2D9]">
                  <Info className="w-6 h-6 text-[#E5391C] shrink-0" />
                  <span><strong>Facilitation:</strong> Have students compare macOS menu bars (W=∞) against Windows detached panels.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Distinct Takeaway Banner */}
          <div className="bg-white border-2 border-[#E8E2D9] rounded-2xl p-5 shadow-xs flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FDF5F3] border border-[#FAD6CF] flex items-center justify-center text-[#E5391C] shrink-0">
                <Zap className="w-7 h-7" />
              </div>
              <p className="text-[28px] leading-tight font-serif-display font-medium text-[#2D2D2E]">
                <strong className="text-[#E5391C] font-semibold">Architectural Takeaway:</strong> Pixels that touch the display perimeter are infinitely fast to acquire because mouse overshoot is physically bounded.
              </p>
            </div>
            <span className="text-[18px] font-mono text-[#6E6D70] font-semibold flex-shrink-0 pl-6 border-l border-[#E8E2D9]">
              Validation Case 7–8, 10
            </span>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* INSTITUTIONAL FOOTER BAR WITH DIRECT SLIDE FLIP CONTROLS                 */}
      {/* ========================================================================= */}
      <footer className="h-14 pt-3 border-t border-[#E8E2D9] flex items-center justify-between text-[17px] font-mono text-[#6E6D70] flex-shrink-0">
        <div className="flex items-center gap-3">
          <span>Mohammed VI Polytechnic University</span>
          <span>·</span>
          <span>School of Computer Science & HCI</span>
        </div>

        {/* Previous / Next Slide Direct Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            disabled={activeDemoSlide === 1}
            className="px-3.5 py-1.5 rounded-lg bg-white border border-[#E8E2D9] text-[#222222] hover:bg-[#F5F2ED] disabled:opacity-30 disabled:cursor-not-allowed font-bold flex items-center gap-1.5 transition-colors cursor-pointer text-[15px]"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev Demo Slide</span>
          </button>

          <span className="text-[#2D2D2E] font-bold px-2">
            Demo {activeDemoSlide} / 3
          </span>

          <button
            onClick={handleNext}
            disabled={activeDemoSlide === 3}
            className="px-3.5 py-1.5 rounded-lg bg-[#E5391C] hover:bg-[#C92B10] text-white disabled:opacity-30 disabled:cursor-not-allowed font-bold flex items-center gap-1.5 transition-colors cursor-pointer text-[15px] shadow-xs"
          >
            <span>Next Demo Slide</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[#2D2D2E] font-bold">Prof. Yassine Ben-Aboud</span>
          <span>·</span>
          <span className="text-[#E5391C] font-semibold">+10% Validated Standard</span>
        </div>
      </footer>
    </div>
  );
};
