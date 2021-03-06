<template>
  <div class="flap-card-visible" v-show="flapCardVisible">
    <div class="flap-card-bg" :class="{'animation': runFlapCardAnimation}" v-show="runFlapCardAnimation">
      <div class="flap-card" v-for="(item, index) in flapCardList" :key="index" :style="{zIndex:item.zIndex}">
        <div class="point-wrapper">
          <div class="point" v-for="item in pointList" :key="item" :class="{'animation':runPointAnimation}"></div>
        </div>
        <div class="flap-card-circle">
          <div
            class="flap-card-semi-circle flap-card-semi-circle-left"
            :style="semiCircleStyle(item,'left')"
            ref="left"
          ></div>
          <div
            class="flap-card-semi-circle flap-card-semi-circle-right"
            :style="semiCircleStyle(item,'right')"
            ref="right"
          ></div>
        </div>
      </div>
    </div>
    <div class="book-card" :class="{'animation': runBookCardAnimation}" v-show="runBookCardAnimation">
      <div class="book-card-wrapper">
        <div class="img-wrapper">
          <img class="img" :src="data.cover">
        </div>
        <div class="content-wrapper">
          <div class="title">{{data.title}}</div>
          <div class="author sub-title-medium">{{data.author}}</div>
          <div class="category">{{categoryText()}}</div>
        </div>
        <div class="read-btn" @click.stop="showBookDetail(data)">{{$t('home.readNow')}}</div>
      </div>
    </div>
    <div class="close-btn-wrapper">
      <div class="icon-close" @click="close"></div>
    </div>
  </div>
</template>

