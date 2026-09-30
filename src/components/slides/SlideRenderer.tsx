import React, { useState } from 'react';
import {
  Brain,
  Cpu,
  RefreshCw,
  Users,
  Eye,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Layers,
  Activity,
  Heart,
  Calendar,
  Compass,
  FileCode,
  Target,
  DollarSign,
  TrendingDown,
  Quote,
  Lightbulb,
  MousePointer,
  HelpCircle,
  Timer,
  Sliders,
  Check,
  X,
  Radio,
  FileSpreadsheet,
  AlertOctagon,
  Plane,
  Gauge,
  Workflow,
  Sparkle,
} from 'lucide-react';
import { SlideData } from '../../types';
import { UM6PLogo } from '../brand/UM6PLogo';
import { Experiment1Functionality } from '../experiments/Experiment1Functionality';
import { Experiment2Loop } from '../experiments/Experiment2Loop';
import { Experiment3Context } from '../experiments/Experiment3Context';
import { Experiment4BadDesign } from '../experiments/Experiment4BadDesign';
import { Experiment5UsabilityMetrics } from '../experiments/Experiment5UsabilityMetrics';
import { Experiment6AttentionMemory } from '../experiments/Experiment6AttentionMemory';
import { FinalChallengeInfusionPump } from '../experiments/FinalChallengeInfusionPump';

interface SlideRendererProps {
  slide: SlideData;
  onNextSlide: () => void;
  onOpenTimer?: (seconds: number, label: string) => void;
}

