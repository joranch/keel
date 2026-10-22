#!/usr/bin/env python3
"""PreToolUse hook: block new dependencies that Jøran hasn't approved (Engineering C7, risk R14).

Looks at edits to Gradle and npm build files, finds dependency coordinates the edit adds,
and blocks the edit (exit 2) if any is missing from .claude/approved-dependencies.txt.
Agents can't edit that file (settings.json denies it); Jøran adds entries by hand after
checking that the package exists, has a real publish history and isn't a near-miss name.

Entry formats in approved-dependencies.txt (one per line, # for comments):
  maven:group:artifact     maven:group:*      gradle-plugin:plugin.id      npm:name      npm:@scope/*
"""
import fnmatch
import json
import os
import re
import sys

BUILD_FILES = {"build.gradle.kts", "settings.gradle.kts", "libs.versions.toml", "package.json"}

MAVEN_STRING = re.compile(r"""["']([A-Za-z0-9_.\-]+):([A-Za-z0-9_.\-]+)(?::[^"'\s]*)?["']""")
TOML_MODULE = re.compile(r"""module\s*=\s*["']([A-Za-z0-9_.\-]+):([A-Za-z0-9_.\-]+)["']""")
TOML_GROUP_NAME = re.compile(r"""group\s*=\s*["']([A-Za-z0-9_.\-]+)["']\s*,\s*name\s*=\s*["']([A-Za-z0-9_.\-]+)["']""")
PLUGIN_ID = re.compile(r"""(?:\bid\s*\(\s*|\bid\s*=\s*)["']([A-Za-z0-9_.\-]+)["']""")
NPM_ENTRY = re.compile(r""""(@?[a-z0-9][a-z0-9._\-]*(?:/[a-z0-9._\-]+)?)"\s*:\s*"(?:[\^~<>=]*\s*\d|workspace:|npm:|git|https?:|file:|latest)""")
NPM_SECTIONS = ("dependencies", "devDependencies", "peerDependencies", "optionalDependencies")


def coords(text, basename):
    found = set()
    if not text:
        return found
    if basename == "package.json":
        try:
            data = json.loads(text)
            for section in NPM_SECTIONS:
                for name in (data.get(section) or {}):
                    found.add("npm:" + name)
            return found
        except (json.JSONDecodeError, AttributeError):
            for m in NPM_ENTRY.finditer(text):
                found.add("npm:" + m.group(1))
            return found
    for m in TOML_MODULE.finditer(text):
        found.add("maven:%s:%s" % (m.group(1), m.group(2)))
    for m in TOML_GROUP_NAME.finditer(text):
        found.add("maven:%s:%s" % (m.group(1), m.group(2)))
    for m in PLUGIN_ID.finditer(text):
        found.add("gradle-plugin:" + m.group(1))
    if basename.endswith(".kts"):
        for m in MAVEN_STRING.finditer(text):
            group, artifact = m.group(1), m.group(2)
            if "." in group:  # real Maven groups are dotted; skips "a:b" strings that aren't coordinates
                found.add("maven:%s:%s" % (group, artifact))
    return found


def approved_patterns(project_dir):
    path = os.path.join(project_dir, ".claude", "approved-dependencies.txt")
    patterns = []
    try:
        with open(path, encoding="utf-8") as f:
            for line in f:
                line = line.split("#", 1)[0].strip()
                if line:
                    patterns.append(line)
    except FileNotFoundError:
        pass
    return patterns


def is_approved(coord, patterns):
    return any(fnmatch.fnmatchcase(coord, p) for p in patterns)


def main():
    try:
        event = json.load(sys.stdin)
    except json.JSONDecodeError:
        return 0
    tool = event.get("tool_name", "")
    data = event.get("tool_input") or {}
    file_path = data.get("file_path") or ""
    basename = os.path.basename(file_path)
    if tool not in ("Edit", "Write", "MultiEdit") or basename not in BUILD_FILES:
        return 0

    current = ""
    if os.path.exists(file_path):
        with open(file_path, encoding="utf-8", errors="replace") as f:
            current = f.read()

    if tool == "Write":
        before, after = current, data.get("content", "")
    elif tool == "Edit":
        old, new = data.get("old_string", ""), data.get("new_string", "")
        before = current
        after = current.replace(old, new) if data.get("replace_all") else current.replace(old, new, 1)
        if not current:
            before, after = old, new
    else:  # MultiEdit
        before = after = current
        for e in data.get("edits") or []:
            old, new = e.get("old_string", ""), e.get("new_string", "")
            after = after.replace(old, new) if e.get("replace_all") else after.replace(old, new, 1)

    added = coords(after, basename) - coords(before, basename)
    if not added:
        return 0

    project_dir = os.environ.get("CLAUDE_PROJECT_DIR") or event.get("cwd") or os.getcwd()
    patterns = approved_patterns(project_dir)
    unapproved = sorted(c for c in added if not is_approved(c, patterns))
    if not unapproved:
        return 0

    sys.stderr.write(
        "Blocked: this edit adds dependencies Jøran hasn't approved:\n"
        + "".join("  - %s\n" % c for c in unapproved)
        + "Don't work around this. Explain in your reply why each one is needed, confirm it exists in the "
        "official registry with a real publish history and isn't a near-miss of a popular name, and stop. "
        "Jøran adds approved entries to .claude/approved-dependencies.txt himself (Engineering C7).\n"
    )
    return 2


if __name__ == "__main__":
    sys.exit(main())
