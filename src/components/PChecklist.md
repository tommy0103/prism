# PChecklist

Test coverage map or scenario checklist. Wrap individual `<p-check-item>` elements inside a `<p-checklist>` container.

## PCheckItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Controls checkbox state (checked = covered) |

## PCheckItem Slots

| Slot | Description |
|------|-------------|
| default | Scenario description text. May include inline components like `<p-badge>`. |

## PChecklist Slots

| Slot | Description |
|------|-------------|
| default | One or more `<p-check-item>` elements. |

## Example

```html
<p-checklist>
  <p-check-item checked>有效凭证登录返回 200 + token 对</p-check-item>
  <p-check-item checked>无效密码返回 401</p-check-item>
  <p-check-item checked>过期 access token 被拒绝</p-check-item>
  <p-check-item>并发 refresh 不会误撤销 <p-badge color="danger">缺失</p-badge></p-check-item>
  <p-check-item>Refresh token 过期后返回 401</p-check-item>
</p-checklist>
```

## Notes

- Unchecked items represent gaps the reviewer should be aware of.
- Flag critical uncovered scenarios with `<p-badge color="danger">缺失</p-badge>` inline.
- Name scenarios specifically (e.g. "login with valid credentials returns 200 + token pair"), not generically (e.g. "happy path").
