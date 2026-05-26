import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PDecision from '../src/components/PDecision.vue'

describe('PDecision', () => {
  it('renders with status and verdict', () => {
    const wrapper = mount(PDecision, {
      props: { status: 'approved', verdict: '已采纳' },
      slots: { title: 'Use JWT', default: '<p>Rationale</p>' },
    })
    expect(wrapper.attributes('data-status')).toBe('approved')
    expect(wrapper.find('.prism-decision-verdict').text()).toBe('已采纳')
    expect(wrapper.find('.prism-decision-title').text()).toBe('Use JWT')
  })

  it('renders all status variants', () => {
    for (const status of ['approved', 'rejected', 'exploring', 'pending'] as const) {
      const wrapper = mount(PDecision, {
        props: { status, verdict: status },
        slots: { title: 'Test' },
      })
      expect(wrapper.attributes('data-status')).toBe(status)
    }
  })
})
