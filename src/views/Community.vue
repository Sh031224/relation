<template>
  <div class="community">
    <button @click="clickPost" class="community__post__btn">게시하기</button>
    <div v-if="post" class="community__post__a">
      <div @click="closePost" class="community__comment__close">
      &times;</div>
      <form @submit.prevent="onPost">
        <input placeholder="내용을 입력하세요" v-model="postCon">
        <button type="submit">입력</button>
      </form>
    </div>
    <div v-if="comment" class="community__comment">
      <div @click="closeComment" class="community__comment__close">
      &times;</div>
      <div class="community__comment__area">
        <div v-for="(item, index) in allComment" :key="index" class="community__comment__area__comment">
          {{ item.comment }}<div></div>
        </div>
      </div>
    </div>
    <div v-for="(item, index) in allPost" :key="index" class="community__post">
      <div class="community__post__item">
        <img src="@/assets/home/profile.svg">
        <span>익명</span>
        <div class="community__post__item__inside">{{ item.inside }}</div>
        <div class="community__post__item__comment">
          <div @click="showComment(index)" class="community__post__item__comment__show">댓글보기</div>
          <form @submit.prevent="onComment(index)">
            <input placeholder="댓글을 입력하세요." v-model="com"/>
            <button type="submit">입력</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      post: false,
      comment: false,
      com: '',
      postCon: '',
      allPost: {},
      allComment: {}
    }
  },
  mounted() {
    this.getWrite()
  },
  methods: {
    getWrite () {
      axios.post('http://192.168.43.249:3000/reg/getAllWrite', {
      })
      .then( response => {
        this.allPost = response.data
      })
      .catch( response => { console.log(response) })
    },
    clickPost () {
      this.post = true
    },
    closePost () {
      this.post = false
    },
    onComment (index) {
      axios.post('http://192.168.43.249:3000/reg/addComment', {
        id: index + 1,
        comment: this.com
      })
      .catch( response => { console.log(response) })
      let form = document.getElementsByTagName('form')
      for (let i in form) {
        i.value = ''
      }
    },
    showComment (index) {
      this.comment= true
      axios.post('http://192.168.43.249:3000/reg/getComment', {
        id: index + 1,
      })
      .then( response => {
        console.log(response.data)
        this.allComment = response.data
      })
      .catch( response => { console.log(response) })
    },
    closeComment () {
      this.comment = false
    },
    onPost () {
      axios.post('http://192.168.43.249:3000/reg/write', {
        title: 'title',
        inside: this.postCon
      })
      .then( response => {
        console.log(response)
        this.post = false
      })
      .catch( response => { console.log(response) })
    }
  },
}
</script>

<style lang="scss">
.community {
  width: 100%;
  height: calc(100% - 145px);
  overflow-y: scroll;
  &__comment {
    position: absolute;
    width: 520px;
    z-index: 1;
    height: 400px;
    background: rgb(255, 255, 255);
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    border-radius: 10px;
    box-shadow : rgba(0,0,0,0.5) 0 0 0 9999px;
    &__area {
      overflow-y: scroll;
      width: 100%;
      height: 360px;
      margin-top: 30px;
      &__comment {
        text-align: center;
        padding: 10px;
        margin-bottom: 13px;
        div {
          width: 70%;
          margin: 0 auto;
          margin-top: 3px;
          height: 1px;
          background: black;
        }
      }
    }
    &__close {
      font-size: 20pt;
      cursor: pointer;
      margin-left: 10px;
    }
  }
  &__post {
    width: 90%;
    padding: 15px;
    height: 400px;
    margin: 0 auto;
    margin-top: 30px;
    background: rgba(255, 98, 132, 0.575);
    border-radius: 10px;
    &__a {
      position: absolute;
      width: 520px;
      z-index: 1;
      height: 400px;
      background: rgb(255, 255, 255);
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      border-radius: 10px;
      box-shadow : rgba(0,0,0,0.5) 0 0 0 9999px;
      input {
        width: calc(100% - 3px);
        height: 250px;
        text-align: center;
        border: none;
      }
      button {
        cursor: pointer;
        width: 100%;
        height: 50px;
        border: none;
        background: linear-gradient(90deg , #FF7762, #FF54B1) no-repeat;
      }
    }
    &__item {
      width: 100%;
      height: 100%;
      position: relative;
      background: white;
      border-radius: 10px;
      img {
        width: 100px;
        margin: 15px;
        margin-bottom: 5px;
      }
      span {
        font-weight: 600;
        font-size: 28pt;
        top: -45px;
        position: relative;
      }
      &__inside {
        font-size: 20pt;
        width: 100%;
        height: 230px;
        overflow-y: scroll;
        text-align: center;
      }
      &__comment {
        width: 100%;
        height: 40px;
        input {
          margin-left: 10px;
          width: 90%;
          height: 36px;
        }
        button {
          width: 7%;
          cursor: pointer;
          height: 41px;
          border: none;
          background: linear-gradient(90deg , #FF7762, #FF54B1) no-repeat;
        }
        &__show {
          position: absolute;
          right: 10px;
          bottom: 50px;
          cursor: pointer;
        }
      }
    }
  }
  &__post__btn {
      margin-left: 50px;
      width: 130px;
      border: none;
      height: 40px;
      cursor: pointer;
      background: linear-gradient(90deg , #FF7762, #FF54B1) no-repeat;
    }
}
</style>