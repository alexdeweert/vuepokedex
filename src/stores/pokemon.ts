import type { PokemonResults } from '@/types/pokemon-results'
import { defineStore } from 'pinia'
import { pokemonService } from '@/services/pokemon-service'

export interface PokemonStoreState {
    pokemonResults: PokemonResults | undefined
}
export const PokemonStoreLocalStorageKey = '_keyPokemonStore'

export const usePokemonStoreAlt = defineStore('pokemonAlt', {
    state: (): PokemonStoreState => ({
        pokemonResults: undefined
    }),
    getters: {
        getPokemonResults: (state: PokemonStoreState) => state.pokemonResults,
        getPokemonCount: (state: PokemonStoreState): number => state.pokemonResults?.results.length ?? 0,
    },
    actions: {
        async fetchPokemon() {
            const results = await pokemonService.fetchPokemonFromApi()
            if(results) {
                this.pokemonResults = results
                sessionStorage.setItem(PokemonStoreLocalStorageKey, JSON.stringify(this.$state))
            }
        },
        hydrateState() {
            const localStorageItem = sessionStorage.getItem(PokemonStoreLocalStorageKey)
            if(localStorageItem) {
                try {
                    this.$state = JSON.parse(localStorageItem) as PokemonStoreState
                }
                catch(err) {
                    if(err) console.error(`Error parsing localStorage item with key ${PokemonStoreLocalStorageKey}: ${err}`)
                }
            }
        }
    }
})