import { base } from '../../../libs';
import imageClipper from './imageClipper.vue';

export default class ToolBar extends base {
    constructor(vue, lang) {
        super(vue, 'imageClipper', lang);
        let instance = this.createNoTagInstance(imageClipper);

        this.api['open'] = function(opt) {

            let defaultOpt = {
                width:200,
                height: 200,
                clipType:'square',
                onConfirm: null,
                onCancel: null,
                styles: {
                    title: '移动或缩放',
                    cancelText:'取消',
                    confirmText: '确定',
                    titleTextColor: '#fff',
                    cancelTextColor:'#fff',
                    confirmTextColor: '#fff',
                    headerBgColor: '#314558',
                    cancalBtnColor: '#314558',
                    confirmBtnColor: '#919CA3'
                }
            };

            if(opt.clipType==='orthogon') {
                 defaultOpt.width = 400;
                 defaultOpt.height = 200;
            }
            if(opt.clipType==='screen') {
                 opt.clipType = "orthogon"
            }




            for(let i in opt) {
                if(i !== 'styles') {
                    if(opt[i]) {
                        defaultOpt[i] = opt[i]
                    }
                }
            }

            if(opt.styles){
                for(let i in opt.styles) {
                     defaultOpt.styles[i] = opt.styles[i]
                }
            }

            for(let i in defaultOpt) {
                instance[i] = defaultOpt[i]
            }
            instance.getImage()
        }

        this.api['isOpen'] = function() {
            return instance.toggle;
        }

        this.api['close'] =  function() {
            instance.cancel();
        }
        
    }
}
