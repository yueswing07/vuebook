<template>
  <div class="fb_login">
    <h2>Anmelden am Digitalen Klassenbuch</h2>
    <p>Sie können sich über die folgenden Anmeldemethoden an der Applikation anmelden.</p>
    <p>Sollten sie keinen Account haben, wird automatisch einer für Sie generiert.</p>
    <button class="btn btn-primary btn-google" @click="login('google')">Anmelden mit Google</button>
    <button class="btn btn-primary btn-github" @click="login('github')">Anmelden mit Github</button>
  </div>

  </div>
</template>

<script>
    import Helper from '../FBHelper'
    var fbHelper = new Helper();
    export default {
        data() {
            return {
                loginMessage: "Login using Google",
                login(provider){
                  fbHelper.loginToApplication(provider)
                }
            }
        }
    }
</script>

<style scoped>
    .fb_login {
        border: 1px solid black;
    }

    .fb_login button {
        margin-bottom: 20px;
    }

    .fb_login button.btn.btn-google {
        border: none;
        border-radius: 0;
    }

    .fb_login button.btn.btn-github {
        border: none;
        border-radius: 0;
        background-color: #25e78b;
    }

    .fb_login button.btn.btn-github:hover {
        border: none;
        border-radius: 0;
        background-color: #5ee725;
    }
</style>
