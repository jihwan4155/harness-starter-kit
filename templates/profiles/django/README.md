# Django Harness Profile

Use these snippets when the target project is a Django app or service.

These files are agent reference material, not automatic transformations. Merge
only the pieces that fit the target project's existing tools.

## Recommended Checks

- `python manage.py check` for Django system checks.
- `python manage.py test` for Django's built-in test runner.
- `scripts/check_docs_drift.py` for stale documentation references.
- `scripts/check_structure.py` for temporary or drift-prone files.

Prefer the target repository's virtual environment path when documenting
commands. On Windows PowerShell, that is often:

```powershell
.\.venv\Scripts\python.exe manage.py check
.\.venv\Scripts\python.exe manage.py test
.\.venv\Scripts\python.exe scripts\check_harness.py
```

## Suggested Check Script

Copy or adapt `check_harness.py` into the target repository's `scripts/`
directory when the project has no existing task runner.

## Profile Absorption Notes

When Django is introduced after generic adoption:

- Copy or adapt `check_harness.py` into `scripts/` only when the target has no
  equivalent local verification command.
- Merge relevant ignores from `gitignore.harness.txt`, especially virtual
  environments, generated Python caches, SQLite development databases, coverage
  output, and the local `harness-starter-kit/` clone.
- Update `AGENTS.md` with Django commands, app layout, settings modules,
  generated paths, migration rules, and completion checks.
- Update `docs/conventions/coding.md` with app boundaries, model/queryset,
  view, serializer/form, service, testing, and migration conventions.
- Add a decision record when choosing Django, app boundaries, settings layout,
  persistence approach, or migration policy is an architectural decision.
- Treat existing migrations as source. Adopt profile guidance without deleting
  or rewriting migrations unless the maintainer explicitly asks.
- In the final report, list which snippets were adopted, adapted, skipped, or
  deferred.

## Django Notes

- Keep project-level settings, ASGI/WSGI, and URL configuration in the Django
  project package.
- Keep domain behavior inside Django apps.
- Do not edit or commit `.venv/`, `db.sqlite3`, `__pycache__/`, or the local
  `harness-starter-kit/` clone.
- Treat migrations as source when they represent intentional model changes.
  Do not delete or rewrite existing migrations without an explicit request.
- Add pytest, Ruff, mypy, or pre-commit only when they fit the target
  repository's existing tooling.
