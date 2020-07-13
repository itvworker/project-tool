<template>
    <itv-container class="page-slideout">
        <itv-header>Circle</itv-header>
        <itv-main>

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

            </svg>
        </itv-main>
    </itv-container>

</template>

<script>
export default {
    data() {
        return {
            show: false,
            path: "",
            bgpath: ""
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
        init() {
            this.arr.forEach((item, index) => {
                if (index === 0) {
                    this.bgpath = `M ${item.x} ${item.y} `;
                }

                if (index > 0 && item.type === "center") {
                    this.bgpath += `${item.x} ${item.y} `;
                }
            });

            this.progress(50, 20, 0);
        },
        progress(begin, end, type) {
            let res = JSON.parse(JSON.stringify(this.arr));
            let bIndex = begin / 1.5;
            let eIndex = end / 1.5;

            let arr = res.slice(eIndex, res.length - 1);

            arr = arr.concat(res.slice(0, bIndex));

            console.log(arr);

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
