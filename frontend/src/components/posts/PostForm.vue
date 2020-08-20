<template>
    <v-form ref="form" class="post-form">
        <v-container>
            <v-row>
                <v-col cols="12" class="mb-5">
                    <p class="mb-0">
                        <a @click='generateImage()'>
                            Generate random image url
                        </a>
                    </p>
                    <v-text-field
                        label="Image url"
                        v-model="form.image"
                        outlined
                    ></v-text-field>
                    <v-img
                        v-if="form.image"
                        :src="form.image"
                        height="400"
                    />
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        label="Title"
                        v-model="form.title"
                        outlined
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-textarea
                        label="Description"
                        v-model="form.description"
                        outlined
                    ></v-textarea>
                </v-col>
                <v-col cols="12">
                    <p class="mb-0">
                        <CreateCategory @create="newCategory" />
                    </p>
                    <v-select
                        v-model="form.categories"
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
            <v-row justify="end" class="mt-4">
                <v-col cols="12" align="right">
                    <v-btn
                        color="warning"
                        @click="cancel"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                        class="ml-5"
                        color="primary"
                        @click="save"
                    >
                        Save
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CreateCategory from '../categories/CreateCategory'

export default {
    data: () => {
        return {
            form: {
                title: '',
                description: '',
                image: '',
                categories: []
            }
        }
    },
    props: {
        post: {
            type: Object,
            required: false
        }
    },
    computed: {
        ...mapState('categories', {
            categoriesOptions: state => state.categories,
        })
    },
    components: {
        CreateCategory
    },
    methods: {
        generateImage() {
            this.form.image = 'https://unsplash.it/800/800'
        },
        newCategory(category) {
            this.form.categories.push(category)
        },
        save(){
            this.$emit('save', this.form)
        },
        cancel(){
            this.$emit('cancel')
        },
        syncWithPost(post){
            this.form = Object.assign(this.form, post)
        },
        ...mapActions('categories', {
            loadCategories: 'load'
        }),
    },
    created() {
        this.loadCategories()
        if(this.post) {
            this.syncWithPost(this.post)
        }
    },
    watch: {
        post(value) {
            this.syncWithPost(value)
        }
    }
}
</script>

<style scoped>
.post-form .col{
    padding-top: 0;
    padding-bottom: 0;
}
</style>