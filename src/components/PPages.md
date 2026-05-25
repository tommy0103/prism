# PPages + PPage

Document-level multi-page. Each page is a full Prism document; tab bar at the top switches between them. Output is still a single HTML file.

## Props

### PPages

No props. Wraps `<p-page>` children.

### PPage

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Yes | Tab label in the top bar |

## Slots

### PPages

| Slot | Description |
|------|-------------|
| default | `<p-page>` children |

### PPage

| Slot | Description |
|------|-------------|
| default | Full page content — headings, sections, any Prism components |

## Example

```html
<p-pages>
  <p-page title="方案 A: JWT">
    <h1>JWT 方案详细评估</h1>
    <p-metrics>
      <p-metric value="0.3ms" label="校验延迟"></p-metric>
    </p-metrics>
    <h2>架构</h2>
    <p-flow>...</p-flow>
  </p-page>
  <p-page title="方案 B: Redis">
    <h1>Redis 方案详细评估</h1>
    ...
  </p-page>
</p-pages>
```

## Notes

- Use when exploring multiple equal-weight technical directions, each needing its own full document.
- Differs from `<p-tabs>`: tabs are section-level (within a page), pages are document-level (replace the whole page).
- The tab bar is lightweight — not sticky, no background.
