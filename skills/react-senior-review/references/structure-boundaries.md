# A. Structure & boundaries

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
11. **Name the pattern.** When a fix matches a recognized React pattern ([patterns-playbook.md](./patterns-playbook.md)), name it. Don't force-fit.
