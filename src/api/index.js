/**
 * api接口的统一出口
 */

// 引入 功能模块接口
import cities from './cities'
import pois from './pois'
import home from './home'
import search from './search'
import user from './user'
import address from './address'
import food from './food'

// 导出接口
export default {
    cities,
    pois,
    home,
    search,
    user,
    address,
    food,
    // ...
}