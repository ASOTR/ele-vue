<template>
  <div class="icon-wrapper">
    <span :class="['icon','type-'+type,iconStyle]"></span>
  </div>
</template>

<script>
export default {
  name: 'SupportsIcon',
  props: {
    // 图标类型，对应decrease_X
    type: {
      type: String,
      require: true,
      default: '1',
      validator(val) {
        return ['1', '2', '3', '4'].includes(val) === true;
      },
    },
    // 图标种类，用于计算对应iconStyle
    supportsType: {
      type: Number,
      require: true,
      default: 0,
      validator(val) {
        return [0, 1, 2, 3, 4].includes(val) === true;
      },
    },
  },
  data() {
    return {
      // 根据type对应设置icon背景图标class样式
      // iconList: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
    };
  },
  computed: {
    // 根据type返回图标样式
    iconStyle() {
      return ['decrease', 'discount', 'guarantee', 'invoice', 'special'][this.supportsType];
    },
  },
};
</script>

<style lang="less" scoped>
  @import "../../common/css/mixin";

  .icon-wrapper {
    .icon {
      display: block;
      background-repeat: no-repeat;
    }
    .type-1,
    .type-3 {
      width: 12px;
      height: 12px;
      background-size: 12px 12px;
    }
    .type-1 {
      &.decrease { .bg-image('decrease_1'); }
      &.discount { .bg-image('discount_1'); }
      &.guarantee { .bg-image('guarantee_1'); }
      &.invoice { .bg-image('invoice_1'); }
      &.special { .bg-image('special_1'); }
    }
    .type-3 {
      &.decrease { .bg-image('decrease_3'); }
      &.discount { .bg-image('discount_3'); }
      &.guarantee { .bg-image('guarantee_3'); }
      &.invoice { .bg-image('invoice_3'); }
      &.special { .bg-image('special_3'); }
    }
    .type-2,
    .type-4 {
      width: 16px;
      height: 16px;
      background-size: 16px 16px;
    }
    .type-2 {
      &.decrease { .bg-image('decrease_2'); }
      &.discount { .bg-image('discount_2'); }
      &.guarantee { .bg-image('guarantee_2'); }
      &.invoice { .bg-image('invoice_2'); }
      &.special { .bg-image('special_2'); }
    }
    .type-4 {
      &.decrease { .bg-image('decrease_4'); }
      &.discount { .bg-image('discount_4'); }
      &.guarantee { .bg-image('guarantee_4'); }
      &.invoice { .bg-image('invoice_4'); }
      &.special { .bg-image('special_4'); }
    }
  }
</style>
