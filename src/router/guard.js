
import store from '@/store'
export default function (router) {
    router.beforeEach((to, from, next) => {
         
        if(to.name !== 'login') {
      
              if(!store.state.user) {
                  next({
                      name: 'login'
                  })
              }else{
                  next()
              }


        }else{
            next();
        }
        
        
    })
}