<template>
  <div class="goods-container">
    <div class="goods-left-wrapper" ref="menu">
      <ul class="menu">
        <li v-for="(item,index) in goods"
            :key="index"
            :class="['menu-item', 'menu-item-hook',
            {borderNone: activeIndex==index+1},
            {activeItem: activeIndex==index}]"
            @click="scrollToGoodsItem(index,$event)"
        >
          <div class="menu-item-container">
            <div>
              <div v-if="item.type > -1" class="supports-icon">
                <SupportsIcon
                  type="3"
                  :supports-type="item.type">
                </SupportsIcon>
              </div>
              <span class="menu-name">{{item.name}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="goods-right-wrapper">
      <ul class="goods-list">
        <li v-for="(goodsItem,goodsIndex) in goods"
            :key="goodsIndex"
            class="goods-item goods-item-hook">
          <div class="goods-item-name">{{goodsItem.name}}</div>
          <ul class="foods-list">
            <li v-for="(foodsItem,foodsIndex) in goodsItem.foods"
                :key="foodsIndex" class="foods-item">
              <div class="foods-icon">
                <!--<img :src="foodsItem.icon" width="57px" height="57px"/>-->
                <img v-lazy="foodsItem.icon" :key="foodsIndex" width="57px" height="57px"/>
              </div>
              <div class="foods-item-content">
                <span class="foods-name">{{foodsItem.name}}</span>
                <span v-if="foodsItem.description" class="foods-description">
                  {{foodsItem.description}}
                </span>
                <div class="foods-sellCount-content">
                  <span class="foods-sellCount">月售{{foodsItem.sellCount}}份</span>
                  <span class="foods-rating">好评率{{foodsItem.rating}}%</span>
                </div>
                <div class="foods-price-content">
                  <span class="foods-price-icon">¥</span>
                  <span class="foods-price">{{foodsItem.price}}</span>
                  <span class="foods-oldPrice" v-if="foodsItem.oldPrice">
                    ¥{{foodsItem.oldPrice}}
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core';
import MouseWheel from '@better-scroll/mouse-wheel';
import ObserveDOM from '@better-scroll/observe-dom';
import SupportsIcon from '@/components/supportsIcon/SupportsIcon';

BScroll.use(MouseWheel);
BScroll.use(ObserveDOM);

export default {
  name: 'Goods',
  components: {
    SupportsIcon,
  },
  data() {
    return {
      goods: {},
      currentScrollY: 0, // 保存实时的Y轴坐标距离
      goodsItem_heightList: [], // 保存每个区块的高度
    };
  },
  computed: {
    activeIndex() {
      return this.goodsItem_heightList.findIndex((height) => {
        if (this.currentScrollY < height) return true;
        return false;
      });
    },
  },
  watch: {
    // 监听activeIndex并滚动保证正在浏览的menu-item在可视范围
    activeIndex() {
      const menuItems = document.querySelectorAll('.menu-item-hook');
      const rect = menuItems[this.activeIndex].getBoundingClientRect();
      const leftTop = document.querySelector('.goods-container').getBoundingClientRect().top;
      const leftBottom = document.querySelector('.goods-container').getBoundingClientRect().bottom;
      if (leftTop > rect.top || leftBottom < rect.bottom) {
        this.bs_left.scrollToElement(menuItems[this.activeIndex], 300);
      }
    },
  },
  created() {
    this.$_api.goods.getGoodsList().then((res) => {
      if (res && res.code === 0) {
        this.goods = res.data;
        this.$nextTick(() => {
          this._init_Bscroll();
          this.calculateHeight();
        });
      }
    }).catch((err) => {});
  },
  beforeDestroy() {
    this.bs_left.destroy();
    this.bs_right.destroy();
  },
  methods: {
    /**
     * BScroll分别初始化左右列表滚动区域
     * @private
     */
    _init_Bscroll() {
      this.bs_left = new BScroll('.goods-left-wrapper', {
        mouseWheel: true,
        ObserveDOM: true,
        bounce: { // 关闭回弹效果
          top: false,
        },
        // BetterScroll 默认会阻止浏览器的原生 click 事件，
        // 派发的 event 参数加一个私有属性 _constructed
        click: true,
      });
      this.bs_right = new BScroll('.goods-right-wrapper', {
        mouseWheel: true,
        ObserveDOM: true,
        probeType: 3, // 滑动和momentum滚动动画过程中派发的scroll事件
      });
      this.bs_right.on('scroll', (pos) => {
        this.currentScrollY = Math.abs(Math.round(pos.y));
      });
    },
    /**
     * 保存每个goods-item的高度
     */
    calculateHeight() {
      const itemList = document.querySelectorAll('.goods-item-hook');
      let totalHeight = 0;
      for (let i = 0; i < itemList.length; i++) {
        totalHeight += itemList[i].getBoundingClientRect().height;
        // getBoundindClientRect.height获取实际渲染高度，而offsetHeight不受缩放影响，clientHeight不包括边框
        this.goodsItem_heightList.push(totalHeight);
      }
    },
    scrollToGoodsItem(index, e) {
      const itemList = document.querySelectorAll('.goods-item-hook');
      this.bs_right.scrollToElement(itemList[index], 0);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../common/css/mixin";
.goods-container {
  position: absolute;
  top: 173px;
  bottom: 0;
  display: flex;
  width: 100%;
  overflow: hidden;
  .goods-left-wrapper {
    flex: 0 1 80px;
    height: calc(100%);
    overflow: hidden;
    background-color: #f3f5f7;
    .menu {
      width: calc(100%);
      /*height: calc(100% - 50px);*/
      padding-bottom: 50px;
      .menu-item {
        height: 54px;
        padding: 0 12px 0 12px;
        .menu-item-container {
          display: flex;
          align-items: center;// 垂直居中
          width: 100%;
          height: 100%;
          font-size: 0;
          .border-1px(rgba(7, 17, 27, 0.1));// 1px border
          .supports-icon {
            display: inline-block;
            margin: 0 1px 1px 0;
            vertical-align: top;
          }
          .menu-name {
            font-size: 12px;
            font-weight: 200;
            color: rgb(77, 85, 93);
            text-align: left;
          }
        }
        &.activeItem {
          background-color: rgb(255, 255, 255);
          .menu-item-container {
            .menu-name {
              font-weight: 700;
              color: rgb(7, 17, 27);
            }
            &::after { border: none; }
          }
        }
        &.borderNone {
          .menu-item-container {
            &::after { border: none; }
          }
        }
      }
    }
  }
  .goods-right-wrapper {
    flex: 1;
    .goods-list {
      padding-bottom: 100px;
      .goods-item {
        .goods-item-name {
          width: 100%;
          padding-left: 12px;
          font-size: 12px;
          line-height: 26px;
          color: rgb(147, 153, 159);
          background-color: #f3f5f7;
          border-left: 2px solid #d9dde1;
        }
        .foods-list {
          padding: 0 18px 0 18px;
          .foods-item {
            display: flex;
            padding: 18px 0 18px 0;
            font-size: 0;
            .border-1px(rgba(7, 17, 27, 0.1));
            &:last-child {
              &::after {
                display: none;
              }
              /*border: none;*/
            }
            .foods-icon {
              flex: 0 1 57px;
              margin-right: 10px;
              & img[lazy=loading] {
                background: url("../../assets/loading.png") no-repeat;
                background-size: cover;
              }
              & img[lazy=error] {
                background: url("../../assets/error.png") no-repeat;
                background-size: cover;
              }
            }
            .foods-item-content {
              flex: 1;
              .foods-name {
                display: block;
                margin-top: 2px;
                font-size: 14px;
                line-height: 14px;
                color: rgb(7, 17, 27);
              }
              .foods-description {
                display: block;
                margin-top: 8px;
                font-size: 10px;
                line-height: 10px;
                color: rgb(147, 153, 159);
              }
              .foods-sellCount-content {
                margin-top: 8px;
                line-height: 10px;
                color: rgb(147, 153, 159);
                .foods-sellCount {
                  display: inline-block;
                  font-size: 10px;
                }
                .foods-rating {
                  display: inline-block;
                  margin-left: 12px;
                  font-size: 10px;
                }
              }
              .foods-price-content {
                /*margin-top: 8px;*/
                .foods-price-icon {
                  display: inline-block;
                  font-size: 10px;
                  font-weight: 700;
                  line-height: 24px;
                  color: rgb(240, 20, 20);
                }
                .foods-price {
                  display: inline-block;
                  font-size: 14px;
                  font-weight: 700;
                  line-height: 24px;
                  color: rgb(240, 20, 20);
                }
                .foods-oldPrice {
                  display: inline-block;
                  margin-left: 8px;
                  font-size: 10px;
                  font-weight: 700;
                  line-height: 24px;
                  color: rgb(147, 153, 159);
                  text-decoration-line: line-through;
                  vertical-align: top;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
