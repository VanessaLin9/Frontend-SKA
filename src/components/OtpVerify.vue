<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import {$ref} from "vue/macros";

  const firstInput = ref();
  const input0 = ref('');
  const input1 = ref('');
  const input2 = ref('');
  const input3 = ref('');
  const password = new Array() 
 // auto focus on first input
  onMounted(() => {
    if(firstInput.value){
      firstInput.value.focus();
    }
  }); 
  
  const handleOnValidate = (event: any) => {
    const keyCode = event.keyCode;
    // const value = event.key;
    if(!isNumber(keyCode) && keyCode!==8) {
      event.preventDefault();
    } 
  };
  //need handle chinese input
  const isNumber = (key:number) => {
    // const regex = new RegExp('^[0-9]$');
    // return regex.test(key); 
    return key >= 48 && key <= 57;
  };
  const handleInput = (event: any) => {
    const input = event.target;
    const keyCode = event.keyCode;
    const nextInput = input.nextElementSibling;
    const previousInput = input.previousElementSibling;
    if(keyCode === 8) {
      if(input.value.length === 0) {
        if(previousInput === null) return;
        previousInput.focus();
      }
    } else if (input.value.length === 1) {
      if(nextInput === null) return;
      nextInput.focus();
    }
  };
  const handleOnchange = (event: any) => {
    if(event.target.value.length > 1) {
      event.target.value = event.target.value.slice(-1);
    }
  };
  
</script>

<template>
    <form>
      <div class="otp-container">
        <h3 class="otp-title">Enter verification</h3>
        <div class="input-group">
          <input class="input"
                 v-model="input0"
                 ref="firstInput"
                 min="0"
                 max="9"
                 maxlength="1"
                 pattern="[0-9]"
                 @input="handleOnchange($event)" 
                 @keydown="handleOnValidate($event)"
                 @keyup="handleInput($event)"
                 >
          <input class="input" 
                 v-model="input1"
                 min="0"
                 max="9"
                 maxlength="1"
                 pattern="[0-9]"
                 @input="handleOnchange($event)" 
                 @keydown="handleOnValidate($event)"
                 @keyup="handleInput($event)"
                  >
          <input class="input" 
                 v-model="input2"
                 min="0"
                 max="9"
                 maxlength="1"
                 pattern="[0-9]"
                 @input="handleOnchange($event)" 
                 @keydown="handleOnValidate($event)"
                 @keyup="handleInput($event)"
                  >
          <input class="input" 
                 v-model="input3"
                 min="0"
                 max="9"
                 maxlength="1"
                 pattern="[0-9]"
                 @input="handleOnchange($event)" 
                 @keydown="handleOnValidate($event)"
                 @keyup="handleInput($event)"
                  >
          
        </div>
      </div>
    </form>
</template>
<style scoped>
.otp-container {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
}
.otp-title {
  font-size: 2rem;
}

.input-group {
  display: flex;
  gap: 1rem;
}

.input-group > .input {
  width: 8rem;
  height: 12rem;
  text-align: center;
  font-size: 2rem;
}
</style>
