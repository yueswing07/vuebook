<template>
  <div class="fb_login">
    <button class="btn btn-primary btn-google" @click="loginToFirebase()">{{loginMessage}}</button>

  </div>
</template>
<script>
  import Helper from '../FBHelper'
  var fbHelper = new Helper();
  export default {
    data() {
      return {
        loginMessage: "Login using Google",
        loginToFirebase() {
          fbHelper.loginWithGoogle()
          .then((loginResult) => {
            console.log(loginResult)
            window.location.pathname = "/overview"
          })
          .catch((error) => {
            console.log(error)
          })
        }
      }
    }
  }
</script>
<style>

.fb_login button{
  width: 100vw;
}
.fb_login button.btn.btn-google{
  border: none;
  border-radius: 0;
}

</style>
