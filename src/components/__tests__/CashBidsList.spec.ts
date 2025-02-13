import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CashBidsList from '../CashBidsList.vue'

describe('CashBidsList', () => {
  it('displays loading text when data is being fetched', () => {
    const wrapper = mount(CashBidsList, {
      data() {
        return {
          loading: true,
        }
      },
    })
    expect(wrapper.text()).toContain('Loading...')
  })
})
