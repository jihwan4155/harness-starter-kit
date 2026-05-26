# Spring Harness Profile

Use these snippets when the target project is a Spring Boot app or service.

These files are agent reference material, not automatic transformations. Merge
only the pieces that fit the target project's existing Maven or Gradle setup.

## Recommended Checks

- `./mvnw test` or `./mvnw verify` for Maven wrapper projects.
- `./gradlew test` or `./gradlew check` for Gradle wrapper projects.
- Spring Boot context tests for application startup and bean wiring.
- `scripts/check_docs_drift.py` for stale documentation references.
- `scripts/check_structure.py` for temporary or drift-prone files.

Prefer project wrappers over global `mvn` or `gradle` commands. On Windows
PowerShell, that is often:

```powershell
.\mvnw.cmd test
.\gradlew.bat test
python scripts\check_harness.py
```

## Suggested Check Script

Copy or adapt `check_harness.py` into the target repository's `scripts/`
directory when the project has no existing task runner.

## Profile Absorption Notes

When Spring Boot is introduced after generic adoption:

- Copy or adapt `check_harness.py` into `scripts/` only when the target has no
  equivalent local verification command.
- Prefer existing Maven or Gradle wrappers and merge guidance around those
  commands instead of introducing a second build path.
- Merge relevant ignores from `gitignore.harness.txt`, especially `target/`,
  `build/`, `.gradle/`, `out/`, local config files, compiled artifacts, and the
  local `harness-starter-kit/` clone.
- Update `AGENTS.md` with Maven or Gradle commands, source tree rules,
  generated paths, local config rules, migration rules, and completion checks.
- Update `docs/conventions/coding.md` with package boundaries, controller,
  service, repository, DTO, configuration, testing, and migration conventions.
- Add a decision record when choosing Spring Boot, Maven versus Gradle, module
  layout, persistence approach, or Flyway/Liquibase policy is an architectural
  decision.
- Treat Flyway or Liquibase migrations as source. Adopt profile guidance without
  deleting or rewriting migrations unless the maintainer explicitly asks.
- In the final report, list which snippets were adopted, adapted, skipped, or
  deferred.

## Spring Notes

- Keep application code and tests in the conventional Spring source tree for
  the target language.
- Keep configuration templates in the conventional resources directory, but do
  not commit local secrets, credentials, or machine-specific
  `application-local.*` files.
- Do not edit or commit generated build outputs such as `target/`, `build/`,
  `.gradle/`, `out/`, or compiled `.class` files.
- Treat Flyway or Liquibase migrations as source when they represent
  intentional schema changes. Do not delete or rewrite existing migrations
  without an explicit request.
- Reuse the target repository's existing Maven or Gradle conventions before
  adding new plugins, test frameworks, or quality gates.
