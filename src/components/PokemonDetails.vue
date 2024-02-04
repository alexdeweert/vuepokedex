<template>
    <div v-if="pokemonId">PokemonDetails Works! {{ pokemonId }} - {{ pokemonStore.count }}</div>
    <button @click="pokemonStore.increment">Click me</button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePokemonStore } from '@/stores/pokemon'
const route = useRoute()
const pokemonId = computed(() => route.params.pokemonId)
const pokemonStore = usePokemonStore()
</script>

<style></style>
