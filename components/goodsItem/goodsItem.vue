<!--
 * @Author: Utopia
 * @Descripttion: Utopia 的代码
 * @Date: 2022-05-27 19:34:22
 * @LastEditTime: 2022-05-28 16:42:27
 * @Description: file content
-->
<template>
  <view>
    <view class="goods-item">
      <view class="right">
        <radio v-if="showRadio" class="radio" :checked="goods.goods_state" color="#c00000" @click="radioChange" />
        <image :src="goods.goods_small_logo" mode=""></image>
      </view>
      <view class="left">
        <view class="title">
          {{goods.goods_name}}
        </view>
        <view class="goods_info">
          <view class="price">￥{{goods.goods_price|toFixed}}</view>
          <uni-number-box class="number-box" v-if="showNumberBox" :min="1" :value="goods.goods_count" @change="numberBoxChange"></uni-number-box>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue';
export default {
  components: { uniNumberBox },
  name: "goodsItem",
  props: {
    goods: {
      type: Object,
      default: {}
    },
    showRadio: {
      type: Boolean,
      default: false
    },
    showNumberBox: {
      type: Boolean,
      default: false
    },
  },
  filters: {
    toFixed(num) {
      return parseInt(num, 10).toFixed(2)
    }
  },
  methods: {
    radioChange() {
      const goods = { goods_id: this.goods.goods_id, goods_state: !this.goods.goods_state }
      this.$emit("raido-change", goods);
    },
    numberBoxChange(num) {
      let obj = { goods_id: this.goods.goods_id, num: parseInt(num, 10) }
      this.$emit("num-change", obj)
    }
  },
}
</script>

<style lang="scss">
.goods-item {
  display: flex;
  box-sizing: border-box;
  width: 750rpx;
  padding: 20rpx 10rpx;
  border-bottom: 2rpx solid #f0f0f0;

  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10rpx;
    image {
      width: 200rpx;
      height: 200rpx;
      display: block;
    }
  }

  .left {
    font-size: 26rpx;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    padding: 20rpx 10rpx;
    .title {
      overflow: hidden;
      -webkit-line-clamp: 3;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
    .goods_info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .price {
        color: #c00000;
        font-size: 32rpx;
        font-weight: 700;
      }
    }
  }
}
</style>
