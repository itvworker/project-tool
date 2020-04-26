export default {
    data() {
        return {
            page: {
                pageNumber: 1,
                pageSize: 12
            },
            isNone: false, // 是否为空
            isLoadingMore: true, // 是否要上拉加载更多
            list: [],
            sy: 0,
            nowPage: 1,
            isLoaded: false
        }
    },
    activated() {
        setTimeout(() => {
            if (this.$refs.scroller) {
                this.$refs.scroller.scrollTo(0, this.sy)
            }
        }, 10)
    },
    deactivated() {
        let p = this.$refs.scroller.getPosition()
        this.sy = p.top
    },
    methods: {
        init() {
            this.list = [];
            this.isLoadingMore = false;
            this.$pixLoading.show('加载中…');
            this.refresh();
        },
        refresh() {
            this.page.pageNumber = 1
            this.$refs.scroller.finishInfinite(true);
            // this.isNone = false;
            this.getDataList();
        },
        infinite() {
            this.getDataList()
        },
        restart() {
            this.$refs.scroller.scrollTo(0, 0)
            this.refresh()
        },
        afterLoad(res, pageNumber) {
            if (pageNumber <= 1) {
                this.nowPage = 1
                if (res.length <= 0) {
                    this.isNone = true
                    this.$refs.scroller.finishPullToRefresh()
                    this.isLoadingMore = false
                    this.$refs.scroller.finishInfinite(true)
                    this.list = []
                    return
                }
                if (res.length < this.page.pageSize) {
                    this.$refs.scroller.finishPullToRefresh()
                    this.$refs.scroller.finishInfinite(true)
                } else {
                    this.$refs.scroller.finishPullToRefresh()
                    this.$refs.scroller.finishInfinite(false)
                }
                this.page.pageNumber = parseInt(pageNumber) + 1
                this.isLoadingMore = true
                this.list = res
                this.isNone = false
                return

            }

            if (pageNumber > 1) {
                if (pageNumber === this.nowPage) {
                    this.$refs.scroller.finishInfinite()
                    return
                }

                if (res.length <= 0) {
                    if (this.list.length <= 0) {
                        this.isNone = true
                    }
                    this.nowPage = pageNumber
                    this.page.pageNumber = parseInt(pageNumber) + 1
                    this.$refs.scroller.finishInfinite(true)
                    return 
                } 


                res.forEach((item, index, arr) => {
                    this.list.push(item)
                })
                this.$refs.scroller.finishInfinite()
                this.page.pageNumber = parseInt(pageNumber) + 1
                this.nowPage = pageNumber;
                if (res.length < this.page.pageSize) {
                    this.$refs.scroller.finishPullToRefresh()
                    this.$refs.scroller.finishInfinite(true)
                    return
                } 
                 
                this.$refs.scroller.finishPullToRefresh()
                this.$refs.scroller.finishInfinite()
                return
            }


            this.nowPage = pageNumber
            this.$refs.scroller.finishPullToRefresh()
            this.$refs.scroller.finishInfinite()
        }
    }
}
