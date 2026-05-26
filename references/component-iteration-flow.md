# Prism Component Context Update Flow

Use this flow **after** one or more Prism components have already been implemented. Do not implement or redesign components in this workflow unless the user explicitly asks for code changes.

## Goal

Synchronize Prism's public context after component work: component docs, README, `SKILL.md`, showcase examples, and writing principles. The job is complete when a future agent can discover the component, choose it for the right semantic reason, and see current examples without stale API drift.

## 1. Intake The Existing Component Changes

Start by identifying what changed:

```bash
git status --short
git diff --name-status
```

Then inspect only the relevant files:

- New or changed `src/components/P*.vue`.
- New or changed `src/components/P*.md`.
- `src/index.ts` registration changes.
- `src/styles/base.css` and `src/styles/themes/notion.css` if visuals changed.
- Existing showcase or README edits from the user.

Treat Vue props, emitted markup, registered component names, and CSS selectors as source of truth. Docs should follow implementation, not invent behavior.

## 2. Capture The Semantic Job

For each changed component, write one sentence:

```text
Use <p-name> when the document needs to express ...
```

Use that sentence to prevent semantic drift in examples:

- Sequential execution or causal order → `<p-steps>`.
- Parallel tracks, grouped evidence, or unrelated enhancement lines → use a track/finding-style component, not `<p-steps>`.
- Judgment between options → `<p-compare>`.
- Same term or concept in different contexts, no value judgment → `<p-contrast>`.
- Familiar concept mapped to unfamiliar concept → `<p-analogy>`.
- Wrong mental model corrected → `<p-myth>`.
- Conditional branching → `<p-branch>`.

If a changed component overlaps with an existing one, document the boundary in its markdown and, if useful, in `SKILL.md` principles.

## 3. Update Component Markdown

For every new or changed public component, create or update `src/components/PName.md`.

Use the existing docs shape:

````markdown
# PName

One sentence describing what it expresses.

## Props

| Prop | Type | Default/Required | Description |
|------|------|------------------|-------------|

## Slots

| Slot | Description |
|------|-------------|

## Example

```html
...
```

## When NOT to use

- ...

## Notes

- ...
````

Rules:

- Keep docs factual and aligned with the Vue props.
- Always include a realistic example.
- Add `When NOT to use` when the component is visually tempting to misuse.
- Mention legacy props only as compatibility notes, not as the preferred API.

## 4. Update README

Update every README surface that exposes the vocabulary:

- Component count.
- Family table.
- Full component list.
- Main examples that use changed API.
- Project structure notes if new files or docs changed the shape.
- Future directions if a once-future primitive is now implemented.

README should teach the public story. Keep it concise and user-facing; put detailed usage boundaries in component markdown or `SKILL.md`.

## 5. Update SKILL.md

Update the agent-facing context:

- Component quick reference row.
- Description text for changed components.
- Design principles only when the component changes how agents should choose structure.

Prefer compact, decision-useful language. `SKILL.md` should help an agent pick the right component, not duplicate every prop table.

## 6. Update Showcase And Principles

Update `references/showcase.html` when the component is new or its preferred usage changed.

Showcase examples should be realistic and semantic:

- Demonstrate the reason the component exists.
- Show the preferred API.
- Avoid examples that merely prove styling works.
- Keep legacy API out of primary examples.

Update `references/principles.md` only when there is a new writing rule, semantic boundary, or common misuse that future agents should know.

## 7. Drift Scan

Search for stale public language and old examples:

```bash
rg "34 components|status=\"completed\"|status=\"danger\"" README.md SKILL.md references src/components
```

Adjust the patterns for the current change. Interpret results manually: compatibility notes are allowed, preferred examples should use current API.

Useful count checks:

```bash
find src/components -maxdepth 1 -name '*.vue' | wc -l
find src/components -maxdepth 1 -name '*.md' | wc -l
```

## 8. Verification

Run the build if component code, styles, registration, or runtime imports changed:

```bash
npm run build
```

For docs-only updates, still verify static references with `rg` and inspect the touched sections. Do not run `build.js` on `references/showcase.html`; it is already a complete HTML file.

## 9. Final Report

Report in this order:

1. Components whose context was updated.
2. README / `SKILL.md` / component markdown / showcase changes.
3. Any semantic boundaries clarified.
4. Verification commands and results.
5. Remaining drift or intentionally preserved legacy mentions.
