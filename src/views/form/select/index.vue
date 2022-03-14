<template>
    <div class="box">
        <calendar>
            <template #default="{data}">
                {{data.day}}
            </template>
        </calendar>
    </div>
</template>
<script lang="ts" setup>
import Calendar from '@/components/calendar/src'
import '@/components/calendar/style/index.scss'
</script>
