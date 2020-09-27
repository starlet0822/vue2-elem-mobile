import http from '../utils/http'
import base from './base'

const pois = {
    getPois:(params) => http.get(`${base.dev_url}/v1/pois`, {params}),
    getGeohash:(params) => http.get(`${base.dev_url}/v2/pois/${params.geohash}`, params)
}

export default pois