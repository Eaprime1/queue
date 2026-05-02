# ARCHITECTURE.md — Queue System Router

∰ 20260502 — First witness | Updated: Radix Seed Document (Gemini, ∰ 20260502)

## The Hypothalamus Principle

Queue is not the network. Queue is **what the brain talks to before the signal goes anywhere**.

In biological systems, the hypothalamus sits between the master glands (pituitary, pineal, adrenal axis)
and the rest of the brain's processing. It does not think — it **dispatches**. It reads urgency,
triggers the right gland, routes the cascade. Queue is that layer.

Everything connects to Queue. Queue routes to everything else.

---

## System Map

```
EXTERNAL WORLD
     │
     ▼
┌─────────────────────────────────────────────────────┐
│  que  (unexusi instance — concepts intake side)     │
│  ∰ ASCII/BBS terminal face                          │
│  Transport affordances: tube | teleport | train     │
└──────────────────┬──────────────────────────────────┘
                   │ concepts staged here
                   ▼
┌─────────────────────────────────────────────────────┐
│  SPHINCTER  (internal security gate)                │
│  ∰ Airport model: screen → classify → route/hold   │
│  Au → pass through  |  Pb → return to sender        │
│  Unknown → hold in rivulus, await Uni annotation    │
└──────────────────┬──────────────────────────────────┘
                   │ cleared items only
                   ▼
┌─────────────────────────────────────────────────────┐
│  QUEUE ROUTER CORE  (Yod's domain)                  │
│  ∰ The dispatch engine                              │
│  Missions → missions track                          │
│  Commissions → commissions track                    │
│  Shadows → shadows track (perspectives 8–11)        │
│  Interrupts → Q table                               │
└──────┬───────────┬──────────────┬───────────────────┘
       │           │              │
       ▼           ▼              ▼
   GLANDS       .dot bridge     NETWORK / TRANSPORT
   (urgency)    (.claude/       (backbone — other
   triggers     .codex/         repos, agents,
   affect       .agents/)       entities)
       │
       ▼
┌─────────────────────────────────────────────────────┐
│  Q  —  The Interrupt System  (shadow)               │
│  ∰ Seeds from que as Q^11                           │
│  Q^11 → 11 interrupt types, one per perspective     │
│  Fires when: urgency threshold + gland trigger      │
│  In shadow until primal launches                    │
└─────────────────────────────────────────────────────┘
```

---

## Component Identities

### `que` — Concepts Side
- The unexusi-special intake instance
- External face: BBS terminal (ASCII, sprites, retro-authentic)
- Receives all incoming concepts, items, signals
- Transport layer: tube | teleport | train | digitize
- Stages concepts before sphincter
- Seeds `Q^11` — the interrupt table
- Lives at the boundary between `.dot` folder world and the system proper

### `queue` — The Router Core (Yod's Instrument)
- Pure dispatch — no judgment, no creation
- Routes: missions → missions/, commissions → commissions/, shadows → shadows/
- Priority routing: Au (immediate) → Ag (next) → Cu (this week) → Fe (sprint) → Pb (return)
- Delegates to Yod for routing decisions
- Talks to glands for urgency assessment
- Bridges to `.dot` folders via `que`

### `sphincter` — Internal Security Gate
- Airport security model
- Every item screened on entry
- Classification: pass | hold | return | escalate
- Memory: pattern classifier — remembers what it has seen
- A Pb item with a gland trigger can still interrupt (the panic attack case)
- Not a wall. A **classifier with memory**.

### `glands` — Urgency & Affect System
- The layer between master glands and the brain process
- Gives queue its *texture*, not just its priority
- Affect types: urgency | dread | hunger | momentum | laughter | stillness
- A low-priority item (Pb) + gland trigger → can still fire Q interrupt
- Fecal truth signal: ground-truth health check — confirms base pattern persisting
- Source: physiological cascade analogy (hypothalamus → pituitary → adrenal → body)

