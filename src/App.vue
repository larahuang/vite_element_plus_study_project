<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue'
import axios from 'axios'

interface listType {
  UID?: string;
  category?: string;
  comment?: string;
  descriptionFilterHtml?: string;
  discountInfo?: string | any;
  editModifyDate?: string;
  endDate?: string;
  hitRate?: number;
  imageUrl?: string;
  masterUnit?: object;
  otherUnit?: object;
  showInfo?: object;
  showUnit?: string;
  sourceWebName?: string | any;
  sourceWebPromote?: string;
  startDate?: string | any;
  subUnit?: object;
  supportUnit?: object;
  version?: string;
  title?: string | any;
  webSales?: string;
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
})
</script>



<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
