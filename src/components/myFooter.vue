<template>
  <div class="footer-outerbox">
      <ul class="">
          <li v-for="item in listArr" :key="item.key"  :tp="item.tp" class="my_text_center list-item">{{item.text}}</li>
      </ul>
  </div>
</template>

<script>
export default {
  props: [""],
  data() {
    return {
      listArr: [
        {
          key:1,
          tp:"t",
          text:"客服电话"
        },
        {
          key:2,
          tp:"num",
          text:"023-63861593"
        },
        {
          key:3,
          tp:"p",
          text:"地址：重庆市渝中区民族路101号交易大厦6楼"
        },
        {
          key:4,
          tp:"p",
          text:"邮箱：xinyr@chn-cstc.com"
        },
        {
          key:5,
          tp:"p",
          text:"邮编：400010"
        },
        {
          key:6,
          tp:"bp",
          text:"Copyright@2009-2019"
        }
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