<template>
  <div id="login">
    <div class="login__form">
      <form @submit.prevent="signUp">
        <img src="@/assets/logo.png">
        <input placeholder="ID" v-model="user.id">
        <input placeholder="PW" type="password" v-model="user.password">
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'LoginForm',
  data() {
    return {
      user: {
        id: '',
        password: ''
      }
    }
  },
  mounted() {
    document.getElementsByTagName('input')[0].focus()
  },
  methods: {
    signUp () {
      axios.post('(ServerIp)/reg/login', {
        id: this.user.id,
        pw: this.user.password
      })
      .then( response => { 
        if (response.data.success) {
          this.$router.push({ path: '/home/' + response.data.token })
          this.$emit('onLogin', response.data.token)
        } else {
          alert('아이디 또는 비밀번호가 틀렸습니다.')
        }
      })
      .catch( response => { console.log(response) });
    }
  }
}
</script>

<style lang="scss">
#login {
  width: 100%;
  height: 100%;
  position: absolute;
  .login__form {
    position: absolute;
    width: 460px;
    height: 440px;
    left: 50%;
    text-align: right;
    top: calc(20% - 50px);
    -webkit-transform: translate(-50%, -20%);
      -moz-transform: translate(-50%, -20%);
        -ms-transform: translate(-50%, -20%);
        -o-transform: translate(-50%, -20%);
            transform: translate(-50%, -20%);
    .register__go {
      text-decoration: none;
      font-size: 13pt;
      color: black;
      &:hover {
        color: gray;
      }
    }
    img {
      display: block;
      width: 150px;
      margin: auto;
      margin-bottom: 50px;
    }
    input {
      display: inline-block;
      width: calc(100% - 52px);
      margin: 0 0 14px;
      height: 29px;
      padding: 10px 35px 10px 15px;
      border: solid 1px #dadada;
      font-size: 12pt;
    }
    button {
      cursor: pointer;
      width: 100%;
      border: none;
      color: white;
      height: 61px;
      font-size: 20pt;
      background: linear-gradient(90deg , #FF7762, #FF54B1) no-repeat;
      margin: 0 auto;
      margin-bottom: 10px;
    }
  }
}

</style>