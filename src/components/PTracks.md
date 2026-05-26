# PTracks + PTrack

Parallel evaluation tracks — grouped findings, independent review dimensions, or multi-aspect assessments. Unlike `<p-steps>` (sequential/causal order), tracks represent unrelated parallel lines of analysis.

## PTracks Props

No props. Container that auto-assigns lane colors (1–5, cycling) to child tracks via CSS counter.

## PTracks Slots

| Slot | Description |
|------|-------------|
| default | One or more `<p-track>` elements |

## PTrack Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | Yes | Track heading |
| `desc` | `string` | — | Short description (alternative to default slot) |
| `flag` | `'passed' \| 'polish' \| 'at-risk' \| 'blocked' \| 'note'` | — | Status badge with icon |
| `flagLabel` | `string` | — | Custom flag text (defaults: PASSED / POLISH / AT RISK / BLOCKED / NOTE) |
| `lane` | `1 \| 2 \| 3 \| 4 \| 5` | auto | Override the auto-assigned lane color |

## PTrack Slots

| Slot | Description |
|------|-------------|
| default | Track body content (overrides `desc` prop) |

## Flag types

| Value | Icon | Default label | Use for |
|-------|------|---------------|---------|
| `passed` | ✓ check | PASSED | Reviewed and clean |
| `polish` | ✦ sparkle | POLISH | Needs refinement, not blocking |
| `at-risk` | ⚠ triangle | AT RISK | Potential issue, needs attention |
| `blocked` | ⊘ circle | BLOCKED | Critical blocker |
| `note` | ⓘ info | NOTE | Informational, no action needed |

## Example

```html
<p-tracks>
  <p-track title="类型安全" flag="passed">
    所有公开 API 都有完整的 TypeScript 类型。
  </p-track>
  <p-track title="性能" flag="at-risk">
    首屏加载 300KB runtime，gzip 后 100KB。可接受但值得关注。
  </p-track>
  <p-track title="无障碍" flag="polish" desc="代码块缺少 aria-label，TOC 按钮无键盘焦点样式。"></p-track>
</p-tracks>
```

## When NOT to use

- If the items are sequential (step 1 → step 2 → step 3), use `<p-steps>`. Tracks are for parallel, independent dimensions.
- If there is only one track, write it as a `<p-callout>` or prose paragraph. A single track in a tracks container looks like a mistake.
- If you are listing more than 6 tracks, consider whether all of them deserve track-level visual weight, or if some should be bullet points in a `<p-collapse>`.

## Notes

- Lane colors cycle automatically: accent → success → purple → warning → info. Use `lane` prop only when you need a specific color for semantic reasons.
- Tracks can contain `<p-finding>` components for structured observations within a track.
