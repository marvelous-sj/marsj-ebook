<template>
  <div class="flap-card-visible" v-show="flapCardVisible">
    <div class="flap-card-bg">
      <div class="flap-card" v-for="(item, index) in flapCardList" :key="index" :style="{zIndex:item.zIndex}">
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
    <div class="close-btn-wrapper">
      <div class="icon-close" @click="close"></div>
    </div>
  </div>
</template>

<script>
    import { storeHomeMixin } from '../../utils/mixin'
    import { flapCardList } from '../../utils/store'

    export default {
        mixins: [storeHomeMixin],
        data () {
            return {
                flapCardList,
                front: 0,
                back: 1
            }
        },
        watch: {
            flapCardVisible (v) {
                if (v) {
                    this.startFlapCardAnimation()
                }
            }
        },
        methods: {
            semiCircleStyle (item, position) {
                return {
                    backgroundColor: `rgb(${item.r},${item.g},${item.b})`,
                    backgroundSize: item.backgroundSize,
                    backgroundImage: position === 'left' ? item.imgLeft : item.imgRight
                }
            },
            close () {
                this.stopAnimation()
                this.setFlapCardVisible(false)
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
                    this.back = 1
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
                this.reset()
                if (this.task) {
                    clearInterval(this.task)
                }
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
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "../../assets/style/global";

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
