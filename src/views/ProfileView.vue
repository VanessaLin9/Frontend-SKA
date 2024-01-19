<script setup lang="ts">
import Profile from '@/components/Profile.vue'
import {ref} from "vue";
import {useUserStore} from "@/store/userStore";
import {storeToRefs} from "pinia";
import {router, RouterName} from "@/router";

</script>

<template>
  <Profile/>
</template>

<style scoped>
</style>