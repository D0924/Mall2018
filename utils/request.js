/*
 * @Author: Utopia
 * @Descripttion: Utopia 的代码
 * @Date: 2022-05-26 22:16:34
 * @LastEditTime: 2022-05-27 10:32:09
 * @Description: file content
 */
let server_url = "https://www.uinav.com"; //请求根路径（服务器地址）
let token = ""; //token令牌
// process.env.NODE_ENV === 'development' ? 'http://192.168**:6002' : 'http://***/api'; //环境配置
//向外暴露一个方法，传入一个空对象
export function service(options = {}) {
	// uni.getStorageSync('token') && (token = uni.getStorageSync('token')); //从本地缓存中获取token
	options.url = `${server_url}${options.url}`; //前面为你的服务器地址，后面为具体接口地址
	//配置请求头
	options.header = {
		// 'content-type': 'application/json',//默认请求头，可不写
		// 'Authorization': `${token}` //Bearer ，你请求数据需要的自定义请求头（令牌）
	};
	// 创建promise
	return new Promise((resolved, rejected) => {
		//成功
		options.success = (res) => {
			if (Number(res.statusCode) == 200) {
				//请求成功
				resolved(res.data); //请求成功时返回接口数据
			} else {
				uni.showToast({
					icon: "none",
					duration: 3000,
					title: `${res.data.meta.msg}`,
				});
				rejected(res.data.meta.msg); //请求失败时返回错误信息
			}
		};
		//错误
		options.fail = (err) => {
			rejected(err); //请求失败时返回错误信息
		};
		uni.request(options); //传入配置好的对象
	});
}
