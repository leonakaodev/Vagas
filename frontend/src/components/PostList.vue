<template>
    <v-container>
        <v-row class="header">
            <v-col cols="12">
                <v-text-field v-model="search" label="Search posts" hide-details="auto">
                    <v-icon slot="append">mdi-magnify</v-icon>
                </v-text-field>
            </v-col>
            <v-col
                cols="11"
            >
                <v-select
                    v-model="categories"
                    :items="keys"
                    item-text="name"
                    item-value="value"
                    prepend-inner-icon="mdi-magnify"
                    multiple
                    chips
                ></v-select>
            </v-col>
            <v-col
                cols="1"
                class="d-flex align-center justify-end"
            >
                <v-icon @click="changeSort()" v-text="sortIcon" />
            </v-col>
        </v-row>
        <v-row class="main">
            <v-container fill>
                <PostListItem
                    v-for="post in request.data"
                    :key="post.id"
                    :post="post"
                />
            </v-container>
        </v-row>
        <v-row class="footer d-flex justify-end">
            <v-pagination
                v-model="currentPage"
                :length="request.totalPages"
                :total-visible="5"
            ></v-pagination>
        </v-row>
    </v-container>
</template>

<script>
import PostListItem from './PostListItem'

export default {
    components: {
        PostListItem
    },
    data: () => {
        return {
            sort: 'asc',
            categories: [],
            search: '',
            keys: [
                { name: 'Chatos', value: 1 },
                { name: 'Legais', value: 2 },
                { name: 'Divertidos', value: 3 },
                { name: 'Engraçados', value: 4 },
            ],
            currentPage: 1,
            request: {
                page: 1,
                totalPages: 8,
                data: [
                    { id: 1, title: 'Titulo', description: 'Descrição'},
                    { id: 2, title: 'Titulo', description: 'Descrição'},
                    { id: 3, title: 'Titulo', description: 'Descrição'},
                    { id: 4, title: 'Titulo', description: 'Descrição'},
                    { id: 5, title: 'Titulo', description: 'Descrição'},
                ]
            }
        }
    },
    methods: {
        changeSort() {
            this.sort = this.sort === 'asc' ? 'desc' : 'asc'
        }
    },
    computed: {
        sortIcon() {
            return this.sort === 'asc' ? 'mdi-sort-clock-ascending' : 'mdi-sort-clock-descending'
        }
    }
}
</script>