import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const args = process.argv.slice(2)
if (args.length < 1) {
  console.error('Usage: node build.js <template.html> [output.html]')
  process.exit(1)
}

const templatePath = resolve(args[0])
const outputPath = resolve(args[1] || 'index.html')

const template = readFileSync(templatePath, 'utf-8')

// Sanitize check
const violations = []
if (/<script[\s>]/i.test(template)) violations.push('<script> tag detected')
if (/\bon\w+\s*=/i.test(template)) violations.push('Inline event handler (onclick, onerror, etc.) detected')
if (/v-html/i.test(template)) violations.push('v-html directive detected — use v-text or template interpolation')
if (/javascript:/i.test(template)) violations.push('javascript: URL detected')
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

const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
