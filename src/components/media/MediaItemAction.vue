<script setup lang="ts">
import { ref, type PropType } from 'vue'
import { useStore } from '@/store/useStore'

import MediaRenameDialog from '@/components/media/MediaRenameDialog.vue'
import type { MediaItemType } from '@/types/media.type'
import { EMediaAction } from '@/store/modules/media'
import { computed } from 'vue'

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
  disabled?: boolean
}

const items: MenuItemType[] = [
  { title: 'Open', type: 'OPEN', disabled: !props.mediaItem?.children },
  { title: 'Rename', type: 'RENAME' },
  { title: 'Delete', type: 'DELETE' }
]

const isOpenRenameDialog = ref<boolean>(false)

const onClickMenu = (item: MenuItemType) => {
  switch (item.type) {
    case 'OPEN':
      if (props.mediaItem?.children)
        store.dispatch(EMediaAction.HANDLE_SELECT_DIRECTORY, props.mediaItem)
      break
    case 'RENAME':
      isOpenRenameDialog.value = true
      break
    case 'DELETE': {
      const payload = {
        path: props.mediaItem.path,
        isFolder: props.mediaItem?.children ? 1 : 0
      }

      store.dispatch(EMediaAction.DELETE_FILE_OR_FOLDER, payload)
      break
    }
  }
}

const renameText = computed(() => {
  if (props.mediaItem?.children)
    return {
      name: props.mediaItem.title
    }

  const fileName = props.mediaItem.title
  const dotIndex = fileName.lastIndexOf('.')

  if (dotIndex !== -1) {
    const name = fileName.substring(0, dotIndex)
    const extension = fileName.substring(dotIndex + 1)

    return {
      name,
      extension
    }
  }

  return null
})

const handleSubmitRename = async (value: string) => {
  if (!value) return

  const oldPath = props.mediaItem.path
  const dotIndex = oldPath.lastIndexOf('/')

  if (dotIndex !== -1) {
    const name = oldPath.substring(0, dotIndex)

    const payload = {
      oldName: props.mediaItem.path,
      newName: `${name}/${value}${
        renameText.value?.extension ? `.${renameText.value.extension}` : ''
      }`
    }

    if (payload.oldName === payload.newName) return

    await store.dispatch(EMediaAction.RENAME_FILE_OF_FOLDER, payload)
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
        :disabled="item?.disabled"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
  <template v-if="isOpenRenameDialog">
    <MediaRenameDialog
      title="Rename"
      :rename-text="renameText?.name"
      :is-open="isOpenRenameDialog"
      :on-submit="handleSubmitRename"
      @on-close="isOpenRenameDialog = false"
    />
  </template>
</template>
