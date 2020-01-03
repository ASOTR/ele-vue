<template>
  <!-- 星级评分组件 -->
  <div class="star-main">
    <span class="star-item"
          v-for="(item, index) in itemList"
          :class="[sizeExpected, item]"
          :key="index">
    </span>
  </div>
</template>

<script>
export default {
  name: 'VStar',
  props: {
    // 评分
    score: {
      type: Number,
      require: true,
      default: 0,
    },
    // 最高评分，星星总个数
    maxScore: {
      type: Number,
      default: 5,
    },
    // 星星大小
    size: {
      type: Number,
      default: 24,
    },
    // 星星间距
    spacing: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      // sizeExpected: 'sizeExpected',
    };
  },
  computed: {
    // 返回星星（状态）列表
    itemList() {
      const list = [];
      for (let i = 1; i <= this.maxScore; i++) {
        list.push(this.getStarStatus(i, this.score));
      }
      return list;
    },
    sizeExpected() {
      if ([24, 36, 48].includes(this.size)) {
        return `star${this.size}`;
      }
      return '';
    },
  },
  methods: {
    // 计算第i颗星星状态
    getStarStatus(index, value) {
      if (value >= index) {
        return 'on';
      }
      if (value + 0.5 >= index) {
        return 'half';
      }
      return 'off';
    },
  },
};
</script>

<style lang="less" scoped>
  @import "../../common/css/mixin";
  .star-main {
    text-align: center;
    .star-item {
      display: inline-block;
    }
    .star24 {
      width: 10px;
      height: 9.5px;
      padding-right: 10px;
      background-repeat: no-repeat;
      background-size: 10px 9.5px;
      &.on {
        .bg-image('star24_on');
      }
      &.half {
        .bg-image('star24_half');
      }
      &.off {
        .bg-image('star24_off');
      }
    }
    .star36 {
      width: 15px;
      height: 14.5px;
      padding-right: 15px;
      background-repeat: no-repeat;
      background-size: 15px 14.5px;
      &.on {
        .bg-image('star36_on');
      }
      &.half {
        .bg-image('star36_half');
      }
      &.off {
        .bg-image('star36_off');
      }
    }
    .star48 {
      width: 20px;
      height: 19px;
      padding-right: 20px;
      background-repeat: no-repeat;
      background-size: 20px 19px;
      &.on {
        .bg-image('star36_on');
      }
      &.half {
        .bg-image('star36_half');
      }
      &.off {
        .bg-image('star36_off');
      }
    }
  }
</style>
