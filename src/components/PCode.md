# PCode

Code block with an optional file path header.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `file` | `string` | — | File path or label shown in the header |

## Slots

| Slot | Description |
|------|-------------|
| default | `<pre><code>` block containing the code. |

## Example

```html
<p-code file="src/auth.ts">
  <pre><code>const token = sign(payload);</code></pre>
</p-code>
```

## Notes

- Always place code inside `<pre><code>...</code></pre>` within the default slot.
- For source code with cross-reference support, use `<p-source>` instead.
- This is HTML, not Markdown. Do not use Markdown code fences inside the template.
