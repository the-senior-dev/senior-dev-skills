# References — curated docs

Cite the canonical source, not training memory. These are the docs the principles are grounded in; link the most specific page that backs a finding.

## React (react.dev)
- [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks) — top-level + React-functions-only. Always CRITICAL when violated. See [rules-of-hooks.md](./rules-of-hooks.md).
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) — derived state, event-handler-in-disguise, the canonical anti-effect guide. Backs B.2 and B.7.
- [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects) and [Lifecycle of Reactive Effects](https://react.dev/learn/lifecycle-of-reactive-effects) — when an effect *is* the right tool, and cleanup. Backs B.8.
- [Thinking in React](https://react.dev/learn/thinking-in-react) — state ownership, single source of truth, push-state-down. Backs B.3.
- [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context) and [Scaling Up with Reducer and Context](https://react.dev/learn/scaling-up-with-reducer-and-context) — context vs drilling. Backs A.2.
- [`memo`](https://react.dev/reference/react/memo), [`useMemo`](https://react.dev/reference/react/useMemo), [`useCallback`](https://react.dev/reference/react/useCallback) — each page's "when NOT to use" section backs C.2–C.4.
- [`<Suspense>`](https://react.dev/reference/react/Suspense) and [`useOptimistic`](https://react.dev/reference/react/useOptimistic) — loading granularity and optimistic UI.

## Server data / query layer
- [TanStack Query](https://tanstack.com/query/latest) — server-state ownership, cache, invalidation. Recommend when relevant; flag the anti-pattern, not the library's absence.
- [TkDodo — Practical React Query](https://tkdodo.eu/blog/practical-react-query) — the canonical opinionated companion to TanStack Query.

## Accessibility
- [WCAG 2.2 — Success Criteria](https://www.w3.org/TR/WCAG22/) — cite SC numbers (e.g. §2.4.3 Focus Order, §2.3.3 Animation from Interactions).
- [WAI-ARIA Authoring Practices (APG)](https://www.w3.org/WAI/ARIA/apg/patterns/) — name the pattern (dialog, combobox, tabs) when a fix maps to one.

## Performance & motion
- [web.dev — High-performance animations](https://web.dev/articles/animations-guide) — compositor-thread `transform`/`opacity`. Backs E.3–E.4.
- [web.dev — Core Web Vitals](https://web.dev/articles/vitals) — LCP, INP, CLS framing for performance findings.

## Framework (only when it applies)
- [Next.js — Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching) and [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) — only when the project uses Next.js. Don't force RSC/route-loader fixes on a client-only project.
