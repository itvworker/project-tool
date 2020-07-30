export default {
    methods: {
        //判断是否为尽到滑动还要向尽头滑
        isMoveMax(value) {

            if (this.direction === 'row') {
                if(this.coordinate>0 && value>0) return true
                if(this.coordinate<=-this.maxX && value<0) return true
            }


            return false
        }

    }
}