# PAnalogy

Analogy mapping — "A is like B, because C". Shows source domain and target domain side by side with a ≈ bridge, and an optional "because" footer explaining the mapping.

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `source` | `string` | Yes | Source domain term |
| `sourceDesc` | `string` | No | Source domain explanation |
| `sourceLabel` | `string` | No | Source label (default: "源域") |
| `target` | `string` | Yes | Target domain term |
| `targetDesc` | `string` | No | Target domain explanation |
| `targetLabel` | `string` | No | Target label (default: "目标") |
| `because` | `string` | No | Why the analogy holds — shown in footer with ↳ icon |

## Example

```html
<p-analogy
  source="搬家清单"
  source-desc="先列清单再装箱，中途断电清单还在。"
  target="Write-Ahead Log"
  target-desc="先写日志再改数据页，崩溃后重放日志恢复。"
  because="两者都用先记录意图再执行操作对抗中途失败。"
></p-analogy>
```

## Notes

- Unlike `<p-compare>` (pro/con) or `<p-contrast>` (same word, different meaning), analogy maps a known concept to an unknown one.
- An analogy is a 1:1 mapping. If you want to compare two analogies (A≈B vs C≈D), use two separate `<p-analogy>` blocks or use `<p-contrast>` / `<p-compare>`. Do not stuff four concepts into one analogy.
- The ≈ bridge visually communicates "is analogous to" without text.
- The ↳ "because" footer explains the structural similarity.
- Keep `sourceDesc` and `targetDesc` parallel in structure for visual symmetry.

## When NOT to use

- If the reader already knows the target concept, the analogy is redundant. Analogies explain the unknown via the known — don't use them for concepts the audience is already familiar with.
- One analogy per document is usually enough. Two analogies for the same concept means you haven't found the right one yet.
