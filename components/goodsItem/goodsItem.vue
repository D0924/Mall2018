<template>
	<view>
		<view class="goods-item">
			<view class="right">
				<image :src="goods.goods_small_logo" mode=""></image>
			</view>
			<view class="left">
				<view class="title">
					{{goods.goods_name}}
				</view>
				<view class="price">￥{{goods.goods_price|toFixed}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getSearchList2
	} from "@/api/search.js"
	export default {
		name: "goodsItem",
		props: {
			goods: {
				type: Object,
				default: {}
			}
		},
		filters: {
			toFixed(num) {
				return parseInt(num, 10).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		padding: 20rpx 10rpx;
		border-bottom: 2rpx solid #F0F0F0;

		.right {
			margin: 10rpx;

			image {
				width: 200rpx;
				height: 200rpx;
				display: block;
			}
		}

		.left {
			font-size: 26rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 20rpx 10rpx;

			.title {}

			.price {
				color: #C00000;
				font-size: 32rpx;
				font-weight: 700;
			}
		}
	}
</style>
