import React from 'react';
import {
  Brain, Eye, Activity, Clock, Target, Scale, Zap, Layers, Users, Code2, BarChart3, Compass,
  Gauge, ListChecks, FlaskConical, Sprout, HeartPulse, Landmark, Server, MousePointer, Timer,
  Lightbulb, Hand, Grid3x3, Shapes, Hourglass, Flag, Route, BookOpen, CheckCircle2, AlertTriangle,
} from 'lucide-react';
import { UM6PLogo } from '../brand/UM6PLogo';
import type { Badge, Heading, IconName, Tone } from '../../data/session2Types';

/**
 * Session 2 slide primitives.
 * Geometry and styling are copied from the validated Phase 1 demo (SlideDemoControlSample):
 *   canvas 1920x1080 · padding 48 · header 64 · footer 56 · content area 1824 x 816 (after py-6).
 * Typography is the validated scale ONLY:
 *   58 title · 42 subtitle · 34 body · 32 instruction · 30 card heading · 28 label ·
 *   26 / 24 secondary · 22 caption · 14-18 institutional chrome.
 * Never introduce another font size. If content does not fit: simplify or split the slide.
 */

export const ICONS: Record<IconName, React.ComponentType<{ className?: string }>> = {
  brain: Brain, eye: Eye, activity: Activity, clock: Clock, target: Target, scale: Scale,
  zap: Zap, layers: Layers, users: Users, code: Code2, chart: BarChart3, compass: Compass,
  gauge: Gauge, list: ListChecks, flask: FlaskConical, sprout: Sprout, heart: HeartPulse,
  landmark: Landmark, server: Server, pointer: MousePointer, timer: Timer, bulb: Lightbulb,
  hand: Hand, grid: Grid3x3, shapes: Shapes, hourglass: Hourglass, flag: Flag, route: Route,
  book: BookOpen, check: CheckCircle2, alert: AlertTriangle,
};

export const Icon: React.FC<{ name: IconName; className?: string }> = ({ name, className }) => {
  const C = ICONS[name];
  return <C className={className} />;
};

/** Tiny inline markup: **bold**, ==underlined key phrase==, _italic_. */
export const rich = (text: string): React.ReactNode => {
  const parts = text.split(/(\*\*[^*]+\*\*|==[^=]+==|_[^_]+_)/g);
  return parts.map((p, i) => {
    if (p.startsWith('**')) return <strong key={i} className="font-bold text-[#222222]">{p.slice(2, -2)}</strong>;
    if (p.startsWith('=='))
      return (
        <strong key={i} className="text-[#222222] font-bold underline decoration-[#E5391C] decoration-4 underline-offset-4">
          {p.slice(2, -2)}
        </strong>
      );
    if (p.startsWith('_') && p.endsWith('_') && p.length > 2) return <em key={i}>{p.slice(1, -1)}</em>;
    return <React.Fragment key={i}>{p}</React.Fragment>;
  });
};

export const TONES: Record<
  Tone,
  { dot: string; card: string; border: string; title: string; tag: string; chip: string; bar: string; text: string }
> = {
  neutral: {
    dot: 'bg-blue-600',
    card: 'bg-white',
    border: 'border-[#E8E2D9]',
    title: 'text-[#222222]',
    tag: 'bg-blue-50 text-blue-700 border border-blue-200',
    chip: 'text-blue-900 bg-blue-50/80 border-blue-200',
    bar: 'bg-blue-600',
    text: 'text-blue-700',
  },
  accent: {
    dot: 'bg-[#E5391C]',
    card: 'bg-[#FDF5F3]',
    border: 'border-[#FAD6CF]',
    title: 'text-[#E5391C]',
    tag: 'bg-[#E5391C] text-white',
    chip: 'text-[#E5391C] bg-white border-[#FAD6CF]',
    bar: 'bg-[#E5391C]',
    text: 'text-[#E5391C]',
  },
  good: {
    dot: 'bg-emerald-600',
    card: 'bg-emerald-50/60',
    border: 'border-emerald-200',
    title: 'text-emerald-800',
    tag: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
    chip: 'text-emerald-800 bg-white border-emerald-200',
    bar: 'bg-emerald-600',
    text: 'text-emerald-700',
  },
  warn: {
    dot: 'bg-amber-600',
    card: 'bg-amber-50/60',
    border: 'border-amber-200',
    title: 'text-amber-800',
    tag: 'bg-amber-100 text-amber-800 border border-amber-300',
    chip: 'text-amber-800 bg-white border-amber-200',
    bar: 'bg-amber-600',
    text: 'text-amber-700',
  },
};

