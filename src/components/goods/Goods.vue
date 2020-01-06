<template>
  <div class="goods-container">
    <div class="goods-left-wrapper">
      <ul class="menu">
        <li v-for="(item,index) in goods" :key="index" class="menu-item">
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
        <li v-for="(goodsItem,goodsIndex) in goods" :key="goodsIndex" class="goods-item">
          <div class="goods-item-name">{{goodsItem.name}}</div>
          <ul class="foods-list">
            <li v-for="(foodsItem,foodsIndex) in goodsItem.foods"
                :key="foodsIndex" class="foods-item">
              <div class="foods-icon"><img :src="foodsItem.icon" width="57px" height="57px"/></div>
              <div class="foods-item-content">
                <span class="foods-name">{{foodsItem.name}}</span>
                <span v-if="foodsItem.description" class="foods-description">
                  {{foodsItem.description}}
                </span>
                <div class="foods-sellCount-content">
                  <span>月售{{foodsItem.sellCount}}份</span>
                  <span>好评率{{foodsItem.rating}}%</span>
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
import SupportsIcon from '@/components/supportsIcon/SupportsIcon';

export default {
  name: 'Goods',
  components: {
    SupportsIcon,
  },
  data() {
    return {
      goods: {},
    };
  },
  created() {
    this.$_api.goods.getGoodsList().then((res) => {
      if (res && res.code === 0) {
        this.goods = res.data;
      }
    }).catch((err) => {});
  },
};
</script>

<style lang="less" scoped>
@import "../../common/css/mixin";
.goods-container {
  position: absolute;
  top: 174px;
  bottom: 0;
  display: flex;
  width: 100%;
  overflow: hidden;
  .goods-left-wrapper {
    flex: 0 1 80px;
    background-color: #f3f5f7;
    .menu {
      /*width: calc(100%);*/
      height: calc(100% - 50px);
      padding-bottom: 50px;
      overflow: auto;
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
            margin-right: 1px;
            vertical-align: top;
          }
          .menu-name {
            font-size: 12px;
            font-weight: 200;
            color: rgb(77, 85, 93);
            text-align: left;
          }
        }
      }
    }
  }
  .goods-right-wrapper {
    flex: 1;
    .goods-list {
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
            &:first-child { border: none; }
            .foods-icon {
              flex: 0 1 57px;
              margin-right: 10px;
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
                font-size: 10px;
                line-height: 10px;
                color: rgb(147, 153, 159);
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
