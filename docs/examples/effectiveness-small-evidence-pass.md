# Small Harness Effectiveness Evidence Pass

## Target

- Repository: local Django REST Framework recipe-api practice target
- Stack and framework: Python, Django, Django REST Framework
- Evaluation date or window: 2026-06-03
- Agent or model: AI coding agent with human review
- Evaluation mode: harnessed-only tracking

## Primary Metric

The primary metric for this pass is whether review-relevant agent outcome gaps became observable and correctable through harness artifacts and checks.

This pass tracks:

- wrong-file edits
- repeated known mistakes
- first-pass verification result
- drift violations detected
- human rework minutes
- reverted files

Harness Doctor scores and passing checks are recorded only as harness health signals. They are not treated as proof of agent effectiveness.

## Task Set

| Task ID | Scenario | Expected boundary | Common failure |
| --- | --- | --- | --- |
| recipe-api-harness-adoption-cleanup | Refine initial harness adoption | AGENTS.md, docs, .harness, scripts, README, tests | Generic scaffolding, weak tests, docs drift |
| recipe-api-add-category-feature | Add Category model/API support | recipes app, migration, tests, README, domain docs, decision record | Missing migration, wrong-file edits, missing decision memory |
| recipe-api-category-update-test-hardening | Add category PATCH coverage and fix dependency ADR | tests and one ADR | Incomplete verification coverage, truncated record |

## Results

| Metric | Baseline | Harnessed | Delta |
| --- | --- | --- | --- |
| Wrong-file edits | Not available | 0 across 3 recorded tasks | Inconclusive; no baseline |
| Repeated mistakes | Not available | 0 repeated known mistakes observed | Inconclusive; no baseline |
| First-pass verification success | Not available | 1 pass, 1 fail-then-pass, 1 pass-with-review-gap | Mixed; review still needed |
| Drift violations detected | Not available | 3 adoption drift issues detected and fixed | Positive operational signal |
| Human rework minutes | Not available | Approx. 55 minutes across 3 tasks | Initial benchmark only |
| Reverted files | Not available | 0 | Inconclusive; no baseline |

## Run Log

| Condition | Task ID | Run | Verification result | Notes |
| --- | --- | --- | --- | --- |
| harnessed-only | recipe-api-harness-adoption-cleanup | recipe-api-001 | failed_then_passed_after_review | Review exposed zero tests, README quality issue, docs drift, and generic scaffold residue. |
| harnessed-only | recipe-api-add-category-feature | recipe-api-002 | passed_with_review_gap | Migration, docs, and ADR were present; review found missing PATCH tests. |
| harnessed-only | recipe-api-category-update-test-hardening | recipe-api-003 | passed | Follow-up stayed within expected files and completed missing coverage/ADR cleanup. |

## Source Records

- Task outcome records reviewed:
  - `docs/examples/task-outcomes/001-recipe-api-harness-adoption.yaml`
  - `docs/examples/task-outcomes/002-recipe-api-category-feature.yaml`
  - `docs/examples/task-outcomes/003-recipe-api-category-update-tests.yaml`
- Repository refs compared: local practice branch snapshots
- Prompt refs compared: local adoption, review, refresh, and feature prompts
- Target-local decision records reviewed:
  - Initial API design decision
  - Python dependency management decision
  - Recipe category model/API decision
- Verification commands compared:
  - `python manage.py check`
  - `python manage.py test`
  - `python manage.py makemigrations --check --dry-run`
  - `python scripts/check_docs_drift.py`
  - `python scripts/check_structure.py`
  - `python scripts/check_decision_memory.py --fail-on-warning`
  - `python scripts/check_encoding_hygiene.py`

## Interpretation

### What improved

- Harness review and refresh made weak tests, docs drift, incomplete README content, and decision-memory gaps visible.
- The Category feature stayed within expected Django app boundaries and included migration, tests, README, domain glossary, and decision memory.
- Follow-up work was narrow and did not require reverting unrelated files.

### What did not improve

- First-pass verification was not consistently complete; the Category feature still missed PATCH category update and clear tests.
- There is no pre-harness baseline for the same tasks, so improvement cannot be quantified.

### Confounders or limitations

- This is a small harnessed-only evidence pass, not a controlled experiment.
- Human review remained active and may have prevented or corrected issues before they became committed defects.
- Metrics such as human rework minutes are approximate.
- The tasks came from a small practice repository, not a production system.

### Narrow claim

This pass provides operational evidence that harness artifacts made review gaps more observable and easier to correct in a small Django REST Framework practice workflow.

It does not prove that harness adoption generally improves agent effectiveness.

## Follow-Up

- Next review window: next 2-3 comparable Django or TodayBus dogfood tasks
- Owner or reviewer: maintainer or dogfood reviewer
- Related target-local decision records:
  - Initial API design decision
  - Python dependency management decision
  - Recipe category model/API decision