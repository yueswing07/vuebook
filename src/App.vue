<template>
  <div id='app'>
    <div class='container-fluid'>
      <div class="row">        
        <button class='btn btn-danger' @click='logout()' v-if='user.loggedin'>Logout</button>
        <firebaselogin v-else></firebaselogin>
      </div>
      <div class='row'>
        <overview :currentuser='user'></overview>
      </div>
      <div class='row'>
        <div class="col-md-12">
          <missedtimes :currentuser='user'></missedtimes>
        </div>
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
          this.user.loggedin = true;
        } else {
          awesome.debug('info','App.vue','User logged out')
          this.user = false;
        }
      })
    }
  }

</script>

<style scoped>


</style>
