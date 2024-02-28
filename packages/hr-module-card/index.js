/*
 * @Author       : HR-OA-KTS 黄强 670604@ky-tech.com.cn
 * @Date         : 2024-02-28 19:08:32
 * @Description  : 
 */

import hrModuleCard from './src/index.vue'

hrModuleCard.install = function (Vue) {
  Vue.component(hrModuleCard.name, hrModuleCard);
};

export default hrModuleCard;