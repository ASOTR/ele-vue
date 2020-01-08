<template>
  <div id="app">
    <div class="app-container">
      <V-Header :seller="seller"/>
      <ul class="tab border-1px">
        <router-link to="/goods" tag="li" class="tab-li">商品</router-link>
        <router-link to="/ratings" tag="li" class="tab-li">评价</router-link>
        <router-link to="/seller" tag="li" class="tab-li">商家</router-link>
      </ul>
      <router-view :seller="this.seller"></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/header/Header';
// import api from '@/request/api';

export default {
  name: 'App',
  components: {
    'V-Header': Header,
  },
  data() {
    return {
      seller: {},
    };
  },
  created() {
    this.$_api.seller.getSellerList().then((res) => {
      if (res && res.code === 0) {
        this.seller = res.data;
      }
    }).catch((err) => {});
  },
};
</script>

<style lang="less" scoped>
  @import "common/css/mixin";
  .tab {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    padding: 0;
    // border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    .border-1px(rgba(7, 17, 27, 0.1));
    .tab-li {
      display: block;
      flex: 1;/*flex-grow等分空间*/
      font-size: 14px;
      font-weight: 500;
      line-height: 40px;
      color: rgb(77, 85, 93);
      text-align: center;
      text-decoration: none;
      &.router-link-active {
        color: rgb(240, 20, 20);
      }
    }
  }
</style>
