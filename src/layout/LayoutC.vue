<template>
    <div class="w-fill">
        <div class="w-fill">
            <header class="adminNav">
                <div class="logo">
                    <img src="../../public/vite.svg"/>
                </div>
               <Nav 
               :showAdminBg="showAdminBg"
               :active="active" 
                :isActive ="isActive" 
                :homeMenu="homeMenu"
                @sendClickActive="clickActive"
               />
            </header>
            <div class="w-fill admin">
                <div class="side left">
                <Side
                    :sideLists="sideLists"
                    :active="activeSide" 
                    :isActive ="isActiveSide" 
                    @sendClickActive="clickActiveSide"
                />
                </div>
                <div class="rightContent">
                    <div class="horizontal_menu">
                        <ul class="horizontalNav">
                            <li v-for="item in homeItem" :key="item.title">
                                <router-link :to="item.href">{{ item.title }} </router-link>
                            </li>
                        </ul>
                        <!--
                        <ul class="horizontalNav">
                            <li v-for="item in horizontalfilter" :key="item.title">
                                <router-link :to="item.href">
                                    {{ item.title }} 
                                    <i class="icon-cross"
                                    @click="deleteHorizontalNav(item.title)"></i>
                                </router-link>   
                            </li>
                        </ul>

-->
<swiper
        :modules="modules"
        :slides-per-view="3"
        :space-between="10"
        :loop="false"
        :autoplay="false"
       
        @swiper="onSwiper"
        @slideChange="onSlideChange"
    >
        <swiper-slide v-for="item in horizontalfilter" :key="item.title">
            <a :href="item.href">{{ item.title }}  
                <i class="icon-cross"
                     @click.prevent="deleteHorizontalNav(item.title)">
                </i>
            </a>
        </swiper-slide>
    </swiper>

                    </div>
  
    
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed ,onMounted} from "vue"
import { useRouter } from 'vue-router'

