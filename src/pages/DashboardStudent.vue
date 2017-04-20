<template>
<div id='app' class='container'>
  <div class="row">
    <div class="col-md-12">
      <input type="button" class='btn btn-danger' @click='logoutUser()' value='Abmelden'>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <p>Benutzername: <span>{{userStoreWatch.displayName}}</span></p>
    </div>
  </div>
  <div class='row'>
    <div class='col-md-12'>
      <grades></grades>
    </div>
  </div>
  <div class='row'>
    <div class='col-md-12'>
      <missingtimes></missingtimes>
    </div>
  </div>
  <div class='row'>
    <div class='col-md-12'>
      <userevents></userevents>
    </div>
  </div>
</div>

</template>

<script>
    import firebase from 'firebase'
    import missingtimes from '../components/MissingTime'
    import userevents from '../components/Events'
    import grades from '../components/Grades'
    export default {
      data() {
        return {
          foo: 'Hello'
        }
      },
      created() {
        /* Firebase database observer */
        /* Should be triggered everytime a value in this ref() changes */
        var that = this
        firebase.database().ref('users/' + this.$store.state.loggedInUser.uid + '/missingtimes').on('value', function (snapshot) {
          that.$store.commit('setMissingTimes', snapshot.val())
        })
        firebase.database().ref('users/' + this.$store.state.loggedInUser.uid + '/events').on('value', function (snapshot) {
          that.$store.commit('setEventList', snapshot.val())
        })
        firebase.database().ref('users/' + this.$store.state.loggedInUser.uid + '/grades').on('value', function (snapshot) {
          that.$store.commit('setGradelist', snapshot.val())
        })
      },
      computed: {
        missingTimesListener() {
          return this.$store.state.missingTimes
        },
        userStoreWatch() {
          return this.$store.state.loggedInUser
        },
      },
      components: {
        missingtimes,
        userevents,
        grades
      },
      methods: {
        logoutUser: function () {
          this.$store.commit('logoutUser')
        }
      },
    }


</script>

<style></style>