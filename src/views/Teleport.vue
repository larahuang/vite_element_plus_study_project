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
      <Alert 
      :open="open" 
      :lists="lists" 
      :dynamicValidateForm="dynamicValidateForm" 
      :dynamicRules="dynamicRules"
      @sendOpen="close" 
      :formRef="formRef"
      @sendRemoveDomain="removeDomain" 
      @sendSubmitForm="submitForm" 
      @sendResetForm="resetForm" 
      @sendAddDomain="addDomain"/>
    </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import Alert from './Alert.vue';
import type { FormInstance, FormRules } from 'element-plus'
const open = ref<boolean>(false);
const close = () => {
    open.value=false
}
const lists = ref<any[]>([
    { 'subject': 'one', id: 123 },
    { 'subject': 'two', id: 221 }
]);
import type { FormInstance } from 'element-plus'

const formRef = ref<FormInstance>();
interface dynamicValidateFormType{
    domains: DomainItem[],
    email: string
}
const dynamicValidateForm = reactive<dynamicValidateFormType>(
    {
        domains: [{key: 1,value: ''}],email: '',
    })
interface RuleForm {
    domains:string,
    email: string   
}
const rules = reactive<FormRules<RuleForm>>({
    domains: [
        { required: true, message: 'domain can not be null', trigger: 'blur', }
    ],
    email: [
        {required: true,message: 'Please input email address',trigger: 'blur'},
        {type: 'email',message: 'Please input correct email address',trigger: ['blur', 'change']},
    ],
   
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
    formEl.validate((valid:any) => {
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

