<template>
  <div>
    <!-- 头部 -->
    <my-header></my-header>
    <!-- 企业介绍内容 -->
    <section class="intro-content">
      <ul>
        <li class="intro-item" v-for="(item,index) in content" :key="index">
          <p class="font_size22 color_F0 m_b20">{{item.title}}
            <span class="font_size18 m_l20">{{item.subTitle}}</span>
          </p>
          <div>
            <p v-for="(e,i) in item.content" :key="i" class="detail-content font_size14">{{e}}</p>
          </div>
        </li>
      </ul>
    </section>
    <!-- 跳转到专业估值或快速估值 -->
    <section class="jump-area m_b30">
      <ul>
        <li class="jump-item m_b20" v-for="(item,index1) in jumpArea" :key="index1">
          <p class="font_size14 color_F0 jump-area-title">{{item.title}}</p>
          <div>
            <p class="jump-area-detail" v-for="(el,j) in item.content" :key="j">{{el}}</p>
          </div>
          <div class="my_text_center jump-btn-box">
            <router-link :to='item.url' class="color_FF font_size16 jump-btn bg_colorF0">{{item.btn}}</router-link>
          </div>
        </li>
      </ul>
    </section>
    <!-- footer -->
    <my-footer></my-footer>
  </div>
</template>

<script>
import myHeader from "@/components/myHeader";
import myFooter from "@/components/myFooter";

export default {
  data() {
    return {
      content: [
        {
          title: "智估简介",
          subTitle: "",
          content: [
            "榆钱儿智估—估值服务系统。该估值系统是运用大数据和专业智能化的估值技术，为挂牌企业进行价值评估，给出公允价值，让估值合理回归，促进中小微企业用股权在资本市场上进行直接融资，同时为企业的并购重组、股权质押、股权激励、可转债、出售资产等提供依据。"
          ]
        },
        {
          title: "01",
          subTitle: "什么是企业估值",
          content: [
            "企业估值就是对企业持续经营价值进行判断，估计的过程，即对公司未来效益水平进行科学量化的过程。",
            "企业价值评估反映了企业发展潜力和未来盈利能力，正在广泛应用于企业自身的业绩评估、价值分析和投资分析中，企业价值正在成为衡量一个企业成功与否和质量好坏最全面最准确的指标。"
          ]
        },
        {
          title: "02",
          subTitle: "企业为什么要进行估值",
          content: [
            "其本质就是解决企业到底值多少钱的问题",
            "1、企业家、股东可以明白企业家底儿，到底值多少钱;",
            "2、如果想卖企业（卖股权）去换钱，走向资本市场，扩大生产、经营，企业估值必不可少;",
            "3、给投资人看的，企业哪些东西在资本市场是值钱的，哪些是不值钱的;",
            "4、估值的过程也是企业熟悉资本市场的过程，解决由于企业家和投资人信息不对称而处于弱势的问题;",
            "5、提高企业家决策的效率问题，使在投资决策过程中少走弯路、效率更高;",
          ]
        },
        {
          title: "03",
          subTitle: "平台特色",
          content: [
            "线上估值：取代传统线下估值方式，将大数据、云计算、人工智能等最前沿科学技术应用到传统企业估值中，使企业估值更科学、快速、公允。",
            "适用范围更广：适用于企业不同的成长阶段，支持106个细分行业的估值定价，覆盖全球资本市场。",
            "科学与艺术相结合：将财务指标和软性指标有机地结合在一起，便形成了具有鲜明独创性的“榆钱儿智估估值指标体系”。",
            "数据库资源丰富：榆钱儿智估拥有强大的数据库资源，包含主板、中小板、创业板、新三板、非上市企业、海外企业数据库等。",
            "提供专家支持：我们的专家和财务分析团队随时可以回答您的任何请求，从技术问题到针对您的财务和估值的有针对性的建议。",
            "安全数据保障：我们注重企业数据的安全和隐私，提供安全、可靠的计算和数据处理能力，让计算和人工智能成为普惠科技。",
          ]
        },
        {
          title: "04",
          subTitle: "估值体系",
          content: [
            "1、财务估值指标——以企业的财务指标为基础，选取适当估值模型，结合企业所处成长阶段、行业特性、财务状况等，科学的评估企业价值。 榆钱儿智估相对估值法：市盈率法、市净率法、市销率法、EV/EBITDA法。  榆钱儿智估绝对估值法：公司自由现金流折现法、股权自由现金流折现法。",
            "2、榆钱儿智估软性估值指标——通过精选线下专业问题，筛选出频率最高、最能反映企业价值的软性指标，运用层次分析法，构建多层次分析结构模型，确定各估值要素及指标权重，作为榆钱儿智估指标体系估值系数。"
          ]
        },
        {
          title: "05",
          subTitle: "估值体系介绍",
          content: [
            "提供两种估值方式，分别为：线上快速估值、线上专业估值。"
          ]
        },
      ],//企业介绍信息
      jumpArea:[
        {
          title:'快速估值（Q版）',
          content:[                 
            "30分钟快速估值",
            "公司基本情况概览",
            "运用多种相对估值方法",
            "快速估值诊断和建议",
            "估值原理说明",
            "一键生成报告",
          ],
          btn:'快速估值',
          url:'/fast'
        },
        {
          title:'专业估值（P版）',                
          content:[                 
            "完整的财务资料分析",
            "公司基本情况分析",
            "相对估值和绝对估值法相结合",
            "可比公司分析",
            "专业估值诊断和说明",
            "估值原理说明",
            "一键生城报告",
          ],
          btn:'专业估值',
          url:'/profession'
        }
      ]
    };
  },
  components: {
    myHeader,
    myFooter
  },
  mounted() {
    //判断是否登录
    if (this.$store.state.user && this.$store.state.user.phone) {
      
    } else {
      this.$router.push('/')
    }
  },
};
</script>
<style lang='less' scoped>
@import url(../assets/css/intro/intro.less);
</style>