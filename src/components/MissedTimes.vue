<template>
  <div class="overview-container">
    <h2>Fehlzeiten</h2>
    <h5>Username: {{currentuser.displayName}}</h5>
    <h5>E-Mail {{currentuser.email}}</h5>
    <h5>{{message}}</h5>
    <ul>
      <li v-for='fehlzeit in databaseValue'>
        <p>Datum: {{fehlzeit.date}}</p>
        <p>Dauer: {{fehlzeit.duration}}</p>
        <p>Stunde: {{fehlzeit.lesson}}</p>
        <p>Status: {{fehlzeit.status}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
    var userObject;
    import awesome from '../awesomeDebug.js'
    import firebase from 'firebase'

    export default {
        props: [
            'currentuser'
        ],
        methods: {
          subscribeToDatabase: function(refString){
            var that = this
              firebase.database().ref(refString).on('value', function(snapshot){
                awesome.debug('debug','FBHelper.js','Database promise',snapshot.val())
                that.databaseValue = snapshot.val()
            })
          }
        },
        watch:{
            currentuser: function(){
                if (this.currentuser.uid !== 'undefined') {
                  this.subscribeToDatabase('debug/'+this.currentuser.uid+'/fehlzeiten/')
                }
            },
            databaseValue: function(){
              awesome.debug('debug','MissedTimes.vue','Databasevalue has updated')
            }
        },
        data() {
            return {
                message: '',
                databaseValue: ''
            }
        },
        created(){
        }
    }
</script>

<style scoped>
    .overview-container {
        border: 1px solid red;
    }
</style>
