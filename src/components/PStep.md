# PStep

Step/timeline item showing progress through a sequence. Wrap individual `<p-step>` elements inside a `<p-steps>` container.

## PStep Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | `'completed' \| 'active' \| 'danger' \| 'warning'` | — | Step state. Omit for gray outline (pending). |
| `title` | `string` | — | Step title |
| `desc` | `string` | — | Optional description below the title |

## PSteps

Container that lays out child `<p-step>` elements as a vertical timeline.

| Slot | Description |
|------|-------------|
| default | One or more `<p-step>` elements. |

## Example

```html
<p-steps>
  <p-step status="completed" title="设计 schema" desc="可选描述"></p-step>
  <p-step status="active" title="实现 API"></p-step>
  <p-step status="danger" title="发现阻塞问题" desc="问题描述"></p-step>
  <p-step status="warning" title="需要评审"></p-step>
  <p-step title="编写测试"></p-step>
</p-steps>
```

## Notes

- Status appearances: `completed` = green check, `active` = blue glow, `danger` = red, `warning` = yellow, no status = gray outline.
- Always wrap steps in `<p-steps>`.
