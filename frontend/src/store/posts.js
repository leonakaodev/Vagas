import axios from '@/plugins/axios'

export default {
    namespaced: true,
    state: {
        posts: [],
        page: 1,
        perPage: 5,
        totalPages: 0,
        totalItems: 0
    },
    mutations: {
        setRequestInfos(state, payload) {
            state.totalPages = payload.totalPages
            state.totalItems = payload.totalItems
            state.posts = payload.data
            state.page = payload.currentPage
        },
        resetRequestInfos(state) {
            state.totalPages = 0
            state.totalItems = 0
            state.posts = []
            state.page = 1
        }
    },
    actions: {
        async load({ commit, state }, params) {
            try {
                params.page = params.page || state.page
                params.perPage = params.perPage || state.perPage
                const { data } = await axios.get('/posts', {
                    params
                })
                commit('setRequestInfos', data)
            } catch (err) {
                alert('An error occurred: ' + err.message)
                commit('resetRequestInfos')
            }
        }
    }
}