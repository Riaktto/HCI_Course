import { SlideData } from '../types';
import type { Lens } from './projects';

/** Names of the custom visuals / live demos (resolved in components/session2/registry.tsx). */
export type CustomKey =
  | 'FovealVision'
  | 'PreAttentiveSearch'
  | 'GestaltCards1'
  | 'GestaltCards2'
  | 'GestaltWorkbenchDemo'
  | 'BaddeleyModel'
  | 'ChunkingDemo'
  | 'FlickerDemo'
  | 'FittsConcept'
  | 'FittsTrialsDemo'
  | 'HickArenaDemo'
  | 'MentalTriad'
  | 'IrrigationDemo'
  | 'ReactionDemo'
  | 'LayoutRoutingDemo'
  | 'ProgressiveDisclosureDemo';

export type IconName =
  | 'brain' | 'eye' | 'activity' | 'clock' | 'target' | 'scale' | 'zap' | 'layers'
  | 'users' | 'code' | 'chart' | 'compass' | 'gauge' | 'list' | 'flask' | 'sprout'
  | 'heart' | 'landmark' | 'server' | 'pointer' | 'timer' | 'bulb' | 'hand' | 'grid'
  | 'shapes' | 'hourglass' | 'flag' | 'route' | 'book' | 'check' | 'alert';

export type Tone = 'neutral' | 'accent' | 'good' | 'warn';

export interface Badge {
  icon: IconName;
  label: string;
  value: string;
}

export interface Heading {
  title: string;
  subtitle: string;
  badge?: Badge;
}

export type CompareVisualKey = 'popOut' | 'serialScan' | 'wireFlat' | 'wireRanked';

export interface CompareColumn {
  /** optional illustration shown between the text and the footer chip */
  visual?: CompareVisualKey;
  tone: Tone;
  title: string;
  tag?: string;
  body: string;
  example: string;
  footer: string;
}

export interface FlowNode {
  tag: string;
  chip: string;
  name: string;
  blurb: string;
  arrow?: string;
  /** shown in the detail panel when selected */
  detailTitle: string;
  detailRange: string;
  detail: string;
}

export interface Stat {
  value: string;
  unit: string;
  label: string;
  text: string;
  tone?: Tone;
}

export interface BarRow {
  label: string;
  value: string;
  sub?: string;
  pct: number;
  tone: Tone;
  tag: string;
}

export interface Step {
  text: string;
}

export type Content =
  | { kind: 'hero'; sessionLabel: string; pill: string; title: string; subtitle: string; cta: string }
  | { kind: 'quiz'; heading: Heading; items: { q: string; a: string }[] }
  | {
      kind: 'agenda';
      heading: Heading;
      outcomes: { icon: IconName; title: string; text: string }[];
      /** optional: omitted when the session has no time plan on screen */
      timeline?: { label: string; min: number }[];
      note?: string;
    }
  | {
      kind: 'narrative';
      heading: Heading;
      body: string;
      points: { lead: string; text: string }[];
      takeaway?: string;
    }
  | { kind: 'compare'; heading: Heading; left: CompareColumn; right: CompareColumn; takeaway?: string }
  | { kind: 'flow'; heading: Heading; flowTitle: string; flowHint: string; nodes: FlowNode[]; source: string; sourceNote: string }
  | { kind: 'stats'; heading: Heading; stats: Stat[]; note: string }
  | { kind: 'bars'; heading: Heading; chartTitle: string; rows: BarRow[]; caption: string; captionRight: string }
  | {
      kind: 'formula';
      heading: Heading;
      formula: string;
      formulaNote: string;
      variables: { sym: string; meaning: string }[];
      exampleTitle: string;
      example: { k: string; v: string; strong?: boolean }[];
      caption: string;
    }
  | {
      kind: 'rules';
      heading: Heading;
      rules: { title: string; text: string; evidence: string }[];
      takeaway?: string;
    }
  | {
      kind: 'activity';
      heading: Heading;
      label: string;
      chip: string;
      title: string;
      steps: Step[];
      timerSeconds: number;
      timerLabel: string;
      /** one plain sentence: why we do this */
      goal: string;
      /** what the team has when the step ends */
      output: string;
      takeaway?: string;
    }
  | {
      kind: 'table';
      heading: Heading;
      heads: [string, string, string];
      rows: { a: string; b: string; c: string }[];
      footer: string;
    }
  | {
      kind: 'tracks';
      heading: Heading;
      tracks: { letter: string; icon: IconName; name: string; context: string; baseline: string; stake: string }[];
      note: string;
    }
  | { kind: 'takeaway'; heading: Heading; statement: string; points: { lead: string; text: string }[]; next: string }
  | { kind: 'divider'; actNumber: number; title: string; question: string; learn: string[] }
  | { kind: 'projects'; heading: Heading; note: string }
  /** the lecturer's class example: the live interface, with one lens' findings highlighted (no lens = introduction) */
  | { kind: 'audit'; heading: Heading; lens?: Lens }
  /** closing teaser of the next session, same layout as the one that closes Session 1 */
  | { kind: 'teaser'; label: string; icon: IconName; kicker: string; title: string; subtitle: string; blurb: string; thanks: string }
  | { kind: 'custom'; heading: Heading; component: CustomKey };

/** A Session 2 slide: fully compatible with SlideData (navigator, notes, timer) plus typed content. */
export interface Slide2 extends SlideData {
  content: Content;
}
