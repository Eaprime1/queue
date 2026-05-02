// Shared utilities

// ∰ timestamp format: YYYYMMDDHHMMSS
export function stamp(): string {
  const d = new Date();
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0'),
    String(d.getHours()).padStart(2, '0'),
    String(d.getMinutes()).padStart(2, '0'),
    String(d.getSeconds()).padStart(2, '0'),
  ].join('');
}

// Generate a queue item ID
export function qid(prefix = 'q'): string {
  return `${prefix}-${stamp()}-${Math.random().toString(36).slice(2, 6)}`;
}
