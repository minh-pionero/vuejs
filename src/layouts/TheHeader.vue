<script setup lang="ts">
defineProps({
  onToggleSidebar: {
    type: Function,
    required: true
  }
})

const items = [
  { title: 'Hi, Minh Luu!' },
  { title: 'Profile' },
  { title: 'Update password' },
  { title: 'Logout' }
]
</script>

<template>
  <v-app-bar :elevation="1">
    <template v-slot:title>
      <div>
        <VBtn icon="mdi-menu" @click="onToggleSidebar" />
        <span> Admin </span>
      </div>
    </template>
    <template v-slot:append>
      <v-avatar color="surface-variant" size="35" id="menu-activator">
        <span class="text-h6">ML</span>
      </v-avatar>
    </template>
  </v-app-bar>
  <v-menu activator="#menu-activator">
    <v-list>
      <v-list-item v-for="(item, index) in items" :key="index" :value="index">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
