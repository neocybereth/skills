---
name: prune-low-value-tests
description: Audit and prune tests that reassert implementation, duplicate another test's contract, or provide little regression protection, then simplify production seams that existed only for those tests. Use for repository-wide or change-scoped test-value sweeps, implementation-coupled or brittle test cleanup, duplicate coverage removal, and post-test-cleanup production simplification.
---

# Prune low-value tests

Make every retained test name a plausible bug it would reveal. Preserve observable behavior while reducing test and production complexity.

## Establish scope and baseline

1. Read the repository instructions, test configuration, package scripts, and relevant framework guidance.
2. Resolve the requested scope. Use the whole repository for a general sweep; use the affected tests and contracts for a change-scoped request.
3. Run the narrowest meaningful verification commands before editing. Record pre-existing failures separately.
4. Inventory the tests in scope and identify the observable contract each test claims to own.

Complete this stage when every in-scope test has a stated contract or is explicitly marked as having no behavioral contract.

## Apply the value bar

Retain a test when its failure would reveal at least one of:

- broken behavior visible through a stable public boundary;
- a violated security, privacy, authorization, or data invariant;
- a broken contract between layers, services, or external systems;
- a specific regression that could plausibly recur;
- a meaningful edge case or failure mode best isolated at that level.

Prefer the most stable public boundary that proves the behavior. Give each contract one primary test owner. Add another layer only for a distinct integration risk.

Treat these as strong pruning or consolidation signals:

- asserting source text, type declarations, fixture contents, configuration literals, option order, or exported-helper output;
- reproducing the production algorithm or branch structure inside the expected value;
- failing on an internal refactor while observable behavior remains unchanged;
- asserting mock choreography instead of a meaningful result or boundary interaction;
- proving the same contract in component, integration, and browser suites without distinct risks;
- snapshots that record implementation structure without protecting intentional output;
- tests whose only plausible failure is an intentional source, fixture, copy, or configuration edit.

Interpret signals in context. Copy, configuration, serialization shape, and interaction order can be intentional contracts. Retain them when the repository or product treats them as observable behavior.

For each pruning candidate, establish:

1. the contract it exercises;
2. where that contract is already protected, or why it has no meaningful behavioral contract;
3. the plausible regression lost by deletion, if any;
4. why deletion, consolidation, or movement to a stable boundary is safe.

Resolve uncertainty in favor of retention and report the candidate for human judgment.

## Prune and consolidate

1. Remove tests with no justified contract.
2. Consolidate duplicated coverage under its most stable owner.
3. Move valuable assertions to a better boundary when that preserves a real contract with less coupling.
4. Add replacement coverage only for a meaningful behavior or invariant exposed as unprotected by the sweep.
5. Run focused verification after each coherent group of edits so failures stay attributable.

Keep assertions strong enough to detect the named regression. A green suite is evidence only when its tests still exercise the intended contracts.

## Simplify production code

Inspect production code touched by the pruned tests. Find seams whose remaining justification is test access rather than production design:

- exports used only by tests;
- wrappers or aliases that add no production abstraction;
- dependency-injection parameters with no production variability;
- public methods that expose internals only for assertions;
- adapters, factories, or indirection whose only consumer was test scaffolding.

For each seam, identify its production reason. Remove or collapse seams with none when the result is clearer and preserves observable behavior. Retain seams that isolate real side effects, support production variation, enforce an architectural boundary, or provide another concrete production benefit.

Run focused verification after simplification, then run the broadest proportionate test, type-check, lint, and build commands available.

## Update the operating model

Capture recurrence-prevention guidance in the repository's canonical agent or testing instructions. Base additions on patterns actually found during the sweep.

- Extend an existing policy instead of restating it elsewhere.
- Keep one source of truth that both `AGENTS.md` and `CLAUDE.md` can reach through the repository's existing convention, a shared file, or a concise pointer.
- Encode the value bar: every test names a plausible bug, stable boundaries own behavior, layers cover distinct risks, and production seams require production reasons.
- Add specific local examples only when they expose a recurring trap that general guidance would miss.
- Keep the guidance concise enough to influence future implementation rather than document the completed cleanup.

Complete this stage when future Codex and Claude sessions can discover the same durable policy without duplicated instructions.

## Report

Report:

- tests removed, consolidated, or moved, with their behavioral justification;
- non-obvious candidates retained and the contract they protect;
- production seams simplified or deliberately retained;
- verification commands, results, and pre-existing failures;
- operating-model changes;
- unresolved candidates requiring human judgment.

Finish only when every test in scope has passed the value bar, every affected test-only seam has been assessed, observable contracts remain protected, proportionate verification has run, and recurrence guidance is durable.
