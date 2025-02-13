import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AppHeader from '../AppHeader.vue'

describe('Header', () => {
  it('renders Cash Bids header with company name', () => {
    const wrapper = mount(AppHeader, { props: { name: 'Test Company' } })
    expect(wrapper.text()).toContain('Test Company Cash Bids')
  })

  it('renders company logo', () => {
    const wrapper = mount(AppHeader, { props: { name: 'Test Company', logo: 'test-logo.png' } })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('test-logo.png')
  })

  it('does not display header until a name is present', () => {
    const wrapper = mount(AppHeader, { props: { name: '' } })
    expect(wrapper.find('.item').isVisible()).toBe(false)
  })
})
