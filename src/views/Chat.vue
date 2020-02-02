<template>
  <div id="chat">
    <div class="chat__text__area">
      <div v-for="(item, index) in obj" :key="index" class="chat__area">
        <span :class="item.user">{{ item.msg }}</span>
      </div>
    </div>
    <ChatSend :name="chatName"/>
  </div>
</template>

<script>
import Chatting from '@/models/Chatting.js'
import ChatSend from '@/components/ChatSend.vue'
export default {
  name: 'chat',
  props: ['chatName'],
  data() {
    return {
      obj: Chatting
    }
  },
  components: {
    ChatSend
  },
  mounted() {
    let area = document.getElementsByClassName('chat__text__area')[0]
    area.scrollTop = area.scrollHeight
  },
}
</script>

<style lang="scss">
#chat {
  width: 100%;
  height: 100%;
}
.chat__text__area {
  width: 100%;
  overflow-y: scroll;
  height: calc(100% - 76px - 142px);
}
.chat__you {
  font-size: 18pt;
  margin-left: 20px;
  position: relative;
  padding: 0px 10px 10px 10px;
  background: white;
  border-radius: 0px 10px 10px 10px;
}
.chat__area {
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
}
.chat__me {
  font-size: 18pt;
  float: right;
  margin-right: 20px;
  position: relative;
  padding: 0px 10px 10px 10px;
  background: white;
  border-radius: 10px 0px 10px 10px;
}
</style>