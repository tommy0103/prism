# PCompare

Side-by-side pro/con comparison layout.

## Slots

| Slot | Description |
|------|-------------|
| `#pro` | Left column content (advantages/pros). |
| `#con` | Right column content (risks/cons). |

## Example

```html
<p-compare>
  <template #pro>
    <div class="prism-compare-col-title">优势</div>
    <ul><li>优势一</li></ul>
  </template>
  <template #con>
    <div class="prism-compare-col-title">风险</div>
    <ul><li>风险一</li></ul>
  </template>
</p-compare>
```

## Notes

- Use `class="prism-compare-col-title"` on a `<div>` for column headers.
- Content inside each slot is free-form HTML; `<ul>` lists are the common pattern.

## When NOT to use

- If the comparison is not value-loaded (good vs bad), use `<p-contrast>` instead. Compare's green/red framing implies a judgment.
- If each side has only 1 bullet point, write it as prose: "The advantage is X, but the risk is Y."
