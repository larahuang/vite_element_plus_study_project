<template>
    <ul class="pagination">
        <li :disabled="currentPage === 1">
            <a @click="sendprevPage"><i class="icon-chevron-left-solid"></i></a>
        </li>
        <li v-for="(n, index ) in totalPages" :key="index" @click="sendItActive(n)"
            :class="{ 'active': n === currentPage }">
            <a> {{ n }}</a>
        </li>
        <li :disabled="currentPage === totalPages">
            <a @click="sendNextPage">
                <i class="icon-chevron-right-solid"></i>
            </a>
        </li>
        <li>共{{ totoItem }}筆</li>
        <li>
            <el-select 
            :model-value="pageValue"
            @update:model-value="$emit('update:pageValue', $event)"
             class="m-2" 
             placeholder="Select" 
             style="width: 240px"
                @change="sendOnChange($event)">
                <el-option v-for="item in pagePerOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineProps } from 'vue'
const props = defineProps({
    currentPage: { type: Number },
    totalPages: { type: Number },
    totoItem: { type: Number },
    pagePerOptions: Object,
    pageValue: { type: String },

})


const emits = defineEmits(['sendprevPage', 'sendNextPage', 'sendItActive', 'sendOnChange']);
const sendprevPage = () => {
    emits('sendprevPage',)
}
const sendNextPage = () => {
    emits('sendNextPage',)
}
const sendItActive = (page: number) => {
    emits('sendItActive', page)
}
const sendOnChange = (event: number) => {
    emits('sendOnChange', event)
}
</script>