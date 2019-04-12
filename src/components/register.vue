<template>
  <div class="register" ref="register" v-show="registerVisible">
    <mt-header class="register_header">
      <img
        class="icon_close"
        @click="hid"
        slot="right"
        src="../assets/images/index/icon_close.png"
      >
    </mt-header>

    <div class="formbox" ref="formbox">
      <div class="form">
        <img class="logo" src="../assets/images/index/logo_login.png">
        <div class="row" ref="phonerow">
          <div class="imgbox" ref="phoneimgbox">
            <img class="phoneimg" src="../assets/images/index/icon_phone.png">
          </div>
          <input
            type="text"
            placeholder="请输入手机号"
            ref="phone"
            autocomplete="off"
            v-model="phone"
            maxlength="11"
            @blur="blur($event, 'phone')"
            @focus="focus($event,'phone')"
          >
        </div>
        <div class="row row_code clearfix" ref="coderow">
          <div class="codeleft">
            <div class="imgbox" ref="codeimgbox">
              <img class="codeimg" src="../assets/images/index/icon_phone.png">
            </div>
            <input
              type="text"
              ref="code"
              placeholder="请输入验证码"
              v-model="code"
              autocomplete="off"
              maxlength="6"
              @blur="blur($event, 'code')"
              @focus="focus($event,'code')"
            >
          </div>
          <span class="code-btn" :class="{disabled: this.disabled}" @click="sendCode">{{codeText}}</span>
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
        <div class="row" ref="repwdrow">
          <div class="imgbox" ref="repwdimgbox">
            <img class="repwdimg" src="../assets/images/index/icon_pwd.png">
          </div>
          <input
            type="password"
            ref="repwd"
            placeholder="请再次输入密码"
            v-model="repwd"
            autocomplete="off"
            maxlength="6"
            @blur="blur($event, 'repwd')"
            @focus="focus($event,'repwd')"
          >
        </div>
        <div class="row" ref="tjcodrow">
          <div class="imgbox" ref="tjcodimgbox">
            <img class="tjcodimg" src="../assets/images/index/icon_phone.png">
          </div>
          <input
            type="text"
            placeholder="推荐人代码(选填)"
            v-model="tjcod"
            autocomplete="off"
            maxlength="6"
            @blur="blur($event, 'tjcod')"
            @focus="focus($event,'tjcod')"
          >
        </div>
        <div class="checkboxdiv clearfix">
            <div class="checkbox_out" :class="{checked: this.checked}"  @click="checkbox"><div class="checkbox_in"></div></div>
            <p>我已阅读并同意<span @click="toAgreement">《重庆股份转让中心中小微企业信用大数据融资服务平台用户协议书》</span></p>
        </div>
        <mt-button class="loginbtn" type="primary" @click="submit">注册</mt-button>
        <p class="p_link">已有账户<span @click="linktologin">立即登录</span></p>
      </div>
      
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      registerVisible: false,
      phone: "", //电话号码
      pwd: "", //密码
      repwd:"",//确认密码
      code: "", //验证码
      tjcod:"",//推荐人代码
      codeText: "获取",
      timer: null,
      num: 60,
      disabled: false,
      checked:false,
    };
  },
  mounted() {
    this.$nextTick(function() {
    });
  },
  methods: {
    hid() {
      this.phone = "";
      this.pwd = "";
      this.repwd = "";
      this.code = "";
      this.tjcod = "";
      this.registerVisible = false;
    },
    show() {
      this.registerVisible = true;
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
      //       target.setAttribute("placeholder",this.codehoder);
      //   }
      // }else{
      //   //target.setAttribute("placeholder", this.$refs[ref].innerText);
      // }
    },
    checkbox(){
      this.checked=!this.checked;
    },
    linktologin(){
      EventBus.$emit("changeVue","login");
    },
    toAgreement(){
      EventBus.$emit("changeVue","agreement");
    },
    //点击获取验证码
    sendCode() {
      let phoneReg = /^[1][345789][0-9]{9}$/;
      if (this.disabled) return false;
      if (!this.phone) {
        this.$vux.toast.show({
          text: "请输入手机号"
        });
        this.$refs["phone"].focus();
      } else if (!phoneReg.test(this.phone)) {
        this.$vux.toast.show({
          text: "手机号格式错误"
        });
        this.$refs["phone"].focus();
      } else {
        console.log("发送验证码");
        // this.$https.post("/userinfo/message", { tel: this.phone }).then(res => {
        //   if (res.code) {
        //     this.$vux.toast.show({
        //       text: "网络请求异常，请重试"
        //     });
        //     this.resetCountDown();
        //   }
        // });
        this.countDown();
      }
    },
    //倒计时
    countDown() {
      if (this.num > 0) {
        this.num -= 1;
        this.codeText = `${this.num}S`;
        this.disabled = true;
        this.timer = setTimeout(this.countDown, 1000);
      } else {
        this.resetCountDown();
      }
    },
    //重置倒计时
    resetCountDown() {
      clearTimeout(this.timer);
      this.disabled = false;
      this.timer = null;
      this.num = 60;
      this.codeText = "获取";
      //this.code = "";
    },
    // 点击注册
    submit() {
      let phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      let codeReg= /^[0-9]{6}$/;
      if (!this.phone) {
        this.$vux.toast.show({
          text: "请输入手机号"
        });
        this.$refs["phone"].focus();
      } else if (!phoneReg.test(this.phone)) {
        this.$vux.toast.show({
          text: "手机号格式错误"
        });
        this.$refs["phone"].focus();
      }else if(!this.code){
        this.$vux.toast.show({
          text: "请输入验证码"
        });
        this.$refs["code"].focus();
      }else if(!codeReg.test(this.code)){
        this.$vux.toast.show({
          text: "验证码格式错误"
        });
        this.$refs["code"].focus();
      }else if(!this.pwd){
        this.$vux.toast.show({
          text: "请输入密码"
        });
        this.$refs["pwd"].focus();
      }else if(!this.repwd){
        this.$vux.toast.show({
          text: "请再次输入密码"
        });
        this.$refs["repwd"].focus();
      }else if(this.pwd!=this.repwd){
        this.$vux.toast.show({
          text: "两次密码不一致"
        });
        this.$refs["pwd"].focus();
      }else if(!this.checked){
        this.$vux.toast.show({
          text: "请阅读并同意协议书"
        });
      }else{
        console.log('提交数据');
        // this.$https
        //   .post("/userinfo/user/login", { tel: this.phone, verify: this.code })
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
    },
  },
  components: {}, //组件

  computed: {}, //运算

  watch: {
    //监听
  }
};
</script>
<style lang='less' scoped>
@import url(../assets/css/index/register.less);
</style>

