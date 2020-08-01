<template lang='pug'>
  div.singersContainer
    div.picContainer(:class='{close:OffPicContainer}',name='singerPic',tag='div')
      .singers(
        v-for='(singer, i) in singers',
        :key='singer.id',
        @mouseover='singer.showInfo=false',
        @mouseleave='singer.showInfo=true',
        @click='selectedSinger($event, i)',
        ref ='refSingers',
        )
        div.name(v-if='singer.showInfo') {{singer.name}}
        img.pic(v-if='!singer.showInfo',:src='singer.src')
    div.youtubeVedioContainer(v-if='showYoutubeVedio')
      div.mask
      iframe#vedio(width='100%',height='100%',
      :src='"https://www.youtube.com/embed/"+videoIDs[seletedIndex]+"?rel=0&amp&autoplay=1&controls=0&showinfo=0"',
      frameborder=0,allow='autoplay; encrypted-media' allowfullscreen,
        )
      div.videoOption
        div(@click='backSingersSelect($event)') Back
        div(@click='goSingerPage') Next Step
    SingerSongs(v-if='showSingerPage',:singerId='seletedIndex')
    div.backContainer(v-if='showSingerPage',@click='backSingersSelect($event)')
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
      showYoutubeVedio: false,
      showSingerPage: false,
      videoIDs: ['UqyT8IEBkvY', 'bAFo6IIV03M', 'VPSoNx1gyQ4'],
      seletedTarget: {},
      seletedIndex: 0
      // singersTargets: this.getTargets()
    }
  },
  created() {
    window.home = this
    this.$api.get('post1').then(res => {
      this.singers = res.data.map(element => {
        return {
          name: element.title,
          src: element.picSrc1,
          id: element.id,
          showInfo: true
        }
      })
    })
  },
  mounted() {
    setTimeout(() => {
      this.singersAnimation.showUp()
    }, 1200)
  },
  computed: {
    singersAnimation() {
      const anime = this.$anime
      let onClickFadewayAnimating = false
      return {
        showUp: () => {
          anime({
            targets: '.singers',
            easing: 'easeInOutExpo',
            duration: 800,
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
        this.showYoutubeVedio = true
      })
    },
    backSingersSelect(event) {
      this.OffPicContainer = false
      this.showYoutubeVedio = false
      this.showSingerPage = false
      this.singersAnimation.reset(event)
    },
    goSingerPage() {
      this.OffPicContainer = true
      this.showYoutubeVedio = false
      this.showSingerPage = true
    }
    // getTargets() {
    //   if (this.$refs.refSingers) {
    //     console.log(123)
    //     return this.$refs.refSingers
    //   } else {
    //     setTimeout(() => {
    //       this.getTargets()
    //     }, 1000)
    //   }
    // }
  },
  components: {
    SingerSongs
  }
}
</script>
<style scoped lang='scss'>
.singersContainer {
  display: flex;
  justify-content: center;
  padding-top: 10vh;
  height: 90vh;
  background-color: black;
  .picContainer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 3vh;
    &.close {
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
      opacity: 0;
    }
  }
  .youtubeVedioContainer {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .mask {
      width: 100%;
      height: 100%;
      z-index: 2;
      position: static;
    }
    .videoOption {
      z-index: 3;
      color: white;
      border-style: solid;
      border-width: 1px;
      position: absolute;
      div {
        cursor: pointer;
      }
    }
    iframe {
      position: absolute;
    }
  }
  .backContainer {
    color: white;
    width: 15%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    border-style: solid;
    border-width: 1px;
    position: absolute;
    bottom: -100px;
    cursor: pointer;
  }
  @media (max-width: 1025px) {
    .videoOption {
      position: absolute;
      bottom: 34%;
    }
    .youtubeVedioContainer {
      .mask {
        z-index: 0;
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
