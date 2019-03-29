import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage'
import LoginPage from '../login/LoginPage'
import RegisterPage from '../register/RegisterPage'
import Employees from '../pages/Employees'
import Customers from '../pages/Customers'
import Packages from '../pages/Packages'
import Complaints from '../pages/Complaints'
import Vehicles from '../pages/Vehicles'
import Drivers from '../pages/Drivers'
import Custom from '../pages/Custom'
import Stats from '../pages/Stats'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/Employees', component: Employees },
    { path: '/Customers', component: Customers },
    { path: '/Packages', component: Packages },
    { path: '/Complaints', component: Complaints },
    { path: '/Vehicles', component: Vehicles },
    { path: '/Drivers', component: Drivers },
    { path: '/Custom', component: Custom },
    { path: '/Stats', component: Stats },

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})
