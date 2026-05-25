# PCopy

Copy-to-clipboard button. Copies the `content` prop value when clicked. Shows "Copied!" feedback for 1.5 seconds.

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `content` | `string` | Yes | Text to copy to clipboard |
| `label` | `string` | No | Button text (default: "Copy") |

## Slots

| Slot | Description |
|------|-------------|
| default | Overrides the label text |

## Example

```html
<!-- Simple -->
<p-copy content="npm install prism" label="复制安装命令"></p-copy>

<!-- With dynamic content from params -->
<p-copy :content="'timeout=' + params.timeout" label="复制配置"></p-copy>

<!-- Slot override -->
<p-copy content="some text">
  <strong>点击复制</strong>
</p-copy>
```

## Notes

- Pair with `<p-params>` to let users adjust values then export them.
- The `:content` binding (with colon) is needed for dynamic/computed content.
- Uses `navigator.clipboard.writeText` — requires HTTPS or localhost.
