# PDecision

Decision card with a colored left border and verdict badge indicating status.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | `'approved' \| 'rejected' \| 'exploring' \| 'pending'` | — | Controls border color and badge style |
| `verdict` | `string` | — | Badge text (e.g. "已采纳", "已否决") |

## Slots

| Slot | Description |
|------|-------------|
| `#title` | Required. The decision title. |
| default | Body content explaining the decision. |

## Example

```html
<p-decision status="approved" verdict="已采纳">
  <template #title>使用 PostgreSQL</template>
  <p>关系型查询主导我们的访问模式...</p>
</p-decision>
```

## Notes

- Left border color and verdict badge change based on `status`.
- Color semantics: green = approved, red = rejected, yellow = exploring, gray = pending.
- Commonly used with `<p-badge>` in the title slot for priority indicators (e.g. P0/P1).
