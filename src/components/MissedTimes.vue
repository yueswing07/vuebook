<template>
  <div class="overview-container container">
    <div class="row">
        <h2>Fehlzeiten</h2>
    </div>
    <div class="row">        
        <select class='missing-times-list'>
            <option v-for='fehlzeit in databaseValue' class='list-item'>
                <p>Datum: {{fehlzeit.date}}</p>
                <p>Dauer: {{fehlzeit.duration}}</p>
                <p>Stunde: {{fehlzeit.lesson}}</p>
                <p>Entschuldigung: {{fehlzeit.description}}</p>
                <p>Status: {{fehlzeit.status}}</p>
            </option>
        </select>
    </div>
    <div class="row">
        <input type="date" v-model='missingtime_date'>
        <input type="time" v-model='missingtime_duration'>
        <select name="" id="" v-model='missingtime_lesson'>
            <option v-for='n in 12'> Stunde {{n}}</option>
        </select>
        <select name="" id="" v-model='missingtime_description'>
            <option v-for='excuse in excuses' v-if='excuse'>{{excuse}}</option>
        </select>
        <input type="button" class='btn btn-primary' value='Entschuldigung eintragen' @click='createMissingTime()'>
    </div>
    <div class="row">
        <h2>Output</h2>                
    </div>
    <div class="row">
        Date: {{missingtime_date}}
        Duration: {{missingtime_duration}}
        Lesson: {{missingtime_lesson}}
        Description: {{missingtime_description}}
    </div>
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
          },
          createMissingTime: function(){
              if (this.missingtime_description === 'Ausstehend'){
                  this.missingtime_status = 'pending'
              } else {
                  this.missingtime_status = 'approved'
              }
              this.newMissingTime = {
                  date: this.missingtime_date,
                  duration: this.missingtime_duration,
                  lesson: this.missingtime_lesson,
                  description: this.missingtime_description,
                  status: this.missingtime_status
              }
              awesome.debug('info','MissedTimes.vue','Create missing time',this.newMissingTime)
              firebase.database().ref('debug/'+this.currentuser.uid+'/fehlzeiten/'+new Date().getTime()+'/').set(this.newMissingTime)
          }
        },
        watch:{
            currentuser: function(){
                if (this.currentuser.uid !== 'undefined') {
                    var that = this
                    firebase.database().ref('debug/'+this.currentuser.uid+'/fehlzeiten/').on('value', (snapshot) => {
                        awesome.debug('servere','MissedTimes.js','Change ref from "debug" to "user"')
                        that.databaseValue = snapshot.val()
                    })
                    firebase.database().ref('resources/excuses/').on('value', (snapshot) => {
                        awesome.debug('debug','MissedTimes.vue','Found excuses',snapshot.val())
                        that.excuses = snapshot.val()
                    })
                }
            }
        },
        data() {
            return {
                excuses: '',
                databaseValue: '',
                missingtime_date: '',
                missingtime_duration: '',
                missingtime_lesson: '',
                missingtime_description: '',
                missingtime_status: ''
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
