export default {
    SET_INIT_PLATFORM (state, res) {
        state.token = res.token;
        state.lang = res.lang
       
        
    },
    SET_EXTRA ( state, res) {
        state.extra =  res;
    },
    
    SET_TOKEN ( state, res) {
        state.token = res;
    },
    SET_USER (state,res) {
        state.user = res;
    }
}