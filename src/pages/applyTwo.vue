<template>
  <div class="apply applyTwo">
    <HWT :right="true" :title="'申请贷款'"></HWT>
    <Steps :step="2" class="mysteps"></Steps>
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
      <el-form-item label="实控人姓名" class="ismust" prop="skname" id="skname">
        <el-input v-model="form.skname" placeholder="请填写姓名" ref="skname"></el-input>
      </el-form-item>
      <el-form-item label="实控人身份证号" class="ismust" prop="ID" id="ID">
        <el-input v-model="form.ID" placeholder="请填写身份证号" ref="ID"></el-input>
      </el-form-item>
      <el-form-item label="实控人配偶姓名" :required="false" prop="poname" id="poname">
        <el-input v-model="form.poname" placeholder="请填写配偶姓名" ref="poname"></el-input>
      </el-form-item>
      <el-form-item label="配偶身份证号" :required="false" prop="poID" id="poID">
        <el-input v-model="form.poID" placeholder="请填写配偶身份证号" ref="poID"></el-input>
      </el-form-item>
      <el-form-item label="实控人类型" class="ismust" prop="stp" id="stp">
        <el-radio-group v-model="form.stp" ref="stp">
        <el-radio :label="1">最大股权控制</el-radio><br/>
        <el-radio :label="2">小股东协议控制</el-radio><br/>
        <el-radio :label="3">非股东家族成员控制</el-radio><br/>
        <el-radio :label="4">其他协议控制</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="实控人从业年限" class="ismust" prop="syear" id="syear">
        <el-radio-group v-model="form.syear" ref="syear">
          <el-radio :label="1">不足3年</el-radio>
          <el-radio :label="2">3年以上</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="实控人户籍" class="ismust" prop="shj" id="shj">
        <el-radio-group v-model="form.shj" ref="shj">
          <el-radio :label="1">重庆</el-radio>
          <el-radio :label="2">非重庆</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="实控人自有房产" class="ismust" prop="sfc" id="sfc">
        <el-radio-group v-model="form.sfc" ref="sfc">
          <el-radio :label="1">重庆</el-radio>
          <el-radio :label="2">非重庆</el-radio>
          <br>
          <el-radio :label="0">无</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否为挂牌企业" class="ismust" prop="isgp" id="isgp">
        <el-radio-group v-model="form.isgp" ref="isgp">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-show="form.isgp==1" label="挂牌类型" class="ismust" prop="gptp" id="gptp">
        <el-radio-group v-model="form.gptp" ref="gptp">
          <el-radio :label="1">成长板</el-radio>
          <el-radio :label="2">孵化板</el-radio>
          <br>
          <el-radio :label="3">科技板</el-radio>
          <el-radio :label="4">青创板</el-radio>
          <br>
          <el-radio :label="5">托管</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-show="form.isgp==1" label="挂牌日期" class="ismust" prop="gpdate" id="gpdate">
        <el-input @focus="opendatepicker()" v-model="form.gpdate" placeholder="请选择日期" suffix-icon="el-icon-date" ref="gpdate"></el-input>
      </el-form-item>
      <el-form-item v-show="form.isgp==1" label="总股数" class="ismust" prop="zgs" id="zgs">
        <el-input v-model="form.zgs" placeholder="请填写总股数" ref="zgs">
          <span slot="suffix">股</span>
        </el-input>
      </el-form-item>
      <el-form-item v-show="form.isgp==1" label="近2年股权质押记录" class="ismust" prop="jgqzyjl" id="jgqzyjl">
        <el-radio-group v-model="form.jgqzyjl" ref="jgqzyjl">
          <el-radio :label="1">有</el-radio>
          <el-radio :label="0">无</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-show="form.isgp==1" label="质押融资对象" class="ismust" prop="zydx" id="zydx">
        <el-radio-group v-model="form.zydx" ref="zydx">
          <el-radio :label="1">银行</el-radio>
          <el-radio :label="2">证券</el-radio>
          <br>
          <el-radio :label="3">小贷等其他金融机构</el-radio>
          <br>
          <el-radio :label="4">其他企业</el-radio>
          <el-radio :label="5">个人</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-show="form.isgp==1" label="最新成交或挂牌价" class="ismust" prop="gpcj" id="gpcj">
        <el-input v-model="form.gpcj" placeholder="请填写最新成交或挂牌价" ref="gpcj">
          <span slot="suffix">元</span>
        </el-input>
      </el-form-item>
      <el-form-item v-show="form.isgp==1" label="预测企业总估值" class="ismust" prop="zgz" id="zgz">
        <el-input v-model="form.zgz" placeholder="请填写预测企业总估值" ref="zgz">
          <span slot="suffix">万元</span>
        </el-input>
      </el-form-item>
      <el-form-item v-show="form.isgp==1" label="股权质押融资金额" class="ismust" prop="zyje" id="zyje">
        <el-input v-model="form.zyje" placeholder="请填写股权质押融资金额" ref="zyje">
          <span slot="suffix">万元</span>
        </el-input>
      </el-form-item>
      <el-form-item label="列入失信被执行人" class="ismust" prop="lrsx" id="lrsx">
        <el-radio-group v-model="form.lrsx" ref="lrsx">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="列入联合惩戒名单" class="ismust" prop="lrlh" id="lrlh">
        <el-radio-group v-model="form.lrlh" ref="lrlh">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="列入工商黑名单" class="ismust" prop="lrgs" id="lrgs">
        <el-radio-group v-model="form.lrgs" ref="lrgs">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="当前涉诉（被告）" class="ismust" prop="dqss" id="dqss">
        <el-radio-group v-model="form.dqss" ref="dqss">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="近3年被执行人记录" class="ismust" prop="jbzx" id="jbzx">
        <el-radio-group v-model="form.jbzx" ref="jbzx">
          <el-radio :label="1">有</el-radio>
          <el-radio :label="0">无</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="近3年行政处罚记录" class="ismust" prop="jxzcf" id="jxzcf">
        <el-radio-group v-model="form.jxzcf" ref="jxzcf">
          <el-radio :label="1">有</el-radio>
          <el-radio :label="0">无</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="列入异常经营名录" class="ismust" prop="lryc" id="lryc">
        <el-radio-group v-model="form.lryc" ref="lryc">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="其他负面记录" class="ismust" prop="qtfm" id="qtfm">
        <el-radio-group v-model="form.qtfm" ref="qtfm">
          <el-radio :label="1">有</el-radio>
          <el-radio :label="0">无</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上年度销售收入" class="ismust" prop="yyss" id="yyss">
        <el-input v-model="form.yyss" placeholder="请填写上年度销售收入" ref="yyss">
          <span slot="suffix">万元</span>
        </el-input>
      </el-form-item>
      <el-form-item label="企业纳税等级" class="ismust" prop="qyns" id="qyns">
        <el-radio-group v-model="form.qyns" ref="qyns">
          <el-radio :label="1">A</el-radio>
          <el-radio :label="2">B</el-radio>
          <br>
          <el-radio :label="3">C</el-radio>
          <el-radio :label="4">D</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="近12月纳税总额" class="ismust" prop="jnsze" id="jnsze">
        <el-input v-model="form.jnsze" placeholder="请填写近12月纳税总额" ref="jnsze">
          <span slot="suffix">万元</span>
        </el-input>
      </el-form-item>
      <el-form-item label="近24月增值税总额" class="ismust" prop="jzzs" id="jzzs">
        <el-input v-model="form.jzzs" placeholder="请填写近24月增值税总额" ref="jzzs">
          <span slot="suffix">万元</span>
        </el-input>
      </el-form-item>
      <el-form-item label="当前列入欠税名单" class="ismust" prop="lrqs" id="lrqs">
        <el-radio-group v-model="form.lrqs" ref="lrqs">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="近13-24月纳税总额" class="ismust" prop="ynsze" id="ynsze">
        <el-input v-model="form.ynsze" placeholder="请填写近13-24月纳税总额" ref="ynsze">
          <span slot="suffix">万元</span>
        </el-input>
      </el-form-item>
      <el-form-item label="近24月所得税总额" class="ismust" prop="jsds" id="jsds">
        <el-input v-model="form.jsds" placeholder="请填写近24月所得税总额" ref="jsds">
          <span slot="suffix">万元</span>
        </el-input>
      </el-form-item>
      <el-form-item label="近24月税务处罚记录" class="ismust" prop="jswcf" id="jswcf">
        <el-radio-group v-model="form.jswcf" ref="jswcf">
          <el-radio :label="1">有</el-radio>
          <el-radio :label="0">无</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="近12月法人变更" class="ismust" prop="jfrbg" id="jfrbg">
        <el-radio-group v-model="form.jfrbg" ref="jfrbg">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="近12月地址变更" class="ismust" prop="jdzbg" id="jdzbg">
        <el-radio-group v-model="form.jdzbg" ref="jdzbg">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="近12月股权质押" class="ismust" prop="jgqzy" id="jgqzy">
        <el-radio-group v-model="form.jgqzy" ref="jgqzy">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="近12月股东变更" class="ismust" prop="jgdbg" id="jgdbg">
        <el-radio-group v-model="form.jgdbg" ref="jgdbg">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="近12月经营范围变更" class="ismust" prop="jjjfw" id="jjjfw">
        <el-radio-group v-model="form.jjjfw" ref="jjjfw">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="近12月动产抵押" class="ismust" prop="jdcdy" id="jdcdy">
        <el-radio-group v-model="form.jdcdy" ref="jdcdy">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="担保方式" class="ismust" prop="dbfs" id="dbfs">
        <el-radio-group v-model="form.dbfs" ref="dbfs">
          <el-radio :label="1">信用</el-radio>
          <el-radio :label="2">抵押</el-radio>
          <br>
          <el-radio :label="3">质押</el-radio>
          <el-radio :label="4">保证</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="资产总额" class="ismust" prop="zcze" id="zcze">
        <el-input v-model="form.zcze" placeholder="请填写资产总额" ref="zcze">
          <span slot="suffix">万元</span>
        </el-input>
      </el-form-item>
      <el-form-item label="从业人数" class="ismust" prop="cyrs" id="cyrs">
        <el-input v-model="form.cyrs" placeholder="请填写从业人数" ref="cyrs">
          <span slot="suffix">人</span>
        </el-input>
      </el-form-item>
      <mt-button type="primary" @click.prevent="nextStep">下一步</mt-button>
    </el-form>

    <!--pickers-->
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
import Steps from "@/components/steps";
import HWT from "@/components/headerWithTitle";
import check from "@/common/check.js";
import { connect } from 'net';

