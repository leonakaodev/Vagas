<template>
    <v-container>
        <v-row class="d-flex justify-center align-items-center title">
            <h1>All categories</h1>
        </v-row>
        <v-row>
            <v-col cols="12" align="right">
                <CreateCategory />
            </v-col>
            <v-col cols="12">
                <CategoryList />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import CategoryList from '@/components/categories/CategoryList'
import CreateCategory from '../components/categories/CreateCategory'

export default {
    name: 'ListCategories',
    components: {
        CategoryList,
        CreateCategory
    }
}
</script>

<style scoped>

.title {
    padding: 50px 0;
}

</style>