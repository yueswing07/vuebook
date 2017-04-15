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
                    <li v-for='missingTime in timesObserv'>
                        <span class='delete_item'>X</span>
                        <span class='missing_time_element'>Datum: {{missingTime.date}}</span>
                        <span class='missing_time_element'>Dauer: {{missingTime.duration}}</span>
                        <span class='missing_time_element'>Stunde: {{missingTime.lesson}}</span>
                        <span class='missing_time_element'>Entschuldigung: {{missingTime.description}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{

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