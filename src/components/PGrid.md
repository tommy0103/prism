# PGrid

Responsive column grid layout for arranging cards or other components.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cols` | `number` | — | Number of columns: `2`, `3`, or `4`. Use `:cols` for binding. |

## Slots

| Slot | Description |
|------|-------------|
| default | Child elements to arrange in columns. |

## Example

```html
<p-grid :cols="2">
  <p-card>...</p-card>
  <p-card>...</p-card>
</p-grid>
```

## Notes

- Use `:cols` (with colon) for the numeric binding.
- Responsive -- stacks to single column on mobile.
- Common values: `:cols="2"`, `:cols="3"`, `:cols="4"`.
