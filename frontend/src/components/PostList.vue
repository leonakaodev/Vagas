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
export default {
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
                    { title: 'Titulo', description: 'Descrição'}
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