<template>
  <div class="header-container">
    <!-- 商家头部，内容区 -->
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" />
      </div>
      <div class="content-right-wrapper">
        <div class="title">
          <span class="brand-img"></span>
          <span>{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}} / {{seller.deliveryTime}}分钟送达</div>
        <div v-if="seller.supports" class="supports">
          <span :class="[iconList[seller.supports[0].type], 'icon']"></span>
          <span class="supports-desc">{{seller.supports[0].description}}</span>
        </div>
        <div v-if="seller.supports" @click="showDetail(true)" class="btn-supports">
          <span class="supports-num">{{seller.supports.length}}个</span>
          <span class="icon-keyboard_arrow_right"></span>
        </div>
      </div>
    </div>
    <!-- 公告栏 -->
    <div class="bulletin-wrapper"  @click="showDetail(true)">
      <span class="bulletin-img"></span><!--
      --><span class="bulletin-content">{{seller.bulletin}}</span>
      <span class="bulletin-icon-arrow icon-keyboard_arrow_right"></span>
    </div>
    <!-- 背景图，avatar高斯模糊 -->
    <div class="background-img">
      <img :src="seller.avatar" width="100%" height="100%"/>
    </div>
    <!-- 详情遮罩框 -->
    <V-Mask :show="detailShow" filter="blur(5px)">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearFix">
          <div class="detail-content">
            <h1 class="detail-seller-name">{{seller.name}}</h1>
            <div class="detail-star-wrapper">
              <V-Star :score="seller.score" :size="48"></V-Star>
            </div>
          </div>
        </div>
        <div class="btn-close clearFix">
          <span class="icon-close" @click="showDetail(false)"></span>
        </div>
      </div>
    </V-Mask>
  </div>
</template>

<script>
import VMask from '@/components/mask/Mask';
import VStar from '@/components/star/Star';

export default {
  name: 'Header',
  components: {
    'V-Mask': VMask,
    'V-Star': VStar,
  },
  props: {
    seller: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      // 根据type对应设置icon背景图标class样式
      iconList: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
      // 是否显示公共/优惠信息浮层
      detailShow: false,
    };
  },
  mounted() {
    /* eslint-disable no-undef */
    // const MaskComponent = Vue.extend(VMask);
    // new MaskComponent().$mount('.mask');
  },
  methods: {
    showDetail(val) {
      this.detailShow = val === undefined ? true : val;
    },
  },
};
</script>

<style lang="less" scoped>
  @import "../../common/css/mixin";
  .header-container {
    position: relative;
    width: 100%;
    overflow: hidden;
    background-color: rgba(7, 17, 27, 0.5);
    .content-wrapper {
      position: relative;
      width: 100%;
      min-height: 10px;
      padding: 24px 0 18px 24px;
      font-size: 0;
      .avatar {
        display: inline-block;
        & > img {
          width: 64px;
          height: 64px;
          border-radius: 2px;
        }
      }
      .content-right-wrapper {
        display: inline-block;
        margin-left: 16px;
        vertical-align: top;
        .title {
          margin-top: 2px;
          font-size: 16px;
          font-weight: bold;
          line-height: 18px;
          color: rgb(255, 255, 255);
          .brand-img {
            display: inline-block;
            width: 30px;
            height: 18px;
            vertical-align: top;
            background-repeat: no-repeat;
            background-size: 30px 18px;
            .bg-image('brand');
          }
        }
        .description {
          margin-top: 8px;
          font-size: 12px;
          color: rgb(255, 255, 255);
        }
        .supports {
          margin-top: 10px;
          margin-bottom: 2px;
          .icon {
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-right: 4px;
            vertical-align: middle;
            background-repeat: no-repeat;
            background-size: 12px 12px;
            &.decrease { .bg-image('decrease_1'); }
            &.discount { .bg-image('discount_1'); }
            &.guarantee { .bg-image('guarantee_1'); }
            &.invoice { .bg-image('invoice_1'); }
            &.special { .bg-image('special_1'); }
          }
          .supports-desc {
            display: inline-block;
            font-family: monospace;
            font-size: 20px;
            line-height: 12px;
            color: rgb(255, 255, 255);
            vertical-align: middle;
            /*移动端安卓font-size小于12px的line-height问题：缩放*/
            transform: scale(0.5);
            /*以左中点为变形（缩放）原点*/
            transform-origin: 0% 50%;
          }
        }
        .btn-supports {
          position: absolute;
          right: 36px;
          bottom: 18px;
          padding: 7px 8px 7px 12px;
          font-size: 10px;
          color: rgb(255, 255, 255);
          text-align: center;
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 14px;
        }
      }
    }
    .bulletin-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      height: 28px;
      padding: 0 24px 0 12px;
      overflow: hidden;
      color: rgb(255, 255, 255);
      text-overflow: ellipsis;
      white-space: nowrap;
      background-color: rgba(7, 17, 27, 0.2);
      .bulletin-img {
        /*flex-shrink项目的缩小比例，默认为1，即如果空间不足，该项目将缩小.0不缩小*/
        flex-shrink: 0;
        width: 22px;
        height: 12px;
        background-repeat: no-repeat;
        background-size: 22px 12px;
        .bg-image('bulletin');
      }
      .bulletin-content {
        /*width: 83%;*/
        padding-right: 24px;
        margin-left: 4px;
        overflow: hidden;
        font-size: 10px;
        line-height: normal;
        color: rgb(255, 255, 255);
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .bulletin-icon-arrow {
        position: absolute;
        top: 10px;
        right: 42px;
        display: block;
        font-size: 10px;
      }
    }
    .background-img {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      filter: blur(10px);
    }
  }
  .detail {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: hidden;
    color: rgb(255, 255, 255);
    background-color: rgba(7, 17, 27, 0.8);
    .detail-wrapper {
      width: 100%;
      min-height: 100%;
      .detail-content {
        padding-top: 64px;
        padding-bottom: 64px;/*底部预留btn-close高度的间距，防止按钮覆盖文本内容*/
        .detail-seller-name {
          font-size: 16px;
          font-weight: 700;
          line-height: 16px;
          text-align: center;
        }
        .detail-star-wrapper {
          margin-top: 18px;
          line-height: 24px;
        }
      }
    }
    .btn-close {
      margin-top: -64px;
      font-size: 32px;
      color: rgba(255, 255, 255, 0.5);
      text-align: center;
    }
  }
</style>
