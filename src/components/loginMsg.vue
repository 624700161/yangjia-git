<template>
  <div class="outer-box" @click="closeLoginBox" v-if="isClickLogin">
    <div class="inner-box bg_colorFF" @click.stop>
      <p class="color_2B font_size18 my_text_center">用户登录</p>
      <transition name="fade">
        <div>
          <div class="row">
            <label ref="phone">手机号</label>
            <input
              type="text"
              placeholder="手机号"
              id="phone"
              autocomplete="off"
              v-model="phone"
              maxlength="11"
              @blur="blur($event, 'phone')"
              @focus="focus($event,'phone')"
            >
          </div>
          <div class="row">
            <label ref="code">验证码</label>
            <input
              type="text"
              placeholder="验证码"
              v-model="code"
              autocomplete="off"
              maxlength="6"
              @blur="blur($event, 'code')"
              @focus="focus($event,'code')"
            >
            <span class="code-btn" :class="{disabled: this.disabled}" @click="sendCode">{{codeText}}</span>
          </div>
        </div>
      </transition>
      <p class="error-tips">{{errorText}}</p>
      <div class="row">
        <span class="login-btn" @click="submit">登录</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    isClickLogin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      phone: "", //电话号码
      code: "", //验证码
      codeText: "发送验证码",
      timer: null,
      num: 60,
      disabled: false,
      errorText: ""
    };
  },
  methods: {
    //点击关闭弹出框
    closeLoginBox() {
      this.errorText = "";
      this.phone = "";
      this.code = "";
      this.$emit("closeLoginBox", false);
    },
    focus({ target }, ref) {
      this.$refs[ref].classList.add("active-label");
      target.setAttribute("placeholder", "");
    },
    blur({ target }, ref) {
      if (!target.value.length) {
        this.$refs[ref].classList.remove("active-label");
        setTimeout(() => {
          target.setAttribute("placeholder", this.$refs[ref].innerText);
        }, 500);
      }
      this.$emit("scrollToBottom");
    },
    //点击获取验证码
    sendCode() {
      let phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      let phone = document.querySelector("#" + Object.keys(this.$refs)[0]);
      if (this.disabled) return false;
      if (!this.phone) {
        this.errorText = "请输入手机号";
        phone.focus();
      } else if (!phoneReg.test(this.phone)) {
        this.errorText = "手机号格式错误";
        phone.focus();
      } else {
        this.errorText = "";
        this.$https.post("/userinfo/message", { tel: this.phone }).then(res => {
          if (res.code) {
            this.$vux.toast.show({
              text: "网络请求异常，请重试"
            });
            this.resetCountDown();
          }
        });
        this.countDown();
      }
    },
    //倒计时
    countDown() {
      if (this.num > 0) {
        this.num -= 1;
        this.codeText = `${this.num}秒后重新发送`;
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
      this.codeText = "发送验证码";
      this.code = "";
    },
    // 点击登录
    submit() {
      let phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      let codeReg = /^\d{6}$/;
      if (
        this.phone &&
        this.code &&
        phoneReg.test(this.phone) &&
        codeReg.test(this.code)
      ) {
        this.$https
          .post("/userinfo/user/login", { tel: this.phone, verify: this.code })
          .then(res => {
            if (res.data) {
              this.resetCountDown();
              this.$store.commit("loginSuc", {
                token: res.data,
                phone: this.phone
              });
              this.closeLoginBox();
              setTimeout(() => {
                this.$vux.toast.show({
                  text: "登录成功"
                });
                this.getUnCompleteFormFuc();
              }, 1000);
            } else {
              this.$vux.toast.show({
                text: res.msg
              });
            }
          });
      } else if (!this.phone) {
        this.errorText = "电话号码不能为空";
      } else if (!this.code) {
        this.errorText = "验证码不能为空";
      }
    },
    //获取用户是否有未完成的表单
    getUnCompleteFormFuc() {
      this.$https.get("/report/latelyReport").then(res => {
        if (res.data) {
          this.$emit("hasUnCompleteForm", res.data);
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
@import url(../assets/css/component/dialog.less);
</style>