import {createRouter, createWebHashHistory} from "vue-router";
import Profile from "@/components/Profile.vue";
import OptVerifyView from "@/views/OptVerifyView.vue";


export enum RouterName {
    Login = 'Login',
    Home = 'Home',
}

const routes = [
    { path: '/', component: OptVerifyView, name: RouterName.Login },
    { path: '/Home', component: Profile, name: RouterName.Home },
]


export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

