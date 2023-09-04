<script setup lang="ts">
import { ref } from 'vue'
import ProductTable from '@/components/product/ProductTable.vue'
import ProductEditDialog from '@/components/product/ProductEditDialog.vue'
import { getProductsApi } from '@/services/product.service'
import type { ResponseProductType } from '@/types/product.type'
import { useQuery } from '@tanstack/vue-query'

const isLoading = ref<boolean>(false)
const isOpenCreateProductDialog = ref(false)
const page = ref(1)

const { data: products } = useQuery<ResponseProductType>({
  queryKey: ['getProducts', page.value],
  queryFn: async () => {
    return await getProductsApi(page.value ?? 0)
  }
})
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
  <ProductTable :products="products?.data ?? []" :is-loading="isLoading" />
  <div class="d-flex justify-end mt-2" v-if="products?.meta.last_page">
    <VPagination v-model="page" :length="products?.meta.last_page" :total-visible="7" :size="40" />
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
