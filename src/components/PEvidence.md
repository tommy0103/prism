# PEvidence + PEvidenceItem

A conclusion supported by multiple pieces of evidence. The conclusion is prominently visible; evidence items are the supporting reasons below it.

## PEvidence Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `conclusion` | `string` | No | Conclusion text. Use `#conclusion` slot for rich markup. |

## PEvidence Slots

| Slot | Description |
|------|-------------|
| `#conclusion` | Rich conclusion markup (overrides `conclusion` prop) |
| default | `<p-evidence-item>` children |

## PEvidenceItem

No props. Free-form container for one piece of evidence. Can contain text, `<p-source>`, `<p-ref>`, code blocks, or any other component.

## Example

```html
<p-evidence conclusion="JWT 方案是最优选择">
  <p-evidence-item>无状态校验，每请求 0.3ms，比 session 查询快 88%。</p-evidence-item>
  <p-evidence-item>不引入新的有状态依赖，符合团队 OKR。</p-evidence-item>
  <p-evidence-item>标准库支持（jose），无需自建轮子。</p-evidence-item>
</p-evidence>
```

## When NOT to use

- If there is only one piece of evidence, write it as prose: "We chose X because Y."
- If the conclusion is not contentious (nobody would question it), skip the evidence structure and state it directly.
- If the evidence items are sequential (first we did X, then Y), use `<p-steps>` instead.

## Notes

- Evidence items are visually lightweight — they do not have flags, colors, or icons. Their purpose is to support the conclusion, not to draw attention individually.
- Nest `<p-source>` or `<p-ref>` inside evidence items to link to the code that supports each point.
