<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ProductTable from '@/components/product/ProductTable.vue'
import ProductEditDialog from '@/components/product/ProductEditDialog.vue'
import { getProductsApi } from '@/services/product.service'
import type { ResponseProductType } from '@/types/product.type'
import { watch } from 'vue'

const isLoading = ref<boolean>(false)
const isOpenCreateProductDialog = ref(false)
const page = ref(1)
const responseProducts = ref<ResponseProductType>()

const getProducts = async (page?: number) => {
  try {
    isLoading.value = true
    const res = await getProductsApi(page ?? 0)
    responseProducts.value = res
  } catch (e) {
    //
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getProducts()
})

watch(page, (val) => {
  getProducts(val)
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
  <ProductTable :products="responseProducts?.data ?? []" :is-loading="isLoading" />
  <div class="d-flex justify-end mt-2" v-if="responseProducts?.meta.last_page">
    <VPagination
      v-model="page"
      :length="responseProducts?.meta.last_page"
      :total-visible="7"
      :size="40"
    />
  </div>

  <ProductEditDialog
    :is-open-dialog="isOpenCreateProductDialog"
    :on-close-dialog="
      () => {
        isOpenCreateProductDialog = false
      }
    "
    :on-refresh-products="getProducts"
  />
</template>
