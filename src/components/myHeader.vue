<template>
  <div v-show="isShowHeader">
    <div class="header" ref="header" :class="{isactive:true,'head-fixed':isShowMenu}">
      <mt-header class="myheader">
        <img
          class="logo_menu"
          @click="jumpToUrl('/')"
          slot="left"
          src="../assets/images/index/logo_menu.png"
        >
        <div slot="right">
          <img
            class="icon_user"
            @click="jumpToUrl('/userIndex')"
            src="../assets/images/index/icon_user.png"
          >
          <img
            v-if="!isShowMenu"
            class="icon_menu"
            @click="menucheck"
            src="../assets/images/index/icon_menu.png"
          >
          <img
            v-else
            class="icon_close"
            @click="menucheck"
            src="../assets/images/index/icon_close.png"
          >
        </div>
      </mt-header>
    </div>
    <!-- 导航菜单 -->
    <div class="nav-shade" ref="nav_shade" v-show="isShowMenu">
      <div class="menu-list">
        <div v-for="(item,index) in menuList" :key="index" class="menu-item">
          <img :src="item.imgurl" @click="jumpToUrl(item.url,item.isscroll)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menu1 from "../assets/images/index/menu_1.png";
import menu2 from "../assets/images/index/menu_2.png";
import menu3 from "../assets/images/index/menu_3.png";
import menu4 from "../assets/images/index/menu_4.png";
import menu5 from "../assets/images/index/menu_5.png";

export default {
  props: {
    isOutUse: {
      type: Boolean,
      default: false
    },
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      clientHeight: "",
      menuList: [
        {
          title: "关于我们",
          imgurl: menu1,
          url: "/aboutUs",
          isscroll: false
        },
        {
          title: "常见问题",
          imgurl: menu2,
          url: "/questions",
          isscroll: false
        },
        {
          title: "服务指南",
          imgurl: menu3,
          url: "/fwzl",
          isscroll: false
        },
        {
          title: "申请流程",
          imgurl: menu4,
          url: "/steps",
          isscroll: false
        },
        {
          title: "联系我们",
          imgurl: menu5,
          url: "/",
          isscroll: true
        }
      ],
      isShowMenu: false,
      isShowHeader: this.isShow
    };
  },
  mounted() {
    this.$nextTick(function() {
      // 获取浏览器可视区域高度
      this.clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;

      window.onresize = function() {
        this.clientHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
      };
    });
  },
  methods: {
    changeFixed(clientHeight) {
      //动态修改样式
      this.$refs.nav_shade.style.height = this.clientHeight+"px";
    },
    show() {
      this.isShowHeader = true;
    },
    hid() {
      this.isShowHeader = false;
    },
    menucheck() {
      this.isShowMenu = !this.isShowMenu;
      if (!this.isShowMenu && this.isOutUse) {
        this.isShowHeader = !this.isShowHeader;
      }
    },
    //点击跳转
    jumpToUrl(url, scroll) {
      if (scroll) {
        if (
          typeof document.compatMode != "undefined" &&
          document.compatMode != "BackCompat"
        ) {
          document.documentElement.scrollTop=document.documentElement.scrollHeight;
        } else if (typeof document.body != "undefined") {
          document.body.scrollTop=document.body.scrollHeight;
        }
        this.menucheck();
      } else {
        this.$router.push(url);
        this.menucheck();
      }
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
<style lang="less" scoped>
@import url(../assets/css/component/myHeader.less);
</style>

