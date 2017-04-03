<template>
  <div id="app">
    <div class="container">
      <div class="row">
          {{username}}
          <firebaselogin @userLoggedIn="changeUserInfo"></firebaselogin>
          <overview :currentuser='currentUser'></overview>
          <button @click='debugInfo'>Hit me</button>
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
                username: "Hans"
            }
        }
    }
</script>

<style scoped>

</style>