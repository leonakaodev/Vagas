<template>
    <v-container>
        <v-row class="header">
            <v-col cols="12" sm="12" md="6">
                <v-text-field
                    v-model="search"
                    label="Search posts"
                    hide-details="auto"
                    prepend-icon="mdi-magnify"
                    @input="filter"
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
                        @input="filter"
                    />
                </v-menu>
            </v-col>
            <v-col
                cols="11"
            >
                <v-select
                    v-model="categories"
                    :items="categoriesOptions"
                    item-text="name"
                    item-value="value"
                    prepend-inner-icon="mdi-tag"
                    multiple
                    chips
                    @input="filter"
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
                    v-for="post in posts"
                    :key="post.id"
                    :post="post"
                />
            </v-container>
        </v-row>
        <v-row class="footer d-flex justify-end">
            <v-pagination
                :value="currentPage"
                :length="totalPages"
                :total-visible="5"
                @input="update($event)"
            ></v-pagination>
        </v-row>
    </v-container>
</template>

<script>
import PostListItem from './PostListItem'
import { mapState, mapActions } from 'vuex'

export default {
    components: {
        PostListItem
    },
    data: () => {
        return {
            sort: 'desc',
            categories: [],
            search: '',
            date: [],
        }
    },
    created(){
        this.update()
        this.loadCategories()
    },
    methods: {
        changeSort() {
            this.sort = this.sort === 'asc' ? 'desc' : 'asc'
            this.update()
        },
        formatDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },
        update(page = undefined){
            this.loadPosts({
                search: this.search,
                date: this.date,
                categories: this.categories,
                sort: this.sort,
                page
            })
        },
        filter() {
            this.update(1)
        },
        ...mapActions('posts', {
            loadPosts: 'load'
        }),
        ...mapActions('categories', {
            loadCategories: 'load'
        })
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
        },
        ...mapState('posts', {
            posts: state => state.posts,
            totalPages: state => state.totalPages,
            currentPage: state => state.page,
        }),
        ...mapState('categories', {
            categoriesOptions: state => state.categories,
        })
    },
}
</script>