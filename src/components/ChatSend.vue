<template>
  <div class="chat__send">
      <form @submit.prevent="onSubmitChat">
          <input class="chatting" placeholder="채팅을 입력하세요." v-model="chat">
          <button type="submit">입력</button>
      </form>
  </div>
</template>

<script>
import db from '@/firebaseInit';
export default {
  name: 'ChatSend',
  props: {
    name: String
  },
  data() {
      return {
          chat: '',
          ms: {}
      }
  },
  methods: {
      onSubmitChat () {
        this.name = 'asd'
        db.child('chat').child().set({user: this.name, msg: this.chat})
        // db.collection('chat').doc('test').set({${result}:{user: this.name, msg: this.chat}});
        //   document.getElementsByTagName('chatting')[0].value = ''
      }
  },
}
</script>

<style lang="scss">
.chat__send {
    width: 100%;
    height: 70px;
    bottom: 0;
    position: fixed;
    input {
        width: calc(100% - 100px);
        height: 70px;
        padding-left: 30px;
        font-size: 16pt;
    }
    button {
        cursor: pointer;
        width: 66px;
        height: 81px;
        border: none;
        background: #FF7762;
    }
}
</style>