<template>
<div class="vuk-across-box" :style="{height:contentHeight}">
  <div class="_v-container _v-container2" :id="containerId"
    @touchstart="touchStart($event)"
    @touchmove="touchMove($event)"
    @touchend="touchEnd($event)"
    @mousedown="mouseDown($event)"
    @mousemove="mouseMove($event)"
    @mouseup="mouseUp($event)"
  >
    <div class="_v-content" :id="contentId" :style="{width:contentWidth}" >
      <slot></slot>
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
  import touchtype from '@/mixins/touchtype'
   import ScrollMixns from '../mixins'
  const re = /^[\d]+(\%)?$/

  const widthAndHeightCoerce = (v) => {
    if (v[v.length - 1] != '%') return v + 'px'
    return v
  }

  const widthAndHeightValidator = (v) => {
    return re.test(v)
  }

  export default {
    mixins: [ScrollMixns, touchtype],
    components: {
      Spinner,
      Arrow
    },

    props: {

      cwidth:{
          type: String,
          default: ''
      },
      unit:{
          type: String,
          default: 'px'
      },
      isTabWrap: {
          type: Boolean,
          default: false
      },
      parnet: ''
    },
    updated(){
         this.getWidith();
    },
    data() {
        return {
            contentHeight: '0px',
            contentWidth: '0px'
        }
    },
    mounted () {
      this.getWidith();
      this.resizes();
      this.container = document.getElementById(this.containerId)
      this.container.style.width = this.w
      this.container.style.height = this.h

      this.content = document.getElementById(this.contentId)
      if (this.cssClass) this.content.classList.add(this.cssClass)
      this.pullToRefreshLayer = this.content.getElementsByTagName("div")[0]

      let render = getContentRender(this.content)

      let scrollerOptions = {
        scrollingX: false
      }

      this.scroller = new Scroller(render, {
        scrollingX: true,
        scrollingY: false,
        snapping: this.snapping,
        animating: this.animating,
        animationDuration: this.animationDuration,
        bouncing: false
      })



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
    },

    destroyed () {
      clearInterval(this.resizeTimer);
      if (this.infiniteTimer) clearInterval(this.infiniteTimer);
    },

    methods: {
        touchStart(e) {
        // Don't react if initial down happens on a form element
        if (e.target.tagName.match(/input|textarea|select/i)) {
          return
        }
        this.scrollType = 0;
        let self = e.targetTouches
        if (self.length <= 1) {
          this.startX = self[0].pageX;
          this.startY = self[0].pageY;
        };
        this.scroller.doTouchStart(e.touches, e.timeStamp)
      },
      touchMove(e) {
        e.preventDefault();
        let self = e.targetTouches;
        let x = self[0].pageX;
        let y = self[0].pageY;
        if(!this.scrollType){
            let tt = this.getDirection(this.startX, this.startY, x, y);
            this.scrollType = tt.type;
        }
        if(this.scrollType===3 || this.scrollType===4){
            this.parent.isMove = false;
        }
        if(this.scrollType===1 || this.scrollType===2){
            return;
        }
        //e.stopPropagation();
        this.scroller.doTouchMove(e.touches, e.timeStamp)
      },
      touchEnd(e) {
        this.scrollType = 0;
        this.scroller.doTouchEnd(e.timeStamp)
      },
      resizes() {
         window.addEventListener('resize',()=>{
             clearTimeout(this.timeout);
            this.timeout = setTimeout(()=>{
                  this.getWidith();
             },300)
         })
      },
      getWidith() {
           clearTimeout(this.timeout);
          if(!this.$slots.default){
              return;
          }
          this.timeout = setTimeout(()=>{
              let ele = this.$slots.default[0]['elm'];
              let width = ele.clientWidth;
              this.contentWidth = ele.clientWidth+'px';
              this.contentHeight = ele.offsetHeight+ 'px';
          },300);
      }
    }
  }
</script>
