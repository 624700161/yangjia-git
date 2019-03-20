<template>
  <div class="footer-outerbox">
      <ul class="p_b20 p_t20">
          <li v-for="item in listArr" :key="item" class="color_FF my_text_center list-item">{{item}}</li>
      </ul>
  </div>
</template>

<script>
export default {
  props: [""],
  data() {
    return {
      listArr: [
        "客户服务热线：023-63883915",
        "地址：重庆市渝中区民族路101号交易大厦6楼",
        "Copyright@2009-2019",
        "重庆股份转让中心有限责任公司版权所有",
        "渝ICP备13004774号"
      ]
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang='less' scoped>
@import url(../assets/css/component/myFooter.less);
</style>