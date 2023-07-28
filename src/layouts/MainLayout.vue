<script setup lang="ts">
import { ref } from 'vue'
import TheSidebar from '@/layouts/TheSidebar.vue'
import TheHeader from '@/layouts/TheHeader.vue'

const drawerSidebar = ref(true)

const onToggleSidebar = () => {
  drawerSidebar.value = !drawerSidebar.value
}
</script>

<template>
  <v-layout>
    <TheSidebar :drawer-sidebar="drawerSidebar" />
    <TheHeader :on-toggle-sidebar="onToggleSidebar" />
    <v-main>
      <div class="pa-3">
        <RouterView />
      </div>
    </v-main>
  </v-layout>
</template>
