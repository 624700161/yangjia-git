<template>
  <div class="form-page-name flex flex-align-center color_F0">
    <span class="font_size22">{{formName}}</span>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    formName: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang='less' scoped>
@import url(../assets/css/component/formPageName.less);
</style>