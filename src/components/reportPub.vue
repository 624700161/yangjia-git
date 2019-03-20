<template>
  <div class="outer-box" v-loading.fullscreen.lock="fullscreenLoading">
    <!-- tips && intro -->
    <section class="m_b20">
      <!-- tips -->
      <div class="m_b20">
        <p class="font_size14 color_99 tips" v-for="(item,index) in tips" :key="index">{{item}}</p>
      </div>
      <!-- intro -->
      <div class="box-shadow">
        <ul class="intro-ul">
          <li v-for="(item,index) in intro" :key="index" class="m_b20 intro-item">
            <span class="color_99">{{item.label}}</span>
            <span class="color_2B">{{item.value}}</span>
          </li>
        </ul>
      </div>
    </section>
    <!-- content -->
    <section v-for="(item,index) in pageTotalData" :key="index">
      <p class="content-title color_F0 font_size16">{{item.title}}</p>
      <div
        v-for="(element,key) in item.content"
        :key="key"
        class="box-shadow content-outer-box m_b20"
      >
        <div v-if="element.type == 'text'">
          <p class="my_text_center m_b10">
            <span
              class="font_size14 color_F0 letter-space"
              :class="index != 1 && 'subTitle-bg'"
            >{{element.subTitle}}</span>
          </p>
          <ul>
            <li
              v-for="(elem,i) in element.subContent"
              :key="i"
              class="subContent-item"
              :class="(index == 2 && i!= 0) && 'result-subContent-item'"
            >
              <span class="color_99" :class="index == 2 && 'result-label'">{{elem.label}}</span>
              <span
                class="color_2B"
                :class="(index == 2 && i == 0) && 'result-value'"
              >{{elem.value}}</span>
            </li>
          </ul>
        </div>
        <div v-if="element.type == 'pic'">
          <p class="my_text_center m_b10">
            <span class="subTitle-bg font_size14 color_FF">{{element.subTitle}}</span>
          </p>
          <div class="flex flex-pack-justify">
            <ul>
              <li
                v-for="(el,j) in element.subContent.resultArr"
                :key="j"
                class="subContent-item color_2B"
              >{{el}}</li>
            </ul>
            <div>
              <div class="right-pic flex flex-v flex-end">
                <span class="percent-color" :style="{height:(element.subContent.percent-3)+'%'}"></span>
              </div>
              <p class="color_99 pic-intro my_text_center">
                {{element.subTitle}}指数
                <br>
                <span class="color_F0 my_text_center">{{`${element.subContent.percent}%`}}</span>
              </p>
            </div>
          </div>
        </div>
        <div v-if="element.type == 'pie'" style="width:315px;">
          <p class="my_text_center m_b10">
            <span
              class="font_size14 color_F0 letter-space"
              :class="index != 1 && 'subTitle-bg'"
            >{{element.subTitle}}</span>
          </p>
          <div id="holder" style="width:315px;height:270px;"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
