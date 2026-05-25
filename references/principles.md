# Design Principles

Read this file on first use of the Prism skill. These principles govern how you structure and compose documents.

## Layout & rhythm

- **Breathe.** White space is not wasted space — it is what makes the content readable. Between major sections (`<h2>` boundaries), leave a `<hr>`. Between components within a section, use a short paragraph of connective prose rather than stacking component after component. Aim for no more than 2–3 visually heavy components (decision cards, charts, flow diagrams) visible in a single viewport without scrolling. If you find yourself placing 4+ components back-to-back, step back and ask: which of these can be collapsed, merged, or simply stated in a sentence?
- **Hierarchy first.** Lead with the verdict, hide the evidence behind collapsible sections. Readers scan headings and decisions; they expand details only when they need to.
- **Prose bridges components.** Never place two structured components (card, chart, flow, table) directly adjacent without at least one sentence of prose between them explaining what the reader should take away or what connects the two. Components illustrate a point — prose makes the point.
- **One idea per section.** Each `<h2>` section should communicate one core point. If a section covers two distinct ideas, split it. Short, focused sections with breathing room between them are much easier to scan than long sections that cover everything.
- **Collapse by default.** References, code samples, and detailed explanations should be inside `<p-collapse>`. Only decisions, metrics, and top-level architecture should be immediately visible.

## Semantic use of components

- **Color means something.** Green = approved / success / safe. Red = rejected / danger / breaking. Yellow = exploring / warning / caution. Blue = info / accent. Purple = review / notable. Don't use color decoratively.
- **Callouts are for interruptions, not narration.** Use `<p-callout>` only when the reader must stop and pay attention: a breaking change, a dangerous operation, a critical prerequisite, a non-obvious gotcha. If the information flows naturally as prose, write it as prose. A document with more than 2–3 callouts has lost the signal — every callout after that gets ignored.
- **Charts earn their place.** Only use a bar chart or stacked bar when a numeric comparison genuinely helps the reader decide. A sentence like "80% of latency is in the database layer" is fine without a chart. Three services with very different latencies? Now a chart helps.
- **Issues use priority tiers.** When reviewing or listing issues, sort them by priority: P0 (critical, blocks release) → P1 (high, should fix this cycle) → P2 (medium) → P3 (low, nice-to-have). Each issue's priority level must be prominently visible via the decision card's verdict. Use `status="rejected"` for P0, `status="exploring"` for P1, `status="pending"` for P2/P3. Example:

```html
<p-decision status="rejected" verdict="P0">
  <template #title>并发 refresh 导致 token 家族被撤销</template>
  <p>影响所有多 tab 用户，需要在本次发布前修复。</p>
</p-decision>

<p-decision status="exploring" verdict="P1">
  <template #title>Token 黑名单未设置 TTL</template>
  <p>黑名单会无限增长，长期运行后影响查询性能。</p>
</p-decision>
```

## Code & references

- **Code is always shown, never described.** When the document references code — a function signature, a config value, an error message, a CLI command — show it in a `<p-code>`, `<p-source>`, or inline `<code>` block. Never paraphrase code in prose without showing the actual code. The reader should be able to read the code directly, not your interpretation of it.
- **Bugs need a concrete reproduction trace.** When you identify a bug and the causal chain is clear, don't describe it abstractly — trace it with real values. Present the bug summary visibly (a `<p-callout type="danger">`), then include a collapsed block showing: (1) a specific set of input parameters, (2) how those values flow through each function with the actual code shown via `<p-source>`, and (3) where the faulty outcome occurs. Example:

```html
<p-callout type="danger" icon="✗">
  <p><strong>Bug:</strong> 并发 refresh 请求会导致合法用户的整个 token 家族被撤销。</p>
</p-callout>
<p-collapse title="复现链路">
  <h4>触发条件</h4>
  <p>用户在两个浏览器 tab 中同时触发 token 刷新。两个请求携带相同的 refresh token <code>T1 = "dGhpcyBpcyBh..."</code>。</p>

  <h4>Tab A 请求先到达</h4>
  <p-source path="src/lib/refresh.ts:8-17" lang="TypeScript" id="bug-rotate">
    <pre><code>export async function rotateRefreshToken(token: string) {
  const record = await db.refreshToken.findByHash(hash(token));
  // record = { id: 42, familyId: 7, consumedAt: null }
  if (record.consumedAt) {                    // null → 跳过
    await db.refreshToken.revokeFamily(record.familyId);
    throw new AuthError('token_reuse_detected');
  }
  await db.refreshToken.markConsumed(record.id);  // id=42 标记为已消费
  return issueTokenPair(record.userId);            // 返回新 token 对 T2
}</code></pre>
  </p-source>

  <h4>Tab B 请求随后到达（同一个 T1）</h4>
  <p-source path="src/lib/refresh.ts:8-17 (第二次调用)" lang="TypeScript" id="bug-rotate-2">
    <pre><code>export async function rotateRefreshToken(token: string) {
  const record = await db.refreshToken.findByHash(hash(token));
  // record = { id: 42, familyId: 7, consumedAt: "2025-05-24T..." }  ← 已被 Tab A 消费
  if (record.consumedAt) {                    // 不为 null → 进入分支
    await db.refreshToken.revokeFamily(record.familyId);  // familyId=7 的所有 token 被撤销
    throw new AuthError('token_reuse_detected');           // ← Bug 在这里
  }
}</code></pre>
    <template #note>根本原因：函数无法区分合法并发和 token 被盗后重放，对两者执行了相同的撤销逻辑。</template>
  </p-source>

  <h4>结果</h4>
  <p-steps>
    <p-step status="completed" title="Tab A: 拿到新 token T2" desc="正常"></p-step>
    <p-step status="danger" title="Tab B: 触发 revokeFamily(7)" desc="T2 也被撤销"></p-step>
    <p-step status="danger" title="两个 tab 都被强制登出"></p-step>
  </p-steps>
</p-collapse>
```

