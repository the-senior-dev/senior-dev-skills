<img src="./cover.webp" alt="A senior wizard in sunglasses — TheSeniorDev" width="320" align="right" />

# senior-dev-skills

**Claude Code skills that ship senior engineering judgment.**

By [TheSeniorDev](https://theseniordev.com/) · MIT-licensed · Contributions welcome

<br clear="right" />

---

## What's inside

| Skill | Purpose | Invoke |
|---|---|---|
| [`react-senior-review`](./react-senior-review) | Senior-level architecture review of a React feature. Five dimensions, prioritized findings (`Critical → Nit`), `file:line` + why + concrete fix, then per-finding apply. | `/react-senior-review <path>` |
| [`react-interview`](./react-interview) | Interactive 10-question MCQ React interview. Mixed difficulty (3 junior, 4 mid, 3 senior). Per-question feedback. Final score with dimension breakdown and study plan. | `/react-interview [topic]` |

Both skills share **one** canonical knowledge file: [`react-senior-review/principles.md`](./react-senior-review/principles.md). Edit it once — both skills update in lockstep. Zero drift.

## Install

```bash
git clone https://github.com/the-senior-dev/senior-dev-skills.git ~/code/senior-dev-skills
mkdir -p ~/.claude/skills
ln -sfn ~/code/senior-dev-skills/react-senior-review ~/.claude/skills/react-senior-review
ln -sfn ~/code/senior-dev-skills/react-interview     ~/.claude/skills/react-interview
```

Now in Claude Code:

```
/react-senior-review src/features/checkout   # review a feature
/react-interview state                       # quiz yourself on state & data flow
```

`git pull` in the clone updates both skills.

> Need Claude Code? Get it at [claude.com/code](https://claude.com/code).

## Why these skills

LLM coding assistants ship a lot of code. Most of it works. Less of it is *architected* — composed for the next engineer who has to read it, not for the prompt that wrote it. These skills bring a senior engineer's review bar into your loop:

- **Opinionated.** Pick a side. No hedging. Readability > cleverness.
- **Anti-`useEffect`.** Derived state, event handlers, render-time computation — in that order.
- **Server state ≠ client state.** Server data lives in a query layer (TanStack, SWR, route loaders, RSC). Not in `useState`+`useEffect`. Not in Zustand.
- **Push state down.** State lives next to its consumer.
- **Single source of truth, not five copies.** Including for the rules themselves — hence the shared `principles.md`.
- **Name the pattern.** Custom hook? Compound components? HOC? Render prop? State machine? Optimistic update? When a known pattern fits the fix, it gets named.

## Roadmap

Each skill ships an authoritative `principles.md` and a thin `SKILL.md` that runs the workflow. Planned additions in the same monorepo:

- `node-senior-review` / `node-interview`
- `typescript-senior-review`
- `system-design-interview`

Open an issue with the area you want next.

## Contributing

The principles in `react-senior-review/principles.md` are the spine of both skills. Pull requests are welcome — especially:

- Sharper rule statements (less prose, sharper edges).
- New patterns for the playbook (with a clear "when it earns its keep / when not to reach for it").
- Better distractor calibration for interview questions.

If you're adding a new skill, mirror the layout: `SKILL.md` is the workflow, `principles.md` (or a sibling) is the knowledge.

## License

[MIT](./LICENSE) — use freely, fork freely, ship freely.

---

<p align="center">Built and battle-tested by senior engineers at <a href="https://theseniordev.com/">TheSeniorDev</a>.</p>
