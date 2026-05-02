// que // unexusi BBS terminal
// This IS the system. Not a skin over it.
// ASCII-authentic, sprite-animated, real routing logic running in the browser.

'use strict';

// ── ASCII art logo ────────────────────────────────────────────────────────────
const LOGO = `
 ██████╗ ██╗   ██╗███████╗
██╔═══██╗██║   ██║██╔════╝
██║   ██║██║   ██║█████╗
██║▄▄ ██║██║   ██║██╔══╝
╚██████╔╝╚██████╔╝███████╗
 ╚══▀▀═╝  ╚═════╝ ╚══════╝

  ∞pace∞  //  unexusi terminal  //  ∰ ${stamp()}
  the concepts side. the junction. the bridge.
`.trim();

// ── Transport sprites ─────────────────────────────────────────────────────────
const SPRITES = {
  tube:     '[ ●══════════════● ]',
  teleport: '[ ≋≋≋ DIGITIZE ≋≋≋ ]',
  train:    '[ 🚂══════════════ ]',
  tunnel:   '[ ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡ ]',
};

const TRANSPORT_LABELS = {
  tube:     '[tube]',
  teleport: '[teleport]',
  train:    '[train]',
  tunnel:   '[tunnel]',
};

const TRANSPORT_MODES = ['tube', 'teleport', 'train', 'tunnel'];

// ── Priority labels ───────────────────────────────────────────────────────────
const METAL_LABEL = { Au: '◈Au', Ag: '◇Ag', Cu: '○Cu', Fe: '△Fe', Pb: '▽Pb' };
const METAL_CLASS = { Au: 'amber', Ag: 'green', Cu: 'route', Fe: 'system', Pb: 'error' };

// ── Affect labels ─────────────────────────────────────────────────────────────
const AFFECT_GLYPHS = {
  urgency:   '⚡ urgency',
  dread:     '▲ dread',
  hunger:    '◎ hunger',
  momentum:  '→ momentum',
  laughter:  '~ laughter',
  stillness: '· stillness',
};

// ── State ─────────────────────────────────────────────────────────────────────
const state = {
  transport:     'tube',
  streamLevel:   'rivus',
  interruptCount: 0,
  history:       [],
  historyIndex:  -1,
  qTable:        buildQTable(),
  healthy:       true,
};

// ── DOM refs ──────────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);
let outputEl, inputEl, clockEl, streamEl, healthEl, transportBadge, interruptCountEl;

