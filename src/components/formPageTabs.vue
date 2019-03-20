<template>
  <div class="flex flex-align-center">
    <div
      class="flex-1 tab-item my_text_center"
      v-for="(item,index) in formTabs"
      :key="index"
      :class="(item.status)?'active':''"
    >
      <span class="tabs-item-text color_2B" :class="(item.status)?'active':''">{{item.name}}</span>
      <img
        v-if="!(index == formTabs.length-1)"
        :src="(item.status)?'../../static/formPageTabs/step_arrow_active.png':'../../static/formPageTabs/step_arrow.png'"
        alt
        class="step-arrow"
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    formTabs: {
      type: Array,
      default: []
    }
  }
};
</script>
<style lang='less' scoped>
@import url(../assets/css/component/formPageTabs.less);
</style>