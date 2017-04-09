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
        <input type="date">
        <input type="time">
        <select name="" id="">
            <option value="" v-for='n in 12'> Stunde {{n}}</option>
        </select>
        <select name="" id="">
            <option value="" v-for='excuse in excuses' v-if='excuse'>{{excuse}}</option>
        </select>
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