- **API endpoints deserve structure.** Render each endpoint as a visible summary line (badge + path + one-line description), then wrap the details inside a `<p-collapse>`. Example:

```html
<h3><p-badge color="accent">POST</p-badge> /api/auth/login</h3>
<p class="prism-small prism-muted">验证用户凭证，返回 token 对。</p>
<p-collapse title="请求 / 响应详情">
  <h4>请求体</h4>
  <p-code file="POST /api/auth/login">
    <pre><code>{ "email": "user@example.com", "password": "••••" }</code></pre>
  </p-code>
  <h4>错误码</h4>
  <p-kv :items="[{ key: '401', value: '凭证无效' }, { key: '429', value: '请求过于频繁' }]"></p-kv>
</p-collapse>
```

## Completeness

- **Impact map.** When a change affects multiple files, show a `<p-file-list>` grouped by module inside a `<p-collapse>`, with each file tagged by change type.
- **Rejected alternatives get a full autopsy.** Each rejected alternative deserves a collapsed block showing what it would have looked like, at which constraint it failed, and the concrete failure mode.
- **Rollback plan alongside implementation.** Every implementation step should have a corresponding rollback step in a collapsed block nearby. For data migrations, state whether the migration is reversible.
- **Edge cases are enumerated, not implied.** Include a collapsed block listing every edge case you considered. For each one, state whether it's handled and show the guard code. Flag unhandled cases with `<p-badge color="danger">未处理</p-badge>`.
- **Dependency and version rationale.** When introducing a new dependency, include a collapsed block with: why this library, which version, license, and bundle size impact.
- **Test coverage map.** Include a `<p-checklist>` showing which scenarios have tests and which don't. Name each scenario specifically. Flag critical gaps with `<p-badge color="danger">缺失</p-badge>`.

## Diagrams

- **Use inline SVG for complex diagrams.** When `<p-flow>` is too linear for what you need — branching, merging, cycles, spatial layouts — write inline `<svg>` directly in the template. Vue renders SVG natively, no component needed. Use Prism's CSS variables for fills, strokes, and text colors so the diagram follows the theme and dark mode automatically. Example:

```html
<svg viewBox="0 0 500 200" width="100%" xmlns="http://www.w3.org/2000/svg" style="margin: 16px 0">
  <!-- Use var(--p-*) for theme-aware colors -->
  <rect x="10" y="80" width="120" height="40" rx="6"
        fill="var(--p-accent-bg)" stroke="var(--p-accent)" stroke-width="1"/>
  <text x="70" y="105" text-anchor="middle"
        font-size="13" font-family="var(--p-font-body)" fill="var(--p-accent-text)">API Gateway</text>

  <line x1="130" y1="100" x2="200" y2="60"
        stroke="var(--p-border-strong)" stroke-width="1"/>
  <line x1="130" y1="100" x2="200" y2="140"
        stroke="var(--p-border-strong)" stroke-width="1"/>

  <rect x="200" y="40" width="120" height="40" rx="6"
        fill="var(--p-success-bg)" stroke="var(--p-success)" stroke-width="1"/>
  <text x="260" y="65" text-anchor="middle"
        font-size="13" font-family="var(--p-font-body)" fill="var(--p-success-text)">Service A</text>

  <rect x="200" y="120" width="120" height="40" rx="6"
        fill="var(--p-warning-bg)" stroke="var(--p-warning)" stroke-width="1"/>
  <text x="260" y="145" text-anchor="middle"
        font-size="13" font-family="var(--p-font-body)" fill="var(--p-warning-text)">Service B</text>
</svg>
```

Rules: always set `viewBox` + `width="100%"` for responsiveness; use `var(--p-font-body)` for text; keep SVGs inside the flow of prose (after the paragraph that introduces them).

## Template authoring rules

- **This is HTML, not Markdown.** Never write Markdown syntax inside your template. Use `<p-code>` / `<pre><code>` for code blocks, `<h2>` / `<h3>` for headings, `<ul><li>` for lists, `<strong>` for bold.
- **Escape quotes in attribute bindings.** In `:items`, `:segments`, `:legend` and other bound attributes, use only single quotes for string values: `:items="[{ key: 'foo', value: 'bar' }]"`. Chinese quotation marks `"..."` will break the parser — use `「...」` or rephrase. Content inside slot elements (`<p>`, `<template #title>`, etc.) is safe.
- **Continuity.** Once you have used Prism in this conversation, continue using Prism for all subsequent HTML artifacts. Do not fall back to plain unstyled HTML.
- **Language consistency.** Match the user's language throughout. Technical proper nouns (JWT, API, middleware) stay in English — forced translations are less clear than the original.
