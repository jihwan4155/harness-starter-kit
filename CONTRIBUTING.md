# Contributing

Thanks for helping improve `harness-starter-kit`. This project is a prompt-first
reference kit for adding durable agent rules, feedback loops, memory, and drift
checks to other repositories.

## Development

Use Python 3.11 or newer for local validation. Before opening a pull request,
run:

```powershell
python -m unittest discover -s tests
python -m py_compile scripts/apply_harness.py scripts/check_docs_drift.py scripts/check_structure.py scripts/check_encoding_hygiene.py scripts/check_effectiveness_plan.py scripts/harness_doctor.py
python scripts/check_docs_drift.py
python scripts/check_structure.py
python scripts/check_encoding_hygiene.py
python scripts/check_effectiveness_plan.py
python scripts/harness_doctor.py --target .
```

## Change Guidelines

- Keep templates generic and conservative.
- Preserve prompt-first adoption: target repositories remain the source of
  truth.
- Do not blindly copy starter-kit defaults into profile guidance.
- When changing profile README files, also review
  `docs/templates/profile-readme.md`,
  `docs/checklists/profile-maintenance.md`, and
  `tests/test_profile_consistency.py`.
- Add or update tests for installer behavior, templates, drift scripts, command
  workflows, and scoring behavior.

## Pull Requests

Keep each pull request focused on one logical harness change. Summarize changed
files, checks run, assumptions, and any manual follow-up needed.
