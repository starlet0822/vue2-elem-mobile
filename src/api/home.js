import http from '../utils/http'
import base from './base'

const home = {
    getIndexEntry: (params) => http.get(`${base.dev_url}/v2/index_entry`, params),
    getShopList: (params) => http.get(`${base.dev_url}/shopping/restaurants`, {params}),
}

export default home