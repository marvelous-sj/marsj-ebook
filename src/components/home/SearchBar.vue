<template>
  <div>
    <div class="search-bar" :class="{'hide-title':!titleVisible,'hide-shadow':!shadowVisible}">
      <transition name="title-move">
        <div class="search-bar-title-wrapper" v-show="titleVisible">
          <div class="title-text-wrapper">
            <span class="title-text title">{{$t('home.title')}}</span>
          </div>
          <div class="title-icon-shake-wrapper" @click="showFlapCard">
            <span class="icon-shake icon"></span>
          </div>
        </div>
      </transition>
      <div class="title-icon-back-wrapper" :class="{'hide-title':!titleVisible}" @click="back">
        <span class="icon-back icon" ></span>
      </div>
      <div class="search-bar-input-wrapper" :class="{'hide-title':!titleVisible}">
        <div class="search-bar-block" :class="{'hide-title':!titleVisible}"></div>
        <div class="search-bar-input">
          <span class="icon-search icon"></span>
          <input
            class="input"
            type="text"
            v-model="searchText"
            :placeholder="$t('home.hint')"
            @click="showHotSearch"
            @keyup.13.exact="doSearch">
        </div>
      </div>
    </div>
    <hot-search-list v-show="hotSearchVisible" ref="hotSearch"></hot-search-list>
  </div>
</template>

<script>
  import { storeHomeMixin } from '../../utils/mixin'
  import HotSearchList from './HotSearchList'

  export default {
    name: 'SearchBar',
    components: { HotSearchList },
    mixins: [storeHomeMixin],
    data () {
      return {
        searchText: '',
        titleVisible: true,
        shadowVisible: false,
        hotSearchVisible: false
      }
    },
    watch: {
      offsetY (offsetY) {
        if (offsetY > 0) {
          this.hideTitle()
          this.showShadow()
        } else {
          this.showTitle()
          this.hideShadow()
        }
      },
      hotSearchOffsetY (offsetY) {
        if (offsetY > 0) {
          this.showShadow()
        } else {
          this.hideShadow()
        }
      }
    },
    methods: {
      doSearch () {
            this.$router.push({
                path: '/store/list',
                query: {
                    keyword: this.searchText
                }
            })
      },
      showFlapCard () {
        this.setFlapCardVisible(true)
      },
      back () {
        if (this.offsetY > 0) {
          this.showShadow()
        } else {
          this.hideShadow()
        }
        if (this.hotSearchVisible) {
          this.hideHotSearch()
        } else {
          this.$router.push('/store/shelf')
        }
      },
      showHotSearch () {
        this.hideTitle()
        this.hotSearchVisible = true
        this.hideShadow()
        this.$nextTick(() => {
          this.$refs.hotSearch.reset()
        })
      },
      hideHotSearch () {
        if (this.offsetY > 0) {
          this.hideTitle()
          this.showShadow()
        } else {
          this.showTitle()
          this.hideShadow()
        }
        this.hotSearchVisible = false
      },
      hideTitle () {
        this.titleVisible = false
      },
      showTitle () {
        this.titleVisible = true
      },
      hideShadow () {
        this.shadowVisible = false
      },
      showShadow () {
        this.shadowVisible = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/style/global';
  .search-bar {
    position: relative;
    width:100%;
    z-index: 150;
    height: px2rem(94);
    box-shadow: 0 px2rem(2) px2rem(2) rgba(0,0,0,.1);
    &.hide-title{
      height: px2rem(52);
    }
    &.hide-shadow{
      box-shadow: none;
    }
    .search-bar-title-wrapper {
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      height: px2rem(42);
      .title-text-wrapper{
        width: 100%;
        height: px2rem(42);
        @include center;
      }
      .title-icon-shake-wrapper{
        position: absolute;
        top: 0;
        right: px2rem(15);
        height: px2rem(42);
        @include center;
      }
    }
    .title-icon-back-wrapper{
      position: absolute;
      top: 0;
      z-index: 151;
      left: px2rem(15);
      height: px2rem(42);
      @include center;
      transition: height $transitionTime $transitionType;
      &.hide-title{
        height: px2rem(52)
      }
    }
    .search-bar-input-wrapper{
      position: absolute;
      left: 0;
      display: flex;
      top: px2rem(42);
      width:100%;
      height: px2rem(52);
      padding: px2rem(10);
      box-sizing: border-box;
      transition: top $transitionTime $transitionType;
      &.hide-title {
        top: 0;
      }
      .search-bar-block{
        flex: 0 0 0;
        width: 0;
        transition: all $transitionTime $transitionType;
        &.hide-title {
          flex: 0 0 px2rem(41);
          width: px2rem(41);
        }
      }
      .search-bar-input{
        width:100%;
        border-radius: px2rem(20);
        background: #f4f4f4;
        padding: px2rem(5) px2rem(15);
        box-sizing: border-box;
        border: px2rem(1) solid #eee;
        @include left;
        .icon-search{
          color: #999;
        }
        .input{
          width:100%;
          height: px2rem(22);
          margin-left: px2rem(10);
          font-size: px2rem(12);
          color: #666;
          background: transparent;
          border: none;
          &:focus{
            outline: transparent;
          }
          &::-webkit-input-placeholder{
            color: #ccc;
          }
        }
      }
    }
  }
</style>
