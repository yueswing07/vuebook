<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12">
        {{msg}}
          <firebaselogin></firebaselogin>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import firebaselogin from './components/FirebaseLogin'
  export default {
    name: 'app',
    components: {
      firebaselogin
    },
    data: ()=> {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }

</script>

<style></style>
