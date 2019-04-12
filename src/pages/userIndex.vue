<template>
  <div class="userindex">
    <HWT :title="'个人中心'"></HWT>
    <div v-on:click="jumpToMessage()">
      <el-badge :value="messageNum" :max="9" class="item">
        <img src="../assets/images/user/icon_m.png">
      </el-badge>
    </div>
    <img class="bgimg" src="../assets/images/user/user_bgimg.png">
    <div class="tx">
      <img src="../assets/images/user/usertx_default.png">
    </div>
    <p class="username" :class="{'isVip':isVip}">{{username}}</p>
    <!-- 跳转链接 -->
    <div class="links">
      <mt-cell title="我的申请" to="/applications" is-link>
        <img slot="icon" src="../assets/images/user/icon_1.png" width="24" height="24">
      </mt-cell>
      <mt-cell title="企业认证" to="/authentication" is-link>
        <img slot="icon" src="../assets/images/user/icon_2.png" width="24" height="24">
      </mt-cell>
      <mt-cell title="修改密码" to="/changePWD" is-link>
        <img slot="icon" src="../assets/images/user/icon_3.png" width="24" height="24">
      </mt-cell>
      <mt-cell title="常见问题" to="/questions" is-link>
        <img slot="icon" src="../assets/images/user/icon_4.png" width="24" height="24">
      </mt-cell>
    </div>
    <!-- 退出-->
    <mt-button class="loginoutbtn" size="large" type="primary" @click="loginout">退出登陆</mt-button>
  </div>
</template>

<script>
import HWT from "@/components/headerWithTitle";

export default {
  data() {
    return {
      username: "信易融",
      isVip: true,
      messageNum:3,
    };
  },
  components: { HWT },
  methods: {
    jumpToMessage() {
      this.$router.push("/messages");
    },
    loginout() {
      this.$store.commit("loginOut");
      this.$vux.toast.show({
        text: "退出成功"
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import url(../assets/css/user/userIndex.less);
</style>

