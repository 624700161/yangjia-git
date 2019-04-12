<template>
  <div class="authentication">
    <HWT :title="'企业认证'"></HWT>
    <div class="headinfo">
      <img :src="(isVip?vipsrc:nvipsrc)" >
      <p>企业基本信息</p>
    </div>
    <img class="bgimg" src="../assets/images/user/user_bgimg.png">
    <el-form
      class="authentication_form"
      label-position="left"
      :show-message="false"
      :hide-required-asterisk="true"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="3.5rem"
      @validate="showMessage"
    >
      <el-form-item label="企业名称" :class="{'ischange ismust':changing}" prop="name" id="name">
        <el-input v-model="form.name" :disabled="!changing" placeholder="请填写企业名称" ref="name"></el-input>
      </el-form-item>
      <el-form-item label="统一社会信用代码" :class="{'ischange ismust':changing}" prop="code" id="code">
        <el-input v-model="form.code" :disabled="!changing" placeholder="请填写信用代码" ref="code"></el-input>
      </el-form-item>
      <el-form-item label="企业联系人" :class="{'ischange ismust':changing}" prop="person" id="person">
        <el-input v-model="form.person" :disabled="!changing" placeholder="请填写企业联系人" ref="person"></el-input>
      </el-form-item>
      <el-form-item label="联系人电话" :class="{'ischange ismust':changing}" prop="tel" id="tel">
        <el-input v-model="form.tel" :disabled="!changing" placeholder="请填写联系人电话" ref="tel"></el-input>
      </el-form-item>
      <el-form-item label="法定代表人" :class="{'ischange ismust':changing}" prop="legal" id="legal">
        <el-input v-model="form.legal" :disabled="!changing" placeholder="请填写法定代表人" ref="legal"></el-input>
      </el-form-item>
      <el-form-item label="法人手机号" :class="{'ischange ismust':changing}" prop="legaltel" id="legaltel">
        <el-input v-model="form.legaltel" :disabled="!changing" placeholder="请填写法人手机号" ref="legaltel"></el-input>
      </el-form-item>
      <el-form-item label="法人身份证号" :class="{'ischange ismust':changing}" prop="legalID" id="legalID">
        <el-input v-model="form.legalID" :disabled="!changing" placeholder="请填写法人身份证号" ref="legalID"></el-input>
      </el-form-item>
      <el-form-item label="注册资金" :class="{'ischange ismust':changing}" prop="money" id="money">
        <el-input v-model="form.money" :disabled="!changing" placeholder="请填写注册资金" ref="money">
          <span v-show="changing" slot="suffix">元</span>
        </el-input>
      </el-form-item>
      <el-form-item label="企业成立日期" :class="{'ischange ismust':changing}" prop="cldate" id="cldate">
        <el-input
          @focus="opendatepicker()"
          v-model="form.cldate"
          :disabled="!changing"
          placeholder="请选择日期"
          :suffix-icon="sicon1"
          ref="cldate"
        ></el-input>
      </el-form-item>
      <el-form-item label="所属行业" :class="{'ischange ismust':changing}" prop="hy" id="hy">
        <el-input
          @focus="openhypicker()"
          v-model="form.hy"
          placeholder="请选择行业"
          :disabled="!changing"
          :suffix-icon="sicon2"
          ref="hy"
        ></el-input>
      </el-form-item>
      
      <el-form-item label="四部委规模" :class="{'ischange ismust':changing}" prop="gm" id="gm">
        <el-input
          @focus="opengmpicker()"
          v-model="form.gm"
          placeholder="请选择规模"
          :disabled="!changing"
          :suffix-icon="sicon2"
          ref="gm"
        ></el-input>
      </el-form-item>
      <mt-button type="primary" @click.prevent="change()" v-if="!changing">修改</mt-button>
      <mt-button type="primary" @click.prevent="submit()" v-if="changing">确定</mt-button>
    </el-form>
    
    <!--pickers-->
    <mt-popup v-model="hypopupVisible" position="bottom" class="popup">
      <mt-picker ref="hypicker" :slots="hylist" @change="onhyValuesChange"></mt-picker>
    </mt-popup>
    <mt-popup v-model="gmpopupVisible" position="bottom" class="popup">
      <mt-picker ref="gmpicker" :slots="gmlist" @change="ongmValuesChange"></mt-picker>
    </mt-popup>
    <mt-datetime-picker
      ref="datepicker"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleConfirm"
      @input="dateChange"
      v-model="datepickerTime"
      :startDate="new Date('1970-01-01')"
      :endDate="new Date()"
    ></mt-datetime-picker>
  </div>
