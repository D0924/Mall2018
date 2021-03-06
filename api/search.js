/*
 * @Author: Utopia
 * @Descripttion: Utopia 的代码
 * @Date: 2022-05-27 11:10:33
 * @LastEditTime: 2022-05-27 11:34:07
 * @Description: file content
 */
import {
	service
} from "../utils/request.js"

// 搜索建议查询
export function getSearchList(query) {
	return service({
		url: '/api/public/v1/goods/qsearch',
		method: 'GET',
		data: query
	})
}

// 获取商品列表数据
export function getSearchList2(query) {
	return service({
		url: '/api/public/v1/goods/search',
		method: 'GET',
		data: query
	})
}

// 获取商品详情
export function getGoodsDetail(data) {
	return service({
		url: '/api/public/v1/goods/detail',
		method: 'GET',
		data
	})
}
