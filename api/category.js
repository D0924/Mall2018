/*
 * @Author: Utopia
 * @Descripttion: Utopia 的代码
 * @Date: 2022-05-26 21:14:54
 * @LastEditTime: 2022-05-26 21:15:13
 * @Description: file content
 */
import {
	service
} from "../utils/request.js"

// 获取分类数据
export function getCategoryList() {
	return service({
		url: '/api/public/v1/categories',
		method: 'GET',
	})
}
