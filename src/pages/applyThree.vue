<template>
  <div class="applyThree">
    <HWT :right="true" :title="'承诺表签字'"></HWT>
    <Steps :step="3" class="mysteps"></Steps>
    <div class="applyThree_cont">
      <p>请前往电脑端完成第三步</p>
      <p>企业“信易贷”融资申请承诺表签字</p>
      <mt-button type="primary" @click="junpTo('/')">确定</mt-button>
    </div>
  </div>
</template>
<script>
import Steps from "@/components/steps";
import HWT from "@/components/headerWithTitle";
export default {
  components: { Steps, HWT },
  methods: {
    junpTo(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style lang="less" scoped>
@import url(../assets/css/applications/applyThree.less);
</style>

