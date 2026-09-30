import React from 'react';
import { X, Layers, CheckCircle } from 'lucide-react';
import { SlideData } from '../../types';
import { ACTS_METADATA } from '../../data/slides';

interface SlideNavigatorProps {
  slides: SlideData[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectSlide: (index: number) => void;
}

export const SlideNavigator: React.FC<SlideNavigatorProps> = ({
  slides,
  currentIndex,
  isOpen,
  onClose,
  onSelectSlide,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-150">
      <div className="bg-white border border-[#E8E2D9] rounded-2xl w-full max-w-5xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#F0EBE3]">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-[#D7492A]" />
            <div>
              <h2 className="text-base font-bold text-[#2D2D2E] font-serif-display">Session 1 Master Slide Index</h2>
              <p className="text-xs text-[#6E6D70]">44 Slides across 6 Pedagogical Acts</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6E6D70] hover:text-[#2D2D2E] hover:bg-[#F5F2ED] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Grouped by Act */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {ACTS_METADATA.map(act => {
            const actSlides = slides.filter(s => s.act === act.id);

            return (
              <div key={act.id} className="space-y-3">
                <div className="flex items-center justify-between pb-1.5 border-b border-[#F0EBE3]">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: act.color }}
                    />
                    <h3 className="text-xs font-mono font-bold tracking-wider text-[#2D2D2E] uppercase">
                      {act.title}
                    </h3>
                    <span className="text-xs text-[#6E6D70]">· {act.subtitle}</span>
                  </div>
                  <span className="text-xs font-mono text-[#6E6D70]">{act.slidesRange}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {actSlides.map(s => {
                    const slideIdx = slides.findIndex(item => item.id === s.id);
                    const isActive = slideIdx === currentIndex;

                    return (
                      <div
                        key={s.id}
                        onClick={() => {
                          onSelectSlide(slideIdx);
                          onClose();
                        }}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          isActive
                            ? 'border-[#D7492A] bg-[#FDF5F2] shadow-xs'
                            : 'border-[#E8E2D9] bg-[#FAF9F6] hover:bg-white hover:border-[#D5CFC7]'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-mono mb-1">
                          <span className={isActive ? 'text-[#D7492A] font-bold' : 'text-[#6E6D70]'}>
                            #{s.id}
                          </span>
                          {isActive && <CheckCircle className="w-3.5 h-3.5 text-[#D7492A]" />}
                          {s.experimentId && !isActive && (
                            <span className="text-[10px] text-[#D7492A] bg-[#FDF5F2] px-1.5 py-0.5 rounded font-bold">
                              Lab
                            </span>
                          )}
                        </div>
                        <div className="text-xs font-semibold text-[#2D2D2E] line-clamp-2 leading-snug">
                          {s.title}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
