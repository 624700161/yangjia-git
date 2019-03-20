<template>
  <div>
    <div class="info-outer-box m_b30" v-loading.fullscreen.lock="fullscreenLoading">
      <section v-for="(item,index) in pageTotalData" :key="index" class="m_b30">
        <!-- title -->
        <p
          class="content-title font_size16 color_F0"
          :class="index == 2 && 'title-line'"
          v-if="index ==0 || index ==1 ||(index ==2 && isHasCWZB)"
        >{{item.title}}</p>
        <!-- subTitle -->
        <div v-if="index!=2">
          <div v-for="(elem,i) in item.content" :key="i">
            <p class="content-subTitle color_F0">{{elem.subTitle}}</p>
            <!-- label -->
            <div v-for="(el,j) in elem.content" :key="j" class="m_b20 font_size14">
              <span v-for="(e,k) in el.label" :key="k" class="content-label color_99">{{e}}</span>
              <div v-for="e in el.value" :key="e">
                <span>{{e}}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 专业估值独有的第三部分 -->
        <ul v-if="index == 2 && isHasCWZB">
          <li
            v-for="(elem,x) in item.content"
            :key="x"
            class="flex table-item"
            :class="x%2!=0?'bg_colorF9':''"
          >
            <span class="flex-1" :class="x==0 && 'color_F0'">{{elem.subTitle}}</span>
            <span
              v-for="(e,y) in elem.content[0].label"
              :key="y"
              :class="x==0 && 'color_F0'"
              class="flex-1 my_text_center"
            >{{e}}</span>
            <span
              v-for="(e,z) in elem.content[0].value"
              :key="z"
              class="flex-1 my_text_center"
            >{{e}}</span>
          </li>
        </ul>
      </section>
    </div>
    <!-- footer -->
    <my-footer></my-footer>
  </div>
</template>

<script>
import myFooter from "@/components/myFooter";

