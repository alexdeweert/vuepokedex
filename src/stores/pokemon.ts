import type { PokemonResults } from '@/types/pokemon-results'
import { defineStore } from 'pinia'
import { computed, ref, type ComputedRef, type Ref } from 'vue'
import { pokemonService } from '@/services/pokemon-service'

export const usePokemonStore = defineStore('pokemon', () => {
    const pokemonResults = ref<PokemonResults | undefined>()
    const getPokemonStoreResultsCount: ComputedRef<number> = computed(() => pokemonResults.value ? pokemonResults.value.count : 0)
    async function getPokemonResults() {
        if(getPokemonStoreResultsCount.value) {
            return pokemonResults.value
        }
        const results = await pokemonService.getPokemonResults(10)
        pokemonResults.value = results
        return results
    }
    return { getPokemonResults, getPokemonStoreResultsCount }
})

export const usePokemonStoreAlt = defineStore('pokemonAlt', {
    state: () => ({
        pokemonResultsCount: 0,
        pokemonResults: undefined as PokemonResults | undefined
    }),
    getters: {
        getPokemonResults: (state) => state.pokemonResults,
        getPokemonCount: (state) => state.pokemonResultsCount
    },
    actions: {
        async setPokemonResults() {
            const results = await pokemonService.getPokemonResults(10)
            if(results) this.pokemonResultsCount = results.results.length
            this.pokemonResults = results
        }
    }
})