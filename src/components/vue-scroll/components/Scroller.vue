
<template>
  <div class="_v-container"  ref="outside"
    @touchstart="touchStart($event)"
    @touchmove="touchMove($event)"
    @touchend="touchEnd($event)"
    @mousedown="mouseDown($event)"
    @mousemove="mouseMove($event)"
    @mouseup="mouseUp($event)"
  >
    <div class="_v-content"  ref="inside" :type="type">
      <div v-if="onRefresh" class="pull-to-refresh-layer"
        :class="{'active': state == 1, 'active refreshing': state == 2}"
      >
        <span class="spinner-holder">
          <arrow class="arrow" :fillColor="refreshLayerColor" v-if="state != 2"></arrow>

          <span class="text" v-if="state != 2" :style="{color: refreshLayerColor}" v-text="refreshText"></span>

          <span v-if="state == 2">
            <slot name="refresh-spinner">
              <spinner :style="{fill: refreshLayerColor, stroke: refreshLayerColor}"></spinner>
            </slot>
          </span>
        </span>
      </div>

      <slot></slot>

      <div v-show="showInfiniteLayer && isLoadingMore" class="loading-layer" >
        <div class="loading-box" v-if="showLoading">
            <span class="spinner-holder" :class="{'active': showLoading}">
              <slot name="infinite-spinner">
                <spinner :style="{fill: loadingLayerColor, stroke: loadingLayerColor}"></spinner>
              </slot>
            </span>
              <div class="word">
                  {{loadingText}}
              </div>
        </div>
        <div class="no-data-text"
          :class="{'active': !showLoading && loadingState == 2}" :style="{color: loadingLayerColor}"
          v-text="noDataText">
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import './scoll.less';
</style>
<script>
/* eslint-disable */
  import Scroller from '../module/core'
  import getContentRender from '../module/render'
  import Spinner from './Spinner.vue'
  import Arrow from './Arrow.vue'
  import ScrollMixns from '../mixins'

  export default {
    name:'scroller',
    mixins: [ScrollMixns],
    components: {
      Spinner,
      Arrow
    },

    props: {
     isTab: {
         type: Boolean,
         default: false,
     },
     isLitTab: {
         type: Boolean,
         default: false
     }
    },
    mounted () {
      this.container = this.$refs.outside
      if (!this.container) {
          return
      }
      this.container.style.width = this.w
      this.container.style.height = this.h

      this.content = this.$refs.inside
      if (this.cssClass) this.content.classList.add(this.cssClass)
      this.pullToRefreshLayer = this.content.getElementsByTagName("div")[0]

      let render = getContentRender(this.content)
      let scrollerOptions = {
        scrollingX: false
      }
      this.scroller = new Scroller(render, {
        scrollingX: false,
        snapping: this.snapping,
        animating: this.animating,
        animationDuration: this.animationDuration,
        bouncing: this.bouncing,
        type: this.type
      })

      // enable PullToRefresh
      if (this.onRefresh) {
        this.scroller.activatePullToRefresh(60, () => {
          this.state = 1

        }, () => {
          this.state = 0

        }, () => {
          this.state = 2
          // this.$on('$finishPullToRefresh', () => {
          //   setTimeout(() => {
          //     this.state = 0
          //     this.finishPullToRefresh()
          //   })
          // })

          this.onRefresh(this.finishPullToRefresh)
        })
      }

      // enable infinite loading
      if (this.onInfinite && this.isLoadingMore) {

        this.infiniteTimer = setInterval(() => {
          let {left, top, zoom} = this.scroller.getValues()

          // 在 keep alive 中 deactivated 的组件长宽变为 0
          if (this.content.offsetHeight > 0 &&
            top + 60 > this.content.offsetHeight - this.container.clientHeight) {
            if (this.loadingState) return
            this.loadingState = 1
            this.showLoading = true
            if(!this.isLoadingMore){
                 return;
            }
            this.onInfinite(this.finishInfinite)
          }
        }, 10);
      }

      // setup scroller
      let rect = this.container.getBoundingClientRect()
      this.scroller.setPosition(rect.left + this.container.clientLeft, rect.top + this.container.clientTop)

      // snapping
      if (this.snapping) {
        // console.log(this.snapWidth, this.snapHeight)
        this.scroller.setSnapSize(this.snapWidth, this.snapHeight)
      }

      // onContentResize
      const contentSize = () => {
        return {
          width: this.content.offsetWidth,
          height: this.content.offsetHeight
        }
      }

      let { content_width, content_height } = contentSize()

      this.resizeTimer = setInterval(() => {
        let {width, height} = contentSize()
        if (width !== content_width || height !== content_height) {
          content_width = width
          content_height = height
          this.resize()
        }
      }, 10);
      this.scroller.on('scroll', (value)=>{
        this.$emit('scroll', value);
      })
      this.scroller.on('end',(value)=>{
        this.$emit('end', value);
      })

    },



  }
</script>
