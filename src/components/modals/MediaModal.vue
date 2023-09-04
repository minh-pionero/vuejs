<template>
  <v-dialog :model-value="isOpen" :width="900" persistent>
    <v-card>
      <v-card-title>Select file</v-card-title>
      <VDivider />
      <div class="pa-4">
        <div>
          <MediaLayout is-select-mode />
        </div>
        <div class="float-right">
          <v-btn class="mr-2" @click="handleCloseModal"> Cancel </v-btn>
          <v-btn color="blue" @click="handleSubmit"> Save </v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useStore } from '@/store/useStore'
import MediaLayout from '../media/MediaLayout.vue'
import { computed } from 'vue'
import { EMediaAction, EMediaGetters } from '@/store/modules/media'
import type { PropType } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  onSave: {
    type: Function as PropType<(values: string[]) => void>,
    required: true
  }
})

const store = useStore('media')
const selectedFiles = computed<Set<string>>(() => store.getters(EMediaGetters.GET_SELECTED_FILES))

const emits = defineEmits(['onClose'])
const handleSubmit = () => {
  props.onSave([...selectedFiles.value])
  handleCloseModal()
}

const handleCloseModal = () => {
  store.dispatch(EMediaAction.HANDLE_SET_SELECTED_FILES, new Set())
  emits('onClose')
}
</script>

<style scoped></style>
