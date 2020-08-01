<template lang='pug'>
  div.singerPage
    div.CDRow(v-if='items.length>0')
      div.previousCD(@click='previousSinger')
      div.CD
        img(:class='{rotate:rotateActive}',:src='items[nowSingerId].cdSrc')
        div.circle
      div.nextCD(@click='nextSinger')
    div(v-if='items.length>0')
      div.singerSongs(v-for='item in items[nowSingerId].songs')
        div.songName(:class='{green:isPlaying(item.id)}') {{item.name}}
    div.playerContainer
      div.previousCD(@click='previousSong')
      CDPlayer(:songSrc='selectedSong')
      div.nextCD(@click='nextSong')
</template>
<script>
import Aplayer from 'vue-aplayer'
import CDPlayer from '@/components/CDPlayer.vue'
// import CDPlayer from './CDPlayer.vue'
// import CDPlayer from '../CDPlayer.vue'
export default {
  components: {
    Aplayer,
    CDPlayer
  },
  data() {
    return {
      items: [],
      selectedSongIndex: 0,
      nowSingerId: 0,
      rotateActive: false
    }
  },
  props: ['singerId'],
  created() {
    window.singerPage = this
    this.$api.get('post1').then(res => {
      res.data.forEach(element => {
        this.items.push(element)
      })
    })
    this.nowSingerId = this.singerId
    this.$bus.$on('CDRotateOff', () => {
      this.rotateActive = false
    })
    this.$bus.$on('CDRotateOn', () => {
      this.rotateActive = true
    })
    this.$bus.$emit('backToHomePage')
  },
  computed: {
    selectedSong() {
      return this.$try(() => {
        return `/music/${
          this.items[this.nowSingerId].songs[this.selectedSongIndex].src
        }`
      })
    }
  },
  methods: {
    previousSinger() {
      if (this.nowSingerId > 0) {
        this.nowSingerId -= 1
        this.selectedSongIndex = 0
      }
    },
    nextSinger() {
      if (this.nowSingerId < 2) {
        this.nowSingerId += 1
        this.selectedSongIndex = 0
      }
    },
    previousSong() {
      if (this.selectedSongIndex > 0) {
        this.selectedSongIndex -= 1
        this.rotateActive = false
      }
    },
    nextSong() {
      if (
        this.selectedSongIndex <
        this.items[this.nowSingerId].songs.length - 1
      ) {
        this.rotateActive = false
        this.selectedSongIndex += 1
      }
    },
    isPlaying(songId) {
      if (songId === this.selectedSongIndex) {
        return true
      }
    }
  }
}
</script>
<style scoped lang='scss'>
.singerPage {
  width: 100%;
  height: 100%;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  .CDRow {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .nextCD {
      cursor: pointer;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 35px 0 35px 40px;
      border-color: transparent transparent transparent white;
      position: relative;
      left: 20px;
    }
    .previousCD {
      cursor: pointer;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 35px 40px 35px 0;
      border-color: transparent white transparent transparent;
      position: relative;
      right: 20px;
    }
    .CD {
      width: 20rem;
      height: 20rem;
      border-radius: 999rem;
      background-image: 'https://i.imgur.com/260Qe5p.jpg';
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        height: 100%;
        border-radius: 999rem;
        z-index: 0;
      }
      .rotate {
        animation: rotate 5s infinite linear;
      }
      .circle {
        width: 2rem;
        height: 2rem;
        border-radius: 999rem;
        background-color: black;
        position: absolute;
        z-index: 2;
      }
    }
  }
  .playerContainer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .nextCD {
      cursor: pointer;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 10px 0 10px 20px;
      border-color: transparent transparent transparent white;
      position: relative;
      left: 20px;
    }
    .previousCD {
      cursor: pointer;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 10px 20px 10px 0;
      border-color: transparent white transparent transparent;
      position: relative;
      right: 20px;
    }
  }
  .singerSongs {
    .songName {
      font-size: 20px;
    }
    .green {
      color: yellowgreen;
    }
  }
  @keyframes rotate {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(-360deg);
    }
  }
  @media (max-width: 767px) {
    .CDRow {
      .CD {
        width: 15rem;
        height: 15rem;
      }
      .nextCD {
        display: none;
      }
      .previousCD {
        display: none;
      }
    }
  }
  @media (min-width: 1024px) {
    .CDRow {
      .CD {
        width: 25rem;
        height: 25rem;
      }
    }
  }
}
</style>
