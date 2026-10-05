import React from 'react';
import { X, Clock, Lightbulb, MessageSquare, Compass, BookOpen, Check } from 'lucide-react';
import { SlideData } from '../../types';

interface PresenterNotesProps {
  slide: SlideData;
  isOpen: boolean;
  onClose: () => void;
  currentSlideIndex: number;
  totalSlides: number;
}

export const PresenterNotes: React.FC<PresenterNotesProps> = ({
  slide,
  isOpen,
  onClose,
  currentSlideIndex,
  totalSlides,
}) => {
  if (!isOpen) return null;

  return (
    <aside
      aria-label="Presenter Notes"
      className="fixed inset-y-0 right-0 z-50 w-96 bg-white/95 border-l border-[#E8E2D9] backdrop-blur-xl shadow-2xl p-6 flex flex-col justify-between overflow-y-auto text-[#2D2D2E]"
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F0EBE3]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#E5391C]" />
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#2D2D2E] font-bold">Presenter Teleprompter</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#6E6D70] hover:text-[#2D2D2E] hover:bg-[#F5F2ED] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Slide Position & Timing Indicator */}
        <div className="flex items-center justify-between bg-[#FAF9F6] p-3 rounded-xl border border-[#E8E2D9] mb-5 text-xs font-mono">
          <div>
            <span className="text-[#6E6D70]">Slide </span>
            <strong className="text-[#2D2D2E] font-bold">{currentSlideIndex + 1}</strong>
            <span className="text-[#6E6D70]"> of {totalSlides}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#E5391C] font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>Target: ~{slide.speakerNotes?.timingMin || 5} min</span>
          </div>
        </div>

        {/* Section 1: Spoken Script & Opening Hook */}
        {slide.speakerNotes?.spokenScriptAdvice && (
          <div className="mb-5 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#E5391C] font-bold">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Suggested Spoken Script</span>
            </div>
            <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-[#E8E2D9] text-xs text-[#2D2D2E] leading-relaxed italic font-serif">
              "{slide.speakerNotes.spokenScriptAdvice}"
            </div>
          </div>
        )}

        {/* Section 2: Key Theoretical Points */}
        {slide.speakerNotes?.keyPoints && slide.speakerNotes.keyPoints.length > 0 && (
          <div className="mb-5 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Key Points to Cover</span>
            </div>
            <ul className="space-y-2 text-xs text-[#525254] leading-relaxed">
              {slide.speakerNotes.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-[#FAF9F6] p-2.5 rounded-lg border border-[#E8E2D9]">
                  <span className="text-[#E5391C] font-bold font-mono">▸</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Section 3: Classroom Facilitation Strategy */}
        {slide.speakerNotes?.classroomFacilitationTip && (
          <div className="mb-5 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#6E6D70] font-bold">
              <Compass className="w-3.5 h-3.5" />
              <span>Classroom Facilitation Strategy</span>
            </div>
            <p className="text-xs text-[#525254] leading-relaxed bg-[#FDF5F2] p-3 rounded-xl border border-[#F0D5CB]">
              {slide.speakerNotes.classroomFacilitationTip}
            </p>
          </div>
        )}
      </div>

      {/* Footer shortcut reminder */}
      <div className="pt-4 border-t border-[#F0EBE3] text-center text-[11px] font-mono text-[#6E6D70]">
        Press <kbd className="px-1 py-0.5 bg-[#FAF9F6] border border-[#D5CFC7] rounded text-[#2D2D2E]">P</kbd> or <kbd className="px-1 py-0.5 bg-[#FAF9F6] border border-[#D5CFC7] rounded text-[#2D2D2E]">Esc</kbd> to toggle teleprompter
      </div>
    </aside>
  );
};
