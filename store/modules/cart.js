/*
 * @Author: Utopia
 * @Descripttion: Utopia 的代码
 * @Date: 2022-05-27 21:50:00
 * @LastEditTime: 2022-05-28 23:00:27
 * @Description: 
 */

const state = {
	carts: JSON.parse(uni.getStorageSync("carts") || "[]")
};

// mutations 操作 state
const mutations = {
	// 添加至购物车 请不要使用 箭头函数
	ADD_TO_CART(state, goods) {
		// 如果在购物车找到相同的 商品数据
		const findResult = state.carts.find(_ => _.goods_id === goods.goods_id)
		if (!findResult) { // 不存在则push
			state.carts.push(goods)
		} else { // 存在 数量 +1
			findResult.goods_count++;
		}
		// 购物车数据发送变动存储到本地
		this.commit("cart/SAVE_TO_STORAGE")
	},
	// 将给购物车数据持久化到本地
	SAVE_TO_STORAGE(state) {
		uni.setStorageSync('carts', JSON.stringify(state.carts))
	},
	// 更新购物车中商品状态
	UPDATE_TO_CART(state, goods) {
		const flag = state.carts.find(_ => _.goods_id === goods.goods_id)
		if (flag) {
			flag.goods_state = goods.goods_state
			this.commit("cart/SAVE_TO_STORAGE")
		}
	},
	// 更新购物车中商品数量
	UPDATE_NUM_TO_CART(state, goods) {
		const flag = state.carts.find(_ => _.goods_id === goods.goods_id)
		if (flag) {
			flag.goods_count = goods.num;
			this.commit("cart/SAVE_TO_STORAGE")
		}
	},
	// 根据传过来的 id 去删除缓存中的数据
	REMOVE_GOODS_BY_ID(state, goods) {
		state.carts = state.carts.filter(_ => _.goods_id != goods.goods_id)
		this.commit("cart/SAVE_TO_STORAGE")
	}
};

// actions 异步操作 触发 mutations
const actions = {
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
