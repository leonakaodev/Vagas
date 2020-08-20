<template>
    <v-row>
        <v-col cols="10">
            <v-row class="text-center text-sm-left">
                <v-col cols="12">
                    <span class="category-title">
                        {{ category.name }}
                    </span>
                </v-col>
            </v-row>
        </v-col>
        <v-col
            cols="2"
            align="center"
            align-sm="start"
        >
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
    name: 'categoryListItem',
    props: {
        category: {
            type: Object,
            required: true
        }
    },
    methods: {
        async remove() {
            try {
                await this.deleteCategory({ id: this.category.id })
                this.$store.commit('notifier/showMessage', {
                    content: 'Category deleted successfully',
                    type: 'success'
                })
                this.$emit('delete')
            } catch (err) {
                this.$store.commit('notifier/showMessage', {
                    content: err.response.data.message || 'An unexpected error occurred',
                    type: 'error'
                })
            }
        },
        ...mapActions('categories', {
            deleteCategory: 'delete'
        })
    }
}
</script>

<style scoped>
.categories span + span {
    margin-left: 1rem;
}
</style>