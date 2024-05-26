<template>
<div class="checkWork_area"> 
    <div class="search_bar_group">
         <el-button type="primary" @click="openPrint = true">列印</el-button>
        <el-button type="primary"> 導出Excel</el-button>
        <!--綁定input  v-model="searchQuery"-->
        <el-input 
        v-model="searchQuery" placeholder="search"/>
        <i class="icon-search"></i>
    </div>
    <!----table-->
<div class="check_table_area" id="printArea">
    <table class="table">
        <tr>
             <span @click="sortededItems">1</span>
             <th v-for="(item,thid) in tableHeader" :key="thid">
                {{item.subject}}
            </th>
        </tr>
        <tbody>
            <!--過濾以後才開始分頁排列-->
            <tr v-for="(item,index) in paginatedItems" :key="index">
    			<td>{{ Number(index+1 + startIndexValue) }}</td>
    			<td>{{ item.title }}</td>
    			<td>{{item.sourceWebName}}
                   
                    </td>
    			<td>{{ item.startDate}}</td>
                
            </tr>
        </tbody>
    </table>
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

             <Teleport  to="body">
                <div v-if="openPrint" class="modal">
                    <div class="modal-main">
                        <div class="modal-header">
                            <a @click="openPrint = false">
                                <i class="icon-cross"></i>
                            </a>
                        </div >
                        <div class="modal-body">
                         列印   <input v-model="printItem" @change="getPrintItem(printItem)"/>筆
                        </div>
                         <el-button type="primary" v-print="print">列印</el-button>
                    </div>
                </div>
             </Teleport>

</div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted, computed, watch, watchEffect } from 'vue';
import Pagination from '@/components/Pagination.vue';
import { useRouter } from 'vue-router';
const router = useRouter()

const openPrint = ref<boolean>(false);
const printItem= ref<number |any>(null);
const getPrintItem = (printItem: number) => {
    console.log('獲取到',printItem)
   changeItemsPerPage(printItem)
}
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
     { value: '1', label: '1筆' },
    { value: '2', label: '2筆' },
    { value: '3', label: '4筆' },
    { value: '5', label: '5筆' },
    { value: '6', label: '6筆' },
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
    { subject: '主題', thid: 'title', },
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
//const sortBy =ref<string>('')
const sortededItems = () => {
    //.slice()
    filteredItems.value.sort((a: any, b: any) =>
        //https://www.w3school.com.cn/jsref/jsref_localecompare.asp
        //  a.startDate.localeCompare(b.startDate)
        Number(a.startDate) > Number(b.startDate) ? 1 : -1
     //  a.sourceWebName.localeCompare(b.sourceWebName) ? 1 : -1
    )
}
//監聽數據
const search = ref('');
watch(search, (newValue, oldValue) => {
    console.log('watch search', newValue, oldValue)
})


// A搜尋功能過濾:綁定搜尋表單，使用computed（計算功能）如果搜尋表單沒有值＝>返回獲取到的陣列;如果有那就搜尋表單去除空白與大小寫 indexOf !==-1，返回它 並返回陣列
const filteredItems = computed(() => {
    let filteredItems = lists.value;
    if (searchQuery.value === '') {
        // return sortededItems(lists.value);
       return filteredItems;
    }
    searchQuery.value = searchQuery.value.trim().toLowerCase();
    filteredItems = filteredItems.filter(function (opt: listsType) {
        // indexOf !==-1 =>
        if (opt.title.toLowerCase().indexOf(searchQuery.value) !== -1 || opt.sourceWebName.toLowerCase().indexOf(searchQuery.value) !== -1) {
          //  if (filteredItems.length <= itemsPerPage.value) {
            return currentPage.value = 1;
            //   return opt;
          //  }       
            
        }
    })
    return filteredItems;
})

// watch(filteredItems.value, (newValue, oldValue) => {
//     console.log('watch search', newValue, oldValue)
// })
// watchEffect(() => {
//     console.log('watchEffect', lists.value, filteredItems.value)
// })

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

interface printType{
  url?: string |undefined,
  id: string |undefined,
  popTitle: string |undefined,
  extraHead: string |undefined,
  preview: boolean, 
  previewTitle: string |undefined,
  previewPrintBtnLabel: string |undefined,
  zIndex:number |null,
  previewBeforeOpenCallback(): void;
  previewOpenCallback(): void;
  beforeOpenCallback(): void;
  openCallback(): void;
  closeCallback(): void;
  clickMounted(): void;
 // asyncUrl(reslove:any, vue:any): void;
  standard: string |undefined,
  extarCss: string |undefined,
}
const msg = ref<string>('Welcome to Your Vue.js App');
const print =ref<printType>(
    {
      //  url: 'http://localhost:8080/',
        // asyncUrl (reslove:any, vue:any) {

        //         // setTimeout(() => {
        //         //   reslove('http://localhost:8080/')
        //         // }, 2000)
        // },
        id: 'printArea',
        popTitle: '配置页眉标题', // 打印配置页上方的标题
         extraHead: '<meta http-equiv="Content-Language"content="zh-tw"/>', // 最上方的头部文字，附加在head标签上的额外标签，使用逗号分割
        preview: true, // 是否启动预览模式，默认是false
        previewTitle: '員工設定列表', // 打印预览的标题
        previewPrintBtnLabel: '預覽後，開始打印', // 打印预览的标题下方的按钮文本，点击可进入打印
        zIndex: 20002, // 预览窗口的z-index，默认是20002，最好比默认值更高
        previewBeforeOpenCallback () { console.log('正在加载预览窗口！'); console.log(msg.value, this) }, // 预览窗口打开之前的callback
        previewOpenCallback () { console.log('已经加载完预览窗口，预览打开了！') }, // 预览窗口打开时的callback
        beforeOpenCallback () { console.log('开始打印之前！') }, // 开始打印之前的callback
        openCallback () { console.log('执行打印了！') }, // 调用打印时的callback
        closeCallback () { console.log('关闭了打印工具！') }, // 关闭打印的callback(无法区分确认or取消)
        clickMounted () { console.log('点击v-print绑定的按钮了！') },
        standard: '',
        extarCss: '',
        
    }
)
onMounted(() => {
    getItems();
})
</script>

<style lang="scss">
.previewBodyUtil{
 background: #ffff !important;
   
.previewBodyUtilPrintBtn{
    display: block;
    text-align: center;
    line-height: 30px;
    width: 150px!important;
    height: 30px!important;
    border-radius: 8px!important;
    padding:8px 14px;
    background: cornflowerblue !important;
    &:hover{
         background: rgb(54, 79, 125) !important;
    }
}
}
@media print {
/*最外层打印节点*/
  #printArea {
    display:block;
  //  height: auto;
    overflow: hidden;
    margin:0;
    height: 266.5mm;//采用默认页眉页脚时，单页内容大概长度，多页时倍数乘
  }
}
</style>



