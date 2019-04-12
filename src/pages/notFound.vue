<template>
  <div class="outer-box flex flex-v flex-align-center">
    <img src="../assets/images/notFound/404_2.png" alt="404" class="not-found-pic">
    <p class="font_size14">
      页面出错了啦，点击
      <router-link to='/' class="color_F0" >重新加载</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "notFound"
};
</script>
<style lang='less' scoped>
@import url(../assets/css/notFound/notFound.less);
</style>
