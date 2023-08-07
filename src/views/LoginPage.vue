<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from '@/store/useStore'
import { AuthActionTypes } from '@/store/modules/auth/actions'
import { onBeforeMount } from 'vue'

const email = ref('admin@luuminh.id.vn')
const password = ref('password')
const isRememberLogin = ref(false)
const store = useStore('auth')

const isLoading = computed(() => store.getters('isLoading'))

onBeforeMount(() => {
  localStorage.clear()
})

const submit = () => {
  store.dispatch(AuthActionTypes.LOGIN, {
    email: email.value,
    password: password.value,
    isRemember: isRememberLogin.value
  })
}
</script>

<template>
  <div class="d-flex justify-center h-100 align-center bg-grey-lighten-4">
    <v-card :rounded="50" width="500" class="pa-4">
      <div class="text-h5 text-center mb-4">Login</div>
      <v-form validate-on="submit lazy" @submit.prevent="submit">
        <v-text-field label="Email" type="email" variant="outlined" v-model="email"></v-text-field>
        <v-text-field
          label="Password"
          type="password"
          variant="outlined"
          v-model="password"
        ></v-text-field>
        <div class="d-flex justify-space-between align-center">
          <v-checkbox v-model="isRememberLogin" label="Remember me" />
          <router-link to="/" class="mb-6">Forgot password</router-link>
        </div>
        <v-btn type="submit" block class="mt-2" size="45" :loading="isLoading" :disabled="isLoading"
          >Submit</v-btn
        >
      </v-form>
    </v-card>
  </div>
</template>

<style scoped>
.h-100 {
  height: 100dvh !important;
}
</style>
