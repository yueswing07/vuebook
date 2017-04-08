<template>
  <div class="overview-container">
    <h2>Current User data</h2>
    <h5>Username: {{currentuser.displayName}}</h5>
    <h5>E-Mail: {{currentuser.email}}</h5>
  </div>
</template>

<script>
    import awesome from '../awesomeDebug.js'
    var userObject;
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
        }
    }
</script>

<style scoped>

</style>
