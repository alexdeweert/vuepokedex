import type { PokemonResults } from '@/types/pokemon-results'
import { defineStore } from 'pinia'
import { pokemonService } from '@/services/pokemon-service'
import type { PokemonDetails } from '@/types/pokemon-details'

interface PokemonDetailsMap {
    [key: string] : PokemonDetails
}
export interface PokemonStoreState {
    pokemonResults: PokemonResults | undefined,
    pokemonDetails: PokemonDetailsMap,
    pokemonDetailsPostfixKeys: Set<string>
}
export const PokemonResultsLocalStorageKey = '_keyPokemonResultsStore'
export const PokemonDetailLocalStorageKeyPrefix = '_keyPokemonDetails#'
export const PokemonDetailsPostfixKeys = '_keyPokemonDetailsPostfixes'

export const usePokemonStoreAlt = defineStore('pokemonAlt', {
    state: (): PokemonStoreState => ({
        pokemonResults: undefined,
        pokemonDetails: {},
        pokemonDetailsPostfixKeys: new Set<string>()
    }),
    getters: {
        getPokemonResults: (state: PokemonStoreState) => state.pokemonResults,
        getPokemonCount: (state: PokemonStoreState): number => state.pokemonResults?.results.length ?? 0,
        getPokemonDetails: (state: PokemonStoreState) => {
            return (pokemonName: string): PokemonDetails | undefined => {
                if( pokemonName in state.pokemonDetails ) {
                    return state.pokemonDetails[pokemonName]
                }
            }
        },
        hasPokemonDetails: (state: PokemonStoreState) => {
            return (pokemonName: string): boolean => {
                return pokemonName in state.pokemonDetails
            }
        }
    },
    actions: {
        async fetchPokemon() {
            const results = await pokemonService.fetchPokemonFromApi()
            if(results) {
                this.pokemonResults = results
                localStorage.setItem(PokemonResultsLocalStorageKey, JSON.stringify(results))
            }
        },
        async fetchPokemonDetails(name: string) {
            if(this.hasPokemonDetails(name)) {
                console.log(`fetchPokemonDetails() => Already HAVE stored pokemon details for ${name}`)
                return
            }
            console.log(`fetchPokemonDetails() =>  Need to FETCH pokemon details for ${name} from API!`)
            const results = await pokemonService.fetchPokemonDetailsFromApi(name)
            if(results) {
                this.pokemonDetails[name] = results
                this.pokemonDetailsPostfixKeys.add(name)
                localStorage.setItem(PokemonDetailLocalStorageKeyPrefix.concat(name), JSON.stringify(results))
                localStorage.setItem(PokemonDetailsPostfixKeys, JSON.stringify(Array.from(this.pokemonDetailsPostfixKeys.values())))
            }
        },
        hydrateState() {
            //Fetch the entire 151 pokemon list from local storage and hydrate into state
            //This is unrelated to the individually stored pokemon details
            const localStorageResultsItem = localStorage.getItem(PokemonResultsLocalStorageKey)
            if(localStorageResultsItem) {
                try {
                    this.pokemonResults = JSON.parse(localStorageResultsItem) as PokemonResults
                }
                catch(err) {
                    if(err) console.error(`Error parsing localStorage item with key ${PokemonResultsLocalStorageKey}: ${err}`)
                }
            }

            //Fetch and parse the pokemon postfixes from localstorage
            const localStoragePokemonPostfixes = localStorage.getItem(PokemonDetailsPostfixKeys)
            if(localStoragePokemonPostfixes) {
                try {
                    const postfixArray = JSON.parse(localStoragePokemonPostfixes) as Array<string>
                    this.pokemonDetailsPostfixKeys = new Set(postfixArray)
                }
                catch(err) {
                    if(err) console.error(`Error parsing localStorage item with key ${PokemonDetailsPostfixKeys}: ${err}`)
                }
            }

            //Use the hydrated prefix results to fetch the existing pokemon details from local storage
            this.pokemonDetailsPostfixKeys.forEach((postfixKey) => {
                const detailsKey = PokemonDetailLocalStorageKeyPrefix.concat(postfixKey)
                try {
                    const details = localStorage.getItem(detailsKey)
                    if(details) {
                        this.pokemonDetails[postfixKey] = JSON.parse(details) as PokemonDetails
                    }
                }
                catch(err) {
                    if(err) console.error(`Error parsing localStorage item with key ${detailsKey}: ${err}`)
                }
            })
        }
    }
})