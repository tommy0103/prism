# PTerm

Inline term definition — hover to see a tooltip with the term name and definition. For introducing jargon the reader may not know.

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `word` | `string` | Yes | Term name shown in the tooltip header |
| `def` | `string` | Yes | Definition text |
| `first` | `boolean` | No | First occurrence — shows a small dot marker |

## Slots

| Slot | Description |
|------|-------------|
| default | The inline text (usually the term itself) |

## Example

```html
<p>数据库通过 <p-term word="WAL" def="Write-Ahead Log。先写日志再改数据页。" first>WAL</p-term> 实现持久性。</p>
```

## Notes

- Use `first` on the first occurrence of a term. Subsequent uses omit it — no dot, but still hoverable.
- The tooltip appears on hover, positioned below the term.
- Unlike `<p-collapse>`, this is inline — it doesn't interrupt the reading flow.
- Keep `def` concise — one or two sentences max.
