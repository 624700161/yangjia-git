<template>
  <div class="message">
    <HWT :title="'信息详情'"></HWT>
    <p class="title">{{message.title}}</p>
    <p class="text">{{message.text}}</p>
  </div>
</template>
<script>
import HWT from "@/components/headerWithTitle"

export default {
  data() {
    return {
      id: this.$route.params.id,
      message:{
        title:"信息标题",
        text:"信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容。",
      },
    };
  },
  components: { HWT }
};
</script>
<style lang="less" scoped>
@import url(../assets/css/messages/message.less);
</style>
