<!--
 * @Author: Utopia
 * @Descripttion: Utopia 的代码
 * @Date: 2022-05-26 09:35:54
 * @LastEditTime: 2022-05-29 22:28:52
 * @Description: file content
-->
<template>
  <view>
    <userLogin v-if="token.length<=0" />
    <userInfo v-else />
  </view>
</template>

<script>

import tabBarBadge from "@/mixins/tabBarBadge.js";
import userInfo from "@/components/userInfo/userInfo.vue"
import userLogin from "@/components/userLogin/userLogin.vue"
import { mapGetters, mapMutations } from "vuex"
export default {
  mixins: [tabBarBadge],
  components: { userInfo, userLogin },
  computed: {
    ...mapGetters(["token"])
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss"></style>
