# Senior Dev Skills for AI Coding Agents

<img src="./cover.webp" alt="A senior wizard in sunglasses — TheSeniorDev" width="320" align="right" />

**Coding agent skills to think like a Senior Engineer.**

By [TheSeniorDev](https://theseniordev.com/) · MIT-licensed · Contributions welcome

<br clear="right" />

---

## Install

```bash
npx skills@latest add the-senior-dev/senior-dev-skills
```

Or with Claude Code's native plugin marketplace:

```
/plugin marketplace add the-senior-dev/senior-dev-skills
/plugin install senior-dev-skills@senior-dev-skills
```

Restart Claude Code (or open a new session) to pick up the new skills.

> Need Claude Code? Get it at [claude.com/code](https://claude.com/code).

## How to use in Claude Code

Invoke a skill by name, with an optional argument:

```
/react-senior-code-review src/features/checkout   # review a feature
/react-senior-interview state                       # quiz yourself on state & data flow
```

`react-senior-code-review` takes a path to the feature you want reviewed; `react-senior-interview` takes an optional topic (or none, for a broad interview).

## What's inside

| Skill | What it does | Invoke |
|---|---|---|
| [`react-senior-code-review`](./skills/react-senior-code-review) | Review React code like a Senior. | `/react-senior-code-review <path>` |
| [`react-senior-interview`](./skills/react-senior-interview) | Senior level React interview practice. | `/react-senior-interview [topic]` |

These skills are like having a Senior Engineer by your side, pointing out things you might have missed. They leverage Software Fundamentals, Design Patterns, and Senior Mental Models together with the power of Claude Code. Keep in mind they are:

- **Highly opinionated.** Biased toward what holds up in production — the wisdom a senior reviewer brings, not a neutral checklist.
- **Anti-`useEffect`.** Reach for derived state first, then event handlers, then render-time computation. Effects are the last resort.
- **Server state ≠ client state.** Server data lives in a query layer (TanStack Query, SWR, route loaders, RSC) — never in `useState`+`useEffect`, never in Zustand.
- **Push state down.** State lives as close to its consumer as possible.
- **Colocate, then share.** Code used by one feature stays in that feature; promote it to `shared/` only when a second feature actually needs it.
- **Name the pattern.** Custom hook? Compound components? HOC? Render prop? State machine? Optimistic update? If a known pattern fits the fix, it gets named.

Both skills run on the same rules catalog — one file per dimension, plus Rules of Hooks, the patterns playbook, the severity rubric, and curated docs. The canonical copy lives in [`skills/react-senior-code-review/references/`](./skills/react-senior-code-review/references) (indexed by [`principles.md`](./skills/react-senior-code-review/principles.md)); `react-senior-interview` carries a **synced copy** so each skill installs and runs independently. Edit the canonical files, then run `scripts/sync-references.sh`.

## Roadmap

Each skill ships an authoritative knowledge catalog (a `references/` folder indexed by `principles.md`) and a thin `SKILL.md` that runs the workflow. Planned additions in the same monorepo:

- `node-senior-review` / `node-interview`
- `typescript-senior-review`
- `system-design-interview`

You can open an issue with the area you want next.

## Contributing

The principles in `skills/react-senior-code-review/references/` are the core of both skills. Pull requests are welcome — especially:

- Sharper rule statements (less verbose).
- New patterns (with a clear "when it makes sense / when not").
- Better calibration for interview questions.

If you're adding a new skill, mirror the layout: `SKILL.md` is the workflow, a `references/` folder (indexed by `principles.md`) is the knowledge.

## License

[MIT](./LICENSE) — use freely, fork freely, ship freely.

---

<p align="center">Built and battle-tested by <a href="https://github.com/bogdanned">bogdanned</a> & <a href="https://github.com/dragosgn">dragosgn</a> at <a href="https://theseniordev.com/">TheSeniorDev</a>.</p>
