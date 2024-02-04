<template>
    <div v-if="pokemonOne && pokemonTwo">
        PokemonDetails Works! {{ pokemonOne }} vs {{ pokemonTwo }}
    </div>
</template>

<script lang="ts">
export default {
    name: 'PokemonComparison',
    computed: {
        pokemonOne() {
            return this.$route.params.pokemonOne
        },
        pokemonTwo() {
            return this.$route.params.pokemonTwo
        }
    }
}
</script>

<style></style>
