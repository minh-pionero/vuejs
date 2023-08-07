<script setup lang="ts">
import { useStore } from '@/store/useStore'
import { computed, onMounted } from 'vue'
// import {  mapGetters } from 'vuex'
// import useStoreModule from '@/store/storeModule'

import MediaItem from '@/components/media/MediaItem.vue'
import MediaHeader from '@/components/media/MediaHeader.vue'
import { MediaActionTypes, type IMediaActions } from '@/store/modules/media/actions'

const store = useStore('media')
const directories = computed(() => store.getters('directories'))
const isLoading = computed(() => store.getters('isLoading'))

onMounted(() => {
  store.dispatch(MediaActionTypes.GET_DIRECTORIES)
  // getDirectories()
})
</script>

<template>
  <div class="d-flex justify-space-between mb-3">
    <div class="text-h5">Manage folders</div>
    <div>
      <v-btn title="File upload" class="mr-2">
        <VIcon icon="mdi-file-upload-outline" />
      </v-btn>
      <v-btn title="Create folder">
        <VIcon icon="mdi-folder-plus-outline" />
      </v-btn>
    </div>
  </div>
  <template v-if="isLoading">
    <div class="text-center my-16">
      <v-progress-circular :size="50" indeterminate></v-progress-circular>
    </div>
  </template>
  <template v-else>
    <MediaHeader />
    <div class="d-flex flex-wrap">
      <template v-for="item in directories" :key="item.key">
        <MediaItem :item="item" />
      </template>
    </div>
  </template>
</template>
