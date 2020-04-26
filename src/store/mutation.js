export default {
    SET_INIT_PLATFORM (state, res) {
        state.token = res.token;
        state.lang = res.lang
        console.log(state);
        
    },
    SET_EXTRA ( state, res) {
        state.extra =  res;
    }

}