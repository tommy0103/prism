import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PCollapse from '../src/components/PCollapse.vue'

describe('PCollapse', () => {
  it('renders title in summary', () => {
    const wrapper = mount(PCollapse, {
      props: { title: 'Details' },
      slots: { default: '<p>Content</p>' },
    })
    expect(wrapper.find('summary').text()).toBe('Details')
  })

  it('starts closed by default', () => {
    const wrapper = mount(PCollapse, {
      props: { title: 'Test' },
      slots: { default: 'Body' },
    })
    expect(wrapper.find('details').attributes('open')).toBeUndefined()
  })

  it('starts open when open prop is true', () => {
    const wrapper = mount(PCollapse, {
      props: { title: 'Test', open: true },
      slots: { default: 'Body' },
    })
    expect(wrapper.find('details').attributes('open')).toBeDefined()
  })

  it('applies borderless class', () => {
    const wrapper = mount(PCollapse, {
      props: { title: 'Test', borderless: true },
      slots: { default: 'Body' },
    })
    expect(wrapper.find('details').classes()).toContain('borderless')
  })
})
