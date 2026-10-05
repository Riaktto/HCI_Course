import React, { useState, useEffect } from 'react';
import {
  AlertCircle,
  Clock,
  ShieldAlert,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Eye,
  Layers,
  AlertTriangle,
  Lightbulb,
  Search,
  Database,
  Brain,
  Target,
  FileCode,
  Check,
  X,
} from 'lucide-react';
import { UM6PLogo } from '../brand/UM6PLogo';

export const Experiment4BadDesign: React.FC<{ showForensic?: boolean }> = () => {
  const [courseQuery, setCourseQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(45);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [activeCrimeId, setActiveCrimeId] = useState<number>(1);
  const [triggeredCrimes, setTriggeredCrimes] = useState<Set<number>>(new Set([1]));
  const [enrolled, setEnrolled] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [timeTaken, setTimeTaken] = useState<number>(0);

  // Countdown timer for session timeout
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerActive && timeLeft > 0 && !sessionExpired && !enrolled) {
      interval = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            setSessionExpired(true);
            setTriggeredCrimes((prev) => new Set([...prev, 5]));
            setActiveCrimeId(5);
            return 0;
          }
          return t - 1;
        });
        setTimeTaken((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timeLeft, sessionExpired, enrolled]);

  const handleStartInteraction = () => {
    if (!isTimerActive) setIsTimerActive(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleStartInteraction();
    const query = courseQuery.trim().toLowerCase();
    if (query === 'hci' || query.includes('human') || query.includes('interaction') || query.includes('design')) {
      setErrorMsg('ERROR 0x4B2: Search string must specify exact 9-digit alphanumeric CRN (e.g. CS-4010). Natural text queries are rejected by database schema.');
      setTriggeredCrimes((prev) => new Set([...prev, 1, 6]));
      setActiveCrimeId(1);
      return;
    }
    if (courseQuery.trim() !== 'CS-4010') {
      setErrorMsg('QUERY REJECTED: CRN not found in current semester catalog. Tip: Click "Auto-Fill CS-4010" to load course.');
      setTriggeredCrimes((prev) => new Set([...prev, 6]));
      setActiveCrimeId(6);
      return;
    }
    setErrorMsg(null);
    setCurrentStep(2);
    setTriggeredCrimes((prev) => new Set([...prev, 1]));
    setActiveCrimeId(2);
  };

  const handleQuickCRN = () => {
    handleStartInteraction();
    setCourseQuery('CS-4010');
    setErrorMsg(null);
    setCurrentStep(2);
    setTriggeredCrimes((prev) => new Set([...prev, 1]));
    setActiveCrimeId(2);
  };

  const handleAttemptEnroll = () => {
    if (!selectedSection) {
      setErrorMsg('INVALID STATE: You must locate and check the section confirmation checkbox before proceeding.');
      setTriggeredCrimes((prev) => new Set([...prev, 2]));
      setActiveCrimeId(2);
      return;
    }
    setErrorMsg(null);
    setShowConfirmModal(true);
    setCurrentStep(4);
    setTriggeredCrimes((prev) => new Set([...prev, 4]));
    setActiveCrimeId(4);
  };

  const handleAbortClick = () => {
    setErrorMsg('🚨 ACCIDENTAL ABORT TRIGGERED: The bright red button purged all form inputs and cleared registration progress.');
    setSelectedSection(null);
    setCourseQuery('');
    setCurrentStep(1);
    setTriggeredCrimes((prev) => new Set([...prev, 3]));
    setActiveCrimeId(3);
  };

  const handleModalOption = (choice: 'no' | 'cancel') => {
    if (choice === 'no') {
      setEnrolled(true);
      setShowConfirmModal(false);
      setErrorMsg(null);
      setCurrentStep(5);
    } else {
      setShowConfirmModal(false);
      setErrorMsg('OPERATION ABORTED BY USER: Because the modal used double negation ("do NOT wish to cancel"), clicking "Cancel" cancelled the entire enrollment!');
      setSelectedSection(null);
      setCourseQuery('');
      setCurrentStep(1);
      setTriggeredCrimes((prev) => new Set([...prev, 4]));
      setActiveCrimeId(4);
    }
  };

  const handleReset = () => {
    setCourseQuery('');
    setSelectedSection(null);
    setShowConfirmModal(false);
    setErrorMsg(null);
    setTimeLeft(45);
    setIsTimerActive(false);
    setSessionExpired(false);
    setActiveCrimeId(1);
    setTriggeredCrimes(new Set([1]));
    setEnrolled(false);
    setCurrentStep(1);
    setTimeTaken(0);
  };

  const crimes = [
    {
      id: 1,
      title: '1. Machine Model vs Mental Model',
      tag: 'Database Exposure',
      icon: Database,
      crime: 'Forces users to type internal database keys ("CS-4010") instead of natural language ("HCI").',
      scientificName: "Norman's Gulf of Execution",
      antidote: 'Support full-text fuzzy search across course names, instructor names, and topics.',
    },
    {
      id: 2,
      title: '2. Microscopic Target Size',
      tag: "Fitts's Law Violation",
      icon: Target,
      crime: 'Checkbox has a microscopic 8px hit box with 0px padding, inducing frequent motor mis-clicks.',
      scientificName: "Fitts's Law Target Penalty",
      antidote: 'Make the entire course row clickable with a minimum touch height of ≥48px (WCAG AAA).',
    },
    {
      id: 3,
      title: '3. Reversed Visual Affordance',
      tag: 'Deceptive Styling',
      icon: Layers,
      crime: 'The destructive action (ABORT) is styled as a large bright red button, while the desired action is disguised as an obscure gray link.',
      scientificName: 'Affordance Inversion Trap',
      antidote: 'Primary positive action should be prominent; destructive actions must be de-emphasized with safety buffers.',
    },
    {
      id: 4,
      title: '4. Double-Negative Confirmation',
      tag: 'Cognitive Inversion',
      icon: Brain,
      crime: '"Are you sure you do NOT want to cancel unregistration?" with [No] and [Cancel] induces extreme cognitive paralysis.',
      scientificName: 'Linguistic Negation Fatigue',
      antidote: 'Use clear, direct verbs: "Confirm Course Enrollment" vs "Back to Editing".',
    },
    {
      id: 5,
      title: '5. Hostile Session Expiration',
      tag: 'Artificial Panic',
      icon: Clock,
      crime: 'An arbitrary 45-second countdown timer causes psychological stress and unbuffered total data loss upon expiry.',
      scientificName: 'Panic-Induced Cognitive Collapse',
      antidote: 'Auto-save draft state in local storage; extend timeouts automatically with quiet background refresh.',
    },
    {
      id: 6,
      title: '6. Inscrutable Machine Error Codes',
      tag: 'Cryptic Feedback',
      icon: FileCode,
      crime: 'Exposes raw backend hex error codes ("0x4B2") without explaining what went wrong or offering a 1-click fix.',
      scientificName: 'Feedback Vacuum & Blame Attribution',
      antidote: 'Plain language explanations: "Course code not found. Did you mean CS-4010: HCI?" with 1-click remedy.',
    },
  ];

  const currentCrime = crimes.find((c) => c.id === activeCrimeId) || crimes[0];

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 bg-[#FAF9F6] select-text">
      {/* Institutional Top Header */}
      <div className="pb-3 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <UM6PLogo variant="compact" theme="color" className="h-7 lg:h-8 w-auto" />
          <div className="h-4 w-px bg-[#E8E2D9]" />
          <span className="text-xs sm:text-sm font-mono uppercase text-white bg-[#E5391C] font-bold px-3 py-1 rounded-xl shadow-2xs">
            Live Challenge 04
          </span>
          <span className="text-sm sm:text-base font-semibold text-[#2D2D2E]">
            The Hostile University Portal: Experiencing the 6 Design Crimes
          </span>
        </div>

        {/* Global Challenge Telemetry & Reset */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-[#E8E2D9] rounded-xl font-mono text-xs sm:text-sm text-[#2D2D2E] shadow-2xs">
            <Clock className={`w-4 h-4 ${timeLeft < 15 ? 'text-red-600 animate-pulse' : 'text-[#E5391C]'}`} />
            <span>Session Timeout:</span>
            <strong className={`font-mono font-bold ${timeLeft < 15 ? 'text-red-600' : 'text-[#2D2D2E]'}`}>
              {timeLeft}s
            </strong>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-mono font-bold text-stone-700 bg-white border-2 border-[#E8E2D9] rounded-xl hover:border-stone-400 hover:text-stone-900 transition-all cursor-pointer shadow-2xs"
          >
            <RotateCcw className="w-4 h-4 text-[#E5391C]" />
            <span>Reset Challenge</span>
          </button>
        </div>
      </div>

      {/* Main Container Area */}
      <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col justify-between py-2 gap-3.5 min-h-0">
        {/* Pedagogical Mission & Learning Objective Card */}
        <div className="p-4 bg-white border-2 border-[#E8E2D9] rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xs flex-shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E5391C]" />
              <span className="text-xs font-mono uppercase text-[#E5391C] font-bold tracking-wider">
                Classroom Challenge Mission:
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#2D2D2E]">
                Attempt to enroll in "CS-4010: Human-Computer Interaction" before the 45s timer expires.
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#6E6D70]">
              <strong>Pedagogical Goal:</strong> Notice how each deliberate engineering defect induces cognitive friction, hesitation, or accidental data loss.
            </p>
          </div>

          {/* Stepper Indicator */}
          <div className="flex items-center gap-1.5 self-start md:self-auto bg-[#FAF9F6] p-1 rounded-xl border border-[#E8E2D9] text-xs font-mono">
            <span className={`px-2.5 py-1 rounded-lg font-bold ${currentStep >= 1 ? 'bg-[#E5391C] text-white' : 'text-stone-400'}`}>
              1. Search
            </span>
            <span>➔</span>
            <span className={`px-2.5 py-1 rounded-lg font-bold ${currentStep >= 2 ? 'bg-[#E5391C] text-white' : 'text-stone-400'}`}>
              2. Select
            </span>
            <span>➔</span>
            <span className={`px-2.5 py-1 rounded-lg font-bold ${currentStep >= 3 ? 'bg-[#E5391C] text-white' : 'text-stone-400'}`}>
              3. Submit
            </span>
            <span>➔</span>
            <span className={`px-2.5 py-1 rounded-lg font-bold ${currentStep >= 4 ? 'bg-[#E5391C] text-white' : 'text-stone-400'}`}>
              4. Modal
            </span>
          </div>
        </div>

        {/* 2-Column Split: The Simulator (7 cols) vs The Forensic Autopsy (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 flex-1 items-stretch min-h-0">
          {/* ============================================================== */}
          {/* LEFT: THE HOSTILE PORTAL SIMULATOR (7 cols) */}
          {/* ============================================================== */}
          <div className="lg:col-span-7 bg-white border-2 border-red-300 rounded-3xl p-5 lg:p-6 flex flex-col justify-between shadow-xs relative overflow-hidden space-y-3">
            {sessionExpired ? (
              <div className="py-12 text-center space-y-4 my-auto">
                <div className="w-16 h-16 rounded-full bg-red-100 border-2 border-red-400 text-red-600 flex items-center justify-center mx-auto shadow-sm">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-bold text-red-700 font-serif-display">
                    SESSION EXPIRED: TRANSACTION PURGED
                  </h3>
                  <p className="text-sm sm:text-base text-stone-700 font-mono">
                    Security Policy 44.1: Timer expired after 45 seconds. All form inputs wiped without local recovery.
                  </p>
                </div>
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs sm:text-sm font-mono text-red-900 max-w-lg mx-auto">
                  <strong>Crime #5 Triggered:</strong> Hostile session timeout induced artificial panic and punished the human.
                </div>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-[#2D2D2E] hover:bg-black text-white text-sm font-mono font-bold rounded-xl cursor-pointer shadow-sm transition-all"
                >
                  Restart Challenge Gauntlet ➔
                </button>
              </div>
            ) : enrolled ? (
              <div className="py-10 text-center space-y-4 bg-emerald-50 rounded-2xl border-2 border-emerald-400 my-auto p-6 shadow-xs">
                <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-bold text-emerald-950 font-serif-display">
                    You Survived the Usability Gauntlet!
                  </h3>
                  <p className="text-sm sm:text-base text-emerald-800 font-medium">
                    Successfully enrolled into <strong>CS-4010: Human-Computer Interaction</strong>.
                  </p>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pt-2">
                  <div className="p-3 bg-white rounded-xl border border-emerald-300 text-center font-mono">
                    <span className="text-[10px] text-stone-500 uppercase block">Time Spent</span>
                    <strong className="text-lg text-emerald-950">{timeTaken}s</strong>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-emerald-300 text-center font-mono">
                    <span className="text-[10px] text-stone-500 uppercase block">Traps Overcome</span>
                    <strong className="text-lg text-emerald-950">6 / 6</strong>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-emerald-300 text-center font-mono">
                    <span className="text-[10px] text-stone-500 uppercase block">Usability Score</span>
                    <strong className="text-lg text-red-600">14 / 100</strong>
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-mono text-stone-600 max-w-lg mx-auto pt-2">
                  ✓ <strong>Class Takeaway:</strong> You survived only because you were paying forensic attention. Over 70% of actual students abandon or mis-register under this hostile design!
                </p>

                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-mono font-bold rounded-xl cursor-pointer shadow-xs"
                >
                  Test Gauntlet Again
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Legacy Portal Header Bar */}
                <div className="flex items-center justify-between pb-3 border-b-2 border-stone-200 text-xs sm:text-sm text-stone-700 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                    <strong className="font-bold text-stone-900">ACADEMIC_SYS_ENTERPRISE_V2.1</strong>
                  </div>
                  <span className="text-stone-500">UM6P COURSE REGISTRATION BUFFER</span>
                </div>

                {/* Error Banner */}
                {errorMsg && (
                  <div className="p-3.5 bg-red-50 border-2 border-red-300 rounded-xl text-red-950 text-xs sm:text-sm font-mono flex items-start gap-2.5 shadow-2xs">
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
                    <div className="space-y-1">
                      <span className="font-bold block text-red-800">SYSTEM EXCEPTION FEEDBACK:</span>
                      <p>{errorMsg}</p>
                    </div>
                  </div>
                )}

                {/* Step 1: Search Course */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-mono text-stone-800 font-bold block">
                      Step 1: Locate Course by Database CRN:
                    </label>
                    <span className="text-[11px] font-mono text-stone-500">Try typing "HCI" vs "CS-4010"</span>
                  </div>

                  <form onSubmit={handleSearch} className="flex gap-2">
                    <input
                      type="text"
                      value={courseQuery}
                      placeholder="e.g. Type 'HCI' (triggers Crime #1) or 'CS-4010'"
                      onChange={(e) => {
                        setCourseQuery(e.target.value);
                        handleStartInteraction();
                      }}
                      className="flex-1 bg-[#FAF9F6] border-2 border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 font-mono focus:border-[#E5391C] outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 sm:px-5 py-2.5 bg-stone-900 hover:bg-black text-white text-xs sm:text-sm font-mono font-bold rounded-xl cursor-pointer transition-colors shadow-2xs"
                    >
                      Search
                    </button>
                    <button
                      type="button"
                      onClick={handleQuickCRN}
                      className="px-3 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-xs font-mono font-bold rounded-xl cursor-pointer transition-colors shrink-0"
                      title="Auto-fill exact CRN"
                    >
                      💡 Auto-Fill CS-4010
                    </button>
                  </form>
                </div>

                {/* Step 2: Course Match Result Card & Microscopic Checkbox */}
                {currentStep >= 2 && (
                  <div className="p-4 bg-stone-50 rounded-2xl border-2 border-stone-300 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-[#2D2D2E] font-serif-display text-base sm:text-lg block">
                          CS-4010: Human-Computer Interaction
                        </span>
                        <span className="text-xs text-stone-600 font-mono">
                          Section 01 · Mon/Wed 09:00–11:00 · Prof. Yassine Ben-Aboud
                        </span>
                      </div>
                      <span className="font-mono text-emerald-800 font-bold bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-lg text-xs">
                        4 SEATS OPEN
                      </span>
                    </div>

                    {/* The Deliberate Microscopic Checkbox (Crime #2) */}
                    <div className="p-3 bg-white border border-stone-200 rounded-xl flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="section-check"
                        checked={selectedSection === 'sec1'}
                        onChange={(e) => {
                          handleStartInteraction();
                          setSelectedSection(e.target.checked ? 'sec1' : null);
                          if (e.target.checked) {
                            setCurrentStep(3);
                            setActiveCrimeId(3);
                          }
                        }}
                        className="w-3.5 h-3.5 accent-[#E5391C] cursor-pointer"
                      />
                      <label htmlFor="section-check" className="cursor-pointer text-xs sm:text-sm text-stone-700 font-medium">
                        Check microscopic 8px box to bind course record to session cart (Fitts's Law Trap)
                      </label>
                    </div>
                  </div>
                )}

                {/* Step 3: Reversed Visual Affordance Action Bar (Crime #3) */}
                <div className="pt-4 border-t-2 border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  {/* The actual desired action: Styled as an obscure, low-contrast footer text link! */}
                  <button
                    type="button"
                    onClick={handleAttemptEnroll}
                    className="text-xs sm:text-sm text-stone-600 hover:text-stone-900 underline font-mono cursor-pointer py-1.5 px-2 rounded-lg hover:bg-stone-100 transition-colors"
                  >
                    [Proceed to finalize and verify registration transaction]
                  </button>

                  {/* The dangerous destructive action: Styled as a giant bright prominent red button! */}
                  <button
                    type="button"
                    onClick={handleAbortClick}
                    className="py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm font-mono rounded-xl shadow-sm active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    <span>ABORT / CANCEL REGISTRATION</span>
                  </button>
                </div>
              </div>
            )}

            {/* Double Negative Modal Overlay (Crime #4) */}
            {showConfirmModal && (
              <div className="absolute inset-0 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4 z-30">
                <div className="bg-white border-2 border-[#E5391C] rounded-3xl p-6 sm:p-7 max-w-md w-full space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
                  <div className="flex items-center gap-2 text-[#E5391C] text-base font-bold font-mono">
                    <ShieldAlert className="w-6 h-6 shrink-0" />
                    <span>Security Confirmation Dialog</span>
                  </div>

                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-red-700">Crime #4 Active: Double Negative</span>
                    <p className="text-sm sm:text-base text-stone-900 font-mono leading-relaxed">
                      Are you absolutely certain you do <strong>NOT</strong> wish to cancel the unregistration process?
                    </p>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => handleModalOption('cancel')}
                      className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-mono font-bold rounded-xl border border-stone-300 cursor-pointer"
                    >
                      Cancel (Aborts Progress)
                    </button>
                    <button
                      onClick={() => handleModalOption('no')}
                      className="flex-1 py-3 bg-[#E5391C] hover:bg-[#C92B10] text-white text-xs sm:text-sm font-mono font-bold rounded-xl shadow-md cursor-pointer"
                    >
                      No (Confirms Enrollment!)
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ============================================================== */}
          {/* RIGHT: REAL-TIME FORENSIC CRIME TRACKER (5 cols) */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 bg-white border-2 border-[#E8E2D9] rounded-3xl p-5 lg:p-6 flex flex-col justify-between shadow-xs space-y-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#E5391C] font-bold">
                  Forensic Crime Tracker
                </span>
                <span className="text-xs font-mono text-stone-500">
                  {triggeredCrimes.size} / 6 Discovered
                </span>
              </div>
              <h4 className="text-xl sm:text-2xl font-serif-display font-bold text-[#2D2D2E]">
                The 6 Engineering Anti-Patterns
              </h4>
            </div>

            {/* 6 Crimes Interactive Accordion List */}
            <div className="space-y-2 flex-1 overflow-y-auto pr-1 min-h-0">
              {crimes.map((c) => {
                const IconComp = c.icon;
                const isSelected = activeCrimeId === c.id;
                const isTriggered = triggeredCrimes.has(c.id);

                return (
                  <div
                    key={c.id}
                    onClick={() => setActiveCrimeId(c.id)}
                    className={`p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#E5391C] bg-[#FDF5F2] text-[#2D2D2E] shadow-xs'
                        : isTriggered
                        ? 'border-amber-300 bg-amber-50/60 text-stone-800'
                        : 'border-[#E8E2D9] bg-[#FAF9F6] text-stone-600 hover:border-stone-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IconComp className={`w-4 h-4 ${isSelected ? 'text-[#E5391C]' : 'text-stone-500'}`} />
                        <span className="font-bold text-xs sm:text-sm font-mono">{c.title}</span>
                      </div>
                      <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                        isTriggered ? 'bg-[#E5391C] text-white' : 'bg-stone-200 text-stone-700'
                      }`}>
                        {isTriggered ? 'ACTIVE' : 'IDLE'}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="space-y-2 pt-2 mt-2 border-t border-[#FAD6CF] text-xs font-sans">
                        <p className="text-stone-800 font-medium">{c.crime}</p>
                        <div className="p-2 bg-white rounded-lg border border-[#FAD6CF] space-y-1 font-mono text-[11px]">
                          <div><strong>HCI Law:</strong> {c.scientificName}</div>
                          <div className="text-emerald-800"><strong>Ergonomic Fix:</strong> {c.antidote}</div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Deep-Dive Summary for Active Crime */}
            <div className="p-3 bg-stone-100 rounded-xl text-xs font-mono text-stone-700 flex items-center justify-between">
              <span>Active Inspection: <strong>{currentCrime.tag}</strong></span>
              <span className="text-[#E5391C] font-bold">Select Crime to Read Antidote</span>
            </div>
          </div>
        </div>

        {/* Institutional Bottom Banner */}
        <div className="p-4 bg-white border-2 border-[#E5391C] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs flex-shrink-0">
          <p className="text-base sm:text-lg lg:text-xl text-[#2D2D2E] leading-relaxed">
            <strong className="text-[#E5391C] font-serif-display text-lg sm:text-xl font-bold mr-2">
              The Golden Takeaway:
            </strong>
            Bad design is never a cosmetic issue. It is the architectural failure of exposing internal database representations directly to human beings.
          </p>
          <span className="text-xs sm:text-sm font-mono text-white bg-[#E5391C] font-bold px-3.5 py-1.5 rounded-xl whitespace-nowrap shadow-2xs">
            HCI Engineering
          </span>
        </div>
      </div>

      <div className="text-center text-xs sm:text-sm font-mono text-[#6E6D70] flex-shrink-0">
        Next: Slide 29 · Forensic Autopsy (Formal Classification of the 6 Crimes)
      </div>
    </div>
  );
};
