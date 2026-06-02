# B.1 — Rules of Hooks

**Severity: always CRITICAL when violated.** This is the one rule in the catalog with no judgment call — a violation is a latent bug, not a style opinion.

Canonical source: [react.dev/reference/rules/rules-of-hooks](https://react.dev/reference/rules/rules-of-hooks). When in doubt, defer to the docs, not to memory.

## The two rules

1. **Only call hooks at the top level.** Never inside conditions, loops, nested functions, `try/catch`, or after an early `return`. React identifies hooks by *call order*; anything that makes the order vary between renders corrupts the state-to-hook mapping.
2. **Only call hooks from React functions.** Call them from a component body or from another custom hook — never from a plain JS function, an event handler, a class, or a `useMemo`/`useEffect` callback. Custom hooks must be named `use*` so the linter and React can recognize them.

## Why it breaks

React stores hook state in a list keyed by the order hooks are called. On every render that order must be identical. A conditional hook means render N has 3 hooks and render N+1 has 4 — now `useState` #3's state is read into hook #4's slot. Symptoms: state "jumping" between fields, effects firing for the wrong values, and `Rendered fewer/more hooks than expected` crashes.

## Common violations

Conditional call after a guard:

```tsx
// ❌ hook after an early return — order changes when `id` is null
function Profile({ id }: { id: string | null }) {
  if (!id) return <Empty />;
  const [user, setUser] = useState<User | null>(null); // sometimes called, sometimes not
  // ...
}

// ✅ all hooks first, guard in render
function Profile({ id }: { id: string | null }) {
  const [user, setUser] = useState<User | null>(null);
  if (!id) return <Empty />;
  // ...
}
```

Hook in a loop / callback:

```tsx
// ❌ count varies → order varies
items.forEach((item) => {
  const [open, setOpen] = useState(false);
});

// ✅ lift the per-item state into a child component — one hook per render of that child
function Row({ item }: { item: Item }) {
  const [open, setOpen] = useState(false);
  // ...
}
```

Hook from a non-React function:

```tsx
// ❌ not a component, not a use* hook
function getTheme() {
  return useContext(ThemeContext); // illegal
}

// ✅ name it use*, call it from a component/hook
function useTheme() {
  return useContext(ThemeContext);
}
```

## Enforcement

- Add `eslint-plugin-react-hooks` and enable `react-hooks/rules-of-hooks` (error) and `react-hooks/exhaustive-deps` (warn). The linter catches the structural violations statically.
- `exhaustive-deps` is the sibling rule: a deps array missing a value referenced inside the effect/callback causes **stale closures** (see [state-data-flow.md](./state-data-flow.md), B.9). Don't silence it by deleting deps — fix the dependency or restructure.

## In review

Flag any hook called below an early return, inside `if` / `&&` / ternary / `for` / `map`, inside a regular nested function, or any `use*` call from something that isn't a component or a `use*` hook. No severity debate — it's CRITICAL.
