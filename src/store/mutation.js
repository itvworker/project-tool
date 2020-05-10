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
    },
    SET_POWER(state, res) {
        state.power = res;
    },
    SET_NODE(state, res) {
        for(let i in res) {
            state[i] =res[i]
        } 
    },
}