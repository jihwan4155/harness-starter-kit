#!/usr/bin/env python3
"""Run local harness checks for a Spring Boot project."""

from __future__ import annotations

import argparse
import os
import shutil
import subprocess
import sys
from pathlib import Path


def repo_root() -> Path:
    current = Path(__file__).resolve()
    if current.parent.name == "scripts":
        return current.parents[1]

    cwd = Path.cwd()
    if (cwd / "scripts" / "check_docs_drift.py").exists():
        return cwd

    for candidate in (current.parent, *current.parents):
        if any(
            (candidate / marker).exists()
            for marker in ("pom.xml", "build.gradle", "build.gradle.kts")
        ):
            return candidate
    return cwd


ROOT = repo_root()


def run(command: list[str]) -> None:
    subprocess.run(command, cwd=ROOT, check=True)


def existing_path(*names: str) -> Path | None:
    for name in names:
        path = ROOT / name
        if path.exists():
            return path
    return None


def build_command(build_tool: str, maven_goal: str, gradle_task: str) -> list[str]:
    if build_tool == "auto":
        if existing_path("mvnw.cmd", "mvnw") or (ROOT / "pom.xml").exists():
            build_tool = "maven"
        elif existing_path("gradlew.bat", "gradlew") or any(
            (ROOT / name).exists() for name in ("build.gradle", "build.gradle.kts")
        ):
            build_tool = "gradle"
        else:
            raise SystemExit("Could not detect Maven or Gradle build files.")

    if build_tool == "maven":
        wrapper = existing_path(
            "mvnw.cmd" if os.name == "nt" else "mvnw",
            "mvnw.cmd",
            "mvnw",
        )
        executable = str(wrapper) if wrapper else shutil.which("mvn")
        if not executable:
            raise SystemExit("Maven wrapper or mvn executable was not found.")
        return [executable, maven_goal]

    wrapper = existing_path(
        "gradlew.bat" if os.name == "nt" else "gradlew",
        "gradlew.bat",
        "gradlew",
    )
    executable = str(wrapper) if wrapper else shutil.which("gradle")
    if not executable:
        raise SystemExit("Gradle wrapper or gradle executable was not found.")
    return [executable, gradle_task]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run Spring harness checks.")
    parser.add_argument(
        "--build-tool",
        choices=("auto", "maven", "gradle"),
        default="auto",
        help="Build tool to run. Defaults to auto-detection.",
    )
    parser.add_argument(
        "--maven-goal",
        default="test",
        help="Maven goal to run when using Maven.",
    )
    parser.add_argument(
        "--gradle-task",
        default="test",
        help="Gradle task to run when using Gradle.",
    )
    parser.add_argument(
        "--skip-build",
        action="store_true",
        help="Run only harness drift checks.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    if not args.skip_build:
        run(build_command(args.build_tool, args.maven_goal, args.gradle_task))
    run([sys.executable, "scripts/check_docs_drift.py"])
    run([sys.executable, "scripts/check_structure.py"])
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
