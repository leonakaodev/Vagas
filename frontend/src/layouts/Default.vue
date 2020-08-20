<template>
    <v-app>
        <v-navigation-drawer
            v-model="drawer"
            disable-resize-watcher
            app
        >
            <v-list
                dense
                rounded
            >
                <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    :to="item.to"
                    link
                >
                    <v-list-item-icon>
                        <v-icon v-text="item.icon" />
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar
            app
            color="primary"
            dark
        >
            <div class="d-flex align-center">
                <v-btn
                    @click="drawer = !drawer"
                    text
                >
                    <v-icon>mdi-menu</v-icon>
                </v-btn>
            </div>

            <v-spacer></v-spacer>

            <v-btn
                text
                to="/posts/create"
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

<script>
export default {
    data: () => {
        return{
            drawer: false,
            items: [
                { title: 'Home', icon: 'mdi-home', to: '/' },
                { title: 'Posts', icon: 'mdi-format-list-bulleted', to: '/posts/search' },
                { title: 'Categories', icon: 'mdi-label', to: '/categories/list' },
            ]
        }
    }
}
</script>

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