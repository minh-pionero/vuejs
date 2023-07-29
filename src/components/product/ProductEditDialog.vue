<script setup lang="ts">
defineProps({
  isOpenDialog: {
    type: Boolean,
    required: true,
    default: false
  },
  onCloseDialog: {
    type: Function,
    required: true
  },
  product: {
    type: Object,
    required: false,
    default: null
  }
})
</script>

<template>
  <v-dialog
    fullscreen
    transition="dialog-bottom-transition"
    :scrim="false"
    :model-value="isOpenDialog"
  >
    <v-card>
      <v-toolbar dark color="blue">
        <v-btn icon dark @click="onCloseDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ product ? 'Update product' : 'Create product' }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn variant="text" @click="onCloseDialog"> Save </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-form class="pa-2">
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="8">
              <v-text-field label="Name" variant="outlined"></v-text-field>
              <v-text-field label="Price" variant="outlined" type="number"></v-text-field>
              <v-textarea label="Short description" variant="outlined"></v-textarea>
              <v-textarea label="Description" variant="outlined"></v-textarea>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                label="Category"
                :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                variant="outlined"
              ></v-select>
              <div class="mb-6">
                <v-btn> <VIcon icon="mdi-paperclip" />Choose Thumbnail </v-btn>
              </div>
              <div>
                <v-btn> <VIcon icon="mdi-paperclip" />Choose Images </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>
