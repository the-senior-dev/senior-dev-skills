# react-senior-review

<p align="center">
  <img src="./cover.webp" alt="A senior wizard in sunglasses — TheSeniorDev" width="640" />
</p>

<p align="center"><strong>Senior eyes on your feature, on demand.</strong></p>

An opinionated Claude Code skill that reviews a React feature's **architecture** — not its lint, not its tests, not its pixels — and returns prioritized findings with concrete fixes. Built by [TheSeniorDev](https://theseniordev.com/).

## What it reviews (five dimensions)

1. **Structure & boundaries** — composition, feature seams, colocation vs centralization, public APIs, component length, one-component-per-file, pure helpers hoisted out of render, early returns, readability over cleverness.
2. **State & data flow** — Rules of Hooks, essential-vs-derived state, state locality (push state down), SRP per state slice, server vs client state, effect misuse, URL-as-state.
3. **Performance & rendering** — re-render scope, `useMemo` / `useCallback` / `memo` discipline (cargo-cult is flagged, never added), Suspense, code splitting, waterfalls.
4. **Types, forms, testability, a11y** — boundary types, RHF/Zod patterns, test seams, semantic HTML, focus management, WCAG 2.2.
5. **Styling architecture & motion** — design tokens (no magic values), inline-`style` discipline, CSS-first animations (compositor thread, not main thread), `transform`/`opacity` only for high-frequency motion, `prefers-reduced-motion`, no global selectors leaking out of features.

Plus a **Patterns Playbook** that names the right React pattern when one fits — custom hook, compound components, headless, render prop, HOC, state machine, optimistic update, server components, polymorphic, and more — with a "when it earns its keep / when not to reach for it" matrix.

## What it does not review

Pixel polish, naming bikesheds, formatting, test coverage, absence of a specific library, or speculative future-proofing.

## Install

This skill ships in the [`senior-dev-skills`](https://github.com/the-senior-dev/senior-dev-skills) monorepo. Easiest setup — clone once, symlink each skill into your Claude Code skills directory so `git pull` keeps everything fresh:

```bash
git clone https://github.com/the-senior-dev/senior-dev-skills.git ~/code/senior-dev-skills
mkdir -p ~/.claude/skills
ln -sfn ~/code/senior-dev-skills/react-senior-review ~/.claude/skills/react-senior-review
ln -sfn ~/code/senior-dev-skills/react-interview     ~/.claude/skills/react-interview   # optional, paired skill
```

Then in Claude Code:

```
/react-senior-review src/features/checkout
```

## Output

A short **Feature Map**, then findings grouped by severity (`CRITICAL` → `MAJOR` → `MINOR` → `NIT`). Each finding has `file:line`, a one-line title, a two-sentence "why", and a concrete fix snippet (with a pattern name when one fits). After the report, the skill asks which findings to apply — it does not apply anything unprompted.

## Opinions baked in

- **Readability > cleverness** — a strong mid-level dev should be able to modify the feature without spelunking.
- **Anti-`useEffect`** — derived state, event handlers, and render-time computation beat effects. Follows [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect).
- **Server state ≠ client state** — server data belongs in a query layer (TanStack Query / SWR / route loaders / RSC), not in `useState`+`useEffect` and not in Zustand. The library is a recommendation; the anti-pattern is the finding.
- **Essential vs derived state** — if you can compute it, don't store it.
- **State locality** — push state as close to its consumer as possible.
- **Colocation > centralization** — a hook/util/type used by one feature lives in that feature.
- **Types at boundaries, not everywhere** — strict at fetch/URL/storage seams; no gymnastics inside.
- **Design tokens, not magic values** — every color/spacing/radius comes from a token system.
- **CSS animations > JS animations** — compositor thread beats main thread; reach for JS only for physics, gestures, FLIP, or orchestrated sequences.
- **Name the pattern** — when a known React pattern fits the fix, name it. Don't force-fit.

## License

MIT.
