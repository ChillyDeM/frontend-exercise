<script setup lang="ts">
import CashBidsList from './components/CashBidsList.vue'
import Header from './components/Header.vue'
import { ref } from 'vue'

const companyData = ref({ name: '', logo: '' })
</script>

<template>
  <header>
    <Header :name="companyData.name" :logo="companyData.logo" />
  </header>

  <main>
    <div class="wrapper"><CashBidsList @companyData="(msg) => (companyData = msg)" /></div>
  </main>
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

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 124px) {
  header {
    place-items: center;
    top: 0;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
