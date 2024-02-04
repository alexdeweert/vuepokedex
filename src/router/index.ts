import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/HomePage.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/comparison/:pokemonOne/:pokemonTwo',
            name: 'comparison',
            component: () => import('@/components/PokemonComparison.vue')
        },
        {
            path: '/details/:pokemonId',
            name: 'details',
            component: () => import('@/components/PokemonDetails.vue')
        }
    ]
})

export default router
