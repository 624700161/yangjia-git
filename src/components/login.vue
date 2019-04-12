<template>
  <div class="login" ref="login" v-if="loginVisible" @touchmove.prevent>
    <mt-header class="login_header">
      <img class="icon_close" @click="hid" slot="right" src="../assets/images/index/icon_close.png">
    </mt-header>

    <div class="formbox" ref="formbox">
      <div class="form">
        <img class="logo" src="../assets/images/index/logo_login.png">
        <div class="row" ref="phonerow">
          <div class="imgbox" ref="phoneimgbox">
            <img class="phoneimg" src="../assets/images/index/icon_user.png">
          </div>
          <input
            type="text"
            ref="phone"
            placeholder="请输入手机号"
            autocomplete="off"
            v-model="phone"
            maxlength="11"
            @blur="blur($event, 'phone')"
            @focus="focus($event,'phone')"
          >
        </div>
        <div class="row" ref="pwdrow">
          <div class="imgbox" ref="pwdimgbox">
            <img class="pwdimg" src="../assets/images/index/icon_pwd.png">
          </div>
          <input
            type="password"
            ref="pwd"
            placeholder="请输入密码"
            v-model="pwd"
            autocomplete="off"
            maxlength="6"
            @blur="blur($event, 'pwd')"
            @focus="focus($event,'pwd')"
          >
        </div>
        <mt-button class="loginbtn" type="primary" @click="submit">登陆</mt-button>
        <p class="p_link">
          还未有账户
          <span @click="linktoregister">立即注册</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginVisible: false,
      phone: "", //电话号码
      pwd: "", //密码
    };
  },
  mounted() {
    this.$nextTick(function() {});
  },
  methods: {
    hid() {
      this.phone = "";
      this.pwd = "";
      this.loginVisible = false;
    },
    show() {
      this.loginVisible = true;
    },
    focus({ target }, ref) {
      this.$refs[ref + "row"].classList.add("active");
      this.$refs[ref + "imgbox"].classList.add("active");
      //target.setAttribute("placeholder", "");
    },
    blur({ target }, ref) {
      this.$refs[ref + "row"].classList.remove("active");
      this.$refs[ref + "imgbox"].classList.remove("active");
      // if (!target.value.length) {
      //   if(ref==="phone"){
      //       target.setAttribute("placeholder",this.phoneholder);
      //   }else{
      //       target.setAttribute("placeholder",this.pwdhoder);
      //   }
      // }else{
      //   //target.setAttribute("placeholder", this.$refs[ref].innerText);
      // }
    },
    linktoregister() {
      EventBus.$emit("changeVue","register");
    },
    // 点击登录
    submit() {
      let phoneReg = /^[1][345789][0-9]{9}$/;
      if(!this.phone){
        this.$vux.toast.show({
          text: "请输入手机号"
        });
        this.$refs["phone"].focus();
      }else if(!phoneReg.test(this.phone)){
        this.$vux.toast.show({
          text: "手机号格式错误"
        });
        this.$refs["phone"].focus();
      }else if(this.pwd.length < 1){
        this.$vux.toast.show({
          text: "请输入密码"
        });
        this.$refs["pwd"].focus();
      }else{
        console.log("提交数据");
        // this.$https
        //   .post("/userinfo/user/login", { tel: this.phone, verify: this.pwd })
        //   .then(res => {
        //     if (res.data) {
        //       this.$store.commit("loginSuc", {
        //         token: res.data,
        //         phone: this.phone
        //       });
        //       this.hid();
        //       setTimeout(() => {
        //         this.$vux.toast.show({
        //           text: "登录成功"
        //         });
        //         this.getUnCompleteFormFuc();
        //       }, 1000);
        //     } else {
        //       this.$vux.toast.show({
        //         text: res.msg
        //       });
        //     }
        //   });
      }
    }
  },
  components: {}, //组件

  computed: {}, //运算

  watch: {
    //监听
  }
};
</script>
<style lang='less' scoped>
@import url(../assets/css/index/login.less);
</style>

