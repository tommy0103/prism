import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PMyth from '../src/components/PMyth.vue'

describe('PMyth', () => {
  it('renders myth and truth slots', () => {
    const wrapper = mount(PMyth, {
      slots: {
        myth: 'Wrong assumption',
        truth: 'Actually correct',
      },
    })
    expect(wrapper.find('.prism-myth-myth .content').text()).toBe('Wrong assumption')
    expect(wrapper.find('.prism-myth-truth .content').text()).toBe('Actually correct')
  })

  it('has two icon containers', () => {
    const wrapper = mount(PMyth, {
      slots: { myth: 'A', truth: 'B' },
    })
    expect(wrapper.findAll('.picon-wrap')).toHaveLength(2)
  })
})