// ── Utility: timestamp ∰ ─────────────────────────────────────────────────────
function stamp() {
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

// ── Utility: live clock ───────────────────────────────────────────────────────
function tickClock() {
  if (clockEl) clockEl.textContent = stamp();
  setTimeout(tickClock, 1000);
}

// ── Q^11 interrupt table (browser-side) ──────────────────────────────────────
function buildQTable() {
  return [
    { p: 1,  name: 'P1-PINNACLE', desc: 'Pinnacle — to be named in PRW Phase 1', active: false },
    { p: 2,  name: 'P2-PINNACLE', desc: 'Pinnacle — to be named in PRW Phase 1', active: false },
    { p: 3,  name: 'P3-PINNACLE', desc: 'Pinnacle — to be named in PRW Phase 1', active: false },
    { p: 4,  name: 'P4-PINNACLE', desc: 'Pinnacle — to be named in PRW Phase 1', active: false },
    { p: 5,  name: 'P5-UNI',      desc: 'Uni — observer/annotator',               active: true  },
    { p: 6,  name: 'P6-TRIAS',    desc: 'Trias — commissioner',                   active: true  },
    { p: 7,  name: 'P7-UNOIAM',   desc: 'Unoiam — 7-Prime resolution state',      active: true  },
    { p: 8,  name: 'P8-SEED',     desc: 'Shadow seed interrupt',                  active: true  },
    { p: 9,  name: 'P9-DEVELOP',  desc: 'Shadow developing interrupt',             active: false },
    { p: 10, name: 'P10-MATURE',  desc: 'Shadow maturing interrupt',               active: false },
    { p: 11, name: 'P11-COLLAPSE',desc: 'Shadow collapse interrupt',               active: false },
  ];
}

// ── Glands: infer affect from text ───────────────────────────────────────────
function inferAffect(text) {
  const t = text.toLowerCase();
  if (/urgent|panic|critical|now|immediate/.test(t)) return { affect: 'urgency',   weight: 0.95 };
  if (/dread|fail|block|stuck/.test(t))              return { affect: 'dread',     weight: 0.80 };
  if (/need|missing|hungry|gap/.test(t))             return { affect: 'hunger',    weight: 0.70 };
  if (/launch|ship|build|go|start/.test(t))          return { affect: 'momentum',  weight: 0.60 };
  if (/funny|laugh|play|haha/.test(t))               return { affect: 'laughter',  weight: 0.40 };
  return                                                     { affect: 'stillness', weight: 0.10 };
}

// ── Routing: infer priority ───────────────────────────────────────────────────
function inferPriority(text, affect) {
  const t = text.toLowerCase();
  if (/urgent|now|immediate/.test(t) || affect.weight >= 0.90) return 'Au';
  if (/next|soon/.test(t)            || affect.weight >= 0.70) return 'Ag';
  if (/week/.test(t))                                          return 'Cu';
  if (/sprint|phase/.test(t))                                  return 'Fe';
  if (/rework|broken|bad/.test(t))                             return 'Pb';
  return 'Cu';
}

// ── Sphincter verdict ─────────────────────────────────────────────────────────
function sphincter(priority, affect, transport) {
  // Pb + high gland weight = escalate (panic attack override)
  if (priority === 'Pb' && affect.weight >= 0.75) {
    return { verdict: 'escalate', reason: `Gland override — ${affect.affect} (${affect.weight.toFixed(2)}) overrides Pb` };
  }
  if (priority === 'Pb') {
    return { verdict: 'return', reason: 'Pb priority — needs rework before routing' };
  }
  if (state.streamLevel === 'torrens') {
    return { verdict: 'hold', reason: 'Torrens — system overload, Yod slowing intake' };
  }
  return { verdict: 'pass', reason: `${priority} cleared at ${state.streamLevel} via ${transport}` };
}

// ── Yod routing ───────────────────────────────────────────────────────────────
function yodRoute(text, priority, affect) {
  const t = text.toLowerCase();
  if (/mission|directive|long.horizon/.test(t)) return 'todo/missions/';
  if (/shadow|seed|collapse/.test(t))           return 'todo/shadows/';
  if (/interrupt|q\^/.test(t))                  return 'Q/';
  return 'todo/commissions/';
}

// ── Q interrupt fire ──────────────────────────────────────────────────────────
function fireInterrupt(perspective) {
  const entry = state.qTable.find(e => e.p === perspective);
  if (!entry) return;
  state.interruptCount++;
  interruptCountEl.textContent = `Q:${state.interruptCount}`;
  if (!entry.active) {
    printLine(`  Q-SHADOW | P${perspective}:${entry.name} — in shadow`, 'q');
  } else {
    printLine(`  Q-INTERRUPT | P${perspective}:${entry.name}`, 'q');
    printLine(`  └─ ${entry.desc}`, 'q');
  }
}

// ── Print helpers ─────────────────────────────────────────────────────────────
function printLine(text, cls = 'system', spriteClass = '') {
  const line = document.createElement('span');
  line.className = `line ${cls}`;
  if (spriteClass) {
    const inner = document.createElement('span');
    inner.className = spriteClass;
    inner.textContent = text;
    line.appendChild(inner);
  } else {
    line.textContent = text;
  }
  outputEl.appendChild(line);
  outputEl.scrollTop = outputEl.scrollHeight;
  return line;
}

function blank() { printLine('', 'blank'); }

// Typewriter effect for boot lines
function typewriterLine(text, cls, delay, callback) {
  setTimeout(() => {
    const line = printLine('', cls);
    let i = 0;
    const iv = setInterval(() => {
      line.textContent += text[i++];
      outputEl.scrollTop = outputEl.scrollHeight;
      if (i >= text.length) { clearInterval(iv); if (callback) callback(); }
    }, 18);
  }, delay);
}

// ── Boot sequence ─────────────────────────────────────────────────────────────
function boot() {
  $('boot-art').textContent = LOGO;

  const log = $('boot-log');
  const lines = [
    ['∰ 20260502 — que / unexusi terminal', 'route'],
    ['initialising gland layer...', 'system'],
    ['loading Q^11 interrupt table (seeded by que)...', 'system'],
    ['sphincter active — classifier with memory online', 'system'],
    ['yod routing engine — economy principle engaged', 'system'],
    ['∰ fecal truth signal: PATTERN PERSISTING', 'green'],
    ['stream level: rivus | transport: tube | Q: shadow', 'dim'],
    ['', 'blank'],
    ['READY. Type a concept and press ENTER.', 'amber'],
  ];

  lines.forEach(([text, cls], i) => {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = `line ${cls}`;
      el.textContent = text;
      log.appendChild(el);
    }, i * 220);
  });

  setTimeout(() => {
    $('boot').classList.add('hidden');
    $('terminal').classList.remove('hidden');
    inputEl.focus();
    tickClock();
    printWelcome();
  }, lines.length * 220 + 400);
}

