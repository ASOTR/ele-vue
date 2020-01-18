<template>
<div class="btnGroup-container">
  <transition name="BtnRoll" @before-enter="beforeEnter" @after-enter="afterEnter">
    <div class="del-btnWrapper" @click="decreaseCount" v-show="food.count>0">
      <span class="icon-remove_circle_outline"></span>
    </div>
  </transition>
  <div class="food-count-wrapper" >
    <transition name="NumRoll" @before-enter="beforeEnter" @after-enter="afterEnter">
      <span class="food-count" v-show="food.count>0">
        {{food.count>0?food.count:food.count+1}}
      </span>
    </transition>
  </div>
  <div class="add-btnWrapper" @click="addCount">
    <span class="icon-add_circle"></span>
    <!--<span class="ball">1</span>-->
    <!--<span class="ball">2</span>-->
  </div>
</div>
</template>

<script>
export default {
  name: 'CartControlBtn',
  props: {
    food: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    beforeEnter(el) {
      // eslint-disable-next-line
      el.style.pointerEvents = 'none';
    },
    afterEnter(el) {
      // eslint-disable-next-line
      el.style.pointerEvents = 'auto';
    },
    // enter(el, done) {
    //   setTimeout(() => {
    //     done();
    //   }, 3000);
    // },
    addCount(event) {
      setTimeout(() => {
        const count = 1;
        if (!this.food.count) {
          this.$set(this.food, 'count', count);
        } else {
          this.food.count++;
        }
        this.$emit('dropBall', event);
      }, 0);
    },
    decreaseCount() {
      if (this.food.count) {
        this.food.count--;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.btnGroup-container {
  font-size: 0;
  .del-btnWrapper {
    display: inline-block;
    font-size: 24px;
    line-height: 24px;
    color: rgb(0, 160, 220);
    vertical-align: top;
    .icon-remove_circle_outline {
      padding: 6px;
    }
    &.BtnRoll-enter {
      opacity: 0;
    }
    &.BtnRoll-enter-to {
      opacity: 0;
    }
    &.BtnRoll-enter-active {
      transform: translate3d(0, 0, 0);
      animation: roll-in 0.3s linear;
      /*animation-delay: 1s;*/
    }
    &.BtnRoll-leave-to {
      animation: roll-in 0.2s linear reverse;
    }

    /*&.BtnRoll-enter-active {*/
      /*transition: all 0.5s ease;*/
      /*transition-delay: 3s;*/
    /*}*/
    /*&.BtnRoll-leave-active {*/
      /*transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);*/
    /*}*/
    /*&.BtnRoll-enter,*/
    /*&.BtnRoll-leave-to*/
      /*!* .slide-fade-leave-active for below version 2.1.8 *! {*/
      /*transform: translateX(48px) rotate(360deg);*/
      /*opacity: 0;*/
    /*}*/

    @keyframes roll-in {
      0% {
        opacity: 0.5;
        transform: translateX(48px) rotate(0deg);
      }
      100% {
        opacity: 1;
        transform: translateX(0) rotate(360deg);
      }
    }
  }
  .food-count-wrapper {
    display: inline-block;
    min-width: 12px;
    /*padding: 0 6px 0 6px;*/
    font-size: 10px;
    line-height: 24px;
    color: rgb(147, 153, 159);
    text-align: center;
    vertical-align: top;
    .food-count {
      display: inline-block;
    }
    .NumRoll-enter {
      opacity: 0;
    }
    .NumRoll-enter-to {
      opacity: 0;
    }
    .NumRoll-enter-active {
      transform: translate3d(0, 0, 0);
      animation: num-roll-in 0.3s linear;
      animation-delay: 0.1s;
    }
    .NumRoll-leave-active {
      animation: num-roll-in 0.2s linear reverse;
    }

    @keyframes num-roll-in {
      0% {
        opacity: 0.5;
        transform: translateX(12px) rotate(0deg);
      }
      100% {
        opacity: 1;
        transform: translateX(0) rotate(360deg);
      }
    }
  }
  .add-btnWrapper {
    position: relative;
    display: inline-block;
    font-size: 24px;
    line-height: 24px;
    color: rgb(0, 160, 220);
    vertical-align: top;
    .icon-add_circle {
      padding: 6px;
    }
  }
}
</style>
