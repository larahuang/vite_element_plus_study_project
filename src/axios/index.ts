import Axios, { AxiosRequestConfig, AxiosResponse, AxiosPromise } from 'axios'

import { stringify } from 'qs'
//import config from '@/config'

const server = Axios.create({
  baseURL: import.meta.env.VITE_QUIZ_URL,
 // timeout: 15000,
 // withCredentials: config.apiConfig.withCredentials
})

// 请求攔截
server.interceptors.request.use((config: any) => {
   //如果localStorage.token有數據，參閱知識點
    if ( localStorage.token ) {
        //解釋token的使用方式
        config.headers.Authorization=localStorage.token;
    }
  return config
}, error => {
  return Promise.reject(error)
})

// 響應攔截
server.interceptors.response.use((response: AxiosResponse) => {
    // 這裡是對響應進行統一處理
    
  return response
}, error => {
    // 可以對錯誤進行統一處理
    // 可以對錯誤進行統一處理
    if (error.response.status === 401) {
        localStorage.removeItem('token');
    }
    return Promise.reject(error)
})

/**
 * 封装post请求,在api模塊直接調用
 *  -url 請求地址
 *  -params 參數
 *  -isQs 是否將參數序列化
 * 
 */

export const postApi = (url: string, params?: any, isQs?: boolean): AxiosPromise<any> => {
  return server({
    url,
    method: 'post',
    data: isQs ? stringify(params) : params
  })
}

/**
 * 封装get请求,在api模塊直接調用
 *  -url 請求地址
 *  -params 參數
 */

export const getApi = (url: string, query: any): AxiosPromise<any> => {
  return server({
    url,
    method: 'get',
    params: query
  })
}

/**
 * 封装get请求,在api模塊直接調用
 *  -url 請求地址
 *  -params 參數
 */

export const editApi = (url: string, params?: any, isQs?: boolean): AxiosPromise<any> => {
  return server({
    url,
    method: 'put',
    data: isQs ? stringify(params) : params
  })
}
export const removeApi = (url: string, id?: any, isQs?: boolean): AxiosPromise<any> => {
  return server({
    url,
    method: 'delete',
    data: isQs ? stringify(id) : id
  })
}