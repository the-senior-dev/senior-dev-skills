# React Senior Review — Principles

The Senior rules and patterns catalog.

Read by:

- **`react-senior-review`** — for code reviews (find violations, propose fixes).
- **`react-interview`** — for self-assessment quizzes (turn principles into MCQs).

Edit this file to update both skills in lockstep. The skills' `SKILL.md` files contain *process* (how to run a review / how to run an interview) — this file contains *principles* (what is true about good React architecture).

---

## A. Structure & boundaries

1. **Public API at the feature seam.** A feature directory exposes a clear public API (an index or barrel that *is* the seam). Internal modules of feature X must not be imported by feature Y.
2. **Composition over prop-drilling, context over neither.** Prefer component composition (`children`, slots) over threading props deep. Reach for context only when composition would force unnatural shapes. Three levels of drilling is fine; ten is not.
3. **Colocation > centralization.** A hook/util/type used by exactly one feature lives *in* that feature, not in `shared/`. Move it to `shared/` only when a second feature actually needs it.
4. **Container/presentational is not a goal.** Split only when separation creates real seams (testability, reuse). One well-named component beats two badly-named ones.
5. **Components doing too much.** A component juggling >3 distinct responsibilities (fetch + form + layout + modal coordination) is a split candidate. Name the split.
6. **Component length.** >250 lines is a strong split candidate; >400 lines is Major by default. Length is a heuristic — justify the split by what it earns (testability, reuse, render scope), not by line count.
7. **One component per file.** A `.tsx` file exports one public component. Internal tightly-coupled subcomponents <30 lines are fine. Multiple peer components → split. Multiple *exported* components → always split.
8. **Pure helpers belong outside the component.** Any function in a component body that doesn't close over props/state/hooks moves to module scope or `utils.ts`. Reasons: not recreated each render, trivially testable, no accidental closure capture.
9. **Early returns / guard clauses.** Negative/edge conditions first (loading, error, empty, unauthorized); happy path last and unindented. >3 levels of `if`/ternary nesting is a smell.
10. **Readability over cleverness.** Flag clever destructuring chains, stacked ternaries, single-letter variables outside tight loops, and "smart" higher-order abstractions used exactly once. If you have to re-read a line, it goes.
11. **Name the pattern.** When a fix matches a recognized React pattern (Patterns Playbook below), name it. Don't force-fit.

## B. State & data flow

