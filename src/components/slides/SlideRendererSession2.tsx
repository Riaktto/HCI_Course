import React, { useState } from 'react';
import {
  Brain,
  Eye,
  MousePointer,
  Target,
  Zap,
  Sliders,
  Layers,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  FileText,
  Activity,
  Award,
  BookOpen,
  Compass,
  Cpu,
  Smartphone,
  Monitor,
  Flame,
  FolderTree,
  Search,
  Grid,
  ShieldCheck,
  RotateCcw,
  Play,
  ListOrdered,
  Workflow,
  Share2,
  ChevronRight,
  CornerDownRight,
  Info,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { SlideData } from '../../types';
import { UM6PLogo } from '../brand/UM6PLogo';
import { FittsLawExperiment } from '../experiments/session2/FittsLawExperiment';
import { HicksLawExperiment } from '../experiments/session2/HicksLawExperiment';
import { GestaltWorkbench } from '../experiments/session2/GestaltWorkbench';
import { MemoryChunkingExperiment } from '../experiments/session2/MemoryChunkingExperiment';
import { MentalModelSimulator } from '../experiments/session2/MentalModelSimulator';
import { CapstoneLabWorkspace } from '../experiments/session2/CapstoneLabWorkspace';

interface SlideRendererSession2Props {
  slide: SlideData;
  onNextSlide: () => void;
  onOpenTimer?: (seconds: number, label: string) => void;
}

interface StandardSlideFrameProps {
  slide: SlideData;
  children: React.ReactNode;
  footerHint?: React.ReactNode;
  takeawayBox?: React.ReactNode;
}

// Universal Slide Frame ensuring identical header, footer, margins, and typography to Session 1
const StandardSlideFrame: React.FC<StandardSlideFrameProps> = ({
  slide,
  children,
  footerHint,
  takeawayBox,
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-12 xl:p-14 bg-[#FAF9F6]">
      {/* Universal Academic Institutional Header — IDENTICAL to Session 1 */}
      <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <UM6PLogo variant="compact" theme="color" className="h-6 lg:h-7 w-auto" />
          <div className="h-4 w-px bg-[#E8E2D9]" />
          <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
            {slide.actTitle}
          </span>
        </div>
        <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide {slide.id} / 42</span>
      </div>

      {/* Main Slide Stage — scaled to 1720px width matching Session 1 */}
      <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-4 lg:py-6 gap-6 min-h-0 overflow-y-auto">
        {children}
      </div>

      {/* Institutional Synthesis / Footer — IDENTICAL to Session 1 */}
      {takeawayBox ? (
        <div className="p-4 lg:p-5 bg-white border border-[#E8E2D9] rounded-2xl text-center text-base sm:text-lg lg:text-xl font-serif-display font-medium text-[#2D2D2E] shadow-xs flex-shrink-0">
          {takeawayBox}
        </div>
      ) : (
        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
          {footerHint || slide.subtitle}
        </div>
      )}
    </div>
  );
};

// Frame dedicated to live interactive lab experiments
const ExperimentSlideFrame: React.FC<{ slide: SlideData; children: React.ReactNode }> = ({
  slide,
  children,
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-6 lg:p-8 bg-[#FAF9F6]">
      <div className="pb-3 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <UM6PLogo variant="compact" theme="color" className="h-6 lg:h-7 w-auto" />
          <div className="h-4 w-px bg-[#E8E2D9]" />
          <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
            {slide.actTitle}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#E5391C] bg-[#FDF5F3] px-2.5 py-0.5 rounded-full border border-[#FAD6CF] font-bold">
            <Sparkles className="w-3 h-3" />
            Live Lab
          </span>
        </div>
        <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide {slide.id} / 42</span>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden py-2">{children}</div>

      <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0 pt-2 border-t border-[#E8E2D9]">
        Live Interactive Experiment · Hands-on Empirical Demonstration
      </div>
    </div>
  );
};

export const SlideRendererSession2: React.FC<SlideRendererSession2Props> = ({
  slide,
  onNextSlide,
  onOpenTimer,
}) => {
  // State for interactive widgets
  const [slide5GazeTarget, setSlide5GazeTarget] = useState<'center' | 'alarm'>('center');
  const [slide12Intrinsic, setSlide12Intrinsic] = useState<number>(30);
  const [slide12Extraneous, setSlide12Extraneous] = useState<number>(50);
  const [slide26ModelStep, setSlide26ModelStep] = useState<number>(1);
  const [slide33DisclosureTier, setSlide33DisclosureTier] = useState<1 | 2 | 3>(1);

  // --------------------------------------------------------------------------
  // SLIDE 1: SESSION 02 INSTITUTIONAL TITLE SLIDE (IDENTICAL TO SESSION 1 SLIDE 1)
  // --------------------------------------------------------------------------
  if (slide.id === 1) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 lg:p-14 xl:p-16 bg-[#FAF9F6] relative overflow-hidden">
        {/* Subtle Moroccan Architectural Terracotta Motif Accent */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#E5391C]/5 pointer-events-none blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#1F2421]/5 pointer-events-none blur-3xl" />

        {/* Academic Institutional Header with Official UM6P Logo */}
        <div className="flex items-center justify-between pb-6 border-b border-[#E8E2D9] flex-shrink-0">
          <UM6PLogo variant="full" theme="color" className="h-10 lg:h-12" />

          <div className="text-right font-mono text-xs sm:text-sm text-[#6E6D70]">
            <span className="font-bold text-[#E5391C]">SESSION 02</span>
          </div>
        </div>

        {/* Hero Title Core (Large Presentation Typography scaling for 1920x1080) */}
        <div className="flex-1 flex flex-col justify-center w-full max-w-6xl xl:max-w-7xl space-y-6 lg:space-y-10 py-6">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm lg:text-base font-mono uppercase tracking-widest text-[#E5391C] bg-[#FDF5F3] px-4 py-1.5 rounded-full border border-[#FAD6CF] font-bold self-start">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E5391C]" />
            <span>Master Course · Human-Centered Systems</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-serif-display font-medium text-[#2D2D2E] tracking-tight leading-[1.05] text-balance">
            Human-Computer Interaction
          </h1>

          <p className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-[#525254] font-light max-w-5xl leading-relaxed">
            Session 02: The Human — Cognitive, Perceptual & Motor Mechanics
          </p>

          <div className="pt-4 flex items-center gap-6">
            <button
              onClick={onNextSlide}
              className="px-8 lg:px-12 py-4 lg:py-5 bg-[#E5391C] hover:bg-[#C92B10] text-white font-semibold text-lg lg:text-xl rounded-xl transition-all shadow-md flex items-center gap-3 group cursor-pointer active:scale-98"
            >
              <span>Begin Session 2</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Institutional Footer Credits */}
        <div className="pt-6 border-t border-[#E8E2D9] flex items-center justify-between text-xs sm:text-sm lg:text-base text-[#6E6D70] font-mono flex-shrink-0">
          <div>Mohammed VI Polytechnic University</div>
          <div className="font-semibold text-[#2D2D2E]">Prof. Yassine Ben-Aboud</div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 2: CONTINUITY FROM SESSION 1 (ECHOING EXACT TEASER SLIDE 45)
  // --------------------------------------------------------------------------
  if (slide.id === 2) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 bg-[#FAF9F6] overflow-y-auto select-text text-center">
        <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-6 lg:h-7 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 1 · Continuity & Foundations
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 2 / 42</span>
        </div>

        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-center py-6 lg:py-10 space-y-6 lg:space-y-8 min-h-0">
          {/* Exact Brain Icon Circle from Session 1 Slide 45 */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FDF5F2] border-2 border-[#E5391C] flex items-center justify-center mx-auto text-[#E5391C] shadow-sm">
            <Brain className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <div className="space-y-3">
            <span className="text-xs sm:text-sm lg:text-base font-mono uppercase tracking-widest text-[#E5391C] font-bold">
              Connecting from Last Week · The Opening Promise
            </span>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif-display font-medium text-[#2D2D2E]">
              The Human
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light">
              Perception · Attention · Memory · Mental Models · Cognition
            </p>
          </div>

          <p className="text-base sm:text-lg lg:text-xl text-[#6E6D70] max-w-4xl mx-auto leading-relaxed">
            Last week, we ended Session 1 with this exact promise: before we write another line of code or place another button, we must understand the biological machine sitting in front of the screen. Today, we deliver on that promise.
          </p>

          {/* Three Roadmap Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left pt-2">
            <div className="p-5 bg-white border border-[#E8E2D9] rounded-2xl shadow-xs">
              <span className="text-xs font-mono font-bold text-blue-600 block mb-1">01. PERCEPTION</span>
              <h4 className="text-lg font-bold font-serif-display text-[#2D2D2E]">Sensory Limits</h4>
              <p className="text-sm text-[#525254] mt-1.5 leading-relaxed">
                2° foveal tunnel, iconic visual memory decay, and Gestalt organizational laws.
              </p>
            </div>
            <div className="p-5 bg-white border border-[#E8E2D9] rounded-2xl shadow-xs">
              <span className="text-xs font-mono font-bold text-purple-600 block mb-1">02. COGNITION</span>
              <h4 className="text-lg font-bold font-serif-display text-[#2D2D2E]">Memory & Load</h4>
              <p className="text-sm text-[#525254] mt-1.5 leading-relaxed">
                Baddeley’s working memory, Cowan’s 3–4 chunk bottleneck, and Sweller’s cognitive load.
              </p>
            </div>
            <div className="p-5 bg-white border border-[#E8E2D9] rounded-2xl shadow-xs">
              <span className="text-xs font-mono font-bold text-[#E5391C] block mb-1">03. ACTION & MODELS</span>
              <h4 className="text-lg font-bold font-serif-display text-[#2D2D2E]">Motor Physics & Models</h4>
              <p className="text-sm text-[#525254] mt-1.5 leading-relaxed">
                Fitts’s Law, Hick’s Law, Norman’s Mental Models, and the 45-min Capstone Studio.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
          Bridging Session 1 to Session 2 · First: Rapid Recall of Foundations
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 3: RAPID RECALL: AFFORDANCE VS SIGNIFIER (EVERYDAY & DIGITAL EXAMPLES)
  // --------------------------------------------------------------------------
  if (slide.id === 3) {
    return (
      <StandardSlideFrame
        slide={slide}
        footerHint="Next: The Model Human Processor — Why Signifiers Must Respect Biological Limits"
      >
        <div className="space-y-3 text-center flex-shrink-0">
          <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#E5391C] font-bold">
            Essential Foundations Recall
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
            Affordance vs. Signifier
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
            The two most fundamental pillars of Session 1 applied to physical artifacts and software UI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 flex-1 items-stretch">
          {/* AFFORDANCE CARD */}
          <div className="bg-white border-2 border-stone-300 p-6 lg:p-8 xl:p-10 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-800 font-serif-display font-bold text-xl">
                    A
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E]">Affordance</h3>
                    <span className="text-xs font-mono text-stone-500 uppercase">J.J. Gibson (1977) · Don Norman (1988)</span>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold bg-stone-100 text-stone-700 px-3 py-1 rounded-full">
                  Physical Reality
                </span>
              </div>

              <p className="text-base sm:text-lg text-[#2D2D2E] leading-relaxed mb-4">
                <strong>What is physically possible:</strong> The actual relationship between an agent and an object that determines what actions can occur.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-stone-200">
                  <strong className="text-xs font-mono uppercase text-stone-700 block mb-1">Everyday Physical World</strong>
                  <p className="text-sm text-[#525254]">
                    A door plate <span className="text-stone-900 font-semibold">affords pushing</span>; a chair affords sitting; a handle affords grasping; a glass cup affords gripping.
                  </p>
                </div>
                <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-stone-200">
                  <strong className="text-xs font-mono uppercase text-stone-700 block mb-1">Digital Software World</strong>
                  <p className="text-sm text-[#525254]">
                    A button element <span className="text-stone-900 font-semibold">affords clicking</span>; a textarea affords typing; a canvas affords dragging gestures.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs font-mono text-stone-700">
              <strong>Key Truth:</strong> Affordances exist in physics and code whether the user perceives them or not.
            </div>
          </div>

          {/* SIGNIFIER CARD */}
          <div className="bg-[#FDF5F2] border-2 border-[#E5391C] p-6 lg:p-8 xl:p-10 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#FAD6CF]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E5391C] flex items-center justify-center text-[#E5391C] font-serif-display font-bold text-xl">
                    S
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E]">Signifier</h3>
                    <span className="text-xs font-mono text-[#E5391C] uppercase">Don Norman (2013 Edition)</span>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold bg-white text-[#E5391C] px-3 py-1 rounded-full border border-[#FAD6CF]">
                  Perceptual Signal
                </span>
              </div>

              <p className="text-base sm:text-lg text-[#2D2D2E] leading-relaxed mb-4">
                <strong>Where & how to act:</strong> Any perceivable cue, mark, signal, or label that communicates where action should take place.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 bg-white rounded-xl border border-[#FAD6CF]">
                  <strong className="text-xs font-mono uppercase text-[#E5391C] block mb-1">The Norman Door Trap</strong>
                  <p className="text-sm text-[#525254]">
                    A vertical pull-handle on a push door is a <span className="text-[#E5391C] font-semibold">misleading signifier</span>. It signals "PULL", but the door only affords "PUSH".
                  </p>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-[#FAD6CF]">
                  <strong className="text-xs font-mono uppercase text-[#E5391C] block mb-1">Digital UI Signifiers</strong>
                  <p className="text-sm text-[#525254]">
                    Drop shadows, beveled borders, blue underlines, and hover states signal <span className="text-[#E5391C] font-semibold">"this affords clicking"</span> to the human eye.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white rounded-xl border border-[#FAD6CF] text-xs font-mono text-[#E5391C]">
              <strong>The Golden Rule:</strong> Affordance defines what can happen; Signifier communicates what to do.
            </div>
          </div>
        </div>
      </StandardSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 4: THE MODEL HUMAN PROCESSOR (MHP)
  // --------------------------------------------------------------------------
  if (slide.id === 4) {
    return (
      <StandardSlideFrame
        slide={slide}
        footerHint="Card, Moran & Newell (1983): Total reaction time = τp + τc + τm ≈ 240 ms under ideal conditions"
      >
        <div className="space-y-3 text-center flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
            The Model Human Processor (MHP)
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
            Card, Moran & Newell (1983): The unchangeable hardware specification of the human user.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 flex-1 items-stretch">
          <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 xl:p-10 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E8E2D9]">
                <div className="flex items-center gap-3 text-blue-700">
                  <Eye className="w-8 h-8 text-blue-600" />
                  <span className="text-sm lg:text-base font-mono uppercase tracking-widest font-bold">
                    Perceptual Processor
                  </span>
                </div>
                <span className="font-mono text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                  τp ≈ 100 ms
                </span>
              </div>
              <ul className="space-y-4 text-base sm:text-lg lg:text-xl text-[#2D2D2E]">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-mono font-bold">•</span>
                  <span>Converts photons into neural signals in retina and visual cortex.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-mono font-bold">•</span>
                  <span>Iconic visual memory decays within ~200 milliseconds.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-mono font-bold">•</span>
                  <span>Operates entirely in parallel before conscious awareness.</span>
                </li>
              </ul>
            </div>
            <div className="text-sm sm:text-base font-mono text-blue-900 bg-blue-50 px-4 py-3 rounded-xl mt-6 border border-blue-200 font-bold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
              <span>Input Bandwidth: Optical Saccades (~230ms)</span>
            </div>
          </div>

          <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 xl:p-10 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E8E2D9]">
                <div className="flex items-center gap-3 text-purple-700">
                  <Brain className="w-8 h-8 text-purple-600" />
                  <span className="text-sm lg:text-base font-mono uppercase tracking-widest font-bold">
                    Cognitive Processor
                  </span>
                </div>
                <span className="font-mono text-xs font-bold bg-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-200">
                  τc ≈ 70 ms
                </span>
              </div>
              <ul className="space-y-4 text-base sm:text-lg lg:text-xl text-[#2D2D2E]">
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-mono font-bold">•</span>
                  <span>Matches sensory representations against long-term memory schemas.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-mono font-bold">•</span>
                  <span>Working memory stores strictly 3 to 4 active chunks.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-mono font-bold">•</span>
                  <span>Cycle latency increases sharply under anxiety and distraction.</span>
                </li>
              </ul>
            </div>
            <div className="text-sm sm:text-base font-mono text-purple-900 bg-purple-50 px-4 py-3 rounded-xl mt-6 border border-purple-200 font-bold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600 shrink-0" />
              <span>Throughput Bottleneck: 3–4 Working Chunks</span>
            </div>
          </div>

          <div className="bg-[#FDF5F2] border-2 border-[#E5391C] p-6 lg:p-8 xl:p-10 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#FAD6CF]">
                <div className="flex items-center gap-3 text-[#E5391C]">
                  <MousePointer className="w-8 h-8 text-[#E5391C]" />
                  <span className="text-sm lg:text-base font-mono uppercase tracking-widest font-bold">
                    Motor Processor
                  </span>
                </div>
                <span className="font-mono text-xs font-bold bg-[#FAF9F6] text-[#E5391C] px-3 py-1 rounded-full border border-[#FAD6CF]">
                  τm ≈ 70 ms
                </span>
              </div>
              <ul className="space-y-4 text-base sm:text-lg lg:text-xl text-[#2D2D2E]">
                <li className="flex items-start gap-3">
                  <span className="text-[#E5391C] font-mono font-bold">•</span>
                  <span>Executes micro-movements of finger, wrist, and eye muscles.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#E5391C] font-mono font-bold">•</span>
                  <span>Feedback correction loops operate in discrete 70ms bursts.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#E5391C] font-mono font-bold">•</span>
                  <span>Fine motor accuracy drops precipitously under physical fatigue.</span>
                </li>
              </ul>
            </div>
            <div className="text-sm sm:text-base font-mono text-[#E5391C] bg-white px-4 py-3 rounded-xl mt-6 border border-[#FAD6CF] font-bold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E5391C] shrink-0" />
              <span>Action Output: Pointing, Tapping, Typing</span>
            </div>
          </div>
        </div>
      </StandardSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 5: THE MYTH OF BROAD VISION (FOVEA VS PERIPHERY)
  // --------------------------------------------------------------------------
  if (slide.id === 5) {
    return (
      <StandardSlideFrame
        slide={slide}
        footerHint="Hold your thumb at arm’s length. Your thumbnail is the exact size of your fovea centralis."
      >
        <div className="space-y-3 text-center flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
            The Myth of Broad Vision
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
            The human eye is not a uniform 4K camera: the 2° foveal pinhole vs peripheral blindness.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 flex-1 items-stretch">
          <div className="lg:col-span-7 bg-white border border-[#E8E2D9] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 text-blue-700 mb-4 pb-2 border-b border-[#E8E2D9]">
                <Eye className="w-8 h-8 text-blue-600" />
                <span className="text-sm lg:text-base font-mono uppercase tracking-widest font-bold">
                  The Biological Architecture of the Retina
                </span>
              </div>
              <div className="space-y-4 text-base sm:text-lg text-[#2D2D2E]">
                <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200">
                  <strong className="text-blue-900 block font-serif-display text-lg mb-1">
                    Fovea Centralis (1° to 2° of Visual Arc)
                  </strong>
                  <p className="text-[#525254] text-sm sm:text-base">
                    Covers only ~1% of retinal surface, yet consumes 50% of the visual cortex. Only here can humans resolve text, high-frequency contrast, and fine controls.
                  </p>
                </div>
                <div className="p-4 bg-stone-50 rounded-xl border border-[#E8E2D9]">
                  <strong className="text-stone-900 block font-serif-display text-lg mb-1">
                    Parafovea (2° to 5° of Arc)
                  </strong>
                  <p className="text-[#525254] text-sm sm:text-base">
                    Resolution drops by 50%. Text becomes blurry shapes; word boundaries can be predicted during reading saccades.
                  </p>
                </div>
                <div className="p-4 bg-stone-50 rounded-xl border border-[#E8E2D9]">
                  <strong className="text-stone-900 block font-serif-display text-lg mb-1">
                    Periphery (&gt; 5° of Arc)
                  </strong>
                  <p className="text-[#525254] text-sm sm:text-base">
                    Functionally color-blind and near-zero text resolution. Highly optimized for detecting rapid movement, sudden transients, and luminosity shifts.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-3 bg-red-50 text-red-800 rounded-xl border border-red-200 text-xs sm:text-sm font-mono mt-4">
              <strong>Engineering Rule:</strong> Users do NOT see notifications parked in distant corners while focused on inputs.
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#FDF5F2] border-2 border-[#E5391C] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#E5391C] font-bold block mb-2">
                Interactive Demonstration
              </span>
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E] mb-3">
                Simulated Foveal Gaze
              </h3>
              <p className="text-sm text-[#525254] mb-4">
                Click to shift the user’s eye gaze and observe how peripheral notifications vanish.
              </p>

              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setSlide5GazeTarget('center')}
                  className={`px-3 py-2 text-xs font-mono rounded-lg border font-bold cursor-pointer ${
                    slide5GazeTarget === 'center'
                      ? 'bg-[#E5391C] text-white border-[#E5391C]'
                      : 'bg-white text-stone-700 border-stone-300'
                  }`}
                >
                  Gaze: Form Center
                </button>
                <button
                  onClick={() => setSlide5GazeTarget('alarm')}
                  className={`px-3 py-2 text-xs font-mono rounded-lg border font-bold cursor-pointer ${
                    slide5GazeTarget === 'alarm'
                      ? 'bg-[#E5391C] text-white border-[#E5391C]'
                      : 'bg-white text-stone-700 border-stone-300'
                  }`}
                >
                  Gaze: Corner Alert
                </button>
              </div>

              <div className="h-44 bg-white border border-stone-300 rounded-xl relative p-3 flex flex-col justify-between overflow-hidden">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono text-stone-400">Header Nav</span>
                  <div
                    className={`p-2 rounded text-xs font-mono font-bold transition-all ${
                      slide5GazeTarget === 'alarm'
                        ? 'bg-red-600 text-white scale-105'
                        : 'bg-red-200 text-red-700 blur-[2px]'
                    }`}
                  >
                    ⚠ CRITICAL ERROR 503
                  </div>
                </div>
                <div className="text-center py-2">
                  <div
                    className={`inline-block px-4 py-2 rounded-lg border font-mono text-xs transition-all ${
                      slide5GazeTarget === 'center'
                        ? 'bg-blue-50 border-blue-400 text-blue-900 font-bold scale-105'
                        : 'bg-stone-100 border-stone-200 text-stone-400 blur-[3px]'
                    }`}
                  >
                    Active Form: [ National ID Number ]
                  </div>
                </div>
                <div className="text-xs font-mono text-stone-400">Submit Button</div>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#FAD6CF] text-xs font-mono text-[#E5391C] mt-4">
              {slide5GazeTarget === 'center'
                ? 'When foveated on the form, the corner alert is completely unreadable.'
                : 'Only when eye saccades shift to the corner can the error text be deciphered.'}
            </div>
          </div>
        </div>
      </StandardSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 6: PRE-ATTENTIVE VISUAL PROCESSING
  // --------------------------------------------------------------------------
  if (slide.id === 6) {
    return (
      <StandardSlideFrame
        slide={slide}
        footerHint="Pre-attentive attributes are extracted by V1 and V2 in the visual cortex in under 50 milliseconds."
      >
        <div className="space-y-3 text-center flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
            Pre-Attentive Visual Processing
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
            What the human visual cortex computes in parallel before conscious awareness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 flex-1 items-stretch">
          <div className="bg-white border border-[#E8E2D9] p-6 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600 mb-4">
                <div className="w-6 h-6 rounded-full bg-red-600" />
              </div>
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E] mb-2">Color Hue</h3>
              <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                A single red token among 100 gray tokens pops out in ~20ms, regardless of display density.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E8E2D9] font-mono text-xs text-[#E5391C]">
              Zero cognitive search latency (O(1)).
            </div>
          </div>

          <div className="bg-white border border-[#E8E2D9] p-6 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                <div className="w-8 h-8 rounded-md bg-blue-600" />
              </div>
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E] mb-2">Size & Scale</h3>
              <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                Geometric size differences are recognized instantaneously to establish focal importance.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E8E2D9] font-mono text-xs text-blue-600">
              Establishes dominant visual anchor.
            </div>
          </div>

          <div className="bg-white border border-[#E8E2D9] p-6 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 mb-4">
                <div className="w-7 h-2 bg-amber-600 rotate-45 rounded" />
              </div>
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E] mb-2">Spatial Angle</h3>
              <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                Tilted lines, diagonal badges, and asymmetric slashes register prior to semantic parsing.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E8E2D9] font-mono text-xs text-amber-700">
              Signals deviation from the grid.
            </div>
          </div>

          <div className="bg-white border border-[#E8E2D9] p-6 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-4">
                <Zap className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E] mb-2">Sudden Motion</h3>
              <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                Movement transients trigger the brainstem tectopulvinar system, forcing reflex saccades.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E8E2D9] font-mono text-xs text-emerald-700">
              Highest attentional hijack priority.
            </div>
          </div>
        </div>
      </StandardSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 7: THE GESTALT LAWS OF PERCEPTUAL ORGANIZATION
  // --------------------------------------------------------------------------
  if (slide.id === 7) {
    return (
      <StandardSlideFrame
        slide={slide}
        footerHint="Gestalt psychology (Wertheimer, Koffka, Köhler 1920s): The brain automatically groups visual chaos."
      >
        <div className="space-y-3 text-center flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
            The Gestalt Grouping Laws
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
            Six hardwired perceptual shortcuts that assemble isolated pixels into meaningful interfaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-stretch">
          <div className="bg-white border border-[#E8E2D9] p-6 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-[#E5391C] bg-[#FDF5F2] px-3 py-1 rounded-full border border-[#FAD6CF] uppercase">
                1. Law of Proximity
              </span>
              <h3 className="text-xl font-bold font-serif-display text-[#2D2D2E] mt-3 mb-2">
                Spatial Nearness
              </h3>
              <p className="text-sm sm:text-base text-[#525254]">
                Items closer together are perceived as a single functional group. Whitespace creates semantic boundaries.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E8E2D9] font-mono text-xs text-[#E5391C]">
              Rule: Label must be closer to input than next section.
            </div>
          </div>

          <div className="bg-white border border-[#E8E2D9] p-6 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 uppercase">
                2. Law of Similarity
              </span>
              <h3 className="text-xl font-bold font-serif-display text-[#2D2D2E] mt-3 mb-2">
                Shared Visual Form
              </h3>
              <p className="text-sm sm:text-base text-[#525254]">
                Elements sharing color, shape, or typography are assumed to perform identical roles.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E8E2D9] font-mono text-xs text-blue-600">
              Rule: All secondary actions must share identical styling.
            </div>
          </div>

          <div className="bg-white border border-[#E8E2D9] p-6 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 uppercase">
                3. Law of Common Region
              </span>
              <h3 className="text-xl font-bold font-serif-display text-[#2D2D2E] mt-3 mb-2">
                Enclosed Boundaries
              </h3>
              <p className="text-sm sm:text-base text-[#525254]">
                Enclosing items within a border or card instantly groups them, overriding pure proximity.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E8E2D9] font-mono text-xs text-emerald-700">
              Rule: Card containers organize high-density dashboards.
            </div>
          </div>

          <div className="bg-white border border-[#E8E2D9] p-6 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200 uppercase">
                4. Law of Continuity
              </span>
              <h3 className="text-xl font-bold font-serif-display text-[#2D2D2E] mt-3 mb-2">
                Smooth Vectors
              </h3>
              <p className="text-sm sm:text-base text-[#525254]">
                The eye follows smooth curves and aligned grid lines rather than abrupt angle changes.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E8E2D9] font-mono text-xs text-purple-700">
              Rule: Align inputs along a single strong vertical axis.
            </div>
          </div>

          <div className="bg-white border border-[#E8E2D9] p-6 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 uppercase">
                5. Law of Closure
              </span>
              <h3 className="text-xl font-bold font-serif-display text-[#2D2D2E] mt-3 mb-2">
                Mind Fills Gaps
              </h3>
              <p className="text-sm sm:text-base text-[#525254]">
                The human mind automatically completes broken borders and partial icons to see wholes.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E8E2D9] font-mono text-xs text-amber-700">
              Rule: Cut-off carousel cards signal horizontal scroll.
            </div>
          </div>

          <div className="bg-white border border-[#E8E2D9] p-6 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-stone-700 bg-stone-100 px-3 py-1 rounded-full border border-stone-300 uppercase">
                6. Figure / Ground
              </span>
              <h3 className="text-xl font-bold font-serif-display text-[#2D2D2E] mt-3 mb-2">
                Elevation & Focus
              </h3>
              <p className="text-sm sm:text-base text-[#525254]">
                Modals, backdrops, and drop shadows establish focal elevation, isolating active foreground from background.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E8E2D9] font-mono text-xs text-stone-600">
              Rule: Depth isolates current user intent.
            </div>
          </div>
        </div>
      </StandardSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 8: LIVE EXPERIMENT — THE GESTALT WORKBENCH (EXP1)
  // --------------------------------------------------------------------------
  if (slide.id === 8) {
    return (
      <ExperimentSlideFrame slide={slide}>
        <GestaltWorkbench />
      </ExperimentSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 9: ACT 1 TAKEAWAY: VISUAL HIERARCHY IS COGNITIVE ROUTING
  // --------------------------------------------------------------------------
  if (slide.id === 9) {
    return (
      <StandardSlideFrame
        slide={slide}
        takeawayBox="Act 1 Axiom: Visual hierarchy is cognitive routing. If everything is bold, nothing is bold. If all buttons are colored, no action is clear."
      >
        <div className="space-y-3 text-center flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
            Act 1 Synthesis
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
            Layout is not decoration. Layout is guiding human foveal focus through biological hardware.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 flex-1 items-stretch">
          <div className="p-6 bg-white border border-[#E8E2D9] rounded-2xl shadow-xs flex flex-col justify-between">
            <span className="text-3xl font-serif-display font-bold text-[#E5391C]">01</span>
            <div>
              <h4 className="text-xl font-bold font-serif-display text-[#2D2D2E] mb-2">The 2° Foveal Reality</h4>
              <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                Users scan screens with rapid 230ms saccades. If your primary path does not align with visual flow, information is physically unseen.
              </p>
            </div>
            <div className="text-xs font-mono text-[#E5391C] pt-3 border-t border-[#E8E2D9]">Foveal Alignment</div>
          </div>

          <div className="p-6 bg-white border border-[#E8E2D9] rounded-2xl shadow-xs flex flex-col justify-between">
            <span className="text-3xl font-serif-display font-bold text-[#E5391C]">02</span>
            <div>
              <h4 className="text-xl font-bold font-serif-display text-[#2D2D2E] mb-2">Pre-Attentive Coding</h4>
              <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                Use color hue and size sparingly. A single pop-out attribute routes attention in under 50ms before conscious reading begins.
              </p>
            </div>
            <div className="text-xs font-mono text-[#E5391C] pt-3 border-t border-[#E8E2D9]">Zero Latency Routing</div>
          </div>

          <div className="p-6 bg-white border border-[#E8E2D9] rounded-2xl shadow-xs flex flex-col justify-between">
            <span className="text-3xl font-serif-display font-bold text-[#E5391C]">03</span>
            <div>
              <h4 className="text-xl font-bold font-serif-display text-[#2D2D2E] mb-2">Gestalt Whitespace</h4>
              <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                Whitespace is active architectural syntax. Uniform margins cause proximity ambiguity; intentional grouping eliminates errors.
              </p>
            </div>
            <div className="text-xs font-mono text-[#E5391C] pt-3 border-t border-[#E8E2D9]">Intentional Structure</div>
          </div>
        </div>
      </StandardSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 10: WORKING MEMORY ARCHITECTURE (BADDELEY)
  // --------------------------------------------------------------------------
  if (slide.id === 10) {
    return (
      <StandardSlideFrame
        slide={slide}
        footerHint="Working memory decays in two seconds without active rehearsal. Never force users to remember information across screen transitions."
      >
        <div className="space-y-3 text-center flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
            Working Memory Architecture
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
            Alan Baddeley’s Multicomponent Model: The volatile RAM of human consciousness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 flex-1 items-stretch">
          <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200 uppercase">
                Auditory & Vocal
              </span>
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E] mt-4 mb-2">
                Phonological Loop
              </h3>
              <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                Stores auditory memory traces and inner speech. Decays completely within 1.5 to 2 seconds unless maintained by active silent rehearsal.
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs font-mono text-purple-800">
              Trap: Forcing users to memorize SMS verification codes or account IDs across screens.
            </div>
          </div>

          <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 uppercase">
                Spatial & Imagery
              </span>
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E] mt-4 mb-2">
                Visuospatial Sketchpad
              </h3>
              <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                Holds mental representations of spatial maps, layouts, and geometry. Re-orienting after a layout jump consumes scarce mental cycles.
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs font-mono text-blue-800">
              Trap: Moving navigation buttons to different corners across modal steps.
            </div>
          </div>

          <div className="bg-[#FDF5F2] border-2 border-[#E5391C] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-[#E5391C] bg-white px-3 py-1 rounded-full border border-[#FAD6CF] uppercase">
                Attention Director
              </span>
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E] mt-4 mb-2">
                Central Executive
              </h3>
              <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                Coordinates attention, suppresses distractions, and switches tasks. Completely unable to multitask two simultaneous cognitive loads.
              </p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#FAD6CF] text-xs font-mono text-[#E5391C]">
              Fact: Human multitasking is a myth; it is rapid, costly serial task switching.
            </div>
          </div>
        </div>
      </StandardSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 11: MILLER’S LAW VS COWAN’S MODERN REALITY
  // --------------------------------------------------------------------------
  if (slide.id === 11) {
    return (
      <StandardSlideFrame
        slide={slide}
        footerHint="Design for 3 to 4 items max. If your navigation has 8 flat links, users suffer choice and memory overload."
      >
        <div className="space-y-3 text-center flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
            Miller’s Law vs. Cowan’s Reality
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
            The historic 7±2 myth (1956) confronted by modern neuroscience’s 3–4 working chunk bottleneck (2001).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 flex-1 items-stretch">
          <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D9] mb-4">
                <span className="font-mono text-sm uppercase text-stone-500 font-bold">George Miller (1956)</span>
                <span className="font-mono text-xs bg-stone-100 text-stone-700 px-3 py-1 rounded-full font-bold">The Historical Myth</span>
              </div>
              <h3 className="text-3xl font-bold font-serif-display text-[#2D2D2E] mb-3">
                The Magic Number 7 ± 2
              </h3>
              <p className="text-base text-[#525254] leading-relaxed mb-4">
                Miller tested isolated recall under artificial laboratory conditions with deliberate, focused verbal rehearsal.
              </p>
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-sm text-[#2D2D2E] space-y-2">
                <div>• Often misused by developers to justify 7 to 9 navigation tabs.</div>
                <div>• Assumes zero real-world environmental distraction or anxiety.</div>
                <div>• Fails completely when the user is driving, operating machinery, or multi-tabbing.</div>
              </div>
            </div>
            <div className="p-3 bg-stone-100 text-stone-700 text-xs font-mono rounded-xl mt-4">
              Theoretical Lab Capacity: 5 to 9 Items (Only under ideal rehearsed silence)
            </div>
          </div>

          <div className="bg-[#FDF5F2] border-2 border-[#E5391C] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-[#FAD6CF] mb-4">
                <span className="font-mono text-sm uppercase text-[#E5391C] font-bold">Nelson Cowan (2001)</span>
                <span className="font-mono text-xs bg-white text-[#E5391C] px-3 py-1 rounded-full border border-[#FAD6CF] font-bold">Empirical Reality</span>
              </div>
              <h3 className="text-3xl font-bold font-serif-display text-[#2D2D2E] mb-3">
                The Strict 3 to 4 Chunk Limit
              </h3>
              <p className="text-base text-[#525254] leading-relaxed mb-4">
                When verbal rehearsal is blocked and real-world distraction exists, human working memory holds strictly 3 to 4 chunks.
              </p>
              <div className="p-4 bg-white rounded-xl border border-[#FAD6CF] text-sm text-[#2D2D2E] space-y-2">
                <div>• A "chunk" is a meaningful macro-token (e.g. area code, acronym, word).</div>
                <div>• Unformatted 16-digit credit cards overload working memory instantly.</div>
                <div>• Chunking 16 digits into 4 groups of 4 transforms 16 items into 4 manageable chunks.</div>
              </div>
            </div>
            <div className="p-3 bg-white text-[#E5391C] text-xs font-mono font-bold rounded-xl border border-[#FAD6CF] mt-4">
              Real-World Engineering Standard: Never exceed 4 active items per decision screen.
            </div>
          </div>
        </div>
      </StandardSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 12: SWELLER’S COGNITIVE LOAD THEORY
  // --------------------------------------------------------------------------
  if (slide.id === 12) {
    const totalLoad = slide12Intrinsic + slide12Extraneous;
    const isOverloaded = totalLoad > 100;

    return (
      <StandardSlideFrame
        slide={slide}
        footerHint="Total Cognitive Load = Intrinsic + Germane + Extraneous. If Total > 100%, cognitive failure occurs."
      >
        <div className="space-y-3 text-center flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
            Cognitive Load Theory
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
            John Sweller (1988): Eliminating Extraneous Waste so 100% of brainpower serves user goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 flex-1 items-stretch">
          <div className="lg:col-span-7 bg-white border border-[#E8E2D9] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl">
                <div className="flex justify-between items-center mb-1">
                  <strong className="text-blue-900 font-serif-display text-lg">1. Intrinsic Cognitive Load</strong>
                  <span className="font-mono text-xs font-bold text-blue-700">Task Inherent</span>
                </div>
                <p className="text-sm text-[#525254]">
                  The unavoidable mental effort of solving the actual domain problem (e.g. diagnosing soil pH, configuring multi-crop irrigation thresholds).
                </p>
              </div>

              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                <div className="flex justify-between items-center mb-1">
                  <strong className="text-emerald-900 font-serif-display text-lg">2. Germane Cognitive Load</strong>
                  <span className="font-mono text-xs font-bold text-emerald-700">Schema Construction</span>
                </div>
                <p className="text-sm text-[#525254]">
                  Mental work dedicated to learning, integrating new patterns, and developing expert mental models.
                </p>
              </div>

              <div className="p-4 bg-red-50/70 border border-red-200 rounded-xl">
                <div className="flex justify-between items-center mb-1">
                  <strong className="text-red-900 font-serif-display text-lg">3. Extraneous Cognitive Load</strong>
                  <span className="font-mono text-xs font-bold text-red-700">Mental Waste (Bad UI)</span>
                </div>
                <p className="text-sm text-[#525254]">
                  Cognitive energy wasted figuring out how the interface works, deciphering cryptic icons, hunting for buttons, and re-reading confusing text.
                </p>
              </div>
            </div>

            <div className="p-3 bg-stone-100 rounded-xl border border-stone-200 text-xs font-mono text-stone-700">
              <strong>HCI Objective:</strong> Drive Extraneous Load to ZERO so the user never spends brain cycles on the UI itself.
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#FDF5F2] border-2 border-[#E5391C] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#E5391C] font-bold block mb-2">
                Interactive Load Simulator
              </span>
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E] mb-3">
                The User’s Mental Capacity
              </h3>

              <div className="space-y-4 my-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span>Task Complexity (Intrinsic):</span>
                    <span className="font-bold">{slide12Intrinsic}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    value={slide12Intrinsic}
                    onChange={(e) => setSlide12Intrinsic(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span>UI Friction (Extraneous Waste):</span>
                    <span className="font-bold text-red-600">{slide12Extraneous}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="80"
                    value={slide12Extraneous}
                    onChange={(e) => setSlide12Extraneous(Number(e.target.value))}
                    className="w-full accent-red-600 cursor-pointer"
                  />
                </div>
              </div>

              <div className="mt-4 p-4 bg-white rounded-xl border border-stone-300">
                <div className="flex justify-between text-sm font-mono mb-2">
                  <span className="font-bold">Total Mental Load:</span>
                  <span className={`font-bold ${isOverloaded ? 'text-red-600' : 'text-emerald-700'}`}>
                    {totalLoad}% / 100%
                  </span>
                </div>
                <div className="w-full h-4 bg-stone-100 rounded-full overflow-hidden flex border border-stone-300">
                  <div style={{ width: `${Math.min(slide12Intrinsic, 100)}%` }} className="bg-blue-600 h-full" />
                  <div style={{ width: `${Math.min(slide12Extraneous, 100 - slide12Intrinsic)}%` }} className="bg-red-500 h-full" />
                </div>
              </div>
            </div>

            <div
              className={`p-3 rounded-xl border text-xs font-mono font-bold mt-4 ${
                isOverloaded
                  ? 'bg-red-100 border-red-300 text-red-900'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-900'
              }`}
            >
              {isOverloaded
                ? '⚠ OVERLOAD CRASH: The user’s working memory is saturated. Errors and task abandonment guaranteed!'
                : '✓ SUSTAINABLE: Mental capacity is within comfortable human operational thresholds.'}
            </div>
          </div>
        </div>
      </StandardSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 13: RECOGNITION OVER RECALL (NIELSEN HEURISTIC #6)
  // --------------------------------------------------------------------------
  if (slide.id === 13) {
    return (
      <StandardSlideFrame
        slide={slide}
        footerHint="Jakob Nielsen: Heuristic #6 — Recognition rather than recall. Never make users remember what the computer can display."
      >
        <div className="space-y-3 text-center flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
            Recognition over Recall
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
            Why remembering nothing is the ultimate scientific benchmark of an ergonomic interface.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 flex-1 items-stretch">
          <div className="bg-white border-2 border-stone-300 p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-stone-200 mb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-stone-600 font-bold">Active Cognitive Retrieval</span>
                <span className="font-mono text-xs bg-red-50 text-red-700 px-3 py-1 rounded-full font-bold">High Mental Effort</span>
              </div>
              <h3 className="text-3xl font-bold font-serif-display text-[#2D2D2E] mb-3">Recall</h3>
              <p className="text-base text-[#525254] leading-relaxed mb-4">
                Demands retrieving facts, codes, or syntax directly from biological long-term memory with minimal or zero perceptual cues.
              </p>
              <div className="p-4 bg-[#FAF9F6] rounded-xl border border-stone-200 text-sm text-[#2D2D2E] space-y-2">
                <div>• Command Line Interface (CLI): typing <code className="text-xs bg-stone-200 px-1 py-0.5 rounded">tar -czvf</code> from pure memory.</div>
                <div>• An empty form input asking for "Account Routing Number".</div>
                <div>• Searching with zero autocomplete suggestions or recent history.</div>
              </div>
            </div>
            <div className="p-3 bg-red-50 text-red-800 text-xs font-mono font-bold rounded-xl border border-red-200 mt-4">
              Result: High cognitive fatigue, severe error rates, high drop-off.
            </div>
          </div>

          <div className="bg-[#FDF5F2] border-2 border-[#E5391C] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-[#FAD6CF] mb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[#E5391C] font-bold">Perceptual Cue Matching</span>
                <span className="font-mono text-xs bg-white text-emerald-700 px-3 py-1 rounded-full border border-emerald-300 font-bold">Effortless & Instant</span>
              </div>
              <h3 className="text-3xl font-bold font-serif-display text-[#2D2D2E] mb-3">Recognition</h3>
              <p className="text-base text-[#525254] leading-relaxed mb-4">
                Presents sensory clues that immediately trigger existing neural memory schemas without requiring retrieval effort.
              </p>
              <div className="p-4 bg-white rounded-xl border border-[#FAD6CF] text-sm text-[#2D2D2E] space-y-2">
                <div>• Graphical Menus & Visual Icons: seeing a folder icon and recognizing its role.</div>
                <div>• Autocomplete Search: typing "cas" and recognizing "Casablanca Voyageurs".</div>
                <div>• Visual selectors: selecting train coach seats from an interactive coach map.</div>
              </div>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-mono font-bold rounded-xl border border-emerald-200 mt-4">
              Result: Zero retrieval strain, instantaneous confirmation, near-zero errors.
            </div>
          </div>
        </div>
      </StandardSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 14: LIVE EXPERIMENT — MEMORY CHUNKING TEST (EXP2)
  // --------------------------------------------------------------------------
  if (slide.id === 14) {
    return (
      <ExperimentSlideFrame slide={slide}>
        <MemoryChunkingExperiment />
      </ExperimentSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 15: CHANGE BLINDNESS & INATTENTION
  // --------------------------------------------------------------------------
  if (slide.id === 15) {
    return (
      <StandardSlideFrame
        slide={slide}
        footerHint="Simons & Chabris (1999): The Invisible Gorilla. If changes occur without motion transients, users miss them."
      >
        <div className="space-y-3 text-center flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
            Change Blindness & Inattention
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
            Why large, obvious changes on a screen are completely invisible to the human visual cortex.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 flex-1 items-stretch">
          <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E]">
                The Biological Blindspot
              </h3>
              <p className="text-base text-[#525254] leading-relaxed">
                When attention is focused on a demanding task (like typing an account number), the visual cortex suppresses peripheral processing.
              </p>
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3 text-sm text-[#2D2D2E]">
                <div>
                  <strong>Saccadic Suppression:</strong> During eye jumps (~30ms), vision is literally shut down by the brain to prevent blur.
                </div>
                <div>
                  <strong>Transient Disruption:</strong> A page reload or modal blink destroys the motion signal that normally triggers visual orientation.
                </div>
              </div>
            </div>
            <div className="p-3 bg-red-50 text-red-800 text-xs font-mono font-bold rounded-xl border border-red-200">
              Trap: Updating an alert box at the top of the screen during a form submission reload.
            </div>
          </div>

          <div className="bg-[#FDF5F2] border-2 border-[#E5391C] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E]">
                Ergonomic Software Countermeasures
              </h3>
              <p className="text-base text-[#525254] leading-relaxed">
                To guarantee that a critical state change is perceived, software must provide deliberate perceptual transients:
              </p>
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-white rounded-xl border border-[#FAD6CF]">
                  <strong className="text-[#E5391C] block mb-1">1. Motion Transients</strong>
                  <span>Smooth slide-ins, toast animations, or subtle pulse effects trigger the peripheral motion sensor.</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#FAD6CF]">
                  <strong className="text-[#E5391C] block mb-1">2. Focal Proximity</strong>
                  <span>Render the feedback within 1° of the cursor or active input box, not 500px away in the header.</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#FAD6CF]">
                  <strong className="text-[#E5391C] block mb-1">3. Audible & Assistive Announcements</strong>
                  <span>Use sound confirmation and ARIA live regions for high-stakes medical or financial confirmations.</span>
                </div>
              </div>
            </div>
            <div className="p-3 bg-white text-[#E5391C] text-xs font-mono font-bold rounded-xl border border-[#FAD6CF]">
              Rule: If it didn’t trigger a perceptual transient, in the user’s universe, it never happened.
            </div>
          </div>
        </div>
      </StandardSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 16: ACT 2 TAKEAWAY: CONSERVE THE USER’S SCARCE RAM
  // --------------------------------------------------------------------------
  if (slide.id === 16) {
    return (
      <StandardSlideFrame
        slide={slide}
        takeawayBox="Act 2 Axiom: The human user has 4 volatile RAM slots. Use 1 for their goal, 1 for their current action, and leave 2 as buffer for their life."
      >
        <div className="space-y-3 text-center flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
            Act 2 Synthesis
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
            Working memory is the narrowest funnel in software engineering. Protect it ruthlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 flex-1 items-stretch">
          <div className="p-6 bg-white border border-[#E8E2D9] rounded-2xl shadow-xs flex flex-col justify-between">
            <span className="text-3xl font-serif-display font-bold text-[#E5391C]">01</span>
            <div>
              <h4 className="text-xl font-bold font-serif-display text-[#2D2D2E] mb-2">Chunk Everything</h4>
              <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                Raw data strings paralyze working memory. Formats like telephone numbers, credit cards, and parcel codes must be visually partitioned into 3–4 chunks.
              </p>
            </div>
            <div className="text-xs font-mono text-[#E5391C] pt-3 border-t border-[#E8E2D9]">Chunking Discipline</div>
          </div>

          <div className="p-6 bg-white border border-[#E8E2D9] rounded-2xl shadow-xs flex flex-col justify-between">
            <span className="text-3xl font-serif-display font-bold text-[#E5391C]">02</span>
            <div>
              <h4 className="text-xl font-bold font-serif-display text-[#2D2D2E] mb-2">Zero Extraneous Load</h4>
              <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                Every obscure icon, ambiguous label, or multi-step modal burns scarce cognitive power that the user needed to solve their actual work.
              </p>
            </div>
            <div className="text-xs font-mono text-[#E5391C] pt-3 border-t border-[#E8E2D9]">Extraneous Elimination</div>
          </div>

          <div className="p-6 bg-white border border-[#E8E2D9] rounded-2xl shadow-xs flex flex-col justify-between">
            <span className="text-3xl font-serif-display font-bold text-[#E5391C]">03</span>
            <div>
              <h4 className="text-xl font-bold font-serif-display text-[#2D2D2E] mb-2">Recognition by Default</h4>
              <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                If the computer knows it, display it. Provide intelligent autocomplete, recent history, and visual options. Never test the user’s memory.
              </p>
            </div>
            <div className="text-xs font-mono text-[#E5391C] pt-3 border-t border-[#E8E2D9]">Recognition Supremacy</div>
          </div>
        </div>
      </StandardSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 17: FITTS’S LAW: THE PHYSICS OF POINTING
  // --------------------------------------------------------------------------
  if (slide.id === 17) {
    return (
      <StandardSlideFrame
        slide={slide}
        footerHint="Paul Fitts (1954): Movement Time (MT) is a logarithmic function of distance and target width."
      >
        <div className="space-y-3 text-center flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
            Fitts’s Law: The Physics of Pointing
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
            Paul Fitts (1954): Moving a hand, cursor, or finger is governed by physical information channels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 flex-1 items-stretch">
          <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E]">
                The Physical Core Principle
              </h3>
              <p className="text-base text-[#525254] leading-relaxed">
                Target acquisition consists of two distinct motor phases:
              </p>
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <strong className="text-stone-900 block mb-1">Phase 1: Ballistic Motion (~80% of Distance)</strong>
                  <span>Fast, open-loop muscle acceleration toward the rough coordinates of the target.</span>
                </div>
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <strong className="text-stone-900 block mb-1">Phase 2: Fine Corrective Deceleration (~20% of Distance)</strong>
                  <span>Closed-loop visual feedback cycles (τm ≈ 70ms) to decelerate and prevent overshoot.</span>
                </div>
              </div>
              <p className="text-sm text-[#525254]">
                If a button is tiny, the corrective deceleration phase consumes exponential time as the hand trembles to avoid missing.
              </p>
            </div>
            <div className="p-3 bg-stone-100 rounded-xl font-mono text-xs text-stone-700">
              Fundamental takeaway: Distance penalizes speed linearly; small size penalizes speed exponentially.
            </div>
          </div>

          <div className="bg-[#FDF5F2] border-2 border-[#E5391C] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E5391C] font-bold block mb-1">
                Everyday Design Implications
              </span>
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E]">
                The Rules of Motor Physics
              </h3>
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 bg-white rounded-xl border border-[#FAD6CF]">
                  <strong className="text-[#E5391C] block mb-1">Rule 1: Big & Close for Frequent Actions</strong>
                  <span>Primary actions (like "Book Ticket" or "Confirm Payment") must be massive and located near the resting thumb or pointer.</span>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-[#FAD6CF]">
                  <strong className="text-[#E5391C] block mb-1">Rule 2: Small & Far for Dangerous Actions</strong>
                  <span>Destructive actions ("Delete Database", "Format Drive") must deliberately have high Index of Difficulty to prevent motor accidents.</span>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-[#FAD6CF]">
                  <strong className="text-[#E5391C] block mb-1">Rule 3: Enlarge the Click Target, Not the Graphic</strong>
                  <span>Add generous CSS padding to checkboxes and tiny icons: visual icon = 16px; clickable touch target = 48px.</span>
                </div>
              </div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#FAD6CF] font-mono text-xs text-[#E5391C] font-bold">
              Engineering Standard: Minimum touch target size on mobile glass is strictly 48 × 48 px.
            </div>
          </div>
        </div>
      </StandardSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 18: THE MATHEMATICS OF FITTS’S LAW
  // --------------------------------------------------------------------------
  if (slide.id === 18) {
    return (
      <StandardSlideFrame
        slide={slide}
        footerHint="MacKenzie (1992): Index of Difficulty ID = log₂(2D/W) in bits. Movement Time MT = a + b · ID."
      >
        <div className="space-y-3 text-center flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
            The Math of Fitts’s Law
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
            MT = a + b · log₂(2D / W) — The Shannon formulation of motor information capacity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 flex-1 items-stretch">
          <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase text-blue-700 font-bold bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Formula Variable 1
              </span>
              <h3 className="text-3xl font-bold font-serif-display text-[#2D2D2E] mt-4 mb-2">Distance (D)</h3>
              <p className="text-base text-[#525254] leading-relaxed">
                The Euclidean distance from the starting position of the cursor or finger to the center of the target.
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs font-mono text-blue-900">
              Proximity insight: Contextual right-click menus place D = 0 px, achieving near-zero acquisition time.
            </div>
          </div>

          <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase text-purple-700 font-bold bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                Formula Variable 2
              </span>
              <h3 className="text-3xl font-bold font-serif-display text-[#2D2D2E] mt-4 mb-2">Width (W)</h3>
              <p className="text-base text-[#525254] leading-relaxed">
                The size of the target measured along the axis of motion. If moving horizontally, it is the width; if moving vertically, the height.
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs font-mono text-purple-900">
              Width insight: Halving target width adds an entire bit to the difficulty, adding ~150ms of physical deceleration.
            </div>
          </div>

          <div className="bg-[#FDF5F2] border-2 border-[#E5391C] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase text-[#E5391C] font-bold bg-white px-3 py-1 rounded-full border border-[#FAD6CF]">
                Calculated Metric
              </span>
              <h3 className="text-3xl font-bold font-serif-display text-[#2D2D2E] mt-4 mb-2">ID (Bits)</h3>
              <p className="text-base text-[#525254] leading-relaxed">
                <strong>Index of Difficulty:</strong> ID = log₂(2D / W). Measured in bits of information processed by the motor cortex.
              </p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#FAD6CF] text-xs font-mono text-[#E5391C] font-bold">
              Throughput (TP = ID / MT): Typical human mouse throughput is ~4.5 bits/sec; mobile thumb is ~3.2 bits/sec.
            </div>
          </div>
        </div>
      </StandardSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 19: THE MAGIC OF INFINITE EDGES & CORNERS
  // --------------------------------------------------------------------------
  if (slide.id === 19) {
    return (
      <StandardSlideFrame
        slide={slide}
        footerHint="Screen borders provide physical bounding stops: W = ∞. On mobile touchscreens, edges become reach penalties."
      >
        <div className="space-y-3 text-center flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
            The Magic of Infinite Edges
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
            Why the edges and corners of a desktop monitor have a target width (W) of infinity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 flex-1 items-stretch">
          <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <span className="font-mono text-xs font-bold text-stone-500 uppercase">The Physics of Display Boundaries</span>
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E]">
                Why You Cannot Overshoot the Edge
              </h3>
              <p className="text-base text-[#525254] leading-relaxed">
                On desktop OSs, the mouse cursor cannot travel beyond the physical pixels of the display.
              </p>
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-sm text-[#2D2D2E] space-y-2 font-mono">
                <div>• Slam the mouse upward with infinite force: it stops dead at pixel Y = 0.</div>
                <div>• Therefore, the target height W at the screen edge is effectively INFINITE!</div>
                <div>• Since log₂(2D / ∞) approaches 0, the Index of Difficulty drops to near zero!</div>
              </div>
            </div>
            <div className="p-3 bg-stone-100 rounded-xl font-mono text-xs text-stone-700">
              macOS Menubar: Pinned to the top edge so users never need fine motor deceleration.
            </div>
          </div>

          <div className="bg-[#FDF5F2] border-2 border-[#E5391C] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <span className="font-mono text-xs font-bold text-[#E5391C] uppercase">Mobile Touchscreen Inversion</span>
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E]">
                The Mobile Thumb Zone Paradox
              </h3>
              <p className="text-base text-[#525254] leading-relaxed">
                On mobile smartphones, the physical physics completely reverses:
              </p>
              <div className="p-4 bg-white rounded-xl border border-[#FAD6CF] text-sm text-[#2D2D2E] space-y-2 font-mono">
                <div>• Glass edges provide NO physical stopping wall for fingers.</div>
                <div>• The top edge is out of reach for single-handed thumb operation.</div>
                <div>• Mobile bottom bars and floating FABs become the high-speed ergonomic sweet spot.</div>
              </div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#FAD6CF] font-mono text-xs text-[#E5391C] font-bold">
              Mobile Axiom: Move primary action buttons to the bottom third of the screen within thumb arc.
            </div>
          </div>
        </div>
      </StandardSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 20: LIVE EXPERIMENT — FITTS’S LAW TARGETING TEST (EXP3)
  // --------------------------------------------------------------------------
  if (slide.id === 20) {
    return (
      <ExperimentSlideFrame slide={slide}>
        <FittsLawExperiment />
      </ExperimentSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 21: HICK’S LAW: DECISION TIME & ENTROPY
  // --------------------------------------------------------------------------
  if (slide.id === 21) {
    return (
      <StandardSlideFrame
        slide={slide}
        footerHint="William Hick (1952) & Ray Hyman (1953): Choice reaction time increases logarithmically with the number of options."
      >
        <div className="space-y-3 text-center flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
            Hick’s Law: Decision Latency
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
            Fitts’s Law told us how long it takes to point; Hick’s Law tells us how long it takes to decide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 flex-1 items-stretch">
          <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase text-stone-500 font-bold">Information Theory Roots</span>
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E]">
                Claude Shannon’s Entropy in the Mind
              </h3>
              <p className="text-base text-[#525254] leading-relaxed">
                When presented with n equiprobable options, the brain must resolve log₂(n) bits of uncertainty before commanding motor output.
              </p>
              <div className="space-y-2 font-mono text-xs text-[#2D2D2E] bg-stone-50 p-4 rounded-xl border border-stone-200">
                <div>• 2 choices = 1 bit of entropy (~180ms decision latency)</div>
                <div>• 4 choices = 2 bits of entropy (~360ms decision latency)</div>
                <div>• 8 choices = 3 bits of entropy (~540ms decision latency)</div>
                <div>• 16 choices = 4 bits of entropy (~720ms decision latency)</div>
              </div>
            </div>
            <div className="p-3 bg-stone-100 rounded-xl font-mono text-xs text-stone-700">
              Crucial takeaway: Doubling choices adds a constant time penalty, NOT a linear multiplication.
            </div>
          </div>

          <div className="bg-[#FDF5F2] border-2 border-[#E5391C] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase text-[#E5391C] font-bold">The Breakdown Exception</span>
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E]">
                When Hick’s Law Breaks Down
              </h3>
              <p className="text-base text-[#525254] leading-relaxed">
                Hick’s logarithmic formula holds ONLY when options are structured, categorized, or sorted so the brain can execute binary elimination.
              </p>
              <div className="space-y-2 font-mono text-xs text-[#2D2D2E] bg-white p-4 rounded-xl border border-[#FAD6CF]">
                <div className="text-red-600 font-bold">✖ Unordered Random Lists:</div>
                <div>Forces linear scanning: Time = O(n). 50 random items will cause total freeze!</div>
                <div className="text-emerald-700 font-bold mt-2">✓ Alphabetical or Logical Grouping:</div>
                <div>Maintains logarithmic binary search: Time = O(log n).</div>
              </div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#FAD6CF] font-mono text-xs text-[#E5391C] font-bold">
              Engineering Rule: Always order and categorize menus to preserve logarithmic decision speed.
            </div>
          </div>
        </div>
      </StandardSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 22: THE MATHEMATICS OF HICK’S LAW
  // --------------------------------------------------------------------------
  if (slide.id === 22) {
    return (
      <StandardSlideFrame
        slide={slide}
        footerHint="RT = a + b · log₂(n + 1). Where a = simple reaction time (~200ms), b = cognitive processing rate (~150ms/bit)."
      >
        <div className="space-y-3 text-center flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
            The Math of Hick’s Law
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
            RT = a + b · log₂(n + 1) — Quantifying the cognitive cost of choice complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 flex-1 items-stretch">
          <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase text-blue-700 font-bold bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Baseline (a)
              </span>
              <h3 className="text-3xl font-bold font-serif-display text-[#2D2D2E] mt-4 mb-2">Simple RT (~200ms)</h3>
              <p className="text-base text-[#525254] leading-relaxed">
                The irreducible minimum time required to detect a stimulus and initiate motor action when only 1 choice exists.
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs font-mono text-blue-900">
              Corresponds to τp + τc + τm in the Model Human Processor.
            </div>
          </div>

          <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase text-purple-700 font-bold bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                Processing Slope (b)
              </span>
              <h3 className="text-3xl font-bold font-serif-display text-[#2D2D2E] mt-4 mb-2">Entropy Cost (~150ms/bit)</h3>
              <p className="text-base text-[#525254] leading-relaxed">
                The slope representing how fast the user’s cortical neurons process each additional bit of uncertainty.
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs font-mono text-purple-900">
              Increases sharply when options use jargon or ambiguous icons.
            </div>
          </div>

          <div className="bg-[#FDF5F2] border-2 border-[#E5391C] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase text-[#E5391C] font-bold bg-white px-3 py-1 rounded-full border border-[#FAD6CF]">
                Choice Count (n + 1)
              </span>
              <h3 className="text-3xl font-bold font-serif-display text-[#2D2D2E] mt-4 mb-2">Alternatives</h3>
              <p className="text-base text-[#525254] leading-relaxed">
                The number of alternatives. The "+1" models the uncertainty where the user chooses to take no action at all.
              </p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#FAD6CF] text-xs font-mono text-[#E5391C] font-bold">
              Design Solution: Progressive disclosure keeps n small at each step.
            </div>
          </div>
        </div>
      </StandardSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 23: LIVE EXPERIMENT — HICK’S LAW DECISION ARENA (EXP4)
  // --------------------------------------------------------------------------
  if (slide.id === 23) {
    return (
      <ExperimentSlideFrame slide={slide}>
        <HicksLawExperiment />
      </ExperimentSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 24: ACT 3 TAKEAWAY: CALCULATE PHYSICS BEFORE DRAWING PIXELS
  // --------------------------------------------------------------------------
  if (slide.id === 24) {
    return (
      <StandardSlideFrame
        slide={slide}
        takeawayBox="Act 3 Axiom: Physics dictates ergonomics. Fitts’s and Hick’s laws allow you to mathematically calculate task duration before writing a single line of CSS."
      >
        <div className="space-y-3 text-center flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
            Act 3 Synthesis
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
            Stop arguing subjective aesthetic opinions: calculate Index of Difficulty and decision bits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 flex-1 items-stretch">
          <div className="p-6 bg-white border border-[#E8E2D9] rounded-2xl shadow-xs flex flex-col justify-between">
            <span className="text-3xl font-serif-display font-bold text-[#E5391C]">01</span>
            <div>
              <h4 className="text-xl font-bold font-serif-display text-[#2D2D2E] mb-2">Fitts: Size & Distance</h4>
              <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                Do not make users hunt for small buttons. Primary CTAs must be wide and close. Destructive actions must be placed far away.
              </p>
            </div>
            <div className="text-xs font-mono text-[#E5391C] pt-3 border-t border-[#E8E2D9]">Motor Efficiency</div>
          </div>

          <div className="p-6 bg-white border border-[#E8E2D9] rounded-2xl shadow-xs flex flex-col justify-between">
            <span className="text-3xl font-serif-display font-bold text-[#E5391C]">02</span>
            <div>
              <h4 className="text-xl font-bold font-serif-display text-[#2D2D2E] mb-2">Hick: Choice Entropy</h4>
              <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                Keep the initial choice branch shallow (2 to 4 options). Use progressive disclosure to reveal secondary decisions on demand.
              </p>
            </div>
            <div className="text-xs font-mono text-[#E5391C] pt-3 border-t border-[#E8E2D9]">Entropy Minimization</div>
          </div>

          <div className="p-6 bg-white border border-[#E8E2D9] rounded-2xl shadow-xs flex flex-col justify-between">
            <span className="text-3xl font-serif-display font-bold text-[#E5391C]">03</span>
            <div>
              <h4 className="text-xl font-bold font-serif-display text-[#2D2D2E] mb-2">Mathematical Prediction</h4>
              <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                A good HCI engineer can benchmark two competing wireframes with Fitts’s and Hick’s formulas and prove which will be faster.
              </p>
            </div>
            <div className="text-xs font-mono text-[#E5391C] pt-3 border-t border-[#E8E2D9]">Predictive Engineering</div>
          </div>
        </div>
      </StandardSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 25: DON NORMAN’S THREE-PART MENTAL MODEL TRIAD
  // --------------------------------------------------------------------------
  if (slide.id === 25) {
    return (
      <StandardSlideFrame
        slide={slide}
        footerHint="Don Norman: The Design of Everyday Things. Designer Model · System Image · User Mental Model."
      >
        <div className="space-y-3 text-center flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
            The Mental Model Triad
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
            Don Norman: Why the System Image is the ONLY channel through which users understand software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 flex-1 items-stretch">
          <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase text-blue-700 font-bold bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Engineering Model
              </span>
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E] mt-4 mb-2">
                The Designer’s Model
              </h3>
              <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                How the engineer and software architect understand the system: database foreign keys, asynchronous cron jobs, API microservices.
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs font-mono text-blue-900">
              The Reality: Complete, technical, but invisible to the end user.
            </div>
          </div>

          <div className="bg-[#FDF5F2] border-2 border-[#E5391C] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase text-[#E5391C] font-bold bg-white px-3 py-1 rounded-full border border-[#FAD6CF]">
                The Sole Bridge
              </span>
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E] mt-4 mb-2">
                The System Image
              </h3>
              <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                The physical pixels, buttons, affordances, signifiers, error dialogues, and documentation that the user can actually see and interact with.
              </p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#FAD6CF] text-xs font-mono text-[#E5391C] font-bold">
              The Critical Law: The user NEVER sees the Designer Model; they only see the System Image!
            </div>
          </div>

          <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase text-purple-700 font-bold bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                Constructed Belief
              </span>
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E] mt-4 mb-2">
                The User’s Model
              </h3>
              <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                The mental simulation the human invents to explain what the machine is doing. If the System Image is flawed, their model is completely wrong.
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs font-mono text-purple-900">
              The Consequence: Catastrophic data loss, superstition, and user self-blame.
            </div>
          </div>
        </div>
      </StandardSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 26: THE THERMOSTAT FALLACY (KEMPTON, 1986)
  // --------------------------------------------------------------------------
  if (slide.id === 26) {
    return (
      <StandardSlideFrame
        slide={slide}
        footerHint="Willett Kempton (1986): Feedback Theory vs Valve Theory in everyday thermostat usage."
      >
        <div className="space-y-3 text-center flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
            The Thermostat Paradox
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
            Willett Kempton (1986): How a simple physical dial leads 50% of humans to believe a dangerous falsehood.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 flex-1 items-stretch">
          <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <span className="font-mono text-xs font-bold text-emerald-700 uppercase">Actual Engineering Reality</span>
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E]">
                The Feedback Model (Threshold)
              </h3>
              <p className="text-base text-[#525254] leading-relaxed">
                The furnace is a binary on/off switch governed by a bimetallic thermometer sensor.
              </p>
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2 text-sm text-[#2D2D2E] font-mono">
                <div>• Set to 22°C: Furnace pumps heat at 100% full capacity until 22°C.</div>
                <div>• Set to 30°C: Furnace pumps heat at the EXACT SAME 100% rate!</div>
                <div>• Cranking the dial higher does NOT heat the room one second faster.</div>
              </div>
            </div>
            <div className="p-3 bg-emerald-100 rounded-xl font-mono text-xs text-emerald-800">
              Reality: A threshold sensor, not an accelerator pedal.
            </div>
          </div>

          <div className="bg-[#FDF5F2] border-2 border-[#E5391C] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <span className="font-mono text-xs font-bold text-[#E5391C] uppercase">User Mental Model Illusion</span>
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E]">
                The Valve Model (Accelerator)
              </h3>
              <p className="text-base text-[#525254] leading-relaxed">
                Because the UI is a rotating dial (identical to a gas pedal or water faucet), users invent a false mental model:
              </p>
              <div className="p-4 bg-white rounded-xl border border-[#FAD6CF] space-y-2 text-sm text-[#2D2D2E] font-mono">
                <div>• "If I turn it all the way to max, it will blast heat twice as fast."</div>
                <div>• The room overshoots to 28°C; users open windows to cool down.</div>
                <div>• Massive energy waste and broken comfort solely because of a misleading dial!</div>
              </div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#FAD6CF] font-mono text-xs text-[#E5391C] font-bold">
              Lesson: The physical signifier (a continuous dial) communicated a valve, not a threshold.
            </div>
          </div>
        </div>
      </StandardSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 27: SKEUOMORPHISM VS FLAT DESIGN VS NEUMORPHISM
  // --------------------------------------------------------------------------
  if (slide.id === 27) {
    return (
      <StandardSlideFrame
        slide={slide}
        footerHint="Skeuomorphism provided physical training wheels; Flat design stripped too many signifiers; Modern design restores clarity."
      >
        <div className="space-y-3 text-center flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
            The Signifier Pendulum
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
            From skeuomorphic training wheels to hyper-flat confusion and modern semantic depth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 flex-1 items-stretch">
          <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-bold text-amber-700 uppercase bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                1984 – 2012
              </span>
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E] mt-4 mb-2">
                Skeuomorphism
              </h3>
              <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                Imitating physical textures: leather stitching, wood grain, glossy glass, and physical calculator plastic.
              </p>
              <div className="mt-4 p-3 bg-amber-50 rounded-xl text-xs font-mono text-amber-900 border border-amber-200">
                Purpose: Provided rich signifiers to teach novices who had never touched digital computers.
              </div>
            </div>
            <div className="text-xs font-mono text-stone-500 pt-3 border-t border-[#E8E2D9]">Apple iOS 1–6 era</div>
          </div>

          <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-bold text-blue-700 uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                2013 – 2019
              </span>
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E] mt-4 mb-2">
                Flat Design
              </h3>
              <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                Stripped all drop shadows, bevels, and gradients. Created clean minimalism, but introduced severe usability regressions.
              </p>
              <div className="mt-4 p-3 bg-blue-50 rounded-xl text-xs font-mono text-blue-900 border border-blue-200">
                Flaw: Users could not tell what was clickable text vs static labels (signifiers removed!).
              </div>
            </div>
            <div className="text-xs font-mono text-stone-500 pt-3 border-t border-[#E8E2D9]">Windows 8 & iOS 7 era</div>
          </div>

          <div className="bg-[#FDF5F2] border-2 border-[#E5391C] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-bold text-[#E5391C] uppercase bg-white px-3 py-1 rounded-full border border-[#FAD6CF]">
                2020 – Present
              </span>
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E] mt-4 mb-2">
                Intentional Depth
              </h3>
              <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                Modern clean layouts combined with purposeful micro-elevations, subtle borders, and clear state transitions.
              </p>
              <div className="mt-4 p-3 bg-white rounded-xl text-xs font-mono text-[#E5391C] border border-[#FAD6CF]">
                Gold Standard: Clean typography + unambiguous clickability cues.
              </div>
            </div>
            <div className="text-xs font-mono text-[#E5391C] font-bold pt-3 border-t border-[#FAD6CF]">Modern Ergonomics</div>
          </div>
        </div>
      </StandardSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 28: CONCEPTUAL METAPHORS: DESKTOP, SHOPPING CART & BEYOND
  // --------------------------------------------------------------------------
  if (slide.id === 28) {
    return (
      <StandardSlideFrame
        slide={slide}
        footerHint="Lakoff & Johnson (1980): Metaphors We Live By. Metaphors are scaffolding, not prison cells."
      >
        <div className="space-y-3 text-center flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
            Conceptual Metaphors
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
            Anchoring digital abstractions to pre-existing real-world schemas accelerates user onboarding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 flex-1 items-stretch">
          <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <span className="font-mono text-xs font-bold text-stone-500 uppercase">Classic Paradigms</span>
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E]">
                The Triumphs of Metaphor
              </h3>
              <div className="space-y-3 font-mono text-xs text-[#2D2D2E]">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <strong className="text-stone-900 block mb-1">The Desktop Metaphor (Xerox PARC 1970s)</strong>
                  <span>Files, folders, trash cans, desktops allowed office clerks to understand volatile disk memory instantly.</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <strong className="text-stone-900 block mb-1">The Shopping Cart (Amazon late 1990s)</strong>
                  <span>Browsing shelves, putting items into a basket, proceeding to a checkout counter mapped physical retail to the web.</span>
                </div>
              </div>
            </div>
            <div className="p-3 bg-stone-100 rounded-xl font-mono text-xs text-stone-700">
              Power: Bypasses the need to read a 100-page manual.
            </div>
          </div>

          <div className="bg-[#FDF5F2] border-2 border-[#E5391C] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <span className="font-mono text-xs font-bold text-[#E5391C] uppercase">The Architectural Danger</span>
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E]">
                When Metaphors Become Traps
              </h3>
              <p className="text-base text-[#525254] leading-relaxed">
                Software has superpowers that physical objects do not have: instant global search, infinite undo, non-linear copying.
              </p>
              <div className="p-4 bg-white rounded-xl border border-[#FAD6CF] font-mono text-xs space-y-2 text-[#2D2D2E]">
                <div className="text-[#E5391C] font-bold">The Eject Floppy Trap:</div>
                <div>In early Mac OS, dragging a floppy disk icon to the Trash can ejected the disk. Users panicked, believing it would delete their work!</div>
              </div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#FAD6CF] font-mono text-xs text-[#E5391C] font-bold">
              Engineering Rule: Use metaphors for day-1 orientation, but never constrain software to physical limitations.
            </div>
          </div>
        </div>
      </StandardSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 29: LIVE EXPERIMENT — THE MENTAL MODEL SIMULATOR (EXP5)
  // --------------------------------------------------------------------------
  if (slide.id === 29) {
    return (
      <ExperimentSlideFrame slide={slide}>
        <MentalModelSimulator />
      </ExperimentSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 30: ACT 4 TAKEAWAY: BRIDGE THE GULF VIA SYSTEM IMAGES
  // --------------------------------------------------------------------------
  if (slide.id === 30) {
    return (
      <StandardSlideFrame
        slide={slide}
        takeawayBox="Act 4 Axiom: The user will ALWAYS invent a mental model. If your System Image is silent, their model becomes superstition and costly mistakes."
      >
        <div className="space-y-3 text-center flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
            Act 4 Synthesis
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
            The System Image is your engineering voice. Design it with scientific intentionality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 flex-1 items-stretch">
          <div className="p-6 bg-white border border-[#E8E2D9] rounded-2xl shadow-xs flex flex-col justify-between">
            <span className="text-3xl font-serif-display font-bold text-[#E5391C]">01</span>
            <div>
              <h4 className="text-xl font-bold font-serif-display text-[#2D2D2E] mb-2">Unambiguous Feedback</h4>
              <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                Every user action must provide immediate perceptual confirmation. Never leave the user guessing if their transaction processed.
              </p>
            </div>
            <div className="text-xs font-mono text-[#E5391C] pt-3 border-t border-[#E8E2D9]">Feedback Loops</div>
          </div>

          <div className="p-6 bg-white border border-[#E8E2D9] rounded-2xl shadow-xs flex flex-col justify-between">
            <span className="text-3xl font-serif-display font-bold text-[#E5391C]">02</span>
            <div>
              <h4 className="text-xl font-bold font-serif-display text-[#2D2D2E] mb-2">Accurate Signifiers</h4>
              <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                Ensure UI controls accurately reflect backend realities. Don’t use continuous sliders for binary threshold switches.
              </p>
            </div>
            <div className="text-xs font-mono text-[#E5391C] pt-3 border-t border-[#E8E2D9]">Semantic Alignment</div>
          </div>

          <div className="p-6 bg-white border border-[#E8E2D9] rounded-2xl shadow-xs flex flex-col justify-between">
            <span className="text-3xl font-serif-display font-bold text-[#E5391C]">03</span>
            <div>
              <h4 className="text-xl font-bold font-serif-display text-[#2D2D2E] mb-2">Clear Mental Maps</h4>
              <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                When users have an accurate mental model, they can diagnose edge cases and recover gracefully from network glitches.
              </p>
            </div>
            <div className="text-xs font-mono text-[#E5391C] pt-3 border-t border-[#E8E2D9]">Resilient Interaction</div>
          </div>
        </div>
      </StandardSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 31: INFORMATION ARCHITECTURE & WURMAN
  // --------------------------------------------------------------------------
  if (slide.id === 31) {
    return (
      <StandardSlideFrame
        slide={slide}
        footerHint="Richard Saul Wurman (1976): Information Architecture — Location, Alphabet, Time, Category, Hierarchy (LATCH)."
      >
        <div className="space-y-3 text-center flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
            Information Architecture
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
            Richard Saul Wurman: The structural design of shared information spaces so humans can navigate without fear.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6 flex-1 items-stretch">
          <div className="bg-white border border-[#E8E2D9] p-5 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-[#E5391C]">L</span>
              <h4 className="text-lg font-bold font-serif-display text-[#2D2D2E] mt-2 mb-1">Location</h4>
              <p className="text-xs sm:text-sm text-[#525254]">
                Organizing by physical space, geography, or campus maps (e.g. Benguerir parcel sensors).
              </p>
            </div>
            <div className="text-[11px] font-mono text-stone-500 pt-2 border-t border-[#E8E2D9]">Spatial Map</div>
          </div>

          <div className="bg-white border border-[#E8E2D9] p-5 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-[#E5391C]">A</span>
              <h4 className="text-lg font-bold font-serif-display text-[#2D2D2E] mt-2 mb-1">Alphabet</h4>
              <p className="text-xs sm:text-sm text-[#525254]">
                Lexicographical sorting for comprehensive reference dictionaries, glossaries, and contacts.
              </p>
            </div>
            <div className="text-[11px] font-mono text-stone-500 pt-2 border-t border-[#E8E2D9]">Index Catalog</div>
          </div>

          <div className="bg-white border border-[#E8E2D9] p-5 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-[#E5391C]">T</span>
              <h4 className="text-lg font-bold font-serif-display text-[#2D2D2E] mt-2 mb-1">Time</h4>
              <p className="text-xs sm:text-sm text-[#525254]">
                Chronological sequences, log telemetry, financial statements, and train timetables.
              </p>
            </div>
            <div className="text-[11px] font-mono text-stone-500 pt-2 border-t border-[#E8E2D9]">Chronology</div>
          </div>

          <div className="bg-white border border-[#E8E2D9] p-5 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-[#E5391C]">C</span>
              <h4 className="text-lg font-bold font-serif-display text-[#2D2D2E] mt-2 mb-1">Category</h4>
              <p className="text-xs sm:text-sm text-[#525254]">
                Grouping by functional similarity, departments, or project clusters (most prone to team bias!).
              </p>
            </div>
            <div className="text-[11px] font-mono text-stone-500 pt-2 border-t border-[#E8E2D9]">Taxonomy</div>
          </div>

          <div className="bg-[#FDF5F2] border-2 border-[#E5391C] p-5 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-[#E5391C]">H</span>
              <h4 className="text-lg font-bold font-serif-display text-[#2D2D2E] mt-2 mb-1">Hierarchy</h4>
              <p className="text-xs sm:text-sm text-[#525254]">
                Ranking by quantitative magnitude: price (low to high), severity, or task priority.
              </p>
            </div>
            <div className="text-[11px] font-mono text-[#E5391C] font-bold pt-2 border-t border-[#FAD6CF]">Rank & Urgency</div>
          </div>
        </div>
      </StandardSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 32: CARD SORTING: OPEN VS CLOSED METHODOLOGIES
  // --------------------------------------------------------------------------
  if (slide.id === 32) {
    return (
      <StandardSlideFrame
        slide={slide}
        footerHint="Card Sorting is empirical data science applied to navigation menus: replace conference room arguments with cluster dendrograms."
      >
        <div className="space-y-3 text-center flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
            Card Sorting Methodologies
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
            The gold standard empirical research protocol to discover true user mental categorization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 flex-1 items-stretch">
          <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D9]">
                <span className="font-mono text-xs uppercase text-blue-700 font-bold">Generative Exploration</span>
                <span className="font-mono text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-bold">User Creates Groups</span>
              </div>
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E]">
                Open Card Sorting
              </h3>
              <p className="text-base text-[#525254] leading-relaxed">
                Participants receive 40 to 60 cards representing features, articles, or tools. They cluster cards into piles and invent the category names themselves.
              </p>
              <div className="p-3 bg-blue-50 rounded-xl text-xs font-mono text-blue-900 border border-blue-200">
                Reveals: Unfiltered user mental models, vocabulary preferences, and natural associative clusters.
              </div>
            </div>
            <div className="text-xs font-mono text-stone-500 pt-3 border-t border-[#E8E2D9]">Phase: Early IA Discovery</div>
          </div>

          <div className="bg-[#FDF5F2] border-2 border-[#E5391C] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#FAD6CF]">
                <span className="font-mono text-xs uppercase text-[#E5391C] font-bold">Evaluative Validation</span>
                <span className="font-mono text-xs bg-white text-[#E5391C] px-3 py-1 rounded-full border border-[#FAD6CF] font-bold">Predetermined Buckets</span>
              </div>
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E]">
                Closed Card Sorting
              </h3>
              <p className="text-base text-[#525254] leading-relaxed">
                Participants sort content cards into existing categories pre-defined by the design team to evaluate if users can locate items correctly.
              </p>
              <div className="p-3 bg-white rounded-xl text-xs font-mono text-[#E5391C] border border-[#FAD6CF]">
                Reveals: Ambiguity hotspots, misclassified features, and information scent failure points.
              </div>
            </div>
            <div className="text-xs font-mono text-[#E5391C] font-bold pt-3 border-t border-[#FAD6CF]">Phase: Pre-Launch Validation</div>
          </div>
        </div>
      </StandardSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 33: PROGRESSIVE DISCLOSURE: MANAGING COGNITIVE DENSITY
  // --------------------------------------------------------------------------
  if (slide.id === 33) {
    return (
      <StandardSlideFrame
        slide={slide}
        footerHint="Progressive Disclosure: Present only essential options at first; defer advanced complexities behind clear signifiers."
      >
        <div className="space-y-3 text-center flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
            Progressive Disclosure
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
            Jakob Nielsen: Show only what is necessary now; reveal complexity strictly when needed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 flex-1 items-stretch">
          <div
            onClick={() => setSlide33DisclosureTier(1)}
            className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
              slide33DisclosureTier === 1
                ? 'bg-white border-[#E5391C] shadow-md scale-102'
                : 'bg-white/60 border-stone-200 opacity-80'
            }`}
          >
            <div>
              <span className="font-mono text-xs font-bold text-[#E5391C] uppercase">Tier 1 · Novice & Frequent</span>
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E] mt-3 mb-2">Default View</h3>
              <p className="text-sm text-[#525254] leading-relaxed">
                Contains the 20% of controls that serve 80% of daily user sessions. Clean, low cognitive density, near-zero choice entropy.
              </p>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl text-xs font-mono text-stone-700 mt-4">
              Example: Clean Google Search bar or simple ONCF ticket selector.
            </div>
          </div>

          <div
            onClick={() => setSlide33DisclosureTier(2)}
            className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
              slide33DisclosureTier === 2
                ? 'bg-white border-[#E5391C] shadow-md scale-102'
                : 'bg-white/60 border-stone-200 opacity-80'
            }`}
          >
            <div>
              <span className="font-mono text-xs font-bold text-blue-700 uppercase">Tier 2 · Secondary On-Demand</span>
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E] mt-3 mb-2">Filtered Details</h3>
              <p className="text-sm text-[#525254] leading-relaxed">
                Hidden behind accordions, dropdowns, or "More Filters" signifiers. Invoked intentionally by users with specific needs.
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl text-xs font-mono text-blue-900 mt-4">
              Example: Seat preference (window/aisle) and meal selection.
            </div>
          </div>

          <div
            onClick={() => setSlide33DisclosureTier(3)}
            className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
              slide33DisclosureTier === 3
                ? 'bg-[#FDF5F2] border-[#E5391C] shadow-md scale-102'
                : 'bg-white/60 border-stone-200 opacity-80'
            }`}
          >
            <div>
              <span className="font-mono text-xs font-bold text-[#E5391C] uppercase">Tier 3 · Expert Configuration</span>
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E] mt-3 mb-2">Power Controls</h3>
              <p className="text-sm text-[#525254] leading-relaxed">
                Specialized diagnostic settings, raw query editors, and API keys. Keeps the main interface protected from clutter.
              </p>
            </div>
            <div className="p-3 bg-white rounded-xl text-xs font-mono text-[#E5391C] border border-[#FAD6CF] mt-4">
              Example: Developer console or agricultural telemetry calibration.
            </div>
          </div>
        </div>
      </StandardSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 34: DIGITAL WAYFINDING & SCENT OF INFORMATION
  // --------------------------------------------------------------------------
  if (slide.id === 34) {
    return (
      <StandardSlideFrame
        slide={slide}
        footerHint="Pirolli & Card (1999): Information Foraging Theory. Humans follow information scent through digital forests."
      >
        <div className="space-y-3 text-center flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
            Digital Wayfinding
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
            Kevin Lynch & Peter Pirolli: How humans navigate digital landscapes using information scent and landmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 flex-1 items-stretch">
          <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <span className="font-mono text-xs font-bold text-stone-500 uppercase">Information Foraging Theory</span>
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E]">
                The Scent of Information
              </h3>
              <p className="text-base text-[#525254] leading-relaxed">
                Humans assess links like predatory animals tracking food scent. If a link label is vague, the scent decays and the user retreats.
              </p>
              <div className="space-y-2 font-mono text-xs text-[#2D2D2E] bg-stone-50 p-4 rounded-xl border border-stone-200">
                <div className="text-red-600 font-bold">Weak Scent (Avoid):</div>
                <div>"Click Here", "Learn More", "Resources", "Misc Tools"</div>
                <div className="text-emerald-700 font-bold mt-2">Strong Scent (Ergonomic):</div>
                <div>"Download 2026 Soil Telemetry Report (PDF · 4MB)"</div>
              </div>
            </div>
            <div className="p-3 bg-stone-100 rounded-xl font-mono text-xs text-stone-700">
              Rule: Link labels must explicitly predict the destination payload.
            </div>
          </div>

          <div className="bg-[#FDF5F2] border-2 border-[#E5391C] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <span className="font-mono text-xs font-bold text-[#E5391C] uppercase">Kevin Lynch’s 5 Wayfinding Elements</span>
              <h3 className="text-2xl font-bold font-serif-display text-[#2D2D2E]">
                Preserving Spatial Orientation
              </h3>
              <div className="space-y-2 font-mono text-xs text-[#2D2D2E]">
                <div className="p-2.5 bg-white rounded-lg border border-[#FAD6CF]">
                  <strong>1. Landmarks:</strong> Permanent prominent logo and global header.
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-[#FAD6CF]">
                  <strong>2. Paths:</strong> Clear breadcrumb trails: Home &gt; Sensors &gt; Benguerir 04.
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-[#FAD6CF]">
                  <strong>3. Nodes:</strong> Hub navigation dashboards where paths intersect.
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-[#FAD6CF]">
                  <strong>4. Districts:</strong> Visually cohesive sections with subtle color cues.
                </div>
              </div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#FAD6CF] font-mono text-xs text-[#E5391C] font-bold">
              Answer the 3 Questions: Where am I? Where can I go? How do I get back?
            </div>
          </div>
        </div>
      </StandardSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 35: ACT 5 TAKEAWAY: NAVIGATION REFLECTS USER THOUGHT
  // --------------------------------------------------------------------------
  if (slide.id === 35) {
    return (
      <StandardSlideFrame
        slide={slide}
        takeawayBox="Act 5 Axiom: Never organize software navigation around corporate organizational charts. Organize around human goals and mental tasks."
      >
        <div className="space-y-3 text-center flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
            Act 5 Synthesis
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
            You now possess the entire blueprint of human interaction mechanics. Time for practical application.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 flex-1 items-stretch">
          <div className="p-6 bg-white border border-[#E8E2D9] rounded-2xl shadow-xs flex flex-col justify-between">
            <span className="text-3xl font-serif-display font-bold text-[#E5391C]">01</span>
            <div>
              <h4 className="text-xl font-bold font-serif-display text-[#2D2D2E] mb-2">Empirical Taxonomies</h4>
              <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                Card sorting gives you real mathematical clustering data. Never guess what users will call your features.
              </p>
            </div>
            <div className="text-xs font-mono text-[#E5391C] pt-3 border-t border-[#E8E2D9]">Data-Driven IA</div>
          </div>

          <div className="p-6 bg-white border border-[#E8E2D9] rounded-2xl shadow-xs flex flex-col justify-between">
            <span className="text-3xl font-serif-display font-bold text-[#E5391C]">02</span>
            <div>
              <h4 className="text-xl font-bold font-serif-display text-[#2D2D2E] mb-2">Progressive Hierarchy</h4>
              <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                Default simplicity protects novices; on-demand disclosure empowers power users without cluttering the screen.
              </p>
            </div>
            <div className="text-xs font-mono text-[#E5391C] pt-3 border-t border-[#E8E2D9]">Tiered Clarity</div>
          </div>

          <div className="p-6 bg-white border border-[#E8E2D9] rounded-2xl shadow-xs flex flex-col justify-between">
            <span className="text-3xl font-serif-display font-bold text-[#E5391C]">03</span>
            <div>
              <h4 className="text-xl font-bold font-serif-display text-[#2D2D2E] mb-2">Unbroken Scent</h4>
              <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                Provide crystal-clear landmarks and descriptive link labels so users forage through your app with confidence.
              </p>
            </div>
            <div className="text-xs font-mono text-[#E5391C] pt-3 border-t border-[#E8E2D9]">Wayfinding Confidence</div>
          </div>
        </div>
      </StandardSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 36: CAPSTONE STUDIO: PROJECT SELECTION & TEAM SETUP
  // --------------------------------------------------------------------------
  if (slide.id === 36) {
    return (
      <StandardSlideFrame
        slide={slide}
        footerHint="45 Minutes Dedicated In-Class Studio: Form teams of 3–4, select your mission-critical domain, and begin your audit."
      >
        <div className="space-y-3 text-center flex-shrink-0">
          <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#059669] font-bold bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200 inline-block">
            45-Minute In-Class Practical Lab
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
            Capstone Studio Launch
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
            From lecture hall to engineering studio: locking in your semester projects.
          </p>

          {onOpenTimer && (
            <button
              onClick={() => onOpenTimer(2700, '45-Min Capstone Studio Lab')}
              className="mt-2 px-8 py-3 bg-[#059669] hover:bg-emerald-700 text-white font-mono font-bold text-sm rounded-xl transition-all shadow-sm cursor-pointer inline-flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              Launch 45:00 In-Class Studio Timer
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 flex-1 items-stretch">
          <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <span className="text-2xl font-serif-display font-bold text-emerald-700">Phase 1 (10 Min)</span>
            <div>
              <h4 className="text-xl font-bold font-serif-display text-[#2D2D2E] mb-2">Team Assembly & Track</h4>
              <p className="text-sm text-[#525254] leading-relaxed">
                Form multidisciplinary teams of 3 to 4 engineers. Review the 4 mission-critical tracks and claim your domain.
              </p>
            </div>
            <div className="text-xs font-mono text-emerald-700 pt-3 border-t border-[#E8E2D9]">Lock in Track</div>
          </div>

          <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <span className="text-2xl font-serif-display font-bold text-emerald-700">Phase 2 (20 Min)</span>
            <div>
              <h4 className="text-xl font-bold font-serif-display text-[#2D2D2E] mb-2">3-Point Forensic Audit</h4>
              <p className="text-sm text-[#525254] leading-relaxed">
                Select an existing baseline software tool in your track. Audit its Fitts bottleneck, Gestalt flaw, and cognitive load breakdown.
              </p>
            </div>
            <div className="text-xs font-mono text-emerald-700 pt-3 border-t border-[#E8E2D9]">Live Audit Workspace</div>
          </div>

          <div className="bg-[#FDF5F2] border-2 border-[#E5391C] p-6 lg:p-8 rounded-2xl shadow-xs flex flex-col justify-between">
            <span className="text-2xl font-serif-display font-bold text-[#E5391C]">Phase 3 (15 Min)</span>
            <div>
              <h4 className="text-xl font-bold font-serif-display text-[#2D2D2E] mb-2">Project Commitment Canvas</h4>
              <p className="text-sm text-[#525254] leading-relaxed">
                Lock in your Rule of 3: The Specific User, The Critical Task, and The Baseline Flaw. Register before class ends.
              </p>
            </div>
            <div className="text-xs font-mono text-[#E5391C] font-bold pt-3 border-t border-[#FAD6CF]">Milestone 1 Kickoff</div>
          </div>
        </div>
      </StandardSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 37: THE 4 CAPSTONE CHALLENGE DOMAINS
  // --------------------------------------------------------------------------
  if (slide.id === 37) {
    return (
      <StandardSlideFrame
        slide={slide}
        footerHint="Select one track today. No toy applications allowed; every track addresses mission-critical complexity."
      >
        <div className="space-y-3 text-center flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
            The 4 Capstone Challenge Tracks
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
            Choose the complex domain your team will research, design, test, and engineer this semester.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 items-stretch">
          <div className="bg-white border border-[#E8E2D9] p-6 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 uppercase">
                Track A · AgTech
              </span>
              <h3 className="text-xl font-bold font-serif-display text-[#2D2D2E] mt-3 mb-2">
                Precision Agriculture & IoT
              </h3>
              <p className="text-xs sm:text-sm text-[#525254] leading-relaxed">
                Sensors, drone telemetry, and solar irrigation pumps on Moroccan farmland. Direct sunlight glare and rugged glove interaction.
              </p>
            </div>
            <div className="text-xs font-mono text-emerald-700 pt-3 border-t border-[#E8E2D9]">UM6P AgriTech Hub</div>
          </div>

          <div className="bg-white border border-[#E8E2D9] p-6 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-md border border-red-200 uppercase">
                Track B · MedTech
              </span>
              <h3 className="text-xl font-bold font-serif-display text-[#2D2D2E] mt-3 mb-2">
                Emergency ICU & Health
              </h3>
              <p className="text-xs sm:text-sm text-[#525254] leading-relaxed">
                Infusion pump dosing, triage telemetry, and pharmacy verification. High cognitive stress and zero tolerance for dosage errors.
              </p>
            </div>
            <div className="text-xs font-mono text-red-700 pt-3 border-t border-[#E8E2D9]">Safety-Critical Health</div>
          </div>

          <div className="bg-white border border-[#E8E2D9] p-6 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 uppercase">
                Track C · Civic Tech
              </span>
              <h3 className="text-xl font-bold font-serif-display text-[#2D2D2E] mt-3 mb-2">
                Moroccan Public Transit
              </h3>
              <p className="text-xs sm:text-sm text-[#525254] leading-relaxed">
                ONCF multimodal rail, RAMED/CNSS health reimbursement, and civic kiosks. Multi-lingual (Darija, French, Tamazight) and diverse digital literacy.
              </p>
            </div>
            <div className="text-xs font-mono text-blue-700 pt-3 border-t border-[#E8E2D9]">Public Accessibility</div>
          </div>

          <div className="bg-white border border-[#E8E2D9] p-6 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200 uppercase">
                Track D · DevOps
              </span>
              <h3 className="text-xl font-bold font-serif-display text-[#2D2D2E] mt-3 mb-2">
                Cloud Observability
              </h3>
              <p className="text-xs sm:text-sm text-[#525254] leading-relaxed">
                Microservice graphs, distributed tracing, and CI/CD pipelines. Extreme data density, alarm floods, and cognitive troubleshooting under outage stress.
              </p>
            </div>
            <div className="text-xs font-mono text-purple-700 pt-3 border-t border-[#E8E2D9]">Developer Ergonomics</div>
          </div>
        </div>
      </StandardSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 38: LIVE 45-MIN LAB: INTERACTIVE CAPSTONE WORKSPACE (EXP6)
  // --------------------------------------------------------------------------
  if (slide.id === 38) {
    return (
      <ExperimentSlideFrame slide={slide}>
        <CapstoneLabWorkspace />
      </ExperimentSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 39: HOMEWORK MILESTONE 1 SPECIFICATION
  // --------------------------------------------------------------------------
  if (slide.id === 39) {
    return (
      <StandardSlideFrame
        slide={slide}
        footerHint="Milestone 1 is due in 1 week prior to Session 3. Submit your 4-page PDF / Figma report via the UM6P course portal."
      >
        <div className="space-y-3 text-center flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
            Homework Milestone 1 Specification
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
            Capstone Milestone 1: Cognitive, Motor & Mental Model Forensic Audit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 items-stretch">
          <div className="p-6 bg-white border border-[#E8E2D9] rounded-2xl shadow-xs flex flex-col justify-between">
            <span className="font-mono text-xs uppercase text-blue-700 font-bold bg-blue-50 px-2 py-1 rounded">
              Deliverable Section 1
            </span>
            <div className="my-3">
              <h4 className="text-lg font-bold font-serif-display text-[#2D2D2E]">Mental Model Mapping</h4>
              <p className="text-xs sm:text-sm text-[#525254] mt-2 leading-relaxed">
                Diagram Norman’s Triad: user mental model vs system reality vs broken system image. Document where misconceptions happen.
              </p>
            </div>
            <div className="text-xs font-mono text-blue-700 pt-2 border-t border-[#E8E2D9]">5 Points</div>
          </div>

          <div className="p-6 bg-white border border-[#E8E2D9] rounded-2xl shadow-xs flex flex-col justify-between">
            <span className="font-mono text-xs uppercase text-purple-700 font-bold bg-purple-50 px-2 py-1 rounded">
              Deliverable Section 2
            </span>
            <div className="my-3">
              <h4 className="text-lg font-bold font-serif-display text-[#2D2D2E]">Fitts & Hick Math</h4>
              <p className="text-xs sm:text-sm text-[#525254] mt-2 leading-relaxed">
                Measure coordinates D and W on the baseline tool. Calculate ID in bits. Propose Hick’s Law progressive disclosure reorganization.
              </p>
            </div>
            <div className="text-xs font-mono text-purple-700 pt-2 border-t border-[#E8E2D9]">5 Points</div>
          </div>

          <div className="p-6 bg-white border border-[#E8E2D9] rounded-2xl shadow-xs flex flex-col justify-between">
            <span className="font-mono text-xs uppercase text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded">
              Deliverable Section 3
            </span>
            <div className="my-3">
              <h4 className="text-lg font-bold font-serif-display text-[#2D2D2E]">Gestalt Deconstruction</h4>
              <p className="text-xs sm:text-sm text-[#525254] mt-2 leading-relaxed">
                Annotate screenshots showing proximity/similarity violations. Provide an improved wireframe solving perceptual grouping.
              </p>
            </div>
            <div className="text-xs font-mono text-emerald-700 pt-2 border-t border-[#E8E2D9]">5 Points</div>
          </div>

          <div className="p-6 bg-[#FDF5F2] border-2 border-[#E5391C] rounded-2xl shadow-xs flex flex-col justify-between">
            <span className="font-mono text-xs uppercase text-[#E5391C] font-bold bg-white px-2 py-1 rounded border border-[#FAD6CF]">
              Deliverable Section 4
            </span>
            <div className="my-3">
              <h4 className="text-lg font-bold font-serif-display text-[#2D2D2E]">Cognitive Load Audit</h4>
              <p className="text-xs sm:text-sm text-[#525254] mt-2 leading-relaxed">
                Audit working memory demand. Identify where the app forces recall over recognition. Provide chunking input masks.
              </p>
            </div>
            <div className="text-xs font-mono text-[#E5391C] font-bold pt-2 border-t border-[#FAD6CF]">5 Points</div>
          </div>
        </div>
      </StandardSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 40: MILESTONE 1 GRADING RUBRIC (20 POINTS TOTAL)
  // --------------------------------------------------------------------------
  if (slide.id === 40) {
    return (
      <StandardSlideFrame
        slide={slide}
        footerHint="Evaluation is 100% objective: evaluated by scientific rigor, mathematical accuracy, and demonstrable usability improvements."
      >
        <div className="space-y-3 text-center flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
            Milestone 1 Grading Rubric
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
            Objective evaluation criteria (20 points total) applied to your forensic audit submission.
          </p>
        </div>

        <div className="space-y-3 flex-1 flex flex-col justify-between min-h-0">
          <div className="p-4 bg-white border border-[#E8E2D9] rounded-2xl flex items-center justify-between">
            <div>
              <h4 className="text-base font-bold font-serif-display text-[#2D2D2E]">
                1. Mental Model Alignment (5 Points)
              </h4>
              <p className="text-xs sm:text-sm text-[#525254]">
                Rigorous separation between user mental model and backend architecture; precise diagnosis of system image failures.
              </p>
            </div>
            <span className="font-mono text-sm font-bold text-[#E5391C] bg-[#FDF5F2] px-3 py-1 rounded-lg border border-[#FAD6CF]">
              5 Pts Max
            </span>
          </div>

          <div className="p-4 bg-white border border-[#E8E2D9] rounded-2xl flex items-center justify-between">
            <div>
              <h4 className="text-base font-bold font-serif-display text-[#2D2D2E]">
                2. Fitts’s & Hick’s Mathematical Calculations (5 Points)
              </h4>
              <p className="text-xs sm:text-sm text-[#525254]">
                Real coordinate measurements (D and W), correct ID logarithmic calculation, and entropy branching justification.
              </p>
            </div>
            <span className="font-mono text-sm font-bold text-[#E5391C] bg-[#FDF5F2] px-3 py-1 rounded-lg border border-[#FAD6CF]">
              5 Pts Max
            </span>
          </div>

          <div className="p-4 bg-white border border-[#E8E2D9] rounded-2xl flex items-center justify-between">
            <div>
              <h4 className="text-base font-bold font-serif-display text-[#2D2D2E]">
                3. Gestalt Deconstruction & Redesign Wireframe (5 Points)
              </h4>
              <p className="text-xs sm:text-sm text-[#525254]">
                Accurate identification of proximity/similarity errors; wireframe provably eliminates layout ambiguity.
              </p>
            </div>
            <span className="font-mono text-sm font-bold text-[#E5391C] bg-[#FDF5F2] px-3 py-1 rounded-lg border border-[#FAD6CF]">
              5 Pts Max
            </span>
          </div>

          <div className="p-4 bg-white border border-[#E8E2D9] rounded-2xl flex items-center justify-between">
            <div>
              <h4 className="text-base font-bold font-serif-display text-[#2D2D2E]">
                4. Cognitive Load & Working Memory Optimization (5 Points)
              </h4>
              <p className="text-xs sm:text-sm text-[#525254]">
                Concrete chunking masks, replacement of recall with recognition, and reduction of extraneous load.
              </p>
            </div>
            <span className="font-mono text-sm font-bold text-[#E5391C] bg-[#FDF5F2] px-3 py-1 rounded-lg border border-[#FAD6CF]">
              5 Pts Max
            </span>
          </div>
        </div>
      </StandardSlideFrame>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 41: THE THREE GOLDEN AXIOMS OF SESSION 2 (IDENTICAL FLOW TO SESSION 1 SLIDE 44)
  // --------------------------------------------------------------------------
  if (slide.id === 41) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-12 xl:p-14 bg-[#FAF9F6]">
        <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-6 lg:h-7 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Conclusion & Core Takeaways
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 41 / 42</span>
        </div>

        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-3 lg:py-4 gap-4 lg:gap-5 min-h-0">
          <div className="text-center space-y-2 flex-shrink-0">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif-display font-medium text-[#2D2D2E]">
              The Three Golden Axioms of Session 2
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-[#6E6D70] max-w-4xl mx-auto font-light">
              Carry these biological laws into every wireframe review and system architecture meeting.
            </p>
          </div>

          <div className="space-y-4 flex-1 flex flex-col justify-between min-h-0">
            <div className="p-5 lg:p-6 bg-white border-2 border-[#E8E2D9] rounded-3xl flex items-start gap-5 shadow-xs flex-1 hover:border-stone-400 transition-all">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-bold text-[#E5391C] shrink-0">01</span>
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif-display font-bold text-[#2D2D2E]">
                  You Cannot Overclock the Biology
                </h3>
                <p className="text-base sm:text-lg lg:text-xl text-[#525254] mt-1.5 leading-relaxed">
                  The human perceptual cycle is 100ms; working memory holds only 3–4 chunks under stress. When an interface asks for more, the human crashes. Never blame the user for biology.
                </p>
              </div>
            </div>

            <div className="p-5 lg:p-6 bg-white border-2 border-[#E8E2D9] rounded-3xl flex items-start gap-5 shadow-xs flex-1 hover:border-stone-400 transition-all">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-bold text-[#E5391C] shrink-0">02</span>
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif-display font-bold text-[#2D2D2E]">
                  Physics Dictates Pixels (Fitts & Hick)
                </h3>
                <p className="text-base sm:text-lg lg:text-xl text-[#525254] mt-1.5 leading-relaxed">
                  Distance and size determine motor acquisition speed; choice count and entropy determine decision latency. Stop arguing aesthetic opinions: calculate the Index of Difficulty.
                </p>
              </div>
            </div>

            <div className="p-5 lg:p-6 bg-white border-2 border-[#E8E2D9] rounded-3xl flex items-start gap-5 shadow-xs flex-1 hover:border-stone-400 transition-all">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-bold text-[#E5391C] shrink-0">03</span>
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif-display font-bold text-[#2D2D2E]">
                  The System Image is the Only Interface
                </h3>
                <p className="text-base sm:text-lg lg:text-xl text-[#525254] mt-1.5 leading-relaxed">
                  Users never see your code or database schemas. They reconstruct reality entirely through the clues, signifiers, and feedback you provide. If the System Image is flawed, their mental model fails.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
          Next: Looking ahead to Session 3
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 42: LOOKING AHEAD TO SESSION 3 (IDENTICAL HERO DESIGN TO SESSION 1 SLIDE 45)
  // --------------------------------------------------------------------------
  if (slide.id === 42) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 bg-[#FAF9F6] overflow-y-auto select-text text-center">
        <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-6 lg:h-7 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Conclusion & Next Week
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 42 / 42</span>
        </div>

        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-center py-6 lg:py-10 space-y-6 lg:space-y-10 min-h-0">
          {/* Compass / Field Exploration Hero Circle */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FDF5F2] border-2 border-[#E5391C] flex items-center justify-center mx-auto text-[#E5391C] shadow-sm">
            <Compass className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <div className="space-y-3">
            <span className="text-xs sm:text-sm lg:text-base font-mono uppercase tracking-widest text-[#E5391C] font-bold">
              Previewing Session 3 · Next Monday 09:00
            </span>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-serif-display font-medium text-[#2D2D2E]">
              The Context & The Field
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light">
              User Research · Ethnography · Contextual Inquiry · Think-Aloud Protocols
            </p>
          </div>

          <p className="text-base sm:text-lg lg:text-xl text-[#6E6D70] max-w-4xl mx-auto leading-relaxed">
            We leave the controlled lab and enter the chaotic real world: how to observe humans in their natural habitats (hospitals, farms, factory floors), master the Master-Apprentice interviewing method without biasing findings, and turn raw field observations into rigorous personas and customer journey maps.
          </p>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
          Thank you for Session 2 · Questions & Capstone Advising Open at Lectern
        </div>
      </div>
    );
  }

  // Fallback for any unmatched slide ID
  return (
    <StandardSlideFrame slide={slide} footerHint={slide.subtitle}>
      <div className="text-center py-12 space-y-4">
        <h2 className="text-3xl font-serif-display font-bold text-[#2D2D2E]">{slide.title}</h2>
        <p className="text-base text-[#525254]">{slide.subtitle}</p>
      </div>
    </StandardSlideFrame>
  );
};
