import http from '../utils/http'
import base from './base'

const search = {
    getSearchList:(params) => http.get(`${base.dev_url}/v4/restaurants`, {params}),
}

export default search