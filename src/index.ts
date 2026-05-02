// Queue system — main entry point

export { intake } from './que';
export { dispatch } from './router';
export { enrich, assess, fecalTruth } from './glands';
export { seedQ11, fire as fireInterrupt, Q_STATUS } from './Q';
export type { QueueItem, RoutingDecision, GlandSignal, Metal, StreamLevel } from './types';
