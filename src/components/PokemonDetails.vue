<template>
    <div v-if="pokemonId">
        <div v-if="pokemonStore.hasPokemonDetails(pokemonId) && pokemonDetails" :class="detailsClasses">
            <div class="image-wrapper">
                <h2>{{ pokemonNameAlt }}</h2>
                <Image :src="`${pokemonDetails.sprites.other['official-artwork'].front_default}`" :alt="`${pokemonNameAlt}`" preview></Image>
                <h4>Abilities</h4>
                <div class="abilities-etc">
                    <router-link v-for="ability in pokemonDetails.abilities"
                        :key="ability.ability.name"
                        :to="`/ability/${ability.ability.name}`"
                        class="link"
                    >
                            <Button :label="ability.ability.name" link></Button>
                    </router-link>
                </div>
                <h4>Types</h4>
                <div class="abilities-etc">
                    <router-link v-for="detailsType in pokemonDetails.types"
                        :key="detailsType.type.name"
                        :to="`/type/${detailsType.type.name}`"
                        class="link"
                    >
                            <Button :label="detailsType.type.name" link></Button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePokemonStoreAlt } from '@/stores/pokemonStore'
import Image from 'primevue/image'
import Button from 'primevue/button'
const route = useRoute()
const pokemonStore = usePokemonStoreAlt()
const pokemonId = computed(() => {
    return typeof route.params.pokemonId == 'string' ? route.params.pokemonId : undefined
})
const pokemonDetails = computed(() => {
    return pokemonId.value ? pokemonStore.getPokemonDetails(pokemonId.value) : undefined
})
const pokemonNameAlt = computed(() => {
    return pokemonDetails.value?.name.charAt(0).toUpperCase()?.concat(pokemonDetails.value?.name.substring(1))  ?? ''
})
const detailsClasses = computed(() => {
    return [
        'details-classes'
    ]
})
onMounted(() => {
    getOrFetchDetails()
})

async function getOrFetchDetails() {
    if(pokemonId.value) {
        await pokemonStore.fetchPokemonDetails(pokemonId.value)
    }
}

//Display the store value or loading
</script>

<style lang="scss">
.details-classes {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 3rem;
    width: 100%;
    .image-wrapper {
        width: 250px;
        h2 {
            text-align: center;
        }
        h4 {
            text-align: center;
            margin-bottom: 0px;
        }
        .p-image > img {
            width: 100%;
        }
        .abilities-etc {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            .link {
                padding-top: 0.5rem;
                &:not(:last-child) {
                    padding-right: 0.5rem;
                    padding-left: 0;
                }
                &:last-child {
                    padding-left: 0;
                    padding-right: 0;
                }
            }
            .p-button {
                padding: 0
            }
        }
    }
    
}
</style>