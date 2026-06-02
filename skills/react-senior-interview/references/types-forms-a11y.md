# D. Types, forms, testability, a11y

## Types at boundaries
1. **Boundary typing.** API response → typed at the fetch boundary, not assumed inside components. Flag `any` / `unknown` leaks at fetch/URL/storage boundaries.
2. **Discriminated unions for variants.** Loading/error/success and `kind: 'a' | 'b'` patterns. Flag boolean-pair anti-patterns at boundaries.
3. **No type gymnastics inside features.** Types serve clarity, not existence-proof.

## Forms
4. **Validation with the schema.** Validation lives with the schema (Zod / Yup / Valibot), not duplicated in the component.
5. **Server errors return to the form.** Field-level errors, not just a toast.
6. **Controlled vs uncontrolled.** Pick one per field; mixing causes warnings and bugs.

## Testability
7. **Test seams.** Components that do fetch + transform + render in one body have no seam. Extract the data layer.
8. **DI > module mocks.** Mocking via module-level mocks is a smell when DI through props/context would do.
9. **No time-based assumptions in render.** `Date.now`, `setTimeout`, `Math.random` in render break tests and SSR.

## Accessibility (architecture level)
10. **Semantic HTML.** `<button>` for actions, `<a>` for navigation, `<form>` with a submit handler. Flag `<div onClick>` for interactive elements.
11. **Focus management.** Focus must move predictably on modal open, route change, async content reveal. Missing focus traps in dialogs is a bug.
12. **Keyboard nav.** Every interactive element reachable and operable by keyboard. No mouse-only interactions.
13. **Labels & names.** Every input has a programmatic label; every interactive element has an accessible name.
14. **Cite WCAG SC numbers** (e.g. WCAG 2.2 §2.4.3 Focus Order) and **WAI-ARIA APG patterns** where they fit.
