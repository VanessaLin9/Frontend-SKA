<script setup lang="ts">

</script>

<template>
  <div class="loading">
    <div class="loading__container">
      <div class="loading__circle"></div>
      <div class="loading__text">Loading...</div>
    </div>
  </div>
</template>

<style scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: rgba(30, 41, 59, 0.5);
  .loading__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    .loading__circle {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      border: 0.25rem solid #fff;
      border-top-color: transparent;
      animation: spin 1s linear infinite;
    }
    .loading__text {
      font-size: 2.5rem;
      font-weight: bold;
      color: #fff;
    }
  }
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>