<template>
    <div class="container">
        <div v-if="loading">
            <ProgressSpinner/>
        </div>
        <div v-else>
            <AutoComplete
            v-model="searchValue"
            :suggestions="searchItems"
            @complete="search"
            :complete-on-focus="true"
            placeholder="Search"
            v-on:item-select="router.push(`/details/${$event.value}`)"
        />
        </div>
    </div>
</template>

<script setup lang="ts">
import AutoComplete, { type AutoCompleteCompleteEvent } from 'primevue/autocomplete'
import ProgressSpinner from 'primevue/progressspinner';
import { onMounted, ref, type Ref } from 'vue'
import { usePokemonStoreAlt } from '@/stores/pokemon'
import { useRouter } from 'vue-router';
let loading: Ref<boolean> = ref(true)
let searchItems: Ref<string[]> = ref([])
let searchValue: Ref<string> = ref('')
let possibleResults: Array<string> = []
let pokemonStore = usePokemonStoreAlt()
const router = useRouter()
function search(event: AutoCompleteCompleteEvent) {
    searchItems.value = possibleResults.filter((thing) => {
        return thing.includes(event.query)
    })
}
onMounted(async () => {
    console.log(`~~~ HOMEPAGE mounted`)
    //If no pokemon count, there aren't any loaded.
    //First try to de-serialized from localstorage.
    //If there are none, then do the network call, which will update the localstorage result.
    if(!pokemonStore.getPokemonCount) {
        console.log(`~~~ NO pokemon count - setting results by calling API`)
        await pokemonStore.fetchPokemon()
    }
    else {
        console.log(`~~~ had pokemon count, NOT DOING NETWORK CALL: ${pokemonStore.getPokemonCount}`)
    }
    pokemonStore.getPokemonResults?.results.map(result => possibleResults.push(result.name))
    loading.value = false
})
</script>

<style scoped>
.container {
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
}
</style>
