<template>
  <div id="app">
    <div class="container">
      <div class="row">
          {{username}}
          <firebaselogin @userLoggedIn="changeUserInfo"></firebaselogin>
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
                this.username = args.user.displayName;
            }
        },

        data() {
            return {
                currentUser: {
                    name: "Tobias",
                    email: "tobias.stosius@gmail.com"
                },
                username: "Hans"
            }
        }
    }
</script>

<style scoped>

</style>