# PFinding

A single observation or result, typically nested inside a `<p-track>`. Shows a title + body, with an optional expandable detail section for evidence, code, or deeper explanation.

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | No | Finding headline. Omit if the body is a single sentence. |

## Slots

| Slot | Description |
|------|-------------|
| default | The finding statement |
| `#detail` | Expandable evidence — code blocks, source refs, longer explanation |

## Example

```html
<p-finding title="Token 黑名单无 TTL">
  <code>blocklist</code> 使用内存 <code>Set</code>，只增不减。
  <template #detail>
    <p-source path="src/lib/blocklist.ts:12" lang="TypeScript" id="src-bl">
      <pre><code>const blocklist = new Set&lt;string&gt;();</code></pre>
    </p-source>
    <p>运行 30 天后 <code>blocklist.size ≈ 180,000</code>。</p>
  </template>
</p-finding>
```

### Without title (single-sentence finding)

```html
<p-finding>所有公开端点都有 rate limiting。</p-finding>
```

## When NOT to use

- If the finding is just one word or a status badge, use a `<p-track>` with `flag` instead of nesting a finding inside it.
- Outside of a `<p-track>` context, prefer `<p-callout>` or prose. Finding is designed to be a child of track, not a standalone block.

## Notes

- `#detail` slot content is always visible (not collapsed). Use `<p-collapse>` inside `#detail` if you want collapsible evidence.
- Findings can be nested: a finding's `#detail` can contain another finding for multi-layer drill-down.
