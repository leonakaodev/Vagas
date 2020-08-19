<template>
    <v-container>
        <v-row class="d-flex justify-center align-items-center title">
            <h1>Create a new post</h1>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-form ref="form">
                    <v-row class="row-form">
                        <v-col cols="12" class="mb-5">
                            <p class="mb-0">
                                <a @click='generateImage()'>
                                    Generate random image url
                                </a>
                            </p>
                            <v-text-field
                                label="Image url"
                                v-model="image"
                                outlined
                            ></v-text-field>
                            <v-img
                                v-if="image"
                                :src="image"
                                height="400"
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                label="Title"
                                v-model="title"
                                outlined
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea
                                label="Description"
                                v-model="description"
                                outlined
                            ></v-textarea>
                        </v-col>
                        <v-col cols="12">
                            <p class="mb-0">
                                <a @click="addNewTag()">Add new tag</a>
                            </p>
                            <v-select
                                v-model="categories"
                                :items="categoriesOptions"
                                class="mt-0 pt-0"
                                item-text="name"
                                item-value="id"
                                prepend-inner-icon="mdi-tag"
                                multiple
                                chips
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
            <v-col cols="12">
                <v-row
                    justify="end"
                >
                    <v-col
                        cols="3"
                        align="right"
                    >
                        <v-btn
                            @click="create"
                            color="primary"
                        >
                            Salvar
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'Home',
    data() {
        return {
            title: '',
            description: '',
            image: undefined,
            validImage: false,
            categories: [],
        }
    },
    computed: {
        ...mapState('categories', {
            categoriesOptions: state => state.categories,
        })
    },
    methods: {
        generateImage() {
            this.image = 'https://unsplash.it/800/800'
        },
        async create(){
            try {
                await this.createPost({
                    title: this.title,
                    description: this.description,
                    image: this.validImage ? this.image : undefined,
                    categories: this.categories
                })
                this.$router.push('/posts/search',)
            } catch (err) {
                let message = err.response ? err.response.data.message : err.message
                alert('An error occurred: ' + message)
            }
        },
        addNewTag(){
            alert('Option not allowed yet')
        },
        ...mapActions('posts', {
            createPost: 'create'
        }),
        ...mapActions('categories', {
            loadCategories: 'load'
        }),
    },
    created() {
        this.loadCategories()
    }
}
</script>

<style scoped>
.title {
    padding: 50px 0;
}

.row-form .col{
    padding-top: 0;
    padding-bottom: 0;
}
</style>