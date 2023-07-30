<script setup lang="ts">
defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  onClose: {
    type: Function
  }
})
</script>

<template>
  <v-dialog :model-value="isOpen" width="400">
    <v-card>
      <v-card-title>Rename</v-card-title>
      <VDivider />
      <div class="pa-4">
        <VTextField variant="outlined" />
        <div class="float-right">
          <v-btn class="mr-2" @click="onClose"> Cancel </v-btn>
          <v-btn color="blue" @click="onClose"> Save </v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>
