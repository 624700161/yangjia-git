<template>
  <div class="messages">
    <HWT :title="'信息中心'"></HWT>
    <div class="messagesList">
      <mt-cell v-for="(item,index) in messageList" :key="index" :title="item.title" :to="'/message/'+item.id" is-link :label="item.time">
        <img slot="icon" :src="item.isLook?my:mn" width="24" height="24">
      </mt-cell>
    </div>
  </div>
</template>
<script>
import HWT from "@/components/headerWithTitle"
import m_n from "../assets/images/messages/messages_no.png"
import m_y from "../assets/images/messages/messages_yes.png"

export default {
  data() {
    return {
        mn:m_n,
        my:m_y,
        messageList:[
            {
                id:'1',
                title:'信息通知',
                time:'2018-12-12',
                isLook:false,
            },
            {
                id:'2',
                title:'信息通知信息通知信息通知',
                time:'2018-12-12',
                isLook:false,
            },
            {
                id:'3',
                title:'信息通知信息通知信息通知信息通知信息通知',
                time:'2018-12-12',
                isLook:true,
            }
        ]
    };
  },
  components: { HWT }
};
</script>
<style lang="less" scoped>
@import url(../assets/css/messages/messages.less);
</style>
