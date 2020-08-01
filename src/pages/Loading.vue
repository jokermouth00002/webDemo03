<template lang='pug'>
  div.loadingPage
    div.boxContainer
      div.box
    div.progressContainer
      div.title loading...
      div(style='width:10px')
      div.percent {{percent}}%
</template>

<script>
export default {
  props: {
    loadingTime: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      percentage: 0
    }
  },
  computed: {
    percent() {
      return this.percentage.toFixed()
    }
  },
  created() {
    const intval = setInterval(() => {
      if (this.percentage === 100) {
        this.$bus.$emit('closeLoading')
      }
      if (this.percentage < 100) {
        this.percentage += 1
      } else {
        clearInterval(intval)
      }
    }, this.loadingTime / 120)
  }
}
</script>
<style scoped lang='scss'>
.loadingPage {
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
  @-webkit-keyframes box {
    0% {
      top: 50px;
    }
    20% {
      border-radius: 2px;
    }
    50% {
      top: 80px;
      border-bottom-right-radius: 25px;
    }
    80% {
      border-radius: 2px;
    }
    100% {
      top: 50px;
    }
  }

  @-webkit-keyframes box {
    0% {
      top: 50px;
      transform: rotate(90deg);
    }
    20% {
      border-radius: 2px;
    }
    50% {
      top: 80px;
      transform: rotate(45deg);
      border-bottom-right-radius: 25px;
    }
    80% {
      border-radius: 2px;
    }
    100% {
      top: 50px;
      transform: rotate(0deg);
    }
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
</style>
