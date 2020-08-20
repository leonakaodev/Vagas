<template>
    <v-container>
        <v-row class="d-flex justify-center align-items-center title">
            <h1>Create a new post</h1>
        </v-row>
        <PostForm ref="form" @save="create" @cancel="$router.push({ name: 'SearchPost' })" />
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import PostForm from '@/components/posts/PostForm'

export default {
    name: 'CreatePost',
    data() {
        return {
        }
    },
    components: {
        PostForm
    },
    methods: {
        async create(form){
            try {
                if(!this.$refs.form.validate()) return
                await this.createPost(form)
                this.$store.commit('notifier/showMessage', {
                    content: 'Post created successfully',
                    type: 'success'
                })
                this.$router.push('/posts/search',)
            } catch (err) {
                this.$store.commit('notifier/showMessage', {
                    content: err.response.data.message || 'An unexpected error occurred',
                    type: 'error'
                })
            }
        },
        ...mapActions('posts', {
            createPost: 'create'
        }),
    },
}
</script>

<style scoped>
.title {
    padding: 50px 0;
}
</style>