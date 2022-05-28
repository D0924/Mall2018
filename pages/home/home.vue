<template>
  <view>
    <view class="search-box">
      <searchBar @click="click" />
    </view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
      <!-- 轮播图部分 -->
      <swiper-item v-for="(swiperItem, index) in swiperList" :key="index" @click="handlerSwiperClick(swiperItem.goods_id)">
        <view class="swiper-item">
          <image :src="swiperItem.image_src"></image>
        </view>
      </swiper-item>
    </swiper>
    <!-- 分类导航 -->
    <view class="nav-list">
      <view v-for="(item, index) in categoryList" :key="index" @click="handlerCategoryClick(item)">
        <image :src="item.image_src" class="img"></image>
      </view>
    </view>
    <!-- 楼层 -->
    <view class="floor-list">
      <view class="floor-item" v-for="(item, index) in floorList" :key="index">
        <image class="floor-title" :src="item.floor_title.image_src"></image>
        <view class="floor-wrap">
          <view class="left">
            <navigator :url="item.product_list[0].url">
              <image :src="item.product_list[0].image_src" :style="{ width: item.product_list[0].image_width + 'rpx' }"></image>
            </navigator>
          </view>
          <view class="right">
            <view v-for="(item, index) in item.product_list" :key="index">
              <navigator :url="item.url" v-if="index !== 0">
                <image :src="item.image_src" :style="{ width: item.image_width + 'rpx' }" mode="widthFix">
                </image>
              </navigator>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  getSwiperList,
  getNavCategoryList,
  getFloordataList,
} from "@/api/home.js";

import tabBarBadge from "@/mixins/tabBarBadge.js";

export default {
  mixins: [tabBarBadge],
  data() {
    return {
      swiperList: [],
      categoryList: [],
      floorList: [],
    };
  },
  // 监听页面加载获取数据
  onLoad() {
    this.getSwiperList();
    this.getNavCategoryList();
    this.getFloordataList();
  },
  methods: {
    async getSwiperList() {
      try {
        const { message } = await getSwiperList();
        this.swiperList = message;
      } catch (e) {
        console.log(e);
      }
    },
    async getNavCategoryList() {
      try {
        const { message } = await getNavCategoryList();
        this.categoryList = message;
      } catch (e) {
        console.log(e);
      }
    },
    async getFloordataList() {
      try {
        const { message } = await getFloordataList();
        message.forEach((floor) => {
          floor.product_list.forEach((prod) => {
            prod.url =
              "/subPackage/goodsList/goodsList?" +
              prod.navigator_url.split("?")[1];
          });
        });
        this.floorList = message;
      } catch (e) {
        console.log(e);
      }
    },
    // 事件处理部分
    handlerSwiperClick(id) {
      uni.navigateTo({
        url: `/subPackage/goodsDetails/goodsDetails?id=${id}`,
      });
    },
    handlerCategoryClick(item) {
      console.log(item);
      if (item.name === "分类") {
        uni.switchTab({
          url: "/pages/category/category",
        });
      }
    },
    click() {
      uni.navigateTo({
        url: `/subPackage/search/search`,
      });
    },
  },
};
</script>

<style lang="scss">
.search-box {
  position: sticky;
  top: 0;
  z-index: 100;
}
// 轮播图
swiper {
  height: 330rpx;

  .swiper-item,
  image {
    width: 100%;
    height: 100%;
  }
}

// 分类
.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 30rpx 0;

  .img {
    width: 128rpx;
    height: 140rpx;
  }
}

.floor-list {
  .floor-wrap {
    display: flex;

    .left {
      padding-left: 10rpx;
    }

    .right {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;

      image {
        height: 100%;
      }
    }
  }

  .floor-title {
    height: 60rpx;
    width: 100%;
    display: flex;
  }
}
</style>
