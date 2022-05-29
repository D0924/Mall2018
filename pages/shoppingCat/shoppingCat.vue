<!--
 * @Author: Utopia
 * @Descripttion: Utopia 的代码
 * @Date: 2022-05-26 09:34:28
 * @LastEditTime: 2022-05-29 21:21:44
 * @Description: file content
-->
<template>
  <view>
    <!-- 购物车为空页面结构 -->
    <view class="cart-wrap" v-if="carts.length!=0">
      <!-- 收货地址组件 -->
      <shippingAddress />
      <!-- 购物车标题部分 -->
      <view class="cart-title">
        <uni-icons type="shop" size="18"></uni-icons>
        <text>购物车</text>
      </view>
      <!-- 购物车商品部分 -->
      <!-- <view>
      <goodsItem v-for="(goods,index) in carts" :key="index" :goods="goods" :showRadio="true" :showNumberBox="true" @raido-change="raidoChange" @num-change="numChange"></goodsItem>
    </view> -->
      <!-- 购物车部分新增左滑删除 -->
      <uni-swipe-action>
        <block v-for="(goods,index) in carts" :key="index">
          <uni-swipe-action-item :options="options" @click="handlerSwipeActionItem(goods)">
            <goods-item :goods="goods" :showRadio="true" :showNumberBox="true" @raido-change="raidoChange" @num-change="numChange" />
          </uni-swipe-action-item>
        </block>
      </uni-swipe-action>
      <!-- 底部结算区域 -->
      <settle></settle>
    </view>
    <!-- 购物车非空空页面结构 -->
    <view v-else>
      <view class="empty">
        <image src="/static/cart_empty@2x.png" />
        <text>这里空空如也</text>
      </view>
    </view>
  </view>
</template>

<script>
import tabBarBadge from "@/mixins/tabBarBadge.js";

import uniIcons from '@/components/uni-icons/uni-icons.vue';
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue';
import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue';

import goodsItem from '@/components/goodsItem/goodsItem.vue';
import shippingAddress from '@/components/shippingAddress/shippingAddress.vue';
import settle from '@/components/settle/settle.vue';
import { mapGetters, mapMutations } from 'vuex';
export default {
  components: { uniIcons, uniSwipeAction, uniSwipeActionItem, goodsItem, shippingAddress, settle },
  mixins: [tabBarBadge],
  computed: {
    ...mapGetters(['carts', ['carts']])
  },
  data() {
    return {
      options: [
        {
          "text": "删除",
          "style": {
            backgroundColor: "#C00000"
          }
        }
      ]
    };
  },
  methods: {
    ...mapMutations('cart', ["UPDATE_TO_CART", "UPDATE_NUM_TO_CART", "REMOVE_GOODS_BY_ID"]),
    // 
    raidoChange(goods) {
      this.UPDATE_TO_CART(goods)
    },
    numChange(data) {
      console.log(data);
      this.UPDATE_NUM_TO_CART(data)
    },
    // 事件处理
    handlerSwipeActionItem(goods) {
      console.log(goods)
      this.REMOVE_GOODS_BY_ID(goods)
    }
  },
};
</script>

<style lang="scss">
.cart-wrap {
  padding-bottom: 100rpx;
}
.cart-title {
  display: flex;
  height: 80rpx;
  align-items: center;
  font-size: 28rpx;
  padding-left: 10rpx;
  border-bottom: 2rpx solid #efefef;
  text {
    margin-left: 20rpx;
  }
}

.empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 300rpx;
  image {
    width: 180rpx;
    height: 180rpx;
  }
  text {
    font-size: 24rpx;
    color: gray;
    margin-top: 30rpx;
  }
}
</style>
