import { readdirSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const docAliases = {
  PBars: 'PBar',
  PMetrics: 'PMetric',
  PSteps: 'PStep',
  PCollapseGroup: 'PCollapse',
  PFlowNode: 'PFlow',
  PFlowArrow: 'PFlow',
  PTab: 'PTabs',
  PPage: 'PPages',
  PBranchItem: 'PBranch',
  PCheckItem: 'PChecklist',
  PEvidenceItem: 'PEvidence',
  PParam: 'PParams',
  PTrack: 'PTracks',
  PTag: 'PBadge',
}

let errors = 0
let warnings = 0

function error(msg) { errors++; console.error(`  ✗ ${msg}`) }
function warn(msg) { warnings++; console.warn(`  △ ${msg}`) }

// 1. Collect .vue files
const vueFiles = readdirSync(resolve(root, 'src/components'))
  .filter(f => f.endsWith('.vue'))
  .map(f => f.replace('.vue', ''))
  .sort()

console.log(`\n📦 Vue components: ${vueFiles.length}`)

// 2. Check index.ts registration
const indexTs = readFileSync(resolve(root, 'src/index.ts'), 'utf-8')

console.log('\n📋 Registration (index.ts)')
for (const name of vueFiles) {
  if (!indexTs.includes(`import ${name} from`)) {
    error(`${name} not imported in index.ts`)
  } else if (!new RegExp(`\\b${name}[,\\s]`).test(indexTs.split('const components')[1] || '')) {
    error(`${name} imported but not in components object`)
  }
}

// 3. Check .md docs
const mdFiles = readdirSync(resolve(root, 'src/components'))
  .filter(f => f.endsWith('.md'))
  .map(f => f.replace('.md', ''))

console.log('\n📄 Component docs (.md)')
for (const name of vueFiles) {
  const docName = docAliases[name] || name
  if (!mdFiles.includes(docName)) {
    error(`${name} has no docs (expected ${docName}.md)`)
  }
}

for (const md of mdFiles) {
  const hasVue = vueFiles.includes(md) || Object.values(docAliases).includes(md)
  if (!hasVue) {
    warn(`${md}.md exists but no matching component`)
  }
}

// 4. Check SKILL.md quick reference
const skillMd = readFileSync(resolve(root, 'SKILL.md'), 'utf-8')

console.log('\n📖 SKILL.md quick reference')

const skillRefNames = new Set()
const tagPattern = /<p-[\w-]+>/g
let m
while ((m = tagPattern.exec(skillMd)) !== null) {
  skillRefNames.add(m[0])
}

for (const name of vueFiles) {
  const tagName = '<p-' + name.slice(1).replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '') + '>'
  const aliasOf = docAliases[name]
  if (!skillRefNames.has(tagName) && !aliasOf) {
    warn(`${tagName} not found in SKILL.md component tables`)
  }
}

// Summary
console.log(`\n${'─'.repeat(40)}`)
if (errors === 0 && warnings === 0) {
  console.log('✅ All checks passed')
} else {
  console.log(`${errors} error(s), ${warnings} warning(s)`)
}

process.exit(errors > 0 ? 1 : 0)
