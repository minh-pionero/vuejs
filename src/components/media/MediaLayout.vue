<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MediaItem from '@/components/media/MediaItem.vue'
import MediaHeader from '@/components/media/MediaHeader.vue'
import { type MediaItemType } from '@/types/media.type'
import { getDirectoriesApi } from '@/services/media.service'

const directories = ref<MediaItemType[]>([])
const isLoading = ref<boolean>(false)

const getDirectories = async () => {
  try {
    isLoading.value = true
    const { data } = await getDirectoriesApi()
    directories.value = data
  } catch (e) {
    //
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getDirectories()
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
