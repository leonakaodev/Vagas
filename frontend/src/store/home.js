import axios from '@/plugins/axios'

export default {
    namespaced: true,
    state: {
        posts: []
    },
    mutations: {
        setPost(state, payload) {
            state.posts = payload.posts
        }
    },
    actions: {
        async load(context) {
            const { data } = await axios.get('/posts', {
                params: {
                    page: 1,
                    perPage: 6
                }
            })
            context.commit('setPost', {
                posts: data.data
            })
        }
    }
}