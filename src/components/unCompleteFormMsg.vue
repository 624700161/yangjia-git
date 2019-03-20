<template>
  <div class="outer-box" @click="closeFormMsg(false)" v-if="isShowCompleteFormMsg">
    <div
      class="inner-box form-inner-box bg_colorFF flex flex-v flex-align-center flex-pack-justify font_size14 color_2B"
      @click.stop
    >
      <p class>您上次还有未完成的估值信息表单</p>
      <p class>是否继续填写</p>
      <div class="btn-group flex flex-pack-justify">
        <span class="pub-style border-DD font_size14 m_r20" @click="deleteForm">否</span>
        <span class="pub-style bg_colorF0 font_size14 color_FF" @click="goToForm">是</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShowCompleteFormMsg: {
      type: Boolean,
      defalut: false
    },
    unCompleteFormData: {
      type: Object,
      defalut: {}
    }
  },
  methods: {
    //点击关闭弹出框
    closeFormMsg() {
      this.deleteForm();
    },
    // 点击‘是’,跳转表单页
    goToForm() {
      switch (this.unCompleteFormData.type) {
        case "专业":
          if (this.unCompleteFormData.rxzb) {
            this.$store.commit('getProOneID',this.unCompleteFormData.id)
            this.$router.push("/profession/stepThree");
          } else {
            this.$store.commit('getProOneID',this.unCompleteFormData.id)
            this.$router.push("/profession/stepTwo");
          }
          break;
        default:
          this.$store.commit("getFastOneID", this.unCompleteFormData.id);
          this.$router.push("/fast/stepTwo");
          break;
      }
    },
    //点击‘否’,删除未完成表单数据
    deleteForm() {
      this.$https.delete(`/report/${this.unCompleteFormData.id}`).then(res => {
        if (res.data) {
          this.$store.commit('deleteFastOneID')
          this.$store.commit('deleteProOneID')
          this.$emit("closeFormMsgFuc", false);
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
@import url(../assets/css/component/dialog.less);
</style>