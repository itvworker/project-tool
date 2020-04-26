<template lang="html">
    <page-container>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive&&show" />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive&&show" />
    </page-container>
    
</template>

<script>
    import platform from '@/libs/platform'
    import config from '@/config'
    export default {
        data() {
            return {
                show: false
            }
        },
        methods:{
            //platform
            init() {
                document.addEventListener('deviceready',() => {
                    platform.setBounces(0)
                    platform.hideNav();
                    this.setStatusBarColor();
                    this.platformInit()

                    },false)
               
               //----
            },
            // 设置状态栏颜色
            setStatusBarColor () {
                const u = navigator.userAgent
                const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // g
                const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
                if (isAndroid) {
                    this.$store.state.isIOS = false
                    platform.changeColorAndroid([255, 255, 255, 1])
                }
                if (isIOS) {
                    this.$store.state.isIOS = true
                    platform.changeColor([255, 255, 255, 1])
                }
            },
            async platformInit() {
                let res = await Promise.all([
                    platform.getDeviceInfo(),
                    platform.language(),
                    platform.getUser(),
                    platform.getExtra('com.midea.msd.materialsFactoryDoor')
                ])

                this.$store.commit('SET_INIT_PLATFORM', {
                    lang: res[1].language,
                    token: res[2].ssoToken,
                    uid: res[2].uid
                })

                this.$store.commit('SET_EXTRA', res[3])
                
                this.show = true;
          
            },
            // 跳转
        
        },
        created() {
            if(config.type === 'dev') {
                this.show = true;
                return;
            }
            this.init();
            
        },
        mounted() {
            document.addEventListener('backbutton', ()=>{
                switch (this.$route.name) {
                    case 'success':
                    case  'home':
                        platform.exit()    
                        break;
                
                    default:
                        this.$router.go(-1);
                        break;
                }
                
            }, false)
            
           
        }
    }
</script>

<style lang="less">
    body, html {
        padding: 0;
        margin: 0;
        height: 100%;
    }
</style>
