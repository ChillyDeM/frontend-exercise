<script setup lang="ts" name="AppHeader">
defineProps({
  name: String,
  logo: String,
})
</script>

<template>
  <div class="item" v-show="name">
    <i>
      <img :src="logo" alt="Company Logo" />
    </i>
    <div class="title">
      <h3>{{ name }} Cash Bids</h3>
    </div>
  </div>
</template>

<style scoped>
h3 {
  font-size: 1.6rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

.item {
  display: flex;
  align-items: center;
  width: 100%;
}

i {
  margin-left: 10px;
}

i img {
  max-width: 150px;
  max-height: 150px;
  object-fit: contain;
  border-radius: 8px;
}

.title {
  flex-grow: 1;
  margin-left: 50px;
}

@media (min-width: 1024px) {
  .item {
    margin-top: 10px;
    padding: 10px;
  }

  i {
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
  }
}
</style>
