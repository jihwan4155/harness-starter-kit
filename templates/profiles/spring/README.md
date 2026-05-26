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
