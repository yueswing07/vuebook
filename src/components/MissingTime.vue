<!-- 
    Missingtimes of selected student
    View, Edit, Delete
-->
<template>
    <div class="wrapper container">
    <div class="row">
        <div class="col-md-12">
            <span class='hiddenObserver'>{{userObserver}}</span>
            <h1>Fehlzeiten</h1>
        </div>
    </div>
        <div class="row">
            <div class="col-md-12">
                <ul name="missing_times" id="missing_times">
                    <li v-for='missingTime in timesObserv' @click='missingTimeSelected(missingTime)'>
                        <span class='delete_item' @click='removeMissingTime()' v-if='$store.state.loggedInUser==="teacher" '>X</span>
                        <span class='missing_time_element'>Datum: {{missingTime.date}}</span>
                        <span class='missing_time_element'>Dauer: {{missingTime.duration}}</span>
                        <span class='missing_time_element'>Stunde: {{missingTime.lesson}}</span>
                        <span class='missing_time_element'>Entschuldigung: {{missingTime.description}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="row" v-if='$store.state.loginType==="teacher" '>
            <div class="col-md-12">
                <input type="date" id='missingTime_edit_date' v-model='selectedTime_date'>
                <input type="text" id='missingTime_edit_description' placeholder='Grund' v-model='selectedTime_description'>
                <input type="time" id='missingTime_edit_duration' v-model='selectedTime_duration'>
                <input type="text" id='missingTime_edit_description' placeholder='Stunde' v-model='selectedTime_lesson'>
                <input type="button" id='missingTime_edit_send' class='btn btn-warning' @click='updateMissingTime()' value='Bearbeitung abschliesen'>
            </div>
        </div>
        <div class="row" v-if='$store.state.loginType==="teacher" '>
            <div class="col-md-12">
                <input type="date" id='missingTime_edit_date' v-model='newTime_date'>
                <input type="text" id='missingTime_edit_description' placeholder='Grund' v-model='newTime_description'>
                <input type="time" id='missingTime_edit_duration' v-model='newTime_duration'>
                <input type="text" id='missingTime_edit_description' placeholder='Stunde' v-model='newTime_lesson'>
                <input type="button" id='missingTime_edit_send' class='btn btn-primary' @click='createMissingTime()' value='Fehlzeit eintragen'>
            </div>
        </div>
    </div>
</template>

<script>
    import awesome from '../awesomeDebug'
    export default {
        data(){
            return{
                selectedTime_date: '',
                selectedTime_description: '',
                selectedTime_duration: '',
                selectedTime_lesson: '',
                selectedTime_status: '',
                selectedTime_uid: '',
                newTime_date: '',
                newTime_description: '',
                newTime_duration: '',
                newTime_lesson: '' 
            }
        },
        methods: {
            missingTimeSelected: function(missingTime) {
                awesome.debug('debug','MissingTime.vue','Selected missing time entry',missingTime)
                this.selectedTime_date          = missingTime.date
                this.selectedTime_description   = missingTime.description
                this.selectedTime_duration      = missingTime.duration
                this.selectedTime_lesson        = missingTime.lesson
                this.selectedTime_uid           = missingTime.uid
            },
            updateMissingTime: function(){
                /* Create new missing Time object */
                /* Force creation of a UID */
                if(!this.selectedTime_uid){
                    var timeUID = new Date().getTime()
                } else {
                    var timeUID = this.selectedTime_uid
                }
                

                var timeObject = {
                    date: this.selectedTime_date,
                    description: this.selectedTime_description,
                    duration: this.selectedTime_duration,
                    lesson: this.selectedTime_lesson,
                    uid: timeUID
                }
                awesome.debug('debug','MissingTime.vue','New missingTime Object',timeObject)
                /* Notify store to force updates */
                this.$store.commit('updateMissingTime',timeObject)
                this.selectedTime_date =  ''
                this.selectedTime_description =  ''
                this.selectedTime_duration =  ''
                this.selectedTime_lesson =  ''
                
            },
            removeMissingTime: function(){
                awesome.debug('debug','MissingTime.vue','Selected missing Time UID',this.selectedTime_uid)
                if(this.selectedTime_uid){
                    this.$store.commit('removeMissingTime', this.selectedTime_uid)
                }
            },
            createMissingTime: function(){
                /* Time object that will be written to DB */
                var timeObject = {
                    date: this.newTime_date,
                    description: this.newTime_description,
                    duration: this.newTime_duration,
                    lesson: this.newTime_lesson,
                    status: 'Pending',
                    uid: new Date().getTime()
                }
                /* Notify store about new time */
                this.$store.commit('updateMissingTime',timeObject)
                this.newTime_date = ''
                this.newTime_description = ''
                this.newTime_duration = ''
                this.newTime_lesson = ''
            }
        },
        computed: {
            /* Observe changes to missing times list */
            timesObserv(){
                return this.$store.state.missingTimes
            },
            userObserver(){
                awesome.debug('debug','MissingTime.vue','User state changed',this.$store.state.loggedInUser)
                if(!this.$store.state.loggedInUser){
                    this.selectedTime_date = '',
                    this.selectedTime_description = '',
                    this.selectedTime_duration = '',
                    this.selectedTime_lesson = '',
                    this.selectedTime_status = '',
                    this.selectedTime_uid = '',
                    this.newTime_date = '',
                    this.newTime_description = '',
                    this.newTime_duration = '',
                    this.newTime_lesson = '' 
                }
                return this.$store.state.loggedInUser
            }
        }
    }
</script>
<style scoped>
    ul{
        list-style: none;
        max-height: 450px;
        overflow-x: hidden;
        overflow-y: scroll;
        padding-left: 0;
    }
    ul:hover{
        cursor: pointer;
    }
    ul li {
        margin-bottom: 15px;
        position: relative;
    }
    ul li:nth-child(odd){
        background-color: #bcbcbc;
    }
    .missing_time_element{
        display: flex;
    }
    .delete_item{
        position: absolute;
        right: 50px;
        margin-top: 35px;
        border: solid red;
        color: red;
        padding-left: 10px;
        padding-right: 10px;
    }
    .hiddenObserver{
        display: none;
    }
</style>