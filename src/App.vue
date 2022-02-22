<template>
  <router-view />
</template>
<script lang="ts" setup>
import { formatDateMonent } from './util'
console.log(formatDateMonent('2022-02-22 10:22', 'yyyy-MM-dd hh:mm', -8))

</script>
