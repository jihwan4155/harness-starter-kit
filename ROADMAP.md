# Roadmap

This roadmap describes where `harness-starter-kit` should grow after the
`v0.1.0` early release.

The project should stay prompt-first. The goal is to help maintainers turn
repository-specific agent instructions into durable rules, checks, examples,
and memory. More automation is useful only when it preserves the target
repository as the source of truth.

## Guiding Priorities

- Improve adoption quality before adding broad automatic mutation behavior.
- Prefer real examples, fixtures, and checks over untested profile snippets.
- Keep the optional installer conservative and non-destructive by default.
- Make repeated agent failures easier to record, detect, and avoid.
- Measure outcomes carefully instead of claiming that harness adoption reduces
  mistakes without evidence.

## Near-Term Work

- Add more real adoption examples with completed adoption reports.
- Add another dogfood repository beyond the Django reference target.
- Improve Harness Doctor evidence messages and scoring calibration.
- Refine `/harness update` and `/harness refresh` workflows from real target
  repository use.
- Add practical effectiveness measurement examples using the existing report
  template.
- Clean up localized README consistency and language-switcher presentation.

## Profile Growth

New stack profiles are welcome when they are backed by evidence.

A new profile should include:

- profile guidance under `templates/profiles/<profile>/`
- a minimal fixture under `tests/fixtures/<profile>-basic/`
- smoke coverage in `tests/test_smoke_fixtures.py`
- installer coverage in `tests/test_apply_harness.py` when new file types are
  introduced
- documentation updates for the profile list and validation coverage
- conservative guidance that can be adapted instead of copied blindly

Candidate profiles include Rails, Laravel, Go, and Rust. Add them only when the
profile has a real fixture and a clear local verification path.

## Adoption Evidence

The project needs more examples that show how prompt-first harness adoption
behaves in real repositories.

Useful examples include:

- a TypeScript or Node.js service adoption
- a Next.js app adoption
- a FastAPI adoption with completed effectiveness tracking
- a monorepo adoption note
- a GitLab CI adoption note
- a second dogfood repository with a real `docs/failures/` record

Each example should document what was adopted, adapted, skipped, and verified.

## Not Currently Prioritized

- Turning the kit into a one-command framework migration tool.
- Making the installer overwrite or deeply rewrite target repositories.
- Adding profiles without fixtures and smoke tests.
- Claiming effectiveness from fixture tests alone.
- Replacing target repository conventions with starter-kit defaults.

## Related Decisions

- `docs/decisions/0001-prompt-first-adoption.md`
