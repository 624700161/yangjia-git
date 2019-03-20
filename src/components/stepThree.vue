<template>
  <div class="step-three-content" v-loading.fullscreen.lock="fullscreenLoading">
    <!-- special-title -->
    <p class="special-title color_F0 font_size16">财务指标（元）</p>
    <section v-for="(item,myIndex) in pageTotalData.content" :key="myIndex">
      <!-- input -->
      <div class="flex flex-v m_b20" :ref="item.ref">
        <p class="font_size14 color_2B label-style">
          {{item.title}}
          <span class="color_D0">*</span>
        </p>
        <div class="outer-box" v-for="(el,i) in item.content" :key="i">
          <input
            type="text"
            class="input-style border-DD m_b20"
            v-model="el.modelValue"
            :placeholder="el.placeholder"
            @blur="blurFuc(el.modelValue,pageTotalData.reg,myIndex,i)"
            @focus="focusFuc(myIndex,i)"
            autocomplete="off"
          >
          <span class="color_D0 step-three-error-msg">{{el.errorTips}}</span>
        </div>
      </div>
    </section>
    <!-- prev/submit -->
    <section class="cancel-tonext flex flex-align-center font_size16 flex-pack-justify">
      <span class="public-btn my_text_center border-DD color_2B m_r30" @click="toPrevFuc">上一步</span>
      <span class="public-btn my_text_center bg_colorF0 color_FF" @click="valuationFuc">提交</span>
    </section>
    <!-- 提交成功弹出框 -->
    <submit-msg valuType="专业估值" v-if="isShowShade" @checkCompanyInfo="checkCompanyInfo"></submit-msg>
  </div>
</template>

