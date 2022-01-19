<template>
    <div class="it-scroller" @touchstart="onTouchstart"  @touchmove="onTouchmove" @touchend="onTouchend">
        <div class="it-scroller-content">
            <div class="it-scroller-touch">
                <div class="pull-top" v-if="pullDown" ref="pull">
                    <slot name='pull'>
                        <div class="spinner-holder">
                            <arrow
                                class="arrow"
                                :class="{'active': status}"
                                v-if="!isTriggerPullDown"
                                :fillColor="refreshLayerColor"
                            ></arrow>
                            <spinner v-show="isTriggerPullDown" :style="{fill: refreshLayerColor, stroke: refreshLayerColor}"></spinner>
                            <span
                                class="text"
                                :style="{color: refreshLayerColor}"
                                v-text="text"
                            ></span>
                        </div>
                    </slot>
                </div>

                <div class="itv-scroller-msg">
                    <slot/>
                </div>

                <div class="itv-scroller-more" ref="more" v-show='isMore && moreStatus!=="loadingStop"'>
                    <spinner v-show="moreStatus !== 'none'" class="itv-scroller-more-icon" :style="{fill: refreshLayerColor, stroke: refreshLayerColor}" />
                    <span v-show="moreStatus === 'none'">{{noDataText}}</span>
                    <span v-show="moreStatus !== 'none'">{{loadingText}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Arrow from './components/Arrow.vue'
import Spinner from './components/Spinner.vue'
import { Props } from './libs/scroller.type'
import { withDefaults, defineProps, ref } from 'vue'

const props = withDefaults(defineProps<typeof Props>(), {
    isMore: false
})
function onTouchstart (e:TouchEvent) {

}

function onTouchmove (e:TouchEvent) {

}

function onTouchend (e:TouchEvent) {

}
</script>