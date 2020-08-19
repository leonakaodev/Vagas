<template>
    <v-snackbar
        v-model="show"
        :timeout="timeout"
        color="success"
        bottom
        right
        text
        dark
    >
        {{ message }}
        <template v-slot:action="{ attrs }">
            <v-btn
                color="blue"
                text
                v-bind="attrs"
                @click="show = false"
            >
                x
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
export default {
    data () {
        return {
            show: false,
            message: '',
            type: '',
            timeout: 2000
        }
    },

    created () {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'notifier/showMessage') {
                this.message = state.notifier.content
                this.type = state.notifier.type
                this.timeout = state.notifier.timeout
                this.show = true
            }
        })
    }
}
</script>