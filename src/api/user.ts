import { postApi } from '@/axios/index'

// 登入
export const Login = (params: any) => postApi('/auth/login', params, true)