import Nav from "../components/Nav.vue"
import Side from "../components/otherSide.vue";
import { homeMenuType } from "@/types/navMenuType";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation, Scrollbar }from 'swiper/modules'; 
    const router = useRouter()
    
    const active = ref<number>(0)
    const isActive = ref<boolean>(false)
    const clickActive = (index: number) => {
        active.value = index
    }
    const showAdminBg = ref<boolean>(true);
    const homeMenu = ref<homeMenuType[]>([
        { id: 'home', title: 'User', href: '/teleport' },
        { id: 'setup', title: '登出', href: '/teleport' },
    
    ])
    interface horizontalNavType{
        id:string,
        title:string |any ,
        href:string | any,   
    }
    const horizontal=ref<horizontalNavType[]>([]);
    const horizontalfilter=ref<horizontalNavType[]>([]);
    //過濾掉重複
    const horizontalfilterFormat =(horizontal:any) =>{
        let filteredItems = horizontal;
        const getResult: any[] = [];
        filteredItems.forEach((item:any) => {   
            if (!getResult.find((r: { title: string; })=> r.title === item.title)) {
                getResult.push(item);
                localStorage.setItem('horizontalFilter',JSON.stringify( getResult)) ;        
            } 
        })
    }
    const modules = [Autoplay, Pagination, Navigation, Scrollbar]
    const onSwiper = (swiper:any) => {
        console.log(swiper);
    };
    const onSlideChange = () => {
        console.log('slide change');
    };

    // 點擊左邊菜單新增到使用頁眉
    const clickActiveSide = (i: horizontalNavType) => {
        activeSide.value = i.id;
      try{
        let query: any={
            id:i.id,
            title:i.title,
            href:i.href
        }  
        if(JSON.parse(localStorage.getItem('horizontalFilter')as string)!=null){
            let get =JSON.parse(localStorage.getItem('horizontalFilter')as string);
            horizontal.value=get;
        }
        horizontal.value.push(query);
        horizontalfilterFormat(horizontal.value) 
        horizontalfilter.value= JSON.parse(localStorage.getItem('horizontalFilter')as string);
      }
      catch(err){
        console.log(err)
      }
    }
   
    const deleteHorizontalNav =(title:any |string)=>{
        const lists =JSON.parse(localStorage.getItem('horizontalFilter')as string);
        if(lists.length>0 ){
            lists.splice(title,1);
            localStorage.setItem('horizontalFilter', JSON.stringify(lists)) ;  horizontalfilter.value= JSON.parse(localStorage.getItem('horizontalFilter')as string);
        }else{
            router.push({ path: '/admin'})
        }
    }
    const activeSide = ref<string>('')
    const isActiveSide = ref<boolean>(false);
    interface sideListType{
        id:string,
        title:string,
        icon:string,
        children:object,
    }
    const sideLists=ref<sideListType[]>([
            {   
                id:'001',
                title: "建檔設定",
                icon:"fa-solid fa-address-book",
                children: [
                    {id:'001-1',title: "工程資料建檔",href:"/one"},
                    {id:'001-2',title: "供料資料建檔",href:"/two"},
                    {id:'001-3',title: "零用金存入",href:"/three"},
                    {id:'001-4',title: "完工日期批次異動",href:"/four"},
                    {id:'001-5',title: "工料類別建檔",href:"/five"},
                    {id:'001-6',title: "菜購合約建檔",href:"/six"},
                    {id:'001-7',title: "人員設定作業",href:"/el"},
                    {id:'001-8',title: "部門類別建檔",href:"/eight"},
                    {id:'001-9',title: "工種資料建檔",href:"/night"},
                    {id:'001-10',title: "假日匯入Excel",href:"ten"},
                    {id:'001-11',title: "工作日誌建檔",href:""},
                    {id:'001-12',title: "業主資料建檔",href:""},
                ],
            },
            {
            id:'002',
            title: "資料查詢",
            icon:"fa-solid fa-magnifying-glass",
                children: [
                {id:'002-1',title: " 業主資料查詢",href:""},
                {id:'002-2',title: "工程資料查詢",href:""},
                {id:'002-3',title: "採購合約查詢",href:""},
                {id:'002-4',title: "合約餘額查詢",href:""},
                {id:'002-5',title: "廠商資料查詢",href:""},
                {id:'002-6',title: "廠商保留款查詢",href:""},
                {id:'002-7',title: "預約款作業查詢",href:""},
                {id:'002-8',title: "報價作業查詢",href:""},
                {id:'002-9',title: "請款作業查詢",href:""},
                {id:'002-10',title: "應收總表查詢",href:""},
                {id:'002-11',title: "詢價作業查詢",href:""},
                {id:'002-12',title: "請購作業查詢",href:""},
                {id:'002-13',title: "採購作業查詢",href:""},
                {id:'002-14',title: "發包作業查詢",href:""},
                {id:'002-15',title: "發包估驗查詢",href:""},
                {id:'002-16',title: "應付總表查詢",href:""},
                {id:'002-17',title: "工作日誌查詢",href:""},
                {id:'002-18',title: "點工作業查詢",href:""},
                {id:'002-19',title: "工種進度查詢",href:""},
                {id:'002-20',title: "雜支作業查詢",href:""},
                {id:'002-21',title: "員工借之查詢",href:""},
                {id:'002-22',title: "零用金餘額",href:""},
            ]
            },
            //<i class="fa-solid fa-pager"></i>
            {
            id:'003',
            title: "統計報表",
            icon:"fa-solid fa-pager",
                children: [
                    {id:'003-1',title:  "進項發票明細表",href:""},
                    {id:'003-2',title: "銷項發票明細表",href:""},
                    {id:'003-3',title: "業主對帳單",href:""},
                    {id:'003-4',title: "業主保留單",href:""},
                    {id:'003-4',title: "工程合約採購明細",href:""},
                    {id:'003-5',title: "工程交叉分析報告",href:""},
                    {id:'003-6',title: "廠商別-已付帳款",href:""},
                    {id:'003-7',title: "業主別-已付帳款",href:""},
                    {id:'003-8',title: "應收帳齡分析",href:""},
                    {id:'003-9',title: "應收帳齡分析",href:""},
                    {id:'003-10',title: "工程別採購分析",href:""},
                    {id:'003-11',title: "工料別採購分析",href:""},
                    {id:'003-12',title: "日期別採購分析",href:""},
                    {id:'003-13',title: "採購交貨明細表",href:""},
                    {id:'003-14',title: "工程採發明細表",href:""},
                    {id:'003-15',title: "工程預算總表",href:""},
                    {id:'003-16',title: "工程外包明細表",href:""},
                    {id:'003-17',title: "工程外包彙總表",href:""},
                    {id:'003-18',title:"發包交期分析",href:""},
                    {id:'003-19',title: "工作別發包分析",href:""},
                    {id:'003-20',title: "工程估驗分析",href:""},
                    {id:'003-21',title: "廠商估驗請款單",href:""},
                    {id:'003-22',title: "採購發包合約明細",href:""},
                    {id:'003-23',title: "工程損益站暫估",href:""},
                    {id:'003-24',title: "工程日誌報表",href:""},
                    {id:'003-25',title: "工程費用彙總表",href:""},
                    {id:'003-26',title: "工料庫存表",href:""},
                    {id:'003-27',title: "工料分類明細表",href:""},
                    {id:'003-28',title: "工程工資彙總表",href:""},
                    {id:'003-29',title: "工程工資明細表",href:""},
                    {id:'003-30',title: "工人月份統計表",href:""},
                    {id:'003-31',title: "工人出勤明細表",href:""},
                    {id:'003-32',title: "業主標籤列印",href:""},
                    {id:'003-33',title: "工程標籤列印",href:""},
                    {id:'003-34',title: "廠商標籤列印",href:""},
                ],
            },
            //<i class="fa-solid fa-calculator"></i>
            {
                id:'004',
                title: "會計傳輸",
                icon:"fa-solid fa-calculator",
                children: [
                    {id:'004-1',title: "傳票資料建檔",href:""},
                    {id:'004-2',title: "傳票複合作業",href:""},
                    {id:'004-3',title: "日記帳作業",href:""},
                    {id:'004-4',title: "明細分類帳",href:""},
                    {id:'004-5',title: "總分類帳",href:""},
                    {id:'004-6',title: "收入統計作業",href:""},
                    {id:'004-7',title: "費用統計作業",href:""},
                    {id:'004-8',title: "多區間損益表",href:""},
                    {id:'004-9',title: "立沖科目餘額表",href:""},
                    {id:'004-10',title: "立沖科目明細表",href:""},
                    {id:'004-11',title: "試算表作業",href:""},
                    {id:'004-12',title: "損益表作業",href:""},
                    {id:'004-13',title: "資產負債表（報表式）",href:""},
                    {id:'004-14',title: "資產負債表（帳戶式）",href:""},
                    {id:'004-15',title: "現金部作業",href:""},
                    {id:'004-16',title: "現金流量-公式設定",href:""},
                    {id:'004-17',title: "現金流量-分析報表",href:""},
                    {id:'004-18',title: "多部門損益表",href:""},
                    {id:'004-19',title: "成本-公式設定",href:""},
                    {id:'004-20',title: "成本-明細表",href:""},
                ],
            },
            //<i class="fa-solid fa-file-invoice"></i>
            {
                id:'005',
                title: "票據/開帳",
                icon:"fa-solid fa-file-invoice",
                children: [
                {id:'005-1',title: "應收票據建檔",href:""},
                {id:'005-2',title: "應收票據託收",href:""},
                {id:'005-3',title: "應收票據異動",href:""},
                {id:'005-4',title: "應收票據明細",href:""},
                {id:'005-5',title: "應收票齡分析",href:""},
                {id:'005-6',title: "應付據建檔",href:""},
                {id:'005-7',title: "支票列印及領取",href:""},
                {id:'005-8',title: "應付票據異動",href:""},
                {id:'005-9',title: "應付票據明細",href:""},
                {id:'005-10',title: "銀行存提管作業",href:""},
                {id:'005-11',title: "帳戶轉帳作業",href:""},
                {id:'005-12',title: "帳戶匯入作業",href:""},
                {id:'005-13',title: "帳戶匯出作業",href:""},
                {id:'005-14',title: "帳戶收支明細",href:""},
                {id:'005-15',title: "銀行資金預估",href:""},
                {id:'005-16',title: "全省銀行建檔",href:""},
                {id:'005-17',title: "往來銀行建檔",href:""},
                {id:'005-18',title: "預收餘額開帳",href:""},
                {id:'005-19',title: "預付餘額開帳",href:""},
                {id:'005-20',title: "員工借支開帳",href:""},
                {id:'005-21',title: "銀行存款開帳",href:""},
                {id:'005-22',title: "應收帳戶開帳",href:""},
                {id:'005-23',title: "應付帳戶開帳",href:""},
                {id:'005-24',title: "在建成本開帳",href:""},
                {id:'005-25',title: "常用分類建檔",href:""},
                {id:'005-26',title: "科目類別建檔",href:""},
                {id:'005-27',title: "科目建檔作業",href:""},
                ],
            },
            //<i class="fa-solid fa-list-ul"></i>
            //<i class="fa-brands fa-stack-overflow"></i>
            //<i class="fa-solid fa-layer-group"></i>
            {
                id:'006',
                title: "進銷存",
                icon:"fa-solid fa-layer-group",
                children: [
                {id:'006-1',title: "報價作業系統",href:""},
                {id:'006-2',title: "訂單作業系統",href:""},
                {id:'006-3',title: "銷貨作業系統",href:""},
                {id:'006-4',title: "採購作業系統",href:""},
                {id:'006-5',title: "進貨作業系統",href:""},
                {id:'006-6',title: "領科作業系統",href:""},
                {id:'006-7',title: "入庫作業系統",href:""},
                {id:'006-8',title: "盤點作業系統",href:""},
                {id:'006-9',title: "調整作業系統",href:""},
                {id:'006-10',title: "倉庫作業系統",href:""},
                {id:'006-11',title: "期出庫存開帳",href:""},
                {id:'006-12',title: "銷貨資料查詢",href:""},
                {id:'006-13',title: "業主別-已收帳款",href:""},
                {id:'006-14',title: "日期別-已收帳款",href:""},
                {id:'006-15',title: "進貨資料查詢",href:""},
                {id:'006-16',title: "廠商別-已付帳款",href:""},
                {id:'006-17',title: "日期別-已付帳款",href:""},
                {id:'006-18',title: "工料別-庫存成本表",href:""},
                {id:'006-19',title: "工料異動明細表",href:""},
                {id:'006-20',title: "倉庫別庫存表",href:""},
                {id:'006-21',title: "日期別庫存表",href:""},
                ],
            },
            //<i class="fa-regular fa-circle"></i>
            //<i class="fa-regular fa-address-card"></i>
            //<i class="fa-brands fa-slack"></i>
            {
                id:'007',
                title: "客戶自訂",
                icon:"fa-brands fa-slack",
                children: [
                {id:'007-1',title: "客戶自訂",href:""},
                {id:'007-3',title: "客戶自訂",href:""},
                {id:'007-4',title: "客戶自訂",href:""},
                ],
            },
            {
                id:'008',
                title: "列印管理",
                icon:"fa-solid fa-print",
                children: [
                {id:'008-1',title: "列印",href:"/print"},
              
                ],
            },
            
    ]);
    const homeItem =ref<any[]>([])
    // 打開時 讓選單可以出現首頁
    const homeBtn=()=>{
        const query={
            id:'home',
            title:'首頁',
            href:'/admin',
        }
        homeItem.value.push(query);   
    }
    onMounted(() => {
        homeBtn();
       localStorage.removeItem('horizontalFilter')
    });
</script>


<style lang="scss">
.swiper{
    margin-left: 15px;
    overflow: visible;
    display: flex;
    align-items: center;
    &.swiper-horizontal{
        text-align: left;
        margin-left: 45px;
    }
    .swiper-wrapper{
        display: flex;
        justify-content: flex-start;
        overflow: visible;
            align-items: center;
        .swiper-slide{
            width: auto!important;background-color: cornflowerblue;
            color: white;
            overflow: visible;
            display: flex;
            align-items: center;
            padding-left: 8px;
            padding-right: 8px;
            border-radius: 7px;
            height: 38px;
            a{
                color: white;
                display: flex;
                align-items: center;
                .icon-cross{
                    margin-left: 5px;
                }
            }
        }
    }
}


</style>