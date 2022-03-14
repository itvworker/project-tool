import { mount } from '@vue/test-utils'
import CalendarTime from '@/mobile/CalendarTime/src/CalendarTime.vue'
import calendar from '@/components/calendar'

describe('CalendarTime 组件', () => {
    it('Dialog 输出的数是相同', async () => {
        const wrapper = mount(CalendarTime, {
            props: {
                modelValue: false,
                startWeek: 1,
                defaultValue: '2022-10-10 00:00'
            }
        })
        wrapper.setProps({
            modelValue: true
        })
        await wrapper.vm.$nextTick()
        const item = wrapper.findAll('.it-swpier-calendar').at(1)?.findAll('.day-item').at(15) as any
        item.trigger('click')
        await wrapper.vm.$nextTick()
        const cofirmbtn = wrapper.find('.btn-confirm') as any
        cofirmbtn.trigger('click')
        await wrapper.vm.$nextTick()
        console.log(wrapper.emitted().confirm[0])
        expect(wrapper.isVisible()).toBe(true)
    })
})
