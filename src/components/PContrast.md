# PContrast

Neutral concept comparison — same word, different meanings in different contexts. Unlike `<p-compare>` (pro/con with green/red), contrast has no value judgment.

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `word` | `string` | Yes | The term being compared |
| `desc` | `string` | No | Subtitle after the word |

## Slots

| Slot | Description |
|------|-------------|
| `#left` | Left column — include `.context` and `.meaning` divs |
| `#right` | Right column — same structure |

## Example

```html
<p-contrast word="WAL" desc="在两个语境下含义不同">
  <template #left>
    <div class="context">在数据库里</div>
    <div class="meaning">指 <code>redo log</code>，强调<em>持久性</em>。</div>
  </template>
  <template #right>
    <div class="context">在这份设计里</div>
    <div class="meaning">指业务级操作日志，强调<em>可恢复性</em>。</div>
  </template>
</p-contrast>
```

## Notes

- Use `.context` for the context label (rendered as a mono chip).
- Use `.meaning` for the explanation. `<em>` inside meaning renders as bold, not italic.
- Use `<p-compare>` for pro/con (value judgment), `<p-contrast>` for neutral semantic differences.
