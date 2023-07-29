<script setup lang="ts">
import { ref } from 'vue'
import ProductTable from '@/components/product/ProductTable.vue'
import ProductEditDialog from '@/components/product/ProductEditDialog.vue'

const isOpenCreateProductDialog = ref(false)
const page = ref(1)
</script>

<template>
  <div class="d-flex justify-space-between mb-3">
    <div class="text-h5">Products</div>
    <v-btn
      @click="
        () => {
          isOpenCreateProductDialog = true
        }
      "
      >Create product</v-btn
    >
  </div>
  <ProductTable />
  <div class="d-flex justify-end mt-2">
    <VPagination v-model="page" :length="15" :total-visible="7" size="40"/>
  </div>

  <ProductEditDialog
    :is-open-dialog="isOpenCreateProductDialog"
    :on-close-dialog="
      () => {
        isOpenCreateProductDialog = false
      }
    "
  />
</template>
