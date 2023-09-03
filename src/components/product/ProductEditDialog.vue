<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { createProductApi, getProductCategoriesApi } from '@/services/product.service'
import { useFormRules } from '@/utils/formRules'
import MediaModal from '@/components/modals/MediaModal.vue'

const props = defineProps({
  isOpenDialog: {
    type: Boolean,
    required: true,
    default: false
  },
  onCloseDialog: {
    type: Function,
    required: true
  },
  product: {
    type: Object,
    required: false,
    default: null
  },
  onRefreshProducts: {
    type: Function,
    required: true
  }
})

const { ruleRequired } = useFormRules()
const isSubmitting = ref(false)
const isOpenMediaDialog = ref(false)
const categories = ref<Array<{ value: number; title: string }>>([])
const formDefault = {
  name: null,
  category_id: null,
  price: null,
  thumbnail: '',
  images: '',
  is_active: true,
  short_description: '',
  description: '',
  source: '',
  preview_source_url: '',
  is_virtual_product: false
}
const form = reactive(formDefault)

const getCategories = async () => {
  try {
    const { data } = await getProductCategoriesApi()
    categories.value = data.map(({ id, name }: any) => ({ value: id, title: name }))
  } catch (e) {
    //
  }
}

onMounted(() => {
  getCategories()
})

const submit = async () => {
  try {
    isSubmitting.value = true
    const formData = new FormData()
    formData.append('name', form.name ?? '')
    formData.append('category_id', form.category_id ?? '')
    formData.append('price', form.price ?? '')
    formData.append('thumbnail', form.thumbnail)
    if (form.short_description) formData.append('short_description', form.short_description)
    if (form.description) formData.append('description', form.description)

    await createProductApi(formData)
    props.onCloseDialog()
    resetForm()
    props.onRefreshProducts()
  } catch (e) {
    //
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  form.name = formDefault.name
  form.category_id = formDefault.category_id
  form.price = formDefault.price
  form.short_description = formDefault.short_description
  form.description = formDefault.description
}
</script>

<template>
  <v-dialog
    fullscreen
    transition="dialog-bottom-transition"
    :scrim="false"
    :model-value="isOpenDialog"
  >
    <v-card>
      <v-form @submit.prevent="submit">
        <v-toolbar dark color="blue">
          <v-btn icon dark @click="onCloseDialog" :disabled="isSubmitting">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ product ? 'Update product' : 'Create product' }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn variant="text" type="submit" :loading="isSubmitting"> Save </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="pa-2">
          <v-container fluid>
            <v-row>
              <v-col cols="12" md="8">
                <v-text-field
                  label="Name"
                  variant="outlined"
                  v-model="form.name"
                  :rules="[ruleRequired]"
                ></v-text-field>
                <v-text-field
                  label="Price"
                  variant="outlined"
                  type="number"
                  v-model="form.price"
                  :rules="[ruleRequired]"
                ></v-text-field>
                <v-textarea
                  label="Short description"
                  variant="outlined"
                  v-model="form.short_description"
                ></v-textarea>
                <v-textarea
                  label="Description"
                  variant="outlined"
                  v-model="form.description"
                ></v-textarea>
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  label="Category"
                  :items="categories"
                  variant="outlined"
                  v-model="form.category_id"
                  :rules="[ruleRequired]"
                ></v-select>
                <div class="mb-6">
                  <div class="mb-6 flex justify-between align-center">
                    <v-btn @click="isOpenMediaDialog = true">
                      <VIcon icon="mdi-paperclip" />Choose Thumbnail
                    </v-btn>

                    <v-btn
                      v-if="!!form.thumbnail"
                      icon="mdi-trash-can-outline"
                      class="text-red"
                      @click="form.thumbnail = ''"
                    />
                  </div>
                  <div v-if="!!form.thumbnail">
                    <VImg :src="form.thumbnail" />
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
  <MediaModal
    :is-open="isOpenMediaDialog"
    @on-close="isOpenMediaDialog = false"
    :on-save="
      (values:string[]) => {
        if(values?.length)
        {
          form.thumbnail = values[0]
        }
      }
    "
  />
</template>
