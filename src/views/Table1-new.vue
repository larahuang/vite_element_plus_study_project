<template>
    <div class="app-container">
        <div>
            <el-input v-model="searchInput" placeholder="search"
                class="search-bar" :prefix-icon="Search" :disabled="loading" @keyup.enter="searchTags('search')" />
            <el-button type="primary" :disabled="loading" @click="searchTags('search')">
            search
            </el-button>
        </div>

        <el-table v-loading="loading" :data="pagedTableData" border fit highlight-current-row style="wempnoth: 100%"
            @sort-change="sortChange">
            <el-table-column wempnoth="80" align="center" label="項目" prop="empno">
                <template v-slot="{ row }">
                    <span>{{ row.empno }}</span>
                </template>
            </el-table-column>

            <el-table-column wempnoth="160" align="center" label="推薦" prop="isRecommended"
                sortable="custom">
                <template v-slot="{ row }">
                    <el-switch v-model="row.isRecommended.value" :disabled="!row.edit" class="ml-2" />
                </template>
            </el-table-column>

            <el-table-column wempnoth="120" align="center" label="姓名" prop="empname" sortable="custom">
                <template v-slot="{ row }">
                    <template v-if="row.edit">
                        <el-input v-model="row.empname.value" class="edit-input" size="small" />
                    </template>
                    <span v-else>{{ row.empname?.value }}</span>
                </template>
            </el-table-column>
<!--操作-->
            <el-table-column align="center" 
            label="操作" wempnoth="200">
                <template v-slot="{ row, $index }">
                    <div class="test-actions">
                        <template v-if="row.edit">
                            <button type="button" class="el-button el-button--primary el-button--small"
                                :class="{ 'is-loading': loading }" @click="confirmEdit(row)">
                                <i v-if="loading" class="el-icon-loading" />
                                <SvgIcon icon-class="save" />
                                Save
                            </button>
                            <el-button class="cancel-btn" size="small" :icon="Refresh" type="warning"
                                @click="cancelEdit(row)">
                               Cancel
                            </el-button>
                        </template>
                        <template v-else>
                            <el-button type="primary" size="small" :icon="EditPen" @click="row.edit = !row.edit">
                               Edit
                            </el-button>
                            <el-button type="danger" size="small" :icon="Delete" @click="triggerDelete(row, $index)">
                               Delete
                            </el-button>
                        </template>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <Pagination
        v-show="currentTotal > 0" 
        :total="currentTotal" 
        v-model:page="searchQuery.page"
        v-model:limit="searchQuery.limit" 
        @pagination="searchTags" 
        />
    </div>
</template>



<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Pagination  from './Pagination.vue'
import { cloneDeep } from 'lodash-es'
import {Delete,EditPen,Refresh,Search} from '@element-plus/icons-vue'
// import { compare } from '@/utils/mixinTools'
//https://smlpoints.com/notes-vue3-element-plus-frontend-pagination-sort-search.html
const searchInput = ref('')
const rawSearchQuery = {
    page: 1,
    limit: 20,
    keyword: '',
    sort: {
        prop: null as string | null,
        order: null as string | null
    }
}

const searchQuery = ref(cloneDeep(rawSearchQuery))
const loading = ref(false)
const list = ref([] as Record<string, any>[])

const canEditedKeys = [
    { key: 'isRecommended', needCheck: false },
    { key: 'empname', needCheck: true }
]
const dialog = ref({
    show: false,
    hashtagempno: ''
})

const mockTestItems = ref([] as Record<string, any>[])

// 獲取Api數據
const getTableData = async () => {
    try {
        const result = await getMockItems()
        mockTestItems.value = result || []
        await searchTags()
        return true
    } catch (err) {
        console.log(err)
    }
}

const getMockItems = async () => {
    try {
        const result = [
            { empno: 1, isRecommended: true, empname: 'A' },
            { empno: 2, isRecommended: true, empname: 'B' },
            { empno: 3, isRecommended: true, empname: 'C' },
            { empno: 4, isRecommended: true, empname: 'D' },
            { empno: 5, isRecommended: false, empname: 'HashTag #5' },
            { empno: 6, isRecommended: true, empname: 'HashTag #6' },
            { empno: 7, isRecommended: true, empname: 'HashTag #7' },
            { empno: 8, isRecommended: true, empname: 'HashTag #8' },
            { empno: 9, isRecommended: true, empname: 'HashTag #9' },
            { empno: 10, isRecommended: false, empname: 'HashTag #10' },
            { empno: 11, isRecommended: true, empname: 'HashTag #11' },
            { empno: 12, isRecommended: true, empname: 'HashTag #12' },
            { empno: 13, isRecommended: true, empname: 'HashTag #13' },
            { empno: 14, isRecommended: true, empname: 'HashTag #14' },
            { empno: 15, isRecommended: false, empname: 'HashTag #15' },
            { empno: 16, isRecommended: true, empname: 'HashTag #16' },
            { empno: 17, isRecommended: true, empname: 'HashTag #17' },
            { empno: 18, isRecommended: true, empname: 'HashTag #18' },
            { empno: 19, isRecommended: true, empname: 'HashTag #19' },
            { empno: 20, isRecommended: false, empname: 'HashTag #20' },
            { empno: 21, isRecommended: true, empname: 'HashTag #21' }
        ]
        return result
    } catch (err) {
        console.log(err)
    }
}

