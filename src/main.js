// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import Overview from './Overview'

import Helper from './FBHelper'
import VueFire from 'vuefire'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

var fbHelper = new Helper();
fbHelper.initializeFirebase();

Vue.use(BootstrapVue);
Vue.use(VueFire);
Vue.use(VueRouter);

/*
  ROUTING
 */
const NotFound = { template: '<p>Page not found</p>' }

const routes = {
  '/' : App,
  '/overview' : Overview,
}
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  data: {
    currentRoute : window.location.pathname
  },
  computed: {
    ViewComponent() {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent)}
})


// firebase.child('notes').set([
//   {title: 'Hello world', content: 'Lorem ipsum'}
// ])
// firebase.child('notes').on('value', (snapshot) => {
//   let notes = snapshot.val()
//   console.log(notes)
//   window.alert(notes[0].title)
// })
