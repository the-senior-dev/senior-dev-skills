<img src="./cover.webp" alt="A senior wizard in sunglasses — TheSeniorDev" width="320" align="right" />

# react-senior-interview

**Interview yourself. Find your gaps. Close them.**

A 10-question multiple-choice React interview, run interactively inside Claude Code. Built by [TheSeniorDev](https://theseniordev.com/) — paired with [`react-senior-code-review`](../react-senior-code-review/).

<br clear="right" />

## Install

This skill ships in the [`senior-dev-skills`](https://github.com/the-senior-dev/senior-dev-skills) repo and is **self-contained** — it carries its own copy of the rules catalog (`references/`, indexed by `principles.md`), so it installs and runs on its own.

```bash
npx skills@latest add the-senior-dev/senior-dev-skills
```

Then in Claude Code:

```
/react-senior-interview
```

Or jump straight to a focus area:

```
/react-senior-interview state
/react-senior-interview performance
/react-senior-interview patterns
```

## How it works

1. **Pick scope** — broad (all 5 dimensions + patterns) or focused on one topic.
2. **10 questions, 4 options each, mixed difficulty** — 3 junior, 4 mid, 3 senior. One principle per question. Plausible distractors.
3. **Per-question feedback** — instant correct/incorrect + 2–3 sentence rationale citing the principle.
4. **Final result** — score out of 10, band (junior → senior+), breakdown by dimension, recommended next steps linked to the source principles.

Each question is grounded in this skill's [`references/`](./references) catalog (indexed by [`principles.md`](./principles.md)) — a synced copy of `react-senior-code-review`'s canonical rules. To change a rule, edit it in `react-senior-code-review/` and run `scripts/sync-references.sh`.

## Topics

- `broad` — default; 10 questions across all dimensions
- `structure` — composition, seams, component length, readability
- `state` — Rules of Hooks, derived state, server vs client, effects
- `performance` — re-renders, memo discipline, Suspense, splitting
- `types-forms-a11y` — boundary typing, RHF/Zod, semantic HTML, focus
- `styling` — design tokens, inline-style, CSS-vs-JS animations
- `patterns` — custom hook, compound, headless, HOC, render prop, state machine, etc.

## License

MIT.
