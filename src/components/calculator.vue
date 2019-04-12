<template>
  <div class="calculator" v-show="isShow">
    <div class="mask" @click="hid"></div>
    <div class="c_from" ref="c_from">
      <el-form
        class="c_el_from"
        label-position="left"
        :show-message="false"
        :hide-required-asterisk="true"
        ref="form"
        :model="form"
        :rules="rules"
        label-width="3.5rem"
        @validate="showMessage"
      >
        <el-form-item label="企业名称" class="ismust" prop="name">
          <el-input v-model="form.name" placeholder="请填写企业名称" ref="name"></el-input>
        </el-form-item>
        <el-form-item label="年收入" class="ismust" prop="inmoney">
          <el-input v-model="form.inmoney" placeholder="请填写年收入" ref="inmoney">
            <span slot="suffix">万元</span>
          </el-input>
        </el-form-item>
        <el-form-item label="年限" class="ismust" prop="year">
          <el-input v-model="form.year" placeholder="请填写年限" ref="year"></el-input>
        </el-form-item>
        <el-form-item label="所属行业" class="ismust" prop="hy">
          <el-input
            @focus="openpicker()"
            v-model="form.hy"
            placeholder="请选择行业"
            suffix-icon="el-icon-caret-bottom"
            ref="hy"
          ></el-input>
        </el-form-item>
        <mt-button type="primary" size="large" @click.prevent="jisuan">计算</mt-button>
        <el-form-item label="预计贷款金额" prop="yuji">
          <el-input v-model="form.yuji" disabled>
            <span slot="suffix">万元</span>
          </el-input>
        </el-form-item>
      </el-form>

      <!--pickers-->
      <mt-popup v-model="popupVisible" position="bottom" class="popup">
        <mt-picker ref="hypicker" :slots="hylist" @change="onValuesChange"></mt-picker>
      </mt-popup>
    </div>
  </div>
</template>
<script>
import industry from "@/common/industry.json";
import check from "@/common/check.js";
import { setTimeout } from "timers";
import { Indicator } from 'mint-ui';
export default {
  data() {
    return {
      popupVisible: false,
      clientHeight: "",
      isShow: false,
      formError:false,
      form: {
        name: "",
        inmoney: "",
        year: "",
        hy: "",
        yuji: ""
      },
      rules: check,
      checkList: ["name", "inmoney", "year", "hy"],
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
      this.$refs.c_from.style.top =
        (clientHeight - this.$refs.c_from.clientHeight) / 2 + "px";
    },
    show() {
      let _this = this;
      this.isShow = true;
      setTimeout(function() {
        _this.changeFixed(_this.clientHeight);
      }, 10);
    },
    hid() {
      this.isShow = false;
    },
    onValuesChange(picker, values) {
      this.form.hy = values.toString();
    },
    openpicker(val) {
      this.popupVisible = true;
    },
    //错误信息提示
    showMessage(prop, pass, message) {
      if(message){
      this.$vux.toast.show({
        text: message
      });}
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
          if(this.$refs[this.checkList[i]].focus){
            this.$refs[this.checkList[i]].focus();
          }
          return false;
        }
      }
      return true;
    },
    jisuan() {
      if(this.checkForm()){
        Indicator.open({
          text: '计算中...',
          spinnerType: 'fading-circle'
        });
        setTimeout(function() {
        Indicator.close();
      }, 2000);
      }
    }
  },
  watch: {
    clientHeight: function() {
      this.changeFixed(this.clientHeight);
    }
  }
};
</script>
<style lang='less' scoped>
@import url(../assets/css/index/calculator.less);
</style>
<style lang='less'>
* /deep/ .mint-indicator{
  .mint-indicator-wrapper{
    z-index:2000;
  }
  .mint-indicator-mask{
    z-index:2001;
  }
}
</style>
