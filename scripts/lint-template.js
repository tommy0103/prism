import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const args = process.argv.slice(2)
if (args.length < 1) {
  console.error('Usage: node scripts/lint-template.js <template.html>')
  process.exit(1)
}

const file = resolve(args[0])
const src = readFileSync(file, 'utf-8')

let errors = 0
let warnings = 0

function error(msg) { errors++; console.error(`  ✗ ${msg}`) }
function warn(msg) { warnings++; console.warn(`  △ ${msg}`) }

console.log(`\n🔍 Linting: ${file}\n`)

// --- Structure checks ---

// lang comment
if (!src.match(/<!--\s*lang:\s*\S+\s*-->/)) {
  warn('Missing <!-- lang: xx --> comment. Build will default to lang="en".')
}

// h1
const h1s = src.match(/<h1[\s>]/g)
if (!h1s) {
  error('No <h1> found. Document needs a title.')
} else if (h1s.length > 1) {
  warn(`Multiple <h1> tags (${h1s.length}). A document should have exactly one.`)
}

// --- Ref/Source pairing ---

const refs = []
const refPattern = /<p-ref[^>]+to="([^"]+)"/g
let m
while ((m = refPattern.exec(src)) !== null) {
  refs.push(m[1])
}

const sourceIds = new Set()
const sourceIdPattern = /(?:<p-source|<p-collapse)[^>]+id="([^"]+)"/g
while ((m = sourceIdPattern.exec(src)) !== null) {
  sourceIds.add(m[1])
}

for (const refTo of refs) {
  if (!sourceIds.has(refTo)) {
    error(`<p-ref to="${refTo}"> has no matching <p-source id="${refTo}"> or <p-collapse id="${refTo}">`)
  }
}

for (const id of sourceIds) {
  if (!refs.includes(id)) {
    warn(`<p-source id="${id}"> exists but no <p-ref> links to it. Consider adding a ref or removing the id.`)
  }
}

// --- Component budget ---

const heavyTags = [
  'p-decision', 'p-flow', 'p-branch', 'p-compare', 'p-contrast',
  'p-analogy', 'p-myth', 'p-steps', 'p-stacked-bar', 'p-tracks',
]

// Rough approach: count heavy tags NOT inside <p-collapse>
// Split by <p-collapse and </p-collapse to identify top-level vs collapsed
const collapsePattern = /<p-collapse[\s>][\s\S]*?<\/p-collapse>/g
const collapsedContent = (src.match(collapsePattern) || []).join(' ')
const topLevelContent = src.replace(collapsePattern, '')

let heavyCount = 0
for (const tag of heavyTags) {
  const re = new RegExp(`<${tag}[\\s>]`, 'g')
  const matches = topLevelContent.match(re)
  if (matches) heavyCount += matches.length
}

const h2Count = (topLevelContent.match(/<h2[\s>]/g) || []).length
const budget = Math.ceil(h2Count * 1.5)

if (h2Count > 0 && heavyCount > budget) {
  warn(`Component budget exceeded: ${heavyCount} heavy components visible, ${h2Count} <h2> sections (budget: ${budget}). Consider moving some into <p-collapse>.`)
}

// --- Markdown syntax detection ---

const mdPatterns = [
  { re: /^```/m, msg: 'Markdown code fence (```) detected. Use <p-code> or <pre><code> instead.' },
  { re: /^#{1,6}\s/m, msg: 'Markdown heading (## ...) detected. Use <h2>, <h3> etc.' },
  { re: /^\*\*[^*]+\*\*/m, msg: 'Markdown bold (**text**) detected. Use <strong> instead.' },
  { re: /^- /m, msg: 'Markdown bullet list (- item) detected. Use <ul><li> instead.' },
]

for (const { re, msg } of mdPatterns) {
  // Skip detection inside <pre><code> blocks
  const withoutCode = src.replace(/<pre><code[\s\S]*?<\/code><\/pre>/g, '')
  if (re.test(withoutCode)) {
    error(msg)
  }
}

// --- Quote conflicts in bindings ---

const bindingPattern = /:(items|segments|legend|groups)="([^"]*)"/g
while ((m = bindingPattern.exec(src)) !== null) {
  const val = m[2]
  if (val.includes('“') || val.includes('”')) {
    error(`Chinese quotes “” inside :${m[1]} binding will break the template compiler. Use single quotes or 「」.`)
  }
}

