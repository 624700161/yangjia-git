<template>
  <div class="productlist">
    <HWT :left="true" :title="'产品中心'"></HWT>
    <div class="cplist" ref="cplist">
      <mt-loadmore
        :top-method="loadTop"
        :bottom-method="loadBottom"
        @bottom-status-change="bottomStatusChange"
        :bottom-all-loaded="allLoaded"
        :auto-fill="false"
        ref="loadmore"
        class="loadmore"
      >
      <div class="cpcont">
        <div
          class="cpdiv"
          v-for="(item,index) in cplist"
          :key="index"
          @click="jumpToCpinfo(item.id)"
          :class="{isright:index%2===1}"
        >
          <p class="p_title">{{item.name}}</p>
          <p class="p_t">{{item.text}}</p>
          <p class="p_ed">
            额度：
            <span>{{item.ed}}</span>
          </p>
          <p class="p_qx">
            期限：
            <span>{{item.qx}}</span>
          </p>
          <p class="p_ll">
            利率：
            <span>{{item.ll}}</span>
          </p>
          <img :src="roundSrc(index)">
        </div>
        </div>
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
    <Tabbar ref="tabbar" :sel_id="'/product'"></Tabbar>
  </div>
</template>
<script>
import HWT from "@/components/headerWithTitle";
import Tabbar from "@/components/tabbar";

import cpimg1 from "../assets/images/product/cpimg1.png";
import cpimg2 from "../assets/images/product/cpimg2.png";
import cpimg3 from "../assets/images/product/cpimg3.png";
import cpimg4 from "../assets/images/product/cpimg4.png";
import cpimg5 from "../assets/images/product/cpimg5.png";
import cpimg6 from "../assets/images/product/cpimg6.png";

export default {
  data() {
    return {
      clientHeight: "",
      clientWidth: "",
      allLoaded: false,//能否上拉加载与否
      isallLoaded: false,//上拉加载板块显示内容是否为加载完的提示
      bottomStatus: "",
      cpimglist: [cpimg1, cpimg2, cpimg3, cpimg4, cpimg5, cpimg6],
      cpimgindexlist: [],
      cplist: ""
    };
  },
  components: { HWT, Tabbar },
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
      this.cplist = [
        {
          id: "1001",
          name: "股转信易贷",
          text: "中国建设银行",
          ed: "10-200万",
          qx: "1年",
          ll: "4%-5%"
        },
        {
          id: "1002",
          name: "股转车抵贷",
          text: "平安银行",
          ed: "3-50万",
          qx: "1-3年",
          ll: "0.55%"
        },
        {
          id: "1002",
          name: "股转车抵贷",
          text: "平安银行",
          ed: "3-50万",
          qx: "1-3年",
          ll: "0.55%"
        },
        {
          id: "1002",
          name: "股转车抵贷",
          text: "平安银行",
          ed: "3-50万",
          qx: "1-3年",
          ll: "0.55%"
        },
        {
          id: "1002",
          name: "股转车抵贷",
          text: "平安银行",
          ed: "3-50万",
          qx: "1-3年",
          ll: "0.55%"
        }
      ];
    });
  },
  methods: {
    //随机图片
    roundSrc(index) {
      if (index + 1 > this.cpimgindexlist.length) {
        let i = Math.floor(Math.random() * this.cpimglist.length);
        this.cpimgindexlist.push(i);
      }
      return this.cpimglist[this.cpimgindexlist[index]];
    },
    //pull up and down
    loadTop() {
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
      //this.isallLoaded = true; // 若数据已全部获取完毕
      this.$refs.loadmore.onBottomLoaded();
    },
    bottomStatusChange(status) {
      this.bottomStatus = status;
    },
    jumpToCpinfo(id) {
      this.$router.push("/cpInfo/" + id);
    },
    changeFixed(clientHeight) {
      //动态修改样式
      this.$refs.cplist.style.height =
        clientHeight -
        document.querySelector(".mint-tabbar").clientHeight -
        document.querySelector(".mint-header").clientHeight +
        "px";
    },
    // 获取页面数据
    // getPageData(data = {}) {
    //   this.$https.get("/flow/historyReport", data).then(res => {
    //     if (res.data.totalCount) {
    //       this.listArr = this.listArr.concat(res.data.rows);
    //       this.maxPage = res.data.totalPage;
    //     } else {
    //       this.isNoData = true;
    //     }
    //   });
    // },
  },
  watch: {
    clientHeight: function() {
      this.changeFixed(this.clientHeight);
    },
    cplist: function() {
      setTimeout(() => {
        if (
          document.querySelector(".cpcont").clientHeight <
          this.$refs.cplist.clientHeight
        ) {
          console.log("关闭");
          this.isallLoaded=true;
          document.querySelector(".cpcont").style.height =
            this.$refs.cplist.clientHeight + "px";
        } else {
          console.log("打开");
          this.isallLoaded=false;
          document.querySelector(".cpcont").style.height = "auto";
        }
      }, 0);
    }
  }
};
</script>
<style lang="less" scoped>
@import url(../assets/css/product/product.less);
</style>

