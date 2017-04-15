<template>
  <div class="overview-container container">
    <div class="row">
        <h2>Events</h2>
    </div>    
    <div class="row">
        <select class='event-times-list' v-model='selectedPersonalEvent'>
            <option v-for='personalevent in databaseValue' class='list-item' v-bind:value='{ activePersonalEvent:personalevent }'>
                <p>Datum: {{personalevent.date}}</p>
                <p>Beschreibung: {{personalevent.description}}</p>
                <p>Zeit: {{personalevent.duration}}</p>
            </option>
        </select>
    </div>
    <div class="row">
        <input type="date" v-model='personalEvent_date'>
        <input type="time" v-model='personalEvent_duration'>
        <select name="" id="" v-model='personalEvent_lesson'>
            <option v-for='n in 12'> Stunde {{n}}</option>
        </select>
        <input type="text" v-model='personalEvent_description'>
        <input type="button" class='btn btn-primary' value='Event eintragen' @click='createpersonalEvent()'>
        <input type="button" class='btn btn-info' value='Event bearbeiten' @click='editpersonalevent()'>
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
          createpersonalEvent: function(timestamp){
              if (!timestamp){
                  timestamp = new Date().getTime()
              }
              this.newpersonalEvent = {
                  date: this.personalEvent_date,
                  duration: this.personalEvent_duration,
                  lesson: this.personalEvent_lesson,
                  description: this.personalEvent_description,
                  uid: timestamp
              }
              awesome.debug('info','EventList.vue','Create personal event',this.newpersonalEvent)
              firebase.database().ref('users/'+this.currentuser.uid+'/events/'+timestamp+'/').set(this.newpersonalEvent)
          },
            editpersonalevent: function(){
                this.createpersonalEvent(this.personalEvent_uid)
            },
        },        
        watch:{
            currentuser: function(){
                if (this.currentuser.uid !== 'undefined') {
                    var that = this
                    firebase.database().ref('users/'+this.currentuser.uid+'/events/').on('value', function(snapshot){
                        awesome.debug('servere','Eventlist.js','Change ref from "debug" to "user"')
                        that.databaseValue = snapshot.val()
                    })
                }
            },
            selectedPersonalEvent: function() {
                this.personalEvent_date = this.selectedPersonalEvent.activePersonalEvent.date
                this.personalEvent_duration = this.selectedPersonalEvent.activePersonalEvent.duration
                this.personalEvent_lesson = this.selectedPersonalEvent.activePersonalEvent.lesson
                this.personalEvent_description = this.selectedPersonalEvent.activePersonalEvent.description
                this.personalEvent_uid = this.selectedPersonalEvent.activePersonalEvent.uid
                awesome.debug('debug','EventList.vue','Currently active event',this.selectedPersonalEvent.activePersonalEvent)
            },
        },        
        data() {
            return {
                message: '',
                databaseValue: '',
                personalEvent_date: '',
                personalEvent_duration: '',
                personalEvent_lesson: '',
                personalEvent_description: '',
                personalEvent_status: '',
                personalEvent_uid: '',
                selectedPersonalEvent: ''
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
