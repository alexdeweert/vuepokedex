<template>
    <div class="container">
        <AutoComplete
            v-model="searchValue"
            :suggestions="searchItems"
            @complete="search"
            placeholder="Search"
        />
    </div>
</template>

<script setup lang="ts">
import AutoComplete, { type AutoCompleteCompleteEvent } from 'primevue/autocomplete'
import { ref, type Ref } from 'vue'
let searchItems: Ref<string[]> = ref([])
let searchValue: Ref<string> = ref('')
let possibleResults = ['bulbasaur', 'pikachu', 'fart']
function search(event: AutoCompleteCompleteEvent) {
    searchItems.value = possibleResults.filter((thing) => {
        return thing.includes(event.query)
    })
}
</script>

<style scoped>
.container {
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
}
</style>
