<script lang="ts" setup>
import {ref, onMounted, Ref} from 'vue';


const input0:Ref<HTMLElement | null> = ref(null);
const input1: Ref<HTMLElement | null> = ref(null);
const input2: Ref<HTMLElement | null> = ref(null);
const input3: Ref<HTMLElement | null> = ref(null);
const password = ref(['', '', '', '']);

 // auto focus on first input
  onMounted(() => {
    if(input0.value){
      input0.value.focus();
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

 const postPassword = async () => {
   const code = password.value.join('');
  try {
    const response = await fetch('/api/verify', {
      method: 'POST',
      body: JSON.stringify({code}),
    });
    const data = await response.json();
    console.log(data.valid);
    return;
  } catch (error) {
    console.error(error)
    throw new Error('Error: post password failed');
  }
}

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
      if(nextInput === null){
        postPassword();
      } else {
       nextInput.focus();
      } 
    }
  };
  const handleOnchange = (event: any) => {
    if(event.target.value.length > 1) {
      event.target.value = event.target.value.slice(-1);
    }
  };
  
  const handleOnPaste = (event: any) => {
    event.preventDefault();
    const paste = event.clipboardData.getData('text');
    const pasteArray = paste.split('');
    password.value = pasteArray;
    if(input0.value){
      input0.value.focus();
    }
  };
  
</script>

<template>
    <form>
      <div class="otp-container">
        <h3 class="otp-title">Enter verification</h3>
        <div class="input-group">
          <input class="input"
                 v-model="password[0]"
                 ref="input0"
                 min="0"
                 max="9"
                 maxlength="1"
                 pattern="[0-9]"
                 @input="handleOnchange($event)" 
                 @keydown="handleOnValidate($event)"
                 @keyup="handleInput($event)"
                 @paste="handleOnPaste($event)"
                 >
          <input class="input" 
                 v-model="password[1]"
                 ref="input1"
                 min="0"
                 max="9"
                 maxlength="1"
                 pattern="[0-9]"
                 @input="handleOnchange($event)" 
                 @keydown="handleOnValidate($event)"
                 @keyup="handleInput($event)"
                 @paste="handleOnPaste($event)"
                  >
          <input class="input" 
                 v-model="password[2]"
                 ref="input2"
                 min="0"
                 max="9"
                 maxlength="1"
                 pattern="[0-9]"
                 @input="handleOnchange($event)" 
                 @keydown="handleOnValidate($event)"
                 @keyup="handleInput($event)"
                 @paste="handleOnPaste($event)"
                  >
          <input class="input" 
                 v-model="password[3]"
                 ref="input3"
                 min="0"
                 max="9"
                 maxlength="1"
                 pattern="[0-9]"
                 @input="handleOnchange($event)" 
                 @keydown="handleOnValidate($event)"
                 @keyup="handleInput($event)"
                 @paste="handleOnPaste($event)"
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
