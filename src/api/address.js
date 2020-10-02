import http from '../utils/http'
import base from './base'

const address = {
    addressesList: (params) => http.get(`${base.dev_url}/v1/users/${params.user_id}/addresses`, params),
    addAddress: (params) => http.post(`${base.dev_url}/v1/users/${params.user_id}/addresses`, params),
    removeAddress: (params) => http.delete(`${base.dev_url}/v1/users/${params.user_id}/addresses/${params.address_id}`, params),
    
}

export default address