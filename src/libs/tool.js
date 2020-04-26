/**
 * @description:全局过滤器
 * @author：xingwu.chen@partner.midea.com
 * @update:2017-08-16
 * @version
 */


/**
 * @desc 时间戳转日期毫秒
 * @param {String} format 时间格式 Y:年，M:月，D:天 h:小时，m:分钟，s:秒 默认:'Y/M/D h:m'
 */
export function formatDate(arg, format) {
    // console.log(typeof arg.toString());
    let now;
    if (!arg) {
        now = new Date();
    }else{
        now = new Date(arg);
    }

    format = format || "Y/M/D h:m";
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    month = month >= 10 ? month : "0" + month;
    let date = now.getDate();
    date = date >= 10 ? date : "0" + date;
    let hour = now.getHours();
    hour = hour >= 10 ? hour : "0" + hour;
    let minute = now.getMinutes();

    minute = minute >= 10 ? minute : "0" + minute;
    let second = now.getSeconds();
    second = second >= 10 ? second : "0" + second;
    return format
        .replace("Y", year)
        .replace("M", month)
        .replace("D", date)
        .replace("h", hour)
        .replace("m", minute)
        .replace("s", second);
}


