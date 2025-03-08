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
                <HFaceBookLogin v-slot="fbLogin" :app-id="fbAppID" @onSuccess="onSuccess" @onFailure="onFailure"
                    scope="email,public_profile" fields="id,name,email,first_name,last_name,birthday">
                    <i @click="fbLogin.initFBLogin" class="fa-brands fa-facebook"></i>
                </HFaceBookLogin>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import {storeToRefs } from 'pinia'
import { ref, computed, onMounted } from "vue"
import { googleAuthCodeLogin, googleSdkLoaded } from "vue3-google-login"
import { HFaceBookLogin } from '@healerlab/vue3-facebook-login';
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
    googleAuthCodeLogin().then((res) => {
        console.log("Handle the response", res)
        console.log(clientId.value)
    })
}
const loginS = () => {
    googleSdkLoaded((google) => {
        google.accounts.oauth2.initCodeClient({
            client_id: clientId.value,
            scope: "email profile openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
            callback: (res) => {
                console.log("res", res)
            }
        }).requestCode()
    })
}
const fbAppID = ref<string>(`${import.meta.env.VITE_FB_APP_ID}`)
const onSuccess = (res: any) => {
    // 取得你的身分驗證令牌和訊息
    console.log(res)
}

const onFailure = () => {
    // 身份驗證失敗時的邏輯
    console.log('')
}
onMounted(() => {
    generateCode();
})    
</script>


<style scoped lang="scss">
.fb-button {
    display: inline-block;
    margin: 10px 0 10 0;
    color: white;
    background-color: #1967d2;
    border-radius: 8px;
    padding: 16px;
    cursor: pointer;
}
</style>