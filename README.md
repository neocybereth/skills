# Skills

Portable agent skills for Codex and Claude Code.

## Included skills

- [`prune-low-value-tests`](skills/prune-low-value-tests/SKILL.md) audits test value, removes implementation-coupled or duplicative coverage, simplifies test-only production seams, and records durable testing guidance.
- [`qa-ux-plan`](skills/qa-ux-plan/SKILL.md) creates end-to-end QA and UX verification plans from a branch diff without executing tests.
- [`qa-ux-verify`](skills/qa-ux-verify/SKILL.md) executes QA and UX plans with browser automation and produces evidence-backed HTML reports without fixing product issues.
- [`whatdidido`](skills/whatdidido/SKILL.md) scans timestamped Codex task turns for a requested timeframe and turns verified outcomes into a polished, standalone HTML recap. Its bundled example uses fictional work data.

## Install

Use the Agent Skills installer and select Codex, Claude Code, or both:

```bash
npx skills@latest add neocybereth/skills
```
