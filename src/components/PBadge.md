# PBadge

Inline colored badge for status labels. Also covers `PTag` for neutral version/label tags.

## PBadge Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `'success' \| 'warning' \| 'danger' \| 'info' \| 'accent' \| 'purple'` | — | Badge color variant. Omit for default gray. |

## PBadge Slots

| Slot | Description |
|------|-------------|
| default | Badge text content. |

## PTag

Neutral tag for version numbers or labels. No color prop.

| Slot | Description |
|------|-------------|
| default | Tag text content. |

## Example

```html
<p-badge color="success">成功</p-badge>
<p-badge color="warning">警告</p-badge>
<p-badge color="danger">危险</p-badge>
<p-badge color="info">信息</p-badge>
<p-badge color="accent">Accent</p-badge>
<p-badge color="purple">审查</p-badge>
<p-badge>默认</p-badge>

<p-tag>v2.1.0</p-tag>
```

## Notes

- Color semantics: green = success/safe, red = danger/breaking, yellow = warning/caution, blue = info, purple = review/notable.
- Use `<p-badge>` for status indicators; use `<p-tag>` for neutral labels like version numbers.
- Commonly used inside table cells, card footers, and decision titles for priority indicators.
