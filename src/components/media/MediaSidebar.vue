<template>
  <div class="wrapper">
    <TreeView :items="directories" :on-click-item="handleClickItem" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useStore } from '@/store/useStore'
import TreeView from '@/components/tree/TreeView.vue'
import { EMediaAction, EMediaGetters } from '@/store/modules/media'

const store = useStore('media')
const directories = computed(() => store.getters(EMediaGetters.DIRECTORIES_REAL))

const handleClickItem = (value?: any) => {
  store.dispatch(EMediaAction.HANDLE_SELECT_DIRECTORY, value)
}
</script>

<style scoped>
.wrapper {
  width: 200px;
  background: rgb(246, 246, 246);
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
