import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PCallout from '../src/components/PCallout.vue'

describe('PCallout', () => {
  it('renders with type and icon', () => {
    const wrapper = mount(PCallout, {
      props: { type: 'warning', icon: '⚠' },
      slots: { default: '<p>Warning message</p>' },
    })
    expect(wrapper.classes()).toContain('warning')
    expect(wrapper.find('.prism-callout-icon').text()).toBe('⚠')
    expect(wrapper.find('.prism-callout-content').text()).toContain('Warning message')
  })

  it('renders without icon', () => {
    const wrapper = mount(PCallout, {
      props: { type: 'info' },
      slots: { default: 'Info' },
    })
    expect(wrapper.find('.prism-callout-icon').exists()).toBe(false)
  })

  it('renders all type variants', () => {
    for (const type of ['info', 'success', 'warning', 'danger', 'purple'] as const) {
      const wrapper = mount(PCallout, {
        props: { type },
        slots: { default: 'Test' },
      })
      expect(wrapper.classes()).toContain(type)
    }
  })
})
