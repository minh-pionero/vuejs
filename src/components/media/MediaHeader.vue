<script setup lang="ts">
const items = [
  {
    title: 'Home',
    disabled: false,
    href: '#'
  },
  {
    title: 'Link 1',
    disabled: false,
    href: '#'
  },
  {
    title: 'Link 2',
    disabled: true,
    href: '#'
  }
]
</script>

<template>
  <div class="border rounded-sm d-flex align-center">
    <div class="">
      <VBtn rounded="0" variant="text" icon="mdi-chevron-left" />
    </div>
    <VDivider vertical />
    <div class="pl-2 d-flex align-center">
      <VIcon icon="mdi-home-outline" />
      <v-breadcrumbs :items="items" class="py-1"></v-breadcrumbs>
    </div>
  </div>
</template>
