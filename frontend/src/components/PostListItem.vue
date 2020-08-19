<template>
    <v-row>
        <v-col md="2" sm="12">
            <v-img
                class="white--text align-end"
                height="100px"
                :src="post.image || 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'"
            />
        </v-col>
        <v-col md="8" sm="12">
            <v-row>
                <v-col cols="12">
                    <span class="post-title">
                        {{ post.title }}
                    </span>
                    <span class="post-description">
                        {{ post.description }}
                    </span>
                </v-col>
            </v-row>
            <v-row v-if="post.categories" class="categories">
                <v-col cols="12">
                    <v-chip
                        v-for="category in post.categories"
                        :key="category"
                        color="primary"
                    >
                        {{ category }}
                    </v-chip>
                </v-col>
            </v-row>
        </v-col>
        <v-col md="2" sm="12" cols="12">
            Actions
        </v-col>
        <v-col cols="12">
            <v-divider />
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'PostListItem',
    props: {
        post: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
.categories span + span {
    margin-left: 1rem;
}

.post-description {
    margin-left: 1rem;
}
</style>