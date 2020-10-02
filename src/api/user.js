import http from '../utils/http'
import base from './base'

const user = {
    accountLogin:(params) => http.post(`${base.dev_url}/v2/login`,params),
    getUserInfo:(params) => http.get(`${base.dev_url}/v1/user`, {params}),
    getCaptchas:(params) => http.post(`${base.dev_url}/v1/captchas`, params,{withCredentials:true}),
    changePassword:(params) => http.post(`${base.dev_url}/v2/changepassword`, params),
    logout:(params) => http.get(`${base.dev_url}/v2/signout`, {params}),

}

export default user