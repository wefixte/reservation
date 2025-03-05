import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Reservation from '../views/Reservation.vue';

const routes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/reservation', component: Reservation },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
