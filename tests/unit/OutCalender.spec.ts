import { outCalendar } from '@/libs/calendar'
import type { Calendars } from '@/libs/calendar'
describe('outCalendar 方法输出日历数组', () => {
    it('输出2022月2月日历数，查看是否正确', () => {
        const calendars = outCalendar({
            year: 2022,
            month: 2,
            startWeek: 1
        })
        expect(calendars.length).toBe(42)
        expect(calendars[0].ymd).toBe('2022-01-31')
        expect(calendars[0].week).toBe(1)
        expect(calendars[0].type).toBe('prev')

        expect(calendars[1].ymd).toBe('2022-02-01')
        expect(calendars[1].week).toBe(2)
        expect(calendars[1].type).toBe('current')
    })

    it('输出2022月2月日历数, props.endType为current时', () => {
        const calendars = outCalendar({
            year: 2022,
            month: 2,
            endType: 'current'
        })
        expect(calendars.length).toBe(28)
        calendars.forEach((item:Calendars) => {
            expect(item.type).toBe('current')
        })
    })

    it('输出2022月2月日历数, props.endType为end时', () => {
        const calendars = outCalendar({
            year: 2022,
            month: 2,
            endType: 'end',
            startWeek: 1
        })
        expect(calendars.length).toBe(35)
    })
})