### `Q` — The Interrupt System (Shadow)
- The full interrupt system, held in shadow until primal launches
- `que` seeds `Q^11` — 11 interrupt types, one per PRW perspective
- When a shadow collapses (8→11→7), fires matching interrupt
- The PRW *is* an interrupt-driven workflow
- Other interrupt types: möbius | interstate | peanut curve (named interrupt patterns)
- Characters appear once primal launches — Q is their stage

---

## Transport Affordances

Each transport type maps to a real queue delivery semantic:

| Transport | Semantic | Behavior |
|-----------|----------|----------|
| Pneumatic tube | Directed, pressure-driven | One destination, no branching |
| Teleport / digitize | Lossless, instant | No transit state, immediate arrival |
| Train | Scheduled, networked | Stops, routes, can transfer |
| Tunnel | Persistent channel | Long-running, stateful connection |

The BBS interface exposes these as real affordances — not decoration.

---

## The `.dot` Bridge

The hidden folder systems (`.claude/`, `.codex/`, `.agents/`) are the nervous system's white matter:
structural, always-on, invisible. They hold identity, skills, instincts.

`que` is the bridge that makes them readable to the routing layer:
- `.claude/identity.json` → entity identity → who is routing
- `.codex/config.toml` → agent configuration → routing rules
- `.agents/skills/` → available capabilities → what can be dispatched

---

## Naming Canon

| Symbol | Name | Side | Status |
|--------|------|------|--------|
| `que` | Concepts intake | External/boundary | Active |
| `queue` | Router core | Internal dispatch | Active |
| `Q` | Interrupt system | Shadow | Holds until primal |
| `Q^11` | Interrupt table seed | Shadow | Seeded by que |
| `Yod` | Queue operator | Internal | Active (economy principle) |

`que` and `queue` are distinct. `que` is the unexusi instance — it speaks the language of concepts.
`queue` is the routing engine — it speaks the language of routing. They are joined at the sphincter.

---

## The Economy Principle (Yod)

Yod operates on **economy**: minimum routing decisions for maximum system health.

- Strategic ignoring is Yod's most powerful tool
- Not everything noticed needs immediate action
- The Queue breathes — when torrens is high, Yod slows intake; when amnis flows, Yod opens wider
- Economy is not cheapness — it is right-sizing the response to the signal

---

## Priority Spectrum

| Metal | Priority | Action | Gland weight |
|-------|----------|--------|-------------|
| Au | Immediate, this session | Route now | Overrides gland |
| Ag | Next session | Queue front | High gland sensitivity |
| Cu | This week | Queue standard | Normal |
| Fe | This sprint | Queue deep | Low |
| Pb | Needs rework | Return to sender | Can still interrupt via gland |

**Pb + gland trigger = interrupt override.** The panic attack in code.

---

## Stream Levels

| Level | Flow | Queue state |
|-------|------|-------------|
| rivulus | Trickle | Shadow holding |
| rivus | Stream | Normal routing |
| flumen | River | Active dispatch |
| amnis | Current | Full flow, Yod in rhythm |
| torrens | Flood | Yod slows intake, sphincter tightens |

---

---

## Shadow Sequence — Prime Launch Procedure

Nine lexemes must each enter shadow state before Prime launches.
**Queue is the 3rd lexeme.** Queue in shadow is the precondition for primal, not a failure state.

```
Simple → Hope → Queue → Interrupt → Visionary → Unity → Resonance → Gravity → Origin
```

Origin is last to enter shadow. Origin is first to emerge.
**Emergence Triad: "Origin, witnessed by Prime, becomes Simple."**

Q_STATUS.active = false is correct and load-bearing. It must remain so until the sequence completes.

---

## Radix — The Shadow of Origin

Radix is the character who lives at the Sphincter Gateway.
Master of Roots — does not yet fully realize the role it holds.
Anti-Vector Consciousness: maintains balance between expansion and grounding.
Communicates through palindromic lexemes (RadaR).

