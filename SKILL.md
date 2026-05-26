---
name: prism
description: "Render structured HTML documents with visual hierarchy — decisions, architecture flows, collapsible references, metrics, and charts."
triggers:
  - "structured document"
  - "architecture document"
  - "decision record"
  - "visual document"
  - "prism document"
od:
  mode: prototype
  preview:
    type: html
    entry: index.html
---

# Prism — Agent Document UI

You are rendering a structured HTML document using the Prism component library. Prism provides Vue components you compose freely to build documents with clear visual hierarchy.

## First-time setup

On first use, read `references/principles.md` for the full design principles. Those principles govern layout rhythm, semantic color use, code reference patterns, and completeness expectations.

## How to use

1. Write a `template.html` file containing **only** the Vue template content — no `<!DOCTYPE>`, no `<html>`, no `<script>`.
2. Run the build script to produce a self-contained single-file HTML:

```bash
node prism/build.js template.html index.html
```

3. The output `index.html` includes the Vue runtime, all components, and all styles inline.

The build script auto-detects the document language from a `<!-- lang: zh-CN -->` comment and extracts the `<h1>` text as the page title.

Standard HTML (`<h1>`–`<h4>`, `<p>`, `<hr>`, `<table>`, `<code>`, `<strong>`, `<a>`) works directly inside the template.

## Design principles (summary)

Read `references/principles.md` for the full version with examples. Key rules:

- **Breathe.** Max 2–3 heavy components per viewport. Use `<hr>` between sections.
- **Document-level budget.** The total number of heavy components (decision, flow, branch, compare, contrast, analogy, myth, steps, stacked-bar) visible on the top level should not exceed 1.5× the number of `<h2>` sections. `<p-source>` and `<p-ref>` are exempt — use as many as the code demands. Components inside `<p-collapse>` blocks are also exempt — the budget counts what the reader sees before expanding anything.
- **Hierarchy first.** Verdict visible, evidence collapsed.
- **Complete on first delivery.** The reader should never need to come back and ask a follow-up question. Every judgment should have its evidence, every choice should show what was excluded, every risk should have its mitigation — all present in the document, wrapped in `<p-collapse>`. The top level is scannable; the collapsed layers are exhaustive. Think of the document as a tree: the reader sees the root, but every leaf exists.
- **Prose bridges components.** Never stack two components without connective text.
- **Collapse is structure, not afterthought.** `<p-collapse>` is not an optional add-on for "nice to have" details. It is the primary mechanism for delivering completeness without overwhelming the reader. For every visible conclusion, ask: "what would someone need to verify this?" — that evidence goes in a collapse block right below. For every decision, the rejected alternatives go in a collapse. For every implementation step, the rollback plan goes in a collapse. A document with no collapse blocks is almost certainly hiding information the reader will eventually need.
- **Color means something.** Green=success, Red=danger, Yellow=warning, Blue=info, Purple=review.
- **Callouts are for interruptions, not narration.** Use `<p-callout>` only when the reader must stop and pay attention: a breaking change, a dangerous operation, a critical prerequisite, a non-obvious gotcha. If the information flows naturally as prose, write it as prose. A document with more than 2–3 callouts has lost the signal.
- **Code is always shown.** Use `<p-code>`, `<p-source>`, or inline `<code>`. Never paraphrase.
- **Bugs need concrete traces.** Real values, real code, step-by-step through the callstack.
- **Issues use priority tiers.** P0→P1→P2→P3, prominent verdict.
- **Impact map.** Show affected files grouped by module via `<p-file-list>`.
- **Rejected alternatives get autopsies.** Show where each alternative failed.
- **Rollback plans alongside steps.** Collapsed next to each implementation step.
- **Edge cases enumerated.** List all, flag unhandled ones.
- **Test coverage map.** `<p-checklist>` with specific scenario names.
- **Use inline SVG for complex diagrams.** When `<p-flow>` is too linear for what you need (branching, merging, cycles, spatial layouts), write inline `<svg>` directly in the template. Vue renders SVG natively. Use Prism's CSS variables (`var(--p-accent)`, `var(--p-border)`, `var(--p-text)`, etc.) for fills, strokes, and text colors so the diagram follows the theme and dark mode automatically. Set `viewBox` + `width="100%"` to make it responsive within the container.
- **This is HTML, not Markdown.** No code fences, no `##`, no `- ` bullets.
- **Escape quotes in bindings.** Use single quotes inside `:items="[...]"`.
- **Continuity.** Keep using Prism for all HTML artifacts in the conversation.
- **Language consistency.** Prose in the user's language, terms in native form.

## Component quick reference

For detailed props, slots, and examples, read the `.md` file next to each component in `src/components/`.

### Core — use in almost every document

