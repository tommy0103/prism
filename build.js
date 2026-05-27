import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))

function hashContent(content) {
  return createHash('sha256').update(content).digest('hex').slice(0, 16)
}

const args = process.argv.slice(2)

// ── Verify mode ──
if (args[0] === '--verify') {
  if (!args[1]) {
    console.error('Usage: node build.js --verify <file.html>')
    process.exit(1)
  }
  const html = readFileSync(resolve(args[1]), 'utf-8')
  const runtimePath = resolve(__dirname, 'dist/prism.iife.js')
  const runtime = readFileSync(runtimePath, 'utf-8')
  const expectedHash = hashContent(runtime)

  const metaMatch = html.match(/name="generator"\s+content="Prism\s+v[\d.]+\s+(sha256-[a-f0-9]+)"/)
  if (!metaMatch) {
    console.error('✗ Not a Prism document (no generator meta tag found)')
    process.exit(1)
  }
  const embeddedHash = metaMatch[1].replace('sha256-', '')
  if (embeddedHash === expectedHash) {
    console.log(`✓ Prism runtime integrity verified (sha256-${expectedHash})`)
  } else {
    console.error(`✗ Hash mismatch`)
    console.error(`  embedded: sha256-${embeddedHash}`)
    console.error(`  expected: sha256-${expectedHash}`)
    process.exit(1)
  }
  process.exit(0)
}

// ── Build mode ──
if (args.length < 1) {
  console.error('Usage: node build.js <template.html> [output.html]')
  console.error('       node build.js --verify <file.html>')
  process.exit(1)
}

const templatePath = resolve(args[0])
const outputPath = resolve(args[1] || 'index.html')

const template = readFileSync(templatePath, 'utf-8')

// Sanitize check
const violations = []
if (/<script[\s>]/i.test(template)) violations.push('<script> tag detected')
if (/<base[\s>]/i.test(template)) violations.push('<base> tag detected — can hijack all relative links')
if (/\bon\w+\s*=/i.test(template)) violations.push('Inline event handler (onclick, onerror, etc.) detected')
if (/@\w+\s*=/i.test(template)) violations.push('Vue event binding (@click, @input, etc.) detected — interactivity is provided by built-in components')
if (/\bv-on\b/i.test(template)) violations.push('v-on directive detected — interactivity is provided by built-in components')
if (/v-html/i.test(template)) violations.push('v-html directive detected — use v-text or template interpolation')
if (/javascript\s*:/i.test(template)) violations.push('javascript: URL detected')
if (/&#\d+;|&#x[\da-f]+;/i.test(template) && /href\s*=/i.test(template)) {
  const hrefPattern = /href\s*=\s*["'][^"']*&#/i
  if (hrefPattern.test(template)) violations.push('HTML entity encoding in href detected — potential javascript: URL bypass')
}
if (/\beval\s*\(/i.test(template)) violations.push('eval() detected')
if (/\bFunction\s*\(/i.test(template)) violations.push('Function() constructor detected')

if (violations.length > 0) {
  console.error('Template security check failed:')
  violations.forEach(v => console.error(`  ✗ ${v}`))
  console.error('\nThese patterns are not allowed in Prism templates.')
  console.error('If you need interactivity, use <p-params> or <p-copy> components.')
  process.exit(1)
}

const runtimePath = resolve(__dirname, 'dist/prism.iife.js')
let runtime
try {
  runtime = readFileSync(runtimePath, 'utf-8')
} catch {
  console.error('Runtime not found at', runtimePath)
  console.error('Run "npm run build" first.')
  process.exit(1)
}

const langMatch = template.match(/<!--\s*lang:\s*(\S+)\s*-->/)
const lang = langMatch ? langMatch[1] : 'en'

const titleMatch = template.match(/<h1[^>]*>(.*?)<\/h1>/i)
const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '').trim() : 'Prism Document'

const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8'))
const runtimeHash = hashContent(runtime)

const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval'; style-src 'unsafe-inline';">
  <meta name="generator" content="Prism v${pkg.version} sha256-${runtimeHash}">
  <title>${title}</title>
</head>
<body>
  <div id="app" class="prism">
${template}
  </div>
  <script>${runtime}<\/script>
  <script>PrismUI.mount('#app')<\/script>
</body>
</html>`

writeFileSync(outputPath, html, 'utf-8')
console.log(`Built: ${outputPath} (${(Buffer.byteLength(html) / 1024).toFixed(0)}KB)`)
