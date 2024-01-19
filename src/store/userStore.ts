import {defineStore} from "pinia";
import {reactive} from "vue";

export const useUserStore = defineStore('User', ()=> {
    const user = reactive({
        username: '',
        quote: '',
        photo: ''
    });

    const token = reactive({
        value: ''
    })
    const setUser = (u: {username: string, quote: string, photo: string}) => {
        user.username = u.username;
        user.quote = u.quote;
        user.photo = u.photo;
    }
    
    const setToken = (t: {value: string}) => token.value = t.value;
    
    return {
        user,
        token,
        setUser,
        setToken
    }
})