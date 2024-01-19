<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import {useUserStore} from "@/store/userStore";
import {storeToRefs} from "pinia";

const token = ref('');
const userStore = useUserStore();
const { setUser }= userStore;
const { user }= storeToRefs(userStore);

const authorization = async () => {
  try {
    const response = await fetch('/api/auth', {
      headers: {
        'Authorization': token.value
      }
    });
    const data = await response.json();
    if(data){
      setUser(data);
    } else {
      throw new Error('Error: authorization failed');
    }
  } catch (error) {
    console.error(error)
  } 
};

const handleToken = (value: string) => {
  token.value = value;
  localStorage.setItem('token', token.value);
  authorization()
}

onMounted(() => {
  const localToken = localStorage.getItem('token');
  if(localToken){
    handleToken(localToken);
    authorization();
  }
})
</script>

<template>
  <router-view></router-view>
</template>
