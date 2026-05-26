import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PContrast from '../src/components/PContrast.vue'

describe('PContrast', () => {
  it('renders word and description', () => {
    const wrapper = mount(PContrast, {
      props: { word: 'WAL', desc: '含义不同' },
      slots: {
        left: '<div class="context">DB</div><div class="meaning">redo log</div>',
        right: '<div class="context">App</div><div class="meaning">操作日志</div>',
      },
    })
    expect(wrapper.find('.word').text()).toBe('WAL')
    expect(wrapper.find('.tail').text()).toBe('含义不同')
    expect(wrapper.findAll('.prism-contrast-col')).toHaveLength(2)
  })
})
