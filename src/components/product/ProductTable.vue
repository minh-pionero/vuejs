<script setup lang="ts">
import ProductTableRow from '@/components/product/ProductTableRow.vue'

const products = [1, 2, 3, 4, 5]
</script>

<template>
  <v-table class="border" fixed-header :height="700" hover>
    <thead class="bg-grey-lighten-4 z-index-1">
      <tr>
        <th class="text-left">Category</th>
        <th class="text-left">Thumbnail</th>
        <th class="text-left">Name</th>
        <th class="text-left">Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="product in products" :key="product">
        <ProductTableRow />
      </template>
    </tbody>
    <template></template>
  </v-table>
</template>

<style scoped>
.z-index-1 {
  z-index: 1;
}
</style>
