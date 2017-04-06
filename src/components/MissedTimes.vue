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
    export default {
        props: [
            'currentuser'
        ],
        methods: {

        },
        data() {
            return {
                message: ''
            }
        },
        created(){
          awesome.debug('info','MissedTimes','Current user', this.currentuser)
        }
    }
</script>

<style scoped>
    .overview-container {
        border: 1px solid red;
    }
</style>
