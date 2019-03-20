<template>
  <div class="outer-box">
    <!-- content -->
    <section v-for="(item,index) in pageTotalData" :key="index">
      <div class="box-shadow content-outer-box m_b20">
        <p class="my_text_center m_b10">
          <span class="font_size14 color_F0 letter-space subTitle-bg">{{item.subTitle}}</span>
        </p>
        <p
          class="font_size24 color_F0 my_text_center m_b10"
          v-if="item.resultCount"
        >综合评分：{{item.resultCount}}分</p>
        <p class="color_99">{{item.tips}}</p>
        <div v-for="(el,i) in item.subContent" :key="i" class="my_text_center">
          <span class="color_F0 font_size14">{{el.label}}</span>
          <div :id="el.type+''+el.ref" :style="'height:'+el.height+'px'"></div>
          <div class="flex flex-v flex-align-center box-shadow indicator-box" v-if="el.percent">
            <img
              :src="'/static/components/'+(el.percent>=40&&el.percent<=60?'60':el.percent)+'@.png'"
              alt
              class="percent-icon"
            >
            <span
              class="font_size22"
              :style="'color:'+indicatorTextColor[el.percent]"
            >{{el.percent}}%</span>
            <span>指标健康度</span>
          </div>
          <p class="item-intro">{{el.intro}}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
