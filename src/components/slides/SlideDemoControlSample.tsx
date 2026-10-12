import React, { useState, useEffect } from 'react';
import {
  Brain,
  ArrowRight,
  Clock,
  RotateCcw,
  Play,
  Pause,
  Activity,
  BarChart3,
  Code2,
  Zap,
  Info,
  ChevronLeft,
  ChevronRight,
  Scale,
  Target,
} from 'lucide-react';
import { UM6PLogo } from '../brand/UM6PLogo';

/**
 * SlideDemoControlSample — Phase 1 Multi-Slide Validation Suite (6 slides)
 *
 * Typography is the validated 1920 × 1080 standard (see DESIGN_STANDARD.md) and is NOT
 * resized here. Every font size below is one that already existed in the approved demo.
 * - Slide Titles: 58 px · Section Headings: 42 px · Main Body: 34 px · Bullets: 30 px
 * - Activity Instructions: 32 px · Diagram Labels: 26–28 px · Secondary / Captions: 22–24 px
 * - Controls & Buttons: 24 px · Institutional Header / Footer: 14–18 px
 *
 * OVERFLOW STRATEGY (Design Standard §2 "Strict Rule on Overflow & Slide Partitioning"):
 * The content area is 1824 × 864 px. Content that did not fit at the validated sizes is split
 * across slides instead of being shrunk:
 *   Demo 1  Hierarchy, body text, emphasis & takeaway
 *   Demo 2  Two-column comparison (Affordance vs Signifier)
 *   Demo 3  Process diagram flow (Model Human Processor)
 *   Demo 4  Quantitative visualization (Fitts's Law)
 *   Demo 5  Technical code + worked example
 *   Demo 6  Classroom activity with live timer
 */

export const DEMO_SLIDES = [
  { id: 1, tab: 'Concepts & Body Text', title: 'Hierarchy, Body Text & Emphasis' },
  { id: 2, tab: 'Comparison', title: 'Affordance vs Signifier' },
  { id: 3, tab: 'Process Diagram', title: 'Model Human Processor Flow' },
  { id: 4, tab: 'Quantitative Chart', title: "Fitts's Law Data Visualization" },
  { id: 5, tab: 'Code', title: 'Technical Code & Worked Example' },
  { id: 6, tab: 'Live Activity', title: 'Classroom Activity & Timer' },
] as const;

export const DEMO_SLIDE_COUNT = DEMO_SLIDES.length;

// Single source of truth for the Fitts's Law numbers shown on Demos 4 and 5,
// computed with exactly the formula printed in the Demo 5 code listing.
const FITTS_A_MS = 100;
const FITTS_B_MS = 150;
const fitts = (distancePx: number, widthPx: number) => {
  const id = Math.log2(distancePx / widthPx + 1);
  return { id, ms: FITTS_A_MS + FITTS_B_MS * id };
};

const FITTS_ROWS = [
  {
    label: 'A: Large Primary Action Button (D=120px, W=96px)',
    d: 120,
    w: 96,
    barColor: 'bg-emerald-600',
    verdictColor: 'text-emerald-700',
    verdict: 'Instant Acquisition',
  },
  {
    label: 'B: Secondary Form Input Field (D=480px, W=48px)',
    d: 480,
    w: 48,
    barColor: 'bg-amber-600',
    verdictColor: 'text-amber-700',
    verdict: 'Moderate Steering',
  },
  {
    label: 'C: Nested Menu Micro-Icon (D=960px, W=14px)',
    d: 960,
    w: 14,
    barColor: 'bg-[#E5391C]',
    verdictColor: 'text-[#E5391C]',
    verdict: 'Severe Motor Friction',
  },
].map((r) => ({ ...r, ...fitts(r.d, r.w) }));

const CHART_AXIS_MAX_MS = 1100;

