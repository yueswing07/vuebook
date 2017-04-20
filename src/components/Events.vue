<template>
<div class="wrapper container">
  <div class="row">
    <div class="col-md-12">
      <h1>Events</h1>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <ul name="userEvent_list" id="userEvent_list">
        <li v-for='userEvent in eventsObserv' @click='userEventSelected(userEvent)'>
          <span class='delete_item' @click='removeUserEvent()' v-if='$store.state.loginType==="teacher" '>X</span>
          <span class='user_event_element'>Datum: {{userEvent.date}}</span>
          <span class='user_event_element'>Uhrzeit: {{userEvent.time}}</span>
          <span class='user_event_element'>Beschreibung: {{userEvent.description}}</span>
        </li>
      </ul>
    </div>
  </div>
  <div class="row" v-if='$store.state.loginType==="teacher" '>
    <div class="col-md-12">
      <input type="date" id='userEvent_edit_date' v-model='selectedEvent_date'>
      <input type="text" id='userEvent_edit_description' placeholder='Grund' v-model='selectedEvent_description'>
      <input type="time" id='userEvent_edit_time' v-model='selectedEvent_time'>
      <input type="button" id='userEvent_edit_send' class='btn btn-warning' @click='updateUserEvent()' value='Bearbeitung abschliesen'>
    </div>
  </div>
  <div class="row" v-if='$store.state.loginType==="teacher" '>
    <div class="col-md-12">
      <input type="date" id='userEvent_edit_date' v-model='newEvent_date'>
      <input type="text" id='userEvent_edit_description' placeholder='Grund' v-model='newEvent_description'>
      <input type="time" id='userEvent_edit_time' v-model='newEvent_time'>
      <input type="button" id='userEvent_edit_send' class='btn btn-primary' @click='createUserEvent()' value='Event eintragen'>
    </div>
  </div>
</div>

</template>
<script>
    import awesome from '../awesomeDebug'
    export default {
      data() {
        return {
          selectedEvent_date: '',
          selectedEvent_description: '',
          selectedEvent_time: '',
          selectedEvent_uid: '',
          newEvent_date: '',
          newEvent_description: '',
          newEvent_time: '',
        }
      },
      methods: {
        userEventSelected: function (userEvent) {
          this.selectedEvent_date = userEvent.date
          this.selectedEvent_description = userEvent.description
          this.selectedEvent_time = userEvent.time
          this.selectedEvent_uid = userEvent.uid
        },
        updateUserEvent: function () {
          /* Create new missing Time object */
          /* Force creation of a UID */
          if (!this.selectedEvent_uid) {
            var timeUID = new Date().getTime()
          } else {
            var timeUID = this.selectedEvent_uid
          }

          var eventObject = {
            date: this.selectedEvent_date,
            description: this.selectedEvent_description,
            time: this.selectedEvent_time,
            uid: timeUID
          }
          /* Notify store to force updates */
          this.$store.commit('updateUserEvent', eventObject)
          this.selectedEvent_date = ''
          this.selectedEvent_description = ''
          this.selectedEvent_time = ''
          this.selectedEvent_uid = ''

        },
        removeUserEvent: function () {
          if (this.selectedEvent_uid) {
            this.$store.commit('removeUserEvent', this.selectedEvent_uid)
          }
        },
        createUserEvent: function () {
          /* Time object that will be written to DB */
          var eventObject = {
            date: this.newEvent_date,
            description: this.newEvent_description,
            time: this.newEvent_time,
            uid: new Date().getTime()
          }
          /* Notify store about new time */
          this.$store.commit('updateUserEvent', eventObject)
          this.newEvent_date = ''
          this.newEvent_description = ''
          this.newEvent_time = ''
        }
      },
      computed: {
        /* Observe changes to missing times list */
        eventsObserv() {
          return this.$store.state.events
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
    .user_event_element{
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