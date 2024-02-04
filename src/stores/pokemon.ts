import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const usePokemonStore = defineStore('pokemon', () => {
    const count = ref(0)
    const getCount = computed(() => count)
    function increment(): number {
        return count.value++
    }

    return { count, getCount, increment }
})
