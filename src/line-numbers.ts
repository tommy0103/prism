export function parseLineRange(path: string): number {
  const match = path.match(/:(\d+)(?:-\d+)?(?:\s|$)/)
  return match ? parseInt(match[1], 10) : 1
}

export function addLineNumbers(container: HTMLElement, startLine?: number) {
  container.querySelectorAll('pre code').forEach(codeEl => {
    if (codeEl.classList.contains('prism-has-lines')) return

    const code = codeEl as HTMLElement
    const html = code.innerHTML
    const lines = html.split('\n')

    if (lines[lines.length - 1].trim() === '') lines.pop()

    const start = startLine ?? 1
    code.classList.add('prism-has-lines')

    code.innerHTML = lines
      .map((line, i) =>
        `<span class="prism-line" data-line="${start + i}">${line || ' '}</span>`
      )
      .join('')
  })
}
