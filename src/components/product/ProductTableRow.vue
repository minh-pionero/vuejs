<script setup lang="ts">
import { deleteProductApi } from '@/services/product.service'
import type { ProductType } from '@/types/product.type'
import { useQueryClient } from '@tanstack/vue-query'
import type { PropType } from 'vue'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import ProductEditDialog from './ProductEditDialog.vue'

const props = defineProps({
  product: {
    type: Object as PropType<ProductType>,
    required: true
  }
})

const queryClient = useQueryClient()
const isShowConfirmDelete = ref(false)
const isShowEditProduct = ref(false)
const isSubmitting = ref(false)

const handleDeleteProduct = async () => {
  try {
    isSubmitting.value = true
    await deleteProductApi(props.product.id)
    toast.success('Delete success')
    queryClient.refetchQueries(['getProducts'])
  } catch (e) {
    toast.error('Error')
  } finally {
    isShowConfirmDelete.value = false
    isSubmitting.value = false
  }
}

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
        <VBtn color="orange" class="mr-2"
          ><VIcon icon="mdi-square-edit-outline" @click="isShowEditProduct = true"
        /></VBtn>
        <v-dialog v-model="isShowConfirmDelete" persistent width="auto">
          <template v-slot:activator="{ props }">
            <VBtn color="red" v-bind="props"><VIcon icon="mdi-trash-can-outline" /> </VBtn>
          </template>
          <v-card>
            <v-card-title class="text-h5 text-red-500"> Delete </v-card-title>
            <v-card-text>Do you want to delete this product?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color=""
                variant="text"
                @click="isShowConfirmDelete = false"
                :disabled="isSubmitting"
              >
                No
              </v-btn>
              <v-btn
                color="red"
                variant="text"
                @click="handleDeleteProduct"
                :loading="isSubmitting"
              >
                Yes
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </td>
  </tr>
  <ProductEditDialog
    :is-open-dialog="isShowEditProduct"
    :product="product"
    :on-close-dialog="
      () => {
        isShowEditProduct = false
      }
    "
  />
</template>
