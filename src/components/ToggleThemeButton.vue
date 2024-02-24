<template>
    <Button v-if="interfaceStore.isDarkMode" link icon="pi pi-sun" @click="toggleTheme" />
    <Button v-else link icon="pi pi-moon" @click="toggleTheme" />
</template>

<script lang="ts" setup>
import { useInterfaceStore } from '@/stores/interfaceStore'
import Button from 'primevue/button'
import { usePrimeVue } from 'primevue/config'
import { onMounted } from 'vue';
const PrimeVue = usePrimeVue()
const interfaceStore = useInterfaceStore()
enum ThemeNames {
    LaraDarkIndigo = 'lara-dark-indigo',
    LaraLightIndigo = 'lara-light-indigo'
}
onMounted(() => {
    interfaceStore.hydrateState()
    setThemeBasedOnState()
})
function toggleTheme() {
    interfaceStore.toggleDarkMode()
    setThemeBasedOnState()
}
function setThemeBasedOnState() {
    PrimeVue.changeTheme(
        interfaceStore.isDarkMode ? ThemeNames.LaraLightIndigo : ThemeNames.LaraDarkIndigo,
        interfaceStore.isDarkMode ? ThemeNames.LaraDarkIndigo : ThemeNames.LaraLightIndigo,
        'theme-link',
        () => {}
    )
}
</script>

<style lang="scss">
Button:focus {
    box-shadow: none;
}
</style>