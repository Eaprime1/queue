// Queue system — main entry point

export { intake } from './que';
export { dispatch } from './router';
export { enrich, assess, fecalTruth } from './glands';
export { seedQ11, fire as fireInterrupt, Q_STATUS } from './Q';
export { RADIX, SUXEN, NANI_ENGINE, calcRadixFactor, isFecalTruth, isSparkle, isShadowVersion } from './radix';
export type {
  QueueItem, RoutingDecision, GlandSignal, Metal, StreamLevel,
  TKPScore, RadixFactor, MarrowingPhase, ShadowLexeme,
} from './types';
export { SHADOW_SEQUENCE, MARROWING_ARC, totalKaPressure } from './types';
