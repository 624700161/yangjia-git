<template>
  <div class="log-popbtn flex flex-align-center flex-pack-justify" :class="{isactive:true,'head-fixed':isShowMenu}">
    <img
      src="../assets/images/components/logo.png"
      alt="logo"
      class="logo"
      v-if="!( $route.path.indexOf('infoReport')>-1)"
      @click="toIndex"
    >
    <div v-else @click="goBackFuc">
      <img src="../assets/images/components/arrow-left.png" alt class="arrow">
      <span class="color_33 font_size18 go-back">返回智估历史</span>
    </div>
    <img :src="menuIcon" alt class="menu-icon" @click="showMenu">

    <!-- 导航菜单 -->
    <div class="nav-shade" v-if="isShowMenu">
      <div class="nav-inner-box bg_colorFF my_text_center color_2C font_size14">
        <p class="menu-title border_b">目录</p>
        <ul>
          <li
            v-for="(item,index) in menuList"
            :key="index"
            class="menu-item"
            :class="item.status && 'active'"
            @click="jumpToUrl(item.url,index)"
          >{{item.title}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import MenuPic from "../../static/components/menu.png";
import MenuClosePic from "../../static/components/menu1.png";

export default {
  data() {
    return {
      menuIcon: MenuPic,
      menuList: [
        {
          title: "首页",
          status: 0,
          url: "/"
        },
        {
          title: "快速估值",
          status: 0,
          url: "/fast"
        },
        {
          title: "专业估值",
          status: 0,
          url: "/profession"
        },
        {
          title: "智估简介",
          status: 0,
          url: "/intro"
        },
        {
          title: "智估历史",
          status: 0,
          url: "/history"
        }
      ],
      isShowMenu: false
    };
  },
  methods: {
    goBackFuc() {
      this.$router.push("/history");
    },
    //显示导航
    showMenu() {
      this.isShowMenu = !this.isShowMenu;
      this.menuIcon = this.isShowMenu?MenuClosePic:MenuPic
    },
    //点击跳转
    jumpToUrl(url, i) {
      this.menuList.forEach((item, index) => {
        if (index == i) {
          item.status = 1;
        } else {
          item.status = 0;
        }
      });
      this.$router.push(url);
      this.isShowMenu = false;
      this.menuIcon = MenuPic;
    },
    //点击logo跳转首页
    toIndex(){
      this.$router.push('/')
    }
  }
};
</script>
<style lang="less" scoped>
@import url(../assets/css/component/myHeader.less);
</style>

