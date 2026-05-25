# PTabs + PTab

Section-level tab switcher for parallel comparisons within a page.

## Props

### PTabs

No props. Wraps `<p-tab>` children.

### PTab

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Yes | Tab label displayed in the header |

## Slots

### PTabs

| Slot | Description |
|------|-------------|
| default | `<p-tab>` children |

### PTab

| Slot | Description |
|------|-------------|
| default | Tab content — any Prism components or HTML |

## Example

```html
<p-tabs>
  <p-tab title="方案 A">
    <p>方案 A 的内容...</p>
    <p-bars>
      <p-bar label="延迟" value="0.3ms" :percent="5" color="success"></p-bar>
    </p-bars>
  </p-tab>
  <p-tab title="方案 B">
    <p>方案 B 的内容...</p>
  </p-tab>
</p-tabs>
```

## Notes

- Use for parallel comparisons where options are equal weight (not primary/secondary).
- Each tab can contain any Prism components — code blocks, flows, charts, etc.
- For document-level multi-page, use `<p-pages>` instead.
