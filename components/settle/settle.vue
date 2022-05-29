<!--
 * @Author: Utopia
 * @Descripttion: Utopia 的代码
 * @Date: 2022-05-28 22:34:01
 * @LastEditTime: 2022-05-29 21:40:08
 * @Description: file content
-->
<template>
  <view class="settle-wrap">
    <view class="left" @click="changeRadio">
      <radio :checked="ifFullCheck" color="#C00000" /><text>全选</text>
    </view>
    <view class="content">合计:￥<text class="price">{{checkGoodsCount}}</text></view>
    <view class="rigth" @click="settle">
      结算({{check_count}})
    </view>
  </view>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
export default {
  name: "settle",
  computed: {
    ...mapGetters(['check_count', 'cartsTotal', 'checkGoodsCount', 'addressStr', "token"]),
    // 计算属性处理 全选状态
    ifFullCheck() {
      return this.check_count === this.cartsTotal
    }
  },
  data() {
    return {

    };
  },
  methods: {
    ...mapMutations("cart", ["UPDATE_GOODS_STATE"]),
    // 事件处理
    changeRadio() {
      this.UPDATE_GOODS_STATE(!this.ifFullCheck);
    },
    settle() {
      // 是否已选地址
      if (this.check_count <= 0) {
        uni.showToast({
          icon: "none",
          duration: 3000,
          title: "请选择要结算的商品",
        });
        return;
      }
      // 判断购物车已选商品数量
      if (this.addressStr.length <= 0) {
        uni.showToast({
          icon: "none",
          duration: 3000,
          title: "请选择收货地址",
        });
        return;
      }
      // 判断用户是否登入
      if (this.token.length <= 0) {
        uni.showToast({
          icon: "none",
          duration: 3000,
          title: "请先进行登入",
        });
        uni.switchTab({
          url: `/pages/profile/profile`
        })
        return;
      }
    }
  },
}
</script>

<style lang="scss">
.settle-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  font-size: 14px;
  padding-left: 20rpx;
  width: 100vw;
  height: 100rpx;
  position: fixed;
  bottom: 0;
  .left {
    display: flex;
    align-items: center;
  }
  .content {
    color: #c00000;
    font-weight: 700;
  }
  .rigth {
    color: #fff;
    height: 100rpx;
    line-height: 100rpx;
    font-weight: 700;
    padding: 0 40rpx;
    min-width: 160rpx;
    background-color: #c00000;
  }
}
</style>
