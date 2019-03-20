<template>
  <div class="outer-box">
    <div class="inner-box bg_colorFF flex flex-v flex-align-center flex-pack-justify">
      <img src="../assets/images/components/icon_complete.png" alt class="complete-icon m_b20">
      <span class="color_2B font_size18 complete-title">提交成功</span>
      <p class="detail-text-one color_2B">您的{{valuType}}信息已经提交成功</p>
      <p class="detail-text-two color_2B">预计5分钟后可以查看估值报告</p>
      <div class="btn-group flex flex-pack-justify">
        <router-link to="/" class="pub-style border-DD font_size14 m_r20">返回首页</router-link>
        <span class="pub-style bg_colorF0 font_size14 color_FF" @click="checkCompanyInfo">查看企业信息</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    valuType: {
      type: String,
      default: ""
    }
  },
  methods:{
    //点击查看企业详情
    checkCompanyInfo(){
      this.$emit('checkCompanyInfo')
    }
  }
};
</script>
<style lang='less' scoped>
@import url(../assets/css/component/dialog.less);
</style>