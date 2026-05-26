# PSteps + PStep

Vertical timeline showing progress through a sequence.

## PSteps Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `progress` | `number \| string` | — | Track line progress. `0`–`100` (percent) or CSS string like `"40%"` |

## PSteps Slots

| Slot | Description |
|------|-------------|
| default | One or more `<p-step>` elements |

## PStep Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | Yes | Step title |
| `desc` | `string` | — | Description below the title (rendered with a left accent bar) |
| `progress` | `'done' \| 'active' \| 'todo'` | `'todo'` | Step progress state |
| `flag` | `'warning' \| 'danger' \| 'success' \| 'info'` | — | Content flag with icon + label badge |
| `flagLabel` | `string` | — | Custom flag label text (defaults: REVIEW / BLOCKED / PASSED / NOTE) |

### Progress states

| Value | Visual |
|-------|--------|
| `done` | Filled dot, completed portion of track |
| `active` | Ring dot, current position |
| `todo` | Empty ring, upcoming |

### Flag types

| Value | Icon | Default label | Use for |
|-------|------|---------------|---------|
| `warning` | ⚠ triangle | REVIEW | Needs attention, review required |
| `danger` | ⊘ circle | BLOCKED | Blocked, critical issue |
| `success` | ✓ check | PASSED | Verified, tests pass |
| `info` | ⓘ circle | NOTE | Informational note |

## Example

```html
<p-steps :progress="60">
  <p-step progress="done" title="添加 JWT 工具函数" desc="基于 jose 库实现 sign、verify、decode"></p-step>
  <p-step progress="done" title="创建 refresh token 模型"></p-step>
  <p-step progress="active" flag="warning" title="实现认证中间件" desc="需要和移动端团队协调 header 格式"></p-step>
  <p-step title="添加 token 刷新端点"></p-step>
  <p-step flag="danger" flag-label="BLOCKED" title="更新客户端 SDK" desc="依赖认证中间件完成"></p-step>
</p-steps>
```

## Notes

- `progress` and `flag` are independent — a step can be `progress="done"` with `flag="warning"` (completed but needs review).
- `flagLabel` overrides the default badge text (e.g. `flag-label="P0"` instead of "BLOCKED").
- `desc` renders with a left accent bar for visual hierarchy.

## When NOT to use

- If there are only 2 steps, a sentence like "first X, then Y" is clearer than a timeline.
- If steps are just a flat list with no progress tracking and no flags, use a plain `<ol>` instead.
