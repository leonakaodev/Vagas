export default {
    namespaced: true,
    state: {
        active: false,
        timeout: 2000,
        type: 'success',
        content: ''
    },
    mutations: {
        showMessage(state, payload) {
            state.content = payload.content || ''
            state.type = payload.type || 'success'
            state.active = true
        }
    },
    actions: {
        async showMessage({ commit }, payload) {
            commit('showMessage', payload)
        }
    }
}