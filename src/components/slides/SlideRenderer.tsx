import React, { useState, useEffect } from 'react';
import {
  Brain,
  Cpu,
  RefreshCw,
  Users,
  Eye,
  EyeOff,
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
  Monitor,
  Smartphone,
  Watch,
  Wifi,
  Hand,
  Lock,
  Unlock,
  Terminal,
  ShieldCheck,
  Zap,
  Coffee,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Flame,
  CheckCheck,
  Database,
  Sun,
  Car,
  SlidersHorizontal,
  Languages,
  BarChart3,
  PieChart,
  TrendingUp,
  GitBranch,
  Search,
  FileText,
  Binary,
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
  const [interactiveLoopStep, setInteractiveLoopStep] = useState<number>(0);

  // Slide 7 (Norman Door Simulator) State
  const [doorScenario, setDoorScenario] = useState<'flawed' | 'natural'>('flawed');
  const [normanDoorAction, setNormanDoorAction] = useState<'idle' | 'pulled' | 'pushed'>('idle');
  const [naturalDoorAction, setNaturalDoorAction] = useState<'idle' | 'pushed' | 'pulled'>('idle');
  const [isDoorShaking, setIsDoorShaking] = useState<boolean>(false);

  // Slide 10 (What is the "Computer"?) State
  const [computerEra, setComputerEra] = useState<number>(0);
  const [cliOutput, setCliOutput] = useState<string>('root@oncf-vax:~# query_trains --dep="CASA" --arr="BGX"\n[OK] 2 EXPRESS TRAINS ACTIVE (104, 108)\nSTATUS: READY');
  const [phoneThumbZone, setPhoneThumbZone] = useState<boolean>(false);
  const [phoneSeatPicked, setPhoneSeatPicked] = useState<boolean>(false);
  const [watchNotification, setWatchNotification] = useState<string>('Train 104 · Gate 2 · In 8m');
  const [iotSensorMetric, setIotSensorMetric] = useState<'soil' | 'solar' | 'mesh'>('soil');

  // Slide 11 (What is the "Human"?) State
  const [fovealIndex, setFovealIndex] = useState<number>(2);
  const [workingMemory, setWorkingMemory] = useState<string[]>([
    'Al Boraq 104',
    'Seat 14A',
    'Platform 3',
  ]);
  const [memoryOverflow, setMemoryOverflow] = useState<boolean>(false);
  const [fittsTargetType, setFittsTargetType] = useState<'small' | 'large'>('small');
  const [fittsAcquisitionTime, setFittsAcquisitionTime] = useState<number | null>(null);
  const [fittsTestActive, setFittsTestActive] = useState<boolean>(false);
  const [fittsStartTime, setFittsStartTime] = useState<number>(0);

  // Slide 13 (The Interaction Loop) State
  const [loopScenario, setLoopScenario] = useState<'train' | 'projector' | 'pump'>('train');

  // Slide 15 (The Twin Gulfs Live Diagnostic) State
  const [twinGulfTab, setTwinGulfTab] = useState<'framework' | 'intuition'>('framework');
  const [flawedAcHex, setFlawedAcHex] = useState<string>('REG: 0x4B_RAW');
  const [flawedAcStatus, setFlawedAcStatus] = useState<string>('STANDBY (UNACK)');
  const [flawedClicksCount, setFlawedClicksCount] = useState<number>(0);
  const [flawedIsDelayed, setFlawedIsDelayed] = useState<boolean>(false);
  const [intuitiveAcTemp, setIntuitiveAcTemp] = useState<number>(24);
  const [intuitiveAcActive, setIntuitiveAcActive] = useState<boolean>(false);
  const [intuitiveFeedbackPulse, setIntuitiveFeedbackPulse] = useState<boolean>(false);

  // Slide 17 (Interactive Coffee Distributor & 2-Minute Activity Timer) State
  const [coffeeDrink, setCoffeeDrink] = useState<'espresso' | 'latte' | 'cappuccino' | 'tea'>('espresso');
  const [coffeeSugar, setCoffeeSugar] = useState<number>(1);
  const [coffeeMilk, setCoffeeMilk] = useState<'none' | 'whole' | 'oat'>('none');
  const [coffeeCupPlaced, setCoffeeCupPlaced] = useState<boolean>(true);
  const [coffeePaymentMethod, setCoffeePaymentMethod] = useState<'badge' | 'coin' | 'apple_pay'>('badge');
  const [coffeeState, setCoffeeState] = useState<'idle' | 'brewing' | 'dispensed' | 'error_nocup'>('idle');
  const [coffeeBrewProgress, setCoffeeBrewProgress] = useState<number>(0);
  const [coffeeTimerSec, setCoffeeTimerSec] = useState<number>(120);
  const [coffeeTimerRunning, setCoffeeTimerRunning] = useState<boolean>(false);
  const [showCoffeeDiscussionGuide, setShowCoffeeDiscussionGuide] = useState<boolean>(false);

  // Slide 19 (The Fallacy of the "Average User") State
  const [slide19CockpitMode, setSlide19CockpitMode] = useState<'fixed' | 'adjustable'>('fixed');

  // Slide 20 (Dimensions of User Diversity) State
  const [slide20ActiveAxis, setSlide20ActiveAxis] = useState<number>(0);
  const [slide20SimValue, setSlide20SimValue] = useState<number>(50);

  // Slide 21 (User Diversity Simulation Lab: Bad vs Good Design) State
  const [slide21LabAxis, setSlide21LabAxis] = useState<number>(0);
  const [slide21ExpPersona, setSlide21ExpPersona] = useState<'novice' | 'power'>('novice');
  const [slide21ExpBadError, setSlide21ExpBadError] = useState<string | null>(null);
  const [slide21ExpGoodSelected, setSlide21ExpGoodSelected] = useState<string>('AgTech Robotics Lab');
  const [slide21ExpGoodBooked, setSlide21ExpGoodBooked] = useState<boolean>(false);

  const [slide21MotorState, setSlide21MotorState] = useState<'steady' | 'tremor' | 'transit'>('steady');
  const [slide21MotorMistaps, setSlide21MotorMistaps] = useState<number>(0);
  const [slide21MotorBadTriggered, setSlide21MotorBadTriggered] = useState<boolean>(false);
  const [slide21MotorGoodConfirmed, setSlide21MotorGoodConfirmed] = useState<boolean>(false);

  const [slide21SensoryFilter, setSlide21SensoryFilter] = useState<'normal' | 'colorblind' | 'desert_glare'>('normal');
  const [slide21SensoryBadClick, setSlide21SensoryBadClick] = useState<boolean>(false);
  const [slide21SensoryGoodClick, setSlide21SensoryGoodClick] = useState<boolean>(false);

  const [slide21CognitiveStress, setSlide21CognitiveStress] = useState<'calm' | 'rush'>('calm');
  const [slide21CognitiveBadStep, setSlide21CognitiveBadStep] = useState<number>(1);
  const [slide21CognitiveBadCode, setSlide21CognitiveBadCode] = useState<string>('');
  const [slide21CognitiveBadFailed, setSlide21CognitiveBadFailed] = useState<boolean>(false);
  const [slide21CognitiveGoodCopied, setSlide21CognitiveGoodCopied] = useState<boolean>(false);

  const [slide21CultureLang, setSlide21CultureLang] = useState<'en' | 'ar' | 'fr'>('en');

  // Slide 22 (The Action Hierarchy: Goals vs Tasks vs Actions) State
  const [slide22Scenario, setSlide22Scenario] = useState<'enrollment' | 'payment' | 'medical'>('enrollment');

  // Slide 23 (Why Engineers Confuse Tasks with Goals) Interactive Interface State
  const [slide23View, setSlide23View] = useState<'compare' | 'crud' | 'goal'>('compare');
  const [slide23BadSubmitted, setSlide23BadSubmitted] = useState<boolean>(false);
  const [slide23GoodReserved, setSlide23GoodReserved] = useState<boolean>(false);
  const [slide23GoodRoom, setSlide23GoodRoom] = useState<string>('Green Tech Hub · Room 204');

  // Slide 24 (Context of Use) State
  const [slide24ContextMode, setSlide24ContextMode] = useState<'nominal' | 'sunlight' | 'vibration' | 'stress'>('nominal');

  // Slide 27 (The Anatomy of Frustration) State
  const [slide27Cause, setSlide27Cause] = useState<number>(0);
  const [slide27CurveStep, setSlide27CurveStep] = useState<number>(1);

  // Slide 29 (Forensic Autopsy: 6 Design Crimes) State
  const [slide29Crime, setSlide29Crime] = useState<number>(0);

  // Slide 31 (Act 4 Takeaway: Bad Design Induces Cognitive Failure) State
  const [slide31Pillar, setSlide31Pillar] = useState<number>(0);

  // Slide 32 (Beyond Taste: Usability as Empirical Science) State
  const [slide32ReviewMode, setSlide32ReviewMode] = useState<'subjective' | 'empirical'>('empirical');

  // Slide 35 (Quantitative Data vs Qualitative Insight) State
  const [slide35Tab, setSlide35Tab] = useState<'quant' | 'qual' | 'triangulation'>('triangulation');
  const [slide35ActiveStep, setSlide35ActiveStep] = useState<number>(2);

  // Slide 36 (Formative vs Summative Evaluation) State
  const [slide36Mode, setSlide36Mode] = useState<'formative' | 'summative'>('formative');
  const [slide36TimelinePhase, setSlide36TimelinePhase] = useState<number>(1);

  // Slide 37 (Act 5 Takeaway: Usability is Optimizable Engineering) State
  const [slide37UsersCount, setSlide37UsersCount] = useState<number>(5);

  // Timer Effect for Slide 17
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (coffeeTimerRunning && coffeeTimerSec > 0) {
      interval = setInterval(() => {
        setCoffeeTimerSec(prev => {
          if (prev <= 1) {
            setCoffeeTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [coffeeTimerRunning, coffeeTimerSec]);

  // Coffee Brewing Effect
  useEffect(() => {
    let brewInterval: ReturnType<typeof setInterval> | null = null;
    if (coffeeState === 'brewing') {
      brewInterval = setInterval(() => {
        setCoffeeBrewProgress(prev => {
          if (prev >= 100) {
            setCoffeeState('dispensed');
            return 100;
          }
          return prev + 15;
        });
      }, 350);
    }
    return () => {
      if (brewInterval) clearInterval(brewInterval);
    };
  }, [coffeeState]);

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
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 lg:p-14 xl:p-16 bg-[#FAF9F6] relative overflow-hidden">
        {/* Subtle Moroccan Architectural Terracotta Motif Accent */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#E5391C]/5 pointer-events-none blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#1F2421]/5 pointer-events-none blur-3xl" />

        {/* Academic Institutional Header with Official UM6P Logo */}
        <div className="flex items-center justify-between pb-6 border-b border-[#E8E2D9] flex-shrink-0">
          <UM6PLogo variant="full" theme="color" className="h-10 lg:h-12" />

          <div className="text-right font-mono text-xs sm:text-sm text-[#6E6D70]">
            <span className="font-bold text-[#E5391C]">SESSION 01</span>
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
            Understanding the interaction between people and technology.
          </p>

          <div className="pt-4 flex items-center gap-6">
            <button
              onClick={onNextSlide}
              className="px-8 lg:px-12 py-4 lg:py-5 bg-[#E5391C] hover:bg-[#C92B10] text-white font-semibold text-lg lg:text-xl rounded-xl transition-all shadow-md flex items-center gap-3 group cursor-pointer active:scale-98"
            >
              <span>Begin Session 1</span>
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
  // SLIDE 2: THE EVERYDAY PARADOX
  // --------------------------------------------------------------------------
  if (slide.id === 2) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-12 xl:p-14 bg-[#FAF9F6]">
        <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-6 lg:h-7 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 1 · The Starting Experience
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 2 / 45</span>
        </div>

        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-4 lg:py-6 gap-6">
          <div className="space-y-3 text-center flex-shrink-0">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] text-balance">
              The Everyday Paradox
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light max-w-4xl mx-auto">
              Technology has never been more mathematically powerful. Yet everyday interactions constantly break down.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 flex-1 items-stretch">
            {/* The Machine Capabilities */}
            <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 xl:p-10 rounded-2xl shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-emerald-700 mb-4 pb-2 border-b border-emerald-100">
                  <Cpu className="w-8 h-8 lg:w-10 lg:h-10 text-emerald-600" />
                  <span className="text-sm lg:text-base font-mono uppercase tracking-widest font-bold">
                    What The Computer Does
                  </span>
                </div>
                <ul className="space-y-4 lg:space-y-5 text-lg sm:text-xl lg:text-2xl text-[#2D2D2E]">
                  <li className="flex items-start gap-4">
                    <span className="text-emerald-600 font-mono font-bold text-2xl lg:text-3xl shrink-0">✓</span>
                    <span>Executes 3.2 billion floating-point operations per second</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-emerald-600 font-mono font-bold text-2xl lg:text-3xl shrink-0">✓</span>
                    <span>Transmits gigabytes across trans-continental optical fiber in 14ms</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-emerald-600 font-mono font-bold text-2xl lg:text-3xl shrink-0">✓</span>
                    <span>Queries 100 million relational records without a single syntax error</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-emerald-600 font-mono font-bold text-2xl lg:text-3xl shrink-0">✓</span>
                    <span>Operates continuously with zero biological fatigue or cognitive decay</span>
                  </li>
                </ul>
              </div>
              <div className="text-base sm:text-lg lg:text-xl font-mono text-emerald-900 bg-emerald-50 px-5 py-3.5 rounded-xl mt-6 border border-emerald-200 font-bold flex items-center gap-3 shadow-xs">
                <span className="w-3 h-3 rounded-full bg-emerald-600 shrink-0" />
                <span>Machine Capability: Flawless Precision & Infinite Scale</span>
              </div>
            </div>

            {/* The Human Experience */}
            <div className="bg-[#FDF5F2] border border-[#F0D5CB] p-6 lg:p-8 xl:p-10 rounded-2xl shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-[#E5391C] mb-4 pb-2 border-b border-[#FAD6CF]">
                  <AlertTriangle className="w-8 h-8 lg:w-10 lg:h-10 text-[#E5391C]" />
                  <span className="text-sm lg:text-base font-mono uppercase tracking-widest font-bold">
                    What The Human Feels
                  </span>
                </div>
                <ul className="space-y-4 lg:space-y-5 text-lg sm:text-xl lg:text-2xl text-[#2D2D2E]">
                  <li className="flex items-start gap-4">
                    <span className="text-[#E5391C] font-mono font-bold text-2xl lg:text-3xl shrink-0">✗</span>
                    <span>"Why won't this file upload? What does error code 0x8F mean?"</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-[#E5391C] font-mono font-bold text-2xl lg:text-3xl shrink-0">✗</span>
                    <span>"Did my payment go through, or should I click the button again?"</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-[#E5391C] font-mono font-bold text-2xl lg:text-3xl shrink-0">✗</span>
                    <span>"I accidentally deleted my document because the confirmation was confusing."</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-[#E5391C] font-mono font-bold text-2xl lg:text-3xl shrink-0">✗</span>
                    <span>"Is this my fault? Why do I feel frustrated using everyday software?"</span>
                  </li>
                </ul>
              </div>
              <div className="text-base sm:text-lg lg:text-xl font-mono text-[#E5391C] bg-white px-5 py-3.5 rounded-xl mt-6 border border-[#FAD6CF] font-bold flex items-center gap-3 shadow-xs">
                <span className="w-3 h-3 rounded-full bg-[#E5391C] shrink-0" />
                <span>Human Experience: Cognitive Friction, Hesitation & Self-Blame</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 lg:p-5 bg-white border border-[#E8E2D9] rounded-2xl text-center text-base sm:text-lg lg:text-xl font-serif-display font-medium text-[#2D2D2E] shadow-xs flex-shrink-0">
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
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-12 xl:p-14 bg-[#FAF9F6]">
        <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-6 lg:h-7 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 1 · Classroom Prediction
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 3 / 45</span>
        </div>

        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-4 lg:py-6 gap-6">
          <div className="p-8 lg:p-10 xl:p-12 bg-white border-2 border-[#E5391C] rounded-2xl text-center space-y-5 shadow-sm">
            <span className="text-xs sm:text-sm lg:text-base font-mono uppercase tracking-widest text-[#E5391C] font-bold">
              Classroom Activity · Think — 30 Seconds
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif-display font-medium text-[#2D2D2E]">
              Which Interface Will Be Faster and Less Error-Prone?
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-[#525254] max-w-3xl mx-auto leading-relaxed">
              In a moment, we will test both live on the screen. Both connect to the exact same Moroccan railway database.
            </p>

            {onOpenTimer && (
              <button
                onClick={() => onOpenTimer(30, 'Classroom Prediction (30s)')}
                className="mt-2 px-8 py-3.5 bg-[#E5391C] hover:bg-[#C92B10] text-white text-sm sm:text-base font-bold rounded-xl transition-colors shadow cursor-pointer active:scale-98"
              >
                Launch 30s Countdown
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 items-stretch">
            <div className="p-6 lg:p-8 xl:p-10 bg-white border border-[#E8E2D9] rounded-2xl flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <strong className="text-[#2D2D2E] block text-xl sm:text-2xl lg:text-3xl font-serif-display font-semibold">
                  System A: Database-Direct Terminal
                </strong>
                <p className="text-[#525254] text-lg sm:text-xl lg:text-2xl leading-relaxed">
                  Exposes database foreign keys, strict ISO-8601 timestamps, and raw seating matrix codes directly onto the operator.
                </p>
                <ul className="space-y-2 text-base sm:text-lg text-[#6E6D70] font-mono">
                  <li>• Requires exact memory of database node codes (DEP_CASAVOY_101)</li>
                  <li>• Rejects non-conformant timestamps with unhandled SQL exceptions</li>
                </ul>
              </div>
              <div className="text-base sm:text-lg font-mono text-[#2D2D2E] bg-[#FAF9F6] px-4 py-3 rounded-xl mt-4 border border-[#E8E2D9] font-bold flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6E6D70] shrink-0" />
                <span>Architectural Paradigm: Machine Memory Exposure</span>
              </div>
            </div>

            <div className="p-6 lg:p-8 xl:p-10 bg-[#FDF5F2] border-2 border-[#E5391C] rounded-2xl flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <strong className="text-[#E5391C] block text-xl sm:text-2xl lg:text-3xl font-serif-display font-semibold">
                  System B: Human-Centered Express
                </strong>
                <p className="text-[#525254] text-lg sm:text-xl lg:text-2xl leading-relaxed">
                  Translates human travel intent into machine calls: natural city names, 1-click day schedules, and visual coach seating.
                </p>
                <ul className="space-y-2 text-base sm:text-lg text-[#E5391C] font-mono">
                  <li>• Recognizes natural city names and computes required API payloads</li>
                  <li>• Zero cognitive recall demanded; immediate visual confirmation</li>
                </ul>
              </div>
              <div className="text-base sm:text-lg font-mono text-[#E5391C] bg-white px-4 py-3 rounded-xl mt-4 border border-[#FAD6CF] font-bold flex items-center gap-2.5 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5391C] shrink-0" />
                <span>Architectural Paradigm: Mental Model Alignment</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
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
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-12 xl:p-14 bg-[#FAF9F6]">
        <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-6 lg:h-7 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 1 · Experimental Debrief
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 5 / 45</span>
        </div>

        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-4 lg:py-6 gap-6">
          <div className="space-y-3 text-center flex-shrink-0">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E]">
              Why Did System A Fail the User?
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl text-[#6E6D70] max-w-4xl mx-auto">
              Both systems wrote a valid transaction to the database. Yet one induced severe cognitive failure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 flex-1 items-stretch">
            {/* The System Perspective */}
            <div className="bg-white border border-[#E8E2D9] rounded-2xl p-6 lg:p-8 xl:p-10 flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE3]">
                  <h3 className="font-bold text-[#2D2D2E] text-2xl sm:text-3xl font-serif-display">
                    The System Perspective
                  </h3>
                  <span className="text-xs sm:text-sm font-mono text-[#6E6D70] bg-[#F5F2ED] px-3 py-1 rounded-full font-bold">
                    Backend Metrics: 100% PASS
                  </span>
                </div>

                <p className="text-lg sm:text-xl lg:text-2xl text-[#525254] leading-relaxed">
                  The backend engineers report: <em>"The API responded with HTTP 200 OK. The primary key was committed. The software performed flawlessly."</em>
                </p>

                {/* Structured Analytical Dimensions */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-start gap-3 text-base sm:text-lg text-[#2D2D2E]">
                    <span className="text-emerald-600 font-mono font-bold shrink-0">▸</span>
                    <span><strong>Optimization Metric:</strong> Database normalization, query latency, ACID transaction guarantees.</span>
                  </div>
                  <div className="flex items-start gap-3 text-base sm:text-lg text-[#2D2D2E]">
                    <span className="text-emerald-600 font-mono font-bold shrink-0">▸</span>
                    <span><strong>Operator Expectation:</strong> Assumes the user possesses the technical skill to format ISO strings.</span>
                  </div>
                  <div className="flex items-start gap-3 text-base sm:text-lg text-[#2D2D2E]">
                    <span className="text-emerald-600 font-mono font-bold shrink-0">▸</span>
                    <span><strong>Architectural Flaw:</strong> Offloads internal database key lookup directly onto human working memory.</span>
                  </div>
                </div>
              </div>

              {/* Prominent SQL Trace Box */}
              <div className="p-4 sm:p-5 bg-[#FAF9F6] border border-[#E8E2D9] rounded-xl font-mono text-sm sm:text-base text-[#2D2D2E] mt-5 shadow-xs">
                <div className="text-xs font-bold text-[#6E6D70] uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>SQL TRANSACTION LOG</span>
                  <span className="text-emerald-700 font-bold">HTTP 200 OK</span>
                </div>
                <div className="font-semibold text-emerald-900 overflow-x-auto">
                  INSERT INTO bookings (dep_node, arr_node, seat_idx) VALUES ('DEP_CASAVOY_101', 'ARR_BENGUERIR_04', 'C02-S19-ND');
                </div>
              </div>
            </div>

            {/* The Human Perspective */}
            <div className="bg-[#FDF5F2] border-2 border-[#E5391C] rounded-2xl p-6 lg:p-8 xl:p-10 flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#FAD6CF]">
                  <h3 className="font-bold text-[#E5391C] text-2xl sm:text-3xl font-serif-display">
                    The Human Perspective
                  </h3>
                  <span className="text-xs sm:text-sm font-mono text-[#E5391C] bg-white px-3 py-1 rounded-full font-bold border border-[#FAD6CF]">
                    Cognitive Status: BLOCKED
                  </span>
                </div>

                <p className="text-lg sm:text-xl lg:text-2xl text-[#525254] leading-relaxed">
                  The traveler reports: <em>"I just wanted to buy a train seat back to Benguerir. I felt stupid, anxious, and terrified I booked the wrong date."</em>
                </p>

                {/* Structured Analytical Dimensions */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-start gap-3 text-base sm:text-lg text-[#2D2D2E]">
                    <span className="text-[#E5391C] font-mono font-bold shrink-0">▸</span>
                    <span><strong>Optimization Metric:</strong> Cognitive ease, intuitive flow, instant certainty, psychological safety.</span>
                  </div>
                  <div className="flex items-start gap-3 text-base sm:text-lg text-[#2D2D2E]">
                    <span className="text-[#E5391C] font-mono font-bold shrink-0">▸</span>
                    <span><strong>Human Reality:</strong> Working memory capacity decays within seconds under high stress or uncertainty.</span>
                  </div>
                  <div className="flex items-start gap-3 text-base sm:text-lg text-[#2D2D2E]">
                    <span className="text-[#E5391C] font-mono font-bold shrink-0">▸</span>
                    <span><strong>Emotional Impact:</strong> Induces severe hesitation, fear of financial loss, and misplaced self-blame.</span>
                  </div>
                </div>
              </div>

              {/* Prominent Cryptic Error Box */}
              <div className="p-4 sm:p-5 bg-white border-2 border-red-200 rounded-xl font-mono text-sm sm:text-base text-red-600 font-bold mt-5 shadow-xs">
                <div className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>UNHANDLED RUNTIME EXCEPTION</span>
                  <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-[11px]">FATAL REJECTION</span>
                </div>
                <div>"CRITICAL ERROR 401: Invalid departure node code at character 14 — Foreign key constraint fails."</div>
              </div>
            </div>
          </div>

          <div className="p-5 lg:p-6 bg-white border-l-4 border-[#E5391C] rounded-r-2xl shadow-xs text-center flex-shrink-0">
            <strong className="text-xl sm:text-2xl lg:text-3xl text-[#2D2D2E] font-serif-display block">
              "System A externalized internal machine complexity directly onto the human brain."
            </strong>
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
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
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-12 xl:p-14 bg-[#FAF9F6]">
        <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-6 lg:h-7 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 1 · Core Theoretical Principle
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 6 / 45</span>
        </div>

        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-4 lg:py-6 gap-6">
          <div className="space-y-3 text-center flex-shrink-0">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E]">
              Functionality ≠ Usability
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl text-[#6E6D70] max-w-3xl mx-auto">
              The foundational fallacy at the root of software failures and developer frustration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 flex-1 items-stretch">
            {/* Functionality Card */}
            <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 xl:p-10 rounded-2xl flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE3]">
                  <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#6E6D70] font-bold">
                    Pillar 01 · The Engine
                  </span>
                  <span className="text-xs font-mono text-stone-500 bg-[#FAF9F6] px-2.5 py-1 rounded">Binary Dimension</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-serif-display text-[#2D2D2E]">1. Functionality</h3>
                <p className="text-lg sm:text-xl lg:text-2xl text-[#525254] leading-relaxed">
                  The computational abilities, features, backend schemas, and data operations implemented in the codebase.
                </p>

                {/* Structured Breakdown */}
                <ul className="space-y-3 pt-2 text-base sm:text-lg text-[#2D2D2E]">
                  <li className="flex items-start gap-3">
                    <span className="font-mono font-bold text-stone-600">✓</span>
                    <span><strong>Engineering Domain:</strong> Backend schemas, algorithms, microservices, and network protocols.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono font-bold text-stone-600">✓</span>
                    <span><strong>Verification Mode:</strong> Automated unit tests, load testing, query execution, and server uptime.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono font-bold text-stone-600">✓</span>
                    <span><strong>State:</strong> Binary condition — the endpoint exists or it does not exist.</span>
                  </li>
                </ul>
              </div>

              {/* Large Projection Example Banner */}
              <div className="text-base sm:text-lg font-mono text-[#2D2D2E] bg-[#FAF9F6] p-4 sm:p-5 rounded-xl border border-[#E8E2D9] mt-5 shadow-xs">
                <div className="text-xs font-bold text-[#6E6D70] uppercase mb-1">SPECIFICATION BENCHMARK:</div>
                <div>A high-speed rail database can concurrently process 10,000 ticket transactions per second.</div>
              </div>
            </div>

            {/* Usability Card */}
            <div className="bg-[#FDF5F2] border-2 border-[#E5391C] p-6 lg:p-8 xl:p-10 rounded-2xl flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#FAD6CF]">
                  <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#E5391C] font-bold">
                    Pillar 02 · The Experience
                  </span>
                  <span className="text-xs font-mono text-[#E5391C] bg-white px-2.5 py-1 rounded border border-[#FAD6CF] font-bold">Continuous Spectrum</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-serif-display text-[#2D2D2E]">2. Usability</h3>
                <p className="text-lg sm:text-xl lg:text-2xl text-[#525254] leading-relaxed">
                  The effectiveness, efficiency, and emotional satisfaction with which biological human beings achieve real-world goals.
                </p>

                {/* Structured Breakdown */}
                <ul className="space-y-3 pt-2 text-base sm:text-lg text-[#2D2D2E]">
                  <li className="flex items-start gap-3">
                    <span className="font-mono font-bold text-[#E5391C]">✓</span>
                    <span><strong>Engineering Domain:</strong> Cognitive psychology, mental models, foveal vision, and motor precision.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono font-bold text-[#E5391C]">✓</span>
                    <span><strong>Verification Mode:</strong> Task completion duration, error frequency, cognitive workload, and user anxiety.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono font-bold text-[#E5391C]">✓</span>
                    <span><strong>State:</strong> Qualitative spectrum — ranges from excruciating and error-inducing to transparent and joyful.</span>
                  </li>
                </ul>
              </div>

              {/* Large Projection Example Banner */}
              <div className="text-base sm:text-lg font-mono text-[#E5391C] bg-white p-4 sm:p-5 rounded-xl border border-[#FAD6CF] mt-5 font-bold shadow-xs">
                <div className="text-xs font-bold text-[#E5391C] uppercase mb-1">HUMAN BENCHMARK:</div>
                <div>A first-time traveler books an express ticket in 8 seconds with zero errors and total clarity.</div>
              </div>
            </div>
          </div>

          <div className="p-4 lg:p-5 bg-white border border-[#E8E2D9] rounded-2xl text-center text-base sm:text-lg lg:text-xl text-[#2D2D2E] font-medium shadow-xs flex-shrink-0">
            Adding features expands functionality, but will destroy usability unless interaction architecture is rigorously designed.
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
          Next: The myth of "Human Error" and Norman Doors
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 7: NORMAN DOORS (Masterpiece Interactive Affordance Lab)
  // --------------------------------------------------------------------------
  if (slide.id === 7) {
    const handleNormanAction = (action: 'pulled' | 'pushed') => {
      setNormanDoorAction(action);
      if (action === 'pulled') {
        setIsDoorShaking(true);
        setTimeout(() => setIsDoorShaking(false), 600);
      }
    };

    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-12 xl:p-14 bg-[#FAF9F6]">
        <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-6 lg:h-7 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 1 · Classic Case Study
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 7 / 45</span>
        </div>

        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-3 lg:py-4 gap-4">
          <div className="space-y-2 text-center flex-shrink-0">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif-display font-medium text-[#2D2D2E]">
              The Myth of "Human Error" & Norman Doors
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-[#6E6D70] max-w-4xl mx-auto">
              When thousands of people push a door that should be pulled, it is not user stupidity—it is an <em>affordance violation</em>.
            </p>
          </div>

          {/* Scenario Segmented Selector */}
          <div className="flex justify-center items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setDoorScenario('flawed')}
              className={`px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 shadow-xs ${
                doorScenario === 'flawed'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-white text-[#2D2D2E] border border-[#E8E2D9] hover:bg-red-50'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Door A: The Flawed Norman Door</span>
            </button>
            <button
              onClick={() => setDoorScenario('natural')}
              className={`px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 shadow-xs ${
                doorScenario === 'natural'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white text-[#2D2D2E] border border-[#E8E2D9] hover:bg-emerald-50'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Door B: Natural Affordance Design</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-stretch">
            {/* Left Zone: Realistic Architectural Door Simulation (5 cols) */}
            <div className="lg:col-span-5 bg-white border border-[#E8E2D9] rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#F0EBE3]">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#6E6D70]">
                  Interactive Door Simulator
                </span>
                <span className="text-xs font-mono text-[#E5391C] font-bold">
                  {doorScenario === 'flawed' ? 'Affordance Conflict' : 'Natural Mapping'}
                </span>
              </div>

              {/* Realistic Architectural Door Visualization */}
              <div className="relative w-full max-w-[280px] h-[310px] mx-auto my-2 bg-gradient-to-b from-stone-100 to-stone-200 border-4 border-stone-400 rounded-xl p-3 shadow-inner flex flex-col justify-between overflow-hidden">
                {/* Architectural Frame & Glass */}
                <div
                  className={`w-full h-full bg-gradient-to-tr from-sky-100/50 via-white/80 to-sky-50/60 border-2 border-stone-300 rounded-lg relative flex flex-col justify-between p-4 shadow-sm transition-all duration-300 ${
                    isDoorShaking ? 'translate-x-2 -rotate-1 border-red-500 bg-red-50/40' : ''
                  }`}
                >
                  {/* Top Header / Door Label */}
                  <div className="text-[11px] font-mono font-bold text-center text-stone-500 border-b border-stone-200 pb-1">
                    {doorScenario === 'flawed' ? 'CAMPUS LIBRARY MAIN EXIT' : 'ERGONOMIC CLASSROOM DOOR'}
                  </div>

                  {/* Hardware Center: Vertical Pull Handle vs Flat Metal Push Plate */}
                  {doorScenario === 'flawed' ? (
                    <div className="my-auto flex flex-col items-center justify-center space-y-3">
                      {/* Realistic 3D Cylindrical Vertical Handle */}
                      <div className="relative group cursor-pointer" onClick={() => handleNormanAction('pulled')}>
                        {/* Upper Wall Mount */}
                        <div className="w-8 h-3 bg-gradient-to-r from-stone-400 via-stone-200 to-stone-400 rounded-xs mx-auto shadow-xs" />
                        {/* Vertical Stainless Steel Bar Handle */}
                        <div className="w-6 h-32 rounded-full bg-gradient-to-r from-stone-400 via-white to-stone-500 border border-stone-400 shadow-lg mx-auto flex items-center justify-center group-hover:scale-105 transition-transform">
                          <div className="w-1 h-24 bg-white/70 rounded-full" />
                        </div>
                        {/* Lower Wall Mount */}
                        <div className="w-8 h-3 bg-gradient-to-r from-stone-400 via-stone-200 to-stone-400 rounded-xs mx-auto shadow-xs" />
                      </div>

                      {/* Taped Paper Warning Note */}
                      <div className="px-3 py-1.5 bg-amber-100 border border-amber-300 shadow-xs text-[11px] font-bold font-mono text-red-800 rotate-2 rounded-xs">
                        ⚠️ SIGN: "PLEASE PUSH"
                      </div>
                    </div>
                  ) : (
                    <div className="my-auto flex flex-col items-center justify-center space-y-2">
                      {/* Realistic 3D Flat Metal Push Plate */}
                      <div
                        onClick={() => setNaturalDoorAction('pushed')}
                        className="w-24 h-36 bg-gradient-to-b from-amber-50 via-stone-200 to-stone-300 border-2 border-stone-400 rounded-md shadow-md flex flex-col justify-between p-2 cursor-pointer hover:border-[#E5391C] hover:scale-102 transition-all"
                        title="Flat Metal Plate - Naturally Affords Pushing"
                      >
                        {/* Plate Screws */}
                        <div className="flex justify-between text-[8px] text-stone-600 font-mono">
                          <span>⊕</span>
                          <span>⊕</span>
                        </div>
                        <div className="text-center">
                          <Hand className="w-6 h-6 mx-auto text-stone-600 mb-1 opacity-75" />
                          <div className="text-[10px] font-mono font-bold tracking-widest text-stone-800 uppercase">
                            PUSH
                          </div>
                          <div className="text-[8px] text-stone-500">FLAT SURFACE</div>
                        </div>
                        <div className="flex justify-between text-[8px] text-stone-600 font-mono">
                          <span>⊕</span>
                          <span>⊕</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bottom Pivot Hinge Indicator */}
                  <div className="text-[10px] font-mono text-stone-400 flex items-center justify-between border-t border-stone-200 pt-1">
                    <span>Pivot Hinge: Left</span>
                    <span className="font-bold text-[#E5391C]">
                      {doorScenario === 'flawed' ? 'Requires: Push' : 'Natural: Push Plate'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Controls & Real-Time Feedback */}
              <div className="space-y-2 mt-2">
                {doorScenario === 'flawed' ? (
                  <div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleNormanAction('pulled')}
                        className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          normanDoorAction === 'pulled'
                            ? 'bg-red-600 text-white ring-2 ring-red-400'
                            : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
                        }`}
                      >
                        <Hand className="w-4 h-4" />
                        <span>Pull Vertical Handle</span>
                      </button>
                      <button
                        onClick={() => handleNormanAction('pushed')}
                        className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          normanDoorAction === 'pushed'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-stone-100 text-stone-700 border border-stone-300 hover:bg-stone-200'
                        }`}
                      >
                        <ArrowRight className="w-4 h-4" />
                        <span>Push Vertical Handle</span>
                      </button>
                    </div>
                    {normanDoorAction !== 'idle' && (
                      <div
                        className={`mt-2 p-2.5 rounded-xl text-xs font-mono font-bold border ${
                          normanDoorAction === 'pulled'
                            ? 'bg-red-50 border-red-200 text-red-700'
                            : 'bg-amber-50 border-amber-200 text-amber-800'
                        }`}
                      >
                        {normanDoorAction === 'pulled'
                          ? '💥 Door Rattles! The vertical bar affords pulling to the human hand, but the mechanical latch only pushes. You feel foolish, but the engineering is flawed.'
                          : '⚠️ Door opens, but pushing against a cylindrical grab-bar creates mental resistance and friction.'}
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setNaturalDoorAction('pushed')}
                        className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          naturalDoorAction === 'pushed'
                            ? 'bg-emerald-600 text-white shadow'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                        }`}
                      >
                        <Hand className="w-4 h-4" />
                        <span>Palm on Flat Plate</span>
                      </button>
                      <button
                        onClick={() => setNaturalDoorAction('pulled')}
                        className="py-2 px-3 rounded-xl text-xs font-mono font-bold bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed"
                        disabled
                      >
                        <span>Cannot Pull (No Grip)</span>
                      </button>
                    </div>
                    {naturalDoorAction === 'pushed' && (
                      <div className="mt-2 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-mono font-bold">
                        ✓ Flawless Interaction! The flat plate physically denies grasping and 100% communicates PUSH. No instruction sign needed!
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Zone: Deep Pedagogical Matrix & Principles (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-4">
              {/* Comparative Affordance Matrix Table */}
              <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 lg:p-6 shadow-xs space-y-4">
                <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-[#2D2D2E]">
                  Physical Hardware Affordances
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Vertical Handle Card */}
                  <div className="p-4 rounded-xl border border-red-200 bg-red-50/40 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="font-mono text-xs font-bold text-red-700 uppercase">
                        Vertical Bar Handle
                      </span>
                    </div>
                    <div className="text-sm text-[#2D2D2E] space-y-1">
                      <div><strong>Physical Shape:</strong> 3D Cylinder with grasp gap</div>
                      <div><strong>Biomechanics:</strong> Wrap fingers & pull</div>
                      <div><strong>Natural Affordance:</strong> <span className="text-red-700 font-bold">PULL ONLY</span></div>
                      <div className="text-xs text-[#6E6D70] pt-1 border-t border-red-200">
                        Placing this on a PUSH door creates an unavoidable cognitive trap.
                      </div>
                    </div>
                  </div>

                  {/* Flat Push Plate Card */}
                  <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-600" />
                      <span className="font-mono text-xs font-bold text-emerald-700 uppercase">
                        Flat Metal Push Plate
                      </span>
                    </div>
                    <div className="text-sm text-[#2D2D2E] space-y-1">
                      <div><strong>Physical Shape:</strong> Flush planar metal surface</div>
                      <div><strong>Biomechanics:</strong> Open flat palm pressure</div>
                      <div><strong>Natural Affordance:</strong> <span className="text-emerald-700 font-bold">PUSH ONLY</span></div>
                      <div className="text-xs text-[#6E6D70] pt-1 border-t border-emerald-200">
                        Zero instructions needed because pulling is physically impossible.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#FDF5F2] border-l-4 border-[#E5391C] rounded-r-xl">
                  <p className="text-sm sm:text-base text-[#2D2D2E] font-medium leading-relaxed">
                    <strong>Don Norman’s Law:</strong> <em>"When a simple design requires pictures or written instructions to be operated, it is broken."</em>
                  </p>
                </div>
              </div>

              {/* Bottom Takeaway Card */}
              <div className="p-4 lg:p-5 bg-white border-2 border-red-200 rounded-2xl flex items-center justify-between shadow-xs">
                <div className="space-y-1">
                  <div className="text-xs font-mono font-bold uppercase text-[#E5391C] tracking-wider">
                    Core Engineering Takeaway:
                  </div>
                  <p className="text-sm sm:text-base text-[#2D2D2E] font-medium">
                    Software buttons, menus, and forms have the exact same affordance physics. If a button looks like flat text, or a disabled input looks clickable, you have engineered a digital Norman Door.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
          Stop apologizing to doors · Design dictates human behavior
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 8: THE AHA MOMENT
  // --------------------------------------------------------------------------
  if (slide.id === 8) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-12 xl:p-14 bg-[#FAF9F6] text-center">
        <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-6 lg:h-7 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 1 · Core Aha Moment
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 8 / 45</span>
        </div>

        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-center py-6 lg:py-10 space-y-8 lg:space-y-12">
          <div className="w-24 h-24 rounded-full bg-[#FDF5F2] border-2 border-[#E5391C] flex items-center justify-center mx-auto text-[#E5391C] shadow-sm">
            <Sparkles className="w-12 h-12" />
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif-display font-medium text-[#2D2D2E] leading-tight max-w-6xl mx-auto">
            "The interaction between human and computer is itself a designable artifact."
          </h2>

          <p className="text-2xl sm:text-3xl lg:text-4xl text-[#525254] font-light max-w-4xl mx-auto leading-relaxed">
            It is not secondary decoration. It is not skin deep. It is the primary medium through which human intention becomes computational reality.
          </p>
        </div>

        <div className="p-4 bg-white border border-[#E8E2D9] rounded-2xl max-w-2xl mx-auto text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
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
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-12 xl:p-14 bg-[#FAF9F6]">
        <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-6 lg:h-7 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 2 · The Three Pillars
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 9 / 45</span>
        </div>

        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-4 lg:py-6 gap-6">
          <div className="text-center space-y-3 flex-shrink-0">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E]">
              Deconstructing the Acronym: H · C · I
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl text-[#6E6D70] max-w-3xl mx-auto">
              Three equal foundations uniting cognitive science, technology, and design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-stretch">
            {/* The Human */}
            <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 xl:p-10 rounded-2xl flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold font-mono text-2xl border border-blue-200">
                  H
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif-display text-[#2D2D2E]">The Human</h3>
                <p className="text-lg sm:text-xl lg:text-2xl text-[#525254] leading-relaxed">
                  Perceptual bandwidth, working memory limits, visual fovea, motor dexterity, emotional state, and mental models.
                </p>
                <ul className="space-y-2 text-base text-[#6E6D70] font-mono pt-1">
                  <li>• Working memory decays within ~15 seconds</li>
                  <li>• High-resolution foveal vision spans only 2°</li>
                </ul>
              </div>
              <div className="text-base sm:text-lg font-mono text-blue-900 bg-blue-50 px-4 py-3 rounded-xl mt-4 border border-blue-200 font-bold flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                <span>Field: Cognitive Psychology & Neuroergonomics</span>
              </div>
            </div>

            {/* The Computer */}
            <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 xl:p-10 rounded-2xl flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold font-mono text-2xl border border-purple-200">
                  C
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif-display text-[#2D2D2E]">The Computer</h3>
                <p className="text-lg sm:text-xl lg:text-2xl text-[#525254] leading-relaxed">
                  Hardware architectures, sensors, displays, state machines, network latency, operating systems, and algorithms.
                </p>
                <ul className="space-y-2 text-base text-[#6E6D70] font-mono pt-1">
                  <li>• Deterministic execution in nanosecond clock cycles</li>
                  <li>• Zero intuitive awareness of human semantic meaning</li>
                </ul>
              </div>
              <div className="text-base sm:text-lg font-mono text-purple-900 bg-purple-50 px-4 py-3 rounded-xl mt-4 border border-purple-200 font-bold flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600 shrink-0" />
                <span>Field: Computer Science & Systems Engineering</span>
              </div>
            </div>

            {/* The Interaction */}
            <div className="bg-[#FDF5F2] border-2 border-[#E5391C] p-6 lg:p-8 xl:p-10 rounded-2xl flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-[#E5391C] text-white flex items-center justify-center font-bold font-mono text-2xl shadow">
                  I
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif-display text-[#2D2D2E]">The Interaction</h3>
                <p className="text-lg sm:text-xl lg:text-2xl text-[#525254] leading-relaxed">
                  The bilateral translation bridge: How human intentions turn into code execution, and system states turn into perception.
                </p>
                <ul className="space-y-2 text-base text-[#E5391C] font-mono pt-1">
                  <li>• The designable contact point between biology & silicon</li>
                  <li>• Determines whether software empowers or handicaps</li>
                </ul>
              </div>
              <div className="text-base sm:text-lg font-mono text-[#E5391C] bg-white px-4 py-3 rounded-xl mt-4 border border-[#FAD6CF] font-bold flex items-center gap-2.5 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5391C] shrink-0" />
                <span>Field: Interaction Architecture & UX Engineering</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
          Computer Science provides the C · Cognitive Psychology provides the H · Design creates the I
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 10: WHAT IS THE "COMPUTER"? (Realistic Interface Evolution)
  // --------------------------------------------------------------------------
  if (slide.id === 10) {
    const eras = [
      {
        id: 0,
        period: '1980s',
        name: 'The Beige Box & CRT Terminal',
        paradigm: 'Command Line Interface (CLI)',
        modality: 'Keyboard motor entry, strict syntax memorization',
        bandwidth: '300 baud – 9.6 kbps',
        friction: 'High recall memory burden; 1 syntax typo aborts execution',
        highlight: 'Deterministic single-operator console',
      },
      {
        id: 1,
        period: '2000s',
        name: 'The Mobile Web & Capacitive Glass',
        paradigm: 'Direct Multi-Touch & Viewports',
        modality: 'Thumb reach zones, pinch-to-zoom, inertial scrolling',
        bandwidth: '10 Mbps – 100 Mbps',
        friction: 'Small screen clutter, outdoor glare, thumb reach limits',
        highlight: 'On-the-go contextual computing',
      },
      {
        id: 2,
        period: '2020s',
        name: 'Wearable & Glanceable Micro-UI',
        paradigm: 'Glanceable Complications & Haptics',
        modality: 'Peripheral gaze (<1.5s glances), digital crown, haptic buzz',
        bandwidth: 'Continuous biometric sensor telemetry',
        friction: 'Micro-display constraints, split-attention hazards',
        highlight: 'Safety-critical ambient monitoring',
      },
      {
        id: 3,
        period: '2026+ (UM6P)',
        name: 'Ubiquitous & Ambient IoT',
        paradigm: 'Invisible Autonomous Intelligence',
        modality: 'Spatial presence, green solar telemetry, ambient AI',
        bandwidth: 'Distributed gigabit edge mesh',
        friction: 'Explainability loss, ethical privacy, trust calibration',
        highlight: 'Smart agriculture & sustainable green campus',
      },
    ];

    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-12 xl:p-14 bg-[#FAF9F6] select-text">
        {/* Header with UM6P Official Clean Logo */}
        <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-7 lg:h-8 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 2 · The Technological Frontier
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 10 / 45</span>
        </div>

        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-3 lg:py-5 gap-5">
          <div className="text-center space-y-2 flex-shrink-0">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E]">
              What is the "Computer"?
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl text-[#6E6D70] max-w-5xl mx-auto font-light">
              Far beyond keyboards and desktop monitors: The continuous evolution of physical & interactive form factors.
            </p>
          </div>

          {/* 4 Realistic Hardware Device Mockups with High Visibility */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 flex-1 items-stretch">
            {/* Device 0: 1980s DEC VT100 CRT Monitor Chassis */}
            <div
              onClick={() => {
                setComputerEra(0);
                setCliOutput('root@oncf-vax:~# query_trains --dep="CASA" --arr="BGX"\n[OK] 2 EXPRESS TRAINS ACTIVE (104, 108)\nSTATUS: READY');
              }}
              className={`p-5 lg:p-6 rounded-2xl flex flex-col justify-between border-2 cursor-pointer transition-all shadow-xs ${
                computerEra === 0
                  ? 'bg-stone-900 border-[#E5391C] text-white ring-4 ring-[#E5391C]/20 shadow-xl scale-[1.02]'
                  : 'bg-white border-[#E8E2D9] hover:border-stone-400 text-[#2D2D2E]'
              }`}
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className={`text-xs sm:text-sm font-mono font-bold px-2.5 py-1 rounded-lg ${computerEra === 0 ? 'bg-[#E5391C] text-white' : 'bg-stone-100 text-stone-700'}`}>
                    1980s · CRT TERMINAL
                  </span>
                  <Terminal className={`w-6 h-6 ${computerEra === 0 ? 'text-[#E5391C]' : 'text-stone-400'}`} />
                </div>
                <h4 className="text-2xl sm:text-3xl font-serif-display font-bold">The Beige Box</h4>

                {/* Realistic Curved CRT Monitor Housing */}
                <div className="bg-[#D8D2C5] border-2 border-[#B8B0A0] rounded-2xl p-3.5 shadow-md space-y-2">
                  {/* Monitor Bevel & Air Vents */}
                  <div className="flex justify-between items-center px-1">
                    <div className="flex gap-1.5">
                      <div className="w-5 h-1.5 bg-[#A8A090] rounded-xs" />
                      <div className="w-5 h-1.5 bg-[#A8A090] rounded-xs" />
                      <div className="w-5 h-1.5 bg-[#A8A090] rounded-xs" />
                    </div>
                    <span className="text-xs font-mono font-bold text-stone-600 tracking-wider">DEC VT100</span>
                  </div>

                  {/* Curved Phosphor Screen */}
                  <div className="bg-[#051108] border-2 border-[#203020] rounded-xl p-3 font-mono text-xs text-emerald-400 shadow-inner relative overflow-hidden min-h-[140px] flex flex-col justify-between">
                    <div className="text-emerald-500 font-bold border-b border-emerald-900/60 pb-1 text-xs flex justify-between">
                      <span>VAX/VMS V4.2 CONSOLE</span>
                      <span className="text-emerald-300 font-mono">9600 BAUD</span>
                    </div>
                    <div className="text-emerald-300 whitespace-pre-line text-xs leading-relaxed py-1.5 font-mono">
                      {cliOutput}
                    </div>
                    <div className="flex items-center gap-2 pt-1.5 border-t border-emerald-900/60">
                      <span className="text-emerald-400 animate-pulse font-bold">&gt; _</span>
                      <div className="flex gap-1.5 ml-auto">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCliOutput('root@oncf-vax:~# help\nCOMMANDS: query, book, cancel, dump_db');
                          }}
                          className="px-2 py-1 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 rounded text-xs border border-emerald-800 font-mono cursor-pointer font-bold"
                        >
                          help
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCliOutput('root@oncf-vax:~# book_seat --id=104 --seat=14A\n[OK] SEAT RESERVED IN TABLE `TICKETS`');
                          }}
                          className="px-2 py-1 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 rounded text-xs border border-emerald-800 font-mono cursor-pointer font-bold"
                        >
                          book_seat
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Monitor Hardware Base & Power LED */}
                  <div className="flex items-center justify-between px-1 pt-1 text-xs font-mono text-stone-600">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-xs" />
                      <span className="font-bold">PWR ON</span>
                    </div>
                    <span className="text-stone-500">80x24 MONOCHROME</span>
                  </div>
                </div>

                <p className={`text-sm sm:text-base leading-relaxed ${computerEra === 0 ? 'text-stone-300' : 'text-[#525254]'}`}>
                  Monochrome CRT terminal, solitary workstation operator, strict syntax recall.
                </p>
              </div>

              <div className={`text-sm font-mono pt-3 border-t mt-3 font-bold ${computerEra === 0 ? 'border-stone-700 text-[#E5391C]' : 'border-[#F0EBE3] text-stone-600'}`}>
                Modality: Keyboard Motor Entry
              </div>
            </div>

            {/* Device 1: Realistic Modern Smartphone Chassis (Mobile Web) */}
            <div
              onClick={() => setComputerEra(1)}
              className={`p-5 lg:p-6 rounded-2xl flex flex-col justify-between border-2 cursor-pointer transition-all shadow-xs ${
                computerEra === 1
                  ? 'bg-stone-900 border-[#E5391C] text-white ring-4 ring-[#E5391C]/20 shadow-xl scale-[1.02]'
                  : 'bg-white border-[#E8E2D9] hover:border-stone-400 text-[#2D2D2E]'
              }`}
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className={`text-xs sm:text-sm font-mono font-bold px-2.5 py-1 rounded-lg ${computerEra === 1 ? 'bg-[#E5391C] text-white' : 'bg-stone-100 text-stone-700'}`}>
                    2000s · SMARTPHONE
                  </span>
                  <Smartphone className={`w-6 h-6 ${computerEra === 1 ? 'text-[#E5391C]' : 'text-stone-400'}`} />
                </div>
                <h4 className="text-2xl sm:text-3xl font-serif-display font-bold">The Mobile Web</h4>

                {/* Realistic Smartphone Frame */}
                <div className="bg-stone-900 border-2 border-stone-600 rounded-3xl p-3 shadow-lg relative space-y-2 max-w-[260px] mx-auto w-full">
                  {/* Phone Speaker & Dynamic Island Camera Pill */}
                  <div className="flex justify-center items-center gap-1.5 py-0.5">
                    <div className="w-12 h-2.5 bg-black rounded-full border border-stone-800 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-900/60 ml-auto mr-1.5" />
                    </div>
                  </div>

                  {/* Smartphone OLED Screen */}
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-2.5 text-white font-sans text-xs space-y-2 relative overflow-hidden min-h-[140px]">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center text-[10px] text-stone-400 font-mono">
                      <span>09:41</span>
                      <span className="bg-stone-800 px-2 py-0.5 rounded text-[9px] text-stone-300">🔒 oncf.ma</span>
                      <span>5G 100%</span>
                    </div>

                    {/* Mobile App Ticket UI */}
                    <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span>Casa → Benguerir</span>
                        <span className="text-emerald-400 font-mono">120 MAD</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-slate-300">
                        <span>Al Boraq 104</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setPhoneSeatPicked(!phoneSeatPicked);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                            phoneSeatPicked ? 'bg-emerald-600 text-white' : 'bg-[#E5391C] text-white hover:scale-105'
                          }`}
                        >
                          {phoneSeatPicked ? '✓ Seat 14A' : 'Tap: Pick 14A'}
                        </button>
                      </div>
                    </div>

                    {/* Thumb Zone Heatmap Overlay Toggle */}
                    <div className="flex items-center justify-between text-[10px] pt-1.5 border-t border-slate-800">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPhoneThumbZone(!phoneThumbZone);
                        }}
                        className="text-[10px] font-mono text-[#E5391C] font-bold hover:underline cursor-pointer"
                      >
                        {phoneThumbZone ? 'Hide Arc' : '👁 Thumb Zone'}
                      </button>
                      <span className="text-stone-400 font-mono">Min 48px Target</span>
                    </div>

                    {phoneThumbZone && (
                      <div className="absolute inset-0 bg-emerald-500/20 border-t-2 border-emerald-400 rounded-2xl flex items-end p-2.5 pointer-events-none">
                        <span className="text-[10px] font-mono font-bold text-emerald-300 bg-black/85 px-1.5 py-0.5 rounded">
                          🟢 Natural Thumb Reach Arc
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Phone Bottom Home Bar */}
                  <div className="w-16 h-1 bg-stone-500 rounded-full mx-auto" />
                </div>

                <p className={`text-sm sm:text-base leading-relaxed ${computerEra === 1 ? 'text-stone-300' : 'text-[#525254]'}`}>
                  Capacitive multi-touch glass, thumb reach zones, responsive mobile viewports.
                </p>
              </div>

              <div className={`text-sm font-mono pt-3 border-t mt-3 font-bold ${computerEra === 1 ? 'border-stone-700 text-[#E5391C]' : 'border-[#F0EBE3] text-stone-600'}`}>
                Modality: Direct Multi-Touch
              </div>
            </div>

            {/* Device 2: Realistic Smartwatch Casing (Wearables) */}
            <div
              onClick={() => setComputerEra(2)}
              className={`p-5 lg:p-6 rounded-2xl flex flex-col justify-between border-2 cursor-pointer transition-all shadow-xs ${
                computerEra === 2
                  ? 'bg-stone-900 border-[#E5391C] text-white ring-4 ring-[#E5391C]/20 shadow-xl scale-[1.02]'
                  : 'bg-white border-[#E8E2D9] hover:border-stone-400 text-[#2D2D2E]'
              }`}
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className={`text-xs sm:text-sm font-mono font-bold px-2.5 py-1 rounded-lg ${computerEra === 2 ? 'bg-[#E5391C] text-white' : 'bg-stone-100 text-stone-700'}`}>
                    2020s · SMARTWATCH
                  </span>
                  <Watch className={`w-6 h-6 ${computerEra === 2 ? 'text-[#E5391C]' : 'text-stone-400'}`} />
                </div>
                <h4 className="text-2xl sm:text-3xl font-serif-display font-bold">Wearable & Glance</h4>

                {/* Realistic Apple Watch Squircle Body */}
                <div className="relative max-w-[220px] mx-auto w-full py-1">
                  {/* Top Strap Lug */}
                  <div className="w-20 h-2.5 bg-stone-700 rounded-t-lg mx-auto" />

                  {/* Watch Body with Digital Crown on Right */}
                  <div className="bg-stone-900 border-2 border-stone-600 rounded-[26px] p-3 shadow-xl relative">
                    {/* Digital Crown */}
                    <div className="absolute -right-2.5 top-5 w-2.5 h-7 bg-gradient-to-b from-stone-400 via-stone-200 to-stone-500 rounded-r-xs shadow-xs" />
                    {/* Side Push Button */}
                    <div className="absolute -right-2 bottom-5 w-2 h-5 bg-stone-600 rounded-r-xs" />

                    {/* OLED Watch Screen */}
                    <div className="bg-black border border-stone-800 rounded-[20px] p-2.5 space-y-1.5 text-white font-mono min-h-[140px] flex flex-col justify-between">
                      <div className="flex justify-between items-center text-[10px] text-amber-400 border-b border-stone-900 pb-1">
                        <span className="font-bold">09:41</span>
                        <span className="text-emerald-400 font-bold">♥ 72 BPM</span>
                      </div>

                      {/* Glanceable Notification Card */}
                      <div className="bg-stone-900/90 p-2 rounded-xl border border-stone-800 space-y-1">
                        <div className="text-[10px] text-stone-400 uppercase font-bold flex justify-between">
                          <span>ONCF ALERT</span>
                          <span className="text-[#E5391C] animate-pulse">● LIVE</span>
                        </div>
                        <div className="text-xs text-amber-300 font-bold leading-tight">
                          {watchNotification}
                        </div>
                      </div>

                      {/* Interactive Watch Complication Action */}
                      <div className="flex justify-between items-center pt-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setWatchNotification(prev => prev.includes('Track 3') ? 'QR Ticket Ready' : 'Train 104 · Track 3 in 8m');
                          }}
                          className="px-2 py-1 bg-amber-500/20 text-amber-300 rounded-md text-[10px] font-bold hover:bg-amber-500/30 cursor-pointer"
                        >
                          ↻ Rotate Crown
                        </button>
                        <span className="text-[10px] text-stone-400">&lt;1.5s Gaze</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Strap Lug */}
                  <div className="w-20 h-2.5 bg-stone-700 rounded-b-lg mx-auto" />
                </div>

                <p className={`text-sm sm:text-base leading-relaxed ${computerEra === 2 ? 'text-stone-300' : 'text-[#525254]'}`}>
                  Smartwatch micro-UI, peripheral glance times under 1.5 seconds, haptic buzz.
                </p>
              </div>

              <div className={`text-sm font-mono pt-3 border-t mt-3 font-bold ${computerEra === 2 ? 'border-stone-700 text-[#E5391C]' : 'border-[#F0EBE3] text-stone-600'}`}>
                Modality: Glanceable Micro-UI
              </div>
            </div>

            {/* Device 3: Realistic UM6P Smart Campus Ambient IoT Sensor Node */}
            <div
              onClick={() => setComputerEra(3)}
              className={`p-5 lg:p-6 rounded-2xl flex flex-col justify-between border-2 cursor-pointer transition-all shadow-xs ${
                computerEra === 3
                  ? 'bg-stone-900 border-[#E5391C] text-white ring-4 ring-[#E5391C]/20 shadow-xl scale-[1.02]'
                  : 'bg-[#FDF5F2] border-2 border-[#E5391C]/60 hover:border-[#E5391C] text-[#2D2D2E]'
              }`}
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-mono font-bold px-2.5 py-1 rounded-lg bg-[#E5391C] text-white">
                    2026+ · AMBIENT IOT
                  </span>
                  <Wifi className="w-6 h-6 text-[#E5391C] animate-pulse" />
                </div>
                <h4 className="text-2xl sm:text-3xl font-serif-display font-bold">Ubiquitous Computing</h4>

                {/* Realistic IoT Hardware Enclosure */}
                <div className="bg-emerald-950 border-2 border-emerald-700 rounded-3xl p-3 shadow-lg relative space-y-2 max-w-[240px] mx-auto w-full">
                  {/* Miniature Solar Cell Array + Antenna */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 bg-blue-950 p-1.5 rounded-lg border border-blue-800">
                      <div className="w-4 h-2.5 bg-blue-900 rounded-xs" />
                      <div className="w-4 h-2.5 bg-blue-900 rounded-xs" />
                      <div className="w-4 h-2.5 bg-blue-900 rounded-xs" />
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                      <div className="w-1.5 h-5 bg-stone-400 rounded-t-xs" />
                      <span className="font-bold">RF MESH</span>
                    </div>
                  </div>

                  {/* OLED Diagnostic Micro-Screen */}
                  <div className="bg-black border border-emerald-900 rounded-xl p-2.5 font-mono text-emerald-400 text-xs space-y-1.5 min-h-[140px] flex flex-col justify-between">
                    <div className="flex justify-between text-[10px] text-emerald-600 border-b border-emerald-950 pb-1">
                      <span>UM6P GREEN POD #42</span>
                      <span className="text-emerald-300 font-bold">● ONLINE</span>
                    </div>

                    <div className="space-y-1 text-xs">
                      {iotSensorMetric === 'soil' && <div>🌱 Soil Moisture: <span className="font-bold text-white">68.4%</span></div>}
                      {iotSensorMetric === 'solar' && <div>☀️ Solar Yield: <span className="font-bold text-white">940 W/m²</span></div>}
                      {iotSensorMetric === 'mesh' && <div>📡 Mesh Peers: <span className="font-bold text-white">18 Nodes</span></div>}
                    </div>

                    <div className="flex gap-1.5 pt-1 border-t border-emerald-950">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIotSensorMetric('soil');
                        }}
                        className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer ${iotSensorMetric === 'soil' ? 'bg-emerald-700 text-white' : 'bg-emerald-950 text-emerald-400'}`}
                      >
                        Soil
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIotSensorMetric('solar');
                        }}
                        className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer ${iotSensorMetric === 'solar' ? 'bg-emerald-700 text-white' : 'bg-emerald-950 text-emerald-400'}`}
                      >
                        Solar
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIotSensorMetric('mesh');
                        }}
                        className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer ${iotSensorMetric === 'mesh' ? 'bg-emerald-700 text-white' : 'bg-emerald-950 text-emerald-400'}`}
                      >
                        Mesh
                      </button>
                    </div>
                  </div>

                  {/* Status Diodes */}
                  <div className="flex justify-between items-center text-[10px] font-mono text-emerald-500 pt-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="font-bold">TELEMETRY TX</span>
                    </div>
                    <span className="text-stone-400 font-bold">ZERO UI</span>
                  </div>
                </div>

                <p className={`text-sm sm:text-base leading-relaxed ${computerEra === 3 ? 'text-stone-300' : 'text-[#525254]'}`}>
                  Smart campus sensor mesh, solar telemetry, autonomous drones, zero-touch ambient computing.
                </p>
              </div>

              <div className="text-sm font-mono pt-3 border-t border-[#FAD6CF] mt-3 font-bold text-[#E5391C]">
                Modality: Ambient Intelligence
              </div>
            </div>
          </div>

          {/* Deep Selected Era Telemetry Card (Large, High-Contrast) */}
          <div className="p-5 lg:p-7 bg-white border-2 border-[#E8E2D9] rounded-2xl shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5 flex-shrink-0">
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <span className="text-sm sm:text-base font-mono font-bold text-[#E5391C] uppercase tracking-wider">
                  Inspecting Era {eras[computerEra].period}:
                </span>
                <span className="font-bold text-[#2D2D2E] font-serif-display text-xl sm:text-2xl">
                  {eras[computerEra].name}
                </span>
              </div>
              <p className="text-base sm:text-lg text-[#525254]">
                <strong>Primary Interaction Bottleneck:</strong> {eras[computerEra].friction}
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm sm:text-base font-mono">
              <div className="px-4 py-2 bg-[#FAF9F6] border border-[#E8E2D9] rounded-xl">
                <span className="text-stone-500">Bandwidth: </span>
                <span className="font-bold text-[#2D2D2E]">{eras[computerEra].bandwidth}</span>
              </div>
              <div className="px-4 py-2 bg-[#FDF5F2] border border-[#FAD6CF] text-[#E5391C] rounded-xl font-bold shadow-xs">
                {eras[computerEra].highlight}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
          Next: Dissecting the biological hardware of the Human
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 11: WHAT IS THE "HUMAN"? (Masterpiece Biological Hardware Lab)
  // --------------------------------------------------------------------------
  if (slide.id === 11) {
    const testItems = [
      'Al Boraq 104',
      'Seat 14A',
      'Platform 3',
      'Ref #8821',
      'Gate 02',
      'Train Delay 15m',
    ];

    const handleAddChunk = (item: string) => {
      if (workingMemory.length >= 4) {
        setMemoryOverflow(true);
        // Decay the oldest chunk
        setWorkingMemory(prev => [...prev.slice(1), item]);
      } else {
        setWorkingMemory(prev => [...prev, item]);
      }
    };

    const handleFittsClick = () => {
      const now = Date.now();
      const elapsed = fittsStartTime > 0 ? now - fittsStartTime : Math.floor(Math.random() * 80 + 160);
      setFittsAcquisitionTime(elapsed);
      setFittsTestActive(false);
    };

    const handleStartFitts = (type: 'small' | 'large') => {
      setFittsTargetType(type);
      setFittsTestActive(true);
      setFittsStartTime(Date.now());
      setFittsAcquisitionTime(null);
    };

    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-12 xl:p-14 bg-[#FAF9F6] select-text">
        {/* Header with UM6P Official Logo */}
        <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-7 lg:h-8 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 2 · Biological Constraints of the Mind & Body
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 11 / 45</span>
        </div>

        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-3 lg:py-5 gap-5">
          <div className="text-center space-y-2 flex-shrink-0">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E]">
              What is the "Human"?
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl text-[#6E6D70] max-w-5xl mx-auto font-light">
              You cannot download more RAM into human brains. Software must conform to rigid biological constraints.
            </p>
          </div>

          {/* 3 Interactive Biological Laboratories (Clear & Plain Language) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-stretch">
            {/* Lab 1: Perception & Center of Visual Focus */}
            <div className="bg-white border-2 border-[#E8E2D9] p-6 lg:p-8 rounded-2xl flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE3]">
                  <span className="text-xs sm:text-sm font-mono text-[#E5391C] font-bold uppercase tracking-wider">
                    01 · VISUAL PERCEPTION
                  </span>
                  <Eye className="w-6 h-6 text-[#E5391C]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#2D2D2E]">
                  Sharp Vision: ~2° Focus Cone
                </h3>
                <p className="text-base sm:text-lg text-[#525254] leading-relaxed">
                  High-resolution vision is strictly limited to a tiny thumbnail-sized circle at arm’s length. Peripheral vision only senses motion, not fine detail.
                </p>

                {/* Interactive Focus Simulator */}
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-3">
                  <div className="font-mono text-xs font-bold text-stone-600">
                    CLICK TO SHIFT EYE FOCUS CONE:
                  </div>
                  <div className="p-3 bg-white border border-stone-200 rounded-lg flex flex-wrap gap-2 text-base font-serif">
                    {['Departure', 'Benguerir', 'Station', 'Platform', 'Alert'].map((w, idx) => (
                      <button
                        key={idx}
                        onClick={() => setFovealIndex(idx)}
                        className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                          fovealIndex === idx
                            ? 'bg-[#E5391C] text-white font-bold scale-105 shadow-sm'
                            : 'text-stone-300 blur-[1px] hover:blur-none'
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-stone-700">
                    {fovealIndex === 4
                      ? '👁 Looking at Alert: Seen with 100% clarity'
                      : '👁 Looking at words: Warning banner on the edge goes completely unnoticed!'}
                  </div>
                </div>

                <ul className="space-y-1.5 text-sm sm:text-base text-[#6E6D70] font-mono">
                  <li>• Eyes dart in rapid jumps (3 to 4 times per second)</li>
                  <li>• During rapid eye jumps, the brain momentarily pauses visual intake</li>
                </ul>
              </div>

              <div className="text-sm sm:text-base font-mono text-[#2D2D2E] bg-[#FAF9F6] p-4 rounded-xl border border-[#E8E2D9] mt-4 font-bold flex items-center gap-2.5 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5391C] shrink-0" />
                <span>Core Rule: Users miss everything outside their immediate visual focus point.</span>
              </div>
            </div>

            {/* Lab 2: Cognition & Short-Term Working Memory */}
            <div className="bg-white border-2 border-[#E8E2D9] p-6 lg:p-8 rounded-2xl flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE3]">
                  <span className="text-xs sm:text-sm font-mono text-[#E5391C] font-bold uppercase tracking-wider">
                    02 · SHORT-TERM MEMORY
                  </span>
                  <Brain className="w-6 h-6 text-[#E5391C]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#2D2D2E]">
                  Working Memory: ~4 Items
                </h3>
                <p className="text-base sm:text-lg text-[#525254] leading-relaxed">
                  The human brain can only hold about 4 pieces of active information at once. Stacking more causes immediate forgetting and confusion.
                </p>

                {/* Interactive Working Memory Slots */}
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs sm:text-sm">
                    <span className="font-bold text-stone-700">HUMAN MEMORY SLOTS ({workingMemory.length}/4):</span>
                    {workingMemory.length >= 4 && (
                      <span className="text-red-600 font-bold animate-pulse">MEMORY FULL</span>
                    )}
                  </div>

                  {/* 4 Memory Slots */}
                  <div className="grid grid-cols-2 gap-2">
                    {[0, 1, 2, 3].map(i => (
                      <div
                        key={i}
                        className={`p-2.5 rounded-lg text-xs sm:text-sm font-mono text-center border truncate ${
                          workingMemory[i]
                            ? 'bg-red-50 border-red-300 text-red-800 font-bold'
                            : 'bg-white border-stone-200 text-stone-400 border-dashed'
                        }`}
                      >
                        {workingMemory[i] || `Slot ${i + 1} (Empty)`}
                      </div>
                    ))}
                  </div>

                  {/* Add chunk buttons */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {testItems.slice(0, 4).map((it, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAddChunk(it)}
                        className="px-2.5 py-1 text-xs sm:text-sm font-mono bg-white border border-stone-300 hover:border-[#E5391C] rounded-md cursor-pointer font-medium"
                      >
                        + {it}
                      </button>
                    ))}
                  </div>

                  {memoryOverflow && (
                    <div className="text-xs sm:text-sm font-mono font-bold text-red-700 bg-red-100 p-2 rounded-lg">
                      ⚠️ Memory Overload: Oldest item was pushed out and forgotten!
                    </div>
                  )}
                </div>

                <ul className="space-y-1.5 text-sm sm:text-base text-[#6E6D70] font-mono">
                  <li>• Short-term memory fades within 10 to 15 seconds without rehearsal</li>
                  <li>• Forcing users to memorize codes produces instant frustration</li>
                </ul>
              </div>

              <div className="text-sm sm:text-base font-mono text-[#2D2D2E] bg-[#FAF9F6] p-4 rounded-xl border border-[#E8E2D9] mt-4 font-bold flex items-center gap-2.5 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5391C] shrink-0" />
                <span>Core Rule: Show information on screen; never force the user to remember it.</span>
              </div>
            </div>

            {/* Lab 3: Hand & Finger Motor Movement Speed */}
            <div className="bg-white border-2 border-[#E8E2D9] p-6 lg:p-8 rounded-2xl flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE3]">
                  <span className="text-xs sm:text-sm font-mono text-[#E5391C] font-bold uppercase tracking-wider">
                    03 · MOVEMENT PRECISION
                  </span>
                  <Target className="w-6 h-6 text-[#E5391C]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#2D2D2E]">
                  Target Size & Speed Rule
                </h3>
                <p className="text-base sm:text-lg text-[#525254] leading-relaxed">
                  Moving your finger or cursor to a target takes more time and produces more mistakes when the button is small or far away.
                </p>

                {/* Interactive Target Speed Trial */}
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-3">
                  <div className="font-mono text-xs sm:text-sm font-bold text-stone-700">
                    CLICK TEST: TINY VS LARGE TARGET SPEED:
                  </div>

                  <div className="flex gap-2.5">
                    <button
                      onClick={() => handleStartFitts('small')}
                      className={`px-3 py-1.5 text-xs sm:text-sm font-mono rounded-lg cursor-pointer ${
                        fittsTargetType === 'small' ? 'bg-red-600 text-white font-bold' : 'bg-white border border-stone-300'
                      }`}
                    >
                      Tiny 12px Dot
                    </button>
                    <button
                      onClick={() => handleStartFitts('large')}
                      className={`px-3 py-1.5 text-xs sm:text-sm font-mono rounded-lg cursor-pointer ${
                        fittsTargetType === 'large' ? 'bg-emerald-600 text-white font-bold' : 'bg-white border border-stone-300'
                      }`}
                    >
                      Comfortable 48px Button
                    </button>
                  </div>

                  {/* Target Arena */}
                  <div className="h-20 bg-white border border-stone-200 rounded-xl relative flex items-center justify-center overflow-hidden">
                    <button
                      onClick={handleFittsClick}
                      className={`rounded-full transition-transform active:scale-90 flex items-center justify-center shadow-md cursor-pointer ${
                        fittsTargetType === 'small'
                          ? 'w-4 h-4 bg-red-600 hover:scale-125 ring-4 ring-red-200'
                          : 'w-14 h-14 bg-emerald-600 text-white font-mono text-xs font-bold hover:scale-105 ring-4 ring-emerald-200'
                      }`}
                    >
                      {fittsTargetType === 'large' ? 'TAP HERE' : ''}
                    </button>
                  </div>

                  {fittsAcquisitionTime !== null && (
                    <div className="text-xs sm:text-sm font-mono font-bold text-emerald-900 bg-emerald-50 p-2.5 rounded-lg flex justify-between border border-emerald-200">
                      <span>Click Duration: {fittsAcquisitionTime} ms</span>
                      <span>{fittsTargetType === 'small' ? 'Slow & High Effort' : 'Fast & Effortless'}</span>
                    </div>
                  )}
                </div>

                <ul className="space-y-1.5 text-sm sm:text-base text-[#6E6D70] font-mono">
                  <li>• Larger, closer buttons are exponentially faster to click</li>
                  <li>• Touch targets on mobile screens should be at least 48x48 pixels</li>
                </ul>
              </div>

              <div className="text-sm sm:text-base font-mono text-[#2D2D2E] bg-[#FAF9F6] p-4 rounded-xl border border-[#E8E2D9] mt-4 font-bold flex items-center gap-2.5 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5391C] shrink-0" />
                <span>Core Rule: Screen edges and corners are fastest to hit because you cannot overshoot them.</span>
              </div>
            </div>
          </div>

          <div className="p-5 lg:p-6 bg-[#FDF5F2] border-l-4 border-[#E5391C] rounded-r-2xl text-center text-xl sm:text-2xl font-serif italic text-[#2D2D2E] flex-shrink-0">
            "Human biology has not received a firmware update in 50,000 years."
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
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
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-12 xl:p-14 bg-[#FAF9F6] select-text">
        <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-6 lg:h-7 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 2 · Interaction as Translation
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 12 / 45</span>
        </div>

        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-4 lg:py-6 gap-6">
          <div className="text-center space-y-3 flex-shrink-0">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E]">
              What is the "Interaction"?
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl text-[#6E6D70] max-w-4xl mx-auto">
              A continuous dialogue of bilateral translation across two radically different mediums.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 items-stretch">
            <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 xl:p-10 rounded-2xl flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <span className="text-xs sm:text-sm font-mono text-[#6E6D70] uppercase font-bold tracking-wider">
                  The Machine Domain
                </span>
                <h3 className="text-3xl sm:text-4xl font-serif-display text-[#2D2D2E]">Binary & State</h3>
                <ul className="space-y-3 text-lg sm:text-xl lg:text-2xl text-[#525254]">
                  <li>• Voltage levels in silicon circuits</li>
                  <li>• Memory addresses and register pointers</li>
                  <li>• Relational table foreign keys & SQL commits</li>
                  <li>• Millisecond clock cycles and CPU interrupts</li>
                </ul>
              </div>
              <div className="text-base sm:text-lg font-mono text-[#2D2D2E] bg-[#FAF9F6] px-5 py-3 rounded-xl mt-4 border border-[#E8E2D9] font-bold flex items-center gap-2.5 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6E6D70] shrink-0" />
                <span>Machine Environment: Deterministic, Inflexible & Literal</span>
              </div>
            </div>

            <div className="bg-[#FDF5F2] border-2 border-[#E5391C] p-6 lg:p-8 xl:p-10 rounded-2xl flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <span className="text-xs sm:text-sm font-mono text-[#E5391C] uppercase font-bold tracking-wider">
                  The Human Domain
                </span>
                <h3 className="text-3xl sm:text-4xl font-serif-display text-[#2D2D2E]">Intent & Meaning</h3>
                <ul className="space-y-3 text-lg sm:text-xl lg:text-2xl text-[#525254]">
                  <li>• Personal aspirations and emotional goals</li>
                  <li>• Visual patterns, metaphors, and real-world symbols</li>
                  <li>• Physical muscle movements, gestures, and gaze</li>
                  <li>• Subjective feeling of progress, agency, and control</li>
                </ul>
              </div>
              <div className="text-base sm:text-lg font-mono text-[#E5391C] bg-white px-5 py-3 rounded-xl mt-4 border border-[#FAD6CF] font-bold flex items-center gap-2.5 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5391C] shrink-0" />
                <span>Human Environment: Heuristic, Contextual & Emotion-Driven</span>
              </div>
            </div>
          </div>

          <div className="p-4 lg:p-5 bg-white border border-[#E8E2D9] rounded-2xl text-center text-base sm:text-lg lg:text-xl text-[#2D2D2E] font-medium shadow-xs flex-shrink-0">
            <strong>The Interaction Designer's Job:</strong> To build a translation layer so transparent that the human feels they are manipulating their goal directly.
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
          Next: The fundamental circular interaction loop
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 13: THE FUNDAMENTAL INTERACTION LOOP (Norman's 7 Stages of Action)
  // --------------------------------------------------------------------------
  if (slide.id === 13) {
    const stages = [
      {
        num: 1,
        name: 'Form the Goal',
        hemisphere: 'Goal',
        question: 'What do I want to accomplish?',
        mentalAction: 'User establishes an internal desire: "I want to illuminate the room to read comfortably."',
        designTrap: 'System forces the user to understand internal machine architecture before knowing what is possible.',
        remedy: 'Ground system architecture around human goals, hiding backend database schemas.',
        icon: Target,
        color: 'text-amber-600 bg-amber-50 border-amber-300',
      },
      {
        num: 2,
        name: 'Plan the Action',
        hemisphere: 'Execution',
        question: 'What sequence will achieve it?',
        mentalAction: 'Formulate a sequence strategy: "I need to turn on the desk lamp."',
        designTrap: 'Multi-step workflows with hidden prerequisites, modality traps, or non-obvious modes.',
        remedy: 'Minimize cognitive planning steps; make common paths direct, visible, and 1-click.',
        icon: Workflow,
        color: 'text-blue-700 bg-blue-50 border-blue-300',
      },
      {
        num: 3,
        name: 'Specify Action',
        hemisphere: 'Execution',
        question: 'Which control do I touch?',
        mentalAction: 'Locate the physical switch and determine direction: "Flip rocker switch upward."',
        designTrap: 'Cryptic icons, hidden hamburger menus, or controls that lack clear signifiers.',
        remedy: 'Clear signifiers, strong physical affordances, and natural mapping to 3D space.',
        icon: MousePointer,
        color: 'text-blue-700 bg-blue-50 border-blue-300',
      },
      {
        num: 4,
        name: 'Perform / Execute',
        hemisphere: 'Execution',
        question: 'Move muscles and execute',
        mentalAction: 'Physical motor execution: Index finger exerts physical force onto the rocker switch.',
        designTrap: 'Tiny touch targets (<48px), slippery hitboxes, or excessive physical motor friction.',
        remedy: 'Generously sized buttons (at least 48×48px) that are easy to hit with immediate tactile and sound feedback.',
        icon: Hand,
        color: 'text-blue-700 bg-blue-50 border-blue-300',
      },
      {
        num: 5,
        name: 'Perceive State',
        hemisphere: 'Evaluation',
        question: 'What did the system do?',
        mentalAction: 'Sensory perception: Photons hit retina as the bulb illuminates; auditory click heard.',
        designTrap: 'Silent or invisible state changes; long network delays with zero visual indication.',
        remedy: 'Instant multi-sensory feedback within 100ms of any physical motor input.',
        icon: Eye,
        color: 'text-emerald-700 bg-emerald-50 border-emerald-300',
      },
      {
        num: 6,
        name: 'Interpret Meaning',
        hemisphere: 'Evaluation',
        question: 'What does feedback mean?',
        mentalAction: 'Cognitive decoding: "Bright warm light is on; the desk lamp is operational."',
        designTrap: 'Cryptic error codes (e.g. `ERR_0x8F`) or ambiguous blinking status icons.',
        remedy: 'Plain-language status messages and clear color cues showing exactly what the machine did.',
        icon: Brain,
        color: 'text-emerald-700 bg-emerald-50 border-emerald-300',
      },
      {
        num: 7,
        name: 'Compare to Goal',
        hemisphere: 'Evaluation',
        question: 'Is my goal satisfied?',
        mentalAction: 'Goal evaluation: "The room is lit. I can now read comfortably. Interaction closed!"',
        designTrap: 'User left wondering if transaction completed, triggering panic double-clicks.',
        remedy: 'Clear terminal confirmation state that provides psychological closure.',
        icon: CheckCircle2,
        color: 'text-emerald-700 bg-emerald-50 border-emerald-300',
      },
    ];

    const activeStage = stages[interactiveLoopStep % stages.length];

    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-12 xl:p-14 bg-[#FAF9F6] select-text">
        {/* Clean Header with UM6P Emblem */}
        <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-7 lg:h-8 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 2 · Norman's Seven Stages of Action
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 13 / 45</span>
        </div>

        {/* Spacious, Clean & High-Visibility Action Cycle */}
        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-3 lg:py-5 gap-5">
          <div className="text-center space-y-2 flex-shrink-0">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E]">
              The Fundamental Interaction Loop
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl text-[#6E6D70] max-w-4xl mx-auto font-light">
              Every interaction cycles continuously across two mental hemispheres: <strong className="text-blue-700 font-semibold">Execution</strong> (doing) and <strong className="text-emerald-700 font-semibold">Evaluation</strong> (checking).
            </p>
          </div>

          {/* 7 Clean Sequential Stage Cards (Enlarged) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3.5 flex-shrink-0">
            {stages.map((st, idx) => {
              const isSelected = interactiveLoopStep === idx;
              const isGoal = st.hemisphere === 'Goal';
              const isExec = st.hemisphere === 'Execution';

              return (
                <button
                  key={st.num}
                  onClick={() => setInteractiveLoopStep(idx)}
                  className={`p-4 sm:p-5 rounded-2xl flex flex-col justify-between text-left transition-all cursor-pointer border-2 shadow-xs ${
                    isSelected
                      ? 'bg-stone-900 border-[#E5391C] text-white ring-4 ring-[#E5391C]/20 shadow-xl scale-[1.03]'
                      : isGoal
                      ? 'bg-amber-50/90 border-amber-200 hover:border-amber-400 text-[#2D2D2E]'
                      : isExec
                      ? 'bg-blue-50/90 border-blue-200 hover:border-blue-400 text-[#2D2D2E]'
                      : 'bg-emerald-50/90 border-emerald-200 hover:border-emerald-400 text-[#2D2D2E]'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs sm:text-sm font-mono font-bold px-2.5 py-1 rounded-lg ${
                        isSelected ? 'bg-[#E5391C] text-white' : isGoal ? 'bg-amber-200 text-amber-900' : isExec ? 'bg-blue-200 text-blue-900' : 'bg-emerald-200 text-emerald-900'
                      }`}>
                        Stage {st.num}
                      </span>
                      <span className={`text-xs font-mono uppercase font-bold ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                        {st.hemisphere}
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg lg:text-xl font-bold font-serif-display leading-tight">
                      {st.name}
                    </h4>
                  </div>
                  <div className={`text-xs sm:text-sm font-mono pt-2.5 border-t mt-3 font-bold ${
                    isSelected ? 'border-stone-700 text-[#E5391C]' : 'border-stone-200 text-stone-600'
                  }`}>
                    {isSelected ? '▶ INSPECTING' : 'CLICK TO VIEW'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Deep Selected Stage Spotlight (Massive, High-Contrast & Clear) */}
          <div className="bg-white border-2 border-[#E8E2D9] rounded-2xl p-6 lg:p-8 xl:p-10 shadow-sm flex-1 flex flex-col justify-between space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F0EBE3]">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-mono text-3xl font-bold border-2 shadow-xs ${activeStage.color}`}>
                  0{activeStage.num}
                </div>
                <div>
                  <div className="text-sm sm:text-base font-mono uppercase tracking-wider text-[#6E6D70] font-bold">
                    {activeStage.hemisphere} Hemisphere · Stage {activeStage.num} of 7
                  </div>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-bold text-[#2D2D2E]">
                    {activeStage.name}
                  </h3>
                </div>
              </div>
              <div className="px-5 py-3 bg-[#FDF5F2] border border-[#FAD6CF] rounded-2xl text-sm sm:text-base lg:text-lg font-mono text-[#E5391C] font-bold self-start sm:self-auto shadow-xs">
                Key Question: "{activeStage.question}"
              </div>
            </div>

            {/* 3 Clear Large Columns: Mental Action, Where It Breaks, and Design Remedy */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-base sm:text-lg lg:text-xl leading-relaxed">
              <div className="p-5 lg:p-6 bg-[#FAF9F6] border border-[#E8E2D9] rounded-2xl space-y-2 shadow-2xs">
                <div className="text-xs sm:text-sm font-mono uppercase text-stone-600 font-bold tracking-wider flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-stone-500" />
                  <span>1. Human Mental Action:</span>
                </div>
                <p className="text-[#2D2D2E] font-medium pt-1">
                  {activeStage.mentalAction}
                </p>
              </div>

              <div className="p-5 lg:p-6 bg-red-50/70 border border-red-200 rounded-2xl space-y-2 shadow-2xs">
                <div className="text-xs sm:text-sm font-mono uppercase text-red-700 font-bold tracking-wider flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                  <span>2. Where Bad Design Breaks:</span>
                </div>
                <p className="text-red-950 font-medium pt-1">
                  {activeStage.designTrap}
                </p>
              </div>

              <div className="p-5 lg:p-6 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2 shadow-2xs">
                <div className="text-xs sm:text-sm font-mono uppercase text-emerald-800 font-bold tracking-wider flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <span>3. The HCI Design Remedy:</span>
                </div>
                <p className="text-emerald-950 font-medium pt-1">
                  {activeStage.remedy}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
          Next: Live experiment demonstrating what happens when feedback is removed
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 15: THE TWIN GULFS (Theoretical Explanation & Interactive Diagnostic)
  // --------------------------------------------------------------------------
  if (slide.id === 15) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-12 xl:p-14 bg-[#FAF9F6] select-text">
        {/* Header with Clean UM6P Emblem */}
        <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-6 lg:h-7 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 2 · Norman's Twin Gulfs
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 15 / 45</span>
        </div>

        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-2 lg:py-4 gap-4">
          {/* Top Bar with Mode Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-medium text-[#2D2D2E]">
                The Twin Gulfs: Execution & Evaluation
              </h2>
              <p className="text-base sm:text-lg text-[#6E6D70]">
                Don Norman’s definitive framework for diagnosing every interaction failure in human history.
              </p>
            </div>

            {/* Toggle: Theory vs Live Demo */}
            <div className="flex items-center gap-1.5 bg-white border border-[#E8E2D9] p-1 rounded-xl shadow-xs">
              <button
                onClick={() => setTwinGulfTab('framework')}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  twinGulfTab === 'framework' ? 'bg-[#2D2D2E] text-white shadow-xs' : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                📐 Theoretical Foundation
              </button>
              <button
                onClick={() => setTwinGulfTab('intuition')}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  twinGulfTab === 'intuition' ? 'bg-[#E5391C] text-white shadow-xs' : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>🎯 Live Interactive Showdown</span>
              </button>
            </div>
          </div>

          {/* VIEW 1: THEORETICAL FRAMEWORK */}
          {twinGulfTab === 'framework' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 flex-1 items-stretch">
              {/* 1. Gulf of Execution */}
              <div className="bg-white border-2 border-blue-200 p-6 lg:p-8 xl:p-10 rounded-2xl flex flex-col justify-between shadow-xs space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-blue-100">
                    <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-blue-700 font-bold">
                      1. The Gulf of Execution (Forward / Downstream)
                    </span>
                    <ArrowRight className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif-display font-bold text-[#2D2D2E]">
                    "How do I do what I want to do?"
                  </h3>
                  <p className="text-base sm:text-lg lg:text-xl text-[#525254] leading-relaxed">
                    The psychological distance between a human's internal intention and the physical input actions permitted by the machine.
                  </p>
                  <ul className="space-y-2.5 text-base sm:text-lg text-stone-700 font-mono pt-2">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Manifests when controls lack affordances or clear signifiers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>User is stranded wondering where to tap or click</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Violates natural mapping and human mental models</span>
                    </li>
                  </ul>
                </div>

                <div className="text-base sm:text-lg font-mono bg-blue-50 p-4 sm:p-5 rounded-xl text-blue-950 border border-blue-200 mt-4 font-bold flex items-start gap-2.5 shadow-xs">
                  <span className="text-blue-600 font-bold text-xl">▸</span>
                  <span>Bridged by: Affordances, Signifiers, Constraints & Natural Mapping.</span>
                </div>
              </div>

              {/* 2. Gulf of Evaluation */}
              <div className="bg-[#FDF5F2] border-2 border-[#E5391C] p-6 lg:p-8 xl:p-10 rounded-2xl flex flex-col justify-between shadow-sm space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#FAD6CF]">
                    <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#E5391C] font-bold">
                      2. The Gulf of Evaluation (Backward / Upstream)
                    </span>
                    <RefreshCw className="w-6 h-6 text-[#E5391C]" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif-display font-bold text-[#2D2D2E]">
                    "What just happened? What state is it in?"
                  </h3>
                  <p className="text-base sm:text-lg lg:text-xl text-[#525254] leading-relaxed">
                    The difficulty of assessing the internal state of the machine and verifying whether the initial goal was successfully achieved.
                  </p>
                  <ul className="space-y-2.5 text-base sm:text-lg text-stone-700 font-mono pt-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#E5391C] font-bold">•</span>
                      <span>Manifests when actions lack immediate sensory feedback</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#E5391C] font-bold">•</span>
                      <span>User assumes action failed and frantically double-clicks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#E5391C] font-bold">•</span>
                      <span>System state is invisible, delayed, or cryptic</span>
                    </li>
                  </ul>
                </div>

                <div className="text-base sm:text-lg font-mono bg-white p-4 sm:p-5 rounded-xl text-[#E5391C] border border-[#F0D5CB] mt-4 font-bold flex items-start gap-2.5 shadow-xs">
                  <span className="text-[#E5391C] font-bold text-xl">▸</span>
                  <span>Bridged by: Immediate Feedback, Visible System State & Feedforward.</span>
                </div>
              </div>
            </div>
          ) : (
            /* VIEW 2: LIVE INTERACTIVE DIAGNOSTIC SHOWDOWN */
            <div className="flex-1 flex flex-col justify-between gap-3">
              {/* Active Goal Header Banner */}
              <div className="p-3 bg-white border-2 border-[#E5391C] rounded-2xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-shrink-0">
                <div className="space-y-0.5">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#E5391C] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#E5391C] animate-ping" />
                    <span>ACTIVE USER GOAL</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif-display font-bold text-[#2D2D2E]">
                    "Set Lecture Hall Amphitheater Temperature to 21°C before the lecture starts."
                  </h3>
                </div>
                <div className="text-xs font-mono text-stone-500 bg-[#FAF9F6] px-3 py-1.5 rounded-xl border border-stone-200 font-semibold self-start sm:self-auto">
                  Current Room Temp: <span className="font-bold text-stone-800">26°C</span>
                </div>
              </div>

              {/* Side-by-Side Dual Live Interactive Simulators */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 items-stretch">
                {/* INTERFACE A: FLAWED DESIGN (MASSIVE GULFS) */}
                <div className="bg-stone-900 border-2 border-red-500/80 rounded-2xl p-4 flex flex-col justify-between text-white shadow-md space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                      <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold uppercase">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        <span>Interface A: Flawed Design</span>
                      </div>
                      <span className="text-[10px] font-mono text-red-300 bg-red-950 px-2 py-0.5 rounded border border-red-800">
                        MASSIVE GULFS
                      </span>
                    </div>

                    {/* Cryptic Hardware Display Unit */}
                    <div className="bg-black border-2 border-stone-700 rounded-xl p-3 font-mono space-y-2 shadow-inner">
                      <div className="flex justify-between text-[10px] text-stone-500 border-b border-stone-900 pb-1">
                        <span>SYS_HVAC_REV_3</span>
                        <span className="text-amber-500">{flawedIsDelayed ? '⏳ PROCESSING...' : '● STANDBY'}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs py-1">
                        <div className="p-1.5 bg-stone-950 rounded border border-stone-800 text-stone-300">
                          <div className="text-[9px] text-stone-500">HEX REGISTER:</div>
                          <div className="text-emerald-400 font-bold">{flawedAcHex}</div>
                        </div>
                        <div className="p-1.5 bg-stone-950 rounded border border-stone-800 text-stone-300">
                          <div className="text-[9px] text-stone-500">SYSTEM STAT:</div>
                          <div className="text-amber-300 font-bold truncate">{flawedAcStatus}</div>
                        </div>
                      </div>
                    </div>

                    {/* Cryptic Unlabeled Physical Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => {
                          setFlawedClicksCount(prev => prev + 1);
                          setFlawedAcStatus('MODE: 0x02_PRG');
                        }}
                        className="p-2.5 bg-stone-800 hover:bg-stone-700 rounded-xl font-mono text-xs font-bold text-stone-200 border border-stone-600 cursor-pointer active:scale-95"
                      >
                        [F1: MOD_HEX]
                      </button>
                      <button
                        onClick={() => {
                          setFlawedClicksCount(prev => prev + 1);
                          setFlawedAcHex(prev => prev.includes('4B') ? 'REG: 0x4C_RAW' : 'REG: 0x4B_RAW');
                        }}
                        className="p-2.5 bg-stone-800 hover:bg-stone-700 rounded-xl font-mono text-xs font-bold text-stone-200 border border-stone-600 cursor-pointer active:scale-95"
                      >
                        [PARAM_UP]
                      </button>
                      <button
                        onClick={() => {
                          setFlawedClicksCount(prev => prev + 1);
                          setFlawedAcHex('REG: 0x21_RAW');
                          setFlawedAcStatus('REG_WRITTEN');
                        }}
                        className="p-2.5 bg-stone-800 hover:bg-stone-700 rounded-xl font-mono text-xs font-bold text-stone-200 border border-stone-600 cursor-pointer active:scale-95"
                      >
                        [VAL_0x21]
                      </button>
                      <button
                        onClick={() => {
                          setFlawedClicksCount(prev => prev + 1);
                          setFlawedIsDelayed(true);
                          setTimeout(() => {
                            setFlawedIsDelayed(false);
                            setFlawedAcStatus('ACK: CODE 0x00');
                          }, 4000);
                        }}
                        className="p-2.5 bg-red-900 hover:bg-red-800 rounded-xl font-mono text-xs font-bold text-white border border-red-700 cursor-pointer active:scale-95"
                      >
                        [EXEC_COMMIT]
                      </button>
                    </div>
                  </div>

                  {/* Gulf Diagnostics for Interface A */}
                  <div className="space-y-1.5 pt-2 border-t border-stone-800 text-xs font-mono">
                    <div className="p-2 bg-red-950/60 border border-red-800/80 rounded-xl space-y-0.5 text-red-200">
                      <div className="font-bold text-red-400">💥 Gulf of Execution:</div>
                      <div>User doesn't know which button sets 21°C. Zero affordance or natural mapping.</div>
                    </div>
                    <div className="p-2 bg-red-950/60 border border-red-800/80 rounded-xl space-y-0.5 text-red-200">
                      <div className="font-bold text-red-400">💥 Gulf of Evaluation:</div>
                      <div>Screen gives no confirmation if 21°C was set or if AC is running. Panic clicks: <span className="font-bold text-white">{flawedClicksCount}</span>.</div>
                    </div>
                  </div>
                </div>

                {/* INTERFACE B: INTUITIVE DESIGN (BRIDGED GULFS) */}
                <div className="bg-white border-2 border-emerald-500 rounded-2xl p-4 flex flex-col justify-between shadow-md space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
                      <div className="flex items-center gap-2 text-emerald-700 font-mono text-xs font-bold uppercase">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                        <span>Interface B: Intuitive Design</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-bold border border-emerald-300">
                        BRIDGED GULFS
                      </span>
                    </div>

                    {/* Sleek Direct-Manipulation Climate Console */}
                    <div className={`p-4 rounded-xl border-2 transition-all space-y-3 ${
                      intuitiveFeedbackPulse ? 'bg-emerald-50 border-emerald-400 ring-4 ring-emerald-200' : 'bg-slate-900 border-slate-700 text-white'
                    }`}>
                      <div className="flex justify-between items-center text-xs font-mono text-slate-400 border-b border-slate-800 pb-1.5">
                        <span>UM6P SMART CLIMATE</span>
                        <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          {intuitiveAcActive ? '● COOLING ACTIVE' : 'STANDBY'}
                        </span>
                      </div>

                      {/* Temperature Dial & Direct Controls */}
                      <div className="flex items-center justify-between py-1">
                        <div className="space-y-0.5">
                          <div className="text-xs font-mono text-slate-400">TARGET TEMPERATURE</div>
                          <div className="text-4xl font-bold font-mono text-emerald-400 flex items-baseline gap-1">
                            {intuitiveAcTemp}°C
                            <span className="text-xs font-normal text-slate-400">(Room: 26°C)</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setIntuitiveAcTemp(prev => Math.max(18, prev - 1));
                              setIntuitiveAcActive(true);
                              setIntuitiveFeedbackPulse(true);
                              setTimeout(() => setIntuitiveFeedbackPulse(false), 300);
                            }}
                            className="w-12 h-12 bg-slate-800 hover:bg-slate-700 active:scale-90 text-white rounded-xl text-xl font-mono font-bold flex items-center justify-center border border-slate-600 cursor-pointer shadow-sm"
                          >
                            -
                          </button>
                          <button
                            onClick={() => {
                              setIntuitiveAcTemp(prev => Math.min(30, prev + 1));
                              setIntuitiveAcActive(true);
                              setIntuitiveFeedbackPulse(true);
                              setTimeout(() => setIntuitiveFeedbackPulse(false), 300);
                            }}
                            className="w-12 h-12 bg-slate-800 hover:bg-slate-700 active:scale-90 text-white rounded-xl text-xl font-mono font-bold flex items-center justify-center border border-slate-600 cursor-pointer shadow-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* 1-Click Goal Preset Button */}
                      <button
                        onClick={() => {
                          setIntuitiveAcTemp(21);
                          setIntuitiveAcActive(true);
                          setIntuitiveFeedbackPulse(true);
                          setTimeout(() => setIntuitiveFeedbackPulse(false), 400);
                        }}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm ${
                          intuitiveAcTemp === 21 && intuitiveAcActive
                            ? 'bg-emerald-600 text-white ring-2 ring-emerald-300'
                            : 'bg-[#E5391C] hover:bg-[#C92B10] text-white'
                        }`}
                      >
                        <span>🎯 1-Click Preset: Set 21°C (Lecture Comfort)</span>
                      </button>
                    </div>
                  </div>

                  {/* Gulf Diagnostics for Interface B */}
                  <div className="space-y-1.5 pt-2 border-t border-emerald-100 text-xs font-mono">
                    <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-xl space-y-0.5 text-emerald-950">
                      <div className="font-bold text-emerald-800">✓ Gulf of Execution Bridged:</div>
                      <div>Direct affordance (+ / - buttons and 21°C preset). Physical action matches mental intent in 1 tap.</div>
                    </div>
                    <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-xl space-y-0.5 text-emerald-950">
                      <div className="font-bold text-emerald-800">✓ Gulf of Evaluation Bridged:</div>
                      <div>Instant 0ms sensory confirmation, visual temperature target, and clear state readout: {intuitiveAcTemp === 21 ? 'Target 21°C Achieved!' : 'Updated'}.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Diagnostic Takeaway */}
          <div className="p-3.5 bg-white border border-[#E8E2D9] rounded-2xl text-center text-sm font-medium text-[#2D2D2E] shadow-xs flex-shrink-0">
            <strong>The Universal Takeaway:</strong> Every human interaction failure is either an inability to perform intent (<strong>Gulf of Execution</strong>) or an inability to perceive state (<strong>Gulf of Evaluation</strong>).
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
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
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-12 xl:p-14 bg-[#FAF9F6] select-text">
        <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-6 lg:h-7 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 2 · Disciplinary Boundaries
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 16 / 45</span>
        </div>

        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-4 lg:py-6 gap-6">
          <div className="text-center space-y-3 flex-shrink-0">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E]">
              Clarifying the Triad: HCI · UX · UI
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl text-[#6E6D70] max-w-4xl mx-auto">
              Commonly conflated in industry; distinct in academic and engineering practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-stretch">
            {/* UI */}
            <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 xl:p-10 rounded-2xl flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <span className="text-xs sm:text-sm font-mono text-[#6E6D70] uppercase tracking-widest font-bold">
                  The Surface
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif-display text-[#2D2D2E]">UI (User Interface)</h3>
                <p className="text-lg sm:text-xl lg:text-2xl text-[#525254] leading-relaxed">
                  The visual and tactile contact point. Typography, palettes, buttons, grid alignment, spacing, iconography.
                </p>
                <ul className="space-y-1.5 text-base text-[#6E6D70] font-mono pt-1">
                  <li>• Design systems, Figma tokens, CSS classes</li>
                  <li>• Color contrast ratios, micro-animations</li>
                </ul>
              </div>
              <div className="text-base sm:text-lg font-mono text-[#2D2D2E] pt-3.5 border-t border-[#F0EBE3] mt-4 font-bold flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6E6D70] shrink-0" />
                <span>Analogy: The steering wheel and paint job.</span>
              </div>
            </div>

            {/* UX */}
            <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 xl:p-10 rounded-2xl flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <span className="text-xs sm:text-sm font-mono text-[#E5391C] uppercase tracking-widest font-bold">
                  The Journey
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif-display text-[#2D2D2E]">UX (User Experience)</h3>
                <p className="text-lg sm:text-xl lg:text-2xl text-[#525254] leading-relaxed">
                  The holistic end-to-end journey. Expectations, purchasing, onboarding, customer support, emotional feeling.
                </p>
                <ul className="space-y-1.5 text-base text-[#6E6D70] font-mono pt-1">
                  <li>• User journeys, empathy maps, churn rates</li>
                  <li>• Service blueprints and customer sentiment</li>
                </ul>
              </div>
              <div className="text-base sm:text-lg font-mono text-[#2D2D2E] pt-3.5 border-t border-[#F0EBE3] mt-4 font-bold flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5391C] shrink-0" />
                <span>Analogy: The entire experience of owning the vehicle.</span>
              </div>
            </div>

            {/* HCI */}
            <div className="bg-[#FDF5F2] border-2 border-[#E5391C] p-6 lg:p-8 xl:p-10 rounded-2xl flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <span className="text-xs sm:text-sm font-mono text-[#E5391C] uppercase tracking-widest font-bold">
                  The Science
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif-display text-[#2D2D2E]">HCI (The Discipline)</h3>
                <p className="text-lg sm:text-xl lg:text-2xl text-[#525254] leading-relaxed">
                  The empirical science governing how humans perceive, process, and act through computational systems.
                </p>
                <ul className="space-y-1.5 text-base text-[#E5391C] font-mono pt-1">
                  <li>• Cognitive psychology, human perceptual limits</li>
                  <li>• Mathematical laws of human motion, reaction time, and error rates</li>
                </ul>
              </div>
              <div className="text-base sm:text-lg font-mono text-[#E5391C] font-bold pt-3.5 border-t border-[#FAD6CF] mt-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5391C] shrink-0" />
                <span>Analogy: The biomechanical and engine physics.</span>
              </div>
            </div>
          </div>

          <div className="p-4 lg:p-5 bg-white border border-[#E8E2D9] rounded-2xl text-center text-base sm:text-lg lg:text-xl text-[#2D2D2E] font-medium shadow-xs flex-shrink-0">
            HCI provides the empirical foundation upon which UX and UI are constructed
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
          Next: Slide 17 & 18 — Lab Experiment 2
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 17: CLASSROOM ACTIVITY: MAP THE TRIAD (Interactive Coffee Station & 2-Min Timer)
  // --------------------------------------------------------------------------
  if (slide.id === 17) {
    const formatTimer = (sec: number) => {
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-12 xl:p-14 bg-[#FAF9F6] select-text">
        {/* Header Bar */}
        <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-7 lg:h-8 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 2 · Classroom Think-Pair-Share Activity
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 17 / 45</span>
        </div>

        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-2 lg:py-4 gap-4">
          {/* Slide Heading */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-shrink-0">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-medium text-[#2D2D2E]">
                Classroom Lab: Dissecting an Everyday Interface
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-[#6E6D70] font-light">
                Examine the Smart Campus Coffee Distributor below. Map its architecture to the <strong>HCI Triad</strong> and <strong>Twin Gulfs</strong>.
              </p>
            </div>
            <div className="px-5 py-2.5 bg-[#FDF5F2] border border-[#FAD6CF] rounded-xl text-sm sm:text-base font-mono text-[#E5391C] font-bold self-start sm:self-auto shadow-xs">
              Pair Discussion · 2 Minutes
            </div>
          </div>

          {/* 2-Column Main Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-stretch">
            {/* LEFT COLUMN: INTERACTIVE SMART CAMPUS COFFEE DISTRIBUTOR (5 COLS) */}
            <div className="lg:col-span-5 xl:col-span-5 bg-stone-900 border-2 border-stone-700 rounded-3xl p-5 sm:p-6 text-white flex flex-col justify-between shadow-xl space-y-4">
              <div className="space-y-3">
                {/* Vending Machine Header Bar */}
                <div className="flex justify-between items-center border-b border-stone-800 pb-2 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-[#E5391C]" />
                    <span className="font-bold tracking-wider text-stone-200">UM6P CAMPUS BARISTA v3.2</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${coffeeState === 'brewing' ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                    <span className="text-stone-400 uppercase">{coffeeState === 'brewing' ? 'BREWING' : 'ONLINE'}</span>
                  </div>
                </div>

                {/* Drink Selection Grid */}
                <div>
                  <div className="text-xs font-mono text-stone-400 uppercase font-bold mb-1.5">
                    Step 1: Select Beverage
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'espresso', name: 'Espresso', price: '8 MAD', icon: '☕' },
                      { id: 'latte', name: 'Café Latte', price: '12 MAD', icon: '🥛' },
                      { id: 'cappuccino', name: 'Cappuccino', price: '12 MAD', icon: '☕' },
                      { id: 'tea', name: 'Mint Tea', price: '6 MAD', icon: '🌿' },
                    ].map((d) => (
                      <button
                        key={d.id}
                        onClick={() => {
                          setCoffeeDrink(d.id as any);
                          if (coffeeState === 'dispensed' || coffeeState === 'error_nocup') setCoffeeState('idle');
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          coffeeDrink === d.id
                            ? 'bg-[#E5391C] border-[#E5391C] text-white shadow-md scale-[1.02]'
                            : 'bg-stone-800/80 border-stone-700 hover:border-stone-500 text-stone-200'
                        }`}
                      >
                        <div className="text-lg">{d.icon}</div>
                        <div className="text-xs font-bold font-serif-display leading-tight mt-1">{d.name}</div>
                        <div className="text-[10px] font-mono text-stone-300 opacity-90">{d.price}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Customization Options */}
                <div className="grid grid-cols-2 gap-3 bg-stone-950 p-3 rounded-2xl border border-stone-800">
                  {/* Sugar Controls */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono text-stone-400">
                      <span>Sugar:</span>
                      <span className="text-amber-400 font-bold">{coffeeSugar} Cubes</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setCoffeeSugar(prev => Math.max(0, prev - 1))}
                        className="w-7 h-7 bg-stone-800 hover:bg-stone-700 rounded-lg text-xs font-mono font-bold flex items-center justify-center cursor-pointer"
                      >
                        -
                      </button>
                      <div className="flex-1 flex justify-center gap-1">
                        {[1, 2, 3, 4].map(s => (
                          <div
                            key={s}
                            className={`w-3 h-3 rounded-xs ${s <= coffeeSugar ? 'bg-amber-400' : 'bg-stone-800'}`}
                          />
                        ))}
                      </div>
                      <button
                        onClick={() => setCoffeeSugar(prev => Math.min(4, prev + 1))}
                        className="w-7 h-7 bg-stone-800 hover:bg-stone-700 rounded-lg text-xs font-mono font-bold flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Milk Controls */}
                  <div className="space-y-1">
                    <div className="text-xs font-mono text-stone-400">Milk Preference:</div>
                    <div className="flex gap-1 text-[11px] font-mono">
                      {[
                        { id: 'none', label: 'None' },
                        { id: 'whole', label: 'Whole' },
                        { id: 'oat', label: 'Oat' },
                      ].map(m => (
                        <button
                          key={m.id}
                          onClick={() => setCoffeeMilk(m.id as any)}
                          className={`flex-1 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                            coffeeMilk === m.id ? 'bg-amber-600 text-white' : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Cup Sensor Simulator Switch & Payment Method */}
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  {/* Cup Sensor Status */}
                  <button
                    onClick={() => setCoffeeCupPlaced(!coffeeCupPlaced)}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                      coffeeCupPlaced
                        ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300'
                        : 'bg-red-950/60 border-red-700 text-red-300 animate-pulse'
                    }`}
                  >
                    <div className="text-[10px] text-stone-400 uppercase font-bold">Optical Sensor:</div>
                    <div className="font-bold flex items-center gap-1.5 mt-0.5">
                      <span>{coffeeCupPlaced ? '✓ Mug Detected' : '⚠️ No Cup Present'}</span>
                    </div>
                    <div className="text-[9px] text-stone-400 mt-1">Tap to toggle sensor state</div>
                  </button>

                  {/* Payment Terminal */}
                  <div className="p-2.5 bg-stone-950 border border-stone-800 rounded-xl space-y-1">
                    <div className="text-[10px] text-stone-400 uppercase font-bold flex justify-between">
                      <span>NFC Payment:</span>
                      <span className="text-emerald-400">35.00 MAD</span>
                    </div>
                    <div className="flex gap-1 text-[9px] font-mono">
                      <button
                        onClick={() => setCoffeePaymentMethod('badge')}
                        className={`flex-1 py-1 rounded font-bold cursor-pointer ${coffeePaymentMethod === 'badge' ? 'bg-[#E5391C] text-white' : 'bg-stone-800 text-stone-400'}`}
                      >
                        Student ID
                      </button>
                      <button
                        onClick={() => setCoffeePaymentMethod('coin')}
                        className={`flex-1 py-1 rounded font-bold cursor-pointer ${coffeePaymentMethod === 'coin' ? 'bg-[#E5391C] text-white' : 'bg-stone-800 text-stone-400'}`}
                      >
                        Coins
                      </button>
                      <button
                        onClick={() => setCoffeePaymentMethod('apple_pay')}
                        className={`flex-1 py-1 rounded font-bold cursor-pointer ${coffeePaymentMethod === 'apple_pay' ? 'bg-[#E5391C] text-white' : 'bg-stone-800 text-stone-400'}`}
                      >
                        ApplePay
                      </button>
                    </div>
                  </div>
                </div>

                {/* Primary Action Button */}
                <button
                  onClick={() => {
                    if (!coffeeCupPlaced) {
                      setCoffeeState('error_nocup');
                      return;
                    }
                    setCoffeeState('brewing');
                    setCoffeeBrewProgress(0);
                  }}
                  disabled={coffeeState === 'brewing'}
                  className={`w-full py-3 rounded-2xl text-sm font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    coffeeState === 'brewing'
                      ? 'bg-amber-600 text-white cursor-wait'
                      : 'bg-[#E5391C] hover:bg-[#C92B10] text-white active:scale-98'
                  }`}
                >
                  <Coffee className="w-5 h-5" />
                  <span>{coffeeState === 'brewing' ? `Brewing ${coffeeDrink.toUpperCase()} (${coffeeBrewProgress}%)...` : `TAP TO DISPENSE (${coffeeDrink.toUpperCase()})`}</span>
                </button>

                {/* State Feedback Display Area */}
                {coffeeState === 'brewing' && (
                  <div className="bg-stone-950 p-2.5 rounded-xl border border-amber-500/50 space-y-1.5">
                    <div className="flex justify-between text-xs font-mono text-amber-400 font-bold">
                      <span className="flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 animate-bounce text-amber-400" />
                        Pressurizing Boiler (9bar · 92°C)
                      </span>
                      <span>{coffeeBrewProgress}%</span>
                    </div>
                    <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-[#E5391C] h-full transition-all duration-300"
                        style={{ width: `${coffeeBrewProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {coffeeState === 'dispensed' && (
                  <div className="p-3 bg-emerald-950 border border-emerald-600 rounded-xl flex items-center justify-between text-xs font-mono text-emerald-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div>
                        <div className="font-bold">Enjoy your {coffeeDrink}!</div>
                        <div className="text-[10px] text-emerald-400/80">Account charged · Cup warm at 65°C</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setCoffeeState('idle')}
                      className="px-2.5 py-1 bg-emerald-800 hover:bg-emerald-700 text-white rounded text-[10px] font-bold cursor-pointer"
                    >
                      Reset Machine
                    </button>
                  </div>
                )}

                {coffeeState === 'error_nocup' && (
                  <div className="p-3 bg-red-950 border border-red-600 rounded-xl flex items-center justify-between text-xs font-mono text-red-300">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                      <div>
                        <div className="font-bold">DISPENSE BLOCKED: No Cup Detected!</div>
                        <div className="text-[10px] text-red-400/80">Place cup in tray or tap sensor toggle above.</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setCoffeeState('idle')}
                      className="px-2.5 py-1 bg-red-800 hover:bg-red-700 text-white rounded text-[10px] font-bold cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                )}
              </div>

              <div className="text-xs font-mono text-stone-400 text-center border-t border-stone-800 pt-2">
                Live Physical Simulation · Test edge cases with your partner
              </div>
            </div>

            {/* RIGHT COLUMN: 2-MINUTE TIMER & ENLARGED CLASSROOM DISCUSSION CHALLENGE (7 COLS) */}
            <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-between space-y-5">
              {/* Interactive Countdown Timer Box */}
              <div className="bg-white border-2 border-[#E8E2D9] rounded-3xl p-6 lg:p-7 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5">
                <div className="space-y-1.5 text-center sm:text-left">
                  <div className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] font-bold tracking-wider flex items-center gap-2 justify-center sm:justify-start">
                    <Timer className="w-5 h-5" />
                    <span>Live Classroom Countdown</span>
                  </div>
                  <div className={`text-6xl sm:text-7xl lg:text-8xl font-mono font-bold tracking-tight ${
                    coffeeTimerSec === 0
                      ? 'text-red-600 animate-pulse'
                      : coffeeTimerSec < 30
                      ? 'text-amber-600'
                      : 'text-[#2D2D2E]'
                  }`}>
                    {formatTimer(coffeeTimerSec)}
                  </div>
                  <div className="text-sm text-[#6E6D70] font-mono">
                    {coffeeTimerRunning ? '● Timer Active · Discuss in pairs now' : coffeeTimerSec === 0 ? '⏰ Time is up! Sharing insights with the class.' : 'Paused · Click Start to begin'}
                  </div>
                </div>

                {/* Timer Controls */}
                <div className="flex flex-wrap sm:flex-col gap-2.5 w-full sm:w-auto">
                  <button
                    onClick={() => setCoffeeTimerRunning(!coffeeTimerRunning)}
                    className={`px-6 py-3.5 rounded-2xl text-sm font-mono font-bold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md ${
                      coffeeTimerRunning
                        ? 'bg-amber-600 hover:bg-amber-700 text-white'
                        : 'bg-[#E5391C] hover:bg-[#C92B10] text-white active:scale-95'
                    }`}
                  >
                    {coffeeTimerRunning ? (
                      <>
                        <Pause className="w-5 h-5" />
                        <span>Pause Timer</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5" />
                        <span>Start 2-Min Timer</span>
                      </>
                    )}
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setCoffeeTimerRunning(false);
                        setCoffeeTimerSec(120);
                      }}
                      className="flex-1 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Reset</span>
                    </button>
                    <button
                      onClick={() => setCoffeeTimerSec(prev => prev + 30)}
                      className="flex-1 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-mono font-bold cursor-pointer"
                    >
                      +30s
                    </button>
                  </div>
                </div>
              </div>

              {/* The 3 Core Discussion Prompts for Students (High Visibility & Bold Readable Text) */}
              <div className="bg-white border-2 border-[#E8E2D9] rounded-3xl p-6 lg:p-8 shadow-xs space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-1 pb-3 border-b border-[#F0EBE3]">
                  <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] font-bold tracking-wider">
                    Pair Discussion Prompt
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif-display font-bold text-[#2D2D2E]">
                    Analyze the Coffee Machine Through HCI
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="p-4 sm:p-5 bg-[#FAF9F6] border border-[#E8E2D9] rounded-2xl space-y-1.5">
                    <div className="font-bold text-[#2D2D2E] text-base sm:text-lg lg:text-xl flex items-center gap-2.5">
                      <span className="w-3 h-3 rounded-full bg-[#E5391C] shrink-0" />
                      <span>1. The Human (Student / Professor at 08:55 AM)</span>
                    </div>
                    <p className="text-sm sm:text-base lg:text-lg text-[#525254] pl-5 leading-relaxed font-normal">
                      What is the user’s mental model, morning cognitive load, sensory attention, and motor precision before their first lecture?
                    </p>
                  </div>

                  <div className="p-4 sm:p-5 bg-[#FAF9F6] border border-[#E8E2D9] rounded-2xl space-y-1.5">
                    <div className="font-bold text-[#2D2D2E] text-base sm:text-lg lg:text-xl flex items-center gap-2.5">
                      <span className="w-3 h-3 rounded-full bg-blue-600 shrink-0" />
                      <span>2. The Computer (Sensors, Actuators & Microcontrollers)</span>
                    </div>
                    <p className="text-sm sm:text-base lg:text-lg text-[#525254] pl-5 leading-relaxed font-normal">
                      What invisible hardware components exist behind the glass (optical mug sensor, pressure valves, NFC card reader)?
                    </p>
                  </div>

                  <div className="p-4 sm:p-5 bg-[#FAF9F6] border border-[#E8E2D9] rounded-2xl space-y-1.5">
                    <div className="font-bold text-[#2D2D2E] text-base sm:text-lg lg:text-xl flex items-center gap-2.5">
                      <span className="w-3 h-3 rounded-full bg-emerald-600 shrink-0" />
                      <span>3. The Interaction (Gulf of Execution vs Gulf of Evaluation)</span>
                    </div>
                    <p className="text-sm sm:text-base lg:text-lg text-[#525254] pl-5 leading-relaxed font-normal">
                      Where could an operator get confused or stuck? Where is feedback missing, delayed, or ambiguous?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
          Next: Slide 18 · Act 2 Takeaways & Synthesis
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 18: ACT 2 TAKEAWAYS: INTERACTION IS A DIALOGUE (No Placeholders)
  // --------------------------------------------------------------------------
  if (slide.id === 18) {
    const takeaways = [
      {
        num: '01',
        title: 'The Closed Cybernetic Loop',
        domain: 'Norman’s 7 Stages of Action',
        summary:
          'Interaction is never a one-way command. It is an unbroken, continuous dialogue where human cognitive intent transforms into physical motor execution, the machine transforms its internal physical state, and the human perceives, interprets, and evaluates the resulting feedback.',
        takeaway: 'If feedback is removed, the cybernetic loop shatters and errors compound.',
        color: 'border-blue-200 bg-blue-50/50 text-blue-900',
        badge: 'text-blue-700 bg-blue-100',
      },
      {
        num: '02',
        title: 'The Universal Law of Breakdown',
        domain: 'The Twin Gulfs',
        summary:
          'Every usability breakdown, user hesitation, or rage-click in existence belongs to one of two fundamental gulfs: the Gulf of Execution (difficulty translating mental goals into machine inputs) or the Gulf of Evaluation (difficulty perceiving and understanding machine state).',
        takeaway: 'Designers bridge Execution with Signifiers; they bridge Evaluation with Feedback.',
        color: 'border-red-200 bg-red-50/50 text-red-900',
        badge: 'text-red-700 bg-red-100',
      },
      {
        num: '03',
        title: 'Affordance ≠ Signifier',
        domain: 'Physical & Perceptual Semantics',
        summary:
          'An affordance is what an artifact physically allows (e.g., a glass pane affords seeing through and touching). A signifier is the perceptible signal that communicates HOW and WHERE to interact (e.g., a push plate vs pull handle). Never assume users guess affordances without signifiers.',
        takeaway: 'Affordances define possibility; signifiers define clarity.',
        color: 'border-amber-200 bg-amber-50/50 text-amber-900',
        badge: 'text-amber-700 bg-amber-100',
      },
      {
        num: '04',
        title: 'HCI: The Empirical Science',
        domain: 'Disciplinary Boundaries',
        summary:
          'UI is the surface visual layer; UX is the holistic emotional and logistical journey; HCI is the empirical cognitive science that provides the neurological, motor, and psychological foundations that govern why human-machine systems succeed or catastrophically fail.',
        takeaway: 'HCI converts subjective design arguments into measurable empirical science.',
        color: 'border-[#FAD6CF] bg-[#FDF5F2] text-[#2D2D2E]',
        badge: 'text-[#E5391C] bg-[#FAD6CF]',
      },
    ];

    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-12 xl:p-14 bg-[#FAF9F6] select-text">
        {/* Header Bar */}
        <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-7 lg:h-8 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 2 · Comprehensive Synthesis
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 18 / 45</span>
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-3 lg:py-5 gap-5">
          <div className="text-center space-y-2 flex-shrink-0">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E]">
              Act 2 Takeaway: Interaction is a Dialogue
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl text-[#6E6D70] max-w-4xl mx-auto font-light">
              Systems do not merely execute computation; they communicate continuously with the human mind.
            </p>
          </div>

          {/* 4 Rich, Authoritative Synthesis Cards (Zero Placeholders) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1 items-stretch">
            {takeaways.map((item) => (
              <div
                key={item.num}
                className={`p-6 lg:p-7 xl:p-8 rounded-2xl border-2 flex flex-col justify-between shadow-xs bg-white space-y-3.5 hover:shadow-md transition-shadow`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs sm:text-sm font-mono font-bold px-2.5 py-1 rounded-lg ${item.badge}`}>
                      PILLAR {item.num} · {item.domain.toUpperCase()}
                    </span>
                    <span className="text-2xl font-serif-display font-bold text-stone-400">{item.num}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#2D2D2E]">
                    {item.title}
                  </h3>
                  <p className="text-base sm:text-lg text-[#525254] leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="p-3.5 bg-[#FAF9F6] border border-[#E8E2D9] rounded-xl text-xs sm:text-sm font-mono font-bold text-[#2D2D2E] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E5391C] shrink-0" />
                  <span>Axiom: {item.takeaway}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Transition Banner to Act 3 */}
          <div className="p-4 lg:p-5 bg-white border border-[#E8E2D9] rounded-2xl text-center text-base sm:text-lg lg:text-xl text-[#2D2D2E] font-medium shadow-xs flex-shrink-0 flex items-center justify-center gap-3">
            <span className="font-bold text-[#E5391C]">Looking Ahead to Act 3:</span>
            <span>Now that we understand the interaction dialogue, who is the biological creature on the other side? We dissect <strong>The Human</strong>.</span>
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
          Next: Act 3 · Understanding the User
        </div>
      </div>
    );
  }
  // --------------------------------------------------------------------------
  // SLIDE 19: THE FALLACY OF THE "AVERAGE USER" (Landmark Air Force Study)
  // --------------------------------------------------------------------------
  if (slide.id === 19) {
    const dimensions = [
      { name: 'Sitting Height', avg: '91.4 cm', variance: '± 7.2 cm', impact: 'Cockpit Canopy Clearance' },
      { name: 'Arm Reach', avg: '81.2 cm', variance: '± 8.5 cm', impact: 'Overhead Switch Access' },
      { name: 'Chest Girth', avg: '98.5 cm', variance: '± 11.0 cm', impact: 'Harness Restraint Fit' },
      { name: 'Sleeve Length', avg: '84.1 cm', variance: '± 6.8 cm', impact: 'Yoke Throttle Travel' },
      { name: 'Crotch Height', avg: '82.0 cm', variance: '± 7.9 cm', impact: 'Rudder Pedal Reach' },
      { name: 'Eye-to-Seat Height', avg: '79.2 cm', variance: '± 6.1 cm', impact: 'HUD Gun-Sight Alignment' },
    ];

    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 bg-[#FAF9F6] select-text">
        {/* Header Bar */}
        <div className="pb-3 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-7 lg:h-8 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 3 · Landmark Empirical Case
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 19 / 45</span>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-3 gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-shrink-0">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif-display font-medium text-[#2D2D2E]">
                The Fallacy of the "Average User"
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-[#6E6D70] font-light">
                Gilbert Daniels’ 1950 Air Force Cockpit Study & Why Designing for the Average Fails Everyone.
              </p>
            </div>

            {/* Interactive Mode Toggle */}
            <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-[#E8E2D9] shadow-xs self-start sm:self-auto">
              <button
                onClick={() => setSlide19CockpitMode('fixed')}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold cursor-pointer transition-all ${
                  slide19CockpitMode === 'fixed'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                1950 Fixed Cockpit (Average)
              </button>
              <button
                onClick={() => setSlide19CockpitMode('adjustable')}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold cursor-pointer transition-all ${
                  slide19CockpitMode === 'adjustable'
                    ? 'bg-[#E5391C] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Adaptive Ergonomic Cockpit
              </button>
            </div>
          </div>

          {/* 3 Core Quantitative Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 flex-shrink-0">
            <div className="bg-white border-2 border-[#E8E2D9] p-5 lg:p-6 rounded-2xl text-center flex flex-col justify-center space-y-1 shadow-xs">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-mono font-bold text-[#2D2D2E]">4,063</span>
              <div className="text-sm sm:text-base text-[#6E6D70] font-bold uppercase tracking-wider font-mono">
                Pilots Measured Across 10 Physical Dimensions
              </div>
              <p className="text-xs sm:text-sm text-stone-500 pt-0.5">Torso, arm reach, sitting height, leg travel, chest girth</p>
            </div>

            <div className="bg-white border-2 border-[#E8E2D9] p-5 lg:p-6 rounded-2xl text-center flex flex-col justify-center space-y-1 shadow-xs">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-mono font-bold text-[#E5391C]">&lt; 3.5%</span>
              <div className="text-sm sm:text-base text-[#6E6D70] font-bold uppercase tracking-wider font-mono">
                Average on Even 3 Selected Dimensions
              </div>
              <p className="text-xs sm:text-sm text-stone-500 pt-0.5">Joint probability collapses exponentially with every dimension</p>
            </div>

            <div className="bg-red-50 border-2 border-red-300 p-5 lg:p-6 rounded-2xl text-center flex flex-col justify-center space-y-1 shadow-xs">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-mono font-bold text-red-600">0</span>
              <div className="text-sm sm:text-base text-red-800 font-bold uppercase tracking-wider font-mono">
                Pilots Were Average on All 10 Dimensions
              </div>
              <p className="text-xs sm:text-sm text-red-700 pt-0.5">The "average human" was a mathematical phantom</p>
            </div>
          </div>

          {/* Dynamic Cockpit & Software Parallel Box: Spacious, High-Contrast */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 items-stretch">
            {/* Left: 6 Sample Physical Dimensions */}
            <div className="lg:col-span-6 bg-white border-2 border-[#E8E2D9] rounded-3xl p-5 lg:p-6 shadow-xs flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE3]">
                <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] font-bold tracking-wider">
                  Physical Variance in Human Biology
                </span>
                <span className="text-xs sm:text-sm font-mono text-stone-600 font-bold">Sample of 6 Core Dimensions</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {dimensions.map((d, i) => (
                  <div key={i} className="p-3.5 bg-[#FAF9F6] border border-[#E8E2D9] rounded-2xl space-y-1.5 shadow-2xs">
                    <div className="text-xs sm:text-sm font-bold text-[#2D2D2E] truncate">{d.name}</div>
                    <div className="text-lg sm:text-xl font-mono font-bold text-[#E5391C]">{d.avg}</div>
                    <div className="text-xs font-mono text-stone-500 font-semibold">{d.variance}</div>
                    <div className="text-xs text-stone-700 font-medium pt-1.5 border-t border-stone-200">
                      {d.impact}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-xs sm:text-sm text-stone-600 font-mono pt-1 leading-relaxed bg-[#FAF9F6] p-3 rounded-xl border border-[#E8E2D9]">
                💡 <strong>Mathematical Truth:</strong> Each human trait has an independent bell curve. Because human traits are uncorrelated, no individual human sits at the 50th percentile across all bodily traits simultaneously.
              </div>
            </div>

            {/* Right: The Software & Digital Parallel */}
            <div className={`lg:col-span-6 rounded-3xl p-6 lg:p-7 border-2 flex flex-col justify-between shadow-xs space-y-4 transition-colors ${
              slide19CockpitMode === 'fixed'
                ? 'bg-stone-900 text-white border-stone-700'
                : 'bg-[#FDF5F2] text-[#2D2D2E] border-[#E5391C]'
            }`}>
              <div className="flex items-center justify-between pb-2 border-b border-current/20">
                <span className="text-xs sm:text-sm font-mono uppercase font-bold tracking-wider">
                  {slide19CockpitMode === 'fixed' ? '⚠️ The Flawed Approach: Fixed Average UI' : '✓ The Modern Solution: Adaptive Software'}
                </span>
                <span className="text-xs sm:text-sm font-mono font-bold px-3 py-1 rounded-xl bg-current/10">
                  {slide19CockpitMode === 'fixed' ? '0% Real Fit' : '100% Dynamic Fit'}
                </span>
              </div>

              <div className="space-y-4 text-base sm:text-lg lg:text-xl leading-relaxed">
                {slide19CockpitMode === 'fixed' ? (
                  <>
                    <p className="text-stone-200">
                      <strong>In 1950 Air Force:</strong> Fixed cockpits caused soaring crash rates during routine flights because controls were physically out of reach for tall, short, or long-armed pilots.
                    </p>
                    <p className="text-stone-300">
                      <strong>In 2026 Software:</strong> Fixed 16px fonts, rigid 1920×1080 layouts, English-only LTR assumptions, and hover-only menus guarantee catastrophic friction for mobile users, elderly eyes, and non-native speakers.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-[#2D2D2E]">
                      <strong>In 1950 Air Force:</strong> Engineers invented adjustable seats, sliding rudder pedals, and flexible flight harnesses—enabling 100% pilot operational safety and saving thousands of lives.
                    </p>
                    <p className="text-[#525254]">
                      <strong>In 2026 Software:</strong> Responsive fluid grids, OS dynamic font scaling, WCAG AAA contrast modes, keyboard accelerators, and localized RTL layouts mold directly to human diversity.
                    </p>
                  </>
                )}
              </div>

              <div className={`p-4 rounded-2xl font-mono text-sm sm:text-base font-bold flex items-center gap-3 ${
                slide19CockpitMode === 'fixed'
                  ? 'bg-red-950/80 text-red-300 border border-red-800'
                  : 'bg-white text-[#E5391C] border border-[#FAD6CF] shadow-xs'
              }`}>
                <span className="w-3 h-3 rounded-full bg-current shrink-0" />
                <span>
                  {slide19CockpitMode === 'fixed'
                    ? 'Fatal Fallacy: "Our typical user has a 24-inch monitor and 20/20 vision."'
                    : 'Axiom: Build flexible systems that mold to human variance.'}
                </span>
              </div>
            </div>
          </div>

          {/* Key Principle Footer Banner */}
          <div className="p-4 bg-white border-2 border-[#E5391C] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs flex-shrink-0">
            <p className="text-base sm:text-lg lg:text-xl text-[#2D2D2E] leading-relaxed">
              <strong className="text-[#E5391C] font-serif-display text-lg sm:text-xl font-bold mr-2">
                Key Pedagogical Principle:
              </strong>
              If you design for the mathematical average, you design for literally nobody. Software must flex to human variance—never force humans to contort to software.
            </p>
            <span className="text-xs sm:text-sm font-mono text-white bg-[#E5391C] font-bold px-3.5 py-1.5 rounded-xl whitespace-nowrap shadow-2xs">
              No Average User
            </span>
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
          Next: The 5 Dimensions of User Diversity
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 20: THE 5 DIMENSIONS OF USER DIVERSITY (Interactive Matrix)
  // --------------------------------------------------------------------------
  if (slide.id === 20) {
    const diversityAxes = [
      {
        id: 0,
        name: '1. Experience & Mental Models',
        subtitle: 'Novice vs Expert Spectrum',
        biologicalReality:
          'Novice users rely on visual affordances, labels, and exploratory trial-and-error. Power users rely on motor memory, keyboard shortcuts, and dense data layouts.',
        catastrophe:
          'Designing only for experts alienates 90% of new users; designing only for novices throttles expert productivity and creates unbearable friction.',
        remedy:
          'Layered complexity: Clean, recognizable defaults for novices, with discoverable keyboard accelerators and power workflows for experts.',
        badge: 'Cognitive Model',
      },
      {
        id: 1,
        name: '2. Physical & Motor Capabilities',
        subtitle: 'Permanent, Temporary & Situational Bounds',
        biologicalReality:
          'Motor precision fluctuates dynamically: Permanent (tremor, arthritis), Temporary (broken wrist in cast), Situational (holding child, bumpy bus).',
        catastrophe:
          'Tiny 16-24px touch targets on mobile apps cause motor drift, accidental taps, and impossible interaction under real-world movement.',
        remedy:
          'Generous touch targets (>=48×48px), high motor tolerance, multi-modal input (touch, voice, hardware keys), and zero timed precision traps.',
        badge: 'Ergonomic Motor',
      },
      {
        id: 2,
        name: '3. Sensory & Visual Acuity',
        subtitle: 'Color Vision & Environmental Glare',
        biologicalReality:
          '8% of males experience color vision deficiency (Protanopia/Deuteranopia). Furthermore, outdoor desert sunlight washes out low contrast for 100% of humans.',
        catastrophe:
          'Using color alone as the sole status indicator (e.g. green circle vs red circle) renders interfaces completely unreadable.',
        remedy:
          'Redundant visual coding: Always pair color with distinct shapes, icons, and text labels (WCAG AAA contrast ratio >= 7:1).',
        badge: 'Perceptual Sensory',
      },
      {
        id: 3,
        name: '4. Cognitive State & Bandwidth',
        subtitle: 'Stress, Fatigue & Working Memory Limits',
        biologicalReality:
          'Human working memory maxes out at ~4 active chunks. Under emergency stress, panic, or sleep deprivation, cognitive bandwidth collapses further.',
        catastrophe:
          'Multi-step forms with hidden state require users to remember previous inputs across screens, causing catastrophic panic errors.',
        remedy:
          'Recognition over recall: Keep system state visible at all times. Provide persistent summaries and unambiguous undo guards.',
        badge: 'Working Memory',
      },
      {
        id: 4,
        name: '5. Linguistic & Cultural Context',
        subtitle: 'Reading Direction & Metaphor Meaning',
        biologicalReality:
          'Cultural expectations dictate mental models: Right-to-Left (Arabic) vs Left-to-Right (English/French), calendar formats, color symbolism, and spatial hierarchies.',
        catastrophe:
          'Hardcoded left-to-right animations or localized string translations that clip text containers and break interface layouts.',
        remedy:
          'Bi-directional layout engines (CSS logical properties), culturally adaptable iconography, and dynamic container auto-sizing.',
        badge: 'Cultural Localization',
      },
    ];

    const currentAxis = diversityAxes[slide20ActiveAxis];

    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 bg-[#FAF9F6] select-text">
        {/* Header Bar */}
        <div className="pb-3 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-7 lg:h-8 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 3 · Human Variance Matrix
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 20 / 45</span>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-3 gap-4">
          <div className="space-y-1 flex-shrink-0">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif-display font-medium text-[#2D2D2E]">
              Dimensions of User Diversity
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-[#6E6D70] font-light">
              Humans are not standardized microprocessors. We vary across 5 fundamental physical and cognitive axes.
            </p>
          </div>

          {/* 5 Interactive Diversity Axis Tabs: Larger, Bold, High Contrast */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 flex-shrink-0">
            {diversityAxes.map((axis) => {
              const isSelected = slide20ActiveAxis === axis.id;
              return (
                <button
                  key={axis.id}
                  onClick={() => setSlide20ActiveAxis(axis.id)}
                  className={`p-4 sm:p-5 rounded-2xl text-left transition-all cursor-pointer border-2 shadow-xs flex flex-col justify-between ${
                    isSelected
                      ? 'bg-stone-900 border-[#E5391C] text-white ring-4 ring-[#E5391C]/20 shadow-lg scale-[1.02]'
                      : 'bg-white border-[#E8E2D9] hover:border-stone-400 text-[#2D2D2E]'
                  }`}
                >
                  <div className="space-y-1.5">
                    <span className={`text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                      isSelected ? 'bg-[#E5391C] text-white' : 'bg-stone-100 text-stone-700'
                    }`}>
                      {axis.badge}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold font-serif-display leading-tight pt-1">
                      {axis.name}
                    </h4>
                  </div>
                  <div className={`text-xs font-mono pt-2 border-t mt-2 font-bold ${
                    isSelected ? 'border-stone-700 text-[#E5391C]' : 'border-stone-200 text-stone-500'
                  }`}>
                    {isSelected ? '▶ ACTIVE INSPECTION' : 'CLICK TO DISSECT'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Deep-Dive Inspection Stage: Fills Available Height, Zero Wasted Space */}
          <div className="bg-white border-2 border-[#E8E2D9] rounded-3xl p-6 lg:p-7 shadow-xs flex-1 flex flex-col justify-between space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F0EBE3] flex-shrink-0">
              <div>
                <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] font-bold tracking-wider">
                  Dimension 0{currentAxis.id + 1} of 5 · Deep Pedagogical Dissection
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif-display font-bold text-[#2D2D2E]">
                  {currentAxis.name}
                </h3>
              </div>
              <div className="px-4 py-2 bg-[#FDF5F2] border border-[#FAD6CF] rounded-xl text-xs sm:text-sm font-mono text-[#E5391C] font-bold self-start sm:self-auto">
                {currentAxis.subtitle}
              </div>
            </div>

            {/* 3 Clear Columns: Large, Roomy, Rich Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-base sm:text-lg lg:text-xl leading-relaxed flex-1 items-stretch">
              <div className="p-5 lg:p-6 bg-[#FAF9F6] border-2 border-[#E8E2D9] rounded-2xl flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="text-xs sm:text-sm font-mono uppercase text-stone-700 font-bold tracking-wider flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-stone-600" />
                    <span>1. The Human Reality</span>
                  </div>
                  <p className="text-[#2D2D2E] font-medium pt-1">
                    {currentAxis.biologicalReality}
                  </p>
                </div>
                <div className="text-xs sm:text-sm font-mono text-stone-500 pt-2 border-t border-stone-200 font-semibold">
                  Human Biology & Psychology
                </div>
              </div>

              <div className="p-5 lg:p-6 bg-red-50/70 border-2 border-red-200 rounded-2xl flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="text-xs sm:text-sm font-mono uppercase text-red-700 font-bold tracking-wider flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-600" />
                    <span>2. Where Bad Design Breaks</span>
                  </div>
                  <p className="text-red-950 font-medium pt-1">
                    {currentAxis.catastrophe}
                  </p>
                </div>
                <div className="text-xs sm:text-sm font-mono text-red-700 pt-2 border-t border-red-200 font-semibold">
                  Engineering Failure Mode
                </div>
              </div>

              <div className="p-5 lg:p-6 bg-emerald-50/70 border-2 border-emerald-200 rounded-2xl flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="text-xs sm:text-sm font-mono uppercase text-emerald-800 font-bold tracking-wider flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-600" />
                    <span>3. The HCI Engineering Solution</span>
                  </div>
                  <p className="text-emerald-950 font-medium pt-1">
                    {currentAxis.remedy}
                  </p>
                </div>
                <div className="text-xs sm:text-sm font-mono text-emerald-800 pt-2 border-t border-emerald-200 font-semibold">
                  Validated Design Pattern
                </div>
              </div>
            </div>

            {/* Interactive Dimension Simulator Strip */}
            <div className="p-4 bg-[#FAF9F6] border border-[#E8E2D9] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-shrink-0">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#E5391C] shrink-0" />
                <div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-[#2D2D2E]">
                    Interactive Spectrum Simulator: Dimension 0{currentAxis.id + 1}
                  </div>
                  <div className="text-xs text-stone-500">
                    Adjust the parameter below to observe real-time ergonomic adaptation:
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs font-mono font-bold text-stone-600">Level: {slide20SimValue}%</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={slide20SimValue}
                  onChange={(e) => setSlide20SimValue(Number(e.target.value))}
                  className="w-36 accent-[#E5391C] cursor-pointer"
                />
                <span className="text-xs font-mono px-3 py-1 bg-white border border-[#E8E2D9] rounded-lg font-bold text-[#E5391C]">
                  {slide20ActiveAxis === 0
                    ? slide20SimValue < 50 ? 'Novice (Explicit Cues)' : 'Power User (Hotkeys)'
                    : slide20ActiveAxis === 1
                    ? slide20SimValue < 50 ? 'Motor Tremor (60px Target)' : 'Desk Mouse (24px)'
                    : slide20ActiveAxis === 2
                    ? slide20SimValue < 50 ? 'Low Sun Glare (1.4:1)' : 'WCAG AAA (7:1)'
                    : slide20ActiveAxis === 3
                    ? slide20SimValue < 50 ? 'Panic Rush (2 Slots)' : 'Calm (4 Slots)'
                    : slide20SimValue < 50 ? 'Arabic RTL Engine' : 'English LTR Engine'}
                </span>
              </div>
            </div>
          </div>

          {/* Key Principle Footer Banner */}
          <div className="p-4 bg-white border-2 border-[#E5391C] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs flex-shrink-0">
            <p className="text-base sm:text-lg lg:text-xl text-[#2D2D2E] leading-relaxed">
              <strong className="text-[#E5391C] font-serif-display text-lg sm:text-xl font-bold mr-2">
                The Curb-Cut Effect:
              </strong>
              When you design for the physical and cognitive extremes (e.g. sidewalk ramps for wheelchairs), the mainstream experience automatically becomes faster, safer, and cleaner for everyone.
            </p>
            <span className="text-xs sm:text-sm font-mono text-white bg-[#E5391C] font-bold px-3.5 py-1.5 rounded-xl whitespace-nowrap shadow-2xs">
              Universal Design
            </span>
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
          Next: User Diversity Simulation Lab (Bad vs Good Design Across 5 Dimensions)
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 21: USER DIVERSITY SIMULATION LAB: BAD VS GOOD DESIGN
  // --------------------------------------------------------------------------
  if (slide.id === 21) {
    const labDimensions = [
      {
        id: 0,
        name: '1. Experience & Mental Models',
        subtitle: 'Novice vs Expert Spectrum',
        badge: 'Mental Model',
        badTitle: 'Cryptic Developer Shell (Expert-Only Assumption)',
        badDescription: 'Assumes the user knows database schemas, CLI flags, and hex codes. Provides zero affordances, zero visual cues, and punishing syntax crashes.',
        goodTitle: 'Adaptive Progressive Disclosure (Dual-Speed Interface)',
        goodDescription: 'Visual recognition and friendly presets for beginners, alongside lightning-fast command-palette hotkeys for power users.',
      },
      {
        id: 1,
        name: '2. Physical & Motor Capabilities',
        subtitle: 'Tremor, Dexterity & Motion Jitter',
        badge: 'Motor Tolerance',
        badTitle: 'Micro-Target Minefield (Zero Error Tolerance)',
        badDescription: 'Tiny 14-16px touch buttons with 2px separation placing the dangerous "Purge All Data" directly adjacent to "Cancel".',
        goodTitle: 'Fitts-Compliant Target Guard (Resilient Motor Design)',
        goodDescription: 'Generous 52px touch targets (WCAG AAA compliant), spatial isolation of destructive actions, secondary confirmation slide guard, and 10s undo buffer.',
      },
      {
        id: 2,
        name: '3. Sensory & Visual Acuity',
        subtitle: 'Color Blindness & Outdoor Sunlight',
        badge: 'Sensory Acuity',
        badTitle: 'Color-Only Signaling & Low-Contrast Text',
        badDescription: 'Uses sole color dots (green vs red) at 1.4:1 contrast. Under colorblindness or sun glare, critical alerts become completely invisible.',
        goodTitle: 'Multimodal Redundant Triad (Shape + Icon + Text)',
        goodDescription: 'WCAG AAA 9:1 contrast pairing distinct geometric shapes (Checkmark Shield vs Warning Triangle) with unmistakable semantic labels.',
      },
      {
        id: 3,
        name: '4. Cognitive State & Bandwidth',
        subtitle: 'Working Memory Limits & Panic Stress',
        badge: 'Working Memory',
        badTitle: 'Multi-Step Memory Trap & Countdown Panic',
        badDescription: 'Wipes screen state and forces the human to recall arbitrary tokens from previous screens while a hostile timer counts down.',
        goodTitle: 'Recognition Over Recall (Persistent Sticky Context)',
        goodDescription: 'Permanent contextual drawer displaying prior decisions, 1-click auto-population, and calm, stress-free progressive disclosure.',
      },
      {
        id: 4,
        name: '5. Linguistic & Cultural Context',
        subtitle: 'Reading Flow & Cultural Mental Models',
        badge: 'Localization',
        badTitle: 'Hardcoded LTR Layout & Rigid Text Sizing',
        badDescription: 'Hardcoded pixel widths and fixed directional arrows. In Arabic or French, text truncates, buttons clip, and navigation flows backwards.',
        goodTitle: 'Dynamic Bi-Directional Fluid Architecture',
        goodDescription: 'Native CSS logical properties, auto-reversing directional vectors, culturally aligned reading flow, and elastic typography containers.',
      },
    ];

    const currentLab = labDimensions[slide21LabAxis];

    // Shared environmental disturbance applied to BOTH Bad and Good design test interfaces
    const motorAnimationClass =
      slide21LabAxis === 1
        ? slide21MotorState === 'tremor'
          ? 'animate-hand-tremor'
          : slide21MotorState === 'transit'
          ? 'animate-bus-transit'
          : ''
        : '';

    const sensoryStyle: React.CSSProperties =
      slide21LabAxis === 2
        ? slide21SensoryFilter === 'colorblind'
          ? {
              filter: 'grayscale(0.88) sepia(0.38) saturate(2.4) hue-rotate(50deg) contrast(0.95)',
              WebkitFilter: 'grayscale(0.88) sepia(0.38) saturate(2.4) hue-rotate(50deg) contrast(0.95)',
            }
          : slide21SensoryFilter === 'desert_glare'
          ? {
              filter: 'contrast(0.4) brightness(1.38)',
              WebkitFilter: 'contrast(0.4) brightness(1.38)',
            }
          : {}
        : {};

    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 bg-[#FAF9F6] select-text relative">
        {/* W3C Brettel/Viénot Deuteranopia SVG Matrix Definition */}
        <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} aria-hidden="true">
          <defs>
            <filter id="deuteranopia-filter" colorInterpolationFilters="sRGB">
              <feColorMatrix
                type="matrix"
                values="0.625 0.375 0 0 0  0.700 0.300 0 0 0  0 0.300 0.700 0 0  0 0 0 1 0"
              />
            </filter>
          </defs>
        </svg>

        {/* Header Bar */}
        <div className="pb-3 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-7 lg:h-8 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 3 · Interactive Diversity Simulation Laboratory
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 21 / 45</span>
        </div>

        {/* Main Content Area: Zero Wasted Space */}
        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-2 gap-3.5 min-h-0">
          {/* Slide Title & Subtitle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-shrink-0">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif-display font-medium text-[#2D2D2E]">
                User Diversity Simulation Lab: Bad vs Good Design
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#6E6D70] font-light">
                Environmental &amp; human constraints apply equally to both interfaces—see how resilient HCI survives conditions that destroy flawed designs.
              </p>
            </div>
            <div className="px-3.5 py-1.5 bg-[#FDF5F2] border border-[#FAD6CF] rounded-xl text-xs sm:text-sm font-mono text-[#E5391C] font-bold self-start sm:self-auto shrink-0">
              Interactive Test Sandbox
            </div>
          </div>

          {/* 5 Diversity Dimension Switcher Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 flex-shrink-0">
            {labDimensions.map((dim) => {
              const isSelected = slide21LabAxis === dim.id;
              return (
                <button
                  key={dim.id}
                  onClick={() => {
                    setSlide21LabAxis(dim.id);
                    setSlide21ExpBadError(null);
                    setSlide21ExpGoodBooked(false);
                    setSlide21MotorBadTriggered(false);
                    setSlide21MotorGoodConfirmed(false);
                    setSlide21SensoryBadClick(false);
                    setSlide21SensoryGoodClick(false);
                    setSlide21CognitiveBadStep(1);
                    setSlide21CognitiveBadFailed(false);
                    setSlide21CognitiveGoodCopied(false);
                  }}
                  className={`p-3 sm:p-3.5 rounded-2xl text-left transition-all cursor-pointer border-2 shadow-xs flex flex-col justify-between ${
                    isSelected
                      ? 'bg-stone-900 border-[#E5391C] text-white ring-4 ring-[#E5391C]/20 shadow-md scale-[1.01]'
                      : 'bg-white border-[#E8E2D9] hover:border-stone-400 text-[#2D2D2E]'
                  }`}
                >
                  <div className="space-y-1">
                    <span className={`text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                      isSelected ? 'bg-[#E5391C] text-white' : 'bg-stone-100 text-stone-700'
                    }`}>
                      {dim.badge}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold font-serif-display leading-tight pt-1">
                      {dim.name}
                    </h4>
                  </div>
                  <div className={`text-xs font-mono pt-1.5 border-t mt-1.5 font-bold ${
                    isSelected ? 'border-stone-700 text-[#E5391C]' : 'border-stone-200 text-stone-500'
                  }`}>
                    {isSelected ? '● ACTIVE LAB' : 'SWITCH LAB'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Dynamic Stress / Persona Controller Strip for Active Dimension */}
          <div className="p-3.5 bg-white border-2 border-[#E8E2D9] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-[#E5391C] shrink-0" />
              <div>
                <span className="text-xs sm:text-sm font-mono font-bold uppercase text-[#E5391C] mr-2">
                  Simulation Variable (Applied to Both UIs):
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#2D2D2E]">
                  {slide21LabAxis === 0 && 'Target User Persona & Mental Model'}
                  {slide21LabAxis === 1 && 'User Physical State & Motor Precision'}
                  {slide21LabAxis === 2 && 'Environmental Lighting & Visual Acuity Filter'}
                  {slide21LabAxis === 3 && 'Cognitive Workload & Psychological Urgency'}
                  {slide21LabAxis === 4 && 'Linguistic Directionality & Text Expansion'}
                </span>
              </div>
            </div>

            {/* Variable Controls */}
            <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
              {slide21LabAxis === 0 && (
                <div className="flex items-center gap-1.5 bg-[#FAF9F6] p-1 rounded-xl border border-[#E8E2D9]">
                  <button
                    onClick={() => setSlide21ExpPersona('novice')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      slide21ExpPersona === 'novice' ? 'bg-[#E5391C] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    🎓 Novice Student (1st Day)
                  </button>
                  <button
                    onClick={() => setSlide21ExpPersona('power')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      slide21ExpPersona === 'power' ? 'bg-stone-900 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    ⚡ Senior Engineer (Power User)
                  </button>
                </div>
              )}

              {slide21LabAxis === 1 && (
                <div className="flex items-center gap-1.5 bg-[#FAF9F6] p-1 rounded-xl border border-[#E8E2D9]">
                  <button
                    onClick={() => setSlide21MotorState('steady')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      slide21MotorState === 'steady' ? 'bg-emerald-600 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    🖱️ Steady Desk Mouse
                  </button>
                  <button
                    onClick={() => setSlide21MotorState('tremor')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      slide21MotorState === 'tremor' ? 'bg-[#E5391C] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    🤲 Hand Tremor (Parkinson's/Cold)
                  </button>
                  <button
                    onClick={() => setSlide21MotorState('transit')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      slide21MotorState === 'transit' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    🚌 Bumpy Moving Bus
                  </button>
                </div>
              )}

              {slide21LabAxis === 2 && (
                <div className="flex items-center gap-1.5 bg-[#FAF9F6] p-1 rounded-xl border border-[#E8E2D9]">
                  <button
                    onClick={() => setSlide21SensoryFilter('normal')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      slide21SensoryFilter === 'normal' ? 'bg-emerald-600 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    👁️ Standard 20/20 Vision
                  </button>
                  <button
                    onClick={() => setSlide21SensoryFilter('colorblind')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      slide21SensoryFilter === 'colorblind' ? 'bg-[#E5391C] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    🔴🟢 Deuteranopia (Colorblind)
                  </button>
                  <button
                    onClick={() => setSlide21SensoryFilter('desert_glare')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      slide21SensoryFilter === 'desert_glare' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    ☀️ Desert Glare (10,000 Lux)
                  </button>
                </div>
              )}

              {slide21LabAxis === 3 && (
                <div className="flex items-center gap-1.5 bg-[#FAF9F6] p-1 rounded-xl border border-[#E8E2D9]">
                  <button
                    onClick={() => setSlide21CognitiveStress('calm')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      slide21CognitiveStress === 'calm' ? 'bg-emerald-600 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    ☕ Calm Lab Exploration
                  </button>
                  <button
                    onClick={() => setSlide21CognitiveStress('rush')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      slide21CognitiveStress === 'rush' ? 'bg-[#E5391C] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    ⚠️ Critical Emergency Rush
                  </button>
                </div>
              )}

              {slide21LabAxis === 4 && (
                <div className="flex items-center gap-1.5 bg-[#FAF9F6] p-1 rounded-xl border border-[#E8E2D9]">
                  <button
                    onClick={() => setSlide21CultureLang('en')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      slide21CultureLang === 'en' ? 'bg-stone-900 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    🇺🇸 English (LTR)
                  </button>
                  <button
                    onClick={() => setSlide21CultureLang('ar')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      slide21CultureLang === 'ar' ? 'bg-[#E5391C] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    🇲🇦 Arabic (العربية - RTL)
                  </button>
                  <button
                    onClick={() => setSlide21CultureLang('fr')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      slide21CultureLang === 'fr' ? 'bg-blue-600 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    🇫🇷 French (+35% Length)
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Side-by-Side Simulation Arena: Bad Design vs Good Design */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 flex-1 items-stretch min-h-0">
            {/* ============================================================== */}
            {/* LEFT: BAD DESIGN (Flawed Assumptions / Ignored Diversity) */}
            {/* ============================================================== */}
            <div className="bg-red-50/70 border-2 border-red-300 rounded-3xl p-5 lg:p-6 flex flex-col justify-between shadow-xs space-y-3">
              <div className="space-y-1.5 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-mono uppercase text-red-700 font-bold tracking-wider px-2.5 py-1 bg-red-100 rounded-lg flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span>⚠️ Bad Design: {currentLab.badTitle}</span>
                  </span>
                  <span className="text-xs font-mono text-red-800 font-bold">Fragile Under Stress</span>
                </div>
                <p className="text-xs sm:text-sm text-red-950 font-medium">
                  {currentLab.badDescription}
                </p>
              </div>

              {/* Interactive Micro-Interface for Bad Design (receives exact same environmental distortion) */}
              <div
                className={`bg-white border-2 border-red-200 rounded-2xl p-4 flex-1 flex flex-col justify-between space-y-3 min-h-[185px] relative overflow-hidden transition-all ${motorAnimationClass}`}
                style={sensoryStyle}
              >
                {/* Sunlight Flare Overlay for Bad Design */}
                {slide21LabAxis === 2 && slide21SensoryFilter === 'desert_glare' && (
                  <div className="absolute inset-0 pointer-events-none rounded-2xl bg-gradient-to-tr from-amber-200/40 via-yellow-100/50 to-white/75 overflow-hidden mix-blend-screen z-20">
                    <div className="w-full h-full animate-sun-flare bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.95),transparent_65%)]" />
                  </div>
                )}

                {/* Shared Environmental Condition Indicator Banner */}
                <div className="px-3 py-1.5 bg-stone-100 border border-stone-300 rounded-lg text-xs font-mono font-bold text-stone-800 flex items-center justify-between flex-shrink-0">
                  <span>
                    {slide21LabAxis === 0 && (slide21ExpPersona === 'novice' ? '🎓 Testing Persona: Novice Student' : '⚡ Testing Persona: Senior Power User')}
                    {slide21LabAxis === 1 && (slide21MotorState === 'tremor' ? '🤲 Active Disturbance: 10Hz Hand Tremor' : slide21MotorState === 'transit' ? '🚌 Active Disturbance: 12Hz Bus Jitter' : '🖱️ Baseline: Steady Desk Mouse')}
                    {slide21LabAxis === 2 && (slide21SensoryFilter === 'colorblind' ? '🔴🟢 Active Filter: Deuteranopia (Red/Green Blind)' : slide21SensoryFilter === 'desert_glare' ? '☀️ Active Environment: 10,000 Lux Desert Sun Glare' : '👁️ Baseline: 20/20 Vision at 400 Lux')}
                    {slide21LabAxis === 3 && (slide21CognitiveStress === 'rush' ? '🚨 Active Condition: 7s Emergency Protocol' : '☕ Baseline: Calm Lab Exploration')}
                    {slide21LabAxis === 4 && (slide21CultureLang === 'ar' ? '🇲🇦 Active Locale: Arabic (العربية - RTL)' : slide21CultureLang === 'fr' ? '🇫🇷 Active Locale: French (+35% Length)' : '🇺🇸 Baseline: English (Standard LTR)')}
                  </span>
                  <span className="text-red-700 uppercase font-black">FAIL ZONE</span>
                </div>

                {/* Axis 0: Bad Experience (CLI/Hex trap) */}
                {slide21LabAxis === 0 && (
                  <div className="space-y-2.5 font-mono text-xs sm:text-sm">
                    <div className="p-2.5 bg-stone-900 text-stone-200 rounded-xl space-y-1">
                      <div className="text-xs text-stone-400">sys_shell@um6p-core:~$ db_reserve</div>
                      <div className="text-stone-100 font-bold">EXEC allocate_bench(usr_uuid, hex_mask, 0x4B2)</div>
                    </div>
                    <div>
                      <label className="text-xs text-stone-700 font-bold block mb-1">
                        ENTER WORKSTATION HEX IDENTIFIER:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 0x00FF8C"
                        className="w-full p-2.5 border border-stone-300 rounded-lg font-mono text-xs sm:text-sm bg-stone-50"
                      />
                    </div>
                    <button
                      onClick={() =>
                        setSlide21ExpBadError(
                          slide21ExpPersona === 'novice'
                            ? 'FATAL 0x8821: PARAM_MISMATCH. Novice student has no mental model of hex memory addresses or CLI flags. Blocked completely.'
                            : 'FATAL 0x4092: NO_AUTOCOMPLETE. System lacks command piping, shell history, and CLI hotkeys. Senior engineer forced into slow manual trial.'
                        )
                      }
                      className="w-full py-2.5 bg-stone-900 text-white rounded-lg font-bold text-xs sm:text-sm hover:bg-stone-800 cursor-pointer"
                    >
                      COMMIT DIRECT SYS_CALL
                    </button>
                    {slide21ExpBadError && (
                      <div className="p-2.5 bg-red-100 border border-red-300 text-red-900 rounded-lg text-xs font-sans font-medium flex items-center justify-between">
                        <span>{slide21ExpBadError}</span>
                        <button
                          onClick={() => setSlide21ExpBadError(null)}
                          className="text-xs font-mono underline ml-2 cursor-pointer font-bold"
                        >
                          Clear
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Axis 1: Bad Motor (Micro Targets with Jitter) */}
                {slide21LabAxis === 1 && (
                  <div className="space-y-3">
                    <div className="text-xs sm:text-sm text-stone-700 font-bold">
                      Simulated Action: Save Project Draft (Click Cancel vs Purge)
                    </div>
                    <div className="p-4 bg-stone-100 rounded-xl border border-stone-300 flex items-center justify-center gap-1.5">
                      {/* Tiny 16px touch buttons placed 2px apart */}
                      <button
                        onClick={() => {
                          if (slide21MotorState !== 'steady') {
                            setSlide21MotorBadTriggered(true);
                          } else {
                            alert('Clicked Cancel safely.');
                          }
                        }}
                        className="px-2.5 py-1 text-xs font-mono bg-stone-300 hover:bg-stone-400 rounded text-stone-800 cursor-pointer font-bold"
                        title="16px Target"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => setSlide21MotorBadTriggered(true)}
                        className="px-2.5 py-1 text-xs font-mono bg-red-600 hover:bg-red-700 text-white rounded cursor-pointer font-bold"
                        title="Dangerous Destructive Action with 2px gap"
                      >
                        PURGE ALL DATA
                      </button>
                    </div>
                    {slide21MotorBadTriggered ? (
                      <div className="p-3 bg-red-100 border-2 border-red-400 text-red-950 rounded-xl text-xs sm:text-sm font-semibold space-y-1">
                        <div className="font-bold text-red-800 flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                          <span>🚨 ACCIDENTAL PURGE TRIGGERED!</span>
                        </div>
                        <p>
                          Due to 16px target size and 2px separation, hand jitter/transit shake slipped onto the destructive button. Entire semester project erased.
                        </p>
                        <button
                          onClick={() => setSlide21MotorBadTriggered(false)}
                          className="text-xs font-mono text-red-700 underline font-bold cursor-pointer"
                        >
                          Reset Motor Simulation
                        </button>
                      </div>
                    ) : (
                      <div className="text-xs font-mono text-stone-600 font-semibold text-center">
                        {slide21MotorState !== 'steady'
                          ? '⚠️ Vibration Active! Try clicking "Cancel" without hitting "Purge".'
                          : 'Try switching to Hand Tremor or Bumpy Bus mode above.'}
                      </div>
                    )}
                  </div>
                )}

                {/* Axis 2: Bad Sensory (Color-Only & Low Contrast) */}
                {slide21LabAxis === 2 && (
                  <div className="space-y-3">
                    <div className="text-xs font-mono font-bold text-stone-600 uppercase flex items-center justify-between">
                      <span>Industrial Cooling Core · Real-time Status</span>
                      {slide21SensoryFilter === 'colorblind' && (
                        <span className="text-xs text-amber-700 bg-amber-100 px-2 py-0.5 rounded font-bold">
                          🔴🟢 0% Shape Encoding
                        </span>
                      )}
                    </div>
                    <div className="p-3 bg-[#FCFCFD] border border-stone-200 rounded-xl space-y-2">
                      {/* State 1: Green dot */}
                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-stone-50">
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-emerald-500 inline-block shrink-0 shadow-2xs" />
                          <span className="text-xs sm:text-sm font-mono text-stone-600 font-semibold">Reactor Line A: Status</span>
                        </div>
                        <button
                          onClick={() => setSlide21SensoryBadClick(true)}
                          className="px-3 py-1 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded text-xs font-mono font-bold cursor-pointer"
                        >
                          Halt Line A
                        </button>
                      </div>
                      {/* State 2: Red dot */}
                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-stone-50">
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-red-600 inline-block shrink-0 shadow-2xs" />
                          <span className="text-xs sm:text-sm font-mono text-stone-600 font-semibold">Reactor Line B: Status</span>
                        </div>
                        <button
                          onClick={() => setSlide21SensoryBadClick(true)}
                          className="px-3 py-1 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded text-xs font-mono font-bold cursor-pointer"
                        >
                          Halt Line B
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs font-mono text-stone-700 font-semibold text-center">
                        Task: Halt ONLY the overheating line. Which one is red vs green?
                      </div>
                      {slide21SensoryBadClick && (
                        <div className="p-2.5 bg-red-100 border-2 border-red-300 text-red-950 rounded-xl text-xs sm:text-sm font-semibold space-y-1">
                          <div className="text-red-800 font-bold flex items-center gap-1.5">
                            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                            <span>❌ CRITICAL AMBIGUITY FAILURE!</span>
                          </div>
                          <p>
                            Under deuteranopia (colorblindness) or sunlight glare, Line A and Line B dots render as the exact same yellowish-brown tint. Without distinct shapes or semantic labels, the operator is forced into a 50/50 blind guess!
                          </p>
                          <button
                            onClick={() => setSlide21SensoryBadClick(false)}
                            className="text-xs font-mono text-red-700 underline font-bold cursor-pointer"
                          >
                            Reset Test
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Axis 3: Bad Cognitive (Memory Recall Under Stress) */}
                {slide21LabAxis === 3 && (
                  <div className="space-y-2.5">
                    {slide21CognitiveBadStep === 1 ? (
                      <div className="space-y-2">
                        <div className="text-xs sm:text-sm font-mono text-stone-700 font-semibold">Step 1 of 2: Session Security Token</div>
                        <div className="p-3 bg-stone-100 rounded-xl border border-stone-300 font-mono text-center">
                          <span className="text-stone-600 text-xs sm:text-sm block font-semibold">MEMORIZE THIS CODE:</span>
                          <strong className="text-lg text-stone-900 tracking-wider font-bold">948-QZM-72</strong>
                        </div>
                        <button
                          onClick={() => setSlide21CognitiveBadStep(2)}
                          className="w-full py-2 bg-stone-900 text-white rounded-lg text-xs sm:text-sm font-bold cursor-pointer hover:bg-stone-800 font-mono"
                        >
                          Proceed to Verification Screen ➔
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs sm:text-sm font-mono">
                          <span className="text-stone-700 font-bold">Step 2 of 2: Verification</span>
                          {slide21CognitiveStress === 'rush' && (
                            <span className="text-red-600 font-bold animate-pulse">⏰ 00:04s left!</span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-stone-700 font-medium">
                          The previous screen has been wiped. Type the 8-character token from memory:
                        </p>
                        <input
                          type="text"
                          value={slide21CognitiveBadCode}
                          onChange={(e) => setSlide21CognitiveBadCode(e.target.value)}
                          placeholder="Type token here..."
                          className="w-full p-2 border border-stone-300 rounded-lg text-xs sm:text-sm font-mono"
                        />
                        <button
                          onClick={() => setSlide21CognitiveBadFailed(true)}
                          className="w-full py-2 bg-red-600 text-white rounded-lg text-xs sm:text-sm font-bold cursor-pointer hover:bg-red-700 font-mono"
                        >
                          Submit from Memory
                        </button>
                        {slide21CognitiveBadFailed && (
                          <div className="p-2.5 bg-red-100 border border-red-300 rounded-lg text-xs sm:text-sm text-red-900 font-medium">
                            ❌ Recall Failure! Humans under stress lose 75% of working memory. System locked.
                            <button
                              onClick={() => {
                                setSlide21CognitiveBadStep(1);
                                setSlide21CognitiveBadFailed(false);
                                setSlide21CognitiveBadCode('');
                              }}
                              className="block underline mt-1 font-bold font-mono text-red-800"
                            >
                              Restart Step 1
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Axis 4: Bad Cultural (Hardcoded LTR) */}
                {slide21LabAxis === 4 && (
                  <div className="space-y-3">
                    <div className="text-xs sm:text-sm font-mono text-stone-700 font-semibold">
                      Rigid LTR CSS Container (Fixed 95px Button Width):
                    </div>
                    <div className="p-3 bg-stone-100 rounded-xl border border-stone-300 flex items-center gap-2 overflow-hidden">
                      <div className="w-[95px] h-9 bg-white border border-stone-300 rounded-md p-1.5 text-xs truncate overflow-hidden whitespace-nowrap text-stone-800 font-semibold">
                        {slide21CultureLang === 'ar' ? 'إلغاء حـ...' : slide21CultureLang === 'fr' ? 'Enregistr...' : 'Cancel'}
                      </div>
                      <div className="w-[95px] h-9 bg-stone-900 text-white rounded-md p-1.5 text-xs truncate overflow-hidden whitespace-nowrap font-bold flex items-center justify-between">
                        <span>
                          {slide21CultureLang === 'ar' ? 'تأكيد' : slide21CultureLang === 'fr' ? 'Confir...' : 'Next'}
                        </span>
                        <span>➔</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-red-900 font-medium">
                      {slide21CultureLang === 'ar'
                        ? '⚠️ Critical Cultural Flaw: In Arabic, reading flows right-to-left. The forward arrow points backward, and text is truncated!'
                        : slide21CultureLang === 'fr'
                        ? '⚠️ Localization Overflow: French phrases are +35% longer and get silently cropped!'
                        : 'English works by pure coincidence because the developer wrote it in English.'}
                    </p>
                  </div>
                )}
              </div>

              {/* Forensic Metrics Breakdown */}
              <div className="p-3 bg-red-100/60 rounded-xl border border-red-200 text-xs sm:text-sm font-mono text-red-900 flex items-center justify-between flex-shrink-0">
                <div>• Frustration: <strong>94%</strong></div>
                <div>• Error Rate: <strong>Severe</strong></div>
                <div>• WCAG: <strong>FAIL</strong></div>
              </div>
            </div>

            {/* ============================================================== */}
            {/* RIGHT: GOOD DESIGN (Resilient Ergonomic HCI Solution) */}
            {/* ============================================================== */}
            <div className="bg-emerald-50/70 border-2 border-emerald-300 rounded-3xl p-5 lg:p-6 flex flex-col justify-between shadow-xs space-y-3">
              <div className="space-y-1.5 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-mono uppercase text-emerald-800 font-bold tracking-wider px-2.5 py-1 bg-emerald-100 rounded-lg flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>✓ Good Design: {currentLab.goodTitle}</span>
                  </span>
                  <span className="text-xs font-mono text-emerald-800 font-bold">Resilient Under Stress</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-950 font-medium">
                  {currentLab.goodDescription}
                </p>
              </div>

              {/* Interactive Micro-Interface for Good Design (receives exact same environmental distortion) */}
              <div
                className={`bg-white border-2 border-emerald-200 rounded-2xl p-4 flex-1 flex flex-col justify-between space-y-3 min-h-[185px] relative overflow-hidden transition-all ${motorAnimationClass}`}
                style={sensoryStyle}
              >
                {/* Sunlight Flare Overlay for Good Design (shows resilience under identical glare) */}
                {slide21LabAxis === 2 && slide21SensoryFilter === 'desert_glare' && (
                  <div className="absolute inset-0 pointer-events-none rounded-2xl bg-gradient-to-tr from-amber-200/40 via-yellow-100/50 to-white/75 overflow-hidden mix-blend-screen z-20">
                    <div className="w-full h-full animate-sun-flare bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.95),transparent_65%)]" />
                  </div>
                )}

                {/* Shared Environmental Condition Indicator Banner */}
                <div className="px-3 py-1.5 bg-emerald-100/80 border border-emerald-300 rounded-lg text-xs font-mono font-bold text-emerald-900 flex items-center justify-between flex-shrink-0">
                  <span>
                    {slide21LabAxis === 0 && (slide21ExpPersona === 'novice' ? '🎓 Testing Persona: Novice Student' : '⚡ Testing Persona: Senior Power User')}
                    {slide21LabAxis === 1 && (slide21MotorState === 'tremor' ? '🤲 Active Disturbance: 10Hz Hand Tremor' : slide21MotorState === 'transit' ? '🚌 Active Disturbance: 12Hz Bus Jitter' : '🖱️ Baseline: Steady Desk Mouse')}
                    {slide21LabAxis === 2 && (slide21SensoryFilter === 'colorblind' ? '🔴🟢 Active Filter: Deuteranopia (Red/Green Blind)' : slide21SensoryFilter === 'desert_glare' ? '☀️ Active Environment: 10,000 Lux Desert Sun Glare' : '👁️ Baseline: 20/20 Vision at 400 Lux')}
                    {slide21LabAxis === 3 && (slide21CognitiveStress === 'rush' ? '🚨 Active Condition: 7s Emergency Protocol' : '☕ Baseline: Calm Lab Exploration')}
                    {slide21LabAxis === 4 && (slide21CultureLang === 'ar' ? '🇲🇦 Active Locale: Arabic (العربية - RTL)' : slide21CultureLang === 'fr' ? '🇫🇷 Active Locale: French (+35% Length)' : '🇺🇸 Baseline: English (Standard LTR)')}
                  </span>
                  <span className="text-emerald-700 uppercase font-black">RESILIENT ✓</span>
                </div>

                {/* Axis 0: Good Experience (Dual Progressive Disclosure) */}
                {slide21LabAxis === 0 && (
                  <div className="space-y-2.5">
                    {slide21ExpPersona === 'novice' ? (
                      <div className="space-y-2">
                        <div className="text-xs sm:text-sm font-mono text-emerald-800 font-bold">
                          Beginner Mode: Visual Recognition &amp; 1-Tap Booking
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { name: 'AgTech Lab', icon: '🌱' },
                            { name: 'AI Cluster', icon: '💻' },
                            { name: 'Study Pod', icon: '📚' },
                          ].map((item) => (
                            <button
                              key={item.name}
                              onClick={() => {
                                setSlide21ExpGoodSelected(item.name);
                                setSlide21ExpGoodBooked(false);
                              }}
                              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                                slide21ExpGoodSelected === item.name
                                  ? 'border-[#E5391C] bg-[#FDF5F2] ring-2 ring-[#E5391C]/20 font-bold text-[#E5391C]'
                                  : 'border-[#E8E2D9] bg-[#FAF9F6] text-stone-700'
                              }`}
                            >
                              <div className="text-xl">{item.icon}</div>
                              <div className="text-xs font-semibold">{item.name}</div>
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => setSlide21ExpGoodBooked(true)}
                          className="w-full py-2.5 bg-[#E5391C] text-white rounded-xl font-bold text-xs sm:text-sm hover:bg-[#C92B10] cursor-pointer shadow-xs font-mono"
                        >
                          Book {slide21ExpGoodSelected} (2 Hours)
                        </button>
                        {slide21ExpGoodBooked && (
                          <div className="p-2.5 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs sm:text-sm font-medium">
                            ✓ Instant Confirmation: {slide21ExpGoodSelected} reserved with QR key.
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-stone-600">
                          <span className="font-bold text-stone-900">Power User Command Palette (⌘K)</span>
                          <span className="text-emerald-700 font-bold">Latency: 180ms</span>
                        </div>
                        <div className="p-2.5 bg-stone-900 text-stone-100 rounded-xl font-mono text-xs sm:text-sm flex items-center justify-between">
                          <span>&gt; book:agtech duration:2h</span>
                          <span className="text-xs bg-stone-700 px-2 py-0.5 rounded text-stone-300 font-bold">Enter ↵</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs font-mono text-stone-700 font-semibold">
                          <span className="p-2 bg-[#FAF9F6] border rounded-lg text-center">[1] AgTech</span>
                          <span className="p-2 bg-[#FAF9F6] border rounded-lg text-center">[2] AI Cluster</span>
                          <span className="p-2 bg-[#FAF9F6] border rounded-lg text-center">[3] Pod</span>
                        </div>
                        <div className="p-2.5 bg-emerald-100 text-emerald-900 rounded-xl text-xs sm:text-sm font-medium">
                          ⚡ Power user executed workflow with 0 clicks via motor keyboard memory.
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Axis 1: Good Motor (Generous Targets & Undo Guard) */}
                {slide21LabAxis === 1 && (
                  <div className="space-y-2.5">
                    <div className="text-xs sm:text-sm font-mono text-emerald-800 font-bold">
                      Fitts' Law Compliant Targets (≥52px Height) &amp; Safe Spatial Buffer
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSlide21MotorGoodConfirmed(true)}
                        className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs sm:text-sm cursor-pointer shadow-xs min-h-[48px] flex items-center justify-center gap-2 font-mono"
                      >
                        <Check className="w-4 h-4" />
                        <span>Save Research Project</span>
                      </button>
                      <button
                        onClick={() => alert('Destructive actions require secondary confirmation.')}
                        className="py-3 px-3 border border-stone-300 hover:bg-stone-100 text-stone-700 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer min-h-[48px] font-mono"
                      >
                        Cancel
                      </button>
                    </div>
                    {slide21MotorGoodConfirmed && (
                      <div className="p-2.5 bg-emerald-100 border border-emerald-300 rounded-xl text-xs sm:text-sm text-emerald-950 font-medium flex items-center justify-between">
                        <span>✓ Safely saved with 0% motor error. Undo buffer active (10s).</span>
                        <button
                          onClick={() => setSlide21MotorGoodConfirmed(false)}
                          className="font-mono text-emerald-700 underline font-bold"
                        >
                          Undo
                        </button>
                      </div>
                    )}
                    <div className="text-xs font-mono text-stone-600 font-semibold">
                      ✓ Even under identical 10Hz/12Hz tremor, the 52px target absorbs motor drift without misfires.
                    </div>
                  </div>
                )}

                {/* Axis 2: Good Sensory (Redundant Shape + Text + WCAG AAA) */}
                {slide21LabAxis === 2 && (
                  <div className="space-y-2.5">
                    <div className="text-xs sm:text-sm font-mono font-bold text-emerald-900 uppercase">
                      Multimodal Redundant Triad (Shape + Icon + High-Contrast Text)
                    </div>
                    <div className="space-y-2">
                      {/* Normal safe status: Circular shield + Check + Bold text */}
                      <div className="p-2.5 bg-emerald-50 border-2 border-emerald-600 rounded-xl flex items-center justify-between text-emerald-950 font-bold text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                            <Check className="w-4 h-4" />
                          </div>
                          <span>REACTOR LINE ALPHA: 4.2 BAR (NORMAL SAFE)</span>
                        </div>
                        <span className="text-xs font-mono bg-emerald-200 px-2 py-0.5 rounded-md font-bold text-emerald-900">
                          AAA 9.2:1
                        </span>
                      </div>

                      {/* Overheat warning status: Distinct Warning Triangle + Exclamation + Bold text */}
                      <div className="p-2.5 bg-red-100 border-2 border-red-600 rounded-xl flex items-center justify-between text-red-950 font-bold text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-md bg-red-600 text-white flex items-center justify-center shadow-xs">
                            <AlertTriangle className="w-4 h-4" />
                          </div>
                          <span>REACTOR LINE BETA: CRITICAL OVERHEAT</span>
                        </div>
                        <span className="text-xs font-mono bg-red-200 px-2 py-0.5 rounded-md font-bold text-red-900">
                          AAA 8.8:1
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSlide21SensoryGoodClick(true)}
                      className="w-full py-2.5 bg-emerald-700 text-white rounded-lg text-xs sm:text-sm font-bold font-mono hover:bg-emerald-800 cursor-pointer shadow-xs"
                    >
                      HALT CRITICAL LINE BETA (IDENTIFIED BY TRIANGLE &amp; TEXT)
                    </button>
                    {slide21SensoryGoodClick ? (
                      <div className="p-2.5 bg-emerald-100 border border-emerald-300 text-emerald-950 rounded-lg text-xs sm:text-sm font-semibold">
                        ✓ Flawless Resolution: Even with colors washed out by deuteranopia or glare, the distinct geometric shape (Triangle vs Circle) and semantic text enabled instantaneous, 100% accurate decision.
                      </div>
                    ) : (
                      <div className="text-xs sm:text-sm text-stone-700 font-semibold">
                        ✓ Under colorblindness or desert glare, geometric shapes (Circle vs Triangle) and bold semantic text remain 100% legible.
                      </div>
                    )}
                  </div>
                )}

                {/* Axis 3: Good Cognitive (Recognition over Recall & Sticky Context) */}
                {slide21LabAxis === 3 && (
                  <div className="space-y-2.5">
                    <div className="text-xs sm:text-sm font-mono text-emerald-800 font-bold">
                      Recognition Over Recall: Persistent Context Drawer
                    </div>
                    <div className="p-3 bg-[#FAF9F6] border border-[#E8E2D9] rounded-xl flex items-center justify-between">
                      <div>
                        <span className="text-xs font-mono text-stone-600 uppercase font-bold block">Active Verification Token:</span>
                        <strong className="text-base font-mono text-stone-900">948-QZM-72</strong>
                      </div>
                      <button
                        onClick={() => setSlide21CognitiveGoodCopied(true)}
                        className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs sm:text-sm font-bold font-mono cursor-pointer shadow-xs"
                      >
                        {slide21CognitiveGoodCopied ? '✓ Auto-Filled' : '1-Tap Auto Fill'}
                      </button>
                    </div>
                    {slide21CognitiveGoodCopied ? (
                      <div className="p-2.5 bg-emerald-100 border border-emerald-300 rounded-xl text-xs sm:text-sm text-emerald-950 font-medium">
                        ✓ Verified in 0.4s! Zero cognitive burden. Working memory preserved for actual thinking.
                      </div>
                    ) : (
                      <div className="text-xs font-mono text-stone-600 font-semibold">
                        Context is never hidden across wizard steps; system remembers for the human.
                      </div>
                    )}
                  </div>
                )}

                {/* Axis 4: Good Cultural (CSS Logical Properties & Dynamic RTL) */}
                {slide21LabAxis === 4 && (
                  <div className="space-y-2.5">
                    <div className="text-xs sm:text-sm font-mono text-emerald-800 font-bold">
                      Native Bi-Directional Fluid Layout (CSS Logical Properties):
                    </div>
                    <div
                      dir={slide21CultureLang === 'ar' ? 'rtl' : 'ltr'}
                      className="p-3 bg-[#FAF9F6] border border-[#E8E2D9] rounded-xl flex items-center gap-2 flex-wrap"
                    >
                      <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-xs font-mono">
                        <span>
                          {slide21CultureLang === 'ar' ? 'تأكيد الحجز' : slide21CultureLang === 'fr' ? 'Enregistrer les modifications' : 'Confirm Booking'}
                        </span>
                        <span>{slide21CultureLang === 'ar' ? '←' : '→'}</span>
                      </button>
                      <button className="px-3.5 py-2 bg-white border border-[#E8E2D9] rounded-xl text-xs sm:text-sm text-stone-800 hover:bg-stone-50 font-semibold font-mono">
                        {slide21CultureLang === 'ar' ? 'إلغاء العملية' : slide21CultureLang === 'fr' ? 'Annuler' : 'Cancel'}
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-700 font-medium">
                      ✓ Containers auto-expand fluidly. In Arabic, layout mirrors naturally and arrows point along reading flow.
                    </p>
                  </div>
                )}
              </div>

              {/* Validated Engineering Metrics */}
              <div className="p-3 bg-emerald-100/60 rounded-xl border border-emerald-200 text-xs sm:text-sm font-mono text-emerald-900 flex items-center justify-between flex-shrink-0">
                <div>• Frustration: <strong>0%</strong></div>
                <div>• Errors: <strong>0.0%</strong></div>
                <div>• WCAG: <strong>AAA PASS</strong></div>
              </div>
            </div>
          </div>

          {/* Key Principle Footer Banner */}
          <div className="p-3.5 bg-white border-2 border-[#E5391C] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs flex-shrink-0">
            <p className="text-sm sm:text-base lg:text-lg text-[#2D2D2E] leading-relaxed">
              <strong className="text-[#E5391C] font-serif-display text-base sm:text-lg font-bold mr-2">
                The Universal Design Imperative:
              </strong>
              Designing for human variance is not an edge-case compromise; it creates resilient, fault-tolerant systems that protect 100% of humans under real-world conditions.
            </p>
            <span className="text-xs sm:text-sm font-mono text-white bg-[#E5391C] font-bold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-2xs">
              Universal Ergonomics
            </span>
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
          Next: The Action Hierarchy (Goals vs Tasks vs Actions)
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 22: THE ACTION HIERARCHY: GOALS VS TASKS VS ACTIONS
  // --------------------------------------------------------------------------
  if (slide.id === 22) {
    const scenarios = {
      enrollment: {
        title: 'UM6P Course Enrollment',
        goal: 'Master Machine Learning to build autonomous agricultural robotics.',
        task: 'Select and enroll in CS301 (Machine Learning) for Spring Term.',
        action: 'Log in, click 4 nested submenus, decode 6-digit CRN code, submit form.',
        friction: '3 unnecessary submenus + manual CRN memorization = 45s cognitive delay.',
      },
      payment: {
        title: 'Campus Mobile Payment (UM6P Barista)',
        goal: 'Get morning caffeine to focus during the 09:00 AM algorithms lecture.',
        task: 'Purchase a Double Espresso with 1 sugar cube.',
        action: 'Tap beverage button, adjust sugar slider, hold student card to NFC reader.',
        friction: 'Good HCI: 1 physical tap + NFC swipe = 3.2s total interaction loop.',
      },
      medical: {
        title: 'Emergency Medical Infusion',
        goal: 'Stabilize a patient experiencing acute cardiac arrhythmia in ICU.',
        task: 'Administer 150mg of Amiodarone IV at constant infusion rate.',
        action: 'Power on pump, convert mg to mL/hr via mental math, press 8 confirmation keys.',
        friction: 'High cognitive friction: Mental math under life-or-death panic creates fatal dosage errors.',
      },
    };

    const cur = scenarios[slide22Scenario];

    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 bg-[#FAF9F6] select-text">
        {/* Header Bar */}
        <div className="pb-3 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-7 lg:h-8 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 3 · Cognitive Action Hierarchy
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 22 / 45</span>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-3 gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-shrink-0">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif-display font-medium text-[#2D2D2E]">
                Goals vs Tasks vs Actions
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-[#6E6D70] font-light">
                Human beings live in goals; software engineers naturally build for actions.
              </p>
            </div>

            {/* Scenario Switcher */}
            <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-[#E8E2D9] shadow-xs self-start sm:self-auto">
              {(['enrollment', 'payment', 'medical'] as const).map((sc) => (
                <button
                  key={sc}
                  onClick={() => setSlide22Scenario(sc)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold cursor-pointer transition-all ${
                    slide22Scenario === sc
                      ? 'bg-[#E5391C] text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {sc === 'enrollment' ? 'University Enrollment' : sc === 'payment' ? 'Campus Coffee' : 'Medical Infusion'}
                </button>
              ))}
            </div>
          </div>

          {/* 3-Tier Cognitive Pyramid Cards: Full Height & Centered Balance */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-stretch min-h-0">
            {/* 1. GOAL */}
            <div className="bg-[#FDF5F2] border-2 border-[#E5391C] p-6 lg:p-8 xl:p-9 rounded-3xl flex flex-col justify-between shadow-sm space-y-4">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-mono text-[#E5391C] font-bold uppercase tracking-wider px-3 py-1.5 bg-[#FAD6CF] rounded-xl">
                    Level 1 · The "Why"
                  </span>
                  <Target className="w-6 h-6 text-[#E5391C]" />
                </div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-bold text-[#2D2D2E]">
                  Human Goal
                </h3>
                <p className="text-base sm:text-lg lg:text-xl text-[#525254] leading-relaxed">
                  The high-level human state desired. Driven entirely by human emotional, social, intellectual, or biological intent.
                </p>

                <div className="p-5 bg-white rounded-2xl border border-[#FAD6CF] space-y-2 shadow-2xs">
                  <div className="text-xs font-mono text-[#E5391C] font-bold uppercase tracking-wider">Concrete Human Goal:</div>
                  <div className="text-base sm:text-lg lg:text-xl font-medium text-[#2D2D2E] italic leading-snug">
                    "{cur.goal}"
                  </div>
                </div>
              </div>

              <div className="text-xs sm:text-sm font-mono text-[#E5391C] font-bold pt-3.5 border-t border-[#FAD6CF] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5391C] shrink-0" />
                <span>Technology-Agnostic Purpose</span>
              </div>
            </div>

            {/* 2. TASK */}
            <div className="bg-white border-2 border-[#E8E2D9] p-6 lg:p-8 xl:p-9 rounded-3xl flex flex-col justify-between shadow-xs space-y-4">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-mono text-stone-700 font-bold uppercase tracking-wider px-3 py-1.5 bg-stone-100 rounded-xl">
                    Level 2 · The "What"
                  </span>
                  <Workflow className="w-6 h-6 text-stone-700" />
                </div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-bold text-[#2D2D2E]">
                  Structured Task
                </h3>
                <p className="text-base sm:text-lg lg:text-xl text-[#525254] leading-relaxed">
                  The structured operational workflow required to satisfy the goal. Bridges abstract human desire into procedural steps.
                </p>

                <div className="p-5 bg-[#FAF9F6] rounded-2xl border border-[#E8E2D9] space-y-2 shadow-2xs">
                  <div className="text-xs font-mono text-stone-600 font-bold uppercase tracking-wider">Operational Workflow:</div>
                  <div className="text-base sm:text-lg lg:text-xl font-medium text-[#2D2D2E] leading-snug">
                    {cur.task}
                  </div>
                </div>
              </div>

              <div className="text-xs sm:text-sm font-mono text-stone-700 font-bold pt-3.5 border-t border-stone-200 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-stone-600 shrink-0" />
                <span>Conceptual Milestone Sequence</span>
              </div>
            </div>

            {/* 3. ACTION */}
            <div className="bg-white border-2 border-[#E8E2D9] p-6 lg:p-8 xl:p-9 rounded-3xl flex flex-col justify-between shadow-xs space-y-4">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-mono text-blue-800 font-bold uppercase tracking-wider px-3 py-1.5 bg-blue-100 rounded-xl">
                    Level 3 · The "How"
                  </span>
                  <MousePointer className="w-6 h-6 text-blue-700" />
                </div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-bold text-[#2D2D2E]">
                  Physical Action
                </h3>
                <p className="text-base sm:text-lg lg:text-xl text-[#525254] leading-relaxed">
                  The low-level motor commands: mouse clicks, keystrokes, finger taps, directory traversals, dropdown selections.
                </p>

                <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-200 space-y-2 shadow-2xs">
                  <div className="text-xs font-mono text-blue-800 font-bold uppercase tracking-wider">Motor Execution Sequence:</div>
                  <div className="text-base sm:text-lg lg:text-xl font-medium text-blue-950 leading-snug">
                    {cur.action}
                  </div>
                </div>
              </div>

              <div className="text-xs sm:text-sm font-mono text-blue-800 font-bold pt-3.5 border-t border-blue-200 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                <span>Physical Pixel & Motor Manipulation</span>
              </div>
            </div>
          </div>

          {/* Action Minimization Analysis Strip */}
          <div className="p-4 bg-[#FAF9F6] border-2 border-[#E8E2D9] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs flex-shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-mono uppercase font-bold text-[#E5391C]">
                ⚡ Cognitive Friction Diagnosis:
              </span>
              <span className="text-sm sm:text-base font-semibold text-[#2D2D2E]">
                {cur.friction}
              </span>
            </div>
            <span className="text-xs sm:text-sm font-mono bg-stone-900 text-white font-bold px-3 py-1 rounded-lg">
              Goal ➔ Task ➔ Action Mapping
            </span>
          </div>

          {/* Key Principle Footer Banner */}
          <div className="p-4 bg-white border-2 border-[#E5391C] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs flex-shrink-0">
            <p className="text-base sm:text-lg lg:text-xl text-[#2D2D2E] leading-relaxed">
              <strong className="text-[#E5391C] font-serif-display text-lg sm:text-xl font-bold mr-2">
                The Law of Action Minimization:
              </strong>
              Nobody wakes up excited to click dropdown menus or type SQL codes. Every low-level action you insert between a user and their goal is friction. Great HCI compresses actions to bring humans directly to their goal.
            </p>
            <span className="text-xs sm:text-sm font-mono text-white bg-[#E5391C] font-bold px-3.5 py-1.5 rounded-xl whitespace-nowrap shadow-2xs">
              Compress Actions
            </span>
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
          Next: Why Engineers Confuse Tasks with Goals (Conway's Law in UI)
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 23: WHY ENGINEERS CONFUSE TASKS WITH GOALS (Conway's Law in UI)
  // --------------------------------------------------------------------------
  if (slide.id === 23) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 bg-[#FAF9F6] select-text">
        {/* Header Bar */}
        <div className="pb-3 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-7 lg:h-8 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 3 · Architectural Paradigm Shift
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 23 / 45</span>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-3 gap-4">
          <div className="space-y-1 flex-shrink-0">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif-display font-medium text-[#2D2D2E]">
              Why Engineers Confuse Tasks with Goals
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-[#6E6D70] font-light">
              Conway’s Law in UI: Systems naturally expose their internal database schemas unless engineers design for human intent.
            </p>
          </div>

          {/* Two Realistic Interface Mockups Side-by-Side: Bad (Task-Centric) vs Good (Goal-Centric) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 items-stretch min-h-0">
            {/* LEFT INTERFACE: BAD DESIGN (Task/Database-Driven UI) */}
            <div className="bg-red-50/60 border-2 border-red-300 rounded-3xl p-5 lg:p-7 flex flex-col justify-between shadow-xs space-y-3">
              <div className="space-y-2 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-mono uppercase text-red-700 font-bold tracking-wider px-3 py-1 bg-red-100 rounded-xl flex items-center gap-2">
                    <Database className="w-4 h-4 text-red-600" />
                    <span>⚠️ Bad Design: Task / Database-Centric UI</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-red-800">"How Engineers Think"</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-red-950">
                  Exposing Raw Backend Architecture
                </h3>
                <p className="text-sm sm:text-base text-red-900/90 leading-snug">
                  The interface exposes SQL relational tables directly. The user is forced to think like a database management system.
                </p>
              </div>

              {/* Realistic Mockup: Campus Room Reservation System (Bad CRUD) */}
              <div className="p-4 bg-white rounded-2xl border-2 border-red-200 font-mono text-xs space-y-2.5 shadow-2xs">
                <div className="flex items-center justify-between pb-1.5 border-b border-stone-200 text-stone-500 font-bold">
                  <span>SYSTEM_STUDY_ROOM_RESERVATIONS_V2.1</span>
                  <span>TABLE: `tbl_reservations`</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-stone-700">
                  <div>
                    <label className="text-xs text-stone-600 block uppercase font-bold">facility_building_fk (INT):</label>
                    <input
                      disabled
                      value="bldg_id_4409 (GreenTech)"
                      className="w-full p-2.5 bg-stone-100 rounded-lg border border-stone-300 font-mono text-xs sm:text-sm font-semibold text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-stone-600 block uppercase font-bold">epoch_timestamp_start:</label>
                    <input
                      disabled
                      value="1711897200 (UTC Epoch)"
                      className="w-full p-2.5 bg-stone-100 rounded-lg border border-stone-300 font-mono text-xs sm:text-sm font-semibold text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-stone-600 block uppercase font-bold">required_capacity_constraint:</label>
                    <input
                      disabled
                      value="seats >= 4"
                      className="w-full p-2.5 bg-stone-100 rounded-lg border border-stone-300 font-mono text-xs sm:text-sm font-semibold text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-stone-600 block uppercase font-bold">amenity_bitmask_flags:</label>
                    <input
                      disabled
                      value="0b100101 (Screen+Silent)"
                      className="w-full p-2.5 bg-stone-100 rounded-lg border border-stone-300 font-mono text-xs sm:text-sm font-semibold text-stone-900"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setSlide23BadSubmitted(!slide23BadSubmitted)}
                  className="w-full py-3 bg-red-700 hover:bg-red-800 text-white font-bold rounded-xl cursor-pointer transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm font-mono"
                >
                  <Database className="w-4 h-4" />
                  <span>Execute SQL INSERT INTO `tbl_reservations`</span>
                </button>

                {slide23BadSubmitted && (
                  <div className="p-3 bg-red-100 text-red-950 border border-red-300 rounded-xl text-xs sm:text-sm font-mono animate-in fade-in duration-150 font-medium">
                    <strong>Error 0x884:</strong> Transaction deadlock on table `tbl_room_locks`. Foreign key constraint violation on `user_account_pk`. Please rollback and re-verify table IDs manually.
                  </div>
                )}
              </div>

              {/* Pedagogical Breakdown */}
              <div className="p-3.5 bg-red-100/70 rounded-xl border border-red-200 text-xs sm:text-sm font-mono text-red-900 flex items-center justify-between font-semibold">
                <div>• Required Tasks: <strong>8 manual form tasks</strong></div>
                <div>• Time Wasted: <strong>95 seconds</strong></div>
                <div>• Mental Strain: <strong>SQL Schema</strong></div>
              </div>
            </div>

            {/* RIGHT INTERFACE: GOOD DESIGN (Goal/Intent-First UI) */}
            <div className="bg-emerald-50/60 border-2 border-emerald-300 rounded-3xl p-5 lg:p-7 flex flex-col justify-between shadow-xs space-y-3">
              <div className="space-y-2 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-mono uppercase text-emerald-800 font-bold tracking-wider px-3 py-1 bg-emerald-100 rounded-xl flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                    <span>✓ Good Design: Goal / Intent-First UI</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-800">"How Humans Think"</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-emerald-950">
                  Encapsulating Implementation Detail
                </h3>
                <p className="text-sm sm:text-base text-emerald-900/90 leading-snug">
                  The interface starts directly from the user's intent. Relational tables, transaction locks, and queries run silently behind the scenes.
                </p>
              </div>

              {/* Realistic Mockup: Campus Room Reservation System (Good HCI) */}
              <div className="p-4 bg-white rounded-2xl border-2 border-emerald-200 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between pb-1.5 border-b border-stone-200">
                  <span className="text-xs sm:text-sm font-mono text-stone-600 font-bold">UM6P CAMPUS SPACES</span>
                  <span className="text-xs sm:text-sm font-mono text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-md">
                    INTENT-FIRST ASSISTANT
                  </span>
                </div>

                <div className="p-3 bg-[#FAF9F6] rounded-xl border border-stone-200 space-y-1">
                  <span className="text-xs font-mono text-stone-600 uppercase font-bold">Stated Student Goal:</span>
                  <div className="text-sm sm:text-base lg:text-lg font-serif-display font-bold text-[#2D2D2E]">
                    "Find a quiet room for 4 people tomorrow at 3:00 PM"
                  </div>
                </div>

                {/* 1-Tap Smart Room Recommendation Card */}
                <div className="p-3.5 bg-emerald-50/70 border border-emerald-300 rounded-xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm sm:text-base font-bold text-emerald-950 flex items-center gap-2">
                      <span>{slide23GoodRoom}</span>
                      <span className="text-xs font-mono bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-bold">BEST MATCH</span>
                    </div>
                    <div className="text-xs sm:text-sm text-stone-700 font-medium">
                      Seats 4 · 4K Screen · Acoustic Soundproofing · Free 3:00 - 5:00 PM
                    </div>
                  </div>

                  <button
                    onClick={() => setSlide23GoodReserved(true)}
                    className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-mono font-bold rounded-xl cursor-pointer transition-colors shadow-xs"
                  >
                    {slide23GoodReserved ? '✓ Reserved!' : '1-Tap Book'}
                  </button>
                </div>

                {slide23GoodReserved && (
                  <div className="p-3 bg-emerald-100 text-emerald-950 border border-emerald-300 rounded-xl text-xs sm:text-sm font-mono animate-in fade-in duration-150 flex items-center justify-between">
                    <span>✓ Confirmation sent to student card & calendar invite dispatched. PIN: <strong>4892</strong></span>
                    <button
                      onClick={() => setSlide23GoodReserved(false)}
                      className="text-xs text-emerald-800 underline font-bold"
                    >
                      Reset
                    </button>
                  </div>
                )}
              </div>

              {/* Pedagogical Breakdown */}
              <div className="p-3.5 bg-emerald-100/70 rounded-xl border border-emerald-200 text-xs sm:text-sm font-mono text-emerald-900 flex items-center justify-between font-semibold">
                <div>• Required Tasks: <strong>1 direct tap</strong></div>
                <div>• Time to Goal: <strong>4 seconds</strong></div>
                <div>• Mental Strain: <strong>Human Goal</strong></div>
              </div>
            </div>
          </div>

          {/* Key Principle Footer Banner */}
          <div className="p-4 bg-white border-2 border-[#E5391C] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs flex-shrink-0">
            <p className="text-base sm:text-lg lg:text-xl text-[#2D2D2E] leading-relaxed">
              <strong className="text-[#E5391C] font-serif-display text-lg sm:text-xl font-bold mr-2">
                Conway's Law in UI:
              </strong>
              Software systems mirror the internal structure of the database tables that created them. Great HCI engineers invert this: start with the human goal and hide the database schema.
            </p>
            <span className="text-xs sm:text-sm font-mono text-white bg-[#E5391C] font-bold px-3.5 py-1.5 rounded-xl whitespace-nowrap shadow-2xs">
              Conway's Law
            </span>
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
          Next: Context of Use: The Missing Dimension
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 24: CONTEXT OF USE: THE MISSING DIMENSION (Environmental Ergonomics)
  // --------------------------------------------------------------------------
  if (slide.id === 24) {
    const contexts = [
      {
        id: 'nominal',
        title: '1. Laboratory / Quiet Desk',
        stressor: 'Ideal Engineering Baseline',
        lux: '400 Lux (Controlled)',
        movement: 'Zero Vibration · 0.0G',
        attention: '100% Single-Task Focus',
        memory: '7 ± 2 Working Items',
        failure: 'Creates false engineering confidence: 0% error rate in lab blinds developers to field reality.',
        remedy: 'Treat lab testing only as syntax verification; field testing is semantic survival.',
        color: 'border-emerald-300 bg-emerald-50/60 text-emerald-950',
        badgeBg: 'bg-emerald-100 text-emerald-800',
      },
      {
        id: 'sunlight',
        title: '2. High Desert Sunlight Glare',
        stressor: 'Perceptual & Contrast Washout',
        lux: '94,500 Lux (Blinding Sun)',
        movement: 'Squinting · Constricted Pupils',
        attention: 'Divided · Shading Screen',
        memory: 'Slow visual decoding',
        failure: 'Gray-on-white text (#999 on #FFF) has 1.3:1 contrast in bright sunlight—completely invisible.',
        remedy: 'WCAG AAA contrast (>= 7:1), thick 3px button strokes, redundant shapes and icons.',
        color: 'border-amber-300 bg-amber-50/60 text-amber-950',
        badgeBg: 'bg-amber-100 text-amber-900',
      },
      {
        id: 'vibration',
        title: '3. Highway Vehicle at 120 km/h',
        stressor: 'Severe Motor & Visual Jitter',
        lux: 'Fluctuating Night Glare',
        movement: '12Hz Chassis Road Jitter',
        attention: 'Eyes-off-road strictly < 2.0s',
        memory: 'Rapid task interruption',
        failure: 'Motor drift causes 42%+ mis-taps on small buttons (<48px). Driver glances cause crashes.',
        remedy: 'Fitts-compliant targets (>=64px), tactile/audio confirmation, zero nested menus.',
        color: 'border-red-300 bg-red-50/60 text-red-950',
        badgeBg: 'bg-red-100 text-red-900',
      },
      {
        id: 'stress',
        title: '4. Critical 30s Time Pressure',
        stressor: 'Cognitive Tunnel Vision',
        lux: 'Chaotic Dynamic Lighting',
        movement: 'Rapid Walking / Running',
        attention: 'Auditory Alarms & Panic',
        memory: 'Collapses to ~2 Items',
        failure: 'High stress induces cognitive tunnel vision: users miss subtle alerts and panic double-click.',
        remedy: 'Recognition over recall: Big unambiguous status indicators, instant undo guards.',
        color: 'border-purple-300 bg-purple-50/60 text-purple-950',
        badgeBg: 'bg-purple-100 text-purple-900',
      },
    ];

    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 bg-[#FAF9F6] select-text">
        {/* Header Bar */}
        <div className="pb-3 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-7 lg:h-8 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 3 · Environmental & Situational Ergonomics
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 24 / 45</span>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-3 gap-5">
          <div className="space-y-1 flex-shrink-0">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif-display font-medium text-[#2D2D2E]">
              Context of Use: The Missing Dimension
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-[#6E6D70] font-light">
              An interface never exists in a vacuum. The real world is loud, vibrating, sunny, and stressful.
            </p>
          </div>

          {/* 4 Context Columns: Full Height, Packed with Rigor, Zero Empty Space */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 flex-1 items-stretch min-h-0">
            {contexts.map((ctx) => (
              <div
                key={ctx.id}
                className={`p-6 lg:p-7 rounded-3xl border-2 flex flex-col justify-between shadow-xs space-y-4 ${ctx.color}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${ctx.badgeBg}`}>
                      {ctx.stressor}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif-display font-bold leading-tight">
                    {ctx.title}
                  </h3>

                  {/* Quantitative Environmental Telemetry Box */}
                  <div className="p-3.5 bg-white/80 rounded-2xl border border-current/20 space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="opacity-70">Lighting:</span>
                      <span className="font-bold">{ctx.lux}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-70">Motion:</span>
                      <span className="font-bold">{ctx.movement}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-70">Attention:</span>
                      <span className="font-bold">{ctx.attention}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-70">Working Memory:</span>
                      <span className="font-bold">{ctx.memory}</span>
                    </div>
                  </div>
                </div>

                {/* Real-World Failure & Remedy Box */}
                <div className="space-y-2 pt-2 border-t border-current/15">
                  <div className="text-xs font-bold font-mono opacity-80 uppercase">
                    Field Failure Mode:
                  </div>
                  <p className="text-xs sm:text-sm font-medium leading-relaxed bg-white/90 p-3 rounded-xl border border-current/20">
                    {ctx.failure}
                  </p>

                  <div className="text-xs font-bold font-mono text-[#E5391C] uppercase pt-1">
                    HCI Requirement:
                  </div>
                  <p className="text-xs sm:text-sm font-semibold leading-snug">
                    ✓ {ctx.remedy}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Key Principle Footer Banner */}
          <div className="p-4 bg-white border-2 border-[#E5391C] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs flex-shrink-0">
            <p className="text-base sm:text-lg lg:text-xl text-[#2D2D2E] leading-relaxed">
              <strong className="text-[#E5391C] font-serif-display text-lg sm:text-xl font-bold mr-2">
                Context Dictates Interaction:
              </strong>
              Lab testing measures peak human capability under artificial comfort. Real-world context of use exposes catastrophic failure modes. Always test in the field.
            </p>
            <span className="text-xs sm:text-sm font-mono text-white bg-[#E5391C] font-bold px-3.5 py-1.5 rounded-xl whitespace-nowrap shadow-2xs">
              Field Testing
            </span>
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
          Next: Live Experiment 3 — The In-Vehicle Touchscreen Test
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 26: AXIOM: "YOU ARE NOT THE USER" (The Golden Rule of HCI)
  // --------------------------------------------------------------------------
  if (slide.id === 26) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 bg-[#FAF9F6] select-text">
        {/* Header Bar */}
        <div className="pb-3 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-7 lg:h-8 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 3 Axiom · Core Golden Rule
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 26 / 45</span>
        </div>

        {/* Grand Hero Core: Zero Wasted Space */}
        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-3 gap-5">
          <div className="text-center space-y-2 flex-shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-[#FDF5F2] border-2 border-[#E5391C] flex items-center justify-center mx-auto text-[#E5391C] shadow-xs">
              <AlertOctagon className="w-7 h-7" />
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif-display font-medium text-[#2D2D2E] leading-tight">
              "You Are Not The User."
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-[#525254] font-light max-w-4xl mx-auto">
              The fundamental cognitive bias that breaks more software systems than all technical bugs combined.
            </p>
          </div>

          {/* 3 Fatal Biases vs 3 HCI Commandments: Full Height & Generous Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 items-stretch min-h-0">
            {/* 3 Fatal Engineering Biases */}
            <div className="bg-red-50/60 border-2 border-red-300 rounded-3xl p-6 lg:p-8 flex flex-col justify-between shadow-xs space-y-4">
              <div className="space-y-1">
                <span className="text-xs sm:text-sm font-mono uppercase text-red-700 font-bold tracking-wider">
                  ⚠️ The 3 Fatal Engineering Biases
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-red-950">
                  Why Engineers Build Broken Interfaces
                </h3>
              </div>

              <div className="space-y-3 flex-1 flex flex-col justify-center">
                <div className="p-4 bg-white rounded-2xl border border-red-200 shadow-2xs space-y-1">
                  <strong className="text-red-900 block font-mono text-xs sm:text-sm uppercase font-bold">
                    1. The False Consensus Effect
                  </strong>
                  <p className="text-stone-700 text-sm sm:text-base leading-snug">
                    "Because this workflow makes intuitive sense to me, it must make sense to everyone else." Engineers assume users share their mental model.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-red-200 shadow-2xs space-y-1">
                  <strong className="text-red-900 block font-mono text-xs sm:text-sm uppercase font-bold">
                    2. The Curse of Knowledge
                  </strong>
                  <p className="text-stone-700 text-sm sm:text-base leading-snug">
                    Once you know the codebase, it is psychologically impossible to perceive the screen with the fresh, uninitiated eyes of a beginner.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-red-200 shadow-2xs space-y-1">
                  <strong className="text-red-900 block font-mono text-xs sm:text-sm uppercase font-bold">
                    3. Developer Ergonomics Bias
                  </strong>
                  <p className="text-stone-700 text-sm sm:text-base leading-snug">
                    Optimizing for clean backend code or simple database queries rather than reducing human mental friction.
                  </p>
                </div>
              </div>

              <div className="text-xs sm:text-sm font-mono text-red-800 font-bold pt-2 border-t border-red-200">
                Cognitive Blindspot: Building for the creator, not the human.
              </div>
            </div>

            {/* 3 Golden HCI Commandments */}
            <div className="bg-emerald-50/60 border-2 border-emerald-300 rounded-3xl p-6 lg:p-8 flex flex-col justify-between shadow-xs space-y-4">
              <div className="space-y-1">
                <span className="text-xs sm:text-sm font-mono uppercase text-emerald-800 font-bold tracking-wider">
                  ✓ The 3 Golden HCI Commandments
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-emerald-950">
                  How Scientific HCI Overcomes Bias
                </h3>
              </div>

              <div className="space-y-3 flex-1 flex flex-col justify-center">
                <div className="p-4 bg-white rounded-2xl border border-emerald-200 shadow-2xs space-y-1">
                  <strong className="text-emerald-900 block font-mono text-xs sm:text-sm uppercase font-bold">
                    1. Test with Real Humans in the Field
                  </strong>
                  <p className="text-stone-700 text-sm sm:text-base leading-snug">
                    Never test solely on your teammates or colleagues who share your vocabulary, high-end hardware, and technical literacy.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-emerald-200 shadow-2xs space-y-1">
                  <strong className="text-emerald-900 block font-mono text-xs sm:text-sm uppercase font-bold">
                    2. Never Explain Your Interface
                  </strong>
                  <p className="text-stone-700 text-sm sm:text-base leading-snug">
                    If an interface requires verbal explanation during a usability session, the design is defective. Fix the software, never blame the user.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-emerald-200 shadow-2xs space-y-1">
                  <strong className="text-emerald-900 block font-mono text-xs sm:text-sm uppercase font-bold">
                    3. Measure Behavior, Not Opinions
                  </strong>
                  <p className="text-stone-700 text-sm sm:text-base leading-snug">
                    Users will politely tell you they love an app while mis-tapping 8 times. Record time-on-task, errors, and task success rates scientifically.
                  </p>
                </div>
              </div>

              <div className="text-xs sm:text-sm font-mono text-emerald-800 font-bold pt-2 border-t border-emerald-200">
                Scientific Discipline: Empirical observation over developer intuition.
              </div>
            </div>
          </div>

          {/* Golden Axiom Footer Banner */}
          <div className="p-4 bg-white border-2 border-[#E5391C] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs flex-shrink-0">
            <p className="text-base sm:text-lg lg:text-xl text-[#2D2D2E] leading-relaxed">
              <strong className="text-[#E5391C] font-serif-display text-lg sm:text-xl font-bold mr-2">
                The Golden Rule:
              </strong>
              Repeat after me: I am not the user. The lab is not the world. My code is not their mental model.
            </p>
            <span className="text-xs sm:text-sm font-mono text-white bg-[#E5391C] font-bold px-3.5 py-1.5 rounded-xl whitespace-nowrap shadow-2xs">
              Act 3 Takeaway
            </span>
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
          Next: Act 4 · Experiencing Bad Design Firsthand
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 27: THE ANATOMY OF FRUSTRATION: WHY SMART PEOPLE BUILD TERRIBLE INTERFACES
  // --------------------------------------------------------------------------
  if (slide.id === 27) {
    const causes = [
      {
        id: 0,
        name: 'The Curse of Knowledge',
        tag: 'Developer Blindness',
        icon: Brain,
        statement: 'Once you understand the system architecture, you cannot imagine what it feels like to be ignorant.',
        symptom: 'Engineers design shortcuts assuming everyone understands what an "OAuth Token", "CRN", or "Payload" is.',
        remedy: 'Conduct think-aloud usability testing with fresh novices who have zero prior system context.',
      },
      {
        id: 1,
        name: "Conway's Law in UI",
        tag: 'Database Reflection',
        icon: Database,
        statement: 'Organizations design interfaces that mirror their internal database tables and department org charts.',
        symptom: 'A 24-field form with 4 nested tabs because the backend has 4 normalized relational SQL tables.',
        remedy: 'Design strictly for human goals first; let the orchestration layer map data silently behind the scenes.',
      },
      {
        id: 2,
        name: 'The "Human Error" Fallacy',
        tag: 'Victim Blaming',
        icon: AlertTriangle,
        statement: 'Treating design-induced cognitive slips as user negligence rather than system architecture failures.',
        symptom: 'Blaming the user ("They should have read the modal") when the modal was 4 paragraphs of legalese.',
        remedy: 'Treat human distraction, fatigue, and limited working memory as immutable engineering constraints.',
      },
      {
        id: 3,
        name: 'Feature Creep vs Empathy',
        tag: 'Spec Sheet Bias',
        icon: Layers,
        statement: 'Engineering sprints measure feature volume shipped, never human cognitive friction eliminated.',
        symptom: 'Adding 15 configuration toggles to avoid making a difficult product decision on intelligent defaults.',
        remedy: 'Measure time-to-value, error recovery time, and cognitive simplicity as P0 engineering deliverables.',
      },
    ];

    const currentCause = causes[slide27Cause];

    const frustrationCurve = [
      {
        level: 1,
        title: '1. Cognitive Hesitation',
        time: '0s – 5s',
        mentalState: 'Visual search fails. The user looks for "Enroll in Course" but sees "Academic Lifecycle Action Module".',
        load: '30% Load',
        color: 'border-yellow-300 bg-yellow-50 text-yellow-950',
      },
      {
        level: 2,
        title: '2. Ineffective Trial & Error',
        time: '5s – 25s',
        mentalState: 'Clicks wrong submenus. Browser back button breaks the session. Form fields reset to empty.',
        load: '65% Load',
        color: 'border-amber-300 bg-amber-50 text-amber-950',
      },
      {
        level: 3,
        title: '3. Rage Clicks & Panic',
        time: '25s – 60s',
        mentalState: 'Heart rate spikes. Rapid multi-clicking on disabled submit button. Working memory saturated.',
        load: '95% Load',
        color: 'border-red-400 bg-red-50 text-red-950',
      },
      {
        level: 4,
        title: '4. Abandonment & Cynicism',
        time: '60s+',
        mentalState: 'Student closes the tab in disgust, calls a colleague, or files an angry ticket: "This system is broken."',
        load: '100% Collapse',
        color: 'border-red-600 bg-red-100 text-red-950',
      },
    ];

    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 bg-[#FAF9F6] select-text">
        {/* Top Header */}
        <div className="pb-3 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-7 lg:h-8 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 4 · Psychology of Friction
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 27 / 45</span>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-2 gap-4 min-h-0">
          {/* Title Header */}
          <div className="space-y-1 flex-shrink-0">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif-display font-medium text-[#2D2D2E]">
              The Anatomy of Frustration
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-[#6E6D70] font-light">
              Nobody sets out to build an unusable interface. Hostile design emerges from four systemic cognitive traps.
            </p>
          </div>

          {/* 4 Root Causes Selector Tabs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 flex-shrink-0">
            {causes.map((c) => {
              const IconComponent = c.icon;
              const isSelected = slide27Cause === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSlide27Cause(c.id)}
                  className={`p-4 sm:p-5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between shadow-xs ${
                    isSelected
                      ? 'bg-stone-900 border-[#E5391C] text-white ring-4 ring-[#E5391C]/20 shadow-md scale-[1.01]'
                      : 'bg-white border-[#E8E2D9] hover:border-stone-400 text-[#2D2D2E]'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                        isSelected ? 'bg-[#E5391C] text-white' : 'bg-stone-100 text-stone-700'
                      }`}>
                        {c.tag}
                      </span>
                      <IconComponent className={`w-5 h-5 ${isSelected ? 'text-[#E5391C]' : 'text-stone-400'}`} />
                    </div>
                    <h4 className="text-base sm:text-lg font-bold font-serif-display pt-1">{c.name}</h4>
                  </div>
                  <div className={`text-xs font-mono pt-2.5 border-t mt-2.5 font-bold ${
                    isSelected ? 'border-stone-700 text-[#E5391C]' : 'border-stone-200 text-stone-500'
                  }`}>
                    {isSelected ? '● ACTIVE TRAP' : 'INSPECT TRAP'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Deep Dive into Active Trap vs Frustration Escalation Curve */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 items-stretch min-h-0">
            {/* Left Column: Trap Deep Dive (7 cols) */}
            <div className="lg:col-span-7 bg-white border-2 border-[#E8E2D9] rounded-3xl p-6 lg:p-7 flex flex-col justify-between shadow-xs space-y-4">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-[#E5391C] bg-[#FDF5F2] border border-[#FAD6CF] px-3.5 py-1 rounded-xl">
                    Cognitive Pathology 0{currentCause.id + 1} · Root Cause Analysis
                  </span>
                  <span className="text-xs sm:text-sm font-mono text-stone-500 font-semibold">Psychological Breakdown</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif-display font-bold text-[#2D2D2E]">
                  {currentCause.name}
                </h3>
                <p className="text-lg sm:text-xl text-stone-800 italic border-l-4 border-[#E5391C] pl-4 py-2 bg-stone-50 rounded-r-2xl font-serif-display leading-relaxed">
                  &ldquo;{currentCause.statement}&rdquo;
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div className="p-4 sm:p-5 bg-red-50 border border-red-200 rounded-2xl space-y-2">
                    <span className="text-xs sm:text-sm font-mono font-bold uppercase text-red-700 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span>How It Manifests in UI:</span>
                    </span>
                    <p className="text-sm sm:text-base text-red-950 font-medium leading-relaxed">
                      {currentCause.symptom}
                    </p>
                  </div>
                  <div className="p-4 sm:p-5 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
                    <span className="text-xs sm:text-sm font-mono font-bold uppercase text-emerald-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>The Ergonomic Antidote:</span>
                    </span>
                    <p className="text-sm sm:text-base text-emerald-950 font-medium leading-relaxed">
                      {currentCause.remedy}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-stone-100 rounded-xl text-xs sm:text-sm font-mono text-stone-700 flex items-center justify-between">
                <span>Psychological Impact: Systemic Cognitive Dissonance</span>
                <span className="font-bold text-stone-900">Severity: P0 Blocker</span>
              </div>
            </div>

            {/* Right Column: The Frustration Escalation Curve (5 cols) */}
            <div className="lg:col-span-5 bg-[#FDF5F2] border-2 border-[#E5391C] rounded-3xl p-6 lg:p-7 flex flex-col justify-between shadow-xs space-y-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-mono font-bold uppercase text-[#E5391C] tracking-wider">
                    The Human Escalation Curve
                  </span>
                  <span className="text-xs font-mono text-stone-500 font-semibold">Compounding Stress</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-serif-display font-bold text-[#2D2D2E]">
                  How Humans Break Under Friction
                </h4>
              </div>

              <div className="space-y-2.5 flex-1 flex flex-col justify-center">
                {frustrationCurve.map((step) => {
                  const isActive = slide27CurveStep === step.level;
                  return (
                    <div
                      key={step.level}
                      onClick={() => setSlide27CurveStep(step.level)}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                        isActive
                          ? `${step.color} shadow-sm scale-[1.02] ring-2 ring-red-400/30`
                          : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs sm:text-sm font-mono font-bold">
                        <span>{step.title}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-black/5 px-2 py-0.5 rounded font-mono">{step.time}</span>
                          <span className="text-xs uppercase font-black">{step.load}</span>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm pt-2 font-sans leading-snug">
                        {step.mentalState}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="text-xs font-mono text-stone-600 text-center pt-2 border-t border-[#FAD6CF]">
                Click stages to trace how cognitive friction escalates into total abandonment.
              </div>
            </div>
          </div>

          {/* Key Principle Footer Banner */}
          <div className="p-4 bg-white border-2 border-[#E5391C] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs flex-shrink-0">
            <p className="text-base sm:text-lg lg:text-xl text-[#2D2D2E] leading-relaxed">
              <strong className="text-[#E5391C] font-serif-display text-lg sm:text-xl font-bold mr-2">
                Entering Act 4:
              </strong>
              Next is the live university course registration challenge. You will experience all four of these cognitive traps firsthand.
            </p>
            <span className="text-xs sm:text-sm font-mono text-white bg-[#E5391C] font-bold px-3.5 py-1.5 rounded-xl whitespace-nowrap shadow-2xs">
              Live Challenge Ahead
            </span>
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
          Next: Live Experiment 4 — The Hostile University Course Portal Challenge
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 29: FORENSIC AUTOPSY: THE 6 DESIGN CRIMES
  // --------------------------------------------------------------------------
  if (slide.id === 29) {
    const crimes = [
      {
        id: 0,
        name: 'Ambiguous Architecture',
        scientificTerm: 'Semantic Gulf of Execution',
        severity: 'Critical',
        crime: 'Hidden affordances & mysterious nested menus.',
        evidence: 'Course enrollment was buried under "Administrative Records > Academic Lifecycle Tools > Portal Sub-system". Zero direct search affordances.',
        cognitiveViolation: 'Norman Gulf of Execution: The user cannot translate their goal ("Enroll in CS-4010") into actionable system steps.',
        remedy: 'Goal-First Information Architecture with omni-search bar and 1-tap course pinning.',
      },
      {
        id: 1,
        name: "Fitts's Law Target Violation",
        scientificTerm: "Fitts's Law (MT = a + b log2(2D/W))",
        severity: 'Severe',
        crime: 'Microscopic 8px touch button placed 2px next to Destructive Reset.',
        evidence: 'Submit button width was 14px with zero visual margin, placed directly adjacent to "Clear Form & Abort Session".',
        cognitiveViolation: "Fitts's Law: Movement time increases exponentially as target width W shrinks. Rapid clicks slip onto adjacent destructive targets.",
        remedy: 'Minimum touch targets ≥ 48px with generous 24px spatial buffer isolating destructive actions.',
      },
      {
        id: 2,
        name: 'Reversed Affordances',
        scientificTerm: 'Stroop Interference & Visual Semiotics',
        severity: 'High',
        crime: 'Green button for "Cancel" and Red button for "Save".',
        evidence: 'Buttons swapped standard cultural colors, exploiting subconscious conditioned reflexes to induce accidental cancellation.',
        cognitiveViolation: 'Stroop Effect: Automated cognitive heuristics (Green = Go, Red = Stop) clash with text labels, causing 300ms cognitive conflict.',
        remedy: 'Culturally aligned semantic palettes: Green/Emerald for confirmation, Neutral for dismiss, Warning Red for irreversible destructive tasks.',
      },
      {
        id: 3,
        name: 'Double-Negative Dialog Trap',
        scientificTerm: 'Propositional Logic Overload',
        severity: 'High',
        crime: 'Unintelligible confirmation modals with inverted logic.',
        evidence: '"Are you sure you do not want to cancel the non-submission of your courses? [Cancel] [OK]".',
        cognitiveViolation: 'Working Memory Load: Negative propositions require 3x mental processing steps to parse. Under stress, users guess randomly.',
        remedy: 'Single declarative active-voice confirmations: "Do you want to enroll in CS-4010? [Enroll Now] [Keep Browsing]".',
      },
      {
        id: 4,
        name: 'Hostile State & Session Loss',
        scientificTerm: 'Human Investment Destruction',
        severity: 'Catastrophic',
        crime: 'Wiping all form inputs upon a single validation error.',
        evidence: 'Typing an invalid phone format wiped student biography, address, and 5 selected electives, resetting form to blank.',
        cognitiveViolation: 'Violates Human Psychological Investment: Wiping user input induces intense helplessness and software distrust.',
        remedy: 'Immutable Local State Preservation: Preserve all valid inputs, highlight the single erroneous field inline with restorative guidance.',
      },
      {
        id: 5,
        name: 'Cryptic Machine Error Codes',
        scientificTerm: 'Internal Architecture Leakage',
        severity: 'Severe',
        crime: 'Throwing raw database exception strings at human beings.',
        evidence: '"ERROR 0x882B: NULL_POINTER_EXCEPTION AT INDEX_TBL_ALLOC".',
        cognitiveViolation: 'Gulf of Evaluation: The human has zero mental bridge between database null pointers and what they need to fix.',
        remedy: 'Actionable Human Errors: State what happened in plain language, explain why, and provide a 1-click button to fix it.',
      },
    ];

    const currentCrime = crimes[slide29Crime];

    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 bg-[#FAF9F6] overflow-y-auto select-text">
        <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-6 lg:h-7 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 4 · Forensic Usability Inspection
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 29 / 45</span>
        </div>

        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-4 lg:py-6 gap-6 min-h-0">
          <div className="space-y-3 flex-shrink-0">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif-display font-medium text-[#2D2D2E]">
              Forensic Autopsy: The 6 Design Crimes
            </h2>
            <p className="text-xl sm:text-2xl text-[#6E6D70] font-light">
              Deconstructing what broke in the portal challenge. Every trap has a formal scientific law in cognitive engineering.
            </p>
          </div>

          {/* 6 Crime Forensic Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 flex-shrink-0">
            {crimes.map((c) => {
              const isSelected = slide29Crime === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSlide29Crime(c.id)}
                  className={`p-4 sm:p-5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between shadow-xs ${
                    isSelected
                      ? 'bg-stone-900 border-[#E5391C] text-white ring-4 ring-[#E5391C]/20 shadow-md scale-[1.01]'
                      : 'bg-white border-[#E8E2D9] hover:border-stone-400 text-[#2D2D2E]'
                  }`}
                >
                  <div className="space-y-2">
                    <span className={`text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-md inline-block ${
                      isSelected ? 'bg-[#E5391C] text-white' : 'bg-red-100 text-red-800'
                    }`}>
                      Crime 0{c.id + 1}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold font-serif-display leading-snug pt-1">
                      {c.name}
                    </h4>
                  </div>
                  <div className={`text-xs sm:text-sm font-mono pt-2.5 border-t mt-3 font-bold ${
                    isSelected ? 'border-stone-700 text-[#E5391C]' : 'border-stone-200 text-stone-500'
                  }`}>
                    {isSelected ? '● INSPECTING' : 'VIEW CASE FILE'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Forensic Deep Dive Case File */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-stretch min-h-0">
            {/* Crime Dossier Box (7 cols) */}
            <div className="lg:col-span-7 bg-white border-2 border-stone-300 rounded-3xl p-6 lg:p-8 flex flex-col justify-between shadow-xs space-y-4">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-stone-200">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs sm:text-sm font-mono font-bold uppercase text-red-700 bg-red-100 px-3.5 py-1.5 rounded-xl">
                      Severity: {currentCrime.severity}
                    </span>
                    <span className="text-xs sm:text-sm font-mono text-stone-800 font-bold bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-200">
                      Scientific Law: {currentCrime.scientificTerm}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm font-mono text-stone-500 font-bold">Case File #ACT4-0{currentCrime.id + 1}</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-serif-display font-bold text-[#2D2D2E]">
                  Crime 0{currentCrime.id + 1}: {currentCrime.name}
                </h3>

                <div className="p-4 sm:p-5 bg-stone-100 rounded-2xl border border-stone-300 space-y-1.5">
                  <span className="text-xs sm:text-sm font-mono font-bold text-stone-700 uppercase tracking-wide">
                    Observed Field Evidence:
                  </span>
                  <p className="text-base sm:text-lg text-stone-900 font-mono font-medium leading-relaxed">
                    &ldquo;{currentCrime.evidence}&rdquo;
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="p-5 bg-red-50/80 border border-red-200 rounded-2xl space-y-2">
                    <span className="text-xs sm:text-sm font-mono font-bold uppercase text-red-800 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                      <span>Cognitive Breach:</span>
                    </span>
                    <p className="text-base sm:text-lg text-red-950 font-medium leading-relaxed">
                      {currentCrime.cognitiveViolation}
                    </p>
                  </div>

                  <div className="p-5 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-2">
                    <span className="text-xs sm:text-sm font-mono font-bold uppercase text-emerald-800 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>HCI Remedy:</span>
                    </span>
                    <p className="text-base sm:text-lg text-emerald-950 font-medium leading-relaxed">
                      {currentCrime.remedy}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl text-sm sm:text-base font-mono text-stone-700 flex items-center justify-between">
                <span>Diagnostic Category: <strong>Cognitive Human-System Mismatch</strong></span>
                <span className="text-emerald-700 font-bold bg-emerald-100/70 px-3 py-1 rounded-xl">Preventable by HCI Rules: 100%</span>
              </div>
            </div>

            {/* Right Summary Card (5 cols) */}
            <div className="lg:col-span-5 bg-red-50/70 border-2 border-red-300 rounded-3xl p-6 lg:p-8 flex flex-col justify-between shadow-xs space-y-4">
              <div className="space-y-4">
                <span className="text-xs sm:text-sm font-mono uppercase text-red-700 font-bold tracking-wider px-3.5 py-1.5 bg-red-100 rounded-xl inline-block">
                  Forensic Synthesis
                </span>
                <h4 className="text-2xl sm:text-3xl lg:text-4xl font-serif-display font-bold text-red-950">
                  Interaction Bugs vs Software Bugs
                </h4>
                <p className="text-base sm:text-lg text-red-900 leading-relaxed">
                  A software bug throws an uncaught exception on your server.
                </p>
                <div className="text-xl sm:text-2xl font-serif-display font-bold leading-snug bg-white p-6 rounded-2xl border-2 border-red-200 shadow-sm text-red-950">
                  &ldquo;An interaction bug crashes the cognitive apparatus of a living human being.&rdquo;
                </div>
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                  Notice that every single trap in this challenge was technically &ldquo;functional&rdquo;: the database saved records, HTTP returned 200 OK, and CSS loaded. Yet the human system failed completely.
                </p>
              </div>

              <div className="p-4 bg-red-100 rounded-2xl text-sm sm:text-base font-mono text-red-900 font-bold text-center">
                Functionality = 100% · Usability = 0%
              </div>
            </div>
          </div>

          {/* Key Principle Footer Banner */}
          <div className="p-5 lg:p-6 bg-white border-2 border-[#E5391C] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs flex-shrink-0">
            <p className="text-base sm:text-lg lg:text-xl text-[#2D2D2E] leading-relaxed">
              <strong className="text-[#E5391C] font-serif-display text-lg sm:text-xl lg:text-2xl font-bold mr-2">
                Engineering Discipline:
              </strong>
              Never blame the user for falling into an interface trap. If an error is possible, the interface is guilty of inducing it.
            </p>
            <span className="text-xs sm:text-sm font-mono text-white bg-[#E5391C] font-bold px-4 py-2 rounded-xl whitespace-nowrap shadow-2xs">
              Forensic Ergonomics
            </span>
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
          Next: When Bad Interaction Kills — High-Stakes Disasters in Aviation, Medicine &amp; Nuclear Energy
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 30: HIGH STAKES DISASTERS
  // --------------------------------------------------------------------------
  if (slide.id === 30) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 bg-[#FAF9F6] overflow-y-auto select-text">
        <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-6 lg:h-7 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 4 · Safety-Critical HCI
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 30 / 45</span>
        </div>

        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-3 lg:py-4 gap-4 lg:gap-5 min-h-0">
          <div className="text-center space-y-2 flex-shrink-0">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif-display font-medium text-[#2D2D2E]">
              When Bad Interaction Kills: High-Stakes Disasters
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-[#6E6D70] max-w-4xl mx-auto font-light">
              In consumer web apps, bad design costs revenue. In aviation, medicine, and nuclear energy, it costs lives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 flex-1 items-stretch min-h-0">
            <div className="bg-white border-2 border-[#E8E2D9] p-6 lg:p-8 rounded-3xl flex flex-col justify-between shadow-xs hover:border-red-300 transition-all">
              <div className="space-y-3">
                <span className="text-xs sm:text-sm font-mono text-red-600 font-bold uppercase tracking-wider bg-red-50 px-3.5 py-1.5 rounded-xl inline-block border border-red-200">
                  1979 · THREE MILE ISLAND
                </span>
                <h4 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#2D2D2E]">
                  Hidden Relief Valve
                </h4>
                <p className="text-base sm:text-lg lg:text-xl text-[#525254] leading-relaxed">
                  Light indicated valve switch was commanded shut, not that the valve was actually closed. The tag physically obscured the critical light.
                </p>
              </div>
              <div className="text-sm sm:text-base font-mono text-red-900 bg-red-50 p-4 rounded-2xl border border-red-200 mt-3 font-bold flex items-center gap-2.5 shadow-xs">
                <span className="w-3 h-3 rounded-full bg-red-600 shrink-0" />
                <span>Gulf of Evaluation: Sensor feedback contradicted reality.</span>
              </div>
            </div>

            <div className="bg-white border-2 border-[#E8E2D9] p-6 lg:p-8 rounded-3xl flex flex-col justify-between shadow-xs hover:border-red-300 transition-all">
              <div className="space-y-3">
                <span className="text-xs sm:text-sm font-mono text-red-600 font-bold uppercase tracking-wider bg-red-50 px-3.5 py-1.5 rounded-xl inline-block border border-red-200">
                  2018 · HAWAII MISSILE ALERT
                </span>
                <h4 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#2D2D2E]">
                  The Fatal Dropdown
                </h4>
                <p className="text-base sm:text-lg lg:text-xl text-[#525254] leading-relaxed">
                  "TEST_DRILL" was placed directly adjacent to "BALLISTIC_MISSILE_WARNING" in a plain text dropdown without confirmation guards.
                </p>
              </div>
              <div className="text-sm sm:text-base font-mono text-red-900 bg-red-50 p-4 rounded-2xl border border-red-200 mt-3 font-bold flex items-center gap-2.5 shadow-xs">
                <span className="w-3 h-3 rounded-full bg-red-600 shrink-0" />
                <span>Gulf of Execution: Critical action lacked cognitive friction.</span>
              </div>
            </div>

            <div className="bg-[#FDF5F2] border-2 border-red-300 p-6 lg:p-8 rounded-3xl flex flex-col justify-between shadow-sm">
              <div className="space-y-3">
                <span className="text-xs sm:text-sm font-mono text-red-700 font-bold uppercase tracking-wider bg-red-100 px-3.5 py-1.5 rounded-xl inline-block border border-red-300">
                  2019 · BOEING 737 MAX
                </span>
                <h4 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#2D2D2E]">
                  MCAS Sensor Discordance
                </h4>
                <p className="text-base sm:text-lg lg:text-xl text-[#525254] leading-relaxed">
                  Automated flight trim fought pilot commands based on a single faulty angle-of-attack vane without clear cockpit alert annunciators.
                </p>
              </div>
              <div className="text-sm sm:text-base font-mono text-red-900 bg-white p-4 rounded-2xl border-2 border-red-200 mt-3 font-bold flex items-center gap-2.5 shadow-xs">
                <span className="w-3 h-3 rounded-full bg-red-600 shrink-0" />
                <span>Automation Irony: System hid override behavior from pilots.</span>
              </div>
            </div>
          </div>

          <div className="p-4 lg:p-5 bg-white border-2 border-[#E8E2D9] rounded-2xl text-center text-base sm:text-lg lg:text-xl text-[#2D2D2E] font-medium shadow-xs flex-shrink-0">
            None of these were "pilot negligence" or "operator stupidity"—they were predictable cognitive breakdowns induced by defective interaction design.
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
          Next: Act 5 — How we measure and evaluate usability scientifically
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 31: ACT 4 TAKEAWAY: BAD DESIGN INDUCES COGNITIVE FAILURE
  // --------------------------------------------------------------------------
  if (slide.id === 31) {
    const pillars = [
      {
        id: 0,
        title: 'Error Induction vs Error Prevention',
        badge: 'Principle 01',
        icon: ShieldAlert,
        summary: 'Interfaces are active cognitive prosthetics.',
        body: 'A system does not passively wait for input; it actively shapes perception and primes decisions. A confusing layout forces slips even from seasoned professionals.',
        telemetry: '82% of reported field errors are interface-induced.',
      },
      {
        id: 1,
        title: 'Cognitive Bandwidth Under Stress',
        badge: 'Principle 02',
        icon: Zap,
        summary: 'Urgency collapses working memory to ~2 items.',
        body: 'Under fatigue, fear, or rapid pacing, complex hierarchies fail completely. Fault tolerance, visual redundancy, and instant undo buffers are non-negotiable safety infrastructure.',
        telemetry: 'Reaction time degrades 400% under high stress.',
      },
      {
        id: 2,
        title: 'The Shift to Empirical Science',
        badge: 'Principle 03',
        icon: Activity,
        summary: 'Subjective taste cannot prevent human catastrophe.',
        body: 'You cannot debug an interface by saying "I think this looks sleek." You must quantify task completion, time-on-task, and error distribution under real-world human telemetry.',
        telemetry: 'Usability is 100% observable & measurable.',
      },
    ];

    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 bg-[#FAF9F6] overflow-y-auto select-text">
        <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-6 lg:h-7 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 4 Synthesis · The Core Ergonomic Law
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 31 / 45</span>
        </div>

        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-3 lg:py-4 gap-4 lg:gap-5 min-h-0">
          <div className="space-y-1.5 text-center flex-shrink-0">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-medium text-[#2D2D2E]">
              Bad Design Induces Cognitive Failure
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-[#6E6D70] font-light max-w-4xl mx-auto">
              Human performance is a direct mathematical function of interface design.
            </p>
          </div>

          {/* Contrast Strip: Traditional Mindset vs Ergonomic Reality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 flex-shrink-0">
            <div className="p-3.5 sm:p-4 bg-red-50/80 border-2 border-red-300 rounded-2xl flex items-center gap-3 shadow-xs">
              <span className="w-8 h-8 rounded-xl bg-red-200 text-red-900 flex items-center justify-center font-bold text-base shrink-0">
                ✕
              </span>
              <div>
                <span className="text-xs font-mono font-bold uppercase text-red-800 tracking-wider block">Flawed Traditional Mindset:</span>
                <p className="text-sm sm:text-base font-medium text-red-950 leading-snug">
                  &ldquo;The user didn&apos;t read the documentation, rushed, and clicked the wrong button.&rdquo;
                </p>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 bg-emerald-50/80 border-2 border-emerald-300 rounded-2xl flex items-center gap-3 shadow-xs">
              <span className="w-8 h-8 rounded-xl bg-emerald-200 text-emerald-900 flex items-center justify-center font-bold text-base shrink-0">
                ✓
              </span>
              <div>
                <span className="text-xs font-mono font-bold uppercase text-emerald-800 tracking-wider block">Ergonomic Scientific Reality:</span>
                <p className="text-sm sm:text-base font-medium text-emerald-950 leading-snug">
                  &ldquo;The interface violated mental models, concealed critical state, and set an active trap.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* 3 Synthesis Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 flex-1 items-stretch min-h-0">
            {pillars.map((p) => {
              const IconComp = p.icon;
              return (
                <div
                  key={p.id}
                  className="bg-white border-2 border-[#E8E2D9] p-5 lg:p-6 rounded-2xl flex flex-col justify-between shadow-xs hover:border-[#E5391C]/50 transition-all space-y-3"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 bg-[#FDF5F2] border border-[#FAD6CF] rounded-xl text-[#E5391C]">
                        {p.badge}
                      </span>
                      <IconComp className="w-5 h-5 text-[#E5391C]" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-[#2D2D2E]">
                      {p.title}
                    </h3>
                    <p className="text-sm sm:text-base font-bold text-[#E5391C] leading-snug">
                      {p.summary}
                    </p>
                    <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                      {p.body}
                    </p>
                  </div>

                  <div className="p-3 bg-stone-100 rounded-xl border border-stone-200 text-xs sm:text-sm font-mono font-bold text-stone-800 flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E5391C] shrink-0" />
                    <span>{p.telemetry}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Key Principle Footer Banner */}
          <div className="p-4 lg:p-5 bg-white border-2 border-[#E5391C] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs flex-shrink-0">
            <p className="text-base sm:text-lg text-[#2D2D2E] leading-relaxed">
              <strong className="text-[#E5391C] font-serif-display text-lg sm:text-xl font-bold mr-2">
                Transition to Act 5:
              </strong>
              If bad interaction is provably dangerous, how do we evaluate systems objectively? We measure usability as an empirical engineering science.
            </p>
            <span className="text-xs sm:text-sm font-mono text-white bg-[#E5391C] font-bold px-3.5 py-1.5 rounded-xl whitespace-nowrap shadow-2xs">
              Act 5 Ahead
            </span>
          </div>
        </div>

        <div className="text-center text-xs font-mono text-[#6E6D70] flex-shrink-0 pt-1">
          Next: Act 5 — Beyond Taste: Usability as Empirical Science
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 32: BEYOND TASTE: USABILITY AS EMPIRICAL SCIENCE
  // --------------------------------------------------------------------------
  if (slide.id === 32) {
    const coreMetrics = [
      {
        pillar: '01 · EFFICACY',
        name: 'Task Completion Rate & Error Recovery',
        formula: 'Completed Tasks / Total Attempts (%)',
        unit: 'Percentage (%)',
        target: '≥ 95% in Primary Workflows',
        description: 'Measures binary efficacy: did the human successfully reach their intended goal without external intervention? Also measures restorative recovery time from cognitive slips.',
      },
      {
        pillar: '02 · EFFICIENCY',
        name: 'Time-on-Task & Interaction Latency',
        formula: 'Total Seconds to Goal State',
        unit: 'Seconds / Milliseconds',
        target: 'Optimal Fitts & Hick Benchmark',
        description: 'Quantifies human interaction latency. Every extraneous click, deep submenu, visual ambiguity, or mental pause compounds duration and elevates user fatigue.',
      },
      {
        pillar: '03 · COGNITIVE LOAD',
        name: 'Workload & Standardized SUS Index',
        formula: 'NASA-TLX & SUS Instrument (0–100)',
        unit: 'Index Score (0–100)',
        target: 'SUS ≥ 80.3 · NASA-TLX < 30',
        description: 'Measures biological working memory load, subjective stress, and standardized psychometric satisfaction across diverse human populations.',
      },
    ];

    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-12 xl:p-14 bg-[#FAF9F6] select-text">
        <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-6 lg:h-7 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 5 · Empirical Foundations
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 32 / 45</span>
        </div>

        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-4 lg:py-6 gap-6 min-h-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-shrink-0">
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E]">
                Beyond Taste: Usability as Empirical Science
              </h2>
              <p className="text-xl sm:text-2xl text-[#6E6D70] font-light mt-1">
                Why &ldquo;I like it&rdquo; or &ldquo;It feels sleek&rdquo; is never an engineering argument.
              </p>
            </div>

            {/* Interactive Paradigm Switcher */}
            <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border-2 border-[#E8E2D9] shadow-xs self-start sm:self-auto shrink-0">
              <button
                onClick={() => setSlide32ReviewMode('subjective')}
                className={`px-5 py-2.5 rounded-xl text-sm sm:text-base font-mono font-bold cursor-pointer transition-all ${
                  slide32ReviewMode === 'subjective'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                ✕ Subjective Taste Review
              </button>
              <button
                onClick={() => setSlide32ReviewMode('empirical')}
                className={`px-5 py-2.5 rounded-xl text-sm sm:text-base font-mono font-bold cursor-pointer transition-all ${
                  slide32ReviewMode === 'empirical'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                ✓ Empirical Usability Review
              </button>
            </div>
          </div>

          {/* Interactive Contrast Arena */}
          {slide32ReviewMode === 'subjective' ? (
            <div className="bg-red-50/80 border-2 border-red-300 rounded-3xl p-6 lg:p-10 flex flex-col justify-between shadow-xs space-y-6 flex-1">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-mono font-bold uppercase text-red-800 bg-red-100 px-4 py-1.5 rounded-xl border border-red-200">
                    Anti-Pattern: The HiPPO Effect (Highest Paid Person&apos;s Opinion)
                  </span>
                  <span className="text-sm font-mono text-red-800 font-bold">Unfalsifiable Bikeshedding</span>
                </div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-bold text-red-950">
                  What Happens When Interaction Design is Treated as &ldquo;Personal Opinion&rdquo;
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="p-6 bg-white rounded-3xl border-2 border-red-200 space-y-3 shadow-sm">
                    <span className="text-sm font-mono font-bold text-red-800 uppercase tracking-wide">1. Endless Design Debates</span>
                    <h4 className="text-xl sm:text-2xl font-serif-display font-bold text-stone-900">Bikeshedding &amp; Delays</h4>
                    <p className="text-base sm:text-lg text-stone-700 leading-relaxed">
                      Engineering teams spend weeks arguing whether buttons should be rounded or square based on executive mood swings.
                    </p>
                  </div>
                  <div className="p-6 bg-white rounded-3xl border-2 border-red-200 space-y-3 shadow-sm">
                    <span className="text-sm font-mono font-bold text-red-800 uppercase tracking-wide">2. Zero Accountability</span>
                    <h4 className="text-xl sm:text-2xl font-serif-display font-bold text-stone-900">No Measurable Baselines</h4>
                    <p className="text-base sm:text-lg text-stone-700 leading-relaxed">
                      If an app fails, nobody knows why. There are no baseline metrics, no error classification, and no regression tracking.
                    </p>
                  </div>
                  <div className="p-6 bg-white rounded-3xl border-2 border-red-200 space-y-3 shadow-sm">
                    <span className="text-sm font-mono font-bold text-red-800 uppercase tracking-wide">3. Feature Bloat &amp; Churn</span>
                    <h4 className="text-xl sm:text-2xl font-serif-display font-bold text-stone-900">Compounding Friction</h4>
                    <p className="text-base sm:text-lg text-stone-700 leading-relaxed">
                      More features get bolted onto confusing screens, compounding user cognitive friction until catastrophic churn occurs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-red-100/90 rounded-2xl text-base sm:text-lg font-mono text-red-950 font-bold text-center border border-red-300">
                Engineering Parallel: Imagine a backend engineer saying &ldquo;I feel like my database query runs fast&rdquo; instead of measuring p99 latency in milliseconds.
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 flex-1 items-stretch min-h-0">
              {coreMetrics.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-white border-2 border-[#E8E2D9] p-6 lg:p-8 xl:p-10 rounded-3xl flex flex-col justify-between shadow-xs hover:border-emerald-500 transition-all space-y-4"
                >
                  <div className="space-y-3.5">
                    <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 bg-emerald-100 text-emerald-900 rounded-xl inline-block">
                      {m.pillar}
                    </span>
                    <h4 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#2D2D2E] leading-snug">
                      {m.name}
                    </h4>
                    <div className="p-3.5 bg-stone-100 rounded-2xl font-mono text-xs sm:text-sm text-stone-800 space-y-1">
                      <div>Formula: <strong>{m.formula}</strong></div>
                      <div>Unit: <span className="text-stone-900 font-bold">{m.unit}</span></div>
                    </div>
                    <p className="text-base sm:text-lg text-[#525254] leading-relaxed">
                      {m.description}
                    </p>
                  </div>

                  <div className="p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-200 text-sm sm:text-base font-mono font-bold text-emerald-950 shadow-xs">
                    Target: {m.target}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Key Principle Footer Banner */}
          <div className="p-5 lg:p-6 bg-white border-2 border-[#E5391C] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs flex-shrink-0">
            <p className="text-base sm:text-lg lg:text-xl text-[#2D2D2E] leading-relaxed">
              <strong className="text-[#E5391C] font-serif-display text-lg sm:text-xl lg:text-2xl font-bold mr-2">
                The Engineering Parallel:
              </strong>
              When building back-end systems, you benchmark p99 latency in milliseconds. When engineering human interaction, you benchmark human task latency and error frequency.
            </p>
            <span className="text-xs sm:text-sm font-mono text-white bg-[#E5391C] font-bold px-4 py-2 rounded-xl whitespace-nowrap shadow-2xs">
              Observable Science
            </span>
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
          Next: The International Usability Standard (ISO 9241-11)
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 33: THE ISO 9241-11 FRAMEWORK
  // --------------------------------------------------------------------------
  if (slide.id === 33) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-12 xl:p-14 bg-[#FAF9F6]">
        <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-6 lg:h-7 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 5 · International Standard
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 33 / 45</span>
        </div>

        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-4 lg:py-6 gap-6">
          <div className="text-center space-y-3 flex-shrink-0">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E]">
              The ISO 9241-11 Usability Framework
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl text-[#6E6D70] max-w-4xl mx-auto">
              Usability is not an opinion. It is defined internationally by three measurable pillars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-stretch">
            <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 xl:p-10 rounded-2xl flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <span className="text-xs sm:text-sm font-mono text-[#E5391C] font-bold uppercase tracking-wider">
                  PILLAR 1
                </span>
                <h3 className="text-3xl sm:text-4xl font-serif-display text-[#2D2D2E]">Effectiveness</h3>
                <p className="text-lg sm:text-xl lg:text-2xl text-[#525254] leading-relaxed">
                  Can the user achieve their goal with accuracy and completeness?
                </p>
              </div>
              <div className="text-base sm:text-lg font-mono text-[#2D2D2E] pt-3.5 border-t border-[#F0EBE3] mt-4 font-bold flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5391C] shrink-0" />
                <span>Metrics: Task completion rate (%), error count, fail rate.</span>
              </div>
            </div>

            <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 xl:p-10 rounded-2xl flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <span className="text-xs sm:text-sm font-mono text-[#E5391C] font-bold uppercase tracking-wider">
                  PILLAR 2
                </span>
                <h3 className="text-3xl sm:text-4xl font-serif-display text-[#2D2D2E]">Efficiency</h3>
                <p className="text-lg sm:text-xl lg:text-2xl text-[#525254] leading-relaxed">
                  What resources (time, clicks, mental effort) were expended to achieve accuracy?
                </p>
              </div>
              <div className="text-base sm:text-lg font-mono text-[#2D2D2E] pt-3.5 border-t border-[#F0EBE3] mt-4 font-bold flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5391C] shrink-0" />
                <span>Metrics: Time-on-task (sec), clicks, glance duration.</span>
              </div>
            </div>

            <div className="bg-[#FDF5F2] border-2 border-[#E5391C] p-6 lg:p-8 xl:p-10 rounded-2xl flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <span className="text-xs sm:text-sm font-mono text-[#E5391C] font-bold uppercase tracking-wider">
                  PILLAR 3
                </span>
                <h3 className="text-3xl sm:text-4xl font-serif-display text-[#2D2D2E]">Satisfaction</h3>
                <p className="text-lg sm:text-xl lg:text-2xl text-[#525254] leading-relaxed">
                  Is the user comfortable, confident, and free from anxiety and frustration?
                </p>
              </div>
              <div className="text-base sm:text-lg font-mono text-[#E5391C] font-bold pt-3.5 border-t border-[#FAD6CF] mt-4 flex items-center gap-2 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5391C] shrink-0" />
                <span>Metrics: SUS score (0-100), Net Promoter, Single Ease Question.</span>
              </div>
            </div>
          </div>

          <div className="p-4 lg:p-5 bg-white border border-[#E8E2D9] rounded-2xl text-center text-base sm:text-lg lg:text-xl text-[#2D2D2E] font-medium shadow-xs flex-shrink-0">
            A system can be 100% effective (you succeeded) while having 0% efficiency (it took 45 minutes of suffering).
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
          Next: Live test bench measuring these three pillars in real time
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 35: QUANTITATIVE DATA VS QUALITATIVE INSIGHT
  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------
  // SLIDE 35: QUANTITATIVE DATA VS QUALITATIVE INSIGHT
  // --------------------------------------------------------------------------
  if (slide.id === 35) {
    const funnelSteps = [
      { id: 1, name: '1. Catalog Browse', users: 12450, drop: '0%', time: '18s', status: 'normal' },
      { id: 2, name: '2. Course Selection', users: 10820, drop: '13.1%', time: '34s', status: 'normal' },
      { id: 3, name: '3. Fast-Track Verify', users: 3895, drop: '64.0%', time: '184s', status: 'critical' },
      { id: 4, name: '4. Confirmed Seat', users: 3505, drop: '10.0%', time: '8s', status: 'success' },
    ];

    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 bg-[#FAF9F6] overflow-y-auto select-text">
        {/* Header Bar */}
        <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-6 lg:h-7 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 5 · Empirical Usability Science
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 35 / 45</span>
        </div>

        {/* Main Body */}
        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-3 lg:py-4 gap-4 lg:gap-5 min-h-0">
          {/* Title Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-shrink-0">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-medium text-[#2D2D2E]">
                Quantitative Data vs. Qualitative Insight
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-[#6E6D70] font-light mt-0.5">
                Telemetry tells you <strong>WHAT</strong> is happening. Contextual inquiry tells you <strong>WHY</strong> it happens.
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border-2 border-[#E8E2D9] shadow-xs shrink-0">
              <button
                onClick={() => setSlide35Tab('triangulation')}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer ${
                  slide35Tab === 'triangulation'
                    ? 'bg-[#E5391C] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                🔺 Triangulation Matrix
              </button>
              <button
                onClick={() => setSlide35Tab('quant')}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer ${
                  slide35Tab === 'quant'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                📊 Telemetry (The "What")
              </button>
              <button
                onClick={() => setSlide35Tab('qual')}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer ${
                  slide35Tab === 'qual'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                🎙️ Think-Aloud (The "Why")
              </button>
            </div>
          </div>

          {/* Interactive Case Study Stage */}
          {slide35Tab === 'triangulation' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 flex-1 items-stretch min-h-0">
              {/* Left Column: Quantitative Telemetry */}
              <div className="bg-white border-2 border-blue-200 rounded-2xl p-5 lg:p-6 flex flex-col justify-between shadow-xs space-y-3">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-blue-700 font-bold px-3 py-1 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-1.5">
                      <BarChart3 className="w-4 h-4" />
                      <span>Quantitative Telemetry (The "What")</span>
                    </span>
                    <span className="text-xs font-mono font-bold text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded-md">Sample N = 10,000+</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-stone-900">
                    Big Data &amp; Telemetry Analytics
                  </h3>
                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                    Automated event logs, conversion funnels, and latency timers. Essential for proving statistical significance ($p &lt; 0.05$) and identifying precisely <em>where</em> users drop off.
                  </p>
                  <div className="space-y-2 pt-1">
                    <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 flex items-center justify-between text-xs sm:text-sm font-mono">
                      <span className="text-stone-700">Metric 1: Task Completion Rate</span>
                      <strong className="text-blue-950 font-bold">35.8% (Target &ge; 90%)</strong>
                    </div>
                    <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 flex items-center justify-between text-xs sm:text-sm font-mono">
                      <span className="text-stone-700">Metric 2: Funnel Drop-off Spike</span>
                      <strong className="text-red-700 font-bold">64.0% Loss at Step 3</strong>
                    </div>
                    <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 flex items-center justify-between text-xs sm:text-sm font-mono">
                      <span className="text-stone-700">Metric 3: Time on Step 3</span>
                      <strong className="text-amber-900 font-bold">184s (15x baseline)</strong>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-red-50 border-2 border-red-200 rounded-xl text-xs sm:text-sm font-mono text-red-950 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>The Fatal Blindspot of Pure Analytics:</strong> Telemetry proves 64% abandoned at Step 3, but CANNOT tell you if they hated the price, hit a crash, or got confused by wording.
                  </div>
                </div>
              </div>

              {/* Right Column: Qualitative Think-Aloud */}
              <div className="bg-white border-2 border-emerald-200 rounded-2xl p-5 lg:p-6 flex flex-col justify-between shadow-xs space-y-3">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-emerald-800 font-bold px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-1.5">
                      <Eye className="w-4 h-4" />
                      <span>Qualitative Inquiry (The "Why")</span>
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md">Sample N = 5 Users</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-stone-900">
                    Think-Aloud Testing &amp; Protocols
                  </h3>
                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                    Direct human observation, verbalized mental models, and video debriefs. Essential for discovering the <em>root psychological cause</em> of cognitive friction.
                  </p>
                  <div className="space-y-2 pt-1">
                    <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200 text-stone-900 space-y-1.5">
                      <div className="font-mono text-xs font-bold text-emerald-900 uppercase">Participant 02 (2nd-Year Engineering):</div>
                      <p className="italic font-serif-display text-base sm:text-lg leading-relaxed text-stone-900">
                        &ldquo;Wait... why is there a flashing green button that says &apos;Fast-Track Verify&apos;? It looks like a spam pop-up ad from an untrusted site. I&apos;m afraid it will charge my card, so I&apos;m closing the tab.&rdquo;
                      </p>
                    </div>
                    <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 flex items-center justify-between text-xs sm:text-sm font-mono">
                      <span className="text-stone-700 font-bold">Root Cause Diagnosis:</span>
                      <strong className="text-emerald-950 font-bold">Affordance &amp; Mental Model Collision</strong>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-emerald-50 border-2 border-emerald-200 rounded-xl text-xs sm:text-sm font-mono text-emerald-950 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong>The Breakthrough Power of Qualitative:</strong> Watching just 3 students for 90 seconds discovered the exact root cause that 10,000 server logs could never reveal.
                  </div>
                </div>
              </div>
            </div>
          )}

          {slide35Tab === 'quant' && (
            <div className="bg-white border-2 border-[#E8E2D9] rounded-2xl p-5 lg:p-6 flex-1 flex flex-col justify-between shadow-xs space-y-4 min-h-0">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-mono uppercase text-blue-700 font-bold px-3 py-1 bg-blue-50 border border-blue-200 rounded-lg">
                    Real-Time Telemetry Dashboard · UM6P Student Portal
                  </span>
                  <span className="text-xs sm:text-sm font-mono text-stone-700 font-bold">12,450 Total Inbound Sessions</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-stone-900">
                  Interactive Conversion Funnel: The 64% Abandonment Cliff
                </h3>
              </div>

              {/* Funnel Visualizer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {funnelSteps.map((step) => (
                  <div
                    key={step.id}
                    onClick={() => setSlide35ActiveStep(step.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                      slide35ActiveStep === step.id
                        ? 'border-[#E5391C] bg-[#FDF5F2] ring-3 ring-[#E5391C]/20 shadow-md scale-[1.01]'
                        : 'border-[#E8E2D9] bg-[#FAF9F6] hover:border-stone-400'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs sm:text-sm font-mono">
                      <span className="font-bold text-stone-900">{step.name}</span>
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        step.status === 'critical' ? 'bg-red-200 text-red-950' : 'bg-stone-200 text-stone-800'
                      }`}>
                        {step.drop} Drop
                      </span>
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-mono font-bold text-stone-900">
                        {step.users.toLocaleString()}
                      </div>
                      <div className="text-xs sm:text-sm font-mono text-stone-600 mt-0.5 font-semibold">Users Reached</div>
                    </div>
                    <div className="text-xs sm:text-sm font-mono pt-2 border-t border-stone-200 flex items-center justify-between">
                      <span className="text-stone-700 font-medium">Avg Time on Step:</span>
                      <strong className={step.status === 'critical' ? 'text-red-700 font-bold' : 'text-stone-900 font-bold'}>
                        {step.time}
                      </strong>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-stone-900 text-stone-100 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm font-mono">
                <div>
                  <strong>ENGINEERING SUMMARY:</strong> Friction located at Step 3 (Fast-Track Verify). 8,555 students lost before checkout.
                </div>
                <button
                  onClick={() => setSlide35Tab('qual')}
                  className="px-4 py-2 bg-[#E5391C] hover:bg-[#C92B10] text-white rounded-xl font-bold cursor-pointer transition-colors shadow-xs shrink-0"
                >
                  Inspect Think-Aloud User Quotes ➔
                </button>
              </div>
            </div>
          )}

          {slide35Tab === 'qual' && (
            <div className="bg-white border-2 border-[#E8E2D9] rounded-2xl p-5 lg:p-6 flex-1 flex flex-col justify-between shadow-xs space-y-4 min-h-0">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-mono uppercase text-emerald-800 font-bold px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-lg">
                    Lab Observation Session Transcript · 5 User Sample
                  </span>
                  <span className="text-xs sm:text-sm font-mono text-stone-700 font-bold">Protocol: Concurrent Think-Aloud</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-stone-900">
                  Qualitative Video Capture: Uncovering Mental Model Collisions
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="p-4 bg-stone-50 border-2 border-stone-200 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-mono">
                    <span className="font-bold text-stone-900">Student 1 (AI Master)</span>
                    <span className="text-red-700 font-bold bg-red-100 px-2 py-0.5 rounded-md">ABANDONED</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-800 italic font-serif-display leading-relaxed">
                    &ldquo;I was looking for &apos;Enroll in Course&apos;. The button says &apos;Fast-Track Verify&apos;. In my mental model, verify means identity check, not enrollment.&rdquo;
                  </p>
                  <div className="text-xs font-mono text-stone-700 font-semibold pt-1.5 border-t">
                    Root Cause: Terminology Mismatch (Gulf of Execution)
                  </div>
                </div>

                <div className="p-4 bg-stone-50 border-2 border-stone-200 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-mono">
                    <span className="font-bold text-stone-900">Student 2 (BioTech BSc)</span>
                    <span className="text-red-700 font-bold bg-red-100 px-2 py-0.5 rounded-md">ABANDONED</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-800 italic font-serif-display leading-relaxed">
                    &ldquo;The flashing green outline made it look like a deceptive banner ad. At UM6P we take cyber-safety seriously, so I logged out.&rdquo;
                  </p>
                  <div className="text-xs font-mono text-stone-700 font-semibold pt-1.5 border-t">
                    Root Cause: Styling Affordance (Deceptive Lookalike)
                  </div>
                </div>

                <div className="p-4 bg-stone-50 border-2 border-stone-200 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-mono">
                    <span className="font-bold text-stone-900">Student 3 (Industrial PhD)</span>
                    <span className="text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded-md">DELAYED (240s)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-800 italic font-serif-display leading-relaxed">
                    &ldquo;I had to call my lab colleague and ask &apos;Is this real or phishing?&apos; Only after she confirmed did I click it.&rdquo;
                  </p>
                  <div className="text-xs font-mono text-stone-700 font-semibold pt-1.5 border-t">
                    Root Cause: Lack of Institutional Trust Signifiers
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-emerald-50 border-2 border-emerald-300 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs sm:text-sm font-mono text-emerald-950">
                <span>
                  ✓ <strong>Design Solution:</strong> Replace flashing button with plain &ldquo;Confirm Course Enrollment&rdquo; with UM6P seal. 64% drop-off vanished to 4.2%!
                </span>
                <button
                  onClick={() => setSlide35Tab('triangulation')}
                  className="underline font-bold ml-1 cursor-pointer shrink-0"
                >
                  Back to Matrix
                </button>
              </div>
            </div>
          )}

          {/* Key Principle Footer Banner */}
          <div className="p-4 lg:p-5 bg-white border-2 border-[#E5391C] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs flex-shrink-0">
            <p className="text-base sm:text-lg text-[#2D2D2E] leading-relaxed">
              <strong className="text-[#E5391C] font-serif-display text-lg sm:text-xl font-bold mr-2">
                The Empirical Triangulation Law:
              </strong>
              Quantitative telemetry provides the macro-map of where users stumble; qualitative inquiry provides the diagnostic microscope to discover why and how to redesign.
            </p>
            <span className="text-xs sm:text-sm font-mono text-white bg-[#E5391C] font-bold px-3.5 py-1.5 rounded-xl whitespace-nowrap shadow-2xs">
              Quant + Qual
            </span>
          </div>
        </div>

        <div className="text-center text-xs font-mono text-[#6E6D70] flex-shrink-0 pt-1">
          Next: Formative vs. Summative Evaluation (Tasting the Soup vs. Serving the Guests)
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 36: FORMATIVE VS SUMMATIVE EVALUATION
  // --------------------------------------------------------------------------
  if (slide.id === 36) {
    const phases = [
      {
        id: 1,
        name: 'Phase 1: Conceptual Discovery',
        time: 'Weeks 1–3',
        method: '100% Formative',
        artifact: 'Paper sketches, whiteboard flows, cardboard mockups',
        cost: '$1x (10 minutes on paper)',
        questions: 'What are the user’s mental models? What are the biggest pain points?',
      },
      {
        id: 2,
        name: 'Phase 2: Wireframing & Prototyping',
        time: 'Weeks 4–7',
        method: 'Formative Usability Tests',
        artifact: 'Figma interactive prototypes, wireframes',
        cost: '$5x (2 hours in Figma)',
        questions: 'Can users complete the primary workflow without guidance?',
      },
      {
        id: 3,
        name: 'Phase 3: Alpha / Beta Software',
        time: 'Weeks 8–10',
        method: 'Mixed Evaluation (Formative + Early Telemetry)',
        artifact: 'Functional frontend code mounted with mock data',
        cost: '$20x (1 day refactoring code)',
        questions: 'Where are the runtime validation errors and UI edge cases?',
      },
      {
        id: 4,
        name: 'Phase 4: Release & Handover',
        time: 'Weeks 11–12',
        method: '100% Summative Benchmarking',
        artifact: 'Full production release with real backend & database',
        cost: '$100x+ (Re-architecting database, retraining users)',
        questions: 'Does the system achieve the required ISO 9241-11 benchmark thresholds (SUS ≥ 80)?',
      },
    ];

    const currentPhase = phases[slide36TimelinePhase - 1];

    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 bg-[#FAF9F6] select-text">
        {/* Header Bar */}
        <div className="pb-3 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-7 lg:h-8 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 5 · Empirical Usability Science
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 36 / 45</span>
        </div>

        {/* Main Body */}
        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-2 gap-3.5 min-h-0">
          {/* Title Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-shrink-0">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif-display font-medium text-[#2D2D2E]">
                Formative vs. Summative Evaluation
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#6E6D70] font-light">
                "When the cook tastes the soup, that’s <strong>formative</strong>. When the guests taste the soup, that’s <strong>summative</strong>." — Prof. Robert Stake
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border-2 border-[#E8E2D9] shadow-2xs shrink-0">
              <button
                onClick={() => setSlide36Mode('formative')}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer ${
                  slide36Mode === 'formative'
                    ? 'bg-[#E5391C] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                🥣 Formative Evaluation
              </button>
              <button
                onClick={() => setSlide36Mode('summative')}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer ${
                  slide36Mode === 'summative'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                🍽️ Summative Evaluation
              </button>
            </div>
          </div>

          {/* Side-by-Side Dual Engine Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 flex-1 items-stretch min-h-0">
            {/* Left Card: Formative Evaluation */}
            <div className={`rounded-3xl p-5 lg:p-6 flex flex-col justify-between shadow-xs transition-all border-2 space-y-3 ${
              slide36Mode === 'formative'
                ? 'bg-amber-50/70 border-amber-400 ring-2 ring-amber-300/40 shadow-sm'
                : 'bg-white border-[#E8E2D9]'
            }`}>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-amber-800 font-bold px-2.5 py-1 bg-amber-100 rounded-lg flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>Formative: Diagnostic &amp; Iterative</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-900">During Development</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif-display font-medium text-stone-900">
                  Tasting the Soup While Cooking
                </h3>
                <p className="text-xs sm:text-sm text-stone-600">
                  Executed while the design is fluid and cheap to modify. The goal is to discover usability traps and inform immediate redesign.
                </p>

                <div className="space-y-2 pt-1 font-mono text-xs">
                  <div className="p-2.5 bg-white/80 rounded-xl border border-stone-200 flex items-center justify-between">
                    <span className="text-stone-600">Artifact Tested:</span>
                    <strong className="text-stone-900">Sketches, Wireframes, Figma Prototypes</strong>
                  </div>
                  <div className="p-2.5 bg-white/80 rounded-xl border border-stone-200 flex items-center justify-between">
                    <span className="text-stone-600">Sample Size:</span>
                    <strong className="text-amber-800">3–5 Users per cycle (Nielsen Curve)</strong>
                  </div>
                  <div className="p-2.5 bg-white/80 rounded-xl border border-stone-200 flex items-center justify-between">
                    <span className="text-stone-600">Methodology:</span>
                    <strong className="text-stone-900">Think-Aloud, Cognitive Walkthrough</strong>
                  </div>
                  <div className="p-2.5 bg-white/80 rounded-xl border border-stone-200 flex items-center justify-between">
                    <span className="text-stone-600">Cost to Fix Defect:</span>
                    <strong className="text-emerald-700 font-bold">$1x (Whiteboard eraser)</strong>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-100/70 border border-amber-300 rounded-xl text-xs font-mono text-amber-950">
                <strong>Core Philosophy:</strong> Find errors early when they cost pennies to fix. Never wait for code compilation to test user mental models.
              </div>
            </div>

            {/* Right Card: Summative Evaluation */}
            <div className={`rounded-3xl p-5 lg:p-6 flex flex-col justify-between shadow-xs transition-all border-2 space-y-3 ${
              slide36Mode === 'summative'
                ? 'bg-blue-50/70 border-blue-400 ring-2 ring-blue-300/40 shadow-sm'
                : 'bg-white border-[#E8E2D9]'
            }`}>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-blue-800 font-bold px-2.5 py-1 bg-blue-100 rounded-lg flex items-center gap-1.5">
                    <CheckCheck className="w-3.5 h-3.5 text-blue-700" />
                    <span>Summative: Benchmarking &amp; Validation</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-blue-900">Pre-Release / Post-Launch</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif-display font-medium text-stone-900">
                  Serving the Soup to the Guests
                </h3>
                <p className="text-xs sm:text-sm text-stone-600">
                  Executed on the finished, engineered software against contract benchmarks. The goal is to prove conformance to ISO 9241-11 and WCAG.
                </p>

                <div className="space-y-2 pt-1 font-mono text-xs">
                  <div className="p-2.5 bg-white/80 rounded-xl border border-stone-200 flex items-center justify-between">
                    <span className="text-stone-600">Artifact Tested:</span>
                    <strong className="text-stone-900">Fully Engineered Production Software</strong>
                  </div>
                  <div className="p-2.5 bg-white/80 rounded-xl border border-stone-200 flex items-center justify-between">
                    <span className="text-stone-600">Sample Size:</span>
                    <strong className="text-blue-900">30–100+ Users (Statistical Confidence)</strong>
                  </div>
                  <div className="p-2.5 bg-white/80 rounded-xl border border-stone-200 flex items-center justify-between">
                    <span className="text-stone-600">Methodology:</span>
                    <strong className="text-stone-900">SUS Score, Task Telemetry, A/B Testing</strong>
                  </div>
                  <div className="p-2.5 bg-white/80 rounded-xl border border-stone-200 flex items-center justify-between">
                    <span className="text-stone-600">Cost to Fix Defect:</span>
                    <strong className="text-red-700 font-bold">$100x+ (Database migration &amp; rewrite)</strong>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-blue-100/70 border border-blue-300 rounded-xl text-xs font-mono text-blue-950">
                <strong>Core Philosophy:</strong> Provide rigorous scientific proof to executives, clients, and regulatory bodies that usability standards were satisfied.
              </div>
            </div>
          </div>

          {/* Interactive 4-Phase Lifecycle Stepper */}
          <div className="p-3.5 bg-white border-2 border-[#E8E2D9] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#E5391C] font-bold uppercase">
                Lifecycle Stepper:
              </span>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4].map((step) => (
                  <button
                    key={step}
                    onClick={() => setSlide36TimelinePhase(step)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      slide36TimelinePhase === step
                        ? 'bg-[#E5391C] text-white shadow-2xs'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    Phase {step}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs font-mono text-stone-700 text-right">
              <strong>{currentPhase.name}</strong> ({currentPhase.time}): Method: <span className="text-[#E5391C] font-bold">{currentPhase.method}</span> · Cost of Error: <span className="text-red-700 font-bold">{currentPhase.cost}</span>
            </div>
          </div>

          {/* Institutional Takeaway Banner */}
          <div className="p-3.5 bg-white border-2 border-[#E5391C] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs flex-shrink-0">
            <p className="text-sm sm:text-base lg:text-lg text-[#2D2D2E] leading-relaxed">
              <strong className="text-[#E5391C] font-serif-display text-base sm:text-lg font-bold mr-2">
                The Engineering Golden Rule:
              </strong>
              Formative evaluation saves millions by eliminating design flaws before code is written; summative evaluation verifies that the resulting system passes empirical benchmarks.
            </p>
            <span className="text-xs sm:text-sm font-mono text-white bg-[#E5391C] font-bold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-2xs">
              Formative vs Summative
            </span>
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
          Next: Act 5 Takeaway (Usability is Optimizable Engineering &amp; Nielsen’s Law)
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 37: ACT 5 TAKEAWAY: USABILITY IS OPTIMIZABLE ENGINEERING
  // --------------------------------------------------------------------------
  if (slide.id === 37) {
    // Nielsen Diminishing Returns calculation: U(n) = 100 * (1 - (1 - 0.31)^n)
    const n = slide37UsersCount;
    const usabilityFoundPct = Math.round((1 - Math.pow(1 - 0.31, n)) * 1000) / 10;

    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 bg-[#FAF9F6] select-text">
        {/* Header Bar */}
        <div className="pb-3 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-7 lg:h-8 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 5 · Empirical Usability Science
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 37 / 45</span>
        </div>

        {/* Main Body */}
        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-2 gap-3.5 min-h-0">
          {/* Title Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-shrink-0">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif-display font-medium text-[#2D2D2E]">
                Act 5 Takeaway: Usability is Optimizable Engineering
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#6E6D70] font-light">
                Usability is not personal taste or subjective styling. In engineering, you optimize what you can measure.
              </p>
            </div>
            <div className="px-3.5 py-1.5 bg-[#FDF5F2] border border-[#FAD6CF] rounded-xl text-xs sm:text-sm font-mono text-[#E5391C] font-bold self-start sm:self-auto shrink-0">
              Empirical Foundations
            </div>
          </div>

          {/* Three Scientific Pillars Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5 flex-1 items-stretch min-h-0">
            {/* Pillar 1: Optimization Discipline */}
            <div className="bg-white border-2 border-[#E8E2D9] hover:border-[#E5391C]/50 transition-all rounded-3xl p-5 lg:p-6 flex flex-col justify-between shadow-xs space-y-3">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-[#E5391C] font-bold tracking-wider px-2.5 py-1 bg-[#FDF5F2] border border-[#FAD6CF] rounded-xl">
                    PILLAR 01
                  </span>
                  <Target className="w-4 h-4 text-[#E5391C]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif-display font-medium text-[#2D2D2E]">
                  Usability is an Optimization Function
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Usability is not art. It is a mathematical trade-off between task completion latency, cognitive workload, error probabilities, and motor travel time (Fitts’ Law).
                </p>
                <div className="p-3 bg-[#FAF9F6] border border-[#E8E2D9] rounded-xl space-y-1.5 font-mono text-xs sm:text-sm">
                  <div className="text-stone-600 text-xs uppercase font-bold">The Engineering Objective:</div>
                  <div className="text-[#E5391C] font-bold text-sm sm:text-base">min {'{'} Error_Rate + &alpha;·Time + &beta;·Workload {'}'}</div>
                  <div className="text-stone-700 text-xs font-medium">Subject to WCAG AAA accessibility &amp; zero catastrophic mode errors.</div>
                </div>
              </div>
              <div className="text-xs sm:text-sm font-mono text-stone-600 font-semibold pt-2 border-t border-stone-200">
                ✓ Usability can be calibrated, simulated, and stress-tested like any mechanical bridge.
              </div>
            </div>

            {/* Pillar 2: Nielsen’s Law Interactive Calculator */}
            <div className="bg-white border-2 border-[#E5391C] rounded-3xl p-5 lg:p-6 flex flex-col justify-between shadow-xs space-y-3 ring-2 ring-[#E5391C]/15">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-[#E5391C] font-bold tracking-wider px-2.5 py-1 bg-[#FDF5F2] border border-[#FAD6CF] rounded-xl">
                    PILLAR 02 · NIELSEN’S LAW
                  </span>
                  <Sliders className="w-4 h-4 text-[#E5391C]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif-display font-medium text-[#2D2D2E]">
                  Diminishing Returns: Why 5 Users is Enough
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Formula: <span className="font-mono font-bold text-stone-900">U(n) = N·(1 - (1 - L)<sup>n</sup>)</span> where <span className="font-mono font-bold">L = 0.31</span>. Test participants uncover overlapping flaws.
                </p>

                {/* Interactive Slider */}
                <div className="p-3 bg-[#FAF9F6] border border-[#E8E2D9] rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-mono">
                    <span className="text-stone-700 font-bold">Test Participants (n):</span>
                    <strong className="text-base sm:text-lg text-[#E5391C]">{n} Users</strong>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={slide37UsersCount}
                    onChange={(e) => setSlide37UsersCount(parseInt(e.target.value))}
                    className="w-full accent-[#E5391C] cursor-pointer"
                  />
                  <div className="flex items-center justify-between text-xs font-mono text-stone-600 font-semibold">
                    <span>1 user (31%)</span>
                    <span className="text-[#E5391C] font-bold">5 users (85%)</span>
                    <span>15 users (99%)</span>
                  </div>
                </div>

                {/* Result Display */}
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-emerald-800 uppercase font-bold">Defects Uncovered:</div>
                    <div className="text-2xl sm:text-3xl font-mono font-bold text-emerald-950">{usabilityFoundPct}%</div>
                  </div>
                  <span className="text-xs sm:text-sm font-mono font-bold text-emerald-900 bg-emerald-200/80 px-3 py-1 rounded-lg">
                    {n === 5 ? '★ THE GOLDEN SWEET SPOT' : n > 5 ? 'DIMINISHING RETURNS' : 'INSUFFICIENT SAMPLE'}
                  </span>
                </div>
              </div>
              <div className="text-xs sm:text-sm font-mono text-stone-600 font-semibold pt-2 border-t border-stone-200">
                Better to run 3 iterative tests of 5 users than 1 huge test of 15 users.
              </div>
            </div>

            {/* Pillar 3: Defense by Data */}
            <div className="bg-white border-2 border-[#E8E2D9] hover:border-[#E5391C]/50 transition-all rounded-3xl p-5 lg:p-6 flex flex-col justify-between shadow-xs space-y-3">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-[#E5391C] font-bold tracking-wider px-2.5 py-1 bg-[#FDF5F2] border border-[#FAD6CF] rounded-xl">
                    PILLAR 03
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif-display font-medium text-[#2D2D2E]">
                  Defense by Empirical Evidence
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  In engineering and stakeholder reviews, subjective opinions ("I think this looks slick") are replaced by empirical metrics: task completion, SUS, and error counts.
                </p>
                <div className="space-y-2 pt-1 font-mono text-xs sm:text-sm">
                  <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-red-950 font-medium">
                    <span className="font-bold block text-xs uppercase text-red-700">Subjective Defense (Amateur):</span>
                    "I think the students will prefer this modern card layout."
                  </div>
                  <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-950 font-medium">
                    <span className="block text-xs uppercase text-emerald-800 font-bold">Empirical Defense (HCI Engineer):</span>
                    "Tested with 15 students: task completion increased from 62% to 94% (p &lt; 0.01) with zero destructive errors."
                  </div>
                </div>
              </div>
              <div className="text-xs sm:text-sm font-mono text-stone-600 font-semibold pt-2 border-t border-stone-200">
                ✓ Empirical evidence silences executive opinions and builds bulletproof products.
              </div>
            </div>
          </div>

          {/* Key Principle Footer Banner */}
          <div className="p-3.5 bg-white border-2 border-[#E5391C] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs flex-shrink-0">
            <p className="text-sm sm:text-base lg:text-lg text-[#2D2D2E] leading-relaxed">
              <strong className="text-[#E5391C] font-serif-display text-base sm:text-lg font-bold mr-2">
                Session 1 Empirical Decree:
              </strong>
              When you present your UM6P semester projects, you will never argue aesthetic opinions. You will present task completion distributions, SUS scores, and verified error reductions.
            </p>
            <span className="text-xs sm:text-sm font-mono text-white bg-[#E5391C] font-bold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-2xs">
              Scientific HCI
            </span>
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
          Next: Act 6 · The Engineering Process &amp; Human-Centered Design Lifecycle
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 38: THE HCD LIFECYCLE (ISO 9241-210)
  // --------------------------------------------------------------------------
  if (slide.id === 38) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-12 xl:p-14 bg-[#FAF9F6]">
        <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-6 lg:h-7 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 6 · The Engineering Process
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 38 / 45</span>
        </div>

        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-4 lg:py-6 gap-6">
          <div className="text-center space-y-3 flex-shrink-0">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E]">
              Human-Centered Design (HCD)
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl text-[#6E6D70] max-w-4xl mx-auto">
              The ISO 9241-210 Iterative Lifecycle: Software that adapts to humans through continuous evaluation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 items-stretch">
            <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 rounded-2xl flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <span className="text-sm font-mono text-[#E5391C] font-bold">STEP 01</span>
                <h4 className="text-2xl font-serif-display font-bold text-[#2D2D2E]">Understand Context</h4>
                <p className="text-base sm:text-lg text-[#525254] leading-relaxed">
                  Observe users in real environments. Who are they? What are their mental models? What are their sensory constraints?
                </p>
              </div>
              <div className="text-sm sm:text-base font-mono font-bold text-[#2D2D2E] pt-3.5 border-t border-[#F0EBE3] mt-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E5391C] shrink-0" />
                <span>Tools: Ethnography, Field Observation</span>
              </div>
            </div>

            <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 rounded-2xl flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <span className="text-sm font-mono text-[#E5391C] font-bold">STEP 02</span>
                <h4 className="text-2xl font-serif-display font-bold text-[#2D2D2E]">Specify Requirements</h4>
                <p className="text-base sm:text-lg text-[#525254] leading-relaxed">
                  Translate human needs into measurable usability criteria (e.g. "Task must complete in &lt;15s by 95% of users").
                </p>
              </div>
              <div className="text-sm sm:text-base font-mono font-bold text-[#2D2D2E] pt-3.5 border-t border-[#F0EBE3] mt-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E5391C] shrink-0" />
                <span>Tools: Empirical Benchmarks, SLA</span>
              </div>
            </div>

            <div className="bg-white border border-[#E8E2D9] p-6 lg:p-8 rounded-2xl flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <span className="text-sm font-mono text-[#E5391C] font-bold">STEP 03</span>
                <h4 className="text-2xl font-serif-display font-bold text-[#2D2D2E]">Produce Solutions</h4>
                <p className="text-base sm:text-lg text-[#525254] leading-relaxed">
                  Build prototypes from low-fidelity wireframes to interactive code. Create multiple design alternatives.
                </p>
              </div>
              <div className="text-sm sm:text-base font-mono font-bold text-[#2D2D2E] pt-3.5 border-t border-[#F0EBE3] mt-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E5391C] shrink-0" />
                <span>Tools: Paper Prototypes, Design Systems</span>
              </div>
            </div>

            <div className="bg-[#FDF5F2] border-2 border-[#E5391C] p-6 lg:p-8 rounded-2xl flex flex-col justify-between shadow-sm">
              <div className="space-y-3">
                <span className="text-sm font-mono text-[#E5391C] font-bold">STEP 04</span>
                <h4 className="text-2xl font-serif-display font-bold text-[#2D2D2E]">Evaluate & Iterate</h4>
                <p className="text-base sm:text-lg text-[#525254] leading-relaxed">
                  Put prototypes in front of real users. Measure task completion and errors. Iterate until criteria are satisfied.
                </p>
              </div>
              <div className="text-sm sm:text-base font-mono font-bold text-[#E5391C] pt-3.5 border-t border-[#FAD6CF] mt-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E5391C] shrink-0" />
                <span>Tools: Think-Aloud, Lab Telemetry</span>
              </div>
            </div>
          </div>

          <div className="p-4 lg:p-5 bg-white border border-[#E8E2D9] rounded-2xl text-center text-base sm:text-lg lg:text-xl text-[#2D2D2E] font-medium shadow-xs flex-shrink-0">
            HCD is not a linear waterfall. You do not design once and ship. You fail fast in cheap prototypes.
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
          Next: Boehm’s law and the economic cost of fixing flaws early
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 39: BOEHM'S CURVE
  // --------------------------------------------------------------------------
  if (slide.id === 39) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-12 xl:p-14 bg-[#FAF9F6]">
        <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-6 lg:h-7 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 6 · The Business Case
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 39 / 45</span>
        </div>

        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-4 lg:py-6 gap-6">
          <div className="text-center space-y-3 flex-shrink-0">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E]">
              Boehm’s Law: The Exponential Cost of Flaws
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl text-[#6E6D70] max-w-4xl mx-auto">
              Fixing an interaction flaw: $1 on paper, $10 in code, $100 after deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-stretch">
            <div className="bg-emerald-50 border border-emerald-200 p-6 lg:p-8 xl:p-10 rounded-2xl text-center flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <span className="text-6xl sm:text-7xl lg:text-8xl font-mono font-bold text-emerald-700">1x ($1)</span>
                <div className="text-base sm:text-lg font-mono uppercase font-bold text-emerald-800">Discovery & Sketching</div>
                <p className="text-base sm:text-lg text-[#525254] leading-relaxed">
                  Erasing a whiteboard wireframe takes 5 seconds and costs nothing.
                </p>
              </div>
              <div className="text-base sm:text-lg font-mono font-bold text-emerald-800 bg-white p-3.5 rounded-xl border border-emerald-200 mt-4 shadow-xs">
                Zero codebase impact
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-6 lg:p-8 xl:p-10 rounded-2xl text-center flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <span className="text-6xl sm:text-7xl lg:text-8xl font-mono font-bold text-amber-700">10x ($10)</span>
                <div className="text-base sm:text-lg font-mono uppercase font-bold text-amber-800">During Code Implementation</div>
                <p className="text-base sm:text-lg text-[#525254] leading-relaxed">
                  Refactoring React components and state stores takes days of developer time.
                </p>
              </div>
              <div className="text-base sm:text-lg font-mono font-bold text-amber-800 bg-white p-3.5 rounded-xl border border-amber-200 mt-4 shadow-xs">
                Engineering sprint delay
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 p-6 lg:p-8 xl:p-10 rounded-2xl text-center flex flex-col justify-between shadow-sm">
              <div className="space-y-3">
                <span className="text-6xl sm:text-7xl lg:text-8xl font-mono font-bold text-red-600">100x+ ($100+)</span>
                <div className="text-base sm:text-lg font-mono uppercase font-bold text-red-800">After Production Release</div>
                <p className="text-base sm:text-lg text-[#525254] leading-relaxed">
                  Database migrations, customer support calls, user churn, and brand erosion.
                </p>
              </div>
              <div className="text-base sm:text-lg font-mono font-bold text-red-700 bg-white p-3.5 rounded-xl border border-red-200 mt-4 shadow-xs">
                Severe business & reputation risk
              </div>
            </div>
          </div>

          <div className="p-4 lg:p-5 bg-white border border-[#E8E2D9] rounded-2xl text-center text-base sm:text-lg lg:text-xl text-[#2D2D2E] font-medium shadow-xs flex-shrink-0">
            HCI is not an artistic indulgence. It is corporate risk management.
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
          Next: The full 12-session curriculum architecture
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 40: THE 12-SESSION ROADMAP (Interactive Session Inspector)
  // --------------------------------------------------------------------------
  if (slide.id === 40) {
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
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 bg-[#FAF9F6] overflow-y-auto select-text">
        <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-6 lg:h-7 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 6 · The Curriculum Architecture
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 40 / 45</span>
        </div>

        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-3 lg:py-4 gap-4 lg:gap-5 min-h-0">
          <div className="text-center space-y-2 flex-shrink-0">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif-display font-medium text-[#2D2D2E]">
              The 12-Session Curriculum Architecture
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-[#6E6D70] max-w-4xl mx-auto font-light">
              From cognitive biology to high-fidelity evaluated interactive systems.
            </p>
          </div>

          {/* Interactive 12-Session Grid with Large Prominent Text */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 flex-1 items-stretch min-h-0">
            {sessions.map((s) => {
              const isSelected = selectedRoadmapSession === s.num;
              const isCurrent = s.num === 1;

              return (
                <div
                  key={s.num}
                  onClick={() => setSelectedRoadmapSession(s.num)}
                  className={`p-4 sm:p-5 rounded-2xl border-2 text-left cursor-pointer transition-all flex flex-col justify-between ${
                    isCurrent
                      ? 'border-[#E5391C] bg-[#FDF5F2] shadow-sm ring-2 ring-[#E5391C]/20'
                      : isSelected
                      ? 'border-[#E5391C] bg-white shadow-md'
                      : 'border-[#E8E2D9] bg-white hover:border-stone-400'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between font-mono font-bold">
                      <span className={`text-xs sm:text-sm px-2.5 py-0.5 rounded-md ${
                        isCurrent
                          ? 'bg-[#E5391C] text-white'
                          : isSelected
                          ? 'bg-stone-900 text-white'
                          : 'bg-stone-100 text-stone-700'
                      }`}>
                        S{s.num.toString().padStart(2, '0')}
                      </span>
                      {isCurrent && (
                        <span className="text-[11px] font-mono text-[#E5391C] font-black uppercase tracking-wider">
                          NOW
                        </span>
                      )}
                    </div>
                    <div className="text-base sm:text-lg font-bold text-[#2D2D2E] font-serif-display leading-snug pt-1">
                      {s.name}
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-[#525254] font-medium mt-2 leading-relaxed">
                    {s.desc}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Session Detail Highlight Card */}
          <div className="p-5 lg:p-6 bg-white border-2 border-[#E8E2D9] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-shrink-0 shadow-xs">
            <div className="space-y-1">
              <span className="text-lg sm:text-xl lg:text-2xl font-serif-display font-bold text-[#E5391C]">
                Session {selectedRoadmapSession}: {sessions.find((s) => s.num === selectedRoadmapSession)?.name}
              </span>
              <p className="text-base sm:text-lg text-[#2D2D2E] font-medium leading-relaxed">
                {sessions.find((s) => s.num === selectedRoadmapSession)?.desc} · Comprehensive Interactive Lecture, Design Studio &amp; Telemetry Lab.
              </p>
            </div>
            <span className="text-xs sm:text-sm font-mono text-stone-500 font-bold bg-stone-100 px-3.5 py-2 rounded-xl whitespace-nowrap self-start sm:self-auto">
              Click any session node to inspect
            </span>
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
          Next: The Semester Capstone Project Brief
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 41: THE SEMESTER CAPSTONE PROJECT
  // --------------------------------------------------------------------------
  if (slide.id === 41) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 bg-[#FAF9F6] overflow-y-auto select-text">
        <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-6 lg:h-7 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Act 6 · Project Brief
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 41 / 45</span>
        </div>

        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-3 lg:py-4 gap-4 lg:gap-5 min-h-0">
          <div className="text-center space-y-2 flex-shrink-0">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif-display font-medium text-[#2D2D2E]">
              The Semester Capstone Project
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-[#6E6D70] max-w-4xl mx-auto font-light">
              You will not just study HCI theory; you will engineer and evaluate a real interactive system.
            </p>
          </div>

          {/* 4 Pillars of the Semester Project */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 flex-1 items-stretch min-h-0">
            <div className="bg-white border-2 border-[#E8E2D9] p-5 lg:p-6 rounded-3xl flex flex-col justify-between shadow-xs hover:border-stone-400 transition-all">
              <div className="space-y-2.5">
                <span className="text-xs font-mono text-[#E5391C] font-bold tracking-wider bg-red-50 px-3 py-1 rounded-xl inline-block">
                  PHASE 1
                </span>
                <h4 className="text-xl sm:text-2xl font-serif-display font-bold text-[#2D2D2E]">Discovery & Needs</h4>
                <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                  Conduct ethnographic user interviews, observe field contexts, synthesize personas and user journey maps.
                </p>
              </div>
              <div className="text-xs sm:text-sm font-mono font-bold text-[#2D2D2E] bg-[#FAF9F6] p-3 rounded-2xl border border-[#E8E2D9] mt-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E5391C] shrink-0" />
                <span>Output: Empathy Maps & Needs Spec</span>
              </div>
            </div>

            <div className="bg-white border-2 border-[#E8E2D9] p-5 lg:p-6 rounded-3xl flex flex-col justify-between shadow-xs hover:border-stone-400 transition-all">
              <div className="space-y-2.5">
                <span className="text-xs font-mono text-stone-700 font-bold tracking-wider bg-stone-100 px-3 py-1 rounded-xl inline-block">
                  PHASE 2
                </span>
                <h4 className="text-xl sm:text-2xl font-serif-display font-bold text-[#2D2D2E]">Architecture</h4>
                <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                  Information architecture, mental model alignment, paper prototyping, low-fidelity wireframing.
                </p>
              </div>
              <div className="text-xs sm:text-sm font-mono font-bold text-[#2D2D2E] bg-[#FAF9F6] p-3 rounded-2xl border border-[#E8E2D9] mt-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#6E6D70] shrink-0" />
                <span>Output: Low-Fi Validated Prototype</span>
              </div>
            </div>

            <div className="bg-white border-2 border-[#E8E2D9] p-5 lg:p-6 rounded-3xl flex flex-col justify-between shadow-xs hover:border-stone-400 transition-all">
              <div className="space-y-2.5">
                <span className="text-xs font-mono text-stone-700 font-bold tracking-wider bg-stone-100 px-3 py-1 rounded-xl inline-block">
                  PHASE 3
                </span>
                <h4 className="text-xl sm:text-2xl font-serif-display font-bold text-[#2D2D2E]">Interactive Build</h4>
                <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                  High-fidelity responsive interface, component design system, rich feedback loops, micro-interactions.
                </p>
              </div>
              <div className="text-xs sm:text-sm font-mono font-bold text-[#2D2D2E] bg-[#FAF9F6] p-3 rounded-2xl border border-[#E8E2D9] mt-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#6E6D70] shrink-0" />
                <span>Output: Functional Interactive App</span>
              </div>
            </div>

            <div className="bg-[#FDF5F2] border-2 border-[#E5391C] p-5 lg:p-6 rounded-3xl flex flex-col justify-between shadow-sm">
              <div className="space-y-2.5">
                <span className="text-xs font-mono text-[#E5391C] font-bold tracking-wider bg-red-100 px-3 py-1 rounded-xl inline-block">
                  PHASE 4
                </span>
                <h4 className="text-xl sm:text-2xl font-serif-display font-bold text-[#2D2D2E]">Lab Evaluation</h4>
                <p className="text-sm sm:text-base text-[#525254] leading-relaxed">
                  Empirical usability testing with 5 real users, time-on-task telemetry, SUS scoring, iterative redesign.
                </p>
              </div>
              <div className="text-xs sm:text-sm font-mono font-bold text-[#E5391C] bg-white p-3 rounded-2xl border border-[#FAD6CF] mt-3 flex items-center gap-2 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#E5391C] shrink-0" />
                <span>Output: Usability Benchmark Defense</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
          Teams of 3 to 4 students · Project topics announced in Session 3
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 44: GRAND TAKEAWAY OF SESSION 1
  // --------------------------------------------------------------------------
  if (slide.id === 44) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 bg-[#FAF9F6] overflow-y-auto select-text">
        <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-6 lg:h-7 w-auto" />
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
              Session 1 Synthesis
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 44 / 45</span>
        </div>

        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-3 lg:py-4 gap-4 lg:gap-5 min-h-0">
          <div className="text-center space-y-2 flex-shrink-0">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif-display font-medium text-[#2D2D2E]">
              The Three Golden Axioms of Session 1
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-[#6E6D70] max-w-4xl mx-auto font-light">
              Carry these three principles into every design review and engineering architecture meeting.
            </p>
          </div>

          <div className="space-y-4 flex-1 flex flex-col justify-between min-h-0">
            <div className="p-5 lg:p-6 bg-white border-2 border-[#E8E2D9] rounded-3xl flex items-start gap-5 shadow-xs flex-1 hover:border-stone-400 transition-all">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-bold text-[#E5391C] shrink-0">01</span>
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif-display font-bold text-[#2D2D2E]">
                  You Are Not The User
                </h3>
                <p className="text-base sm:text-lg lg:text-xl text-[#525254] mt-1.5 leading-relaxed">
                  You know how the database and code work; the user does not. Never assume your mental model matches theirs.
                </p>
              </div>
            </div>

            <div className="p-5 lg:p-6 bg-white border-2 border-[#E8E2D9] rounded-3xl flex items-start gap-5 shadow-xs flex-1 hover:border-stone-400 transition-all">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-bold text-[#E5391C] shrink-0">02</span>
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif-display font-bold text-[#2D2D2E]">
                  Functionality ≠ Usability
                </h3>
                <p className="text-base sm:text-lg lg:text-xl text-[#525254] mt-1.5 leading-relaxed">
                  Functionality is what the computer can compute; usability is what the human successfully achieves without suffering.
                </p>
              </div>
            </div>

            <div className="p-5 lg:p-6 bg-white border-2 border-[#E8E2D9] rounded-3xl flex items-start gap-5 shadow-xs flex-1 hover:border-stone-400 transition-all">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-bold text-[#E5391C] shrink-0">03</span>
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif-display font-bold text-[#2D2D2E]">
                  Usability is Observable, Measurable Science
                </h3>
                <p className="text-base sm:text-lg lg:text-xl text-[#525254] mt-1.5 leading-relaxed">
                  We don't argue personal tastes or executive opinions. We benchmark task completion, duration, errors, and workload.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
          Next: Looking ahead to Session 2
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 45: LOOKING AHEAD TO SESSION 2
  // --------------------------------------------------------------------------
  if (slide.id === 45) {
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
          <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide 45 / 45</span>
        </div>

        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-center py-6 lg:py-10 space-y-6 lg:space-y-10 min-h-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FDF5F2] border-2 border-[#E5391C] flex items-center justify-center mx-auto text-[#E5391C] shadow-sm">
            <Brain className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <div className="space-y-3">
            <span className="text-xs sm:text-sm lg:text-base font-mono uppercase tracking-widest text-[#E5391C] font-bold">
              Previewing Session 2 · Next Monday 09:00
            </span>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-serif-display font-medium text-[#2D2D2E]">
              The Human
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light">
              Perception · Attention · Memory · Mental Models · Cognition
            </p>
          </div>

          <p className="text-base sm:text-lg lg:text-xl text-[#6E6D70] max-w-3xl mx-auto leading-relaxed">
            We will dissect the biological machine: visual foveation, optical illusions, Gestalt grouping laws, and why human working memory fails at 4 items.
          </p>
        </div>

        <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
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
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-12 xl:p-14 bg-[#FAF9F6]">
      {/* Header Bar */}
      <div className="pb-3 lg:pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <UM6PLogo variant="compact" theme="color" className="h-6 lg:h-7 w-auto" />
          <div className="h-4 w-px bg-[#E8E2D9]" />
          <span className="text-xs sm:text-sm font-mono uppercase text-[#E5391C] tracking-wider font-bold">
            {slide.actTitle}
          </span>
        </div>
        <span className="text-xs sm:text-sm font-mono text-[#6E6D70]">Slide {slide.id} / 45</span>
      </div>

      {/* Main Slide Body adapting to vertical space */}
      <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-4 lg:py-6 gap-6">
        <div className="space-y-3 flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display font-medium text-[#2D2D2E] leading-tight text-balance">
            {slide.title}
          </h2>
          {slide.subtitle && (
            <p className="text-xl sm:text-2xl lg:text-3xl text-[#525254] font-light leading-relaxed max-w-4xl">
              {slide.subtitle}
            </p>
          )}
        </div>

        {/* Structured Key Points or Core Content */}
        {slide.speakerNotes?.keyPoints && slide.speakerNotes.keyPoints.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-stretch min-h-0">
            {slide.speakerNotes.keyPoints.slice(0, 3).map((point, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-[#E8E2D9] p-6 lg:p-8 xl:p-10 rounded-3xl flex flex-col justify-between shadow-xs hover:border-[#E5391C]/50 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-mono text-[#E5391C] font-bold uppercase tracking-wider px-3 py-1.5 bg-[#FDF5F2] border border-[#FAD6CF] rounded-xl">
                      HCI ARCHITECTURAL FOUNDATION 0{idx + 1}
                    </span>
                    <span className="w-3 h-3 rounded-full bg-[#E5391C]" />
                  </div>
                  <p className="text-xl sm:text-2xl lg:text-3xl text-[#2D2D2E] font-medium leading-relaxed">
                    {point}
                  </p>
                </div>
                <div className="text-sm sm:text-base font-mono font-bold text-[#6E6D70] pt-4 border-t border-[#F0EBE3] mt-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-stone-400 shrink-0" />
                  <span>Theoretical Anchor · HCI Architecture</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Activity Banner if slide has an interactive task */}
        {slide.activity && (
          <div className="p-6 lg:p-8 bg-white border-2 border-[#E5391C] rounded-2xl space-y-4 shadow-sm flex-shrink-0">
            <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-[#E5391C] uppercase font-bold">
              <span>Classroom Activity: {slide.activity.type}</span>
              <span>{slide.activity.durationSec}s Duration</span>
            </div>
            <h4 className="text-2xl sm:text-3xl font-serif-display font-medium text-[#2D2D2E]">{slide.activity.question}</h4>
            <ul className="space-y-2 text-base sm:text-lg text-[#525254] pt-2">
              {slide.activity.instructions.map((inst, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[#E5391C] font-mono font-bold text-lg">▸</span>
                  <span>{inst}</span>
                </li>
              ))}
            </ul>
            {onOpenTimer && (
              <button
                onClick={() => onOpenTimer(slide.activity!.durationSec, `${slide.activity!.type} Timer`)}
                className="mt-3 px-8 py-3 bg-[#E5391C] hover:bg-[#C92B10] text-white text-sm font-bold rounded-xl transition-colors shadow cursor-pointer active:scale-98"
              >
                Launch Activity Timer ({slide.activity.durationSec}s)
              </button>
            )}
          </div>
        )}
      </div>

      {/* Institutional Slide Footer */}
      <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] pt-4 border-t border-[#E8E2D9] flex-shrink-0">
        Mohammed VI Polytechnic University · Prof. Yassine Ben-Aboud · Human-Computer Interaction
      </div>
    </div>
  );
};
