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
            <el-form
                class="auth-form mb30"
                :model="loginForms"
                label-width="100px"
                label-position="left"
                ref="formRef"
            >
                <el-form-item
                prop="email"
                :label="validatorMessage.email"
                :rules="rulesLogin.email"
                >
                <el-input
                    v-model="loginForms.email"
                    :placeholder="validatorMessage.emailRequire"
                />
                </el-form-item>

                <el-form-item
                class="password"
                prop="password"
                :label="validatorMessage.password"
                :rules="rulesLogin.password"
                >
                <el-input
                    :type="passwordVisible === false ? 'password' : 'input'"
                    v-model="loginForms.password"
                    :placeholder="validatorMessage.passwordRequire"
                />
                <i
                    @click="passwordVisible = !passwordVisible"
                    :class="
                    passwordVisible === false ? 'icon-eye-blocked' : 'icon-eye'
                    "
                ></i>
                </el-form-item>
            </el-form>

            <div class="button_group mb-8">
                <el-button class="auth-btn" @click="resetForm(formRef)">
                {{ validatorMessage.cancel }}
                </el-button>
                <el-button
                type="primary"
                class="auth-btn"
                @click="LoginSubmit(formRef)"
                >
                {{ validatorMessage.submit }}
                </el-button>
            </div>
            </el-card>
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import { Login, Register } from "../api/auth"
import { ElMessage } from "element-plus"
import { FormInstance } from "element-plus"
const router = useRouter()
//FormInstance
const formRef = ref<FormInstance>();

//Login表單數據
const loginForms = ref<any>({
    // username: '',//admin
    email: "",
    password: "", //admin
})
const passwordVisible = ref(false);
const checkPasswordVisible = ref(false)
//Login表單驗證
const rulesLogin = computed<any>(() => ({
    email: [
        { required: true, message: '不能為空', trigger: "blur" },
        {
            type: "email",
            message: '不能為空',
            trigger: ["blur", "change"],
        },
    ],

    password: [
        { required: true, message: '不能為空', trigger: "blur" },
        { min: 6, max: 30, message: '不能為空', trigger: "blur" },
    ],
}))
//驗證訊息
const validatorMessage = computed<any>(() => ({
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
// 登入
const LoginSubmit = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid: any) => {
        if (valid) {
            try {
                let query = {
                    email: loginForms.value.email,
                    password: loginForms.value.password,
                }
                const res = await Login(query);
                if (res.token) {
                    localStorage.setItem("token", res.token)
                    ElMessage({
                        message: "Success!",
                        type: "success",
                    })
                    router.push({
                        name: "Admin",
                    })
               }
            } catch (err: any) {
                console.log(err)
                // errorMessage.value = err.response.message;
                // const error = errorMessage.value
                // switch (error) {
                //   case "用戶不存在":
                //     ElMessage.error(t("forms.userNull"))
                //     break
                //   case "密碼錯誤 ！":
                //     ElMessage.error(t("forms.passwordError"))
                //     break
                // }
            }

            //  }
        } else {
            return false
        }
    })
}
// 重置
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>