<template>
  <div class="publicAbout">
    <!-- 按钮 -->
    <div class="index2btn">
      <mt-button type="primary" size="large" @click="jumpToUrl('/product')">我要贷款</mt-button>
      <mt-button type="primary" size="large" @click="showcalculator">贷款计算器</mt-button>
    </div>

    <!-- 产品 -->
    <div class="indexcp clearfix">
      <div class="cpdiv cp1" @click="jumpToCpinfo(cplist[0].id)">
        <p class="p_title">{{cplist[0].name}}</p>
        <p class="p_t">{{cplist[0].text}}</p>
        <p class="p_ed">
          额度：
          <span>{{cplist[0].ed}}</span>
        </p>
        <p class="p_qx">
          期限：
          <span>{{cplist[0].qx}}</span>
        </p>
        <p class="p_ll">
          利率：
          <span>{{cplist[0].ll}}</span>
        </p>
        <img src="../assets/images/product/cpimg1.png">
      </div>
      <div class="cpdiv cp2" @click="jumpToCpinfo(cplist[1].id)">
        <p class="p_title">{{cplist[1].name}}</p>
        <p class="p_t">{{cplist[1].text}}</p>
        <p class="p_ed">
          额度：
          <span>{{cplist[1].ed}}</span>
        </p>
        <p class="p_qx">
          期限：
          <span>{{cplist[1].qx}}</span>
        </p>
        <p class="p_ll">
          利率：
          <span>{{cplist[1].ll}}</span>
        </p>
        <img src="../assets/images/product/cpimg2.png">
      </div>
    </div>

    <!-- 合作 -->
    <div class="indexhz">
      <P class="hztitle">合作机构</P>
      <div class="hzdiv">
        <div class="contwid">
          <div class="contdiv">
            <img src="../assets/images/index/hz1.png">
            <div class>
              <p class="p1">信用中心（重庆）</p>
              <P class="p2">creditchina.gov.cn</P>
            </div>
          </div>
        </div>
        <div class="contwid">
          <div class="contdiv">
            <img src="../assets/images/index/hz2.png">
            <div>
              <p class="p1">中国建银行</p>
              <P class="p2">www.ccb.com</P>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 计算器 -->
    <calculator ref="calculator"></calculator>
  </div>
</template>
<script>

import calculator from "@/components/calculator";
export default {
  data() {
    return {
      
      cplist: [
        {
          id: "1011",
          name: "股转信易贷",
          text: "中国建设银行",
          ed: "10-200万",
          qx: "1年",
          ll: "4%-5%"
        },
        {
          id: "1012",
          name: "股转车抵贷",
          text: "平安银行",
          ed: "3-50万",
          qx: "1-3年",
          ll: "0.55%"
        }
      ]
    };
  },
  components:{calculator},
  methods: {
      //显示贷款计算器
    showcalculator() {
      this.$refs.calculator.show();
    },
    jumpToUrl(data) {
      this.$router.push(data);
    },
    jumpToCpinfo(id) {
      this.$router.push("/cpInfo/" + id);
    },
  },
};
</script>

<style lang='less' scoped>
@import url(../assets/css/component/publicAbout.less);
</style>
