<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import MediaItem from '@/components/media/MediaItem.vue'
import MediaHeader from '@/components/media/MediaHeader.vue'
import MediaSidebar from '@/components/media/MediaSidebar.vue'
import { useStore } from '@/store/useStore'
import { EMediaGetters, EMediaAction } from '@/store/modules/media'
import MediaRenameDialog from './MediaRenameDialog.vue'
import type { MediaItemType } from '@/types/media.type'

defineProps({
  isSelectMode: {
    type: Boolean,
    required: false
  }
})

const store = useStore('media')
const directories = computed(() => store.getters(EMediaGetters.DIRECTORIES))
const selectedDirectories = computed((): MediaItemType | undefined =>
  store.getters(EMediaGetters.SELECTED_DIRECTORIES)
)
const isLoading = computed(() => store.getters(EMediaGetters.IS_LOADING))
const isOpenCreateFolderDialog = ref(false)
const fileRef = ref<any>(null)

onMounted(() => {
  store.dispatch(EMediaAction.GET_DIRECTORIES)
})

const handleSubmitCreateFolder = async (folderName: string) => {
  const payload = {
    path: selectedDirectories?.value?.path ?? 'uploads',
    name: folderName
  }

  await store.dispatch(EMediaAction.CREATE_FOLDER, payload)
}

const onChangeFile = (event: any) => {
  //
  const payload = {
    filePath: selectedDirectories?.value?.path ?? 'uploads',
    file: event.target.files[0]
  }

  store.dispatch(EMediaAction.UPLOAD_FILE, payload)
}

const onClickUploadFile = () => {
  fileRef.value?.click()
}
</script>

<template>
  <div class="d-flex justify-space-between mb-3">
    <div class="text-h5">Manage folders</div>
    <div>
      <v-btn title="File upload" class="mr-2" @click="onClickUploadFile">
        <VIcon icon="mdi-file-upload-outline" />
      </v-btn>
      <v-btn title="Create folder" @click="isOpenCreateFolderDialog = true">
        <VIcon icon="mdi-folder-plus-outline" />
      </v-btn>
      <input hidden type="file" @change="onChangeFile" ref="fileRef" />
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
      <MediaSidebar />
      <template v-if="!directories.length">
        <div class="d-flex justify-center flex-fill py-4">
          <div class="d-flex flex-column justify-center align-center">
            <VIcon icon="mdi-folder-outline" size="50" />
            Folder is empty
          </div>
        </div>
      </template>
      <template v-else v-for="item in directories" :key="item.key">
        <MediaItem :item="item" :is-select-mode="isSelectMode" />
      </template>
    </div>
  </template>
  <MediaRenameDialog
    title="Create folder"
    :is-open="isOpenCreateFolderDialog"
    :on-submit="handleSubmitCreateFolder"
    @on-close="isOpenCreateFolderDialog = false"
  />
</template>
