<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PropType } from 'vue'

import { EMediaGetters } from '@/store/modules/media'
import { useStore } from '@/store/useStore'
import { onUpdated } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: false,
    default: ''
  },
  onSubmit: {
    type: Function as PropType<(value: string) => Promise<void>>,
    required: true
  },
  renameText: {
    type: String,
    required: false,
    default: ''
  }
})

const emits = defineEmits(['onClose'])

const store = useStore('media')
const name = ref<string>(props.renameText)
const isSubmitting = computed(() => store.getters(EMediaGetters.IS_SUBMITTING))

const handleSubmit = async () => {
  await props.onSubmit(name.value)
  handleCloseModal()
}

const handleCloseModal = () => {
  emits('onClose')
  name.value = ''
}
</script>

<template>
  <v-dialog :model-value="isOpen" width="400" persistent>
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <VDivider />
      <div class="pa-4">
        <VTextField variant="outlined" v-model="name" />
        <div class="float-right">
          <v-btn class="mr-2" @click="handleCloseModal" :disabled="isSubmitting"> Cancel </v-btn>
          <v-btn color="blue" @click="handleSubmit" :loading="isSubmitting"> Save </v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>
