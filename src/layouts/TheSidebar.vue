<script setup lang="ts">
import router from '@/router'
import { ROUTER_NAME } from '@/constants/path'
import { type MenuItemType } from '@/types/sidebar'

const props = defineProps({
  drawerSidebar: {
    type: Boolean,
    required: true,
    default: true
  }
})

const items: MenuItemType[] = [
  { text: ROUTER_NAME.overview.name, path: ROUTER_NAME.overview.path, icon: 'mdi-view-dashboard' },
  { text: ROUTER_NAME.product.name, path: ROUTER_NAME.product.path, icon: 'mdi-store' },
  { text: ROUTER_NAME.media.name, path: ROUTER_NAME.media.path, icon: 'mdi-folder-multiple-image' }
]

const onClickMenu = (item: MenuItemType) => {
  router.push({ path: item.path })
}
</script>

<template>
  <v-navigation-drawer :model-value="props.drawerSidebar">
    <v-list class="py-0">
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        @click="() => onClickMenu(item)"
      >
        <template v-slot:prepend>
          <VIcon :icon="item.icon" />
        </template>
        <v-list-item-title>{{ item.text }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
