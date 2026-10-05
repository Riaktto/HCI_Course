import React, { useState, useEffect } from 'react';
import { AlertCircle, Clock, ShieldAlert, CheckCircle, RotateCcw } from 'lucide-react';
import { UM6PLogo } from '../brand/UM6PLogo';

export const Experiment4BadDesign: React.FC<{ showForensic?: boolean }> = () => {
  const [courseQuery, setCourseQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(45);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [activeAnnotation, setActiveAnnotation] = useState<number | null>(1);
  const [enrolled, setEnrolled] = useState(false);

  // Countdown timer for session timeout
  useEffect(() => {
    let interval: any = null;
    if (isTimerActive && timeLeft > 0 && !sessionExpired && !enrolled) {
      interval = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            setSessionExpired(true);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft, sessionExpired, enrolled]);

  const handleStartInteraction = () => {
    if (!isTimerActive) setIsTimerActive(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleStartInteraction();
    if (courseQuery.trim().toLowerCase() === 'hci' || courseQuery.trim().toLowerCase().includes('human')) {
      setErrorMsg('ERROR 0x4B2: Search string must specify 9-digit alphanumeric CRN. Natural text query not supported.');
      return;
    }
    if (courseQuery.trim() !== 'CS-4010') {
      setErrorMsg('QUERY REJECTED: CRN not found in current semester catalog. Did you mean CS-4010?');
      return;
    }
    setErrorMsg(null);
  };

  const handleQuickCRN = () => {
    handleStartInteraction();
    setCourseQuery('CS-4010');
    setErrorMsg(null);
  };

  const handleAttemptEnroll = () => {
    if (!selectedSection) {
      setErrorMsg('INVALID STATE: Must tick the section checkbox before proceeding.');
      return;
    }
    setShowConfirmModal(true);
  };

  const handleModalOption = (choice: 'no' | 'cancel') => {
    if (choice === 'no') {
      setEnrolled(true);
      setShowConfirmModal(false);
      setErrorMsg(null);
    } else {
      setShowConfirmModal(false);
      setErrorMsg('OPERATION ABORTED BY USER: Form cleared.');
      setSelectedSection(null);
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
    setActiveAnnotation(1);
    setEnrolled(false);
  };

  const annotations = [
    {
      id: 1,
      title: '1. Machine Model vs Human Mental Model',
      desc: 'Demands exact backend database key (CRN CS-4010) instead of allowing natural keyword search ("HCI", "Interaction").',
    },
    {
      id: 2,
      title: '2. Microscopic Click Target (Fitts\'s Law Violation)',
      desc: 'The checkbox has an 8px hit box with no padding, making it frustratingly hard to select with a mouse or finger.',
    },
    {
      id: 3,
      title: '3. Reversed Visual Affordance',
      desc: 'The dangerous action (CANCEL) is styled as a large bright button, while the desired primary action is styled like an obscure footnote.',
    },
    {
      id: 4,
      title: '4. Double-Negative Cognitive Trap',
      desc: '"Are you sure you do NOT want to abort?" with [No] and [Cancel] induces extreme cognitive hesitation.',
    },
    {
      id: 5,
      title: '5. Hostile Session Expiration',
      desc: 'Arbitrary 45-second timer induces unnecessary panic and unbuffered data loss.',
    },
    {
      id: 6,
      title: '6. Inscrutable Error Messages',
      desc: 'Exposes raw machine hex codes (0x4B2) instead of explaining the problem and offering a 1-click remedy.',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 lg:p-6 bg-[#FAF9F6]">
      {/* Top Controller */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E8E2D9]">
        <div className="flex items-center gap-3">
          <UM6PLogo variant="compact" theme="color" className="h-6 w-auto" />
          <div className="h-4 w-px bg-[#E8E2D9]" />
          <span className="text-xs uppercase font-mono tracking-wider text-white bg-red-600 font-bold px-3 py-1 rounded">
            Live Challenge 04
          </span>
          <span className="text-sm font-semibold text-[#2D2D2E]">
            The Hostile University Enrollment Portal: Can You Enroll?
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E8E2D9] rounded-lg font-mono text-xs text-[#2D2D2E]">
            <Clock className={`w-4 h-4 ${timeLeft < 15 ? 'text-red-600 animate-spin' : 'text-[#E5391C]'}`} />
            <span>Session Timeout: </span>
            <strong className={`font-bold ${timeLeft < 15 ? 'text-red-600' : 'text-[#2D2D2E]'}`}>{timeLeft}s</strong>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1.5 text-xs text-[#6E6D70] bg-white border border-[#E8E2D9] rounded hover:text-[#2D2D2E] hover:bg-[#F5F2ED]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Challenge
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 py-2 items-stretch">
        {/* The Hostile Portal Mockup (8 cols) */}
        <div className="lg:col-span-8 bg-white border-2 border-[#D5CFC7] rounded-2xl p-6 shadow-sm relative overflow-hidden">
          {sessionExpired ? (
            <div className="py-12 text-center space-y-3">
              <ShieldAlert className="w-12 h-12 text-red-600 mx-auto" />
              <h3 className="text-lg font-bold text-red-700 font-serif-display">SESSION EXPIRED: TRANSACTION TIMEOUT</h3>
              <p className="text-xs text-[#6E6D70] font-mono">
                Security Policy 44.1: Form inputs purged. Please restart process.
              </p>
              <button
                onClick={handleReset}
                className="mt-3 px-4 py-2 bg-[#2D2D2E] hover:bg-black text-white text-xs font-mono rounded-lg"
              >
                Restart Session
              </button>
            </div>
          ) : enrolled ? (
            <div className="py-10 text-center space-y-3 bg-emerald-50 rounded-xl border border-emerald-300">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-bold text-emerald-900 font-serif-display">You Survived the Gauntlet!</h3>
              <p className="text-xs text-emerald-700">Successfully enrolled into CS-4010: Human-Computer Interaction.</p>
              <div className="text-xs font-mono text-[#6E6D70]">
                Notice how many unnecessary mental micro-obstacles you had to fight through.
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Bad Header */}
              <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE3] text-xs text-[#6E6D70] font-mono">
                <span className="font-bold">ACADEMIC_SYS_ENTERPRISE_V2.1</span>
                <span>SECURE ENROLLMENT BUFFER</span>
              </div>

              {/* Error notice */}
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-xs font-mono flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Search section */}
              <div>
                <label className="block text-xs font-mono text-[#6E6D70] mb-1 font-semibold">
                  1. Search Course by CRN (Try typing "HCI" or "CS-4010"):
                </label>
                <form onSubmit={handleSearch} className="flex gap-2">
                  <input
                    type="text"
                    value={courseQuery}
                    placeholder="Enter alphanumeric CRN (e.g. CS-4010)"
                    onChange={e => {
                      setCourseQuery(e.target.value);
                      handleStartInteraction();
                    }}
                    className="flex-1 bg-[#FAF9F6] border border-[#D5CFC7] rounded-lg px-3 py-2 text-xs text-[#2D2D2E] font-mono focus:border-red-500 outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#2D2D2E] hover:bg-black text-white text-xs font-mono rounded-lg"
                  >
                    Query
                  </button>
                  <button
                    type="button"
                    onClick={handleQuickCRN}
                    className="px-3 py-2 bg-[#F5F2ED] text-[#6E6D70] hover:text-[#2D2D2E] text-xs font-mono rounded-lg border border-[#D5CFC7]"
                    title="Auto-fill exact CRN"
                  >
                    Fill CS-4010
                  </button>
                </form>
              </div>

              {/* Course match result */}
              {courseQuery === 'CS-4010' && (
                <div className="p-4 bg-[#FAF9F6] rounded-xl border border-[#E8E2D9] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#2D2D2E] font-serif-display text-sm">CS-4010: Human-Computer Interaction</span>
                    <span className="font-mono text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded text-[11px]">4 SEATS OPEN</span>
                  </div>

                  <div className="text-xs text-[#6E6D70]">Section 01 · Mon/Wed 09:00 - 11:00 · Prof. Y. Benaboud</div>

                  {/* Microscopic Checkbox */}
                  <div className="pt-2 flex items-center gap-2 text-xs text-[#2D2D2E]">
                    <input
                      type="checkbox"
                      id="section-check"
                      checked={selectedSection === 'sec1'}
                      onChange={e => {
                        handleStartInteraction();
                        setSelectedSection(e.target.checked ? 'sec1' : null);
                      }}
                      className="w-3 h-3 accent-red-600 cursor-pointer"
                    />
                    <label htmlFor="section-check" className="cursor-pointer text-xs text-[#6E6D70]">
                      Check box to bind record to cart (Warning: unbindable on submission)
                    </label>
                  </div>
                </div>
              )}

              {/* Reversed Affordance Buttons */}
              <div className="pt-4 border-t border-[#F0EBE3] flex items-center justify-between">
                {/* Desired action: Made to look like unclickable disabled gray footer link! */}
                <button
                  type="button"
                  onClick={handleAttemptEnroll}
                  className="text-xs text-[#6E6D70] hover:text-[#2D2D2E] underline font-mono cursor-pointer"
                >
                  [Submit and verify registration transaction]
                </button>

                {/* Dangerous action: Made to look like large prominent primary CTA! */}
                <button
                  type="button"
                  onClick={() => {
                    handleReset();
                    setErrorMsg('CANCEL BUTTON ACTIVATED: All progress wiped.');
                  }}
                  className="py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow active:scale-95 transition-all"
                >
                  ABORT / CANCEL REGISTRATION
                </button>
              </div>
            </div>
          )}

          {/* Double Negative Modal */}
          {showConfirmModal && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-20">
              <div className="bg-white border-2 border-[#E5391C] rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
                <div className="flex items-center gap-2 text-[#E5391C] text-sm font-bold">
                  <ShieldAlert className="w-5 h-5 shrink-0" />
                  <span>Security Confirmation Dialog</span>
                </div>

                <p className="text-xs text-[#2D2D2E] leading-relaxed font-mono">
                  Are you absolutely certain you do <strong>NOT</strong> wish to cancel the unregistration process?
                </p>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => handleModalOption('cancel')}
                    className="flex-1 py-2.5 bg-[#FAF9F6] hover:bg-[#F5F2ED] text-[#2D2D2E] text-xs font-mono font-medium rounded-lg border border-[#D5CFC7]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleModalOption('no')}
                    className="flex-1 py-2.5 bg-[#E5391C] hover:bg-[#C92B10] text-white text-xs font-mono font-bold rounded-lg shadow"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Forensic Annotations Column (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-[#E8E2D9] rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE3]">
            <span className="text-xs font-mono uppercase tracking-wider text-[#E5391C] font-bold">Forensic Breakdown</span>
            <span className="text-[10px] text-[#6E6D70]">Select to Inspect</span>
          </div>

          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {annotations.map(a => (
              <div
                key={a.id}
                onClick={() => setActiveAnnotation(activeAnnotation === a.id ? null : a.id)}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                  activeAnnotation === a.id
                    ? 'border-[#E5391C] bg-[#FDF5F2] text-[#2D2D2E] shadow-xs'
                    : 'border-[#E8E2D9] bg-[#FAF9F6] text-[#6E6D70] hover:border-[#D5CFC7]'
                }`}
              >
                <div className="font-semibold text-[#2D2D2E] text-xs mb-1">{a.title}</div>
                {activeAnnotation === a.id && (
                  <p className="text-xs text-[#525254] leading-snug pt-1 border-t border-[#F0D5CB]">{a.desc}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Classroom Takeaway Banner */}
      <div className="p-4 sm:p-5 lg:p-6 bg-gradient-to-r from-red-50/70 via-white to-amber-50/50 border-2 border-red-200/80 rounded-2xl flex items-center justify-between shadow-xs">
        <p className="text-base sm:text-lg lg:text-xl text-[#2D2D2E] leading-relaxed">
          <strong className="text-[#E5391C] font-serif-display text-lg sm:text-xl lg:text-2xl font-bold mr-2">
            Key Pedagogical Principle:
          </strong>
          Bad design rarely comes from malicious intent. It happens when software engineers expose the internal database architecture directly to the user and assume the user shares their technical mental model.
        </p>
      </div>
    </div>
  );
};
