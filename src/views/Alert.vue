<template>
    <div v-if="open" class="modal">
            <div class="modal-main">
                <div class="modal-header">
                    <a @click="sendOpen">
                        <i class="icon-cross"></i>
                    </a>
                </div >
                <div class="modal-body">
                    <p>Hello from the modal!</p>
                    <el-form
        ref="formRef"
        :model="dynamicValidateForm"
        label-width="120px"
        class="demo-dynamic"
      >
        <el-form-item
          prop="email"
          label="Email"
          :rules="[
              {
                  required: true,
                  message: 'Please input email address',
                  trigger: 'blur',
              },
              {
                  type: 'email',
                  message: 'Please input correct email address',
                  trigger: ['blur', 'change'],
              },
          ]"
        >
          <el-input v-model="dynamicValidateForm.email" />
        </el-form-item>
        <el-form-item
          v-for="(domain, index) in dynamicValidateForm.domains"
          :key="domain.key"
          :label="'Domain' + index"
          :prop="'domains.' + index + '.value'"
          :rules="{
              required: true,
              message: 'domain can not be null',
              trigger: 'blur',
          }"
        >
          <el-input v-model="domain.value" />
          <el-button class="mt-2" @click.prevent="sendRemoveDomain(domain)"
            >Delete</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sendSubmitForm(formRef)">Submit</el-button>
          <el-button @click="sendAddDomain">New domain</el-button>
          <el-button @click="sendResetForm(formRef)">Reset</el-button>
        </el-form-item>
      </el-form>
                </div>
            </div>
    </div>
</template>

<script setup lang="ts">
//import { ref } from 'vue'
import { defineProps } from 'vue'
const props = defineProps({
    open: { type: Boolean },
    lists: { type: Object },
    dynamicValidateForm: { type: Object },
    formRef: { type: Object },
})
const emits = defineEmits(['sendOpen', 'sendRemoveDomain', 'sendSubmitForm','sendResetForm', 'sendAddDomain']);
const sendOpen = () => {
  emits('sendOpen', props.open=false)
}
const sendRemoveDomain = (domain:any) => {
    emits('sendRemoveDomain', domain)
}
const sendSubmitForm = (formRef: any) => {
    emits('sendSubmitForm', formRef)
}
const sendResetForm = (formRef: any) => {
    emits('sendResetForm', formRef)
}
const sendAddDomain = () => {
    emits('sendAddDomain')
}
</script>