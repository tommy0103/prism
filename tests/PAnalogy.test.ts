import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PAnalogy from '../src/components/PAnalogy.vue'

describe('PAnalogy', () => {
  it('renders source and target', () => {
    const wrapper = mount(PAnalogy, {
      props: {
        source: '搬家清单',
        sourceDesc: '先列清单',
        target: 'WAL',
        targetDesc: '先写日志',
        because: '都是先记录再执行',
      },
    })
    expect(wrapper.findAll('.prism-analogy-side')).toHaveLength(2)
    expect(wrapper.find('.prism-analogy-bridge').text()).toBe('≈')
    expect(wrapper.find('.prism-analogy-because').text()).toContain('都是先记录再执行')
  })

  it('hides because when not provided', () => {
    const wrapper = mount(PAnalogy, {
      props: { source: 'A', target: 'B' },
    })
    expect(wrapper.find('.prism-analogy-because').exists()).toBe(false)
  })
})
