<template>
  <div class="changePWD">
    <HWT :title="'修改密码'"></HWT>
    <div class="headinfo">
      <img :src="(isVip?vipsrc:nvipsrc)">
      <p>修改密码</p>
    </div>
    <img class="bgimg" src="../assets/images/user/user_bgimg.png">
    <el-form
      class="changePWD_form"
      label-position="left"
      :show-message="false"
      :hide-required-asterisk="true"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="3.5rem"
      @validate="showMessage"
    >
      <el-form-item label="密码" class="ismust" prop="pwd" id="pwd">
        <el-input v-model="form.pwd" type="password" placeholder="请填写密码" ref="newpwd"></el-input>
      </el-form-item>
      <el-form-item label="新密码" class="ismust" prop="newpwd" id="newpwd">
        <el-input v-model="form.newpwd" type="password" placeholder="请填写新密码" ref="newpwd"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" class="ismust" prop="repwd" id="repwd">
        <el-input v-model="form.repwd" type="password" placeholder="请再次填写新密码" ref="repwd"></el-input>
      </el-form-item>
      <mt-button type="primary" @click="submit()">确定</mt-button>
    </el-form>
  </div>
</template>

<script>
import vip from "../assets/images/user/icon_v.png";
import nvip from "../assets/images/user/icon_nv.png";
import check from "@/common/check.js";
import HWT from "@/components/headerWithTitle";
export default {
  data() {
    return {
      vipsrc: vip,
      nvipsrc: nvip,
      isVip: false,
      sicon1: "",
      sicon2: "",
      formError: false,
      form: {
        pwd: "",
        newpwd: "",
        repwd: ""
      },
      rules: check,
      checkList: ["pwd", "newpwd", "repwd"]
    };
  },
  components: { HWT },
  methods: {
    submit() {
      if (this.checkForm()) {
        if (this.form.newpwd === this.form.repwd) {
          this.$vux.toast.show({
            text: "修改成功"
          });
        }else{
            this.$vux.toast.show({
            text: "两次密码不一致"
          });
        }
      }
    },
    //错误信息提示
    showMessage(prop, pass, message) {
      if (message) {
        this.$vux.toast.show({
          text: message
        });
      }
    },
    //校验表单
    checkForm() {
      let list = this.checkList;
      for (var i = 0; i < list.length; i++) {
        let item = list[i];
        this.formError = false;
        this.$refs.form.validateField(item, message => {
          if (message) {
            this.formError = true;
          } else {
            this.formError = false;
          }
        });
        if (this.formError) {
          if (this.$refs[list[i]].focus) {
            this.$refs[list[i]].focus();
          }
          return false;
        }
      }
      return true;
    }
  },
  watch: {
    changing: function() {
      if (this.changing) {
        this.sicon1 = "el-icon-date";
        this.sicon2 = "el-icon-caret-bottom";
      } else {
        this.sicon1 = "";
        this.sicon2 = "";
      }
    }
  }
};
</script>

<style lang='less' scoped>
@import url(../assets/css/user/changePWD.less);
</style>
