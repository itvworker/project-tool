export default function (content: HTMLElement) {
    const global = window
    const docStyle = document.documentElement.style

    let engine = 'webkit'
    if (global.opera && Object.prototype.toString.call(global.opera) === '[object Opera]') {
        engine = 'presto'
    } else if ('MozAppearance' in docStyle) {
        engine = 'gecko'
    } else if ('WebkitAppearance' in docStyle) {
        engine = 'webkit'
    } else if (typeof navigator.cpuClass === 'string') {
        engine = 'trident'
    }

    const vendorPrefix = {
        trident: 'ms',
        gecko: 'Moz',
        webkit: 'Webkit',
        presto: 'O'
    }[engine]
    const helperElem = document.createElement('div')

    const perspectiveProperty = vendorPrefix + 'Perspective'
    const transformProperty = vendorPrefix + 'Transform'

    if (helperElem.style[perspectiveProperty] !== 'undefind') {
        return function (left:number, top:number, zoom:number) {
            content.style[transformProperty] = 'translate3d(' + (-left) + 'px,' + (-top) + 'px,0) scale(' + zoom + ')'
        }
    } else if (helperElem.style[transformProperty] !== 'undefind') {
        return function (left:number, top:number, zoom:number) {
            content.style[transformProperty] = 'translate(' + (-left) + 'px,' + (-top) + 'px) scale(' + zoom + ')'
        }
    } else {
        return function (left:number, top:number, zoom:number) {
            content.style.marginLeft = left ? (-left / zoom) + 'px' : ''
            content.style.marginTop = top ? (-top / zoom) + 'px' : ''
            content.style.zoom = zoom || ''
        }
    }
}
