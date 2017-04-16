// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'Vuex'
import VueRouter from 'vue-router'

import App from './App'

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
]
const router = new VueRouter({
    routes,
    mode: 'hash',
    base: window.location.href
})
const store = new Vuex.Store({
    state: {
        count: 0,
        loggedInUser: '',
        missingTimes: '',
        events: '',
        selectedStudent: ''
    },
    mutations: {
        increment(state) {
            state.count++
        },
        setUser(state, newUser) {
            state.loggedInUser = newUser
        },
        setMissingTimes(state, missingTimes) {
            state.missingTimes = missingTimes
        },
        setEventList(state, eventList) {
            state.events = eventList
        },
        setSelectedStudent(state, student) {
            state.selectedStudent = student
        },
        updateMissingTime(state, singleTime) {
            if (!singleTime.uid) {
                alert('Die zu ändernde Zeit hat keine UID!')
            } else {
                console.log('Updateing missing Time', singleTime)
                if (state.selectedStudent) {
                    firebase.database().ref('users/' + state.selectedStudent.uid + '/missingtimes/' + singleTime.uid).update(singleTime)
                } else {
                    alert('Es wurde kein Schüler ausgewählt')
                }

            }
        },
        removeMissingTime(state, timeEntryUID) {
            if (state.selectedStudent) {
                firebase.database().ref('users/' + state.selectedStudent.uid + '/missingtimes/' + timeEntryUID).remove()
            } else {
                alert('Es wurde kein Schüler ausgewählt')
            }

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
        store.commit('setUser', null)
    }
})