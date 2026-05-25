# PFlow

Horizontal or vertical flow diagram. Compose with `PFlowNode` and `PFlowArrow` children.

## PFlow Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `vertical` | `boolean` | `false` | Use vertical layout instead of horizontal |

## PFlowNode Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `'accent' \| 'success' \| 'warning' \| 'danger' \| 'purple'` | — | Node background color variant |

## PFlowNode Slots

| Slot | Description |
|------|-------------|
| default | Node label text. |

## PFlowArrow Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Optional text displayed on the arrow |

## Example

```html
<p-flow>
  <p-flow-node>客户端</p-flow-node>
  <p-flow-arrow label="REST"></p-flow-arrow>
  <p-flow-node color="accent">API 网关</p-flow-node>
  <p-flow-arrow></p-flow-arrow>
  <p-flow-node color="success">数据库</p-flow-node>
</p-flow>
```

Vertical layout:

```html
<p-flow vertical>
  <p-flow-node>Step 1</p-flow-node>
  <p-flow-arrow></p-flow-arrow>
  <p-flow-node>Step 2</p-flow-node>
</p-flow>
```

## Notes

- Alternate `<p-flow-node>` and `<p-flow-arrow>` as children of `<p-flow>`.
- Node color variants: `accent`, `success`, `warning`, `danger`, `purple`.
- Arrows without a `label` render as plain connectors.
