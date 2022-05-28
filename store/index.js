/*
 * @Author: Utopia
 * @Descripttion: Utopia 的代码
 * @Date: 2022-05-27 21:48:23
 * @LastEditTime: 2022-05-28 19:47:40
 * @Description: file content
 */
import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import user from './modules/user'
import getters from './getters'
Vue.use(Vuex)
const store = new Vuex.Store({
	modules: {
		cart, user
	},
	getters
})

export default store
