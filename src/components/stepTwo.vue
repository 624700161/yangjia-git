<template>
  <div class="step-two-content" v-loading.fullscreen.lock="fullscreenLoading">
    <!-- content -->
    <section class="main-content" v-for="(item,myIndex) in pageTotalData" :key="myIndex">
      <!-- title -->
      <p class="color_F0 font_size16 item-title">{{item.title}}</p>
      <!-- radio -->
      <div
        class="flex flex-v radio-outer-box"
        :ref="el.ref"
        v-for="(el,i) in item.children"
        :key="i"
      >
        <label :for="el.subTitle" class="font_size14 color_2B radio-label-style">
          {{el.subTitle}}
          <span class="color_D0">*</span>
          <span class="step-two-error-msg color_D0">{{el.errorTips}}</span>
        </label>
        <div>
          <el-radio-group
            v-model="el.modelValue"
            class="radio-style flex"
            @change="blurFuc(el.modelValue,i,myIndex)"
          >
            <el-radio
              :label="e"
              v-for="(e,j) in el.subOptions"
              :key="j"
              class="step-two-radio-item"
            >{{e}}</el-radio>
          </el-radio-group>
        </div>
      </div>
    </section>
    <!-- prev/submit -->
    <section
      v-if="$route.path.indexOf('fast')>-1"
      class="cancel-tonext flex flex-align-center font_size16 flex-pack-justify"
    >
      <span class="public-btn my_text_center border-DD color_2B m_r30" @click="toPrevFuc">上一步</span>
      <span class="public-btn my_text_center bg_colorF0 color_FF" @click="valuationFuc">提交</span>
    </section>
    <!-- prev/toNext -->
    <section v-else class="cancel-tonext flex flex-align-center flex-pack-justify font_size16">
      <span
        class="public-btn my_text_center border-DD color_2B m_r30"
        @click="toPrevFuc('stepOne')"
      >上一步</span>
      <span class="public-btn my_text_center bg_colorF0 color_FF" @click="valuationFuc">下一步</span>
    </section>
    <!-- 弹窗 -->
    <submit-msg valuType="快速估值" v-if="isShowShade" @checkCompanyInfo="checkCompanyInfo"></submit-msg>
  </div>
</template>

<script>
import scrollToError from "@/common/scrollToError.js";
import SubmitMsg from "@/components/submitMsg";

