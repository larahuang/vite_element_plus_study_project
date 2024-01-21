<template>
    <div>
        <div>{{ title }}</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

    const title=ref<string>('Home')
</script>