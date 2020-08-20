<template>
    <v-container>
        <v-row class="d-flex justify-center align-items-center title">
            <h1>All categories</h1>
        </v-row>
        <v-row>
            <CategoryList />
        </v-row>
    </v-container>
</template>

<script>
import CategoryList from '@/components/categories/CategoryList'

export default {
    name: 'ListCategories',
    components: {
        CategoryList
    }
}
</script>

<style scoped>

.title {
    padding: 50px 0;
}

</style>