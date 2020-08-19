<template>
    <v-container>
        <v-row class="header">
            <v-col cols="12" sm="12" md="6">
                <v-text-field
                    v-model="search"
                    label="Search posts"
                    hide-details="auto"
                    prepend-icon="mdi-magnify"
                />
            </v-col>
            <v-col cols="12" sm="12" md="6">
                <v-menu
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="dateFormated"
                            label="Created at"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        />
                    </template>
                    <v-date-picker
                        v-model="date"
                        range
                        :max="(new Date(new Date().setHours(0, 0, 0))).toISOString()"
                    />
                </v-menu>
            </v-col>
            <v-col
                cols="11"
            >
                <v-select
                    v-model="categories"
                    :items="keys"
                    item-text="name"
                    item-value="value"
                    prepend-inner-icon="mdi-tag"
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
            date: [],
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
                    { id: 1, title: 'Titulo', description: 'Descrição', categories: ['legal', 'chato']},
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
        },
        formatDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },
    },
    computed: {
        sortIcon() {
            return this.sort === 'asc' ? 'mdi-sort-clock-ascending' : 'mdi-sort-clock-descending'
        },
        dateFormated() {
            const date = this.date.map(date => {
                return this.formatDate(date)
            })
            return date.join(' ~ ')
        }
    }
}
</script>