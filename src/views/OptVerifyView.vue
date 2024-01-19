<script setup lang="ts">
import OtpVerify from '@/components/OtpVerify.vue'
import Loading from '@/components/Loading.vue'
import {ref} from "vue";
import {useRouter} from "vue-router";
import {RouterName} from "@/router";
import {useUserStore} from "@/store/userStore";

const isLoading = ref(false);
const token = ref('');

const router = useRouter();
const { setUser }= useUserStore();

const handleLoading = () => {
  isLoading.value = !isLoading.value
}

const handleToken = (value: string) => {
  token.value = value;
  localStorage.setItem('token', token.value);
  authorization()
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
      setUser({
          username: data.username,
          quote: data.quote,
          photo: data.photo
    });
      console.log('pina-login')
      await router.push({name: RouterName.Home});
    } else {
      throw new Error('Error: authorization failed');
    }
  } catch (error) {
    console.error(error)
  }
};

</script>

<template>
    <Loading v-if="isLoading"/>
    <OtpVerify 
    @post-loading="handleLoading"
    @finish-loading="handleLoading"
    @getToken="handleToken"/>
</template>

<style scoped>

</style>