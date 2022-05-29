/*
 * @Author: Utopia
 * @Descripttion: Utopia 的代码
 * @Date: 2022-05-28 19:24:05
 * @LastEditTime: 2022-05-29 22:45:56
 * @Description: file content
 */
const state = {
	address: JSON.parse(uni.getStorageSync("address") || "{}"),
	token: "",
	userInfo: JSON.parse(uni.getStorageSync("userInfo") || "{}"),
};

// mutations 操作 state
const mutations = {
	UPDATE_ADDRESS(state, datda) {
		state.address = datda;
		this.commit("user/SAVE_TO_STORAGE")
	},
	SAVE_TO_STORAGE(state) {
		uni.setStorageSync('address', JSON.stringify(state.address))
	},
	UPDATE_USERINFO(state, userInfo) {
		state.userInfo = userInfo;
		this.commit("user/SAVE_USERINFO_TO_STORAGE")
	},
	SAVE_USERINFO_TO_STORAGE(state) {
		uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
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
