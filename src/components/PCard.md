# PCard

General-purpose container card with optional title, header override, and footer.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Card title displayed in the header |

## Slots

| Slot | Description |
|------|-------------|
| `#header` | Overrides the default title header entirely. |
| default | Card body content. |
| `#footer` | Footer content below the body. |

## Example

```html
<p-card title="组件名称">
  <p>描述...</p>
  <template #footer>
    <p-badge color="success">稳定</p-badge>
  </template>
</p-card>
```

## Notes

- If both `title` prop and `#header` slot are provided, the `#header` slot takes precedence.
- Commonly used inside `<p-grid>` for multi-column card layouts.
