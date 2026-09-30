import React, { useState } from 'react';
import { RefreshCw, CheckCircle, AlertTriangle, ArrowRight, ShieldCheck, Sparkles, Volume2, VolumeX } from 'lucide-react';

type FeedbackMode = 'rich' | 'none' | 'delayed';

export const Experiment2Loop: React.FC = () => {
  const [mode, setMode] = useState<FeedbackMode>('rich');
  const [balance, setBalance] = useState(1200);
  const [isProcessing, setIsProcessing] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<{ id: string; amount: number; time: string } | null>(null);
  const [duplicateWarning, setDuplicateWarning] = useState(false);
  const [activeLoopStep, setActiveLoopStep] = useState<number>(1);

  const resetExperiment = () => {
    setBalance(1200);
    setIsProcessing(false);
    setClicks(0);
    setStatusMessage(null);
    setReceipt(null);
    setDuplicateWarning(false);
    setActiveLoopStep(1);
  };

  const handlePay = () => {
    const newClickCount = clicks + 1;
    setClicks(newClickCount);

    if (mode === 'rich') {
      // Full feedback loop
      setActiveLoopStep(2); // Action
      setIsProcessing(true);
      setStatusMessage('Encrypting payload & contacting Bank of Morocco...');

      setTimeout(() => {
        setActiveLoopStep(3); // System Processing
        setStatusMessage('Deducting 250 MAD from Student Bursar Account...');
      }, 700);

      setTimeout(() => {
        setActiveLoopStep(4); // Feedback delivered
        setIsProcessing(false);
        setBalance(prev => prev - 250);
        setStatusMessage('Payment Confirmed');
        setReceipt({
          id: 'TXN-UM6P-' + Math.floor(100000 + Math.random() * 900000),
          amount: 250,
          time: new Date().toLocaleTimeString(),
        });
      }, 1600);
    } else if (mode === 'none') {
      // Degraded: Zero feedback! Button does not show active state, no spinner
      if (newClickCount > 1) {
        // Punish duplicate click
        setBalance(prev => prev - 250);
        setDuplicateWarning(true);
      } else {
        // Silently deduct in background without telling user
        setTimeout(() => {
          setBalance(prev => prev - 250);
        }, 1200);
      }
    } else if (mode === 'delayed') {
      // Delayed feedback: 4.5 seconds of dead silence
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setBalance(prev => prev - 250);
        setStatusMessage('Operation resolved after unexpected latency.');
      }, 4500);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 lg:p-6 bg-[#FAF9F6]">
      {/* Top Controller Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E8E2D9]">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase font-mono tracking-wider text-white bg-[#D7492A] font-bold px-3 py-1 rounded">
            Live Laboratory Experiment 02
          </span>
          <span className="text-sm font-semibold text-[#2D2D2E]">
            The Interaction Loop & The Role of System Feedback
          </span>
        </div>

        {/* Feedback Mode Selectors */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#6E6D70] font-medium">Feedback Condition:</span>
          <button
            onClick={() => {
              setMode('rich');
              resetExperiment();
            }}
            className={`px-3 py-1.5 text-xs rounded font-medium transition-colors ${
              mode === 'rich' ? 'bg-emerald-600 text-white' : 'bg-white border border-[#E8E2D9] text-[#2D2D2E]'
            }`}
          >
            1. Rich Immediate Feedback
          </button>
          <button
            onClick={() => {
              setMode('none');
              resetExperiment();
            }}
            className={`px-3 py-1.5 text-xs rounded font-medium transition-colors ${
              mode === 'none' ? 'bg-red-600 text-white' : 'bg-white border border-[#E8E2D9] text-[#2D2D2E]'
            }`}
          >
            2. Broken (Zero Feedback)
          </button>
          <button
            onClick={() => {
              setMode('delayed');
              resetExperiment();
            }}
            className={`px-3 py-1.5 text-xs rounded font-medium transition-colors ${
              mode === 'delayed' ? 'bg-amber-600 text-white' : 'bg-white border border-[#E8E2D9] text-[#2D2D2E]'
            }`}
          >
            3. Delayed Latency (4.5s)
          </button>
          <button
            onClick={resetExperiment}
            className="flex items-center gap-1 px-3 py-1.5 text-xs text-[#6E6D70] bg-white border border-[#E8E2D9] rounded hover:text-[#2D2D2E] hover:bg-[#F5F2ED]"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Main Dual Stage: Interaction Terminal on Left, Live Loop State Diagram on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto items-center">
        {/* Left: The Bursar Payment Terminal (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E8E2D9] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F0EBE3]">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#D7492A] font-bold">UM6P Student Finance Portal</div>
              <h3 className="text-lg font-semibold text-[#2D2D2E] font-serif-display">Lab Materials Fee Payment</h3>
            </div>
            <div className="text-right">
              <div className="text-xs text-[#6E6D70]">Current Balance</div>
              <div className="text-xl font-mono font-bold text-[#2D2D2E]">{balance} MAD</div>
            </div>
          </div>

          {duplicateWarning && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-sm font-bold text-red-900 mb-0.5">MULTIPLE CLICK PENALTY:</strong>
                Because the system gave no feedback, the user clicked repeatedly. The account has been double-billed! Current balance: {balance} MAD.
              </div>
            </div>
          )}

          <div className="bg-[#FAF9F6] rounded-xl p-4 mb-5 border border-[#E8E2D9] space-y-2">
            <div className="flex justify-between text-xs text-[#6E6D70]">
              <span>Item:</span>
              <span className="text-[#2D2D2E] font-medium">HCI Interaction Hardware Kit (Arduino + Sensor Pod)</span>
            </div>
            <div className="flex justify-between text-xs text-[#6E6D70]">
              <span>Payee:</span>
              <span className="text-[#2D2D2E] font-medium">UM6P School of Computer Science</span>
            </div>
            <div className="flex justify-between text-xs text-[#6E6D70] pt-2 border-t border-[#E8E2D9]">
              <span className="font-semibold text-[#2D2D2E]">Amount to Charge:</span>
              <span className="text-[#D7492A] font-mono font-bold text-base">250.00 MAD</span>
            </div>
          </div>

          {/* Interactive Button */}
          {receipt ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
              <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
              <div className="font-semibold text-emerald-900 text-base font-serif-display">Transaction Successful</div>
              <div className="text-xs font-mono text-emerald-700">Auth Ref: {receipt.id} · {receipt.time}</div>
              <div className="text-xs text-[#6E6D70]">Updated Balance: {balance} MAD</div>
            </div>
          ) : (
            <div className="space-y-3">
              <button
                onClick={handlePay}
                disabled={isProcessing && mode === 'rich'}
                className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-all duration-150 flex items-center justify-center gap-2 ${
                  mode === 'rich'
                    ? isProcessing
                      ? 'bg-amber-600 text-white cursor-wait'
                      : 'bg-[#D7492A] hover:bg-[#B83519] text-white shadow-md active:scale-98'
                    : mode === 'delayed' && isProcessing
                    ? 'bg-[#D7492A] text-white cursor-wait opacity-80'
                    : 'bg-[#D7492A] text-white active:bg-[#B83519]'
                }`}
              >
                {mode === 'rich' && isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing Transaction...</span>
                  </>
                ) : (
                  <>
                    <span>Authorize Payment (250 MAD)</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Status callout if rich mode */}
              {statusMessage && mode === 'rich' && (
                <div className="p-2.5 bg-[#FAF9F6] border border-[#D5CFC7] rounded-lg text-center text-xs font-mono text-[#2D2D2E]">
                  {statusMessage}
                </div>
              )}

              <div className="flex items-center justify-between text-xs font-mono text-[#6E6D70] pt-1">
                <span>Clicks registered: <strong>{clicks}</strong></span>
                <span>Mode: <strong className="text-[#2D2D2E]">{mode.toUpperCase()}</strong></span>
              </div>
            </div>
          )}
        </div>

        {/* Right: The Theoretical Interaction Loop Diagram (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#E8E2D9] rounded-2xl p-6 shadow-sm">
          <div className="text-xs uppercase font-mono tracking-wider text-[#6E6D70] font-bold mb-3 pb-2 border-b border-[#F0EBE3]">
            Norman's Interaction Cycle
          </div>

          <div className="space-y-2.5">
            {[
              { step: 1, title: '1. Human Intent / Goal', desc: 'User decides: "I want to pay my lab fee."' },
              { step: 2, title: '2. Physical Action', desc: 'Finger presses mouse button or touch target.' },
              { step: 3, title: '3. System State Change', desc: 'Server receives packet, deducts funds, updates DB.' },
              { step: 4, title: '4. Sensory Feedback', desc: 'System emits visual/auditory signal confirming state change.' },
              { step: 5, title: '5. Human Evaluation', desc: 'User perceives feedback and updates internal mental model.' },
            ].map(item => {
              const isActive = activeLoopStep === item.step;
              const isBrokenHere = mode === 'none' && (item.step === 4 || item.step === 5);

              return (
                <div
                  key={item.step}
                  className={`p-3 rounded-xl border text-xs transition-all ${
                    isBrokenHere
                      ? 'border-red-400 bg-red-50 text-red-900'
                      : isActive
                      ? 'border-[#D7492A] bg-[#FDF5F2] text-[#2D2D2E] shadow-xs'
                      : 'border-[#E8E2D9] bg-[#FAF9F6] text-[#6E6D70]'
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold mb-1">
                    <span className="text-[#2D2D2E]">{item.title}</span>
                    {isBrokenHere && <span className="text-[10px] text-red-600 font-mono font-bold">BROKEN LINK</span>}
                    {isActive && !isBrokenHere && <span className="text-[10px] text-[#D7492A] font-mono font-bold">ACTIVE</span>}
                  </div>
                  <p className="text-xs text-[#525254] leading-snug">{item.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-[#F0EBE3] text-xs text-[#6E6D70] italic">
            "When feedback is absent or delayed, the human brain assumes the action failed and re-attempts it."
          </div>
        </div>
      </div>

      {/* Classroom Takeaway Banner */}
      <div className="p-4 bg-white border border-[#E8E2D9] rounded-xl flex items-center justify-between shadow-xs">
        <p className="text-xs text-[#2D2D2E] leading-relaxed">
          <strong className="text-[#D7492A] font-serif-display text-base font-bold mr-1">Pedagogical Core:</strong> Feedback is not a cosmetic
          perk. It is an indispensable sensory confirmation loop required by human cognitive architecture to confirm that
          physical effort caused the intended system transformation.
        </p>
      </div>
    </div>
  );
};
