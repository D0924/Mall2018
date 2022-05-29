/*
 * @Author: Utopia
 * @Descripttion: Utopia 的代码
 * @Date: 2022-05-27 21:50:14
 * @LastEditTime: 2022-05-29 21:36:48
 * @Description: file content
 */
const getters = {
  carts: state => state.cart.carts,
  cartsTotal(state) {
    return state.cart.carts.reduce((total, item) => total += item.goods_count, 0)
  },
  check_count(state) {
    return state.cart.carts.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
  },
  checkGoodsCount(state) {
    return state.cart.carts.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count * item.goods_price, 0).toFixed(2)
  },
  address: (state) => state.user.address,
  addressStr: (state) => {
    if (!state.user.address.provinceName) return ""
    return state.user.address.provinceName + state.user.address.cityName + state.user.address.countyName + state.user.address.detailInfo
  },
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
}
export default getters
