<script setup lang="ts">
import OtpVerify from '@/components/OtpVerify.vue'
import Profile from '@/components/Profile.vue'
import Loading from '@/components/Loading.vue'
import { ref } from 'vue'

const isLoading = ref(false);
const token = ref('');

const handleLoading = () => {
  isLoading.value = !isLoading.value
}
const handleToken = (value: string) => {
  token.value = value; 
  console.log(token.value);
}
</script>

<template>
  <Loading v-if="isLoading"/>
  <Profile/>
  <OtpVerify
  @post-loading="handleLoading()"
  @finish-loading="handleLoading()"
  @getToken="handleToken"/>
</template>
