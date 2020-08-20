<template>
    <v-row>
        <v-col
            md="2"
            sm="4"
            cols="12"
            align="center"
        >
            <v-img
                class="white--text align-end"
                height="auto"
                max-width="200px"
                :src="post.image || 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'"
            />
        </v-col>
        <v-col
            sm="6"
            cols="12"
            align="center"
            align-md="start"
        >
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
        <v-col
            sm="2"
            cols="12"
            align="center"
            align-sm="start"
        >
            <v-btn
                text
                @click="edit()"
            >
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
                text
                @click="remove()"
            >
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </v-col>
        <v-col cols="12">
            <v-divider />
        </v-col>
    </v-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'PostListItem',
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    methods: {
        async remove() {
            try {
                await this.deletePost({ id: this.post.id })
                this.$store.commit('notifier/showMessage', {
                    content: 'Post deleted successfully',
                    type: 'success'
                })
                this.$emit('delete')
            } catch (err) {
                this.$store.commit('notifier/showMessage', {
                    content: 'An error occurred: ' + err.message,
                    type: 'error'
                })
            }
        },
        async edit() {
            this.$router.push({ name: 'EditPost', params: { id: this.post.id }})
        },
        ...mapActions('posts', {
            deletePost: 'delete'
        })
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