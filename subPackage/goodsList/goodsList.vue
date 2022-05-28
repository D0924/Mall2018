<template>
  <view class="goods-wrap">
    <view class="good-list">
      <view v-for="(goods,index) in goodsList" :key="index" @click="goToDetails(goods)">
        <goodsItem :goods="goods"></goodsItem>
      </view>
      <view class="toTop">
        <uni-icons type="paperplane-filled" size="17" color="#C55555" @click="toTop"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script>
import {
  getSearchList2
} from "@/api/search.js"
export default {
  onLoad(options) {
    this.queryData.query = options.query || ''
    this.queryData.cid = options.cid || ''
    this.getSearchList2();
  },
  data() {
    return {
      // 请求参数对象
      queryData: {
        query: "",
        cid: "",
        pagenum: 1,
        pagesize: 10,
        throttleFlag: false
      },
      goodsList: [],
      total: 0
    };
  },
  // 上拉触底事件
  onReachBottom() {
    this.queryData.pagenum = parseInt(this.queryData.pagenum, 10) + 1;

    // 判断数据是否到底
    if (this.queryData.pagenum * this.queryData.pagesize >= this.total) {
      uni.showToast({
        icon: "none",
        title: "已经是全部数据了去别处看看吧！",
        duration: 3000
      });
      return;
    }
    // 节流
    if (this.throttleFlag) return;
    this.getSearchList2();
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.queryData.pagenum = 1;
    this.queryData.pagenum = 10;
    this.total = 0;
    this.throttleFlag = false;
    this.goodsList = [];
    this.getSearchList2(() => {
      uni.stopPullDownRefresh()
    });
  },
  methods: {
    async getSearchList2(cb) {
      // 开启节流阀门
      this.throttleFlag = true;
      const {
        message: {
          goods,
          total,
          pagenum
        }
      } = await getSearchList2(this.queryData);

      this.goodsList = [...this.goodsList, ...goods];
      this.total = total;
      this.queryData.pagenum = pagenum;
      // 关闭节流阀门
      this.throttleFlag = false;
      cb && cb();
    },
    toTop() {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 600
      });
    },
    goToDetails(goods) {
      uni.navigateTo({
        url: '/subPackage/goodsDetails/goodsDetails?goods_id=' + goods.goods_id
      })
    }
  }
}
</script>

<style lang="scss">
.goods-wrap {
  position: relative;
}

.good-list {
  .toTop {
    position: fixed;
    right: 60rpx;
    bottom: 30rpx;
    border: 2rpx solid #c00000;
    border-radius: 50%;
    padding: 10rpx;
  }
}
</style>
