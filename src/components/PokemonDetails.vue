<template>
    <div v-if="pokemonId">PokemonDetails Works! {{ pokemonId }} - {{ pokemonStore.count }}</div>
    <Button @click="pokemonStore.increment">Click me</Button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePokemonStore } from '@/stores/pokemon'
import Button from 'primevue/button'
const route = useRoute()
const pokemonId = computed(() => route.params.pokemonId)
const pokemonStore = usePokemonStore()
</script>

<style></style>
