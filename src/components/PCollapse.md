# PCollapse

Expandable content block with smooth animation. Default state is collapsed.

Also covers `PCollapseGroup` for accordion behavior.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Summary text shown when collapsed |
| `open` | `boolean` | `false` | Start expanded |
| `borderless` | `boolean` | `false` | FAQ-style toggle without box border |

## Slots

| Slot | Description |
|------|-------------|
| default | The collapsible body content. |

## Example

```html
<p-collapse title="实现细节">
  <p>折叠的内容...</p>
</p-collapse>
```

## Accordion Group (PCollapseGroup)

Wrap multiple `<p-collapse>` elements so only one is open at a time.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `accordion` | `boolean` | `false` | Enable accordion behavior (only one open at a time) |

```html
<p-collapse-group accordion>
  <p-collapse title="第一节">...</p-collapse>
  <p-collapse title="第二节">...</p-collapse>
</p-collapse-group>
```

## Notes

- Default state is collapsed; use `open` prop to start expanded.
- Use `borderless` for a clean FAQ-style layout without box borders.
- References, code samples, and detailed explanations should generally be placed inside `<p-collapse>` to keep the document scannable.
