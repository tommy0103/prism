export function createToc(container: HTMLElement) {
  const headings = container.querySelectorAll('h2, h3')
  if (headings.length < 3) return

  const wrapper = document.createElement('div')
  wrapper.className = 'prism-toc'

  const toggle = document.createElement('button')
  toggle.className = 'prism-toc-toggle'
  toggle.innerHTML = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M3 4.5h12M3 9h8M3 13.5h10"/></svg>`
  toggle.title = 'Table of Contents'

  const panel = document.createElement('nav')
  panel.className = 'prism-toc-panel'

  const list = document.createElement('ul')

  headings.forEach((heading, i) => {
    const id = heading.id || `heading-${i}`
    heading.id = id

    const li = document.createElement('li')
    if (heading.tagName === 'H3') li.className = 'prism-toc-sub'

    const a = document.createElement('a')
    a.href = `#${id}`
    a.textContent = heading.textContent || ''
    a.addEventListener('click', (ev) => {
      ev.preventDefault()
      heading.scrollIntoView({ behavior: 'smooth', block: 'start' })
      wrapper.classList.remove('prism-toc-open')
    })

    li.appendChild(a)
    list.appendChild(li)
  })

  panel.appendChild(list)
  wrapper.appendChild(toggle)
  wrapper.appendChild(panel)
  document.body.appendChild(wrapper)

  toggle.addEventListener('click', () => {
    wrapper.classList.toggle('prism-toc-open')
  })

  document.addEventListener('click', (ev) => {
    if (!wrapper.contains(ev.target as Node)) {
      wrapper.classList.remove('prism-toc-open')
    }
  })
}