const PROCESS_NODES = [
  {
    id: 1,
    tag: 'STAGE 01',
    tau: 'τₚ ≈ 100 ms',
    name: 'Sensory Eye/Ear Buffer',
    blurb: 'Iconic store holds 200ms of raw visual stimulation',
    arrow: 'Encode',
    range: '50–200 ms',
    detail: 'Raw photons are held in a short-lived iconic store. Anything not attended within ~200 ms is lost.',
  },
  {
    id: 2,
    tag: 'STAGE 02',
    tau: 'τc ≈ 70 ms',
    name: 'Cognitive Processor',
    blurb: 'Matches mental models against activated rule base',
    arrow: 'Dispatch',
    range: '25–170 ms',
    detail: 'The percept is matched against activated rules in memory, and one response is selected.',
  },
  {
    id: 3,
    tag: 'STAGE 03',
    tau: 'τₘ ≈ 70 ms',
    name: 'Motor Actuator',
    blurb: 'Sends micro-correction bursts to fingers/hand muscles',
    arrow: '',
    range: '30–100 ms',
    detail: 'The chosen response becomes a motor command, refined by micro-corrections of the hand.',
  },
];

interface SlideDemoControlSampleProps {
  currentSlideIndex?: number;
  totalSlides?: number;
  onNext?: () => void;
  onPrev?: () => void;
  onSelect?: (index: number) => void;
}

/* -------------------------------------------------------------------------- */
/* Shared slide primitives (same visual identity on every demo slide)         */
/* -------------------------------------------------------------------------- */

const SlideHeading: React.FC<{
  title: string;
  subtitle: string;
  badgeIcon: React.ReactNode;
  badgeLabel: string;
  badgeValue: string;
}> = ({ title, subtitle, badgeIcon, badgeLabel, badgeValue }) => (
  <div className="flex items-start justify-between gap-8 flex-shrink-0">
    <div className="space-y-2 min-w-0">
      <h1 className="text-[58px] leading-[1.08] font-serif-display font-medium text-[#2D2D2E] tracking-tight">
        {title}
      </h1>
      <h2 className="text-[42px] leading-[1.2] text-[#525254] font-light">{subtitle}</h2>
    </div>

    <div className="flex-shrink-0 bg-white border-2 border-[#E5391C]/30 shadow-xs rounded-2xl px-6 py-4 flex items-center gap-4">
      <div className="w-14 h-14 rounded-xl bg-[#FDF5F3] border border-[#FAD6CF] flex items-center justify-center text-[#E5391C]">
        {badgeIcon}
      </div>
      <div>
        <div className="text-[14px] font-mono uppercase tracking-wider text-[#E5391C] font-bold">
          {badgeLabel}
        </div>
        <div className="text-[28px] font-bold text-[#222222] leading-tight whitespace-nowrap">
          {badgeValue}
        </div>
      </div>
    </div>
  </div>
);

