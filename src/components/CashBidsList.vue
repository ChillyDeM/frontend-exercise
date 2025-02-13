<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

import { provideApolloClient } from '@vue/apollo-composable'
import { apolloClient } from '../clients/apollo-client'

provideApolloClient(apolloClient)

const GET_CASHBIDS_FOR_COMPANY = gql`
  query CashBidsForCompany {
    viewer {
      ... on Employee {
        company {
          name
          logo
          cashBids {
            edges {
              node {
                commodity {
                  id
                  name
                }
                location {
                  id
                  name
                }
                price
                basis
                deliveryEnd
                deliveryStart
                futuresMonth
                futuresSymbol
                quote {
                  lastPrice
                  priceChange
                }
              }
            }
          }
        }
      }
    }
  }
`

const { result, loading, error } = useQuery(GET_CASHBIDS_FOR_COMPANY)

const cashBidList = computed(() => result.value?.viewer?.company?.cashBids?.edges ?? [])

const commodities = computed(() => {
  const allCommodities = cashBidList.value.map((bid) => bid.node.commodity.name)
  return [...new Set(allCommodities)]
})

const locations = computed(() => {
  const allLocations = cashBidList.value.map((bid) => bid.node.location.name)
  return [...new Set(allLocations)]
})

const selectedCommodities = ref([])
const selectedLocations = ref([])

const filteredCashBids = computed(() => {
  return cashBidList.value.filter((bid) => {
    return (
      (selectedCommodities.value.length === 0 ||
        selectedCommodities.value.includes(bid.node.commodity.name)) &&
      (selectedLocations.value.length === 0 ||
        selectedLocations.value.includes(bid.node.location.name))
    )
  })
})

const groupedCashBids = computed(() => {
  const grouped = {}
  filteredCashBids.value.forEach((bid) => {
    const location = bid.node.location.name
    const commodity = bid.node.commodity.name
    if (!grouped[location]) {
      grouped[location] = {}
    }
    if (!grouped[location][commodity]) {
      grouped[location][commodity] = []
    }
    grouped[location][commodity].push(bid)
  })
  return grouped
})

const dropdownOpen = ref({
  commodity: false,
  location: false,
})

function toggleDropdown(type: string) {
  dropdownOpen.value[type] = !dropdownOpen.value[type]
  console.log(selectedCommodities)
}

function toggleDropdownIfOpen(type) {
  if (dropdownOpen.value[type]) {
    toggleDropdown(type)
  }
}

const companyName = computed(() => result.value?.viewer?.company?.name ?? '')
const companyLogo = computed(() => result.value?.viewer?.company?.logo ?? '')

const emit = defineEmits(['companyData'])

emit('companyData', { name: companyName, logo: companyLogo })
</script>

<template>
  <div v-if="loading" class="center">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else>
    <div class="dropdown">
      <button class="dropbtn" @click="toggleDropdown('commodity')">Filter by Commodities</button>
      <div
        class="dropdown-container"
        v-show="dropdownOpen.commodity"
        @mouseleave="toggleDropdownIfOpen('commodity')"
      >
        <div v-for="commodity in commodities" :key="commodity">
          <input type="checkbox" :id="commodity" :value="commodity" v-model="selectedCommodities" />
          <label class="checkbox-label" :for="commodity">{{ commodity }}</label>
        </div>
      </div>
    </div>

    <div class="dropdown">
      <button class="dropbtn" @click="toggleDropdown('location')">Filter by Location</button>
      <div
        class="dropdown-container"
        v-show="dropdownOpen.location"
        @mouseleave="toggleDropdownIfOpen('location')"
      >
        <div v-for="location in locations" :key="location">
          <input type="checkbox" :id="location" :value="location" v-model="selectedLocations" />
          <label :for="location">{{ location }}</label>
        </div>
      </div>
    </div>
  </div>

  <div v-for="(commodities, location) in groupedCashBids" :key="location">
    <h2>{{ location }}</h2>
    <div v-for="(bids, commodity) in commodities" :key="commodity">
      <h3>{{ commodity }}</h3>
      <table>
        <thead>
          <tr>
            <th>Bid Symbol</th>
            <th>Price</th>
            <th>Basis</th>
            <th>Futures Price</th>
            <th>Change</th>
            <th>Futures Month</th>
            <th>Delivery Start</th>
            <th>Delivery End</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="bid in bids" :key="bid.node.commodity.id">
            <td>{{ bid.node.futuresSymbol }}</td>
            <td>{{ bid.node.price }}</td>
            <td>{{ bid.node.basis / 100 }}</td>
            <td>{{ bid.node.quote.lastPrice }}</td>
            <td
              :class="{
                'positive-change': bid.node.quote.priceChange > 0,
                'negative-change': bid.node.quote.priceChange < 0,
                'no-change': bid.node.quote.priceChange === 0,
              }"
            >
              {{ bid.node.quote.priceChange }}
            </td>
            <td>{{ bid.node.futuresMonth }}</td>
            <td>{{ bid.node.deliveryStart }}</td>
            <td>{{ bid.node.deliveryEnd }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.dropdown label {
  margin-left: 5px;
}

.dropdown {
  display: inline-block;
  position: relative;
  float: right;
  padding: 5px;
}

.dropbtn {
  background-color: #f2f2f2;
  color: black;
  padding: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.dropdown-container {
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-container-closed {
  display: none;
}

.dropdown-container-closed {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-container div {
  padding: 12px 16px;
}

.dropdown-container div:hover {
  background-color: #f1f1f1;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  color: #000000;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:hover {
  background-color: #f1f1f1;
}

.positive-change {
  background-color: rgba(21, 87, 36, 0.4);
}

.negative-change {
  background-color: rgba(114, 28, 36, 0.4);
}

.no-change {
  background-color: #ffffff;
}

.center {
  text-align: center;
}
</style>
