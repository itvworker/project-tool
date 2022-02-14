<template>
    <it-picker v-model="visible"></it-picker>
</template>
<script lang="ts" setup>
import { ref, defineEmits, defineProps, withDefaults } from 'vue'
import type { PickerTimeProps } from './type'
const visible = ref<boolean>(false)

const props = withDefaults(defineProps<PickerProps>(), {})
</script>
