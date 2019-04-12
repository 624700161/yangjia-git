<template>
  <div class="index">
    <!-- header -->
    <myHeader class="myheader" ref="myheder" :isOutUse="true" :isShow="false"></myHeader>
    <mt-header class="mtheader">
      <div class="indexlogo" slot="left">
        <img src="../assets/images/index/logo_index.png">
      </div>
      <div slot="right">
        <img class="icon_user" @click="jumpToUser" src="../assets/images/index/icon_user.png">
        <img class="icon_menu" @click="menucheck" src="../assets/images/index/icon_menu.png">
      </div>
    </mt-header>
    <!-- slogan -->
    <div class="indexslogan" ref="indexslogan">
      <mt-swipe :auto="sloganChangeTime" @change="handleChange">
        <mt-swipe-item v-for="(item,index) in sloganlist" :key="index">
          <img class="sloganimg" :src="item.imgurl">
          <p class="p_title">{{item.title}}</p>
          <transition name="move">
            <div class="movediv">
              <p class="p1">{{item.p1}}</p>
              <p class="p2">{{item.p2}}</p>
            </div>
          </transition>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <PublicAbout></PublicAbout>
    <!-- 页脚 -->
    <myFooter></myFooter>
    <Login ref="login"></Login>
    <Register ref="register"></Register>
    <Agreement ref="agreement"></Agreement>
  </div>
</template>

<script>
import slogan1 from "../assets/images/index/slogan1.jpg";
import slogan2 from "../assets/images/index/slogan2.jpg";
import slogan3 from "../assets/images/index/slogan3.jpg";
import slogan4 from "../assets/images/index/slogan4.jpg";

import myFooter from "@/components/myFooter";
import myHeader from "@/components/myHeader";
import PublicAbout from "@/components/publicAbout";

import Login from "@/components/login";
import Register from "@/components/register";
import Agreement from "@/components/agreement";

export default {
  data() {
    return {
      clientHeight: "",
      sloganChangeTime: 4000,
      sloganlist: [
        {
          imgurl: slogan1,
          title: "CSTC XINYIDAI",
          p1: "股转信易贷",
          p2: "XINYIRONG"
        },
        {
          imgurl: slogan2,
          title: "793 BILLION",
          p1: "累计融资793亿元   挂牌企业876家",
          p2: "XINYIRONG"
        },
        {
          imgurl: slogan3,
          title: "PRECISE DOCKING",
          p1: "精准对接",
          p2: "XINYIRONG"
        },
        {
          imgurl: slogan4,
          title: "PROFESSIONAL FINANCING",
          p1: "专业融资",
          p2: "XINYIRONG"
        }
      ]
    };
  },
  components: { myFooter, myHeader, PublicAbout, Login, Register,Agreement },
  mounted() {
    this.$nextTick(function() {
      // 获取浏览器可视区域高度
      this.clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;

      window.onresize = function() {
        this.clientHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
      };
      EventBus.$on("changeVue", (str) => {
        if(str==="register"){
          this.$refs.login.hid();
          this.$refs.register.show();
        }else if(str==="login"){
          this.$refs.register.hid();
          this.$refs.login.show();
        }else if(str==="agreement"){
          this.$refs.agreement.show();
        }
      });
    });
  },

  methods: {
    changeFixed(clientHeight) {
      //动态修改样式
      this.$refs.indexslogan.style.height = clientHeight + "px";
    },
    handleChange() {},
    menucheck() {
      this.$refs.myheder.show();
      this.$refs.myheder.menucheck();
    },

    jumpToUser() {
      // if (this.$store.state.user && this.$store.state.user.phone) {
      //   this.$router.push("/userIndex");
      // } else {
      //   this.$vux.toast.show({
      //     text: "请先登录"
      //   });
      //   this.$refs.login.show();
      // }
      //this.$router.push("/userIndex");
      this.$refs.login.show();
    },
    loginFuc() {},
    //关于我们
    showAboutUs() {
      isShowAboutUS = true;
    },

    // //点击退出
    // loginOutFuc() {
    //   this.$store.commit("loginOut");
    //   this.$vux.toast.show({
    //     text: "已退出登录"
    //   });
    // },

    //点击用户信息
    clickUserInfo() {
      this.isShowDropDown = !this.isShowDropDown;
    },

    //点击快速估值或专业估值
    jumpToFastOrProfessFuc(type) {
      if (this.$store.state.user && this.$store.state.user.phone) {
        this.$router.push(type);
      } else {
        this.$vux.toast.show({
          text: "请先登录"
        });
        setTimeout(this.loginFuc, 2000);
      }
    },
    //blur-scroll
    scrollToBottom() {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  },
  watch: {
    //监听
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function() {
      this.changeFixed(this.clientHeight);
    }
  }
};
</script>
<style lang='less' scoped>
@import url(../assets/css/index/index.less);
</style>