export const BadgeBox: React.FC<{ badge: Badge }> = ({ badge }) => (
  <div className="flex-shrink-0 bg-white border-2 border-[#E5391C]/30 shadow-xs rounded-2xl px-6 py-4 flex items-center gap-4">
    <div className="w-14 h-14 rounded-xl bg-[#FDF5F3] border border-[#FAD6CF] flex items-center justify-center text-[#E5391C]">
      <Icon name={badge.icon} className="w-8 h-8" />
    </div>
    <div>
      <div className="text-[14px] font-mono uppercase tracking-wider text-[#E5391C] font-bold">{badge.label}</div>
      <div className="text-[28px] font-bold text-[#222222] leading-tight whitespace-nowrap">{badge.value}</div>
    </div>
  </div>
);

export const SlideHeading: React.FC<{ heading: Heading }> = ({ heading }) => (
  <div className="flex items-start justify-between gap-8 flex-shrink-0">
    <div className="space-y-2 min-w-0">
      <h1 className="text-[58px] leading-[1.08] font-serif-display font-medium text-[#2D2D2E] tracking-tight">
        {heading.title}
      </h1>
      <h2 className="text-[42px] leading-[1.2] text-[#525254] font-light">{heading.subtitle}</h2>
    </div>
    {heading.badge && <BadgeBox badge={heading.badge} />}
  </div>
);

export const TakeawayBanner: React.FC<{ children: React.ReactNode; tag?: string }> = ({ children, tag }) => (
  <div className="bg-white border-2 border-[#E8E2D9] rounded-2xl p-5 shadow-xs flex items-center justify-between flex-shrink-0">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-[#FDF5F3] border border-[#FAD6CF] flex items-center justify-center text-[#E5391C] shrink-0">
        <Zap className="w-7 h-7" />
      </div>
      <p className="text-[28px] leading-tight font-serif-display font-medium text-[#2D2D2E]">
        <strong className="text-[#E5391C] font-semibold">Takeaway:</strong> {children}
      </p>
    </div>
    {tag && (
      <span className="text-[18px] font-mono text-[#6E6D70] font-semibold flex-shrink-0 pl-6 ml-6 border-l border-[#E8E2D9] whitespace-nowrap">
        {tag}
      </span>
    )}
  </div>
);

export const MAIN_CLASS = 'flex-1 flex flex-col py-6 gap-6 min-h-0';

/** Shared card shell used by many layouts. */
export const CARD = 'bg-white border border-[#E8E2D9] rounded-3xl shadow-xs';

interface FrameProps {
  actLabel: string;
  index: number;
  total: number;
  children: React.ReactNode;
}

/** The standard 1920x1080 frame: institutional header, content area, institutional footer. */
export const SlideFrame: React.FC<FrameProps> = ({ actLabel, index, total, children }) => (
  <div className="w-[1920px] h-[1080px] bg-[#FAF9F6] text-[#222222] flex flex-col justify-between p-12 relative overflow-hidden select-none font-sans-body box-border">
    <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#E5391C]/5 pointer-events-none blur-3xl" />
    <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#1F2421]/5 pointer-events-none blur-3xl" />

    <header className="h-16 pb-4 border-b border-[#E8E2D9] flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-5">
        <UM6PLogo variant="compact" theme="color" className="h-9 w-auto" />
        <div className="h-6 w-px bg-[#E8E2D9]" />
        <span className="text-[15px] font-mono uppercase text-[#E5391C] tracking-widest font-bold whitespace-nowrap">
          {actLabel}
        </span>
      </div>
      <span className="text-[15px] font-mono text-[#6E6D70] font-bold whitespace-nowrap">
        Slide {String(index).padStart(2, '0')} / {total}
      </span>
    </header>

    {children}

    <footer className="h-14 pt-3 border-t border-[#E8E2D9] flex items-center justify-between text-[17px] font-mono text-[#6E6D70] flex-shrink-0">
      <span>Mohammed VI Polytechnic University · HCI Master Course</span>
      <span className="text-[#2D2D2E] font-bold">Prof. Y. Ben-Aboud</span>
    </footer>
  </div>
);

/** Countdown hook shared by activity slides. */
export const useCountdown = (initial: number) => {
  const [seconds, setSeconds] = React.useState(initial);
  const [running, setRunning] = React.useState(false);
  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          setRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);
  const reset = () => {
    setRunning(false);
    setSeconds(initial);
  };
  const fmt = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  return { seconds, running, setRunning, reset, fmt };
};
