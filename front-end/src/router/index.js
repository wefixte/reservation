import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import RegisterAdmin from '@/views/RegisterAdmin.vue';
import AdminHome from '@/views/AdminHome.vue'; 

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/register-admin',
    name: 'register-admin',
    component: RegisterAdmin
  },
  {
    path: '/admin-dashboard',
    name: 'admin-dashboard',
    component: AdminHome,
    meta: { requiresAuth: true, admin: true }
}
]
});

// Middleware pour vérifier que l'utilisateur est un admin
router.beforeEach((to, from, next) => {
const token = localStorage.getItem('token');
const user = token ? JSON.parse(atob(token.split('.')[1])) : null;

if (to.matched.some(record => record.meta.requiresAuth)) {
if (!token) {
    return next({ name: 'login' });
}

if (to.matched.some(record => record.meta.admin) && user.role !== 'admin') {
    return next({ name: 'home' });
}

next();
} else {
next();
}
});

export default router;
