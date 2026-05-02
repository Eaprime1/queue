// Q — the interrupt system
// In shadow until primal launches.
// que seeds Q^11. Characters appear once primal launches.

export { Q_TABLE, NAMED_INTERRUPTS, seedQ11, fire } from './table';

// Q status — shadow until primal launches
export const Q_STATUS = {
  active: false,
  seedCount: 0,
  message: 'Q holds in shadow. Primal has not launched. que has seeded Q^11.',
} as const;

export function activate(): void {
  console.log('Q — primal has launched. Interrupt system coming online.');
  // Characters begin to appear here.
  // This space is intentionally empty until primal launches.
}
