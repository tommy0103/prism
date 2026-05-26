# PBranch + PBranchItem

Decision tree / branching flow. Unlike `<p-flow>` (linear), branch shows condition → path → outcome with tree structure and nesting.

## Props

### PBranch

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `root` | `string` | Yes | Root condition / starting point text |

### PBranchItem

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `cond` | `string` | No | Condition label (rendered as a mono chip) |
| `outcome` | `string` | No | Result description (preceded by ↳ icon) |
| `status` | `'leaf' \| 'danger' \| 'success'` | No | Node dot color |

## Slots

### PBranch

| Slot | Description |
|------|-------------|
| default | `<p-branch-item>` children |

### PBranchItem

| Slot | Description |
|------|-------------|
| default | Path description text |
| `#children` | Nested `<p-branch-item>` for sub-branches |

## Example

```html
<p-branch root="系统重启时，检查日志状态">
  <p-branch-item cond="no log" outcome="冷启动">日志文件为空</p-branch-item>
  <p-branch-item cond="log + commit" outcome="重放 redo">日志末尾有 TxCommit
    <template #children>
      <p-branch-item cond="redo ok" status="success" outcome="进入正常服务">重放成功</p-branch-item>
      <p-branch-item cond="redo fail" status="danger" outcome="回滚到上一个 checkpoint">页校验失败</p-branch-item>
    </template>
  </p-branch-item>
</p-branch>
```

## Notes

- Supports arbitrary nesting depth via `#children` slot.
- `cond` is the branching condition — keep it short (mono font, chip style).
- `status` colors the node dot: `success` = green, `danger` = red, `leaf` = accent blue.

## When NOT to use

- If there are only 2 branches with no nesting, a sentence with "if X then Y, otherwise Z" is clearer than a visual tree.
- If the branching logic is already shown in code via `<p-source>`, don't duplicate it as a branch diagram — the code is the authoritative representation.
