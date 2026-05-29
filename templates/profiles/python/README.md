# Python Harness Profile

Use these snippets when the target project is Python.

These files are agent reference material, not automatic transformations. Merge
only the pieces that fit the target project's existing tools.

Apply this profile by priority: always preserve the target environment workflow
and exact local checks; document database, service, or fixture setup when
present; consider decision records only when changing package manager, test
runner, typing strategy, layout, or framework; use a short report/check note for
narrow fixes.

## Recommended Checks

- Ruff for linting and formatting
- mypy or pyright for type checking
- pytest for tests
- vulture for unused code detection
- pre-commit when the project already uses commit hooks

## Integration Notes

Do not replace an existing `pyproject.toml` blindly. Merge the relevant sections
from `pyproject.harness.toml` into the target project's existing config.

Prefer the target project's existing test command if it already has one.

## Profile Absorption Notes

When Python is introduced after generic adoption:

- Merge useful settings from `pyproject.harness.toml` into the target
  `pyproject.toml` instead of replacing existing configuration.
- Add Ruff, mypy, pyright, vulture, pytest, or pre-commit only when they fit the
  target repository's existing toolchain and maintenance expectations.
- Keep the target package manager and environment workflow as source of truth,
  whether it uses pip, uv, Poetry, PDM, conda, or another tool.
- Merge virtual environment, cache, coverage, and generated output ignores into
  the target `.gitignore` when they are relevant.
- Update `AGENTS.md` with Python commands, environment setup, source
  directories, generated paths, and completion checks.
- Update `docs/conventions/coding.md` with module layout, typing, testing,
  import, error handling, logging, and dependency conventions.
- Consider a decision record when changing or selecting a package manager, test
  runner, typing strategy, app layout, or framework. When the task only follows
  the existing architecture or makes a narrow fix, a final report or check note
  is enough.
- In the final report, list which snippets were adopted, adapted, skipped, or
  deferred.
