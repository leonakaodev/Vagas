<template>
    <v-row>
        <v-col cols="2">
            <v-img
                class="white--text align-end"
                height="100px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            />
        </v-col>
        <v-col cols="10">
            <v-row>
                <v-col cols="2">
                    {{ post.title }}
                </v-col>
                <v-col cols="8">
                    {{ post.description }}
                </v-col>
                <v-col cols="2">
                    Actions
                </v-col>
            </v-row>
            <v-row class="categories">
                <v-chip>teste</v-chip>
                <v-chip>teste</v-chip>
                <v-chip>teste</v-chip>
                <v-chip>teste</v-chip>
            </v-row>
        </v-col>
        <v-col cols="12">
            <v-divider />
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'PostListItem',
    props: {
        post: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
.categories span + span {
    margin-left: 20px;
}
</style>