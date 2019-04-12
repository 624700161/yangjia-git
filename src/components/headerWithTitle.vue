<template>
    <div class="hwt" :id="id">
    <mt-header :title="title">
      <div
          slot="left" 
          v-if="left"
          @click="leftLInk">
        <mt-button
          icon="back">
        </mt-button>
      </div>
      <img
        class="logo_menu"
        @click="rightLInk"
        slot="right"
          v-if="right"
        src="../assets/images/index/logo_menu.png"
      >
    </mt-header>
    </div>
</template>
<script>
export default {
    props:{
        id:{
            type:String,
            default:'',
        },
        left:{
            type:Boolean,
            default:true,
        },
        title:{
            type:String,
            default:'',
        },
        right:{
            type:Boolean,
            default:false,
        }
    },
    data() {
        return {
            
        }
    },
    methods:{
        leftLInk(){
            this.$router.go(-1);
        },
        rightLInk(){
            this.$router.push('/');
        },
    },
}
</script>
<style lang="less" scoped>
@import url(../assets/css/component/headerWithTitle.less);
</style>
