<template>
  <div class="fwzl">
    <HWT :title="'服务指南'"></HWT>
    <img width="100%" src="../assets/images/menu/fwzl.png">
  </div>
</template>
<script>
import HWT from "@/components/headerWithTitle";
export default {
  components: { HWT }
};
</script>

<style lang='less' scoped>
@import url(../assets/css/menu/fwzl.less);
</style>
