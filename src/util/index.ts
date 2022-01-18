/**
 * 格式化时间
 * @param {String,Number} arg 时戳或日期字符串
 * @param {String} format 格式化的时间 Y：年 M:月 D:日 h：时 m:分 s:秒
 */
export function formatDateMonent (arg:string | number = '', format = 'yyyy-MM-dd hh:mm', timezone?:number):string {
    // console.log(typeof arg.toString());
    if (typeof arg === 'string') {
        arg = arg.replace(/-/ig, '/')
        if (arg.indexOf('/') < 0 && arg) {
            arg = parseInt(arg)
        }
        if (arg.toString().length === 7 && arg.toString().indexOf('/') === 4) {
            arg = arg + '/01'
        }
    }
    let now:Date
    if (!arg) {
        now = new Date()
    } else {
        now = new Date(arg)
    }
    // 如果有传时区的话，按时区时间来格式化
    if (typeof timezone !== 'undefined') {
        const offset = now.getTimezoneOffset() * 60000
        if (offset >= 0) {
            timezone = timezone < 0 ? (-12 - timezone) : timezone
        } else {
            timezone = timezone < 0 ? (12 - timezone) : timezone
        }
        const zonetime = now.getTime() + offset // 转换成0时区时间
        now = new Date(zonetime + (timezone * 3600000));
    }
    const year = now.getFullYear()
    let month:string|number = now.getMonth() + 1
    month = month >= 10 ? month : '0' + month
    let date:string|number = now.getDate()
    date = date >= 10 ? date : '0' + date
    let hour:string|number = now.getHours()
    hour = hour >= 10 ? hour : '0' + hour
    let minute:string|number = now.getMinutes()

    minute = minute >= 10 ? minute : '0' + minute
    let second:string|number = now.getSeconds()
    second = second >= 10 ? second : '0' + second
    return format
        .replace('yyyy', year.toString())
        .replace('MM', month.toString())
        .replace('dd', date.toString())
        .replace('hh', hour.toString())
        .replace('mm', minute.toString())
        .replace('ss', second.toString())
        .replace('Y', year.toString())
        .replace('M', month.toString())
        .replace('D', date.toString())
        .replace('h', hour.toString())
        .replace('m', minute.toString())
        .replace('s', second.toString())
}
