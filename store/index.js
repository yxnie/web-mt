import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = () => new Vuex.Store({
    state: {
        num: 100,
        location: "",
        lock: false
    }
})
export default store