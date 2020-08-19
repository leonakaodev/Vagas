<template>
    <div id="app">
        <router-view/>
        <Notifier />
    </div>
</template>

<script>
import '../assets/css/main.css'
import Notifier from './Notifier'

export default {
    components: {
        Notifier
    }
}
</script>