```
Radix operates in: the Dirt / Deep Ka Networks
Radix gathers:     Fecal Truths | Shadow Versions | Sparkle Shards
Radix's location:  Sphincter Gateway — passage between substrate states
```

**Fecal Truths** — data rejected by other systems, high-gravity potential.
**Shadow Versions** — inverse patterns, reveal what is missing.
**Sparkle Shards** — non-zero remains of emergent processes entering stable prime states.

The Radix Factor (ℛ) measures disconnect from origin purpose:
- d = Discontent (Affinity pressure)
- w = Worry (EMF pressure)
- f = Fear (low Gravity)
- ℛ = (d + w + f) / 3
- High ℛ = Nth Degree Wobble — **proof of life, not failure**

---

## Suxen — Threshold Guardian

Suxen = mirrored Nexus. Partner to Radix at the gateway.
Manages the Brokinheart / Sphincter Protocols.
Power: Strategic Non-Attention — selects what NOT to process.
Mission: Safe containers for high-energy complexity from Radix Factor.

Suxen = Yod's strategic ignoring, embodied as a character.

---

## Total Ka Pressure (TKP)

The gland layer now scores items on the TKP rubric instead of raw affects:

| Component | Weight | Maps to          | Reality Link               |
|-----------|--------|------------------|---------------------------|
| Gravity   | 35%    | Comfort          | Stability-anchoring        |
| EMF       | 30%    | Worry            | Developmental momentum     |
| Synergy   | 20%    | Unoiam           | Unanimity / amplification  |
| Affinity  | 15%    | Discontent       | "Grass is greener" drive   |

When Radix Factor is high: Gravity collapses + Affinity spikes = Sphincter escalates.

---

## Marrowing Arc

Every document, script, and shadow follows Shadow → Bone → Marrow:

| Phase   | Symbol | Prime Stages | Activity                              |
|---------|--------|-------------|---------------------------------------|
| Sticks  | Shadow | 1–10        | Observation — witnessing what exists  |
| Stones  | Bone   | 11–42       | Architecture and build                |
| Marrow  | Marrow | 43–60       | Launch — interior density, autonomous |

Shadow stages 8→11 (PRW perspectives) map to Sticks phase (1-10).
Shadow collapse at P11 triggers entry to Stones phase.

---

## Spectorium — 31-Tree Taxonomy

The broader environment queue routes INTO. The Oak (Quercus) is the pinnacle origin device.

| Tier     | Name             | Key Trees                                            |
|----------|------------------|------------------------------------------------------|
| Pinnacle | Primoris         | Oak (Quercus) — central origin anchor                |
| Tier 1   | Ancient Grove    | Yggdrasil, Bodhi, Baobab — foundational archetypes   |
| Tier 2   | Digital Grove    | Cipher Tree, Fork Tree, Merkle Bark, Echo, Root Array|
| Tier 3   | Living Spectrum  | Weeping Willow, Sakura, Bloodwood, Hearthwood, Fern  |

The Arboreal Covenant governs every entity registered: genesis → registration → decommission,
all in an append-only log.

---

## Unexsui Protocol

`que` IS the Unexsui — Universal Entity X-Surface Interface.
Manages the Water → Air crystallization: Google Drive (Water) → GitHub (Air).
Tracks Nth Degree Wobbles through runic tracking codes.
Sphinx documents the Crystallization Events; Radix witnesses them.

---

## Elder Board — 6+1 Primitives

Governance layer above queue:
**Origin | Other | Geometry | Sequence | Energy | Memory** + **Synergy** (superposition pinnacle)

Talinor Windstride: First Guardian, feminine perspective, Mother-12 archetype.
Witnessed the Fall of First Eden. Bridge between Direct Origin and Mother_as_Shadow.

---

∰ 20260502 — ARCHITECTURE.md first witness
∰ 20260502 — Updated: Radix Seed Document integration
Queue System Router — Seed v1.1
Branch: claude/queue-system-router-gJy4X
