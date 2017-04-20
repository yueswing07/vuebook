<template>
<div id='app' class='container'>
  <div v-if='userStoreWatch'>
    <div class="row">
      <div class="col-md-12">
        <input type="button" class='btn btn-danger' @click='logoutUser()' value='Abmelden'>
      </div>
    </div>
    <!-- User Personal -->
    <div class="row">
      <div class="col-md-12">
        <p>Benutzername: <span>{{userStoreWatch.displayName}}</span></p>
      </div>
    </div>
    <!-- User Personal -->
    <!-- STUDENT SELECTION -->
    <div class='row'>
      <div class='col-md-12'>
        <label for='student_select'>Aktueller Schüler</label>
        <select name='student_select' id='student_select' v-model='studentSelection'>
                <option v-for='student in studentlist' v-bind:value='{activeStudent:student}'>{{student.name}}</option>
              </select>
      </div>
    </div>
    <!-- STUDENT SELECTION -->
    <div class='row'>
      <div class='col-md-12'>
        <p>Ausgewählter Schüler: {{selectedStudentWatch.name}}</p>
      </div>
    </div>
    <!-- Grades -->
    <div class='row'>
      <div class='col-md-12'>
        <grades></grades>
      </div>
    </div>
    <!-- Grades -->
    <!-- Missing Times -->
    <div class='row'>
      <div class='col-md-12'>
        <missingtimes></missingtimes>
      </div>
    </div>
    <!-- Missing Times -->
    <!-- Events -->
    <div class='row'>
      <div class='col-md-12'>
        <userevents></userevents>
      </div>
    </div>
    <!-- Events -->
  </div>
  <!-- IF USER -->
</div>

</template>


<script>
/* Components */
import missingtimes from '../components/MissingTime'
import userevents from '../components/Events'
import grades from '../components/Grades'
/* Other stuff */
import firebase from 'firebase'
import awesome from '../awesomeDebug'

export default {
  data() {
    return {
      studentlist: '',
      studentSelection: ''
    }
  },
  created(){
    firebase.database().ref('users/').once('value', snapshot =>{
      this.studentlist = snapshot.val()
    })    
  },
  watch: {
    studentSelection: function() {
      this.$store.commit('setSelectedStudent',this.studentSelection.activeStudent)
    }
  },
  methods: {
    logoutUser: function(){
      this.$store.commit('logoutUser')
    }
  },
  computed: {
    missingTimesListener(){
      return this.$store.state.missingTimes
    },
    userStoreWatch(){
      return this.$store.state.loggedInUser
    },
    selectedStudentWatch(){
      var that = this
      /* Firebase database observer */
      /* Should be triggered everytime a value in this ref() changes */
      firebase.database().ref('users/'+this.$store.state.selectedStudent.uid+'/missingtimes').on('value', function(snapshot){
        that.$store.commit('setMissingTimes',snapshot.val())
      })
      firebase.database().ref('users/'+this.$store.state.selectedStudent.uid+'/events').on('value', function(snapshot){
        that.$store.commit('setEventList',snapshot.val())
      })
      firebase.database().ref('users/'+this.$store.state.selectedStudent.uid+'/grades').on('value', function(snapshot){
        that.$store.commit('setGradelist',snapshot.val())
      })
      return this.$store.state.selectedStudent
    }

  },
  components:{
    missingtimes,
    userevents,
    grades
  },  
}
</script>

<style scoped>


</style>
