import Vue from 'vue'
import Vuex from 'vuex'

import home from './home'
import posts from './posts'
import categories from './categories'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        home,
        posts,
        categories
    }
})
