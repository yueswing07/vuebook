// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'Vuex'
import VueRouter from 'vue-router'

import App from './App'
import Registration from './Registration.vue'
import Welcome from './Welcome.vue'

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
    { path: '/', component: Welcome },
    { path: '/registration', component: Registration },
    { path: '/app', component: App },
]
const router = new VueRouter({
    routes,
})
const store = new Vuex.Store({
    state: {
        count: 0,
        loggedInUser: '',
        validUser: '',
        missingTimes: '',
        events: '',
        selectedStudent: '',
        gradelist: ''
    },
    mutations: {
        setUser(state, user){
            state.loggedInUser = user
        },
        loginUser(state,providerName) {
            switch(providerName){
                case 'google':
                    var provider = new firebase.auth.GoogleAuthProvider();
                    firebase.auth().signInWithPopup(provider).then(function(result) {
                        state.loggedInUser = result.user
                    })
                break;
            }                  
        },
        logoutUser(state){
            state.loggedInUser = null
            firebase.auth().signOut()
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
        setGradelist(state, grades){
            state.gradelist = grades
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

        },
        updateUserEvent(state, singleEvent) {
            if (!singleEvent.uid) {
                alert('Die zu ändernde Zeit hat keine UID!')
            } else {
                console.log('Updateing missing Time', singleEvent)
                if (state.selectedStudent) {
                    firebase.database().ref('users/' + state.selectedStudent.uid + '/events/' + singleEvent.uid).update(singleEvent)
                } else {
                    alert('Es wurde kein Schüler ausgewählt')
                }
            }
        },
        removeUserEvent(state, eventUID) {
            if (state.selectedStudent) {
                firebase.database().ref('users/' + state.selectedStudent.uid + '/events/' + eventUID).remove()
            } else {
                alert('Es wurde kein Schüler ausgewählt')
            }
        },
        updateSingleGrade(state,furtherParamters){
            Object.keys(state.gradelist).forEach(key => {
                if (state.gradelist[key].name === furtherParamters.lernfeld){
                    firebase.database().ref('users/'+state.selectedStudent.uid+ '/grades/'+key).update({
                        'grade': furtherParamters.newGrade
                    })
                }
            })
        },
        registerUser(state,userObject){
            firebase.database().ref('users/'+state.loggedInUser.uid+'/').update(userObject)
            router.push('/app')
        }
    }
})

/*
  Init main application
*/
const application = new Vue({
    el: '#app',
    components: { App,Registration,Welcome },
    router,
    store
}).$mount('#app');

var that = this
firebase.auth().onAuthStateChanged(function(user){
    if(user){
        firebase.database().ref('users/'+user.uid).once('value', (snapshot)=>{
            if (!snapshot.val()){
                awesome.debug('info','main.js','New User')
                router.push('/registration')
            } else {
                router.push('/app')
            }
        })
        store.commit('setUser',user)
    } else {
        store.commit('setUser',null)
    }
})