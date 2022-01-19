/**
 * @description 根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
 * @param startx 开始点
 * @param starty 开始点
 * @param endx 结束点
 * @param endy 结束点
 * @param show 是否开启
 * @returns
 */
export default function (startx:number, starty:number, endx: number, endy: number, show?:boolean) {
    const angx = endx - startx
    const angy = endy - starty
    let result = 0
    // 如果滑动距离太短
    if (Math.abs(angx) < 1.5 && Math.abs(angy) < 1.5 && !show) {
        return result
    }
    const angle = getAngle(angx, angy)
    if (angle >= -135 && angle <= -45) {
        result = 1
    } else if (angle > 45 && angle < 135) {
        result = 2
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3
    } else if (angle >= -45 && angle <= 45) {
        result = 4
    }
    return {
        type: result,
        angx: angx,
        angy: angy
    }
}

// 获得角度
function getAngle (angx:number, angy:number) {
    return (Math.atan2(angy, angx) * 180) / Math.PI
}
