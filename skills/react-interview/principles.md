# React Senior Review — Principles (Index)

The Senior rules and patterns catalog, split into focused references under [`references/`](./references/). This file is the **router**: it says which file holds what. The rules themselves live in the linked files — don't paraphrase from this index.

> **Canonical source.** This catalog lives in `react-senior-review/`. `react-interview/` carries a **synced copy** so both skills work independently — after editing here, run `scripts/sync-references.sh` from the repo root to propagate.

Read by:

- **`react-senior-review`** — for code reviews (find violations, propose fixes).
- **`react-interview`** — for self-assessment quizzes (turn principles into MCQs).

Edit a file under `references/` to update both skills in lockstep. The skills' `SKILL.md` files hold *process* (how to run a review / interview); the files below hold *principles* (what is true about good React architecture).

## How to load

- **Reviews, and broad interviews:** read every file in `references/`.
- **Focused interviews / targeted reviews:** read this index, then only the dimension file(s) you need.

## The catalog

| Section | File | Covers |
|---|---|---|
| **A. Structure & boundaries** | [references/structure-boundaries.md](./references/structure-boundaries.md) | composition, feature seams, component length, one-per-file, pure helpers, early returns, readability, pattern naming |
| **B. State & data flow** | [references/state-data-flow.md](./references/state-data-flow.md) | essential-vs-derived, state locality, SRP per slice, server-state-in-query-layer, effect misuse, URL-as-state |
| **B.1 Rules of Hooks** | [references/rules-of-hooks.md](./references/rules-of-hooks.md) | the two rules, why call order matters, common violations, lint enforcement (always CRITICAL) |
| **C. Performance & rendering** | [references/performance.md](./references/performance.md) | re-render scope, memo/useMemo/useCallback discipline, Suspense, code splitting, virtualization, waterfalls, bundle |
| **D. Types, forms, testability, a11y** | [references/types-forms-a11y.md](./references/types-forms-a11y.md) | boundary typing, RHF/Zod, test seams, semantic HTML, focus, WCAG |
| **E. Styling architecture & motion** | [references/styling-motion.md](./references/styling-motion.md) | design tokens, inline-style discipline, compositor-thread animation, reduced motion, scoped selectors |
| **Patterns Playbook** | [references/patterns-playbook.md](./references/patterns-playbook.md) | when each named React pattern earns its keep |
| **Severity rubric** | [references/severity-rubric.md](./references/severity-rubric.md) | CRITICAL → NIT definitions and caps (used by `react-senior-review`) |
| **References** | [references/react-docs.md](./references/react-docs.md) | curated links to react.dev, TanStack Query, WCAG, web.dev, Next.js |
