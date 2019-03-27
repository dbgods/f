import Vue from 'vue';
import VeeValidate from 'vee-validate';

import { store } from './_store';
import { router } from './_helpers';
import App from './app/App';
import VueGoodTablePlugin from 'vue-good-table';
import axios from 'axios'

Vue.prototype.$http = axios;
Vue.prototype.shost = "http://ec2-54-86-52-215.compute-1.amazonaws.com:3000";
Vue.use(VeeValidate);
Vue.use(VueGoodTablePlugin);

// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
