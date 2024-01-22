<template>
<div class="checkWork_area"> 
    <div class="search_bar_group">
        <button class="el-button el-button--primary"> 導出Excel</button>
        <!--綁定input  v-model="searchQuery"-->
        <input class="el-input__inner" 
        v-model="searchQuery" placeholder="search"/>
        <i class="icon-search"></i>
    </div>
    <!----table-->
<div class="check_table_area">
        <tr>
             <th v-for="(item,thid) in tableHeader" :key="thid">
                {{item.subject}}
            </th>
        </tr>
        <tbody>
            <!--過濾以後才開始分頁排列-->
            <tr v-for="(item,index) in paginatedItems" :key="index">
    			<td>{{ Number(index+1 + startIndexValue) }}</td>
    			<td>{{ item.title }}</td>
    			<td>{{item.sourceWebName}}</td>
    			<td>{{ item.startDate}}</td>
                
            </tr>
        </tbody>
    </div>

<!--Pagination-->
    <Pagination 
            :currentPage="currentPage" 
            :totalPages="totalPages" 
            :totoItem="filteredItems.length"
            :pagePerOptions="pagePerOptions"
            :pageValue="pageValue"
            @update:pageValue="pageValue = $event"
            @sendprevPage="prevPage" 
            @sendNextPage="nextPage"
            @sendItActive="itActive"
            @sendOnChange="changeItemsPerPage"
                 />
</div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import Pagination from '../components/Pagination.vue';
// 搜尋表單綁定
const searchQuery = ref<string>('');
// 當前頁面
const currentPage = ref<number>(1);
// 每頁幾筆
const itemsPerPage = ref<number>(10);
const changeItemsPerPage = (event: number) => {
    itemsPerPage.value = event;
}
const pagePerOptions = [
    { value: '10', label: '10筆' },
    { value: '15', label: '15筆' },
    { value: '20', label: '20筆' },
    { value: '30', label: '30筆' },
    { value: '40', label: '40筆' },
    { value: '50', label: '50筆' },
]
const pageValue = ref<string>('10筆');
interface tableHeaderType {
    subject?: string;
    thid?: string;
}
const tableHeader = ref<tableHeaderType[]>([
    { subject: '項目', thid: 'item' },
    { subject: '主題', thid: 'title' },
    { subject: '來源', thid: 'orange' },
    { subject: '開始時間', thid: 'startTime' }
])
// listType屬性
interface listsType {
    UID?: string;
    version?: string;
    category?: string;
    comment?: string;
    descriptionFilterHtml?: string;
    discountInfo?: string;
    editModifyDate?: string;
    hitRate?: number;
    imageUrl?: string;
    masterUnit?: object;
    title?: string | any;
    sourceWebName?: string | any;
    startDate?: string | any;
}
// 表格數據
const lists = ref<listsType[]>([]);
// A搜尋功能過濾:綁定搜尋表單，使用computed（計算功能）如果搜尋表單沒有值＝>返回獲取到的陣列;如果有那就搜尋表單去除空白與大小寫 indexOf !==-1，返回它 並返回陣列
const filteredItems = computed(() => {
    let filteredItems = lists.value;
    if (searchQuery.value === '') {
        return filteredItems;
    }
    searchQuery.value = searchQuery.value.trim().toLowerCase();
    filteredItems = filteredItems.filter(function (opt: listsType) {
        // indexOf !==-1 =>
        if (opt.title.toLowerCase().indexOf(searchQuery.value) !== -1 || opt.sourceWebName.toLowerCase().indexOf(searchQuery.value) !== -1) {
            return opt;
        }
    })
    return filteredItems;
})
// 索引數字
const startIndexValue = ref<number>(1);

// 總頁數
const totalPages = computed(() => {
    // B分頁總數=>過濾的總筆數除以每頁筆數，「無條件進位」＝>Math.ceil()：公式：Math.ceil（過濾的總筆÷每頁筆數）
    return Math.ceil(filteredItems.value.length / itemsPerPage.value);
})
// 分頁項目
const paginatedItems = computed(() => {
    // 當前頁面乘以每一頁減去每一頁
    const startIndex = currentPage.value * itemsPerPage.value - itemsPerPage.value;
    startIndexValue.value = startIndex;
    // 返回 => 搜尋後（過濾後）=>arr.slice([begin[, end]])回傳一個新陣列物件
    return filteredItems.value.slice(startIndex, startIndex + itemsPerPage.value);
})
// 上一頁
const prevPage = () => {
    // 如果當前頁面小於 < 1
    if (currentPage.value > 1) {
        currentPage.value--;
    }
}
// 下一頁
const nextPage = () => {
    // 如果當前頁面小於 < 全部頁面 ＝。那當前頁就能＋＋
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
}
// 點擊獲得第幾頁塞入當前頁面
const itActive = (page: number) => {
    // 如果當前頁面是null那當前頁面是第一頁,否則是點擊頁面
    page === null ? currentPage.value = 1 : currentPage.value = page;
}
// 獲取數據
const getItems = async () => {
    try {
        const api = 'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=200';
        const res = await axios.get(api);
        lists.value = res.data;
    }
    catch (err) {
        console.log('err', err);
    }
}
onMounted(() => {
    getItems();
})
</script>