<script>
import scrollToError from "@/common/scrollToError.js";
import SubmitMsg from "@/components/submitMsg";
export default {
  data() {
    return {
      pageTotalData: {
        content: [
          {
            title: "1.收入",
            content: [
              {
                modelValue: "",
                placeholder: "2015",
                errorTips: ""
              },
              {
                modelValue: "",
                placeholder: "2016",
                errorTips: ""
              },
              {
                modelValue: "",
                placeholder: "2017",
                errorTips: ""
              }
            ],
            ref: "sr"
          },
          {
            title: "2.成本",
            content: [
              {
                modelValue: "",
                placeholder: "2015",
                errorTips: ""
              },
              {
                modelValue: "",
                placeholder: "2016",
                errorTips: ""
              },
              {
                modelValue: "",
                placeholder: "2017",
                errorTips: ""
              }
            ],
            ref: "cb"
          },
          {
            title: "3.净利润",
            content: [
              {
                modelValue: "",
                placeholder: "2015",
                errorTips: ""
              },
              {
                modelValue: "",
                placeholder: "2016",
                errorTips: ""
              },
              {
                modelValue: "",
                placeholder: "2017",
                errorTips: ""
              }
            ],
            ref: "jlr"
          },
          {
            title: "4.财务费用",
            content: [
              {
                modelValue: "",
                placeholder: "2015",
                errorTips: ""
              },
              {
                modelValue: "",
                placeholder: "2016",
                errorTips: ""
              },
              {
                modelValue: "",
                placeholder: "2017",
                errorTips: ""
              }
            ],
            ref: "cwfy"
          },
          {
            title: "5.管理费用",
            content: [
              {
                modelValue: "",
                placeholder: "2015",
                errorTips: ""
              },
              {
                modelValue: "",
                placeholder: "2016",
                errorTips: ""
              },
              {
                modelValue: "",
                placeholder: "2017",
                errorTips: ""
              }
            ],
            ref: "glfy"
          },
          {
            title: "6.销售费用",
            content: [
              {
                modelValue: "",
                placeholder: "2015",
                errorTips: ""
              },
              {
                modelValue: "",
                placeholder: "2016",
                errorTips: ""
              },
              {
                modelValue: "",
                placeholder: "2017",
                errorTips: ""
              }
            ],
            ref: "xsfy"
          },
          {
            title: "7.总资产",
            content: [
              {
                modelValue: "",
                placeholder: "2015",
                errorTips: ""
              },
              {
                modelValue: "",
                placeholder: "2016",
                errorTips: ""
              },
              {
                modelValue: "",
                placeholder: "2017",
                errorTips: ""
              }
            ],
            ref: "zzc"
          },
          {
            title: "8.总负债",
            content: [
              {
                modelValue: "",
                placeholder: "2015",
                errorTips: ""
              },
              {
                modelValue: "",
                placeholder: "2016",
                errorTips: ""
              },
              {
                modelValue: "",
                placeholder: "2017",
                errorTips: ""
              }
            ],
            ref: "zfz"
          },
          {
            title: "9.货币资金",
            content: [
              {
                modelValue: "",
                placeholder: "2015",
                errorTips: ""
              },
              {
                modelValue: "",
                placeholder: "2016",
                errorTips: ""
              },
              {
                modelValue: "",
                placeholder: "2017",
                errorTips: ""
              }
            ],
            ref: "hbzj"
          },
          {
            title: "10.应收账款",
            content: [
              {
                modelValue: "",
                placeholder: "2015",
                errorTips: ""
              },
              {
                modelValue: "",
                placeholder: "2016",
                errorTips: ""
              },
              {
                modelValue: "",
                placeholder: "2017",
                errorTips: ""
              }
            ],
            ref: "yszk"
          },
          {
            title: "11.存货",
            content: [
              {
                modelValue: "",
                placeholder: "2015",
                errorTips: ""
              },
              {
                modelValue: "",
                placeholder: "2016",
                errorTips: ""
              },
              {
                modelValue: "",
                placeholder: "2017",
                errorTips: ""
              }
            ],
            ref: "ch"
          },
          {
            title: "12.流动资产",
            content: [
              {
                modelValue: "",
                placeholder: "2015",
                errorTips: ""
              },
              {
                modelValue: "",
                placeholder: "2016",
                errorTips: ""
              },
              {
                modelValue: "",
                placeholder: "2017",
                errorTips: ""
              }
            ],
            ref: "ldzc"
          },
          {
            title: "13.流动负债",
            content: [
              {
                modelValue: "",
                placeholder: "2015",
                errorTips: ""
              },
              {
                modelValue: "",
                placeholder: "2016",
                errorTips: ""
              },
              {
                modelValue: "",
                placeholder: "2017",
                errorTips: ""
              }
            ],
            ref: "ldfz"
          },
          {
            title: "14.所得税",
            content: [
              {
                modelValue: "",
                placeholder: "2015",
                errorTips: ""
              },
              {
                modelValue: "",
                placeholder: "2016",
                errorTips: ""
              },
              {
                modelValue: "",
                placeholder: "2017",
                errorTips: ""
              }
            ],
            ref: "sds"
          }
        ],
        reg: [/^\d+(\.\d{1,2})?$/] //是否为两位小数
      },
      //传给后台的数据
      cwzb: [
        {
          sr: "", //收入
          cb: "", //成本
          jlr: "", //净利润
          cwfy: "", //财务费用
          glfy: "", //管理费用
          xsfy: "", //销售费用
          zzc: "", //总资产
          zfz: "", //总负债
          hbzj: "", //货币资金
          yszk: "", //应收账款
          ch: "", //存货
          ldzc: "", //流动资产
          ldfz: "", //流动负债
          sds: "" //所得税
        },
        {
          sr: "",
          cb: "",
          jlr: "",
          cwfy: "",
          glfy: "",
          xsfy: "",
          zzc: "",
          zfz: "",
          hbzj: "",
          yszk: "",
          ch: "",
          ldzc: "",
          ldfz: "",
          sds: ""
        },
        {
          sr: "",
          cb: "",
          jlr: "",
          cwfy: "",
          glfy: "",
          xsfy: "",
          zzc: "",
          zfz: "",
          hbzj: "",
          yszk: "",
          ch: "",
          ldzc: "",
          ldfz: "",
          sds: ""
        }
      ],
      fullscreenLoading: false, //loading
      isShowShade: false, //是否弹出遮罩层
      formID: this.$store.state.professionStepOneID, //获取表单ID
      proOneData: {},
      proTwoData: {},
      arguReportID:'',//成功提交后后台返回的reportID
      arguFormID:'',//成功提交后后台返回的formID
    };
  },
  components: {
    SubmitMsg
  },
  mounted() {
    this.$emit("toNextStep", "stepThree");
    if (this.formID) {
      this.$https.get(`/report/reportForm/${this.formID}`).then(res => {
        if (res.data) {
          this.proOneData = res.data.qyxx;
          this.proTwoData = res.data.rxzb;
        }
      });
    };
    if (/Android [4-6]/.test(navigator.appVersion)) {
      window.addEventListener("resize", function() {
        if (
          document.activeElement.tagName == "INPUT" ||
          document.activeElement.tagName == "TEXTAREA"
        ) {
          window.setTimeout(function() {
            document.activeElement.scrollIntoViewIfNeeded();
          }, 0);
        }
      });
    }
  },
  methods: {
    // 各数据失去焦点时校验
    blurFuc(value, reg, index, i) {
      if (!this.testNullFuc(value)) {
        this.pageTotalData.content[index].content[i].errorTips = "该项为必填项";
      } else if (!this.testRegFuc(value, reg)) {
        this.pageTotalData.content[index].content[i].errorTips =
          "只能为数字,如有小数只保留两位";
      } else {
        this.pageTotalData.content[index].content[i].errorTips = "";
      }
    },
    //获取焦点后执行
    focusFuc(index, i) {
      this.pageTotalData.content[index].content[i].errorTips = "";
      this.pageTotalData.content[index].content[i].placeholder = "";
    },
    //检验是否为空的fuc
    testNullFuc(value) {
      if (!value) return false;
      return true;
    },
    //正则匹配检验
    testRegFuc(value, reg) {
      return new RegExp(reg[0]).test(value);
    },
    //点击上一步
    toPrevFuc() {
      this.$emit("toPrevFuc");
      this.$router.push("/profession/stepTwo", "stepTwo");
    },
    //点击提交或下一步
    valuationFuc() {
      let refsArr = []; //所有报错信息的ref
      this.pageTotalData.content.forEach(item => {
        item.content.forEach((e, i) => {
          if (!e.modelValue) {
            e.errorTips = "该项不能为空";
            refsArr.push(item.ref);
          } else {
            this.cwzb[i][item.ref] = e.modelValue;
          }
        });
      });
      if (refsArr.length) {
        this.$vux.toast.show({
          text: "提交出错！请根据表单中的红字提示完善信息！"
        });
        scrollToError(this, refsArr);
      } else {
        this.fullscreenLoading = true;
        this.submitData();
      }
    },
    // 提交数据
    submitData() {
      let arguData = {
        id: this.formID,
        type: "专业",
        qyxx: this.proOneData,
        rxzb: this.proTwoData,
        cwzb: this.cwzb
      };
      this.$https
        .formdataPost("/report/professionReport", arguData)
        .then(res => {
          this.fullscreenLoading = false;
          if (res.data) {
            this.isShowShade = true;
            this.$store.commit("deleteProOneID");
            this.arguReportID = res.data.reportId
            this.arguFormID = res.data.formId;
          } else {
            this.$vux.toast.show({
              text: res.msg
            });
          }
        });
    },
    //点击查看企业详情
    checkCompanyInfo(){
      this.isShowShade = false;
      this.$router.push('/infoReport');
      this.$store.commit('getReportID',this.arguReportID)
      this.$store.commit('getCompanyFormID',this.arguFormID)
      this.$store.commit('getReportType',0)
    }
  }
};
</script>
<style lang='less'>
@import url(../assets/css/component/step.less);
</style>