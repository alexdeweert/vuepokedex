<template>
    <div class="nav-container">
        <nav>
            <ul>
                <li><Button link @click="navToHome" label="Home" /></li>
                <li><Button link @click="navToDetails" label="Details" /></li>
            </ul>
        </nav>
        <ToggleThemeButton></ToggleThemeButton>
    </div>
    <RouterView></RouterView>
</template>

<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import ToggleThemeButton from '@/components/ToggleThemeButton.vue'
import Button from 'primevue/button'
import { onMounted } from 'vue';
import { usePokemonStoreAlt } from './stores/pokemon';
const router = useRouter()
const pokemonStore = usePokemonStoreAlt()

function navToHome() {
    router.push({ name: 'home', params: {} })
}
function navToDetails() {
    router.push({ name: 'details', params: { pokemonId: 'venusaur' } })
}
onMounted(() => {
    console.log(`~~~ APP mounted - hydrating state`)
    pokemonStore.hydrateState()
})
</script>

<style scoped>
.nav-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
ul {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 0;
}

Button:focus {
    box-shadow: none;
}
</style>