function printWelcome() {
  printLine('─'.repeat(60), 'dim');
  printLine(' que // unexusi terminal — the concepts side', 'amber');
  printLine(' everything enters here. Yod routes. Q watches.', 'system');
  printLine('─'.repeat(60), 'dim');
  blank();
  printLine(' type your concept and press ENTER to route it.', 'system');
  printLine(' F1:help  F2:transport mode  F3:queue  F5:Q-table', 'dim');
  blank();
}

// ── Command handling ──────────────────────────────────────────────────────────
function handleCommand(cmd) {
  const t = cmd.trim();
  if (!t) return;

  // History
  state.history.unshift(t);
  if (state.history.length > 100) state.history.pop();
  state.historyIndex = -1;

  // Print what the user typed
  const transport = state.transport;
  const sprite = SPRITES[transport];
  blank();
  printLine(`> ${t}`, 'user');
  printLine(sprite, 'cyan', `sprite-${transport}`);

  // Built-in commands
  if (t === '/help' || t === 'help') { showHelp(); return; }
  if (t === '/queue' || t === 'queue') { showQueue(); return; }
  if (t === '/q-table' || t === 'q-table') { showQTable(); return; }
  if (t === '/glands' || t === 'glands') { showGlands(t); return; }
  if (t === '/health' || t === 'health') { showHealth(); return; }
  if (t.startsWith('/transport ')) {
    const mode = t.replace('/transport ', '').trim();
    setTransport(mode); return;
  }
  if (t === '/stream' || t.startsWith('/stream ')) {
    const level = t.replace('/stream', '').trim() || 'rivus';
    setStream(level); return;
  }

  // Route concept through the system
  routeConcept(t);
}

function routeConcept(text) {
  const transport = state.transport;
  const affect = inferAffect(text);
  const priority = inferPriority(text, affect);
  const gate = sphincter(priority, affect, transport);

  // Gland report
  printLine(`  gland: ${AFFECT_GLYPHS[affect.affect]} (weight:${affect.weight.toFixed(2)})`, 'gland');

  // Sphincter verdict
  switch (gate.verdict) {
    case 'return':
      printLine(`  sphincter: ✗ RETURN — ${gate.reason}`, 'error');
      blank();
      return;

    case 'hold':
      printLine(`  sphincter: ⌛ HOLD — ${gate.reason}`, 'hold');
      blank();
      return;

    case 'escalate':
      printLine(`  sphincter: ⚡ ESCALATE — ${gate.reason}`, 'amber');
      fireInterrupt(7); // Unoiam fires on escalation
      blank();
      return;

    case 'pass':
    default:
      printLine(`  sphincter: ✓ PASS — ${gate.reason}`, 'system');
  }

  // Yod routing
  const destination = yodRoute(text, priority, affect);
  const metal = METAL_LABEL[priority];
  printLine(`  yod: ${metal} → ${destination}`, 'route');

  // Shadow gets a P8 interrupt seed
  if (destination === 'todo/shadows/') fireInterrupt(8);
  // Mission fires Unoiam
  if (destination === 'todo/missions/') fireInterrupt(7);
  // Commission fires Trias
  if (destination === 'todo/commissions/') fireInterrupt(6);
  // Interrupt fires itself
  if (destination === 'Q/') fireInterrupt(11);

  // Confirmation
  printLine(`  ∰ ${stamp()} routed via ${transport}`, 'dim');
  blank();
}

// ── Built-in command renderers ────────────────────────────────────────────────
function showHelp() {
  blank();
  printLine('  COMMANDS', 'amber');
  printLine('  ─────────────────────────────────────', 'dim');
  printLine('  /help              this screen', 'system');
  printLine('  /transport <mode>  tube|teleport|train|tunnel', 'system');
  printLine('  /stream <level>    rivulus|rivus|flumen|amnis|torrens', 'system');
  printLine('  /queue             show current queue state', 'system');
  printLine('  /q-table           show Q^11 interrupt table', 'system');
  printLine('  /glands            show gland affect on current input', 'system');
  printLine('  /health            fecal truth — system health check', 'system');
  blank();
  printLine('  TRANSPORT MODES', 'amber');
  printLine('  ─────────────────────────────────────', 'dim');
  printLine('  tube     directed, pressure-driven, one destination', 'system');
  printLine('  teleport lossless, instant, no transit state', 'system');
  printLine('  train    scheduled, networked, stops and routes', 'system');
  printLine('  tunnel   persistent channel, long-running', 'system');
  blank();
}

function showQueue() {
  blank();
  printLine('  QUEUE STATE', 'amber');
  printLine('  ─────────────────────────────────────', 'dim');
  printLine(`  stream level : ${state.streamLevel}`, 'system');
  printLine(`  transport    : ${state.transport}`, 'system');
  printLine(`  interrupts   : ${state.interruptCount}`, 'system');
  printLine(`  health       : ${state.healthy ? '● NOMINAL' : '○ DEGRADED'}`, state.healthy ? 'green' : 'error');
  printLine('  yod operator : ACTIVE — economy principle engaged', 'route');
  blank();
}

