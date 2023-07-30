<script setup lang="ts">
import { ref } from 'vue'
import MediaRenameDialog from '@/components/media/MediaRenameDialog.vue'

defineProps({
  activator: {
    type: String
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
      //
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
