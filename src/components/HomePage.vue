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
        />
        </div>
    </div>
</template>

<script setup lang="ts">
import AutoComplete, { type AutoCompleteCompleteEvent } from 'primevue/autocomplete'
import ProgressSpinner from 'primevue/progressspinner';
import { onMounted, ref, type Ref } from 'vue'
import { usePokemonStoreAlt } from '@/stores/pokemon'
let loading: Ref<boolean> = ref(true)
let searchItems: Ref<string[]> = ref([])
let searchValue: Ref<string> = ref('')
let possibleResults: Array<string> = []
let pokemonStore = usePokemonStoreAlt()
function search(event: AutoCompleteCompleteEvent) {
    searchItems.value = possibleResults.filter((thing) => {
        return thing.includes(event.query)
    })
}
onMounted(async () => {
    if(!pokemonStore.getPokemonCount) await pokemonStore.setPokemonResults()
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
