# Third-party notices

This repository vendors reusable AI-agent skills so they can be reviewed,
pinned, and rolled back together. Each component keeps its original license
file where one was supplied.

| Component | Version | Upstream | License |
| --- | --- | --- | --- |
| Compound Engineering | 3.22.4 | https://github.com/EveryInc/compound-engineering-plugin | MIT (`third_party/compound-engineering/LICENSE`) |
| last30days | 3.21.0 | https://github.com/mvanhorn/last30days-skill | MIT (`third_party/last30days/LICENSE`) |
| frontend-design | vendored 2026-08-21 | Installed skill distribution | Apache-2.0 (`skills/frontend-design/LICENSE.txt`) |
| define-goal | vendored 2026-08-21 | Personal Codex skill | Apache-2.0 (`skills/define-goal/LICENSE.txt`) |

The vendored Compound Engineering skills retain upstream cross-host
frontmatter such as `argument-hint` and `disable-model-invocation`. The local
Codex scaffold validator reports those upstream compatibility keys even though
the same 3.22.4 distribution is installed and active in Codex. The skill
instructions were not rewritten to silence a validator mismatch.

`graphify`, `whatdidido`, `qa-ux-plan`, `qa-ux-verify`, and
`prune-low-value-tests` come from the repository owner's personal skill
library. No repository-wide license is granted by this notice.