export default {
  data() {
    return {
      id: this.$route.params.id,
      formError:false,
      form: {
        skname: "",
        ID: "",
        poname: "",
        poID: "",
        stp: "",
        syear: "",
        shj: "",
        sfc: "",
        isgp: 0,
        gptp: "",
        gpdate: "",
        zgs: "",
        jgqzyjl: "",
        zydx: "",
        gpcj: "",
        zgz: "",
        zyje: "",
        lrsx: "",
        lrlh: "",
        lrgs: "",
        dqss: "",
        jbzx: "",
        jxzcf: "",
        lryc: "",
        qtfm: "",
        yyss: "",
        qyns: "",
        jnsze: "",
        jzzs: "",
        lrqs: "",
        ynsze: "",
        jsds: "",
        jswcf: "",
        jfrbg: "",
        jdzbg: "",
        jgqzy: "",
        jgdbg: "",
        jjjfw: "",
        jdcdy: "",
        dbfs: "",
        zcze: "",
        cyrs: "",
      },
      datepickerTime:'1970-01-01',
      rules: check,
      checkGpList:["gptp","gpdate","zgs","jgqzyjl","zydx","gpcj","zgz","zyje"],
      checkPtList1:["skname","ID","poname","poID","stp","syear","shj","sfc"],
      checkPtList2: ["lrsx","lrlh","lrgs","dqss","jbzx","jxzcf","lryc","qtfm","yyss","qyns","jnsze","jzzs","lrqs","ynsze","jsds","jswcf","jfrbg","jdzbg","jgqzy","jgdbg","jjjfw","jdcdy","dbfs","zcze","cyrs"],
    };
  },
  components: { Steps, HWT },
  mounted() {},
  methods: {
    //打开、关闭日期选择器
    opendatepicker() {
      this.$refs.datepicker.open();
    },
    closepicker() {
      this.$refs.datepicker.close();
    },
    //确定触发
    handleConfirm(val) {
      this.form.gpdate=this.datepickerTime;
    },
    //改变触发
    dateChange(val){
      this.datepickerTime= this.formatDate(val);
    },
    //时间类型转换
    formatDate(data) {
      var date = new Date(data);
      const y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    },
    nextStep() {
      if(this.checkForm()){
          this.$router.push("/applyThree");
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
      let list=this.checkPtList1;
      if(this.form.isgp==1){
        list=list.concat(this.checkGpList);
      }
      list=list.concat(this.checkPtList2);
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
          document.documentElement.scrollTop = document.querySelector("#"+list[i]).offsetTop-document.querySelector('.mysteps').clientHeight;
          return false;
        }
      }
      return true;
    },
  }
};
</script>

<style lang="less" scoped>
@import url(../assets/css/applications/applyTwo.less);
</style>
