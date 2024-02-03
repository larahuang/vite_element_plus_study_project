<template>
    <div class="w-fill">
        <div class="w-fill">
            <header class="adminNav">
               <Nav 
               :showAdminBg="showAdminBg"
               :active="active" 
                :isActive ="isActive" 
                :homeMenu="homeMenu"
                @sendClickActive="clickActive"
               />
            </header>
            <div class="w-fill admin">
                <div class="left">
                    <LeftNavBar />
                </div>
                <div class="rightContent">
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import Nav from "../components/Nav.vue"
import LeftNavBar from "../components/LeftNavBar.vue";
import { homeMenuType } from "@/types/navMenuType";
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

</script>
