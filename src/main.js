import { createApp } from 'vue';
import { createRouter, createWebHistory } from "vue-router";

import App from './App.vue';
import TeamList from './components/teams/TeamsList.vue';
import UserList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import UsersFooter from "./components/users/UsersFooter.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/teams' },
        {
            name: 'teams',
            path: '/teams', 
            components: {
                default: TeamList,
                footer: TeamsFooter
            }, 
            children: [
                { name: 'teams-member', path: ':teamId', component: TeamMembers, props: true },
            ]
        },
        {
            path: '/users', 
            components: {
                default: UserList, 
                footer: UsersFooter
            },
            beforeEnter: (to, from, next) => {
                console.log('users beforeEnter');
                console.log(to, from);
                next();
            }
        },
        { path: '/:notFound(.*)', component: NotFound }
    ],
    linkActiveClass: 'active',
    scrollBehavior (_, _2, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        
        return {
            left: 0,
            top: 0
        }
    }
});

router.beforeEach(function (to, from, next) {
    console.log('Global beforeEach');
    console.log(to, from);
    next()
});

router.afterEach((to, from) => {
    // sending analytics data.
    console.log('Global afterEach');
    console.log(to, from);
})

const app = createApp(App)

app.use(router);

app.mount('#app');
