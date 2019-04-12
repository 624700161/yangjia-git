<template>
  <div class="aboutUs">

    <myHeader class="myheader" ref="myheder" :isOutUse="false" :isShow="true"></myHeader>
    <div class="houder" ref="houder">
        <img src="../assets/images/menu/aboutUs.png"/>
    </div>
    <div class="txt">
        <p class="pt">成立背景</p>
        <p>为贯彻落实《国务院关于推进重庆市统筹城乡改革和发展的若干意见》（国发[2009]3号）文关于"加快发展多层次的资本市场，适时将重庆纳入全国场外交易市场体系"的精神，市委、市政府于2009年7月正式批准成立重庆股份转让中心，具体承担场外资本市场建设任务。</p>
        <p class="pt">服务宗旨</p>
        <p>构建三个平台：上市资源培育平台、企业价值发现平台和企业综合金融服务平台；</P>
        <p>解决三个难题：企业融资难、公众投资难、政府管理难问题；</P>
        <p>承担社会责任：承担促进企业快速发展和科学治理的社会责任，切实提高金融服务实体经济的综合能力。</p>
    </div>
    <PublicAbout></PublicAbout>
    <!-- 页脚 -->
    <myFooter></myFooter>
  </div>
</template>
<script>
import myHeader from "@/components/myHeader";
import myFooter from "@/components/myFooter";
import PublicAbout from "@/components/publicAbout";

export default {
  data() {
    return {
        clientHeight:'',
    };
  },
  components:{myHeader,myFooter,PublicAbout},
  mounted() {
    this.$nextTick(function() {
      // 获取浏览器可视区域高度
      this.clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;

      window.onresize = function() {
        this.clientHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
      };
    });
  },
  methods: {
    changeFixed(clientHeight) {
      //动态修改样式
      this.$refs.houder.style.height =
        this.clientHeight -
        document.getElementsByClassName("myheader")[0].clientHeight +
        "px";
    },
  },
  watch: {
    //监听
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function() {
      this.changeFixed(this.clientHeight);
    }
  }
};
</script>

<style lang='less' scoped>
@import url(../assets/css/menu/aboutUs.less);
</style>
