<script setup lang="ts">
import { ref, watch, computed, type PropType } from 'vue'

import { type MediaItemType } from '@/types/media.type'
import MediaItemAction from '@/components/media/MediaItemAction.vue'
import { useStore } from '@/store/useStore'
import { EMediaAction, EMediaGetters } from '@/store/modules/media'

const props = defineProps({
  item: {
    type: Object as PropType<MediaItemType>,
    required: true
  },
  isSelectMode: {
    type: Boolean,
    required: false
  }
})

const isSelectedFile = ref(false)
const store = useStore('media')
const selectedFiles = computed<Set<string>>(() => store.getters(EMediaGetters.GET_SELECTED_FILES))

watch(isSelectedFile, (status) => {
  const newSelectedFiles = new Set(...Array(selectedFiles.value))
  const url = props.item?.url

  if (!url) return

  if (status) {
    newSelectedFiles.add(url)
  } else {
    newSelectedFiles.delete(url)
  }

  store.dispatch(EMediaAction.HANDLE_SET_SELECTED_FILES, newSelectedFiles)
})
</script>

<template>
  <div
    class="w-[100px] ma-1 d-flex flex-column align-center cursor-pointer position-relative h-fit"
    :id="`menu_${item.key}`"
  >
    <div>
      <template v-if="item.children">
        <VIcon icon="mdi-folder" size="75" />
      </template>
      <template v-else-if="item?.isImage">
        <VImg :src="item.url" width="75" height="75" />
      </template>
      <template v-else>
        <VIcon icon="mdi-file" size="75" />
      </template>
    </div>
    <div v-if="isSelectMode">
      <v-checkbox
        v-model="isSelectedFile"
        @click="
          (event:Event) => {
            event.stopPropagation()
          }
        "
        hide-details
        :disabled="!item.url"
      ></v-checkbox>
    </div>
    <div class="text-center break-all">{{ item.title }}</div>
  </div>
  <MediaItemAction :activator="item.key" :media-item="item" />
</template>
