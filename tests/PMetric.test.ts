import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PMetric from '../src/components/PMetric.vue'

describe('PMetric', () => {
  it('renders value and label', () => {
    const wrapper = mount(PMetric, {
      props: { value: '47', label: 'Files' },
    })
    expect(wrapper.find('.prism-metric-value').text()).toBe('47')
    expect(wrapper.find('.prism-metric-label').text()).toBe('Files')
  })

  it('renders delta with direction', () => {
    const wrapper = mount(PMetric, {
      props: { value: '89%', label: 'Coverage', delta: '+12%', deltaDir: 'up' },
    })
    const delta = wrapper.find('.prism-metric-delta')
    expect(delta.exists()).toBe(true)
    expect(delta.text()).toBe('+12%')
    expect(delta.classes()).toContain('up')
  })

  it('hides delta when not provided', () => {
    const wrapper = mount(PMetric, {
      props: { value: '10', label: 'Count' },
    })
    expect(wrapper.find('.prism-metric-delta').exists()).toBe(false)
  })
})
