<template>
  <div class="cpInfo" ref="cpInfo">
    <HWT :title="infoList.name"></HWT>

    <!--头图-->
    <div class="top">
      <img src="../assets/images/product/cpInfoImg.png">

      <div class="topc1">
        <div>
          <p class="p1">放贷期限</p>
          <P class="p2">{{infoList.year+'年'}}</P>
        </div>
        <div>
          <p class="p1">适用对象</p>
          <P class="p2">{{infoList.dx}}</P>
        </div>
        <div>
          <p class="p1">贷款利率</p>
          <P class="p2">{{infoList.ll}}</P>
        </div>
      </div>

      <div class="topc2">
          <p class="p1">贷款额度</p>
          <p class="p2">{{infoList.ed}}<span>万</span></p>
          <P class="p3">放贷银行：<span>{{infoList.fd}}</span></P>
      </div>

    </div>

    <div class="contdiv">
        <p class="cont_title">产品特点</p>
        <div class="cptd">
            <div>
                <img src="../assets/images/product/cpinfo_dsj.png"/>
                <p>大数据</p>
            </div>
            <div>
                <img src="../assets/images/product/cpinfo_gx.png"/>
                <p>高效</p>
            </div>
            <div>
                <img src="../assets/images/product/cpinfo_kj.png"/>
                <p>快捷</p>
            </div>
        </div>
    </div>

    
    <div class="contdiv">
        <p class="cont_title">产品简介</p>
        <p class="cpjj">{{infoList.jj}}</p>
    </div>
    <div class="contdiv">
        <p class="cont_title">担保条件</p>
        <p class="cpdb">{{infoList.db}}</p>
    </div>

    <mt-button class="sqbtn" id="sqbtn" type="primary" size="large" @click="sqLink">立即申请</mt-button>
  </div>
</template>
<script>
import HWT from "@/components/headerWithTitle";
export default {
  data() {
    return {
      clientHeight: "",
      id: this.$route.params.id,
      infoList: {
        name:"股转信易贷",
        year: "1",
        dx: "中小微企业",
        ll: "4%-5%",
        ed: "10-200",
        fd: "中国建设银行",
        jj:"股转信易贷是重庆市首款依托大数据技术发放的针对中小微企业的贷款。",
        db:"无需担保，纯信用贷款",
      }
    };
  },
  components: { HWT },
  mounted() {
    this.$nextTick(function() {
      // 获取浏览器可视区域高度
      this.clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;

      window.onresize = function() {
        this.clientHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
      };
    });
  },
  methods: {
    changeFixed(clientHeight) {
      //动态修改样式
      this.$refs.cpInfo.style.minHeight = clientHeight -document.querySelector("#sqbtn").clientHeight+ "px";
    },
    //申请
    sqLink() {
      this.$router.push('/apply/'+this.id);
    }
  },
  watch: {
    //监听
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function() {
      this.changeFixed(this.clientHeight);
    }
  }
};
</script>

<style lang="less" scoped>
@import url(../assets/css/product/cpInfo.less);
</style>
