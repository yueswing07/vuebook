<template>
  <div class="overview-container">
    <h2>Events</h2>
    <select class='event-times-list'>
      <option v-for='personalevent in databaseValue' class='list-item'>
        <p>Datum: {{personalevent.date}}</p>
        <p>Beschreibung: {{personalevent.description}}</p>
        <p>Zeit: {{personalevent.duration}}</p>
      </option>
    </select>
    <div class="row">
        <input type="date" v-model='personalEvent_date'>
        <input type="time" v-model='personalEvent_duration'>
        <select name="" id="" v-model='personalEvent_lesson'>
            <option v-for='n in 12'> Stunde {{n}}</option>
        </select>
        <input type="text" v-model='personalEvent_description'>
        <input type="button" class='btn btn-primary' value='Event eintragen' @click='createpersonalEvent()'>
    </div>
    <div class="row">
        <h2>Output</h2>                
    </div>
    <div class="row">
        Date: {{personalEvent_date}}
        Duration: {{personalEvent_duration}}
        Lesson: {{personalEvent_lesson}}
        Description: {{personalEvent_description}}
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
          createpersonalEvent: function(){
              this.newpersonalEvent = {
                  date: this.personalEvent_date,
                  duration: this.personalEvent_duration,
                  lesson: this.personalEvent_lesson,
                  description: this.personalEvent_description,
              }
              awesome.debug('info','EventList.vue','Create personal event',this.newpersonalEvent)
              firebase.database().ref('debug/'+this.currentuser.uid+'/personalevent/'+new Date().getTime()+'/').set(this.newpersonalEvent)
          }
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
            }
        },
        data() {
            return {
                message: '',
                databaseValue: '',
                personalEvent_date: '',
                personalEvent_duration: '',
                personalEvent_lesson: '',
                personalEvent_description: '',
                personalEvent_status: ''
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
