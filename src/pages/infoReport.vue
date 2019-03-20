<template>
  <div>
    <!-- 头部 -->
    <my-header></my-header>
    <!-- title -->
    <p class="font_size22 color_F0 detail-title">智估详情</p>
    <!-- name -->
    <p class="my_text_center color_2B font_size18 company-name">估值企业：{{companyName}}</p>
    <!-- tab -->
    <div class="tabs">
      <span
        v-for="(item,index) in tabs"
        :key="index"
        class="tabs-pub color_FF font_size14"
        :class="item.status && 'active'"
        @click="changeTabs(index,item.url)"
      >{{index == 1?`${type}${item.name}`:item.name}}</span>
    </div>
    <router-view @getCompanyName='getCompanyName'></router-view>
  </div>
</template>

<script>
import MyHeader from "@/components/myHeader";

export default {
  data() {
    return {
      tabs: [
        {
          name: "企业信息",
          status: 1,
          url:'/infoReport/'
        },
        {
          name: "估值报告",
          status: 0,
          url:'/infoReport/report'
        }
      ],
      companyName:'',
      type:''
    };
  },
  components: {
    MyHeader
  },
  mounted() {
    //判断是否登录
    if (this.$store.state.user && this.$store.state.user.phone) {
      
    } else {
      this.$router.push('/')
    }
  },
  methods: {
    //切换tab栏
    changeTabs(index,url) {
      this.tabs.forEach((elem, i) => {
        if (i == index) {
          elem.status = 1;
        } else {
          elem.status = 0;
        }
      });
      this.$router.push(url)
    },
    //获取公司名称
    getCompanyName(data){
      this.companyName = data.name;
      this.type = data.type;
    }
  }
};
</script>
<style lang='less' scoped>
@import url(../assets/css/infoReport/infoReport.less);
</style>