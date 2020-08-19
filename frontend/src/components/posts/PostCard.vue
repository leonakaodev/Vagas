<template>
    <v-card
        class="mx-auto card-post"
        min-width="400"
    >
        <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
            <v-card-title>{{ post.title }}</v-card-title>
        </v-img>

        <v-card-text class="text--primary">
            <div>{{ post.description }}</div>
        </v-card-text>

        <v-card-actions>
            <v-btn
                color="orange"
                text
            >
                More +
            </v-btn>
        </v-card-actions>
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
</style>