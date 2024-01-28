<template>
  <ul class="navMenu">
    <li
      v-for="(item, index, id) in homeMenu"
      :key="id"
      :class="active == index ? 'isActive' : ''"
      @click="clickActive(index)"
      >
        <router-link 
        :to="item.href" 
        class="hvr-underline-from-center">
          {{ item.title }}
        </router-link>
  </li>
</ul>
  <div>
    <el-row class="mb-4">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-row>

    <el-row class="mb-4">
      <el-button plain>Plain</el-button>
      <el-button type="primary" plain>Primary</el-button>
      <el-button type="success" plain>Success</el-button>
      <el-button type="info" plain>Info</el-button>
      <el-button type="warning" plain>Warning</el-button>
      <el-button type="danger" plain>Danger</el-button>
    </el-row>

    <el-row class="mb-4">
      <el-button round>Round</el-button>
      <el-button type="primary" round>Primary</el-button>
      <el-button type="success" round>Success</el-button>
      <el-button type="info" round>Info</el-button>
      <el-button type="warning" round>Warning</el-button>
      <el-button type="danger" round>Danger</el-button>
    </el-row>

    <el-row>
      <el-button :icon="Search" circle />
      <el-button type="primary" :icon="Edit" circle />
      <el-button type="success" :icon="Check" circle />
      <el-button type="info" :icon="Message" circle />
      <el-button type="warning" :icon="Star" circle />
      <el-button type="danger" :icon="Delete" circle />
    </el-row>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {Check,Delete,Edit,Message,Search,Star,} from '@element-plus/icons-vue'
import axios from 'axios'

const active = ref<number>(0)
const isActive = ref<boolean>(false)
const clickActive = (index: number) => {
  active.value = index
}
interface homeMenuType{
  id?: string;
  title?: string;
  href?: string;
}
const homeMenu = ref<homeMenuType[]>([
  {id:'teleport', title: 'Teleport', href: '/teleport' },
  { id: 'table1', title: 'Table1', href: '/table1' },
   { id: 'table2', title: 'Table2', href: '/table2' },

])

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