// --- Decision without verdict ---

const decisionPattern = /<p-decision(?![^>]*verdict=)[^>]*>/g
while ((m = decisionPattern.exec(src)) !== null) {
  warn('Found <p-decision> without verdict prop. Every decision should have a visible verdict.')
}

// --- Empty collapse ---

const emptyCollapsePattern = /<p-collapse[^>]*>\s*<summary>[^<]*<\/summary>\s*<div class="prism-collapse-body"><div class="prism-collapse-inner">\s*<\/div><\/div>\s*<\/p-collapse>/g
// For Vue template syntax, check simpler pattern
const vueEmptyCollapse = /<p-collapse[^>]*>[\s\n]*<\/p-collapse>/g
while ((m = vueEmptyCollapse.exec(src)) !== null) {
  warn('Empty <p-collapse> — collapse blocks should contain meaningful content.')
}

// --- Consecutive heavy components without prose ---

const heavyExact = new Set(heavyTags.map(t => `<${t}`))
const heavyClose = new Set(heavyTags.map(t => `</${t}`))
const topLines = topLevelContent.split('\n')
let prevHeavyIdx = -10
for (let i = 0; i < topLines.length; i++) {
  const line = topLines[i].trim()
  let isHeavyOpen = false
  for (const tag of heavyTags) {
    const open = `<${tag}`
    if (line.startsWith(open) && (line[open.length] === ' ' || line[open.length] === '>' || line[open.length] === '\n' || line[open.length] === undefined)) {
      // Exclude sub-components: p-flow-node, p-flow-arrow, p-branch-item, etc.
      const afterTag = line.slice(open.length)
      if (afterTag.length === 0 || afterTag[0] === ' ' || afterTag[0] === '>') {
        isHeavyOpen = true
        break
      }
    }
  }
  if (isHeavyOpen) {
    if (i - prevHeavyIdx <= 3) {
      let hasProse = false
      for (let j = prevHeavyIdx + 1; j < i; j++) {
        const between = topLines[j].trim()
        if (between.startsWith('<p>') || between.startsWith('<p ') ||
            (between.length > 10 && !between.startsWith('<') && !between.startsWith('>'))) {
          hasProse = true
          break
        }
      }
      if (!hasProse) {
        warn(`Consecutive heavy components near lines ${prevHeavyIdx + 1} and ${i + 1} without bridging prose.`)
      }
    }
    prevHeavyIdx = i
  }
}

// --- Source path vs code line count mismatch ---

const sourceBlockPattern = /<p-source[^>]*path="([^"]*)"[^>]*>[\s\S]*?<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>[\s\S]*?<\/p-source>/g
while ((m = sourceBlockPattern.exec(src)) !== null) {
  const path = m[1]
  const code = m[2]
  const rangeMatch = path.match(/:(\d+)-(\d+)/)
  if (rangeMatch) {
    const declaredLines = parseInt(rangeMatch[2]) - parseInt(rangeMatch[1]) + 1
    const actualLines = code.split('\n').filter(l => l.trim() !== '').length
    if (actualLines < declaredLines * 0.5) {
      warn(`<p-source path="${path}"> declares ${declaredLines} lines but code block has ~${actualLines} lines. Show the full range or adjust the path.`)
    }
  }
}

// --- Summary ---

console.log(`\n${'─'.repeat(40)}`)
if (errors === 0 && warnings === 0) {
  console.log('✅ No issues found')
} else {
  console.log(`${errors} error(s), ${warnings} warning(s)`)
}

process.exit(errors > 0 ? 1 : 0)
