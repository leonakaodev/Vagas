<template>
    <v-container>
        <v-row>
            <PostList />
        </v-row>
    </v-container>
</template>

<script>
import PostList from '@/components/PostList'

export default {
    name: 'search',
    components: {
        PostList
    }
}
</script>