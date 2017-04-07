<template>
  <div class="overview-container">
    <h2>Fehlzeiten</h2>
    <h5>Username: {{currentuser.displayName}}</h5>
    <h5>E-Mail {{currentuser.email}}</h5>
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
        },
        watch:{
            currentuser: function(){
                awesome.debug('debug','MissedTimes.vue','Current user change detected',this.currentuser.uid)
                firebase.database().ref('debug/'+this.currentuser.uid+'/fehlzeiten/').once('value')
                .then( function(snapshot){
                    awesome.debug('debug','MissedTimes.vue','Database value',snapshot.val())
                })

            }
        },
        data() {
            return {
                message: '',
            }
        },
        created(){          
        }
    }
</script>

<style scoped>
    .overview-container {
        border: 1px solid red;
    }
</style>
