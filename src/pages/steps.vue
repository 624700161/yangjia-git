<template>
  <div class="steps">
    <HWT :title="'申请流程'"></HWT>
    <div class="icon_steps">
      <img src="../assets/images/menu/icon_steps.png">
    </div>
    <p>第一步：企业通过信易融平台进行会员注册。</p>
    <p>第二步：企业通过信易融平台“我要贷款”或产品中的“申请”进行贷款资料上报并完成企业认证。</p>
    <p>第三步：企业数据审核。</p>
    <p>第四步：根据审核结果出具企业贷款申请报告。</p>
    <p>第五步：企业贷款相关信息推送给银行。</p>
    <p>第六步：银行根据相关信息进行核实放款。</p>
    
  </div>
</template>
<script>
import HWT from "@/components/headerWithTitle"

export default {
  data() {
    return {
    };
  },
  components: { HWT },
  methods: {}
};
</script>
<style lang="less" scoped>
@import url(../assets/css/menu/steps.less);
</style>

