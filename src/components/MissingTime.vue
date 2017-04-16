<!-- 
    Missingtimes of selected student
    View, Edit, Delete
-->
<template>
    <div class="wrapper container">
    <div class="row">
        <div class="col-md-12">
            <h1>Fehlzeiten</h1>
        </div>
    </div>
        <div class="row">
            <div class="col-md-12">
                <ul name="missing_times" id="missing_times">
                    <li v-for='missingTime in timesObserv' @click='missingTimeSelected(missingTime)'>
                        <span class='delete_item'>X</span>
                        <span class='missing_time_element'>Datum: {{missingTime.date}}</span>
                        <span class='missing_time_element'>Dauer: {{missingTime.duration}}</span>
                        <span class='missing_time_element'>Stunde: {{missingTime.lesson}}</span>
                        <span class='missing_time_element'>Entschuldigung: {{missingTime.description}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <input type="date" id='missingTime_edit_date' v-model='selectedTime_date'>
                <input type="text" id='missingTime_edit_description' placeholder='Grund' v-model='selectedTime_description'>
                <input type="time" id='missingTime_edit_duration' v-model='selectedTime_duration'>
                <input type="text" id='missingTime_edit_description' placeholder='Stunde' v-model='selectedTime_lesson'>
                <input type="button" id='missingTime_edit_send' class='btn btn-warning' @click='updateMissingTime()' value='Bearbeitung abschliesen'>
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
                selectedTime_uid: ''      
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
                var timeUID = new Date().getTime()

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
            }
        },
        computed: {
            /* Observe changes to missing times list */
            timesObserv(){
                return this.$store.state.missingTimes
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
</style>