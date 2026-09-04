---
name: double-check
description: Reflect on and improve newly written or modified code before handoff. Use automatically after any code change—including implementation, tests, scripts, migrations, and configuration with executable logic—and when the user asks to double-check, reconsider, simplify, or improve an implementation. Skip read-only and prose-only tasks.
---

# Double Check

Review the work after implementation and before the final response. Treat the current diff, the user's request, and repository instructions as the source of truth.

## Inspect

1. Identify the files changed for the current request. Separate them from pre-existing or unrelated work and leave unrelated changes untouched.
2. Read the resulting code in context, not only the edited lines.
3. Revisit the original request and ask:
   - Is this the simplest clear solution that fully solves the problem?
   - What opportunities for simplification or improvement emerged while writing it?
   - Did the implementation introduce duplication, unnecessary abstraction, compatibility baggage, or speculative behavior?
   - Are names, boundaries, errors, edge cases, and tests appropriate for the actual risk?
   - Does every changed line earn its maintenance cost?

## Improve

Act on clear, in-scope findings immediately. Prefer deleting accidental complexity, tightening an existing abstraction, or strengthening a meaningful test over adding commentary or machinery.

Do not expand the requested scope, refactor unrelated code, weaken checks, or churn a sound implementation merely to produce a change. If the current solution is already the best practical option, leave it intact.

After making improvements, re-read the final diff once. Stop when no material, in-scope improvement remains; do not turn reflection into an open-ended rewrite loop.

## Verify

Run the narrowest relevant tests and required repository checks for the final code, including the configured cyclomatic-complexity lint. If no such complexity check exists, keep decision logic simple and report that the check was unavailable. Treat failures as feedback: fix regressions caused by the change and clearly distinguish pre-existing failures.

## Handoff

Briefly state one of:

- what the double-check improved and which verification passed; or
- that the double-check found no material improvement, with the verification performed.

Surface unresolved risks or assumptions. Keep private chain-of-thought private; report only conclusions, actions, and evidence.
