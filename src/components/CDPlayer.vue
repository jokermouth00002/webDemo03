<template lang="pug">
  div
    audio(ref='audio', @timeupdate='onTimeupdate', :src='songSrc', controls='controls')
    .audio-control
      div
        el-button.playButton(@click='startPlayOrPause') {{ getAudio().paused ? 'Play' : 'Pause' }}
        el-slider.volumeControl.slider(v-model='voice',@change='changeVoice')
      el-slider.slider(v-model='sliderTime', @change='changeCurrentTime')
      div(v-if='maxTime')
        span {{ currentTime | formatSecond }}
        span /
        span {{ maxTime | formatSecond }}
</template>
<script>
function realFormatSecond(second) {
  const secondType = typeof second
  if (secondType === 'number' || secondType === 'string') {
    second = parseInt(second)
    const mimute = Math.floor(second / 60)
    second = second - mimute * 60
    return ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
  } else {
    return '00:00'
  }
}
export default {
  props: ['songSrc'],
  data() {
    return {
      sliderTime: [],
      currentTime: 0,
      maxTime: 0,
      voice: 100
    }
  },
  created() {
    window.CD = this
  },
  methods: {
    getAudio() {
      return this.$refs.audio || {}
    },
    startPlayOrPause() {
      if (this.getAudio().paused) {
        this.$bus.$emit('CDRotateOn')
      } else {
        this.$bus.$emit('CDRotateOff')
      }
      return this.getAudio().paused
        ? this.getAudio().play()
        : this.getAudio().pause()
    },
    onTimeupdate() {
      this.maxTime = this.getAudio().duration
      this.currentTime = this.getAudio().currentTime
      this.sliderTime = parseInt(
        (this.getAudio().currentTime / this.getAudio().duration) * 100
      )
    },
    changeCurrentTime(index) {
      this.currentTime = this.getAudio().currentTime = parseInt(
        (index / 100) * this.getAudio().duration
      )
    },
    changeVoice(index) {
      this.getAudio().volume = parseFloat(index / 100).toFixed(1)
    }
  },
  filters: {
    transPlayPause(value) {
      return value ? 'pause' : 'play'
    },
    formatSecond(second = 0) {
      return realFormatSecond(second)
    }
  }
}
</script>
<style scoped lang='scss'>
audio {
  width: 0;
  height: 0;
}
.audio-control {
  width: 200px;
  color: white;
  div {
    display: flex;
    justify-content: space-around;
    .playButton {
      border-radius: 25%;
      width: 50px;
      display: flex;
      justify-content: center;
    }
    .volumeControl {
      width: 50px;
    }
  }
}
</style>
