<script setup lang="ts">
import { computed } from 'vue'

import { useStore } from '@/store/useStore'
import { EMediaGetters } from '@/store/modules/media/getters'
import type { MediaItemType } from '@/types/media.type'

const store = useStore('media')

const directories = computed(() => store.getters(EMediaGetters.DIRECTORIES_REAL))

const items = computed(() => {
  const result = []
  const directory: MediaItemType = store.getters(EMediaGetters.SELECTED_DIRECTORIES)

  if (directory) {
    result.push(
      ...directory.path.split('/').map((item) => ({
        title: item,
        disabled: false
      }))
    )
  } else {
    result.push({
      title: 'uploads',
      disabled: false
    })
  }

  return result
})

const handleBackFolder = () => {
  //
}
</script>

<template>
  <div class="border rounded-sm d-flex align-center">
    <div class="">
      <VBtn
        :disabled="!items.length"
        rounded="0"
        variant="text"
        icon="mdi-chevron-left"
        @click="handleBackFolder"
      />
    </div>
    <VDivider vertical />
    <div class="pl-2 d-flex align-center">
      <VIcon icon="mdi-home-outline" />
      <v-breadcrumbs :items="items" class="py-1"></v-breadcrumbs>
    </div>
  </div>
</template>
