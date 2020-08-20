<template>
    <v-container class="pa-10">
        <v-row class="content">
            <v-container fill>
                <CategoryListItem
                    v-for="category in categories"
                    :key="category.id"
                    :category="category"
                    @delete="load()"
                />
            </v-container>
        </v-row>
    </v-container>
</template>

<script>
import CategoryListItem from './CategoryListItem'
import { mapState, mapActions } from 'vuex'

export default {
    components: {
        CategoryListItem
    },
    created(){
        this.load()
    },
    methods: {
        ...mapActions('categories', {
            load: 'load'
        }),
    },
    computed: {
        ...mapState('categories', {
            categories: state => state.categories,
            totalPages: state => state.totalPages,
            currentPage: state => state.page,
        }),
        ...mapState('categories', {
            categories: state => state.categories,
        })
    },
}
</script>