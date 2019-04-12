<template>
    <div class="steps">
        <span class="isto">认证授权</span>
        <img src="../assets/images/components/steps.png" />
        <span :class="{isto:step>1}">申请贷款</span>
        <img src="../assets/images/components/steps.png" />
        <span :class="{isto:step>2}">签承诺表</span>
    </div>
</template>
<script>
export default {
    props:{
        step:{
            type:Number,
            default:1,
        }
    },
}
</script>
<style lang="less" scoped>
@import url(../assets/css/component/steps.less);
</style>

