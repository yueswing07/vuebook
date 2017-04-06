<template>
  <div id='app'>
    <input type='button' class='btn btn-danger' value='Schreibe Fehlzeiten' @click='setMissingTimes()' style='width: 200px; height: 75px;margin: 10px;'>
    <div class='container'>
      <div class='row'>
        <button class='btn btn-danger' @click='logout()'>Logout</button>
        <div class='row'>
          <overview :currentuser='this.user'></overview>
        </div>
        <div class='row'>
          <missedtimes :currentuser='this.user'></missedtimes>
        </div>
      </div>
      <firebaselogin></firebaselogin>
    </div>
  </div>
</template>


<script>
  import firebaselogin from './components/FirebaseLogin'
  import overview from './components/Overview'
  import missedtimes from './components/MissedTimes.vue'
  import Helper from './FBHelper.js'
  import User from './User.js'
  import awesome from './awesomeDebug.js'
  import firebase from 'firebase';

  var fbhelper = new Helper();
  var user = ""

  export default {
    name: 'app',
    components: {
      firebaselogin,
      overview,
      missedtimes
    },
    methods: {
      logout: function () {
        fbhelper.signOutUser()
      },
      setMissingTimes: function(da){

      }
    },
    data() {
      return {
        user
      }
    },
    created(){
      // Valid after page refresh
      firebase.auth().onAuthStateChanged((user) => {
        if(user){
          this.user = user
          awesome.debug('info', 'App.vue', 'Auth state changed',this.user);
        } else {
          awesome.debug('info','App.vue','User logged out')
          this.user = ""
        }


      })
    }
  }

</script>

<style scoped>


</style>
