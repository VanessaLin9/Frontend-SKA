<script lang="ts" setup>
import {ref, onMounted, reactive} from 'vue';

const emit = defineEmits(['post-loading', 'finish-loading', 'getToken']);
const errorMessage = ref('');
const inputs = ref<HTMLElement[]>([]);
const password:(number|null)[] = reactive([
  null,
  null,
  null,
  null
]);

const handleFocusByIndex = (index: number) => {
    if(index < 0 || index >= inputs.value.length) {
      return;
    }
    inputs.value[index].focus();
  };  
  const handleOnValidate = (event: KeyboardEvent) => {
    // const value = event.key;
    if(!isNumber(event)) {
      event.preventDefault();
    }
  };
  //need handle chinese input
  const isNumber = (event: KeyboardEvent) => {
    const value = parseInt(event.key)
    return !isNaN(value);
  };

const handleInput = ({event, index}: {event: KeyboardEvent, index: number}) => {
    const input = parseInt(event.key);
    
    if(event.key === 'Backspace') {
      password[index] = input;
      handleFocusByIndex(index - 1);
    } else if (isNumber(event)) {
        password[index] = input;
        if(index === inputs.value.length - 1 && !isNaN(input)){
          postPassword();
        } else {
          handleFocusByIndex(index + 1);
        } 
    }
};

const handleOnPaste = (event: any) => {
    event.preventDefault();
    const inputsLength = inputs.value.length;
    const paste = event.clipboardData.getData('text');
    const pasteArray = paste.split('').map(Number);
    if(pasteArray.length !== inputsLength) {
      pasteArray.slice(0, inputsLength)
    }
    for(let i = 0; i < pasteArray.length; i++) {
      password[i] = pasteArray[i];
    }
    if(pasteArray.length === inputsLength) {
      postPassword();
    }
    handleFocusByIndex(pasteArray.length - 1);
  };
  
const handleErrorMessage = (message: string) => {
  errorMessage.value = message;
  setTimeout(() => {
    errorMessage.value = '';
  }, 3000);
} 
 const postPassword = async () => {
   const code = password.join('');
   emit('post-loading');
   try {
    const response = await fetch('/api/verify', {
      method: 'POST',
      body: JSON.stringify({code}),
    });
    const data = await response.json();
    if(data.valid && data.token){
      emit('getToken', data.token);
    } else {
      throw new Error('Error: post password failed');
    }
   } catch (error: any) {
    handleErrorMessage(error.message);
   } finally {
    emit('finish-loading');
    for(let i = 0; i < inputs.value.length; i++) {
      password[i] = null;
    }
    handleFocusByIndex(0)
   }
 }
onMounted(() => {
 // auto focus on first input
    handleFocusByIndex(0)
}); 
  
</script>

<template>
    <form>
      <div class="otp-container">
        <h3 class="otp-title">Enter verification</h3>
        <div class="input-group">
          <input v-for="(input, index) in password"
                 :key="`input_${index}`"
                 type="text"
                 class="input"
                 ref="inputs"
                 min="0"
                 max="9"
                 maxlength="1"
                 pattern="[0-9]"
                 :value="password[index]"
                 @keypress="handleOnValidate($event)"
                 @keyup="(event) => handleInput({event, index})"
                 @paste="handleOnPaste($event)"
                 >
        </div>
      </div>
      <span class="error__message">{{errorMessage}}</span>
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
.error__message {
  display: block;
  width: 100%;
  height: 2rem;
  color: tomato;
  text-align: center;
  font-weight: bolder;
  margin-top: 2rem;
}
</style>