const TakeawayBanner: React.FC<{ children: React.ReactNode; tag: string }> = ({ children, tag }) => (
  <div className="bg-white border-2 border-[#E8E2D9] rounded-2xl p-5 shadow-xs flex items-center justify-between flex-shrink-0">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-[#FDF5F3] border border-[#FAD6CF] flex items-center justify-center text-[#E5391C] shrink-0">
        <Zap className="w-7 h-7" />
      </div>
      <p className="text-[28px] leading-tight font-serif-display font-medium text-[#2D2D2E]">
        <strong className="text-[#E5391C] font-semibold">Architectural Takeaway:</strong> {children}
      </p>
    </div>
    <span className="text-[18px] font-mono text-[#6E6D70] font-semibold flex-shrink-0 pl-6 ml-6 border-l border-[#E8E2D9] whitespace-nowrap">
      {tag}
    </span>
  </div>
);

const MAIN_CLASS = 'flex-1 flex flex-col py-6 gap-6 min-h-0';

export const SlideDemoControlSample: React.FC<SlideDemoControlSampleProps> = ({
  currentSlideIndex = 0,
  onNext,
  onPrev,
  onSelect,
}) => {
  const clampIndex = (i: number) => Math.min(DEMO_SLIDE_COUNT - 1, Math.max(0, i));
  const [activeDemoSlide, setActiveDemoSlide] = useState<number>(clampIndex(currentSlideIndex) + 1);

  // Sync with parent index if provided
  useEffect(() => {
    if (typeof currentSlideIndex === 'number') {
      setActiveDemoSlide(clampIndex(currentSlideIndex) + 1);
    }
  }, [currentSlideIndex]);

  // Interactive Activity Timer (Demo 6)
  const [timerSeconds, setTimerSeconds] = useState<number>(90);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Selected node for the process diagram (Demo 3)
  const [selectedNode, setSelectedNode] = useState<number>(2);

  // Chart view mode (Demo 4)
  const [chartUnit, setChartUnit] = useState<'ms' | 'bits'>('ms');

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

  const goTo = (id: number) => {
    if (onSelect) {
      onSelect(id - 1);
    } else {
      setActiveDemoSlide(id);
    }
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      setActiveDemoSlide((prev) => Math.min(DEMO_SLIDE_COUNT, prev + 1));
    }
  };

  const handlePrev = () => {
    if (onPrev) {
      onPrev();
    } else {
      setActiveDemoSlide((prev) => Math.max(1, prev - 1));
    }
  };

  const node = PROCESS_NODES.find((n) => n.id === selectedNode) ?? PROCESS_NODES[1];
  const conditionC = FITTS_ROWS[2];

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
          <span className="text-[15px] font-mono uppercase text-[#E5391C] tracking-widest font-bold bg-[#FDF5F3] px-3.5 py-1.5 rounded-lg border border-[#FAD6CF] whitespace-nowrap">
            PHASE 1 · DESIGN STANDARD VALIDATION
          </span>
          <span className="text-[15px] font-mono text-[#6E6D70] whitespace-nowrap">
            Scale: +10% Projection Standard · Multi-Slide Suite
          </span>
        </div>

        {/* Demo Sub-Slide Navigation Tabs */}
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white p-1 rounded-xl border border-[#E8E2D9] shadow-xs">
            {DEMO_SLIDES.map((s) => (
              <button
                key={s.id}
                onClick={() => goTo(s.id)}
                title={`Demo ${s.id}: ${s.tab}`}
                className={`w-10 py-1.5 rounded-lg text-[14px] font-mono font-bold transition-all cursor-pointer ${
                  activeDemoSlide === s.id
                    ? 'bg-[#E5391C] text-white shadow-xs'
                    : 'text-[#525254] hover:text-[#222222] hover:bg-[#F5F2ED]'
                }`}
              >
                {s.id}
              </button>
            ))}
          </div>

          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[14px] font-mono font-bold rounded-lg border border-emerald-300 whitespace-nowrap">
            SLIDE {activeDemoSlide} OF {DEMO_SLIDE_COUNT}
          </span>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* DEMO 1: HIERARCHY, BODY TEXT & EMPHASIS                                   */}
      {/* ========================================================================= */}
      {activeDemoSlide === 1 && (
        <main className={MAIN_CLASS}>
          <SlideHeading
            title="The Human Information Channel"
            subtitle="Perceptual buffers, working memory & affordance"
            badgeIcon={<Brain className="w-8 h-8" />}
            badgeLabel="Cognitive Baseline"
            badgeValue="Working memory: 3–4 chunks"
          />

          <div className="flex-1 min-h-0 bg-white border border-[#E8E2D9] rounded-3xl p-10 shadow-xs flex flex-col justify-center gap-8">
            <p className="text-[34px] leading-[1.42] text-[#2D2D2E]">
              Every digital interface interacts with a biological processor. Human visual sensors capture raw photons, but working memory can only manipulate <strong className="text-[#222222] font-bold underline decoration-[#E5391C] decoration-4 underline-offset-4">3 to 4 independent chunks</strong> before cognitive overflow occurs.
            </p>

            <div className="grid grid-cols-2 gap-10 pt-6 border-t border-[#E8E2D9]">
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

          <TakeawayBanner tag="Demo 1">
            Working memory is the bottleneck: every element must earn its chunk.
          </TakeawayBanner>
        </main>
      )}

      {/* ========================================================================= */}
      {/* DEMO 2: TWO-COLUMN COMPARISON                                             */}
      {/* ========================================================================= */}
      {activeDemoSlide === 2 && (
        <main className={MAIN_CLASS}>
          <SlideHeading
            title="Affordance vs. Signifier"
            subtitle="What an object permits versus what it communicates"
            badgeIcon={<Scale className="w-8 h-8" />}
            badgeLabel="Gulf of Execution"
            badgeValue="Closed by signifiers"
          />

          <div className="flex-1 grid grid-cols-2 gap-8 min-h-0 items-stretch">
            {/* Left: Physical Affordance */}
            <div className="bg-white border-2 border-[#E8E2D9] rounded-3xl p-7 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9]">
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded-full bg-blue-600" />
                    <span className="text-[30px] font-bold text-[#222222]">Physical Affordance</span>
                  </div>
                  <span className="px-3 py-1 rounded-lg text-[15px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200 whitespace-nowrap">
                    J.J. Gibson (1979)
                  </span>
                </div>
                <p className="text-[26px] leading-[1.4] text-[#525254] pt-4">
                  The actual, objective physical properties of an object that permit specific interactions. Affordances exist in the physical environment whether an observer perceives them or not.
                </p>
                <div className="pt-4 text-[24px] leading-[1.4] text-[#2D2D2E]">
                  <strong>Canonical Example:</strong> A flat brass plate physically allows pushing; a circular graspable knob permits turning.
                </div>
              </div>

              <div className="text-[22px] leading-[1.3] font-mono text-blue-900 bg-blue-50/80 px-4 py-3 rounded-xl border border-blue-200 flex items-center gap-3 font-semibold mt-4">
                <span className="w-3 h-3 rounded-full bg-blue-600 shrink-0" />
                <span>Physical Reality: grounded in mechanics</span>
              </div>
            </div>

            {/* Right: Perceived Signifier */}
            <div className="bg-[#FDF5F3] border-2 border-[#FAD6CF] rounded-3xl p-7 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#FAD6CF]">
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded-full bg-[#E5391C]" />
                    <span className="text-[30px] font-bold text-[#E5391C]">Perceived Signifier</span>
                  </div>
                  <span className="px-3 py-1 rounded-lg text-[15px] font-mono font-bold bg-[#E5391C] text-white whitespace-nowrap">
                    Don Norman (2013)
                  </span>
                </div>
                <p className="text-[26px] leading-[1.4] text-[#2D2D2E] pt-4">
                  Any visual, tactile, or audible cue that indicates <em>where</em> and <em>how</em> interaction should occur. Signifiers communicate intent and bridge the psychological gulf of execution.
                </p>
                <div className="pt-4 text-[24px] leading-[1.4] text-[#2D2D2E]">
                  <strong>Canonical Example:</strong> The stamped word "PUSH", a drop shadow under a clickable button, or a glowing door handle.
                </div>
              </div>

              <div className="text-[22px] leading-[1.3] font-mono text-[#E5391C] bg-white px-4 py-3 rounded-xl border border-[#FAD6CF] flex items-center gap-3 font-bold mt-4">
                <span className="w-3 h-3 rounded-full bg-[#E5391C] shrink-0" />
                <span>Communication Channel: cue for the human</span>
              </div>
            </div>
          </div>

          <TakeawayBanner tag="Demo 2">
            If an interface needs a manual, its signifiers have failed.
          </TakeawayBanner>
        </main>
      )}

      {/* ========================================================================= */}
      {/* DEMO 3: PROCESS DIAGRAM FLOW                                              */}
      {/* ========================================================================= */}
      {activeDemoSlide === 3 && (
        <main className={MAIN_CLASS}>
          <SlideHeading
            title="The Processing Cycle"
            subtitle="Model Human Processor (MHP) cycle times"
            badgeIcon={<Activity className="w-8 h-8" />}
            badgeLabel="Total Loop"
            badgeValue="T = τₚ + τc + τₘ ≈ 240 ms"
          />

          <div className="bg-white border border-[#E8E2D9] rounded-3xl p-7 shadow-xs space-y-4 flex-shrink-0">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9]">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full bg-[#E5391C]" />
                <span className="text-[20px] font-mono uppercase tracking-wider text-[#222222] font-bold">
                  The Three Subsystem Process Flow
                </span>
              </div>
              <span className="text-[16px] font-mono text-[#6E6D70]">
                Interactive: click any stage to inspect its latency range
              </span>
            </div>

            {/* Connecting Nodes with Arrows */}
            <div className="grid grid-cols-11 gap-2 items-stretch py-2">
              {PROCESS_NODES.map((n) => (
                <React.Fragment key={n.id}>
                  <div
                    onClick={() => setSelectedNode(n.id)}
                    className={`col-span-3 p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedNode === n.id
                        ? 'bg-[#FDF5F3] border-[#E5391C] shadow-md ring-2 ring-[#E5391C]/20'
                        : 'bg-white border-[#E8E2D9] hover:border-stone-400'
                    }`}
                  >
                    <div className="flex justify-between items-center pb-2">
                      <span className="text-[16px] font-mono text-[#E5391C] font-bold">{n.tag}</span>
                      <span className="text-[18px] font-mono font-bold bg-white px-2.5 py-1 rounded border border-[#E8E2D9] whitespace-nowrap">
                        {n.tau}
                      </span>
                    </div>
                    <div className="text-[28px] font-bold text-[#222222] leading-tight">{n.name}</div>
                    <div className="text-[22px] leading-[1.35] text-[#525254] pt-2">{n.blurb}</div>
                  </div>

                  {n.arrow && (
                    <div className="col-span-1 flex flex-col items-center justify-center">
                      <ArrowRight className="w-10 h-10 text-[#E5391C]" />
                      <span className="text-[14px] font-mono text-[#6E6D70]">{n.arrow}</span>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="text-[22px] font-mono text-[#525254] pt-3 flex items-center justify-between border-t border-[#E8E2D9]">
              <span>SOURCE: Card, Moran & Newell, The Psychology of HCI (1983)</span>
              <span className="text-[#6E6D70] italic">Middle estimate</span>
            </div>
          </div>

          {/* Selected-stage detail */}
          <div className="flex-1 min-h-0 bg-[#FDF5F3] border-2 border-[#FAD6CF] rounded-3xl p-8 shadow-xs flex flex-col justify-center gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[30px] font-bold text-[#E5391C]">
                {node.tag} · {node.name}
              </span>
              <span className="text-[24px] font-mono font-bold text-[#222222] whitespace-nowrap">
                Range: {node.range}
              </span>
            </div>
            <p className="text-[34px] leading-[1.42] text-[#2D2D2E]">{node.detail}</p>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* DEMO 4: QUANTITATIVE VISUALIZATION                                        */}
      {/* ========================================================================= */}
      {activeDemoSlide === 4 && (
        <main className={MAIN_CLASS}>
          <SlideHeading
            title="Fitts's Law: Motor Physics"
            subtitle="Distance slows us down, target width speeds us up"
            badgeIcon={<Target className="w-8 h-8" />}
            badgeLabel="Mathematical Law"
            badgeValue="MT = a + b · log₂(D/W + 1)"
          />

          <div className="flex-1 min-h-0 bg-white border border-[#E8E2D9] rounded-3xl p-8 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9]">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-7 h-7 text-[#E5391C]" />
                <span className="text-[26px] font-bold text-[#222222]">
                  Movement Time (MT) by Distance (D) & Target Width (W)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[16px] font-mono text-[#6E6D70]">Metric Unit:</span>
                <button
                  onClick={() => setChartUnit(chartUnit === 'ms' ? 'bits' : 'ms')}
                  className="px-3 py-1.5 bg-[#FAF9F6] border border-[#E8E2D9] rounded-lg text-[15px] font-mono font-bold text-[#E5391C] cursor-pointer hover:bg-[#F5F2ED] whitespace-nowrap"
                >
                  {chartUnit === 'ms' ? 'Milliseconds (ms) ⇄' : 'Index of Difficulty (bits) ⇄'}
                </button>
              </div>
            </div>

            {/* Legible Quantitative Bars */}
            <div className="flex-1 flex flex-col justify-around py-4">
              {FITTS_ROWS.map((row) => {
                const msText = `${Math.round(row.ms)} ms`;
                const bitsText = `${row.id.toFixed(2)} bits`;
                return (
                  <div key={row.label} className="space-y-2">
                    <div className="flex justify-between items-baseline gap-6 text-[24px]">
                      <span className="font-medium text-[#2D2D2E]">Condition {row.label}</span>
                      <span className="font-mono font-bold whitespace-nowrap">
                        <span className="text-[#6E6D70] mr-3">[{chartUnit === 'ms' ? bitsText : msText}]</span>
                        <span className="text-[#E5391C] text-[26px]">
                          {chartUnit === 'ms' ? msText : bitsText}
                        </span>
                      </span>
                    </div>
                    <div className="grid grid-cols-[1fr_330px] items-center gap-6">
                      <div className="w-full h-6 bg-stone-100 rounded-full overflow-hidden flex border border-stone-200">
                        <div
                          className={`h-full ${row.barColor} rounded-full transition-all duration-500`}
                          style={{ width: `${(row.ms / CHART_AXIS_MAX_MS) * 100}%` }}
                        />
                      </div>
                      <span className={`text-[22px] font-bold ${row.verdictColor}`}>{row.verdict}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-[22px] font-mono text-[#6E6D70] pt-3 flex items-center justify-between border-t border-[#E8E2D9]">
              <span>OBSERVATION: Illustrative values from MT = 100 + 150 · ID</span>
              <span className="text-emerald-700 font-bold">ID = log₂(D/W + 1)</span>
            </div>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* DEMO 5: TECHNICAL CODE + WORKED EXAMPLE                                   */}
      {/* ========================================================================= */}
      {activeDemoSlide === 5 && (
        <main className={MAIN_CLASS}>
          <SlideHeading
            title="Engineering Fitts's Law"
            subtitle="The Shannon formulation, implemented in TypeScript"
            badgeIcon={<Code2 className="w-8 h-8" />}
            badgeLabel="Shannon Form"
            badgeValue="ID = log₂(D/W + 1)"
          />

          <div className="grid grid-cols-12 gap-8 flex-1 min-h-0 items-stretch">
            {/* LEFT: Code */}
            <div className="col-span-8 bg-white border border-[#E8E2D9] rounded-3xl p-7 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9]">
                  <div className="flex items-center gap-3">
                    <Code2 className="w-6 h-6 text-[#E5391C]" />
                    <span className="text-[22px] font-mono font-bold text-[#222222]">
                      fitts_law.ts (MacKenzie 1992)
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded text-[14px] font-mono font-bold bg-[#FAF9F6] border border-[#E8E2D9] text-[#525254]">
                    TypeScript
                  </span>
                </div>

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

              <div className="text-[22px] font-mono text-[#525254] pt-3 flex items-center justify-between border-t border-[#E8E2D9]">
                <span>NOTE: a = 100 ms and b = 150 ms/bit are illustrative</span>
              </div>
            </div>

            {/* RIGHT: Worked example, same numbers as Demo 4 */}
            <div className="col-span-4 bg-[#FDF5F3] border-2 border-[#FAD6CF] rounded-3xl p-7 shadow-xs flex flex-col justify-center gap-8">
              <div>
                <div className="pb-3 border-b border-[#FAD6CF]">
                  <span className="text-[20px] font-mono uppercase tracking-wider text-[#E5391C] font-bold">
                    Worked Example · Condition C
                  </span>
                </div>
                <div className="pt-5 space-y-4 text-[28px] leading-[1.3] text-[#2D2D2E]">
                  <div className="flex justify-between"><span>Distance D</span><span className="font-mono font-bold">{conditionC.d} px</span></div>
                  <div className="flex justify-between"><span>Width W</span><span className="font-mono font-bold">{conditionC.w} px</span></div>
                  <div className="flex justify-between"><span>ID</span><span className="font-mono font-bold">{conditionC.id.toFixed(2)} bits</span></div>
                  <div className="flex justify-between pt-4 border-t border-[#FAD6CF]">
                    <span className="font-bold">MT</span>
                    <span className="font-mono font-bold text-[#E5391C]">{Math.round(conditionC.ms)} ms</span>
                  </div>
                </div>
              </div>
              <div className="text-[22px] leading-[1.35] text-[#525254]">
                Same value as the red bar on Demo 4.
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* DEMO 6: CLASSROOM ACTIVITY + ACTIVE TIMER                                 */}
      {/* ========================================================================= */}
      {activeDemoSlide === 6 && (
        <main className={MAIN_CLASS}>
          <SlideHeading
            title="Classroom Investigation"
            subtitle="Active student forensic evaluation"
            badgeIcon={<Clock className="w-8 h-8" />}
            badgeLabel="Classroom Activity"
            badgeValue="90-Second Pair Audit"
          />

          <div className="grid grid-cols-12 gap-8 flex-1 min-h-0 items-stretch">
            {/* LEFT: Instructions */}
            <div className="col-span-7 bg-white border border-[#E8E2D9] rounded-3xl p-7 shadow-xs flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9]">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#E5391C]" />
                  <span className="text-[20px] font-mono uppercase tracking-wider text-[#E5391C] font-bold">
                    Interactive Classroom Exercise
                  </span>
                </div>
                <span className="px-3.5 py-1 rounded-full text-[15px] font-mono font-bold bg-[#FDF5F3] text-[#E5391C] border border-[#FAD6CF] whitespace-nowrap">
                  PAIR DISCUSSION · 90 SECONDS
                </span>
              </div>

              <h3 className="text-[40px] font-serif-display font-medium text-[#222222] pt-4 leading-tight">
                Auditing IDE Button Acquisition Latency
              </h3>

              <div className="space-y-5 pt-5">
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
                    Estimate target width (W) and distance (D). Decide whether it leverages an <strong>infinite edge</strong> or causes a motor steering penalty.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT: Timer */}
            <div className="col-span-5 bg-[#FAF9F6] border-2 border-[#E8E2D9] rounded-3xl p-7 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[20px] font-mono text-[#525254] font-bold flex items-center gap-2">
                  <Clock className="w-6 h-6 text-[#E5391C]" />
                  <span>Countdown Clock</span>
                </span>
                <span
                  className={`text-[56px] leading-none font-mono font-bold tracking-tight ${
                    timerSeconds <= 15 ? 'text-[#E5391C] animate-pulse' : 'text-[#222222]'
                  }`}
                >
                  {formatTime(timerSeconds)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`flex-1 py-3.5 px-5 rounded-xl text-[24px] font-bold transition-all flex items-center justify-center gap-3 shadow-sm cursor-pointer active:scale-98 whitespace-nowrap ${
                    isTimerRunning
                      ? 'bg-amber-600 hover:bg-amber-700 text-white'
                      : 'bg-[#E5391C] hover:bg-[#C92B10] text-white'
                  }`}
                >
                  {isTimerRunning ? (
                    <>
                      <Pause className="w-7 h-7" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-7 h-7" />
                      <span>{timerSeconds === 90 ? 'Start 90s' : 'Resume'}</span>
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

              <div className="text-[22px] leading-[1.35] text-[#6E6D70] pt-4 flex items-start gap-3 border-t border-[#E8E2D9]">
                <Info className="w-6 h-6 text-[#E5391C] shrink-0 mt-0.5" />
                <span><strong>Facilitation:</strong> Compare macOS menu bars (W=∞) with Windows detached panels.</span>
              </div>
            </div>
          </div>

          <TakeawayBanner tag="Demo 6">
            Screen-edge targets are fastest because the cursor cannot overshoot.
          </TakeawayBanner>
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
            Demo {activeDemoSlide} / {DEMO_SLIDE_COUNT}
          </span>

          <button
            onClick={handleNext}
            disabled={activeDemoSlide === DEMO_SLIDE_COUNT}
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
