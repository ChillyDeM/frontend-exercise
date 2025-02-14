<script setup lang="ts">
import CashBidsList from './components/CashBidsList.vue'
import Header from './components/AppHeader.vue'
import { computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { provideApolloClient } from '@vue/apollo-composable'
import { apolloClient } from './clients/apollo-client'
import { GetCashBidsFromCompany } from '@/queries/GetCashsForCompany'

provideApolloClient(apolloClient)

const { result, loading, error } = useQuery(GetCashBidsFromCompany)

const cashBidList = computed(() => result.value?.viewer?.company?.cashBids?.edges ?? [])
const companyData = computed(() => {
  return {
    name: result.value?.viewer?.company?.name ?? '',
    logo: result.value?.viewer?.company?.logo ?? '',
  }
})
</script>

<template>
  <div v-if="loading" class="center">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else>
    <header>
      <Header :name="companyData.name" :logo="companyData.logo" />
    </header>

    <main>
      <div class="wrapper">
        <CashBidsList :cashBidList="cashBidList" />
      </div>
    </main>
  </div>
</template>

<style scoped>
header {
  top: 0;
  width: 100%;
  z-index: 1000;
}

.wrapper {
  padding: 20px;
}

@media (min-width: 124px) {
  header {
    place-items: center;
    top: 0;
  }
}

@media (max-width: 500px) {
  #app {
    padding: 0;
  }
}
</style>
