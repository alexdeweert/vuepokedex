<template>
    <div v-if="pokemonId">
        <div v-if="pokemonStore.hasPokemonDetails(pokemonId) && pokemonDetails">
            {{ pokemonDetails.name }}
            <Image width="250" :src="`${pokemonDetails.sprites.other['official-artwork'].front_default}`" :alt="`${pokemonNameAlt}`" preview></Image>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePokemonStoreAlt } from '@/stores/pokemonStore'
import Image from 'primevue/image'
const route = useRoute()
const pokemonId = computed(() => {
    return typeof route.params.pokemonId == 'string' ? route.params.pokemonId : undefined
})
const pokemonDetails = computed(() => {
    return pokemonId.value ? pokemonStore.getPokemonDetails(pokemonId.value) : undefined
})
const pokemonStore = usePokemonStoreAlt()
const pokemonNameAlt = computed(() => {
    return pokemonDetails.value?.name.charAt(0).toUpperCase()?.concat(pokemonDetails.value?.name.substring(1))  ?? ''
})
onMounted(() => {
    getOrFetchDetails()
})

async function getOrFetchDetails() {
    if(pokemonId.value) {
        await pokemonStore.fetchPokemonDetails(pokemonId.value)
    }
}

//Display the store value or loading
</script>

<style></style>
@/stores/pokemonStore