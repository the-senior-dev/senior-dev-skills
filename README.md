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
ln -sfn ~/code/senior-dev-skills/react-senior-review ~/.claude/skills/react-senior-review
ln -sfn ~/code/senior-dev-skills/react-interview     ~/.claude/skills/react-interview
```

Now in Claude Code:

```
/react-senior-review src/features/checkout   # review a feature
/react-interview state                       # quiz yourself on state & data flow
```

`git pull` in the cloned repo to update both skills (you will have to copy the folders gain in your skills folder for Claude to get the updates).

> Need Claude Code? Get it at [claude.com/code](https://claude.com/code).

## Why these skills

These skills are like having a Senior Engineer by your side, pointing out things that you might have missed. 

To do that, they leverage Software Fundamentals, Design Patterns and Senior Mental Models and the power of Claude Code. Keep in mind they are:

- **Highly Opinionated.** Just like real Senior Engineers, they are biased towards Senior-level wisdom learned in decades of taking real software applications to production.
- **Anti-`useEffect`.** Derived state, event handlers, render-time computation — in that order.
- **Server state ≠ client state.** Server data lives in a query layer (TanStack, SWR, route loaders, RSC). Not in `useState`+`useEffect`. Not in Zustand.
- **Push state down.** State lives next to its consumer. Or, as close as possible.
- **Single source of truth.** Everything that can be shared, should be shared. Hence the `principles.md`.
- **Name the pattern.** Custom hook? Compound components? HOC? Render prop? State machine? Optimistic update? 

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
