<img src="./cover.webp" alt="A senior wizard in sunglasses — TheSeniorDev" width="320" align="right" />

# react-interview

**Interview yourself. Find your gaps. Close them.**

A 10-question multiple-choice React interview, run interactively inside Claude Code. Built by [TheSeniorDev](https://theseniordev.com/) — paired with [`react-senior-review`](../react-senior-review/).

<br clear="right" />

## Install

This skill ships in the [`senior-dev-skills`](https://github.com/the-senior-dev/senior-dev-skills) monorepo and **requires `react-senior-review`** to be installed alongside it — it reads `react-senior-review/principles.md` as its question source.

```bash
git clone https://github.com/the-senior-dev/senior-dev-skills.git ~/code/senior-dev-skills
mkdir -p ~/.claude/skills
ln -sfn ~/code/senior-dev-skills/react-senior-review ~/.claude/skills/react-senior-review
ln -sfn ~/code/senior-dev-skills/react-interview     ~/.claude/skills/react-interview
```

Then in Claude Code:

```
/react-interview
```

Or jump straight to a focus area:

```
/react-interview state
/react-interview performance
/react-interview patterns
```

## How it works

1. **Pick scope** — broad (all 5 dimensions + patterns) or focused on one topic.
2. **10 questions, 4 options each, mixed difficulty** — 3 junior, 4 mid, 3 senior. One principle per question. Plausible distractors.
3. **Per-question feedback** — instant correct/incorrect + 2–3 sentence rationale citing the principle.
4. **Final result** — score out of 10, band (junior → senior+), breakdown by dimension, recommended next steps linked to the source principles.

Each question is grounded in [`principles.md`](../react-senior-review/principles.md) — the same canonical rule catalog used by the senior-review skill. Edit one file to update both skills.

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
