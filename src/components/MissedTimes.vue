<template>
  <div class="overview-container container">
    <div class="row">
        <h2>Fehlzeiten</h2>
    </div>
    <div class="row">        
        <select class='missing-times-list' v-model='selectedMissingTime'>
            <option v-for='fehlzeit in databaseValue' class='list-item' v-bind:value='{ activeMissingTime:fehlzeit}'>
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
        <input type="button" class='btn btn-info' value='Entschuldigung bearbeiten' @click='editMissingTime()'>
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
          createMissingTime: function(timestamp){
              if ( !timestamp ){
                timestamp = new Date().getTime()
              }
              
              this.newMissingTime = {
                  date: this.missingtime_date,
                  duration: this.missingtime_duration,
                  lesson: this.missingtime_lesson,
                  description: this.missingtime_description,
                  status: 'pending',                  
                  uid: timestamp
              }
              awesome.debug('info','MissedTimes.vue','Create missing time',this.newMissingTime)
              firebase.database().ref('users/'+this.currentuser.uid+'/missingtimes/'+timestamp+'/').set(this.newMissingTime)
          },
          updateeditableMissingTime : function() {


          },
          editMissingTime: function() {
            this.createMissingTime(this.missingtime_uid)
          }
        },
        watch:{
            currentuser: function(){
                if (this.currentuser.uid !== 'undefined') {
                    var that = this
                    firebase.database().ref('users/'+this.currentuser.uid+'/missingtimes/').on('value', (snapshot) => {
                        that.databaseValue = snapshot.val()
                    })
                    firebase.database().ref('resources/excuses/').on('value', (snapshot) => {
                        awesome.debug('debug','MissedTimes.vue','Found excuses',snapshot.val())
                        that.excuses = snapshot.val()
                    })
                }
            },
            selectedMissingTime: function(){
                awesome.debug('debug','MissedTimes.vue','Missing Time select change',this.selectedMissingTime)
                this.missingtime_date = this.selectedMissingTime.activeMissingTime.date
                this.missingtime_duration = this.selectedMissingTime.activeMissingTime.duration
                this.missingtime_lesson = this.selectedMissingTime.activeMissingTime.lesson
                this.missingtime_description = this.selectedMissingTime.activeMissingTime.description
                this.missingtime_uid = this.selectedMissingTime.activeMissingTime.uid
                awesome.debug('debug','MissedTimes.vue','Select Time UID',this.selectedMissingTime.activeMissingTime.uid)
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
                missingtime_status: '',
                missingTime_uid: '',
                selectedMissingTime: ''                
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
