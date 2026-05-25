# PStackedBar

Proportional breakdown bar showing segments of a whole, with an optional legend.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `segments` | `Array<{ percent: number, color: string }>` | — | Bar segments. Use `:segments` for binding. |
| `legend` | `Array<{ label: string, color: string }>` | — | Legend items below the bar. Use `:legend` for binding. |

## Example

```html
<p-stacked-bar
  :segments="[
    { percent: 62, color: 'accent' },
    { percent: 18, color: 'success' },
    { percent: 20, color: 'muted' }
  ]"
  :legend="[
    { label: 'API 调用 (62%)', color: 'var(--p-accent)' },
    { label: '缓存命中 (18%)', color: 'var(--p-success)' }
  ]"
></p-stacked-bar>
```

## Notes

- Segment `color` values: `accent`, `success`, `warning`, `danger`, `purple`, `muted`.
- Legend `color` values use CSS variable references (e.g. `var(--p-accent)`).
- Use `:segments` and `:legend` (with colon) for array bindings.
- Use single quotes for string values inside bound attributes to avoid breaking the Vue template parser.