<script>
    import { storeHomeMixin } from '../../utils/mixin'
    import { flapCardList, categoryText } from '../../utils/store'

    export default {
        mixins: [storeHomeMixin],
        data () {
            return {
                flapCardList,
                front: 0,
                back: 1,
                runFlapCardAnimation: false,
                pointList: null,
                runPointAnimation: false,
                runBookCardAnimation: false
            }
        },
        props: {
          data: {
              type: Object,
              default: null
          }
        },
        watch: {
            flapCardVisible (v) {
                if (v) {
                    this.runAnimation()
                }
            }
        },
        created () {
          this.pointList = []
          for (let i = 0; i < 18; i++) {
              this.pointList.push(`point${i}`)
          }
        },
        methods: {
            categoryText () {
                if (this.data) {
                    categoryText(this.data.category, this)
                }
            },
            semiCircleStyle (item, position) {
                return {
                    backgroundColor: `rgb(${item.r},${item.g},${item.b})`,
                    backgroundSize: item.backgroundSize,
                    backgroundImage: position === 'left' ? item.imgLeft : item.imgRight
                }
            },
            close () {
                this.setFlapCardVisible(false)
                this.stopAnimation()
                if (this.timeout1) {
                    clearInterval(this.timeout1)
                }
                if (this.timeout2) {
                    clearInterval(this.timeout2)
                }
            },
            rotate (index, type) {
                const item = this.flapCardList[index]
                let dom
                if (type === 'front') {
                    dom = this.$refs.right[index]
                } else {
                    dom = this.$refs.left[index]
                }
                dom.style.transform = `rotateY(${item.rotateDegree}deg)`
                dom.style.backgroundColor = `rgb(${item.r},${item._g},${item.b})`
            },
            flapCardRotate () {
                const frontCardItem = this.flapCardList[this.front]
                const backCardItem = this.flapCardList[this.back]
                frontCardItem.rotateDegree += 10
                frontCardItem._g -= 5
                backCardItem.rotateDegree -= 10
                if (backCardItem.rotateDegree < 90) {
                    backCardItem._g += 5
                }
                if (frontCardItem.rotateDegree === 90 && backCardItem.rotateDegree === 90) {
                    backCardItem.zIndex += 2
                }
                this.rotate(this.front, 'front')
                this.rotate(this.back, 'back')
                if (frontCardItem.rotateDegree === 180 && backCardItem.rotateDegree === 0) {
                    this.next()
                }
            },
            next () {
                const frontCardItem = this.flapCardList[this.front]
                const backCardItem = this.flapCardList[this.back]
                frontCardItem.rotateDegree = 0
                backCardItem.rotateDegree = 0
                frontCardItem._g = frontCardItem.g
                backCardItem._g = backCardItem.g
                this.rotate(this.front, 'front')
                this.rotate(this.back, 'back')
                this.front++
                this.back++
                const len = this.flapCardList.length
                if (this.front >= len) {
                    this.front = 0
                }
                if (this.back >= len) {
                    this.back = 0
                }
                this.flapCardList.forEach((item, index) => {
                    item.zIndex = 100 - ((index - this.front + len) % len)
                })
                this.prepare()
            },
            prepare () {
                const backCardItem = this.flapCardList[this.back]
                backCardItem.rotateDegree = 180
                backCardItem._g = backCardItem.g - 45
                this.rotate(this.back, 'back')
            },
            startFlapCardAnimation () {
                this.prepare()
                this.task = setInterval(() => {
                    this.flapCardRotate()
                }, 20)
            },
            stopAnimation () {
                this.runFlapCardAnimation = false
                this.reset()
                if (this.task) {
                    clearInterval(this.task)
                }
            },
            startPointAnimation () {
                this.runPointAnimation = true
                setTimeout(() => {
                    this.runPointAnimation = false
                }, 750)
            },
            reset () {
                this.front = 0
                this.back = 1
                this.flapCardList.forEach((item, index) => {
                    item.zIndex = 100 - index
                    item._g = item.g
                    item.rotateDegree = 0
                    this.rotate(index, 'front')
                    this.rotate(index, 'back')
                })
                this.runBookCardAnimation = false
                this.runFlapCardAnimation = false
                this.runPointAnimation = false
            },
            runAnimation () {
                this.runFlapCardAnimation = true
                this.timeout1 = setTimeout(() => {
                    this.startFlapCardAnimation()
                    this.startPointAnimation()
                }, 300)
                this.timeout2 = setTimeout(() => {
                    this.stopAnimation()
                    this.runBookCardAnimation = true
                }, 2500)
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "../../assets/style/global";
  @import "../../assets/style/flapCard";
  .flap-card-visible {
    width: 100%;
    height: 100%;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.6);
    @include center;
    @include absCenter;
    .flap-card-bg{
      position: relative;
      width: px2rem(64);
      height: px2rem(64);
      border-radius: px2rem(5);
      background: white;
      scale: 0;
      opacity: 0;
      &.animation{
        animation: show-flap-card .3s ease-in both;
      }
      @keyframes show-flap-card {
        0% {
          transform: scale(0);
          opacity: 0;
        }
        50% {
          transform: scale(1.2);
          opacity: 1;
        }
        75% {
          transform: scale(0.9);
          opacity: 1;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
      .flap-card{
        width: px2rem(48);
        height: px2rem(48);
       @include absCenter;
        .flap-card-circle{
          display: flex;
          height: 100%;
          width: 100%;
          .flap-card-semi-circle{
            flex: 0 0 50%;
            height: 100%;
            width: 50%;
            background-repeat: no-repeat;
            backface-visibility: hidden;
          }
          .flap-card-semi-circle-left{
            border-radius: px2rem(24) 0 0 px2rem(24);
            transform-origin: right;
            background-position: center right;

          }
          .flap-card-semi-circle-right{
            border-radius: 0 px2rem(24) px2rem(24) 0;
            transform-origin: left;
            background-position: center left;
          }
        }
        .point-wrapper{
          @include absCenter;
          z-index: 1100;
          .point{
            border-radius: 50%;
            @include absCenter;
            &.animation {
              @for $i from 1 to length($moves) {
                &:nth-child(#{$i}) {
                  @include move($i)
                }
              }
            }
          }
        }
      }
    }
    .book-card {
      position: relative;
      width: 65%;
      max-width: px2rem(400);
      // height: 70%;
      box-sizing: border-box;
      border-radius: px2rem(15);
      background: white;
      &.animation {
        animation: scale .3s ease-in both;
        @keyframes scale {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      }
      .book-card-wrapper {
        width: 100%;
        height: 100%;
        margin-bottom: px2rem(30);
        @include columnTop;
        .img-wrapper {
          width: 100%;
          margin-top: px2rem(20);
          @include center;
          .img {
            width: px2rem(90);
            height: px2rem(130);
          }
        }
        .content-wrapper {
          padding: 0 px2rem(20);
          margin-top: px2rem(20);
          .title {
            color: #333;
            font-weight: bold;
            font-size: px2rem(18);
            line-height: px2rem(20);
            max-height: px2rem(40);
            text-align: center;
            @include ellipsis2(2)
          }
          .author {
            margin-top: px2rem(10);
            text-align: center;
          }
          .category {
            color: #999;
            font-size: px2rem(14);
            margin-top: px2rem(10);
            text-align: center;
          }
        }
        .read-btn {
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 1100;
          width: 100%;
          border-radius: 0 0 px2rem(15) px2rem(15);
          padding: px2rem(15) 0;
          text-align: center;
          color: white;
          font-size: px2rem(14);
          background: $color-blue;
        }
      }
    }
    .close-btn-wrapper{
      position: absolute;
      left: 0;
      bottom: px2rem(30);
      width: 100%;
      z-index: 1001;
      @include center;
      .icon-close {
        width: px2rem(45);
        height: px2rem(45);
        border-radius: 50%;
        background: #333;
        color: white;
        font-size: px2rem(25);
        @include center;
      }
    }
  }
</style>
