<script setup lang="ts">
import OtpVerify from '@/components/OtpVerify.vue'
import Loading from '@/components/Loading.vue'
import {ref} from "vue";
import {useRouter} from "vue-router";
import {RouterName} from "@/router";
import {useUserStore} from "@/store/userStore";

const isLoading = ref(false);

const router = useRouter();
const { setUser, setToken }= useUserStore();

const handleLoading = () => {
  isLoading.value = !isLoading.value
}

const handleToken = (token: string) => {
  setToken({
    value: token
  });
  localStorage.setItem('token', token);
  authorization(token)
}

const authorization = async (token: string) => {
  try {
    const response = await fetch('/api/auth', {
      headers: {
        'Authorization': token
      }
    });
    const data = await response.json();
    if(data){
      setUser({
          username: data.username,
          quote: data.quote,
          photo: data.photo
    });
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