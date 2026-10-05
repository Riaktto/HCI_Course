import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, CheckCircle, AlertTriangle, ArrowRight, Clock, AlertOctagon, Sparkles } from 'lucide-react';
import { UM6PLogo } from '../brand/UM6PLogo';

type FeedbackMode = 'rich' | 'none' | 'delayed';

export const Experiment2Loop: React.FC = () => {
  const [mode, setMode] = useState<FeedbackMode>('rich');
  const [balance, setBalance] = useState(1200);
  const [isProcessing, setIsProcessing] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [receipts, setReceipts] = useState<Array<{ id: string; amount: number; time: string }>>([]);
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);
  const [activeLoopStep, setActiveLoopStep] = useState<number>(1);
  const [delayedProgress, setDelayedProgress] = useState<number>(0);
  const [isDelayedPending, setIsDelayedPending] = useState<boolean>(false);

  // Use refs to avoid stale closure issues during asynchronous delayed latency
  const clicksRef = useRef(0);
  const delayedTimerRef = useRef<NodeJS.Timeout | null>(null);
  const delayedIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const resetExperiment = () => {
    if (delayedTimerRef.current) clearTimeout(delayedTimerRef.current);
    if (delayedIntervalRef.current) clearInterval(delayedIntervalRef.current);
    clicksRef.current = 0;
    setBalance(1200);
    setIsProcessing(false);
    setClicks(0);
    setStatusMessage(null);
    setReceipts([]);
    setDuplicateWarning(null);
    setActiveLoopStep(1);
    setDelayedProgress(0);
    setIsDelayedPending(false);
  };

  useEffect(() => {
    return () => {
      if (delayedTimerRef.current) clearTimeout(delayedTimerRef.current);
      if (delayedIntervalRef.current) clearInterval(delayedIntervalRef.current);
    };
  }, []);

  const handlePay = () => {
    clicksRef.current += 1;
    const currentClicks = clicksRef.current;
    setClicks(currentClicks);

    if (mode === 'rich') {
      // Full Immediate Feedback Loop with instant button state & status
      setActiveLoopStep(2); // Action
      setIsProcessing(true);
      setStatusMessage('Encrypting payload & contacting Bank of Morocco...');

      setTimeout(() => {
        setActiveLoopStep(3); // System Processing
        setStatusMessage('Deducting 250 MAD from Student Bursar Account...');
      }, 500);

      setTimeout(() => {
        setActiveLoopStep(4); // Feedback delivered
        setIsProcessing(false);
        setBalance(prev => Math.max(0, prev - 250));
        setStatusMessage('Payment Confirmed');
        setReceipts([
          {
            id: 'TXN-UM6P-' + Math.floor(100000 + Math.random() * 900000),
            amount: 250,
            time: new Date().toLocaleTimeString(),
          },
        ]);
        setActiveLoopStep(5); // Evaluation Complete
      }, 1200);
    } else if (mode === 'none') {
      // Degraded: Zero feedback! Button does not show active state, no spinner
      setActiveLoopStep(2);
      if (currentClicks > 1) {
        // Punish duplicate click
        setBalance(prev => Math.max(0, prev - 250));
        setDuplicateWarning(
          `MULTIPLE CLICK PENALTY: Because the system gave zero feedback, you clicked ${currentClicks} times. The student bursar account was charged ${currentClicks * 250} MAD (${currentClicks} separate transactions)!`
        );
      } else {
        // Silently deduct in background without telling user
        setTimeout(() => {
          setActiveLoopStep(3);
          setBalance(prev => Math.max(0, prev - 250));
        }, 800);
      }
    } else if (mode === 'delayed') {
      // Delayed feedback: 4.5 seconds of dead silence where button remains clickable!
      setActiveLoopStep(2);

      // If this is the first click in the latency window, start the 4.5s timer
      if (!isDelayedPending) {
        setIsDelayedPending(true);
        setDelayedProgress(0);

        const startTime = Date.now();
        const duration = 4500;

        delayedIntervalRef.current = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
          setDelayedProgress(pct);
        }, 100);

        delayedTimerRef.current = setTimeout(() => {
          if (delayedIntervalRef.current) clearInterval(delayedIntervalRef.current);
          setIsDelayedPending(false);
          setDelayedProgress(100);
          setActiveLoopStep(4);

          const finalClickCount = clicksRef.current;
          const totalCost = finalClickCount * 250;
          setBalance(prev => Math.max(0, prev - totalCost));

          // Generate receipts for all queued clicks
          const newReceipts = Array.from({ length: finalClickCount }, (_, i) => ({
            id: `TXN-UM6P-${Math.floor(100000 + Math.random() * 900000)}-#${i + 1}`,
            amount: 250,
            time: new Date().toLocaleTimeString(),
          }));
          setReceipts(newReceipts);

          if (finalClickCount > 1) {
            setDuplicateWarning(
              `LATENCY OVERBILLING CATASTROPHE: During 4.5 seconds of dead silence and zero progress feedback, the human brain assumed the click was dropped and re-clicked ${finalClickCount} times. Total billed: ${totalCost} MAD across ${finalClickCount} transactions!`
            );
          } else {
            setStatusMessage('Payment finally acknowledged after 4.5s latency.');
          }
          setActiveLoopStep(5);
        }, duration);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 lg:p-6 bg-[#FAF9F6] select-text">
      {/* Top Academic & Controller Bar with Official UM6P Logo */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E8E2D9] flex-shrink-0">
        <div className="flex items-center gap-3.5">
          <UM6PLogo variant="compact" theme="color" className="h-7 w-auto" />
          <div className="h-5 w-px bg-[#E8E2D9]" />
          <span className="text-xs sm:text-sm uppercase font-mono tracking-wider text-white bg-[#E5391C] font-bold px-3 py-1 rounded-md shadow-xs">
            Live Lab 02
          </span>
          <span className="text-base sm:text-xl font-bold text-[#2D2D2E] font-serif-display">
            The Interaction Loop & The Role of System Feedback
          </span>
        </div>

        {/* Feedback Mode Selectors */}
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-[#6E6D70] font-mono font-bold hidden xl:inline">
            SIMULATE FEEDBACK STATE:
          </span>
          <button
            onClick={() => {
              setMode('rich');
              resetExperiment();
            }}
            className={`px-3.5 py-2 text-xs sm:text-sm rounded-xl font-bold transition-all cursor-pointer shadow-xs ${
              mode === 'rich'
                ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-300'
                : 'bg-white border border-[#E8E2D9] text-[#2D2D2E] hover:bg-emerald-50'
            }`}
          >
            1. Rich Immediate Feedback
          </button>
          <button
            onClick={() => {
              setMode('none');
              resetExperiment();
            }}
            className={`px-3.5 py-2 text-xs sm:text-sm rounded-xl font-bold transition-all cursor-pointer shadow-xs ${
              mode === 'none'
                ? 'bg-red-600 text-white shadow-md ring-2 ring-red-300'
                : 'bg-white border border-[#E8E2D9] text-[#2D2D2E] hover:bg-red-50'
            }`}
          >
            2. Broken (Zero Feedback)
          </button>
          <button
            onClick={() => {
              setMode('delayed');
              resetExperiment();
            }}
            className={`px-3.5 py-2 text-xs sm:text-sm rounded-xl font-bold transition-all cursor-pointer shadow-xs ${
              mode === 'delayed'
                ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-300'
                : 'bg-white border border-[#E8E2D9] text-[#2D2D2E] hover:bg-amber-50'
            }`}
          >
            3. Delayed Latency (4.5s)
          </button>
          <button
            onClick={resetExperiment}
            className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm text-[#6E6D70] bg-white border border-[#E8E2D9] rounded-xl hover:text-[#2D2D2E] hover:bg-[#F5F2ED] cursor-pointer"
            title="Reset simulation balance"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Dual Stage: Interaction Terminal on Left, Live Loop State Diagram on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 flex-1 py-4 items-stretch">
        {/* Left: The Bursar Payment Terminal (7 cols) */}
        <div className="lg:col-span-7 bg-white border-2 border-[#E8E2D9] rounded-2xl p-6 lg:p-8 xl:p-10 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F0EBE3]">
              <div>
                <div className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#E5391C] font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#E5391C]" />
                  <span>UM6P Student Finance Portal · Benguerir</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2D2D2E] font-serif-display mt-1">
                  Lab Materials Fee Payment
                </h3>
              </div>
              <div className="text-right bg-stone-50 px-4 py-2.5 rounded-xl border border-stone-200">
                <div className="text-xs text-[#6E6D70] font-mono">Bursar Balance</div>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-[#2D2D2E]">
                  {balance} <span className="text-sm font-sans font-normal text-stone-500">MAD</span>
                </div>
              </div>
            </div>

            {duplicateWarning && (
              <div className="mb-5 p-4 sm:p-5 bg-red-50 border-2 border-red-400 rounded-xl text-red-950 text-base sm:text-lg flex items-start gap-3 shadow-md animate-in fade-in slide-in-from-top-2">
                <AlertOctagon className="w-7 h-7 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-lg sm:text-xl font-bold text-red-900 mb-1 font-serif-display">
                    COGNITIVE BREAKDOWN REVELATION:
                  </strong>
                  {duplicateWarning}
                </div>
              </div>
            )}

            {/* Item Details Box */}
            <div className="bg-[#FAF9F6] rounded-xl p-5 sm:p-6 mb-5 border border-[#E8E2D9] space-y-3.5">
              <div className="flex justify-between text-base sm:text-lg text-[#6E6D70]">
                <span>Item:</span>
                <span className="text-[#2D2D2E] font-semibold">HCI Interaction Hardware Kit (Sensor Pod + Microcontroller)</span>
              </div>
              <div className="flex justify-between text-base sm:text-lg text-[#6E6D70]">
                <span>Payee:</span>
                <span className="text-[#2D2D2E] font-semibold">UM6P School of Computer Science</span>
              </div>
              <div className="flex justify-between text-base sm:text-lg text-[#6E6D70] pt-3.5 border-t border-[#E8E2D9]">
                <span className="font-bold text-[#2D2D2E]">Amount to Charge:</span>
                <span className="text-[#E5391C] font-mono font-bold text-2xl sm:text-3xl">250.00 MAD</span>
              </div>
            </div>
          </div>

          {/* Interactive Button & Telemetry */}
          {receipts.length > 0 && mode === 'rich' ? (
            <div className="p-6 bg-emerald-50 border-2 border-emerald-400 rounded-xl text-center space-y-3 shadow-sm">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <div className="font-bold text-emerald-900 text-2xl sm:text-3xl font-serif-display">
                Payment Successfully Confirmed
              </div>
              <div className="text-sm sm:text-base font-mono text-emerald-800">
                Auth Code: {receipts[0].id} · Timestamp: {receipts[0].time}
              </div>
              <div className="text-base text-emerald-900 pt-2 border-t border-emerald-200">
                Remaining Bursar Balance: <strong className="font-mono font-bold text-xl">{balance} MAD</strong>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Delayed Latency Progress Indicator (Simulated in Delayed Mode) */}
              {mode === 'delayed' && isDelayedPending && (
                <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-mono font-bold text-amber-900">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-600 animate-spin" />
                      4.5s Latency Window (Dead silence from server...)
                    </span>
                    <span>{delayedProgress}% Elapsed</span>
                  </div>
                  <div className="h-2 w-full bg-amber-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-600 transition-all duration-100 ease-linear"
                      style={{ width: `${delayedProgress}%` }}
                    />
                  </div>
                  <div className="text-xs text-amber-800 font-medium">
                    ⚠️ The button appears completely dead! Notice how you want to click again...
                  </div>
                </div>
              )}

              <button
                onClick={handlePay}
                disabled={isProcessing && mode === 'rich'}
                className={`w-full py-4 sm:py-5 px-6 rounded-xl font-bold text-lg sm:text-xl transition-all duration-150 flex items-center justify-center gap-3 cursor-pointer shadow-md ${
                  mode === 'rich'
                    ? isProcessing
                      ? 'bg-amber-600 text-white cursor-wait'
                      : 'bg-[#E5391C] hover:bg-[#C92B10] text-white active:scale-98'
                    : mode === 'delayed'
                    ? isDelayedPending
                      ? 'bg-[#E5391C] hover:bg-[#C92B10] text-white active:scale-98'
                      : 'bg-[#E5391C] hover:bg-[#C92B10] text-white active:scale-98'
                    : 'bg-[#E5391C] hover:bg-[#C92B10] text-white active:scale-98'
                }`}
              >
                {mode === 'rich' && isProcessing ? (
                  <>
                    <RefreshCw className="w-6 h-6 animate-spin" />
                    <span>Contacting Banking Network (Encrypted)...</span>
                  </>
                ) : (
                  <>
                    <span>Authorize Payment (250 MAD)</span>
                    <ArrowRight className="w-6 h-6" />
                  </>
                )}
              </button>

              {/* Status callout */}
              {statusMessage && (
                <div className="p-3 bg-[#FAF9F6] border border-[#D5CFC7] rounded-xl text-center text-sm sm:text-base font-mono text-[#2D2D2E] font-bold">
                  {statusMessage}
                </div>
              )}

              {/* Live telemetry counters */}
              <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-[#6E6D70] pt-2 border-t border-[#F0EBE3]">
                <span>
                  Physical clicks registered: <strong className="text-lg text-[#2D2D2E] font-bold">{clicks}</strong>
                </span>
                <span>
                  Active Mode: <strong className="text-base text-[#E5391C] font-bold">{mode.toUpperCase()}</strong>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right: The Theoretical Interaction Loop Diagram (5 cols) */}
        <div className="lg:col-span-5 bg-white border-2 border-[#E8E2D9] rounded-2xl p-6 lg:p-8 shadow-xs flex flex-col justify-between">
          <div className="text-xs uppercase font-mono tracking-wider text-[#6E6D70] font-bold pb-3 border-b border-[#F0EBE3]">
            Norman's Seven Stages of Action (Live State)
          </div>

          <div className="space-y-3 my-auto">
            {[
              { step: 1, title: '1. Goal / Intent', desc: 'User forms mental intention: "Pay 250 MAD lab fee."' },
              { step: 2, title: '2. Physical Action', desc: 'Finger presses mouse button or touchscreen target.' },
              { step: 3, title: '3. System State Change', desc: 'Server deducts funds, commits DB records.' },
              { step: 4, title: '4. Sensory Feedback', desc: 'Screen emits immediate visual/auditory confirmation.' },
              { step: 5, title: '5. Human Evaluation', desc: 'User confirms goal achieved and closes loop.' },
            ].map(item => {
              const isActive = activeLoopStep === item.step;
              const isBrokenHere = (mode === 'none' || mode === 'delayed') && (item.step === 4 || item.step === 5);

              return (
                <div
                  key={item.step}
                  className={`p-4 rounded-xl border transition-all ${
                    isBrokenHere && clicks > 0
                      ? 'border-2 border-red-500 bg-red-50 text-red-950 shadow-sm'
                      : isActive
                      ? 'border-2 border-[#E5391C] bg-[#FDF5F2] text-[#2D2D2E] shadow-sm'
                      : 'border-[#E8E2D9] bg-[#FAF9F6] text-[#6E6D70]'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-base sm:text-lg mb-1">
                    <span className="text-[#2D2D2E]">{item.title}</span>
                    {isBrokenHere && clicks > 0 && (
                      <span className="text-xs text-red-700 font-mono font-bold bg-white px-2 py-0.5 rounded border border-red-300">
                        BROKEN LINK
                      </span>
                    )}
                    {isActive && (!isBrokenHere || clicks === 0) && (
                      <span className="text-xs text-[#E5391C] font-mono font-bold bg-white px-2 py-0.5 rounded border border-[#FAD6CF]">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-[#525254] leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#F0EBE3] text-sm text-[#6E6D70] italic">
            "When feedback is absent or delayed beyond 400ms, the human brain assumes the action failed and re-attempts it."
          </div>
        </div>
      </div>

      {/* Classroom Takeaway Banner */}
      <div className="p-4 sm:p-5 lg:p-6 bg-gradient-to-r from-red-50/70 via-white to-amber-50/50 border-2 border-red-200/80 rounded-2xl flex items-center justify-between shadow-xs flex-shrink-0">
        <p className="text-base sm:text-lg lg:text-xl text-[#2D2D2E] leading-relaxed">
          <strong className="text-[#E5391C] font-serif-display text-lg sm:text-xl lg:text-2xl font-bold mr-2">
            Pedagogical Core:
          </strong>
          Feedback is not a cosmetic perk. It is an indispensable sensory confirmation loop required by human cognitive architecture to confirm that physical effort caused the intended system transformation.
        </p>
      </div>
    </div>
  );
};
