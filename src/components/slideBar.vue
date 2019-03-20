<template>
  <transition name="fade">
    <div class="outer-box" ref="slideBar" @click="clickOuterBox">
      <div class="inner-box bg_colorFF" @click.stop>
        <!-- 企业名称或社会信用代码搜索 -->
        <div class="qymc-outer-box m_b30">
          <input
            type="text"
            v-model="qymc"
            class="qymc-input border-DD"
            placeholder="搜索企业名称、企业统一社会信用代码"
          >
        </div>
        <!-- 估值时间段筛选 -->
        <div class="m_b30">
          <p class="color_BB font_size14 pub-title">估值时间段筛选</p>
          <el-date-picker
            v-model="startValue"
            type="date"
            placeholder="开始日期"
            :clearable="false"
            :picker-options="pickerOptionsStart"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
          <p class="color_BB font_size14 zhi-text">至</p>
          <el-date-picker
            v-model="endValue"
            type="date"
            placeholder="结束日期"
            :clearable="false"
            :picker-options="pickerOptionsEnd"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </div>
        <!-- 估值类型 -->
        <div class="m_b30">
          <p class="color_BB font_size14 pub-title">估值类型</p>
          <div>
            <span
              v-for="(item,index) in valuType"
              :key="index"
              class="public-btn-style my_text_center font_size14"
              :class="item.status && 'active'"
              @click="clickValuType(item.reportType,index)"
            >{{item.name}}</span>
          </div>
        </div>
        <!-- 估值状态 -->
        <div class="m_b30">
          <p class="color_BB font_size14 pub-title">估值状态</p>
          <div>
            <span
              v-for="(item,index) in valuStatus"
              :key="index"
              class="public-btn-style my_text_center font_size14"
              :class="item.status && 'active'"
              @click="clickValuStatus(item.type,index)"
            >{{item.name}}</span>
          </div>
        </div>
        <!-- 取消或确定 -->
        <div class="cancel-sure flex flex-align-center flex-pack-center font_size16">
          <span
            class="cancel-sure-pub border-DD color_2B m_r30 my_text_center"
            @click="clickCancel"
          >取消</span>
          <span class="cancel-sure-pub color_FF bg_colorF0 my_text_center" @click="sureBtn">确定</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isShowSlideBar: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      qymc: "", //用户输入的企业名称或者是社会信用代码
      startValue: "",
      endValue: "",
      valuType: [
        { name: "快速估值", status: 0, reportType: 1 },
        { name: "专业估值", status: 0, reportType: 0 }
      ],
      valuStatus: [
        { name: "进行中", status: 0, type: 0 },
        { name: "已完成", status: 0, type: 1 }
      ],
      reportType: 2,
      statusType: 2,
      //日期选择器配置
      pickerOptionsStart: {
        disabledDate(time) {
          // 86400000是一天的毫秒数
          return time && time.valueOf() > Date.now();
        }
      },
      pickerOptionsEnd: {
        disabledDate(time) {
          // 86400000是一天的毫秒数
          return time && time.valueOf() > Date.now();
        }
      }
    };
  },
  mounted() {
    this.$refs.slideBar.style.height = window.innerHeight + "px";
  },
  methods: {
    //点击黑色遮罩
    clickOuterBox() {
      this.$emit("clickCancel");
    },
    //点击取消
    clickCancel() {
      this.$emit("clickCancel");
    },
    //点击估值类型
    clickValuType(reportType, i) {
      this.valuType.forEach((item, index) => {
        if (index == i) {
          item.status = 1;
        } else {
          item.status = 0;
        }
      });
      this.reportType = reportType;
    },
    //点击估值状态
    clickValuStatus(type, j) {
      this.valuStatus.forEach((item, index) => {
        if (index == j) {
          item.status = 1;
        } else {
          item.status = 0;
        }
      });
      this.statusType = type;
    },
    //点击确定
    sureBtn() {
      if (
        this.qymc ||
        this.startValue ||
        this.endValue ||
        this.statusType !=2 ||
        this.reportType !=2
      ) {
        let start = new Date(this.startValue).valueOf();
        let end = new Date(this.endValue).valueOf();
        let type = this.statusType == 2 ? "" : this.statusType;
        let reportType = this.reportType == 2 ? "" : this.reportType;
        let queryArgu = {};
        if (start > end) {
          queryArgu = {
            keyWord: this.qymc,
            type: type,
            reportType: reportType,
            startDate: this.endValue,
            endDate: this.startValue
          };
        } else {
          queryArgu = {
            keyWord: this.qymc,
            type: type,
            reportType: reportType,
            startDate: this.startValue,
            endDate: this.endValue
          };
        }
        this.$emit("clickSure", queryArgu);
        this.$emit("clickCancel");
      }
    }
  }
};
</script>
<style lang='less' scoped>
@import url(../assets/css/component/slideBar.less);
</style>