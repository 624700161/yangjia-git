<template>
  <div class="applyTwo">
    <HWT :right="true" :title="'认证授权'"></HWT>
    <Steps :step="1" class="mysteps"></Steps>
    <el-form
      class="applyTwo_form"
      label-position="left"
      :show-message="false"
      :hide-required-asterisk="true"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="3.5rem"
      @validate="showMessage"
    >
      <el-form-item label="企业名称" class="ismust" prop="name" id="name">
        <el-input v-model="form.name" placeholder="请填写企业名称" ref="name"></el-input>
      </el-form-item>
      <el-form-item label="统一社会信用代码" class="ismust" prop="code" id="code">
        <el-input v-model="form.code" placeholder="请填写信用代码" ref="code"></el-input>
      </el-form-item>
      <el-form-item label="企业联系人" class="ismust" prop="person" id="person">
        <el-input v-model="form.person" placeholder="请填写企业联系人" ref="person"></el-input>
      </el-form-item>
      <el-form-item label="联系人手机号" class="ismust" prop="tel" id="tel">
        <el-input v-model="form.tel" placeholder="请填写联系人手机号" ref="tel"></el-input>
      </el-form-item>
      <el-form-item label="法定代表人" class="ismust" prop="legal" id="legal">
        <el-input v-model="form.legal" placeholder="请填写法定代表人" ref="legal"></el-input>
      </el-form-item>
      <el-form-item label="法人手机号" class="ismust" prop="legaltel" id="legaltel">
        <el-input v-model="form.legaltel" placeholder="请填写法人手机号" ref="legaltel"></el-input>
      </el-form-item>
      <el-form-item label="法人身份证号" class="ismust" prop="legalID" id="legalID">
        <el-input v-model="form.legalID" placeholder="请填写法人身份证号" ref="legalID"></el-input>
      </el-form-item>
      <el-form-item label="注册资金" class="ismust" prop="money" id="money">
        <el-input v-model="form.money" placeholder="请填写注册资金" ref="money">
          <span slot="suffix">元</span>
        </el-input>
      </el-form-item>
      <el-form-item label="企业成立日期" class="ismust" prop="cldate" id="cldate">
        <el-input
          @focus="opendatepicker()"
          v-model="form.cldate"
          placeholder="请选择日期"
          suffix-icon="el-icon-date"
          ref="cldate"
        ></el-input>
      </el-form-item>
      <el-form-item label="所属行业" class="ismust" prop="hy" id="hy">
        <el-input
          @focus="openhypicker()"
          v-model="form.hy"
          placeholder="请选择行业"
          suffix-icon="el-icon-caret-bottom"
          ref="hy"
        ></el-input>
      </el-form-item>
      <el-form-item label="四部委规模" class="ismust" prop="gm" id="gm">
        <el-radio-group v-model="form.gm" ref="gm">
          <el-radio :label="1">大型</el-radio>
          <el-radio :label="2">中型</el-radio>
          <br>
          <el-radio :label="3">小型</el-radio>
          <el-radio :label="4">微型</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="营业执照" class="ismust" prop="yyzzname" id="yyzzname">
        <el-input v-model="form.yyzzname" placeholder="请选择文件"></el-input>
        <el-input
          class="disInput"
          id="filed"
          type="file"
          accept="image/*"
          @change="fileChange()"
          ref="yyzzname"
        ></el-input>
      </el-form-item>
      <mt-button type="primary" @click.prevent="nextStep">下一步</mt-button>
    </el-form>

    <!--pickers-->
    <mt-popup v-model="hypopupVisible" position="bottom" class="popup">
      <mt-picker ref="hypicker" :slots="hylist" @change="onhyValuesChange"></mt-picker>
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
//import industry from "@/common/industry.json";
let industry = require("@/common/industry.json");
import Steps from "@/components/steps";
import HWT from "@/components/headerWithTitle";
import check from "@/common/check.js";
export default {
  data() {
    return {
      id: this.$route.params.id,
      hypopupVisible: false,
      formError: false,
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
        gm: "",
        yyzzname: ""
      },
      datepickerTime: "1970-01-01",
      rules: check,
      checkList: ["name","code","person","tel","legal","legaltel","legalID","money","cldate","hy","gm","yyzzname"],
      hylist: [
        {
          flex: 1,
          values: industry.industry,
          className: "slot1",
          textAlign: "center"
        }
      ]
    };
  },
  components: { Steps, HWT },
  mounted() {},
  methods: {
    onhyValuesChange(picker, values, x, y) {
      this.form.hy = values.toString();
    },
    openhypicker() {
      this.hypopupVisible = true;
    },
    opendatepicker() {
      this.$refs.datepicker.open();
    },
    closepicker() {
      this.hypopupVisible = false;
      this.$refs.datepicker.close();
    },
    handleConfirm(val) {
      this.form.cldate = this.formatDate(val);
    },
    //确定触发
    handleConfirm(val) {
      this.form.cldate = this.datepickerTime;
    },
    //改变触发
    dateChange(val) {
      this.datepickerTime = this.formatDate(val);
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
    fileChange() {
      let name = "";
      if (document.querySelector("#filed").files.length > 0) {
        name = document.querySelector("#filed").files[0].name;
      } else {
        name = "";
      }
      this.form.yyzzname = name;
    },
    nextStep() {
      if (this.checkForm()) {
        this.$router.push("/applyTwo/" + this.id);
      }
    },
    //错误信息提示
    showMessage(prop, pass, mesaage) {
      if (mesaage) {
        this.$vux.toast.show({
          text: mesaage
        });
      }
    },
    //校验表单
    checkForm() {
      for (var i = 0; i < this.checkList.length; i++) {
        let item = this.checkList[i];
        this.formError = false;
        this.$refs.form.validateField(item, message => {
          if (message) {
            this.formError = true;
          } else {
            this.formError = false;
          }
        });
        if (this.formError) {
          if (this.$refs[this.checkList[i]].focus) {
            this.$refs[this.checkList[i]].focus();
          }
          document.documentElement.scrollTop =
            document.querySelector("#" + this.checkList[i]).offsetTop -
            document.querySelector(".mysteps").clientHeight;
          return false;
        }
      }
      return true;
    }
  }
};
</script>

<style lang="less" scoped>
@import url(../assets/css/applications/applyTwo.less);
</style>