export default {
  props: {
    formType: {
      type: "",
      default: ""
    }
  },
  data() {
    return {
      pageTotalData: [
        {
          title: "企业竞争力",
          children: [
            {
              subTitle: "1、公司所在行业的生命周期",
              subOptions: ["a.初创期", "b.成长期", "c.成熟期", "d.衰退期"],
              errorTips: "",
              modelValue: "",
              ref: "gssmzq"
            },
            {
              subTitle: "2.公司所处行业有无对标企业",
              subOptions: [
                "a.新兴行业尚无对标企业",
                "b.1-2个",
                "c.3-5个",
                "d.6个以上"
              ],
              errorTips: "",
              modelValue: "",
              ref: "dbqy"
            },
            {
              subTitle: "3、公司所处发展阶段",
              subOptions: ["a.初创期", "b.成长期", "c.成熟期", "d.衰退期"],
              errorTips: "",
              modelValue: "",
              ref: "fzjd"
            },
            {
              subTitle: "4.公司在所处行业中的竞争力",
              subOptions: ["a.强", "b.中", "c.弱", "d.衰退期"],
              errorTips: "",
              modelValue: "",
              ref: "hyjzl"
            },
            {
              subTitle: "5.公司的市场占有率",
              subOptions: ["a.5%以下", "b.5%-25%", "c.26%-50%", "d.50%以上"],
              errorTips: "",
              modelValue: "",
              ref: "sczyl"
            },
            {
              subTitle: "6.公司近三年的市场增长率",
              subOptions: ["a.5%以下", "b.5%-25%", "c.26%-50%", "d.50%以上"],
              errorTips: "",
              modelValue: "",
              ref: "sczzl"
            },
            {
              subTitle: "7.公司近三年客户增长率",
              subOptions: ["a.5%以下", "b.5%-25%", "c.26%-50%", "d.50%以上"],
              errorTips: "",
              modelValue: "",
              ref: "khzzl"
            },
            {
              subTitle: "8.市场竞争程度",
              subOptions: ["a.低", "b.一般", "c.较强", "d.很强"],
              errorTips: "",
              modelValue: "",
              ref: "scjzcd"
            },
            {
              subTitle: "9.产品是否已经进入市场",
              subOptions: ["a.是", "b.否"],
              errorTips: "",
              modelValue: "",
              ref: "jrsc"
            },
            {
              subTitle: "10.市场推广方式",
              subOptions: ["a.线上推广", "b.线下推广", "c.线上结合线下推广"],
              errorTips: "",
              modelValue: "",
              ref: "sctgfs"
            },
            {
              subTitle: "11.同类竞品数量",
              subOptions: ["a.0个", "b.1-5个", "c.6-10个", "d.若干"],
              errorTips: "",
              modelValue: "",
              ref: "tljpsl"
            }
          ]
        },
        {
          title: "团队",
          children: [
            {
              subTitle: "1、公司中高层管理者学历,本科及以上的占比",
              subOptions: ["a.50%以下", "b.50%-70%", "c.71%-90%", "d.90%以上"],
              errorTips: "",
              modelValue: "",
              ref: "glcxlbk"
            },
            {
              subTitle: "2.公司核心团队是否有创业经历",
              subOptions: ["a.是", "b.否"],
              errorTips: "",
              modelValue: "",
              ref: "cyjl"
            },
            {
              subTitle: "3.核心团队是否有领军企业背景",
              subOptions: ["a.是", "b.否"],
              errorTips: "",
              modelValue: "",
              ref: "ljqybj"
            },
            {
              subTitle: "4.公司管理层持有股权比例",
              subOptions: ["a.30%以下", "b.30%-50%", "c.51%-80%", "d.80%以上"],
              errorTips: "",
              modelValue: "",
              ref: "cygfbl"
            },
            {
              subTitle: "5.领导人的筹资能力",
              subOptions: ["a.较差", "b.较强", "c.强", "d.很强"],
              errorTips: "",
              modelValue: "",
              ref: "cznl"
            },
            {
              subTitle:
                "6.领导人的综合领导能力 （包括执行力、创造力、大局观以及承受失败和压力的能力）",
              subOptions: ["a.较差", "b.较强", "c.强", "d.很强"],
              errorTips: "",
              modelValue: "",
              ref: "zhldnl"
            }
          ]
        },
        {
          title: "技术竞争力",
          children: [
            {
              subTitle:
                "1.企业拥有的专利、软件著作权、集成电路布图设计专有权、植物新品种等核心自主知识产权的数量（不含商标)",
              subOptions: ["a.0项", "b.1-3项", "c.4-5项", "d.6项以上"],
              errorTips: "",
              modelValue: "",
              ref: "zl"
            },
            {
              subTitle: "2.核心团队的研究能力",
              subOptions: ["a.极强", "b.强", "c.中", "d.弱"],
              errorTips: "",
              modelValue: "",
              ref: "yjnl"
            },
            {
              subTitle: "3.新产品开发速度",
              subOptions: ["a.极强", "b.快", "c.一般", "d.较慢"],
              errorTips: "",
              modelValue: "",
              ref: "xcpkfsd"
            },
            {
              subTitle: "4.研究开发团队的平均从业时间",
              subOptions: ["a.10年以上", "b.5-10年", "c.3-5年", "d.3年以下"],
              errorTips: "",
              modelValue: "",
              ref: "pjcysj"
            }
          ]
        },
        {
          title: "风险指标",
          children: [
            {
              subTitle:
                "1.公司是否存在关联交易，如有关联交易，请选择占总收入的比重",
              subOptions: ["a.10%以下", "b.10%-30%", "c.31%-60%", "d.60%以上"],
              errorTips: "",
              modelValue: "",
              ref: "gljy"
            },
            {
              subTitle: "2.公司是否设立内控和（或）内审部门",
              subOptions: [
                "a.无",
                "b.有，但发挥作用较少",
                "c.有，并发挥一定作用",
                "d.有，并较好执行"
              ],
              errorTips: "",
              modelValue: "",
              ref: "nkns"
            },
            {
              subTitle: "3.公司是否受过监管机构处罚",
              subOptions: ["a.是", "b.否"],
              errorTips: "",
              modelValue: "",
              ref: "cf"
            }
          ]
        },
        {
          title: "财务指标",
          children: [
            {
              subTitle: "1.毛利率 = (主营业务收入-主营业务成本）/主营业务收入",
              subOptions: [
                "a.小于20%（不含）",
                "b.20%-50%（不含）",
                "c.50%-90%（不含）",
                "d.大于等于90%"
              ],
              errorTips: "",
              modelValue: "",
              ref: "mlv"
            },
            {
              subTitle: "2.净利润率 = 净利润/主营业务收入",
              subOptions: [
                "a.小于10%（不含）",
                "b.10%-30%（不含）",
                "c.30%-60%（不含）",
                "d.大于等于60%"
              ],
              errorTips: "",
              modelValue: "",
              ref: "jmlv"
            },
            {
              subTitle: "3.盈余现金保障倍数＝经营现金净流入/净利润",
              subOptions: [
                "a.小于0.5（不含）",
                "b.0.5-0.8（不含）",
                "c.0.8-1.0（不含）",
                "d.大于等于1以上"
              ],
              errorTips: "",
              modelValue: "",
              ref: "yyxjbzbs"
            },
            {
              subTitle:
                "4.主营业务收入增长率 = （本年主营业务收入 – 上年主营业务收入）/上年主营业务收入",
              subOptions: [
                "a.小于30%（不含30%）",
                "b.30%-60%（不含60%）",
                "c.60%-90%（不含90%）",
                "d.大于等于90%"
              ],
              errorTips: "",
              modelValue: "",
              ref: "ywsrzzl"
            },
            {
              subTitle: "5.应收帐款周转率=主营业务收入/平均应收帐款",
              subOptions: [
                "a.0-3（不含3）",
                "b.3-8（不含8）",
                "c.8-24（不含24）",
                "d.大于等于24"
              ],
              errorTips: "",
              modelValue: "",
              ref: "yszkzzl"
            },
            {
              subTitle: "6.流动比率 = 流动资产/流动负债",
              subOptions: [
                "a.小于1（不含1）",
                "b.1-1.25（不含1.25）",
                "c.1.25-2（不含2）",
                "d.大于等于2"
              ],
              errorTips: "",
              modelValue: "",
              ref: "ldbl"
            },
            {
              subTitle: "7.资产负债率 = 负债总额/资产总额",
              subOptions: [
                "a.0-3（不含3）",
                "b.3-8（不含8）",
                "c.8-24（不含24）",
                "d.大于等于24"
              ],
              errorTips: "",
              modelValue: "",
              ref: "zzfzl"
            }
          ]
        }
      ],
      //传给后台的数据
      rxzb: {
        gssmzq: "", //公司所在行业生命周期
        dbqy: "", //所处行业有无对标企业
        fzjd: "", //公司所处发展阶段
        hyjzl: "", //公司在所处行业的竞争力
        sczyl: "", //市场占有率
        sczzl: "", //近三年的市场增长率
        khzzl: "", //近三年的客户增长率
        scjzcd: "", //市场竞争程度
        jrsc: "", //产品是否已经进入市场
        sctgfs: "", //市场推广方式
        tljpsl: "", //同类竞品数量
        glcxlbk: "", //高管本科学历以上占比
        cyjl: "", //核心团队是否有创业经历
        ljqybj: "", //核心团队领军企业背景
        cygfbl: "", //公司管理层持有股份比例
        cznl: "", //领导人的筹资能力
        zhldnl: "", //综合领导能力
        zl: "", //专利、著作权
        yjnl: "", //研究能力
        xcpkfsd: "", //新产品开发速度
        pjcysj: "", //平均从业时间
        gljy: "", //关联交易
        nkns: "", //内控、内审部门
        cf: "", //是否受过处罚
        mlv: "", //毛利率
        jmlv: "", //净利润
        yyxjbzbs: "", //盈余现金保障倍数
        ywsrzzl: "", //业务收入增长率
        yszkzzl: "", //应收账款周转率
        ldbl: "", //流动比率
        zzfzl: "" //资产负债率
      },
      fullscreenLoading: false, //loading
      isShowShade: false, //是否显示弹窗
      fastStepOneID: this.$store.state.fastStepOneID, //快速估值第一步的表单ID
      fastOneData: {},
      professionStepOneID: this.$store.state.professionStepOneID, //专业估值第一步的表单ID
      professionOneData: {},
      // professionTwoData:{},
      formID:
        this.formType == "fast"
          ? this.$store.state.fastStepOneID
          : this.$store.state.professionStepOneID, //获取表单ID,
      arguReportID:'',
      arguFormID:'',
    };
  },
  components: {
    SubmitMsg
  },
  mounted() {
    this.$emit("toNextStep", "stepTwo");
    switch (this.formType) {
      case "fast":
        if (this.fastStepOneID) {
          this.getFastFormDataByID();
        } else {
          this.toPrevFuc();
        }
        break;
      case "profession":
        if (this.professionStepOneID) {
          this.getProfFormDataByID();
        } else {
          this.$router.push("/profession");
        }
      default:
        break;
    }
  },
  methods: {
    //点击上一步
    toPrevFuc(data = "") {
      this.$emit("toPrevFuc", data);
      this.$router.push(`/${this.formType}`);
    },
    //change校验
    blurFuc(value, i, index) {
      if (!value) {
        this.pageTotalData[index].children[i].errorTips = "该项不能为空";
      } else {
        this.pageTotalData[index].children[i].errorTips = "";
      }
    },
    //点击提交或下一步
    valuationFuc() {
      let refsArr = []; //所有报错信息的ref
      this.pageTotalData.forEach(item => {
        item.children.forEach(e => {
          if (!e.modelValue) {
            e.errorTips = "该项不能为空";
            refsArr.push(e.ref);
          } else {
            this.rxzb[e.ref] = e.modelValue;
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
        if (this.formType == "fast") {
          this.submitData();
        } else {
          let arguData = this.formID
            ? {
                id: this.formID,
                type: "专业",
                qyxx: this.professionOneData,
                rxzb: this.rxzb
              }
            : { type: "专业", qyxx: this.professionOneData, rxzb: this.rxzb };
          this.toStepThree(arguData);
        }
      }
    },
    // 快速估值提交数据
    submitData() {
      
      let arguData = {
        id: this.fastStepOneID,
        type: "快速",
        qyxx: this.fastOneData,
        rxzb: this.rxzb
      };

      this.$https.formdataPost("/report/quickReport", arguData).then(res => {
        this.fullscreenLoading = false;
        if (res.data) {
          this.isShowShade = true;
          this.$store.commit("deleteFastOneID");
          this.arguReportID = res.data.reportId;
          this.arguFormID = res.data.formId;
        } else {
          this.$vux.toast.show({
            text: res.msg
          });
        }
      });
    },
    //快速估值根据表单id获取数据
    getFastFormDataByID() {
      this.$https.get(`/report/reportForm/${this.fastStepOneID}`).then(res => {
        if (res.data) {
          this.fastOneData = res.data.qyxx;
        }
      });
    },
    //专业估值根据表单id获取数据
    getProfFormDataByID() {
      this.$https
        .get(`/report/reportForm/${this.professionStepOneID}`)
        .then(res => {
          this.professionOneData = res.data.qyxx;
          if (res.data.rxzb) {
            this.rxzb = res.data.rxzb;
            this.pageTotalData.forEach(item => {
              item.children.forEach(e => {
                e.modelValue = this.rxzb[e.ref];
              });
            });
          }
        });
    },
    //专业估值点击下一步
    toStepThree(data) {
      this.$https.put("/report", data).then(res => {
        this.fullscreenLoading = false;
        if (res.code) {
          this.$vux.toast.show({
            text: res.msg
          });
        } else {
          this.$emit("toNextStep", "stepThree");
          this.$router.push("/profession/stepThree");
          this.$store.commit("getProOneID", res.data);
        }
      });
    },
    //点击查看企业详情
    checkCompanyInfo() {
      this.isShowShade = false;
      this.$router.push("/infoReport");
      this.$store.commit("getReportID", this.arguReportID);
      this.$store.commit('getCompanyFormID',this.arguFormID)
      this.$store.commit('getReportType',1)
    }
  }
};
</script>
<style lang='less'>
@import url(../assets/css/component/step.less);
</style>