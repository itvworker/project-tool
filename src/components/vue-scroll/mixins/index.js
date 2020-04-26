import touchType from './touchtype'
const re = /^[\d]+(\%)?$/
const widthAndHeightCoerce = (v) => {
    if (v[v.length - 1] != '%') return v + 'px'
    return v
}
const widthAndHeightValidator = (v) => {
    return re.test(v)
}

export default {
    mixins: [touchType],
    props: {
        onRefresh: Function,
        onInfinite: Function,

        refreshText: {
            type: String,
            default: '下拉刷新'
        },

        noDataText: {
            type: String,
            default: '没有更多数据'
        },
        loadingText: {
            type: String,
            default: '加载中…'
        },

        width: {
            type: String,
            default: '100%',
            validator: widthAndHeightValidator
        },

        height: {
            type: String,
            default: '100%',
            validator: widthAndHeightValidator
        },

        snapping: {
            type: Boolean,
            default: false
        },

        snapWidth: {
            type: Number,
            default: 100
        },

        snapHeight: {
            type: Number,
            default: 100
        },

        animating: {
            type: Boolean,
            default: true
        },

        animationDuration: {
            type: Number,
            default: 250
        },

        bouncing: {
            type: Boolean,
            default: true
        },

        refreshLayerColor: {
            type: String,
            default: '#AAA'
        },

        loadingLayerColor: {
            type: String,
            default: '#AAA'
        },

        cssClass: String, // content css class

        minContentHeight: {
            type: Number,
            default: 0 // px
        },
        isLoadingMore: {
            type: Boolean,
            default: true
        },
        status: {
            type: Number,
            default: 1
        },
        type: {
            type: String,
            default: 'any'
        },
        blockHeight: {
            type: Number,
            default: 60
        },
        parent: '',
        sendEvent: false
    },
    computed: {
        w: function () {
            return widthAndHeightCoerce(this.width)
        },

        h: function () {
            return widthAndHeightCoerce(this.height)
        },

        showInfiniteLayer () {
            if (!this.isLoadingMore) {
                return
            }
            let contentHeight = 0
            this.content
                ? contentHeight = this.content.offsetHeight
                : void 666

            return this.onInfinite
                ? contentHeight > this.minContentHeight
                : false
        }
    },
    data () {
        return {
            containerId: 'outer-' + Math.random().toString(36).substring(3, 8),
            contentId: 'inner-' + Math.random().toString(36).substring(3, 8),
            state: 0, // 0: pull to refresh, 1: release to refresh, 2: refreshing
            loadingState: 0, // 0: stop, 1: loading, 2: stopping loading
            showLoading: false,
            container: undefined,
            content: undefined,
            scroller: undefined,
            mousedown: false,
            infiniteTimer: undefined,
            resizeTimer: undefined,
            startPos: {
                x: 0,
                y: 0
            },
            isMove: true

        }
    },
    destroyed () {
        clearInterval(this.resizeTimer)
        if (this.infiniteTimer) clearInterval(this.infiniteTimer)
    },
    methods: {
        resize () {
            let container = this.container
            let content = this.content

            this.scroller.setDimensions(container.clientWidth, container.clientHeight, content.offsetWidth, content.offsetHeight - this.blockHeight)
        },

        finishPullToRefresh () {
            this.scroller.finishPullToRefresh()
        },

        finishInfinite (hideSpinner) {
            this.loadingState = hideSpinner ? 2 : 0
            this.showLoading = false
            if (this.loadingState == 2) {
                this.resetLoadingState()
            }
        },

        triggerPullToRefresh () {
            this.scroller.triggerPullToRefresh()
        },

        scrollTo (x, y, animate) {
            this.scroller.scrollTo(x, y, animate)
        },

        scrollBy (x, y, animate) {
            this.scroller.scrollBy(x, y, animate)
        },

        touchStart (e) {
        // Don't react if initial down happens on a form element
            if (e.target.tagName.match(/input|textarea|select/i)) {
                return
            }
            this.isMove = true
            this.startPos = {
                x: e.targetTouches[0].pageX,
                y: e.targetTouches[0].pageY
            }
            this.scroller.doTouchStart(e.touches, e.timeStamp)
        },

        touchMove (e) {
            if (this.isMove === false) return

            let top = this.scroller.getValues().top

            // 根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动 单指手势
            let px = e.targetTouches[0].pageX
            let py = e.targetTouches[0].pageY
            let pos = this.getDirection(this.startPos.x, this.startPos.y, px, py)
            this.startPos = {
                x: px,
                y: py
            }
            e.preventDefault()
            if (this.type === 'tab') {
                let ptop = this.parent.scroller.getValues().top
                let pmaxh = this.parent.scroller.__maxScrollTop
                if (pos.type === 1 && ptop >= pmaxh) {
                    this.parent.touchStart(e)
                    this.parent.isMove = false
                }
                //
                if (pos.type === 1 && ptop < pmaxh) {
                    this.touchStart(e)
                    return
                }
                if (pos.type === 2 && ptop >= pmaxh) {
                    if (top <= 0) {
                        this.touchStart(e)
                        this.parent.isMove = true
                        return
                    } else {
                        this.parent.touchStart(e)
                        this.parent.isMove = false
                    }
                }

                if (pos.type === 2 && ptop < pmaxh) {
                    this.parent.isMove = true
                    this.touchStart(e)
                    return
                }
                // if (pos.type === 0) {
                //     return
                // }
            }
            this.scroller.doTouchMove(e.touches, e.timeStamp)
        },

        touchEnd (e) {
            if (this.isMove === false) return
            this.scroller.doTouchEnd(e.timeStamp)
        },

        mouseDown (e) {
        // Don't react if initial down happens on a form element
            if (e.target.tagName.match(/input|textarea|select/i)) {
                return
            }
            this.scroller.doTouchStart([{
                pageX: e.pageX,
                pageY: e.pageY
            }], e.timeStamp)
            this.mousedown = true
        },

        mouseMove (e) {
            if (!this.mousedown) {
                return
            }
            this.scroller.doTouchMove([{
                pageX: e.pageX,
                pageY: e.pageY
            }], e.timeStamp)
            this.mousedown = true
        },

        mouseUp (e) {
            if (!this.mousedown) {
                return
            }
            this.scroller.doTouchEnd(e.timeStamp)
            this.mousedown = false
        },

        // 获取位置
        getPosition () {
            let v = this.scroller.getValues()
            return {
                left: parseInt(v.left),
                top: parseInt(v.top)
            }
        },

        resetLoadingState () {
            let { left, top, zoom } = this.scroller.getValues()
            let container = this.container
            let content = this.content
            if (top + 60 > this.content.offsetHeight - this.container.clientHeight) {
                setTimeout(() => {
                    this.resetLoadingState()
                }, 1000)
            } else {
                this.loadingState = 0
            }
        }
    }
}
