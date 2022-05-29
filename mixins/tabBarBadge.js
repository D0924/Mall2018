/*
 * @Author: Utopia
 * @Descripttion: Utopia 的代码
 * @Date: 2022-05-28 14:25:40
 * @LastEditTime: 2022-05-29 21:10:28
 * @Description: file content
 */

import { mapGetters } from "vuex"

// 导出一个 mixin 对象
export default {
  watch: {
    'cartsTotal': {
      handler() {
        this.setTabBarBadge();
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters(['cartsTotal'])
  },
  // onShow 不能实现全部功能
  onShow() {
    this.setTabBarBadge();
  },
  methods: {
    setTabBarBadge() {
      // 在页面展示的时候 为购物车设置数字徽标
      uni.setTabBarBadge({
        index: 2,
        text: new String(this.cartsTotal)
      })
    }
  },
}
