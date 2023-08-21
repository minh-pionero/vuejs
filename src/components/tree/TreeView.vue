<template>
  <div>
    <ul class="ml-4 tree-list">
      <template v-for="node in items" :key="node.key">
        <TreeItem :tree-item="node" :on-click="onClickItem" />
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import TreeItem from './TreeItem.vue'

defineProps({
  items: {
    type: Array as PropType<any[]>,
    required: true
  },
  onClickItem: {
    type: Function as PropType<(value?: any) => void>,
    required: false
  }
})
</script>

<style scoped>
.tree-list {
  list-style: none;
}
</style>
