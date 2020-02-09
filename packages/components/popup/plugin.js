import objectAssign from 'object-assign'
import PopupComponent from './popup.vue'
import merge from '../../libs/merge.js'

let $vm
let watcher

const plugin = {
  install (vue, pluginOptions = {}) {
    const Popup = vue.extend(PopupComponent)
    if (!$vm) {
      $vm = new Popup({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }

    const defaults = {}
    for (let i in $vm.$options.props) {
      if (i !== 'value') {
        defaults[i] = $vm.$options.props[i].default
      }
    }

    const reset=()=> {
        for (let i in $vm.$options.props) {
          if (i !== 'value') {
            $vm[i] = $vm.$options.props[i].default
          }
        }
    }
    const init=(options={})=> {
        for (let i in options) {
          if (i !== 'value') {
            $vm[i] = options[i]
          }
        }
    }

    const popup = {
        alert(options = {}) {
            reset();
            init(options)
            $vm.value = true;
            $vm.hideBtnCancel = true;
            $vm.$on('cancel', () => {
                $vm.value = false;
                if(options.onHide) {
                    options.onHide()
                }
            })

            $vm.$on('confirm', ()=>{
                $vm.value = false;
                if(options.onHide) {
                    options.onHide()
                }

                if(options.onConfirm) {
                    options.onConfirm()
                }

            })

            $vm.$on('close',()=>{
                $vm.$off('cancel')
                $vm.$off('confirm')
            })
        },
        confirm(options = {}) {
            reset();
            init(options)
            $vm.value = true;
            $vm.hideBtnCancel = false;
            $vm.$on('cancel', () => {
                $vm.value = false;
                if(options.onHide) {
                    options.onHide()
                }
            })

            $vm.$on('confirm', ()=>{
                $vm.value = false;
                if(options.onHide) {
                    options.onHide()
                }

                if(options.onConfirm) {
                    options.onConfirm()
                }

            })

            $vm.$on('close',()=>{
                $vm.$off('cancel')
                $vm.$off('confirm')
            })

        },
        hide() {
            $vm.value = false;
        },
        state() {
            return $vm.value;
        }
    }

    // all Vux's plugins are included in this.$vux
    if (!vue.$itv) {
      vue.$itv = {
        popup
      }
    } else {
      vue.$itv.popup = popup
    }

    vue.mixin({
      created: function () {
        this.$itv = vue.$itv
      }
    })
  }
}

export default plugin
export const install = plugin.install
