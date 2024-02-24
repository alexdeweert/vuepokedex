import type { PokemonDetails } from "@/types/pokemon-details";
import type { PokemonResults } from "@/types/pokemon-results";

class PokemonService {
    private readonly baseUrl: string = 'https://pokeapi.co/api/v2/pokemon'
    
    async fetchPokemonFromApi(numResults: number = 151): Promise<PokemonResults | undefined> {
        const response = await fetch(`${this.baseUrl}?limit=${numResults}`)
        return response.json() as Promise<PokemonResults>
    }

    async fetchPokemonDetailsFromApi(pokemonName: string): Promise<PokemonDetails> {
        const response = await fetch(`${this.baseUrl}/${pokemonName}`)
        return response.json() as Promise<PokemonDetails>
    }
}

export const pokemonService = new PokemonService()