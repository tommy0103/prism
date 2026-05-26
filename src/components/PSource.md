# PSource

Expandable source code block with file path header and optional language badge. Used together with `PRef` for inline cross-references.

## PSource Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `path` | `string` | — | File path shown in header (e.g. `src/auth.ts:42-48`) |
| `lang` | `string` | — | Language tag, shown as a badge (e.g. `TypeScript`) |
| `id` | `string` | — | Anchor id for `<p-ref>` chips to link to |

## PSource Slots

| Slot | Description |
|------|-------------|
| default | `<pre><code>` block containing the source code. |
| `#note` | Optional note displayed below the code block. |

## PRef Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `to` | `string` | — | Target source block `id` (without `#`) |
| `label` | `string` | — | Display text (e.g. `auth.ts:42`) |

## Example

Inline ref chip in running text, linking to a source block:

```html
<p>核心逻辑在 <p-ref to="src-auth" label="auth.ts:42"></p-ref> 中实现。</p>

<p-source path="src/middleware/auth.ts:42-48" lang="TypeScript" id="src-auth">
  <pre><code>export async function verifyAuth(req: Request) {
  const token = extractBearerToken(req);
  if (!token) throw new AuthError('missing_token');
  return await verifyJWT(token);
}</code></pre>
  <template #note>这个函数不处理 token 刷新。</template>
</p-source>
```

## Notes

- Every `<p-ref>` must have a corresponding `<p-source>` with a matching `id`. No orphan refs.
- Place source blocks close to where they are referenced, not in a separate section at the end.
- Multiple ref chips can point to the same source block.
- Always show real code, never paraphrase code in prose.
- **One continuous range per source block.** Use `path="file.ts:18-70"`, not `path="file.ts:18-70,79-100"`. If you need to show two non-contiguous code segments, use two separate `<p-source>` blocks. The line number display starts from the first number in the path — multi-range paths will show incorrect line numbers for the second segment.