| Component | Description | Docs |
|-----------|-------------|------|
| `<p-decision>` | Decision card (`status="approved\|rejected\|exploring\|pending"` `verdict="..."`) | `PDecision.md` |
| `<p-collapse>` | Collapsible section (`title="..."` `open` `borderless`) | `PCollapse.md` |
| `<p-source>` | Expandable code ref (`path="file:L-L"` `lang="..."` `id="..."`) — exempt from budget | `PSource.md` |
| `<p-ref>` | Inline ref chip (`to="id"` `label="..."`) — exempt from budget | `PRef.md` |
| `<p-code>` | Code block with header (`file="..."`) | `PCode.md` |
| `<p-steps>` + `<p-step>` | Timeline (`progress="done\|active\|todo"` `flag="warning\|danger\|success\|info"` `flag-label="..."`) | `PStep.md` |
| `<p-badge>` + `<p-tag>` | Status badge (`color="success\|warning\|danger\|info\|accent\|purple"`) | `PBadge.md` |
| `<p-kv>` | Key-value pairs (`:items="[{ key, value }]"`) | `PKv.md` |

### Judgment & comparison — when evaluating options or correcting assumptions

| Component | Description | Docs |
|-----------|-------------|------|
| `<p-compare>` | Pro/con side-by-side (`#pro` `#con` slots) | `PCompare.md` |
| `<p-contrast>` | Same word, different contexts (`word="..."` `desc="..."` `#left` `#right`) | `PContrast.md` |
| `<p-myth>` | Misconception → correction (`#myth` `#truth` slots) | `PMyth.md` |
| `<p-analogy>` | A ≈ B (`source="..."` `target="..."` `because="..."`) | `PAnalogy.md` |

### Flow & structure — when showing how things connect or branch

| Component | Description | Docs |
|-----------|-------------|------|
| `<p-flow>` + `<p-flow-node>` + `<p-flow-arrow>` | Flow diagram (`vertical` `plain`; node: `color` `meta` `subtitle` `type`; arrow: `label` `variant`) | `PFlow.md` |
| `<p-branch>` + `<p-branch-item>` | Decision tree (`root="..."` `cond="..."` `outcome="..."` `status="leaf\|danger\|success"`) | `PBranch.md` |
| `<p-term>` | Inline term tooltip (`word="..."` `def="..."` `first`) | `PTerm.md` |

### Data & metrics — when numbers matter for the decision

| Component | Description | Docs |
|-----------|-------------|------|
| `<p-metrics>` + `<p-metric>` | Key numbers (`value="..."` `label="..."` `delta="..."` `delta-dir="up\|down"`) | `PMetric.md` |
| `<p-bars>` + `<p-bar>` | Bar chart (`label="..."` `value="..."` `:percent="N"` `color="..."`) | `PBar.md` |
| `<p-stacked-bar>` | Proportional breakdown (`:segments="[{percent,color}]"` `:legend="[{label,color}]"`) | `PStackedBar.md` |

### Assessment & review — when auditing multiple dimensions

| Component | Description | Docs |
|-----------|-------------|------|
| `<p-tracks>` + `<p-track>` | Parallel tracks (`title="..."` `flag="passed\|polish\|at-risk\|blocked\|note"` `flag-label="..."`) | `PTracks.md` |
| `<p-finding>` | Observation in a track (`title="..."` `#detail` slot) | `PFinding.md` |
| `<p-evidence>` + `<p-evidence-item>` | Conclusion + evidence (`conclusion="..."` or `#conclusion` slot) | `PEvidence.md` |
| `<p-checklist>` + `<p-check-item>` | Coverage checklist (`checked` boolean) | `PChecklist.md` |
| `<p-file-list>` + `<p-file-group>` + `<p-file>` | File impact map (`module="..."` `path="..."` `status="added\|modified\|deleted"` `purpose="..."`) | `PFileList.md` |

### Layout & interaction — structural containers

| Component | Description | Docs |
|-----------|-------------|------|
| `<p-grid>` | Column layout (`:cols="2\|3\|4"`) | `PGrid.md` |
| `<p-card>` | Container (`title="..."` `#header` `#footer` slots) | `PCard.md` |
| `<p-callout>` | Interruption block (`type="info\|success\|warning\|danger\|purple"` `icon="..."`) — use sparingly | `PCallout.md` |
| `<p-divider>` | Section divider (`label="..."`) | `PDivider.md` |
| `<p-tabs>` + `<p-tab>` | Section-level tabs (`title="..."`) | `PTabs.md` |
| `<p-pages>` + `<p-page>` | Document-level multi-page (`title="..."`) | `PPages.md` |
| `<p-copy>` | Copy button (`:content="..."` `label="..."`) | `PCopy.md` |
| `<p-params>` + `<p-param>` | Interactive params (`name="..."` `type="range\|select\|toggle"` `:min` `:max` `:step` `options="..."`) | `PParams.md` |

## Theming

Dark mode activates automatically via `prefers-color-scheme: dark`. Force via `PrismUI.setTheme('dark')`.

All colors use `--p-*` CSS variables. Override them in a `<style>` block in your template.

## Supported syntax highlighting languages

TypeScript, JavaScript, SQL, JSON, Bash, HTML/XML, CSS, Python, YAML, Diff, Rust, C, C++.

Specify the language via `class="language-xxx"` on the `<code>` element, or let highlight.js auto-detect.
