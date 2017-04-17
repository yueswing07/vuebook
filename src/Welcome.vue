<template>
    <div class="wrapper container">
        <h1>Welcome to the application</h1>
        <h2>Anmelden als Schüler</h2>
        <login :loginType='"student"'></login>
        <hr>
        <h2>Anmelden als Lehrkraft</h2>
        <login :loginType='"teacher"'></login>
    </div>
</template>
<script>
    import login from './components/Login'
    export default {
        data() {
            return{

            }
        },
        components: {
            login
        }
    }
</script>
<style>

</style>