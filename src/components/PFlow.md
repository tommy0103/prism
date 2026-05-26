# PFlow + PFlowNode + PFlowArrow

Architecture flow diagram. Horizontal by default, vertical with `vertical` prop. Wraps automatically when content exceeds container width.

## PFlow Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `vertical` | `boolean` | `false` | Vertical layout |
| `plain` | `boolean` | `false` | No container styling — for embedding in dense prose |

## PFlowNode Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `'accent' \| 'success' \| 'warning' \| 'danger' \| 'purple'` | — | Semantic color (default: border-left only) |
| `type` | `'store' \| 'external' \| 'decision'` | — | Node shape variant |
| `filled` | `boolean` | `false` | Full background fill (opt-in) |
| `meta` | `string` | — | Right-side mono chip for short info (`12ms`, `×32`) |
| `subtitle` | `string` | — | Line below title for longer info (`POST /api/v2/payments`). Overrides `meta` |

## PFlowArrow Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Flow condition / trigger. Keep ≤ 8 chars (`miss`, `2xx`, `retry`) |
| `variant` | `'dashed' \| 'thick' \| 'async' \| 'fail'` | — | Arrow visual variant |
| `terse` | `boolean` | auto | Force single-line label. Auto: ≤ 8 chars = terse |

## Semantic boundaries

- **Arrow label** = flow condition or trigger reason. Short: `miss`, `2xx`, `5xx`, `event`, `retry`.
- **Node meta/subtitle** = interface, metrics, config. Any length: `POST /api/v2/payments`, `12ms p99`.

## Example

```html
<p-flow>
  <p-flow-node color="accent">API Gateway</p-flow-node>
  <p-flow-arrow label="2xx"></p-flow-arrow>
  <p-flow-node color="success" meta="12ms">Cache</p-flow-node>
  <p-flow-arrow label="miss"></p-flow-arrow>
  <p-flow-node type="store" subtitle="POST /api/payments">Service</p-flow-node>
</p-flow>
```

### Vertical

```html
<p-flow vertical>
  <p-flow-node>请求到达</p-flow-node>
  <p-flow-arrow label="auth"></p-flow-arrow>
  <p-flow-node color="accent">验证</p-flow-node>
</p-flow>
```

## Notes

- `plain` removes container background — use for inline flows in prose.
- `filled` fills the entire node with semantic color. Default is border-left only.
- `type="store"` for databases, `"external"` for external services, `"decision"` for branch points.
- Arrow `variant="dashed"` for optional, `"async"` for async, `"fail"` for error paths.
