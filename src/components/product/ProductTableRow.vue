<script setup lang="ts">
import type { ProductType } from '@/types/product.type'
import type { PropType } from 'vue'
defineProps({
  product: {
    type: Object as PropType<ProductType>,
    required: true
  }
})
</script>

<template>
  <tr>
    <td>{{ product.categoryId }}</td>
    <td>
      <div class="py-2">
        <VImg :src="product.thumbnail" width="150" />
      </div>
    </td>
    <td>{{ product.name }}</td>
    <td>{{ product.price }}</td>
    <td>
      <div class="d-flex">
        <VBtn color="orange" class="mr-2"><VIcon icon="mdi-square-edit-outline" /></VBtn>
        <VBtn color="red"><VIcon icon="mdi-trash-can-outline" /> </VBtn>
      </div>
    </td>
  </tr>
</template>