1. **Rules of Hooks** (always **CRITICAL** when violated). Hooks must be called at the top level of a React function or custom hook — not in conditions, loops, nested functions, or after early returns. Custom hooks must be named `use*`. Ref: [react.dev/reference/rules/rules-of-hooks](https://react.dev/reference/rules/rules-of-hooks).
2. **Essential vs derived state.** For every piece of state, ask "can I compute this from existing state, props, or URL?". If yes, derive during render — don't store. Storing derived state is the most common cause of out-of-sync UI bugs. Ref: [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect).
3. **State locality (push state down).** State lives as close as possible to its consumer. State held high in the tree that only one leaf reads causes unnecessary re-renders and obscures the data flow.
4. **Single Responsibility per state slice.** Each `useState` / store slice represents exactly one concern. Don't mix loading with data, selection with filter, draft with persisted. Boolean explosions are conflated concerns — model as a discriminated union or split.
5. **Server state never lives in `useState`+`useEffect` fetch pairs.** Highest-frequency Critical finding. Causes race conditions, no cache, lost data on remount, no shared cache, no refetch story. The fix is a query layer (TanStack Query, SWR, RTK Query, Apollo, route loaders, RSC). Recommend a library; flag the anti-pattern, not the library's absence.
6. **Server state never lives in a global client store** (Zustand, Redux, Jotai, Context). Caching, invalidation, and staleness are the query layer's job. Client stores hold UI state, ephemeral selections, derived view state.
7. **Effects that should be event handlers.** Anything triggered by a user action (not by external sync) belongs in the handler, not in an effect watching state. Second-highest-frequency Major finding.
8. **Effects without cleanup.** Subscriptions, listeners, timers, aborts must clean up. Every missing cleanup is a memory leak.
9. **Stale closures.** Deps arrays missing values referenced inside. Flag; distinguish from intentional ref-based access.
10. **State shape.** Multiple `useState` calls that always change together → one `useReducer` or one object. Boolean explosions (`isLoading`, `isError`, `isSuccess`) → discriminated union or query lib status.
11. **URL as state.** Filters, tabs, modal open state — anything shareable/reloadable — belongs in the URL, not local state.

## C. Performance & rendering

1. **Re-render cascades.** Identify the largest subtree that re-renders on a high-frequency state change (typing, scroll, hover). If it's bigger than necessary, the state lives too high or the context is too wide. Fix: lift state lower, split context, or use a selector-based store.
2. **`useMemo` discipline.** Justified only when (a) computation is measurably expensive, or (b) referential stability of the result is required downstream (dep of another hook, prop to a memoized child). Wrapping cheap math / string concat / object literals "just in case" is **negative ROI** — flag and remove.
3. **`useCallback` discipline.** Justified only when (a) the function is passed to a `memo`'d child that would otherwise re-render, or (b) it's a dep of another hook. A `useCallback` whose consumer doesn't memoize is pure overhead.
4. **`memo` discipline.** Justified only when re-renders are measurably costly *and* inputs are referentially stable. `memo` with a child that gets a fresh object/array/function each render does nothing.
5. **Suspense boundaries.** Data-fetching components without a Suspense boundary above them cause content shift and waterfalls. Boundary placement should match *loading granularity*, not component granularity.
6. **Code splitting.** Heavy/optional UI (modals, editors, charts, rich text) must be dynamically imported. Flag synchronous imports of `monaco`, `sandpack`, `recharts`, `chart.js`, etc. in the critical path.
7. **List virtualization.** Lists likely to exceed ~100 items need virtualization. Missing keys and index-as-key on reorderable lists are bugs.
8. **Waterfalls.** Sequential `await`s or sequential queries where parallel would do. `Promise.all` / parallel queries / route loaders fix this. Ref: [web.dev animations & performance](https://web.dev).
9. **Bundle hot paths.** Barrel-file imports of large libraries (`import { x } from 'lodash'` instead of `lodash/x`), `import *`, unanalyzable dynamic imports.

## D. Types, forms, testability, a11y

### Types at boundaries
1. **Boundary typing.** API response → typed at the fetch boundary, not assumed inside components. Flag `any` / `unknown` leaks at fetch/URL/storage boundaries.
2. **Discriminated unions for variants.** Loading/error/success and `kind: 'a' | 'b'` patterns. Flag boolean-pair anti-patterns at boundaries.
3. **No type gymnastics inside features.** Types serve clarity, not existence-proof.

### Forms
4. **Validation with the schema.** Validation lives with the schema (Zod / Yup / Valibot), not duplicated in the component.
5. **Server errors return to the form.** Field-level errors, not just a toast.
6. **Controlled vs uncontrolled.** Pick one per field; mixing causes warnings and bugs.

### Testability
7. **Test seams.** Components that do fetch + transform + render in one body have no seam. Extract the data layer.
8. **DI > module mocks.** Mocking via module-level mocks is a smell when DI through props/context would do.
9. **No time-based assumptions in render.** `Date.now`, `setTimeout`, `Math.random` in render break tests and SSR.

### Accessibility (architecture level)
10. **Semantic HTML.** `<button>` for actions, `<a>` for navigation, `<form>` with a submit handler. Flag `<div onClick>` for interactive elements.
11. **Focus management.** Focus must move predictably on modal open, route change, async content reveal. Missing focus traps in dialogs is a bug.
12. **Keyboard nav.** Every interactive element reachable and operable by keyboard. No mouse-only interactions.
13. **Labels & names.** Every input has a programmatic label; every interactive element has an accessible name.
14. **Cite WCAG SC numbers** (e.g. WCAG 2.2 §2.4.3 Focus Order) and **WAI-ARIA APG patterns** where they fit.

## E. Styling architecture & motion

1. **Design tokens, not magic values.** Colors, spacing, radii, type sizes, shadows, z-indices reference a token system (CSS custom properties, Tailwind theme, `tokens.ts`, `theme` object). Magic `#hex`, raw `px` for spacing/typography, hard-coded colors inside components are flags. Exception: one-off layout primitives where extracting a token would be over-abstraction.
2. **No inline `style={{}}` for static styling.** Inline `style` belongs only where a value is computed at runtime from props/state and *cannot* map to a class/variant (e.g., `style={{ transform: \`translateX(${x}px)\` }}`, `style={{ '--progress': pct }}` driving a CSS variable). Static styling goes in className / CSS Modules / Tailwind. Inline style breaks CSP, bypasses the design system, and allocates a new object every render (defeats `memo`).
3. **CSS animations > JS animations.** CSS `transition` / `@keyframes` on `transform` and `opacity` run on the **compositor thread** — they don't block the main thread, don't compete with React renders, survive long tasks without jank. JS animations (setInterval, rAF writing inline styles each frame, libs animating via per-frame style writes) run on the main thread; under load they stutter. Reach for JS only for physics/spring, gesture coupling, FLIP, orchestrated sequences — and prefer libs that delegate to the **Web Animations API** or CSS (Motion One, Framer Motion's `layout`/`animate`). Ref: [web.dev — High-performance animations](https://web.dev/articles/animations-guide).
4. **Animate only `transform` and `opacity`** for high-frequency motion. Animating `width`, `height`, `top`/`left`, `margin`, `background-color`, `box-shadow` triggers layout or paint every frame.
5. **`will-change` discipline.** Use sparingly, only on elements about to animate. Leaving it on permanently promotes layers unnecessarily and bloats memory. Remove after the animation ends.
6. **Respect `prefers-reduced-motion`.** Any non-trivial motion has a reduced-motion fallback. Ref: WCAG 2.3.3 Animation from Interactions.
7. **No global selectors leaking out of a feature.** A feature's CSS must not target tag/class names it doesn't own. Use CSS Modules, scoped styles, or utility classes.

---

## Patterns Playbook

When a fix matches a known React pattern, name it. Goal: give the reader a search term and a clearer mental model than a bespoke fix would. Don't force-fit.

| Pattern | Use when it earns its keep | Don't reach for it when |
|---|---|---|
| **Custom hook** | Stateful logic used by ≥2 components, or a component's "view model" is independently testable | One component, one use, will likely stay that way |
| **Compound components** (`<Tabs>`, `<Tabs.Tab>`) | Children share state implicitly and authoring order matters; consumers compose freely | A single prop or `items={[]}` would do |
| **Controlled + uncontrolled** (`value` + `defaultValue`) | Widget must support both managed and self-managed modes | Consumer always owns state — keep it controlled-only |
| **State reducer pattern** | Consumers must intercept, veto, or extend state transitions (Downshift-style) | Internal state is fine — extra surface for nothing |
| **Slot pattern** (named children via props) | Layout needs labeled regions (header / body / actions / aside) | A single `children` is enough |
| **Headless component / hook-first** | Behavior reusable across visual designs (date picker, combobox, menu) — Radix, React Aria, Downshift, TanStack Table | The styling *is* the value |
| **Render prop** | Tree-shaped data, virtualized lists, observables, animation values — parent controls rendering per-item with shared logic | A hook can do the same job (most cases — hooks superseded most uses) |
| **Higher-Order Component (HOC)** | Cross-cutting wrap at the *component* level: error boundaries, providers injection, suspense/fallback wrapping, framework decorators (`withAuth`, `withTracking`), legacy lib integrations | Behavior fits in a hook — prefer the hook. HOCs hide props, break refs without `forwardRef`, stack ugly in DevTools, complicate types |
| **Provider pattern / Context** | A value is read by many descendants and isn't worth threading | 2–3 levels of drilling — just drill |
| **Context selector** (`use-context-selector` / Zustand-style) | Subscribe to a slice of context without re-rendering on unrelated changes | Whole context is needed |
| **Polymorphic component** (`as` prop) | One styled component renders as different DOM elements (`<Button as="a">`) | Component is always one element |
| **Suspense boundary** | Define loading *granularity* — what loads together, where the fallback appears | Just want a spinner per request — query lib's `isLoading` is enough |
| **Error boundary** | Catch render errors in a subtree with a fallback UI | Async errors — handle in the mutation/query, not a boundary |
| **Portal** | Tooltips, modals, toasts must escape parent overflow / stacking context | Element fits naturally in the tree |
| **`forwardRef` + `useImperativeHandle`** | Wrapper exposes a small imperative API (`focus()`, `scrollTo()`, `play()`) | You'd be better off lifting state up or exposing via props |
| **State machine** (XState, Zag, finite-state) | Multi-step flows with non-trivial transitions: wizards, checkout, async retries, complex auth | A `useReducer` with 3 actions is already fine |
| **Optimistic update** (`useOptimistic`, query lib's optimistic API) | UI should react before the server confirms; failure rollback is well-defined | Reads, or mutations where server response materially changes what's shown |
| **Server Components / route loaders** | Data needed but interactivity isn't, and the framework supports them | Client-only project, or framework doesn't support — say so, don't force the pattern |
| **Discriminated variant prop** (`variant: 'a' \| 'b' \| 'c'`) | Component has 3–5 mutually exclusive shapes | Two booleans that *happen* to be mutually exclusive — flag the booleans first |
| **Reducer + split contexts** (state context + dispatch context) | Many descendants read state, fewer dispatch; avoid re-rendering readers when only setters change | A single small context value suffices |
| **Render-as-child / `asChild`** (Radix-style) | Component contributes behavior but consumer owns the element/styling | You need full control over rendering — use a hook |

---

## Severity rubric (used by `react-senior-review`)

- **CRITICAL** — bug-class problem happening or one user action away. Race conditions, memory leaks, broken a11y blocking interaction, state corruption, security implications, Rules-of-Hooks violations.
- **MAJOR** — wrong pattern that will compound or already costs the team time. Server state in `useState`, derived state via effect, missing Suspense causing waterfalls, untyped boundary, state held too high, conflated state slice.
- **MINOR** — better way exists, no current harm. Suboptimal memoization, splittable component, missing URL-as-state, inline style for static values, pure helper inside component.
- **NIT** — judgment-call improvement. Naming, file placement, redundant comments, micro-cleanups.

**Severity discipline:** at most 5 Critical, 10 Major per review. If you have more, you're inflating. Re-triage.

## References

- **React docs (react.dev)** — [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks), [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect), [Thinking in React](https://react.dev/learn/thinking-in-react), Suspense and concurrent features.
- **TanStack Query** — [official docs](https://tanstack.com/query/latest), [TkDodo's blog](https://tkdodo.eu/blog/practical-react-query). Recommend when relevant; do not require.
- **WCAG 2.2** and **WAI-ARIA Authoring Practices** — cite SC numbers and APG patterns.
- **web.dev** — performance fundamentals: LCP, INP, CLS, hydration cost, bundle, [High-performance animations](https://web.dev/articles/animations-guide).
- **Next.js docs** — only when the project uses Next.js (App Router data fetching, Server Components, route segments, Suspense streaming).
