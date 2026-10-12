import React from 'react';
import { SlideData } from '../../types';
import { SLIDES_DATA_SESSION_2, ACTS_METADATA_SESSION_2 } from '../../data/slidesSession2';
import { SlideFrame } from '../session2/primitives';
import {
  ActivityLayout, AgendaLayout, BarsLayout, CompareLayout, CustomLayout, FlowLayout, FormulaLayout,
  HeroLayout, NarrativeLayout, QuizLayout, RulesLayout, StatsLayout, TableLayout, TakeawayLayout,
  TracksLayout, DividerLayout, ProjectsLayout, AuditLayout, TeaserLayout,
} from '../session2/layouts';

interface SlideRendererSession2Props {
  slide: SlideData;
  onNextSlide: () => void;
  onOpenTimer: (seconds: number, label: string) => void;
}

/**
 * Session 2 renderer. Slides are pure data (src/data/slidesSession2.ts); every layout lives in
 * components/session2/layouts.tsx and follows the validated 1920x1080 design standard.
 */
export const SlideRendererSession2: React.FC<SlideRendererSession2Props> = ({ slide, onNextSlide }) => {
  const full = SLIDES_DATA_SESSION_2.find((s) => s.id === slide.id) ?? SLIDES_DATA_SESSION_2[0];
  const act = ACTS_METADATA_SESSION_2.find((a) => a.id === full.act);
  const c = full.content;

  // The title slide is Session 1's title layout verbatim: full-bleed, no standard frame.
  if (c.kind === 'hero') return <HeroLayout c={c} onNext={onNextSlide} />;
  // The closing teaser is Session 1's closing layout verbatim: full-bleed, own header.
  if (c.kind === 'teaser') return <TeaserLayout c={c} index={SLIDES_DATA_SESSION_2.indexOf(full) + 1} total={SLIDES_DATA_SESSION_2.length} />;

  const body = (() => {
    switch (c.kind) {
      case 'quiz': return <QuizLayout c={c} />;
      case 'agenda': return <AgendaLayout c={c} />;
      case 'narrative': return <NarrativeLayout c={c} />;
      case 'compare': return <CompareLayout c={c} />;
      case 'flow': return <FlowLayout c={c} />;
      case 'stats': return <StatsLayout c={c} />;
      case 'bars': return <BarsLayout c={c} />;
      case 'formula': return <FormulaLayout c={c} />;
      case 'rules': return <RulesLayout c={c} />;
      case 'activity': return <ActivityLayout c={c} />;
      case 'table': return <TableLayout c={c} />;
      case 'tracks': return <TracksLayout c={c} />;
      case 'takeaway': return <TakeawayLayout c={c} />;
      case 'divider': return <DividerLayout c={c} />;
      case 'projects': return <ProjectsLayout c={c} />;
      case 'audit': return <AuditLayout c={c} />;
      case 'custom': return <CustomLayout c={c} />;
    }
  })();

  return (
    <SlideFrame
      actLabel={act?.title ?? full.actTitle}
      index={SLIDES_DATA_SESSION_2.indexOf(full) + 1}
      total={SLIDES_DATA_SESSION_2.length}
    >
      {body}
    </SlideFrame>
  );
};
