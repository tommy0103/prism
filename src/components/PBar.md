# PBar

Horizontal bar comparing values. Wrap individual `<p-bar>` elements inside a `<p-bars>` container.

## PBar Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Left-side label |
| `value` | `string` | — | Right-side value text |
| `percent` | `number` | — | Fill width (0-100). Use `:percent` for number binding. |
| `color` | `'success' \| 'warning' \| 'danger' \| 'purple'` | accent | Bar fill color |

## PBars

Container that lays out child `<p-bar>` elements vertically.

| Slot | Description |
|------|-------------|
| default | One or more `<p-bar>` elements. |

## Example

```html
<p-bars>
  <p-bar label="Service A" value="2.5ms" :percent="25" color="success"></p-bar>
  <p-bar label="Service B" value="8.2ms" :percent="80" color="danger"></p-bar>
</p-bars>
```

## Notes

- Use `:percent` (with colon) for the numeric binding, not `percent`.
- Only use bar charts when a numeric comparison genuinely helps the reader decide.
- Default color is the theme accent if no `color` prop is provided.
