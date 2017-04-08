<template>
  <div class="overview-container">
    <h2>Fehlzeiten</h2>
    <select class='missing-times-list'>
      <option v-for='fehlzeit in databaseValue' class='list-item'>
        <p>Datum: {{fehlzeit.date}}</p>
        <p>Dauer: {{fehlzeit.duration}}</p>
        <p>Stunde: {{fehlzeit.lesson}}</p>
        <p>Status: {{fehlzeit.status}}</p>
      </option>
    </select>
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
    .missing-times-list{
        max-height: 150px;
        overflow-y: scroll;
        list-style: none;
        padding-left: 0;
    }
    .list-item:nth-child(odd){
        background-color: #b9b8b8;
    }
</style>
