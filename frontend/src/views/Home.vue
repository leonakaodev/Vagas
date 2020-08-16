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

export default {
    name: 'Home',
    components: {
        PostCard
    },
    data: () => {
        return {
            posts: [
                {title: 'Titulo', description: 'Descrição'},
                {title: 'Titulo', description: 'Descrição'},
                {title: 'Titulo', description: 'Descrição'},
                {title: 'Titulo', description: 'Descrição'},
                {title: 'Titulo', description: 'Descrição'},
            ]
        }
    }
}
</script>


<style scoped>
.card-post {
    width: 30vw;
    margin-bottom: 30px;
}
</style>