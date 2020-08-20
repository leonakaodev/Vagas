<template>
    <v-container>
        <v-row class="d-flex justify-center align-items-center title">
            <h1>Look our posts</h1>
        </v-row>
        <v-row>
            <PostList />
        </v-row>
    </v-container>
</template>

<script>
import PostList from '@/components/posts/PostList'

export default {
    name: 'search',
    components: {
        PostList
    }
}
</script>

<style scoped>

.title {
    padding: 50px 0;
}

</style>