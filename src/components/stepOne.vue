<template>
  <div class="step-one-content" v-loading.fullscreen.lock="fullscreenLoading">
    <!-- content -->
    <section v-for="(item,myIndex) in pageTotalData" :key="myIndex">
      <!-- input -->
      <div class="flex flex-v m_b20 font_size14" v-if="item.type == 'text'" :ref="item.ref">
        <label :for="item.label" class="font_size14 color_2B label-style">
          {{item.label}}
          <span v-if="!(/第二|第三|第四|其他股东/.test(item.label))" class="color_D0">*</span>
          <span class="error-msg color_D0">{{item.errorTips}}</span>
        </label>
        <div class="outer-box">
          <input
            :type="item.keyType"
            :id="item.label"
            class="input-style border-DD font_size14"
            v-model="item.modelValue"
            @blur="blurFuc({value:item.modelValue, index:myIndex, reg:item.reg, label:item.label, num:item.num,keyType:item.keyType})"
            @focus="focusFuc(myIndex)"
            :placeholder="item.placeholder"
            autocomplete="off"
            @keydown="preventNotNumber($event,item.keyType)"
          >
          <span class="metering">{{item.metering}}</span>
        </div>
      </div>
      <!-- select -->
      <div class="flex flex-v m_b20" v-if="item.type == 'select'" :ref="item.ref">
        <label :for="item.label" class="font_size14 color_2B label-style">
          {{item.label}}
          <span class="color_D0">*</span>
          <span class="error-msg color_D0">{{item.errorTips}}</span>
        </label>
        <div class="outer-box" v-if="item.label !== '行业二级选择：'">
          <el-select
            v-model="item.modelValue"
            class="select-style"
            @blur="blurFuc({value:item.modelValue,index:myIndex})"
            @focus="focusFuc(myIndex)"
            @change="changeOneLevelTrade(item.modelValue,item.label)"
          >
            <el-option
              v-if="!isNSDK"
              v-for="(el,k) in item.children[0]"
              :key="k"
              :label="el"
              :value="el"
            ></el-option>
            <el-option
              v-if="isNSDK"
              v-for="(el,k) in item.children[1]"
              :key="k"
              :label="el"
              :value="el"
            ></el-option>
          </el-select>
        </div>
        <div class="outer-box" v-if="item.label == '行业二级选择：'">
          <el-select
            v-model="item.modelValue"
            class="select-style"
            @blur="blurFuc({value:item.modelValue,index:myIndex})"
            @focus="focusFuc(myIndex)"
          >
            <el-option v-for="(el,k) in twoLevelTradeContent" :key="k" :label="el" :value="el"></el-option>
          </el-select>
          <!-- <span class="error-msg color_D0">{{item.errorTips}}</span> -->
        </div>
      </div>
      <!-- textarea -->
      <div class="flex flex-v m_b20" v-if="item.type == 'textarea'" :ref="item.ref">
        <label :for="item.label" class="font_size14 color_2B label-style">
          {{item.label}}
          <span class="color_D0">*</span>
          <span class="error-msg color_D0">{{item.errorTips}}</span>
        </label>
        <div class="outer-box">
          <textarea
            class="border-DD textarea-style"
            cols="30"
            rows="3"
            v-model="item.modelValue"
            :placeholder="item.placeholder"
            @blur="blurFuc({value:item.modelValue,index:myIndex,label:item.label,num:item.num})"
            @focus="focusFuc(myIndex)"
          ></textarea>
        </div>
      </div>
      <!-- radio -->
      <div class="flex flex-v" v-if="item.type == 'radio'" :ref="item.ref">
        <label :for="item.label" class="font_size14 color_2B radio-label-style">
          {{item.label}}
          <span class="color_D0">*</span>
          <span class="error-msg color_D0">{{item.errorTips}}</span>
        </label>
        <div class="outer-box">
          <el-radio-group
            v-model="item.modelValue"
            class="radio-style flex"
            @change="blurFuc({value:item.modelValue,index:myIndex})"
            @focus="focusFuc(myIndex)"
          >
            <el-radio :label="el" v-for="(el,j) in item.children" :key="j" class="radio-item">{{el}}</el-radio>
          </el-radio-group>
        </div>
      </div>
      <!-- datePicker -->
      <div class="flex flex-v m_b20" v-if="item.type == 'datePicker'" :ref="item.ref">
        <label :for="item.label" class="font_size14 color_2B radio-label-style">
          {{item.label}}
          <span class="color_D0">*</span>
          <span class="error-msg color_D0">{{item.errorTips}}</span>
        </label>
        <div class="outer-box">
          <div class="block">
            <el-date-picker
              v-model="item.modelValue"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              :clearable="false"
              @blur="blurFuc({value:item.modelValue,index:myIndex})"
              @focus="focusFuc(myIndex)"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </div>
        </div>
      </div>
    </section>
    <!-- cancel/toNext -->
    <section class="cancel-tonext flex flex-align-center flex-pack-justify font_size16">
      <router-link to="/" class="public-btn my_text_center border-DD color_2B m_r30">取消</router-link>
      <span class="public-btn my_text_center bg_colorF0 color_FF" @click="valuationFuc">下一步</span>
    </section>
  </div>
