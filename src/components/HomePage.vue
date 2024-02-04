<template>
    <div>{{ name }} works!!!</div>
    <Button>Click me</Button>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
let name = 'Poop'
let data: Array<string> = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
]
</script>

<style scoped></style>
