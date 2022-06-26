import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import LoginPage from './components/Login/LoginPage.vue'
import UpdateDetails from "./components/UpdateDetails/UpdateDetails.vue";
const options = {
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/login', component: LoginPage },
        { path: '/myProfile', component: UpdateDetails }

    ]
}

export const router = createRouter(options)