var echarts = require("echarts/lib/echarts");
// 引入柱状图、线型图、饼图
require("echarts/lib/chart/bar");
require("echarts/lib/chart/line");
require("echarts/lib/chart/pie");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  data() {
    return {
      pageTotalData: [
        {
          subTitle: "营业收入预测",
          tips:
            "说明：根据企业提供的历史财务数据,结合国际通用的财务预测逻辑及规则,对企业未来五年营业收入、净利润进行预测",
          subContent: [
            {
              type: "line",
              value: [],
              lineColor: "#2d96ff",
              ref: "income",
              height: 350
            }
          ]
        },
        {
          subTitle: "净利润预测",
          tips:
            "说明：根据企业提供的历史财务数据,结合国际通用的财务预测逻辑及规则,对企业未来五年营业收入、净利润进行预测",
          subContent: [
            {
              type: "line",
              value: [],
              lineColor: "#ffb401",
              ref: "profit",
              height: 350
            }
          ]
        },
        {
          subTitle: "估值分析",
          subContent: [
            {
              label: "适用的估值方法",
              type: "bar",
              value: [],
              barColor: ["#2d96ff"],
              ref: "method",
              height: 350
            },
            {
              label: "估值结果加权平均",
              type: "pieS",
              value: [],
              ref: "method",
              height: 220
            },
            {
              label: "说明",
              intro:
                "估值报告以国际通用的相对估值方法（P/E、P/B、P/S、EV/EBITDA）为原理，结合智估特有的估值方法进行补充及修复。其中相对估值方法所采用的估值指标均来源于证监会行业分类中所属行业上市公司指标，并对其进行加权平均得来，估值原理及其他资料详见附件。若运用相对估值法（P/E、P/B、P/S、EV/EBITDA）的估值结果存在负数或空值，则剔除估值指标。"
            }
          ]
        },
        {
          subTitle: "盈利能力比率",
          subContent: [
            {
              label: "净资产收益率(ROE)",
              type: "bar",
              value: [],
              percent: 0,
              intro: "",
              barColor: [
                "#FEAC01",
                "#45B0FF",
                "#45B0FF",
                "#45B0FF",
                "#45B0FF",
                "#FF9C9B"
              ],
              ref: "roe",
              height: 350
            },
            {
              label: "资产报酬率",
              type: "bar",
              value: [],
              percent: 0,
              intro: "",
              barColor: [
                "#FEAC01",
                "#45B0FF",
                "#45B0FF",
                "#45B0FF",
                "#45B0FF",
                "#FF9C9B"
              ],
              ref: "roa",
              height: 350
            },
            {
              label: "销售净利率",
              type: "bar",
              value: [],
              percent: 0,
              intro: "",
              barColor: [
                "#FEAC01",
                "#45B0FF",
                "#45B0FF",
                "#45B0FF",
                "#45B0FF",
                "#FF9C9B"
              ],
              ref: "netProfitMargin",
              height: 350
            },
            {
              label: "销售毛利率",
              type: "bar",
              value: [],
              percent: 0,
              intro: "",
              barColor: [
                "#FEAC01",
                "#45B0FF",
                "#45B0FF",
                "#45B0FF",
                "#45B0FF",
                "#FF9C9B"
              ],
              ref: "grossProfitRatio",
              height: 350
            },
            {
              label: "销售费用率",
              type: "bar",
              value: [],
              percent: 0,
              intro: "",
              barColor: [
                "#FEAC01",
                "#45B0FF",
                "#45B0FF",
                "#45B0FF",
                "#45B0FF",
                "#FF9C9B"
              ],
              ref: "sellingExpenses",
              height: 350
            }
          ]
        },
        {
          subTitle: "偿债能力比率",
          subContent: [
            {
              label: "流动比率",
              type: "bar",
              value: [],
              percent: 0,
              intro: "",
              barColor: [
                "#FEAC01",
                "#45B0FF",
                "#45B0FF",
                "#45B0FF",
                "#45B0FF",
                "#FF9C9B"
              ],
              ref: "currentRatio",
              height: 350
            },
            {
              label: "现金比率",
              type: "bar",
              value: [],
              percent: 0,
              intro: "",
              barColor: [
                "#FEAC01",
                "#45B0FF",
                "#45B0FF",
                "#45B0FF",
                "#45B0FF",
                "#FF9C9B"
              ],
              ref: "currencyRatio",
              height: 350
            },
            {
              label: "速动比率",
              type: "bar",
              value: [],
              percent: 0,
              intro: "",
              barColor: [
                "#FEAC01",
                "#45B0FF",
                "#45B0FF",
                "#45B0FF",
                "#45B0FF",
                "#FF9C9B"
              ],
              ref: "quickRatio",
              height: 350
            },
            {
              label: "产权比率",
              type: "bar",
              value: [],
              percent: 0,
              intro: "",
              barColor: [
                "#FEAC01",
                "#45B0FF",
                "#45B0FF",
                "#45B0FF",
                "#45B0FF",
                "#FF9C9B"
              ],
              ref: "equityRatio",
              height: 350
            }
          ]
        },
        {
          subTitle: "运营能力比率",
          subContent: [
            {
              label: "应收账款周转率",
              type: "bar",
              value: [],
              percent: 0,
              intro: "",
              barColor: [
                "#FEAC01",
                "#45B0FF",
                "#45B0FF",
                "#45B0FF",
                "#45B0FF",
                "#FF9C9B"
              ],
              ref: "receivablesTurnoverRatio",
              height: 350
            },
            {
              label: "流动资金周转率",
              type: "bar",
              value: [],
              percent: 0,
              intro: "",
              barColor: [
                "#FEAC01",
                "#45B0FF",
                "#45B0FF",
                "#45B0FF",
                "#45B0FF",
                "#FF9C9B"
              ],
              ref: "currentAssetsTurnover",
              height: 350
            },
            {
              label: "存货周转率",
              type: "bar",
              value: [],
              percent: 0,
              intro: "",
              barColor: [
                "#FEAC01",
                "#45B0FF",
                "#45B0FF",
                "#45B0FF",
                "#45B0FF",
                "#FF9C9B"
              ],
              ref: "inventoryTurnover",
              height: 350
            },
            {
              label: "营运资本周转率",
              type: "bar",
              value: [],
              percent: 0,
              intro: "",
              barColor: [
                "#FEAC01",
                "#45B0FF",
                "#45B0FF",
                "#45B0FF",
                "#45B0FF",
                "#FF9C9B"
              ],
              ref: "workingCapitalTurnoverRate",
              height: 350
            }
          ]
        },
        {
          subTitle: "企业财务状况体验报告",
          subContent: [
            {
              label: "盈利能力",
              type: "pie",
              value: "",
              intro: "",
              ref: "comprehensiveScore1",
              pieColor: "#34BE58",
              height: 140
            },
            {
              label: "偿债能力",
              type: "pie",
              value: "",
              intro: "",
              ref: "comprehensiveScore2",
              pieColor: "#FC9003",
              height: 140
            },
            {
              label: "营运能力",
              type: "pie",
              value: "",
              intro: "",
              ref: "comprehensiveScore3",
              pieColor: "#F17878",
              height: 140
            }
          ],
          resultCount: 0
        }
      ],
      indicatorTextColor: {
        "20": "#f17878",
        "40": "#ffb100",
        "60": "#ffb100",
        "80": "#39cfa0",
        "100": "#66d379"
      }
    };
  },
  mounted() {
    this.$https
      .get(`/report/professionReport/${this.$store.state.reportID}`)
      .then(res => {
        let serveTotalData = res.data.data.financialInfo;
        this.pageTotalData.forEach(item => {
          if (item.subTitle.includes("财务状况体验报告")) {
            item.resultCount = serveTotalData.comprehensiveScore.cpScore;
          }
          item.subContent.forEach((el, index) => {
            let id = `${el.type}${el.ref}`;
            switch (el.type) {
              case "line":
                el.value = serveTotalData[el.ref];
                this.lineCharts(id, el.value, el.lineColor);
                break;
              case "bar":
                if (el.label == "适用的估值方法") {
                  el.value = serveTotalData[el.ref].methodList;
                } else {
                  el.value = serveTotalData[el.ref].list;
                  el.percent = serveTotalData[el.ref].energy.index * 20;
                  el.intro = serveTotalData[el.ref].description;
                }
                this.barCharts(id, el.value, el.barColor);
                break;
              case "pie":
                el.value =
                  serveTotalData[el.ref.slice(0, 18)].list[index].score;
                el.intro =
                  serveTotalData[el.ref.slice(0, 18)].list[index].description;
                this.pieCharts(id, el.value, el.pieColor);
                break;
              case "pieS":
                el.value = serveTotalData[el.ref].methodPercentList;
                this.gzjgjqpjChart(id, el.value);
              default:
                break;
            }
          });
        });
      });
  },

  methods: {
    //绘制line
    lineCharts(id, lineData, colorData) {
      var myChart = echarts.init(document.getElementById(id));
      var dataX = [];
      var dataY = [];
      lineData.forEach(item => {
        dataX.push(item.index);
        dataY.push(item.value);
      });
      var option = {
        xAxis: {
          type: "category",
          data: dataX
        },
        yAxis: [
          {
            name: "万元",
            type: "value"
          }
        ],
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}万元"
        },
        series: [
          {
            data: dataY,
            type: "line",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            itemStyle: { color: colorData }
          }
        ]
      };
      myChart.setOption(option);
    },
    //绘制bar
    barCharts(id, barData, colorData) {
      var myChart = echarts.init(document.getElementById(id));
      var dataX = [];
      var dataY = [];
      barData.forEach((item, index) => {
        let XIndex = /心流/.test(item.index)
          ? item.index.replace("心流", "智估").substr(0,8).replace('法','')
          : item.index;
        dataX.push(XIndex);
        dataY.push({
          value: item.value,
          itemStyle: { color: colorData[index] }
        });
      });
      var option = {
        xAxis: {
          type: "category",
          data: dataX,
          axisLabel: {
            interval: 0, //横轴信息全部显示
            rotate: -40 //-30度角倾斜显示
          }
        },
        yAxis: {
          type: "value"
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}万元"
        },
        series: [
          {
            data: dataY,
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            }
          }
        ],
        barWidth: 30
      };
      myChart.setOption(option);
    },
    //绘制最后三个pie
    pieCharts(id, pieData, colorData) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById(id));
      var option = {
        series: [
          {
            type: "pie",
            radius: ["50%", "65%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: "center",
                textStyle: {
                  fontSize: "20",
                  fontWeight: "bold"
                }
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: "20",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: pieData,
                name: pieData + "%",
                itemStyle: { color: colorData }
              },
              {
                value: 100 - parseInt(pieData),
                name: "",
                itemStyle: { color: "#E2E6EA" }
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
    },
    //估值分析，估值结果加权平均
    gzjgjqpjChart(id, pieSData) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById(id));
      var datas = [];
      var colors = ["#FF605F", "#96d2fa", "#00254B", "#2D95FF"];
      for (var i = 0; i < pieSData.length; i++) {
        var d = {
          value: pieSData[i].value,
          name:
            pieSData[i].index.replace("心流", "智估").substr(0,8).replace('法','') +
            ": " +
            pieSData[i].value,
          itemStyle: { color: colors[i] }
        };
        datas.push(d);
      }
      var option = {
        series: [
          {
            type: "pie",
            radius: ["18%", "24%"],
            center: ["50%", "50%"],
            data: datas
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>
<style lang='less' scoped>
@import url(../assets/css/component/reportPub.less);
</style>