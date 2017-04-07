<template>
  <div id='app'>
    <input type='button' class='btn btn-danger' value='Schreibe Fehlzeiten' @click='setMissingTimes()' style='width: 200px; height: 75px;margin: 10px;'>
    <div class='container'>
      <div class='row'>
        <button class='btn btn-danger' @click='logout()'>Logout</button>
      </div>
      <div class='row'>
        <overview :currentuser='user'></overview>
      </div>
      <div class='row'>
        <missedtimes :currentuser='user'></missedtimes>
      </div>
      <div class="row">
        <firebaselogin></firebaselogin>
      </div>
    </div>    
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
    watch: {
      user: function(){
        awesome.debug('debug','App.vue','Current user change detected')
      }
    },
    data() {
      return {
        user
      }
    },
    created(){
      // Valid after page refresh
      firebase.auth().onAuthStateChanged((newUser) => {
        if(newUser){
          this.user = newUser
        } else {
          awesome.debug('info','App.vue','User logged out')
          user = ""
        }


      })
    }
  }

</script>

<style scoped>


</style>
