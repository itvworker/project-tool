import { formatDateMonent } from '@/util/index'
describe('formatDateMonent 当前时区为东八区的计算机 格式化时间参数方法', () => {
    it('传入2022-02-22 格式化格式为yyyy-MM-dd', () => {
        expect(formatDateMonent('2022-02-22', 'yyyy-MM-dd')).toBe('2022-02-22')
    })
    it('传入2022-02-22 12:22 格式化格式为yyyy-MM-dd hh:mm', () => {
        expect(formatDateMonent('2022-02-22 12:22', 'yyyy-MM-dd hh:mm')).toBe('2022-02-22 12:22')
    })

    it('传入2022-02-22 10:22 格式化格式为yyyy-MM-dd hh:mm 时区为正八区', () => {
        expect(formatDateMonent('2022-02-22 10:22', 'yyyy-MM-dd hh:mm', 8)).toBe('2022-02-22 10:22')
    })

    it('传入2022-02-22 10:22 格式化格式为yyyy-MM-dd hh:mm 时区为负八区', () => {
        expect(formatDateMonent('2022-02-22 10:22', 'yyyy-MM-dd hh:mm', -8)).toBe('2022-02-21 18:22')
    })

    it('传入2022-02-22 10:22 格式化格式为yyyy-MM-dd hh:mm 时区为正十区', () => {
        expect(formatDateMonent('2022-02-22 10:22', 'yyyy-MM-dd hh:mm', 10)).toBe('2022-02-22 12:22')
    })
})
