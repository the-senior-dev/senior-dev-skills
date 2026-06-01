# Patterns Playbook

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
