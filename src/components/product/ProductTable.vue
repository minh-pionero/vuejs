<script setup lang="ts">
import type { PropType } from 'vue'

import ProductTableRow from '@/components/product/ProductTableRow.vue'
import type { ProductType } from '@/types/product.type'

defineProps({
  isLoading: {
    type: Boolean,
    required: true,
    default: false
  },
  products: {
    type: Array as PropType<ProductType[]>,
    required: true,
    default: () => []
  }
})
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
      <template v-if="isLoading">
        <tr>
          <td colspan="5">
            <div class="text-center my-16">
              <v-progress-circular :size="50" indeterminate></v-progress-circular>
            </div>
          </td>
        </tr>
      </template>
      <template v-else v-for="product in products" :key="product">
        <ProductTableRow :product="product" />
      </template>
    </tbody>
  </v-table>
</template>

<style scoped>
.z-index-1 {
  z-index: 1;
}
</style>
