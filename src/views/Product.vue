<template>
   <div style="width:40%;max-width:40%;margin:auto">
    <div>ID{{ route.query?.UID }}</div>
   <img style="width:100%;max-width:100%" :src="route.query.imageUrl">
     <div>{{ route.query?.title }}</div>
     <div>{{ route.query.masterUnit[0]}}</div>
   </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute();
onMounted(() => {
    const id = route.params.id;
    console.log('讀取動態參數id', id)
    console.log('route.query.UID', route.query.UID)
})
</script>