export const SlideRenderer: React.FC<SlideRendererProps> = ({ slide, onNextSlide, onOpenTimer }) => {
  const [selectedRoadmapSession, setSelectedRoadmapSession] = useState<number>(1);
  const [doorPushed, setDoorPushed] = useState<boolean | null>(null);
  const [interactiveLoopStep, setInteractiveLoopStep] = useState<number>(0);

  // Helper for interactive experiments
  if (slide.type === 'experiment' || slide.experimentId) {
    switch (slide.experimentId) {
      case 'exp1':
        return <Experiment1Functionality />;
      case 'exp2':
        return <Experiment2Loop />;
      case 'exp3':
        return <Experiment3Context />;
      case 'exp4':
        return <Experiment4BadDesign />;
      case 'exp5':
        return <Experiment5UsabilityMetrics />;
      case 'exp6':
        return <Experiment6AttentionMemory />;
      case 'final_pump':
        return <FinalChallengeInfusionPump />;
      default:
        break;
    }
  }

  // --------------------------------------------------------------------------
  // SLIDE 1: TITLE SLIDE
  // --------------------------------------------------------------------------
  if (slide.id === 1) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-8 lg:p-14 bg-[#FAF9F6] relative overflow-hidden">
        {/* Subtle Moroccan Architectural Terracotta Motif Accent */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#D7492A]/5 pointer-events-none blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#1F2421]/5 pointer-events-none blur-3xl" />

        {/* Academic Institutional Header with Official UM6P Logo */}
        <div className="flex items-center justify-between pb-6 border-b border-[#E8E2D9]">
          <UM6PLogo variant="full" theme="color" className="h-10 lg:h-12" />

          <div className="text-right font-mono text-xs text-[#6E6D70]">
            <span className="font-bold text-[#D7492A]">CS-4010 · SESSION 01</span>
            <span className="text-[#C5BFB7] mx-2">/</span>
            <span className="text-[#2D2D2E] font-medium">BENGUERIR CAMPUS</span>
          </div>
        </div>

        {/* Hero Title Core (Large Presentation Typography) */}
        <div className="my-auto max-w-5xl space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D7492A] bg-[#FDF5F2] px-3.5 py-1.5 rounded-full border border-[#F0D5CB] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#D7492A]" />
            <span>Master Course · Human-Centered Systems</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-serif-display font-medium text-[#2D2D2E] tracking-tight leading-[1.08] text-balance">
            Human-Computer Interaction
          </h1>

          <p className="text-2xl lg:text-3xl text-[#525254] font-light max-w-3xl leading-relaxed">
            Understanding the interaction between people and technology.
          </p>

          <div className="pt-4 flex items-center gap-5">
            <button
              onClick={onNextSlide}
              className="px-8 py-4 bg-[#D7492A] hover:bg-[#B83519] text-white font-semibold text-base rounded-xl transition-all shadow-md flex items-center gap-3 group cursor-pointer active:scale-98"
            >
              <span>Begin Session 1</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>
            <span className="text-xs font-mono text-[#6E6D70]">Press Space or Right Arrow to navigate</span>
          </div>
        </div>

        {/* Institutional Footer Credits */}
        <div className="pt-6 border-t border-[#E8E2D9] flex items-center justify-between text-xs text-[#6E6D70] font-mono">
          <div>School of Computer Science & Human-Centered Computing</div>
          <div>Prof. Yassine Benaboud · Mohammed VI Polytechnic University</div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 2: THE EVERYDAY PARADOX
  // --------------------------------------------------------------------------
  if (slide.id === 2) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-8 lg:p-14 bg-[#FAF9F6]">
        <div className="pb-4 border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D7492A]" />
            <span className="text-xs font-mono uppercase text-[#D7492A] tracking-wider font-bold">
              Act 1 · The Starting Experience
            </span>
          </div>
          <span className="text-xs font-mono text-[#6E6D70]">Slide 2 / 44</span>
        </div>

        <div className="my-auto max-w-5xl mx-auto w-full space-y-10">
          <div className="space-y-3 text-center">
            <h2 className="text-4xl lg:text-6xl font-serif-display font-medium text-[#2D2D2E] text-balance">
              The Everyday Paradox
            </h2>
            <p className="text-xl lg:text-2xl text-[#6E6D70] font-light max-w-3xl mx-auto">
              Technology has never been more mathematically powerful. Yet everyday interactions constantly break down.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            {/* The Machine Capabilities */}
            <div className="bg-white border border-[#E8E2D9] p-8 rounded-2xl shadow-xs space-y-5">
              <div className="flex items-center gap-3 text-emerald-700">
                <Cpu className="w-7 h-7" />
                <span className="text-xs font-mono uppercase tracking-widest font-bold">What The Computer Does</span>
              </div>
              <ul className="space-y-4 text-base text-[#2D2D2E]">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-mono font-bold text-lg">✓</span>
                  <span>Executes 3.2 billion floating-point operations per second</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-mono font-bold text-lg">✓</span>
                  <span>Transmits gigabytes across trans-continental optical fiber in 14ms</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-mono font-bold text-lg">✓</span>
                  <span>Queries 100 million relational records without a single syntax error</span>
                </li>
              </ul>
            </div>

            {/* The Human Experience */}
            <div className="bg-[#FDF5F2] border border-[#F0D5CB] p-8 rounded-2xl shadow-xs space-y-5">
              <div className="flex items-center gap-3 text-[#D7492A]">
                <AlertTriangle className="w-7 h-7" />
                <span className="text-xs font-mono uppercase tracking-widest font-bold">What The Human Feels</span>
              </div>
              <ul className="space-y-4 text-base text-[#2D2D2E]">
                <li className="flex items-start gap-3">
                  <span className="text-[#D7492A] font-mono font-bold text-lg">✗</span>
                  <span>"Why won't this file upload? What does error code 0x8F mean?"</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D7492A] font-mono font-bold text-lg">✗</span>
                  <span>"Did my payment go through, or should I click the button again?"</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D7492A] font-mono font-bold text-lg">✗</span>
                  <span>"I accidentally deleted my document because the confirmation was confusing."</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border border-[#E8E2D9] rounded-xl text-center text-xs text-[#6E6D70]">
          The software was technically bug-free. Why did the interaction fail?
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 3: PREDICTION ACTIVITY
  // --------------------------------------------------------------------------
  if (slide.id === 3) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-8 lg:p-14 bg-[#FAF9F6]">
        <div className="pb-4 border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D7492A]" />
            <span className="text-xs font-mono uppercase text-[#D7492A] tracking-wider font-bold">
              Act 1 · Classroom Prediction
            </span>
          </div>
          <span className="text-xs font-mono text-[#6E6D70]">Slide 3 / 44</span>
        </div>

        <div className="my-auto max-w-4xl mx-auto w-full space-y-8">
          <div className="p-8 bg-white border-2 border-[#D7492A] rounded-2xl text-center space-y-5 shadow-sm">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D7492A] font-bold">
              Classroom Activity · Think — 30 Seconds
            </span>
            <h2 className="text-4xl lg:text-5xl font-serif-display font-medium text-[#2D2D2E]">
              Which Interface Will Be Faster and Less Error-Prone?
            </h2>
            <p className="text-lg text-[#525254] max-w-xl mx-auto leading-relaxed">
              In a moment, we will test both live on the screen. Both connect to the exact same Moroccan railway database.
            </p>

            {onOpenTimer && (
              <button
                onClick={() => onOpenTimer(30, 'Classroom Prediction (30s)')}
                className="mt-2 px-6 py-3 bg-[#D7492A] hover:bg-[#B83519] text-white text-xs font-bold rounded-xl transition-colors shadow cursor-pointer"
              >
                Launch 30s Countdown
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm text-[#2D2D2E]">
            <div className="p-6 bg-white border border-[#E8E2D9] rounded-xl space-y-2 shadow-xs">
              <strong className="text-[#2D2D2E] block text-base font-semibold">System A: Database-Direct Terminal</strong>
              <p className="text-[#6E6D70] leading-relaxed">Exposes database foreign keys, ISO timestamps, and raw seating matrix codes.</p>
            </div>
            <div className="p-6 bg-white border border-[#E8E2D9] rounded-xl space-y-2 shadow-xs">
              <strong className="text-[#D7492A] block text-base font-semibold">System B: Human-Centered Express</strong>
              <p className="text-[#6E6D70] leading-relaxed">Exposes traveler intent, station names, visual seat picker, and instant feedback.</p>
            </div>
          </div>
        </div>

        <div className="text-center text-xs font-mono text-[#6E6D70]">
          Raise your hand for A or B · Advance to next slide to run the live test
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 5: DEBRIEFING EXPERIMENT 1
  // --------------------------------------------------------------------------
  if (slide.id === 5) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-8 lg:p-14 bg-[#FAF9F6]">
        <div className="pb-4 border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D7492A]" />
            <span className="text-xs font-mono uppercase text-[#D7492A] tracking-wider font-bold">
              Act 1 · Experimental Debrief
            </span>
          </div>
          <span className="text-xs font-mono text-[#6E6D70]">Slide 5 / 44</span>
        </div>

        <div className="my-auto max-w-5xl mx-auto w-full space-y-8">
          <div className="space-y-3 text-center">
            <h2 className="text-4xl lg:text-6xl font-serif-display font-medium text-[#2D2D2E]">
              Why Did System A Fail the User?
            </h2>
            <p className="text-xl text-[#6E6D70] max-w-3xl mx-auto">
              Both systems wrote a valid transaction to the database. Yet one induced severe cognitive failure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-[#E8E2D9] rounded-2xl p-8 space-y-4 shadow-xs">
              <h3 className="font-bold text-[#2D2D2E] text-xl font-serif-display">The System Perspective</h3>
              <p className="text-sm text-[#525254] leading-relaxed">
                The database engineers say: <em>"The API responded with HTTP 200 OK. The primary key was committed. The system works as intended."</em>
              </p>
              <div className="p-4 bg-[#FAF9F6] border border-[#E8E2D9] rounded-xl font-mono text-xs text-[#2D2D2E]">
                SQL: INSERT INTO bookings VALUES ('DEP_CASAVOY', 'ARR_BENG', ...);
              </div>
            </div>

            <div className="bg-[#FDF5F2] border border-[#F0D5CB] rounded-2xl p-8 space-y-4 shadow-xs">
              <h3 className="font-bold text-[#D7492A] text-xl font-serif-display">The Human Perspective</h3>
              <p className="text-sm text-[#525254] leading-relaxed">
                The traveler was forced to memorize machine hex codes, format strict ISO strings, and decipher cryptic error messages.
              </p>
              <div className="p-4 bg-white border border-red-200 rounded-xl font-mono text-xs text-red-600 font-bold">
                "ERROR 401: Invalid departure node code"
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border-l-4 border-[#D7492A] rounded-r-xl shadow-xs text-center">
            <strong className="text-2xl text-[#2D2D2E] font-serif-display block mb-1">
              "System A externalized internal machine complexity directly onto the human brain."
            </strong>
          </div>
        </div>

        <div className="text-center text-xs font-mono text-[#6E6D70]">
          Advance to formalize Functionality vs Usability
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 6: FUNCTIONALITY VS USABILITY
  // --------------------------------------------------------------------------
  if (slide.id === 6) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-8 lg:p-14 bg-[#FAF9F6]">
        <div className="pb-4 border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D7492A]" />
            <span className="text-xs font-mono uppercase text-[#D7492A] tracking-wider font-bold">
              Act 1 · Core Theoretical Principle
            </span>
          </div>
          <span className="text-xs font-mono text-[#6E6D70]">Slide 6 / 44</span>
        </div>

        <div className="my-auto max-w-5xl mx-auto w-full space-y-8">
          <div className="space-y-3 text-center">
            <h2 className="text-4xl lg:text-6xl font-serif-display font-medium text-[#2D2D2E]">
              Functionality ≠ Usability
            </h2>
            <p className="text-xl text-[#6E6D70] max-w-2xl mx-auto">
              The fundamental confusion at the heart of early software development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-[#E8E2D9] p-8 rounded-2xl space-y-4 shadow-xs">
              <span className="text-xs font-mono uppercase tracking-widest text-[#6E6D70] font-bold">1. Functionality</span>
              <h3 className="text-3xl font-serif-display text-[#2D2D2E]">What the system CAN do</h3>
              <p className="text-base text-[#525254] leading-relaxed">
                The computational capabilities, features, data schemas, and mathematical algorithms implemented in the codebase.
              </p>
              <div className="text-xs font-mono text-[#6E6D70] pt-2 border-t border-[#F0EBE3]">
                Example: A ticket system can reserve 10,000 train seats simultaneously.
              </div>
            </div>

            <div className="bg-[#FDF5F2] border-2 border-[#D7492A] p-8 rounded-2xl space-y-4 shadow-sm">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D7492A] font-bold">2. Usability</span>
              <h3 className="text-3xl font-serif-display text-[#2D2D2E]">How effectively humans CAN do it</h3>
              <p className="text-base text-[#525254] leading-relaxed">
                The effectiveness, efficiency, and emotional satisfaction with which human users accomplish real-world goals.
              </p>
              <div className="text-xs font-mono text-[#D7492A] font-bold pt-2 border-t border-[#F0D5CB]">
                Example: A traveler books a seat in 8 seconds with zero errors.
              </div>
            </div>
          </div>

          <div className="p-4 bg-white border border-[#E8E2D9] rounded-xl text-center text-sm text-[#2D2D2E]">
            Adding features increases functionality, but often destroys usability unless the interaction is carefully architected.
          </div>
        </div>

        <div className="text-center text-xs font-mono text-[#6E6D70]">
          Next: The myth of "Human Error" and Norman Doors
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 7: NORMAN DOORS (Interactive Demo)
  // --------------------------------------------------------------------------
  if (slide.id === 7) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-8 lg:p-14 bg-[#FAF9F6]">
        <div className="pb-4 border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D7492A]" />
            <span className="text-xs font-mono uppercase text-[#D7492A] tracking-wider font-bold">
              Act 1 · Classic Case Study
            </span>
          </div>
          <span className="text-xs font-mono text-[#6E6D70]">Slide 7 / 44</span>
        </div>

        <div className="my-auto max-w-5xl mx-auto w-full space-y-8">
          <div className="space-y-3 text-center">
            <h2 className="text-4xl lg:text-6xl font-serif-display font-medium text-[#2D2D2E]">
              The Myth of "Human Error" & Norman Doors
            </h2>
            <p className="text-xl text-[#6E6D70] max-w-2xl mx-auto">
              When thousands of people push a door that should be pulled, it is not a human defect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Interactive Visual Door Experiment */}
            <div className="bg-white border border-[#E8E2D9] rounded-2xl p-8 flex flex-col items-center justify-center space-y-4 text-center shadow-xs">
              <div className="w-44 h-64 bg-[#F5F2ED] border-2 border-[#D5CFC7] rounded-xl flex flex-col justify-between p-4 relative shadow-inner">
                <div className="text-[11px] font-mono text-[#6E6D70] font-bold">LIBRARY GLASS DOOR</div>

                {/* Vertical handle */}
                <div
                  onClick={() => setDoorPushed(false)}
                  className={`w-5 h-24 rounded-full mx-auto my-auto shadow-md cursor-pointer transition-all ${
                    doorPushed === false ? 'bg-red-500 scale-105' : 'bg-[#D7492A] hover:scale-102'
                  }`}
                  title="Click to Pull handle"
                />

                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-1 rounded inline-block">
                    SIGN SAYS: "PUSH"
                  </div>
                  <div className="flex justify-center gap-2 pt-1">
                    <button
                      onClick={() => setDoorPushed(true)}
                      className={`text-[10px] px-2.5 py-1 rounded font-bold cursor-pointer transition-all ${
                        doorPushed === true ? 'bg-emerald-600 text-white' : 'bg-[#E8E2D9] text-[#2D2D2E]'
                      }`}
                    >
                      Try Push
                    </button>
                    <button
                      onClick={() => setDoorPushed(false)}
                      className={`text-[10px] px-2.5 py-1 rounded font-bold cursor-pointer transition-all ${
                        doorPushed === false ? 'bg-red-600 text-white' : 'bg-[#E8E2D9] text-[#2D2D2E]'
                      }`}
                    >
                      Try Pull
                    </button>
                  </div>
                </div>
              </div>

              {doorPushed !== null && (
                <div className={`text-xs font-mono font-bold ${doorPushed ? 'text-emerald-700' : 'text-red-600'}`}>
                  {doorPushed
                    ? '✓ Pushed: Door opens, but the physical grab bar tricked your hand into pulling!'
                    : '✗ Pulled: Door rattles! Physical affordance said PULL, but mechanical latch requires PUSH.'}
                </div>
              )}
            </div>

            <div className="space-y-5 text-sm text-[#2D2D2E] leading-relaxed">
              <h3 className="text-2xl font-serif-display font-medium text-[#2D2D2E]">
                Don Norman's Concept of Affordances
              </h3>
              <p>
                An <strong>affordance</strong> is a relationship between the physical properties of an object and the capabilities of the agent using it.
              </p>
              <p>
                A vertical grab bar naturally affords pulling to the human hand. A flat metal plate naturally affords pushing.
              </p>
              <div className="p-4 bg-[#FDF5F2] border-l-4 border-[#D7492A] rounded-r-xl text-base text-[#2D2D2E] font-serif italic">
                "When a simple thing needs pictures or instructions to be used, it is broken." — Don Norman
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-xs font-mono text-[#6E6D70]">
          Stop apologizing to doors · The design caused your behavior
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 8: THE AHA MOMENT
  // --------------------------------------------------------------------------
  if (slide.id === 8) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-8 lg:p-14 bg-[#FAF9F6] text-center">
        <div className="pb-4 border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D7492A]" />
            <span className="text-xs font-mono uppercase text-[#D7492A] tracking-wider font-bold">
              Act 1 · Core Aha Moment
            </span>
          </div>
          <span className="text-xs font-mono text-[#6E6D70]">Slide 8 / 44</span>
        </div>

        <div className="my-auto max-w-4xl mx-auto space-y-8">
          <div className="w-20 h-20 rounded-full bg-[#FDF5F2] border-2 border-[#D7492A] flex items-center justify-center mx-auto text-[#D7492A] shadow-sm">
            <Sparkles className="w-10 h-10" />
          </div>

          <h2 className="text-5xl lg:text-7xl font-serif-display font-medium text-[#2D2D2E] leading-tight">
            "The interaction between human and computer is itself a designable artifact."
          </h2>

          <p className="text-2xl text-[#525254] font-light max-w-2xl mx-auto leading-relaxed">
            It is not secondary decoration. It is not skin deep. It is the primary medium through which human intention becomes computational reality.
          </p>
        </div>

        <div className="p-4 bg-white border border-[#E8E2D9] rounded-xl max-w-xl mx-auto text-xs font-mono text-[#6E6D70]">
          Entering Act 2: Understanding the Structure of Interaction
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 9: DECONSTRUCTING H C I
  // --------------------------------------------------------------------------
  if (slide.id === 9) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-8 lg:p-14 bg-[#FAF9F6]">
        <div className="pb-4 border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D7492A]" />
            <span className="text-xs font-mono uppercase text-[#D7492A] tracking-wider font-bold">
              Act 2 · The Three Pillars
            </span>
          </div>
          <span className="text-xs font-mono text-[#6E6D70]">Slide 9 / 44</span>
        </div>

        <div className="my-auto max-w-5xl mx-auto w-full space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-4xl lg:text-6xl font-serif-display font-medium text-[#2D2D2E]">
              Deconstructing the Acronym: H · C · I
            </h2>
            <p className="text-xl text-[#6E6D70] max-w-3xl mx-auto">
              Three equal foundations uniting cognitive science, technology, and design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#E8E2D9] p-8 rounded-2xl space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold font-mono text-xl border border-blue-200">
                H
              </div>
              <h3 className="text-2xl font-serif-display text-[#2D2D2E]">The Human</h3>
              <p className="text-sm text-[#525254] leading-relaxed">
                Perceptual bandwidth, working memory limits, visual acuity, motor coordination, emotional state, mental models.
              </p>
            </div>

            <div className="bg-white border border-[#E8E2D9] p-8 rounded-2xl space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold font-mono text-xl border border-purple-200">
                C
              </div>
              <h3 className="text-2xl font-serif-display text-[#2D2D2E]">The Computer</h3>
              <p className="text-sm text-[#525254] leading-relaxed">
                Hardware, sensors, displays, state machines, latency, operating systems, cloud networks, algorithms.
              </p>
            </div>

            <div className="bg-[#FDF5F2] border-2 border-[#D7492A] p-8 rounded-2xl space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#D7492A] text-white flex items-center justify-center font-bold font-mono text-xl shadow">
                I
              </div>
              <h3 className="text-2xl font-serif-display text-[#2D2D2E]">The Interaction</h3>
              <p className="text-sm text-[#525254] leading-relaxed">
                The continuous dialogue of translation: How intent turns into action, and how system states turn into perception.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center text-xs font-mono text-[#6E6D70]">
          Computer Science provides the C · Cognitive Psychology provides the H · Design creates the I
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 10: WHAT IS THE "COMPUTER"?
  // --------------------------------------------------------------------------
  if (slide.id === 10) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-8 lg:p-14 bg-[#FAF9F6]">
        <div className="pb-4 border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D7492A]" />
            <span className="text-xs font-mono uppercase text-[#D7492A] tracking-wider font-bold">
              Act 2 · The Technological Frontier
            </span>
          </div>
          <span className="text-xs font-mono text-[#6E6D70]">Slide 10 / 44</span>
        </div>

        <div className="my-auto max-w-5xl mx-auto w-full space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-4xl lg:text-6xl font-serif-display font-medium text-[#2D2D2E]">
              What is the "Computer"?
            </h2>
            <p className="text-xl text-[#6E6D70] max-w-3xl mx-auto">
              Far beyond keyboards and desktop monitors: Ambient, embedded, and autonomous systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <div className="bg-white border border-[#E8E2D9] p-6 rounded-2xl space-y-3 shadow-xs">
              <span className="text-xs font-mono text-[#D7492A] font-bold">1980s</span>
              <h4 className="text-lg font-serif-display font-bold text-[#2D2D2E]">The Beige Box</h4>
              <p className="text-xs text-[#525254] leading-relaxed">
                Single terminal CRT screens, command line prompts, solitary workstation operator.
              </p>
            </div>
            <div className="bg-white border border-[#E8E2D9] p-6 rounded-2xl space-y-3 shadow-xs">
              <span className="text-xs font-mono text-[#D7492A] font-bold">2000s</span>
              <h4 className="text-lg font-serif-display font-bold text-[#2D2D2E]">The Mobile Web</h4>
              <p className="text-xs text-[#525254] leading-relaxed">
                Smartphones, capacitive multi-touch, handheld browsers, app ecosystems on the go.
              </p>
            </div>
            <div className="bg-white border border-[#E8E2D9] p-6 rounded-2xl space-y-3 shadow-xs">
              <span className="text-xs font-mono text-[#D7492A] font-bold">2020s</span>
              <h4 className="text-lg font-serif-display font-bold text-[#2D2D2E]">Wearable & Automotive</h4>
              <p className="text-xs text-[#525254] leading-relaxed">
                Smartwatches, bio-monitors, HUDs, in-vehicle touchscreens, voice assistants.
              </p>
            </div>
            <div className="bg-[#FDF5F2] border-2 border-[#D7492A] p-6 rounded-2xl space-y-3 shadow-sm">
              <span className="text-xs font-mono text-[#D7492A] font-bold">2026+ (UM6P)</span>
              <h4 className="text-lg font-serif-display font-bold text-[#2D2D2E]">Ubiquitous Computing</h4>
              <p className="text-xs text-[#525254] leading-relaxed">
                Smart agriculture drones, medical implants, smart green cities, ambient IoT telemetry.
              </p>
            </div>
          </div>

          <div className="p-4 bg-white border border-[#E8E2D9] rounded-xl text-center text-sm text-[#2D2D2E]">
            Whenever computational state interacts with human biology, an HCI challenge is born.
          </div>
        </div>

        <div className="text-center text-xs font-mono text-[#6E6D70]">
          Next: Dissecting the biological hardware of the Human
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 11: WHAT IS THE "HUMAN"?
  // --------------------------------------------------------------------------
  if (slide.id === 11) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-8 lg:p-14 bg-[#FAF9F6]">
        <div className="pb-4 border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D7492A]" />
            <span className="text-xs font-mono uppercase text-[#D7492A] tracking-wider font-bold">
              Act 2 · Cognitive Biology
            </span>
          </div>
          <span className="text-xs font-mono text-[#6E6D70]">Slide 11 / 44</span>
        </div>

        <div className="my-auto max-w-5xl mx-auto w-full space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-4xl lg:text-6xl font-serif-display font-medium text-[#2D2D2E]">
              What is the "Human"?
            </h2>
            <p className="text-xl text-[#6E6D70] max-w-3xl mx-auto">
              You cannot download more RAM into human brains. Software must conform to biological constraints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#E8E2D9] p-8 rounded-2xl space-y-3 shadow-xs">
              <span className="text-xs font-mono text-[#D7492A] font-bold">PERCEPTION</span>
              <h3 className="text-2xl font-serif-display text-[#2D2D2E]">Foveal Vision: ~2°</h3>
              <p className="text-sm text-[#525254] leading-relaxed">
                High-resolution vision is limited to a thumbnail-sized circle at arm’s length. Everything in peripheral vision is blurry motion detection.
              </p>
            </div>
            <div className="bg-white border border-[#E8E2D9] p-8 rounded-2xl space-y-3 shadow-xs">
              <span className="text-xs font-mono text-[#D7492A] font-bold">COGNITION</span>
              <h3 className="text-2xl font-serif-display text-[#2D2D2E]">Working Memory: ~4 Chunks</h3>
              <p className="text-sm text-[#525254] leading-relaxed">
                Short-term working memory decays within seconds unless refreshed. Cluttered interfaces overwhelm human working memory immediately.
              </p>
            </div>
            <div className="bg-white border border-[#E8E2D9] p-8 rounded-2xl space-y-3 shadow-xs">
              <span className="text-xs font-mono text-[#D7492A] font-bold">MOTOR LIMITS</span>
              <h3 className="text-2xl font-serif-display text-[#2D2D2E]">Reaction Time: ~200ms</h3>
              <p className="text-sm text-[#525254] leading-relaxed">
                Neuromuscular delay from visual photon hit to finger movement. Small touch targets require high precision and slow down interaction.
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#FDF5F2] border-l-4 border-[#D7492A] rounded-r-xl text-center text-sm font-serif italic text-[#2D2D2E]">
            "Human biology has not received a firmware update in 50,000 years."
          </div>
        </div>

        <div className="text-center text-xs font-mono text-[#6E6D70]">
          Next: How interaction bridges the biological and the computational
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 12: WHAT IS THE "INTERACTION"?
  // --------------------------------------------------------------------------
  if (slide.id === 12) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-8 lg:p-14 bg-[#FAF9F6]">
        <div className="pb-4 border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D7492A]" />
            <span className="text-xs font-mono uppercase text-[#D7492A] tracking-wider font-bold">
              Act 2 · Interaction as Translation
            </span>
          </div>
          <span className="text-xs font-mono text-[#6E6D70]">Slide 12 / 44</span>
        </div>

        <div className="my-auto max-w-5xl mx-auto w-full space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-4xl lg:text-6xl font-serif-display font-medium text-[#2D2D2E]">
              What is the "Interaction"?
            </h2>
            <p className="text-xl text-[#6E6D70] max-w-3xl mx-auto">
              A continuous dialogue of bilateral translation across two radically different mediums.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="bg-white border border-[#E8E2D9] p-8 rounded-2xl space-y-3 shadow-xs">
              <span className="text-xs font-mono text-[#6E6D70] uppercase font-bold">The Machine Domain</span>
              <h3 className="text-3xl font-serif-display text-[#2D2D2E]">Binary & State</h3>
              <ul className="space-y-2 text-sm text-[#525254]">
                <li>• Voltage levels in silicon circuits</li>
                <li>• Memory addresses and register pointers</li>
                <li>• Relational table foreign keys</li>
                <li>• Millisecond clock cycles</li>
              </ul>
            </div>

            <div className="bg-[#FDF5F2] border-2 border-[#D7492A] p-8 rounded-2xl space-y-3 shadow-sm">
              <span className="text-xs font-mono text-[#D7492A] uppercase font-bold">The Human Domain</span>
              <h3 className="text-3xl font-serif-display text-[#2D2D2E]">Intent & Meaning</h3>
              <ul className="space-y-2 text-sm text-[#525254]">
                <li>• Personal aspirations and emotional goals</li>
                <li>• Visual patterns, metaphors, and symbols</li>
                <li>• Physical muscle movements and gestures</li>
                <li>• Subjective feeling of progress and control</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-white border border-[#E8E2D9] rounded-xl text-center text-sm text-[#2D2D2E]">
            <strong>The Interaction Designer's Job:</strong> To build a translation layer so transparent that the human feels they are manipulating their goal directly.
          </div>
        </div>

        <div className="text-center text-xs font-mono text-[#6E6D70]">
          Next: The fundamental circular interaction loop
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 13: THE FUNDAMENTAL INTERACTION LOOP (Interactive Step-Through)
  // --------------------------------------------------------------------------
  if (slide.id === 13) {
    const loopSteps = [
      { num: '01', title: 'Goal & Intent', desc: 'User forms internal mental goal: "Pay semester housing fee"' },
      { num: '02', title: 'Action Execution', desc: 'Physical motor command: Mouse click / finger tap on button' },
      { num: '03', title: 'System State', desc: 'Backend updates DB records, queries payment gateway' },
      { num: '04', title: 'Sensory Feedback', desc: 'Screen renders loading spinner, button depress, checkmark' },
      { num: '05', title: 'Evaluation', desc: 'Human perceives feedback, confirms goal was achieved' },
    ];

    return (
      <div className="w-full h-full flex flex-col justify-between p-8 lg:p-14 bg-[#FAF9F6]">
        <div className="pb-4 border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D7492A]" />
            <span className="text-xs font-mono uppercase text-[#D7492A] tracking-wider font-bold">
              Act 2 · The Core Interaction Model
            </span>
          </div>
          <span className="text-xs font-mono text-[#6E6D70]">Slide 13 / 44</span>
        </div>

        <div className="my-auto max-w-5xl mx-auto w-full space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-4xl lg:text-6xl font-serif-display font-medium text-[#2D2D2E]">
              The Fundamental Interaction Loop
            </h2>
            <p className="text-xl text-[#6E6D70] max-w-3xl mx-auto">
              Norman’s Seven Stages of Action: The circular bridge between intent and outcome.
            </p>
          </div>

          {/* Interactive Step-by-Step Flow */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {loopSteps.map((step, idx) => {
              const isActive = interactiveLoopStep === idx;
              return (
                <div
                  key={step.num}
                  onClick={() => setInteractiveLoopStep(idx)}
                  className={`p-5 rounded-xl space-y-2 cursor-pointer transition-all border ${
                    isActive
                      ? 'bg-[#FDF5F2] border-2 border-[#D7492A] shadow-md scale-102'
                      : 'bg-white border-[#E8E2D9] hover:border-[#C5BFB7] shadow-xs'
                  }`}
                >
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-[#D7492A]' : 'text-[#6E6D70]'}`}>
                    {step.num}
                  </span>
                  <h4 className="text-base font-semibold text-[#2D2D2E] font-serif-display">{step.title}</h4>
                  <p className="text-xs text-[#525254] leading-snug">{step.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-white border border-[#E8E2D9] rounded-xl text-center text-sm text-[#2D2D2E]">
            {interactiveLoopStep === 3 ? (
              <strong className="text-[#D7492A]">
                Critical Note on Step 4: If Feedback is absent or delayed by 400ms, the user assumes Step 2 failed and clicks again!
              </strong>
            ) : (
              <span>Click any step to inspect its role in closing the loop. If Step 4 (Feedback) is absent, the human repeats the action.</span>
            )}
          </div>
        </div>

        <div className="text-center text-xs font-mono text-[#6E6D70]">
          Next: Live simulation of broken feedback on the UM6P bursar terminal
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 15: THE TWIN GULFS
  // --------------------------------------------------------------------------
  if (slide.id === 15) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-8 lg:p-14 bg-[#FAF9F6]">
        <div className="pb-4 border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D7492A]" />
            <span className="text-xs font-mono uppercase text-[#D7492A] tracking-wider font-bold">
              Act 2 · Norman's Twin Gulfs
            </span>
          </div>
          <span className="text-xs font-mono text-[#6E6D70]">Slide 15 / 44</span>
        </div>

        <div className="my-auto max-w-5xl mx-auto w-full space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-4xl lg:text-6xl font-serif-display font-medium text-[#2D2D2E]">
              The Twin Gulfs: Execution & Evaluation
            </h2>
            <p className="text-xl text-[#6E6D70] max-w-3xl mx-auto">
              Don Norman's definitive taxonomy for diagnosing all interaction breakdowns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border-2 border-[#E8E2D9] p-8 rounded-2xl space-y-4 shadow-xs">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D7492A] font-bold">1. Gulf of Execution</span>
              <h3 className="text-2xl font-serif-display text-[#2D2D2E]">"How do I do what I want to do?"</h3>
              <p className="text-sm text-[#525254] leading-relaxed">
                The difference between the user's intentions and the physical actions the system allows.
              </p>
              <div className="text-xs font-mono bg-[#FAF9F6] p-3 rounded-lg text-[#2D2D2E] border border-[#E8E2D9]">
                Bridged by: Affordances, Signifiers, Constraints, Natural Mapping.
              </div>
            </div>

            <div className="bg-[#FDF5F2] border-2 border-[#D7492A] p-8 rounded-2xl space-y-4 shadow-sm">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D7492A] font-bold">2. Gulf of Evaluation</span>
              <h3 className="text-2xl font-serif-display text-[#2D2D2E]">"What just happened? What state is it in?"</h3>
              <p className="text-sm text-[#525254] leading-relaxed">
                The difficulty of assessing the state of the system and determining whether the goal was satisfied.
              </p>
              <div className="text-xs font-mono bg-white p-3 rounded-lg text-[#2D2D2E] border border-[#F0D5CB]">
                Bridged by: Immediate Feedback, Progress indicators, Clear system state visibility.
              </div>
            </div>
          </div>

          <div className="p-4 bg-white border border-[#E8E2D9] rounded-xl text-center text-sm text-[#2D2D2E]">
            Every single bug in UX is a failure to bridge either the Gulf of Execution or the Gulf of Evaluation.
          </div>
        </div>

        <div className="text-center text-xs font-mono text-[#6E6D70]">
          Next: Clarifying the triad of HCI vs UX vs UI
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 16: CLARIFYING THE TRIAD: HCI VS UX VS UI
  // --------------------------------------------------------------------------
  if (slide.id === 16) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-8 lg:p-14 bg-[#FAF9F6]">
        <div className="pb-4 border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D7492A]" />
            <span className="text-xs font-mono uppercase text-[#D7492A] tracking-wider font-bold">
              Act 2 · Disciplinary Boundaries
            </span>
          </div>
          <span className="text-xs font-mono text-[#6E6D70]">Slide 16 / 44</span>
        </div>

        <div className="my-auto max-w-5xl mx-auto w-full space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-4xl lg:text-6xl font-serif-display font-medium text-[#2D2D2E]">
              Clarifying the Triad: HCI · UX · UI
            </h2>
            <p className="text-xl text-[#6E6D70] max-w-3xl mx-auto">
              Commonly conflated in industry; distinct in academic and engineering practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#E8E2D9] p-8 rounded-2xl space-y-4 shadow-xs">
              <span className="text-xs font-mono text-[#6E6D70] uppercase tracking-widest font-bold">The Surface</span>
              <h3 className="text-2xl font-serif-display text-[#2D2D2E]">UI (User Interface)</h3>
              <p className="text-sm text-[#525254] leading-relaxed">
                The visual and tactile contact point. Typography, palettes, buttons, grid alignment, spacing, iconography.
              </p>
              <div className="text-xs font-mono text-[#6E6D70]">Analogy: The steering wheel and paint job.</div>
            </div>

            <div className="bg-white border border-[#E8E2D9] p-8 rounded-2xl space-y-4 shadow-xs">
              <span className="text-xs font-mono text-[#D7492A] uppercase tracking-widest font-bold">The Journey</span>
              <h3 className="text-2xl font-serif-display text-[#2D2D2E]">UX (User Experience)</h3>
              <p className="text-sm text-[#525254] leading-relaxed">
                The holistic end-to-end journey. Expectations, purchasing, onboarding, customer support, emotional feeling.
              </p>
              <div className="text-xs font-mono text-[#6E6D70]">Analogy: The entire experience of owning the vehicle.</div>
            </div>

            <div className="bg-[#FDF5F2] border-2 border-[#D7492A] p-8 rounded-2xl space-y-4 shadow-sm">
              <span className="text-xs font-mono text-[#D7492A] uppercase tracking-widest font-bold">The Science</span>
              <h3 className="text-2xl font-serif-display text-[#2D2D2E]">HCI (The Discipline)</h3>
              <p className="text-sm text-[#525254] leading-relaxed">
                The empirical science governing how humans perceive, process, and act through computational systems.
              </p>
              <div className="text-xs font-mono text-[#D7492A] font-bold">Analogy: Ergonomic and mechanical engineering.</div>
            </div>
          </div>
        </div>

        <div className="text-center text-xs font-mono text-[#6E6D70]">
          HCI provides the empirical foundation upon which UX and UI are constructed
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 19: THE FALLACY OF THE AVERAGE USER
  // --------------------------------------------------------------------------
  if (slide.id === 19) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-8 lg:p-14 bg-[#FAF9F6]">
        <div className="pb-4 border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D7492A]" />
            <span className="text-xs font-mono uppercase text-[#D7492A] tracking-wider font-bold">
              Act 3 · Landmark Empirical Case
            </span>
          </div>
          <span className="text-xs font-mono text-[#6E6D70]">Slide 19 / 44</span>
        </div>

        <div className="my-auto max-w-5xl mx-auto w-full space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-4xl lg:text-6xl font-serif-display font-medium text-[#2D2D2E]">
              The Fallacy of the "Average User"
            </h2>
            <p className="text-xl text-[#6E6D70] max-w-2xl mx-auto">
              Gilbert Daniels’ 1950 Air Force Cockpit Study.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#E8E2D9] p-8 rounded-2xl text-center space-y-2 shadow-xs">
              <span className="text-5xl font-mono font-bold text-[#2D2D2E]">4,063</span>
              <div className="text-xs text-[#6E6D70] font-semibold">Pilots Measured Across 10 Physical Dimensions</div>
            </div>
            <div className="bg-white border border-[#E8E2D9] p-8 rounded-2xl text-center space-y-2 shadow-xs">
              <span className="text-5xl font-mono font-bold text-[#D7492A]">&lt; 3.5%</span>
              <div className="text-xs text-[#6E6D70] font-semibold">Average on Even 3 Dimensions</div>
            </div>
            <div className="bg-red-50 border border-red-200 p-8 rounded-2xl text-center space-y-2 shadow-xs">
              <span className="text-5xl font-mono font-bold text-red-600">0</span>
              <div className="text-xs text-red-800 font-semibold">Pilots Were Average on All 10 Dimensions</div>
            </div>
          </div>

          <div className="p-6 bg-white border-l-4 border-[#D7492A] rounded-r-xl shadow-xs text-center space-y-2">
            <strong className="text-2xl text-[#2D2D2E] font-serif-display block">
              "If you design a cockpit for the average pilot, you design a cockpit for literally nobody."
            </strong>
            <p className="text-sm text-[#6E6D70] max-w-3xl mx-auto">
              The Air Force discarded fixed seats and invented adjustable cockpit controls. In software: customization, accessibility, responsive layout.
            </p>
          </div>
        </div>

        <div className="text-center text-xs font-mono text-[#6E6D70]">
          There is no "average user" · Design for diversity
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 21: GOALS VS TASKS VS ACTIONS
  // --------------------------------------------------------------------------
  if (slide.id === 21) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-8 lg:p-14 bg-[#FAF9F6]">
        <div className="pb-4 border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D7492A]" />
            <span className="text-xs font-mono uppercase text-[#D7492A] tracking-wider font-bold">
              Act 3 · Cognitive Hierarchy
            </span>
          </div>
          <span className="text-xs font-mono text-[#6E6D70]">Slide 21 / 44</span>
        </div>

        <div className="my-auto max-w-5xl mx-auto w-full space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-4xl lg:text-6xl font-serif-display font-medium text-[#2D2D2E]">
              Goals vs Tasks vs Actions
            </h2>
            <p className="text-xl text-[#6E6D70] max-w-2xl mx-auto">
              Engineers program actions; human beings care only about goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FDF5F2] border-2 border-[#D7492A] p-8 rounded-2xl space-y-3 shadow-sm">
              <span className="text-xs font-mono text-[#D7492A] font-bold uppercase">1. Goal (The "Why")</span>
              <h3 className="text-2xl font-serif-display text-[#2D2D2E]">Human Intention</h3>
              <p className="text-sm text-[#525254] leading-relaxed">
                <em>"I want to feel connected with my parents back in Fez."</em>
              </p>
            </div>

            <div className="bg-white border border-[#E8E2D9] p-8 rounded-2xl space-y-3 shadow-xs">
              <span className="text-xs font-mono text-[#6E6D70] font-bold uppercase">2. Task (The "What")</span>
              <h3 className="text-2xl font-serif-display text-[#2D2D2E]">Structured Sequence</h3>
              <p className="text-sm text-[#525254] leading-relaxed">
                Send graduation ceremony photos taken today at UM6P.
              </p>
            </div>

            <div className="bg-white border border-[#E8E2D9] p-8 rounded-2xl space-y-3 shadow-xs">
              <span className="text-xs font-mono text-[#6E6D70] font-bold uppercase">3. Action (The "How")</span>
              <h3 className="text-2xl font-serif-display text-[#2D2D2E]">Physical Execution</h3>
              <p className="text-sm text-[#525254] leading-relaxed">
                Click file picker, browse filesystem, select JPG, press submit.
              </p>
            </div>
          </div>

          <div className="p-4 bg-white border border-[#E8E2D9] rounded-xl text-center text-sm text-[#2D2D2E]">
            Every unnecessary action you impose between a human and their goal is friction that drains working memory.
          </div>
        </div>

        <div className="text-center text-xs font-mono text-[#6E6D70]">
          Next: How Context of Use fundamentally alters human capabilities
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 25: AXIOM: YOU ARE NOT THE USER
  // --------------------------------------------------------------------------
  if (slide.id === 25) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-8 lg:p-14 bg-[#FAF9F6] text-center">
        <div className="pb-4 border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D7492A]" />
            <span className="text-xs font-mono uppercase text-[#D7492A] tracking-wider font-bold">
              Act 3 Axiom · Core Golden Rule
            </span>
          </div>
          <span className="text-xs font-mono text-[#6E6D70]">Slide 25 / 44</span>
        </div>

        <div className="my-auto max-w-4xl mx-auto space-y-8">
          <div className="w-20 h-20 rounded-full bg-[#FDF5F2] border-2 border-[#D7492A] flex items-center justify-center mx-auto text-[#D7492A] shadow-sm">
            <AlertOctagon className="w-10 h-10" />
          </div>

          <h2 className="text-5xl lg:text-7xl font-serif-display font-medium text-[#2D2D2E] leading-tight">
            "You Are Not The User."
          </h2>

          <p className="text-2xl text-[#525254] font-light max-w-2xl mx-auto leading-relaxed">
            You understand the database schema. You built the routing table. You know why the button is on the top right. <em>The user knows none of these things.</em>
          </p>

          <div className="p-6 bg-white border border-[#E8E2D9] rounded-2xl max-w-xl mx-auto text-sm text-[#2D2D2E] text-left space-y-2 shadow-xs">
            <div className="font-bold text-[#D7492A]">The False Consensus Effect in Engineering:</div>
            <div>"Because this workflow makes intuitive sense to me, it will make sense to the people using it." — The most expensive lie in tech.</div>
          </div>
        </div>

        <div className="p-4 bg-white border border-[#E8E2D9] rounded-xl max-w-xl mx-auto text-xs font-mono text-[#6E6D70]">
          Entering Act 4: Experiencing Bad Design Firsthand
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 29: HIGH STAKES DISASTERS
  // --------------------------------------------------------------------------
  if (slide.id === 29) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-8 lg:p-14 bg-[#FAF9F6]">
        <div className="pb-4 border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D7492A]" />
            <span className="text-xs font-mono uppercase text-[#D7492A] tracking-wider font-bold">
              Act 4 · Safety-Critical HCI
            </span>
          </div>
          <span className="text-xs font-mono text-[#6E6D70]">Slide 29 / 44</span>
        </div>

        <div className="my-auto max-w-5xl mx-auto w-full space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-4xl lg:text-6xl font-serif-display font-medium text-[#2D2D2E]">
              When Bad Interaction Kills: High-Stakes Disasters
            </h2>
            <p className="text-xl text-[#6E6D70] max-w-3xl mx-auto">
              In consumer web apps, bad design costs revenue. In aviation, medicine, and nuclear energy, it costs lives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#E8E2D9] p-6 rounded-2xl space-y-3 shadow-xs">
              <span className="text-xs font-mono text-red-600 font-bold">1979 · THREE MILE ISLAND</span>
              <h4 className="text-xl font-serif-display font-bold text-[#2D2D2E]">Hidden Relief Valve</h4>
              <p className="text-xs text-[#525254] leading-relaxed">
                Light indicated valve switch was commanded shut, not that the valve was actually closed. The tag physically obscured the critical light.
              </p>
            </div>
            <div className="bg-white border border-[#E8E2D9] p-6 rounded-2xl space-y-3 shadow-xs">
              <span className="text-xs font-mono text-red-600 font-bold">2018 · HAWAII MISSILE ALERT</span>
              <h4 className="text-xl font-serif-display font-bold text-[#2D2D2E]">The Fatal Dropdown</h4>
              <p className="text-xs text-[#525254] leading-relaxed">
                "TEST_DRILL" was placed directly adjacent to "BALLISTIC_MISSILE_WARNING" in a plain text dropdown without confirmation guards.
              </p>
            </div>
            <div className="bg-[#FDF5F2] border-2 border-red-300 p-6 rounded-2xl space-y-3 shadow-sm">
              <span className="text-xs font-mono text-red-600 font-bold">2019 · BOEING 737 MAX</span>
              <h4 className="text-xl font-serif-display font-bold text-[#2D2D2E]">MCAS Sensor Discordance</h4>
              <p className="text-xs text-[#525254] leading-relaxed">
                Automated flight trim fought pilot commands based on a single faulty angle-of-attack vane without clear cockpit alert annunciators.
              </p>
            </div>
          </div>

          <div className="p-4 bg-white border border-[#E8E2D9] rounded-xl text-center text-sm text-[#2D2D2E]">
            None of these were "pilot negligence" or "operator stupidity"—they were predictable cognitive breakdowns induced by defective interaction design.
          </div>
        </div>

        <div className="text-center text-xs font-mono text-[#6E6D70]">
          Next: Act 5 — How we measure and evaluate usability scientifically
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 32: THE ISO 9241-11 FRAMEWORK
  // --------------------------------------------------------------------------
  if (slide.id === 32) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-8 lg:p-14 bg-[#FAF9F6]">
        <div className="pb-4 border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D7492A]" />
            <span className="text-xs font-mono uppercase text-[#D7492A] tracking-wider font-bold">
              Act 5 · International Standard
            </span>
          </div>
          <span className="text-xs font-mono text-[#6E6D70]">Slide 32 / 44</span>
        </div>

        <div className="my-auto max-w-5xl mx-auto w-full space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-4xl lg:text-6xl font-serif-display font-medium text-[#2D2D2E]">
              The ISO 9241-11 Usability Framework
            </h2>
            <p className="text-xl text-[#6E6D70] max-w-3xl mx-auto">
              Usability is not an opinion. It is defined internationally by three measurable pillars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#E8E2D9] p-8 rounded-2xl space-y-3 shadow-xs">
              <span className="text-xs font-mono text-[#D7492A] font-bold">PILLAR 1</span>
              <h3 className="text-2xl font-serif-display text-[#2D2D2E]">Effectiveness</h3>
              <p className="text-sm text-[#525254] leading-relaxed">
                Can the user achieve their goal with accuracy and completeness?
              </p>
              <div className="text-xs font-mono text-[#6E6D70] pt-2 border-t border-[#F0EBE3]">
                Metrics: Task completion rate (%), error count, catastrophic fail rate.
              </div>
            </div>

            <div className="bg-white border border-[#E8E2D9] p-8 rounded-2xl space-y-3 shadow-xs">
              <span className="text-xs font-mono text-[#D7492A] font-bold">PILLAR 2</span>
              <h3 className="text-2xl font-serif-display text-[#2D2D2E]">Efficiency</h3>
              <p className="text-sm text-[#525254] leading-relaxed">
                What resources (time, clicks, mental effort) were expended to achieve accuracy?
              </p>
              <div className="text-xs font-mono text-[#6E6D70] pt-2 border-t border-[#F0EBE3]">
                Metrics: Time-on-task (seconds), keystrokes, pupil dilation, glance duration.
              </div>
            </div>

            <div className="bg-[#FDF5F2] border-2 border-[#D7492A] p-8 rounded-2xl space-y-3 shadow-sm">
              <span className="text-xs font-mono text-[#D7492A] font-bold">PILLAR 3</span>
              <h3 className="text-2xl font-serif-display text-[#2D2D2E]">Satisfaction</h3>
              <p className="text-sm text-[#525254] leading-relaxed">
                Is the user comfortable, confident, and free from anxiety and frustration?
              </p>
              <div className="text-xs font-mono text-[#D7492A] font-bold pt-2 border-t border-[#F0D5CB]">
                Metrics: System Usability Scale (SUS), Net Promoter, Single Ease Question.
              </div>
            </div>
          </div>

          <div className="p-4 bg-white border border-[#E8E2D9] rounded-xl text-center text-sm text-[#2D2D2E]">
            A system can be 100% effective (you succeeded) while having 0% efficiency (it took 45 minutes of suffering).
          </div>
        </div>

        <div className="text-center text-xs font-mono text-[#6E6D70]">
          Next: Live test bench measuring these three pillars in real time
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 37: THE HCD LIFECYCLE (ISO 9241-210)
  // --------------------------------------------------------------------------
  if (slide.id === 37) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-8 lg:p-14 bg-[#FAF9F6]">
        <div className="pb-4 border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D7492A]" />
            <span className="text-xs font-mono uppercase text-[#D7492A] tracking-wider font-bold">
              Act 6 · The Engineering Process
            </span>
          </div>
          <span className="text-xs font-mono text-[#6E6D70]">Slide 37 / 44</span>
        </div>

        <div className="my-auto max-w-5xl mx-auto w-full space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-4xl lg:text-6xl font-serif-display font-medium text-[#2D2D2E]">
              Human-Centered Design (HCD)
            </h2>
            <p className="text-xl text-[#6E6D70] max-w-3xl mx-auto">
              The ISO 9241-210 Iterative Lifecycle: Software that adapts to humans through continuous evaluation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white border border-[#E8E2D9] p-6 rounded-2xl space-y-2 shadow-xs">
              <span className="text-xs font-mono text-[#D7492A] font-bold">STEP 01</span>
              <h4 className="text-lg font-serif-display font-bold text-[#2D2D2E]">Understand Context</h4>
              <p className="text-xs text-[#525254] leading-relaxed">
                Observe users in real environments. Who are they? What are their mental models? What are their sensory constraints?
              </p>
            </div>
            <div className="bg-white border border-[#E8E2D9] p-6 rounded-2xl space-y-2 shadow-xs">
              <span className="text-xs font-mono text-[#D7492A] font-bold">STEP 02</span>
              <h4 className="text-lg font-serif-display font-bold text-[#2D2D2E]">Specify Requirements</h4>
              <p className="text-xs text-[#525254] leading-relaxed">
                Translate human needs into measurable usability criteria (e.g. "Task must complete in &lt;15s by 95% of users").
              </p>
            </div>
            <div className="bg-white border border-[#E8E2D9] p-6 rounded-2xl space-y-2 shadow-xs">
              <span className="text-xs font-mono text-[#D7492A] font-bold">STEP 03</span>
              <h4 className="text-lg font-serif-display font-bold text-[#2D2D2E]">Produce Solutions</h4>
              <p className="text-xs text-[#525254] leading-relaxed">
                Build prototypes from low-fidelity wireframes to interactive code. Create multiple design alternatives.
              </p>
            </div>
            <div className="bg-[#FDF5F2] border-2 border-[#D7492A] p-6 rounded-2xl space-y-2 shadow-sm">
              <span className="text-xs font-mono text-[#D7492A] font-bold">STEP 04</span>
              <h4 className="text-lg font-serif-display font-bold text-[#2D2D2E]">Evaluate & Iterate</h4>
              <p className="text-xs text-[#525254] leading-relaxed">
                Put prototypes in front of real users. Measure task completion and errors. Iterate until criteria are satisfied.
              </p>
            </div>
          </div>

          <div className="p-4 bg-white border border-[#E8E2D9] rounded-xl text-center text-sm text-[#2D2D2E]">
            HCD is not a linear waterfall. You do not design once and ship. You fail fast in cheap prototypes.
          </div>
        </div>

        <div className="text-center text-xs font-mono text-[#6E6D70]">
          Next: Boehm’s law and the economic cost of fixing flaws early
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 38: BOEHM'S CURVE
  // --------------------------------------------------------------------------
  if (slide.id === 38) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-8 lg:p-14 bg-[#FAF9F6]">
        <div className="pb-4 border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D7492A]" />
            <span className="text-xs font-mono uppercase text-[#D7492A] tracking-wider font-bold">
              Act 6 · The Business Case
            </span>
          </div>
          <span className="text-xs font-mono text-[#6E6D70]">Slide 38 / 44</span>
        </div>

        <div className="my-auto max-w-5xl mx-auto w-full space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-4xl lg:text-6xl font-serif-display font-medium text-[#2D2D2E]">
              Boehm’s Law: The Exponential Cost of Flaws
            </h2>
            <p className="text-xl text-[#6E6D70] max-w-3xl mx-auto">
              Fixing an interaction flaw: $1 on paper, $10 in code, $100 after deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-3">
              <span className="text-4xl font-mono font-bold text-emerald-700">1x ($1)</span>
              <div className="text-xs font-mono uppercase font-bold text-emerald-800">Discovery & Sketching</div>
              <p className="text-xs text-[#525254]">Erasing a whiteboard wireframe takes 5 seconds and costs nothing.</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 p-8 rounded-2xl text-center space-y-3">
              <span className="text-5xl font-mono font-bold text-amber-700">10x ($10)</span>
              <div className="text-xs font-mono uppercase font-bold text-amber-800">During Code Implementation</div>
              <p className="text-xs text-[#525254]">Refactoring React components and state stores takes days of developer time.</p>
            </div>
            <div className="bg-red-50 border-2 border-red-300 p-10 rounded-2xl text-center space-y-3">
              <span className="text-6xl font-mono font-bold text-red-600">100x+ ($100+)</span>
              <div className="text-xs font-mono uppercase font-bold text-red-800">After Production Release</div>
              <p className="text-xs text-[#525254]">Database migrations, customer support calls, user churn, and brand erosion.</p>
            </div>
          </div>

          <div className="p-4 bg-white border border-[#E8E2D9] rounded-xl text-center text-sm text-[#2D2D2E]">
            HCI is not an artistic indulgence. It is corporate risk management.
          </div>
        </div>

        <div className="text-center text-xs font-mono text-[#6E6D70]">
          Next: The full 12-session curriculum architecture
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 39: THE 12-SESSION ROADMAP (Interactive Session Inspector)
  // --------------------------------------------------------------------------
  if (slide.id === 39) {
    const sessions = [
      { num: 1, name: 'HCI Foundations', desc: 'Mental models, paradox, interaction loop' },
      { num: 2, name: 'The Human Machine', desc: 'Perception, visual fovea, memory decay' },
      { num: 3, name: 'User Research', desc: 'Contextual inquiry, think-aloud protocols' },
      { num: 4, name: 'Requirements', desc: 'Personas, journeys, empathy maps' },
      { num: 5, name: 'Info Architecture', desc: 'Card sorting, hierarchies, navigation' },
      { num: 6, name: 'Interaction Design', desc: 'Norman principles, direct manipulation' },
      { num: 7, name: 'UI Design Systems', desc: 'Typography, 8pt grid, contrast' },
      { num: 8, name: 'Rapid Prototyping', desc: 'Paper to Figma interactive states' },
      { num: 9, name: 'Lab Usability Test', desc: 'SUS scores, time telemetry, statistics' },
      { num: 10, name: 'Accessibility & Ethics', desc: 'WCAG 2.2, dark patterns, dignity' },
      { num: 11, name: 'Emerging Tech', desc: 'Spatial UI, multimodal, haptics' },
      { num: 12, name: 'Capstone Defenses', desc: 'Final exams & empirical presentations' },
    ];

    return (
      <div className="w-full h-full flex flex-col justify-between p-8 lg:p-14 bg-[#FAF9F6]">
        <div className="pb-4 border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D7492A]" />
            <span className="text-xs font-mono uppercase text-[#D7492A] tracking-wider font-bold">
              Act 6 · The Curriculum Architecture
            </span>
          </div>
          <span className="text-xs font-mono text-[#6E6D70]">Slide 39 / 44</span>
        </div>

        <div className="my-auto max-w-5xl mx-auto w-full space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl lg:text-5xl font-serif-display font-medium text-[#2D2D2E]">
              The 12-Session Curriculum Architecture
            </h2>
            <p className="text-lg text-[#6E6D70] max-w-2xl mx-auto">
              From cognitive biology to high-fidelity evaluated systems. 48 total academic hours.
            </p>
          </div>

          {/* Interactive 12-Session Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {sessions.map(s => {
              const isSelected = selectedRoadmapSession === s.num;
              const isCurrent = s.num === 1;

              return (
                <div
                  key={s.num}
                  onClick={() => setSelectedRoadmapSession(s.num)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    isCurrent
                      ? 'border-2 border-[#D7492A] bg-[#FDF5F2] shadow-xs'
                      : isSelected
                      ? 'border-[#D7492A] bg-white shadow-xs'
                      : 'border-[#E8E2D9] bg-white hover:border-[#C5BFB7]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-1">
                    <span className={isCurrent ? 'text-[#D7492A]' : 'text-[#6E6D70]'}>S{s.num.toString().padStart(2, '0')}</span>
                    {isCurrent && <span className="bg-[#D7492A] text-white px-1 rounded text-[9px]">NOW</span>}
                  </div>
                  <div className="text-xs font-bold text-[#2D2D2E] truncate font-serif-display">{s.name}</div>
                  <div className="text-[10px] text-[#6E6D70] line-clamp-2 mt-0.5">{s.desc}</div>
                </div>
              );
            })}
          </div>

          {/* Selected Session Detail Card */}
          <div className="p-4 bg-white border border-[#E8E2D9] rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-[#D7492A] font-bold">
                Session {selectedRoadmapSession}: {sessions.find(s => s.num === selectedRoadmapSession)?.name}
              </span>
              <p className="text-xs text-[#525254] mt-0.5">
                {sessions.find(s => s.num === selectedRoadmapSession)?.desc} · 4 Hours Interactive Lecture & Studio Lab.
              </p>
            </div>
            <span className="text-xs font-mono text-[#6E6D70]">Click any session node to preview</span>
          </div>
        </div>

        <div className="text-center text-xs font-mono text-[#6E6D70]">
          Next: The semester capstone project
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 40: THE SEMESTER CAPSTONE PROJECT
  // --------------------------------------------------------------------------
  if (slide.id === 40) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-8 lg:p-14 bg-[#FAF9F6]">
        <div className="pb-4 border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D7492A]" />
            <span className="text-xs font-mono uppercase text-[#D7492A] tracking-wider font-bold">
              Act 6 · Project Brief
            </span>
          </div>
          <span className="text-xs font-mono text-[#6E6D70]">Slide 40 / 44</span>
        </div>

        <div className="my-auto max-w-5xl mx-auto w-full space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-4xl lg:text-6xl font-serif-display font-medium text-[#2D2D2E]">
              The Semester Capstone Project
            </h2>
            <p className="text-xl text-[#6E6D70] max-w-3xl mx-auto">
              You will not just study HCI theory; you will engineer and evaluate a real interactive system.
            </p>
          </div>

          {/* 4 Pillars of the Semester Project */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-[#E8E2D9] p-6 rounded-2xl space-y-2 shadow-xs">
              <span className="text-xs font-mono text-[#D7492A] font-bold">PHASE 1</span>
              <h4 className="text-lg font-serif-display font-bold text-[#2D2D2E]">Discovery & Needs</h4>
              <p className="text-xs text-[#525254] leading-relaxed">
                Conduct ethnographic user interviews, observe field contexts, synthesize personas and user journey maps.
              </p>
            </div>

            <div className="bg-white border border-[#E8E2D9] p-6 rounded-2xl space-y-2 shadow-xs">
              <span className="text-xs font-mono text-[#D7492A] font-bold">PHASE 2</span>
              <h4 className="text-lg font-serif-display font-bold text-[#2D2D2E]">Architecture</h4>
              <p className="text-xs text-[#525254] leading-relaxed">
                Information architecture, mental model alignment, paper prototyping, low-fidelity wireframing.
              </p>
            </div>

            <div className="bg-white border border-[#E8E2D9] p-6 rounded-2xl space-y-2 shadow-xs">
              <span className="text-xs font-mono text-[#D7492A] font-bold">PHASE 3</span>
              <h4 className="text-lg font-serif-display font-bold text-[#2D2D2E]">Interactive Build</h4>
              <p className="text-xs text-[#525254] leading-relaxed">
                High-fidelity responsive interface, component design system, rich feedback loops, micro-interactions.
              </p>
            </div>

            <div className="bg-[#FDF5F2] border-2 border-[#D7492A] p-6 rounded-2xl space-y-2 shadow-sm">
              <span className="text-xs font-mono text-[#D7492A] font-bold">PHASE 4</span>
              <h4 className="text-lg font-serif-display font-bold text-[#2D2D2E]">Lab Evaluation</h4>
              <p className="text-xs text-[#525254] leading-relaxed">
                Empirical usability testing with 5 real users, time-on-task telemetry, SUS scoring, iterative redesign.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center text-xs font-mono text-[#6E6D70]">
          Teams of 3 to 4 students · Project topics announced in Session 3
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 43: GRAND TAKEAWAY OF SESSION 1
  // --------------------------------------------------------------------------
  if (slide.id === 43) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-8 lg:p-14 bg-[#FAF9F6]">
        <div className="pb-4 border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D7492A]" />
            <span className="text-xs font-mono uppercase text-[#D7492A] tracking-wider font-bold">
              Session 1 Synthesis
            </span>
          </div>
          <span className="text-xs font-mono text-[#6E6D70]">Slide 43 / 44</span>
        </div>

        <div className="my-auto max-w-5xl mx-auto w-full space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-4xl lg:text-6xl font-serif-display font-medium text-[#2D2D2E]">
              The Three Golden Axioms of Session 1
            </h2>
            <p className="text-xl text-[#6E6D70] max-w-2xl mx-auto">
              Carry these three principles into every design review and engineering team meeting.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-6 bg-white border border-[#E8E2D9] rounded-2xl flex items-start gap-5 shadow-xs">
              <span className="text-3xl font-serif-display font-bold text-[#D7492A]">01</span>
              <div>
                <h3 className="text-2xl font-serif-display font-bold text-[#2D2D2E]">You Are Not The User</h3>
                <p className="text-base text-[#525254] mt-1 leading-relaxed">
                  You know how the database works; the user does not. Never assume your mental model matches theirs.
                </p>
              </div>
            </div>

            <div className="p-6 bg-white border border-[#E8E2D9] rounded-2xl flex items-start gap-5 shadow-xs">
              <span className="text-3xl font-serif-display font-bold text-[#D7492A]">02</span>
              <div>
                <h3 className="text-2xl font-serif-display font-bold text-[#2D2D2E]">Functionality ≠ Usability</h3>
                <p className="text-base text-[#525254] mt-1 leading-relaxed">
                  Functionality is what the computer can compute; usability is what the human successfully achieves.
                </p>
              </div>
            </div>

            <div className="p-6 bg-white border border-[#E8E2D9] rounded-2xl flex items-start gap-5 shadow-xs">
              <span className="text-3xl font-serif-display font-bold text-[#D7492A]">03</span>
              <div>
                <h3 className="text-2xl font-serif-display font-bold text-[#2D2D2E]">Usability is Observable, Measurable Science</h3>
                <p className="text-base text-[#525254] mt-1 leading-relaxed">
                  We don't argue personal tastes. We measure task completion, duration, errors, and cognitive load.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-xs font-mono text-[#6E6D70]">
          Next: Looking ahead to Session 2
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 44: LOOKING AHEAD TO SESSION 2
  // --------------------------------------------------------------------------
  if (slide.id === 44) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-8 lg:p-14 bg-[#FAF9F6] text-center">
        <div className="pb-4 border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D7492A]" />
            <span className="text-xs font-mono uppercase text-[#D7492A] tracking-wider font-bold">
              Conclusion & Next Week
            </span>
          </div>
          <span className="text-xs font-mono text-[#6E6D70]">Slide 44 / 44</span>
        </div>

        <div className="my-auto max-w-4xl mx-auto space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#FDF5F2] border-2 border-[#D7492A] flex items-center justify-center mx-auto text-[#D7492A] shadow-sm">
            <Brain className="w-10 h-10" />
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D7492A] font-bold">
              Previewing Session 2 · Next Monday 09:00
            </span>
            <h2 className="text-5xl lg:text-7xl font-serif-display font-medium text-[#2D2D2E]">
              The Human
            </h2>
            <p className="text-2xl text-[#525254] font-light">
              Perception · Attention · Memory · Mental Models · Cognition
            </p>
          </div>

          <p className="text-base text-[#6E6D70] max-w-xl mx-auto leading-relaxed">
            We will dissect the biological machine: visual foveation, optical illusions, Gestalt grouping laws, and why human working memory fails at 4 items.
          </p>

          <div className="p-5 bg-white border border-[#E8E2D9] rounded-2xl max-w-md mx-auto text-xs text-[#6E6D70] space-y-1 shadow-xs">
            <div className="text-[#2D2D2E] font-bold text-sm">Preparation Assignment:</div>
            <div>Read Chapter 1 & 2 of Don Norman’s <em>The Design of Everyday Things</em>.</div>
          </div>
        </div>

        <div className="text-center text-xs font-mono text-[#6E6D70]">
          Thank you for Session 1 · Questions & Discussion Open at Lectern
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // GENERIC HIGH-IMPACT INDUSTRIAL RENDERER FOR ANY OTHER SLIDES
  // Fully fills the 16:9 canvas with large typography, key points cards, and activity prompts
  // --------------------------------------------------------------------------
  return (
    <div className="w-full h-full flex flex-col justify-between p-8 lg:p-14 bg-[#FAF9F6]">
      {/* Header Bar */}
      <div className="pb-4 border-b border-[#E8E2D9] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D7492A]" />
          <span className="text-xs font-mono uppercase text-[#D7492A] tracking-wider font-bold">
            {slide.actTitle}
          </span>
        </div>
        <span className="text-xs font-mono text-[#6E6D70]">Slide {slide.id} / 44</span>
      </div>

      {/* Main Slide Body */}
      <div className="my-auto max-w-5xl mx-auto w-full space-y-8">
        <div className="space-y-3">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif-display font-medium text-[#2D2D2E] leading-tight text-balance">
            {slide.title}
          </h2>
          {slide.subtitle && (
            <p className="text-xl sm:text-2xl text-[#525254] font-light leading-relaxed max-w-3xl">
              {slide.subtitle}
            </p>
          )}
        </div>

        {/* Structured Key Points or Core Content from Speaker Notes / Pedagogy */}
        {slide.speakerNotes?.keyPoints && slide.speakerNotes.keyPoints.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {slide.speakerNotes.keyPoints.slice(0, 3).map((point, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E8E2D9] p-6 rounded-2xl space-y-3 shadow-xs hover:border-[#D7492A]/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#D7492A] font-bold">INSIGHT 0{idx + 1}</span>
                  <span className="w-2 h-2 rounded-full bg-[#D7492A]/30" />
                </div>
                <p className="text-base text-[#2D2D2E] font-medium leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Activity Banner if slide has an interactive task */}
        {slide.activity && (
          <div className="p-8 bg-white border-2 border-[#D7492A] rounded-2xl space-y-4 shadow-sm">
            <div className="flex items-center justify-between text-xs font-mono text-[#D7492A] uppercase font-bold">
              <span>Classroom Activity: {slide.activity.type}</span>
              <span>{slide.activity.durationSec}s Duration</span>
            </div>
            <h4 className="text-2xl font-serif-display font-medium text-[#2D2D2E]">{slide.activity.question}</h4>
            <ul className="space-y-2 text-sm text-[#525254] pt-2">
              {slide.activity.instructions.map((inst, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-[#D7492A] font-mono font-bold">▸</span>
                  <span>{inst}</span>
                </li>
              ))}
            </ul>
            {onOpenTimer && (
              <button
                onClick={() => onOpenTimer(slide.activity!.durationSec, `${slide.activity!.type} Timer`)}
                className="mt-3 px-6 py-2.5 bg-[#D7492A] hover:bg-[#B83519] text-white text-xs font-bold rounded-xl transition-colors shadow cursor-pointer"
              >
                Launch Activity Timer ({slide.activity.durationSec}s)
              </button>
            )}
          </div>
        )}
      </div>

      {/* Institutional Slide Footer */}
      <div className="text-center text-xs font-mono text-[#6E6D70] pt-4 border-t border-[#E8E2D9]">
        Mohammed VI Polytechnic University · School of Computer Science · HCI Course
      </div>
    </div>
  );
};
