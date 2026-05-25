# PFileList

Impact map showing affected files grouped by module, each tagged with a change type.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `groups` | `Array<{ module: string, files: Array<{ path: string, change: string }> }>` | — | File groups. Use `:groups` for binding. |

## Example

```html
<p-file-list :groups="[
  {
    module: 'src/middleware',
    files: [
      { path: 'auth.ts', change: '修改' },
      { path: 'rate-limit.ts', change: '修改' }
    ]
  },
  {
    module: 'src/lib',
    files: [
      { path: 'jwt.ts', change: '新增' },
      { path: 'refresh.ts', change: '新增' },
      { path: 'blocklist.ts', change: '新增' }
    ]
  },
  {
    module: 'src/routes',
    files: [
      { path: 'auth.ts', change: '签名变更' }
    ]
  }
]"></p-file-list>
```

## Notes

- Change tags are auto-colored by keyword:
  - Green: `新增` / `added`
  - Yellow: `修改` / `modified`
  - Red: `签名变更` / `breaking`, `删除` / `removed`
  - Blue: `仅 import` / `import-only`
- Use `:groups` (with colon) for the array binding.
- Use single quotes for string values inside the bound attribute.
