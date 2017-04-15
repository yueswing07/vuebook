<template>
  <div id='app' class='container'>
    <!-- STUDENT SELECTION -->
    <div class='row'>
      <div class='col-md-12'>
      <label for='student_select'>Aktueller Schüler</label>
        <select name='student_select' id='student_select' v-model='studentSelection'>
          <option v-for='student in studentlist' v-bind:activeStudent='student'>{{student.name}}</option>
        </select>
      </div>
    </div>
    <!-- STUDENT SELECTION -->
    <div class='row'>
      <div class='col-md-12'>
        <p v-if='userStoreWatch'>User Watch: {{userStoreWatch.uid}}</p>  
      </div>
    </div>
    <div class='row'>
      <div class='col-md-12'>
        <test></test>  
      </div>
    </div>
    
  </div>
  
</template>


<script>
import test from './components/test'
import firebase from 'firebase'
export default {
  data() {
    return {
      studentlist: null,
      studentSelection: null
    }
  },
  created(){
    firebase.database().ref('users/').once('value', snapshot =>{
      this.studentlist = snapshot.val()
    })
  },
  watch: {
    studentSelection: () => {
      console.log(this.activeStudent)
    }
  },
  computed: {
    countMethod(){
      return this.$store.state.count
    },
    userStoreWatch(){
      return this.$store.state.loggedInUser
    }

  },
  components:{
    test
  },  
}
</script>

<style scoped>


</style>
