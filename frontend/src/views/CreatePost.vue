<template>
    <v-container>
        <v-row class="d-flex justify-center align-items-center title">
            <h1>Create a new post</h1>
        </v-row>
        <PostForm @save="create" />
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import PostForm from '../components/posts/PostForm'

export default {
    name: 'Home',
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
                await this.createPost(form)
                this.$store.commit('notifier/showMessage', {
                    content: 'Post created successfully',
                    type: 'success'
                })
                this.$router.push('/posts/search',)
            } catch (err) {
                let message = err.response ? err.response.data.message : err.message
                alert('An error occurred: ' + message)
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