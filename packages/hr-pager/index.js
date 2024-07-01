import hrPager from './src/index.vue'

hrPager.install = function (Vue) {
  Vue.component(hrPager.name, hrPager);
};

export default hrPager;