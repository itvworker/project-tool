export default {
    methods: {
        calcMax() {
            let out =  this.$refs.out;
            let parentWidth = out.clientWidth;
            let parentHeight = out.clientHeight;
            let nodes = this.$refs.slide.children;
            for(let i = 0, l = nodes.length; i < l; i++) {
                if(this.contentList[i]) {
                    this.contentList[i].maxScrollX = nodes[i].clientWidth - parentWidth > 0 ? nodes[i].clientWidth - parentWidth : 0;
                    this.contentList[i].maxScrollY = nodes[i].clientHeight - parentHeight > 0 ? nodes[i].clientHeight - parentHeight : 0;

                }else{
                    this.contentList[i] = {
                        maxScrollY: 0,
                        maxScrollX: 0,
                        y: 0,
                        x: 0
                    }
                }
            }

        }
    }

}