<template>
   <div class="single_content">
   <div>{{ singleList.title }}</div>
  <img :src="singleList.imageUrl" >
    <div>{{ singleList.location }}</div>
   
    <div>開始時間：{{ singleList.startDate }}</div>
    <div>結束時間：{{ singleList.endDate }}</div>
     <div>描述：{{ singleList.descriptionFilterHtml }}</div>
     <div>主辦單位：{{ singleList.sourceWebName }}</div>
     <div>社群：{{ singleList.sourceWebPromote }}</div>
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
                return singleList.value = item;
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


<style lang="scss">
.single_content{
    width:40%;
    max-width:40%;
    margin:auto;
    img{
        width: 100%;
        max-width: 100%;
    }
}
</style>