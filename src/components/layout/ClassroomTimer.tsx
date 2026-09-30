import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, X, Clock, Bell } from 'lucide-react';

interface ClassroomTimerProps {
  initialSeconds?: number;
  label?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ClassroomTimer: React.FC<ClassroomTimerProps> = ({
  initialSeconds = 120,
  label = 'Classroom Activity',
  isOpen,
  onClose,
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  useEffect(() => {
    setSeconds(initialSeconds);
    setIsRunning(false);
    setHasFinished(false);
  }, [initialSeconds, isOpen]);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) {
            setIsRunning(false);
            setHasFinished(true);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  if (!isOpen) return null;

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePreset = (sec: number) => {
    setSeconds(sec);
    setIsRunning(false);
    setHasFinished(false);
  };

  return (
    <div className="fixed bottom-16 right-6 z-50 bg-white border-2 border-[#D7492A] rounded-2xl shadow-2xl p-4 w-80 text-[#2D2D2E] backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE3]">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#D7492A]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#2D2D2E]">Classroom Timer</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded text-[#6E6D70] hover:text-[#2D2D2E] hover:bg-[#F5F2ED]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="text-center py-4">
        <div className="text-[11px] text-[#6E6D70] font-medium mb-1 truncate px-2">{label}</div>
        <div
          className={`text-5xl font-mono font-bold tracking-tight ${
            hasFinished
              ? 'text-red-600 animate-bounce'
              : seconds < 30 && isRunning
              ? 'text-[#D7492A] animate-pulse'
              : 'text-[#2D2D2E]'
          }`}
        >
          {formatTime(seconds)}
        </div>
        {hasFinished && (
          <div className="text-xs text-red-600 font-bold flex items-center justify-center gap-1 mt-1">
            <Bell className="w-3.5 h-3.5 animate-spin" />
            <span>Time Expired — Convene Classroom</span>
          </div>
        )}
      </div>

      {/* Main Controls */}
      <div className="flex items-center justify-center gap-2 pb-3">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm ${
            isRunning
              ? 'bg-amber-600 hover:bg-amber-700 text-white'
              : 'bg-[#D7492A] hover:bg-[#B83519] text-white'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span>Start</span>
            </>
          )}
        </button>

        <button
          onClick={() => {
            setIsRunning(false);
            setSeconds(initialSeconds);
            setHasFinished(false);
          }}
          className="p-2 rounded-xl bg-[#FAF9F6] border border-[#D5CFC7] text-[#6E6D70] hover:text-[#2D2D2E] hover:bg-[#F5F2ED]"
          title="Reset Timer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Fast Presets */}
      <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-[#F0EBE3] text-[11px] font-mono">
        <button
          onClick={() => handlePreset(30)}
          className="py-1 bg-[#FAF9F6] border border-[#E8E2D9] rounded-lg text-[#6E6D70] hover:text-[#D7492A] hover:border-[#D7492A]"
        >
          30s
        </button>
        <button
          onClick={() => handlePreset(60)}
          className="py-1 bg-[#FAF9F6] border border-[#E8E2D9] rounded-lg text-[#6E6D70] hover:text-[#D7492A] hover:border-[#D7492A]"
        >
          1m
        </button>
        <button
          onClick={() => handlePreset(120)}
          className="py-1 bg-[#FAF9F6] border border-[#E8E2D9] rounded-lg text-[#6E6D70] hover:text-[#D7492A] hover:border-[#D7492A]"
        >
          2m
        </button>
        <button
          onClick={() => handlePreset(180)}
          className="py-1 bg-[#FAF9F6] border border-[#E8E2D9] rounded-lg text-[#6E6D70] hover:text-[#D7492A] hover:border-[#D7492A]"
        >
          3m
        </button>
      </div>
    </div>
  );
};
