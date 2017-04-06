<template>
  <div id='app'>
    <input type='button' class='btn btn-danger' value='Schreibe Fehlzeiten' @click='setMissingTimes()' style='width: 200px; height: 75px;margin: 10px;'>
    <div class='container'>
      <div class='row'>
        <div v-if='user'>
          <button class='btn btn-danger' @click='logout()'>Logout</button>
          <div class='row'>
            <overview :currentuser='user'></overview>
          </div>
          <div class='row'>
            <missedtimes :currentuser='user'></missedtimes>
          </div>
        </div>
        <div v-else>
          <firebaselogin @userLoggedIn='userLogin'></firebaselogin>
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

  var user = false

  export default {
    name: 'app',
    components: {
      firebaselogin,
      overview,
      missedtimes
    },
    methods: {
      userLogin: function (args) {
        this.user = new User(args.user.displayName, args.user.email, args.user.uid)
      },
      logout: function () {
        var fbhelper = new Helper();
        fbhelper.signOutUser()
      },
      setMissingTimes: function(da){

      }
    },
    data() {
      return {
        user,
      }
    },
    created(){
      // Valid after page refresh
      var fbhelper = new Helper()
      console.log("Current user", fbhelper.getCurrentUser());
    }
  }

</script>

<style scoped>


</style>