function showQTable() {
  blank();
  printLine('  Q^11 INTERRUPT TABLE (seeded by que)', 'cyan');
  printLine('  ─────────────────────────────────────', 'dim');
  state.qTable.forEach(entry => {
    const status = entry.active ? '● ACTIVE' : '○ SHADOW';
    const cls = entry.active ? 'q' : 'dim';
    printLine(`  P${String(entry.p).padEnd(2)} ${entry.name.padEnd(14)} ${status} — ${entry.desc}`, cls);
  });
  blank();
  printLine('  Q holds in shadow. Primal has not launched.', 'dim');
  printLine('  Characters appear once primal launches.', 'dim');
  blank();
}

function showGlands(text) {
  const affect = inferAffect(text.replace('/glands', '').trim() || 'test signal');
  blank();
  printLine('  GLAND ASSESSMENT', 'gland');
  printLine('  ─────────────────────────────────────', 'dim');
  printLine(`  affect : ${AFFECT_GLYPHS[affect.affect]}`, 'gland');
  printLine(`  weight : ${affect.weight.toFixed(2)}`, 'system');
  printLine(`  override possible : ${affect.weight >= 0.75 ? 'YES — Pb can interrupt' : 'no'}`, affect.weight >= 0.75 ? 'amber' : 'dim');
  printLine('', 'blank');
  printLine('  fecal truth : PATTERN PERSISTING', 'green');
  blank();
}

function showHealth() {
  blank();
  printLine('  SYSTEM HEALTH — FECAL TRUTH CHECK', 'green');
  printLine('  ─────────────────────────────────────', 'dim');
  printLine('  ● routing core    : NOMINAL', 'green');
  printLine('  ● sphincter       : NOMINAL', 'green');
  printLine('  ● gland layer     : NOMINAL', 'green');
  printLine('  ○ Q system        : IN SHADOW (primal not launched)', 'dim');
  printLine(`  ● stream level    : ${state.streamLevel}`, 'system');
  printLine(`  ∰ ${stamp()}`, 'dim');
  blank();
}

function setTransport(mode) {
  if (!TRANSPORT_MODES.includes(mode)) {
    printLine(`  unknown transport: ${mode}. use: tube|teleport|train|tunnel`, 'error');
    return;
  }
  state.transport = mode;
  transportBadge.textContent = TRANSPORT_LABELS[mode];
  printLine(`  transport → ${mode}  ${SPRITES[mode]}`, 'cyan', `sprite-${mode}`);
  blank();
}

function setStream(level) {
  const valid = ['rivulus','rivus','flumen','amnis','torrens'];
  if (!valid.includes(level)) {
    printLine(`  unknown stream level. use: ${valid.join('|')}`, 'error');
    return;
  }
  state.streamLevel = level;
  streamEl.textContent = level;
  const cls = level === 'torrens' ? 'error' : level === 'amnis' ? 'green' : 'dim';
  streamEl.className = cls;
  printLine(`  stream level → ${level}`, 'route');
  blank();
}

// ── Keyboard handling ─────────────────────────────────────────────────────────
function initKeys() {
  inputEl.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const v = inputEl.value;
      inputEl.value = '';
      handleCommand(v);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      state.historyIndex = Math.min(state.historyIndex + 1, state.history.length - 1);
      inputEl.value = state.history[state.historyIndex] ?? '';
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      state.historyIndex = Math.max(state.historyIndex - 1, -1);
      inputEl.value = state.historyIndex >= 0 ? state.history[state.historyIndex] : '';
    }
  });

  // Function keys
  document.addEventListener('keydown', e => {
    if (e.key === 'F1') { e.preventDefault(); handleCommand('/help'); }
    if (e.key === 'F2') {
      e.preventDefault();
      const idx = (TRANSPORT_MODES.indexOf(state.transport) + 1) % TRANSPORT_MODES.length;
      setTransport(TRANSPORT_MODES[idx]);
    }
    if (e.key === 'F3') { e.preventDefault(); handleCommand('/queue'); }
    if (e.key === 'F4') { e.preventDefault(); handleCommand('/glands'); }
    if (e.key === 'F5') { e.preventDefault(); handleCommand('/q-table'); }
  });

  // Click anywhere refocuses input
  document.addEventListener('click', () => inputEl.focus());
}

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  outputEl        = $('output');
  inputEl         = $('input');
  clockEl         = $('clock');
  streamEl        = $('stream-indicator');
  healthEl        = $('health-dot');
  transportBadge  = $('transport-badge');
  interruptCountEl = $('interrupt-count');

  initKeys();
  boot();
});
