<template>
    <div class="nav-container">
        <nav>
            <ul>
                <li><Button link @click="navToHome" label="Home" /></li>
                <li><Button link @click="navToDetails" label="Details" /></li>
            </ul>
        </nav>
        <Button link icon="pi pi-moon" @click="toggleTheme" />
    </div>
    <RouterView></RouterView>
</template>

<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { usePrimeVue } from 'primevue/config'
import { onMounted, ref } from 'vue'
import Button from 'primevue/button'
const darkMode = ref(false)
const PrimeVue = usePrimeVue()
const router = useRouter()
enum ThemeNames {
    LaraDarkIndigo = 'lara-dark-indigo',
    LaraLightIndigo = 'lara-light-indigo'
}
onMounted(() => {
    //When app is loaded just set them from light to light (there was no from theme unless we fetch it from state/localstorage)
    PrimeVue.changeTheme(
        ThemeNames.LaraLightIndigo,
        ThemeNames.LaraLightIndigo,
        'theme-link',
        () => {}
    )
})
function toggleTheme() {
    console.log('thing')
    PrimeVue.changeTheme(
        darkMode.value ? ThemeNames.LaraDarkIndigo : ThemeNames.LaraLightIndigo,
        darkMode.value ? ThemeNames.LaraLightIndigo : ThemeNames.LaraDarkIndigo,
        'theme-link',
        () => {}
    )
    darkMode.value = !darkMode.value
}
function navToHome() {
    router.push({ name: 'home', params: {} })
}
function navToDetails() {
    router.push({ name: 'details', params: { pokemonId: 'turd1' } })
}
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
