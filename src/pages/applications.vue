<template>
  <div class="applications" ref="applications">
    <HWT :left="true" :title="'我的申请'" :id="'apply_header'"></HWT>
    <div class="fix_hed">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">全部申请</mt-tab-item>
        <mt-tab-item id="2">未完成</mt-tab-item>
        <mt-tab-item id="3">已完成</mt-tab-item>
      </mt-navbar>

      <div class="cont_title">
        <p class="p1">产品名称</p>
        <p class="p2">申请日期</p>
        <p class="p3">申请状态</p>
      </div>
    </div>

    <div class="content" ref="content">
      <mt-loadmore
        :bottom-method="loadBottom"
        @bottom-status-change="bottomStatusChange"
        :bottom-all-loaded="allLoaded"
        :auto-fill="false"
        ref="loadmore"
        class="loadmore"
      >
        <!-- tab-container -->

        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
            <div v-if="!list1isnone">
              <div class="cont_x" v-for="(item,index) in contInfoList1" :key="index">
                <p class="p1">{{item.name}}</p>
                <p class="p2">{{item.time}}</p>
                <p class="p3" :class="addStatusClass(item.status)">{{statusToString(item.status)}}</p>
              </div>
            </div>
            <div class="listisnone" v-else>
              <img src="../assets/images/product/nav_none.png">
              <span>没有啦</span>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <div v-if="!list2isnone">
              <div class="cont_x" v-for="(item,index) in contInfoList1" :key="index">
                <p class="p1">{{item.name}}</p>
                <p class="p2">{{item.time}}</p>
                <p class="p3" :class="addStatusClass(item.status)">{{statusToString(item.status)}}</p>
              </div>
            </div>
            <div class="listisnone" v-else>
              <img src="../assets/images/product/nav_none.png">
              <span>没有啦</span>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="3">
            <div v-if="!list3isnone">
              <div class="cont_x" v-for="(item,index) in contInfoList1" :key="index">
                <p class="p1">{{item.name}}</p>
                <p class="p2">{{item.time}}</p>
                <p class="p3" :class="addStatusClass(item.status)">{{statusToString(item.status)}}</p>
              </div>
            </div>
            <div class="listisnone" v-else>
              <img src="../assets/images/product/nav_none.png">
              <span>没有啦</span>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>

        <div slot="bottom" class="mint-loadmore-bottom" v-if="isallLoaded">
          <div class="listnone">
            <img src="../assets/images/product/nav_none.png">
            <span>不能再拉了</span>
          </div>
        </div>
        <div slot="bottom" class="mint-loadmore-bottom" v-else>
          <span v-show="bottomStatus === 'pull'">上拉加载</span>
          <span v-show="bottomStatus === 'drop'">释放加载</span>
          <div v-show="bottomStatus === 'loading'">
            <mt-spinner
              type="fading-circle"
              class="mint-loadmore-spinner mint-spinner-fading-circle circle-color-17"
            ></mt-spinner>
            <span>加载中...</span>
          </div>
        </div>
      </mt-loadmore>
    </div>
    <Tabbar :sel_id="'/applications'" :id="'apply_tabbar'"></Tabbar>
  </div>
</template>
<script>
import HWT from "@/components/headerWithTitle";
import Tabbar from "@/components/tabbar";
export default {
  data() {
    return {
      clientHeight: "",
      clientWidth: "",
      list1isnone: false,
      list2isnone: true,
      list3isnone: true,
      allLoaded: false,
      isallLoaded: false,
      bottomStatus: "",
      selected: "0",
      contInfoList1: [
        {
          name: "房产贷",
          time: "2019-12-12",
          status: "1"
        },
        {
          name: "房产贷",
          time: "2019-12-12",
          status: "2"
        },
        {
          name: "房产贷",
          time: "2019-12-12",
          status: "1"
        },
        {
          name: "房产贷",
          time: "2019-12-12",
          status: "1"
        },
        {
          name: "房产贷",
          time: "2019-12-12",
          status: "1"
        },
        {
          name: "房产贷",
          time: "2019-12-12",
          status: "1"
        },
        {
          name: "房产贷",
          time: "2019-12-12",
          status: "1"
        },
        {
          name: "房产贷",
          time: "2019-12-12",
          status: "1"
        },
      ]
    };
  },
  components: { HWT, Tabbar },
  methods: {
    statusToString(n) {
      switch (n) {
        case "1":
          return "已通过";
          break;
        case "2":
          return "审核中";
          break;
        case "3":
          return "未通过";
          break;
        default:
          return "审核中";
          break;
      }
    },
    addStatusClass(n) {
      switch (n) {
        case "1":
          return "status1";
          break;

        case "2":
          return "status2";
          break;

        case "3":
          return "status3";
          break;

        default:
          return "status2";
          break;
      }
    },
    //pull up and down
    loadBottom() {
      //this.isallLoaded = true; // 若数据已全部获取完毕
      this.$refs.loadmore.onBottomLoaded();
    },
    bottomStatusChange(status) {
      this.bottomStatus = status;
    },
    changeFixed(clientHeight) {
      //动态修改样式
      this.$refs.applications.style.height = clientHeight + "px";
      this.$refs.content.style.height =
        clientHeight - (this.clientWidth / 1080) * 100 * 5.54 + "px";
    },
  },
  mounted() {
    this.$nextTick(function() {
      // 获取浏览器可视区域高度
      this.clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      this.clientWidth =
        document.documentElement.clientWidth || document.body.clientWidth;

      window.onresize = function() {
        this.clientHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        this.clientWidth =
          document.documentElement.clientWidth || document.body.clientWidth;
      };
      this.selected="1";
    });
  },
  watch: {
    clientHeight: function() {
      this.changeFixed(this.clientHeight);
    },
    selected: function() {
      setTimeout(()=>{
        console.log("选项改变："+this.selected);
        console.log(document.querySelector(".loadmore").clientHeight);
        console.log(this.$refs.content.clientHeight);
        if (
          document.querySelector(".loadmore").clientHeight <
          this.$refs.content.clientHeight
        ) {
          console.log("关闭");
          this.allLoaded = true;
        } else {
          console.log("打开");
          this.allLoaded = false;
        }
      }, 0);
    }
  }
};
</script>

</script>
<style lang="less" scoped>
@import url(../assets/css/applications/applications.less);
</style>
