import React, { useState, useSyncExternalStore } from 'react';
import { Lock, Mail, KeyRound, ArrowLeft } from 'lucide-react';
import { UM6PLogo } from '../brand/UM6PLogo';
import { TEACHER_EMAIL, consumeAuthRedirect, getSession, isBackendConfigured, requestOtp, subscribeSession, verifyOtp } from '../../lib/backend';

// Runs once at load: finishes the sign-in when the teacher arrives from the link in the e-mail.
consumeAuthRedirect();
if (typeof window !== 'undefined') window.addEventListener('hashchange', consumeAuthRedirect);

/** True while a verified teacher session exists (re-renders on sign-in and sign-out). */
export const useTeacherAuthed = (): boolean => {
  const email = useSyncExternalStore(
    subscribeSession,
    () => getSession()?.email ?? '',
    () => '',
  );
  return email !== '';
};

const leaveTeacherMode = () => {
  const url = new URL(window.location.href);
  url.searchParams.delete('teacher');
  window.location.href = url.toString();
};

/**
 * Full-screen sign-in for ?teacher. One e-mail address is accepted; it receives a one-time code.
 * (The real enforcement is in the database: this screen only collects the code.)
 */
export const TeacherGate: React.FC = () => {
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const configured = isBackendConfigured();

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await requestOtp(email);
      setStep('code');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send the code.');
    } finally {
      setBusy(false);
    }
  };

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await verifyOtp(email, code);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'The code was not accepted.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] bg-[#FAF9F6] flex items-center justify-center p-6 select-text">
      <div className="w-full max-w-md bg-white border border-[#E8E2D9] rounded-3xl shadow-xl p-8 space-y-6">
        <div className="flex items-center justify-between">
          <UM6PLogo variant="compact" theme="color" className="h-8 w-auto" />
          <span className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#E5391C] font-bold">
            <Lock className="w-3.5 h-3.5" /> Teacher access
          </span>
        </div>

        {!configured ? (
          <div className="space-y-3 text-sm text-[#525254] leading-relaxed">
            <h1 className="text-2xl font-serif-display font-medium text-[#2D2D2E]">Teacher mode is locked</h1>
            <p>
              The sign-in service is not set up yet, so teacher mode cannot be opened. Follow <strong>SETUP.md</strong> in
              the teacher folder, then rebuild.
            </p>
          </div>
        ) : step === 'email' ? (
          <form onSubmit={send} className="space-y-4">
            <div>
              <h1 className="text-2xl font-serif-display font-medium text-[#2D2D2E]">Sign in</h1>
              <p className="text-sm text-[#6E6D70] pt-1">We will e-mail you a one-time code.</p>
            </div>
            <label className="block space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-[#6E6D70] font-bold">E-mail</span>
              <div className="flex items-center gap-2 border border-[#E8E2D9] rounded-xl px-3 py-2.5 bg-[#FAF9F6] focus-within:border-[#E5391C]">
                <Mail className="w-4 h-4 text-[#E5391C]" />
                <input
                  type="email"
                  autoFocus
                  required
                  autoComplete="email"
                  placeholder={TEACHER_EMAIL}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm"
                />
              </div>
            </label>
            {error && <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
            <button
              type="submit"
              disabled={busy || !email}
              className="w-full py-2.5 rounded-xl bg-[#E5391C] hover:bg-[#C92B10] disabled:opacity-40 text-white font-bold text-sm cursor-pointer"
            >
              {busy ? 'Sending…' : 'Send me a code'}
            </button>
          </form>
        ) : (
          <form onSubmit={verify} className="space-y-4">
            <div>
              <h1 className="text-2xl font-serif-display font-medium text-[#2D2D2E]">Enter your code</h1>
              <p className="text-sm text-[#6E6D70] pt-1">
                Sent to <strong className="text-[#222222]">{email}</strong>. Type the code below, or click the link in the e-mail (open it in this same browser). It can take a minute; check spam too.
              </p>
            </div>
            <label className="block space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-[#6E6D70] font-bold">One-time code</span>
              <div className="flex items-center gap-2 border border-[#E8E2D9] rounded-xl px-3 py-2.5 bg-[#FAF9F6] focus-within:border-[#E5391C]">
                <KeyRound className="w-4 h-4 text-[#E5391C]" />
                <input
                  autoFocus
                  required
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={8}
                  placeholder="123456"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                  className="flex-1 bg-transparent outline-none text-lg font-mono tracking-[0.35em]"
                />
              </div>
            </label>
            {error && <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
            <button
              type="submit"
              disabled={busy || code.length < 6}
              className="w-full py-2.5 rounded-xl bg-[#E5391C] hover:bg-[#C92B10] disabled:opacity-40 text-white font-bold text-sm cursor-pointer"
            >
              {busy ? 'Checking…' : 'Verify and open teacher mode'}
            </button>
            <button
              type="button"
              onClick={() => {
                setStep('email');
                setCode('');
                setError('');
              }}
              className="w-full text-sm text-[#525254] hover:text-[#E5391C] cursor-pointer"
            >
              Use a different e-mail or resend
            </button>
          </form>
        )}

        <button
          onClick={leaveTeacherMode}
          className="flex items-center gap-1.5 text-sm text-[#6E6D70] hover:text-[#E5391C] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to the student view
        </button>
      </div>
    </div>
  );
};
