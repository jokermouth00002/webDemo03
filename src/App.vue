<template lang='pug'>
  div#app
    Loading(v-if='showLoading', :loadingTime='loadingTime')
    div(v-else)
      div.header
        div.logo
          div.circle
      //- div.menu 123
      //- <router-link to="/loading">loading</router-link>
      router-view
      div.footer
        div Calling 0123456789
        div ChrisTsao@gmail.com
        div 台北市一區二路三巷四號
        div 2020 Created by ChrisTsao
        div 僅個人練習,無商業用途

</template>
<script>
import Loading from '@/pages/Loading.vue'
const loadingTime = process.env.NODE_ENV.match('production') ? 4500 : 800
export default {
  components: {
    Loading
  },
  data() {
    return {
      showLoading: true,
      ms: null,
      loadingTime
    }
  },
  computed: {},
  methods: {
    goHomePage() {
      this.$router.push('back')
    }
  },
  created() {
    window.app = this
    this.$bus.$on('closeLoading', () => {
      this.showLoading = false
      this.$bus.$emit('openHomeShowUp')
    })
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: black;
}
.loading {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0%;
  background-color: black;
  .boxContainer {
    display: flex;
    height: 50%;
    align-items: flex-end;
    justify-content: center;
    color: white;
    position: relative;
  }
  .box::before {
    content: '';
    position: relative;
    z-index: 2;
    top: 60px;
    width: 100px;
    height: 100px;
    background: white;
    border-radius: 2px;
    transform: rotate(45deg);
    -webkit-animation: box 0.8s infinite;
    display: flex;
  }
  .progressContainer {
    height: 50%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    padding-right: 5rem;
    padding-bottom: 5rem;
    .title {
      color: white;
      font-size: 2rem;
    }
    .title:after {
      content: '';
      position: absolute;
      height: 2px;
      right: 0;
      width: 100%;
      left: 0;
      background-color: white;
      border: 1rpx solid;
    }
    .percent {
      color: white;
      font-size: 2rem;
      position: relative;
      left: 1.5rem;
    }
  }
}
.header {
  height: 15vh;
  display: flex;
  justify-content: space-between;
  padding: 5vh;
  background-color: black;
  .logo {
    width: 50px;
    height: 50px;
    border-radius: 999rem;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    .circle {
      width: 25px;
      height: 25px;
      border-radius: 999rem;
      background-color: black;
    }
  }
}

.footer {
  background-color: black;
  height: 40vh;
  padding-top: 15vh;
  color: white;
}
</style>