</template>
    
<script>
import vip from "../assets/images/user/icon_v.png";
import nvip from "../assets/images/user/icon_nv.png";
import check from "@/common/check.js";
import industry from "@/common/industry.json";
import HWT from "@/components/headerWithTitle";
export default {
  data() {
    return {
      vipsrc:vip,
      nvipsrc:nvip,
      isVip: false,
      changing: false,
      hypopupVisible: false,
      gmpopupVisible: false,
      sicon1:"",
      sicon2:"",
      formError:false,
      form: {
        name: "",
        code: "",
        person: "",
        tel: "",
        legal: "",
        legaltel: "",
        legalID: "",
        money: "",
        cldate: "",
        hy: "",
        gm: ""
      },
      datepickerTime:"1970-01-01",
      rules: check,
      checkList: ["name","code","person","tel","legal","legaltel","legalID","money","cldate","hy","gm"],
      hylist: [
        {
          flex: 1,
          values: industry.industry,
          className: "slot1",
          textAlign: "center"
        }
      ],
      gmlist: [
        {
          flex: 1,
          values: [
            "",
            "大型",
            "中型",
            "小型",
            "微型"
          ],
          className: "slot2",
          textAlign: "center"
        }
      ]
    };
  },
  components: { HWT },
  methods: {
    onhyValuesChange(picker, values) {
      this.form.hy = values.toString();
    },
    ongmValuesChange(picker, values) {
      this.form.gm = values.toString();
    },
    openhypicker() {
      if (this.changing) {
        this.hypopupVisible = true;
      }
    },
    opengmpicker() {
      if (this.changing) {
        this.gmpopupVisible = true;
      }
    },
    opendatepicker() {
      if (this.changing) {
        this.$refs.datepicker.open();
      }
    },
    closepicker() {
      this.hypopupVisible = false;
      this.gmpopupVisible = false;
      this.$refs.datepicker.close();
    },
    //确定触发
    handleConfirm(val) {
      this.form.cldate=this.datepickerTime;
    },
    //改变触发
    dateChange(val){
      this.datepickerTime= this.formatDate(val);
    },
    formatDate(data) {
      var date = new Date(data);
      const y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    },
    change() {
      this.changing = true;
    },
    submit() {
      if(this.checkForm()){
        this.changing = false;
      }
    },
    //错误信息提示
    showMessage(prop, pass, message) {
      if(message){
        this.$vux.toast.show({
          text: message
        });
      }
    },
    //校验表单
    checkForm() {
      let list=this.checkList;
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
          if(this.$refs[list[i]].focus){
            this.$refs[list[i]].focus();
          }
          document.documentElement.scrollTop = document.querySelector("#"+list[i]).offsetTop-document.querySelector('.headinfo').clientHeight;
          return false;
        }
      }
      return true;
    },
  },
  watch:{
    changing:function(){
      if(this.changing){
        this.sicon1="el-icon-date";
        this.sicon2="el-icon-caret-bottom";
      }else{
        this.sicon1="";
        this.sicon2="";
      }
    }
  }
};
</script>

<style lang='less' scoped>
@import url(../assets/css/user/authentication.less);
</style>
