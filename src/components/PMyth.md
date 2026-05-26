# PMyth

Misconception → correction pattern. Shows a common wrong assumption and the actual truth side by side, with distinct visual treatment (灯泡 icon for myth, ✓ icon for truth).

## Props

No props. Content goes in slots.

## Slots

| Slot | Description |
|------|-------------|
| `#myth` | The misconception — what the reader might wrongly assume |
| `#truth` | The correction — what's actually true |

## Example

```html
<p-myth>
  <template #myth>直接写一个 <code>journal.json</code> 不就好了？</template>
  <template #truth>JSON 写到一半崩溃会损坏整个文件。WAL 用<strong>定长记录 + 校验和</strong>，即使最后一条损坏，前面的记录全部可用。</template>
</p-myth>
```

## Notes

- Myth side: gray background + gray left border + 灯泡 icon.
- Truth side: white background + accent left border + ✓ icon.
- Use for "you might think X, but actually Y" patterns common in explainer docs.
- Unlike `<p-compare>`, this is not about two equal options — it's about correcting a wrong mental model.
