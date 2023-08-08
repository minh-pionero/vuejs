<script setup lang="ts">
import { ref, type PropType } from 'vue'
import { useStore } from '@/store/useStore'

import MediaRenameDialog from '@/components/media/MediaRenameDialog.vue'
import type { MediaItemType } from '@/types/media.type'
import { MediaActionTypes } from '@/store/modules/media/actions'

const store = useStore('media')

const props = defineProps({
  activator: {
    type: String
  },
  mediaItem: {
    type: Object as PropType<MediaItemType>,
    required: true
  }
})

type MenuItemType = {
  title: string
  type: 'OPEN' | 'RENAME' | 'DELETE'
}

const items: MenuItemType[] = [
  { title: 'Open', type: 'OPEN' },
  { title: 'Rename', type: 'RENAME' },
  { title: 'Delete', type: 'DELETE' }
]

const isOpenRenameDialog = ref<boolean>(false)

const onClickMenu = (item: MenuItemType) => {
  switch (item.type) {
    case 'OPEN':
      if (props.mediaItem?.children)
        store.dispatch(MediaActionTypes.HANDLE_SELECT_DIRECTORY, props.mediaItem)
      break
    case 'RENAME':
      isOpenRenameDialog.value = true
      break
    case 'DELETE':
      //
      break
  }
}
</script>

<template>
  <v-menu transition="slide-y-transition" :activator="`#menu_${activator}`">
    <v-list>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        :value="index"
        @click="() => onClickMenu(item)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
  <template v-if="isOpenRenameDialog">
    <MediaRenameDialog
      :is-open="isOpenRenameDialog"
      :on-close="() => (isOpenRenameDialog = false)"
    />
  </template>
</template>
