import { createApp } from 'vue';
import { createRouter, createWebHistory } from "vue-router";

import App from './App.vue';
import TeamList from './components/teams/TeamsList.vue';
import UserList from './components/users/UsersList.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/teams', component: TeamList },
        { path: '/users', component: UserList },
    ],
    linkActiveClass: 'active'
});

const app = createApp(App)

app.use(router);

app.mount('#app');
