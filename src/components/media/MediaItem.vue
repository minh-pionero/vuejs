<script setup lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'
import { type MediaItemType } from '@/types/media.type'
import MediaItemAction from '@/components/media/MediaItemAction.vue'

defineProps({
  item: {
    type: Object as PropType<MediaItemType>,
    required: true
  }
})

</script>

<template>
  <div class="w-100 ma-1 d-flex flex-column align-center cursor-pointer" :id="`menu_${item.key}`">
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
    <div class="text-center break-word">{{ item.title }}</div>
  </div>
  <MediaItemAction :activator="item.key" />
</template>

<style scoped>
.w-100 {
  width: 100px !important;
}
.cursor-pointer {
  cursor: pointer;
}
.break-word {
  word-break: break-all;
}
</style>
