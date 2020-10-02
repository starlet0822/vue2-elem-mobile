import axios from "axios"
// axios.defaults.withCredentials = true; //配置为true
const instance = axios.create({
    timeout: 1000 * 5,
    withCredentials:true
})

// 请求拦截器
instance.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
instance.interceptors.response.use(
    // 请求成功
    res => res.status === 200 ? res.data : Promise.reject(res),
    error => {
        return Promise.reject(error)
    }
)

// 导出
export default instance