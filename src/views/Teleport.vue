<template>
 <button class="el-button el-button--primary" @click="open = true">Open Modal</button>

    <Teleport  to="body">
        <!--
      <div v-if="open" class="modal">
        <div class="modal-main">
            <div class="modal-header">
                <a @click="open = false">
                    <i class="icon-cross"></i>
                </a>
            </div >
            <div class="modal-body">
                <p>Hello from the modal!</p>
            </div>
        </div>
      </div>-->
      <Alert :open="open" :lists="lists" :dynamicValidateForm="dynamicValidateForm" 
      @sendOpen="close" :formRef="formRef"
      @sendRemoveDomain="removeDomain" @sendSubmitForm="submitForm" 
      @sendResetForm="resetForm" @sendAddDomain="addDomain"/>
    </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Alert from './Alert.vue'
const open = ref<boolean>(false);
const close = () => {
    open.value=false
}
const lists = ref<any[]>([
    { 'subject': 'one', id: 123 },
     { 'subject': 'two', id: 221 }
]);
import type { FormInstance } from 'element-plus'

const formRef = ref<FormInstance>()
const dynamicValidateForm = reactive<{
    domains: DomainItem[]
    email: string
}>({
    domains: [
        {
            key: 1,
            value: '',
        },
    ],
    email: '',
})

interface DomainItem {
    key: number
    value: string
}

const removeDomain = (item: DomainItem) => {
    const index = dynamicValidateForm.domains.indexOf(item)
    if (index !== -1) {
        dynamicValidateForm.domains.splice(index, 1)
    }
}

const addDomain = () => {
    dynamicValidateForm.domains.push({
        key: Date.now(),
        value: '',
    })
}

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!')
            return false
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>

