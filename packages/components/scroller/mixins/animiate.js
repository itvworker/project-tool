export default {
    methods: {
        animate() {
            this.isAnimating = true;

            this.minDecelerationScrollX = 0
            this.minDecelerationScrollY = 0
            this.maxDecelerationScrollX = this.contentList[this.index].maxScrollX
            this.maxDecelerationScrollY = this.contentList[this.index].maxScrollY
            window.requestAnimationFrame(this.step)
        },
        step() {

            if(!this.isAnimating) return;
            let x = this.contentList[this.index].x;
            let y = this.contentList[this.index].y;
            let maxX = this.contentList[this.index].maxScrollX
            let maxY  = this.contentList[this.index].maxScrollY
            y -= this.decelerationVelocityY;


            //如果没有弹动时
            if(!this.bounching) {
                if(y > maxY) {
                    y = maxY
                }
                if(y < 0) {
                    y = 0;
                }
            }


            if(this.bounching) {
                if(y > this.contentList[this.index].maxScrollY && y < this.contentList[this.index].y) {
                    if(this.contentList[this.index].y-y <=0.3) {
                        y =  this.contentList[this.index].maxScrollY
                    }
                }
            }

            this.contentList[this.index].y = y;

            this.render(0, y, 1);
            if (Math.abs(this.decelerationVelocityY) <= 0.3) {
                this.isAnimating = false;
                return;
            } else {
                window.requestAnimationFrame(this.step)
            }
            this.calcDecelerationVelocity();
        },
        calcDecelerationVelocity() {
            console.log(this.decelerationVelocityY);

            let x = this.contentList[this.index].x;
            let y = this.contentList[this.index].y;
            if (!this.bounching) {
                let scrollLeftFixed = Math.max(Math.min(this.maxDecelerationScrollX, x), this.minDecelerationScrollX);
                if (scrollLeftFixed !== x) {
                    x = scrollLeftFixed;
                    this.decelerationVelocityX = 0;
                }

                let scrollTopFixed = Math.max(Math.min(this.maxDecelerationScrollY, y), this.minDecelerationScrollY);
                if (scrollTopFixed !== y) {
                    y = scrollTopFixed;
                    this.decelerationVelocityY = 0
                }
            }

            let frictionFactor = 0.95;
            this.decelerationVelocityX *= frictionFactor;
            this.decelerationVelocityY *= frictionFactor;

            // 只有在弹动时才有效


            if (this.bounching) {
                let scrollOutsideX = 0
                let scrollOutsideY = 0

                // This configures the amount of change applied to deceleration/acceleration when reaching boundaries
                let penetrationDeceleration = this.penetrationDeceleration;
                let penetrationAcceleration = this.penetrationAcceleration;


                if (x < this.minDecelerationScrollX) {
                    scrollOutsideX = this.minDecelerationScrollX - x
                } else if (x > this.maxDecelerationScrollX) {
                    scrollOutsideX = this.maxDecelerationScrollX - x
                }
                console.log(this.maxDecelerationScrollY)
                if (y < this.minDecelerationScrollY) {
                    scrollOutsideY = this.minDecelerationScrollY + y
                } else if (y > this.maxDecelerationScrollY) {
                    scrollOutsideY = this.maxDecelerationScrollY + y
                }

                if (scrollOutsideX !== 0) {
                    if (scrollOutsideX * this.decelerationVelocityX <= 0) {
                        this.decelerationVelocityX += scrollOutsideX * penetrationDeceleration
                    } else {
                        this.decelerationVelocityX = scrollOutsideX * penetrationAcceleration
                    }
                }

                if (scrollOutsideY !== 0) {

                    if (scrollOutsideY * this.decelerationVelocityY <= 0) {
                        this.decelerationVelocityY += scrollOutsideY * penetrationDeceleration

                    } else {

                        this.decelerationVelocityY = scrollOutsideY * penetrationAcceleration
                    }
                }
            }



        }
    }

}