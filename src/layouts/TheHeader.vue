<script setup lang="ts">
import ProfileModal from '@/components/modals/ProfileModal.vue'
import UpdatePasswordModal from '@/components/modals/UpdatePasswordModal.vue'
import { getProfileApi } from '@/services/user.service'
import { useQuery } from '@tanstack/vue-query'
import { ref } from 'vue'

defineProps({
  onToggleSidebar: {
    type: Function,
    required: true
  }
})

const isOpenProfile = ref(false)
const isOpenUpdatePassword = ref(false)

const { data: user } = useQuery<any>({
  queryKey: ['getUser'],
  queryFn: async () => {
    const { data } = await getProfileApi()
    return data
  }
})

const items = [
  { title: `Welcome!` },
  {
    title: 'Profile',
    onClick: () => {
      isOpenProfile.value = true
    }
  },
  {
    title: 'Update password',
    onClick: () => {
      isOpenUpdatePassword.value = true
    }
  },
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
        <VImg src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460" />
      </v-avatar>
    </template>
  </v-app-bar>
  <v-menu activator="#menu-activator">
    <v-list>
      <v-list-item v-for="(item, index) in items" :key="index" :value="index">
        <v-list-item-title @click="() => item?.onClick?.()">{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
  <ProfileModal :is-open="isOpenProfile" :user="user" @on-close="isOpenProfile = false" />
  <UpdatePasswordModal :is-open="isOpenUpdatePassword" @on-close="isOpenUpdatePassword = false" />
</template>
