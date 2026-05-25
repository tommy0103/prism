# Prism

A Vue component library for AI agents to render structured HTML documents with visual hierarchy.

Notion-inspired. Dark/light theme. Decision cards, collapsible sections, architecture flows, charts, source references with syntax highlighting. Outputs self-contained single-file HTML that opens in any browser.

## Quick start

### Install

```bash
# Install to current project
npx skills add your-username/prism

# Or install globally for all projects
npx skills add your-username/prism --global
```

No build step needed — the runtime is pre-built and included in the repo.

After installing, the agent will discover the skill and can use it when you ask for structured documents, decision records, architecture analyses, etc.

### For developers who want to customize

```bash
git clone https://github.com/your-username/prism.git
cd prism
npm install
# Edit src/components/ or src/styles/themes/notion.css
npm run build
# Then install from your local copy
npx skills add ./prism
```

### What happens when the agent uses Prism

1. The agent writes a `template.html` file using Vue component syntax:

```html
<h1>认证系统重构</h1>

<p-decision status="approved" verdict="已采纳">
  <template #title>使用 JWT</template>
  <p>Access token 15 分钟过期，refresh token 单次使用。</p>
</p-decision>

<p-collapse title="详细分析">
  <p>更多内容...</p>
</p-collapse>
```

2. The agent runs the build script to produce a standalone HTML:

```bash
node .od-skills/prism/build.js template.html index.html
```

The build script auto-detects the language from `<!-- lang: zh-CN -->` and extracts the `<h1>` as the page title.

3. The output `index.html` is a single file with everything inlined (Vue runtime + components + CSS + syntax highlighting). Open it in any browser — no server needed.

## Preview the examples

To see what Prism looks like before installing:

```bash
cd prism
npx http-server . -p 3000
# Open http://localhost:3000/references/showcase.html
```

## Components

| Component | What it does |
|-----------|-------------|
| `<p-decision>` | Decision card — approved / rejected / exploring / pending |
| `<p-callout>` | Highlighted block — info / success / warning / danger / purple |
| `<p-collapse>` | Expandable section with smooth animation |
| `<p-collapse-group>` | Accordion — only one collapse open at a time |
| `<p-source>` | Expandable source code block with syntax highlighting |
| `<p-ref>` | Inline reference chip — click to jump to a `<p-source>` |
| `<p-metrics>` + `<p-metric>` | Key numbers at a glance |
| `<p-bars>` + `<p-bar>` | Horizontal bar chart |
| `<p-stacked-bar>` | Proportional breakdown with legend |
| `<p-flow>` + `<p-flow-node>` + `<p-flow-arrow>` | Architecture flow diagram |
| `<p-steps>` + `<p-step>` | Timeline with completed / active / danger / warning states |
| `<p-compare>` | Pro/con side-by-side comparison |
| `<p-card>` | General-purpose container with header and footer |
| `<p-code>` | Code block with file path header + syntax highlighting |
| `<p-badge>` | Colored status badge |
| `<p-tag>` | Monospace label |
| `<p-kv>` | Key-value pair list |
| `<p-divider>` | Section divider, optionally with a label |
| `<p-grid>` | Responsive 2/3/4 column layout |
| `<p-file-list>` | File impact map grouped by module |
| `<p-checklist>` + `<p-check-item>` | Test coverage checklist |
| `<p-tabs>` + `<p-tab>` | Section-level tab switcher for parallel comparisons |
| `<p-pages>` + `<p-page>` | Document-level multi-page — full page per tab, single HTML file |

Each component has its own `.md` doc file in `src/components/` — read the one you need.

Standard HTML (`<h1>`–`<h4>`, `<p>`, `<hr>`, `<table>`, `<code>`) is auto-styled inside the template.

## Syntax highlighting

Code blocks in `<p-code>` and `<p-source>` are automatically highlighted via highlight.js. Supported languages:

TypeScript, JavaScript, Rust, C, C++, Python, SQL, JSON, YAML, Bash, HTML/XML, CSS, Diff

Specify the language via `class="language-typescript"` on the `<code>` element, or let it auto-detect.

## Built-in features

These features work automatically in every Prism document — no extra markup needed:

- **Line numbers** — Code blocks show line numbers. `<p-source>` extracts the start line from the `path` prop (e.g. `path="auth.ts:42-48"` starts at line 42).
- **Copy button** — Hover a code block to reveal a copy icon in the top-right corner. Copies code without line numbers.
- **Table of contents** — A floating TOC button appears in the top-right corner. Click to see a list of all `<h2>` and `<h3>` headings with jump-to navigation.

## Customization

Prism separates **protocol** (what components exist and how agents use them) from **visual** (what they look like):

```
src/styles/
├── base.css              # Structural — layout, animation. Don't touch.
└── themes/
    └── notion.css        # Visual — colors, fonts, spacing. Replace this.
```

Three levels:

| Level | What to do | Rebuild? |
|-------|-----------|----------|
| **CSS variables** | Override `--p-*` variables in your template's `<style>` block | No |
| **New theme** | Write a new `themes/my-theme.css`, import it in `src/index.ts` instead of `notion.css` | Yes |
| **Custom components** | Edit or add Vue SFCs in `src/components/` | Yes |

Changing the theme does not change the SKILL.md prompt — agents write the same DSL regardless of visual style.

### Key CSS variables

```css
--p-bg, --p-bg-secondary, --p-surface         /* backgrounds */
--p-text, --p-text-secondary, --p-text-light   /* text colors */
--p-accent, --p-success, --p-warning, --p-danger, --p-purple  /* semantic colors */
--p-border, --p-divider                        /* borders */
--p-font-display, --p-font-body, --p-font-mono /* fonts */
--p-radius, --p-radius-lg                      /* corner radius */
```

Dark mode activates automatically via `prefers-color-scheme`. Force it with `PrismUI.setTheme('dark')`.

## Development

```bash
npm install
npm run build      # Build dist/prism.iife.js
npm run dev        # Watch mode — rebuild on file changes
```

## Project structure

```
prism/
├── SKILL.md                       # Agent entry point — component index + principle summary
├── references/
│   ├── principles.md              # Full design principles with examples
│   ├── showcase.html              # Every component demonstrated
│   └── example-vue.html           # Minimal working example
├── src/
│   ├── components/                # 31 Vue SFCs + 18 per-component .md docs
│   ├── styles/
│   │   ├── base.css               # Structural CSS
│   │   └── themes/notion.css      # Visual CSS (swappable)
│   ├── hljs.ts                    # Highlight.js setup (14 languages)
│   ├── index.ts                   # Component registration + mount API
│   └── build-html.ts              # Template → single HTML bundler
├── build.js                       # CLI: node build.js template.html output.html
├── dist/
│   └── prism.iife.js              # Built runtime (~303KB, ~102KB gzip)
├── package.json
├── vite.config.ts
└── README.md
```

## License

MIT
