// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'Vuex'
import VueRouter from 'vue-router'

import App from './App'
import RegistrationStudent from './pages/Registration.vue'
import RegistrationTeacher from './pages/RegistrationTeacher'
import DashboardStudent from './pages/DashboardStudent.vue'
import DashboardTeacher from './pages/DashboardTeacher.vue'
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
    { path: '/registration-student', component: RegistrationStudent },
    { path: '/registration-teacher', component: RegistrationTeacher },
    { path: '/dashboard-student', component: DashboardStudent },
    { path: '/dashboard-teacher', component: DashboardTeacher },
    { path: '/app', component: App },
]
const router = new VueRouter({
    routes,
})
const store = new Vuex.Store({
    state: {
        loginType: '',
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
        loginUser(state,loginInfos) {
            awesome.debug('debug','main.js','Login type infos',loginInfos.loginType)
            switch(loginInfos.providerName){
                case 'google':
                    var provider = new firebase.auth.GoogleAuthProvider();
                    firebase.auth().signInWithPopup(provider).then(function(result) {
                        state.loggedInUser = result.user
                        state.loginType = loginInfos.loginType
                    })
                break;
            }
        },
        logoutUser(state){
            store.commit('setUser', null)
            router.push('/')
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
    components: { App,RegistrationStudent,RegistrationTeacher,Welcome },
    router,
    store
}).$mount('#app');

var that = this
firebase.auth().onAuthStateChanged(function(user){
    if(user){
        firebase.database().ref('users/'+user.uid).once('value', (snapshot)=>{
            awesome.debug('servere','main.js','User login info',store.state.loginType)
            if(!snapshot.val()){
                switch(store.state.loginType){
                    case 'student':
                        awesome.debug('info','main.js','Student type login')
                        router.push('/registration-student')
                    break;
                    case 'teacher':
                        awesome.debug('info','main.js','Teacher type login')
                        router.push('/registration-teacher')
                    break;
                    default:
                        awesome.debug('servere','main.js','No login type info')
                        router.push('/')
                        firebase.auth().signOut()
                    break;
                }
            } else {
                switch(store.state.loginType){
                    case 'student':
                        awesome.debug('info','main.js','Student type login')
                        router.push('/dashboard-student')
                    break;
                    case 'teacher':
                        awesome.debug('info','main.js','Teacher type login')
                        router.push('/dashboard-teacher')
                    break;
                    default:
                        awesome.debug('servere','main.js','No login type info')
                        router.push('/')
                        firebase.auth().signOut()
                    break;
                }
            }
        })
        store.commit('setUser',user)
    } else {
        store.commit('setUser',null)
    }
})