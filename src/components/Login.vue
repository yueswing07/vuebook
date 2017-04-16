<template>
    <div class="wrapper container">
        <input type="button" value='Anmelden mit Google' class='btn btn-primary' @click='login("google")'>
    </div>
</template>
<script>
    export default {
        data(){
            return {

            }
        },
        methods: {
            login: function(providerName){
                this.$store.commit('loginUser',providerName)
            },
        }
    }
</script>