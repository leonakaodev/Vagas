import Vue from 'vue'
import Vuex from 'vuex'

import home from './home'
import posts from './posts'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        home,
        posts
    }
})
