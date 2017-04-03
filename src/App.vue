<template>
  <div id="app">
    <div class="container">
      <div class="row">
          <firebaselogin @userLoggedIn="changeUserInfo"></firebaselogin>
      </div>
      <!--<div v-if="validUser" class='row'>-->
      <div class='row'>
        <overview :currentuser='currentUser'></overview>
      </div>
    </div>
  </div>
</template>

<script>
    import firebaselogin from './components/FirebaseLogin'
    import overview from './components/Overview'
    export default {
        name: 'app',
        components: {
            firebaselogin,
            overview
        },
        methods: {
            changeUserInfo: function(args) {
                console.log("test", args);
                this.currentUser.name = args.user.displayName;
                this.currentUser.email = args.user.email;
                this.validUser = true;
            },
            debugInfo: function() {
                console.log(this.currentUser);
            }
        },
        data() {
            return {
                currentUser: {
                    name: "Hans Zimmer",
                    email: "epicmusic@zimmer.com"
                },
                username: "Hans",
                validUser: false
            }
        }
    }
</script>

<style scoped>

</style>