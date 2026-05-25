const COPY_SVG = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5.5" y="5.5" width="8" height="8" rx="1.5"/><path d="M10.5 5.5V3.5C10.5 2.67 9.83 2 9 2H3.5C2.67 2 2 2.67 2 3.5V9C2 9.83 2.67 10.5 3.5 10.5H5.5"/></svg>`
const CHECK_SVG = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 8.5L6.5 11.5L12.5 4.5"/></svg>`

export function addCopyButton(container: HTMLElement) {
  container.querySelectorAll('pre').forEach(pre => {
    if (pre.querySelector('.prism-copy-btn')) return

    const btn = document.createElement('button')
    btn.className = 'prism-copy-btn'
    btn.innerHTML = COPY_SVG
    btn.title = 'Copy'
    btn.addEventListener('click', () => {
      const code = pre.querySelector('code')
      if (!code) return

      const clone = code.cloneNode(true) as HTMLElement
      clone.querySelectorAll('.prism-line::before, .prism-line-numbers').forEach(el => el.remove())
      const text = clone.textContent || ''

      navigator.clipboard.writeText(text.trim()).then(() => {
        btn.innerHTML = CHECK_SVG
        setTimeout(() => { btn.innerHTML = COPY_SVG }, 1500)
      })
    })

    pre.style.position = 'relative'
    pre.appendChild(btn)
  })
}
