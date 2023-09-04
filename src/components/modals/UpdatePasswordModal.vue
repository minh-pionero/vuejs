<template>
  <v-dialog :model-value="isOpen" :width="900" persistent>
    <v-card>
      <v-card-title>Update password</v-card-title>
      <VDivider />
      <div>
        <v-form @submit.prevent="handleSubmit" ref="formRef">
          <div class="pa-4">
            <div>
              <VTextField
                v-model="password"
                label="Password"
                variant="outlined"
                type="password"
                :rules="rulePassword"
                class="mb-3"
              />
              <VTextField
                v-model="confirmPassword"
                label="Confirm password"
                variant="outlined"
                type="password"
                :rules="ruleConfirmPassword"
              />
            </div>
            <div class="float-right mb-3">
              <v-btn class="mr-2" @click="handleCloseModal" :disabled="isSubmitting">
                Cancel
              </v-btn>
              <v-btn color="blue" type="submit" :loading="isSubmitting"> Update </v-btn>
            </div>
          </div>
        </v-form>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { updatePasswordApi } from '@/services/user.service'
import { useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const queryClient = useQueryClient()
const user = queryClient.getQueryData<any>(['getUser'])
const formRef = ref<any>(null)
const isSubmitting = ref(false)
const password = ref('')
const confirmPassword = ref('')

const emits = defineEmits(['onClose'])
const ruleConfirmPassword = [
  (value: any) => {
    if (value) {
      if (value !== password.value) return 'Re-enter the password does not match'
      return true
    }

    return 'Confirm password is required.'
  }
]

const rulePassword = [
  (value: any) => {
    if (value) {
      if (value.length < 8) return 'Password must contain at least 8 characters'
      return true
    }

    return 'This field is required.'
  }
]

const handleSubmit = async () => {
  try {
    if (!formRef.value.isValid) return
    isSubmitting.value = true
    await updatePasswordApi(user.id, password.value)
    toast.success('Update successful')
    handleCloseModal()
  } catch (e) {
    toast.error('Update failed')
  } finally {
    isSubmitting.value = false
  }
}

const handleCloseModal = () => {
  emits('onClose')
}
</script>
