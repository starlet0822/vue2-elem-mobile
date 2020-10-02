import http from '../utils/http'
import base from './base'

const food = {
    getDeliveryModes: (params) => http.get(`${base.dev_url}/shopping/v1/restaurants/delivery_modes`, { params }),
    getAttributes: (params) => http.get(`${base.dev_url}/shopping/v1/restaurants/activity_attributes`,  params ),
    getCategory: (params) => http.get(`${base.dev_url}/shopping/v2/restaurant/category`,  {params} ),
    
}

export default food