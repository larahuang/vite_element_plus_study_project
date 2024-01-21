<template>
  <div>
    <router-view></router-view>
    <a @click="addBlogItem">test</a>
    <ul>
      <li v-for="(item,UID) in lists" :key="UID">
       {{ UID +1 }} {{ item.title }}
      </li>
    </ul>


  </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue'
// import axios from 'axios'

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
    // 請求表頭
    let headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      //  Authentication: 'secret'
      //  "Authorization": `Bearer ${token}`,
    }
    const res = await fetch(api, { headers: headers, method: "GET" });
    //res.json() =>把資料轉成JSON格式
    lists.value = await res.json();
    console.log('lists.value', lists.value)
  } catch (error) {
    console.log(error)
  }
};
const addBlogItem = async () => {
  try {
    const api = `${import.meta.env.VITE_QUIZ_URL}/api/blog`

    let headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      //  "Authorization": `Bearer ${token}`,
    }
    //以下是API文件中提及必寫的主體参數
    let body = {
      "title": "Blog 1",
      "subTitle": "Blog 1 sub",
      "description": "description1"
    }
    fetch(api, {
      method: "POST",
      headers: headers,
      //別忘了把主體参數轉成字串，否則資料會變成[object Object]，它無法被成功儲存在後台
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(json => console.log('',json));
  }
  catch (error) {
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
