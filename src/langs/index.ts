import { createI18n } from 'vue-i18n'
import cn from './cn'
export default createI18n({
    locale: 'cn', // 设置地区
    messages: {
        cn: cn
    } // 设置地区信息
})