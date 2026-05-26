import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PSource from '../src/components/PSource.vue'

describe('PSource', () => {
  it('renders path and lang', () => {
    const wrapper = mount(PSource, {
      props: { path: 'src/auth.ts:42-48', lang: 'TypeScript', id: 'src-auth' },
      slots: { default: '<pre><code>code here</code></pre>' },
    })
    expect(wrapper.find('.prism-source-path').text()).toBe('src/auth.ts:42-48')
    expect(wrapper.find('.prism-source-lang').text()).toBe('TypeScript')
    expect(wrapper.attributes('id')).toBe('src-auth')
  })

  it('starts collapsed', () => {
    const wrapper = mount(PSource, {
      props: { path: 'test.ts:1' },
      slots: { default: '<pre><code>x</code></pre>' },
    })
    expect(wrapper.find('details').attributes('open')).toBeUndefined()
  })

  it('hides lang badge when not provided', () => {
    const wrapper = mount(PSource, {
      props: { path: 'test.ts' },
      slots: { default: '<pre><code>x</code></pre>' },
    })
    expect(wrapper.find('.prism-source-lang').exists()).toBe(false)
  })
})
