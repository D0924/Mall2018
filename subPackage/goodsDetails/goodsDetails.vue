<template>
  <view class="goods_details" v-if="goodsInfo.goods_name">
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="swiper">
      <swiper-item v-for="(swiper,index) in goodsInfo.pics" :key="index" class="swiper-item">
        <view>
          <image :src="swiper.pics_big" @click="preview(index)"></image>
        </view>
      </swiper-item>
    </swiper>
    <!-- 商品信息 -->
    <view class="goods_info_wrap">
      <view class="good_price">￥{{goodsInfo.goods_price}}</view>
      <view class="goods_content">
        <view class="goods_name">
          {{goodsInfo.goods_name}}
        </view>
        <view class="collect">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <view class="freight">快递:免运费</view>
    </view>
    <!-- 富文本 -->
    <rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
    <!-- 加入购物车组件 -->
    <view class="goods_nav">
      <uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup" @click="handlerGoodsNavClick" @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getGoodsDetail } from "@/api/search.js"
export default {
  onLoad(options) {
    this.getGoodsDetail({ "goods_id": options.goods_id })
  },
  watch: {
    cartsTotal: {
      deep: true,
      immediate: true,
      handler(newValue) {
        const isExist = this.options.find(x => x.text === "购物车")
        if (isExist) {
          isExist.info = newValue;
        }
      }

    }
  },
  computed: {
    ...mapGetters(['cartsTotal']),
  },
  data() {
    return {
      goodsInfo: {},
      options: [{
        icon: 'shop',
        text: '店铺',
        infoBackgroundColor: '#007aff',
        infoColor: "#f5f5f5"
      }, {
        icon: 'cart',
        text: '购物车',
        info: 0
      }],
      buttonGroup: [{
        text: '加入购物车',
        backgroundColor: '#FFCD1E',
        color: '#f0f'
      },
      {
        text: '立即购买',
        backgroundColor: '#EF1224',
        color: '#f0f'
      }
      ]
    };
  },
  methods: {
    ...mapMutations('cart', ['ADD_TO_CART']),
    // 网络请求
    async getGoodsDetail(goods_id) {
      try {
        const {
          message
        } = await getGoodsDetail(goods_id)
        this.goodsInfo = message
        // 处理一下 渲染的文本 有底部空白图片的问题 和 ios 设备无法展示 webp 的问题
        const goods_introduce = message.goods_introduce.replace(/<img /g, '<img style="display:block;"')
          .replace(/webp/g, "jpg");
        this.goodsInfo.goods_introduce = goods_introduce;
      } catch (e) { }
    },
    // 轮播图预览
    preview(index) {
      uni.previewImage({
        current: index,
        urls: this.goodsInfo.pics.map(x => x.pics_big)
      })
    },
    // 底部购物车点击事件
    handlerGoodsNavClick(e) {
      console.log(e);
      if (e.content.text === "购物车") {
        uni.switchTab({
          url: '/pages/shoppingCat/shoppingCat'
        })
      }
    },
    buttonClick(e) {
      if (e.content.text === '加入购物车') {
        const goods = {
          goods_id: this.goodsInfo.goods_id,
          goods_name: this.goodsInfo.goods_name,
          goods_price: this.goodsInfo.goods_price,
          goods_count: 1,
          goods_small_logo: this.goodsInfo.goods_small_logo,
          goods_state: true
        }
        // 存入 state
        this.ADD_TO_CART(goods);
      }
    }
  }
}
</script>

<style lang="scss">
// 轮播图
.swiper {
  width: 100%;
  height: 375rpx;
  image {
    width: 100%;
  }
}

// 商品详情
.goods_info_wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20rpx 0 20rpx 20rpx;

  .good_price {
    color: #c00000;
    font-weight: 700;
    font-size: 36rpx;
    margin: 20rpx 0;
  }

  .goods_content {
    display: flex;
    justify-content: space-between;
    font-size: 26rpx;

    .goods_name {
      margin: 0 20rpx;
    }

    .collect {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 240rpx;
      font-size: 24rpx;
      border-left: 2rpx solid #efefef;
      color: gray;
    }
  }

  .freight {
    font-size: 24rpx;
    color: gray;
    margin: 20rpx 0;
  }
}

// 底部购物车导航
.goods_nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
}
</style>
