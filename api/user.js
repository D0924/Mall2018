/*
 * @Author: Utopia
 * @Descripttion: Utopia 的代码
 * @Date: 2022-05-29 22:44:36
 * @LastEditTime: 2022-05-29 22:44:59
 * @Description: file content
 */

import {
	service
} from "../utils/request.js"

// 用户登入换取token
export function wxlogin(queryData) {
	return service({
		url: '/api/public/v1/users/wxlogin',
		method: 'POST',
		data: queryData
	})
}

