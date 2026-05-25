# PKv

Key-value pair list rendered as a styled table.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `Array<{ key: string, value: string }>` | — | Array of key-value pairs. Use `:items` for binding. |

## Example

```html
<p-kv :items="[
  { key: 'Owner', value: 'Platform team' },
  { key: 'Priority', value: 'P1' }
]"></p-kv>
```

## Notes

- Use `:items` (with colon) for the array binding.
- Use single quotes for string values inside the bound attribute to avoid breaking the Vue template parser.
- Avoid Chinese quotation marks inside bound attributes; use `「...」` instead.
