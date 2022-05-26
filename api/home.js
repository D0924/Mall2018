import {
	service
} from "../utils/request.js"

// 获取轮播图数据
export function getSwiperList() {
	return service({
		url: '/api/public/v1/home/swiperdata',
		method: 'GET',
	})
}

// 获取首页分类选项数据
export function getNavCategoryList() {
	return service({
		url: '/api/public/v1/home/catitems',
		method: 'GET',
	})
}

// 获取首页楼层数据
export function getFloordataList() {
	return service({
		url: '/api/public/v1/home/floordata',
		method: 'GET',
	})
}
