// import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js';
//import VueRouter from 'https://cdn.jsdelivr.net/npm/vue-router@3.5.2/dist/vue-router.js';

// import { home } from './home.js';
// import { customers } from './customers.js';
// import { client_contacts } from './client_contacts.js';
// import { caregivers } from './caregivers.js';
// import { caregiver_contacts } from './caregiver_contacts.js';
// import { services } from './services.js';
// import { schedules } from './schedules.js';
// import { billings } from './billings.js';
// import { admins } from './admins.js';
// import { messages } from './messages.js';

Vue.use(VueRouter);

const routes = [
    { path: '/home', component: home },
    { path: '/customers', component: customers },
    { path: '/client_contacts', component: client_contacts },
    { path: '/caregivers', component: caregivers },
    { path: '/caregiver_contacts', component: caregiver_contacts },
    { path: '/services', component: services },
    { path: '/schedules', component: schedules },
    { path: '/billings', component: billings },
    { path: '/admins', component: admins },
    { path: '/messages', component: messages }
];

const router = new VueRouter({
    routes
});

new Vue({
    router
}).$mount('#app');
