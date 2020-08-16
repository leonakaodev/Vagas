<template>
    <v-app>
        <v-app-bar
            app
            color="primary"
            dark
        >
            <div class="d-flex align-center">
                <v-icon>mdi-menu</v-icon>
            </div>

            <v-spacer></v-spacer>

            <v-btn
                href="https://github.com/vuetifyjs/vuetify/releases/latest"
                target="_blank"
                text
            >
                <span class="mr-2">New post</span>
                <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
        </v-app-bar>

        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<style scoped>

.navbar {
    width: 100%;
    position: relative;
    height: 50px;
    background-color: #339AF0;
    display: flex;
    padding: 0 25px;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
}

.navbar svg + svg{
    margin-left: 15px;
}

</style>