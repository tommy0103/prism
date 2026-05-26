import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PBadge from '../src/components/PBadge.vue'
import PTag from '../src/components/PTag.vue'

describe('PBadge', () => {
  it('renders with color', () => {
    const wrapper = mount(PBadge, {
      props: { color: 'success' },
      slots: { default: 'Stable' },
    })
    expect(wrapper.classes()).toContain('success')
    expect(wrapper.text()).toBe('Stable')
  })

  it('renders without color', () => {
    const wrapper = mount(PBadge, {
      slots: { default: 'Default' },
    })
    expect(wrapper.classes()).toEqual(['prism-badge'])
  })
})

describe('PTag', () => {
  it('renders text', () => {
    const wrapper = mount(PTag, {
      slots: { default: 'v2.1.0' },
    })
    expect(wrapper.text()).toBe('v2.1.0')
    expect(wrapper.classes()).toContain('prism-tag')
  })
})
