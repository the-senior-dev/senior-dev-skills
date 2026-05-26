<img src="./cover.webp" alt="A senior wizard in sunglasses — TheSeniorDev" width="320" align="right" />

# senior-dev-skills

**Claude Code skills to help you think like a Senior Engineer.**

By [TheSeniorDev](https://theseniordev.com/) · MIT-licensed · Contributions welcome

<br clear="right" />

---

## What's inside

| Skill | What it does | Invoke |
|---|---|---|
| [`react-senior-review`](./react-senior-review) | Review React features like a Senior Engineer. | `/react-senior-review <path>` |
| [`react-interview`](./react-interview) | Senior level React interview practice to nail your next interview. | `/react-interview [topic]` |

Both skills share **one** core knowledge file: [`react-senior-review/principles.md`](./react-senior-review/principles.md). Edit it once — both skills update.

## Install

```bash
git clone https://github.com/the-senior-dev/senior-dev-skills.git ~/code/senior-dev-skills
mkdir -p ~/.claude/skills
ln -sfn ~/code/senior-dev-skills/skills/react-senior-review ~/.claude/skills/react-senior-review
ln -sfn ~/code/senior-dev-skills/skills/react-interview     ~/.claude/skills/react-interview
```

Now in Claude Code:

```
/react-senior-review src/features/checkout   # review a feature
/react-interview state                       # quiz yourself on state & data flow
```

Because the skills are **symlinked** into `~/.claude/skills`, a `git pull` in the cloned repo updates both skills automatically — the changes are picked up next time you start Claude Code. No copying required.

> Need Claude Code? Get it at [claude.com/code](https://claude.com/code).

## Why these skills

These skills are like having a Senior Engineer by your side, pointing out things that you might have missed. 

To do that, they leverage Software Fundamentals, Design Patterns and Senior Mental Models and the power of Claude Code. Keep in mind they are:

- **Highly opinionated.** Biased toward what holds up in production — the wisdom a senior reviewer brings, not a neutral checklist.
- **Anti-`useEffect`.** Reach for derived state first, then event handlers, then render-time computation. Effects are the last resort.
- **Server state ≠ client state.** Server data lives in a query layer (TanStack Query, SWR, route loaders, RSC) — never in `useState`+`useEffect`, never in Zustand.
- **Push state down.** State lives as close to its consumer as possible.
- **Colocate, then share.** Code used by one feature stays in that feature; promote it to `shared/` only when a second feature actually needs it.
- **Name the pattern.** Custom hook? Compound components? HOC? Render prop? State machine? Optimistic update? If a known pattern fits the fix, it gets named.

## Roadmap

Each skill ships an authoritative `principles.md` and a thin `SKILL.md` that runs the workflow. Planned additions in the same monorepo:

- `node-senior-review` / `node-interview`
- `typescript-senior-review`
- `system-design-interview`

You can open an issue with the area you want next.

## Contributing

The principles in `react-senior-review/principles.md` are the core of both skills. Pull requests are welcome — especially:

- Sharper rule statements (less verbose).
- New patterns (with a clear "when it makes sense / when not").
- Better calibration for interview questions.

If you're adding a new skill, mirror the layout: `SKILL.md` is the workflow, `principles.md` (or a sibling) is the knowledge.

## License

[MIT](./LICENSE) — use freely, fork freely, ship freely.

---

<p align="center">Built and battle-tested by <a href="https://github.com/bogdanned">bogdanned</a> & <a href="https://github.com/dragosgn">dragosgn</a> at <a href="https://theseniordev.com/">TheSeniorDev</a>.</p>
