<template>
  <div>
    <!-- 头部 -->
    <my-header></my-header>
    <!-- content -->
    <section class="history-content m_b30">
      <!-- title -->
      <div
        class="history-title flex color_F0 flex-align-center m_b20"
        :class="!isNoData && 'flex-pack-justify'"
      >
        <span class="font_size22">智估历史</span>
        <span @click="isShowSlideBar=true" v-if="!isNoData">筛选</span>
      </div>
      <!-- list -->
      <mt-loadmore
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        ref="loadmore"
        bottomDropText
        bottomPullText
        :auto-fill="false"
      >
        <ul v-if="!isNoData">
          <li class="list-item font_size14" v-for="(item,index) in listArr" :key="index">
            <p class="flex flex-pack-justify">
              <span>
                企业名称：
                <span class="company-name">{{item.orgName}}</span>
              </span>
              <span
                class="color_99"
                v-html="item.type?'已完成':'进行中'"
                :class="item.type || 'current-color'"
              ></span>
            </p>
            <p class="flex">
              企业统一社会信用代码：
              <span>{{item.orgID}}</span>
            </p>
            <p class="flex">
              估值时间：
              <span>{{item.createDate}}</span>
            </p>
            <p class="flex">
              报告时间日：
              <span>{{item.resultDate}}</span>
            </p>
            <span
              class="flex color_F0"
              @click="jumpToCompanyReport({formID:item.id,reportID:item.resultID,reportType:item.reportType})"
            >查看详情</span>
          </li>
        </ul>
      </mt-loadmore>
      <!-- no-data -->
      <div v-if="isNoData" class="my_text_center no-data-box">
        <img src="../assets/images/history/no_data.png" class="no-data-pic">
        <p class="font_size14 color_B3">您尚未进行企业估值，暂无智估历史数据</p>
      </div>
      <!-- 筛选遮罩 -->
      <slide-bar v-if="isShowSlideBar" @clickCancel="clickCancel" @clickSure="clickSure"></slide-bar>
    </section>
    <!-- footer -->
    <my-footer></my-footer>
  </div>
</template>

<script>
import myHeader from "@/components/myHeader";
import slideBar from "@/components/slideBar";
import myFooter from "@/components/myFooter";
export default {
  data() {
    return {
      isShowSlideBar: false,
      isNoData: false,
      listArr: [],
      currentPage: 1,
      maxPage: 0,
      bottomStatus: "",
      allLoaded: false,
      queryData: null //查询参数
    };
  },

  components: {
    myHeader,
    slideBar,
    myFooter
  },
  mounted() {
    //判断是否登录
    if (this.$store.state.user && this.$store.state.user.phone) {
      
    } else {
      this.$router.push('/')
    }
    
    this.getPageData();
  },
  methods: {
    //筛选框点击取消
    clickCancel() {
      this.isShowSlideBar = false;
    },
    // 获取页面数据
    getPageData(data = {}) {
      this.$https.get("/flow/historyReport", data).then(res => {
        if (res.data.totalCount) {
          this.listArr = this.listArr.concat(res.data.rows);
          this.maxPage = res.data.totalPage;
        } else {
          this.isNoData = true;
        }
      });
    },
    //跳转公司信息和报告页
    jumpToCompanyReport({ formID, reportID, reportType }) {
      this.$router.push("/infoReport");
      this.$store.commit("getCompanyFormID", formID);
      this.$store.commit("getReportID", reportID);
      this.$store.commit("getReportType", reportType);
    },
    //上拉加载数据
    loadBottom() {
      if (this.currentPage < this.maxPage) {
        this.currentPage++;
        let pageObj = { pageNo: this.currentPage };
        let arguObj;
        if(this.queryData == null){
          arguObj = pageObj
        } else {
          arguObj = Object.assign(this.queryData, pageObj);
        }
        this.getPageData(arguObj);
      } else {
        this.allLoaded = true; // 若数据已全部获取完毕
        this.$vux.toast.show({
          text: "无数据更新"
        });
      }
      this.$refs.loadmore.onBottomLoaded();
    },
    //点击筛选中的确定
    clickSure(data) {
      this.currentPage = 1;
      this.queryData = data;
      this.listArr = [];
      this.getPageData(data);
    }
  }
};
</script>
<style lang='less' scoped>
@import url(../assets/css/history/history.less);
</style>