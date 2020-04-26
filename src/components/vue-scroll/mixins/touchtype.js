/* eslint-disable */
export default {
  data() {
    return {
      screenWidth: 0,
      screenHeight: 0,
      isProgess: false
    }
  },
  methods: {
    getStyle(element, style) {
       return  window.getComputedStyle ? window.getComputedStyle(element, null).getPropertyValue(style): element.currentStyle[style]
   },
    //获得角度
    getAngle(angx, angy) {
      return Math.atan2(angy, angx) * 180 / Math.PI;
    },
    //获取两点间的角度
    getTowAngle(px1, py1, px2, py2) {
          //两点的x、y值

        let x = px2 - px1;
        let y = py2 - py1;
        let hypotenuse = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        //斜边长度
        let cos = x / hypotenuse;
        let radian = Math.acos(cos);
        //求出弧度
        let angle = 180 / (Math.PI / radian);
        //用弧度算出角度
        if (y < 0) {
        angle = -angle;
        } else if ((y == 0) && (x < 0)) {
        angle = 180;
        }
        return {
            angle: angle,
            distance: hypotenuse
        }
    },

    //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动 单指手势
    getDirection(startx, starty, endx, endy, x=2,y=2) {
      var angx = endx - startx;
      var angy = endy - starty;
      var result = 0;
      //如果滑动距离太短
      if (Math.abs(angx) < x && Math.abs(angy) < y) {
        return {
            type: result,
            angx: angx,
            angy: angy
        };
      }
      var angle = this.getAngle(angx, angy);
      if (angle >= -135 && angle <= -45) {
        result = 1;
      } else if (angle > 45 && angle < 135) {
        result = 2;
      } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3;
      } else if (angle >= -45 && angle <= 45) {
        result = 4;
      }
      var data = {
        type: result,
        angx: angx,
        angy: angy
      }
      return data;
    },
    hengshuping() {
      let width = this.screenWidth;
      let height = this.screenHeight;
      if (window.orientation == 180 || window.orientation == 0) {
        if (width >= height) {
          this.screenWidth = height;
          this.screenHeight = width;
        }

      }
      if (window.orientation == 90 || window.orientation == -90) {
        if (width <= height) {
            this.screenWidth = height;
            this.screenHeight = width;
        }

      }
      this.changeProgessBar(this.propessed / 100 * (this.screenWidth - 20));

    },
    preventMoveEvent(e) {
      let self = e.targetTouches;
      let x = self[0].pageX;
      let y = self[0].pageY;
      let obj = this.getDirection(this.moveX, this.moveY, x, y);
      if (obj.result > 0) {
        e.preventDefault();
      }
    }

  },
  mounted() {
    // this.screenWidth = document.body.clientWidth;
    // this.screenHeight = document.body.clientHeight;
    // window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", this.hengshuping, false);
    // this.$refs.viedo.addEventListener('touchMove', function(e) {
    //   e.preventDefault();
    // })

  }
}
