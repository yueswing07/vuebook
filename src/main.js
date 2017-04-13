// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'Vuex'
import VueRouter from 'vue-router'

import App from './App'
import InvalidUser from './InvalidUser.vue'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

import Helper from './FBHelper'
import VueFire from 'vuefire'
import awesome from './awesomeDebug.js'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import firebase from 'firebase'

var fbHelper = new Helper();
fbHelper.initializeFirebase();

Vue.use(BootstrapVue);
Vue.use(VueFire);
Vue.use(VueRouter);
Vue.use(Vuex)

/*
  ROUTING
 */
const routes = [
    { path: '/', component: App },
    { path: '/invalid', component: InvalidUser },
    { path: '/register', component: Register },
    { path: '/dashboard', component: Dashboard },
    { path: '/login', component: Login },
]
const router = new VueRouter({
    routes,
    mode: 'hash',
    base: window.location.href
})
const store = new Vuex.Store({
    state: {
        count: 0,
        user: '',
        missingTimes: '',
        events: ''
    },
    mutations: {
        increment(state) {
            state.count++
        },
        setUser(state, newUser) {
            state.user = newUser
        },
        setMissingTimes(state, missingTimes) {
            state.missingTimes = missingTimes
        },
        setEventList(state, eventList) {
            state.events = eventList
        }
    }
})

/*
  Init main application
*/
const application = new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
    router,
    store
}).$mount('#app');

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('Valid user');
        store.commit('setUser', user)
    } else {
        console.log('Invalid user');
    }
})