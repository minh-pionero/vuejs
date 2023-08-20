<template>
  <li>
    <div @click="handleClickMenu" class="cursor-pointer d-flex item-center py-1">
      <template v-if="treeItem?.children">
        <VIcon icon="mdi-folder-open-outline" v-if="isOpenFolder" />
        <VIcon icon="mdi-folder-outline" v-else />
      </template>
      <template v-else>
        <VIcon icon="mdi-file-outline" />
      </template>
      <span class="text ml-1">
        {{ treeItem.title }}
      </span>
    </div>
    <div :class="{ hidden: !isOpenFolder }">
      <TreeView
        :items="treeItem?.children ?? []"
        :on-click-item="onClick"
        v-if="treeItem?.children?.length > 0"
      />
    </div>
  </li>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import TreeView from './TreeView.vue'
import { ref } from 'vue'

const props = defineProps({
  treeItem: {
    type: Object as PropType<any>,
    required: true
  },
  onClick: {
    type: Function as PropType<(value?: any) => void>,
    required: false
  }
})

const isOpenFolder = ref<boolean>(false)

const handleClickMenu = () => {
  isOpenFolder.value = !isOpenFolder.value

  if (isOpenFolder.value && props.treeItem?.children) props.onClick?.(props.treeItem)
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.hidden {
  display: none;
}

.text {
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
}
</style>
