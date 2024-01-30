<template>
   <div>
    <div>{{ route.query?.UID }}</div>
     <div>{{ route.query?.title }}</div>
     <div>{{ route.query?.masterUnit[0]
          }}</div>
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