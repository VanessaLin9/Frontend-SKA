import {defineStore} from "pinia";
import {reactive} from "vue";

export const useUserStore = defineStore('User', ()=> {
    const user = reactive({
        username: '',
        quote: '',
        photo: ''
    });

    const setUser = (u: {username: string, quote: string, photo: string}) => {
        console.log('pina-setUser', u);
        user.username = u.username;
        user.quote = u.quote;
        user.photo = u.photo;
    }
    
    const token = reactive({
        value: ''
    })
    
    return {
        user,
        token,
        setUser
    }
})