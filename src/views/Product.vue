<template>
   
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute();
onMounted(() => {
    const id = route.params.id;
    console.log('讀取動態參數id',id)
})
</script>