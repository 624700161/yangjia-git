<template>
  <div>
    <!-- header -->
    <my-header></my-header>
    <!-- 页面名称 -->
    <form-page-name formName="快速估值"></form-page-name>
    <!-- 表单顶部Tab栏 -->
    <form-page-tabs :formTabs="formTabs"></form-page-tabs>
    <!-- 表单内容 -->
    <section class="form-content">
      <!-- tips -->
      <p class="font_size14 m_b20 color_2B">
        <span class="color_D0">*</span>为信息录入必填项
      </p>
      <router-view formType="fast" @toNextStep="toNextStep" @toPrevFuc="toPrevFuc"></router-view>
    </section>
    <!-- footer -->
    <my-footer></my-footer>
  </div>
</template>

<script>
import formPageTabs from "@/components/formPageTabs";
import myHeader from "@/components/myHeader";
import formPageName from "@/components/formPageName";
import myFooter from "@/components/myFooter";

export default {
  data() {
    return {
      formTabs: [{name:"1.企业基本信息",status:1}, {name:"2.软性指标信息",status:0}],
    };
  },
  components: {
    myHeader,
    formPageTabs,
    formPageName,
    myFooter
  },
  mounted() {
    //判断是否登录
    if (this.$store.state.user && this.$store.state.user.phone) {
      
    } else {
      this.$router.push('/')
    }
  },
  methods: {
    //点击下一步
    toNextStep() {
      this.formTabs[1].status = 1;
    },
    // 点击上一步
    toPrevFuc() {
      this.formTabs[1].status = 0;
    }
  }
};
</script>
<style lang="less" scoped>
@import url(../assets/css/fastProfession/formPage.less);
</style>
