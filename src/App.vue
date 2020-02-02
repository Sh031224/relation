<template>
  <div id="app">
    <span class="nav__open" @click="openNav">&#8801;</span>
    <div class="nav">
      <img class="nav__header" src="@/assets/nav/header.png">
      <img class="nav__close" @click="closeNav"  src="@/assets/nav/close_btn.png">
      <div class="nav__profile">
        <img class="nav__profile__img" src="@/assets/nav/profile.png">
        <div v-if="login" class="nav__login__text">{{ myname }}</div>
      </div>
      <div v-if="!login" class="nav__login__message">로그인이 필요합니다.</div>
      <router-link :to="{ path: '/home/' + mytoken }" v-if="login" class="router">
        <div class="router__item" @click="closeNav">
        <img src="@/assets/nav/home.png">
        메인</div></router-link>
      <router-link :to="{ path: '/chat/' + myname }" v-if="login" class="router">
        <div class="router__item" @click="closeNav">
        <img src="@/assets/nav/chat.png">
        채팅</div></router-link>
      <router-link v-if="login" class="router" to="/community">
        <div class="router__item" @click="closeNav">
        <img src="@/assets/nav/community.png">
        커뮤니티</div></router-link>
      <router-link v-if="login" class="router" to="/">
        <div class="router__item" @click="logout">
        <img src="@/assets/nav/logout.png">
        로그아웃</div></router-link>
    </div>
    <router-view @onLogin="onLogin"/>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',
  data() {
    return {
      login: false,
      myname: '',
      mytoken: '',
    }
  },
  methods: {
    changeRoute (routeName) {
      this.$router.push({ name: routeName })
    },
    openNav () {
      document.getElementsByClassName('nav')[0].style.left = "0px";
    },
    closeNav () {
      document.getElementsByClassName('nav')[0].style.left = "-500px";
    },
    logout () {
      this.closeNav()
      this.login = false
    },
    onLogin (token) {
      this.login = true
      axios.post('http://192.168.43.249:3000/reg/info', {
        token: token
      })
      .then( response => {
        this.myname = response.data.data.username
        this.mytoken = response.data.data.token
      })
      .catch( response => { console.log(response) });
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/style/common.scss";

#app {
  font-family: "s-core-dream-regular";
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: rgba(255, 135, 235, 0.226);
  position: absolute;
  .nav {
    z-index: 1;
    top: 0;
    overflow: hidden;
    left: -500px;
    position: fixed;
    width: 500px;
    height: 100%;
    box-shadow: 0px 0px 10px gray;
    background: #ffd5cf;
    -webkit-user-select: none;
     -khtml-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
    transition: 0.5s;
    &__header {
      width: 100%;
    }
    &__login__text {
      color: white;
      font-size: 26pt;
      text-align: center;
    }
    &__login__message {
      color: white;
      background: #00000013;
      font-size: 16pt;
      text-align: center;
    }
    &__close {
      cursor: pointer;
      position: absolute;
      right: 20px;
      top: 20px;
      width: 20px;
      height: 20px;
    }
    &__profile {
      right: 60px;
      top: 90px;
      position: absolute;
      width: 160px;
      height: auto;
      &__img {
        width: 160px;
      }
    }
    &__open {
      width: 30px;
      margin-left: 40px;
      cursor: pointer;
      background: linear-gradient(90deg , #FF7762, #FF54B1) no-repeat;
      -webkit-background-clip: text;
         -moz-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 80pt;
      -webkit-user-select: none;
       -khtml-user-select: none;
         -moz-user-select: none;
          -ms-user-select: none;
              user-select: none;
      &:hover {
        color: gray;
      }
    }
    .router {
      margin: 30px auto;
      display: block;
      text-decoration: none;
      width: 100%;
      height: 60px;
      background: #00000013;
      color: white;
      font-size: 23pt;
      div {
        display: inline-block;
        padding-left: 30px;
        width: 100%;
        height: 60px;
        left: 50%;
        padding-top: 8px;
      }
      img {
        width: 33px;
        top: 5px;
        margin-right: 3px;
      }
      &:hover {
        background: #00000028;
      }
    }
  }
}
div, html, body {
  margin: 0;
  padding: 0;
}
</style>
