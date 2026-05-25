# PCallout

Highlighted block for principles, warnings, or important notes.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'info' \| 'success' \| 'warning' \| 'danger' \| 'purple'` | — | Background color variant |
| `icon` | `string` | — | Emoji or character displayed on the left |

## Slots

| Slot | Description |
|------|-------------|
| default | The callout body content. |

## Example

```html
<p-callout type="warning" icon="⚠">
  <p><strong>注意：</strong>所有现有 session 将被失效。</p>
</p-callout>
```

## Notes

- Use `danger` type for bug summaries and critical warnings.
- Use `info` for neutral informational blocks.
- The `icon` prop accepts any emoji or single character.
