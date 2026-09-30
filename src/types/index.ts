export type ActId = 1 | 2 | 3 | 4 | 5 | 6;

export interface ActMeta {
  id: ActId;
  title: string;
  subtitle: string;
  slidesRange: string;
  color: string;
}

export type SlideType =
  | 'title'
  | 'question'
  | 'comparison_think'
  | 'experiment'
  | 'debrief'
  | 'concept_model'
  | 'interactive_loop'
  | 'venn_triad'
  | 'activity_timer'
  | 'visual_story'
  | 'context_lab'
  | 'bad_design_challenge'
  | 'forensic_annotation'
  | 'case_study'
  | 'metrics_bench'
  | 'course_roadmap'
  | 'project_intro'
  | 'memory_experiment'
  | 'final_challenge'
  | 'summary_takeaway'
  | 'preview_next';

export interface SlideData {
  id: number;
  act: ActId;
  actTitle: string;
  title: string;
  subtitle?: string;
  type: SlideType;
  experimentId?: 'exp1' | 'exp2' | 'exp3' | 'exp4' | 'exp5' | 'exp6' | 'final_pump';
  activity?: {
    type: 'THINK' | 'PAIR DISCUSSION' | 'CLASSROOM VOTE' | 'ANALYZE';
    durationSec: number;
    question: string;
    instructions: string[];
  };
  speakerNotes: {
    timingMin: number;
    keyPoints: string[];
    spokenScriptAdvice: string;
    classroomFacilitationTip: string;
  };
  customData?: Record<string, any>;
}
