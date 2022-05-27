<!--
 * @Author: Utopia
 * @Descripttion: Utopia 的代码
 * @Date: 2022-05-26 09:33:53
 * @LastEditTime: 2022-05-27 10:48:16
 * @Description: file content
-->
<template>
  <view>
    <searchBar @click="click" />
    <view class="scroll-view-wrap">
      <scroll-view class="left" :style="{ height: windowHeight + 'px' }" scroll-y>
        <view :class="['left-scroll-view', index === active ? 'active' : '']" @click="handlerChangeActive(index)" v-for="(item, index) in categoryList" :key="index">
          {{ item.cat_name }}
        </view>
      </scroll-view>

      <scroll-view class="right" :style="{ height: windowHeight + 'px' }" scroll-y :scroll-top="scorllTop">
        <view v-for="(item, index) in categoryListLevel2" :key="index">
          <view class="title">/{{ item.cat_name }}/</view>
          <view class="wrap">
            <view class="wrap-item" v-for="(item2, index) in item.children" :key="index" @click="handlerCategoryLevel3Click(item.cat_id)">
              <image :src="item2.cat_icon" mode="scaleToFill" />
              <text>{{ item2.cat_name }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import {
  getCategoryList
} from "@/api/category.js";
export default {
  onLoad() {
    // 获取设备信息
    const {
      windowHeight
    } = uni.getSystemInfoSync();
    this.windowHeight = windowHeight - 50; // 同时减去 自动搜索组件的高度
    // 获取分类数据
    this.getCategoryList();
  },
  data() {
    return {
      windowHeight: 0,
      active: 0,
      scorllTop: 0,
      categoryList: [],
      categoryListLevel2: [],
      categoryListLevel3: [],
    };
  },
  methods: {
    // 数据请求
    async getCategoryList() {
      const {
        message
      } = await getCategoryList();
      this.categoryList = message;
      this.categoryListLevel2 = message[0].children;
    },
    // 事件处理
    handlerChangeActive(index) {
      this.active = index;
      // 重新对二级分类进数据进行改变
      this.categoryListLevel2 = this.categoryList[index].children;
      // 回到顶部 不能每次的值都一样不然无法成功回到顶部
      this.scorllTop = Math.random();
    },
    handlerCategoryLevel3Click(id) {
      uni.navigateTo({
        url: `/subPackage/goodsList/goodsList?id=${id}`
      })
    },
    click() {
      uni.navigateTo({
        url: `/subPackage/search/search`
      })

    }
  },
};
</script>

<style lang="scss">
.scroll-view-wrap {
  display: flex;
  align-items: flex-start;

  .left {
    width: 240rpx;

    .left-scroll-view {
      background-color: #f7f7f7;
      line-height: 120rpx;
      font-style: 12px;
      text-align: center;

      // & 父元素的引用 &.active 同时包含两个类名
      &.active {
        position: relative;
        background-color: #fff;

        &::before {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          content: " ";
          display: block;
          width: 6rpx;
          height: 60rpx;
          background: #c00000;
        }
      }
    }
  }

  .right {
    .title {
      font-size: 24rpx;
      font-weight: 700;
      text-align: center;
      padding: 30rpx 0;
    }

    .wrap {
      display: flex;
      flex-wrap: wrap;

      .wrap-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 33.333%;
        margin-bottom: 20rpx;

        image {
          width: 120rpx;
          height: 120rpx;
        }

        text {
          font-style: 24rpx;
        }
      }
    }
  }
}
</style>
