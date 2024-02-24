<template>
    <div v-if="pokemonId">
        PokemonDetails Works! {{ pokemonId }}
        <div v-if="pokemonDeets">{{ pokemonDeets.name }}</div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePokemonStoreAlt } from '@/stores/pokemon';
const route = useRoute()
const pokemonId = computed(() => route.params.pokemonId)
const pokemonDeets = computed(() => pokemonStore.getPokemonDetails(pokemonId.value as string))
const pokemonStore = usePokemonStoreAlt()
onMounted(() => {
    console.log(`~~~ DETAILS MOUNTED`)
    getOrFetchDetails()
})

async function getOrFetchDetails() {
    if(pokemonId.value && typeof pokemonId.value == 'string' && !pokemonDeets.value) {
        await pokemonStore.fetchPokemonDetails(pokemonId.value)
    }
}

//Display the store value or loading
</script>

<style></style>
