<!--
 * @Author: Utopia
 * @Descripttion: Utopia 的代码
 * @Date: 2022-05-27 10:46:39
 * @LastEditTime: 2022-05-27 11:59:55
 * @Description: file content
-->
<template>
	<view>
		<!-- 顶部搜索 -->
		<view class="search-box">
			<uni-search-bar @input="handlerSearchBarInput" :radius="100" cancelButton="none">
			</uni-search-bar>
		</view>
		<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="(searchRestList.length !== 0)||(this.keyWord.length==0)">
			<view class="sugg-item" v-for="(item, i) in searchRestList" :key="i" @click="handlerGoDetail(item)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<!-- 标题区域 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="clean"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history-list">
				<uni-tag :text="item" v-for="(item,index) in histories" :key="index"
					@click="handlerHistoryItemClick(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getSearchList
	} from "@/api/search.js";

	export default {
		computed: {
			histories() {
				return [...this.historyList].reverse()
			}
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('searchkeyWord') || '[]');
		},
		data() {
			return {
				timer: null,
				keyWord: "",
				searchRestList: [],
				historyList: []
			};
		},
		methods: {
			async getSearchList() {
				if (!(this.keyWord.length === 0)) {
					this.searchRestList = [];
					try {
						const {
							message
						} = await getSearchList({
							query: this.keyWord
						});
						this.searchRestList = message;
						// 保存搜索记录
						this.savehistoryList()
					} catch (error) {

					}
				}
			},
			// 事件处理
			handlerSearchBarInput(e) {
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					this.keyWord = e.value;
					this.getSearchList();
				}, 500)
			},
			// 建议列表点击事件
			handlerGoDetail(item) {
				uni.navigateTo({
					url: '/subPackage/goodsDetails/goodsDetails?goods_id=' + item.goods_id
				})
			},
			clean() {
				this.historyList = []
				uni.clearStorageSync("searchkeyWord", '[]');
			},
			savehistoryList() {
				const set = new Set(this.historyList);
				set.delete(this.keyWord)
				set.add(this.keyWord)
				this.historyList = Array.from(set);
				uni.setStorageSync("searchkeyWord", JSON.stringify(this.historyList))
			},
			handlerHistoryItemClick(item) {
				this.keyWord = item;
				this.getSearchList();
			}
		},
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.sugg-list {
		padding: 0 10rpx;

		.sugg-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 24rpx;
			padding: 13rpx 0;
			border-bottom: 2px solid #efefef;

			.goods-name {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}

	.history-box {
		padding: 0 10rpx;

		.history-title {
			display: flex;
			justify-content: space-between;
			height: 80rpx;
			align-items: center;
			font-size: 26rpx;
			border-bottom: 2px solid #efefef;
		}

		.history-list {
			display: flex;
			flex-wrap: wrap;

			.uni-tag {
				margin-top: 10rpx;
				margin-right: 10rpx;
			}
		}
	}
</style>
