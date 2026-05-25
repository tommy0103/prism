# PMetric

Key numbers displayed prominently. Wrap individual `<p-metric>` elements inside a `<p-metrics>` container.

## PMetric Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | The big number |
| `label` | `string` | — | Small label below the number |
| `delta` | `string` | — | Optional change indicator (e.g. `+12%`) |
| `delta-dir` | `'up' \| 'down'` | — | `'up'` = green, `'down'` = red |

## PMetrics

Container that lays out child `<p-metric>` elements in a row.

| Slot | Description |
|------|-------------|
| default | One or more `<p-metric>` elements. |

## Example

```html
<p-metrics>
  <p-metric value="47" label="受影响文件"></p-metric>
  <p-metric value="89%" label="测试覆盖" delta="+12%" delta-dir="up"></p-metric>
</p-metrics>
```

## Notes

- Use `<p-metrics>` as the wrapper; do not place `<p-metric>` elements without it.
- `delta-dir="up"` renders in green; `delta-dir="down"` renders in red.
