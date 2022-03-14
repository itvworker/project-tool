<template>
  <router-view />
</template>
<script lang="ts" setup>
import { formatDateMonent } from './util'
// console.log(formatDateMonent(new Date().getTime(), 'yyyy-MM-dd hh:mm', -8))

// import { init } from './sanbbdom/init'
// import { classModule } from './sanbbdom/modules/class'
// import { propsModule } from './sanbbdom/modules/props'
// import { styleModule } from './sanbbdom/modules/style'
// import { eventListenersModule } from './sanbbdom/modules/eventlisteners'
// import { h } from './sanbbdom/h'
// const patch = init([classModule, propsModule, styleModule, eventListenersModule])

// const p1 = h('div', {}, [
//   h('div', {key:0}, ['app-path']),
//   h('div', {key:1}, ['applend-content'])
//   ] )
// const d = document.getElementById('app') as HTMLElement
// // patch(d, p1)
// const p2 =  h('div', {}, [h('div', {}, ['appcontent'])] )

// patch(p1, p2)
</script>
