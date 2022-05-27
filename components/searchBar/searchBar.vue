<!--
 * @Author: Utopia
 * @Descripttion: Utopia 的代码
 * @Date: 2022-05-26 22:35:28
 * @LastEditTime: 2022-05-27 10:43:55
 * @Description: file content
-->
<template>
  <view class="search-wrap" :style="{'background-color':bgcColor}" @click="handlerSearchBar">
    <view class="search-box" :style="{'border-radius':radius+'rpx'}">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索好物</text>
    </view>
  </view>
</template>

<script>
export default {
  name: "searchBar",
  props: {
    bgcColor: {
      type: String,
      default: "#C00000"
    },
    radius: {
      type: Number,
      default: 36
    }
  },
  data() {
    return {

    };
  },
  methods: {
    // 事件处理
    handlerSearchBar() {
      this.$emit("click")
    }
  },
}
</script>

<style lang="scss">
.search-wrap {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 100rpx;
  padding: 0 20rpx;
  .search-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60rpx;
    width: 100%;
    font-size: 30rpx;
    background-color: #fff;
    .search {
    }
    .placeholder {
      margin-left: 10rpx;
    }
  }
}
</style>