</template>

<script>
import scrollToError from "@/common/scrollToError.js";
import { setStorage } from "@/common/utils";
export default {
  data() {
    return {
      //整个页面所有渲染的数据
      pageTotalData: [
        {
          type: "text",
          label: "企业统一社会信用代码：",
          errorTips: "",
          ref: "qyid",
          modelValue: "",
          reg: [/^[A-Z0-9]*$/], //数字和大小字母
          num: 18,
          placeholder: "",
          keyType: "text"
        },
        {
          type: "text",
          label: "企业名称：",
          errorTips: "",
          ref: "qync",
          modelValue: "",
          reg: [
            /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
            /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im,
            /[0-9]/
          ], //特殊字符
          num: 100,
          keyType: "text"
        },
        {
          type: "text",
          label: "邮箱：",
          errorTips: "",
          ref: "yx",
          modelValue: "",
          reg: [/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/],
          keyType: "text"
        },
        {
          type: "datePicker",
          label: "企业成立日期：",
          errorTips: "",
          ref: "qyclrq",
          modelValue: "",
          reg: "test"
        },
        {
          type: "select",
          label: "所在地区：",
          errorTips: "",
          children: [
            [
              "北京",
              "天津",
              "河北",
              "山西",
              "内蒙古",
              "辽宁",
              "吉林",
              "黑龙江",
              "上海",
              "江苏",
              "浙江",
              "安徽",
              "福建",
              "江西",
              "山东",
              "河南",
              "湖北",
              "湖南",
              "广东",
              "广西",
              "海南",
              "重庆",
              "四川",
              "贵州",
              "云南",
              "西藏",
              "陕西",
              "甘肃",
              "青海",
              "宁夏",
              "新疆",
              "台湾",
              "香港",
              "澳门"
            ]
          ],
          ref: "szdq",
          modelValue: ""
        },
        {
          type: "select",
          label: "目标市场：",
          errorTips: "",
          children: [
            ["全球", "全国", "西南", "中部", "东部", "北部", "南部", "重庆"]
          ],
          ref: "mbsc",
          modelValue: ""
        },
        {
          type: "textarea",
          label: "企业主营业务概述：",
          errorTips: "",
          ref: "gszyywgs",
          modelValue: "",
          num: 50,
          placeholder: "50字以内"
        },
        {
          type: "radio",
          label: "产品是否已推向市场：",
          errorTips: "",
          children: ["已推广到市场", "未推广到市场"],
          ref: "txsc",
          modelValue: ""
        },
        {
          type: "radio",
          label: "市场竞争程度：",
          errorTips: "",
          children: ["完全竞争", "垄断竞争", "寡头垄断", "完全垄断"],
          ref: "jzcd",
          modelValue: ""
        },
        {
          type: "radio",
          label: "最近一年公司盈利情况：",
          errorTips: "",
          children: ["盈利", "持平", "亏损"],
          ref: "yl",
          modelValue: ""
        },
        {
          type: "radio",
          label: "创始人学历：",
          errorTips: "",
          children: ["大专", "本科", "研究生", "博士", "博士后"],
          ref: "xl",
          modelValue: ""
        },
        {
          type: "text",
          label: "管理团队在此行业从业的时间：",
          errorTips: "",
          metering: "年",
          ref: "cysj",
          modelValue: "",
          reg: [/(^[1-9]\d*$)/],
          num: 100,
          placeholder: "请输入不大于100的整数",
          keyType: "number"
        },
        {
          type: "radio",
          label: "创业经验：",
          errorTips: "",
          children: ["有", "无，第一次创业"],
          ref: "cyjy",
          modelValue: ""
        },
        {
          type: "text",
          label: "团队核心创始人人数：",
          errorTips: "",
          metering: "人",
          ref: "csry",
          modelValue: "",
          reg: [/(^[1-9]\d*$)/],
          num: 100,
          keyType: "number"
        },
        {
          type: "radio",
          label: "是否为全职员工：",
          errorTips: "",
          children: ["是", "否"],
          ref: "cssfqz",
          modelValue: ""
        },
        {
          type: "text",
          label: "核心技术人员人数：",
          errorTips: "",
          metering: "人",
          ref: "hxrs",
          modelValue: "",
          reg: [/(^[1-9]\d*$)/], //正整数
          num: 100,
          keyType: "number"
        },
        {
          type: "radio",
          label: "是否为全职员工：",
          errorTips: "",
          children: ["是", "否"],
          ref: "jssfqz",
          modelValue: ""
        },
        {
          type: "text",
          label: "融资额度：",
          errorTips: "",
          metering: "万元",
          ref: "jsrs",
          modelValue: "",
          reg: [/^\d+(\.\d{1,2})?$/], //是否为两位小数
          num: 1000000,
          placeholder: "如是小数，只填写两位",
          keyType: "number"
        },
        {
          type: "text",
          label: "出让股权比例：",
          errorTips: "",
          metering: "%",
          ref: "rzed",
          modelValue: "",
          reg: [/^\d+(\.\d{1,2})?$/], //是否为两位小数
          num: 100,
          placeholder: "如是小数，只填写两位",
          keyType: "number"
        },
        {
          type: "radio",
          label: "拟上市地点：",
          errorTips: "",
          children: ["上交所", "深交所", "港交所", "新三板", "境外", "其他"],
          ref: "nssdz",
          modelValue: ""
        },
        {
          type: "select",
          label: "行业选择：",
          errorTips: "",
          children: [
            [
              "交通运输、仓储和邮政业",
              "居民服务、修理和其他服务业",
              "卫生和社会工作业",
              "科学研究和技术服务业",
              "住宿和餐饮业",
              "教育",
              "建筑业",
              "文化、体育和娱乐业",
              "房地产业",
              "综合",
              "金融业",
              "制造业",
              "租赁和商务服务业",
              "电力、热力、燃气及水的生产和供应业",
              "信息传输、软件和信息技术服务业",
              "批发和零售业",
              "采矿业",
              "水利、环境和公共设施管理业",
              "农、林、牧、渔业"
            ],
            [
              "能源",
              "原材料",
              "工业",
              "非日常生活消费品",
              "日常生活消费品",
              "医疗保健",
              "金融",
              "信息技术",
              "电信业务",
              "公用业务",
              "房地产"
            ]
          ],
          ref: "hyxz",
          modelValue: ""
        },
        {
          type: "select",
          label: "行业二级选择：",
          errorTips: "",
          children: [
            [
              [
                "铁路运输业",
                "道路运输业",
                "水上运输业",
                "航空运输业",
                "管道运输业",
                "装卸搬运和其他运输代理业",
                "仓储业",
                "邮政业"
              ],
              ["居民服务业", "机动车、电子产品和日用产品修理业", "其它服务业"],
              ["卫生", "社会工作"],
              ["研究和试验发展", "专业技术服务业", "科技推广和应用服务业"],
              ["住宿业", "餐饮业"],
              ["学前教育", "技能培训、教育辅助及其他教育"],
              [
                "房屋建筑业",
                "土木工程建筑业",
                "建筑安装业",
                "建筑装饰和其他建筑业"
              ],
              [
                "文化、体育和娱乐业",
                "新闻和出版业",
                "广播、电视、电影和影视录音制作业",
                "文化艺术业",
                "体育",
                "娱乐业"
              ],
              [
                "房地产开发与经营",
                "物业管理",
                "房地产中介服务",
                "自有房地产经营服务",
                "其他房地产业"
              ],
              ["综合"],
              ["货币金融服务", "资本市场服务", "保险业", "其他金融业"],
              [
                "农副食品加工业",
                "食品制造业",
                "酒、饮料和精制茶制造业",
                "烟草制品业",
                "纺织业",
                "纺织服装、服饰业",
                "皮革、毛皮、羽毛及其制品和制鞋业",
                "木材加工和木、竹、藤、棕、草制品业",
                "家具制造业",
                "造纸和纸制品业",
                "印刷和记录媒介复制业",
                "文教、工美、体育和娱乐用品制造业",
                "石油加工、炼焦和核燃料加工业",
                "化学原料和化学制品制造业",
                "医药制造业",
                "化学纤维制造业",
                "橡胶和塑料制品业",
                "非金属矿物制品业",
                "黑色金属冶炼和压延加工业",
                "有色金属冶炼和压延加工业",
                "金属制品业",
                "通用设备制造业",
                "专用设备制造业",
                "汽车制造业",
                "铁路、船舶、航空航天和其它运输设备制造业",
                "电气机械及器材制造业",
                "计算机、通信和其他电子设备制造业",
                "仪器仪表制造业,",
                "其他制造业",
                "废弃资源综合利用业",
                "金属制品、机械和设备修理业"
              ],
              ["租赁业", "商务服务业"],
              [
                "电力、热力生产和供应业",
                "燃气生产和供应业",
                "水的生产和供应业"
              ],
              [
                "电信、广播电视和卫星传输服务",
                "互联网和相关服务",
                "软件和信息技术服务业"
              ],
              ["批发业", "零售业"],
              [
                "煤炭开采和洗选业",
                "石油和天然气开采业",
                "黑色金属矿采选业",
                "有色金属矿采选业",
                "非金属矿采选业",
                "开采辅助活动",
                "其他采矿业"
              ],
              ["水利管理业", "生态保护和环境治理业", "公共设施管理业"],
              ["农业", "林业", "畜牧业", "渔业", "农、林、牧、渔服务业"]
            ],
            [
              ["能源Ⅱ"],
              ["原材料Ⅱ"],
              ["资本品", "商业和专业服务", "运输"],
              [
                "汽车与汽车零部件",
                "耐用消费品与服装",
                "消费者服务",
                "媒体",
                "零售业"
              ],
              ["食品与主要用品零售", "食品、饮料与烟草", "家庭与个人用品"],
              ["医疗保健设备与服务", "制药、生物科技与生命科学"],
              ["银行", "综合金融", "保险"],
              ["软件与服务", "技术硬件与设备", "半导体产品与设备"],
              ["电信业务Ⅱ"],
              ["公用事业Ⅱ"],
              ["房地产Ⅱ"]
            ]
          ],
          ref: "ejxz",
          modelValue: ""
        },
        {
          type: "text",
          label: "公司营业收入：",
          errorTips: "",
          metering: "万元",
          ref: "gsyysr",
          modelValue: "",
          reg: [/^\d+(\.\d{1,2})?$/], //是否为两位小数
          placeholder: "如是小数，只填写两位",
          keyType: "number",
          num: 100000000,
        },
        {
          type: "text",
          label: "公司净资产：",
          errorTips: "",
          metering: "万元",
          ref: "gsjzc",
          modelValue: "",
          reg: [/^\d+(\.\d{1,2})?$/], //是否为两位小数
          keyType: "number",
          num: 100000000,
        },
        {
          type: "text",
          label: "未来12个月净利润：",
          errorTips: "",
          metering: "万元",
          ref: "yearjlr",
          modelValue: "",
          reg: [/^\d+(\.\d{1,2})?$/], //是否为两位小数
          keyType: "number",
          num: 100000000,
        },
        {
          type: "text",
          label: "息税折旧摊销前利润：",
          errorTips: "",
          metering: "万元",
          ref: "qlr",
          modelValue: "",
          reg: [/^\d+(\.\d{1,2})?$/], //是否为两位小数
          keyType: "number",
          num: 100000000,
        },
        {
          type: "text",
          label: "第一股东持股比例：",
          errorTips: "",
          metering: "%",
          ref: "diyi",
          modelValue: "",
          reg: [/^\d+(\.\d{1,2})?$/], //是否为两位小数
          placeholder: "股东持股比例总和须为100%",
          keyType: "number"
        },
        {
          type: "text",
          label: "第二股东持股比例：",
          errorTips: "",
          metering: "%",
          ref: "dier",
          modelValue: "",
          reg: [/^\d+(\.\d{1,2})?$/], //是否为两位小数
          keyType: "number"
        },
        {
          type: "text",
          label: "第三股东持股比例：",
          errorTips: "",
          metering: "%",
          ref: "disan",
          modelValue: "",
          reg: [/^\d+(\.\d{1,2})?$/], //是否为两位小数
          keyType: "number"
        },
        {
          type: "text",
          label: "第四股东持股比例：",
          errorTips: "",
          metering: "%",
          ref: "disi",
          modelValue: "",
          reg: [/^\d+(\.\d{1,2})?$/], //是否为两位小数
          keyType: "number"
        },
        {
          type: "text",
          label: "其他股东持股比例：",
          errorTips: "",
          metering: "%",
          ref: "qita",
          modelValue: "",
          reg: [/^\d+(\.\d{1,2})?$/], //是否为两位小数
          keyType: "number"
        },
        {
          type: "text",
          label: "填表人姓名：",
          errorTips: "",
          ref: "tbrmc",
          modelValue: "",
          reg: [
            /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
            /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im
          ], //特殊字符
          num: 50,
          keyType: "text"
        },
        {
          type: "text",
          label: "填表人联系方式：",
          errorTips: "",
          ref: "tbrlxdh",
          modelValue: "",
          reg: [
            /^([0-9]{3,4}-)?[0-9]{7,8}$/,
            /^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|17[012356789][0-9]{8}|19[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/
          ], //电话号码
          keyType: "tel"
        }
      ],
      // 传给后台的字段信息
      qyxx: {
        qync: "", //企业名称
        qyid: "", //社会信用代码
        yx: "", //邮箱
        qyclrq: "", //企业成立日期
        szdq: "", //所在地区
        mbsc: "", //目标市场
        gszyywgs: "", //企业主营业务
        txsc: "", //产品是否已经推向市场
        jzcd: "", //竞争程度
        yl: "", //最近一年盈利
        xl: "", //创始人学历
        cysj: "", //管理团队从业时间
        cyjy: "", //创业经验
        csry: "", //创始人人数
        cssfqz: "", //创始人是否全职
        hxrs: "", //核心技术人数
        jssfqz: "", //核心技术人员是否全职
        jsrs: "", //融资额度
        rzed: "", //出让股权比例
        nssdz: "", //拟上市地点
        hyxz: "", //一级行业
        ejxz: "", //二级行业
        gsyysr: "", //营业收入
        gsjzc: "", //净资产
        yearjlr: "", //未来12月利润
        qlr: "", //摊销前利润
        diyi: "", //第一股东
        dier: "", //第二股东
        disan: "", //第三股东
        disi: "", //第四股东
        qita: "", //其他股东
        tbrmc: "", //联系人姓名
        tbrlxdh: "" //联系人电话
      },
      //日期选择器配置
      pickerOptions: {
        disabledDate(time) {
          // 86400000是一天的毫秒数
          return time && time.valueOf() > Date.now() - 86400000;
        }
      },
      isNSDK: false, //是否选择了境外上市
      twoLevelTradeContent: [], //二级行业暂存
      fullscreenLoading: false, //loading
      formID:
        this.formType == "fast"
          ? this.$store.state.fastStepOneID
          : this.$store.state.professionStepOneID, //获取表单ID
      totalDataByID: null //根据id返回的表单总数居
    };
  },
  props: {
    formType: {
      type: "",
      default: ""
    }
  },
  mounted() {
    if (this.formID) {
      this.$https.get(`/report/reportForm/${this.formID}`).then(res => {
        this.totalDataByID = res.data;
        this.pageTotalData.forEach(item => {
          item.modelValue = res.data.qyxx[item.ref]
            ? res.data.qyxx[item.ref]
            : 0;
          this.qyxx[item.ref] = res.data.qyxx[item.ref]
            ? res.data.qyxx[item.ref]
            : 0;
        });
      });
    }
  },
  methods: {
    //点击下一步校验
    valuationFuc() {
      let refsArr = []; //所有报错信息的ref
      let result =
        Number(this.pageTotalData[26].modelValue) +
        Number(this.pageTotalData[27].modelValue) +
        Number(this.pageTotalData[28].modelValue) +
        Number(this.pageTotalData[29].modelValue) +
        Number(this.pageTotalData[30].modelValue); //所有股东占比的总和
      this.pageTotalData.forEach((item, index, total) => {
        if (!item.modelValue && !/第二|第三|第四|其他股东/.test(item.label)) {
          item.errorTips = "该项为必填项";
          refsArr.push(item.ref);
        } else if (item.errorTips) {
          refsArr.push(item.ref);
        } else if (result != 100) {
          total[26].errorTips = "股东持股比例总和须为100%";
        } else {
          this.qyxx[item.ref] = item.modelValue ? item.modelValue : 0;
        }
      });
      if (refsArr.length) {
        this.$vux.toast.show({
          text: "提交出错！请根据表单中的红字提示完善信息！"
        });
        scrollToError(this, refsArr);
      } else {
        this.fullscreenLoading = true;
        let arguData;
        if (this.formType == "fast") {
          arguData = this.formID
            ? { id: this.formID, type: "快速", qyxx: this.qyxx }
            : { type: "快速", qyxx: this.qyxx };
        } else {
          if (this.formID) {
            if (this.totalDataByID && this.totalDataByID.rxzb) {
              arguData = {
                id: this.formID,
                type: "专业",
                qyxx: this.qyxx,
                rxzb: this.totalDataByID.rxzb
              };
            } else {
              arguData = { id: this.formID, type: "专业", qyxx: this.qyxx };
            }
          } else {
            if (this.totalDataByID && this.totalDataByID.rxzb) {
              arguData = {
                type: "专业",
                qyxx: this.qyxx,
                rxzb: this.totalDataByID.rxzb
              };
            } else {
              arguData = { type: "专业", qyxx: this.qyxx };
            }
          }
        }
        this.submitPageData(arguData);
      }
    },
    // 各数据失去焦点时校验
    blurFuc(argu = {}) {
      const { value, index, reg, label, num, keyType } = argu;
      let testValue = keyType == "number" ? Number(value) : value;
      if (!this.testNullFuc(testValue)) {
        if (!/第二|第三|第四|其他股东/.test(label)) {
          this.pageTotalData[index].errorTips =
            keyType == "number" ? "该项不能为空或0或非数字" : "该项为必填项";
        }
      } else if (!this.testRegFuc(value, reg, label)) {
        this.pageTotalData[index].errorTips = "请输入正确的格式";
      } else if (
        !this.testLengthFuc(value, label, num) &&
        !(label.indexOf("社会信用代码") > -1)
      ) {
        this.pageTotalData[index].errorTips = `字数不能大于${num}`;
      } else if (
        !this.testLengthFuc(value, label, num) &&
        label.indexOf("社会信用代码") > -1
      ) {
        this.pageTotalData[index].errorTips = `字数只能是${num}位`;
      } else if (!this.testBigSmallFuc(value, label, num)) {
        this.pageTotalData[index].errorTips = `数值不能大于${num}`;
      } else {
        this.pageTotalData[index].errorTips = "";
        this.isNSDK =
          this.pageTotalData[19].modelValue == "境外" ? true : false;
      }
    },
    //获取焦点后执行
    focusFuc(index) {
      this.pageTotalData[index].errorTips = "";
      this.pageTotalData[index].placeholder = "";
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
    //检验是否为空的fuc
    testNullFuc(value) {
      if (!value) return false;
      return true;
    },
    //正则匹配检验
    testRegFuc(value, reg, label) {
      if (label == "企业名称：" || label == "填表人姓名：") {
        if (reg) {
          let res = [];
          reg.forEach(element => {
            if (new RegExp(element).test(value)) {
              res.push("0");
            }
          });
          if (res.length) {
            return false;
          }
          return true;
        }
        return true;
      } else if (label == "填表人联系方式：") {
        if (reg) {
          let res = [];
          reg.forEach(element => {
            res.push(new RegExp(element).test(value));
          });
          if (!res.includes(true)) {
            return false;
          }
          return true;
        }
        return true;
      } else {
        if (reg) {
          let res = [];
          reg.forEach(element => {
            if (!new RegExp(element).test(value)) {
              res.push("0");
            }
          });
          if (res.length) {
            return false;
          }
          return true;
        }
        return true;
      }
    },
    //验证字符串长度
    testLengthFuc(value, label, num) {
      if (num) {
        //有num属性才需要该验证方法
        if (label.indexOf("社会信用代码") > -1) {
          if (value.length != num) {
            return false;
          }
          return true;
        } else {
          if (value.length > num) {
            return false;
          }
          return true;
        }
      }
      return true;
    },
    //验证大小
    testBigSmallFuc(value, label, num) {
      if (label != "企业统一社会信用代码：" && label != "企业主营业务概述：") {
        if (num) {
          if (Number(value) > num) {
            return false;
          }
          return true;
        }
        return true;
      }
      return true;
    },
    //选择一级行业
    changeOneLevelTrade(value, label) {
      if (label == "行业选择：") {
        if (this.isNSDK) {
          let oneLevelContent = this.pageTotalData[20].children[1];
          oneLevelContent.forEach((item, index) => {
            if (item == value) {
              this.twoLevelTradeContent = this.pageTotalData[21].children[1][
                index
              ];
            }
          });
        } else {
          let oneLevelContent = this.pageTotalData[20].children[0];
          oneLevelContent.forEach((item, index) => {
            if (item == value) {
              this.twoLevelTradeContent = this.pageTotalData[21].children[0][
                index
              ];
            }
          });
        }
      }
    },
    // 提交数据
    submitPageData(data) {
      this.$https.put("/report", data).then(res => {
        this.fullscreenLoading = false;
        if (res.code) {
          this.$vux.toast.show({
            text: res.msg
          });
        } else {
          this.$emit("toNextStep", "stepTwo");
          this.$router.push(`/${this.formType}/stepTwo`);
          this.formType == "fast"
            ? this.$store.commit("getFastOneID", res.data)
            : this.$store.commit("getProOneID", res.data);
        }
      });
    },
    isBackspace(keyValue) {
      return keyValue === "Backspace";
    },
    isDot(keyValue) {
      return keyValue === ".";
    },
    isNumber(keyValue) {
      return keyValue >= 0 && keyValue <= 9;
    },
    preventNotNumber(event, keyType) {
      if (keyType == "number" && /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        var keyValue = event.key;
        if (
          !this.isBackspace(keyValue) &&
          !this.isDot(keyValue) &&
          !this.isNumber(keyValue)
        ) {
          // 其他按键
          event.preventDefault();
          event.stopPropagation();
          return false;
        }
      }
    }
  }
};
</script>
<style lang='less'>
@import url(../assets/css/component/step.less);
</style>