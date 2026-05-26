# PRef

Inline reference chip — a clickable link in running text that scrolls to and opens a `<p-source>` block. Renders as a small mono-styled chip with an → arrow.

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `to` | `string` | Yes | Target `<p-source>` block's `id` (without `#`) |
| `label` | `string` | No | Display text (e.g. `auth.ts:42`). Falls back to default slot. |

## Slots

| Slot | Description |
|------|-------------|
| default | Alternative to `label` prop for the display text |

## Example

```html
<p>核心逻辑在 <p-ref to="src-auth" label="auth.ts:42"></p-ref> 中实现。</p>

<p-source path="src/middleware/auth.ts:42-48" lang="TypeScript" id="src-auth">
  <pre><code>export async function verifyAuth(req: Request) {
  // ...
}</code></pre>
</p-source>
```

## Behavior

- Clicking a ref scrolls to the target `<p-source>` and opens it if collapsed.
- The target briefly flashes an accent outline (1.5s) to draw the reader's eye.
- Multiple refs can point to the same source block id.

## When NOT to use

- PRef is exempt from the document-level component budget — use as many as the code demands.
- But if you find yourself putting a ref on every function name in a paragraph, the paragraph is probably trying to be a code walkthrough. Use a `<p-source>` block instead and let the reader read the code directly.
- Every `<p-ref>` must have a corresponding `<p-source>`. Do not create orphan refs that link to nothing.

## Notes

- Place the target `<p-source>` close to where the ref appears — within the same section, not at the bottom of the document.
- Use `label` to show file:line (e.g. `auth.ts:42`), not the function name. The reader should know where to find it in the codebase, not just what it's called.
