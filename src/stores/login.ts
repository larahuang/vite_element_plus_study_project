import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from "vue-router"
import { ElMessage } from "element-plus"
import { Login } from "../api/user"
import { FormInstance } from "element-plus"
import { loginFormType, rulesLoginType} from "../types/loginType"

export const useLoginStore = defineStore('login', () => { 
    const router = useRouter()
    const formRef = ref<FormInstance>();
    // Login表單數據
    const loginForms = ref<loginFormType>({
        email: "",
        password: "", //admin
        verification: "",
    })
    // 定義密碼表單顯示text
    const passwordVisible = ref(false)
    // 定義密碼表單顯示text
    const checkPasswordVisible = ref(false)
    // 驗證碼產生
    const code_box =ref<string>('');
    // 驗證碼驗證
    const checkVerification =(_rule: object, value: string, callback: Function)=>{
        value !== code_box.value?callback(new Error('驗證碼輸入錯誤')):callback();
    }
    // Login表單驗證
    const rulesLogin = computed<rulesLoginType>(() => ({
        email: [
            { required: true, message: '不能為空', trigger: "blur" },
            {type: "email",message: '不能為空',trigger: ["blur", "change"]},
        ],
        password: [
            { required: true, message: '不能為空', trigger: "blur" },
            { min: 6, max: 30, message: '不能為空', trigger: "blur" },
        ],
    
        verification:[
            { required: true, message: '驗證碼不能為空！', trigger: "blur" },
            { validator: checkVerification, trigger: 'blur' }
        ]
    }))
    // 產生驗證碼
    const generateCode =(length=6)=>{
        let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let code = "";
        for (var i = 0; i < length; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        code_box.value=code;
    }
    // 點擊獲得新的驗證碼
    const showCode =() => {
        generateCode();
    }
    const errorMessage = ref<string>('');
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
                    if (res.status === 200) {
                        localStorage.setItem("token", res.data.token)
                        ElMessage({
                            message: "Success!", type: "success",
                        });
                        router.push({ name: "Admin", })
                    }

                } catch (err: any) {
                    console.log(err)
                    errorMessage.value = err.response.message;
                    const error = errorMessage.value
                    switch (error) {
                    case "用戶不存在":
                        ElMessage.error('用戶不存在')
                        break
                    case "密碼錯誤 ！":
                        ElMessage.error('密碼錯誤 ！')
                        break
                    }
                }
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
    return {
        formRef,
      loginForms,passwordVisible,checkPasswordVisible,rulesLogin,
        code_box,
        generateCode,showCode,
        errorMessage,
        LoginSubmit,resetForm,
    }
})
