import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  BookOpen,
  Layers,
  Clock,
  Sparkles,
} from 'lucide-react';
import { SLIDES_DATA, ACTS_METADATA } from '../../data/slides';
import { SlideRenderer } from '../slides/SlideRenderer';
import { PresenterNotes } from './PresenterNotes';
import { SlideNavigator } from './SlideNavigator';
import { ClassroomTimer } from './ClassroomTimer';
import { SlideTransition } from '../transitions/SlideTransition';
import { UM6PLogo } from '../brand/UM6PLogo';
import { CurriculumModal } from './CurriculumModal';

export const SlideDeck: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPresenterNotesOpen, setIsPresenterNotesOpen] = useState<boolean>(false);
  const [isNavigatorOpen, setIsNavigatorOpen] = useState<boolean>(false);
  const [isCurriculumOpen, setIsCurriculumOpen] = useState<boolean>(false);
  const [isTimerOpen, setIsTimerOpen] = useState<boolean>(false);
  const [timerDuration, setTimerDuration] = useState<number>(120);
  const [timerLabel, setTimerLabel] = useState<string>('Classroom Activity');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const currentSlide = SLIDES_DATA[currentIndex];
  const currentAct = ACTS_METADATA.find(a => a.id === currentSlide.act);
  const progressPercent = ((currentIndex + 1) / SLIDES_DATA.length) * 100;

  // Slide navigation methods
  const goToNextSlide = useCallback(() => {
    setCurrentIndex(prev => {
      if (prev < SLIDES_DATA.length - 1) {
        setDirection(1);
        return prev + 1;
      }
      return prev;
    });
  }, []);

  const goToPrevSlide = useCallback(() => {
    setCurrentIndex(prev => {
      if (prev > 0) {
        setDirection(-1);
        return prev - 1;
      }
      return prev;
    });
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < SLIDES_DATA.length) {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    }
  }, [currentIndex]);

  const openTimerWithSettings = (seconds: number, label: string) => {
    setTimerDuration(seconds);
    setTimerLabel(label);
    setIsTimerOpen(true);
  };

  // Keyboard navigation handler (with safety check for text input typing)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If typing inside an input or textarea, don't hijack slide keys
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        if (e.key === 'Escape') {
          (document.activeElement as HTMLElement)?.blur();
        }
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
        case 'PageDown':
          e.preventDefault();
          goToNextSlide();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          goToPrevSlide();
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(SLIDES_DATA.length - 1);
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          setIsPresenterNotesOpen(prev => !prev);
          break;
        case 'c':
        case 'C':
          e.preventDefault();
          setIsCurriculumOpen(prev => !prev);
          break;
        case 'g':
        case 'G':
        case 'o':
        case 'O':
          e.preventDefault();
          setIsNavigatorOpen(prev => !prev);
          break;
        case 't':
        case 'T':
          e.preventDefault();
          setIsTimerOpen(prev => !prev);
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'Escape':
          setIsPresenterNotesOpen(false);
          setIsNavigatorOpen(false);
          setIsCurriculumOpen(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextSlide, goToPrevSlide, goToSlide]);

  // Fullscreen toggle handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen bg-[#F6F4EF] text-[#2D2D2E] overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Top Thin UM6P Terracotta Progress Bar */}
      <div className="h-1.5 w-full bg-[#E8E2D9] overflow-hidden relative z-30">
        <div
          className="h-full transition-all duration-300 ease-out"
          style={{
            width: `${progressPercent}%`,
            backgroundColor: '#D7492A',
          }}
        />
      </div>

      {/* Main Slide Canvas Container (Constrained to 16:9 Projector Ratio) */}
      <main className="flex-1 w-full max-w-[1920px] mx-auto p-2 sm:p-4 lg:p-5 flex items-center justify-center overflow-hidden relative">
        <div className="w-full h-full max-h-[92vh] aspect-[16/9] bg-white border border-[#E8E2D9] rounded-2xl um6p-canvas-shadow overflow-hidden relative flex flex-col justify-between">
          <SlideTransition slideKey={currentIndex} direction={direction}>
            <SlideRenderer
              slide={currentSlide}
              onNextSlide={goToNextSlide}
              onOpenTimer={openTimerWithSettings}
            />
          </SlideTransition>
        </div>
      </main>

      {/* Bottom Master Presentation Control Bar (UM6P Light Identity) */}
      <footer className="h-14 bg-white/95 border-t border-[#E8E2D9] px-4 lg:px-8 flex items-center justify-between text-xs font-mono relative z-40 backdrop-blur-md shadow-xs">
        {/* Left: UM6P Logo, Act Pill & Slide Counter */}
        <div className="flex items-center gap-3 sm:gap-5">
          <UM6PLogo variant="compact" theme="color" className="h-6 hidden md:inline-flex" />

          <div className="h-4 w-[1px] bg-[#E8E2D9] hidden md:block" />

          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: currentAct?.color || '#D7492A' }}
            />
            <span className="font-bold text-[#2D2D2E] uppercase tracking-wider text-[11px] hidden sm:inline">
              {currentAct?.title || 'ACT 1'}
            </span>
          </div>

          <div className="text-[#6E6D70] text-xs">
            <strong className="text-[#2D2D2E] font-bold">{currentIndex + 1}</strong>
            <span className="text-[#C5BFB7] mx-1">/</span>
            <span>{SLIDES_DATA.length}</span>
          </div>

          {currentSlide.experimentId && (
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-[#D7492A] bg-[#FDF5F2] px-2.5 py-0.5 rounded-full border border-[#F0D5CB] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              Live Interactive Lab
            </span>
          )}
        </div>

        {/* Center: Slide Title Hint */}
        <div className="hidden lg:block text-[#6E6D70] text-xs font-medium max-w-md truncate">
          {currentSlide.title}
        </div>

        {/* Right: Presentation Tools & Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* 12 Sessions Curriculum Modal Toggle */}
          <button
            onClick={() => setIsCurriculumOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF9F6] border border-[#E8E2D9] text-[#2D2D2E] hover:bg-[#F5F2ED] transition-colors cursor-pointer"
            title="12-Session Curriculum (Key: C)"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D7492A]" />
            <span className="hidden sm:inline text-[11px] font-semibold">12 Sessions (C)</span>
          </button>

          {/* Navigator Toggle Button (O or G) */}
          <button
            onClick={() => setIsNavigatorOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF9F6] border border-[#E8E2D9] text-[#2D2D2E] hover:bg-[#F5F2ED] transition-colors cursor-pointer"
            title="Slide Navigator (Key: G or O)"
          >
            <Layers className="w-3.5 h-3.5 text-[#D7492A]" />
            <span className="hidden sm:inline text-[11px] font-semibold">Navigator</span>
          </button>

          {/* Presenter Teleprompter Toggle (P) */}
          <button
            onClick={() => setIsPresenterNotesOpen(prev => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-semibold transition-colors ${
              isPresenterNotesOpen
                ? 'bg-[#FDF5F2] border-[#D7492A] text-[#D7492A]'
                : 'bg-[#FAF9F6] border-[#E8E2D9] text-[#2D2D2E] hover:bg-[#F5F2ED]'
            }`}
            title="Presenter Notes (Key: P)"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Notes (P)</span>
          </button>

          {/* Classroom Timer Toggle (T) */}
          <button
            onClick={() => setIsTimerOpen(prev => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-semibold transition-colors ${
              isTimerOpen
                ? 'bg-[#FDF5F2] border-[#D7492A] text-[#D7492A]'
                : 'bg-[#FAF9F6] border-[#E8E2D9] text-[#2D2D2E] hover:bg-[#F5F2ED]'
            }`}
            title="Classroom Timer (Key: T)"
          >
            <Clock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Timer (T)</span>
          </button>

          {/* Fullscreen Toggle (F) */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-[#FAF9F6] border border-[#E8E2D9] text-[#6E6D70] hover:text-[#2D2D2E] hover:bg-[#F5F2ED] transition-colors"
            title="Fullscreen (Key: F)"
          >
            {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
          </button>

          {/* Previous Slide Button */}
          <button
            onClick={goToPrevSlide}
            disabled={currentIndex === 0}
            className="p-2 rounded-lg bg-[#FAF9F6] border border-[#E8E2D9] text-[#2D2D2E] hover:bg-[#F5F2ED] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Previous Slide (Left Arrow)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Next Slide Button (UM6P Orange) */}
          <button
            onClick={goToNextSlide}
            disabled={currentIndex === SLIDES_DATA.length - 1}
            className="px-4 py-1.5 rounded-lg bg-[#D7492A] hover:bg-[#B83519] text-white font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1 shadow-sm"
            title="Next Slide (Right Arrow or Space)"
          >
            <span className="text-[11px]">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>

      {/* Presenter Teleprompter Drawer Overlay */}
      <PresenterNotes
        slide={currentSlide}
        isOpen={isPresenterNotesOpen}
        onClose={() => setIsPresenterNotesOpen(false)}
        currentSlideIndex={currentIndex}
        totalSlides={SLIDES_DATA.length}
      />

      {/* Slide Navigator Modal Overlay */}
      <SlideNavigator
        slides={SLIDES_DATA}
        currentIndex={currentIndex}
        isOpen={isNavigatorOpen}
        onClose={() => setIsNavigatorOpen(false)}
        onSelectSlide={goToSlide}
      />

      {/* Floating Classroom Timer Widget */}
      <ClassroomTimer
        initialSeconds={timerDuration}
        label={timerLabel}
        isOpen={isTimerOpen}
        onClose={() => setIsTimerOpen(false)}
      />

      {/* 12-Session Curriculum Architecture Modal */}
      <CurriculumModal
        isOpen={isCurriculumOpen}
        onClose={() => setIsCurriculumOpen(false)}
        currentSessionId={1}
      />
    </div>
  );
};
