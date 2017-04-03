<template>
    <div class="relog">
        <h1>Sie sind nicht länger an der Anwendung angemeldet!!</h1>
        <firebaselogin></firebaselogin>
    </div>
</template>

<script>
    import firebaselogin from './components/FirebaseLogin'
    export default {
        name: 'invaliduser',
        components: {
            firebaselogin
        },
        data() {
            return {

            }
        }
    }
</script>

<style scoped>

</style>