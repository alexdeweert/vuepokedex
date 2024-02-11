<template>
    <div v-if="pokemonId">PokemonDetails Works! {{ pokemonId }}</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const pokemonId = computed(() => route.params.pokemonId)
</script>

<style></style>
