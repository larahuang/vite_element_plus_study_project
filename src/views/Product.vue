<template>
   <div style="width:40%;max-width:40%;margin:auto">

   <div>{{ singleList.title }}</div>
  <img style="width:100%" :src="singleList.imageUrl" >
    <div>{{ singleList.location }}</div>
   </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { listType } from '@/types/productsType';
const route = useRoute();


const singleList = ref<any>('');
const filterItem = () => {
    if (lists.value.length != 0) {
        lists.value.filter((item: any) => {
            console.log('typeof item.UID', typeof item.UID)
            console.log('typeof route.params.id', typeof route.params.id)
            if (item.UID === route.params.id) {
                return singleList.value = item
            }
        })
    }
}
const lists = ref<listType[]>([]);
const getData = async () => {
    try {
        const api = `${import.meta.env.VITE_API_URL}/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=200`;
        await axios.get(api)
        const res = await axios.get(api);
        if (res.status === 200) {
            lists.value = res.data;
            filterItem();
           
        }

    } catch (error) {
        console.log(error)
    }

}

onMounted(() => {
    getData();
})
</script>
