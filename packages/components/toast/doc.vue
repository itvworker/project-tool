<template lang="html">
    <itv-container class="doc-page">
        <div v-html="doc"></div>
    </itv-container>
</template>

<script>
import doc from './doc.md'
import html from '@/doc/doc.js'
export default {
    computed:{
        doc() {
            // return doc
            let msg = new html(doc).getHtml()

            return msg
            // let msg = doc.replace(/<table>/ig, '<table class="doc-table">')
            //              .replace(/<p>[\S\s]+?<\/p>/ig,function(word){
            //                  let html = word.replace('<p>','').replace('</p>','')
            //                  html = html.split(' ')
            //                  console.log(html);
            //                  // console.log(word);
            //                  //
            //                  // let arr = word.split('.');
            //                  // let back = ''
            //                  // if(arr.length>=2) {
            //                  //     let className = arr[1].replace('</p>','').replace(/_/ig, ' ');
            //                  //     back=`<div class="${className}">`
            //                  // }else{
            //                  //     back='</div>'
            //                  // }
            //                  // return back
            //                  // console.log(arr);
            //                  return word
            //              })
            //
            // return msg
        }
    },
    updated() {
        this.hijs();
    },
    mounted() {
        this.hljs();
    }
}
</script>

<style lang="css" scoped>
</style>
