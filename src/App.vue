<script setup lang="ts">
import CashBidsList from './components/CashBidsList.vue'
import Header from './components/AppHeader.vue'
import { computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { provideApolloClient } from '@vue/apollo-composable'
import { apolloClient } from './clients/apollo-client'
import { GetCashBidsForCompany } from '@/queries/GetCashsForCompany'
import type { Result, Company, CashBidEdge } from './classes/GetCashBidsForCompanyResult'

provideApolloClient(apolloClient)

const { result, loading, error } = useQuery<Result>(GetCashBidsForCompany)

const cashBidList = computed<CashBidEdge[]>(
  () => result.value?.viewer?.company?.cashBids?.edges ?? [],
)

const companyData = computed<Company>(() => {
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
.wrapper {
  padding: 20px;
}
</style>
