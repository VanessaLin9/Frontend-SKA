<script setup lang="ts">
import OtpVerify from '@/components/OtpVerify.vue'
import Profile from '@/components/Profile.vue'
import Loading from '@/components/Loading.vue'
import { ref } from 'vue'

const isLoading = ref(false)

const handleLoading = () => {
  isLoading.value = !isLoading.value
}
</script>

<template>
  <Loading v-if="isLoading"/>
  <Profile/>
  <OtpVerify
  @post-loading="handleLoading()"
  @finish-loading="handleLoading()"/>
</template>
