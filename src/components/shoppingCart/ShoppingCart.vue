<template>
<div class="shoppingCart">
  <div class="left-content">
    <div class="icon-wrapper">
      <div class="icon" :class="{lightHigh:totalCount>0}">
        <span class="icon-shopping_cart drop-ball-target-hook"></span>
      </div>
      <span class="count-num"
            :class="{bigger:totalCount>9}"
            v-show="totalCount>0">
        {{totalCount}}
      </span>
    </div>
    <div class="price-wrapper">
      <span class="price" :class="{lightHigh:totalPrice>0}">¥ {{totalPrice}}</span>
    </div>
    <div class="desc-wrapper">
      <span class="desc">另需配送费¥ {{deliveryPrice}}元</span>
    </div>
  </div>
  <div class="right-content" :class="{lightHigh:totalPrice>=minPrice}">
    <span class="pay">{{payDesc}}</span>
  </div>
  <transition-group
    name="dropBall"
    tag="ul"
    @before-enter="ballBeforeEnter"
    @after-enter="ballAfterEnter">
    <li v-for="(ball) in ballList" :key="ball.id" class="ball">
      <span v-show="ball" class="inner">{{ball.num==''?1:ball.num}}</span>
    </li>
  </transition-group>
</div>
</template>

<script>
export default {
  name: 'ShoppingCart',
  props: {
    selectedFoods: {
      type: Array,
      default() {
        return [];
      },
    },
    minPrice: { // 最低购买价格
      type: Number,
      default: 0,
    },
    deliveryPrice: { // 配送费
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      ballList: [],
    };
  },
  // mounted() {
  //   // 小球动画下落点：向父组件返回购物车图标位置
  //   this.$nextTick(() => {
  //     const cartIcon = document.querySelector('.icon-shopping_cart');
  //     const rect = cartIcon.getBoundingClientRect();
  //     this.$emit('dropBallTarget', [rect.x, rect.y]);
  //   });
  // },
  computed: {
    // 计算购物车商品总数
    totalCount() {
      let total = 0;
      this.selectedFoods.forEach((item) => {
        total += item.count;
      });
      return total;
    },
    // 计算购物车商品总价
    totalPrice() {
      let total = 0;
      this.selectedFoods.forEach((item) => {
        const _price = item.count * item.price;
        total += _price;
      });
      return total;
    },
    // 结算描述
    payDesc() {
      let desc = '';
      if (this.totalPrice === 0) {
        desc = `¥ ${this.minPrice}起送`;
      } else if (this.totalPrice >= this.minPrice) {
        desc = '结算';
      } else {
        desc = `还差¥ ${this.minPrice - this.totalPrice}起送`;
      }
      return desc;
    },
  },
  methods: {
    dropBall(event) {
      const beginRect = event.target.getBoundingClientRect();
      this.ballList.push({
        beginRect, num: 1, dropping: false, id: Math.random() * 100,
      });
    },
    ballBeforeEnter(el) {
      /* eslint-disable */
      const ballTarget = document.querySelector('.drop-ball-target-hook');
      const targetRect = ballTarget.getBoundingClientRect();
      for (let i = 0; i < this.ballList.length; i++) {
        const ball = this.ballList[i];
        if (!ball.dropping) {
          this.ballList[i].dropping = true;
          const { beginRect } = ball;
          const moveX = beginRect.left - targetRect.left + 5;
          const moveY = Math.abs(beginRect.top) - Math.abs(targetRect.top - 16);
          el.style.webkitTransform = `translate3d(0,${moveY}px,0)`;
          el.style.transform = `translate3d(0,${moveY}px,0)`;
          const innerSpan = el.querySelector('.inner');
          innerSpan.style.webkitTransform = `translate3d(${moveX}px,0,0)`;
          innerSpan.style.transform = `translate3d(${moveX}px,0,0)`;
          break;
        }
      }
    },
    ballAfterEnter(el) {
      const innerSpan = el.querySelector('.inner');
      el.style.removeProperty('transform');
      el.style.removeProperty('webkitTransform');
      innerSpan.style.removeProperty('transform');
      innerSpan.style.removeProperty('webkitTransform');
      this.ballList.shift();
    },
  },
};
</script>

<style lang="less" scoped>
.shoppingCart {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 50;
  display: flex;
  width: 100%;
  height: 44px;
  font-size: 0;
  .left-content {
    flex: 1;
    background-color: #141d27;
    /*background-color: rgba(#141d27, 0.9);*/
    /*opacity: 0.95;*/
    .icon-wrapper {
      position: relative;
      top: -14px;
      box-sizing: border-box;
      display: inline-block;
      width: 56px;
      height: 56px;
      padding: 6px 6px;
      margin: 0 12px 0 12px;
      vertical-align: top;
      background-color: #141d27;
      border-radius: 50%;
      .icon {
        box-sizing: border-box;
        display: inline-block;
        width: 44px;
        height: 44px;
        text-align: center;
        background-color: #2b333b;
        border-radius: 50%;
        .icon-shopping_cart {
          font-size: 24px;
          line-height: 44px;
          color: rgba(255, 255, 255, 0.4);
        }
        &.lightHigh {
          background-color: #00a0dc;
          .icon-shopping_cart {
            color: #fff;
          }
        }
      }
      .count-num {
        position: absolute;
        top: 1px;
        right: 1px;
        display: inline-block;
        min-width: 16px;
        font-size: 9px;
        font-weight: 700;
        line-height: 16px;
        color: #fff;
        text-align: center;
        background-color: rgb(240, 20, 20);
        border-radius: 8px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        &.bigger {
          min-width: 24px;
        }
      }
    }
    .price-wrapper {
      display: inline-block;
      height: 44px;
      overflow: hidden;
      .price {
        display: inline-block;
        padding: 0 12px 0 0;
        margin: 10px 0 10px 0;
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        color: rgba(255, 255, 255, 0.4);
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        &.lightHigh {
          color: #fff;
        }
      }
    }
    .desc-wrapper {
      display: inline-block;
      height: 44px;
      overflow: hidden;
      .desc {
        display: inline-block;
        margin: 11px 0 10px 12px;
        font-size: 10px;
        font-weight: 500;
        line-height: 24px;
        color: rgba(255, 255, 255, 0.4);
      }
    }
  }
  .right-content {
    flex: 0 0 105px;
    background-color: #2b333b;
    .pay {
      display: inline-block;
      width: 100%;
      font-size: 12px;
      font-weight: 700;
      line-height: 44px;
      color: rgba(255, 255, 255, 0.4);
      text-align: center;
    }
    &.lightHigh {
      background-color: #00b43c;
      .pay {
        color: #fff;
      }
    }
  }
  .ball {
    position: fixed;
    bottom: 30px;
    left: 30px;
    transition: all 0.4s cubic-bezier(0.32, -0.48, 0.86, 0.76);
    .inner {
      display: inline-block;
      width: 22px;
      height: 22px;
      font-size: 10px;
      line-height: 22px;
      color: #fff;
      text-align: center;
      background-color: rgb(0, 160, 220);
      border-radius: 50%;
      transition: all 0.4s ease;
    }
  }
}
</style>
