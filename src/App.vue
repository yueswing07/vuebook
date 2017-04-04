<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <firebaselogin @userLoggedIn="changeUserInfo"></firebaselogin>
      </div>
      <!--<div v-if="validUser" class='row'>-->
      <div class='row'>
        <overview :currentuser='currentUser'></overview>
        <ul id="example-1">
          <li v-for="item in currentUser.database">
            {{ item }}
          </li>
        </ul>
        <p>User: {{currentUser}} </p>
        <p>Userinfo: {{currentUser.database}} </p>
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
      changeUserInfo: function (args) {
        this.currentUser.name = args.user.displayName;
        this.currentUser.email = args.user.email;
        this.currentUser.database = args.database;
        this.currentUser.valid = args.debug;
        this.validUser = true;
        console.log("User loging result: ", this.currentUser)
        console.log("Return: ", args)
      },
      debugInfo: function () {
        console.log(this.currentUser);
      }
    },
    data() {
      return {
        currentUser: {
          name: "Hans Zimmer",
          email: "epicmusic@zimmer.com",
          database: {
            test: "wert"
          }
        },
      }
    }
  }

</script>

<style scoped>


</style>
