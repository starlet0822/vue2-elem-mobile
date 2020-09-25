import http from '../utils/http'
import base from './base'

const cities =  {
    getCities: (params) => http.get(`${base.dev_url}/v1/cities`,{params}),
    getCitiesHot: (params) => http.get(`${base.dev_url}/v1/cities`,{params}),
    getCitiesGroup: (params) => http.get(`${base.dev_url}/v1/cities`,{params}),
}

export default cities