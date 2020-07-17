<template>

    <div class="circle-box">
        <svg viewBox="0 0 100 100">
            <path
                fill="none"
                stroke="#aaa"
                stroke-width="12"
                stroke-linecap="round"
                :d="bgpath"
            ></path>
            <path
                fill="none"
                stroke="green"
                stroke-width="12"
                stroke-linecap="round"
                :d="path"
            ></path>
            <image
                :x="ax"
                style="border-radius:8"
                :y="ay"
                @touchstart="touchstart($event,0)"
                @touchmove="touchmove($event,0)"
                width="16"
                height="16"
                xlink:href="./imgs/apoint.jpeg"
            />
            <image
                :x="bx"
                :y="by"
                @touchstart="touchstart($event,1)"
                @touchmove="touchmove($event,1)"
                width="16"
                height="16"
                xlink:href="./imgs/bpoint.jpeg"
            />
        </svg>
    </div>

</template>

<script>
export default {
    data() {
        return {
            show: false,
            path: "",
            bgpath: "",
            ax: 0,
            ay: 0,
            bx: 0,
            by: 0,
            center: {
                x: 0,
                y: 0
            }
        };
    },
    computed: {
        arr() {
            let arr = [];
            for (let i = 0; i <= 360; i += 1.5) {
                let deg = (Math.PI / 180) * i;

                let type =
                    i.toString().split(".").length >= 2 ? "center" : "normal";
                let y = 50 + 40 * Math.sin(deg);
                let x = 50 + 40 * Math.cos(deg);

                arr.push({
                    x: x,
                    y: y,
                    type: type,
                    ang: i
                });
            }
            return arr;
        }
    },
    methods: {
        touchstart(e, type) {
            let top = this.$el.offsetTop;
            let left = this.$el.offsetLeft;
            let width = this.$el.clientWidth;
        },
        touchmove(e, type) {
            let top = this.$el.offsetTop;
        },
        init() {
            this.arr.forEach((item, index) => {
                if (index === 0) {
                    this.bgpath = `M ${item.x} ${item.y} `;
                }

                if (index > 0 && item.type === "center") {
                    this.bgpath += `${item.x} ${item.y} `;
                }
            });

            this.progress(90, 360, 1);
        },
        /**
         * 先把移动的两个点分为a,b点
         * point1 为移动点
         * point2 第二个点
         */
        progress(point1, point2, type) {
            let res = JSON.parse(JSON.stringify(this.arr));
            let bIndex = point1 / 1.5;
            let eIndex = point2 / 1.5;

            let arr = [];
            if (type === 0) {
                this.ax = res[bIndex].x - 8;
                this.ax = res[bIndex].y - 8;
                this.bx = res[eIndex].x - 8;
                this.by = res[eIndex].y - 8;
                if (point1 > point2) {
                    arr = res.slice(bIndex, res.length - 1);
                    arr = arr.concat(res.slice(0, eIndex));
                }

                if (point2 > point1) {
                    arr = res.slice(bIndex, eIndex);
                }
            } else {
                this.bx = res[bIndex].x - 8;
                this.by = res[bIndex].y - 8;
                this.ax = res[eIndex].x - 8;
                this.ay = res[eIndex].y - 8;
                if (point1 > point2) {
                    arr = res.slice(eIndex, bIndex);
                }

                if (point2 > point1) {
                    arr = res.slice(eIndex, res.length - 1);
                    arr = arr.concat(res.slice(0, bIndex));
                }
            }

            // arr = arr.concat(res.slice(0, bIndex));
            // let arr = res.slice(0, 80);
            arr.forEach((item, index) => {
                if (index === 0) {
                    this.path = `M ${item.x} ${item.y} `;
                }

                if (index > 0 && item.type === "center") {
                    this.path += `${item.x} ${item.y} `;
                }
            });
        }
    },
    mounted() {
        this.init();
    }
};
</script>

<style lang="less" scoped>
</style>
