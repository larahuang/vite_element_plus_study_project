<template>
   <div class="products">
    <div class="item"
    v-for="(item,index, UID) in lists" :key="UID">
      <a @click="openItem(item)"> <div class="card">
            <img :src="item.imageUrl">
{{ item.title }}
        </div></a> 
    </div>
   </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { listType } from '@/types/productsType';
const route = useRoute();
const router = useRouter()

const openItem = (item: any ) => {
    console.log(item.UID)
    router.push({
       // path: `/product/${item.UID}`,
        // query: item,
        name:'Product',
       params:{id:item.UID},
    })
}
const lists = ref<listType[]>([]);
const getData = async () => {
    try {
        const api = `${import.meta.env.VITE_API_URL}/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=200`;
        await axios.get(api)
        const res = await axios.get(api);
        console.log('culture', res.data, typeof res.data[0].masterUnit
            , 'otherUnit', typeof res.data[0].otherUnit, 'showInfos', typeof res.data[0].showInfo);
        if (res.status === 200) {
            lists.value = res.data;
        }

    } catch (error) {
        console.log(error)
    }

}
onMounted(() => {
    getData();
    const id = route.params.id;
    console.log('讀取動態參數id',id)
})
</script>