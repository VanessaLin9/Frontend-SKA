<script lang="ts" setup>
const props = defineProps({
  username: String,
  quote: String,
  photo: String
});
</script>

<template>
  <figure class="profile">
    <img class="profile-photo" :src="props.photo" alt="" width="300" height="512">
    <div class="profile-details">
      <blockquote>
        <p class="profile-quote font-medium">
          {{props.quote}}
        </p>
      </blockquote>
      <figcaption class="font-medium">
        <div class="text-sky-500">
          {{props.username}}
        </div>
      </figcaption>
    </div>
  </figure>
  <div class="logoutBtn">
    <button
      @click="$emit('logout')"
    >logout</button>
  </div>
</template>

<style scoped>
.profile {
  --tw-ring-inset: ;
  --tw-ring-offset-width: 0px;
  --tw-ring-color: #3b82f680;
  --tw-bg-opacity: 1;
  display: flex;
  overflow: hidden;
  padding: 0;
  justify-content: center;
  border-radius: 0.75rem;
  box-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  --un-bg-opacity: 1;
  background-color:rgb(30 41 59/var(--tw-bg-opacity));
}


.profile-photo {
  border-radius: 0;
  width: 12rem;
  height: auto;
}

.profile-details {
  margin-top: 1rem;
  padding: 2rem;
  text-align: left;
}
.font-medium {
  font-weight: 500;
}
.profile-quote {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.text-sky-500 {
  --un-text-opacity: 1;
  color: rgba(14, 165, 233, var(--un-text-opacity));
}

.logoutBtn {
  display: flex;
  justify-content: end;
  padding-right: 3rem;
  button {
    background-color: #333;
    color: rgba(14, 165, 233, 0.5);
    border: none;
    &:hover {
      background-color: rgba(14, 165, 233, 0.8);
      color: #eee;
    }
  }
 
}

</style>
