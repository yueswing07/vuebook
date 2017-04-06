<template>
  <div class="overview-container">
    <h2>Fehlzeiten</h2>
    <h5>Username</h5>
    <h5>E-Mail</h5>
  </div>
</template>

<script>
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
          console.log("==MissedTimes.vue==");
        }
    }
</script>

<style scoped>
    .overview-container {
        border: 1px solid red;
    }
</style>
