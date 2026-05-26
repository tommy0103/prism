# PFileList + PFileGroup + PFile

Impact map showing affected files grouped by module. Slot-based API — compose `<p-file-group>` and `<p-file>` children.

## PFileList

Container, no props. Wraps `<p-file-group>` or flat `<p-file>` children.

## PFileGroup Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `module` | `string` | Yes | Module/directory name shown in header |

Auto-computed from children:
- File count badge
- Status legend (shows which diff statuses appear in this group)

## PFile Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `path` | `string` | Yes | File path |
| `status` | `'added' \| 'modified' \| 'deleted'` | No | Diff status — controls left color bar |
| `purpose` | `string` | No | What changed in this file (also via default slot) |

## Example

```html
<p-file-list>
  <p-file-group module="src/events">
    <p-file path="event-store.ts" status="added" purpose="Event append + concurrency control"></p-file>
    <p-file path="domain-events.ts" status="added"></p-file>
    <p-file path="event-bus.ts" status="added"></p-file>
  </p-file-group>
  <p-file-group module="src/routes">
    <p-file path="orders.ts" status="modified" purpose="Response shape changed to { eventId, version }"></p-file>
    <p-file path="health.ts" status="modified"></p-file>
  </p-file-group>
</p-file-list>
```

### Flat (no groups)

```html
<p-file-list>
  <p-file path="package.json" status="modified"></p-file>
  <p-file path="tsconfig.json" status="modified"></p-file>
</p-file-list>
```

## When NOT to use

- If there are only 1–2 changed files, mention them inline: "this changes `auth.ts` and `rate-limit.ts`."
- For large diffs (50+ files), consider grouping by change type instead of by module, or collapsing the whole list.

## Notes

- `status` colors: `added` = green bar, `modified` = yellow bar, `deleted` = red bar + strikethrough path. No status = no bar.
- `purpose` (or default slot) adds a description line below the path — use for non-obvious changes.
- PFileGroup auto-counts files and shows a status legend badge in the header.
