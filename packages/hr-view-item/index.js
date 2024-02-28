/*
 * @Author       : HR-OA-KTS 黄强 670604@ky-tech.com.cn
 * @Date         : 2024-02-28 19:11:32
 * @Description  : 
 */

import hrViewItem from './src/index.vue'

hrViewItem.install = function (Vue) {
  Vue.component(hrViewItem.name, hrViewItem);
};

export default hrViewItem;