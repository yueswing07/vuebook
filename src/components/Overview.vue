<template>
  <div class="overview-container">
    <h2>Current User data</h2>
    <h5>Username: {{currentuser.name}}</h5>
    <h5>E-Mail: {{currentuser.email}}</h5>
  </div>
</template>

<script>
    var userObject;
    export default {
        props: [
            'currentuser'
        ],
        data() {
            return {
                message: ''
            }
        }
    }
</script>

<style scoped>
    .overview-container {
        border: 1px solid red;
    }
</style>