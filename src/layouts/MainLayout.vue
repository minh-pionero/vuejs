<script setup lang="ts">
import { ref, computed } from 'vue'

import TheSidebar from '@/layouts/TheSidebar.vue'
import TheHeader from '@/layouts/TheHeader.vue'
import { useStore } from '@/store/useStore'

const store = useStore()
const drawerSidebar = ref(true)
const isLoading = computed(() => store.getters('isLoading'))

const onToggleSidebar = () => {
  drawerSidebar.value = !drawerSidebar.value
}
</script>

<template>
  <v-layout>
    <TheSidebar :drawer-sidebar="drawerSidebar" />
    <TheHeader :on-toggle-sidebar="onToggleSidebar" />
    <v-main>
      <template v-if="isLoading">
        <v-progress-linear indeterminate :height="5"></v-progress-linear>
      </template>
      <template v-else>
        <div class="pa-3">
          <RouterView />
        </div>
      </template>
    </v-main>
  </v-layout>
</template>
