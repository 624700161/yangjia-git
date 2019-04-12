<template>
  <div class="questions">
    <HWT :title="'常见问题'"></HWT>
    <div class="icon_questions">
      <img src="../assets/images/menu/icon_questions.png">
    </div>

    <el-collapse class="collapse" v-model="activeName" accordion>
      <el-collapse-item v-for="(item,index) in questionsList" :key="index" :title="item.title" :name="item.name">
        <div class="conttext">
            <div class="contleft"><p>内容</p></div>
            <div class="contright">{{item.text}}</div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import HWT from "@/components/headerWithTitle"

export default {
  data() {
    return {
        activeName:'',
        questionsList:[
            {
                name:'1',
                title:'信易融平台是什么？',
                text:'该平台由股转中心与市信用中心联合推出，与建设银行重庆分行合作，面向重庆市中小微企业开放，帮助企业获取高效的银行贷款。平台运用大数据技术，使得企业画像更加清晰，可帮助企业更好的获得与之匹配的融资支持。',
            },
            {
                name:'2',
                title:'企业申请贷款所需材料清单',
                text:'企业申请信易融平台贷款需上传企业信息采集及信息查询授权委托书及相关表格。上传信易融平台申请贷款所涉及到的佐证材料及授权书上传均为扫描件图片或截图形式，（上传的图片，横图长宽像素最大为3508*2480，竖图长宽像素最大为2480*3508，图片大小在6M以内）。',
            },
            {
                name:'3',
                title:'企业最高能获得贷款额度？',
                text:'最高额度为1000万，贷款额度综合考虑企业经营能力、企业纳税情况、企业主家庭资产、企业及企业主总体负债情况等因素确定。',
            },
            {
                name:'4',
                title:'放贷时间一般多久？',
                text:'正常需要15-20个工作日方可办理完毕。具体时间视具体产品而定。',
            },
            {
                name:'5',
                title:'如何还款？',
                text:'可以选取按月、按季还本或到期一次性还款等方式，循环贷款在额度有效期内随借随还、循环使用。具体如何还款视具体产品而定。',
            },
            {
                name:'6',
                title:'信易融贷款产品申请流程是什么？',
                text:'第一步：企业通过信易融平台进行会员注册。 第二步：企业通过信易融平台“我要贷款”或产品中的“申请”进行贷款资料上报并完成企业认证。 第三步：企业数据审核。 第四步：根据审核结果出具企业贷款申请报告。 第五步：企业贷款相关信息推送给银行。 第六步：银行根据相关信息进行核实放款。',
            },
        ]
    };
  },
  components: { HWT },
  methods: {}
};
</script>
<style lang="less" scoped>
@import url(../assets/css/menu/questions.less);
</style>

