<template>
  <div class="home">
    <div class="home__box">
      <div class="home__user">
        <img src="@/assets/home/profile.svg">
        <span class="home__user__name">{{ myname }}</span>
        <div class="home__user__item">
          <div class="home__user__item__date">{{ date }}</div>
          <div class="home__user__item__dday">
            <b style="font-size: 27pt">{{ yourname }}</b>님과의 첫 만남</div>
        </div>
      </div>
      <div class="home__dday">
        <img src="@/assets/home/heart.svg">
        <div class="home__dday__text"><b style="font-size: 27pt">{{ yourname }}</b>님과</div>
        <div class="home__dday__date">D+{{ dDay }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: ['token'],
  data() {
    return {
      yourname: '',
      yourtoken: '',
      myname: '',
      date: '',
      dDay: ''
    }
  },
  created() {
    axios.post('http://192.168.43.249:3000/reg/info', {
        token: this.token
      })
      .then( response => {        
        this.yourtoken = response.data.data.meet
        this.myname = response.data.data.username
        axios.post('http://192.168.43.249:3000/reg/info', {
        token: this.yourtoken
        })
        .then( response => {
          this.yourname = response.data.data.username
        })
        .catch( response => { console.log(response) })
      })
      .catch( response => { console.log(response) })
    axios.post('http://192.168.43.249:3000/reg/getWhen', {
        token: this.token
        })
        .then( response => {
          this.date = response.data.data
          let then = this.date.split('/')
          let now = new Date()
          let dday = new Date(then[0], then[1] - 1, then[2])
          let gap = dday.getTime() - now.getTime()
          gap = Math.floor(gap / (1000 * 60 * 60 * 24))
          this.dDay = ~gap
        })
        .catch( response => { console.log(response) })
  }
}
</script>

<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  position: absolute;
  &__box {
    width: 630px;
    height: 260px;
    margin: 0 auto;
    margin-top: 170px;
  }
  &__dday {
    width: 200px;
    height: 260px;
    background: rgba(253, 125, 196, 0.438);
    border-radius: 15px;
    display: inline-block;
    text-align: center;
    img {
      width: 90px;
      margin-top: 30px;
    }
    &__text {
      margin-top: 10px;
      color: white;
      font-size: 17pt;
    }
    &__date {
      color: white;
      font-size: 25px;
      font-weight: 600;
    }
  }
  &__user {
    width: 350px;
    height: 200px;
    background: rgba(253, 125, 196, 0.438);
    border-radius: 15px;
    display: block;
    float: left;
    margin-right: 20px;
    padding: 30px;
    img {
      width: 100px;
    }
    &__name {
      color: white;
      position: absolute;
      margin-top: 30px;
      margin-left: 20px;
      font-size: 28pt;
      font-weight: bold;
    }
    &__item {
      margin-top: 20px;
      color: white;
      &__date {
        font-size: 20pt;
      }
      &__dday {
        font-size: 13pt;
      }
    }
  }
  &__date {
    display: inline-block;
    width: 250px;
    height: 300px;
    background: rgba(255, 123, 196, 0.438);
    border-radius: 10px;
  }
}

</style>