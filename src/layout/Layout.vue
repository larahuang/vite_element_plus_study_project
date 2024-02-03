<template>
    <div class="w-fill">
        <div class="w-fill front">
            <Nav 
            :active="active" 
            :isActive ="isActive" 
            :homeMenu="homeMenu"
            @sendClickActive="clickActive"
            />
            <router-view />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Nav from "../components/Nav.vue";
import { homeMenuType } from "@/types/navMenuType";

const active = ref<number>(0)
const isActive = ref<boolean>(false)
const clickActive = (index: number) => {
    active.value = index
}

const homeMenu = ref<homeMenuType[]>([
    { id: 'home', title: 'Home', href: '/' },
    { id: 'teleport', title: 'Teleport', href: '/teleport' },
    { id: 'table1', title: 'Table1', href: '/table1' },
    { id: 'table2', title: 'Table2', href: '/table2/1' },
    { id: 'products', title: 'products', href: '/products' },
])

</script>