const pagedTableData = computed(() => {
    return list.value.slice((searchQuery.value.page - 1) * searchQuery.value.limit, searchQuery.value.page * searchQuery.value.limit)
})

const currentTotal = computed(() => {
    return list.value.length
})

const searchTags = async (type?: string, options?: null | undefined | Record<'prop' | 'order', string | null>) => {
    try {
        loading.value = true

        if (type === 'search') {
            const preResult = {
                limit: searchQuery.value.limit,
                sort: { ...searchQuery.value.sort }
            }
            resetList()
            searchQuery.value.keyword = searchInput.value
            searchQuery.value.limit = preResult.limit
            searchQuery.value.sort = preResult.sort
        }

        if (type === 'sort') {
            const preResult = {
                keyword: searchQuery.value.keyword,
                limit: searchQuery.value.limit,
                sort: { ...searchQuery.value.sort }
            }
            resetList()
            searchQuery.value.keyword = preResult.keyword
            searchQuery.value.limit = preResult.limit
            searchQuery.value.sort = preResult.sort
        }

        await new Promise(resolve => setTimeout(resolve, 1000))

        let result = mockTestItems.value
            .filter(v => v.empname.includes(searchQuery.value.keyword.trim()) || (searchQuery.value.keyword.trim() === ''))

        if (type === 'sort' || (searchQuery.value.sort.prop !== null && searchQuery.value.sort.order !== null)) {
            const prop = options?.prop || searchQuery.value.sort.prop
            const order = options?.order || searchQuery.value.sort.order
          //  result = result.sort(prop, order)
        }

        list.value = result.map(v => {
            console.log('v', v)
            const newObj = {
                ...v,
                edit: false,
            } as Record<string, any>

            canEditedKeys.forEach((str) => {
                newObj[str.key] = {
                    key: str.key,
                    original: v[str.key],
                    value: v[str.key]
                }
            })

            return newObj
        })

        loading.value = false
        return true
    } catch (err) {
        console.log(err)
    }
}

const sortChange = async ({ prop, order }: { prop: string | null, order: string | null }) => {
    try {
        console.log(prop, order)
        searchQuery.value.sort.prop = prop
        searchQuery.value.sort.order = order
        await searchTags('sort', { prop, order })
    } catch (err) {
        console.log(err)
    }
}

const cancelEdit = (row: Record<string, any>) => {
    canEditedKeys.forEach(str => {
        row[str.key].value = row[str.key].original
    })
    row.edit = false
    ElMessage({
        message: 'The data has been restored to the original value',
        type: 'warning'
    })
}

const confirmEdit = async (row: Record<string, any>) => {
    try {
        loading.value = true
        canEditedKeys.forEach(str => {
            row[str.key].original = row[str.key].value
        })

        row.edit = false

        /* mock save data via api*/
        await new Promise(resolve => setTimeout(resolve, 500))
        mockTestItems.value[mockTestItems.value.findIndex(obj => obj.empno === row.empno)] = {
            empno: row.empno,
            isRecommended: row.isRecommended.value,
            empname: row.empname.value
        }
        list.value[list.value.findIndex(obj => obj.empno === row.empno)] = {
            ...row
        }

        ElMessage({
            message: 'The data has been edited',
            type: 'success'
        })
        loading.value = false
    } catch (err) {
        console.log(err)
    }
}

const triggerDelete = async (row: Record<string, any>, index: number) => {
    try {
        console.log('ready to delete', row, index)

        /* mock delete via api */
        await new Promise(resolve => setTimeout(resolve, 500))
        mockTestItems.value.splice(mockTestItems.value.findIndex(obj => obj.empno === row.empno), 1)
        list.value.splice(index, 1)

        console.log('finish delete')
    } catch (err) {
        console.log(err)
    }
}

const resetList = () => {
    list.value = []
    searchQuery.value = cloneDeep(rawSearchQuery)
}

getTableData()
</script>