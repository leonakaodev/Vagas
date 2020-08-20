<template>
    <v-card
        class="mx-auto card-post"
        min-width="400"
    >
        <v-img
            class="white--text align-end"
            height="200px"
            :src="post.image || require('@/assets/images/no-image.png')"
        >
            <v-card-title class="card-title">{{ post.title }}</v-card-title>
        </v-img>

        <v-card-text class="text--primary">
            <div>{{ post.description }}</div>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
.card-post {
    width: 30vw;
    margin-bottom: 30px;
}

.card-title {
    background-color: rgba(0, 0, 0, 0.5);
    padding-top: 0.2em;
    padding-bottom: 0.2em;
}
</style>