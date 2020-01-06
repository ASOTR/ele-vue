// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import Goods from 'components/goods/Goods';
import api from './request/apiV2'; // 导入api接口
import App from './App';
import 'normalize.css';
import 'common/css/index.less';
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

const Ratings = () => import('components/ratings/Ratings');
// import Ratings from 'components/ratings/Ratings';
const Seller = () => import('components/seller/Seller');
// import Seller from 'components/seller/Seller';

Vue.config.productionTip = false;
Vue.prototype.$_api = api; // 将api挂载到vue的原型上

Vue.use(VueRouter);

const routes = [
  // { path: '', component: Goods },
  { path: '/goods', component: Goods },
  { path: '/ratings', component: Ratings },
  { path: '/seller', component: Seller },
];
const router = new VueRouter({
  routes,
});
router.push({ path: '/goods' });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
});
