# Severity rubric (used by `react-senior-code-review`)

- **CRITICAL** — bug-class problem happening or one user action away. Race conditions, memory leaks, broken a11y blocking interaction, state corruption, security implications, Rules-of-Hooks violations.
- **MAJOR** — wrong pattern that will compound or already costs the team time. Server state in `useState`, derived state via effect, missing Suspense causing waterfalls, untyped boundary, state held too high, conflated state slice.
- **MINOR** — better way exists, no current harm. Suboptimal memoization, splittable component, missing URL-as-state, inline style for static values, pure helper inside component.
- **NIT** — judgment-call improvement. Naming, file placement, redundant comments, micro-cleanups.

**Severity discipline:** at most 5 Critical, 10 Major per review. If you have more, you're inflating. Re-triage.
