import React from 'react';
import type { CustomKey } from '../../data/session2Types';
import { FovealVision } from '../experiments/session2/FovealVision';
import { PreAttentiveSearch } from '../experiments/session2/PreAttentiveSearch';
import { GestaltCards } from '../experiments/session2/GestaltCards';
import { GestaltWorkbenchDemo } from '../experiments/session2/GestaltWorkbenchDemo';
import { BaddeleyModel } from '../experiments/session2/BaddeleyModel';
import { ChunkingDemo } from '../experiments/session2/ChunkingDemo';
import { FlickerDemo } from '../experiments/session2/FlickerDemo';
import { FittsConcept } from '../experiments/session2/FittsConcept';
import { FittsTrialsDemo } from '../experiments/session2/FittsTrialsDemo';
import { HickArenaDemo } from '../experiments/session2/HickArenaDemo';
import { MentalTriad } from '../experiments/session2/MentalTriad';
import { IrrigationDemo } from '../experiments/session2/IrrigationDemo';
import { ReactionDemo } from '../experiments/session2/ReactionDemo';
import { LayoutRoutingDemo } from '../experiments/session2/LayoutRoutingDemo';
import { ProgressiveDisclosureDemo } from '../experiments/session2/ProgressiveDisclosureDemo';

/** Custom visuals and presenter-run demos. Each fills the content box (1824 x ~671 px). */
export const CUSTOM: Record<CustomKey, React.ComponentType> = {
  FovealVision,
  PreAttentiveSearch,
  GestaltCards1: () => <GestaltCards set={1} />,
  GestaltCards2: () => <GestaltCards set={2} />,
  GestaltWorkbenchDemo,
  BaddeleyModel,
  ChunkingDemo,
  FlickerDemo,
  FittsConcept,
  FittsTrialsDemo,
  HickArenaDemo,
  MentalTriad,
  IrrigationDemo,
  ReactionDemo,
  LayoutRoutingDemo,
  ProgressiveDisclosureDemo,
};
