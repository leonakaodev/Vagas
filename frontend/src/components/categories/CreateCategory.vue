<template>
    <v-dialog v-model="dialog" persistent max-width="400px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                text
                dark
                v-bind="attrs"
                v-on="on"
            >
                Add new category
            </v-btn>
        </template>
        <v-card>
            <v-card-text>
                <v-col cols="12">
                    <v-text-field
                        v-model="name"
                        label="Category name"
                        required
                        @keyup.enter="save()"
                    ></v-text-field>
                </v-col>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close()">Close</v-btn>
                <v-btn color="blue darken-1" text @click="save()">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data: () => ({
        dialog: false,
        name: ''
    }),
    methods: {
        async save() {
            try {
                const { id } = await this.createCategory({ name: this.name })
                this.$store.commit('notifier/showMessage', {
                    content: 'Category registered successfully',
                    type: 'success'
                })
                this.$emit('create', id)
                this.close()
            } catch (err) {
                this.$store.commit('notifier/showMessage', {
                    content: 'An error occurred: ' + err.message,
                    type: 'error'
                })
            }
        },
        close(){
            this.name = ''
            this.dialog = false
        },
        ...mapActions('categories', {
            createCategory: 'create'
        })
    }
}
</script>