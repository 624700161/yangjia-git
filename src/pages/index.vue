<template>
  <div class="bg-box" ref="bgBox">
    <!-- header -->
    <header class="header flex flex-align-center flex-pack-justify">
      <img src="../assets/images/index/logo_home.png" alt="logo" class="logo">
      <div class="login-btn color_FF font_size14">
        <img src="../assets/images/index/icon_user_white.png" alt="login" class="login-icon">
        <span @click="clickUserInfo" v-if="$store.state.user">
          {{$store.state.user.phone}}
          <span @click.stop="loginOutFuc">退出登录</span>
        </span>
        <span @click="loginFuc" v-else>快速登录</span>
      </div>
    </header>
    <!-- slogan -->
    <section class="slogan-area flex flex-v flex-align-center">
      <p class="font_size38 color_FF slogan-title">榆钱儿智估</p>
      <span class="bg_colorFF slogan-line"></span>
      <p class="font_size14 color_FF slogan-subtitle">股权增值从估值开始</p>
    </section>
    <!-- jump -->
    <section class="jump-area">
      <div class="my_text_center">
        <span
          class="jump-btn bg_colorF0 color_FF font_size18 m_b30"
          @click="jumpToFastOrProfessFuc('/fast')"
        >快速估值</span>
        <span
          class="jump-btn bg_colorF0 color_FF font_size18"
          @click="jumpToFastOrProfessFuc('/profession')"
        >专业估值</span>
      </div>
    </section>
    <!-- 登录窗 -->
    <login-msg
      @closeLoginBox="closeLoginBox"
      :isClickLogin="isClickLogin"
      @hasUnCompleteForm="hasUnCompleteForm"
      @scrollToBottom = 'scrollToBottom'
    ></login-msg>
    <!-- 未完成表单提示窗 -->
    <un-complete-form-msg
      :isShowCompleteFormMsg="isShowCompleteFormMsg"
      :unCompleteFormData="unCompleteFormData"
      @closeFormMsgFuc="closeFormMsgFuc"
    ></un-complete-form-msg>
    <!-- dropDown -->
    <ul class="drop-down bg_colorFF" v-if="isShowDropDown">
      <li
        class="down-item my_text_center color_2B font_size14"
        v-for="(item,index) in dropDownMenu"
        :key="index"
        @click="jumpToMenu(item.url)"
      >{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
import LoginMsg from "@/components/loginMsg";
import unCompleteFormMsg from "@/components/unCompleteFormMsg";

export default {
  data() {
    return {
      isClickLogin: false,
      isShowCompleteFormMsg: false,
      unCompleteFormData: null, //未完成的表单数据
      dropDownMenu: [
        {
          name: "智估简介",
          url: "/intro"
        },
        {
          name: "智估历史",
          url: "/history"
        }
      ],
      isShowDropDown: false,
    };
  },
  components: {
    LoginMsg,
    unCompleteFormMsg
  },
  mounted() {
    this.$refs.bgBox.style.height = document.documentElement.clientHeight + "px"; //设置背景图高度
  },

  methods: {
    //关闭弹出窗
    closeLoginBox() {
      this.isClickLogin = false;
    },
    //点击登录
    loginFuc() {
      this.isClickLogin = true;
    },
    //点击退出
    loginOutFuc() {
      this.$store.commit("loginOut");
      this.$vux.toast.show({
        text: "已退出登录"
      });
    },
    //点击用户信息
    clickUserInfo() {
      this.isShowDropDown = ! this.isShowDropDown;
    },
    //跳转下拉框
    jumpToMenu(data) {
      this.isShowDropDown = false;
      this.$router.push(data);
    },
    //点击快速估值或专业估值
    jumpToFastOrProfessFuc(type) {
      if (this.$store.state.user && this.$store.state.user.phone) {
        this.$router.push(type);
      } else {
        this.$vux.toast.show({
          text: "请先登录",
        });
        setTimeout(this.loginFuc, 2000);
      }
    },
    //用户有未完成的表单
    hasUnCompleteForm(data) {
      this.isShowCompleteFormMsg = true;
      this.unCompleteFormData = data;
    },
    //关闭未完成表单提示信息
    closeFormMsgFuc(data) {
      this.isShowCompleteFormMsg = data;
      this.unCompleteFormData = null;
    },
    //blur-scroll
    scrollToBottom(){
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }
};
</script>
<style lang='less' scoped>
@import url(../assets/css/index/index.less);
</style>