<!--
 * @Author: Utopia
 * @Descripttion: Utopia 的代码
 * @Date: 2022-05-28 16:58:29
 * @LastEditTime: 2022-05-28 22:30:21
 * @Description: file content
-->
<template>
  <view>
    <!-- 按钮 -->
    <view class="addressButton" v-if="JSON.stringify(this.address) == '{}'">
      <button type="primary" size="mini" @click="chooseAddress">
        请选择收货地址
      </button>
    </view>
    <!-- 地址信息 -->
    <view class="address-info" v-else @click="chooseAddress">
      <view class="ad-info">
        <view class="info-wrap">
          <view class="user-name">收货人:<text>{{address.userName}}</text></view>
          <view class="user-phonenum">电话:<text>{{address.telNumber}}</text>
            <uni-icons type="arrowright" size="12"></uni-icons>
          </view>
        </view>
      </view>
      <view class="ad-details">
        <view> 详情地址：</view>
        <view> {{addressStr}}</view>
      </view>
    </view>
    <!-- 边框 -->
    <image class="addressBorder" src="/static/cart_border@2x.png" />
  </view>
</template>

<script>
import { mapMutations, mapGetters } from "vuex"
import uniIcons from '@/components/uni-icons/uni-icons.vue';
export default {
  components: { uniIcons },
  name: "shippingAddress",
  computed: {
    ...mapGetters(['addressStr', 'address']),
  },
  data() {
    return {

    };
  },
  methods: {
    ...mapMutations("user", ["UPDATE_ADDRESS"]),
    // 选择收货地址
    async chooseAddress() {
      const [err, success] = await uni.chooseAddress().catch(err => err);
      // 成功选择地址
      if (err === null && success.errMsg === "chooseAddress:ok") {
        this.address = success
        this.UPDATE_ADDRESS(success);
      }
      // 用户没有授权 后面的条件兼容ios
      if (err && (err.errMsg === "chooseAddress:fail auth deny" || err.errMsg === "chooseAddress:fail no response")) {
        // 重新调取授权
        thsi.reAuth();
      }
    },
    // 让用户重新授权
    async reAuth() {
      // 提示用户进行授权
      const { err, res } = await uni.showModal({
        title: '请求授权',
        content: '小程序需要访问你的地址权限,是否允许?',
        confirm: "允许",
        cancelText: "取消"
      });
      if (err) return;
      // 如果用户点击了取消按钮
      if (res.cancel) return uni.showToast({
        icon: "none",
        duration: 2000,
        title: "您取消了授权",
      });

      // 进一步处理
      if (res.confirm) return uni.getSetting({
        success: ({ authSetting }) => {
          if (authSetting.authSetting['scope.address']) return uni.showToast({
            icon: "none",
            duration: 2000,
            title: "授权成功！",
          });
          if (!authSetting.authSetting['scope.address']) return uni.showToast({
            icon: "none",
            duration: 2000,
            title: "您取消了授权！",
          });
        },
        fail: (error) => { }
      })
    }
  },
}
</script>

<style lang="scss">
.addressButton {
  height: 140rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.address-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 24rpx;
  padding: 0 20rpx;
  .info-wrap {
    display: flex;
    justify-content: space-between;
    padding: 10rpx 0;
  }
  .ad-details {
    display: flex;
    padding-bottom: 10rpx;
  }
}

.addressBorder {
  display: block;
  height: 10rpx;
  width: 100%;
}
</style>