export default {
  data() {
    return {
      pageTotalData: [
        {
          title: "企业基本信息",
          content: [
            {
              subTitle: "",
              content: [
                {
                  label: ["企业名称"],
                  value: [],
                  ref: "qync"
                },
                {
                  label: ["企业统一社会信用代码"],
                  value: [],
                  ref: "qyid"
                },
                {
                  label: ["邮箱"],
                  value: [],
                  ref: "yx"
                },
                {
                  label: ["企业成立日期"],
                  value: [],
                  ref: "qyclrq"
                },
                {
                  label: ["所在地区"],
                  value: [],
                  ref: "szdq"
                },
                {
                  label: ["目标市场"],
                  value: [],
                  ref: "mbsc"
                },
                {
                  label: ["产品是否已推向市场"],
                  value: [],
                  ref: "txsc"
                },
                {
                  label: ["市场竞争程度"],
                  value: [],
                  ref: "jzcd"
                },
                {
                  label: ["最近一年公司盈利情况"],
                  value: [],
                  ref: "yl"
                },
                {
                  label: ["公司主营业务概述"],
                  value: [],
                  ref: "gszyywgs"
                },
                {
                  label: ["创始人学历"],
                  value: [],
                  ref: "xl"
                },
                {
                  label: ["管理团队在此行业的从业时间"],
                  value: [],
                  ref: "cysj"
                },
                {
                  label: ["创业经验"],
                  value: [],
                  ref: "cyjy"
                },
                {
                  label: ["团队核心创始人员人数"],
                  value: [],
                  ref: "csry"
                },
                {
                  label: ["是否为全职员工"],
                  value: [],
                  ref: "cssfqz"
                },
                {
                  label: ["核心技术人员人数"],
                  value: [],
                  ref: "hxrs"
                },
                {
                  label: ["是否为全职员工"],
                  value: [],
                  ref: "jssfqz"
                },
                {
                  label: ["融资额度"],
                  value: [],
                  ref: "jsrs"
                },
                {
                  label: ["出让股权比率"],
                  value: [],
                  ref: "rzed"
                },
                {
                  label: ["拟上市地点"],
                  value: [],
                  ref: "nssdz"
                },
                {
                  label: ["行业选择"],
                  value: [],
                  ref: "hyxz"
                },
                {
                  label: ["行业二级选择"],
                  value: [],
                  ref: "ejxz"
                },
                {
                  label: ["公司营业收入"],
                  value: [],
                  ref: "gsyysr"
                },
                {
                  label: ["公司净资产"],
                  value: [],
                  ref: "gsjzc"
                },
                {
                  label: ["未来12个月净利润"],
                  value: [],
                  ref: "yearjlr"
                },
                {
                  label: ["息税折旧摊销前利润"],
                  value: [],
                  ref: "qlr"
                },
                {
                  label: ["第一股东持股比例"],
                  value: [],
                  ref: "diyi"
                },
                {
                  label: ["第二股东持股比例"],
                  value: [],
                  ref: "dier"
                },
                {
                  label: ["第三股东持股比例"],
                  value: [],
                  ref: "disan"
                },
                {
                  label: ["第四股东持股比例"],
                  value: [],
                  ref: "disi"
                },
                {
                  label: ["其他股东持股比例"],
                  value: [],
                  ref: "qita"
                },
                {
                  label: ["填表人姓名"],
                  value: [],
                  ref: "tbrmc"
                },
                {
                  label: ["填表人联系方式"],
                  value: [],
                  ref: "tbrlxdh"
                }
              ]
            }
          ]
        },
        {
          title: "企业软性指标",
          content: [
            {
              subTitle: "企业竞争力",
              content: [
                {
                  label: ["1.公司所在行业的生命周期"],
                  value: [""],
                  ref: "gssmzq"
                },
                {
                  label: ["2.公司所处行业有无对标企业"],
                  value: [],
                  ref: "dbqy"
                },
                {
                  label: ["3、公司所处发展阶段"],
                  value: [],
                  ref: "fzjd"
                },
                {
                  label: ["4.公司在所处行业中的竞争力"],
                  value: [],
                  ref: "hyjzl"
                },
                {
                  label: ["5.公司的市场占有率"],
                  value: [],
                  ref: "sczyl"
                },
                {
                  label: ["6.公司近三年的市场增长率"],
                  value: [],
                  ref: "sczzl"
                },
                {
                  label: ["7.公司近三年客户增长率"],
                  value: [],
                  ref: "khzzl"
                },
                {
                  label: ["8.市场竞争程度"],
                  value: [],
                  ref: "scjzcd"
                },
                {
                  label: ["9.产品是否已经进入市场"],
                  value: [],
                  ref: "jrsc"
                },
                {
                  label: ["10.市场推广方式"],
                  value: [],
                  ref: "sctgfs"
                },
                {
                  label: ["11.同类竞品数量"],
                  value: [],
                  ref: "tljpsl"
                }
              ]
            },
            {
              subTitle: "团队",
              content: [
                {
                  label: ["1、公司中高层管理者学历,本科及以上的占比"],
                  value: [],
                  ref: "glcxlbk"
                },
                {
                  label: ["2.公司核心团队是否有创业经历"],
                  value: [],
                  ref: "cyjl"
                },
                {
                  label: ["3.核心团队是否有领军企业背景"],
                  value: [],
                  ref: "ljqybj"
                },
                {
                  label: ["4.公司管理层持有股权比例"],
                  value: [],
                  ref: "cygfbl"
                },
                {
                  label: ["5.领导人的筹资能力"],
                  value: [],
                  ref: "cznl"
                },
                {
                  label: [
                    "6.领导人的综合领导能力 （包括执行力、创造力、大局观以及承受失败和压力的能力）"
                  ],
                  value: [],
                  ref: "zhldnl"
                }
              ]
            },
            {
              subTitle: "技术竞争力",
              content: [
                {
                  label: [
                    "1.企业拥有的专利、软件著作权、集成电路布图设计专有权、植物新品种等核心自主知识产权的数量（不含商标)"
                  ],
                  value: [],
                  ref: "zl"
                },
                {
                  label: ["2.核心团队的研究能力"],
                  value: [],
                  ref: "yjnl"
                },
                {
                  label: ["3.新产品开发速度"],
                  value: [],
                  ref: "xcpkfsd"
                },
                {
                  label: ["4.研究开发团队的平均从业时间"],
                  value: [],
                  ref: "pjcysj"
                }
              ]
            },
            {
              subTitle: "风险指标",
              content: [
                {
                  label: [
                    "1.公司是否存在关联交易，如有关联交易，请选择占总收入的比重"
                  ],
                  value: [],
                  ref: "gljy"
                },
                {
                  label: ["2.公司是否设立内控和（或）内审部门"],
                  value: [],
                  ref: "nkns"
                },
                {
                  label: ["3.公司是否受过监管机构处罚"],
                  value: [],
                  ref: "cf"
                }
              ]
            },
            {
              subTitle: "财务指标",
              content: [
                {
                  label: [
                    "1.毛利率 = (主营业务收入-主营业务成本）/主营业务收入"
                  ],
                  value: [],
                  ref: "mlv"
                },
                {
                  label: ["2.净利润率 = 净利润/主营业务收入"],
                  value: [],
                  ref: "jmlv"
                },
                {
                  label: ["3.盈余现金保障倍数＝经营现金净流入/净利润"],
                  value: [],
                  ref: "yyxjbzbs"
                },
                {
                  label: [
                    "4.主营业务收入增长率 = （本年主营业务收入 – 上年主营业务收入）/上年主营业务收入"
                  ],
                  value: [],
                  ref: "ywsrzzl"
                },
                {
                  label: ["5.应收帐款周转率=主营业务收入/平均应收帐款"],
                  value: [],
                  ref: "yszkzzl"
                },
                {
                  label: ["6.流动比率 = 流动资产/流动负债"],
                  value: [],
                  ref: "ldbl"
                },
                {
                  label: ["7.资产负债率 = 负债总额/资产总额"],
                  value: [],
                  ref: "zzfzl"
                }
              ]
            }
          ]
        },
        {
          title: "企业财务指标",
          content: [
            {
              subTitle: "财务指标(元)",
              content: [
                {
                  label: ["2015年", "2016年", "2017年"],
                  value: []
                }
              ]
            },
            {
              subTitle: "1.收入",
              content: [
                {
                  label: [],
                  value: [],
                  ref: "sr"
                }
              ]
            },
            {
              subTitle: "2.成本",
              content: [
                {
                  label: [],
                  value: [],
                  ref: "cb"
                }
              ]
            },
            {
              subTitle: "3.净利润",
              content: [
                {
                  label: [],
                  value: [],
                  ref: "jlr"
                }
              ]
            },
            {
              subTitle: "4.财务费用",
              content: [
                {
                  label: [],
                  value: [],
                  ref: "cwfy"
                }
              ]
            },
            {
              subTitle: "5.管理费用",
              content: [
                {
                  label: [],
                  value: [],
                  ref: "glfy"
                }
              ]
            },
            {
              subTitle: "6.销售费用",
              content: [
                {
                  label: [],
                  value: [],
                  ref: "xsfy"
                }
              ]
            },
            {
              subTitle: "7.总资产",
              content: [
                {
                  label: [],
                  value: [],
                  ref: "zzc"
                }
              ]
            },
            {
              subTitle: "8.总负债",
              content: [
                {
                  label: [],
                  value: [],
                  ref: "zfz"
                }
              ]
            },
            {
              subTitle: "9.货币资金",
              content: [
                {
                  label: [],
                  value: [],
                  ref: "hbzj"
                }
              ]
            },
            {
              subTitle: "10.应收账款",
              content: [
                {
                  label: [],
                  value: [],
                  ref: "yszk"
                }
              ]
            },
            {
              subTitle: "11.存货",
              content: [
                {
                  label: [],
                  value: [],
                  ref: "ch"
                }
              ]
            },
            {
              subTitle: "12.流动资产",
              content: [
                {
                  label: [],
                  value: [],
                  ref: "ldzc"
                }
              ]
            },
            {
              subTitle: "13.流动负债",
              content: [
                {
                  label: [],
                  value: [],
                  ref: "ldfz"
                }
              ]
            },
            {
              subTitle: "14.所得税",
              content: [
                {
                  label: [],
                  value: [],
                  ref: "sds"
                }
              ]
            }
          ]
        }
      ],
      totalData: {}, //后台获取的总数据
      isHasCWZB: true, //是否显示财务指标
      fullscreenLoading: true
    };
  },
  components: {
    myFooter
  },
  mounted() {
    this.$https
      .get(`/report/reportForm/${this.$store.state.formID}`)
      .then(res => {
        this.fullscreenLoading = false;
        this.totalData = res.data;
        this.$emit("getCompanyName", {
          name: this.totalData.qyxx.qync,
          type: this.totalData.type
        });
        if (this.totalData.cwzb) {
          this.pageTotalData[2].content.forEach((item, index) => {
            if (index != 0) {
              this.totalData.cwzb.forEach(el => {
                item.content[0].value.push(el[item.content[0].ref]);
              });
            }
          });
        } else {
          this.isHasCWZB = false;
        }
        this.pageTotalData[0].content[0].content.forEach(item => {
          item.value.push(this.totalData.qyxx[item.ref]);
        });
        this.pageTotalData[1].content.forEach(item => {
          item.content.forEach(item => {
            item.value.push(this.totalData.rxzb[item.ref]);
          });
        });
      });
  }
};
</script>
<style lang='less' scoped>
@import url(../assets/css/component/companyInfo.less);
</style>