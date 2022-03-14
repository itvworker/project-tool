import { shallowMount } from '@vue/test-utils'
import Dialog from '@/mobile/Dialog/src/Dialog.vue'

describe('Dialog.vue 组件', () => {
    it('Dialog 输出的数是相同', () => {
        const props = {
            bgColor: 'rgba(0,0,0,0.5)',
            to: 'body',
            modelValue: true,
            dir: 'bottom'
        }
        const wrapper = shallowMount(Dialog, {
            props,
            slots: {
                default: '<div class="dialog-content">向上弹出的内容</div>'
            }
        })
        expect(wrapper.find('.it-dialog-bottom').exists()).toBe(true)
        expect(wrapper.find('.dialog-content').exists()).toBe(true)
        expect(wrapper.props().bgColor).toBe('rgba(0,0,0,0.5)')
    })

    it('Dialog 默认值验证', () => {
        const wrapper = shallowMount(Dialog, {
            props: {
                modelValue: false
            },
            slots: {
                default: '<div class="dialog-content">向上弹出的内容</div>'
            }
        })
        expect(wrapper.find('.it-dialog-center').exists()).toBe(true)
        expect(wrapper.find('.dialog-content').exists()).toBe(true)
        expect(wrapper.props().bgColor).toBe('rgba(0, 0, 0, 0.6)')
        expect(wrapper.props().dir).toBe('center')
        expect(wrapper.props().zIndex).toBe(1000)
    })
})
