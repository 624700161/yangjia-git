<template>
  <div :id="id">
    <mt-tabbar v-model="selid">
      <mt-tab-item id="/">
        <img slot="icon" src="../assets/images/product/nav_home.png">
        首页
      </mt-tab-item>
      <mt-tab-item id="/product">
        <img slot="icon" src="../assets/images/product/nav_product.png">
        产品
      </mt-tab-item>
      <mt-tab-item id="/applications">
        <img slot="icon" src="../assets/images/product/nav_user.png">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
export default {
    props:{
      id:{
        type:String,
        default:'',
      },
      sel_id:{
        type:String,
        default:'',
      }
    },
    data() {
      return {
        selid:this.sel_id,
      }
    },
    watch:{
        selid:function(){
            this.$router.push(this.selid);
        },
    }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/component/tabbar.less);
</style>
