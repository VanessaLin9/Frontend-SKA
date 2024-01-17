<script setup lang="ts">
import OtpVerify from '@/components/OtpVerify.vue'
import Profile from '@/components/Profile.vue'
import Loading from '@/components/Loading.vue'
import { ref } from 'vue'

const isLoading = ref(false);
const token = ref('');
const user = { profile: {
  username: '',
  quote:'',
  photo:''
}};

const handleLoading = () => {
  isLoading.value = !isLoading.value
}

const authorization = async () => {
  try {
    const response = await fetch('/api/auth', {
      headers: {
        'Authorization': token.value
      }
    });
    const data = await response.json();
    if(data){
      user.profile = data;
      console.log(user.profile);
    } else {
      throw new Error('Error: authorization failed');
    }
  } catch (error) {
    console.error(error)
  }
};

const handleToken = (value: string) => {
  token.value = value; 
  console.log(token.value);
  authorization()
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
