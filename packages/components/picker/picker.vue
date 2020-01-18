<template>
    <div class="itv-picker-panel">
        <template v-for="(item, index) of listData" >
            <picker-slot :ref="`picer-slot-${(index)}`"
                :default-value="chooseValueData[index]"
                :is-update="isUpdate"
                :list-data="item"
                @chooseItem="chooseItem"
                :key="index"
                :key-index="index"
            ></picker-slot>
        </template>
    </div>
</template>
<script>
import pickerSlot from "./picker-slot.vue";
export default {
    name:'itv-picker',
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        customClassName: {
            type: String,
            default: null
        },
        title: {
            type: String,
            default: ' '
        },
        listData: {
            type: Array,
            default: () => []
        },
        defaultValueData: {
            type: Array,
            default: () => []
        },
    },
    components: {
        pickerSlot
    },
    data() {
        return {
            chooseValueData: [],
            cacheValueData: [],
            isUpdate: false
        };
    },
    watch: {
        'defaultValueData': function() {
            this.chooseValueData = [...this.defaultValueData];
            this.cacheValueData = [...this.defaultValueData];
            this.$emit('confirm', this.cacheValueData);
        }
    },
    methods: {
        updateChooseValue(self, index, value) {
            self.cacheValueData.splice(index, 1, value);
            let ref = `picer-slot-${index}`;
            self.$refs[ref][0].updateTransform(value);
        },


        closeActionSheet() {
            this.isUpdate = !this.isUpdate;
            this.cacheValueData = [...this.chooseValueData];
            this.$emit('close');
            this.$emit('close-update', this, this.chooseValueData);
        },

        confirm() {
            this.$emit('confirm', this.cacheValueData);
            this.chooseValueData = [...this.cacheValueData];
            this.$emit('close');
        },

        chooseItem(value, index) {
            console.log(this.listData);
            console.log(this.cacheValueData);
            if (this.cacheValueData[index] !== value) {
                this.cacheValueData[index] = value;
                this.$emit('choose', this, index, value, this.cacheValueData);
            }
        }
    },
    created() {
        if (this.defaultValueData && this.defaultValueData.length) {
            this.chooseValueData = [...this.defaultValueData];
        } else {
            let defaultValueData = [];
            this.listData.map((item, index) => {
                defaultValueData.push(item[0]);
            });
            this.chooseValueData = [...defaultValueData];
        }
    }
}
</script>
<style lang="less" rel="stylesheet/less">


</style>
