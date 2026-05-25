# PParams + PParam

Interactive parameter panel. Users adjust values via sliders, dropdowns, or toggles. Values are reactive — use `{{ params.name }}` anywhere in the template to display the current value.

## Props

### PParams

No props. Wraps `<p-param>` children and provides the reactive store.

### PParam

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | Parameter key — use `params.name` to reference in template |
| `label` | `string` | Yes | Display label |
| `type` | `'range' \| 'select' \| 'toggle'` | No | Input type (default: `range`) |
| `value` | `string \| number \| boolean` | No | Initial value |
| `min` | `number` | No | Range minimum |
| `max` | `number` | No | Range maximum |
| `step` | `number` | No | Range step |
| `options` | `string` | No | Comma-separated options for select |
| `unit` | `string` | No | Unit label shown after value (e.g. "分钟") |

## Example

```html
<p-params>
  <p-param name="timeout" label="超时时间" type="range"
           :min="1" :max="60" :step="1" :value="15" unit="秒"></p-param>
  <p-param name="region" label="部署区域" type="select"
           options="us-east, eu-west, ap-northeast" value="us-east"></p-param>
  <p-param name="debug" label="调试模式" type="toggle" :value="false"></p-param>
</p-params>

<p>超时设为 <strong>{{ params.timeout }}</strong> 秒，部署到 <strong>{{ params.region }}</strong>。</p>

<p-copy :content="'timeout=' + params.timeout + '\nregion=' + params.region + '\ndebug=' + params.debug"
        label="复制配置"></p-copy>
```

## Notes

- Use `:min`, `:max`, `:step`, `:value` (with colon) for number props — without colon they're strings.
- The `params` object is available anywhere in the template via `{{ params.xxx }}`.
- Pair with `<p-copy>` to let users export adjusted values.
- Use single quotes inside `:content` bindings to avoid quote conflicts.
