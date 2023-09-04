<template>
  <v-dialog :model-value="isOpen" :width="900" persistent>
    <v-card>
      <v-card-title>Profile</v-card-title>
      <VDivider />
      <div class="pa-4">
        <div class="flex">
          <v-avatar size="100px">
            <v-img
              alt="Avatar"
              src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
            ></v-img>
          </v-avatar>
          <div class="flex-1 ml-2">
            <VTextField v-model="name" label="Name" variant="outlined" />
            <VTextField v-model="email" label="Email" variant="outlined" disabled />
            <VTextField v-model="roleCode" label="Role" variant="outlined" disabled />
          </div>
        </div>
        <div class="float-right">
          <v-btn class="mr-2" @click="handleCloseModal" :disabled="isSubmitting"> Cancel </v-btn>
          <v-btn color="blue" @click="handleSubmit" :loading="isSubmitting"> Update </v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { updateProfileApi } from '@/services/user.service'
import { useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  user: {
    type: Object,
    required: true
  }
})

const queryClient = useQueryClient()
const isSubmitting = ref(false)
const name = ref(props.user?.name)
const email = ref(props.user?.email)
const roleCode = ref(props.user?.roleCode)

const emits = defineEmits(['onClose'])

const handleSubmit = async () => {
  if (props.user.name !== name.value && name.value) {
    try {
      const payload = {
        id: props.user.id,
        name: name.value
      }
      isSubmitting.value = true
      const res = await updateProfileApi(payload)
      if (res) {
        queryClient.refetchQueries(['getUser'])
        toast.success('Update successful')
      }
    } catch (e) {
      toast.error('Update failed')
    } finally {
      isSubmitting.value = false
    }
  } else {
    toast.warning('Please enter the name you want to update')
  }
}

const handleCloseModal = () => {
  emits('onClose')
}
</script>
