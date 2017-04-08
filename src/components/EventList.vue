<template>
  <div class="overview-container">
    <h2>Events</h2>
    <select class='missing-times-list'>
      <option v-for='personalevent in databaseValue' class='list-item'>
        <p>Datum: {{personalevent.date}}</p>
        <p>Beschreibung: {{personalevent.description}}</p>
        <p>Info: {{personalevent.info}}</p>
        <p>Zeit: {{personalevent.time}}</p>
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
          }
        },
        watch:{
            currentuser: function(){
                if (this.currentuser.uid !== 'undefined') {
                    var that = this
                    firebase.database().ref('debug/'+this.currentuser.uid+'/personalevent/').on('value', function(snapshot){
                        awesome.debug('servere','Eventlist.js','Change ref from "debug" to "user"')
                        that.databaseValue = snapshot.val()
                    })
                }
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
