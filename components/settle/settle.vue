<!--
 * @Author: Utopia
 * @Descripttion: Utopia 的代码
 * @Date: 2022-05-28 22:34:01
 * @LastEditTime: 2022-05-28 23:05:50
 * @Description: file content
-->
<template>
  <view class="settle-wrap">
    <view class="left">
      <radio :checked="true" color="#C00000" /><text>全选</text>
    </view>
    <view class="content">合计:￥<text class="price">100.00</text></view>
    <view class="rigth">
      结算({{check_count}})
    </view>
  </view>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "settle",
  computed: {
    ...mapGetters(['check_count'])
  },
  data() {
    return {

    };
  },
  methods: {

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
