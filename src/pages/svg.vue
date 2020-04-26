<template>
    <page-container>
        <input type="file" @change="change">
    </page-container>
</template>

<script>
    export default {
        name: "svg",
        methods: {
            change(e) {
                const reader = new FileReader();//新建一个FileReader
                reader.readAsText(e.target.files[0], "UTF-8");//读取文件
                reader.onload =  (evt) => { //读取完文件之后会回来这里
                    this.changeSvg(evt.target.result)
                }
            },
            changeSvg(content) {
                content = content.replace(/</ig,'%3c').replace(/\//ig,'%2f').replace(/>/ig, '%3e').replace(/"/ig, "'")
                content = 'data:image/svg+xml,'+content;
                content = `<img src="${content}"/>`
                console.log(content);

            }
        }
    }
</script>

<style scoped>

</style>