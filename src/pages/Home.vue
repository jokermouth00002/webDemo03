<template lang='pug'>
  div.singersContainer(style='display:flex;flex-direction:column')
    div.picContainer(name='singerPic',tag='div',:class='{close:OffPicContainer}')
      .singers(
        v-for='(singer, i) in singers',
        :key='singer.id',
        @mouseover='singer.showInfo=false',
        @mouseleave='singer.showInfo=true',
        @click='selectedSinger($event, i)',
        ref ='refSingers',
        )
          div.picBox(style='padding:25px')
            div.name(v-if='!singer.showInfo') {{singer.name}}
            img.pic(v-if='singer.showInfo',:src='singer.src')
    div.videoContainer(v-if='showYoutubeVideo',style='height:80vh')
      .mask
      iframe#Video(width='100%',height='100%',
        :src='"https://www.youtube.com/embed/"+videoIDs[seletedIndex]+"?rel=0&amp&autoplay=1&controls=0&showinfo=0"',
        frameborder=0,allow='autoplay; encrypted-media' allowfullscreen,
          )
      div.videoOption
        div(@click='backSingersSelect($event)') Back
        div(@click='goSingerPage') Next Step
    div.audioContainer
      SingerSongs(v-if='showSingerPage',:singerId='seletedIndex')
      div.buttonContainer
        div.backbutton(v-if='showSingerPage',@click='backSingersSelect($event)')
          div back

</template>

<script>
// import { prototype } from 'vue/types/umd'
// @ is an alias to /src
import SingerSongs from '@/components/SingerSongs.vue'

export default {
  data() {
    return {
      singers: [],
      show: true,
      OffPicContainer: false,
      showYoutubeVideo: false,
      showSingerPage: false,
      videoIDs: ['UqyT8IEBkvY', 'bAFo6IIV03M', 'VPSoNx1gyQ4'],
      seletedTarget: {},
      seletedIndex: 0
      // singersTargets: this.getTargets()
    }
  },
  created() {
    window.home = this
  },
  mounted() {
    this.$api
      .get('/post1')
      .then(res => {
        this.singers = res.data.map(element => {
          return {
            name: element.title,
            src: element.picSrc1,
            id: element.id,
            showInfo: true
          }
        })
      })
      .catch(e => {
        console.error(e)
      })
      .then(() => {
        this.$nextTick(() => {
          this.singersAnimation.showUp()
        })
      })
  },
  computed: {
    singersAnimation() {
      const anime = this.$anime
      let onClickFadewayAnimating = false
      return {
        showUp: () => {
          anime({
            targets: '.picContainer',
            easing: 'easeInOutExpo',
            duration: 0,
            opacity: [0, 1]
          })
        },
        onClickFadeway: (event, index) => {
          if (onClickFadewayAnimating === true) {
            return
          }
          const duration = 1000
          const easing = 'easeInOutExpo'
          const target = this.$refs.refSingers[index]
          const leftPadding = this.$refs.refSingers[0].offsetLeft
          this.seletedTarget = target
          this.seletedIndex = index
          return anime
            .timeline({
              targets: target,
              translateX: -target.offsetLeft + leftPadding,
              duration,
              easing,
              begin() {
                onClickFadewayAnimating = true
              }
            })
            .add({
              targets: this.$refs.refSingers.filter((_, i) => {
                return index !== i
              }),
              opacity: [1, 0],
              duration,
              easing
            })
            .add({
              targets: target,
              opacity: [1, 0],
              duration,
              easing,
              complete: () => {
                onClickFadewayAnimating = false
              }
            }).finished
        },
        reset: event => {
          const duration = 1000
          anime({
            targets: this.seletedTarget,
            opacity: 1,
            translateX: this.seletedTarget.offsetLeft,
            duration,
            easing: 'easeInOutExpo'
          })
          anime({
            targets: this.$refs.refSingers.filter((_, i) => {
              return this.seletedIndex !== i
            }),
            opacity: [0, 1],
            duration,
            easing: 'easeInOutExpo'
          })
        }
      }
    }
  },
  methods: {
    selectedSinger(event, index, func) {
      this.singersAnimation.onClickFadeway(event, index).then(() => {
        this.OffPicContainer = true
        this.showYoutubeVideo = true
      })
    },
    backSingersSelect(event) {
      this.OffPicContainer = false
      this.showYoutubeVideo = false
      this.showSingerPage = false
      this.singersAnimation.reset(event)
    },
    goSingerPage() {
      this.OffPicContainer = true
      this.showYoutubeVideo = false
      this.showSingerPage = true
    }
  },
  components: {
    SingerSongs
  }
}
</script>
<style scoped lang='scss'>
.singersContainerHeightAuto {
  height: inherit;
}
.singersContainer {
  background-color: black;
  .picContainer {
    height: 80vh;

    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 3vh;
    opacity: 0;
    &.close {
      width: 0;
      padding: 0;
      height: 0;
      display: none;
    }
    .singers {
      cursor: pointer;
      width: 30%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;
      font-size: 3rem;
      position: relative;
      .pic {
        width: 90%;
      }
    }
  }
  .videoContainer {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    .mask {
      width: 100%;
      height: 100%;
      display: flex;
      z-index: 2;
      position: absolute;
    }
    .videoOption {
      color: white;
      border-style: solid;
      border-width: 1px;
      position: absolute;
      z-index: 3;
      div {
        cursor: pointer;
      }
    }
  }
  .audioContainer {
    display: flex;
    flex-direction: column;
    .buttonContainer {
      height: 10vh;
      display: flex;
      justify-content: center;
      align-items: center;
      .backbutton {
        color: white;
        width: 75px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 1rem;
        border-style: solid;
        border-width: 1px;
        position: absolute;
        cursor: pointer;
      }
    }
  }

  @media (max-width: 1025px) {
    .videoOption {
      position: absolute;
      bottom: 34%;
    }
    .videoContainer {
      .mask {
        z-index: -1;
      }
    }
    .singers {
      .name {
        font-size: 18px;
      }
    }
  }
}
</style>
