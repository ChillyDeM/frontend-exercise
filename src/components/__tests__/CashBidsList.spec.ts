import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CashBidsList from '../CashBidsList.vue'
import type { CashBidEdge } from '@/classes/GetCashBidsForCompanyResult'

describe('CashBidsList', () => {
  it('displays cash bids when data is loaded', () => {
    const cashBidList: CashBidEdge[] = [
      {
        node: {
          commodity: { id: '1', name: 'Wheat' },
          location: { id: '1', name: 'Location1' },
          price: 100,
          basis: 10,
          deliveryEnd: '2025-12-31',
          deliveryStart: '2025-01-01',
          futuresMonth: 'Jan',
          futuresSymbol: 'WHEAT',
          quote: { lastPrice: 110, priceChange: 5 },
        },
      },
    ]

    const wrapper = mount(CashBidsList, {
      props: {
        cashBidList,
      },
      data() {
        return {
          loading: false,
          error: null,
        }
      },
    })

    expect(wrapper.find('h3').text()).toContain('Wheat')
    expect(wrapper.find('h2').text()).toContain('Location1')
    expect(wrapper.find('tbody').text()).toContain('100')
    expect(wrapper.find('tbody').text()).toContain('10')
    expect(wrapper.find('tbody').text()).toContain('110')
    expect(wrapper.find('tbody').text()).toContain('5')
    expect(wrapper.find('tbody').text()).toContain('Jan')
    expect(wrapper.find('tbody').text()).toContain('2025-01-01')
    expect(wrapper.find('tbody').text()).toContain('2025-12-31')
  })

  it('filters cash bids by selected commodities and locations', async () => {
    const cashBidList: CashBidEdge[] = [
      {
        node: {
          commodity: { id: '1', name: 'Wheat' },
          location: { id: '1', name: 'Location1' },
          price: 100,
          basis: 10,
          deliveryEnd: '2025-12-31',
          deliveryStart: '2025-01-01',
          futuresMonth: 'Jan',
          futuresSymbol: 'WHEAT',
          quote: { lastPrice: 110, priceChange: 5 },
        },
      },
      {
        node: {
          commodity: { id: '2', name: 'Corn' },
          location: { id: '2', name: 'Location2' },
          price: 200,
          basis: 20,
          deliveryEnd: '2025-12-31',
          deliveryStart: '2025-01-01',
          futuresMonth: 'Feb',
          futuresSymbol: 'CORN',
          quote: { lastPrice: 210, priceChange: 10 },
        },
      },
    ]

    const wrapper = mount(CashBidsList, {
      props: {
        cashBidList,
      },
      data() {
        return {
          loading: false,
          error: null,
        }
      },
    })

    // Initially, both commodities and locations should be displayed
    expect(wrapper.findAll('h3').length).toBe(2)
    expect(wrapper.findAll('h3')[0].text()).toContain('Wheat')
    expect(wrapper.findAll('h3')[1].text()).toContain('Corn')
    expect(wrapper.findAll('h2').length).toBe(2)
    expect(wrapper.findAll('h2')[0].text()).toContain('Location1')
    expect(wrapper.findAll('h2')[1].text()).toContain('Location2')

    // Select the "Wheat" commodity
    await wrapper.find('input[value="Wheat"]').setValue(true)

    console.log(wrapper.find('h3').text())

    // Only "Wheat" in "Location1" should be displayed
    expect(wrapper.findAll('h3').length).toBe(1)
    expect(wrapper.find('h3').text()).toContain('Wheat')

    expect(wrapper.findAll('h2').length).toBe(1)
    expect(wrapper.find('h2').text()).toContain('Location1')

    // Deselect the "Wheat" commodity
    await wrapper.find('input[value="Wheat"]').setValue(false)

    // Select the "Location1" location
    await wrapper.find('input[value="Location1"]').setValue(true)

    // Only "Wheat" in "Location1" should be displayed
    expect(wrapper.findAll('h3').length).toBe(1)
    expect(wrapper.find('h3').text()).toContain('Wheat')

    expect(wrapper.findAll('h2').length).toBe(1)
    expect(wrapper.find('h2').text()).toContain('Location1')

    // Select the "Corn" commoditiy and "Location2" location
    await wrapper.find('input[value="Corn"]').setValue(true)
    await wrapper.find('input[value="Location2"]').setValue(true)

    // Only "Corn" commodity and "Location2" location should be displayed
    expect(wrapper.findAll('h3').length).toBe(1)
    expect(wrapper.find('h3').text()).toContain('Corn')

    expect(wrapper.findAll('h2').length).toBe(1)
    expect(wrapper.find('h2').text()).toContain('Location2')
  })
})
