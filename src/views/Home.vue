<template>
    <div class="auth disflex ai-cen">
        <div class="auth-form-wrapper disflex">
            <div class="auth-box">
                <el-card class="auth-inner flex-center">
                    <div class="auth-img-wrapper bg-prim">
                        <div class="auth-welcome border">
                            welcome
                        </div>

                    </div>
                    <el-form class="auth-form mb30" :model="loginForms" label-width="100px" label-position="left"
                        ref="formRef" @keyup.enter="LoginSubmit(formRef)">
                        <el-form-item prop="email" :label="validatorMessage.email" :rules="rulesLogin.email">
                            <el-input v-model="loginForms.email" :placeholder="validatorMessage.emailRequire" />
                        </el-form-item>

                        <el-form-item class="password" prop="password" :label="validatorMessage.password"
                            :rules="rulesLogin.password">
                            <el-input :type="passwordVisible === false ? 'password' : 'input'"
                                v-model="loginForms.password" :placeholder="validatorMessage.passwordRequire" />
                            <i @click="passwordVisible = !passwordVisible" :class="
                        passwordVisible === false ? 'icon-eye-blocked' : 'icon-eye'
                        "></i>
                        </el-form-item>

                        <el-form-item class="verification" prop="verification" :rules="rulesLogin.verification"
                            label="驗證碼">
                            <el-input v-model.trim="loginForms.verification" />
                            <div class="codeBox">{{code_box}}</div>
                            <a class="btn_change" @click="showCode">
                                <i class="icon-loop2"></i>
                            </a>
                        </el-form-item>


                        <div class="button_group mb-8">
                            <el-button class="auth-btn" @click="resetForm(formRef)">
                                {{ validatorMessage.cancel }}
                            </el-button>
                            <el-button type="primary" class="auth-btn" @click="LoginSubmit(formRef)">
                                {{ validatorMessage.submit }}
                            </el-button>

                        </div>
                    </el-form>
                </el-card>
            </div>
            <div class="login_three_area">
                <i @click="login" class="fa-brands fa-google-plus"></i>
                <i class="fa-brands fa-facebook"></i>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {storeToRefs } from 'pinia'
import { ref, computed, onMounted } from "vue"
import { googleAuthCodeLogin, googleSdkLoaded } from "vue3-google-login"
import { useLoginStore } from '../stores/login'
import {validatorMessageType}from "../types/loginType"
    const storeLogin = useLoginStore();
    const { formRef,loginForms,passwordVisible,checkPasswordVisible,rulesLogin,code_box,errorMessage } = storeToRefs(storeLogin);
    const { generateCode,showCode,resetForm,LoginSubmit } = storeLogin;


//驗證訊息
const validatorMessage = computed<validatorMessageType>(() => ({
    username:'使用者',
    usernameRequire: '使用者',
    welcome: '歡迎光臨',
    management: '使用者',
    register: '使用者',
    email: '電子信箱',
    emailRequire: '使用者',
    password: '密碼',
    passwordRequire: '密碼不能為空',
    submit: '送出',
    cancel: '取消',
}))
const clientId = ref<string>(`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`)
const login = () => {
    console.log('clientId' ,clientId.value)
    googleAuthCodeLogin().then((response) => {
        console.log("Handle the response", response)
        console.log(clientId.value)
    })
}
onMounted(() => {
    generateCode();
})    
</script>