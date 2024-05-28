import hrSlidePager from './src/index.vue'

hrSlidePager.install = function (Vue) {
  Vue.component(hrSlidePager.name, hrSlidePager);
};

export default hrSlidePager;