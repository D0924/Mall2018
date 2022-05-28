/*
 * @Author: Utopia
 * @Descripttion: Utopia 的代码
 * @Date: 2022-05-27 21:50:14
 * @LastEditTime: 2022-05-28 23:02:50
 * @Description: file content
 */
const getters = {
  carts: state => state.cart.carts,
  cartsTotal: (state) => {
    let count = 0;
    state.cart.carts.forEach(goods => {
      count += goods.goods_count;
    });
    return count;
  },
  check_count(state) {
    return state.cart.carts.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
  },
  address: (state) => state.user.address,
  addressStr: (state) => {
    if (!state.user.address.provinceName) return ""
    return state.user.address.provinceName + state.user.address.cityName + state.user.address.countyName + state.user.address.detailInfo
  },
}
export default getters
