<script setup lang="ts">
import OtpVerify from '@/components/OtpVerify.vue'
import Profile from '@/components/Profile.vue'
import Loading from '@/components/Loading.vue'
import {computed, reactive, ref} from 'vue'

const isLoading = ref(false);
const token = ref('');
const user = reactive( {
  username: '',
  quote: '',
  photo: ''
});

const handleLoading = () => {
  isLoading.value = !isLoading.value
}

const handleShowProfile = computed(() => {
  return !user.photo && !token.value
})

const authorization = async () => {
  try {
    const response = await fetch('/api/auth', {
      headers: {
        'Authorization': token.value
      }
    });
    const data = await response.json();
    if(data){
      user.username = data.username
      user.quote = data.quote
      user.photo = data.photo
    } else {
      throw new Error('Error: authorization failed');
    }
  } catch (error) {
    console.error(error)
  } 
};

const handleToken = (value: string) => {
  token.value = value; 
  authorization()
}

const handleLogout = () => {
  token.value = '';
  user.username = '';
  user.quote = '';
  user.photo = '';
}
</script>

<template>
  <Loading v-if="isLoading"/>
  <Profile v-if="!handleShowProfile" 
           :username ="user.username"
           :quote="user.quote"
           :photo="user.photo"
           @logout="handleLogout"
  />
  <OtpVerify v-else
  @post-loading="handleLoading()"
  @finish-loading="handleLoading()"
  @getToken="handleToken"/>
</template>
