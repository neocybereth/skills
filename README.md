# Skills

Portable, version-controlled agent skills for Codex and Claude Code. This
repository can be installed either as an Agent Skills collection or as a
Claude/Codex plugin marketplace.

## Included skills

- [`prune-low-value-tests`](skills/prune-low-value-tests/SKILL.md) audits test value, removes implementation-coupled or duplicative coverage, simplifies test-only production seams, and records durable testing guidance.
- [`qa-ux-plan`](skills/qa-ux-plan/SKILL.md) creates end-to-end QA and UX verification plans from a branch diff without executing tests.
- [`qa-ux-verify`](skills/qa-ux-verify/SKILL.md) executes QA and UX plans with browser automation and produces evidence-backed HTML reports without fixing product issues.
- [`whatdidido`](skills/whatdidido/SKILL.md) scans timestamped Codex task turns for a requested timeframe and turns verified outcomes into a polished, standalone HTML recap. Its bundled example uses fictional work data.
- [`define-goal`](skills/define-goal/SKILL.md) turns fuzzy work into a measurable objective with explicit verification.
- [`last30days`](skills/last30days/SKILL.md) researches current discussion across social and web sources.
- [`graphify`](skills/graphify/SKILL.md) maps and queries codebases and document collections as a knowledge graph.
- [`frontend-design`](skills/frontend-design/SKILL.md) builds polished, production-ready interfaces with strong product fit.
- The complete Compound Engineering 3.22.4 suite adds 33 workflows for brainstorming, planning, implementation, debugging, review, shipping, and captured learnings.

## Install

Use the Agent Skills installer and select Codex, Claude Code, or both:

```bash
npx skills@latest add neocybereth/skills
```

## Install as a Claude Code plugin

```text
/plugin marketplace add neocybereth/skills
/plugin install neocybereth-skills@neocybereth-skills
```

Open `/plugin`, choose **Marketplaces**, select `neocybereth-skills`, and choose
**Enable auto-update**. Because this is a private GitHub repository,
background updates need `GH_TOKEN` or `GITHUB_TOKEN` with read access.

For managed project setup, copy [`.claude/settings.example.json`](.claude/settings.example.json)
to `.claude/settings.json` in the consuming project.

## Install as a Codex plugin

```bash
codex plugin marketplace add neocybereth/skills --ref main
```

Run `/plugins`, open the **Neocybereth Skills** marketplace, install
`neocybereth-skills`, and start a new session. Refresh it after repository
updates with:

```bash
codex plugin marketplace upgrade neocybereth-skills
```

Codex currently documents custom Git marketplace refresh through
`marketplace upgrade`; it does not document a per-marketplace auto-update
switch.

## Publishing updates

When skill content changes, bump `version` in both plugin manifests before
pushing. Claude Code auto-update uses that version to decide whether to
replace the cached plugin. To roll back, revert the breaking change, bump the
version again, and push; do not reuse a published version for different
content.

Third-party sources and licenses are recorded in [`NOTICE.md`](NOTICE.md).
