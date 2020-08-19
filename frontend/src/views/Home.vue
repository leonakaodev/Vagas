<template>
    <v-container>
        <v-row class="d-flex justify-center align-items-center title">
            <h1>Welcome to Blog</h1>
        </v-row>
        <v-row>
            <PostCard
                v-for="(post, index) in posts"
                :key="index"
                :post="post"
            />
        </v-row>
        <v-row class="showList">
            <v-col cols="12">
                <v-btn
                    color="primary"
                    to="/posts/search"
                    block
                >
                    Show more posts
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import PostCard from '@/components/posts/PostCard'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'Home',
    components: {
        PostCard
    },
    computed: {
        ...mapState('home', {
            posts: state => state.posts,
        })
    },
    methods: {
        ...mapActions('home', [
            'load'
        ])
    },
    created() {
        this.load()
    }
}
</script>

<style scoped>
.title {
    padding: 50px 0;
}

.showList {
    padding: 25px 0;
}

.showList button {
    padding: 20px 0;
}
</style>