import axios from '@/plugins/axios'

export default {
    namespaced: true,
    state: {
        categories: [],
    },
    mutations: {
        setRequestInfos(state, payload) {
            state.totalItems = payload.totalItems
            state.categories = payload.data
        },
        resetRequestInfos(state) {
            state.totalItems = 0
            state.categories = []
        }
    },
    actions: {
        async load({ commit }, params) {
            try {
                const { data } = await axios.get('/categories', {
                    params
                })
                commit('setRequestInfos', data)
            } catch (err) {
                alert('An error occurred: ' + err.message)
                commit('resetRequestInfos')
            }
        },
        async create({ dispatch }, params) {
            const { data } = await axios.post('/categories', params)
            dispatch('load')
            return data
        },
        async delete(_, params) {
            return await axios.delete(`/categories/${params.id}`)
        }
    }
}