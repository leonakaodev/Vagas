<template>
    <v-container>
        <v-row>
            <PostCard
                v-for="(post, index) in posts"
                :key="index"
                :post="post"
            />
        </v-row>
    </v-container>
</template>

<script>
import PostCard from '@/components/PostCard'
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
.card-post {
    width: 30vw;
    margin-bottom: 30px;
}
</style>