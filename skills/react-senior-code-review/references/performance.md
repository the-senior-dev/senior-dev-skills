# C. Performance & rendering

1. **Re-render cascades.** Identify the largest subtree that re-renders on a high-frequency state change (typing, scroll, hover). If it's bigger than necessary, the state lives too high or the context is too wide. Fix: lift state lower, split context, or use a selector-based store.
2. **`useMemo` discipline.** Justified only when (a) computation is measurably expensive, or (b) referential stability of the result is required downstream (dep of another hook, prop to a memoized child). Wrapping cheap math / string concat / object literals "just in case" is **negative ROI** — flag and remove.
3. **`useCallback` discipline.** Justified only when (a) the function is passed to a `memo`'d child that would otherwise re-render, or (b) it's a dep of another hook. A `useCallback` whose consumer doesn't memoize is pure overhead.
4. **`memo` discipline.** Justified only when re-renders are measurably costly *and* inputs are referentially stable. `memo` with a child that gets a fresh object/array/function each render does nothing.
5. **Suspense boundaries.** Data-fetching components without a Suspense boundary above them cause content shift and waterfalls. Boundary placement should match *loading granularity*, not component granularity.
6. **Code splitting.** Heavy/optional UI (modals, editors, charts, rich text) must be dynamically imported. Flag synchronous imports of `monaco`, `sandpack`, `recharts`, `chart.js`, etc. in the critical path.
7. **List virtualization.** Lists likely to exceed ~100 items need virtualization. Missing keys and index-as-key on reorderable lists are bugs.
8. **Waterfalls.** Sequential `await`s or sequential queries where parallel would do. `Promise.all` / parallel queries / route loaders fix this. Ref: [web.dev animations & performance](https://web.dev).
9. **Bundle hot paths.** Barrel-file imports of large libraries (`import { x } from 'lodash'` instead of `lodash/x`), `import *`, unanalyzable dynamic imports.
