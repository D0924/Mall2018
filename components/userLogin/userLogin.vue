<!--
 * @Author: Utopia
 * @Descripttion: Utopia 的代码
 * @Date: 2022-05-29 21:43:16
 * @LastEditTime: 2022-05-29 22:51:33
 * @Description: file content
-->
<template>
  <view class="login-wrap">
    <uni-icons type="contact" size="100" color="#AFAFAF"></uni-icons>
    <button class="loginBtn" hover-class="loginBtn" type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo"> 一键登入</button>
    <text>登入尽享更多权益</text>
  </view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import { wxlogin } from '@/api/user.js';

import { mapGetters, mapMutations } from "vuex"
export default {
  name: "userLogin",
  components: { uniIcons },
  computed: {
    ...mapGetters(["token", "userInfo"])
  },
  data() {
    return {

    };
  },
  methods: {
    ...mapMutations('user', ['UPDATE_USERINFO']),
    // 事件处理
    async getUserInfo(data) {
      const { detail: { errMsg, userInfo } } = data
      if (errMsg !== "getUserInfo:ok") {
        uni.showToast({
          icon: "none",
          duration: 3000,
          title: "取消登入成功！",
        });
      }
      await this.login(data.detail);

      this.UPDATE_USERINFO(userInfo)
    },
    // 登入
    async login(userInfo) {
      const [cb_error, cb_success] = await uni.login().catch(err => err)
      if (cb_error || (cb_success.errMsg != "login:ok")) {
        uni.showToast({
          icon: "none",
          duration: 3000,
          title: "登入失败！",
        });
        return
      }
      const queryData = {
        code: cb_success.code,
        iv: userInfo.iv,
        rawData: userInfo.rawData,
        signature: userInfo.signature,
        encryptedData: userInfo.encryptedData,
      }

      console.log(queryData)
      // 换取token
      const result = await wxlogin(queryData)
      console.log(result)
    }
  },

}
</script>

<style lang="scss">
.login-wrap {
  position: relative;
  display: flex;
  height: 750rpx;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
  overflow: hidden;
  &::after {
    position: absolute;
    border-radius: 100%;
    bottom: 0;
    left: 0;
    display: block;
    content: "";
    width: 100%;
    height: 80rpx;
    background-color: #fff;
    transform: translateY(50%);
  }
  button {
    width: 90vw;
    border-radius: 200rpx;
    margin: 30rpx 0;
    background-color: #c00000;
  }
  text {
    font-size: 24rpx;
    color: gray;
  }
}
</style>
