<template>
    <v-container>
        <v-row class="d-flex justify-center align-items-center title">
            <h1>Updating a Post</h1>
        </v-row>
        <PostForm
            ref="form"
            :post="post"
            @save="update"
            @cancel="$router.push({ name: 'SearchPost' })"
        />
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import PostForm from '@/components/posts/PostForm'

export default {
    name: 'EditPost',
    data() {
        return {
            post: {}
        }
    },
    props: {
        id: {
            type: [Number, String],
            required: true
        }
    },
    components: {
        PostForm
    },
    methods: {
        async update(form){
            try {
                if(!this.$refs.form.validate()) return
                await this.updatePost({
                    id: this.id,
                    post: form
                })
                this.$store.commit('notifier/showMessage', {
                    content: 'Post updated successfully',
                    type: 'success'
                })
                this.$router.push('/posts/search')
            } catch (err) {
                this.$store.commit('notifier/showMessage', {
                    content: err.response.data.message || 'An unexpected error occurred',
                    type: 'error'
                })
            }
        },
        ...mapActions('posts', {
            updatePost: 'update'
        }),
        ...mapActions('posts', {
            findPost: 'findById'
        })
    },
    async created() {
        try{
            const post = await this.findPost(this.id)
            this.post = {
                title: post.title,
                description: post.description,
                image: post.image || '',
                categories: post.categoriesId || [],
            }
        } catch (err) {
            const response = err.response
            if(response.statusCode == 404){
                this.$router.back()
            }
        }
    }
}
</script>

<style scoped>
.title {
    padding: 50px 0;
}
</style>