var echarts = require("echarts/lib/echarts");
// 引入柱状图、线型图、饼图
require("echarts/lib/chart/pie");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  data() {
    return {
      tips: [
        "免责声明：此报告可作为估值参考，不代表平台最终意见。",
        "注：估值基准日：按照企业会计年报作为基准，也就是按照每年年报12月31日作为基准日",
        "估值报告日：此估值报告出具的日期"
      ],
      intro: [
        {
          label: "估值结果：",
          value: ""
        },
        {
          label: "估值企业：",
          value: ""
        },
        {
          label: "估值时间：",
          value: ""
        },
        {
          label: "估值报告日：",
          value: ""
        }
      ],
      pageTotalData: [
        {
          title: "企业简介",
          content: [
            {
              subTitle: "概述",
              type: "text",
              subContent: [
                {
                  label: "企业名称：",
                  value: "",
                  ref: "name"
                },
                {
                  label: "邮箱：",
                  value: "",
                  ref: "email"
                },
                {
                  label: "估值基准日：",
                  value: "",
                  ref: "baseDate"
                },
                {
                  label: "估值报告日：",
                  value: "",
                  ref: "create_date"
                },
                {
                  label: "概述：",
                  value:
                    "企业简介展示了该企业的主要特点。该简介使用的目的是使报告使用者迅速了解公司质量，并根据相同的五大类标准在不同的项目之间进行比较"
                }
              ]
            },
            {
              subTitle: "企业竞争力",
              type: "pic",
              subContent: {
                resultArr: [],
                percent: 0,
                ref: "company"
              }
            },
            {
              subTitle: "财务信息",
              type: "pic",
              subContent: {
                resultArr: [],
                percent: 0,
                ref: "finance"
              }
            },
            {
              subTitle: "风险",
              type: "pic",
              subContent: {
                resultArr: [],
                percent: 0,
                ref: "risk"
              }
            },
            {
              subTitle: "团队",
              type: "pic",
              subContent: {
                resultArr: [],
                percent: 0,
                ref: "team"
              }
            },
            {
              subTitle: "技术竞争力",
              type: "pic",
              subContent: {
                resultArr: [],
                percent: 0,
                ref: "technology"
              }
            }
          ]
        },
        {
          title: "企业信息",
          content: [
            {
              subTitle: "基本信息",
              type: "text",
              subContent: [
                {
                  label: "成立日期：",
                  value: "",
                  ref: "date"
                },
                {
                  label: "所在地区：",
                  value: "",
                  ref: "area"
                },
                {
                  label: "所处行业：",
                  value: "",
                  ref: "industry"
                }
              ]
            },
            {
              subTitle: "发展情况",
              type: "text",
              subContent: [
                {
                  label: "所属周期：",
                  value: "",
                  ref: "stageText"
                },
                {
                  label: "产品推广：",
                  value: "",
                  ref: "isToMarket"
                },
                {
                  label: "盈亏情况：",
                  value: "",
                  ref: "profit"
                }
              ]
            },
            {
              subTitle: "融资情况",
              type: "text",
              subContent: [
                {
                  label: "融资额度：",
                  value: "",
                  ref: "finance"
                },
                {
                  label: "出让股权：",
                  value: "",
                  ref: "ratio"
                }
              ]
            },
            {
              subTitle: "团队",
              type: "text",
              subContent: [
                {
                  label: "团队：",
                  value: "",
                  ref: "tuandui"
                }
              ]
            },
            {
              subTitle: "从业经验",
              type: "text",
              subContent: [
                {
                  label: "从业经验：",
                  value: "18年",
                  ref: ""
                },
                {
                  label: "创业经验：",
                  value: "",
                  ref: "experience"
                },
                {
                  label: "创始人学历：",
                  value: "",
                  ref: "founder"
                }
              ]
            },
            {
              subTitle: "股权结构",
              type: "pie",
              subContent: []
            },
            {
              subTitle: "主营业务",
              type: "text",
              subContent: [
                {
                  label: "",
                  value: "",
                  ref: "bussiness"
                }
              ]
            },
            {
              subTitle: "竞争力分析",
              type: "text",
              subContent: [
                {
                  label: "目标市场：",
                  value: "",
                  ref: "target"
                },
                {
                  label: "市场竞争程度：",
                  value: "",
                  ref: "rivalText"
                },
                {
                  label: "同类竞品：",
                  value: "",
                  ref: "rivalGoodText"
                },
                {
                  label: "市场推广方式：",
                  value: "",
                  ref: "spreadText"
                }
              ]
            }
          ]
        },
        {
          title: "估值结果",
          content: [
            {
              subTitle: "企业估值结果",
              type: "text",
              subContent: [
                {
                  label: "",
                  value: "",
                  ref: "result"
                },
                {
                  label: "企业竞争力",
                  value: "",
                  ref: "company"
                },
                {
                  label: "团队",
                  value: "",
                  ref: "team"
                },
                {
                  label: "技术竞争力",
                  value: "",
                  ref: "technology"
                },
                {
                  label: "风险指标",
                  value: "",
                  ref: "risk"
                },
                {
                  label: "财务指标",
                  value: "",
                  ref: "finance"
                }
              ]
            }
          ]
        }
      ],
      serveTotalData: {}, //从后台获取的总数居
      fullscreenLoading: true
    };
  },
  mounted() {
    if (this.$store.state.reportType) {
      this.getReport("/report/quickReport/");
    } else {
      this.getReport("/report/professionReport/");
    }
  },
  methods: {
    //获取报告数据
    getReport(url) {
      this.$https.get(`${url}${this.$store.state.reportID}`).then(res => {
        this.fullscreenLoading = false;
        this.serveTotalData = res.data.data;
        this.intro.forEach((item, index) => {
          switch (index) {
            case 0:
              item.value = `${this.numFilter(
                this.serveTotalData.result.min / 10000
              )}--${this.numFilter(
                this.serveTotalData.result.max / 10000
              )}万元`;
              break;
            case 1:
              item.value = this.serveTotalData.base.name;
              break;
            case 2:
              item.value = this.serveTotalData.base.baseDate;
              break;
            case 3:
              item.value = this.serveTotalData.base.create_date;
              break;
            default:
              break;
          }
        });
        this.pageTotalData[0].content.forEach((item, index) => {
          if (index == 0) {
            item.subContent.forEach(el => {
              if (el.ref) {
                el.value = this.serveTotalData.base[el.ref];
              }
            });
          } else {
            item.subContent.resultArr = this.serveTotalData.shortdescription[
              item.subContent.ref
            ];
            item.subContent.percent =
              this.serveTotalData.ratio[item.subContent.ref] * 20;
          }
        });
        this.pageTotalData[1].content.forEach(item => {
          item.subContent.forEach((elem, index) => {
            if (elem.ref == "tuandui") {
              if (
                (this.serveTotalData.base.isCoreFullTime == "是") &
                (this.serveTotalData.base.istechFullTime == "是")
              ) {
                elem.value = `核心人员${
                  this.serveTotalData.base.corePerson
                }人，技术人员${
                  this.serveTotalData.base.techPerson
                }人，均为全职人员`;
              } else if (
                (this.serveTotalData.base.isCoreFullTime == "是") &
                (this.serveTotalData.base.istechFullTime != "是")
              ) {
                elem.value = `核心人员${
                  this.serveTotalData.base.corePerson
                }人，为全职人员；技术人员${
                  this.serveTotalData.base.techPerson
                }人，为非全职人员`;
              } else if (
                (this.serveTotalData.base.isCoreFullTime != "是") &
                (this.serveTotalData.base.istechFullTime == "是")
              ) {
                elem.value = `核心人员${
                  this.serveTotalData.base.corePerson
                }人，为非全职人员；技术人员${
                  this.serveTotalData.base.techPerson
                }人，为全职人员`;
              } else {
                elem.value = `核心人员${
                  this.serveTotalData.base.corePerson
                }人，技术人员${
                  this.serveTotalData.base.techPerson
                }人，均为非全职人员`;
              }
            } else if (elem.ref) {
              elem.value = this.serveTotalData.base[elem.ref];
            }
          });
        });
        this.pageTotalData[2].content[0].subContent.forEach(item => {
          if (item.ref == "result") {
            item.value = `${this.numFilter(
              this.serveTotalData.result.min / 10000
            )}--${this.numFilter(this.serveTotalData.result.max / 10000)}万元`;
          } else {
            item.value = this.serveTotalData.description[
              item.ref
            ].description_en;
          }
        });
        this.holderChart();
      });
    },
    //绘制饼图
    holderChart() {
      var myChart = echarts.init(document.getElementById("holder"));
      var nameContent = [
        "第一股东",
        "第二股东",
        "第三股东",
        "第四股东",
        "其他股东"
      ];
      var colorContent = [
        "#ffb100",
        "#fc9003",
        "#D77A00",
        "#C06C00",
        "#A75E00"
      ];
      var dataContent = [];
      var valueArr = this.serveTotalData.base.holder.split(",");
      valueArr.forEach((item, index) => {
        if (item > 0) {
          dataContent.push({
            value: item,
            name: nameContent[index],
            itemStyle: { color: colorContent[index] }
          });
        }
      });
      var option = {
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "45%",
            center: ["50%", "50%"],
            label: {
              formatter: "{b}: {d}%"
            },
            data: dataContent
          }
        ]
      };
      myChart.setOption(option);
    },
    numFilter(value) {
      // 截取当前数据到小数点后0位
      value = Number(value).toFixed(0);
      if (!value) return "0";

      /*原来用的是Number(value).toFixed(0)，这样取整时有问题，例如0.51取整之后为1，感谢Nils指正*/
      var intPart = Number(value) | 0; //获取整数部分
      var intPartFormat = intPart
        .toString()
        .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"); //将整数部分逢三一断

      return intPartFormat;
    }
  }
};
</script>
<style lang='less' scoped>
@import url(../assets/css/component/reportPub.less);
</style>