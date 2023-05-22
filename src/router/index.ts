import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import bigWheel from '../components/bigWheel.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },{
        path: '/bigWheel',
        name: 'bigWheel',
        component: bigWheel
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})